<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;
use Carbon\Carbon;

/**
 * Property-Based Test for Event Chronological Sorting
 * 
 * Feature: church-management-system
 * Property 25: Event chronological sorting
 * **Validates: Requirements 9.3**
 * 
 * Property: For any list of upcoming events, they should be sorted by event_date 
 * in ascending order (nearest event first).
 */
class EventChronologicalSortingPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Disable throttling middleware for property tests to avoid rate limiting
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        
        // Create and authenticate a user
        $this->user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($this->user);
    }

    protected function tearDown(): void
    {
        // Clean up all test data
        Event::query()->delete();
        
        parent::tearDown();
    }

    /**
     * Test that upcoming events are sorted chronologically by event_date (ascending).
     * 
     * @test
     */
    public function upcoming_events_are_sorted_chronologically_ascending()
    {
        $this->forAll(
            Generators::choose(2, 15) // Number of events to create (at least 2 to test sorting)
        )
            ->withMaxSize(100) // Run 100 iterations as specified in design
            ->then(function ($eventCount) {
                // Clean database before each iteration
                Event::query()->delete();
                
                // Create events with random future dates
                $createdEvents = [];
                $today = Carbon::today();
                
                for ($i = 0; $i < $eventCount; $i++) {
                    // Generate random future dates (1 to 365 days from now)
                    $daysFromNow = rand(1, 365);
                    $eventDate = $today->copy()->addDays($daysFromNow);
                    
                    $event = Event::create([
                        'title' => 'Event ' . $i . ' ' . uniqid(),
                        'description' => 'Test event description',
                        'event_date' => $eventDate->format('Y-m-d'),
                        'event_time' => sprintf('%02d:%02d', rand(8, 20), rand(0, 59)),
                        'location' => 'Test Location ' . $i,
                        'status' => 'upcoming',
                        'attendance_count' => null,
                    ]);
                    
                    $createdEvents[] = $event;
                }
                
                // Fetch events from API
                $response = $this->getJson('/api/events?status=upcoming');
                
                // Property: Events should be sorted by event_date in ascending order
                $response->assertStatus(200);
                $events = $response->json('data');
                
                $this->assertNotEmpty($events, 'Should return events');
                $this->assertCount($eventCount, $events, 'Should return all created events');
                
                // Verify chronological sorting (ascending order - nearest first)
                for ($i = 0; $i < count($events) - 1; $i++) {
                    $currentDate = Carbon::parse($events[$i]['event_date']);
                    $nextDate = Carbon::parse($events[$i + 1]['event_date']);
                    
                    $this->assertLessThanOrEqual(
                        $nextDate->timestamp,
                        $currentDate->timestamp,
                        "Event at index {$i} (date: {$currentDate->toDateString()}) should come before or equal to event at index " . ($i + 1) . " (date: {$nextDate->toDateString()}). Events should be sorted chronologically in ascending order."
                    );
                }
                
                // Additional verification: first event should be the nearest
                $firstEventDate = Carbon::parse($events[0]['event_date']);
                $allEventDates = array_map(function($event) {
                    return Carbon::parse($event['event_date']);
                }, $events);
                
                $earliestDate = min($allEventDates);
                
                $this->assertEquals(
                    $earliestDate->toDateString(),
                    $firstEventDate->toDateString(),
                    'First event should be the nearest (earliest date)'
                );
            });
    }

    /**
     * Test that events with the same date are sorted by time.
     * 
     * @test
     */
    public function events_on_same_date_are_sorted_by_time()
    {
        $this->forAll(
            Generators::choose(2, 10) // Number of events on the same date
        )
            ->withMaxSize(100)
            ->then(function ($eventCount) {
                // Clean database before each iteration
                Event::query()->delete();
                
                // Create events with the same date but different times
                $eventDate = Carbon::today()->addDays(7);
                $createdEvents = [];
                
                for ($i = 0; $i < $eventCount; $i++) {
                    // Generate random times
                    $hour = rand(8, 20);
                    $minute = rand(0, 59);
                    $eventTime = sprintf('%02d:%02d', $hour, $minute);
                    
                    $event = Event::create([
                        'title' => 'Event ' . $i . ' ' . uniqid(),
                        'description' => 'Test event description',
                        'event_date' => $eventDate->format('Y-m-d'),
                        'event_time' => $eventTime,
                        'location' => 'Test Location ' . $i,
                        'status' => 'upcoming',
                        'attendance_count' => null,
                    ]);
                    
                    $createdEvents[] = $event;
                }
                
                // Fetch events from API
                $response = $this->getJson('/api/events?status=upcoming');
                
                // Property: Events on the same date should be sorted by time
                $response->assertStatus(200);
                $events = $response->json('data');
                
                $this->assertCount($eventCount, $events, 'Should return all created events');
                
                // Verify time sorting for events on the same date
                for ($i = 0; $i < count($events) - 1; $i++) {
                    $currentTime = $events[$i]['event_time'];
                    $nextTime = $events[$i + 1]['event_time'];
                    
                    $this->assertLessThanOrEqual(
                        $nextTime,
                        $currentTime,
                        "Event at index {$i} (time: {$currentTime}) should come before or equal to event at index " . ($i + 1) . " (time: {$nextTime}). Events on the same date should be sorted by time."
                    );
                }
            });
    }

    /**
     * Test that mixed date events maintain chronological order.
     * 
     * @test
     */
    public function mixed_date_events_maintain_chronological_order()
    {
        $this->forAll(
            Generators::choose(3, 12) // Number of events
        )
            ->withMaxSize(100)
            ->then(function ($eventCount) {
                // Clean database before each iteration
                Event::query()->delete();
                
                // Create events with a mix of near and far future dates
                $today = Carbon::today();
                $createdDates = [];
                
                for ($i = 0; $i < $eventCount; $i++) {
                    // Create a mix of dates: some near (1-30 days), some far (31-365 days)
                    $daysFromNow = ($i % 2 === 0) ? rand(1, 30) : rand(31, 365);
                    $eventDate = $today->copy()->addDays($daysFromNow);
                    $createdDates[] = $eventDate->copy();
                    
                    Event::create([
                        'title' => 'Event ' . $i . ' ' . uniqid(),
                        'description' => 'Test event description',
                        'event_date' => $eventDate->format('Y-m-d'),
                        'event_time' => sprintf('%02d:%02d', rand(8, 20), rand(0, 59)),
                        'location' => 'Test Location ' . $i,
                        'status' => 'upcoming',
                        'attendance_count' => null,
                    ]);
                }
                
                // Fetch events from API
                $response = $this->getJson('/api/events?status=upcoming');
                
                // Property: All events should be in chronological order regardless of creation order
                $response->assertStatus(200);
                $events = $response->json('data');
                
                $this->assertCount($eventCount, $events, 'Should return all created events');
                
                // Verify strict chronological ordering
                $previousDate = null;
                foreach ($events as $index => $event) {
                    $currentDate = Carbon::parse($event['event_date']);
                    
                    if ($previousDate !== null) {
                        $this->assertGreaterThanOrEqual(
                            $previousDate->timestamp,
                            $currentDate->timestamp,
                            "Event at index {$index} should not have an earlier date than the previous event. Chronological order violated."
                        );
                    }
                    
                    $previousDate = $currentDate;
                }
            });
    }

    /**
     * Test that only upcoming events are included in the sorted list.
     * 
     * @test
     */
    public function only_upcoming_status_events_are_included_in_sorted_list()
    {
        $this->forAll(
            Generators::choose(2, 10), // Number of upcoming events
            Generators::choose(1, 5)   // Number of completed/cancelled events
        )
            ->withMaxSize(100)
            ->then(function ($upcomingCount, $otherCount) {
                // Clean database before each iteration
                Event::query()->delete();
                
                $today = Carbon::today();
                
                // Create upcoming events
                for ($i = 0; $i < $upcomingCount; $i++) {
                    Event::create([
                        'title' => 'Upcoming Event ' . $i . ' ' . uniqid(),
                        'description' => 'Test event description',
                        'event_date' => $today->copy()->addDays(rand(1, 30))->format('Y-m-d'),
                        'event_time' => sprintf('%02d:%02d', rand(8, 20), rand(0, 59)),
                        'location' => 'Test Location ' . $i,
                        'status' => 'upcoming',
                        'attendance_count' => null,
                    ]);
                }
                
                // Create completed/cancelled events (should not appear in upcoming list)
                for ($i = 0; $i < $otherCount; $i++) {
                    $status = ($i % 2 === 0) ? 'completed' : 'cancelled';
                    Event::create([
                        'title' => 'Other Event ' . $i . ' ' . uniqid(),
                        'description' => 'Test event description',
                        'event_date' => $today->copy()->addDays(rand(1, 30))->format('Y-m-d'),
                        'event_time' => sprintf('%02d:%02d', rand(8, 20), rand(0, 59)),
                        'location' => 'Test Location ' . $i,
                        'status' => $status,
                        'attendance_count' => rand(10, 100),
                    ]);
                }
                
                // Fetch upcoming events from API
                $response = $this->getJson('/api/events?status=upcoming');
                
                // Property: Only upcoming events should be returned and sorted
                $response->assertStatus(200);
                $events = $response->json('data');
                
                $this->assertCount($upcomingCount, $events, 'Should return only upcoming events');
                
                // Verify all returned events have 'upcoming' status
                foreach ($events as $event) {
                    $this->assertEquals('upcoming', $event['status'], 'All returned events should have upcoming status');
                }
                
                // Verify chronological sorting
                for ($i = 0; $i < count($events) - 1; $i++) {
                    $currentDate = Carbon::parse($events[$i]['event_date']);
                    $nextDate = Carbon::parse($events[$i + 1]['event_date']);
                    
                    $this->assertLessThanOrEqual(
                        $nextDate->timestamp,
                        $currentDate->timestamp,
                        'Upcoming events should be sorted chronologically'
                    );
                }
            });
    }

    /**
     * Test that empty event list is handled correctly.
     * 
     * @test
     */
    public function empty_event_list_returns_empty_array()
    {
        // Clean database
        Event::query()->delete();
        
        // Fetch events from API
        $response = $this->getJson('/api/events?status=upcoming');
        
        // Property: Empty list should be returned when no events exist
        $response->assertStatus(200);
        $events = $response->json('data');
        
        $this->assertIsArray($events, 'Should return an array');
        $this->assertEmpty($events, 'Should return empty array when no events exist');
    }

    /**
     * Test that single event is returned correctly.
     * 
     * @test
     */
    public function single_event_is_returned_correctly()
    {
        $this->forAll(
            Generators::choose(1, 365) // Days from now
        )
            ->withMaxSize(100)
            ->then(function ($daysFromNow) {
                // Clean database before each iteration
                Event::query()->delete();
                
                $today = Carbon::today();
                $eventDate = $today->copy()->addDays($daysFromNow);
                
                // Create a single event
                $event = Event::create([
                    'title' => 'Single Event ' . uniqid(),
                    'description' => 'Test event description',
                    'event_date' => $eventDate->format('Y-m-d'),
                    'event_time' => '10:00',
                    'location' => 'Test Location',
                    'status' => 'upcoming',
                    'attendance_count' => null,
                ]);
                
                // Fetch events from API
                $response = $this->getJson('/api/events?status=upcoming');
                
                // Property: Single event should be returned correctly
                $response->assertStatus(200);
                $events = $response->json('data');
                
                $this->assertCount(1, $events, 'Should return exactly one event');
                $this->assertEquals($event->id, $events[0]['id'], 'Should return the created event');
                
                // Parse the returned date (may be in ISO 8601 format)
                $returnedDate = Carbon::parse($events[0]['event_date'])->format('Y-m-d');
                $this->assertEquals($eventDate->format('Y-m-d'), $returnedDate, 'Event date should match');
            });
    }
}
