<?php

namespace Tests\Unit\Repositories;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Repositories\ExpenseRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExpenseRepositoryBasicTest extends TestCase
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
    public function it_can_filter_by_approval_status()
    {
        Expense::factory()->count(2)->create(['approval_status' => 'pending']);
        Expense::factory()->count(3)->create(['approval_status' => 'approved']);

        $pending = $this->repository->getPending();
        $approved = $this->repository->getApproved();

        $this->assertCount(2, $pending);
        $this->assertCount(3, $approved);
    }
}
