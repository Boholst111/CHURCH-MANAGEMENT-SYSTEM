<?php

namespace Tests\Unit\Models;

use App\Models\Budget;
use App\Models\BudgetItem;
use App\Models\ExpenseCategory;
use App\Models\OfferingType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BudgetModelsTest extends TestCase
{
    use RefreshDatabase;

    public function test_budget_can_be_created_with_valid_data()
    {
        $budget = Budget::create([
            'name' => 'Annual Budget 2025',
            'period_type' => 'annually',
            'start_date' => '2025-01-01',
            'end_date' => '2025-12-31',
            'is_active' => true,
            'notes' => 'Test budget',
        ]);

        $this->assertDatabaseHas('budgets', [
            'name' => 'Annual Budget 2025',
            'period_type' => 'annually',
        ]);
    }

    public function test_budget_has_items_relationship()
    {
        $budget = Budget::create([
            'name' => 'Test Budget',
            'period_type' => 'monthly',
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        $offeringType = OfferingType::create([
            'name' => 'Tithe',
            'description' => 'Regular tithe',
        ]);

        $budgetItem = BudgetItem::create([
            'budget_id' => $budget->id,
            'category_type' => 'income',
            'category_id' => $offeringType->id,
            'budgeted_amount' => 10000.00,
        ]);

        $this->assertTrue($budget->items->contains($budgetItem));
        $this->assertEquals($budget->id, $budgetItem->budget->id);
    }

    public function test_budget_item_belongs_to_budget()
    {
        $budget = Budget::create([
            'name' => 'Test Budget',
            'period_type' => 'monthly',
            'start_date' => '2025-01-01',
            'end_date' => '2025-01-31',
        ]);

        $expenseCategory = ExpenseCategory::create([
            'name' => 'Utilities',
            'description' => 'Utility expenses',
        ]);

        $budgetItem = BudgetItem::create([
            'budget_id' => $budget->id,
            'category_type' => 'expense',
            'category_id' => $expenseCategory->id,
            'budgeted_amount' => 5000.00,
        ]);

        $this->assertEquals($budget->id, $budgetItem->budget->id);
    }
}
