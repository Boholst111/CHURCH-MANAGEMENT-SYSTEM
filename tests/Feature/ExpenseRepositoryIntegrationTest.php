<?php

namespace Tests\Feature;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\Vendor;
use App\Repositories\ExpenseRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Integration test to verify ExpenseRepository functionality.
 * This test demonstrates that the repository methods work correctly.
 */
class ExpenseRepositoryIntegrationTest extends TestCase
{
    use RefreshDatabase;

    private ExpenseRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new ExpenseRepository();
    }

    /** @test */
    public function it_demonstrates_crud_operations()
    {
        // Create
        $category = ExpenseCategory::factory()->create(['name' => 'Utilities']);
        $vendor = Vendor::factory()->create(['name' => 'Electric Company']);
        
        $expense = $this->repository->create([
            'expense_category_id' => $category->id,
            'vendor_id' => $vendor->id,
            'amount' => 250.00,
            'date' => '2024-01-15',
            'description' => 'Monthly electricity bill',
            'approval_status' => 'pending',
        ]);

        $this->assertNotNull($expense->id);
        $this->assertEquals(250.00, $expense->amount);

        // Read
        $found = $this->repository->find($expense->id);
        $this->assertEquals($expense->id, $found->id);

        // Update
        $this->repository->update($expense->id, ['amount' => 275.00]);
        $updated = $this->repository->find($expense->id);
        $this->assertEquals(275.00, $updated->amount);

        // Delete (soft delete)
        $this->repository->delete($expense->id);
        $this->assertSoftDeleted('expenses', ['id' => $expense->id]);
    }

    /** @test */
    public function it_demonstrates_filtering_capabilities()
    {
        $category1 = ExpenseCategory::factory()->create(['name' => 'Utilities']);
        $category2 = ExpenseCategory::factory()->create(['name' => 'Salaries']);
        $vendor = Vendor::factory()->create(['name' => 'Test Vendor']);

        // Create test data
        Expense::factory()->create([
            'expense_category_id' => $category1->id,
            'vendor_id' => $vendor->id,
            'approval_status' => 'pending',
            'date' => '2024-01-15',
            'amount' => 100.00,
        ]);

        Expense::factory()->create([
            'expense_category_id' => $category2->id,
            'approval_status' => 'approved',
            'date' => '2024-02-15',
            'amount' => 200.00,
        ]);

        // Test filtering by category
        $utilitiesExpenses = $this->repository->filterByCategory($category1->id);
        $this->assertCount(1, $utilitiesExpenses);

        // Test filtering by status
        $pendingExpenses = $this->repository->getPending();
        $this->assertCount(1, $pendingExpenses);

        $approvedExpenses = $this->repository->getApproved();
        $this->assertCount(1, $approvedExpenses);

        // Test filtering by vendor
        $vendorExpenses = $this->repository->filterByVendor($vendor->id);
        $this->assertCount(1, $vendorExpenses);

        // Test date range filtering
        $januaryExpenses = $this->repository->getByDateRange('2024-01-01', '2024-01-31');
        $this->assertCount(1, $januaryExpenses);
    }

    /** @test */
    public function it_demonstrates_approval_workflow_queries()
    {
        // Create expenses with different statuses
        Expense::factory()->count(3)->create(['approval_status' => 'pending']);
        Expense::factory()->count(2)->create(['approval_status' => 'approved']);
        Expense::factory()->count(1)->create(['approval_status' => 'rejected']);

        // Query by approval status
        $pending = $this->repository->getPending();
        $approved = $this->repository->getApproved();
        $rejected = $this->repository->getRejected();

        $this->assertCount(3, $pending);
        $this->assertCount(2, $approved);
        $this->assertCount(1, $rejected);

        // Get total pending amount
        $totalPending = $this->repository->getTotalPending();
        $this->assertGreaterThan(0, $totalPending);

        // Get count of pending
        $countPending = $this->repository->getCountPending();
        $this->assertEquals(3, $countPending);
    }

    /** @test */
    public function it_demonstrates_summary_and_reporting_methods()
    {
        $category = ExpenseCategory::factory()->create();
        
        Expense::factory()->create([
            'expense_category_id' => $category->id,
            'amount' => 100.00,
            'date' => '2024-01-15',
        ]);

        Expense::factory()->create([
            'expense_category_id' => $category->id,
            'amount' => 200.00,
            'date' => '2024-01-20',
        ]);

        // Get summary
        $summary = $this->repository->getSummary('2024-01-01', '2024-01-31');
        
        $this->assertEquals(300.00, $summary['total_expenses']);
        $this->assertEquals(2, $summary['total_transactions']);
        $this->assertEquals(150.00, $summary['average_transaction']);

        // Get total by date range
        $total = $this->repository->getTotalByDateRange('2024-01-01', '2024-01-31');
        $this->assertEquals(300.00, $total);

        // Get total by category
        $categoryTotal = $this->repository->getTotalByCategory(
            $category->id,
            '2024-01-01',
            '2024-01-31'
        );
        $this->assertEquals(300.00, $categoryTotal);
    }
}
