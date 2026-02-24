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
 * Property-Based Test for Default Query Exclusion
 * 
 * Feature: soft-delete-archive-system
 * Property 2: Default queries exclude archived items
 * **Validates: Requirements 1.3, 10.1**
 * 
 * Property: For any archivable model type, when querying without explicit inclusion 
 * of trashed items, the results should only contain records with null deleted_at timestamps.
 */
class DefaultQueryExclusionPropertyTest extends TestCase
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
     * Test that default queries exclude archived items for all archivable models.
     * 
     * @test
     */
    public function default_queries_exclude_archived_items_for_all_models()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Leadership', 'SmallGroup',
                'Offering', 'Expense', 'Budget', 'Pledge',
                'Fund', 'Vendor', 'ExpenseCategory', 'OfferingType'
            ),
            Generators::choose(2, 4) // Total instances to create
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
                
                // Archive some instances (at least 1, at most totalCount - 1)
                $archiveCount = rand(1, max(1, $totalCount - 1));
                $idsToArchive = array_slice($allIds, 0, $archiveCount);
                
                foreach ($idsToArchive as $id) {
                    $modelClass::find($id)->delete();
                }
                
                // Property: Default queries should only return non-archived records
                $defaultQueryResults = $modelClass::whereIn('id', $allIds)->get();
                
                // Verify count matches expected
                $expectedCount = $totalCount - $archiveCount;
                $this->assertEquals(
                    $expectedCount,
                    $defaultQueryResults->count(),
                    "Default query should return only {$expectedCount} non-archived {$modelType} instances"
                );
                
                // Property: All returned records should have null deleted_at
                foreach ($defaultQueryResults as $record) {
                    $this->assertNull(
                        $record->deleted_at,
                        "Default query result should have null deleted_at timestamp"
                    );
                }
                
                // Property: Archived records should not be in default query results
                foreach ($idsToArchive as $id) {
                    $found = $defaultQueryResults->contains('id', $id);
                    $this->assertFalse(
                        $found,
                        "Archived {$modelType} {$id} should not be in default query results"
                    );
                }
                
                // Property: Non-archived records should be in default query results
                $remainingIds = array_slice($allIds, $archiveCount);
                foreach ($remainingIds as $id) {
                    $found = $defaultQueryResults->contains('id', $id);
                    $this->assertTrue(
                        $found,
                        "Non-archived {$modelType} {$id} should be in default query results"
                    );
                }
            });
    }

    /**
     * Test that Model::all() excludes archived items.
     * 
     * @test
     */
    public function model_all_method_excludes_archived_items()
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
                
                // Clean up any existing records for this model type
                $modelClass::withTrashed()->forceDelete();
                
                // Create 3 instances
                $instances = [];
                for ($i = 0; $i < 3; $i++) {
                    $instances[] = $this->createModelInstance($modelType);
                }
                
                // Archive 2 of them
                $instances[0]->delete();
                $instances[1]->delete();
                
                // Property: Model::all() should only return non-archived records
                $allRecords = $modelClass::all();
                
                $this->assertEquals(
                    1,
                    $allRecords->count(),
                    "Model::all() should return only 1 non-archived {$modelType}"
                );
                
                // Property: All returned records should have null deleted_at
                foreach ($allRecords as $record) {
                    $this->assertNull(
                        $record->deleted_at,
                        "Record from Model::all() should have null deleted_at"
                    );
                }
                
                // Property: Only the non-archived instance should be returned
                $this->assertTrue(
                    $allRecords->contains('id', $instances[2]->id),
                    "Model::all() should contain the non-archived instance"
                );
                
                $this->assertFalse(
                    $allRecords->contains('id', $instances[0]->id),
                    "Model::all() should not contain archived instance"
                );
                
                $this->assertFalse(
                    $allRecords->contains('id', $instances[1]->id),
                    "Model::all() should not contain archived instance"
                );
            });
    }

    /**
     * Test that Model::find() returns null for archived items.
     * 
     * @test
     */
    public function model_find_returns_null_for_archived_items()
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
                
                // Property: Model::find() should return null for archived items
                $notFound = $modelClass::find($id);
                $this->assertNull(
                    $notFound,
                    "Model::find() should return null for archived {$modelType}"
                );
            });
    }

    /**
     * Test that Model::where() queries exclude archived items.
     * 
     * @test
     */
    public function model_where_queries_exclude_archived_items()
    {
        $this->forAll(
            Generators::elements(
                'Member', 'Event', 'Fund', 'Vendor'
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
                
                // Archive half of them (at least 1)
                $archiveCount = max(1, intval($instanceCount / 2));
                for ($i = 0; $i < $archiveCount; $i++) {
                    $modelClass::find($createdIds[$i])->delete();
                }
                
                // Property: where() queries should only return non-archived records
                $whereResults = $modelClass::whereIn('id', $createdIds)->get();
                
                $expectedCount = $instanceCount - $archiveCount;
                $this->assertEquals(
                    $expectedCount,
                    $whereResults->count(),
                    "where() query should return only {$expectedCount} non-archived {$modelType} instances"
                );
                
                // Property: All returned records should have null deleted_at
                foreach ($whereResults as $record) {
                    $this->assertNull(
                        $record->deleted_at,
                        "where() query result should have null deleted_at"
                    );
                }
            });
    }

    /**
     * Test that Model::count() excludes archived items.
     * 
     * @test
     */
    public function model_count_excludes_archived_items()
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
                
                // Clean up existing records
                $modelClass::withTrashed()->forceDelete();
                
                $createdIds = [];
                
                // Create instances
                for ($i = 0; $i < $instanceCount; $i++) {
                    $instance = $this->createModelInstance($modelType);
                    $createdIds[] = $instance->id;
                }
                
                // Archive some of them
                $archiveCount = rand(1, $instanceCount - 1);
                for ($i = 0; $i < $archiveCount; $i++) {
                    $modelClass::find($createdIds[$i])->delete();
                }
                
                // Property: count() should only count non-archived records
                $count = $modelClass::count();
                $expectedCount = $instanceCount - $archiveCount;
                
                $this->assertEquals(
                    $expectedCount,
                    $count,
                    "count() should return {$expectedCount} for {$modelType} (excluding archived)"
                );
            });
    }

    /**
     * Test that Model::first() returns only non-archived items.
     * 
     * @test
     */
    public function model_first_returns_only_non_archived_items()
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
                
                // Clean up existing records
                $modelClass::withTrashed()->forceDelete();
                
                // Create 2 instances
                $instance1 = $this->createModelInstance($modelType);
                $instance2 = $this->createModelInstance($modelType);
                
                // Archive the first one
                $instance1->delete();
                
                // Property: first() should return a non-archived record
                $first = $modelClass::first();
                
                $this->assertNotNull(
                    $first,
                    "first() should return a record when non-archived records exist"
                );
                
                $this->assertNull(
                    $first->deleted_at,
                    "first() should return a record with null deleted_at"
                );
                
                $this->assertEquals(
                    $instance2->id,
                    $first->id,
                    "first() should return the non-archived instance"
                );
            });
    }

    /**
     * Test that relationship queries exclude archived items.
     * 
     * @test
     */
    public function relationship_queries_exclude_archived_items()
    {
        $this->forAll(
            Generators::choose(2, 4) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Create a fund
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
                
                // Archive some offerings
                $archiveCount = max(1, intval($offeringCount / 2));
                for ($i = 0; $i < $archiveCount; $i++) {
                    Offering::find($offeringIds[$i])->delete();
                }
                
                // Property: Relationship query should exclude archived offerings
                $fundOfferings = $fund->offerings;
                
                $expectedCount = $offeringCount - $archiveCount;
                $this->assertEquals(
                    $expectedCount,
                    $fundOfferings->count(),
                    "Relationship query should return only {$expectedCount} non-archived offerings"
                );
                
                // Property: All returned offerings should have null deleted_at
                foreach ($fundOfferings as $offering) {
                    $this->assertNull(
                        $offering->deleted_at,
                        "Relationship query result should have null deleted_at"
                    );
                }
            });
    }

    /**
     * Test that pluck() queries exclude archived items.
     * 
     * @test
     */
    public function pluck_queries_exclude_archived_items()
    {
        $this->forAll(
            Generators::elements('Member', 'Event', 'Fund', 'Vendor'),
            Generators::choose(3, 5) // Number of instances
        )
            ->withMaxSize(2)
            ->then(function ($modelType, $instanceCount) {
                $modelClass = $this->getModelClass($modelType);
                
                // Clean up existing records
                $modelClass::withTrashed()->forceDelete();
                
                $createdIds = [];
                
                // Create instances
                for ($i = 0; $i < $instanceCount; $i++) {
                    $instance = $this->createModelInstance($modelType);
                    $createdIds[] = $instance->id;
                }
                
                // Archive some of them
                $archiveCount = rand(1, $instanceCount - 1);
                for ($i = 0; $i < $archiveCount; $i++) {
                    $modelClass::find($createdIds[$i])->delete();
                }
                
                // Property: pluck() should only return IDs of non-archived records
                $pluckedIds = $modelClass::pluck('id')->toArray();
                
                $expectedCount = $instanceCount - $archiveCount;
                $this->assertCount(
                    $expectedCount,
                    $pluckedIds,
                    "pluck() should return {$expectedCount} IDs for non-archived {$modelType}"
                );
                
                // Property: Archived IDs should not be in plucked results
                for ($i = 0; $i < $archiveCount; $i++) {
                    $this->assertNotContains(
                        $createdIds[$i],
                        $pluckedIds,
                        "Archived {$modelType} ID should not be in pluck() results"
                    );
                }
                
                // Property: Non-archived IDs should be in plucked results
                for ($i = $archiveCount; $i < $instanceCount; $i++) {
                    $this->assertContains(
                        $createdIds[$i],
                        $pluckedIds,
                        "Non-archived {$modelType} ID should be in pluck() results"
                    );
                }
            });
    }
}
