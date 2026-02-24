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
 * Property-Based Test for Restore Behavior
 * 
 * Feature: soft-delete-archive-system
 * Property 4: Restore clears deleted_at timestamp
 * **Validates: Requirements 4.2, 4.3**
 * 
 * Property: For any archived model instance, when a restore operation is performed, 
 * the deleted_at timestamp should be set to null and the record should appear in 
 * default queries.
 */
class RestoreBehaviorPropertyTest extends TestCase
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
     * Test that restore clears deleted_at timestamp for all archivable models.
     * 
     * @test
     */
    public function restore_clears_deleted_at_timestamp_for_all_archivable_models()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            ),
            Generators::choose(1, 3) // Number of instances to create, archive, and restore
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
                
                // Archive all instances
                foreach ($createdIds as $id) {
                    $instance = $modelClass::find($id);
                    $this->assertNotNull($instance, "Instance should exist before archiving");
                    $instance->delete();
                }
                
                // Verify all instances are archived
                foreach ($createdIds as $id) {
                    $archivedInstance = $modelClass::withTrashed()->find($id);
                    $this->assertNotNull(
                        $archivedInstance->deleted_at,
                        "Archived {$modelType} should have deleted_at timestamp set"
                    );
                }
                
                // Restore all instances
                foreach ($createdIds as $id) {
                    $archivedInstance = $modelClass::withTrashed()->find($id);
                    $archivedInstance->restore();
                }
                
                // Property 4: Restored records should have null deleted_at timestamp
                foreach ($createdIds as $id) {
                    $restoredInstance = $modelClass::find($id);
                    
                    $this->assertNotNull(
                        $restoredInstance,
                        "Restored {$modelType} with ID {$id} should be findable in default queries"
                    );
                    
                    $this->assertNull(
                        $restoredInstance->deleted_at,
                        "Restored {$modelType} should have null deleted_at timestamp"
                    );
                }
                
                // Verify count in default queries matches instance count
                $defaultQueryCount = $modelClass::whereIn('id', $createdIds)->count();
                $this->assertEquals(
                    $instanceCount,
                    $defaultQueryCount,
                    "All {$instanceCount} restored {$modelType} instances should appear in default queries"
                );
            });
    }

    /**
     * Test that restored records appear in default queries.
     * 
     * @test
     */
    public function restored_records_appear_in_default_queries()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            ),
            Generators::choose(2, 4) // Total instances
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
                
                // Archive all instances
                foreach ($allIds as $id) {
                    $modelClass::find($id)->delete();
                }
                
                // Verify all are archived (not in default queries)
                $archivedQueryCount = $modelClass::whereIn('id', $allIds)->count();
                $this->assertEquals(
                    0,
                    $archivedQueryCount,
                    "All {$modelType} instances should be excluded from default queries when archived"
                );
                
                // Restore some instances (at least 1, at most totalCount)
                $restoreCount = rand(1, $totalCount);
                $idsToRestore = array_slice($allIds, 0, $restoreCount);
                
                foreach ($idsToRestore as $id) {
                    $modelClass::withTrashed()->find($id)->restore();
                }
                
                // Property: Restored records should appear in default queries
                $restoredQueryResults = $modelClass::whereIn('id', $allIds)->get();
                
                $this->assertEquals(
                    $restoreCount,
                    $restoredQueryResults->count(),
                    "Default query should return {$restoreCount} restored {$modelType} instances"
                );
                
                // Verify restored instances are in results
                foreach ($idsToRestore as $id) {
                    $found = $restoredQueryResults->contains('id', $id);
                    $this->assertTrue(
                        $found,
                        "Restored {$modelType} {$id} should be in default query results"
                    );
                    
                    // Verify deleted_at is null
                    $instance = $modelClass::find($id);
                    $this->assertNull(
                        $instance->deleted_at,
                        "Restored {$modelType} {$id} should have null deleted_at"
                    );
                }
                
                // Verify non-restored instances are not in results
                $remainingIds = array_slice($allIds, $restoreCount);
                foreach ($remainingIds as $id) {
                    $found = $restoredQueryResults->contains('id', $id);
                    $this->assertFalse(
                        $found,
                        "Non-restored {$modelType} {$id} should not be in default query results"
                    );
                }
            });
    }

    /**
     * Test that Model::find() returns restored records.
     * 
     * @test
     */
    public function model_find_returns_restored_records()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            )
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $modelClass = $this->getModelClass($modelType);
                
                // Create an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                
                // Archive the instance
                $instance->delete();
                
                // Verify it cannot be found after archiving
                $notFound = $modelClass::find($id);
                $this->assertNull(
                    $notFound,
                    "Archived {$modelType} should not be found in default queries"
                );
                
                // Restore the instance
                $archivedInstance = $modelClass::withTrashed()->find($id);
                $archivedInstance->restore();
                
                // Property: Model::find() should return restored records
                $restoredInstance = $modelClass::find($id);
                
                $this->assertNotNull(
                    $restoredInstance,
                    "Restored {$modelType} should be found by Model::find()"
                );
                
                $this->assertNull(
                    $restoredInstance->deleted_at,
                    "Restored {$modelType} should have null deleted_at"
                );
                
                $this->assertEquals(
                    $id,
                    $restoredInstance->id,
                    "Restored {$modelType} should have the correct ID"
                );
            });
    }

    /**
     * Test that Model::all() includes restored records.
     * 
     * @test
     */
    public function model_all_includes_restored_records()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            )
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $modelClass = $this->getModelClass($modelType);
                
                // Create 3 instances
                $instances = [];
                for ($i = 0; $i < 3; $i++) {
                    $instances[] = $this->createModelInstance($modelType);
                }
                
                $instanceIds = array_map(fn($inst) => $inst->id, $instances);
                
                // Archive all of them
                foreach ($instances as $instance) {
                    $instance->delete();
                }
                
                // Verify Model::all() doesn't include our archived instances
                $allBeforeRestore = $modelClass::whereIn('id', $instanceIds)->get();
                $this->assertEquals(
                    0,
                    $allBeforeRestore->count(),
                    "Default query should return 0 when all {$modelType} are archived"
                );
                
                // Restore 2 of them
                $modelClass::withTrashed()->find($instances[0]->id)->restore();
                $modelClass::withTrashed()->find($instances[1]->id)->restore();
                
                // Property: Model::all() should include restored records
                $allAfterRestore = $modelClass::whereIn('id', $instanceIds)->get();
                
                $this->assertEquals(
                    2,
                    $allAfterRestore->count(),
                    "Default query should return 2 restored {$modelType} instances"
                );
                
                // Verify restored instances are in results
                $this->assertTrue(
                    $allAfterRestore->contains('id', $instances[0]->id),
                    "Default query should contain first restored instance"
                );
                
                $this->assertTrue(
                    $allAfterRestore->contains('id', $instances[1]->id),
                    "Default query should contain second restored instance"
                );
                
                $this->assertFalse(
                    $allAfterRestore->contains('id', $instances[2]->id),
                    "Default query should not contain still-archived instance"
                );
                
                // Verify all returned records have null deleted_at
                foreach ($allAfterRestore as $record) {
                    $this->assertNull(
                        $record->deleted_at,
                        "Restored record should have null deleted_at"
                    );
                }
            });
    }

    /**
     * Test that restore preserves all original data.
     * 
     * @test
     */
    public function restore_preserves_all_original_data()
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
                
                // Archive instance
                $instance->delete();
                
                // Restore instance
                $archivedInstance = $modelClass::withTrashed()->find($id);
                $archivedInstance->restore();
                
                // Retrieve restored instance
                $restoredInstance = $modelClass::find($id);
                $restoredData = $restoredInstance->toArray();
                
                // Property: All original data should be preserved (except deleted_at and updated_at)
                foreach ($originalData as $key => $value) {
                    if (in_array($key, ['deleted_at', 'updated_at'])) {
                        continue; // Skip deleted_at and updated_at as they change
                    }
                    
                    $this->assertEquals(
                        $value,
                        $restoredData[$key],
                        "Restored {$modelType} should preserve original {$key} value"
                    );
                }
                
                // Property: deleted_at should be null after restore
                $this->assertNull(
                    $restoredData['deleted_at'],
                    "Restored {$modelType} should have null deleted_at"
                );
            });
    }

    /**
     * Test that multiple restore operations are idempotent.
     * 
     * @test
     */
    public function multiple_restore_operations_are_idempotent()
    {
        $this->forAll(
            Generators::elements('Member', 'Event', 'Offering', 'Expense'),
            Generators::choose(2, 4) // Number of restore attempts
        )
            ->withMaxSize(2)
            ->then(function ($modelType, $restoreAttempts) {
                $modelClass = $this->getModelClass($modelType);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                $instance->delete();
                
                // Verify it's archived
                $archivedInstance = $modelClass::withTrashed()->find($id);
                $this->assertNotNull(
                    $archivedInstance->deleted_at,
                    "Instance should be archived"
                );
                
                // Restore multiple times
                for ($i = 0; $i < $restoreAttempts; $i++) {
                    $instanceToRestore = $modelClass::withTrashed()->find($id);
                    $instanceToRestore->restore();
                }
                
                // Property: After multiple restores, deleted_at should still be null
                $finalInstance = $modelClass::find($id);
                
                $this->assertNotNull(
                    $finalInstance,
                    "Instance should be findable after multiple restores"
                );
                
                $this->assertNull(
                    $finalInstance->deleted_at,
                    "Instance should have null deleted_at after multiple restores"
                );
                
                // Verify it appears in default queries
                $found = $modelClass::where('id', $id)->first();
                $this->assertNotNull(
                    $found,
                    "Instance should appear in default queries after multiple restores"
                );
            });
    }

    /**
     * Test that restore works correctly with relationship queries.
     * 
     * @test
     */
    public function restore_works_correctly_with_relationship_queries()
    {
        $this->forAll(
            Generators::choose(2, 4) // Number of offerings
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Create a fund with offerings
                $fund = Fund::create([
                    'name' => 'Test Fund ' . uniqid(),
                    'type' => 'unrestricted',
                    'description' => 'Test fund',
                    'current_balance' => 0,
                    'is_active' => true,
                ]);
                
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Tithe'],
                    ['description' => 'Regular tithe offering', 'is_active' => true]
                );
                
                $offeringIds = [];
                
                // Create offerings for the fund
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => 100,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    $offeringIds[] = $offering->id;
                }
                
                // Archive all offerings
                foreach ($offeringIds as $id) {
                    Offering::find($id)->delete();
                }
                
                // Verify relationship query returns 0
                $fundOfferings = $fund->offerings;
                $this->assertEquals(
                    0,
                    $fundOfferings->count(),
                    "Relationship query should return 0 when all offerings are archived"
                );
                
                // Restore some offerings
                $restoreCount = max(1, intval($offeringCount / 2));
                for ($i = 0; $i < $restoreCount; $i++) {
                    Offering::withTrashed()->find($offeringIds[$i])->restore();
                }
                
                // Property: Relationship query should include restored offerings
                $fund->refresh();
                $fundOfferingsAfterRestore = $fund->offerings;
                
                $this->assertEquals(
                    $restoreCount,
                    $fundOfferingsAfterRestore->count(),
                    "Relationship query should return {$restoreCount} restored offerings"
                );
                
                // Verify all returned offerings have null deleted_at
                foreach ($fundOfferingsAfterRestore as $offering) {
                    $this->assertNull(
                        $offering->deleted_at,
                        "Restored offering should have null deleted_at"
                    );
                }
            });
    }

    /**
     * Test that restore works correctly with count queries.
     * 
     * @test
     */
    public function restore_works_correctly_with_count_queries()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            ),
            Generators::choose(3, 5) // Number of instances
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
                
                // Archive all instances
                foreach ($createdIds as $id) {
                    $modelClass::find($id)->delete();
                }
                
                // Verify count is 0 for our created instances
                $countBeforeRestore = $modelClass::whereIn('id', $createdIds)->count();
                $this->assertEquals(
                    0,
                    $countBeforeRestore,
                    "count() should return 0 when all {$modelType} are archived"
                );
                
                // Restore some instances
                $restoreCount = rand(1, $instanceCount);
                for ($i = 0; $i < $restoreCount; $i++) {
                    $modelClass::withTrashed()->find($createdIds[$i])->restore();
                }
                
                // Property: count() should include restored records
                $countAfterRestore = $modelClass::whereIn('id', $createdIds)->count();
                
                $this->assertEquals(
                    $restoreCount,
                    $countAfterRestore,
                    "count() should return {$restoreCount} after restoring {$modelType} instances"
                );
            });
    }
}
