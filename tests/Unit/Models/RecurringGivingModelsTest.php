<?php

namespace Tests\Unit\Models;

use App\Models\Member;
use App\Models\OfferingType;
use App\Models\RecurringGiving;
use App\Models\Offering;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RecurringGivingModelsTest extends TestCase
{
    use RefreshDatabase;

    public function test_recurring_giving_can_be_created_with_valid_data()
    {
        $member = Member::factory()->create();
        $offeringType = OfferingType::create([
            'name' => 'Tithe',
            'description' => 'Regular tithe',
        ]);

        $recurringGiving = RecurringGiving::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 500.00,
            'frequency' => 'monthly',
            'start_date' => '2025-01-01',
            'next_expected_date' => '2025-02-01',
            'is_active' => true,
        ]);

        $this->assertDatabaseHas('recurring_givings', [
            'member_id' => $member->id,
            'amount' => 500.00,
            'frequency' => 'monthly',
        ]);
    }

    public function test_recurring_giving_belongs_to_member()
    {
        $member = Member::factory()->create();
        $offeringType = OfferingType::create([
            'name' => 'Tithe',
            'description' => 'Regular tithe',
        ]);

        $recurringGiving = RecurringGiving::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 500.00,
            'frequency' => 'monthly',
            'start_date' => '2025-01-01',
            'next_expected_date' => '2025-02-01',
        ]);

        $this->assertEquals($member->id, $recurringGiving->member->id);
    }

    public function test_recurring_giving_belongs_to_offering_type()
    {
        $member = Member::factory()->create();
        $offeringType = OfferingType::create([
            'name' => 'Tithe',
            'description' => 'Regular tithe',
        ]);

        $recurringGiving = RecurringGiving::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'amount' => 500.00,
            'frequency' => 'monthly',
            'start_date' => '2025-01-01',
            'next_expected_date' => '2025-02-01',
        ]);

        $this->assertEquals($offeringType->id, $recurringGiving->offeringType->id);
    }
}
