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
 * Property-Based Test for Restore Endpoint Behavior
 * 
 * Feature: soft-delete-archive-system
 * Property 14: Restore endpoint behavior
 * **Validates: Requirements 8.3**
 * 
 * Property: For any archived model instance, calling POST /api/archives/{type}/{id}/restore 
 * should clear the deleted_at timestamp and return a success response with the restored item data.
 */
class RestoreEndpointPropertyTest extends TestCase
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
     * Test that restore endpoint clears deleted_at and returns success response.
     * 
     * @test
     */
    public function restore_endpoint_clears_deleted_at_and_returns_success()
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
                    $archivedInstance->deleted_at,
                    "Instance should be archived before restore"
                );
                
                // Call restore endpoint
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                
                // Property: Should return success response
                $response->assertStatus(200);
                $response->assertJson([
                    'success' => true,
                    'message' => 'Item restored successfully',
                ]);
                
                // Property: deleted_at should be cleared
                $restoredInstance = $modelClass::find($id);
                $this->assertNotNull(
                    $restoredInstance,
                    "Restored instance should be findable in default queries"
                );
                
                $this->assertNull(
                    $restoredInstance->deleted_at,
                    "Restored instance should have null deleted_at timestamp"
                );
            });
    }

    /**
     * Test that restore endpoint works for multiple instances of the same type.
     * 
     * @test
     */
    public function restore_endpoint_works_for_multiple_instances()
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
                
                // Restore each instance via endpoint
                foreach ($createdIds as $id) {
                    $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                    
                    // Property: Each restore should succeed
                    $response->assertStatus(200);
                    $response->assertJson([
                        'success' => true,
                    ]);
                    
                    // Property: Each instance should have null deleted_at
                    $restoredInstance = $modelClass::find($id);
                    $this->assertNotNull(
                        $restoredInstance,
                        "Instance {$id} should be findable after restore"
                    );
                    
                    $this->assertNull(
                        $restoredInstance->deleted_at,
                        "Instance {$id} should have null deleted_at after restore"
                    );
                }
                
                // Verify all instances are in default queries
                $allRestored = $modelClass::whereIn('id', $createdIds)->get();
                $this->assertEquals(
                    $instanceCount,
                    $allRestored->count(),
                    "All {$instanceCount} instances should be in default queries after restore"
                );
            });
    }

    /**
     * Test that restore endpoint returns 404 for non-existent items.
     * 
     * @test
     */
    public function restore_endpoint_returns_404_for_non_existent_items()
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
                // Call restore endpoint with non-existent ID
                $response = $this->postJson("/api/archives/{$type}/{$nonExistentId}/restore");
                
                // Property: Should return 404 error
                $response->assertStatus(404);
                $response->assertJson([
                    'success' => false,
                ]);
            });
    }

    /**
     * Test that restore endpoint returns 400 for invalid model types.
     * 
     * @test
     */
    public function restore_endpoint_returns_400_for_invalid_types()
    {
        $this->forAll(
            Generators::elements('invalid_type', 'unknown', 'fake_model', 'test123')
        )
            ->withMaxSize(2)
            ->then(function ($invalidType) {
                // Call restore endpoint with invalid type
                $response = $this->postJson("/api/archives/{$invalidType}/1/restore");
                
                // Property: Should return 400 error
                $response->assertStatus(400);
                $response->assertJson([
                    'success' => false,
                    'message' => 'Invalid model type',
                ]);
            });
    }

    /**
     * Test that restore endpoint returns 404 for non-archived items.
     * 
     * @test
     */
    public function restore_endpoint_returns_404_for_non_archived_items()
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
                
                // Try to restore a non-archived item
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                
                // Property: Should return 404 error (item not found in archived items)
                $response->assertStatus(404);
                $response->assertJson([
                    'success' => false,
                ]);
            });
    }

    /**
     * Test that restore endpoint is idempotent (can be called multiple times).
     * 
     * @test
     */
    public function restore_endpoint_is_idempotent()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            ),
            Generators::choose(2, 3) // Number of restore attempts
        )
            ->withMaxSize(2)
            ->then(function ($type, $restoreAttempts) {
                $modelClass = $this->getModelClass($type);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // First restore should succeed
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                $response->assertStatus(200);
                $response->assertJson(['success' => true]);
                
                // Subsequent restore attempts should fail (item not archived anymore)
                for ($i = 1; $i < $restoreAttempts; $i++) {
                    $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                    
                    // Property: Should return 404 (item not in archived items)
                    $response->assertStatus(404);
                    $response->assertJson(['success' => false]);
                }
                
                // Property: Item should still be restored (deleted_at should be null)
                $finalInstance = $modelClass::find($id);
                $this->assertNotNull(
                    $finalInstance,
                    "Instance should still be findable after multiple restore attempts"
                );
                
                $this->assertNull(
                    $finalInstance->deleted_at,
                    "Instance should still have null deleted_at after multiple restore attempts"
                );
            });
    }

    /**
     * Test that restore endpoint requires admin role.
     * 
     * @test
     */
    public function restore_endpoint_requires_admin_role()
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
                
                // Try to restore with non-admin role
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                
                // Property: Should return 403 Forbidden
                $response->assertStatus(403);
                
                // Re-authenticate as admin for next iteration
                Sanctum::actingAs($this->user);
            });
    }
}
