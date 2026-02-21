<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Repositories\BudgetRepository;
use App\Models\Budget;
use App\Models\BudgetItem;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BudgetRepositoryIntegrationTest extends TestCase
{
    use RefreshDatabase;

    protected BudgetRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new BudgetRepository();
    }

    /** @test */
    public function it_calculates_variance_correctly_for_complex_budget()
    {
        // Create multiple offering types and expense categories
        $titheType = OfferingType::factory()->create(['name' => 'Tithes']);
        $missionType = OfferingType::factory()->create(['name' => 'Missions']);
        
        $salaryCategory = ExpenseCategory::factory()->create(['name' => 'Salaries']);
        $utilitiesCategory = ExpenseCategory::factory()->create(['name' => 'Utilities']);

        $budget = Budget::factory()->create([
            'name' => 'Annual Budget 2025',
            'period_type' => 'annually',
            'start_date' => '2025-01-01',
            'end_date' => '2025-12-31',
        ]);

        // Create budget items
        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'income',
            'category_id' => $titheType->id,
            'budgeted_amount' => 120000.00,
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'income',
            'category_id' => $missionType->id,
            'budgeted_amount' => 30000.00,
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $salaryCategory->id,
            'budgeted_amount' => 80000.00,
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $utilitiesCategory->id,
            'budgeted_amount' => 20000.00,
        ]);

        // Create actual transactions
        Offering::factory()->create([
            'offering_type_id' => $titheType->id,
            'amount' => 130000.00,
            'date' => '2025-06-15',
        ]);

        Offering::factory()->create([
            'offering_type_id' => $missionType->id,
            'amount' => 25000.00,
            'date' => '2025-06-15',
        ]);

        Expense::factory()->create([
            'expense_category_id' => $salaryCategory->id,
            'amount' => 85000.00,
            'date' => '2025-06-15',
        ]);

        Expense::factory()->create([
            'expense_category_id' => $utilitiesCategory->id,
            'amount' => 18000.00,
            'date' => '2025-06-15',
        ]);

        $variance = $this->repository->calculateVariance($budget->id);

        // Verify tithes variance
        $titheVariance = collect($variance)->firstWhere('category_id', $titheType->id);
        $this->assertEquals(120000.00, $titheVariance['budgeted_amount']);
        $this->assertEquals(130000.00, $titheVariance['actual_amount']);
        $this->assertEquals(10000.00, $titheVariance['variance_amount']);
        $this->assertEquals(8.33, $titheVariance['variance_percentage']);

        // Verify missions variance
        $missionVariance = collect($variance)->firstWhere('category_id', $missionType->id);
        $this->assertEquals(30000.00, $missionVariance['budgeted_amount']);
        $this->assertEquals(25000.00, $missionVariance['actual_amount']);
        $this->assertEquals(-5000.00, $missionVariance['variance_amount']);
        $this->assertEquals(-16.67, $missionVariance['variance_percentage']);

        // Verify salary variance
        $salaryVariance = collect($variance)->where('category_type', 'expense')
            ->firstWhere('category_id', $salaryCategory->id);
        $this->assertEquals(80000.00, $salaryVariance['budgeted_amount']);
        $this->assertEquals(85000.00, $salaryVariance['actual_amount']);
        $this->assertEquals(5000.00, $salaryVariance['variance_amount']);
    }

    /** @test */
    public function it_generates_comprehensive_budget_summary()
    {
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        $budget = Budget::factory()->create([
            'name' => 'Monthly Budget',
            'period_type' => 'monthly',
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'income',
            'category_id' => $offeringType->id,
            'budgeted_amount' => 50000.00,
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory->id,
            'budgeted_amount' => 30000.00,
        ]);

        // Create multiple transactions
        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 20000.00,
            'date' => '2025-01-10',
        ]);

        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 25000.00,
            'date' => '2025-01-20',
        ]);

        Expense::factory()->create([
            'expense_category_id' => $expenseCategory->id,
            'amount' => 15000.00,
            'date' => '2025-01-15',
        ]);

        Expense::factory()->create([
            'expense_category_id' => $expenseCategory->id,
            'amount' => 12000.00,
            'date' => '2025-01-25',
        ]);

        $summary = $this->repository->getSummary($budget->id);

        $this->assertEquals(50000.00, $summary['income']['budgeted']);
        $this->assertEquals(45000.00, $summary['income']['actual']);
        $this->assertEquals(-5000.00, $summary['income']['variance']);
        $this->assertEquals(-10.00, $summary['income']['variance_percentage']);

        $this->assertEquals(30000.00, $summary['expense']['budgeted']);
        $this->assertEquals(27000.00, $summary['expense']['actual']);
        $this->assertEquals(-3000.00, $summary['expense']['variance']);
        $this->assertEquals(-10.00, $summary['expense']['variance_percentage']);

        $this->assertEquals(20000.00, $summary['net']['budgeted']); // 50000 - 30000
        $this->assertEquals(18000.00, $summary['net']['actual']); // 45000 - 27000
        $this->assertEquals(-2000.00, $summary['net']['variance']); // 18000 - 20000
    }

    /** @test */
    public function it_identifies_budget_items_exceeding_threshold()
    {
        $expenseCategory1 = ExpenseCategory::factory()->create(['name' => 'Category 1']);
        $expenseCategory2 = ExpenseCategory::factory()->create(['name' => 'Category 2']);
        $expenseCategory3 = ExpenseCategory::factory()->create(['name' => 'Category 3']);

        $budget = Budget::factory()->create([
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        // Category 1: 90% used (should be flagged)
        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory1->id,
            'budgeted_amount' => 10000.00,
        ]);

        Expense::factory()->create([
            'expense_category_id' => $expenseCategory1->id,
            'amount' => 9000.00,
            'date' => '2025-01-15',
        ]);

        // Category 2: 75% used (should not be flagged)
        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory2->id,
            'budgeted_amount' => 10000.00,
        ]);

        Expense::factory()->create([
            'expense_category_id' => $expenseCategory2->id,
            'amount' => 7500.00,
            'date' => '2025-01-15',
        ]);

        // Category 3: 85% used (should be flagged)
        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory3->id,
            'budgeted_amount' => 10000.00,
        ]);

        Expense::factory()->create([
            'expense_category_id' => $expenseCategory3->id,
            'amount' => 8500.00,
            'date' => '2025-01-15',
        ]);

        $exceeding = $this->repository->getItemsExceedingThreshold($budget->id, 80.0);

        $this->assertCount(2, $exceeding);
        
        $categoryIds = collect($exceeding)->pluck('category_id')->toArray();
        $this->assertContains($expenseCategory1->id, $categoryIds);
        $this->assertContains($expenseCategory3->id, $categoryIds);
        $this->assertNotContains($expenseCategory2->id, $categoryIds);
    }

    /** @test */
    public function it_identifies_over_budget_items_correctly()
    {
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        $budget = Budget::factory()->create([
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        // Income under budget (should be flagged as "over budget" for income)
        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'income',
            'category_id' => $offeringType->id,
            'budgeted_amount' => 10000.00,
        ]);

        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 8000.00,
            'date' => '2025-01-15',
        ]);

        // Expense over budget (should be flagged)
        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory->id,
            'budgeted_amount' => 5000.00,
        ]);

        Expense::factory()->create([
            'expense_category_id' => $expenseCategory->id,
            'amount' => 6000.00,
            'date' => '2025-01-15',
        ]);

        $overBudget = $this->repository->getOverBudgetItems($budget->id);

        $this->assertCount(2, $overBudget);
        
        // Check income item (under budget)
        $incomeItem = collect($overBudget)->firstWhere('category_type', 'income');
        $this->assertEquals(-2000.00, $incomeItem['variance_amount']);
        
        // Check expense item (over budget)
        $expenseItem = collect($overBudget)->firstWhere('category_type', 'expense');
        $this->assertEquals(1000.00, $expenseItem['variance_amount']);
    }

    /** @test */
    public function it_copies_budget_with_all_items_and_structure()
    {
        $offeringType1 = OfferingType::factory()->create();
        $offeringType2 = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        $sourceBudget = Budget::factory()->create([
            'name' => 'Q1 2025',
            'period_type' => 'quarterly',
            'start_date' => '2025-01-01',
            'end_date' => '2025-03-31',
            'notes' => 'First quarter budget',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $sourceBudget->id,
            'category_type' => 'income',
            'category_id' => $offeringType1->id,
            'budgeted_amount' => 30000.00,
            'notes' => 'Tithe income',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $sourceBudget->id,
            'category_type' => 'income',
            'category_id' => $offeringType2->id,
            'budgeted_amount' => 10000.00,
            'notes' => 'Mission income',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $sourceBudget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory->id,
            'budgeted_amount' => 25000.00,
            'notes' => 'Operating expenses',
        ]);

        $newPeriodData = [
            'name' => 'Q2 2025',
            'start_date' => '2025-04-01',
            'end_date' => '2025-06-30',
        ];

        $newBudget = $this->repository->copyBudget($sourceBudget->id, $newPeriodData);

        $this->assertNotNull($newBudget);
        $this->assertEquals('Q2 2025', $newBudget->name);
        $this->assertEquals('quarterly', $newBudget->period_type);
        $this->assertEquals('2025-04-01', $newBudget->start_date->format('Y-m-d'));
        $this->assertEquals('2025-06-30', $newBudget->end_date->format('Y-m-d'));
        
        $this->assertCount(3, $newBudget->items);
        
        // Verify amounts are copied correctly
        $totalBudgeted = $newBudget->items->sum('budgeted_amount');
        $this->assertEquals(65000.00, $totalBudgeted);
    }

    /** @test */
    public function it_handles_multiple_transactions_per_category()
    {
        $offeringType = OfferingType::factory()->create();

        $budget = Budget::factory()->create([
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'income',
            'category_id' => $offeringType->id,
            'budgeted_amount' => 10000.00,
        ]);

        // Create multiple offerings
        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 2000.00,
            'date' => '2025-01-05',
        ]);

        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 3000.00,
            'date' => '2025-01-12',
        ]);

        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 2500.00,
            'date' => '2025-01-19',
        ]);

        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 1500.00,
            'date' => '2025-01-26',
        ]);

        $actualAmounts = $this->repository->calculateActualAmounts($budget->id);

        $this->assertEquals(9000.00, $actualAmounts[0]['actual_amount']);
    }

    /** @test */
    public function it_returns_empty_array_for_nonexistent_budget()
    {
        $actualAmounts = $this->repository->calculateActualAmounts(99999);
        $this->assertEmpty($actualAmounts);

        $variance = $this->repository->calculateVariance(99999);
        $this->assertEmpty($variance);

        $report = $this->repository->getVarianceReport(99999);
        $this->assertEmpty($report);

        $summary = $this->repository->getSummary(99999);
        $this->assertEmpty($summary);
    }
}
