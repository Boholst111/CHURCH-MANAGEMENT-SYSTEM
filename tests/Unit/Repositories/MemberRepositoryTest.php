<?php

namespace Tests\Unit\Repositories;

use App\Models\Member;
use App\Models\SmallGroup;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MemberRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected MemberRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new MemberRepository();
    }

    public function test_can_create_member()
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

        $member = $this->repository->create($data);

        $this->assertInstanceOf(Member::class, $member);
        $this->assertEquals('John', $member->first_name);
        $this->assertEquals('john@example.com', $member->email);
    }

    public function test_can_find_member_by_id()
    {
        $member = Member::factory()->create();

        $found = $this->repository->find($member->id);

        $this->assertNotNull($found);
        $this->assertEquals($member->id, $found->id);
    }

    public function test_can_update_member()
    {
        $member = Member::factory()->create(['first_name' => 'John']);

        $updated = $this->repository->update($member->id, ['first_name' => 'Jane']);

        $this->assertTrue($updated);
        $this->assertEquals('Jane', $member->fresh()->first_name);
    }

    public function test_can_delete_member()
    {
        $member = Member::factory()->create();

        $deleted = $this->repository->delete($member->id);

        $this->assertTrue($deleted);
        $this->assertNull(Member::find($member->id));
    }

    public function test_search_finds_members_by_name()
    {
        Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        Member::factory()->create(['first_name' => 'Jane', 'last_name' => 'Smith']);

        $results = $this->repository->search('John');

        $this->assertCount(1, $results);
        $this->assertEquals('John', $results->first()->first_name);
    }

    public function test_search_finds_members_by_email()
    {
        Member::factory()->create(['email' => 'john@example.com']);
        Member::factory()->create(['email' => 'jane@example.com']);

        $results = $this->repository->search('john@');

        $this->assertCount(1, $results);
        $this->assertEquals('john@example.com', $results->first()->email);
    }

    public function test_filter_by_status_returns_correct_members()
    {
        Member::factory()->count(3)->create(['status' => 'active']);
        Member::factory()->count(2)->create(['status' => 'visitor']);

        $active = $this->repository->filterByStatus('active');
        $visitors = $this->repository->filterByStatus('visitor');

        $this->assertCount(3, $active);
        $this->assertCount(2, $visitors);
    }

    public function test_filter_by_small_group_returns_correct_members()
    {
        $group = SmallGroup::factory()->create();
        Member::factory()->count(3)->create(['small_group_id' => $group->id]);
        Member::factory()->count(2)->create(['small_group_id' => null]);

        $results = $this->repository->filterBySmallGroup($group->id);

        $this->assertCount(3, $results);
    }

    public function test_paginate_returns_correct_page_size()
    {
        Member::factory()->count(60)->create();

        $paginated = $this->repository->paginate(50);

        $this->assertCount(50, $paginated->items());
        $this->assertEquals(60, $paginated->total());
    }

    public function test_paginate_with_search_filter()
    {
        Member::factory()->create(['first_name' => 'John']);
        Member::factory()->count(5)->create(['first_name' => 'Jane']);

        $paginated = $this->repository->paginate(50, ['search' => 'John']);

        $this->assertCount(1, $paginated->items());
    }

    public function test_count_by_status_returns_correct_count()
    {
        Member::factory()->count(5)->create(['status' => 'active']);
        Member::factory()->count(3)->create(['status' => 'visitor']);

        $activeCount = $this->repository->countByStatus('active');
        $visitorCount = $this->repository->countByStatus('visitor');

        $this->assertEquals(5, $activeCount);
        $this->assertEquals(3, $visitorCount);
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

        $visitors = $this->repository->getNewVisitorsThisMonth();

        $this->assertCount(1, $visitors);
    }

    public function test_eager_loading_with_small_groups()
    {
        $group = SmallGroup::factory()->create();
        $createdMember = Member::factory()->create(['small_group_id' => $group->id]);

        $member = $this->repository->find($createdMember->id, ['smallGroup']);

        $this->assertNotNull($member);
        $this->assertTrue($member->relationLoaded('smallGroup'));
    }
}
