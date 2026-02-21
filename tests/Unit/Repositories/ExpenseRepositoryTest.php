<?php

namespace Tests\Unit\Repositories;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\Vendor;
use App\Models\Fund;
use App\Models\User;
use App\Repositories\ExpenseRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExpenseRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private ExpenseRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new ExpenseRepository();
    }

    /** @test */
    public function it_can_create_an_expense()
    {
        $category = ExpenseCategory::factory()->create();
        
        $data = [
            'expense_category_id' => $category->id,
            'amount' => 100.00,
            'date' => '2024-01-15',
            'description' => 'Test expense',
            'approval_status' => 'pending',
        ];

        $expense = $this->repository->create($data);

        $this->assertInstanceOf(Expense::class, $expense);
        $this->assertEquals(100.00, $expense->amount);
        $this->assertEquals('Test expense', $expense->description);
        $this->assertDatabaseHas('expenses', ['description' => 'Test expense']);
    }

    /** @test */
    public function it_can_find_an_expense_by_id()
    {
        $expense = Expense::factory()->create();

        $found = $this->repository->find($expense->id);

        $this->assertInstanceOf(Expense::class, $found);
        $this->assertEquals($expense->id, $found->id);
    }

    /** @test */
    public function it_can_update_an_expense()
    {
        $expense = Expense::factory()->create(['description' => 'Original']);

        $result = $this->repository->update($expense->id, ['description' => 'Updated']);

        $this->assertTrue($result);
        $this->assertDatabaseHas('expenses', ['id' => $expense->id, 'description' => 'Updated']);
    }

    /** @test */
    public function it_can_soft_delete_an_expense()
    {
        $expense = Expense::factory()->create();

        $result = $this->repository->delete($expense->id);

        $this->assertTrue($result);
        $this->assertSoftDeleted('expenses', ['id' => $expense->id]);
    }

    /** @test */
    public function it_can_get_expenses_by_date_range()
    {
        Expense::factory()->create(['date' => '2024-01-15']);
        Expense::factory()->create(['date' => '2024-02-15']);
        Expense::factory()->create(['date' => '2024-03-15']);

        $expenses = $this->repository->getByDateRange('2024-01-01', '2024-02-28');

        $this->assertCount(2, $expenses);
    }

    /** @test */
    public function it_can_filter_expenses_by_category()
    {
        $category1 = ExpenseCategory::factory()->create();
        $category2 = ExpenseCategory::factory()->create();

        Expense::factory()->count(3)->create(['expense_category_id' => $category1->id]);
        Expense::factory()->count(2)->create(['expense_category_id' => $category2->id]);

        $expenses = $this->repository->filterByCategory($category1->id);

        $this->assertCount(3, $expenses);
        $this->assertTrue($expenses->every(fn($e) => $e->expense_category_id === $category1->id));
    }

    /** @test */
    public function it_can_filter_expenses_by_vendor()
    {
        $vendor1 = Vendor::factory()->create();
        $vendor2 = Vendor::factory()->create();

        Expense::factory()->count(3)->create(['vendor_id' => $vendor1->id]);
        Expense::factory()->count(2)->create(['vendor_id' => $vendor2->id]);

        $expenses = $this->repository->filterByVendor($vendor1->id);

        $this->assertCount(3, $expenses);
        $this->assertTrue($expenses->every(fn($e) => $e->vendor_id === $vendor1->id));
    }

    /** @test */
    public function it_can_filter_expenses_by_approval_status()
    {
        Expense::factory()->count(3)->create(['approval_status' => 'pending']);
        Expense::factory()->count(2)->create(['approval_status' => 'approved']);
        Expense::factory()->count(1)->create(['approval_status' => 'rejected']);

        $pending = $this->repository->filterByStatus('pending');
        $approved = $this->repository->filterByStatus('approved');
        $rejected = $this->repository->filterByStatus('rejected');

        $this->assertCount(3, $pending);
        $this->assertCount(2, $approved);
        $this->assertCount(1, $rejected);
    }


    /** @test */
    public function it_can_filter_expenses_by_amount_range()
    {
        Expense::factory()->create(['amount' => 50.00]);
        Expense::factory()->create(['amount' => 150.00]);
        Expense::factory()->create(['amount' => 250.00]);

        $expenses = $this->repository->filterByAmountRange(100.00, 200.00);

        $this->assertCount(1, $expenses);
        $this->assertEquals(150.00, $expenses->first()->amount);
    }

    /** @test */
    public function it_can_get_pending_expenses()
    {
        Expense::factory()->count(3)->create(['approval_status' => 'pending']);
        Expense::factory()->count(2)->create(['approval_status' => 'approved']);

        $pending = $this->repository->getPending();

        $this->assertCount(3, $pending);
        $this->assertTrue($pending->every(fn($e) => $e->approval_status === 'pending'));
    }

    /** @test */
    public function it_can_get_approved_expenses()
    {
        Expense::factory()->count(2)->create(['approval_status' => 'pending']);
        Expense::factory()->count(3)->create(['approval_status' => 'approved']);

        $approved = $this->repository->getApproved();

        $this->assertCount(3, $approved);
        $this->assertTrue($approved->every(fn($e) => $e->approval_status === 'approved'));
    }

    /** @test */
    public function it_can_get_rejected_expenses()
    {
        Expense::factory()->count(2)->create(['approval_status' => 'pending']);
        Expense::factory()->count(1)->create(['approval_status' => 'rejected']);

        $rejected = $this->repository->getRejected();

        $this->assertCount(1, $rejected);
        $this->assertTrue($rejected->every(fn($e) => $e->approval_status === 'rejected'));
    }

    /** @test */
    public function it_can_paginate_expenses()
    {
        Expense::factory()->count(25)->create();

        $paginated = $this->repository->paginate(10);

        $this->assertEquals(10, $paginated->count());
        $this->assertEquals(25, $paginated->total());
    }

    /** @test */
    public function it_can_paginate_with_filters()
    {
        $category = ExpenseCategory::factory()->create();
        
        Expense::factory()->count(5)->create(['expense_category_id' => $category->id]);
        Expense::factory()->count(10)->create();

        $paginated = $this->repository->paginate(10, ['expense_category_id' => $category->id]);

        $this->assertEquals(5, $paginated->total());
    }

    /** @test */
    public function it_can_search_expenses_by_description()
    {
        Expense::factory()->create(['description' => 'Office supplies']);
        Expense::factory()->create(['description' => 'Utility bill']);
        Expense::factory()->create(['description' => 'Office rent']);

        $results = $this->repository->search('Office');

        $this->assertCount(2, $results);
    }

    /** @test */
    public function it_can_get_total_expenses_for_current_month()
    {
        Expense::factory()->create(['amount' => 100.00, 'date' => now()]);
        Expense::factory()->create(['amount' => 200.00, 'date' => now()]);
        Expense::factory()->create(['amount' => 150.00, 'date' => now()->subMonth()]);

        $total = $this->repository->getTotalForCurrentMonth();

        $this->assertEquals(300.00, $total);
    }

    /** @test */
    public function it_can_get_total_expenses_by_date_range()
    {
        Expense::factory()->create(['amount' => 100.00, 'date' => '2024-01-15']);
        Expense::factory()->create(['amount' => 200.00, 'date' => '2024-02-15']);
        Expense::factory()->create(['amount' => 150.00, 'date' => '2024-03-15']);

        $total = $this->repository->getTotalByDateRange('2024-01-01', '2024-02-28');

        $this->assertEquals(300.00, $total);
    }

    /** @test */
    public function it_can_get_expenses_summary()
    {
        $category1 = ExpenseCategory::factory()->create();
        $category2 = ExpenseCategory::factory()->create();

        Expense::factory()->create([
            'amount' => 100.00,
            'date' => '2024-01-15',
            'expense_category_id' => $category1->id,
        ]);
        Expense::factory()->create([
            'amount' => 200.00,
            'date' => '2024-01-20',
            'expense_category_id' => $category2->id,
        ]);

        $summary = $this->repository->getSummary('2024-01-01', '2024-01-31');

        $this->assertEquals(300.00, $summary['total_expenses']);
        $this->assertEquals(2, $summary['total_transactions']);
        $this->assertEquals(150.00, $summary['average_transaction']);
    }

    /** @test */
    public function it_can_get_expenses_by_category_and_date_range()
    {
        $category = ExpenseCategory::factory()->create();

        Expense::factory()->create([
            'expense_category_id' => $category->id,
            'date' => '2024-01-15',
        ]);
        Expense::factory()->create([
            'expense_category_id' => $category->id,
            'date' => '2024-02-15',
        ]);
        Expense::factory()->create([
            'expense_category_id' => $category->id,
            'date' => '2024-03-15',
        ]);

        $expenses = $this->repository->getByCategoryAndDateRange(
            $category->id,
            '2024-01-01',
            '2024-02-28'
        );

        $this->assertCount(2, $expenses);
    }

    /** @test */
    public function it_can_get_expenses_by_vendor_and_date_range()
    {
        $vendor = Vendor::factory()->create();

        Expense::factory()->create([
            'vendor_id' => $vendor->id,
            'date' => '2024-01-15',
        ]);
        Expense::factory()->create([
            'vendor_id' => $vendor->id,
            'date' => '2024-02-15',
        ]);
        Expense::factory()->create([
            'vendor_id' => $vendor->id,
            'date' => '2024-03-15',
        ]);

        $expenses = $this->repository->getByVendorAndDateRange(
            $vendor->id,
            '2024-01-01',
            '2024-02-28'
        );

        $this->assertCount(2, $expenses);
    }

    /** @test */
    public function it_can_get_total_by_vendor()
    {
        $vendor = Vendor::factory()->create();

        Expense::factory()->create([
            'vendor_id' => $vendor->id,
            'amount' => 100.00,
            'date' => '2024-01-15',
        ]);
        Expense::factory()->create([
            'vendor_id' => $vendor->id,
            'amount' => 200.00,
            'date' => '2024-01-20',
        ]);

        $total = $this->repository->getTotalByVendor($vendor->id, '2024-01-01', '2024-01-31');

        $this->assertEquals(300.00, $total);
    }

    /** @test */
    public function it_can_get_total_by_category()
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

        $total = $this->repository->getTotalByCategory($category->id, '2024-01-01', '2024-01-31');

        $this->assertEquals(300.00, $total);
    }

    /** @test */
    public function it_can_get_expenses_grouped_by_category()
    {
        $category1 = ExpenseCategory::factory()->create();
        $category2 = ExpenseCategory::factory()->create();

        Expense::factory()->count(3)->create([
            'expense_category_id' => $category1->id,
            'amount' => 100.00,
            'date' => '2024-01-15',
        ]);
        Expense::factory()->count(2)->create([
            'expense_category_id' => $category2->id,
            'amount' => 200.00,
            'date' => '2024-01-20',
        ]);

        $grouped = $this->repository->getGroupedByCategory('2024-01-01', '2024-01-31');

        $this->assertCount(2, $grouped);
    }

    /** @test */
    public function it_can_get_top_vendors()
    {
        $vendor1 = Vendor::factory()->create();
        $vendor2 = Vendor::factory()->create();

        Expense::factory()->create([
            'vendor_id' => $vendor1->id,
            'amount' => 500.00,
            'date' => '2024-01-15',
        ]);
        Expense::factory()->create([
            'vendor_id' => $vendor2->id,
            'amount' => 300.00,
            'date' => '2024-01-20',
        ]);

        $topVendors = $this->repository->getTopVendors('2024-01-01', '2024-01-31', 10);

        $this->assertCount(2, $topVendors);
        $this->assertEquals($vendor1->id, $topVendors->first()->vendor_id);
    }

    /** @test */
    public function it_can_get_total_pending_expenses()
    {
        Expense::factory()->create(['approval_status' => 'pending', 'amount' => 100.00]);
        Expense::factory()->create(['approval_status' => 'pending', 'amount' => 200.00]);
        Expense::factory()->create(['approval_status' => 'approved', 'amount' => 150.00]);

        $total = $this->repository->getTotalPending();

        $this->assertEquals(300.00, $total);
    }

    /** @test */
    public function it_can_get_count_of_pending_expenses()
    {
        Expense::factory()->count(3)->create(['approval_status' => 'pending']);
        Expense::factory()->count(2)->create(['approval_status' => 'approved']);

        $count = $this->repository->getCountPending();

        $this->assertEquals(3, $count);
    }

    /** @test */
    public function it_can_check_if_expense_has_receipt()
    {
        $expenseWithReceipt = Expense::factory()->create(['receipt_path' => '/path/to/receipt.pdf']);
        $expenseWithoutReceipt = Expense::factory()->create(['receipt_path' => null]);

        $this->assertTrue($this->repository->hasReceipt($expenseWithReceipt->id));
        $this->assertFalse($this->repository->hasReceipt($expenseWithoutReceipt->id));
    }

    /** @test */
    public function it_can_get_expenses_without_receipts()
    {
        Expense::factory()->count(3)->create(['receipt_path' => null]);
        Expense::factory()->count(2)->create(['receipt_path' => '/path/to/receipt.pdf']);

        $withoutReceipts = $this->repository->getWithoutReceipts();

        $this->assertCount(3, $withoutReceipts);
    }
}
