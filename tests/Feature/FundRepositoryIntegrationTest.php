<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Repositories\FundRepository;
use App\Models\Fund;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\FundTransfer;
use App\Models\OfferingType;
use App\Models\ExpenseCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FundRepositoryIntegrationTest extends TestCase
{
    use RefreshDatabase;

    protected FundRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new FundRepository();
    }

    /** @test */
    public function it_can_perform_basic_crud_operations()
    {
        // Create
        $fund = $this->repository->create([
            'name' => 'Test Fund',
            'type' => 'restricted',
            'description' => 'Test Description',
            'current_balance' => 0,
            'is_active' => true,
        ]);

        $this->assertInstanceOf(Fund::class, $fund);
        $this->assertEquals('Test Fund', $fund->name);

        // Read
        $found = $this->repository->find($fund->id);
        $this->assertEquals($fund->id, $found->id);

        // Update
        $this->repository->update($fund->id, ['name' => 'Updated Fund']);
        $updated = $this->repository->find($fund->id);
        $this->assertEquals('Updated Fund', $updated->name);

        // Delete
        $this->repository->delete($fund->id);
        $this->assertNull($this->repository->find($fund->id));
    }

    /** @test */
    public function it_calculates_balance_correctly_with_offerings_and_expenses()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        // Add offerings
        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 1000,
        ]);

        // Add expenses
        Expense::factory()->create([
            'fund_id' => $fund->id,
            'expense_category_id' => $expenseCategory->id,
            'amount' => 300,
        ]);

        $balance = $this->repository->calculateBalance($fund->id);

        $this->assertEquals(700, $balance);
    }

    /** @test */
    public function it_tracks_fund_transactions_correctly()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 500,
            'date' => '2024-01-15',
        ]);

        Expense::factory()->create([
            'fund_id' => $fund->id,
            'expense_category_id' => $expenseCategory->id,
            'amount' => 200,
            'date' => '2024-01-20',
        ]);

        $transactions = $this->repository->getTransactions($fund->id);

        $this->assertCount(2, $transactions);
        $this->assertEquals('expense', $transactions[0]['type']);
        $this->assertEquals(-200, $transactions[0]['amount']);
        $this->assertEquals('offering', $transactions[1]['type']);
        $this->assertEquals(500, $transactions[1]['amount']);
    }

    /** @test */
    public function it_provides_accurate_fund_summary()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 800,
        ]);

        Expense::factory()->create([
            'fund_id' => $fund->id,
            'expense_category_id' => $expenseCategory->id,
            'amount' => 250,
        ]);

        $summary = $this->repository->getSummary($fund->id);

        $this->assertEquals(550, $summary['current_balance']);
        $this->assertEquals(800, $summary['total_offerings']);
        $this->assertEquals(250, $summary['total_expenses']);
        $this->assertEquals(800, $summary['total_income']);
        $this->assertEquals(250, $summary['total_outflow']);
        $this->assertEquals(550, $summary['net_change']);
        $this->assertEquals(1, $summary['offering_count']);
        $this->assertEquals(1, $summary['expense_count']);
    }
}
