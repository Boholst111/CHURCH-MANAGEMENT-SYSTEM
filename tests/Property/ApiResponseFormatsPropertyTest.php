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
 * Property-Based Test for API Response Formats
 * 
 * Feature: soft-delete-archive-system
 * Property 16: API success response format
 * Property 17: API error response format
 * **Validates: Requirements 8.7, 8.8**
 * 
 * Property 16: For any successful archive-related API operation, the response should include 
 * a success status code (200-204), a success message, and the updated or affected data.
 * 
 * Property 17: For any failed archive-related API operation, the response should include 
 * an appropriate error status code (400-500), an error message, and optional error details.
 */
class ApiResponseFormatsPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Disable throttling middleware for property tests
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        
        // Create and authenticate an admin user
        $this->adminUser = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($this->adminUser);
        
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
     * Test that successful GET /api/archives returns proper success response format (Property 16).
     * 
     * @test
     */
    public function successful_list_all_archives_returns_success_format()
    {
        $this->forAll(
            Generators::choose(1, 3) // Number of archived items to create
        )
            ->withMaxSize(2)
            ->then(function ($itemCount) {
                // Create and archive some items
                for ($i = 0; $i < $itemCount; $i++) {
                    $member = Member::factory()->create();
                    $member->delete();
                }
                
                // Call the endpoint
                $response = $this->getJson('/api/archives');
                
                // Property 16: Success response should have:
                // - Success status code (200-204)
                $response->assertStatus(200);
                
                // - Success indicator
                $response->assertJson(['success' => true]);
                
                // - Data field
                $response->assertJsonStructure([
                    'success',
                    'data',
                ]);
                
                // Verify response is valid JSON
                $this->assertIsArray($response->json());
            });
    }

    /**
     * Test that successful GET /api/archives/{type} returns proper success response format (Property 16).
     * 
     * @test
     */
    public function successful_list_archives_by_type_returns_success_format()
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
                $instance->delete();
                
                // Call the endpoint
                $response = $this->getJson("/api/archives/{$type}");
                
                // Property 16: Success response should have:
                // - Success status code (200-204)
                $response->assertStatus(200);
                
                // - Success indicator
                $response->assertJson(['success' => true]);
                
                // - Data field with archived items
                $response->assertJsonStructure([
                    'success',
                    'data',
                ]);
                
                // Verify data is an array
                $this->assertIsArray($response->json('data'));
            });
    }

    /**
     * Test that successful POST /api/archives/{type}/{id}/restore returns proper success response format (Property 16).
     * 
     * @test
     */
    public function successful_restore_returns_success_format()
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
                
                // Call the restore endpoint
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                
                // Property 16: Success response should have:
                // - Success status code (200-204)
                $response->assertStatus(200);
                
                // - Success indicator
                $response->assertJson(['success' => true]);
                
                // - Success message
                $response->assertJsonStructure([
                    'success',
                    'message',
                ]);
                
                // Verify message is a string
                $this->assertIsString($response->json('message'));
            });
    }

    /**
     * Test that successful DELETE /api/archives/{type}/{id}/force returns proper success response format (Property 16).
     * 
     * @test
     */
    public function successful_force_delete_returns_success_format()
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
                
                // Call the force delete endpoint
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                
                // Property 16: Success response should have:
                // - Success status code (200-204)
                $response->assertStatus(200);
                
                // - Success indicator
                $response->assertJson(['success' => true]);
                
                // - Success message
                $response->assertJsonStructure([
                    'success',
                    'message',
                ]);
                
                // Verify message is a string
                $this->assertIsString($response->json('message'));
            });
    }

    /**
     * Test that failed operations return proper error response format with 400 status (Property 17).
     * 
     * @test
     */
    public function failed_operations_with_invalid_type_return_error_format()
    {
        $this->forAll(
            Generators::elements('invalid_type', 'unknown', 'fake_model')
        )
            ->withMaxSize(2)
            ->then(function ($invalidType) {
                // Test GET /api/archives/{type} with invalid type
                $response = $this->getJson("/api/archives/{$invalidType}");
                
                // Property 17: Error response should have:
                // - Error status code (400-500)
                $response->assertStatus(400);
                
                // - Success indicator set to false
                $response->assertJson(['success' => false]);
                
                // - Error message
                $response->assertJsonStructure([
                    'success',
                    'message',
                    'error',
                ]);
                
                // Verify message and error are strings
                $this->assertIsString($response->json('message'));
                $this->assertIsString($response->json('error'));
            });
    }

    /**
     * Test that operations on non-existent items return proper error response format with 404 status (Property 17).
     * 
     * @test
     */
    public function operations_on_non_existent_items_return_error_format()
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
                // Test restore with non-existent ID
                $response = $this->postJson("/api/archives/{$type}/{$nonExistentId}/restore");
                
                // Property 17: Error response should have:
                // - Error status code (400-500)
                $response->assertStatus(404);
                
                // - Success indicator set to false
                $response->assertJson(['success' => false]);
                
                // - Error message
                $response->assertJsonStructure([
                    'success',
                    'message',
                ]);
                
                // Test force delete with non-existent ID
                $response = $this->deleteJson("/api/archives/{$type}/{$nonExistentId}/force");
                
                // Property 17: Error response should have same format
                $response->assertStatus(404);
                $response->assertJson(['success' => false]);
                $response->assertJsonStructure([
                    'success',
                    'message',
                ]);
            });
    }

    /**
     * Test that all successful operations return consistent response format (Property 16).
     * 
     * @test
     */
    public function all_successful_operations_return_consistent_format()
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
                // Create and archive instances for testing
                $instance1 = $this->createModelInstance($type);
                $instance2 = $this->createModelInstance($type);
                $instance1->delete();
                $instance2->delete();
                
                // Test GET /api/archives
                $response1 = $this->getJson('/api/archives');
                $this->assertTrue($response1->json('success'));
                $this->assertArrayHasKey('data', $response1->json());
                
                // Test GET /api/archives/{type}
                $response2 = $this->getJson("/api/archives/{$type}");
                $this->assertTrue($response2->json('success'));
                $this->assertArrayHasKey('data', $response2->json());
                
                // Test POST restore
                $response3 = $this->postJson("/api/archives/{$type}/{$instance1->id}/restore");
                $this->assertTrue($response3->json('success'));
                $this->assertArrayHasKey('message', $response3->json());
                
                // Test DELETE force
                $response4 = $this->deleteJson("/api/archives/{$type}/{$instance2->id}/force");
                $this->assertTrue($response4->json('success'));
                $this->assertArrayHasKey('message', $response4->json());
                
                // Property: All responses should have 'success' field
                $this->assertArrayHasKey('success', $response1->json());
                $this->assertArrayHasKey('success', $response2->json());
                $this->assertArrayHasKey('success', $response3->json());
                $this->assertArrayHasKey('success', $response4->json());
            });
    }

    /**
     * Test that all error responses return consistent format (Property 17).
     * 
     * @test
     */
    public function all_error_responses_return_consistent_format()
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
                // Test with invalid type (400 error)
                $response1 = $this->getJson('/api/archives/invalid_type');
                $this->assertFalse($response1->json('success'));
                $this->assertArrayHasKey('message', $response1->json());
                $this->assertArrayHasKey('error', $response1->json());
                
                // Test with non-existent ID (404 error)
                $response2 = $this->postJson("/api/archives/{$type}/99999/restore");
                $this->assertFalse($response2->json('success'));
                $this->assertArrayHasKey('message', $response2->json());
                
                // Test force delete with non-existent ID (404 error)
                $response3 = $this->deleteJson("/api/archives/{$type}/99999/force");
                $this->assertFalse($response3->json('success'));
                $this->assertArrayHasKey('message', $response3->json());
                
                // Property: All error responses should have 'success' = false and 'message'
                $this->assertArrayHasKey('success', $response1->json());
                $this->assertArrayHasKey('success', $response2->json());
                $this->assertArrayHasKey('success', $response3->json());
            });
    }

    /**
     * Test that response formats are valid JSON (Property 16 & 17).
     * 
     * @test
     */
    public function all_responses_are_valid_json()
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
                $instance->delete();
                
                // Test successful operations
                $response1 = $this->getJson('/api/archives');
                $this->assertIsArray($response1->json());
                
                $response2 = $this->getJson("/api/archives/{$type}");
                $this->assertIsArray($response2->json());
                
                $response3 = $this->postJson("/api/archives/{$type}/{$instance->id}/restore");
                $this->assertIsArray($response3->json());
                
                // Re-archive for force delete test
                $modelClass = $this->getModelClass($type);
                $restoredInstance = $modelClass::find($instance->id);
                $restoredInstance->delete();
                
                $response4 = $this->deleteJson("/api/archives/{$type}/{$instance->id}/force");
                $this->assertIsArray($response4->json());
                
                // Test error operations
                $response5 = $this->getJson('/api/archives/invalid_type');
                $this->assertIsArray($response5->json());
                
                $response6 = $this->postJson("/api/archives/{$type}/99999/restore");
                $this->assertIsArray($response6->json());
                
                // Property: All responses should be valid JSON arrays
                $this->assertTrue(true); // If we got here, all responses were valid JSON
            });
    }

    /**
     * Test that success responses include appropriate HTTP status codes (Property 16).
     * 
     * @test
     */
    public function success_responses_have_appropriate_status_codes()
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
                // Create and archive instances
                $instance1 = $this->createModelInstance($type);
                $instance2 = $this->createModelInstance($type);
                $instance1->delete();
                $instance2->delete();
                
                // Test GET operations (should return 200)
                $response1 = $this->getJson('/api/archives');
                $this->assertGreaterThanOrEqual(200, $response1->status());
                $this->assertLessThan(300, $response1->status());
                
                $response2 = $this->getJson("/api/archives/{$type}");
                $this->assertGreaterThanOrEqual(200, $response2->status());
                $this->assertLessThan(300, $response2->status());
                
                // Test POST restore (should return 200)
                $response3 = $this->postJson("/api/archives/{$type}/{$instance1->id}/restore");
                $this->assertGreaterThanOrEqual(200, $response3->status());
                $this->assertLessThan(300, $response3->status());
                
                // Test DELETE force (should return 200)
                $response4 = $this->deleteJson("/api/archives/{$type}/{$instance2->id}/force");
                $this->assertGreaterThanOrEqual(200, $response4->status());
                $this->assertLessThan(300, $response4->status());
            });
    }

    /**
     * Test that error responses include appropriate HTTP status codes (Property 17).
     * 
     * @test
     */
    public function error_responses_have_appropriate_status_codes()
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
                // Test invalid type (should return 400)
                $response1 = $this->getJson('/api/archives/invalid_type');
                $this->assertEquals(400, $response1->status());
                
                // Test non-existent ID (should return 404)
                $response2 = $this->postJson("/api/archives/{$type}/99999/restore");
                $this->assertEquals(404, $response2->status());
                
                $response3 = $this->deleteJson("/api/archives/{$type}/99999/force");
                $this->assertEquals(404, $response3->status());
                
                // Property: All error status codes should be in 400-500 range
                $this->assertGreaterThanOrEqual(400, $response1->status());
                $this->assertLessThan(600, $response1->status());
                
                $this->assertGreaterThanOrEqual(400, $response2->status());
                $this->assertLessThan(600, $response2->status());
                
                $this->assertGreaterThanOrEqual(400, $response3->status());
                $this->assertLessThan(600, $response3->status());
            });
    }
}
