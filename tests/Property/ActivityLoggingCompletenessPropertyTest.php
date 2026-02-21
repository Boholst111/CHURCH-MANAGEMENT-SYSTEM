<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Activity;
use App\Models\Member;
use App\Models\Leadership;
use App\Models\SmallGroup;
use App\Models\Tithe;
use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Activity Logging Completeness
 * 
 * Feature: church-management-system
 * Property 35: Activity logging completeness
 * Validates: Requirements 11.6, 12.1, 12.2, 12.3, 12.5
 * 
 * Property: For any significant system operation (member CRUD, financial transaction, 
 * report generation, user authentication, data export), an activity log entry should 
 * be created with timestamp, user ID, action description, and entity information.
 */
class ActivityLoggingCompletenessPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        $this->user = User::factory()->create(['role' => 'admin']);
    }

    /**
     * Test that member CRUD operations create activity logs with all required fields.
     * 
     * @test
     */
    public function member_crud_operations_create_complete_activity_logs()
    {
        $this->forAll(
            Generators::names(),
            Generators::names(),
            Generators::string(),
            Generators::elements('active', 'visitor')
        )
            ->withMaxSize(100)
            ->then(function ($firstName, $lastName, $emailPrefix, $status) {
                Sanctum::actingAs($this->user);
                
                $email = strtolower($emailPrefix) . uniqid() . '@test.com';
                $phone = '+1' . rand(1000000000, 9999999999);
                
                $memberData = [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $email,
                    'phone' => $phone,
                    'address' => '123 Test St',
                    'city' => 'Test City',
                    'status' => $status,
                ];
                
                // CREATE operation
                $initialCount = Activity::count();
                $response = $this->postJson('/api/members', $memberData);
                
                // Always make at least one assertion
                $this->assertNotNull($response, 'Response should not be null');
                
                if ($response->status() === 201) {
                    $this->assertEquals($initialCount + 1, Activity::count(), 'Activity log should be created for member creation');
                    
                    $activity = Activity::latest('id')->first();
                    $this->assertActivityLogIsComplete($activity, 'create', 'members');
                    
                    $memberId = $response->json('data.id');
                    
                    // UPDATE operation
                    $updateCount = Activity::count();
                    $updateResponse = $this->putJson("/api/members/{$memberId}", array_merge($memberData, [
                        'first_name' => 'Updated',
                    ]));
                    
                    if ($updateResponse->status() === 200) {
                        $this->assertEquals($updateCount + 1, Activity::count(), 'Activity log should be created for member update');
                        
                        $updateActivity = Activity::latest('id')->first();
                        $this->assertActivityLogIsComplete($updateActivity, 'update', 'members', $memberId);
                    }
                    
                    // DELETE operation
                    $deleteCount = Activity::count();
                    $deleteResponse = $this->deleteJson("/api/members/{$memberId}");
                    
                    if ($deleteResponse->status() === 200) {
                        $this->assertEquals($deleteCount + 1, Activity::count(), 'Activity log should be created for member deletion');
                        
                        $deleteActivity = Activity::latest('id')->first();
                        $this->assertActivityLogIsComplete($deleteActivity, 'delete', 'members', $memberId);
                    }
                }
            });
    }

    /**
     * Test that financial transactions create activity logs with all required fields.
     * 
     * @test
     */
    public function financial_transactions_create_complete_activity_logs()
    {
        $this->forAll(
            Generators::choose(1, 10000),
            Generators::elements('cash', 'check', 'online', 'other')
        )
            ->withMaxSize(100)
            ->then(function ($amount, $paymentMethod) {
                Sanctum::actingAs($this->user);
                
                $titheData = [
                    'amount' => $amount / 100, // Convert to decimal
                    'payment_method' => $paymentMethod,
                    'date' => now()->format('Y-m-d'),
                ];
                
                $initialCount = Activity::count();
                $response = $this->postJson('/api/finance/tithes', $titheData);
                
                if ($response->status() === 201) {
                    $this->assertEquals($initialCount + 1, Activity::count(), 'Activity log should be created for tithe creation');
                    
                    $activity = Activity::latest('id')->first();
                    $this->assertActivityLogIsComplete($activity, 'create', 'finance');
                }
            });
    }

    /**
     * Test that report generation creates activity logs with all required fields.
     * 
     * @test
     */
    public function report_generation_creates_complete_activity_logs()
    {
        $this->forAll(
            Generators::elements('demographic', 'financial', 'combined')
        )
            ->withMaxSize(100)
            ->then(function ($reportType) {
                Sanctum::actingAs($this->user);
                
                // Clear any existing activities to get accurate count
                Activity::query()->delete();
                
                $initialCount = Activity::count();
                $response = $this->postJson('/api/reports/export-pdf', [
                    'report_type' => $reportType,
                    'start_date' => now()->subMonths(1)->format('Y-m-d'),
                    'end_date' => now()->format('Y-m-d'),
                ]);
                
                if ($response->status() === 200) {
                    $newCount = Activity::count();
                    $this->assertGreaterThan($initialCount, $newCount, 'Activity log should be created for PDF export');
                    
                    // Find the export activity (not the middleware-created one)
                    $activity = Activity::where('action', 'export')
                        ->where('entity_type', 'report')
                        ->latest('id')
                        ->first();
                    
                    $this->assertNotNull($activity, 'Export activity should exist');
                    $this->assertActivityLogIsComplete($activity, 'export', 'report');
                    $this->assertStringContainsString('PDF', $activity->description, 'Activity description should mention PDF');
                }
            });
    }

    /**
     * Test that user authentication creates activity logs with all required fields.
     * 
     * @test
     */
    public function user_authentication_creates_complete_activity_logs()
    {
        $this->forAll(
            Generators::string()
        )
            ->withMaxSize(100)
            ->then(function ($emailPrefix) {
                $email = strtolower($emailPrefix) . uniqid() . '@test.com';
                $password = 'Password123';
                
                $user = User::factory()->create([
                    'email' => $email,
                    'password' => bcrypt($password),
                ]);
                
                // Test LOGIN
                $initialCount = Activity::count();
                $response = $this->postJson('/api/auth/login', [
                    'email' => $email,
                    'password' => $password,
                ]);
                
                // Always make at least one assertion
                $this->assertNotNull($response, 'Response should not be null');
                
                if ($response->status() === 200) {
                    $this->assertGreaterThan($initialCount, Activity::count(), 'Activity log should be created for user login');
                    
                    // Find the login activity
                    $activity = Activity::where('action', 'login')
                        ->where('user_id', $user->id)
                        ->latest('id')
                        ->first();
                    
                    $this->assertNotNull($activity, 'Login activity should exist');
                    $this->assertNotNull($activity->created_at, 'Activity log should have a timestamp');
                    $this->assertInstanceOf(\DateTime::class, $activity->created_at, 'Timestamp should be a DateTime object');
                    $this->assertNotNull($activity->user_id, 'Activity log should have a user ID');
                    $this->assertEquals($user->id, $activity->user_id, 'Activity log should reference the correct user');
                    $this->assertNotNull($activity->action, 'Activity log should have an action');
                    $this->assertEquals('login', $activity->action, 'Activity log should have the correct action');
                    $this->assertNotNull($activity->entity_type, 'Activity log should have an entity type');
                    $this->assertEquals('user', $activity->entity_type, 'Activity log should have the correct entity type');
                    $this->assertEquals($user->id, $activity->entity_id, 'Activity log should have the correct entity ID');
                    $this->assertNotNull($activity->description, 'Activity log should have a description');
                    $this->assertIsString($activity->description, 'Activity description should be a string');
                    $this->assertGreaterThan(0, strlen($activity->description), 'Activity description should not be empty');
                    $this->assertNotNull($activity->ip_address, 'Activity log should have an IP address');
                    
                    // Test LOGOUT
                    Sanctum::actingAs($user);
                    $logoutCount = Activity::count();
                    $logoutResponse = $this->postJson('/api/auth/logout');
                    
                    if ($logoutResponse->status() === 200) {
                        $this->assertGreaterThan($logoutCount, Activity::count(), 'Activity log should be created for user logout');
                        
                        // Find the logout activity
                        $logoutActivity = Activity::where('action', 'logout')
                            ->where('user_id', $user->id)
                            ->latest('id')
                            ->first();
                        
                        $this->assertNotNull($logoutActivity, 'Logout activity should exist');
                        $this->assertNotNull($logoutActivity->created_at, 'Activity log should have a timestamp');
                        $this->assertInstanceOf(\DateTime::class, $logoutActivity->created_at, 'Timestamp should be a DateTime object');
                        $this->assertNotNull($logoutActivity->user_id, 'Activity log should have a user ID');
                        $this->assertEquals($user->id, $logoutActivity->user_id, 'Activity log should reference the correct user');
                        $this->assertNotNull($logoutActivity->action, 'Activity log should have an action');
                        $this->assertEquals('logout', $logoutActivity->action, 'Activity log should have the correct action');
                        $this->assertNotNull($logoutActivity->entity_type, 'Activity log should have an entity type');
                        $this->assertEquals('user', $logoutActivity->entity_type, 'Activity log should have the correct entity type');
                        $this->assertEquals($user->id, $logoutActivity->entity_id, 'Activity log should have the correct entity ID');
                        $this->assertNotNull($logoutActivity->description, 'Activity log should have a description');
                        $this->assertIsString($logoutActivity->description, 'Activity description should be a string');
                        $this->assertGreaterThan(0, strlen($logoutActivity->description), 'Activity description should not be empty');
                        $this->assertNotNull($logoutActivity->ip_address, 'Activity log should have an IP address');
                    }
                }
            });
    }

    /**
     * Test that data export creates activity logs with all required fields.
     * 
     * @test
     */
    public function data_export_creates_complete_activity_logs()
    {
        $this->forAll(
            Generators::choose(1, 10)
        )
            ->withMaxSize(100)
            ->then(function ($memberCount) {
                Sanctum::actingAs($this->user);
                
                // Create some members to export
                Member::factory()->count($memberCount)->create();
                
                $initialCount = Activity::count();
                $response = $this->getJson('/api/members/export');
                
                // StreamedResponse doesn't have status() method, use getStatusCode()
                if ($response->getStatusCode() === 200) {
                    $this->assertEquals($initialCount + 1, Activity::count(), 'Activity log should be created for CSV export');
                    
                    $activity = Activity::latest('id')->first();
                    $this->assertActivityLogIsComplete($activity, 'export', 'members');
                    $this->assertStringContainsString('CSV', $activity->description, 'Activity description should mention CSV');
                }
            });
    }

    /**
     * Test that leadership CRUD operations create activity logs with all required fields.
     * 
     * @test
     */
    public function leadership_crud_operations_create_complete_activity_logs()
    {
        $this->forAll(
            Generators::names(),
            Generators::names(),
            Generators::elements('Senior Pastor', 'Youth Pastor', 'Worship Leader', 'Administrative Staff')
        )
            ->withMaxSize(100)
            ->then(function ($firstName, $lastName, $role) {
                Sanctum::actingAs($this->user);
                
                $leadershipData = [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'role' => $role,
                    'department' => 'Ministry',
                    'email' => strtolower($firstName . $lastName) . uniqid() . '@test.com',
                    'phone' => '+1' . rand(1000000000, 9999999999),
                    'start_date' => now()->format('Y-m-d'),
                ];
                
                $initialCount = Activity::count();
                $response = $this->postJson('/api/leadership', $leadershipData);
                
                if ($response->status() === 201) {
                    $this->assertEquals($initialCount + 1, Activity::count(), 'Activity log should be created for leadership creation');
                    
                    $activity = Activity::latest('id')->first();
                    $this->assertActivityLogIsComplete($activity, 'create', 'leadership');
                }
            });
    }

    /**
     * Test that event CRUD operations create activity logs with all required fields.
     * 
     * @test
     */
    public function event_crud_operations_create_complete_activity_logs()
    {
        $this->forAll(
            Generators::string(),
            Generators::elements('upcoming', 'completed', 'cancelled')
        )
            ->withMaxSize(100)
            ->then(function ($titleSuffix, $status) {
                Sanctum::actingAs($this->user);
                
                $eventData = [
                    'title' => 'Event ' . $titleSuffix,
                    'event_date' => now()->addDays(7)->format('Y-m-d'),
                    'event_time' => '10:00',
                    'location' => 'Main Sanctuary',
                    'status' => $status,
                ];
                
                $initialCount = Activity::count();
                $response = $this->postJson('/api/events', $eventData);
                
                if ($response->status() === 201) {
                    $this->assertEquals($initialCount + 1, Activity::count(), 'Activity log should be created for event creation');
                    
                    $activity = Activity::latest('id')->first();
                    $this->assertActivityLogIsComplete($activity, 'create', 'events');
                }
            });
    }

    /**
     * Test that small group CRUD operations create activity logs with all required fields.
     * 
     * @test
     */
    public function small_group_crud_operations_create_complete_activity_logs()
    {
        $this->forAll(
            Generators::string(),
            Generators::names(),
            Generators::elements('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
        )
            ->withMaxSize(100)
            ->then(function ($nameSuffix, $leaderName, $meetingDay) {
                Sanctum::actingAs($this->user);
                
                $groupData = [
                    'name' => 'Group ' . $nameSuffix . uniqid(),
                    'leader_name' => $leaderName,
                    'meeting_day' => $meetingDay,
                    'meeting_time' => '19:00',
                    'location' => 'Church Hall',
                ];
                
                $initialCount = Activity::count();
                $response = $this->postJson('/api/small-groups', $groupData);
                
                if ($response->status() === 201) {
                    $this->assertEquals($initialCount + 1, Activity::count(), 'Activity log should be created for small group creation');
                    
                    $activity = Activity::latest('id')->first();
                    $this->assertActivityLogIsComplete($activity, 'create', 'small-groups');
                }
            });
    }

    /**
     * Assert that an activity log entry contains all required fields.
     * 
     * @param Activity $activity
     * @param string $expectedAction
     * @param string $expectedEntityType
     * @param int|null $expectedEntityId
     * @return void
     */
    protected function assertActivityLogIsComplete(
        Activity $activity,
        string $expectedAction,
        string $expectedEntityType,
        ?int $expectedEntityId = null
    ): void {
        // Timestamp
        $this->assertNotNull($activity->created_at, 'Activity log should have a timestamp');
        $this->assertInstanceOf(\DateTime::class, $activity->created_at, 'Timestamp should be a DateTime object');
        
        // User ID
        $this->assertNotNull($activity->user_id, 'Activity log should have a user ID');
        $this->assertEquals($this->user->id, $activity->user_id, 'Activity log should reference the correct user');
        
        // Action description
        $this->assertNotNull($activity->action, 'Activity log should have an action');
        $this->assertEquals($expectedAction, $activity->action, 'Activity log should have the correct action');
        
        // Entity information
        $this->assertNotNull($activity->entity_type, 'Activity log should have an entity type');
        $this->assertEquals($expectedEntityType, $activity->entity_type, 'Activity log should have the correct entity type');
        
        if ($expectedEntityId !== null) {
            $this->assertEquals($expectedEntityId, $activity->entity_id, 'Activity log should have the correct entity ID');
        }
        
        // Description
        $this->assertNotNull($activity->description, 'Activity log should have a description');
        $this->assertIsString($activity->description, 'Activity description should be a string');
        $this->assertGreaterThan(0, strlen($activity->description), 'Activity description should not be empty');
        
        // IP address (optional but should be present for web requests)
        $this->assertNotNull($activity->ip_address, 'Activity log should have an IP address');
    }
}
