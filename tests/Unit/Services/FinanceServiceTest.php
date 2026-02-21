<?php

namespace Tests\Unit\Services;

use App\Models\Member;
use App\Models\Tithe;
use App\Repositories\FinanceRepository;
use App\Services\FinanceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class FinanceServiceTest extends TestCase
{
    use RefreshDatabase;

    protected FinanceService $financeService;
    protected FinanceRepository $financeRepository;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->financeRepository = new FinanceRepository();
        $this->financeService = new FinanceService($this->financeRepository);
    }

    /** @test */
    public function it_can_record_a_tithe_with_valid_data()
    {
        $member = Member::factory()->create();
        
        $data = [
            'member_id' => $member->id,
            'amount' => 100.50,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
            'notes' => 'Test tithe',
        ];

        $tithe = $this->financeService->recordTithe($data);

        $this->assertInstanceOf(Tithe::class, $tithe);
        $this->assertEquals(100.50, $tithe->amount);
        $this->assertEquals('cash', $tithe->payment_method);
        $this->assertDatabaseHas('tithes', [
            'member_id' => $member->id,
            'amount' => 100.50,
        ]);
    }

    /** @test */
    public function it_validates_required_fields_when_recording_tithe()
    {
        $this->expectException(ValidationException::class);

        $this->financeService->recordTithe([
            'payment_method' => 'cash',
        ]);
    }

    /** @test */
    public function it_validates_amount_is_positive()
    {
        $this->expectException(ValidationException::class);

        $this->financeService->recordTithe([
            'amount' => -50,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);
    }

    /** @test */
    public function it_validates_payment_method_is_valid()
    {
        $this->expectException(ValidationException::class);

        $this->financeService->recordTithe([
            'amount' => 100,
            'payment_method' => 'invalid_method',
            'date' => '2024-01-15',
        ]);
    }

    /** @test */
    public function it_can_get_tithe_by_id()
    {
        $tithe = Tithe::factory()->create();

        $result = $this->financeService->getTitheById($tithe->id);

        $this->assertInstanceOf(Tithe::class, $result);
        $this->assertEquals($tithe->id, $result->id);
    }

    /** @test */
    public function it_returns_null_for_non_existent_tithe()
    {
        $result = $this->financeService->getTitheById(9999);

        $this->assertNull($result);
    }

    /** @test */
    public function it_can_update_tithe()
    {
        $tithe = Tithe::factory()->create(['amount' => 100]);

        $updated = $this->financeService->updateTithe($tithe->id, [
            'amount' => 200,
            'payment_method' => 'online',
            'date' => '2024-01-20',
        ]);

        $this->assertEquals(200, $updated->amount);
        $this->assertEquals('online', $updated->payment_method);
    }

    /** @test */
    public function it_throws_exception_when_updating_non_existent_tithe()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Tithe not found');

        $this->financeService->updateTithe(9999, [
            'amount' => 100,
            'payment_method' => 'cash',
            'date' => '2024-01-15',
        ]);
    }

    /** @test */
    public function it_can_delete_tithe()
    {
        $tithe = Tithe::factory()->create();

        $result = $this->financeService->deleteTithe($tithe->id);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('tithes', ['id' => $tithe->id]);
    }

    /** @test */
    public function it_throws_exception_when_deleting_non_existent_tithe()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Tithe not found');

        $this->financeService->deleteTithe(9999);
    }

    /** @test */
    public function it_can_get_tithes_by_date_range()
    {
        Tithe::factory()->create(['date' => '2024-01-10']);
        Tithe::factory()->create(['date' => '2024-01-15']);
        Tithe::factory()->create(['date' => '2024-01-25']);

        $result = $this->financeService->getTithesByDateRange('2024-01-12', '2024-01-20');

        $this->assertCount(1, $result);
        $this->assertEquals('2024-01-15', $result->first()->date->format('Y-m-d'));
    }

    /** @test */
    public function it_validates_date_range()
    {
        $this->expectException(ValidationException::class);

        $this->financeService->getTithesByDateRange('2024-01-20', '2024-01-10');
    }

    /** @test */
    public function it_calculates_total_giving_for_date_range()
    {
        Tithe::factory()->create(['amount' => 100, 'date' => '2024-01-10']);
        Tithe::factory()->create(['amount' => 200, 'date' => '2024-01-15']);
        Tithe::factory()->create(['amount' => 150, 'date' => '2024-01-25']);

        $total = $this->financeService->calculateTotalGiving('2024-01-01', '2024-01-20');

        $this->assertEquals(300, $total);
    }

    /** @test */
    public function it_calculates_average_per_member()
    {
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();

        Tithe::factory()->create(['member_id' => $member1->id, 'amount' => 100, 'date' => '2024-01-10']);
        Tithe::factory()->create(['member_id' => $member2->id, 'amount' => 200, 'date' => '2024-01-15']);
        Tithe::factory()->create(['member_id' => $member1->id, 'amount' => 150, 'date' => '2024-01-20']);

        $average = $this->financeService->calculateAveragePerMember('2024-01-01', '2024-01-31');

        $this->assertEquals(225, $average); // 450 total / 2 unique members
    }

    /** @test */
    public function it_returns_zero_average_when_no_members_gave()
    {
        Tithe::factory()->create(['member_id' => null, 'amount' => 100, 'date' => '2024-01-10']);

        $average = $this->financeService->calculateAveragePerMember('2024-01-01', '2024-01-31');

        $this->assertEquals(0, $average);
    }

    /** @test */
    public function it_gets_monthly_trends()
    {
        Tithe::factory()->create(['amount' => 100, 'date' => now()->subMonths(2)]);
        Tithe::factory()->create(['amount' => 200, 'date' => now()->subMonth()]);
        Tithe::factory()->create(['amount' => 150, 'date' => now()]);

        $trends = $this->financeService->getMonthlyTrends(12);

        $this->assertGreaterThan(0, $trends->count());
    }

    /** @test */
    public function it_gets_financial_summary()
    {
        $member = Member::factory()->create();
        
        Tithe::factory()->create(['member_id' => $member->id, 'amount' => 100, 'payment_method' => 'cash', 'date' => '2024-01-10']);
        Tithe::factory()->create(['member_id' => $member->id, 'amount' => 200, 'payment_method' => 'online', 'date' => '2024-01-15']);

        $summary = $this->financeService->getFinancialSummary('2024-01-01', '2024-01-31');

        $this->assertEquals(300, $summary['total_giving']);
        $this->assertEquals(2, $summary['total_transactions']);
        $this->assertEquals(150, $summary['average_transaction']);
        $this->assertEquals(1, $summary['unique_givers']);
        $this->assertArrayHasKey('by_payment_method', $summary);
    }

    /** @test */
    public function it_can_filter_by_payment_method()
    {
        Tithe::factory()->create(['payment_method' => 'cash']);
        Tithe::factory()->create(['payment_method' => 'online']);
        Tithe::factory()->create(['payment_method' => 'cash']);

        $result = $this->financeService->filterByPaymentMethod('cash');

        $this->assertCount(2, $result);
        $this->assertTrue($result->every(fn($tithe) => $tithe->payment_method === 'cash'));
    }

    /** @test */
    public function it_validates_payment_method_when_filtering()
    {
        $this->expectException(ValidationException::class);

        $this->financeService->filterByPaymentMethod('invalid');
    }

    /** @test */
    public function it_can_filter_by_member()
    {
        $member = Member::factory()->create();
        
        Tithe::factory()->create(['member_id' => $member->id]);
        Tithe::factory()->create(['member_id' => $member->id]);
        Tithe::factory()->create(['member_id' => null]);

        $result = $this->financeService->filterByMember($member->id);

        $this->assertCount(2, $result);
        $this->assertTrue($result->every(fn($tithe) => $tithe->member_id === $member->id));
    }

    /** @test */
    public function it_can_search_tithes()
    {
        $member = Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        
        Tithe::factory()->create(['member_id' => $member->id, 'notes' => 'Regular offering']);
        Tithe::factory()->create(['member_id' => null, 'notes' => 'Anonymous donation']);

        $result = $this->financeService->searchTithes('John');

        $this->assertGreaterThan(0, $result->count());
    }

    /** @test */
    public function it_returns_all_tithes_for_empty_search()
    {
        Tithe::factory()->count(3)->create();

        $result = $this->financeService->searchTithes('');

        $this->assertCount(3, $result);
    }

    /** @test */
    public function it_gets_total_for_current_month()
    {
        Tithe::factory()->create(['amount' => 100, 'date' => now()]);
        Tithe::factory()->create(['amount' => 200, 'date' => now()]);
        Tithe::factory()->create(['amount' => 150, 'date' => now()->subMonth()]);

        $total = $this->financeService->getTotalForCurrentMonth();

        $this->assertEquals(300, $total);
    }

    /** @test */
    public function it_can_get_paginated_tithes()
    {
        Tithe::factory()->count(60)->create();

        $result = $this->financeService->getPaginatedTithes(50);

        $this->assertEquals(50, $result->count());
        $this->assertEquals(60, $result->total());
    }

    /** @test */
    public function it_can_get_paginated_tithes_with_filters()
    {
        Tithe::factory()->create(['payment_method' => 'cash', 'date' => '2024-01-15']);
        Tithe::factory()->create(['payment_method' => 'online', 'date' => '2024-01-20']);
        Tithe::factory()->create(['payment_method' => 'cash', 'date' => '2024-02-10']);

        $result = $this->financeService->getPaginatedTithes(50, [
            'payment_method' => 'cash',
            'start_date' => '2024-01-01',
            'end_date' => '2024-01-31',
        ]);

        $this->assertCount(1, $result);
    }
}
