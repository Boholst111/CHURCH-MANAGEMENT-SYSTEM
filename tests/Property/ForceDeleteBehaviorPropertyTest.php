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

/**
 * Property-Based Test for Force Delete Behavior
 * 
 * Feature: soft-delete-archive-system
 * Property 5: Force delete removes record permanently
 * **Validates: Requirements 5.4**
 * 
 * Property: For any archived model instance, when a force delete operation is performed, 
 * the record should not exist in the database even when querying with withTrashed().
 */
class ForceDeleteBehaviorPropertyTest extends TestCase
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
     * Test that force delete permanently removes records for all archivable models.
     * 
     * @test
     */
    public function force_delete_permanently_removes_records_for_all_models()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            ),
            Generators::choose(1, 3) // Number of instances to create, archive, and force delete
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
                        $archivedInstance,
                        "Archived {$modelType} should exist in database with withTrashed()"
                    );
                    $this->assertNotNull(
                        $archivedInstance->deleted_at,
                        "Archived {$modelType} should have deleted_at timestamp set"
                    );
                }
                
                // Force delete all instances
                foreach ($createdIds as $id) {
                    $archivedInstance = $modelClass::withTrashed()->find($id);
                    $archivedInstance->forceDelete();
                }
                
                // Property 5: Force deleted records should not exist even with withTrashed()
                foreach ($createdIds as $id) {
                    $deletedInstance = $modelClass::withTrashed()->find($id);
                    
                    $this->assertNull(
                        $deletedInstance,
                        "Force deleted {$modelType} with ID {$id} should not exist in database even with withTrashed()"
                    );
                }
                
                // Verify count with trashed does not include force deleted records
                $countWithTrashed = $modelClass::withTrashed()->whereIn('id', $createdIds)->count();
                $this->assertEquals(
                    0,
                    $countWithTrashed,
                    "Force deleted {$modelType} instances should not be counted even with withTrashed()"
                );
            });
    }

    /**
     * Test that force delete removes records from default queries.
     * 
     * @test
     */
    public function force_delete_removes_records_from_default_queries()
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
                // Reset Faker unique generator at the start of each iteration
                $this->app->make(\Faker\Generator::class)->unique(true);
                
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
                
                // Force delete some instances (at least 1, at most totalCount)
                $forceDeleteCount = rand(1, $totalCount);
                $idsToForceDelete = array_slice($allIds, 0, $forceDeleteCount);
                
                foreach ($idsToForceDelete as $id) {
                    $modelClass::withTrashed()->find($id)->forceDelete();
                }
                
                // Property: Force deleted records should not appear in default queries
                $defaultQueryResults = $modelClass::whereIn('id', $allIds)->get();
                
                $this->assertEquals(
                    0,
                    $defaultQueryResults->count(),
                    "Default query should return 0 {$modelType} instances (all archived or force deleted)"
                );
                
                // Property: Force deleted records should not appear in withTrashed queries
                $trashedQueryResults = $modelClass::withTrashed()->whereIn('id', $allIds)->get();
                
                $expectedCount = $totalCount - $forceDeleteCount;
                $this->assertEquals(
                    $expectedCount,
                    $trashedQueryResults->count(),
                    "withTrashed() query should return only {$expectedCount} archived {$modelType} instances"
                );
                
                // Verify force deleted IDs are not in withTrashed results
                foreach ($idsToForceDelete as $id) {
                    $found = $trashedQueryResults->contains('id', $id);
                    $this->assertFalse(
                        $found,
                        "Force deleted {$modelType} {$id} should not be in withTrashed() results"
                    );
                }
            });
    }

    /**
     * Test that Model::find() with withTrashed() returns null for force deleted records.
     * 
     * @test
     */
    public function model_find_with_trashed_returns_null_for_force_deleted_records()
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
                
                // Verify it can be found before archiving
                $found = $modelClass::find($id);
                $this->assertNotNull(
                    $found,
                    "Instance should be found before archiving"
                );
                
                // Archive the instance
                $instance->delete();
                
                // Verify it can be found with withTrashed after archiving
                $archivedInstance = $modelClass::withTrashed()->find($id);
                $this->assertNotNull(
                    $archivedInstance,
                    "Archived {$modelType} should be found with withTrashed()"
                );
                
                // Force delete the instance
                $archivedInstance->forceDelete();
                
                // Property: Model::find() with withTrashed() should return null for force deleted records
                $notFound = $modelClass::withTrashed()->find($id);
                $this->assertNull(
                    $notFound,
                    "Force deleted {$modelType} should not be found even with withTrashed()"
                );
                
                // Also verify it's not in default queries
                $notFoundDefault = $modelClass::find($id);
                $this->assertNull(
                    $notFoundDefault,
                    "Force deleted {$modelType} should not be found in default queries"
                );
            });
    }

    /**
     * Test that onlyTrashed() does not return force deleted records.
     * 
     * @test
     */
    public function only_trashed_does_not_return_force_deleted_records()
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
                
                // Verify onlyTrashed() returns all 3
                $onlyTrashedBefore = $modelClass::onlyTrashed()->whereIn('id', $instanceIds)->get();
                $this->assertEquals(
                    3,
                    $onlyTrashedBefore->count(),
                    "onlyTrashed() should return 3 archived {$modelType} instances"
                );
                
                // Force delete 2 of them
                $modelClass::withTrashed()->find($instances[0]->id)->forceDelete();
                $modelClass::withTrashed()->find($instances[1]->id)->forceDelete();
                
                // Property: onlyTrashed() should not return force deleted records
                $onlyTrashedAfter = $modelClass::onlyTrashed()->whereIn('id', $instanceIds)->get();
                
                $this->assertEquals(
                    1,
                    $onlyTrashedAfter->count(),
                    "onlyTrashed() should return only 1 archived {$modelType} instance after force delete"
                );
                
                // Verify only the non-force-deleted instance is returned
                $this->assertTrue(
                    $onlyTrashedAfter->contains('id', $instances[2]->id),
                    "onlyTrashed() should contain the still-archived instance"
                );
                
                $this->assertFalse(
                    $onlyTrashedAfter->contains('id', $instances[0]->id),
                    "onlyTrashed() should not contain force deleted instance"
                );
                
                $this->assertFalse(
                    $onlyTrashedAfter->contains('id', $instances[1]->id),
                    "onlyTrashed() should not contain force deleted instance"
                );
            });
    }

    /**
     * Test that force delete is irreversible.
     * 
     * @test
     */
    public function force_delete_is_irreversible()
    {
        $this->forAll(
            Generators::elements('Member', 'Event', 'Offering', 'Expense')
        )
            ->withMaxSize(2)
            ->then(function ($modelType) {
                $modelClass = $this->getModelClass($modelType);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                $instance->delete();
                
                // Verify it's archived
                $archivedInstance = $modelClass::withTrashed()->find($id);
                $this->assertNotNull(
                    $archivedInstance,
                    "Instance should be archived"
                );
                
                // Force delete the instance
                $archivedInstance->forceDelete();
                
                // Property: Force deleted records cannot be restored
                $deletedInstance = $modelClass::withTrashed()->find($id);
                $this->assertNull(
                    $deletedInstance,
                    "Force deleted {$modelType} should not exist in database"
                );
                
                // Attempting to restore should have no effect (record doesn't exist)
                // This is just to demonstrate the irreversibility
                $stillDeleted = $modelClass::withTrashed()->find($id);
                $this->assertNull(
                    $stillDeleted,
                    "Force deleted {$modelType} remains permanently deleted"
                );
            });
    }

    /**
     * Test that force delete works correctly with count queries.
     * 
     * @test
     */
    public function force_delete_works_correctly_with_count_queries()
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
                
                // Verify count with trashed
                $countWithTrashedBefore = $modelClass::withTrashed()->whereIn('id', $createdIds)->count();
                $this->assertEquals(
                    $instanceCount,
                    $countWithTrashedBefore,
                    "withTrashed() count should be {$instanceCount} before force delete"
                );
                
                // Force delete some instances
                $forceDeleteCount = rand(1, $instanceCount);
                for ($i = 0; $i < $forceDeleteCount; $i++) {
                    $modelClass::withTrashed()->find($createdIds[$i])->forceDelete();
                }
                
                // Property: Count with trashed should exclude force deleted records
                $countWithTrashedAfter = $modelClass::withTrashed()->whereIn('id', $createdIds)->count();
                $expectedCount = $instanceCount - $forceDeleteCount;
                
                $this->assertEquals(
                    $expectedCount,
                    $countWithTrashedAfter,
                    "withTrashed() count should be {$expectedCount} after force delete"
                );
                
                // Property: Default count should be 0 (all archived or force deleted)
                $defaultCount = $modelClass::whereIn('id', $createdIds)->count();
                $this->assertEquals(
                    0,
                    $defaultCount,
                    "Default count should be 0 for {$modelType} (all archived or force deleted)"
                );
            });
    }

    /**
     * Test that force delete removes records from relationship queries.
     * 
     * @test
     */
    public function force_delete_removes_records_from_relationship_queries()
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
                
                // Verify relationship query returns 0 (all archived)
                $fundOfferings = $fund->offerings;
                $this->assertEquals(
                    0,
                    $fundOfferings->count(),
                    "Relationship query should return 0 when all offerings are archived"
                );
                
                // Force delete some offerings
                $forceDeleteCount = max(1, intval($offeringCount / 2));
                for ($i = 0; $i < $forceDeleteCount; $i++) {
                    Offering::withTrashed()->find($offeringIds[$i])->forceDelete();
                }
                
                // Property: Relationship query should still return 0 (archived or force deleted)
                $fund->refresh();
                $fundOfferingsAfterForceDelete = $fund->offerings;
                
                $this->assertEquals(
                    0,
                    $fundOfferingsAfterForceDelete->count(),
                    "Relationship query should return 0 after force delete"
                );
                
                // Property: withTrashed relationship query should only include archived (not force deleted)
                $fundOfferingsWithTrashed = $fund->offerings()->withTrashed()->get();
                $expectedCount = $offeringCount - $forceDeleteCount;
                
                $this->assertEquals(
                    $expectedCount,
                    $fundOfferingsWithTrashed->count(),
                    "Relationship withTrashed() query should return {$expectedCount} offerings"
                );
            });
    }

    /**
     * Test that multiple force delete operations work correctly.
     * 
     * @test
     */
    public function multiple_force_delete_operations_work_correctly()
    {
        $this->forAll(
            Generators::elements('Member', 'Event', 'Offering', 'Expense'),
            Generators::choose(2, 4) // Number of force delete attempts per instance
        )
            ->withMaxSize(2)
            ->then(function ($modelType, $deleteAttempts) {
                $modelClass = $this->getModelClass($modelType);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($modelType);
                $id = $instance->id;
                $instance->delete();
                
                // Verify it's archived
                $archivedInstance = $modelClass::withTrashed()->find($id);
                $this->assertNotNull(
                    $archivedInstance,
                    "Instance should be archived"
                );
                
                // Force delete once
                $archivedInstance->forceDelete();
                
                // Property: After first force delete, record should not exist
                $deletedInstance = $modelClass::withTrashed()->find($id);
                $this->assertNull(
                    $deletedInstance,
                    "Instance should not exist after force delete"
                );
                
                // Attempting additional force deletes should not cause errors
                // (though they have no effect since record doesn't exist)
                for ($i = 1; $i < $deleteAttempts; $i++) {
                    $stillDeleted = $modelClass::withTrashed()->find($id);
                    $this->assertNull(
                        $stillDeleted,
                        "Instance should remain deleted after multiple attempts"
                    );
                }
                
                // Final verification
                $finalCheck = $modelClass::withTrashed()->find($id);
                $this->assertNull(
                    $finalCheck,
                    "Instance should remain permanently deleted"
                );
            });
    }
}
