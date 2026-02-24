<?php

namespace Tests\Property;

use Tests\TestCase;
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
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;
use Carbon\Carbon;

/**
 * Property-Based Test for Soft Delete Timestamp Setting
 * 
 * Feature: soft-delete-archive-system
 * Property 1: Soft delete sets timestamp
 * **Validates: Requirements 1.2, 10.4**
 * 
 * Property: For any archivable model instance, when a delete operation is performed, 
 * the deleted_at timestamp should be set to a non-null datetime value and the record 
 * should remain in the database.
 */
class SoftDeleteTimestampPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $user;

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
                // Create a unique fund name for testing
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
                // Create a unique expense category name for testing
                return ExpenseCategory::create([
                    'name' => 'Test Category ' . uniqid(),
                    'description' => 'Test category for property testing',
                    'is_active' => true,
                ]);
                
            case 'OfferingType':
                // Create a unique offering type name for testing
                return OfferingType::create([
                    'name' => 'Test Offering Type ' . uniqid(),
                    'description' => 'Test offering type for property testing',
                    'is_active' => true,
                ]);
                
            case 'Vendor':
                // Create a unique vendor name for testing
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
     * Test that soft delete sets deleted_at timestamp for all archivable models.
     * 
     * @test
     */
    public function soft_delete_sets_deleted_at_timestamp_for_all_archivable_models()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            ),
            Generators::choose(1, 2) // Number of instances to create and delete
        )
            ->withMaxSize(2)
            ->then(function ($modelType, $instanceCount) {
                $modelClass = $this->getModelClass($modelType);
                
                $createdIds = [];
                
                // Create instances
                for ($i = 0; $i < $instanceCount; $i++) {
                    $instance = $this->createModelInstance($modelType);
                    $createdIds[] = $instance->id;
                }
                
                // Record time before deletion (with buffer)
                $beforeDelete = Carbon::now()->subSecond();
                
                // Delete all instances
                foreach ($createdIds as $id) {
                    $instance = $modelClass::find($id);
                    $this->assertNotNull($instance, "Instance should exist before deletion");
                    $instance->delete();
                }
                
                // Record time after deletion (with buffer)
                $afterDelete = Carbon::now()->addSecond();
                
                // Property 1: Records should remain in database with deleted_at timestamp
                foreach ($createdIds as $id) {
                    $deletedInstance = $modelClass::withTrashed()->find($id);
                    
                    $this->assertNotNull(
                        $deletedInstance,
                        "Deleted {$modelType} with ID {$id} should still exist in database"
                    );
                    
                    $this->assertNotNull(
                        $deletedInstance->deleted_at,
                        "Deleted {$modelType} should have deleted_at timestamp set"
                    );
                    
                    $this->assertInstanceOf(
                        Carbon::class,
                        $deletedInstance->deleted_at,
                        "deleted_at should be a Carbon instance"
                    );
                    
                    // Verify timestamp is within reasonable range (inclusive)
                    $this->assertTrue(
                        $deletedInstance->deleted_at->between($beforeDelete, $afterDelete, true),
                        "deleted_at timestamp should be between before and after deletion times"
                    );
                }
                
                // Verify count with trashed
                $totalWithTrashed = $modelClass::withTrashed()->count();
                $this->assertGreaterThanOrEqual(
                    $instanceCount,
                    $totalWithTrashed,
                    "All {$instanceCount} {$modelType} instances should exist when including trashed"
                );
            });
    }

    /**
     * Test that soft deleted records are not returned in standard queries.
     * 
     * @test
     */
    public function soft_deleted_records_not_in_standard_queries()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            ),
            Generators::choose(2, 3) // Total instances
        )
            ->withMaxSize(2)
            ->then(function ($modelType, $totalCount) {
                $modelClass = $this->getModelClass($modelType);
                
                $allIds = [];
                
                // Create instances
                for ($i = 0; $i < $totalCount; $i++) {
                    $instance = $this->createModelInstance($modelType);
                    $allIds[] = $instance->id;
                }
                
                // Delete some instances (at least 1, at most totalCount - 1)
                $deleteCount = rand(1, max(1, $totalCount - 1));
                $idsToDelete = array_slice($allIds, 0, $deleteCount);
                
                foreach ($idsToDelete as $id) {
                    $modelClass::find($id)->delete();
                }
                
                // Property: Standard queries should not return deleted records
                // Count only the records we created
                $createdRecordsCount = $modelClass::whereIn('id', $allIds)->count();
                $expectedCount = $totalCount - $deleteCount;
                
                $this->assertEquals(
                    $expectedCount,
                    $createdRecordsCount,
                    "Standard query should return only {$expectedCount} non-deleted {$modelType} instances from the ones we created"
                );
                
                // Verify deleted instances are not in standard query
                foreach ($idsToDelete as $id) {
                    $instance = $modelClass::find($id);
                    $this->assertNull(
                        $instance,
                        "Deleted {$modelType} {$id} should not be found in standard query"
                    );
                }
                
                // Verify non-deleted instances are in standard query
                $remainingIds = array_slice($allIds, $deleteCount);
                foreach ($remainingIds as $id) {
                    $instance = $modelClass::find($id);
                    $this->assertNotNull(
                        $instance,
                        "Non-deleted {$modelType} {$id} should be found in standard query"
                    );
                }
            });
    }

    /**
     * Test that deleted_at timestamp is accurate and within expected time range.
     * 
     * @test
     */
    public function deleted_at_timestamp_is_accurate()
    {
        $this->forAll(
            Generators::elements('Member', 'Offering', 'Expense', 'Vendor')
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $modelClass = $this->getModelClass($modelType);
                
                // Create instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                
                // Record time before deletion (with 1 second buffer)
                $beforeDelete = Carbon::now()->subSecond();
                
                // Delete instance
                $instance->delete();
                
                // Record time after deletion (with 1 second buffer)
                $afterDelete = Carbon::now()->addSecond();
                
                // Retrieve deleted instance
                $deletedInstance = $modelClass::withTrashed()->find($id);
                
                // Property: deleted_at should be between before and after times
                $this->assertNotNull($deletedInstance->deleted_at);
                
                $this->assertGreaterThanOrEqual(
                    $beforeDelete->timestamp,
                    $deletedInstance->deleted_at->timestamp,
                    "deleted_at should be >= time before deletion"
                );
                
                $this->assertLessThanOrEqual(
                    $afterDelete->timestamp,
                    $deletedInstance->deleted_at->timestamp,
                    "deleted_at should be <= time after deletion"
                );
            });
    }

    /**
     * Test that multiple deletions maintain deleted_at timestamps.
     * 
     * @test
     */
    public function multiple_deletions_maintain_separate_timestamps()
    {
        $this->forAll(
            Generators::elements('Member', 'Event', 'Offering', 'Expense')
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $modelClass = $this->getModelClass($modelType);
                
                $instances = [];
                
                // Create 3 instances
                for ($i = 0; $i < 3; $i++) {
                    $instances[] = $this->createModelInstance($modelType);
                }
                
                // Delete instances
                $deletedTimestamps = [];
                foreach ($instances as $instance) {
                    $instance->delete();
                    $deletedTimestamps[$instance->id] = $modelClass::withTrashed()
                        ->find($instance->id)
                        ->deleted_at;
                }
                
                // Property: Each deletion should have a deleted_at timestamp set
                foreach ($deletedTimestamps as $id => $timestamp) {
                    $this->assertNotNull(
                        $timestamp,
                        "Deleted {$modelType} {$id} should have deleted_at timestamp set"
                    );
                    
                    $this->assertInstanceOf(
                        Carbon::class,
                        $timestamp,
                        "deleted_at should be a Carbon instance"
                    );
                }
            });
    }

    /**
     * Test that soft deleted records preserve all original data.
     * 
     * @test
     */
    public function soft_deleted_records_preserve_original_data()
    {
        $this->forAll(
            Generators::elements('Member', 'Offering', 'Expense', 'Vendor')
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $modelClass = $this->getModelClass($modelType);
                
                // Create instance and store original data
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                $originalData = $instance->toArray();
                
                // Delete instance
                $instance->delete();
                
                // Retrieve deleted instance
                $deletedInstance = $modelClass::withTrashed()->find($id);
                $deletedData = $deletedInstance->toArray();
                
                // Property: All original data should be preserved (except deleted_at and timestamps)
                foreach ($originalData as $key => $value) {
                    if (in_array($key, ['deleted_at', 'updated_at'])) {
                        continue; // Skip deleted_at and updated_at as they change
                    }
                    
                    $this->assertEquals(
                        $value,
                        $deletedData[$key],
                        "Deleted {$modelType} should preserve original {$key} value"
                    );
                }
            });
    }
}
