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
 * Property-Based Test for Force Delete Endpoint Behavior
 * 
 * Feature: soft-delete-archive-system
 * Property 15: Force delete endpoint behavior
 * **Validates: Requirements 8.4**
 * 
 * Property: For any archived model instance, calling DELETE /api/archives/{type}/{id}/force 
 * should permanently remove the record from the database and return a success response.
 */
class ForceDeleteEndpointPropertyTest extends TestCase
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
        
        // Create and authenticate an admin user
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
            'members' => Member::class,
            'events' => Event::class,
            'leadership' => Leadership::class,
            'small_groups' => SmallGroup::class,
            'offerings' => Offering::class,
            'expenses' => Expense::class,
            'budgets' => Budget::class,
            'pledges' => Pledge::class,
            'funds' => Fund::class,
            'vendors' => Vendor::class,
            'expense_categories' => ExpenseCategory::class,
            'offering_types' => OfferingType::class,
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
            case 'offerings':
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
                
            case 'expenses':
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
                
            case 'funds':
                return Fund::create([
                    'name' => 'Test Fund ' . uniqid(),
                    'type' => 'unrestricted',
                    'description' => 'Test fund for property testing',
                    'current_balance' => 0,
                    'is_active' => true,
                ]);
                
            case 'budgets':
                return Budget::create([
                    'name' => 'Test Budget ' . uniqid(),
                    'period_type' => 'monthly',
                    'start_date' => now()->format('Y-m-d'),
                    'end_date' => now()->addMonth()->format('Y-m-d'),
                    'is_active' => true,
                ]);
                
            case 'pledges':
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
                
            case 'leadership':
                return Leadership::create([
                    'first_name' => 'John',
                    'last_name' => 'Doe',
                    'role' => 'Pastor',
                    'department' => 'Ministry',
                    'email' => 'john.doe' . uniqid() . '@example.com',
                    'phone' => '123-456-7890',
                    'start_date' => now()->format('Y-m-d'),
                ]);
                
            case 'small_groups':
                $leader = Member::factory()->create();
                return SmallGroup::create([
                    'name' => 'Test Group ' . uniqid(),
                    'leader_name' => 'Test Leader',
                    'meeting_day' => 'Wednesday',
                    'meeting_time' => '19:00:00',
                    'location' => 'Church Building',
                ]);
                
            case 'events':
                return Event::create([
                    'title' => 'Test Event ' . uniqid(),
                    'event_date' => now()->format('Y-m-d'),
                    'event_time' => '10:00:00',
                    'location' => 'Main Sanctuary',
                    'status' => 'upcoming',
                ]);
                
            case 'expense_categories':
                return ExpenseCategory::create([
                    'name' => 'Test Category ' . uniqid(),
                    'description' => 'Test category for property testing',
                    'is_active' => true,
                ]);
                
            case 'offering_types':
                return OfferingType::create([
                    'name' => 'Test Offering Type ' . uniqid(),
                    'description' => 'Test offering type for property testing',
                    'is_active' => true,
                ]);
                
            case 'vendors':
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
     * Test that force delete endpoint permanently removes records and returns success.
     * 
     * @test
     */
    public function force_delete_endpoint_permanently_removes_records_and_returns_success()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            )
        )
            ->withMaxSize(2)
            ->then(function ($type) {
                $modelClass = $this->getModelClass($type);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Verify it's archived
                $archivedInstance = $modelClass::withTrashed()->find($id);
                $this->assertNotNull(
                    $archivedInstance,
                    "Instance should be archived before force delete"
                );
                $this->assertNotNull(
                    $archivedInstance->deleted_at,
                    "Instance should have deleted_at timestamp"
                );
                
                // Call force delete endpoint
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                
                // Property: Should return success response
                $response->assertStatus(200);
                $response->assertJson([
                    'success' => true,
                    'message' => 'Item permanently deleted successfully',
                ]);
                
                // Property: Record should not exist even with withTrashed()
                $deletedInstance = $modelClass::withTrashed()->find($id);
                $this->assertNull(
                    $deletedInstance,
                    "Force deleted instance should not exist in database even with withTrashed()"
                );
            });
    }

    /**
     * Test that force delete endpoint works for multiple instances of the same type.
     * 
     * @test
     */
    public function force_delete_endpoint_works_for_multiple_instances()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            ),
            Generators::choose(2, 4) // Number of instances
        )
            ->withMaxSize(2)
            ->then(function ($type, $instanceCount) {
                $modelClass = $this->getModelClass($type);
                
                $createdIds = [];
                
                // Create and archive multiple instances
                for ($i = 0; $i < $instanceCount; $i++) {
                    $instance = $this->createModelInstance($type);
                    $createdIds[] = $instance->id;
                    $instance->delete();
                }
                
                // Force delete each instance via endpoint
                foreach ($createdIds as $id) {
                    $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                    
                    // Property: Each force delete should succeed
                    $response->assertStatus(200);
                    $response->assertJson([
                        'success' => true,
                    ]);
                    
                    // Property: Each instance should not exist even with withTrashed()
                    $deletedInstance = $modelClass::withTrashed()->find($id);
                    $this->assertNull(
                        $deletedInstance,
                        "Instance {$id} should not exist after force delete"
                    );
                }
                
                // Verify no instances exist in withTrashed queries
                $allDeleted = $modelClass::withTrashed()->whereIn('id', $createdIds)->get();
                $this->assertEquals(
                    0,
                    $allDeleted->count(),
                    "All {$instanceCount} instances should be permanently deleted"
                );
            });
    }

    /**
     * Test that force delete endpoint returns 404 for non-existent items.
     * 
     * @test
     */
    public function force_delete_endpoint_returns_404_for_non_existent_items()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            ),
            Generators::choose(9999, 99999) // Non-existent ID
        )
            ->withMaxSize(2)
            ->then(function ($type, $nonExistentId) {
                // Call force delete endpoint with non-existent ID
                $response = $this->deleteJson("/api/archives/{$type}/{$nonExistentId}/force");
                
                // Property: Should return 404 error
                $response->assertStatus(404);
                $response->assertJson([
                    'success' => false,
                ]);
            });
    }

    /**
     * Test that force delete endpoint returns 400 for invalid model types.
     * 
     * @test
     */
    public function force_delete_endpoint_returns_400_for_invalid_types()
    {
        $this->forAll(
            Generators::elements('invalid_type', 'unknown', 'fake_model', 'test123')
        )
            ->withMaxSize(2)
            ->then(function ($invalidType) {
                // Call force delete endpoint with invalid type
                $response = $this->deleteJson("/api/archives/{$invalidType}/1/force");
                
                // Property: Should return 400 error
                $response->assertStatus(400);
                $response->assertJson([
                    'success' => false,
                    'message' => 'Invalid model type',
                ]);
            });
    }

    /**
     * Test that force delete endpoint returns 404 for non-archived items.
     * 
     * @test
     */
    public function force_delete_endpoint_returns_404_for_non_archived_items()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            )
        )
            ->withMaxSize(2)
            ->then(function ($type) {
                // Create an instance but don't archive it
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                
                // Verify it's not archived
                $this->assertNull(
                    $instance->deleted_at,
                    "Instance should not be archived"
                );
                
                // Try to force delete a non-archived item
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                
                // Property: Should return 404 error (item not found in archived items)
                $response->assertStatus(404);
                $response->assertJson([
                    'success' => false,
                ]);
            });
    }

    /**
     * Test that force delete endpoint is idempotent (second call returns 404).
     * 
     * @test
     */
    public function force_delete_endpoint_is_idempotent()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            ),
            Generators::choose(2, 3) // Number of delete attempts
        )
            ->withMaxSize(2)
            ->then(function ($type, $deleteAttempts) {
                $modelClass = $this->getModelClass($type);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // First force delete should succeed
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                $response->assertStatus(200);
                $response->assertJson(['success' => true]);
                
                // Subsequent force delete attempts should fail (item doesn't exist anymore)
                for ($i = 1; $i < $deleteAttempts; $i++) {
                    $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                    
                    // Property: Should return 404 (item doesn't exist)
                    $response->assertStatus(404);
                    $response->assertJson(['success' => false]);
                }
                
                // Property: Item should still be permanently deleted
                $finalInstance = $modelClass::withTrashed()->find($id);
                $this->assertNull(
                    $finalInstance,
                    "Instance should remain permanently deleted after multiple attempts"
                );
            });
    }

    /**
     * Test that force delete endpoint requires admin role.
     * 
     * @test
     */
    public function force_delete_endpoint_requires_admin_role()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            ),
            Generators::elements('staff', 'readonly') // Non-admin roles
        )
            ->withMaxSize(2)
            ->then(function ($type, $role) {
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Authenticate as non-admin user
                $nonAdminUser = User::factory()->create(['role' => $role]);
                Sanctum::actingAs($nonAdminUser);
                
                // Try to force delete with non-admin role
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                
                // Property: Should return 403 Forbidden
                $response->assertStatus(403);
                
                // Re-authenticate as admin for next iteration
                Sanctum::actingAs($this->user);
            });
    }

    /**
     * Test that force delete endpoint removes records from all query types.
     * 
     * @test
     */
    public function force_delete_endpoint_removes_records_from_all_query_types()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            )
        )
            ->withMaxSize(2)
            ->then(function ($type) {
                $modelClass = $this->getModelClass($type);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Verify it's in onlyTrashed() before force delete
                $trashedBefore = $modelClass::onlyTrashed()->find($id);
                $this->assertNotNull(
                    $trashedBefore,
                    "Instance should be in onlyTrashed() before force delete"
                );
                
                // Call force delete endpoint
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                $response->assertStatus(200);
                
                // Property: Should not be in default queries
                $defaultQuery = $modelClass::find($id);
                $this->assertNull(
                    $defaultQuery,
                    "Force deleted instance should not be in default queries"
                );
                
                // Property: Should not be in withTrashed() queries
                $withTrashedQuery = $modelClass::withTrashed()->find($id);
                $this->assertNull(
                    $withTrashedQuery,
                    "Force deleted instance should not be in withTrashed() queries"
                );
                
                // Property: Should not be in onlyTrashed() queries
                $onlyTrashedQuery = $modelClass::onlyTrashed()->find($id);
                $this->assertNull(
                    $onlyTrashedQuery,
                    "Force deleted instance should not be in onlyTrashed() queries"
                );
            });
    }

    /**
     * Test that force delete endpoint works correctly with count queries.
     * 
     * @test
     */
    public function force_delete_endpoint_works_correctly_with_count_queries()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            ),
            Generators::choose(3, 5) // Number of instances
        )
            ->withMaxSize(2)
            ->then(function ($type, $instanceCount) {
                $modelClass = $this->getModelClass($type);
                
                $createdIds = [];
                
                // Create and archive instances
                for ($i = 0; $i < $instanceCount; $i++) {
                    $instance = $this->createModelInstance($type);
                    $createdIds[] = $instance->id;
                    $instance->delete();
                }
                
                // Verify count with trashed before force delete
                $countBefore = $modelClass::withTrashed()->whereIn('id', $createdIds)->count();
                $this->assertEquals(
                    $instanceCount,
                    $countBefore,
                    "Count should be {$instanceCount} before force delete"
                );
                
                // Force delete some instances via endpoint
                $forceDeleteCount = rand(1, $instanceCount);
                for ($i = 0; $i < $forceDeleteCount; $i++) {
                    $response = $this->deleteJson("/api/archives/{$type}/{$createdIds[$i]}/force");
                    $response->assertStatus(200);
                }
                
                // Property: Count with trashed should exclude force deleted records
                $countAfter = $modelClass::withTrashed()->whereIn('id', $createdIds)->count();
                $expectedCount = $instanceCount - $forceDeleteCount;
                
                $this->assertEquals(
                    $expectedCount,
                    $countAfter,
                    "Count should be {$expectedCount} after force delete"
                );
                
                // Property: Default count should be 0 (all archived or force deleted)
                $defaultCount = $modelClass::whereIn('id', $createdIds)->count();
                $this->assertEquals(
                    0,
                    $defaultCount,
                    "Default count should be 0 (all archived or force deleted)"
                );
            });
    }
}
