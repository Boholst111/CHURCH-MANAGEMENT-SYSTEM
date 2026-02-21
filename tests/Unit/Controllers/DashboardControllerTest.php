<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Http\Controllers\Api\DashboardController;
use App\Services\MemberService;
use App\Services\FinanceService;
use App\Repositories\ActivityRepository;
use App\Models\Member;
use App\Models\Event;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    protected DashboardController $controller;
    protected MemberService $memberService;
    protected FinanceService $financeService;
    protected ActivityRepository $activityRepository;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->memberService = $this->app->make(MemberService::class);
        $this->financeService = $this->app->make(FinanceService::class);
        $this->activityRepository = $this->app->make(ActivityRepository::class);
        
        $this->controller = new DashboardController(
            $this->memberService,
            $this->financeService,
            $this->activityRepository
        );
    }

    /** @test */
    public function it_returns_dashboard_stats_with_correct_structure()
    {
        // Arrange: Create test data
        Member::factory()->count(5)->create(['status' => 'active']);
        Member::factory()->count(3)->create(['status' => 'visitor']);
        Event::factory()->count(2)->create([
            'status' => 'upcoming',
            'event_date' => now()->addDays(5),
        ]);

        // Act
        $response = $this->controller->stats();

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        $this->assertArrayHasKey('total_members', $data['data']);
        $this->assertArrayHasKey('monthly_tithes', $data['data']);
        $this->assertArrayHasKey('upcoming_events', $data['data']);
        $this->assertArrayHasKey('new_visitors', $data['data']);
    }

    /** @test */
    public function it_counts_only_active_members_in_total_members()
    {
        // Arrange
        Member::factory()->count(10)->create(['status' => 'active']);
        Member::factory()->count(5)->create(['status' => 'visitor']);

        // Act
        $response = $this->controller->stats();
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertEquals(10, $data['data']['total_members']);
    }

    /** @test */
    public function it_counts_only_upcoming_events_with_future_dates()
    {
        // Arrange
        Event::factory()->count(3)->create([
            'status' => 'upcoming',
            'event_date' => now()->addDays(10),
        ]);
        Event::factory()->count(2)->create([
            'status' => 'completed',
            'event_date' => now()->subDays(10),
        ]);
        Event::factory()->count(1)->create([
            'status' => 'upcoming',
            'event_date' => now()->subDays(5), // Past date but status is upcoming
        ]);

        // Act
        $response = $this->controller->stats();
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertEquals(3, $data['data']['upcoming_events']);
    }

    /** @test */
    public function it_returns_attendance_trends_with_correct_structure()
    {
        // Arrange: Create completed events with attendance
        Event::factory()->create([
            'status' => 'completed',
            'event_date' => now()->subMonths(2),
            'attendance_count' => 50,
        ]);
        Event::factory()->create([
            'status' => 'completed',
            'event_date' => now()->subMonths(1),
            'attendance_count' => 75,
        ]);

        // Act
        $response = $this->controller->attendance();

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        $this->assertIsArray($data['data']);
    }

    /** @test */
    public function it_includes_only_completed_events_in_attendance_trends()
    {
        // Arrange
        Event::factory()->create([
            'status' => 'completed',
            'event_date' => now()->subMonths(1),
            'attendance_count' => 100,
        ]);
        Event::factory()->create([
            'status' => 'upcoming',
            'event_date' => now()->addDays(5),
            'attendance_count' => 0,
        ]);

        // Act
        $response = $this->controller->attendance();
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(1, $data['data']);
    }

    /** @test */
    public function it_returns_recent_activities_with_correct_structure()
    {
        // Arrange: Create a user and activities
        $user = User::factory()->create();
        Activity::factory()->count(5)->create(['user_id' => $user->id]);

        // Act
        $request = new Request(['limit' => 10]);
        $response = $this->controller->activities($request);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        $this->assertIsArray($data['data']);
        $this->assertCount(5, $data['data']);
    }

    /** @test */
    public function it_respects_limit_parameter_for_activities()
    {
        // Arrange
        $user = User::factory()->create();
        Activity::factory()->count(20)->create(['user_id' => $user->id]);

        // Act
        $request = new Request(['limit' => 5]);
        $response = $this->controller->activities($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(5, $data['data']);
    }

    /** @test */
    public function it_defaults_to_10_activities_when_no_limit_specified()
    {
        // Arrange
        $user = User::factory()->create();
        Activity::factory()->count(15)->create(['user_id' => $user->id]);

        // Act
        $request = new Request();
        $response = $this->controller->activities($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(10, $data['data']);
    }

    /** @test */
    public function it_validates_limit_parameter_bounds()
    {
        // Arrange
        $user = User::factory()->create();
        Activity::factory()->count(15)->create(['user_id' => $user->id]);

        // Act: Test with limit too high
        $request = new Request(['limit' => 100]);
        $response = $this->controller->activities($request);
        $data = json_decode($response->getContent(), true);

        // Assert: Should default to 10
        $this->assertCount(10, $data['data']);

        // Act: Test with limit too low
        $request = new Request(['limit' => 0]);
        $response = $this->controller->activities($request);
        $data = json_decode($response->getContent(), true);

        // Assert: Should default to 10
        $this->assertCount(10, $data['data']);
    }

    /** @test */
    public function it_includes_user_information_in_activities()
    {
        // Arrange
        $user = User::factory()->create(['name' => 'John Doe']);
        Activity::factory()->create([
            'user_id' => $user->id,
            'action' => 'created',
            'entity_type' => 'member',
            'description' => 'Created a new member',
        ]);

        // Act
        $request = new Request();
        $response = $this->controller->activities($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $activity = $data['data'][0];
        $this->assertEquals('John Doe', $activity['user_name']);
        $this->assertEquals('created', $activity['action']);
        $this->assertEquals('member', $activity['entity_type']);
        $this->assertArrayHasKey('created_at', $activity);
        $this->assertArrayHasKey('created_at_human', $activity);
    }

    /** @test */
    public function it_returns_activities_in_reverse_chronological_order()
    {
        // Arrange
        $user = User::factory()->create();
        $activity1 = Activity::factory()->create([
            'user_id' => $user->id,
            'created_at' => now()->subHours(3),
        ]);
        $activity2 = Activity::factory()->create([
            'user_id' => $user->id,
            'created_at' => now()->subHours(1),
        ]);
        $activity3 = Activity::factory()->create([
            'user_id' => $user->id,
            'created_at' => now()->subHours(2),
        ]);

        // Act
        $request = new Request();
        $response = $this->controller->activities($request);
        $data = json_decode($response->getContent(), true);

        // Assert: Most recent should be first
        $this->assertEquals($activity2->id, $data['data'][0]['id']);
        $this->assertEquals($activity3->id, $data['data'][1]['id']);
        $this->assertEquals($activity1->id, $data['data'][2]['id']);
    }
}
