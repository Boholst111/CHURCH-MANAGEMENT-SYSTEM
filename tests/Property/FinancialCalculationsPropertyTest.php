<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\Tithe;
use App\Services\FinanceService;
use App\Repositories\FinanceRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Financial Calculations
 * 
 * Feature: church-management-system
 * Property 13: Financial calculations accuracy
 * Validates: Requirements 5.6
 * 
 * **Validates: Requirements 5.6**
 * 
 * Property: For any set of tithe records within a date range, the calculated 
 * total giving should equal the sum of all tithe amounts, and the average 
 * giving per member should equal total giving divided by the number of unique 
 * members who gave.
 */
class FinancialCalculationsPropertyTest extends TestCase
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
     * Test that total giving equals sum of all tithe amounts in date range.
     * 
     * @test
     */
    public function total_giving_equals_sum_of_tithe_amounts()
    {
        $this->forAll(
            Generators::choose(1, 20), // Number of tithes
            Generators::choose(1, 10)  // Number of unique members
        )
            ->withMaxSize(100) // Run 100 iterations as specified in design
            ->then(function ($titheCount, $memberCount) {
                // Clear all existing tithes to ensure clean state
                Tithe::query()->delete();
                Member::query()->delete();
                
                // Create members
                $members = [];
                for ($i = 0; $i < $memberCount; $i++) {
                    $members[] = Member::factory()->create();
                }
                
                // Create tithes with known amounts within a specific date range
                $startDate = '2024-01-01';
                $endDate = '2024-01-31';
                $expectedTotal = 0;
                
                for ($i = 0; $i < $titheCount; $i++) {
                    // Randomly assign to a member or leave null
                    $memberId = $i % 2 === 0 && !empty($members) 
                        ? $members[array_rand($members)]->id 
                        : null;
                    
                    // Generate random amount between 10 and 1000
                    $amount = round(mt_rand(1000, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $memberId,
                        'amount' => $amount,
                        'date' => '2024-01-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                    
                    $expectedTotal += $amount;
                }
                
                // Calculate total using the service
                $calculatedTotal = $this->financeService->calculateTotalGiving($startDate, $endDate);
                
                // Property: Calculated total must equal sum of all tithe amounts
                $this->assertEquals(
                    round($expectedTotal, 2),
                    round($calculatedTotal, 2),
                    "Calculated total giving ({$calculatedTotal}) should equal sum of all tithe amounts ({$expectedTotal})"
                );
                
                // Verify by manually summing from database
                $manualTotal = Tithe::whereBetween('date', [$startDate, $endDate])->sum('amount');
                
                $this->assertEquals(
                    round($manualTotal, 2),
                    round($calculatedTotal, 2),
                    "Calculated total should match manual database sum"
                );
            });
    }

    /**
     * Test that average per member equals total divided by unique member count.
     * 
     * @test
     */
    public function average_per_member_equals_total_divided_by_unique_members()
    {
        $this->forAll(
            Generators::choose(2, 15), // Number of tithes
            Generators::choose(1, 8)   // Number of unique members
        )
            ->withMaxSize(100)
            ->then(function ($titheCount, $memberCount) {
                // Clear all existing tithes to ensure clean state
                Tithe::query()->delete();
                Member::query()->delete();
                
                // Create members
                $members = [];
                for ($i = 0; $i < $memberCount; $i++) {
                    $members[] = Member::factory()->create();
                }
                
                // Create tithes within a specific date range
                $startDate = '2024-02-01';
                $endDate = '2024-02-28';
                $totalAmount = 0;
                $uniqueMemberIds = [];
                
                for ($i = 0; $i < $titheCount; $i++) {
                    // Assign to a member (ensure at least some have member_id)
                    $member = $members[array_rand($members)];
                    $uniqueMemberIds[$member->id] = true;
                    
                    $amount = round(mt_rand(1000, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-02-' . str_pad(mt_rand(1, 28), 2, '0', STR_PAD_LEFT),
                    ]);
                    
                    $totalAmount += $amount;
                }
                
                $uniqueMemberCount = count($uniqueMemberIds);
                $expectedAverage = $uniqueMemberCount > 0 ? $totalAmount / $uniqueMemberCount : 0;
                
                // Calculate average using the service
                $calculatedAverage = $this->financeService->calculateAveragePerMember($startDate, $endDate);
                
                // Property: Average per member must equal total / unique member count
                $this->assertEquals(
                    round($expectedAverage, 2),
                    round($calculatedAverage, 2),
                    "Calculated average per member ({$calculatedAverage}) should equal total ({$totalAmount}) / unique members ({$uniqueMemberCount}) = {$expectedAverage}"
                );
            });
    }

    /**
     * Test that calculations work correctly with mixed member and anonymous tithes.
     * 
     * @test
     */
    public function calculations_handle_mixed_member_and_anonymous_tithes()
    {
        $this->forAll(
            Generators::choose(3, 12), // Number of member tithes
            Generators::choose(1, 8)   // Number of anonymous tithes
        )
            ->withMaxSize(100)
            ->then(function ($memberTitheCount, $anonymousTitheCount) {
                // Clear all existing tithes to ensure clean state
                Tithe::query()->delete();
                Member::query()->delete();
                
                // Create members
                $members = [];
                for ($i = 0; $i < 5; $i++) {
                    $members[] = Member::factory()->create();
                }
                
                $startDate = '2024-03-01';
                $endDate = '2024-03-31';
                $totalAmount = 0;
                $uniqueMemberIds = [];
                
                // Create member tithes
                for ($i = 0; $i < $memberTitheCount; $i++) {
                    $member = $members[array_rand($members)];
                    $uniqueMemberIds[$member->id] = true;
                    
                    $amount = round(mt_rand(1000, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-03-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                    
                    $totalAmount += $amount;
                }
                
                // Create anonymous tithes (member_id = null)
                for ($i = 0; $i < $anonymousTitheCount; $i++) {
                    $amount = round(mt_rand(1000, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => null,
                        'amount' => $amount,
                        'date' => '2024-03-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                    
                    $totalAmount += $amount;
                }
                
                // Calculate totals
                $calculatedTotal = $this->financeService->calculateTotalGiving($startDate, $endDate);
                
                // Property: Total should include both member and anonymous tithes
                $this->assertEquals(
                    round($totalAmount, 2),
                    round($calculatedTotal, 2),
                    "Total giving should include both member and anonymous tithes"
                );
                
                // Calculate average per member
                $uniqueMemberCount = count($uniqueMemberIds);
                $expectedAverage = $uniqueMemberCount > 0 ? $totalAmount / $uniqueMemberCount : 0;
                $calculatedAverage = $this->financeService->calculateAveragePerMember($startDate, $endDate);
                
                // Property: Average should be based on unique members only (excluding anonymous)
                $this->assertEquals(
                    round($expectedAverage, 2),
                    round($calculatedAverage, 2),
                    "Average per member should be total / unique members (excluding anonymous)"
                );
            });
    }

    /**
     * Test that calculations respect date range boundaries.
     * 
     * @test
     */
    public function calculations_respect_date_range_boundaries()
    {
        $this->forAll(
            Generators::choose(2, 10)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear all existing tithes to ensure clean state
                Tithe::query()->delete();
                Member::query()->delete();
                
                $member = Member::factory()->create();
                
                // Create tithes before, during, and after the target date range
                $beforeAmount = 0;
                $duringAmount = 0;
                $afterAmount = 0;
                
                for ($i = 0; $i < $titheCount; $i++) {
                    $amount = round(mt_rand(1000, 50000) / 100, 2);
                    
                    // Before range
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2023-12-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                    $beforeAmount += $amount;
                    
                    // During range
                    $duringTitheAmount = round(mt_rand(1000, 50000) / 100, 2);
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $duringTitheAmount,
                        'date' => '2024-01-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                    $duringAmount += $duringTitheAmount;
                    
                    // After range
                    $afterTitheAmount = round(mt_rand(1000, 50000) / 100, 2);
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $afterTitheAmount,
                        'date' => '2024-02-' . str_pad(mt_rand(1, 28), 2, '0', STR_PAD_LEFT),
                    ]);
                    $afterAmount += $afterTitheAmount;
                }
                
                // Calculate for the middle date range only
                $startDate = '2024-01-01';
                $endDate = '2024-01-31';
                $calculatedTotal = $this->financeService->calculateTotalGiving($startDate, $endDate);
                
                // Property: Only tithes within date range should be included
                $this->assertEquals(
                    round($duringAmount, 2),
                    round($calculatedTotal, 2),
                    "Total should only include tithes within the specified date range"
                );
                
                // Verify it doesn't include before or after amounts
                $this->assertNotEquals(
                    round($beforeAmount + $duringAmount + $afterAmount, 2),
                    round($calculatedTotal, 2),
                    "Total should not include tithes outside the date range"
                );
            });
    }

    /**
     * Test that calculations handle edge case of zero tithes.
     * 
     * @test
     */
    public function calculations_handle_zero_tithes()
    {
        // Clear all existing tithes to ensure clean state
        Tithe::query()->delete();
        
        $startDate = '2024-04-01';
        $endDate = '2024-04-30';
        
        // Calculate with no tithes
        $calculatedTotal = $this->financeService->calculateTotalGiving($startDate, $endDate);
        $calculatedAverage = $this->financeService->calculateAveragePerMember($startDate, $endDate);
        
        // Property: Zero tithes should result in zero totals and averages
        $this->assertEquals(
            0,
            $calculatedTotal,
            "Total giving should be 0 when no tithes exist"
        );
        
        $this->assertEquals(
            0,
            $calculatedAverage,
            "Average per member should be 0 when no tithes exist"
        );
    }

    /**
     * Test that calculations handle edge case of all anonymous tithes.
     * 
     * @test
     */
    public function calculations_handle_all_anonymous_tithes()
    {
        $this->forAll(
            Generators::choose(1, 10)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear all existing tithes to ensure clean state
                Tithe::query()->delete();
                
                $startDate = '2024-05-01';
                $endDate = '2024-05-31';
                $totalAmount = 0;
                
                // Create only anonymous tithes
                for ($i = 0; $i < $titheCount; $i++) {
                    $amount = round(mt_rand(1000, 50000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => null,
                        'amount' => $amount,
                        'date' => '2024-05-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                    
                    $totalAmount += $amount;
                }
                
                // Calculate totals
                $calculatedTotal = $this->financeService->calculateTotalGiving($startDate, $endDate);
                $calculatedAverage = $this->financeService->calculateAveragePerMember($startDate, $endDate);
                
                // Property: Total should include anonymous tithes
                $this->assertEquals(
                    round($totalAmount, 2),
                    round($calculatedTotal, 2),
                    "Total giving should include anonymous tithes"
                );
                
                // Property: Average should be 0 when no members gave
                $this->assertEquals(
                    0,
                    $calculatedAverage,
                    "Average per member should be 0 when all tithes are anonymous"
                );
            });
    }

    /**
     * Test that calculations handle single member giving multiple times.
     * 
     * @test
     */
    public function calculations_handle_single_member_multiple_tithes()
    {
        $this->forAll(
            Generators::choose(2, 15)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear all existing tithes to ensure clean state
                Tithe::query()->delete();
                Member::query()->delete();
                
                $member = Member::factory()->create();
                
                $startDate = '2024-06-01';
                $endDate = '2024-06-30';
                $totalAmount = 0;
                
                // Create multiple tithes from the same member
                for ($i = 0; $i < $titheCount; $i++) {
                    $amount = round(mt_rand(1000, 50000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-06-' . str_pad(mt_rand(1, 30), 2, '0', STR_PAD_LEFT),
                    ]);
                    
                    $totalAmount += $amount;
                }
                
                // Calculate totals
                $calculatedTotal = $this->financeService->calculateTotalGiving($startDate, $endDate);
                $calculatedAverage = $this->financeService->calculateAveragePerMember($startDate, $endDate);
                
                // Property: Total should be sum of all tithes
                $this->assertEquals(
                    round($totalAmount, 2),
                    round($calculatedTotal, 2),
                    "Total giving should be sum of all tithes from single member"
                );
                
                // Property: Average should equal total (only 1 unique member)
                $this->assertEquals(
                    round($totalAmount, 2),
                    round($calculatedAverage, 2),
                    "Average per member should equal total when only one member gave"
                );
            });
    }

    /**
     * Test that calculations maintain precision with decimal amounts.
     * 
     * @test
     */
    public function calculations_maintain_decimal_precision()
    {
        $this->forAll(
            Generators::choose(3, 10)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear all existing tithes to ensure clean state
                Tithe::query()->delete();
                Member::query()->delete();
                
                $members = [];
                for ($i = 0; $i < 3; $i++) {
                    $members[] = Member::factory()->create();
                }
                
                $startDate = '2024-07-01';
                $endDate = '2024-07-31';
                $totalAmount = 0;
                $uniqueMemberIds = [];
                
                // Create tithes with precise decimal amounts
                for ($i = 0; $i < $titheCount; $i++) {
                    $member = $members[array_rand($members)];
                    $uniqueMemberIds[$member->id] = true;
                    
                    // Use precise decimal amounts like 123.45, 67.89, etc.
                    $amount = round(mt_rand(100, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-07-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                    ]);
                    
                    $totalAmount += $amount;
                }
                
                // Calculate totals
                $calculatedTotal = $this->financeService->calculateTotalGiving($startDate, $endDate);
                
                // Property: Decimal precision should be maintained (2 decimal places)
                $this->assertEquals(
                    round($totalAmount, 2),
                    round($calculatedTotal, 2),
                    "Calculations should maintain 2 decimal place precision"
                );
                
                // Verify the total matches when formatted to 2 decimal places
                $formattedTotal = number_format($calculatedTotal, 2, '.', '');
                $formattedExpected = number_format($totalAmount, 2, '.', '');
                
                $this->assertEquals(
                    $formattedExpected,
                    $formattedTotal,
                    "Calculated total should maintain 2 decimal place precision"
                );
            });
    }
}
