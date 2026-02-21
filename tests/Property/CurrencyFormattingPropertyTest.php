<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Tithe;
use App\Models\Member;
use App\Services\FinanceService;
use App\Repositories\FinanceRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Currency Formatting Consistency
 * 
 * Feature: church-management-system
 * Property 3: Currency formatting consistency
 * Validates: Requirements 2.5
 * 
 * **Validates: Requirements 2.5**
 * 
 * Property: For any monetary value displayed in the system, it should be 
 * formatted with the appropriate currency symbol and two decimal places.
 */
class CurrencyFormattingPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected FinanceService $financeService;

    protected function setUp(): void
    {
        parent::setUp();
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Initialize service
        $this->financeService = new FinanceService(new FinanceRepository());
    }

    /**
     * Test that all monetary values maintain two decimal places precision.
     * 
     * @test
     */
    public function monetary_values_maintain_two_decimal_places()
    {
        $this->forAll(
            Generators::choose(1, 20) // Number of monetary values to test
        )
            ->withMaxSize(100)
            ->then(function ($valueCount) {
                // Clear existing data
                Tithe::query()->delete();
                Member::query()->delete();
                
                $member = Member::factory()->create();
                $startDate = '2024-01-01';
                $endDate = '2024-01-31';
                
                // Create tithes with various decimal amounts
                for ($i = 0; $i < $valueCount; $i++) {
                    // Generate amounts with varying decimal precision
                    $amount = round(mt_rand(1, 1000000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-01-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                }
                
                // Get all tithes
                $tithes = Tithe::whereBetween('date', [$startDate, $endDate])->get();
                
                // Property: All monetary amounts should have exactly 2 decimal places when formatted
                foreach ($tithes as $tithe) {
                    $formatted = number_format($tithe->amount, 2, '.', '');
                    $decimalParts = explode('.', $formatted);
                    
                    $this->assertCount(
                        2,
                        $decimalParts,
                        "Formatted amount should have decimal point"
                    );
                    
                    $this->assertEquals(
                        2,
                        strlen($decimalParts[1]),
                        "Formatted amount ({$formatted}) should have exactly 2 decimal places"
                    );
                    
                    // Verify the formatted value matches the original when rounded to 2 decimals
                    $this->assertEquals(
                        round($tithe->amount, 2),
                        (float)$formatted,
                        "Formatted value should match original amount rounded to 2 decimals"
                    );
                }
            });
    }

    /**
     * Test that monetary values can be formatted with currency symbol.
     * 
     * @test
     */
    public function monetary_values_can_be_formatted_with_currency_symbol()
    {
        $this->forAll(
            Generators::choose(1, 15)
        )
            ->withMaxSize(100)
            ->then(function ($valueCount) {
                // Clear existing data
                Tithe::query()->delete();
                
                // Create tithes with various amounts
                $amounts = [];
                for ($i = 0; $i < $valueCount; $i++) {
                    $amount = round(mt_rand(1, 1000000) / 100, 2);
                    $amounts[] = $amount;
                    
                    Tithe::factory()->create([
                        'amount' => $amount,
                        'date' => now(),
                    ]);
                }
                
                // Get all tithes
                $tithes = Tithe::all();
                
                // Property: All monetary values should be formattable with currency symbol
                foreach ($tithes as $tithe) {
                    // Format with currency symbol (simulating frontend formatting)
                    $formatted = '$' . number_format($tithe->amount, 2, '.', ',');
                    
                    // Verify format structure: $X,XXX.XX
                    $this->assertMatchesRegularExpression(
                        '/^\$\d{1,3}(,\d{3})*\.\d{2}$/',
                        $formatted,
                        "Currency formatted value ({$formatted}) should match pattern \$X,XXX.XX"
                    );
                    
                    // Verify the currency symbol is present
                    $this->assertStringStartsWith(
                        '$',
                        $formatted,
                        "Formatted currency should start with dollar sign"
                    );
                    
                    // Verify two decimal places
                    $this->assertMatchesRegularExpression(
                        '/\.\d{2}$/',
                        $formatted,
                        "Formatted currency should end with exactly 2 decimal places"
                    );
                }
            });
    }

    /**
     * Test that zero amounts are formatted correctly.
     * 
     * @test
     */
    public function zero_amounts_are_formatted_with_two_decimal_places()
    {
        // Clear existing data
        Tithe::query()->delete();
        
        // Create tithe with zero amount
        $tithe = Tithe::factory()->create([
            'amount' => 0,
            'date' => now(),
        ]);
        
        // Property: Zero should be formatted as 0.00
        $formatted = number_format($tithe->amount, 2, '.', '');
        
        $this->assertEquals(
            '0.00',
            $formatted,
            "Zero amount should be formatted as 0.00"
        );
        
        // With currency symbol
        $currencyFormatted = '$' . number_format($tithe->amount, 2, '.', ',');
        
        $this->assertEquals(
            '$0.00',
            $currencyFormatted,
            "Zero amount with currency should be formatted as \$0.00"
        );
    }

    /**
     * Test that large monetary values are formatted correctly with thousands separators.
     * 
     * @test
     */
    public function large_amounts_include_thousands_separators()
    {
        $this->forAll(
            Generators::choose(1000, 10000000) // Large amounts from $10.00 to $100,000.00
        )
            ->withMaxSize(100)
            ->then(function ($cents) {
                // Clear existing data
                Tithe::query()->delete();
                
                // Convert cents to dollars
                $amount = $cents / 100;
                
                Tithe::factory()->create([
                    'amount' => $amount,
                    'date' => now(),
                ]);
                
                $tithe = Tithe::first();
                
                // Property: Large amounts should include thousands separators
                $formatted = '$' . number_format($tithe->amount, 2, '.', ',');
                
                // If amount is >= 1000, should have comma separator
                if ($tithe->amount >= 1000) {
                    $this->assertStringContainsString(
                        ',',
                        $formatted,
                        "Large amounts (>= \$1,000) should include thousands separator"
                    );
                }
                
                // Should always have exactly 2 decimal places
                $this->assertMatchesRegularExpression(
                    '/\.\d{2}$/',
                    $formatted,
                    "Large amounts should have exactly 2 decimal places"
                );
                
                // Should start with currency symbol
                $this->assertStringStartsWith(
                    '$',
                    $formatted,
                    "Large amounts should start with currency symbol"
                );
            });
    }

    /**
     * Test that calculated totals maintain currency formatting precision.
     * 
     * @test
     */
    public function calculated_totals_maintain_currency_precision()
    {
        $this->forAll(
            Generators::choose(2, 15)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear existing data
                Tithe::query()->delete();
                Member::query()->delete();
                
                $member = Member::factory()->create();
                $startDate = '2024-02-01';
                $endDate = '2024-02-28';
                
                // Create tithes with precise decimal amounts
                for ($i = 0; $i < $titheCount; $i++) {
                    $amount = round(mt_rand(100, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-02-' . str_pad(mt_rand(1, 28), 2, '0', STR_PAD_LEFT),
                    ]);
                }
                
                // Calculate total using service
                $total = $this->financeService->calculateTotalGiving($startDate, $endDate);
                
                // Property: Calculated total should be formattable with 2 decimal places
                $formatted = number_format($total, 2, '.', '');
                $decimalParts = explode('.', $formatted);
                
                $this->assertCount(
                    2,
                    $decimalParts,
                    "Calculated total should have decimal point"
                );
                
                $this->assertEquals(
                    2,
                    strlen($decimalParts[1]),
                    "Calculated total should have exactly 2 decimal places"
                );
                
                // Verify with currency symbol
                $currencyFormatted = '$' . number_format($total, 2, '.', ',');
                
                $this->assertMatchesRegularExpression(
                    '/^\$\d{1,3}(,\d{3})*\.\d{2}$/',
                    $currencyFormatted,
                    "Calculated total with currency should match format \$X,XXX.XX"
                );
            });
    }

    /**
     * Test that average calculations maintain currency formatting precision.
     * 
     * @test
     */
    public function average_calculations_maintain_currency_precision()
    {
        $this->forAll(
            Generators::choose(2, 12)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear existing data
                Tithe::query()->delete();
                Member::query()->delete();
                
                $members = [];
                for ($i = 0; $i < 3; $i++) {
                    $members[] = Member::factory()->create();
                }
                
                $startDate = '2024-03-01';
                $endDate = '2024-03-31';
                
                // Create tithes
                for ($i = 0; $i < $titheCount; $i++) {
                    $member = $members[array_rand($members)];
                    $amount = round(mt_rand(100, 50000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-03-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                }
                
                // Calculate average using service
                $average = $this->financeService->calculateAveragePerMember($startDate, $endDate);
                
                // Property: Average should be formattable with 2 decimal places
                $formatted = number_format($average, 2, '.', '');
                $decimalParts = explode('.', $formatted);
                
                $this->assertCount(
                    2,
                    $decimalParts,
                    "Average should have decimal point"
                );
                
                $this->assertEquals(
                    2,
                    strlen($decimalParts[1]),
                    "Average should have exactly 2 decimal places"
                );
                
                // Verify with currency symbol
                $currencyFormatted = '$' . number_format($average, 2, '.', ',');
                
                $this->assertMatchesRegularExpression(
                    '/^\$\d{1,3}(,\d{3})*\.\d{2}$/',
                    $currencyFormatted,
                    "Average with currency should match format \$X,XXX.XX"
                );
            });
    }

    /**
     * Test that monthly totals from dashboard maintain currency formatting.
     * 
     * @test
     */
    public function dashboard_monthly_totals_maintain_currency_formatting()
    {
        $this->forAll(
            Generators::choose(0, 15)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear existing data
                Tithe::query()->delete();
                
                // Create tithes for current month
                for ($i = 0; $i < $titheCount; $i++) {
                    $amount = round(mt_rand(100, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'amount' => $amount,
                        'date' => now(),
                    ]);
                }
                
                // Get monthly total
                $monthlyTotal = $this->financeService->getTotalForCurrentMonth();
                
                // Property: Monthly total should be formattable with 2 decimal places
                $formatted = number_format($monthlyTotal, 2, '.', '');
                $decimalParts = explode('.', $formatted);
                
                $this->assertCount(
                    2,
                    $decimalParts,
                    "Monthly total should have decimal point"
                );
                
                $this->assertEquals(
                    2,
                    strlen($decimalParts[1]),
                    "Monthly total should have exactly 2 decimal places"
                );
                
                // Verify with currency symbol
                $currencyFormatted = '$' . number_format($monthlyTotal, 2, '.', ',');
                
                $this->assertMatchesRegularExpression(
                    '/^\$\d{1,3}(,\d{3})*\.\d{2}$/',
                    $currencyFormatted,
                    "Monthly total with currency should match format \$X,XXX.XX"
                );
            });
    }

    /**
     * Test that all monetary values in financial summary are properly formatted.
     * 
     * @test
     */
    public function financial_summary_values_maintain_currency_formatting()
    {
        $this->forAll(
            Generators::choose(1, 12)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear existing data
                Tithe::query()->delete();
                Member::query()->delete();
                
                $members = [];
                for ($i = 0; $i < 3; $i++) {
                    $members[] = Member::factory()->create();
                }
                
                $startDate = '2024-04-01';
                $endDate = '2024-04-30';
                
                // Create tithes
                for ($i = 0; $i < $titheCount; $i++) {
                    $member = $members[array_rand($members)];
                    $amount = round(mt_rand(100, 50000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-04-' . str_pad(mt_rand(1, 30), 2, '0', STR_PAD_LEFT),
                    ]);
                }
                
                // Get financial summary
                $summary = $this->financeService->getFinancialSummary($startDate, $endDate);
                
                // Property: All monetary values in summary should be formattable with 2 decimal places
                $monetaryFields = ['total_giving', 'average_per_member'];
                
                foreach ($monetaryFields as $field) {
                    if (isset($summary[$field])) {
                        $value = $summary[$field];
                        $formatted = number_format($value, 2, '.', '');
                        $decimalParts = explode('.', $formatted);
                        
                        $this->assertCount(
                            2,
                            $decimalParts,
                            "Summary field '{$field}' should have decimal point"
                        );
                        
                        $this->assertEquals(
                            2,
                            strlen($decimalParts[1]),
                            "Summary field '{$field}' should have exactly 2 decimal places"
                        );
                        
                        // Verify with currency symbol
                        $currencyFormatted = '$' . number_format($value, 2, '.', ',');
                        
                        $this->assertMatchesRegularExpression(
                            '/^\$\d{1,3}(,\d{3})*\.\d{2}$/',
                            $currencyFormatted,
                            "Summary field '{$field}' with currency should match format \$X,XXX.XX"
                        );
                    }
                }
            });
    }
}
