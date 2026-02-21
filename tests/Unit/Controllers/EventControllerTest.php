<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Http\Controllers\Api\EventController;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    protected EventController $controller;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->controller = new EventController();
    }

    /** @test */
    public function it_returns_paginated_events_with_correct_structure()
    {
        // Arrange
        Event::factory()->count(10)->create();

        // Act
        $request = new Request();
        $response = $this->controller->index($request);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        $this->assertArrayHasKey('pagination', $data);
        $this->assertCount(10, $data['data']);
    }

    /** @test */
    public function it_sorts_events_chronologically_by_date()
    {
        // Arrange
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
        $request = new Request();
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertEquals('Event 1', $data['data'][0]['title']);
        $this->assertEquals('Event 2', $data['data'][1]['title']);
        $this->assertEquals('Event 3', $data['data'][2]['title']);
    }

    /** @test */
    public function it_filters_events_by_status()
    {
        // Arrange
        Event::factory()->count(3)->create(['status' => 'upcoming']);
        Event::factory()->count(2)->create(['status' => 'completed']);

        // Act
        $request = new Request(['status' => 'upcoming']);
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(3, $data['data']);
        foreach ($data['data'] as $event) {
            $this->assertEquals('upcoming', $event['status']);
        }
    }

    /** @test */
    public function it_filters_upcoming_events_by_category()
    {
        // Arrange
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
        $request = new Request(['category' => 'upcoming']);
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(1, $data['data']);
        $this->assertEquals('upcoming', $data['data'][0]['status']);
    }

    /** @test */
    public function it_filters_past_events_by_category()
    {
        // Arrange
        $today = Carbon::today();
        Event::factory()->create([
            'event_date' => $today->copy()->addDays(5),
            'status' => 'upcoming',
        ]);
        Event::factory()->create([
            'event_date' => $today->copy()->subDays(5),
            'status' => 'completed',
        ]);
        Event::factory()->create([
            'event_date' => $today->copy()->subDays(10),
            'status' => 'upcoming', // Past date but not marked completed
        ]);

        // Act
        $request = new Request(['category' => 'past']);
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(2, $data['data']);
    }

    /** @test */
    public function it_creates_a_new_event_with_valid_data()
    {
        // Arrange
        $eventData = [
            'title' => 'Sunday Service',
            'description' => 'Weekly worship service',
            'event_date' => '2024-12-25',
            'event_time' => '10:00',
            'location' => 'Main Sanctuary',
            'status' => 'upcoming',
        ];

        // Act
        $request = new Request($eventData);
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(201, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals('Event created successfully', $data['message']);
        $this->assertEquals('Sunday Service', $data['data']['title']);
        $this->assertDatabaseHas('events', ['title' => 'Sunday Service']);
    }

    /** @test */
    public function it_returns_validation_error_for_invalid_event_data()
    {
        // Arrange: Missing required fields
        $eventData = [
            'title' => 'Sunday Service',
            // Missing event_date, event_time, location, status
        ];

        // Act
        $request = new Request($eventData);
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(422, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertEquals('Validation error', $data['message']);
        $this->assertArrayHasKey('errors', $data);
    }

    /** @test */
    public function it_retrieves_a_specific_event_by_id()
    {
        // Arrange
        $event = Event::factory()->create([
            'title' => 'Christmas Service',
        ]);

        // Act
        $response = $this->controller->show($event->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals($event->id, $data['data']['id']);
        $this->assertEquals('Christmas Service', $data['data']['title']);
    }

    /** @test */
    public function it_returns_404_for_non_existent_event()
    {
        // Act
        $response = $this->controller->show(999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertEquals('Event not found', $data['message']);
    }

    /** @test */
    public function it_updates_an_event_with_valid_data()
    {
        // Arrange
        $event = Event::factory()->create([
            'title' => 'Old Title',
            'status' => 'upcoming',
        ]);
        
        $updateData = [
            'title' => 'New Title',
            'description' => $event->description,
            'event_date' => $event->event_date->format('Y-m-d'),
            'event_time' => $event->event_time,
            'location' => $event->location,
            'status' => 'upcoming',
        ];

        // Act
        $request = new Request($updateData);
        $response = $this->controller->update($request, $event->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals('Event updated successfully', $data['message']);
        $this->assertEquals('New Title', $data['data']['title']);
        $this->assertDatabaseHas('events', ['id' => $event->id, 'title' => 'New Title']);
    }

    /** @test */
    public function it_returns_404_when_updating_non_existent_event()
    {
        // Arrange
        $updateData = [
            'title' => 'New Title',
            'event_date' => '2024-12-25',
            'event_time' => '10:00',
            'location' => 'Main Sanctuary',
            'status' => 'upcoming',
        ];

        // Act
        $request = new Request($updateData);
        $response = $this->controller->update($request, 999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertEquals('Event not found', $data['message']);
    }

    /** @test */
    public function it_deletes_an_event()
    {
        // Arrange
        $event = Event::factory()->create();

        // Act
        $response = $this->controller->destroy($event->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals('Event deleted successfully', $data['message']);
        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

    /** @test */
    public function it_returns_404_when_deleting_non_existent_event()
    {
        // Act
        $response = $this->controller->destroy(999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertEquals('Event not found', $data['message']);
    }

    /** @test */
    public function it_marks_event_as_completed()
    {
        // Arrange
        $event = Event::factory()->create([
            'status' => 'upcoming',
            'attendance_count' => null,
        ]);

        // Act
        $request = new Request(['attendance_count' => 150]);
        $response = $this->controller->complete($request, $event->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals('Event marked as completed', $data['message']);
        $this->assertEquals('completed', $data['data']['status']);
        $this->assertEquals(150, $data['data']['attendance_count']);
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'status' => 'completed',
            'attendance_count' => 150,
        ]);
    }

    /** @test */
    public function it_marks_event_as_completed_without_attendance_count()
    {
        // Arrange
        $event = Event::factory()->create([
            'status' => 'upcoming',
        ]);

        // Act
        $request = new Request();
        $response = $this->controller->complete($request, $event->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals('completed', $data['data']['status']);
    }

    /** @test */
    public function it_returns_404_when_completing_non_existent_event()
    {
        // Act
        $request = new Request(['attendance_count' => 150]);
        $response = $this->controller->complete($request, 999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertEquals('Event not found', $data['message']);
    }

    /** @test */
    public function it_validates_attendance_count_is_non_negative()
    {
        // Arrange
        $event = Event::factory()->create(['status' => 'upcoming']);

        // Act
        $request = new Request(['attendance_count' => -10]);
        $response = $this->controller->complete($request, $event->id);

        // Assert
        $this->assertEquals(422, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertArrayHasKey('errors', $data);
    }

    /** @test */
    public function it_paginates_events_at_50_per_page_by_default()
    {
        // Arrange
        Event::factory()->count(60)->create();

        // Act
        $request = new Request();
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertEquals(50, $data['pagination']['per_page']);
        $this->assertEquals(60, $data['pagination']['total']);
        $this->assertEquals(2, $data['pagination']['last_page']);
        $this->assertCount(50, $data['data']);
    }

    /** @test */
    public function it_respects_custom_per_page_parameter()
    {
        // Arrange
        Event::factory()->count(30)->create();

        // Act
        $request = new Request(['per_page' => 10]);
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertEquals(10, $data['pagination']['per_page']);
        $this->assertCount(10, $data['data']);
    }
}
