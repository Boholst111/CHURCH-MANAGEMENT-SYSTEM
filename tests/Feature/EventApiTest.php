<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Carbon\Carbon;

class EventApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $staffUser;
    protected User $readOnlyUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create users with different roles
        $this->adminUser = User::factory()->create(['role' => 'admin']);
        $this->staffUser = User::factory()->create(['role' => 'staff']);
        $this->readOnlyUser = User::factory()->create(['role' => 'readonly']);
    }

    /** @test */
    public function authenticated_user_can_list_events()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Event::factory()->count(5)->create();

        // Act
        $response = $this->getJson('/api/events');

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'description',
                        'event_date',
                        'event_time',
                        'location',
                        'status',
                    ]
                ],
                'pagination' => [
                    'current_page',
                    'per_page',
                    'total',
                    'last_page',
                ]
            ]);
    }

    /** @test */
    public function unauthenticated_user_cannot_list_events()
    {
        // Act
        $response = $this->getJson('/api/events');

        // Assert
        $response->assertStatus(401);
    }

    /** @test */
    public function it_sorts_events_chronologically()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Event::factory()->create([
            'title' => 'Event 3',
            'event_date' => '2024-03-01',
            'event_time' => '10:00',
        ]);
        Event::factory()->create([
            'title' => 'Event 1',
            'event_date' => '2024-01-01',
            'event_time' => '10:00',
        ]);
        Event::factory()->create([
            'title' => 'Event 2',
            'event_date' => '2024-02-01',
            'event_time' => '10:00',
        ]);

        // Act
        $response = $this->getJson('/api/events');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertEquals('Event 1', $data[0]['title']);
        $this->assertEquals('Event 2', $data[1]['title']);
        $this->assertEquals('Event 3', $data[2]['title']);
    }

    /** @test */
    public function it_can_filter_events_by_status()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Event::factory()->count(3)->create(['status' => 'upcoming']);
        Event::factory()->count(2)->create(['status' => 'completed']);

        // Act
        $response = $this->getJson('/api/events?status=upcoming');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(3, $data);
        foreach ($data as $event) {
            $this->assertEquals('upcoming', $event['status']);
        }
    }

    /** @test */
    public function it_can_filter_upcoming_events_by_category()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $today = Carbon::today();
        Event::factory()->create([
            'title' => 'Future Event',
            'event_date' => $today->copy()->addDays(5),
            'status' => 'upcoming',
        ]);
        Event::factory()->create([
            'title' => 'Past Event',
            'event_date' => $today->copy()->subDays(5),
            'status' => 'completed',
        ]);

        // Act
        $response = $this->getJson('/api/events?category=upcoming');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(1, $data);
        $this->assertEquals('Future Event', $data[0]['title']);
    }

    /** @test */
    public function it_can_filter_past_events_by_category()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $today = Carbon::today();
        Event::factory()->create([
            'event_date' => $today->copy()->addDays(5),
            'status' => 'upcoming',
        ]);
        Event::factory()->create([
            'event_date' => $today->copy()->subDays(5),
            'status' => 'completed',
        ]);

        // Act
        $response = $this->getJson('/api/events?category=past');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(1, $data);
    }

    /** @test */
    public function it_paginates_events_correctly()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Event::factory()->count(60)->create();

        // Act
        $response = $this->getJson('/api/events');

        // Assert
        $response->assertStatus(200);
        $pagination = $response->json('pagination');
        $this->assertEquals(50, $pagination['per_page']);
        $this->assertEquals(60, $pagination['total']);
        $this->assertEquals(2, $pagination['last_page']);
    }

    /** @test */
    public function admin_can_create_event()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $eventData = [
            'title' => 'Sunday Service',
            'description' => 'Weekly worship service',
            'event_date' => '2024-12-25',
            'event_time' => '10:00',
            'location' => 'Main Sanctuary',
            'status' => 'upcoming',
        ];

        // Act
        $response = $this->postJson('/api/events', $eventData);

        // Assert
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Event created successfully',
            ]);
        $this->assertDatabaseHas('events', ['title' => 'Sunday Service']);
    }

    /** @test */
    public function staff_can_create_event()
    {
        // Arrange
        Sanctum::actingAs($this->staffUser);
        $eventData = [
            'title' => 'Youth Meeting',
            'description' => 'Monthly youth gathering',
            'event_date' => '2024-12-20',
            'event_time' => '18:00',
            'location' => 'Youth Hall',
            'status' => 'upcoming',
        ];

        // Act
        $response = $this->postJson('/api/events', $eventData);

        // Assert
        $response->assertStatus(201);
        $this->assertDatabaseHas('events', ['title' => 'Youth Meeting']);
    }

    /** @test */
    public function readonly_user_cannot_create_event()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $eventData = [
            'title' => 'Sunday Service',
            'description' => 'Weekly worship service',
            'event_date' => '2024-12-25',
            'event_time' => '10:00',
            'location' => 'Main Sanctuary',
            'status' => 'upcoming',
        ];

        // Act
        $response = $this->postJson('/api/events', $eventData);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseMissing('events', ['title' => 'Sunday Service']);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_event()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $eventData = [
            'title' => 'Sunday Service',
            // Missing required fields
        ];

        // Act
        $response = $this->postJson('/api/events', $eventData);

        // Assert
        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors',
            ]);
    }

    /** @test */
    public function it_can_retrieve_a_specific_event()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $event = Event::factory()->create(['title' => 'Christmas Service']);

        // Act
        $response = $this->getJson("/api/events/{$event->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $event->id,
                    'title' => 'Christmas Service',
                ]
            ]);
    }

    /** @test */
    public function it_returns_404_for_non_existent_event()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);

        // Act
        $response = $this->getJson('/api/events/999');

        // Assert
        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Event not found',
            ]);
    }

    /** @test */
    public function admin_can_update_event()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $event = Event::factory()->create(['title' => 'Old Title']);
        $updateData = [
            'title' => 'New Title',
            'description' => $event->description,
            'event_date' => $event->event_date->format('Y-m-d'),
            'event_time' => $event->event_time,
            'location' => $event->location,
            'status' => $event->status,
        ];

        // Act
        $response = $this->putJson("/api/events/{$event->id}", $updateData);

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Event updated successfully',
            ]);
        $this->assertDatabaseHas('events', ['id' => $event->id, 'title' => 'New Title']);
    }

    /** @test */
    public function readonly_user_cannot_update_event()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $event = Event::factory()->create(['title' => 'Old Title']);
        $updateData = [
            'title' => 'New Title',
            'description' => $event->description,
            'event_date' => $event->event_date->format('Y-m-d'),
            'event_time' => $event->event_time,
            'location' => $event->location,
            'status' => $event->status,
        ];

        // Act
        $response = $this->putJson("/api/events/{$event->id}", $updateData);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('events', ['id' => $event->id, 'title' => 'Old Title']);
    }

    /** @test */
    public function admin_can_delete_event()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $event = Event::factory()->create();

        // Act
        $response = $this->deleteJson("/api/events/{$event->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Event deleted successfully',
            ]);
        // Check that event is soft deleted (has deleted_at timestamp)
        $this->assertSoftDeleted('events', ['id' => $event->id]);
    }

    /** @test */
    public function readonly_user_cannot_delete_event()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $event = Event::factory()->create();

        // Act
        $response = $this->deleteJson("/api/events/{$event->id}");

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('events', ['id' => $event->id]);
    }

    /** @test */
    public function admin_can_mark_event_as_completed()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $event = Event::factory()->create([
            'status' => 'upcoming',
            'attendance_count' => null,
        ]);

        // Act
        $response = $this->putJson("/api/events/{$event->id}/complete", [
            'attendance_count' => 150,
        ]);

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Event marked as completed',
                'data' => [
                    'status' => 'completed',
                    'attendance_count' => 150,
                ]
            ]);
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'status' => 'completed',
            'attendance_count' => 150,
        ]);
    }

    /** @test */
    public function staff_can_mark_event_as_completed()
    {
        // Arrange
        Sanctum::actingAs($this->staffUser);
        $event = Event::factory()->create(['status' => 'upcoming']);

        // Act
        $response = $this->putJson("/api/events/{$event->id}/complete", [
            'attendance_count' => 100,
        ]);

        // Assert
        $response->assertStatus(200);
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'status' => 'completed',
        ]);
    }

    /** @test */
    public function readonly_user_cannot_mark_event_as_completed()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $event = Event::factory()->create(['status' => 'upcoming']);

        // Act
        $response = $this->putJson("/api/events/{$event->id}/complete", [
            'attendance_count' => 150,
        ]);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'status' => 'upcoming',
        ]);
    }

    /** @test */
    public function it_can_mark_event_as_completed_without_attendance_count()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $event = Event::factory()->create(['status' => 'upcoming']);

        // Act
        $response = $this->putJson("/api/events/{$event->id}/complete");

        // Assert
        $response->assertStatus(200);
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'status' => 'completed',
        ]);
    }

    /** @test */
    public function it_validates_attendance_count_is_non_negative()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $event = Event::factory()->create(['status' => 'upcoming']);

        // Act
        $response = $this->putJson("/api/events/{$event->id}/complete", [
            'attendance_count' => -10,
        ]);

        // Assert
        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors',
            ]);
    }

    /** @test */
    public function it_returns_404_when_completing_non_existent_event()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);

        // Act
        $response = $this->putJson('/api/events/999/complete', [
            'attendance_count' => 150,
        ]);

        // Assert
        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Event not found',
            ]);
    }
}
