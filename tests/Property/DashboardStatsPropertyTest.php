<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\Event;
use App\Models\Tithe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Dashboard Stats Accuracy
 * 
 * Feature: church-management-system
 * Property 1: Dashboard stats reflect current data
 * Validates: Requirements 2.1, 9.6
 * 
 * **Validates: Requirements 2.1, 9.6**
 * 
 * Property: For any point in time, the Quick Stats cards on the dashboard should 
 * display counts that match the actual database records (total members count equals 
 * member records, upcoming events count equals future event records, new visitors 
 * count equals visitor records from current month).
 */
class DashboardStatsPropertyTest extends TestCase
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
        Member::query()->delete();
        Event::query()->delete();
        Tithe::query()->delete();
        
        parent::tearDown();
    }

    /**
     * Test that total members count matches actual active member records.
     * 
     * @test
     */
    public function dashboard_total_members_matches_active_member_count()
    {
        $this->forAll(
            Generators::choose(0, 20), // Number of active members
            Generators::choose(0, 15)  // Number of visitors (should not be counted)
        )
            ->withMaxSize(10) // Reduced to 10 iterations to avoid rate limiting
            ->then(function ($activeMemberCount, $visitorCount) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create active members
                Member::factory()->count($activeMemberCount)->create([
                    'status' => 'active',
                ]);
                
                // Create visitors (should not be counted in total members)
                Member::factory()->count($visitorCount)->create([
                    'status' => 'visitor',
                ]);
                
                // Get dashboard stats
                $response = $this->getJson('/api/dashboard/stats');
                
                // Property: Total members count should equal active member records
                $response->assertStatus(200);
                $totalMembers = $response->json('data.total_members');
                
                $actualActiveMemberCount = Member::where('status', 'active')->count();
                
                $this->assertEquals(
                    $actualActiveMemberCount,
                    $totalMembers,
                    "Dashboard total_members ({$totalMembers}) should match actual active member count ({$actualActiveMemberCount})"
                );
                
                // Verify it's exactly the active members, not including visitors
                $this->assertEquals(
                    $activeMemberCount,
                    $totalMembers,
                    "Dashboard should count only active members, not visitors"
                );
            });
    }

    /**
     * Test that upcoming events count matches actual future event records.
     * 
     * @test
     */
    public function dashboard_upcoming_events_matches_future_event_count()
    {
        $this->forAll(
            Generators::choose(0, 15), // Number of upcoming events
            Generators::choose(0, 10)  // Number of past/completed events
        )
            ->withMaxSize(10)
            ->then(function ($upcomingCount, $pastCount) {
                // Clean database before each iteration
                Event::query()->delete();
                
                // Create upcoming events (future dates with 'upcoming' status)
                Event::factory()->count($upcomingCount)->create([
                    'status' => 'upcoming',
                    'event_date' => now()->addDays(rand(1, 30)),
                ]);
                
                // Create past events (should not be counted)
                Event::factory()->count($pastCount)->create([
                    'status' => 'completed',
                    'event_date' => now()->subDays(rand(1, 30)),
                ]);
                
                // Get dashboard stats
                $response = $this->getJson('/api/dashboard/stats');
                
                // Property: Upcoming events count should equal future event records with 'upcoming' status
                $response->assertStatus(200);
                $upcomingEventsCount = $response->json('data.upcoming_events');
                
                $actualUpcomingCount = Event::where('status', 'upcoming')
                    ->where('event_date', '>=', now()->toDateString())
                    ->count();
                
                $this->assertEquals(
                    $actualUpcomingCount,
                    $upcomingEventsCount,
                    "Dashboard upcoming_events ({$upcomingEventsCount}) should match actual upcoming event count ({$actualUpcomingCount})"
                );
            });
    }

    /**
     * Test that new visitors count matches visitor records from current month.
     * 
     * @test
     */
    public function dashboard_new_visitors_matches_current_month_visitor_count()
    {
        $this->forAll(
            Generators::choose(0, 15), // Number of new visitors this month
            Generators::choose(0, 10)  // Number of old visitors from previous months
        )
            ->withMaxSize(10)
            ->then(function ($newVisitorCount, $oldVisitorCount) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create new visitors who joined this month
                Member::factory()->count($newVisitorCount)->create([
                    'status' => 'visitor',
                    'date_joined' => now()->startOfMonth()->addDays(rand(0, min(now()->day - 1, 28))),
                ]);
                
                // Create old visitors from previous months (should not be counted)
                Member::factory()->count($oldVisitorCount)->create([
                    'status' => 'visitor',
                    'date_joined' => now()->subMonths(rand(1, 6)),
                ]);
                
                // Create active members who joined this month (should not be counted)
                Member::factory()->count(3)->create([
                    'status' => 'active',
                    'date_joined' => now(),
                ]);
                
                // Get dashboard stats
                $response = $this->getJson('/api/dashboard/stats');
                
                // Property: New visitors count should equal visitor records from current month
                $response->assertStatus(200);
                $newVisitorsCount = $response->json('data.new_visitors');
                
                $actualNewVisitorCount = Member::where('status', 'visitor')
                    ->whereYear('date_joined', now()->year)
                    ->whereMonth('date_joined', now()->month)
                    ->count();
                
                $this->assertEquals(
                    $actualNewVisitorCount,
                    $newVisitorsCount,
                    "Dashboard new_visitors ({$newVisitorsCount}) should match actual visitor count from current month ({$actualNewVisitorCount})"
                );
            });
    }

    /**
     * Test that monthly tithes total matches sum of tithe records from current month.
     * 
     * @test
     */
    public function dashboard_monthly_tithes_matches_current_month_tithe_sum()
    {
        $this->forAll(
            Generators::choose(0, 15) // Number of tithes this month
        )
            ->withMaxSize(10)
            ->then(function ($titheCount) {
                // Clean database before each iteration
                Tithe::query()->delete();
                
                // Create tithes for current month with known amounts
                $expectedTotal = 0;
                
                for ($i = 0; $i < $titheCount; $i++) {
                    $amount = rand(10, 500);
                    $expectedTotal += $amount;
                    
                    Tithe::factory()->create([
                        'date' => now()->startOfMonth()->addDays(rand(0, min(now()->day - 1, 28))),
                        'amount' => $amount,
                    ]);
                }
                
                // Create tithes from previous months (should not be counted)
                Tithe::factory()->count(3)->create([
                    'date' => now()->subMonths(rand(1, 6)),
                    'amount' => 100,
                ]);
                
                // Get dashboard stats
                $response = $this->getJson('/api/dashboard/stats');
                
                // Property: Monthly tithes should equal sum of tithe amounts from current month
                $response->assertStatus(200);
                $monthlyTithes = $response->json('data.monthly_tithes');
                
                $actualMonthlyTotal = Tithe::whereYear('date', now()->year)
                    ->whereMonth('date', now()->month)
                    ->sum('amount');
                
                $this->assertEquals(
                    $actualMonthlyTotal,
                    $monthlyTithes,
                    "Dashboard monthly_tithes ({$monthlyTithes}) should match actual sum of tithes from current month ({$actualMonthlyTotal})"
                );
            });
    }

    /**
     * Test that all dashboard stats are consistent with database at any point in time.
     * 
     * @test
     */
    public function all_dashboard_stats_reflect_current_database_state()
    {
        $this->forAll(
            Generators::choose(0, 15), // Active members
            Generators::choose(0, 10), // Visitors this month
            Generators::choose(0, 10), // Upcoming events
            Generators::choose(0, 8)   // Tithes this month
        )
            ->withMaxSize(10)
            ->then(function ($activeMemberCount, $newVisitorCount, $upcomingEventCount, $titheCount) {
                // Clean database before each iteration
                Member::query()->delete();
                Event::query()->delete();
                Tithe::query()->delete();
                
                // Create active members
                Member::factory()->count($activeMemberCount)->create([
                    'status' => 'active',
                ]);
                
                // Create new visitors this month
                Member::factory()->count($newVisitorCount)->create([
                    'status' => 'visitor',
                    'date_joined' => now(),
                ]);
                
                // Create upcoming events
                Event::factory()->count($upcomingEventCount)->create([
                    'status' => 'upcoming',
                    'event_date' => now()->addDays(rand(1, 30)),
                ]);
                
                // Create tithes this month
                $expectedTitheTotal = 0;
                for ($i = 0; $i < $titheCount; $i++) {
                    $amount = rand(10, 500);
                    $expectedTitheTotal += $amount;
                    Tithe::factory()->create([
                        'date' => now(),
                        'amount' => $amount,
                    ]);
                }
                
                // Get dashboard stats
                $response = $this->getJson('/api/dashboard/stats');
                
                // Property: All stats should match current database state
                $response->assertStatus(200);
                $stats = $response->json('data');
                
                // Verify each stat matches database
                $actualActiveMembers = Member::where('status', 'active')->count();
                $actualNewVisitors = Member::where('status', 'visitor')
                    ->whereYear('date_joined', now()->year)
                    ->whereMonth('date_joined', now()->month)
                    ->count();
                $actualUpcomingEvents = Event::where('status', 'upcoming')
                    ->where('event_date', '>=', now()->toDateString())
                    ->count();
                $actualMonthlyTithes = Tithe::whereYear('date', now()->year)
                    ->whereMonth('date', now()->month)
                    ->sum('amount');
                
                $this->assertEquals($actualActiveMembers, $stats['total_members'], 
                    "Total members should match database");
                $this->assertEquals($actualNewVisitors, $stats['new_visitors'], 
                    "New visitors should match database");
                $this->assertEquals($actualUpcomingEvents, $stats['upcoming_events'], 
                    "Upcoming events should match database");
                $this->assertEquals($actualMonthlyTithes, $stats['monthly_tithes'], 
                    "Monthly tithes should match database");
            });
    }

    /**
     * Test that stats remain accurate after data changes.
     * 
     * @test
     */
    public function stats_update_correctly_after_data_changes()
    {
        $this->forAll(
            Generators::choose(1, 8) // Number of data changes to make
        )
            ->withMaxSize(10)
            ->then(function ($changeCount) {
                // Clean database before test
                Member::query()->delete();
                Event::query()->delete();
                Tithe::query()->delete();
                
                // Get initial stats
                $initialResponse = $this->getJson('/api/dashboard/stats');
                $initialResponse->assertStatus(200);
                
                // Make random data changes
                for ($i = 0; $i < $changeCount; $i++) {
                    $changeType = rand(1, 4);
                    
                    switch ($changeType) {
                        case 1: // Add active member
                            Member::factory()->create(['status' => 'active']);
                            break;
                        case 2: // Add visitor this month
                            Member::factory()->create(['status' => 'visitor', 'date_joined' => now()]);
                            break;
                        case 3: // Add upcoming event
                            Event::factory()->create(['status' => 'upcoming', 'event_date' => now()->addDays(7)]);
                            break;
                        case 4: // Add tithe this month
                            Tithe::factory()->create(['date' => now(), 'amount' => 100]);
                            break;
                    }
                }
                
                // Get updated stats
                $updatedResponse = $this->getJson('/api/dashboard/stats');
                $updatedResponse->assertStatus(200);
                $updatedStats = $updatedResponse->json('data');
                
                // Property: Stats should reflect the changes
                $actualActiveMembers = Member::where('status', 'active')->count();
                $actualNewVisitors = Member::where('status', 'visitor')
                    ->whereYear('date_joined', now()->year)
                    ->whereMonth('date_joined', now()->month)
                    ->count();
                $actualUpcomingEvents = Event::where('status', 'upcoming')
                    ->where('event_date', '>=', now()->toDateString())
                    ->count();
                $actualMonthlyTithes = Tithe::whereYear('date', now()->year)
                    ->whereMonth('date', now()->month)
                    ->sum('amount');
                
                $this->assertEquals($actualActiveMembers, $updatedStats['total_members'],
                    "Total members should reflect current database state after changes");
                $this->assertEquals($actualNewVisitors, $updatedStats['new_visitors'],
                    "New visitors should reflect current database state after changes");
                $this->assertEquals($actualUpcomingEvents, $updatedStats['upcoming_events'],
                    "Upcoming events should reflect current database state after changes");
                $this->assertEquals($actualMonthlyTithes, $updatedStats['monthly_tithes'],
                    "Monthly tithes should reflect current database state after changes");
            });
    }
}
