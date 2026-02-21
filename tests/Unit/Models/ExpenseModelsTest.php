<?php

namespace Tests\Unit\Models;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\Vendor;
use App\Models\Fund;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExpenseModelsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function expense_category_can_be_created()
    {
        $category = ExpenseCategory::create([
            'name' => 'Utilities',
            'description' => 'Utility expenses',
            'is_active' => true,
        ]);

        $this->assertDatabaseHas('expense_categories', [
            'name' => 'Utilities',
            'is_active' => true,
        ]);
    }

    /** @test */
    public function vendor_can_be_created()
    {
        $vendor = Vendor::create([
            'name' => 'ABC Supplies',
            'contact_name' => 'John Doe',
            'email' => 'john@abcsupplies.com',
            'phone' => '555-1234',
            'is_active' => true,
        ]);

        $this->assertDatabaseHas('vendors', [
            'name' => 'ABC Supplies',
            'email' => 'john@abcsupplies.com',
        ]);
    }

    /** @test */
    public function expense_can_be_created_with_required_fields()
    {
        $category = ExpenseCategory::create([
            'name' => 'Office Supplies',
            'is_active' => true,
        ]);

        $expense = Expense::create([
            'expense_category_id' => $category->id,
            'amount' => 150.00,
            'date' => '2024-01-15',
            'description' => 'Office supplies purchase',
            'approval_status' => 'pending',
        ]);

        $this->assertDatabaseHas('expenses', [
            'expense_category_id' => $category->id,
            'amount' => 150.00,
            'description' => 'Office supplies purchase',
        ]);
    }

    /** @test */
    public function expense_belongs_to_category()
    {
        $category = ExpenseCategory::create([
            'name' => 'Maintenance',
            'is_active' => true,
        ]);

        $expense = Expense::create([
            'expense_category_id' => $category->id,
            'amount' => 200.00,
            'date' => '2024-01-15',
            'description' => 'Building maintenance',
        ]);

        $this->assertInstanceOf(ExpenseCategory::class, $expense->category);
        $this->assertEquals('Maintenance', $expense->category->name);
    }

    /** @test */
    public function expense_belongs_to_vendor()
    {
        $category = ExpenseCategory::create([
            'name' => 'Services',
            'is_active' => true,
        ]);

        $vendor = Vendor::create([
            'name' => 'Tech Services Inc',
            'is_active' => true,
        ]);

        $expense = Expense::create([
            'expense_category_id' => $category->id,
            'vendor_id' => $vendor->id,
            'amount' => 500.00,
            'date' => '2024-01-15',
            'description' => 'IT services',
        ]);

        $this->assertInstanceOf(Vendor::class, $expense->vendor);
        $this->assertEquals('Tech Services Inc', $expense->vendor->name);
    }

    /** @test */
    public function expense_category_has_many_expenses()
    {
        $category = ExpenseCategory::create([
            'name' => 'Utilities',
            'is_active' => true,
        ]);

        Expense::create([
            'expense_category_id' => $category->id,
            'amount' => 100.00,
            'date' => '2024-01-15',
            'description' => 'Electric bill',
        ]);

        Expense::create([
            'expense_category_id' => $category->id,
            'amount' => 75.00,
            'date' => '2024-01-20',
            'description' => 'Water bill',
        ]);

        $this->assertCount(2, $category->expenses);
    }

    /** @test */
    public function vendor_has_many_expenses()
    {
        $category = ExpenseCategory::create([
            'name' => 'Supplies',
            'is_active' => true,
        ]);

        $vendor = Vendor::create([
            'name' => 'Office Depot',
            'is_active' => true,
        ]);

        Expense::create([
            'expense_category_id' => $category->id,
            'vendor_id' => $vendor->id,
            'amount' => 50.00,
            'date' => '2024-01-15',
            'description' => 'Paper',
        ]);

        Expense::create([
            'expense_category_id' => $category->id,
            'vendor_id' => $vendor->id,
            'amount' => 30.00,
            'date' => '2024-01-20',
            'description' => 'Pens',
        ]);

        $this->assertCount(2, $vendor->expenses);
    }

    /** @test */
    public function expense_uses_soft_deletes()
    {
        $category = ExpenseCategory::create([
            'name' => 'Test Category',
            'is_active' => true,
        ]);

        $expense = Expense::create([
            'expense_category_id' => $category->id,
            'amount' => 100.00,
            'date' => '2024-01-15',
            'description' => 'Test expense',
        ]);

        $expense->delete();

        $this->assertSoftDeleted('expenses', ['id' => $expense->id]);
        $this->assertNotNull($expense->fresh()->deleted_at);
    }
}
