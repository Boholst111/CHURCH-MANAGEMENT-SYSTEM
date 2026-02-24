<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Activity;
use App\Models\Member;
use App\Models\Event;
use App\Models\Leadership;
use App\Models\SmallGroup;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Pledge;
use App\Models\Fund;
use App\Models\Vendor;
use App\Models\ExpenseCategory;
use App\Models\OfferingType;
use App\Models\User;
use App\Services\ArchiveService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Archive Activity Logging
 * 
 * Feature: soft-delete-archive-system
 * Property 11: Archive operations create activity logs
 * **Validates: Requirements 7.1, 7.2, 7.3, 7.4**
 * 
 * Property: For any archive, restore, or permanent delete operation on any archivable model, 
 * an activity log entry should be created containing the action type, user ID, model type, 
 * model ID, timestamp, and item details.
 */
class ArchiveActivityLoggingPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $user;
    protected ArchiveService $archiveService;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Disable throttling middleware for property tests
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        
        // Create and authenticate a user
        $this->user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($this->user);
        $this->actingAs($this->user);
        
        // Initialize ArchiveService
        $this->archiveService = new ArchiveService();
        
        // Reset Faker unique generator to avoid overflow
        $this->app->make(\Faker\Generator::class)->unique(true);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }
    
    /**
     * Get the model class name from a type string.
     */
    protected function getModelClass(string $type): string
    {
        $typeMap = [
            'Member' => Member::class,
            'Event' => Event::class,
            'Leadership' => Leadership::class,
            'SmallGroup' => SmallGroup::class,
            'Offering' => Offering::class,
            'Expense' => Expense::class,
            'Budget' => Budget::class,
            'Pledge' => Pledge::class,
            'Fund' => Fund::class,
            'Vendor' => Vendor::class,
            'ExpenseCategory' => ExpenseCategory::class,
            'OfferingType' => OfferingType::class,
        ];
        
        return $typeMap[$type];
    }
    
    /**
     * Get the type string for ArchiveService from model type.
     */
    protected function getServiceType(string $modelType): string
    {
        $typeMap = [
            'Member' => 'members',
            'Event' => 'events',
            'Leadership' => 'leadership',
            'SmallGroup' => 'small_groups',
            'Offering' => 'offerings',
            'Expense' => 'expenses',
            'Budget' => 'budgets',
            'Pledge' => 'pledges',
            'Fund' => 'funds',
            'Vendor' => 'vendors',
            'ExpenseCategory' => 'expense_categories',
            'OfferingType' => 'offering_types',
        ];
        
        return $typeMap[$modelType];
    }
    
    /**
     * Create a model instance based on type.
     */
    protected function createModelInstance(string $type)
    {
        // Reset Faker unique generator before each creation to avoid overflow
        $this->app->make(\Faker\Generator::class)->unique(true);
        
        $modelClass = $this->getModelClass($type);
        
        // Create required dependencies for models that need them
        switch ($type) {
            case 'Offering':
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Tithe'],
                    ['description' => 'Regular tithe offering', 'is_active' => true]
                );
                $fund = Fund::firstOrCreate(
                    ['name' => 'General Fund'],
                    ['type' => 'unrestricted', 'description' => 'General church fund', 'current_balance' => 0, 'is_active' => true]
                );
                return Offering::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'fund_id' => $fund->id,
                    'amount' => 100,
                    'payment_method' => 'cash',
                    'date' => now()->format('Y-m-d'),
                    'is_anonymous' => false,
                ]);
                
            case 'Expense':
                $expenseCategory = ExpenseCategory::firstOrCreate(
                    ['name' => 'Utilities'],
                    ['description' => 'Utility expenses', 'is_active' => true]
                );
                $fund = Fund::firstOrCreate(
                    ['name' => 'General Fund'],
                    ['type' => 'unrestricted', 'description' => 'General church fund', 'current_balance' => 0, 'is_active' => true]
                );
                return Expense::create([
                    'expense_category_id' => $expenseCategory->id,
                    'fund_id' => $fund->id,
                    'amount' => 100,
                    'date' => now()->format('Y-m-d'),
                    'description' => 'Test expense',
                    'approval_status' => 'pending',
                ]);
                
            case 'Fund':
                return Fund::create([
                    'name' => 'Test Fund ' . uniqid(),
                    'type' => 'unrestricted',
                    'description' => 'Test fund for property testing',
                    'current_balance' => 0,
                    'is_active' => true,
                ]);
                
            case 'Budget':
                return Budget::create([
                    'name' => 'Test Budget ' . uniqid(),
                    'period_type' => 'monthly',
                    'start_date' => now()->format('Y-m-d'),
                    'end_date' => now()->addMonth()->format('Y-m-d'),
                    'is_active' => true,
                ]);
                
            case 'Pledge':
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Tithe'],
                    ['description' => 'Regular tithe offering', 'is_active' => true]
                );
                return Pledge::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'pledged_amount' => 1000,
                    'start_date' => now()->format('Y-m-d'),
                    'end_date' => now()->addYear()->format('Y-m-d'),
                    'is_completed' => false,
                ]);
                
            case 'Leadership':
                return Leadership::create([
                    'first_name' => 'John',
                    'last_name' => 'Doe',
                    'role' => 'Pastor',
                    'department' => 'Ministry',
                    'email' => 'john.doe' . uniqid() . '@example.com',
                    'phone' => '123-456-7890',
                    'start_date' => now()->format('Y-m-d'),
                ]);
                
            case 'SmallGroup':
                $leader = Member::factory()->create();
                return SmallGroup::create([
                    'name' => 'Test Group ' . uniqid(),
                    'leader_name' => 'Test Leader',
                    'meeting_day' => 'Wednesday',
                    'meeting_time' => '19:00:00',
                    'location' => 'Church Building',
                ]);
                
            case 'Event':
                return Event::create([
                    'title' => 'Test Event ' . uniqid(),
                    'event_date' => now()->format('Y-m-d'),
                    'event_time' => '10:00:00',
                    'location' => 'Main Sanctuary',
                    'status' => 'upcoming',
                ]);
                
            case 'ExpenseCategory':
                return ExpenseCategory::create([
                    'name' => 'Test Category ' . uniqid(),
                    'description' => 'Test category for property testing',
                    'is_active' => true,
                ]);
                
            case 'OfferingType':
                return OfferingType::create([
                    'name' => 'Test Offering Type ' . uniqid(),
                    'description' => 'Test offering type for property testing',
                    'is_active' => true,
                ]);
                
            case 'Vendor':
                return Vendor::create([
                    'name' => 'Test Vendor ' . uniqid(),
                    'contact_name' => 'Test Contact',
                    'email' => 'vendor' . uniqid() . '@example.com',
                    'phone' => '123-456-7890',
                    'is_active' => true,
                ]);
                
            default:
                // For simple models without dependencies
                return $modelClass::factory()->create();
        }
    }

    /**
     * Test that restore operations create activity logs for all archivable models.
     * 
     * @test
     */
    public function restore_operations_create_activity_logs_for_all_models()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Offering', 'Expense'
            ),
            Generators::choose(1, 2) // Number of instances to restore
        )
            ->withMaxSize(1)
            ->then(function ($modelType, $instanceCount) {
                $serviceType = $this->getServiceType($modelType);
                
                $createdIds = [];
                
                // Create and archive instances
                for ($i = 0; $i < $instanceCount; $i++) {
                    $instance = $this->createModelInstance($modelType);
                    $instance->delete();
                    $createdIds[] = $instance->id;
                }
                
                // Get initial activity count
                $initialActivityCount = Activity::count();
                
                // Restore all instances using ArchiveService
                foreach ($createdIds as $id) {
                    $this->archiveService->restore($serviceType, $id);
                }
                
                // Property: Each restore operation should create an activity log entry
                $finalActivityCount = Activity::count();
                $this->assertEquals(
                    $initialActivityCount + $instanceCount,
                    $finalActivityCount,
                    "Restoring {$instanceCount} {$modelType} instances should create {$instanceCount} activity log entries"
                );
                
                // Verify each restore created a proper activity log
                foreach ($createdIds as $id) {
                    $activity = Activity::where('entity_type', $serviceType)
                        ->where('entity_id', $id)
                        ->where('action', 'restored')
                        ->first();
                    
                    // Property: Activity log should exist
                    $this->assertNotNull(
                        $activity,
                        "Activity log should exist for restored {$modelType} with ID {$id}"
                    );
                    
                    // Property: Activity log should contain user ID
                    $this->assertEquals(
                        $this->user->id,
                        $activity->user_id,
                        "Activity log should contain correct user ID"
                    );
                    
                    // Property: Activity log should contain action type
                    $this->assertEquals(
                        'restored',
                        $activity->action,
                        "Activity log should contain action type 'restored'"
                    );
                    
                    // Property: Activity log should contain model type
                    $this->assertEquals(
                        $serviceType,
                        $activity->entity_type,
                        "Activity log should contain correct entity type"
                    );
                    
                    // Property: Activity log should contain model ID
                    $this->assertEquals(
                        $id,
                        $activity->entity_id,
                        "Activity log should contain correct entity ID"
                    );
                    
                    // Property: Activity log should contain timestamp
                    $this->assertNotNull(
                        $activity->created_at,
                        "Activity log should have a timestamp"
                    );
                    
                    // Property: Activity log should contain description
                    $this->assertNotEmpty(
                        $activity->description,
                        "Activity log should have a description"
                    );
                    
                    $this->assertStringContainsString(
                        'Restored',
                        $activity->description,
                        "Activity log description should mention 'Restored'"
                    );
                }
            });
    }

    /**
     * Test that force delete operations create activity logs for all archivable models.
     * 
     * @test
     */
    public function force_delete_operations_create_activity_logs_for_all_models()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Offering', 'Expense'
            ),
            Generators::choose(1, 2) // Number of instances to force delete
        )
            ->withMaxSize(1)
            ->then(function ($modelType, $instanceCount) {
                $serviceType = $this->getServiceType($modelType);
                
                $createdIds = [];
                
                // Create and archive instances
                for ($i = 0; $i < $instanceCount; $i++) {
                    $instance = $this->createModelInstance($modelType);
                    $instance->delete();
                    $createdIds[] = $instance->id;
                }
                
                // Get initial activity count
                $initialActivityCount = Activity::count();
                
                // Force delete all instances using ArchiveService
                foreach ($createdIds as $id) {
                    $this->archiveService->forceDelete($serviceType, $id);
                }
                
                // Property: Each force delete operation should create an activity log entry
                $finalActivityCount = Activity::count();
                $this->assertEquals(
                    $initialActivityCount + $instanceCount,
                    $finalActivityCount,
                    "Force deleting {$instanceCount} {$modelType} instances should create {$instanceCount} activity log entries"
                );
                
                // Verify each force delete created a proper activity log
                foreach ($createdIds as $id) {
                    $activity = Activity::where('entity_type', $serviceType)
                        ->where('entity_id', $id)
                        ->where('action', 'force_deleted')
                        ->first();
                    
                    // Property: Activity log should exist
                    $this->assertNotNull(
                        $activity,
                        "Activity log should exist for force deleted {$modelType} with ID {$id}"
                    );
                    
                    // Property: Activity log should contain user ID
                    $this->assertEquals(
                        $this->user->id,
                        $activity->user_id,
                        "Activity log should contain correct user ID"
                    );
                    
                    // Property: Activity log should contain action type
                    $this->assertEquals(
                        'force_deleted',
                        $activity->action,
                        "Activity log should contain action type 'force_deleted'"
                    );
                    
                    // Property: Activity log should contain model type
                    $this->assertEquals(
                        $serviceType,
                        $activity->entity_type,
                        "Activity log should contain correct entity type"
                    );
                    
                    // Property: Activity log should contain model ID
                    $this->assertEquals(
                        $id,
                        $activity->entity_id,
                        "Activity log should contain correct entity ID"
                    );
                    
                    // Property: Activity log should contain timestamp
                    $this->assertNotNull(
                        $activity->created_at,
                        "Activity log should have a timestamp"
                    );
                    
                    // Property: Activity log should contain description
                    $this->assertNotEmpty(
                        $activity->description,
                        "Activity log should have a description"
                    );
                    
                    $this->assertStringContainsString(
                        'Permanently deleted',
                        $activity->description,
                        "Activity log description should mention 'Permanently deleted'"
                    );
                }
            });
    }

    /**
     * Test that activity logs contain item details.
     * 
     * @test
     */
    public function activity_logs_contain_item_details()
    {
        $this->forAll(
            Generators::elements('Member', 'Event', 'Fund', 'Vendor')
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $serviceType = $this->getServiceType($modelType);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                $instance->delete();
                
                // Restore the instance
                $this->archiveService->restore($serviceType, $id);
                
                // Get the activity log
                $activity = Activity::where('entity_type', $serviceType)
                    ->where('entity_id', $id)
                    ->where('action', 'restored')
                    ->first();
                
                // Property: Activity log description should contain item details
                $this->assertNotNull(
                    $activity,
                    "Activity log should exist"
                );
                
                $this->assertNotEmpty(
                    $activity->description,
                    "Activity log should have a description with item details"
                );
                
                // Verify description contains meaningful information
                $this->assertGreaterThan(
                    10,
                    strlen($activity->description),
                    "Activity log description should be meaningful (more than 10 characters)"
                );
            });
    }

    /**
     * Test that activity logs are created with correct timestamps.
     * 
     * @test
     */
    public function activity_logs_are_created_with_correct_timestamps()
    {
        $this->forAll(
            Generators::elements('Member', 'Event', 'Offering', 'Expense')
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $serviceType = $this->getServiceType($modelType);
                
                // Record time before operation
                $beforeTime = now();
                
                // Create, archive, and restore an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                $instance->delete();
                
                $this->archiveService->restore($serviceType, $id);
                
                // Record time after operation
                $afterTime = now();
                
                // Get the activity log
                $activity = Activity::where('entity_type', $serviceType)
                    ->where('entity_id', $id)
                    ->where('action', 'restored')
                    ->first();
                
                // Property: Activity log timestamp should be between before and after times
                $this->assertNotNull(
                    $activity->created_at,
                    "Activity log should have a created_at timestamp"
                );
                
                $this->assertGreaterThanOrEqual(
                    $beforeTime->timestamp,
                    $activity->created_at->timestamp,
                    "Activity log timestamp should be after operation start"
                );
                
                $this->assertLessThanOrEqual(
                    $afterTime->timestamp,
                    $activity->created_at->timestamp,
                    "Activity log timestamp should be before operation end"
                );
            });
    }

    /**
     * Test that multiple operations on the same item create multiple activity logs.
     * 
     * @test
     */
    public function multiple_operations_create_multiple_activity_logs()
    {
        $this->forAll(
            Generators::elements('Member', 'Event'),
            Generators::choose(2, 3) // Number of restore/archive cycles
        )
            ->withMaxSize(1)
            ->then(function ($modelType, $cycleCount) {
                $modelClass = $this->getModelClass($modelType);
                $serviceType = $this->getServiceType($modelType);
                
                // Create an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                
                // Archive it initially
                $instance->delete();
                
                // Perform multiple restore/archive cycles
                for ($i = 0; $i < $cycleCount; $i++) {
                    // Restore
                    $this->archiveService->restore($serviceType, $id);
                    
                    // Archive again
                    $modelClass::find($id)->delete();
                }
                
                // Property: Should have cycleCount restore activity logs
                $restoreActivityCount = Activity::where('entity_type', $serviceType)
                    ->where('entity_id', $id)
                    ->where('action', 'restored')
                    ->count();
                
                $this->assertEquals(
                    $cycleCount,
                    $restoreActivityCount,
                    "Should have {$cycleCount} restore activity logs for {$modelType}"
                );
                
                // Verify all activity logs have required fields
                $activities = Activity::where('entity_type', $serviceType)
                    ->where('entity_id', $id)
                    ->where('action', 'restored')
                    ->get();
                
                foreach ($activities as $activity) {
                    $this->assertEquals($this->user->id, $activity->user_id);
                    $this->assertEquals('restored', $activity->action);
                    $this->assertEquals($serviceType, $activity->entity_type);
                    $this->assertEquals($id, $activity->entity_id);
                    $this->assertNotNull($activity->created_at);
                    $this->assertNotEmpty($activity->description);
                }
            });
    }

    /**
     * Test that activity logs persist after the operation completes.
     * 
     * @test
     */
    public function activity_logs_persist_after_operation_completes()
    {
        $this->forAll(
            Generators::elements('Member', 'Event')
        )
            ->withMaxSize(1)
            ->then(function ($modelType) {
                $serviceType = $this->getServiceType($modelType);
                
                // Create, archive, and restore an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                $instance->delete();
                
                $this->archiveService->restore($serviceType, $id);
                
                // Verify activity log exists immediately after operation
                $activityImmediately = Activity::where('entity_type', $serviceType)
                    ->where('entity_id', $id)
                    ->where('action', 'restored')
                    ->first();
                
                $this->assertNotNull(
                    $activityImmediately,
                    "Activity log should exist immediately after restore"
                );
                
                // Simulate some time passing and other operations
                sleep(1);
                
                // Create and restore another instance
                $otherInstance = $this->createModelInstance($modelType);
                $otherInstance->delete();
                $this->archiveService->restore($serviceType, $otherInstance->id);
                
                // Property: Original activity log should still exist
                $activityAfter = Activity::where('entity_type', $serviceType)
                    ->where('entity_id', $id)
                    ->where('action', 'restored')
                    ->first();
                
                $this->assertNotNull(
                    $activityAfter,
                    "Activity log should persist after other operations"
                );
                
                $this->assertEquals(
                    $activityImmediately->id,
                    $activityAfter->id,
                    "Activity log should be the same record"
                );
            });
    }

    /**
     * Test that activity logs include IP address when available.
     * 
     * @test
     */
    public function activity_logs_include_ip_address_when_available()
    {
        $this->forAll(
            Generators::elements('Member', 'Event', 'Offering', 'Expense')
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $serviceType = $this->getServiceType($modelType);
                
                // Create, archive, and restore an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                $instance->delete();
                
                $this->archiveService->restore($serviceType, $id);
                
                // Get the activity log
                $activity = Activity::where('entity_type', $serviceType)
                    ->where('entity_id', $id)
                    ->where('action', 'restored')
                    ->first();
                
                // Property: Activity log should have IP address field (may be null in tests)
                $this->assertNotNull(
                    $activity,
                    "Activity log should exist"
                );
                
                // IP address field should exist in the model
                $this->assertTrue(
                    array_key_exists('ip_address', $activity->toArray()),
                    "Activity log should have ip_address field"
                );
            });
    }
}
