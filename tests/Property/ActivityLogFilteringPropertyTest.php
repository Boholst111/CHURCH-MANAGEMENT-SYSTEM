<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Activity;
use App\Models\User;
use App\Repositories\ActivityRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Activity Log Filtering
 * 
 * Feature: church-management-system
 * Property 37: Activity log filtering
 * Validates: Requirements 12.6
 * 
 * Property: For any activity log filter criteria (date range, user), 
 * all returned activity records should match the specified criteria.
 */
class ActivityLogFilteringPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $user;
    protected ActivityRepository $activityRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Disable throttling middleware for property tests to avoid rate limiting
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        
        $this->user = User::factory()->create(['role' => 'admin']);
        $this->activityRepository = new ActivityRepository();
    }
    
    /**
     * Authenticate as admin before each test iteration.
     */
    protected function authenticateAsAdmin(): void
    {
        Sanctum::actingAs($this->user);
    }

    /**
     * Test that filtering by user ID returns only activities for that user.
     * 
     * @test
     */
    public function filtering_by_user_returns_only_matching_activities()
    {
        $this->forAll(
            Generators::choose(2, 5)
        )
            ->withMaxSize(100)
            ->then(function ($userCount) {
                $this->authenticateAsAdmin();
                
                // Clear existing activities to avoid rate limiting issues
                Activity::query()->delete();
                
                // Create multiple users
                $users = User::factory()->count($userCount)->create();
                
                // Create activities for each user (limited to avoid pagination issues)
                foreach ($users as $user) {
                    Activity::factory()->count(rand(2, 3))->create([
                        'user_id' => $user->id,
                    ]);
                }
                
                // Pick a random user to filter by
                $targetUser = $users->random();
                
                // Filter activities by user
                $response = $this->getJson("/api/activities?user_id={$targetUser->id}&per_page=100");
                
                $this->assertEquals(200, $response->status(), 'API should return 200 status');
                
                $activities = $response->json('data');
                
                // Property: All returned activities should belong to the target user
                foreach ($activities as $activity) {
                    $this->assertEquals(
                        $targetUser->id,
                        $activity['user_id'],
                        "All filtered activities should belong to user {$targetUser->id}"
                    );
                }
                
                // Verify we got the correct count
                $expectedCount = Activity::where('user_id', $targetUser->id)->count();
                $this->assertCount(
                    $expectedCount,
                    $activities,
                    "Should return all activities for user {$targetUser->id}"
                );
            });
    }

    /**
     * Test that filtering by date range returns only activities within that range.
     * 
     * @test
     */
    public function filtering_by_date_range_returns_only_activities_in_range()
    {
        $this->forAll(
            Generators::choose(1, 30),
            Generators::choose(1, 30)
        )
            ->withMaxSize(100)
            ->then(function ($daysAgo, $daysAhead) {
                $this->authenticateAsAdmin();
                
                // Clear existing activities
                Activity::query()->delete();
                
                // Ensure start date is before end date
                $startDaysAgo = max($daysAgo, $daysAhead);
                $endDaysAgo = min($daysAgo, $daysAhead);
                
                $startDate = now()->subDays($startDaysAgo);
                $endDate = now()->subDays($endDaysAgo);
                
                // Create activities before, during, and after the date range
                Activity::factory()->create([
                    'user_id' => $this->user->id,
                    'created_at' => $startDate->copy()->subDays(5),
                ]);
                
                Activity::factory()->count(3)->create([
                    'user_id' => $this->user->id,
                    'created_at' => $startDate->copy()->addDays(1),
                ]);
                
                Activity::factory()->create([
                    'user_id' => $this->user->id,
                    'created_at' => $endDate->copy()->addDays(5),
                ]);
                
                // Filter activities by date range
                $response = $this->getJson(
                    "/api/activities?start_date={$startDate->format('Y-m-d')}&end_date={$endDate->format('Y-m-d')}&per_page=100"
                );
                
                $this->assertEquals(200, $response->status(), 'API should return 200 status');
                
                $activities = $response->json('data');
                
                // Property: All returned activities should be within the date range
                foreach ($activities as $activity) {
                    $activityDate = \Carbon\Carbon::parse($activity['created_at']);
                    
                    $this->assertGreaterThanOrEqual(
                        $startDate->startOfDay()->timestamp,
                        $activityDate->timestamp,
                        "Activity date should be on or after start date"
                    );
                    
                    $this->assertLessThanOrEqual(
                        $endDate->endOfDay()->timestamp,
                        $activityDate->timestamp,
                        "Activity date should be on or before end date"
                    );
                }
            });
    }

    /**
     * Test that filtering by action returns only activities with that action.
     * 
     * @test
     */
    public function filtering_by_action_returns_only_matching_activities()
    {
        $this->forAll(
            Generators::elements('create', 'update', 'delete', 'login', 'logout', 'export')
        )
            ->withMaxSize(100)
            ->then(function ($targetAction) {
                $this->authenticateAsAdmin();
                
                // Clear existing activities
                Activity::query()->delete();
                
                // Create activities with different actions (limited count)
                $actions = ['create', 'update', 'delete', 'login', 'logout', 'export'];
                
                foreach ($actions as $action) {
                    Activity::factory()->count(2)->create([
                        'user_id' => $this->user->id,
                        'action' => $action,
                    ]);
                }
                
                // Filter activities by action
                $response = $this->getJson("/api/activities?action={$targetAction}&per_page=100");
                
                $this->assertEquals(200, $response->status(), 'API should return 200 status');
                
                $activities = $response->json('data');
                
                // Property: All returned activities should have the target action
                foreach ($activities as $activity) {
                    $this->assertEquals(
                        $targetAction,
                        $activity['action'],
                        "All filtered activities should have action '{$targetAction}'"
                    );
                }
                
                // Verify we got the correct count
                $expectedCount = Activity::where('action', $targetAction)->count();
                $this->assertCount(
                    $expectedCount,
                    $activities,
                    "Should return all activities with action '{$targetAction}'"
                );
            });
    }

    /**
     * Test that filtering by entity type returns only activities for that entity type.
     * 
     * @test
     */
    public function filtering_by_entity_type_returns_only_matching_activities()
    {
        $this->forAll(
            Generators::elements('members', 'leadership', 'events', 'finance', 'small-groups', 'user', 'report')
        )
            ->withMaxSize(100)
            ->then(function ($targetEntityType) {
                $this->authenticateAsAdmin();
                
                // Clear existing activities
                Activity::query()->delete();
                
                // Create activities with different entity types (limited count)
                $entityTypes = ['members', 'leadership', 'events', 'finance', 'small-groups', 'user', 'report'];
                
                foreach ($entityTypes as $entityType) {
                    Activity::factory()->count(2)->create([
                        'user_id' => $this->user->id,
                        'entity_type' => $entityType,
                    ]);
                }
                
                // Filter activities by entity type
                $response = $this->getJson("/api/activities?entity_type={$targetEntityType}&per_page=100");
                
                $this->assertEquals(200, $response->status(), 'API should return 200 status');
                
                $activities = $response->json('data');
                
                // Property: All returned activities should have the target entity type
                foreach ($activities as $activity) {
                    $this->assertEquals(
                        $targetEntityType,
                        $activity['entity_type'],
                        "All filtered activities should have entity_type '{$targetEntityType}'"
                    );
                }
                
                // Verify we got the correct count
                $expectedCount = Activity::where('entity_type', $targetEntityType)->count();
                $this->assertCount(
                    $expectedCount,
                    $activities,
                    "Should return all activities with entity_type '{$targetEntityType}'"
                );
            });
    }

    /**
     * Test that combining multiple filters returns only activities matching all criteria.
     * 
     * @test
     */
    public function combining_multiple_filters_returns_only_activities_matching_all_criteria()
    {
        $this->forAll(
            Generators::elements('create', 'update', 'delete'),
            Generators::elements('members', 'leadership', 'events')
        )
            ->withMaxSize(100)
            ->then(function ($targetAction, $targetEntityType) {
                $this->authenticateAsAdmin();
                
                // Clear existing activities
                Activity::query()->delete();
                
                // Create multiple users
                $users = User::factory()->count(2)->create();
                $targetUser = $users->first();
                
                // Create activities with various combinations (limited count)
                foreach ($users as $user) {
                    foreach (['create', 'update', 'delete'] as $action) {
                        foreach (['members', 'leadership', 'events'] as $entityType) {
                            Activity::factory()->create([
                                'user_id' => $user->id,
                                'action' => $action,
                                'entity_type' => $entityType,
                                'created_at' => now()->subDays(rand(1, 10)),
                            ]);
                        }
                    }
                }
                
                // Set date range that includes all activities
                $startDate = now()->subDays(15)->format('Y-m-d');
                $endDate = now()->format('Y-m-d');
                
                // Filter activities by multiple criteria
                $response = $this->getJson(
                    "/api/activities?user_id={$targetUser->id}&action={$targetAction}&entity_type={$targetEntityType}&start_date={$startDate}&end_date={$endDate}&per_page=100"
                );
                
                $this->assertEquals(200, $response->status(), 'API should return 200 status');
                
                $activities = $response->json('data');
                
                // Property: All returned activities should match ALL filter criteria
                foreach ($activities as $activity) {
                    $this->assertEquals(
                        $targetUser->id,
                        $activity['user_id'],
                        "Activity should belong to user {$targetUser->id}"
                    );
                    
                    $this->assertEquals(
                        $targetAction,
                        $activity['action'],
                        "Activity should have action '{$targetAction}'"
                    );
                    
                    $this->assertEquals(
                        $targetEntityType,
                        $activity['entity_type'],
                        "Activity should have entity_type '{$targetEntityType}'"
                    );
                    
                    $activityDate = \Carbon\Carbon::parse($activity['created_at']);
                    $this->assertGreaterThanOrEqual(
                        \Carbon\Carbon::parse($startDate)->startOfDay()->timestamp,
                        $activityDate->timestamp,
                        "Activity date should be on or after start date"
                    );
                    
                    $this->assertLessThanOrEqual(
                        \Carbon\Carbon::parse($endDate)->endOfDay()->timestamp,
                        $activityDate->timestamp,
                        "Activity date should be on or before end date"
                    );
                }
                
                // Verify we got the correct count
                $expectedCount = Activity::where('user_id', $targetUser->id)
                    ->where('action', $targetAction)
                    ->where('entity_type', $targetEntityType)
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->count();
                    
                $this->assertCount(
                    $expectedCount,
                    $activities,
                    "Should return all activities matching all filter criteria"
                );
            });
    }

    /**
     * Test that empty filters return all activities.
     * 
     * @test
     */
    public function empty_filters_return_all_activities()
    {
        $this->forAll(
            Generators::choose(5, 15)
        )
            ->withMaxSize(100)
            ->then(function ($activityCount) {
                $this->authenticateAsAdmin();
                
                // Clear existing activities
                Activity::query()->delete();
                
                // Create random activities
                Activity::factory()->count($activityCount)->create([
                    'user_id' => $this->user->id,
                ]);
                
                // Request activities without any filters
                $response = $this->getJson('/api/activities?per_page=100');
                
                $this->assertEquals(200, $response->status(), 'API should return 200 status');
                
                $activities = $response->json('data');
                $totalActivities = Activity::count();
                
                // Property: Without filters, should return all activities (up to pagination limit)
                $perPage = $response->json('pagination.per_page');
                $expectedCount = min($totalActivities, $perPage);
                
                $this->assertCount(
                    $expectedCount,
                    $activities,
                    "Should return all activities up to pagination limit"
                );
                
                $this->assertEquals(
                    $totalActivities,
                    $response->json('pagination.total'),
                    "Total count should match all activities in database"
                );
            });
    }
}
