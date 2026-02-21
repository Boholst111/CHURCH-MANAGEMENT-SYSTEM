<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\SmallGroup;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Member Model CRUD Operations
 * 
 * Feature: church-management-system
 * Property 11: Leadership CRUD operations (adapted for Member)
 * Validates: Requirements 3.5
 * 
 * Property: For any valid member data, administrators should be able to create 
 * a new member, retrieve it, update its fields, and delete it, with each 
 * operation succeeding and persisting correctly.
 */
class MemberCrudPropertyTest extends TestCase
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
     * Test that member CRUD operations work correctly for any valid member data.
     * 
     * @test
     */
    public function member_crud_operations_succeed_for_valid_data()
    {
        $this->forAll(
            Generators::names(),
            Generators::names(),
            Generators::string(),
            Generators::string(),
            Generators::names(),
            Generators::elements('active', 'visitor'),
            Generators::date(
                new \DateTime('-5 years'),
                new \DateTime('now')
            ),
            Generators::oneOf(
                Generators::constant(null),
                Generators::date(
                    new \DateTime('-100 years'),
                    new \DateTime('-18 years')
                )
            ),
            Generators::elements('male', 'female', 'other')
        )
            ->withMaxSize(100) // Run 100 iterations as specified in design
            ->then(function ($firstName, $lastName, $address, $city, $emailPrefix, $status, $dateJoined, $birthDate, $gender) {
                // Generate valid email and phone
                $email = strtolower($emailPrefix) . '@test.com';
                $phone = '+1' . rand(1000000000, 9999999999);
                
                $memberData = [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $email,
                    'phone' => $phone,
                    'address' => $address,
                    'city' => $city,
                    'status' => $status,
                    'date_joined' => $dateJoined->format('Y-m-d'),
                    'birth_date' => $birthDate ? $birthDate->format('Y-m-d') : null,
                    'gender' => $gender,
                ];
                
                // CREATE: Create a new member
                $member = Member::create($memberData);
                
                // Assert member was created
                $this->assertNotNull($member->id, 'Member should have an ID after creation');
                $this->assertDatabaseHas('members', [
                    'id' => $member->id,
                    'email' => $memberData['email'],
                ]);
                
                // RETRIEVE: Retrieve the member
                $retrievedMember = Member::find($member->id);
                $this->assertNotNull($retrievedMember, 'Member should be retrievable after creation');
                $this->assertEquals($memberData['first_name'], $retrievedMember->first_name);
                $this->assertEquals($memberData['last_name'], $retrievedMember->last_name);
                $this->assertEquals($memberData['email'], $retrievedMember->email);
                $this->assertEquals($memberData['status'], $retrievedMember->status);
                
                // UPDATE: Update member fields
                $updatedData = [
                    'first_name' => 'Updated',
                    'last_name' => 'Name',
                    'status' => $memberData['status'] === 'active' ? 'visitor' : 'active',
                ];
                
                $member->update($updatedData);
                $member->refresh();
                
                // Assert updates persisted
                $this->assertEquals('Updated', $member->first_name);
                $this->assertEquals('Name', $member->last_name);
                $this->assertEquals($updatedData['status'], $member->status);
                $this->assertEquals($member->id, $retrievedMember->id, 'Member ID should remain unchanged after update');
                
                $this->assertDatabaseHas('members', [
                    'id' => $member->id,
                    'first_name' => 'Updated',
                    'last_name' => 'Name',
                ]);
                
                // DELETE: Delete the member
                $memberId = $member->id;
                $member->delete();
                
                // Assert member was deleted
                $this->assertDatabaseMissing('members', [
                    'id' => $memberId,
                ]);
                
                $deletedMember = Member::find($memberId);
                $this->assertNull($deletedMember, 'Member should not be retrievable after deletion');
            });
    }

    /**
     * Test that member CRUD operations work with small group assignments.
     * 
     * @test
     */
    public function member_crud_operations_succeed_with_small_group_assignment()
    {
        $this->forAll(
            Generators::names(),
            Generators::names(),
            Generators::string(),
            Generators::names(),
            Generators::string(),
            Generators::elements('active', 'visitor'),
            Generators::date(
                new \DateTime('-5 years'),
                new \DateTime('now')
            ),
            Generators::elements('male', 'female', 'other')
        )
            ->withMaxSize(100)
            ->then(function ($firstName, $lastName, $address, $city, $emailPrefix, $status, $dateJoined, $gender) {
                // Generate valid email and phone
                $email = strtolower($emailPrefix) . '@test.com';
                $phone = '+1' . rand(1000000000, 9999999999);
                
                $memberData = [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $email,
                    'phone' => $phone,
                    'address' => $address,
                    'city' => $city,
                    'status' => $status,
                    'date_joined' => $dateJoined->format('Y-m-d'),
                    'birth_date' => null,
                    'gender' => $gender,
                ];
                
                // Create a small group for testing
                $smallGroup = SmallGroup::create([
                    'name' => 'Test Group ' . uniqid(),
                    'description' => 'Test Description',
                    'leader_name' => 'Test Leader',
                    'meeting_day' => 'Monday',
                    'meeting_time' => '18:00',
                    'location' => 'Test Location',
                ]);
                
                // Add small group to member data
                $memberData['small_group_id'] = $smallGroup->id;
                
                // CREATE with small group
                $member = Member::create($memberData);
                
                $this->assertNotNull($member->id);
                $this->assertEquals($smallGroup->id, $member->small_group_id);
                
                // RETRIEVE and verify relationship
                $retrievedMember = Member::with('smallGroup')->find($member->id);
                $this->assertNotNull($retrievedMember->smallGroup);
                $this->assertEquals($smallGroup->name, $retrievedMember->smallGroup->name);
                
                // UPDATE small group assignment to null
                $member->update(['small_group_id' => null]);
                $member->refresh();
                
                $this->assertNull($member->small_group_id);
                
                // DELETE
                $memberId = $member->id;
                $member->delete();
                
                $this->assertDatabaseMissing('members', ['id' => $memberId]);
                
                // Clean up small group
                $smallGroup->delete();
            });
    }
}
