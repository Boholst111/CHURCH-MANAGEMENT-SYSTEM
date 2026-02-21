<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use App\Repositories\BudgetRepository;
use App\Models\Budget;
use App\Models\BudgetItem;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BudgetRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected BudgetRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new BudgetRepository();
    }

    /** @test */
    public function it_can_create_a_budget()
    {
        $data = [
            'name' => 'Q1 2025 Budget',
            'period_type' => 'quarterly',
            'start_date' => '2025-01-01',
            'end_date' => '2025-03-31',
            'is_active' => true,
            'notes' => 'First quarter budget',
        ];

        $budget = $this->repository->create($data);

        $this->assertInstanceOf(Budget::class, $budget);
        $this->assertEquals('Q1 2025 Budget', $budget->name);
        $this->assertEquals('quarterly', $budget->period_type);
    }

    /** @test */
    public function it_can_find_a_budget_by_id()
    {
        $budget = Budget::factory()->create();

        $found = $this->repository->find($budget->id);

        $this->assertInstanceOf(Budget::class, $found);
        $this->assertEquals($budget->id, $found->id);
    }

    /** @test */
    public function it_can_update_a_budget()
    {
        $budget = Budget::factory()->create(['name' => 'Old Name']);

        $result = $this->repository->update($budget->id, ['name' => 'New Name']);

        $this->assertTrue($result);
        $this->assertEquals('New Name', $budget->fresh()->name);
    }

    /** @test */
    public function it_can_delete_a_budget()
    {
        $budget = Budget::factory()->create();

        $result = $this->repository->delete($budget->id);

        $this->assertTrue($result);
        $this->assertNull(Budget::find($budget->id));
    }

    /** @test */
    public function it_can_get_active_budgets()
    {
        Budget::factory()->create(['is_active' => true]);
        Budget::factory()->create(['is_active' => true]);
        Budget::factory()->create(['is_active' => false]);

        $active = $this->repository->getActive();

        $this->assertCount(2, $active);
    }

    /** @test */
    public function it_can_get_budgets_by_period_type()
    {
        Budget::factory()->create(['period_type' => 'monthly']);
        Budget::factory()->create(['period_type' => 'quarterly']);
        Budget::factory()->create(['period_type' => 'monthly']);

        $monthly = $this->repository->getByPeriodType('monthly');

        $this->assertCount(2, $monthly);
    }

    /** @test */
    public function it_can_create_budget_with_items()
    {
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        $budgetData = [
            'name' => 'Test Budget',
            'period_type' => 'monthly',
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
            'is_active' => true,
        ];

        $items = [
            [
                'category_type' => 'income',
                'category_id' => $offeringType->id,
                'budgeted_amount' => 10000.00,
            ],
            [
                'category_type' => 'expense',
                'category_id' => $expenseCategory->id,
                'budgeted_amount' => 5000.00,
            ],
        ];

        $budget = $this->repository->createWithItems($budgetData, $items);

        $this->assertInstanceOf(Budget::class, $budget);
        $this->assertCount(2, $budget->items);
    }

    /** @test */
    public function it_can_calculate_actual_amounts()
    {
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

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

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory->id,
            'budgeted_amount' => 5000.00,
        ]);

        // Create actual transactions
        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 3000.00,
            'date' => '2025-01-15',
        ]);

        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 2000.00,
            'date' => '2025-01-20',
        ]);

        Expense::factory()->create([
            'expense_category_id' => $expenseCategory->id,
            'amount' => 1500.00,
            'date' => '2025-01-10',
        ]);

        $actualAmounts = $this->repository->calculateActualAmounts($budget->id);

        $this->assertCount(2, $actualAmounts);
        $this->assertEquals(5000.00, $actualAmounts[0]['actual_amount']); // Income
        $this->assertEquals(1500.00, $actualAmounts[1]['actual_amount']); // Expense
    }

    /** @test */
    public function it_can_calculate_variance()
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

        // Create actual offering of 12000
        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 12000.00,
            'date' => '2025-01-15',
        ]);

        $variance = $this->repository->calculateVariance($budget->id);

        $this->assertCount(1, $variance);
        $this->assertEquals(10000.00, $variance[0]['budgeted_amount']);
        $this->assertEquals(12000.00, $variance[0]['actual_amount']);
        $this->assertEquals(2000.00, $variance[0]['variance_amount']); // 12000 - 10000
        $this->assertEquals(20.00, $variance[0]['variance_percentage']); // ((12000 - 10000) / 10000) * 100
    }

    /** @test */
    public function it_can_get_variance_report()
    {
        $offeringType = OfferingType::factory()->create(['name' => 'Tithes']);

        $budget = Budget::factory()->create([
            'name' => 'Test Budget',
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

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

        $report = $this->repository->getVarianceReport($budget->id);

        $this->assertEquals('Test Budget', $report['budget_name']);
        $this->assertCount(1, $report['items']);
        $this->assertEquals('Tithes', $report['items'][0]['category_name']);
    }

    /** @test */
    public function it_can_get_items_exceeding_threshold()
    {
        $expenseCategory = ExpenseCategory::factory()->create();

        $budget = Budget::factory()->create([
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory->id,
            'budgeted_amount' => 1000.00,
        ]);

        // Create expense at 85% of budget
        Expense::factory()->create([
            'expense_category_id' => $expenseCategory->id,
            'amount' => 850.00,
            'date' => '2025-01-15',
        ]);

        $exceeding = $this->repository->getItemsExceedingThreshold($budget->id, 80.0);

        $this->assertCount(1, $exceeding);
        $this->assertEquals(85.00, $exceeding[0]['percentage_used']);
    }

    /** @test */
    public function it_can_get_over_budget_items()
    {
        $expenseCategory = ExpenseCategory::factory()->create();

        $budget = Budget::factory()->create([
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory->id,
            'budgeted_amount' => 1000.00,
        ]);

        // Create expense over budget
        Expense::factory()->create([
            'expense_category_id' => $expenseCategory->id,
            'amount' => 1200.00,
            'date' => '2025-01-15',
        ]);

        $overBudget = $this->repository->getOverBudgetItems($budget->id);

        $this->assertCount(1, $overBudget);
        $this->assertEquals(200.00, $overBudget[0]['variance_amount']);
    }

    /** @test */
    public function it_can_get_total_budgeted()
    {
        $budget = Budget::factory()->create();

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'income',
            'budgeted_amount' => 5000.00,
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'budgeted_amount' => 3000.00,
        ]);

        $totalIncome = $this->repository->getTotalBudgeted($budget->id, 'income');
        $totalExpense = $this->repository->getTotalBudgeted($budget->id, 'expense');
        $totalAll = $this->repository->getTotalBudgeted($budget->id);

        $this->assertEquals(5000.00, $totalIncome);
        $this->assertEquals(3000.00, $totalExpense);
        $this->assertEquals(8000.00, $totalAll);
    }

    /** @test */
    public function it_can_get_budget_summary()
    {
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        $budget = Budget::factory()->create([
            'name' => 'Summary Test',
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'income',
            'category_id' => $offeringType->id,
            'budgeted_amount' => 10000.00,
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory->id,
            'budgeted_amount' => 6000.00,
        ]);

        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 11000.00,
            'date' => '2025-01-15',
        ]);

        Expense::factory()->create([
            'expense_category_id' => $expenseCategory->id,
            'amount' => 5500.00,
            'date' => '2025-01-15',
        ]);

        $summary = $this->repository->getSummary($budget->id);

        $this->assertEquals('Summary Test', $summary['budget_name']);
        $this->assertEquals(10000.00, $summary['income']['budgeted']);
        $this->assertEquals(11000.00, $summary['income']['actual']);
        $this->assertEquals(1000.00, $summary['income']['variance']);
        $this->assertEquals(6000.00, $summary['expense']['budgeted']);
        $this->assertEquals(5500.00, $summary['expense']['actual']);
        $this->assertEquals(-500.00, $summary['expense']['variance']);
        $this->assertEquals(4000.00, $summary['net']['budgeted']); // 10000 - 6000
        $this->assertEquals(5500.00, $summary['net']['actual']); // 11000 - 5500
        $this->assertEquals(1500.00, $summary['net']['variance']); // 5500 - 4000
    }

    /** @test */
    public function it_can_copy_budget()
    {
        $offeringType = OfferingType::factory()->create();

        $sourceBudget = Budget::factory()->create([
            'name' => 'Q1 Budget',
            'period_type' => 'quarterly',
            'start_date' => '2025-01-01',
            'end_date' => '2025-03-31',
        ]);

        BudgetItem::factory()->create([
            'budget_id' => $sourceBudget->id,
            'category_type' => 'income',
            'category_id' => $offeringType->id,
            'budgeted_amount' => 10000.00,
        ]);

        $newPeriodData = [
            'name' => 'Q2 Budget',
            'start_date' => '2025-04-01',
            'end_date' => '2025-06-30',
        ];

        $newBudget = $this->repository->copyBudget($sourceBudget->id, $newPeriodData);

        $this->assertInstanceOf(Budget::class, $newBudget);
        $this->assertEquals('Q2 Budget', $newBudget->name);
        $this->assertCount(1, $newBudget->items);
        $this->assertEquals(10000.00, $newBudget->items->first()->budgeted_amount);
    }

    /** @test */
    public function it_handles_zero_budgeted_amount_in_variance_calculation()
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
            'budgeted_amount' => 0.00,
        ]);

        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 1000.00,
            'date' => '2025-01-15',
        ]);

        $variance = $this->repository->calculateVariance($budget->id);

        $this->assertEquals(0.00, $variance[0]['variance_percentage']);
    }

    /** @test */
    public function it_only_includes_transactions_within_budget_period()
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

        // Inside period
        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 3000.00,
            'date' => '2025-01-15',
        ]);

        // Outside period (before)
        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 2000.00,
            'date' => '2024-12-31',
        ]);

        // Outside period (after)
        Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'amount' => 1000.00,
            'date' => '2025-02-01',
        ]);

        $actualAmounts = $this->repository->calculateActualAmounts($budget->id);

        $this->assertEquals(3000.00, $actualAmounts[0]['actual_amount']);
    }
}
