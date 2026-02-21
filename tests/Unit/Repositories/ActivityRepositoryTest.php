<?php

namespace Tests\Unit\Repositories;

use App\Models\Activity;
use App\Models\User;
use App\Repositories\ActivityRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActivityRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected ActivityRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new ActivityRepository();
    }

    public function test_can_create_activity()
    {
        $user = User::factory()->create();
        $data = [
            'user_id' => $user->id,
            'action' => 'create',
            'entity_type' => 'member',
            'entity_id' => 1,
            'description' => 'Created a new member',
        ];

        $activity = $this->repository->create($data);

        $this->assertInstanceOf(Activity::class, $activity);
        $this->assertEquals('create', $activity->action);
    }

    public function test_can_log_activity()
    {
        $user = User::factory()->create();

        $activity = $this->repository->log(
            $user->id,
            'update',
            'member',
            1,
            'Updated member information',
            '127.0.0.1'
        );

        $this->assertInstanceOf(Activity::class, $activity);
        $this->assertEquals('update', $activity->action);
        $this->assertEquals('127.0.0.1', $activity->ip_address);
    }

    public function test_can_find_activity_by_id()
    {
        $activity = Activity::factory()->create();

        $found = $this->repository->find($activity->id);

        $this->assertNotNull($found);
        $this->assertEquals($activity->id, $found->id);
    }

    public function test_can_delete_activity()
    {
        $activity = Activity::factory()->create();

        $deleted = $this->repository->delete($activity->id);

        $this->assertTrue($deleted);
        $this->assertNull(Activity::find($activity->id));
    }

    public function test_get_recent_returns_limited_activities()
    {
        Activity::factory()->count(20)->create();

        $recent = $this->repository->getRecent(10);

        $this->assertCount(10, $recent);
    }

    public function test_get_recent_returns_newest_first()
    {
        $old = Activity::factory()->create(['created_at' => now()->subDays(2)]);
        $new = Activity::factory()->create(['created_at' => now()]);

        $recent = $this->repository->getRecent(10);

        $this->assertEquals($new->id, $recent->first()->id);
    }

    public function test_filter_by_user()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        
        Activity::factory()->count(3)->create(['user_id' => $user1->id]);
        Activity::factory()->count(2)->create(['user_id' => $user2->id]);

        $results = $this->repository->filterByUser($user1->id);

        $this->assertCount(3, $results);
    }

    public function test_filter_by_action()
    {
        Activity::factory()->count(3)->create(['action' => 'create']);
        Activity::factory()->count(2)->create(['action' => 'update']);

        $results = $this->repository->filterByAction('create');

        $this->assertCount(3, $results);
    }

    public function test_filter_by_entity_type()
    {
        Activity::factory()->count(3)->create(['entity_type' => 'member']);
        Activity::factory()->count(2)->create(['entity_type' => 'tithe']);

        $results = $this->repository->filterByEntityType('member');

        $this->assertCount(3, $results);
    }

    public function test_filter_by_entity()
    {
        Activity::factory()->count(3)->create(['entity_type' => 'member', 'entity_id' => 1]);
        Activity::factory()->count(2)->create(['entity_type' => 'member', 'entity_id' => 2]);

        $results = $this->repository->filterByEntity('member', 1);

        $this->assertCount(3, $results);
    }

    public function test_get_by_date_range()
    {
        Activity::factory()->create(['created_at' => '2024-01-15 10:00:00']);
        Activity::factory()->create(['created_at' => '2024-02-15 10:00:00']);
        Activity::factory()->create(['created_at' => '2024-03-15 10:00:00']);

        $results = $this->repository->getByDateRange('2024-01-01', '2024-02-28');

        $this->assertCount(2, $results);
    }

    public function test_paginate_returns_correct_page_size()
    {
        Activity::factory()->count(60)->create();

        $paginated = $this->repository->paginate(50);

        $this->assertCount(50, $paginated->items());
        $this->assertEquals(60, $paginated->total());
    }

    public function test_paginate_with_user_filter()
    {
        $user = User::factory()->create();
        Activity::factory()->count(5)->create(['user_id' => $user->id]);
        Activity::factory()->count(10)->create();

        $paginated = $this->repository->paginate(50, ['user_id' => $user->id]);

        $this->assertCount(5, $paginated->items());
    }

    public function test_search_by_description()
    {
        Activity::factory()->create(['description' => 'Created a new member']);
        Activity::factory()->create(['description' => 'Updated member information']);

        $results = $this->repository->search('Created');

        $this->assertCount(1, $results);
    }

    public function test_count_by_action()
    {
        Activity::factory()->count(5)->create(['action' => 'create']);
        Activity::factory()->count(3)->create(['action' => 'update']);

        $count = $this->repository->countByAction('create');

        $this->assertEquals(5, $count);
    }

    public function test_count_by_user()
    {
        $user = User::factory()->create();
        Activity::factory()->count(7)->create(['user_id' => $user->id]);

        $count = $this->repository->countByUser($user->id);

        $this->assertEquals(7, $count);
    }

    public function test_delete_older_than()
    {
        Activity::factory()->create(['created_at' => now()->subDays(100)]);
        Activity::factory()->create(['created_at' => now()->subDays(50)]);
        Activity::factory()->create(['created_at' => now()]);

        $deleted = $this->repository->deleteOlderThan(now()->subDays(60)->toDateTimeString());

        $this->assertEquals(1, $deleted);
        $this->assertEquals(2, Activity::count());
    }

    public function test_get_recent_for_dashboard_with_user()
    {
        $user = User::factory()->create();
        Activity::factory()->count(5)->create(['user_id' => $user->id]);

        $activities = $this->repository->getRecentForDashboard(10);

        $this->assertCount(5, $activities);
        $this->assertTrue($activities->first()->relationLoaded('user'));
    }

    public function test_eager_loading_with_user()
    {
        $user = User::factory()->create();
        $createdActivity = Activity::factory()->create(['user_id' => $user->id]);

        $activity = $this->repository->find($createdActivity->id, ['user']);

        $this->assertNotNull($activity);
        $this->assertTrue($activity->relationLoaded('user'));
    }
}
