<?php

namespace Tests\Unit\Repositories;

use App\Models\Member;
use App\Models\Tithe;
use App\Repositories\FinanceRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FinanceRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected FinanceRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new FinanceRepository();
    }

    public function test_can_create_tithe()
    {
        $member = Member::factory()->create();
        $data = [
            'member_id' => $member->id,
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => '2024-01-01',
        ];

        $tithe = $this->repository->create($data);

        $this->assertInstanceOf(Tithe::class, $tithe);
        $this->assertEquals(100.00, $tithe->amount);
    }

    public function test_can_find_tithe_by_id()
    {
        $tithe = Tithe::factory()->create();

        $found = $this->repository->find($tithe->id);

        $this->assertNotNull($found);
        $this->assertEquals($tithe->id, $found->id);
    }

    public function test_can_update_tithe()
    {
        $tithe = Tithe::factory()->create(['amount' => 100.00]);

        $updated = $this->repository->update($tithe->id, ['amount' => 150.00]);

        $this->assertTrue($updated);
        $this->assertEquals(150.00, $tithe->fresh()->amount);
    }

    public function test_can_delete_tithe()
    {
        $tithe = Tithe::factory()->create();

        $deleted = $this->repository->delete($tithe->id);

        $this->assertTrue($deleted);
        $this->assertNull(Tithe::find($tithe->id));
    }

    public function test_get_by_date_range_returns_correct_tithes()
    {
        Tithe::factory()->create(['date' => '2024-01-15']);
        Tithe::factory()->create(['date' => '2024-02-15']);
        Tithe::factory()->create(['date' => '2024-03-15']);

        $results = $this->repository->getByDateRange('2024-01-01', '2024-02-28');

        $this->assertCount(2, $results);
    }

    public function test_filter_by_payment_method()
    {
        Tithe::factory()->count(3)->create(['payment_method' => 'cash']);
        Tithe::factory()->count(2)->create(['payment_method' => 'online']);

        $cash = $this->repository->filterByPaymentMethod('cash');
        $online = $this->repository->filterByPaymentMethod('online');

        $this->assertCount(3, $cash);
        $this->assertCount(2, $online);
    }

    public function test_filter_by_member()
    {
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();
        
        Tithe::factory()->count(3)->create(['member_id' => $member1->id]);
        Tithe::factory()->count(2)->create(['member_id' => $member2->id]);

        $results = $this->repository->filterByMember($member1->id);

        $this->assertCount(3, $results);
    }

    public function test_get_total_for_current_month()
    {
        Tithe::factory()->create(['amount' => 100, 'date' => now()]);
        Tithe::factory()->create(['amount' => 200, 'date' => now()]);
        Tithe::factory()->create(['amount' => 150, 'date' => now()->subMonths(2)]);

        $total = $this->repository->getTotalForCurrentMonth();

        $this->assertEquals(300, $total);
    }

    public function test_get_total_by_date_range()
    {
        Tithe::factory()->create(['amount' => 100, 'date' => '2024-01-15']);
        Tithe::factory()->create(['amount' => 200, 'date' => '2024-02-15']);
        Tithe::factory()->create(['amount' => 150, 'date' => '2024-03-15']);

        $total = $this->repository->getTotalByDateRange('2024-01-01', '2024-02-28');

        $this->assertEquals(300, $total);
    }

    public function test_get_average_per_member()
    {
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();
        
        Tithe::factory()->create(['member_id' => $member1->id, 'amount' => 100, 'date' => '2024-01-15']);
        Tithe::factory()->create(['member_id' => $member2->id, 'amount' => 200, 'date' => '2024-01-20']);

        $average = $this->repository->getAveragePerMember('2024-01-01', '2024-01-31');

        $this->assertEquals(150, $average);
    }

    public function test_get_monthly_totals()
    {
        Tithe::factory()->create(['amount' => 100, 'date' => now()->subMonths(1)]);
        Tithe::factory()->create(['amount' => 200, 'date' => now()->subMonths(1)]);
        Tithe::factory()->create(['amount' => 150, 'date' => now()]);

        $totals = $this->repository->getMonthlyTotals(12);

        $this->assertGreaterThan(0, $totals->count());
    }

    public function test_search_by_notes()
    {
        Tithe::factory()->create(['notes' => 'Special offering']);
        Tithe::factory()->create(['notes' => 'Regular tithe']);

        $results = $this->repository->search('Special');

        $this->assertCount(1, $results);
    }

    public function test_get_summary_returns_correct_data()
    {
        $member = Member::factory()->create();
        
        Tithe::factory()->create(['member_id' => $member->id, 'amount' => 100, 'payment_method' => 'cash', 'date' => '2024-01-15']);
        Tithe::factory()->create(['member_id' => $member->id, 'amount' => 200, 'payment_method' => 'online', 'date' => '2024-01-20']);

        $summary = $this->repository->getSummary('2024-01-01', '2024-01-31');

        $this->assertEquals(300, $summary['total_giving']);
        $this->assertEquals(2, $summary['total_transactions']);
        $this->assertEquals(1, $summary['unique_givers']);
    }

    public function test_paginate_with_filters()
    {
        Tithe::factory()->count(60)->create(['payment_method' => 'cash']);
        Tithe::factory()->count(10)->create(['payment_method' => 'online']);

        $paginated = $this->repository->paginate(50, ['payment_method' => 'cash']);

        $this->assertCount(50, $paginated->items());
        $this->assertEquals(60, $paginated->total());
    }

    public function test_eager_loading_with_member()
    {
        $member = Member::factory()->create();
        $createdTithe = Tithe::factory()->create(['member_id' => $member->id]);

        $tithe = $this->repository->find($createdTithe->id, ['member']);

        $this->assertNotNull($tithe);
        $this->assertTrue($tithe->relationLoaded('member'));
    }
}
