<?php

namespace Tests\Unit\Repositories;

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

class FundRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected FundRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new FundRepository();
    }

    /** @test */
    public function it_can_create_a_fund()
    {
        $data = [
            'name' => 'Building Fund',
            'type' => 'restricted',
            'description' => 'Fund for building projects',
            'current_balance' => 0,
            'is_active' => true,
        ];

        $fund = $this->repository->create($data);

        $this->assertInstanceOf(Fund::class, $fund);
        $this->assertEquals('Building Fund', $fund->name);
        $this->assertEquals('restricted', $fund->type);
        $this->assertDatabaseHas('funds', ['name' => 'Building Fund']);
    }

    /** @test */
    public function it_can_find_a_fund_by_id()
    {
        $fund = Fund::factory()->create(['name' => 'General Fund']);

        $found = $this->repository->find($fund->id);

        $this->assertInstanceOf(Fund::class, $found);
        $this->assertEquals($fund->id, $found->id);
        $this->assertEquals('General Fund', $found->name);
    }

    /** @test */
    public function it_can_update_a_fund()
    {
        $fund = Fund::factory()->create(['name' => 'Old Name']);

        $result = $this->repository->update($fund->id, ['name' => 'New Name']);

        $this->assertTrue($result);
        $this->assertDatabaseHas('funds', ['id' => $fund->id, 'name' => 'New Name']);
    }

    /** @test */
    public function it_can_delete_a_fund()
    {
        $fund = Fund::factory()->create();

        $result = $this->repository->delete($fund->id);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('funds', ['id' => $fund->id]);
    }

    /** @test */
    public function it_can_get_all_funds()
    {
        Fund::factory()->count(3)->create();

        $funds = $this->repository->all();

        $this->assertCount(3, $funds);
    }

    /** @test */
    public function it_can_get_active_funds()
    {
        Fund::factory()->create(['is_active' => true]);
        Fund::factory()->create(['is_active' => true]);
        Fund::factory()->create(['is_active' => false]);

        $activeFunds = $this->repository->getActive();

        $this->assertCount(2, $activeFunds);
    }

    /** @test */
    public function it_can_get_funds_by_type()
    {
        Fund::factory()->create(['type' => 'restricted']);
        Fund::factory()->create(['type' => 'restricted']);
        Fund::factory()->create(['type' => 'unrestricted']);

        $restrictedFunds = $this->repository->getByType('restricted');

        $this->assertCount(2, $restrictedFunds);
    }

    /** @test */
    public function it_can_search_funds_by_name()
    {
        Fund::factory()->create(['name' => 'Building Fund']);
        Fund::factory()->create(['name' => 'Mission Fund']);
        Fund::factory()->create(['name' => 'General Fund']);

        $results = $this->repository->search('Building');

        $this->assertCount(1, $results);
        $this->assertEquals('Building Fund', $results->first()->name);
    }

    /** @test */
    public function it_can_calculate_fund_balance_with_offerings_only()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 100,
        ]);
        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 200,
        ]);

        $balance = $this->repository->calculateBalance($fund->id);

        $this->assertEquals(300, $balance);
    }

    /** @test */
    public function it_can_calculate_fund_balance_with_offerings_and_expenses()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 500,
        ]);
        Expense::factory()->create([
            'fund_id' => $fund->id,
            'expense_category_id' => $expenseCategory->id,
            'amount' => 150,
        ]);

        $balance = $this->repository->calculateBalance($fund->id);

        $this->assertEquals(350, $balance);
    }

    /** @test */
    public function it_can_calculate_fund_balance_with_transfers()
    {
        $user = User::factory()->create();
        $fund1 = Fund::factory()->create();
        $fund2 = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();

        // Add initial offering to fund1
        Offering::factory()->create([
            'fund_id' => $fund1->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 1000,
        ]);

        // Transfer from fund1 to fund2
        FundTransfer::factory()->create([
            'from_fund_id' => $fund1->id,
            'to_fund_id' => $fund2->id,
            'amount' => 300,
            'created_by' => $user->id,
        ]);

        $balance1 = $this->repository->calculateBalance($fund1->id);
        $balance2 = $this->repository->calculateBalance($fund2->id);

        $this->assertEquals(700, $balance1); // 1000 - 300
        $this->assertEquals(300, $balance2); // 0 + 300
    }

    /** @test */
    public function it_can_get_fund_balance()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 250,
        ]);

        $balance = $this->repository->getBalance($fund->id);

        $this->assertEquals(250, $balance);
    }

    /** @test */
    public function it_can_update_fund_balance()
    {
        $fund = Fund::factory()->create(['current_balance' => 0]);
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 500,
        ]);

        $result = $this->repository->updateBalance($fund->id);

        $this->assertTrue($result);
        $fund->refresh();
        $this->assertEquals(500, $fund->current_balance);
    }

    /** @test */
    public function it_can_get_fund_transactions()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 100,
            'date' => '2024-01-15',
        ]);
        Expense::factory()->create([
            'fund_id' => $fund->id,
            'expense_category_id' => $expenseCategory->id,
            'amount' => 50,
            'date' => '2024-01-20',
        ]);

        $transactions = $this->repository->getTransactions($fund->id);

        $this->assertCount(2, $transactions);
        $this->assertEquals('expense', $transactions[0]['type']); // Most recent first
        $this->assertEquals('offering', $transactions[1]['type']);
    }

    /** @test */
    public function it_can_get_fund_transactions_with_date_filter()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 100,
            'date' => '2024-01-15',
        ]);
        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 200,
            'date' => '2024-02-15',
        ]);

        $transactions = $this->repository->getTransactions($fund->id, [
            'start_date' => '2024-01-01',
            'end_date' => '2024-01-31',
        ]);

        $this->assertCount(1, $transactions);
    }

    /** @test */
    public function it_can_get_fund_summary()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 500,
        ]);
        Expense::factory()->create([
            'fund_id' => $fund->id,
            'expense_category_id' => $expenseCategory->id,
            'amount' => 150,
        ]);

        $summary = $this->repository->getSummary($fund->id);

        $this->assertEquals(350, $summary['current_balance']);
        $this->assertEquals(500, $summary['total_offerings']);
        $this->assertEquals(150, $summary['total_expenses']);
        $this->assertEquals(500, $summary['total_income']);
        $this->assertEquals(150, $summary['total_outflow']);
        $this->assertEquals(350, $summary['net_change']);
    }

    /** @test */
    public function it_can_get_total_income_for_date_range()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 100,
            'date' => '2024-01-15',
        ]);
        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 200,
            'date' => '2024-02-15',
        ]);

        $totalIncome = $this->repository->getTotalIncome($fund->id, '2024-01-01', '2024-01-31');

        $this->assertEquals(100, $totalIncome);
    }

    /** @test */
    public function it_can_get_total_expenses_for_date_range()
    {
        $fund = Fund::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create();

        Expense::factory()->create([
            'fund_id' => $fund->id,
            'expense_category_id' => $expenseCategory->id,
            'amount' => 75,
            'date' => '2024-01-15',
        ]);
        Expense::factory()->create([
            'fund_id' => $fund->id,
            'expense_category_id' => $expenseCategory->id,
            'amount' => 125,
            'date' => '2024-02-15',
        ]);

        $totalExpenses = $this->repository->getTotalExpenses($fund->id, '2024-01-01', '2024-01-31');

        $this->assertEquals(75, $totalExpenses);
    }

    /** @test */
    public function it_can_check_sufficient_balance()
    {
        $fund = Fund::factory()->create();
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 500,
        ]);

        $this->assertTrue($this->repository->hasSufficientBalance($fund->id, 300));
        $this->assertTrue($this->repository->hasSufficientBalance($fund->id, 500));
        $this->assertFalse($this->repository->hasSufficientBalance($fund->id, 600));
    }

    /** @test */
    public function it_can_get_low_balance_funds()
    {
        $fund1 = Fund::factory()->create(['current_balance' => 50, 'is_active' => true]);
        $fund2 = Fund::factory()->create(['current_balance' => 200, 'is_active' => true]);
        $fund3 = Fund::factory()->create(['current_balance' => 10, 'is_active' => true]);

        $lowBalanceFunds = $this->repository->getLowBalanceFunds(100);

        $this->assertCount(2, $lowBalanceFunds);
    }

    /** @test */
    public function it_can_get_all_fund_balances()
    {
        $fund1 = Fund::factory()->create(['is_active' => true]);
        $fund2 = Fund::factory()->create(['is_active' => true]);
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund1->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 100,
        ]);
        Offering::factory()->create([
            'fund_id' => $fund2->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 200,
        ]);

        $balances = $this->repository->getAllBalances();

        $this->assertCount(2, $balances);
        $this->assertEquals(100, $balances[0]['balance']);
        $this->assertEquals(200, $balances[1]['balance']);
    }

    /** @test */
    public function it_can_get_total_balance_across_all_funds()
    {
        $fund1 = Fund::factory()->create(['is_active' => true]);
        $fund2 = Fund::factory()->create(['is_active' => true]);
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund1->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 150,
        ]);
        Offering::factory()->create([
            'fund_id' => $fund2->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 250,
        ]);

        $totalBalance = $this->repository->getTotalBalance();

        $this->assertEquals(400, $totalBalance);
    }

    /** @test */
    public function it_can_get_total_restricted_balance()
    {
        $fund1 = Fund::factory()->create(['type' => 'restricted', 'is_active' => true]);
        $fund2 = Fund::factory()->create(['type' => 'unrestricted', 'is_active' => true]);
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund1->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 300,
        ]);
        Offering::factory()->create([
            'fund_id' => $fund2->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 400,
        ]);

        $restrictedBalance = $this->repository->getTotalRestrictedBalance();

        $this->assertEquals(300, $restrictedBalance);
    }

    /** @test */
    public function it_can_get_total_unrestricted_balance()
    {
        $fund1 = Fund::factory()->create(['type' => 'restricted', 'is_active' => true]);
        $fund2 = Fund::factory()->create(['type' => 'unrestricted', 'is_active' => true]);
        $offeringType = OfferingType::factory()->create();

        Offering::factory()->create([
            'fund_id' => $fund1->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 300,
        ]);
        Offering::factory()->create([
            'fund_id' => $fund2->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 400,
        ]);

        $unrestrictedBalance = $this->repository->getTotalUnrestrictedBalance();

        $this->assertEquals(400, $unrestrictedBalance);
    }

    /** @test */
    public function it_can_check_if_fund_name_exists()
    {
        Fund::factory()->create(['name' => 'Building Fund']);

        $this->assertTrue($this->repository->nameExists('Building Fund'));
        $this->assertFalse($this->repository->nameExists('Mission Fund'));
    }

    /** @test */
    public function it_can_check_fund_name_exists_excluding_specific_id()
    {
        $fund = Fund::factory()->create(['name' => 'Building Fund']);

        $this->assertFalse($this->repository->nameExists('Building Fund', $fund->id));
        $this->assertTrue($this->repository->nameExists('Building Fund', 999));
    }
}
