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
 * Property-Based Test for API Authentication Requirement
 * 
 * Feature: soft-delete-archive-system
 * Property 10: API authentication requirement
 * **Validates: Requirements 8.5, 8.6**
 * 
 * Property: For any archive-related API endpoint, when called without valid authentication, 
 * the response should be 401 Unauthorized; when called with authentication but insufficient 
 * permissions, the response should be 403 Forbidden.
 */
class ApiAuthenticationPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Disable throttling middleware for property tests
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        
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
     * Test that archive endpoints return 401 when called without authentication.
     * 
     * @test
     */
    public function archive_endpoints_return_401_without_authentication()
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
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Test GET /api/archives without authentication
                $response = $this->getJson('/api/archives');
                $response->assertStatus(401);
                
                // Test GET /api/archives/{type} without authentication
                $response = $this->getJson("/api/archives/{$type}");
                $response->assertStatus(401);
                
                // Test POST /api/archives/{type}/{id}/restore without authentication
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                $response->assertStatus(401);
                
                // Test DELETE /api/archives/{type}/{id}/force without authentication
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                $response->assertStatus(401);
            });
    }

    /**
     * Test that archive endpoints return 403 when called with insufficient permissions.
     * 
     * @test
     */
    public function archive_endpoints_return_403_with_insufficient_permissions()
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
                
                // Test GET /api/archives with insufficient permissions
                $response = $this->getJson('/api/archives');
                $response->assertStatus(403);
                
                // Test GET /api/archives/{type} with insufficient permissions
                $response = $this->getJson("/api/archives/{$type}");
                $response->assertStatus(403);
                
                // Test POST /api/archives/{type}/{id}/restore with insufficient permissions
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                $response->assertStatus(403);
                
                // Test DELETE /api/archives/{type}/{id}/force with insufficient permissions
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                $response->assertStatus(403);
            });
    }

    /**
     * Test that archive endpoints succeed with admin authentication.
     * 
     * @test
     */
    public function archive_endpoints_succeed_with_admin_authentication()
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
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Authenticate as admin user
                $adminUser = User::factory()->create(['role' => 'admin']);
                Sanctum::actingAs($adminUser);
                
                // Test GET /api/archives with admin authentication
                $response = $this->getJson('/api/archives');
                $response->assertStatus(200);
                $response->assertJson(['success' => true]);
                
                // Test GET /api/archives/{type} with admin authentication
                $response = $this->getJson("/api/archives/{$type}");
                $response->assertStatus(200);
                $response->assertJson(['success' => true]);
                
                // Test POST /api/archives/{type}/{id}/restore with admin authentication
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                $response->assertStatus(200);
                $response->assertJson(['success' => true]);
                
                // Re-archive for force delete test
                $modelClass = $this->getModelClass($type);
                $restoredInstance = $modelClass::find($id);
                $restoredInstance->delete();
                
                // Test DELETE /api/archives/{type}/{id}/force with admin authentication
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                $response->assertStatus(200);
                $response->assertJson(['success' => true]);
            });
    }

    /**
     * Test that authentication is required for all archive endpoints consistently.
     * 
     * @test
     */
    public function authentication_required_for_all_endpoints_consistently()
    {
        $this->forAll(
            Generators::choose(1, 3) // Number of unauthenticated requests
        )
            ->withMaxSize(2)
            ->then(function ($requestCount) {
                // Create test data
                $member = Member::factory()->create();
                $member->delete();
                
                // Make multiple unauthenticated requests
                for ($i = 0; $i < $requestCount; $i++) {
                    // All endpoints should consistently return 401
                    $response = $this->getJson('/api/archives');
                    $response->assertStatus(401);
                    
                    $response = $this->getJson('/api/archives/members');
                    $response->assertStatus(401);
                    
                    $response = $this->postJson("/api/archives/members/{$member->id}/restore");
                    $response->assertStatus(401);
                    
                    $response = $this->deleteJson("/api/archives/members/{$member->id}/force");
                    $response->assertStatus(401);
                }
            });
    }

    /**
     * Test that permission checks are enforced for all non-admin roles.
     * 
     * @test
     */
    public function permission_checks_enforced_for_all_non_admin_roles()
    {
        $this->forAll(
            Generators::elements('staff', 'readonly'),
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            )
        )
            ->withMaxSize(2)
            ->then(function ($role, $type) {
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Authenticate as non-admin user
                $user = User::factory()->create(['role' => $role]);
                Sanctum::actingAs($user);
                
                // All endpoints should return 403 for non-admin roles
                $response = $this->getJson('/api/archives');
                $response->assertStatus(403);
                
                $response = $this->getJson("/api/archives/{$type}");
                $response->assertStatus(403);
                
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                $response->assertStatus(403);
                
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                $response->assertStatus(403);
            });
    }
}
