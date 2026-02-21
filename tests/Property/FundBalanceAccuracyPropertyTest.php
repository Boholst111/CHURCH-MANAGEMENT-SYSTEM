<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Fund;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\FundTransfer;
use App\Models\Member;
use App\Models\OfferingType;
use App\Models\ExpenseCategory;
use App\Models\User;
use App\Repositories\FundRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * Property-Based Test for Fund Balance Accuracy
 * 
 * Feature: finance-management-system
 * Property 34: Fund Balance Accuracy
 * **Validates: Requirements 13.4**
 * 
 * Property: For any fund, the current balance should equal the sum of all offering 
 * amounts credited to the fund minus the sum of all expense amounts charged to the 
 * fund minus the sum of all transfers out plus the sum of all transfers in.
 */
class FundBalanceAccuracyPropertyTest extends TestCase
{
    use RefreshDatabase;

    protected FundRepository $fundRepository;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize repository
        $this->fundRepository = new FundRepository();
    }

    /**
     * Test that fund balance equals offerings minus expenses for various transaction counts.
     * 
     * @test
     */
    public function fund_balance_equals_offerings_minus_expenses()
    {
        // Test with different combinations of offerings and expenses
        $testCases = [
            ['offerings' => 3, 'expenses' => 2],
            ['offerings' => 5, 'expenses' => 3],
            ['offerings' => 2, 'expenses' => 4],
            ['offerings' => 1, 'expenses' => 1],
        ];
        
        foreach ($testCases as $case) {
            // Create test data
            $fund = Fund::factory()->create([
                'name' => 'Test Fund ' . uniqid(),
                'type' => 'unrestricted',
                'current_balance' => 0,
            ]);
            
            $member = Member::factory()->create();
            $offeringType = OfferingType::firstOrCreate(
                ['name' => 'Test Offering Type'],
                ['description' => 'For testing', 'is_active' => true]
            );
            $expenseCategory = ExpenseCategory::firstOrCreate(
                ['name' => 'Test Expense Category'],
                ['description' => 'For testing', 'is_active' => true]
            );
            
            // Create offerings
            $totalOfferings = 0;
            for ($i = 0; $i < $case['offerings']; $i++) {
                $amount = rand(100, 1000) / 100; // $1.00 to $10.00
                $totalOfferings += $amount;
                
                Offering::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'payment_method' => 'cash',
                    'date' => now()->subDays($i),
                ]);
            }
            
            // Create expenses
            $totalExpenses = 0;
            for ($i = 0; $i < $case['expenses']; $i++) {
                $amount = rand(50, 500) / 100; // $0.50 to $5.00
                $totalExpenses += $amount;
                
                Expense::create([
                    'expense_category_id' => $expenseCategory->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'date' => now()->subDays($i),
                    'description' => 'Test expense',
                    'approval_status' => 'approved',
                ]);
            }
            
            // Calculate expected balance
            $expectedBalance = $totalOfferings - $totalExpenses;
            
            // Get actual balance from repository
            $actualBalance = $this->fundRepository->calculateBalance($fund->id);
            
            // Property: Balance should equal offerings minus expenses
            $this->assertEquals(
                round($expectedBalance, 2),
                round($actualBalance, 2),
                "Fund balance should equal sum of offerings minus sum of expenses. " .
                "Expected: " . round($expectedBalance, 2) . ", " .
                "Actual: " . round($actualBalance, 2) . ", " .
                "Offerings: {$totalOfferings}, Expenses: {$totalExpenses}"
            );
        }
    }

    /**
     * Test that fund balance includes transfers in and out.
     * 
     * @test
     */
    public function fund_balance_includes_transfers()
    {
        // Test with different combinations
        $testCases = [
            ['offerings' => 2, 'expenses' => 2, 'transfersIn' => 2, 'transfersOut' => 1],
            ['offerings' => 3, 'expenses' => 1, 'transfersIn' => 1, 'transfersOut' => 2],
        ];
        
        foreach ($testCases as $case) {
            // Create test data
            $fund = Fund::factory()->create([
                'name' => 'Test Fund ' . uniqid(),
                'type' => 'unrestricted',
                'current_balance' => 0,
            ]);
            
            $otherFund = Fund::factory()->create([
                'name' => 'Other Fund ' . uniqid(),
                'type' => 'unrestricted',
                'current_balance' => 0,
            ]);
            
            $member = Member::factory()->create();
            $user = User::factory()->create();
            $offeringType = OfferingType::firstOrCreate(
                ['name' => 'Test Offering Type'],
                ['description' => 'For testing', 'is_active' => true]
            );
            $expenseCategory = ExpenseCategory::firstOrCreate(
                ['name' => 'Test Expense Category'],
                ['description' => 'For testing', 'is_active' => true]
            );
            
            // Create offerings
            $totalOfferings = 0;
            for ($i = 0; $i < $case['offerings']; $i++) {
                $amount = rand(100, 1000) / 100;
                $totalOfferings += $amount;
                
                Offering::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'payment_method' => 'cash',
                    'date' => now()->subDays($i),
                ]);
            }
            
            // Create expenses
            $totalExpenses = 0;
            for ($i = 0; $i < $case['expenses']; $i++) {
                $amount = rand(50, 500) / 100;
                $totalExpenses += $amount;
                
                Expense::create([
                    'expense_category_id' => $expenseCategory->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'date' => now()->subDays($i),
                    'description' => 'Test expense',
                    'approval_status' => 'approved',
                ]);
            }
            
            // Create transfers in (from other fund to our fund)
            $totalTransfersIn = 0;
            for ($i = 0; $i < $case['transfersIn']; $i++) {
                $amount = rand(50, 300) / 100;
                $totalTransfersIn += $amount;
                
                FundTransfer::create([
                    'from_fund_id' => $otherFund->id,
                    'to_fund_id' => $fund->id,
                    'amount' => $amount,
                    'date' => now()->subDays($i),
                    'reason' => 'Test transfer in',
                    'created_by' => $user->id,
                ]);
            }
            
            // Create transfers out (from our fund to other fund)
            $totalTransfersOut = 0;
            for ($i = 0; $i < $case['transfersOut']; $i++) {
                $amount = rand(50, 300) / 100;
                $totalTransfersOut += $amount;
                
                FundTransfer::create([
                    'from_fund_id' => $fund->id,
                    'to_fund_id' => $otherFund->id,
                    'amount' => $amount,
                    'date' => now()->subDays($i),
                    'reason' => 'Test transfer out',
                    'created_by' => $user->id,
                ]);
            }
            
            // Calculate expected balance
            $expectedBalance = $totalOfferings + $totalTransfersIn - $totalExpenses - $totalTransfersOut;
            
            // Get actual balance from repository
            $actualBalance = $this->fundRepository->calculateBalance($fund->id);
            
            // Property: Balance should equal offerings + transfers in - expenses - transfers out
            $this->assertEquals(
                round($expectedBalance, 2),
                round($actualBalance, 2),
                "Fund balance should equal (offerings + transfers in) - (expenses + transfers out). " .
                "Expected: " . round($expectedBalance, 2) . ", " .
                "Actual: " . round($actualBalance, 2) . ", " .
                "Offerings: {$totalOfferings}, Expenses: {$totalExpenses}, " .
                "Transfers In: {$totalTransfersIn}, Transfers Out: {$totalTransfersOut}"
            );
        }
    }

    /**
     * Test that fund with no transactions has zero balance.
     * 
     * @test
     */
    public function fund_with_no_transactions_has_zero_balance()
    {
        // Create a fund with no transactions
        $fund = Fund::factory()->create([
            'name' => 'Empty Fund',
            'type' => 'unrestricted',
            'current_balance' => 0,
        ]);
        
        // Get balance
        $balance = $this->fundRepository->calculateBalance($fund->id);
        
        // Property: Balance should be zero
        $this->assertEquals(
            0,
            $balance,
            "Fund with no transactions should have zero balance"
        );
    }

    /**
     * Test that fund balance is accurate with only offerings.
     * 
     * @test
     */
    public function fund_balance_with_only_offerings()
    {
        $testCases = [2, 3, 5];
        
        foreach ($testCases as $offeringCount) {
            // Create test data
            $fund = Fund::factory()->create([
                'name' => 'Test Fund ' . uniqid(),
                'type' => 'unrestricted',
                'current_balance' => 0,
            ]);
            
            $member = Member::factory()->create();
            $offeringType = OfferingType::firstOrCreate(
                ['name' => 'Test Offering Type'],
                ['description' => 'For testing', 'is_active' => true]
            );
            
            // Create offerings
            $totalOfferings = 0;
            for ($i = 0; $i < $offeringCount; $i++) {
                $amount = rand(100, 1000) / 100;
                $totalOfferings += $amount;
                
                Offering::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'payment_method' => 'cash',
                    'date' => now()->subDays($i),
                ]);
            }
            
            // Get balance
            $balance = $this->fundRepository->calculateBalance($fund->id);
            
            // Property: Balance should equal sum of offerings
            $this->assertEquals(
                round($totalOfferings, 2),
                round($balance, 2),
                "Fund balance with only offerings should equal sum of offerings"
            );
        }
    }

    /**
     * Test that fund balance is accurate with only expenses.
     * 
     * @test
     */
    public function fund_balance_with_only_expenses()
    {
        $testCases = [2, 3, 5];
        
        foreach ($testCases as $expenseCount) {
            // Create test data
            $fund = Fund::factory()->create([
                'name' => 'Test Fund ' . uniqid(),
                'type' => 'unrestricted',
                'current_balance' => 0,
            ]);
            
            $expenseCategory = ExpenseCategory::firstOrCreate(
                ['name' => 'Test Expense Category'],
                ['description' => 'For testing', 'is_active' => true]
            );
            
            // Create expenses
            $totalExpenses = 0;
            for ($i = 0; $i < $expenseCount; $i++) {
                $amount = rand(50, 500) / 100;
                $totalExpenses += $amount;
                
                Expense::create([
                    'expense_category_id' => $expenseCategory->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'date' => now()->subDays($i),
                    'description' => 'Test expense',
                    'approval_status' => 'approved',
                ]);
            }
            
            // Get balance
            $balance = $this->fundRepository->calculateBalance($fund->id);
            
            // Property: Balance should be negative sum of expenses
            $this->assertEquals(
                round(-$totalExpenses, 2),
                round($balance, 2),
                "Fund balance with only expenses should be negative sum of expenses"
            );
        }
    }

    /**
     * Test that balance calculation is consistent across multiple queries.
     * 
     * @test
     */
    public function fund_balance_is_consistent_across_queries()
    {
        $testCases = [
            ['offerings' => 2, 'expenses' => 2],
            ['offerings' => 3, 'expenses' => 1],
        ];
        
        foreach ($testCases as $case) {
            // Create test data
            $fund = Fund::factory()->create([
                'name' => 'Test Fund ' . uniqid(),
                'type' => 'unrestricted',
                'current_balance' => 0,
            ]);
            
            $member = Member::factory()->create();
            $offeringType = OfferingType::firstOrCreate(
                ['name' => 'Test Offering Type'],
                ['description' => 'For testing', 'is_active' => true]
            );
            $expenseCategory = ExpenseCategory::firstOrCreate(
                ['name' => 'Test Expense Category'],
                ['description' => 'For testing', 'is_active' => true]
            );
            
            // Create offerings
            for ($i = 0; $i < $case['offerings']; $i++) {
                $amount = rand(100, 1000) / 100;
                
                Offering::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'payment_method' => 'cash',
                    'date' => now()->subDays($i),
                ]);
            }
            
            // Create expenses
            for ($i = 0; $i < $case['expenses']; $i++) {
                $amount = rand(50, 500) / 100;
                
                Expense::create([
                    'expense_category_id' => $expenseCategory->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'date' => now()->subDays($i),
                    'description' => 'Test expense',
                    'approval_status' => 'approved',
                ]);
            }
            
            // Query balance multiple times
            $balance1 = $this->fundRepository->calculateBalance($fund->id);
            $balance2 = $this->fundRepository->calculateBalance($fund->id);
            $balance3 = $this->fundRepository->calculateBalance($fund->id);
            
            // Property: Balance should be consistent across queries
            $this->assertEquals(
                round($balance1, 2),
                round($balance2, 2),
                "Balance should be consistent across queries"
            );
            
            $this->assertEquals(
                round($balance2, 2),
                round($balance3, 2),
                "Balance should be consistent across queries"
            );
        }
    }

    /**
     * Test that balance calculation handles decimal amounts correctly.
     * 
     * @test
     */
    public function fund_balance_handles_decimal_amounts_correctly()
    {
        // Create test data
        $fund = Fund::factory()->create([
            'name' => 'Decimal Test Fund',
            'type' => 'unrestricted',
            'current_balance' => 0,
        ]);
        
        $member = Member::factory()->create();
        $offeringType = OfferingType::firstOrCreate(
            ['name' => 'Test Offering Type'],
            ['description' => 'For testing', 'is_active' => true]
        );
        $expenseCategory = ExpenseCategory::firstOrCreate(
            ['name' => 'Test Expense Category'],
            ['description' => 'For testing', 'is_active' => true]
        );
        
        // Create offerings with decimal amounts
        $offeringAmounts = [10.50, 25.75, 33.33, 15.99];
        $totalOfferings = array_sum($offeringAmounts);
        
        foreach ($offeringAmounts as $amount) {
            Offering::create([
                'member_id' => $member->id,
                'offering_type_id' => $offeringType->id,
                'fund_id' => $fund->id,
                'amount' => $amount,
                'payment_method' => 'cash',
                'date' => now(),
            ]);
        }
        
        // Create expenses with decimal amounts
        $expenseAmounts = [5.25, 12.50, 7.89];
        $totalExpenses = array_sum($expenseAmounts);
        
        foreach ($expenseAmounts as $amount) {
            Expense::create([
                'expense_category_id' => $expenseCategory->id,
                'fund_id' => $fund->id,
                'amount' => $amount,
                'date' => now(),
                'description' => 'Test expense',
                'approval_status' => 'approved',
            ]);
        }
        
        // Calculate expected balance
        $expectedBalance = $totalOfferings - $totalExpenses;
        
        // Get actual balance
        $actualBalance = $this->fundRepository->calculateBalance($fund->id);
        
        // Property: Balance calculation should handle decimals correctly
        $this->assertEquals(
            round($expectedBalance, 2),
            round($actualBalance, 2),
            "Balance calculation should handle decimal amounts correctly"
        );
    }

    /**
     * Test that only transactions linked to the fund are counted.
     * 
     * @test
     */
    public function only_fund_transactions_are_counted_in_balance()
    {
        $testCases = [
            ['fundOfferings' => 2, 'otherOfferings' => 2, 'fundExpenses' => 2, 'otherExpenses' => 2],
            ['fundOfferings' => 3, 'otherOfferings' => 1, 'fundExpenses' => 1, 'otherExpenses' => 3],
        ];
        
        foreach ($testCases as $case) {
            // Create test data
            $fund = Fund::factory()->create([
                'name' => 'Test Fund ' . uniqid(),
                'type' => 'unrestricted',
                'current_balance' => 0,
            ]);
            
            $otherFund = Fund::factory()->create([
                'name' => 'Other Fund ' . uniqid(),
                'type' => 'unrestricted',
                'current_balance' => 0,
            ]);
            
            $member = Member::factory()->create();
            $offeringType = OfferingType::firstOrCreate(
                ['name' => 'Test Offering Type'],
                ['description' => 'For testing', 'is_active' => true]
            );
            $expenseCategory = ExpenseCategory::firstOrCreate(
                ['name' => 'Test Expense Category'],
                ['description' => 'For testing', 'is_active' => true]
            );
            
            // Create offerings for our fund
            $totalFundOfferings = 0;
            for ($i = 0; $i < $case['fundOfferings']; $i++) {
                $amount = rand(100, 1000) / 100;
                $totalFundOfferings += $amount;
                
                Offering::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'payment_method' => 'cash',
                    'date' => now()->subDays($i),
                ]);
            }
            
            // Create offerings for other fund (should not be counted)
            for ($i = 0; $i < $case['otherOfferings']; $i++) {
                $amount = rand(100, 1000) / 100;
                
                Offering::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'fund_id' => $otherFund->id,
                    'amount' => $amount,
                    'payment_method' => 'cash',
                    'date' => now()->subDays($i),
                ]);
            }
            
            // Create expenses for our fund
            $totalFundExpenses = 0;
            for ($i = 0; $i < $case['fundExpenses']; $i++) {
                $amount = rand(50, 500) / 100;
                $totalFundExpenses += $amount;
                
                Expense::create([
                    'expense_category_id' => $expenseCategory->id,
                    'fund_id' => $fund->id,
                    'amount' => $amount,
                    'date' => now()->subDays($i),
                    'description' => 'Test expense',
                    'approval_status' => 'approved',
                ]);
            }
            
            // Create expenses for other fund (should not be counted)
            for ($i = 0; $i < $case['otherExpenses']; $i++) {
                $amount = rand(50, 500) / 100;
                
                Expense::create([
                    'expense_category_id' => $expenseCategory->id,
                    'fund_id' => $otherFund->id,
                    'amount' => $amount,
                    'date' => now()->subDays($i),
                    'description' => 'Test expense',
                    'approval_status' => 'approved',
                ]);
            }
            
            // Calculate expected balance (only our fund's transactions)
            $expectedBalance = $totalFundOfferings - $totalFundExpenses;
            
            // Get actual balance
            $actualBalance = $this->fundRepository->calculateBalance($fund->id);
            
            // Property: Only transactions linked to the fund should be counted
            $this->assertEquals(
                round($expectedBalance, 2),
                round($actualBalance, 2),
                "Only transactions linked to the fund should be counted in balance. " .
                "Expected: " . round($expectedBalance, 2) . ", " .
                "Actual: " . round($actualBalance, 2)
            );
        }
    }

    /**
     * Test that balance calculation matches the formula exactly.
     * 
     * @test
     */
    public function balance_formula_is_accurate()
    {
        // Create test data with known amounts
        $fund = Fund::factory()->create([
            'name' => 'Formula Test Fund',
            'type' => 'unrestricted',
            'current_balance' => 0,
        ]);
        
        $otherFund = Fund::factory()->create([
            'name' => 'Other Fund',
            'type' => 'unrestricted',
            'current_balance' => 0,
        ]);
        
        $member = Member::factory()->create();
        $user = User::factory()->create();
        $offeringType = OfferingType::firstOrCreate(
            ['name' => 'Test Offering Type'],
            ['description' => 'For testing', 'is_active' => true]
        );
        $expenseCategory = ExpenseCategory::firstOrCreate(
            ['name' => 'Test Expense Category'],
            ['description' => 'For testing', 'is_active' => true]
        );
        
        // Create known transactions
        $offering1 = 100.00;
        $offering2 = 250.50;
        $expense1 = 50.25;
        $expense2 = 75.00;
        $transferIn = 30.00;
        $transferOut = 20.00;
        
        Offering::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'fund_id' => $fund->id,
            'amount' => $offering1,
            'payment_method' => 'cash',
            'date' => now(),
        ]);
        
        Offering::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'fund_id' => $fund->id,
            'amount' => $offering2,
            'payment_method' => 'cash',
            'date' => now(),
        ]);
        
        Expense::create([
            'expense_category_id' => $expenseCategory->id,
            'fund_id' => $fund->id,
            'amount' => $expense1,
            'date' => now(),
            'description' => 'Test expense',
            'approval_status' => 'approved',
        ]);
        
        Expense::create([
            'expense_category_id' => $expenseCategory->id,
            'fund_id' => $fund->id,
            'amount' => $expense2,
            'date' => now(),
            'description' => 'Test expense',
            'approval_status' => 'approved',
        ]);
        
        FundTransfer::create([
            'from_fund_id' => $otherFund->id,
            'to_fund_id' => $fund->id,
            'amount' => $transferIn,
            'date' => now(),
            'reason' => 'Test transfer in',
            'created_by' => $user->id,
        ]);
        
        FundTransfer::create([
            'from_fund_id' => $fund->id,
            'to_fund_id' => $otherFund->id,
            'amount' => $transferOut,
            'date' => now(),
            'reason' => 'Test transfer out',
            'created_by' => $user->id,
        ]);
        
        // Calculate expected balance using the formula
        $expectedBalance = ($offering1 + $offering2) + $transferIn - ($expense1 + $expense2) - $transferOut;
        
        // Get actual balance
        $actualBalance = $this->fundRepository->calculateBalance($fund->id);
        
        // Property: Balance should match the exact formula
        $this->assertEquals(
            round($expectedBalance, 2),
            round($actualBalance, 2),
            "Balance should match formula: (offerings + transfers in) - (expenses + transfers out). " .
            "Expected: {$expectedBalance}, Actual: {$actualBalance}"
        );
        
        // Verify the exact calculation
        $this->assertEquals(
            235.25, // 100 + 250.50 + 30 - 50.25 - 75 - 20
            round($actualBalance, 2),
            "Balance should be exactly 235.25"
        );
    }
}
