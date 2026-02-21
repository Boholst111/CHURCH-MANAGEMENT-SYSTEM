<?php

namespace Tests\Unit\Services;

use App\Models\Member;
use App\Models\SmallGroup;
use App\Services\MemberService;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class MemberServiceTest extends TestCase
{
    use RefreshDatabase;

    protected MemberService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new MemberService(new MemberRepository());
    }

    public function test_can_create_member_with_valid_data()
    {
        $data = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => '2024-01-01',
            'gender' => 'male',
        ];

        $member = $this->service->createMember($data);

        $this->assertInstanceOf(Member::class, $member);
        $this->assertEquals('John', $member->first_name);
        $this->assertEquals('john@example.com', $member->email);
        $this->assertDatabaseHas('members', ['email' => 'john@example.com']);
    }

    public function test_create_member_validates_required_fields()
    {
        $this->expectException(ValidationException::class);

        $this->service->createMember([
            'first_name' => 'John',
            // Missing required fields
        ]);
    }

    public function test_create_member_validates_email_format()
    {
        $this->expectException(ValidationException::class);

        $this->service->createMember([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'invalid-email',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => '2024-01-01',
            'gender' => 'male',
        ]);
    }

    public function test_create_member_validates_unique_email()
    {
        Member::factory()->create(['email' => 'existing@example.com']);

        $this->expectException(ValidationException::class);

        $this->service->createMember([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'existing@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => '2024-01-01',
            'gender' => 'male',
        ]);
    }

    public function test_create_member_validates_status_enum()
    {
        $this->expectException(ValidationException::class);

        $this->service->createMember([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'invalid-status',
            'date_joined' => '2024-01-01',
            'gender' => 'male',
        ]);
    }

    public function test_create_member_validates_small_group_exists()
    {
        $this->expectException(ValidationException::class);

        $this->service->createMember([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'small_group_id' => 9999, // Non-existent group
            'date_joined' => '2024-01-01',
            'gender' => 'male',
        ]);
    }

    public function test_can_update_member_with_valid_data()
    {
        $member = Member::factory()->create(['first_name' => 'John']);

        $updated = $this->service->updateMember($member->id, [
            'first_name' => 'Jane',
            'last_name' => $member->last_name,
            'email' => $member->email,
            'phone' => $member->phone,
            'address' => $member->address,
            'city' => $member->city,
            'status' => $member->status,
            'date_joined' => $member->date_joined->format('Y-m-d'),
            'gender' => $member->gender,
        ]);

        $this->assertInstanceOf(Member::class, $updated);
        $this->assertEquals('Jane', $updated->first_name);
        $this->assertEquals($member->id, $updated->id);
    }

    public function test_update_member_throws_exception_for_non_existent_member()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Member not found');

        $this->service->updateMember(9999, ['first_name' => 'Jane']);
    }

    public function test_update_member_validates_data()
    {
        $member = Member::factory()->create();

        $this->expectException(ValidationException::class);

        $this->service->updateMember($member->id, [
            'email' => 'invalid-email',
        ]);
    }

    public function test_update_member_allows_same_email()
    {
        $member = Member::factory()->create(['email' => 'john@example.com']);

        $updated = $this->service->updateMember($member->id, [
            'first_name' => $member->first_name,
            'last_name' => $member->last_name,
            'email' => 'john@example.com', // Same email should be allowed
            'phone' => $member->phone,
            'address' => $member->address,
            'city' => $member->city,
            'status' => $member->status,
            'date_joined' => $member->date_joined->format('Y-m-d'),
            'gender' => $member->gender,
        ]);

        $this->assertEquals('john@example.com', $updated->email);
    }

    public function test_can_delete_member()
    {
        $member = Member::factory()->create();

        $result = $this->service->deleteMember($member->id);

        $this->assertTrue($result);
        $this->assertNull(Member::find($member->id));
    }

    public function test_delete_member_throws_exception_for_non_existent_member()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Member not found');

        $this->service->deleteMember(9999);
    }

    public function test_can_get_member_by_id()
    {
        $member = Member::factory()->create();

        $found = $this->service->getMemberById($member->id);

        $this->assertNotNull($found);
        $this->assertEquals($member->id, $found->id);
    }

    public function test_get_member_by_id_returns_null_for_non_existent()
    {
        $found = $this->service->getMemberById(9999);

        $this->assertNull($found);
    }

    public function test_can_get_all_members()
    {
        Member::factory()->count(5)->create();

        $members = $this->service->getAllMembers();

        $this->assertCount(5, $members);
    }

    public function test_search_members_with_query()
    {
        Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        Member::factory()->create(['first_name' => 'Jane', 'last_name' => 'Smith']);

        $results = $this->service->searchMembers('John');

        $this->assertCount(1, $results);
        $this->assertEquals('John', $results->first()->first_name);
    }

    public function test_search_members_with_empty_query_returns_all()
    {
        Member::factory()->count(3)->create();

        $results = $this->service->searchMembers('');

        $this->assertCount(3, $results);
    }

    public function test_filter_members_by_status()
    {
        Member::factory()->count(3)->create(['status' => 'active']);
        Member::factory()->count(2)->create(['status' => 'visitor']);

        $active = $this->service->filterMembersByStatus('active');

        $this->assertCount(3, $active);
        $this->assertTrue($active->every(fn($m) => $m->status === 'active'));
    }

    public function test_filter_members_by_status_validates_status()
    {
        $this->expectException(ValidationException::class);

        $this->service->filterMembersByStatus('invalid-status');
    }

    public function test_filter_members_by_small_group()
    {
        $group = SmallGroup::factory()->create();
        Member::factory()->count(3)->create(['small_group_id' => $group->id]);
        Member::factory()->count(2)->create(['small_group_id' => null]);

        $results = $this->service->filterMembersBySmallGroup($group->id);

        $this->assertCount(3, $results);
    }

    public function test_get_paginated_members()
    {
        Member::factory()->count(60)->create();

        $paginated = $this->service->getPaginatedMembers(50);

        $this->assertCount(50, $paginated->items());
        $this->assertEquals(60, $paginated->total());
    }

    public function test_get_paginated_members_with_filters()
    {
        Member::factory()->create(['first_name' => 'John', 'status' => 'active']);
        Member::factory()->count(5)->create(['first_name' => 'Jane', 'status' => 'visitor']);

        $paginated = $this->service->getPaginatedMembers(50, [
            'search' => 'John',
            'status' => 'active',
        ]);

        $this->assertCount(1, $paginated->items());
    }

    public function test_get_paginated_members_validates_status_filter()
    {
        $this->expectException(ValidationException::class);

        $this->service->getPaginatedMembers(50, ['status' => 'invalid-status']);
    }

    public function test_get_member_count_by_status()
    {
        Member::factory()->count(5)->create(['status' => 'active']);
        Member::factory()->count(3)->create(['status' => 'visitor']);

        $count = $this->service->getMemberCountByStatus('active');

        $this->assertEquals(5, $count);
    }

    public function test_get_member_count_by_status_validates_status()
    {
        $this->expectException(ValidationException::class);

        $this->service->getMemberCountByStatus('invalid-status');
    }

    public function test_get_new_visitors_this_month()
    {
        Member::factory()->create([
            'status' => 'visitor',
            'date_joined' => now(),
        ]);
        Member::factory()->create([
            'status' => 'visitor',
            'date_joined' => now()->subMonths(2),
        ]);
        Member::factory()->create([
            'status' => 'active',
            'date_joined' => now(),
        ]);

        $visitors = $this->service->getNewVisitorsThisMonth();

        $this->assertCount(1, $visitors);
    }

    public function test_create_member_with_small_group()
    {
        $group = SmallGroup::factory()->create();

        $member = $this->service->createMember([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'small_group_id' => $group->id,
            'date_joined' => '2024-01-01',
            'gender' => 'male',
        ]);

        $this->assertEquals($group->id, $member->small_group_id);
    }

    public function test_create_member_with_optional_birth_date()
    {
        $member = $this->service->createMember([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => '2024-01-01',
            'birth_date' => '1990-05-15',
            'gender' => 'male',
        ]);

        $this->assertNotNull($member->birth_date);
        $this->assertEquals('1990-05-15', $member->birth_date->format('Y-m-d'));
    }

    public function test_validates_gender_enum()
    {
        $this->expectException(ValidationException::class);

        $this->service->createMember([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => '2024-01-01',
            'gender' => 'invalid-gender',
        ]);
    }
}
