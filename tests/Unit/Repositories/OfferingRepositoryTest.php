<?php

namespace Tests\Unit\Repositories;

use App\Models\Fund;
use App\Models\Member;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Pledge;
use App\Models\RecurringGiving;
use App\Repositories\OfferingRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OfferingRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected OfferingRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new OfferingRepository();
    }

    public function test_can_create_offering()
    {
        $member = Member::factory()->create();
        $offeringType = OfferingType::factory()->create();
        
        $data = [
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => '2024-01-01',
        ];

        $offering = $this->repository->create($data);

        $this->assertInstanceOf(Offering::class, $offering);
        $this->assertEquals(100.00, $offering->amount);
    }

    public function test_can_find_offering_by_id()
    {
        $offering = Offering::factory()->create();

        $found = $this->repository->find($offering->id);

        $this->assertNotNull($found);
        $this->assertEquals($offering->id, $found->id);
    }

    public function test_can_update_offering()
    {
        $offering = Offering::factory()->create(['amount' => 100.00]);

        $updated = $this->repository->update($offering->id, ['amount' => 150.00]);

        $this->assertTrue($updated);
        $this->assertEquals(150.00, $offering->fresh()->amount);
    }

    public function test_can_delete_offering()
    {
        $offering = Offering::factory()->create();

        $deleted = $this->repository->delete($offering->id);

        $this->assertTrue($deleted);
        $this->assertSoftDeleted('offerings', ['id' => $offering->id]);
    }

    public function test_get_by_date_range_returns_correct_offerings()
    {
        Offering::factory()->create(['date' => '2024-01-15']);
        Offering::factory()->create(['date' => '2024-02-15']);
        Offering::factory()->create(['date' => '2024-03-15']);

        $results = $this->repository->getByDateRange('2024-01-01', '2024-02-28');

        $this->assertCount(2, $results);
    }

    public function test_filter_by_type()
    {
        $type1 = OfferingType::factory()->create();
        $type2 = OfferingType::factory()->create();
        
        Offering::factory()->count(3)->create(['offering_type_id' => $type1->id]);
        Offering::factory()->count(2)->create(['offering_type_id' => $type2->id]);

        $results = $this->repository->filterByType($type1->id);

        $this->assertCount(3, $results);
    }

    public function test_filter_by_payment_method()
    {
        Offering::factory()->count(3)->create(['payment_method' => 'cash']);
        Offering::factory()->count(2)->create(['payment_method' => 'online']);

        $cash = $this->repository->filterByPaymentMethod('cash');
        $online = $this->repository->filterByPaymentMethod('online');

        $this->assertCount(3, $cash);
        $this->assertCount(2, $online);
    }

    public function test_filter_by_member()
    {
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();
        
        Offering::factory()->count(3)->create(['member_id' => $member1->id]);
        Offering::factory()->count(2)->create(['member_id' => $member2->id]);

        $results = $this->repository->filterByMember($member1->id);

        $this->assertCount(3, $results);
    }

    public function test_filter_by_amount_range()
    {
        Offering::factory()->create(['amount' => 50]);
        Offering::factory()->create(['amount' => 100]);
        Offering::factory()->create(['amount' => 150]);
        Offering::factory()->create(['amount' => 200]);

        $results = $this->repository->filterByAmountRange(100, 150);

        $this->assertCount(2, $results);
    }

    public function test_filter_by_fund()
    {
        $fund1 = Fund::factory()->create();
        $fund2 = Fund::factory()->create();
        
        Offering::factory()->count(3)->create(['fund_id' => $fund1->id]);
        Offering::factory()->count(2)->create(['fund_id' => $fund2->id]);

        $results = $this->repository->filterByFund($fund1->id);

        $this->assertCount(3, $results);
    }

    public function test_get_anonymous_offerings()
    {
        Offering::factory()->count(3)->create(['is_anonymous' => true]);
        Offering::factory()->count(2)->create(['is_anonymous' => false]);

        $results = $this->repository->getAnonymous();

        $this->assertCount(3, $results);
    }

    public function test_get_total_for_current_month()
    {
        Offering::factory()->create(['amount' => 100, 'date' => now()]);
        Offering::factory()->create(['amount' => 200, 'date' => now()]);
        Offering::factory()->create(['amount' => 150, 'date' => now()->subMonths(2)]);

        $total = $this->repository->getTotalForCurrentMonth();

        $this->assertEquals(300, $total);
    }

    public function test_get_total_by_date_range()
    {
        Offering::factory()->create(['amount' => 100, 'date' => '2024-01-15']);
        Offering::factory()->create(['amount' => 200, 'date' => '2024-02-15']);
        Offering::factory()->create(['amount' => 150, 'date' => '2024-03-15']);

        $total = $this->repository->getTotalByDateRange('2024-01-01', '2024-02-28');

        $this->assertEquals(300, $total);
    }

    public function test_get_average_per_member()
    {
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();
        
        Offering::factory()->create(['member_id' => $member1->id, 'amount' => 100, 'date' => '2024-01-15']);
        Offering::factory()->create(['member_id' => $member2->id, 'amount' => 200, 'date' => '2024-01-20']);

        $average = $this->repository->getAveragePerMember('2024-01-01', '2024-01-31');

        $this->assertEquals(150, $average);
    }

    public function test_get_monthly_totals()
    {
        Offering::factory()->create(['amount' => 100, 'date' => now()->subMonths(1)]);
        Offering::factory()->create(['amount' => 200, 'date' => now()->subMonths(1)]);
        Offering::factory()->create(['amount' => 150, 'date' => now()]);

        $totals = $this->repository->getMonthlyTotals(12);

        $this->assertGreaterThan(0, $totals->count());
    }

    public function test_search_by_notes()
    {
        Offering::factory()->create(['notes' => 'Special offering']);
        Offering::factory()->create(['notes' => 'Regular tithe']);

        $results = $this->repository->search('Special');

        $this->assertCount(1, $results);
    }

    public function test_search_by_receipt_number()
    {
        Offering::factory()->create(['receipt_number' => 'REC-001']);
        Offering::factory()->create(['receipt_number' => 'REC-002']);

        $results = $this->repository->search('REC-001');

        $this->assertCount(1, $results);
    }

    public function test_get_summary_returns_correct_data()
    {
        $member = Member::factory()->create();
        $offeringType = OfferingType::factory()->create();
        $fund = Fund::factory()->create();
        
        Offering::factory()->create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'fund_id' => $fund->id,
            'amount' => 100,
            'payment_method' => 'cash',
            'date' => '2024-01-15'
        ]);
        Offering::factory()->create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'fund_id' => $fund->id,
            'amount' => 200,
            'payment_method' => 'online',
            'date' => '2024-01-20'
        ]);

        $summary = $this->repository->getSummary('2024-01-01', '2024-01-31');

        $this->assertEquals(300, $summary['total_giving']);
        $this->assertEquals(2, $summary['total_transactions']);
        $this->assertEquals(1, $summary['unique_givers']);
    }

    public function test_paginate_with_filters()
    {
        Offering::factory()->count(60)->create(['payment_method' => 'cash']);
        Offering::factory()->count(10)->create(['payment_method' => 'online']);

        $paginated = $this->repository->paginate(50, ['payment_method' => 'cash']);

        $this->assertCount(50, $paginated->items());
        $this->assertEquals(60, $paginated->total());
    }

    public function test_eager_loading_with_member()
    {
        $member = Member::factory()->create();
        $createdOffering = Offering::factory()->create(['member_id' => $member->id]);

        $offering = $this->repository->find($createdOffering->id, ['member']);

        $this->assertNotNull($offering);
        $this->assertTrue($offering->relationLoaded('member'));
    }

    public function test_get_by_member_and_year()
    {
        $member = Member::factory()->create();
        
        Offering::factory()->create(['member_id' => $member->id, 'date' => '2024-01-15']);
        Offering::factory()->create(['member_id' => $member->id, 'date' => '2024-06-15']);
        Offering::factory()->create(['member_id' => $member->id, 'date' => '2023-01-15']);

        $results = $this->repository->getByMemberAndYear($member->id, 2024);

        $this->assertCount(2, $results);
    }

    public function test_get_grouped_by_type_for_member_and_year()
    {
        $member = Member::factory()->create();
        $type1 = OfferingType::factory()->create();
        $type2 = OfferingType::factory()->create();
        
        Offering::factory()->create(['member_id' => $member->id, 'offering_type_id' => $type1->id, 'amount' => 100, 'date' => '2024-01-15']);
        Offering::factory()->create(['member_id' => $member->id, 'offering_type_id' => $type1->id, 'amount' => 150, 'date' => '2024-02-15']);
        Offering::factory()->create(['member_id' => $member->id, 'offering_type_id' => $type2->id, 'amount' => 200, 'date' => '2024-03-15']);

        $results = $this->repository->getGroupedByTypeForMemberAndYear($member->id, 2024);

        $this->assertCount(2, $results);
        $this->assertEquals(250, $results->firstWhere('offering_type_id', $type1->id)->total);
        $this->assertEquals(200, $results->firstWhere('offering_type_id', $type2->id)->total);
    }

    public function test_get_top_donors()
    {
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();
        $member3 = Member::factory()->create();
        
        Offering::factory()->create(['member_id' => $member1->id, 'amount' => 500, 'date' => '2024-01-15']);
        Offering::factory()->create(['member_id' => $member2->id, 'amount' => 300, 'date' => '2024-01-15']);
        Offering::factory()->create(['member_id' => $member3->id, 'amount' => 100, 'date' => '2024-01-15']);

        $results = $this->repository->getTopDonors('2024-01-01', '2024-01-31', 2);

        $this->assertCount(2, $results);
        $this->assertEquals($member1->id, $results->first()->member_id);
        $this->assertEquals(500, $results->first()->total_given);
    }

    public function test_get_by_recurring_giving()
    {
        $recurringGiving = RecurringGiving::factory()->create();
        
        Offering::factory()->count(3)->create(['recurring_giving_id' => $recurringGiving->id]);
        Offering::factory()->count(2)->create(['recurring_giving_id' => null]);

        $results = $this->repository->getByRecurringGiving($recurringGiving->id);

        $this->assertCount(3, $results);
    }

    public function test_get_by_pledge()
    {
        $pledge = Pledge::factory()->create();
        
        Offering::factory()->count(3)->create(['pledge_id' => $pledge->id]);
        Offering::factory()->count(2)->create(['pledge_id' => null]);

        $results = $this->repository->getByPledge($pledge->id);

        $this->assertCount(3, $results);
    }

    public function test_get_total_by_pledge()
    {
        $pledge = Pledge::factory()->create();
        
        Offering::factory()->create(['pledge_id' => $pledge->id, 'amount' => 100]);
        Offering::factory()->create(['pledge_id' => $pledge->id, 'amount' => 150]);
        Offering::factory()->create(['pledge_id' => $pledge->id, 'amount' => 200]);

        $total = $this->repository->getTotalByPledge($pledge->id);

        $this->assertEquals(450, $total);
    }

    public function test_receipt_number_exists()
    {
        Offering::factory()->create(['receipt_number' => 'REC-001']);

        $exists = $this->repository->receiptNumberExists('REC-001');
        $notExists = $this->repository->receiptNumberExists('REC-999');

        $this->assertTrue($exists);
        $this->assertFalse($notExists);
    }

    public function test_find_by_receipt_number()
    {
        $offering = Offering::factory()->create(['receipt_number' => 'REC-001']);

        $found = $this->repository->findByReceiptNumber('REC-001');

        $this->assertNotNull($found);
        $this->assertEquals($offering->id, $found->id);
    }

    public function test_get_count_by_date_range()
    {
        Offering::factory()->create(['date' => '2024-01-15']);
        Offering::factory()->create(['date' => '2024-02-15']);
        Offering::factory()->create(['date' => '2024-03-15']);

        $count = $this->repository->getCountByDateRange('2024-01-01', '2024-02-28');

        $this->assertEquals(2, $count);
    }
}
