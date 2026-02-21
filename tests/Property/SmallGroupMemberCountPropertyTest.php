<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\SmallGroup;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Small Group Member Count Accuracy
 * 
 * Feature: church-management-system
 * Property 21: Count accuracy invariant
 * **Validates: Requirements 8.5**
 * 
 * Property: For any small group, the displayed member_count should always equal 
 * the actual number of member records assigned to that group.
 */
class SmallGroupMemberCountPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected function setUp(): void
    {
        parent::setUp();
        // Manually initialize Eris since #[Before] attribute might not work in this PHPUnit version
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
    }

    /**
     * Test that member_count always equals the actual number of members in a small group.
     * 
     * @test
     */
    public function small_group_member_count_matches_actual_members()
    {
        $this->forAll(
            Generators::names(),
            Generators::names(),
            Generators::elements('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
            Generators::choose(0, 20) // Number of members to create (0 to 20)
        )
            ->withMaxSize(100) // Run 100 iterations as specified in design
            ->then(function ($groupName, $leaderName, $meetingDay, $memberCount) {
                // Create a small group
                $smallGroup = SmallGroup::create([
                    'name' => 'Group ' . $groupName . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => $leaderName,
                    'meeting_day' => $meetingDay,
                    'meeting_time' => '18:00',
                    'location' => 'Test Location',
                ]);
                
                // Create the specified number of members and assign them to the group
                $createdMembers = [];
                for ($i = 0; $i < $memberCount; $i++) {
                    $member = Member::create([
                        'first_name' => 'Member' . $i,
                        'last_name' => 'Test' . uniqid(),
                        'email' => 'member' . $i . uniqid() . '@test.com',
                        'phone' => '+1' . rand(1000000000, 9999999999),
                        'address' => 'Test Address',
                        'city' => 'Test City',
                        'status' => 'active',
                        'small_group_id' => $smallGroup->id,
                        'date_joined' => now()->format('Y-m-d'),
                        'gender' => 'male',
                    ]);
                    $createdMembers[] = $member;
                }
                
                // Retrieve the small group with member count
                $retrievedGroup = SmallGroup::withCount('members')->find($smallGroup->id);
                
                // INVARIANT: member_count should equal actual number of members
                $actualMemberCount = Member::where('small_group_id', $smallGroup->id)->count();
                
                $this->assertEquals(
                    $actualMemberCount,
                    $retrievedGroup->members_count,
                    "Small group member_count ({$retrievedGroup->members_count}) should equal actual member count ({$actualMemberCount})"
                );
                
                $this->assertEquals(
                    $memberCount,
                    $retrievedGroup->members_count,
                    "Small group member_count ({$retrievedGroup->members_count}) should equal expected member count ({$memberCount})"
                );
                
                // Also verify using the accessor method
                $this->assertEquals(
                    $actualMemberCount,
                    $retrievedGroup->member_count,
                    "Small group member_count accessor should return actual member count"
                );
                
                // Clean up
                foreach ($createdMembers as $member) {
                    $member->delete();
                }
                $smallGroup->delete();
            });
    }

    /**
     * Test that member_count updates correctly when members are added or removed.
     * 
     * @test
     */
    public function small_group_member_count_updates_when_members_change()
    {
        $this->forAll(
            Generators::names(),
            Generators::choose(1, 10), // Initial member count
            Generators::choose(0, 5)   // Members to add
        )
            ->withMaxSize(100)
            ->then(function ($groupName, $initialCount, $membersToAdd) {
                // Create a small group
                $smallGroup = SmallGroup::create([
                    'name' => 'Group ' . $groupName . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Test Leader',
                    'meeting_day' => 'Monday',
                    'meeting_time' => '18:00',
                    'location' => 'Test Location',
                ]);
                
                // Create initial members
                $members = [];
                for ($i = 0; $i < $initialCount; $i++) {
                    $members[] = Member::create([
                        'first_name' => 'Member' . $i,
                        'last_name' => 'Test' . uniqid(),
                        'email' => 'member' . $i . uniqid() . '@test.com',
                        'phone' => '+1' . rand(1000000000, 9999999999),
                        'address' => 'Test Address',
                        'city' => 'Test City',
                        'status' => 'active',
                        'small_group_id' => $smallGroup->id,
                        'date_joined' => now()->format('Y-m-d'),
                        'gender' => 'male',
                    ]);
                }
                
                // Verify initial count
                $group = SmallGroup::withCount('members')->find($smallGroup->id);
                $this->assertEquals($initialCount, $group->members_count, 'Initial member count should match');
                
                // Add more members
                for ($i = 0; $i < $membersToAdd; $i++) {
                    $members[] = Member::create([
                        'first_name' => 'NewMember' . $i,
                        'last_name' => 'Test' . uniqid(),
                        'email' => 'newmember' . $i . uniqid() . '@test.com',
                        'phone' => '+1' . rand(1000000000, 9999999999),
                        'address' => 'Test Address',
                        'city' => 'Test City',
                        'status' => 'active',
                        'small_group_id' => $smallGroup->id,
                        'date_joined' => now()->format('Y-m-d'),
                        'gender' => 'female',
                    ]);
                }
                
                // Verify count after adding members
                $group = SmallGroup::withCount('members')->find($smallGroup->id);
                $expectedCount = $initialCount + $membersToAdd;
                $this->assertEquals($expectedCount, $group->members_count, 'Member count should update after adding members');
                
                // Remove half of the members
                $membersToRemove = (int) floor(count($members) / 2);
                for ($i = 0; $i < $membersToRemove; $i++) {
                    $members[$i]->delete();
                }
                
                // Verify count after removing members
                $group = SmallGroup::withCount('members')->find($smallGroup->id);
                $expectedCount = count($members) - $membersToRemove;
                $this->assertEquals($expectedCount, $group->members_count, 'Member count should update after removing members');
                
                // Clean up remaining members
                foreach ($members as $member) {
                    if ($member->exists) {
                        $member->delete();
                    }
                }
                $smallGroup->delete();
            });
    }

    /**
     * Test that member_count is zero for groups with no members.
     * 
     * @test
     */
    public function small_group_member_count_is_zero_for_empty_groups()
    {
        $this->forAll(
            Generators::names(),
            Generators::names(),
            Generators::elements('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
        )
            ->withMaxSize(100)
            ->then(function ($groupName, $leaderName, $meetingDay) {
                // Create a small group without any members
                $smallGroup = SmallGroup::create([
                    'name' => 'Group ' . $groupName . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => $leaderName,
                    'meeting_day' => $meetingDay,
                    'meeting_time' => '18:00',
                    'location' => 'Test Location',
                ]);
                
                // Retrieve the small group with member count
                $retrievedGroup = SmallGroup::withCount('members')->find($smallGroup->id);
                
                // INVARIANT: member_count should be zero for empty groups
                $this->assertEquals(0, $retrievedGroup->members_count, 'Empty group should have member_count of 0');
                $this->assertEquals(0, $retrievedGroup->member_count, 'Empty group accessor should return 0');
                
                // Verify no members exist for this group
                $actualCount = Member::where('small_group_id', $smallGroup->id)->count();
                $this->assertEquals(0, $actualCount, 'No members should exist for this group');
                
                // Clean up
                $smallGroup->delete();
            });
    }

    /**
     * Test that member_count remains accurate when members change groups.
     * 
     * @test
     */
    public function small_group_member_count_updates_when_members_switch_groups()
    {
        $this->forAll(
            Generators::choose(1, 5), // Members in first group
            Generators::choose(1, 5)  // Members in second group
        )
            ->withMaxSize(100)
            ->then(function ($group1Count, $group2Count) {
                // Create two small groups
                $group1 = SmallGroup::create([
                    'name' => 'Group 1 ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Leader 1',
                    'meeting_day' => 'Monday',
                    'meeting_time' => '18:00',
                    'location' => 'Location 1',
                ]);
                
                $group2 = SmallGroup::create([
                    'name' => 'Group 2 ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Leader 2',
                    'meeting_day' => 'Tuesday',
                    'meeting_time' => '19:00',
                    'location' => 'Location 2',
                ]);
                
                // Create members for group 1
                $group1Members = [];
                for ($i = 0; $i < $group1Count; $i++) {
                    $group1Members[] = Member::create([
                        'first_name' => 'G1Member' . $i,
                        'last_name' => 'Test' . uniqid(),
                        'email' => 'g1member' . $i . uniqid() . '@test.com',
                        'phone' => '+1' . rand(1000000000, 9999999999),
                        'address' => 'Test Address',
                        'city' => 'Test City',
                        'status' => 'active',
                        'small_group_id' => $group1->id,
                        'date_joined' => now()->format('Y-m-d'),
                        'gender' => 'male',
                    ]);
                }
                
                // Create members for group 2
                $group2Members = [];
                for ($i = 0; $i < $group2Count; $i++) {
                    $group2Members[] = Member::create([
                        'first_name' => 'G2Member' . $i,
                        'last_name' => 'Test' . uniqid(),
                        'email' => 'g2member' . $i . uniqid() . '@test.com',
                        'phone' => '+1' . rand(1000000000, 9999999999),
                        'address' => 'Test Address',
                        'city' => 'Test City',
                        'status' => 'active',
                        'small_group_id' => $group2->id,
                        'date_joined' => now()->format('Y-m-d'),
                        'gender' => 'female',
                    ]);
                }
                
                // Verify initial counts
                $g1 = SmallGroup::withCount('members')->find($group1->id);
                $g2 = SmallGroup::withCount('members')->find($group2->id);
                $this->assertEquals($group1Count, $g1->members_count, 'Group 1 initial count should match');
                $this->assertEquals($group2Count, $g2->members_count, 'Group 2 initial count should match');
                
                // Move first member from group 1 to group 2
                if (count($group1Members) > 0) {
                    $memberToMove = $group1Members[0];
                    $memberToMove->update(['small_group_id' => $group2->id]);
                    
                    // Verify counts after move
                    $g1 = SmallGroup::withCount('members')->find($group1->id);
                    $g2 = SmallGroup::withCount('members')->find($group2->id);
                    
                    $this->assertEquals($group1Count - 1, $g1->members_count, 'Group 1 count should decrease by 1');
                    $this->assertEquals($group2Count + 1, $g2->members_count, 'Group 2 count should increase by 1');
                }
                
                // Clean up
                foreach (array_merge($group1Members, $group2Members) as $member) {
                    if ($member->exists) {
                        $member->delete();
                    }
                }
                $group1->delete();
                $group2->delete();
            });
    }
}
