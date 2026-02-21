<?php

namespace Tests\Unit\Models;

use App\Models\Member;
use App\Models\OfferingType;
use App\Models\Pledge;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PledgeModelsTest extends TestCase
{
    use RefreshDatabase;

    public function test_pledge_can_be_created_with_valid_data()
    {
        $member = Member::factory()->create();
        $offeringType = OfferingType::create([
            'name' => 'Building Fund',
            'description' => 'Building fund donations',
        ]);

        $pledge = Pledge::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'pledged_amount' => 10000.00,
            'start_date' => '2025-01-01',
            'end_date' => '2025-12-31',
            'purpose' => 'New church building',
            'is_completed' => false,
        ]);

        $this->assertDatabaseHas('pledges', [
            'member_id' => $member->id,
            'pledged_amount' => 10000.00,
            'purpose' => 'New church building',
        ]);
    }

    public function test_pledge_belongs_to_member()
    {
        $member = Member::factory()->create();
        $offeringType = OfferingType::create([
            'name' => 'Building Fund',
            'description' => 'Building fund donations',
        ]);

        $pledge = Pledge::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'pledged_amount' => 10000.00,
            'start_date' => '2025-01-01',
            'end_date' => '2025-12-31',
        ]);

        $this->assertEquals($member->id, $pledge->member->id);
    }

    public function test_pledge_belongs_to_offering_type()
    {
        $member = Member::factory()->create();
        $offeringType = OfferingType::create([
            'name' => 'Building Fund',
            'description' => 'Building fund donations',
        ]);

        $pledge = Pledge::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'pledged_amount' => 10000.00,
            'start_date' => '2025-01-01',
            'end_date' => '2025-12-31',
        ]);

        $this->assertEquals($offeringType->id, $pledge->offeringType->id);
    }
}
