<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Member;
use App\Models\Event;
use App\Models\Tithe;
use App\Models\Activity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class DashboardApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create and authenticate a user
        $this->user = User::factory()->create(['role' => 'admin']);
    }

    /** @test */
    public function it_requires_authentication_to_access_dashboard_stats()
    {
        // Act: Try to access without authentication
        $response = $this->getJson('/api/dashboard/stats');

        // Assert
        $response->assertStatus(401);
    }

    /** @test */
    public function it_returns_dashboard_stats_for_authenticated_user()
    {
        // Arrange
        Sanctum::actingAs($this->user);
        Member::factory()->count(15)->create(['status' => 'active']);
        Member::factory()->count(5)->create(['status' => 'visitor', 'date_joined' => now()]);
        Event::factory()->count(3)->create([
            'status' => 'upcoming',
            'event_date' => now()->addDays(7),
        ]);
        Tithe::factory()->count(10)->create([
            'date' => now(),
            'amount' => 100,
        ]);

        // Act
        $response = $this->getJson('/api/dashboard/stats');

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'total_members',
                    'monthly_tithes',
                    'upcoming_events',
                    'new_visitors',
                ],
            ])
            ->assertJson([
                'success' => true,
                'data' => [
                    'total_members' => 15,
                    'upcoming_events' => 3,
                    'new_visitors' => 5,
                ],
            ]);
    }

    /** @test */
    public function it_requires_authentication_to_access_attendance_trends()
    {
        // Act: Try to access without authentication
        $response = $this->getJson('/api/dashboard/attendance');

        // Assert
        $response->assertStatus(401);
    }

    /** @test */
    public function it_returns_attendance_trends_for_authenticated_user()
    {
        // Arrange
        Sanctum::actingAs($this->user);
        Event::factory()->count(3)->create([
            'status' => 'completed',
            'event_date' => now()->subMonths(2),
            'attendance_count' => 50,
        ]);
        Event::factory()->count(2)->create([
            'status' => 'completed',
            'event_date' => now()->subMonths(1),
            'attendance_count' => 75,
        ]);

        // Act
        $response = $this->getJson('/api/dashboard/attendance');

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'year',
                        'month',
                        'month_name',
                        'total_attendance',
                        'event_count',
                        'average_attendance',
                    ],
                ],
            ])
            ->assertJson([
                'success' => true,
            ]);
    }

    /** @test */
    public function it_requires_authentication_to_access_recent_activities()
    {
        // Act: Try to access without authentication
        $response = $this->getJson('/api/dashboard/activities');

        // Assert
        $response->assertStatus(401);
    }

    /** @test */
    public function it_returns_recent_activities_for_authenticated_user()
    {
        // Arrange
        Sanctum::actingAs($this->user);
        Activity::factory()->count(5)->create(['user_id' => $this->user->id]);

        // Act
        $response = $this->getJson('/api/dashboard/activities');

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'user_name',
                        'action',
                        'entity_type',
                        'entity_id',
                        'description',
                        'created_at',
                        'created_at_human',
                    ],
                ],
            ])
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(5, 'data');
    }

    /** @test */
    public function it_respects_limit_query_parameter_for_activities()
    {
        // Arrange
        Sanctum::actingAs($this->user);
        Activity::factory()->count(20)->create(['user_id' => $this->user->id]);

        // Act
        $response = $this->getJson('/api/dashboard/activities?limit=3');

        // Assert
        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    /** @test */
    public function it_calculates_monthly_tithes_correctly()
    {
        // Arrange
        Sanctum::actingAs($this->user);
        
        // Create tithes for current month
        Tithe::factory()->count(5)->create([
            'date' => now(),
            'amount' => 100,
        ]);
        
        // Create tithes for previous month (should not be counted)
        Tithe::factory()->count(3)->create([
            'date' => now()->subMonth(),
            'amount' => 50,
        ]);

        // Act
        $response = $this->getJson('/api/dashboard/stats');

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'monthly_tithes' => 500, // 5 * 100
                ],
            ]);
    }

    /** @test */
    public function it_counts_only_new_visitors_from_current_month()
    {
        // Arrange
        Sanctum::actingAs($this->user);
        
        // Create visitors who joined this month
        Member::factory()->count(3)->create([
            'status' => 'visitor',
            'date_joined' => now(),
        ]);
        
        // Create visitors who joined last month (should not be counted)
        Member::factory()->count(2)->create([
            'status' => 'visitor',
            'date_joined' => now()->subMonth(),
        ]);
        
        // Create active members (should not be counted)
        Member::factory()->count(5)->create([
            'status' => 'active',
            'date_joined' => now(),
        ]);

        // Act
        $response = $this->getJson('/api/dashboard/stats');

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'new_visitors' => 3,
                ],
            ]);
    }

    /** @test */
    public function it_returns_empty_attendance_data_when_no_completed_events()
    {
        // Arrange
        Sanctum::actingAs($this->user);
        
        // Create only upcoming events
        Event::factory()->count(3)->create([
            'status' => 'upcoming',
            'event_date' => now()->addDays(7),
        ]);

        // Act
        $response = $this->getJson('/api/dashboard/attendance');

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [],
            ]);
    }

    /** @test */
    public function it_calculates_average_attendance_correctly()
    {
        // Arrange
        Sanctum::actingAs($this->user);
        
        // Create 3 events in the same month with different attendance
        Event::factory()->create([
            'status' => 'completed',
            'event_date' => now()->subMonths(1)->startOfMonth(),
            'attendance_count' => 60,
        ]);
        Event::factory()->create([
            'status' => 'completed',
            'event_date' => now()->subMonths(1)->startOfMonth()->addDays(7),
            'attendance_count' => 90,
        ]);
        Event::factory()->create([
            'status' => 'completed',
            'event_date' => now()->subMonths(1)->startOfMonth()->addDays(14),
            'attendance_count' => 120,
        ]);

        // Act
        $response = $this->getJson('/api/dashboard/attendance');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        
        $this->assertNotEmpty($data);
        $monthData = $data[0];
        $this->assertEquals(270, $monthData['total_attendance']); // 60 + 90 + 120
        $this->assertEquals(3, $monthData['event_count']);
        $this->assertEquals(90, $monthData['average_attendance']); // 270 / 3
    }
}
