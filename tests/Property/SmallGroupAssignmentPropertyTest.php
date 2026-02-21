<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\SmallGroup;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Small Group Assignment
 * 
 * Feature: church-management-system
 * Property 18: Small group assignment
 * **Validates: Requirements 8.2**
 * 
 * Property: For any member and any small group, an administrator should be able 
 * to assign the member to the group, and the assignment should be reflected in 
 * both the member record and the group's member list.
 */
class SmallGroupAssignmentPropertyTest extends TestCase
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
     * Test that assigning a member to a small group is reflected in both records.
     * 
     * @test
     */
    public function member_assignment_to_small_group_is_bidirectional()
    {
        $this->forAll(
            Generators::names(),
            Generators::names(),
            Generators::string(),
            Generators::elements('active', 'visitor'),
            Generators::names(),
            Generators::elements('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
        )
            ->withMaxSize(100) // Run 100 iterations as specified in design
            ->then(function ($firstName, $lastName, $emailPrefix, $status, $groupName, $meetingDay) {
                // Create a member without a small group
                $member = Member::create([
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => strtolower($emailPrefix) . uniqid() . '@test.com',
                    'phone' => '+1' . rand(1000000000, 9999999999),
                    'address' => 'Test Address',
                    'city' => 'Test City',
                    'status' => $status,
                    'small_group_id' => null,
                    'date_joined' => now()->format('Y-m-d'),
                    'gender' => 'male',
                ]);
                
                // Create a small group
                $smallGroup = SmallGroup::create([
                    'name' => 'Group ' . $groupName . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Test Leader',
                    'meeting_day' => $meetingDay,
                    'meeting_time' => '18:00',
                    'location' => 'Test Location',
                ]);
                
                // Verify member is not assigned to any group initially
                $this->assertNull($member->small_group_id, 'Member should not be assigned to any group initially');
                
                // ASSIGN: Assign the member to the small group
                $member->update(['small_group_id' => $smallGroup->id]);
                $member->refresh();
                
                // PROPERTY 1: Assignment should be reflected in the member record
                $this->assertEquals(
                    $smallGroup->id,
                    $member->small_group_id,
                    'Member record should reflect the small group assignment'
                );
                
                // PROPERTY 2: Assignment should be reflected in the group's member list
                $groupMembers = $smallGroup->members()->get();
                $memberInGroup = $groupMembers->contains(function ($m) use ($member) {
                    return $m->id === $member->id;
                });
                
                $this->assertTrue(
                    $memberInGroup,
                    'Small group member list should contain the assigned member'
                );
                
                // PROPERTY 3: Member relationship should be accessible
                $memberWithGroup = Member::with('smallGroup')->find($member->id);
                $this->assertNotNull($memberWithGroup->smallGroup, 'Member should have a smallGroup relationship');
                $this->assertEquals(
                    $smallGroup->id,
                    $memberWithGroup->smallGroup->id,
                    'Member smallGroup relationship should reference the correct group'
                );
                
                // PROPERTY 4: Group member count should reflect the assignment
                $groupWithCount = SmallGroup::withCount('members')->find($smallGroup->id);
                $this->assertEquals(
                    1,
                    $groupWithCount->members_count,
                    'Small group member count should be 1 after assignment'
                );
                
                // Clean up
                $member->delete();
                $smallGroup->delete();
            });
    }

    /**
     * Test that assigning multiple members to a group is reflected correctly.
     * 
     * @test
     */
    public function multiple_member_assignments_are_reflected_correctly()
    {
        $this->forAll(
            Generators::names(),
            Generators::choose(1, 10) // Number of members to assign
        )
            ->withMaxSize(100)
            ->then(function ($groupName, $memberCount) {
                // Create a small group
                $smallGroup = SmallGroup::create([
                    'name' => 'Group ' . $groupName . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Test Leader',
                    'meeting_day' => 'Monday',
                    'meeting_time' => '18:00',
                    'location' => 'Test Location',
                ]);
                
                // Create and assign multiple members
                $members = [];
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
                    $members[] = $member;
                }
                
                // PROPERTY: All members should be in the group's member list
                $groupMembers = $smallGroup->members()->get();
                $this->assertEquals(
                    $memberCount,
                    $groupMembers->count(),
                    'Group member list should contain all assigned members'
                );
                
                // PROPERTY: Each member should have the correct group assignment
                foreach ($members as $member) {
                    $member->refresh();
                    $this->assertEquals(
                        $smallGroup->id,
                        $member->small_group_id,
                        "Member {$member->id} should be assigned to the group"
                    );
                }
                
                // PROPERTY: Group member count should match the number of assigned members
                $groupWithCount = SmallGroup::withCount('members')->find($smallGroup->id);
                $this->assertEquals(
                    $memberCount,
                    $groupWithCount->members_count,
                    'Group member count should match the number of assigned members'
                );
                
                // Clean up
                foreach ($members as $member) {
                    $member->delete();
                }
                $smallGroup->delete();
            });
    }

    /**
     * Test that reassigning a member from one group to another works correctly.
     * 
     * @test
     */
    public function member_reassignment_between_groups_is_reflected_correctly()
    {
        $this->forAll(
            Generators::names(),
            Generators::names(),
            Generators::names()
        )
            ->withMaxSize(100)
            ->then(function ($memberName, $group1Name, $group2Name) {
                // Create two small groups
                $group1 = SmallGroup::create([
                    'name' => 'Group1 ' . $group1Name . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Leader 1',
                    'meeting_day' => 'Monday',
                    'meeting_time' => '18:00',
                    'location' => 'Location 1',
                ]);
                
                $group2 = SmallGroup::create([
                    'name' => 'Group2 ' . $group2Name . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Leader 2',
                    'meeting_day' => 'Tuesday',
                    'meeting_time' => '19:00',
                    'location' => 'Location 2',
                ]);
                
                // Create a member assigned to group1
                $member = Member::create([
                    'first_name' => $memberName,
                    'last_name' => 'Test' . uniqid(),
                    'email' => strtolower($memberName) . uniqid() . '@test.com',
                    'phone' => '+1' . rand(1000000000, 9999999999),
                    'address' => 'Test Address',
                    'city' => 'Test City',
                    'status' => 'active',
                    'small_group_id' => $group1->id,
                    'date_joined' => now()->format('Y-m-d'),
                    'gender' => 'female',
                ]);
                
                // Verify initial assignment to group1
                $this->assertEquals($group1->id, $member->small_group_id);
                $group1Members = $group1->members()->get();
                $this->assertTrue($group1Members->contains('id', $member->id));
                
                // REASSIGN: Move member from group1 to group2
                $member->update(['small_group_id' => $group2->id]);
                $member->refresh();
                
                // PROPERTY 1: Member record should reflect the new assignment
                $this->assertEquals(
                    $group2->id,
                    $member->small_group_id,
                    'Member should be assigned to group2 after reassignment'
                );
                
                // PROPERTY 2: Member should be in group2's member list
                $group2Members = $group2->members()->get();
                $this->assertTrue(
                    $group2Members->contains('id', $member->id),
                    'Group2 member list should contain the reassigned member'
                );
                
                // PROPERTY 3: Member should NOT be in group1's member list anymore
                $group1MembersAfter = $group1->members()->get();
                $this->assertFalse(
                    $group1MembersAfter->contains('id', $member->id),
                    'Group1 member list should not contain the member after reassignment'
                );
                
                // PROPERTY 4: Group counts should be updated correctly
                $group1WithCount = SmallGroup::withCount('members')->find($group1->id);
                $group2WithCount = SmallGroup::withCount('members')->find($group2->id);
                
                $this->assertEquals(0, $group1WithCount->members_count, 'Group1 should have 0 members');
                $this->assertEquals(1, $group2WithCount->members_count, 'Group2 should have 1 member');
                
                // Clean up
                $member->delete();
                $group1->delete();
                $group2->delete();
            });
    }

    /**
     * Test that unassigning a member from a group works correctly.
     * 
     * @test
     */
    public function member_unassignment_from_group_is_reflected_correctly()
    {
        $this->forAll(
            Generators::names(),
            Generators::names()
        )
            ->withMaxSize(100)
            ->then(function ($memberName, $groupName) {
                // Create a small group
                $smallGroup = SmallGroup::create([
                    'name' => 'Group ' . $groupName . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Test Leader',
                    'meeting_day' => 'Wednesday',
                    'meeting_time' => '18:00',
                    'location' => 'Test Location',
                ]);
                
                // Create a member assigned to the group
                $member = Member::create([
                    'first_name' => $memberName,
                    'last_name' => 'Test' . uniqid(),
                    'email' => strtolower($memberName) . uniqid() . '@test.com',
                    'phone' => '+1' . rand(1000000000, 9999999999),
                    'address' => 'Test Address',
                    'city' => 'Test City',
                    'status' => 'active',
                    'small_group_id' => $smallGroup->id,
                    'date_joined' => now()->format('Y-m-d'),
                    'gender' => 'other',
                ]);
                
                // Verify initial assignment
                $this->assertEquals($smallGroup->id, $member->small_group_id);
                
                // UNASSIGN: Remove member from the group
                $member->update(['small_group_id' => null]);
                $member->refresh();
                
                // PROPERTY 1: Member record should reflect no group assignment
                $this->assertNull(
                    $member->small_group_id,
                    'Member should not be assigned to any group after unassignment'
                );
                
                // PROPERTY 2: Member should NOT be in the group's member list
                $groupMembers = $smallGroup->members()->get();
                $this->assertFalse(
                    $groupMembers->contains('id', $member->id),
                    'Group member list should not contain the unassigned member'
                );
                
                // PROPERTY 3: Group member count should be zero
                $groupWithCount = SmallGroup::withCount('members')->find($smallGroup->id);
                $this->assertEquals(
                    0,
                    $groupWithCount->members_count,
                    'Group should have 0 members after unassignment'
                );
                
                // PROPERTY 4: Member smallGroup relationship should be null
                $memberWithGroup = Member::with('smallGroup')->find($member->id);
                $this->assertNull(
                    $memberWithGroup->smallGroup,
                    'Member smallGroup relationship should be null after unassignment'
                );
                
                // Clean up
                $member->delete();
                $smallGroup->delete();
            });
    }

    /**
     * Test that assignment persists across database queries.
     * 
     * @test
     */
    public function member_assignment_persists_across_queries()
    {
        $this->forAll(
            Generators::names(),
            Generators::names()
        )
            ->withMaxSize(100)
            ->then(function ($memberName, $groupName) {
                // Create a small group
                $smallGroup = SmallGroup::create([
                    'name' => 'Group ' . $groupName . ' ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Test Leader',
                    'meeting_day' => 'Thursday',
                    'meeting_time' => '18:00',
                    'location' => 'Test Location',
                ]);
                
                // Create and assign a member
                $member = Member::create([
                    'first_name' => $memberName,
                    'last_name' => 'Test' . uniqid(),
                    'email' => strtolower($memberName) . uniqid() . '@test.com',
                    'phone' => '+1' . rand(1000000000, 9999999999),
                    'address' => 'Test Address',
                    'city' => 'Test City',
                    'status' => 'active',
                    'small_group_id' => $smallGroup->id,
                    'date_joined' => now()->format('Y-m-d'),
                    'gender' => 'male',
                ]);
                
                $memberId = $member->id;
                $groupId = $smallGroup->id;
                
                // Clear any cached data
                unset($member);
                unset($smallGroup);
                
                // PROPERTY: Assignment should persist when queried fresh from database
                $freshMember = Member::find($memberId);
                $this->assertEquals(
                    $groupId,
                    $freshMember->small_group_id,
                    'Member assignment should persist in database'
                );
                
                $freshGroup = SmallGroup::find($groupId);
                $freshGroupMembers = $freshGroup->members()->get();
                $this->assertTrue(
                    $freshGroupMembers->contains('id', $memberId),
                    'Group member list should persist in database'
                );
                
                // Verify through direct database query
                $this->assertDatabaseHas('members', [
                    'id' => $memberId,
                    'small_group_id' => $groupId,
                ]);
                
                // Clean up
                $freshMember->delete();
                $freshGroup->delete();
            });
    }
}
