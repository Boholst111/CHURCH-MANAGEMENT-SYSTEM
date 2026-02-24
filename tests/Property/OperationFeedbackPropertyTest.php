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
 * Property-Based Test for Operation Feedback Messages
 * 
 * Feature: soft-delete-archive-system
 * Property 21: Operation feedback messages
 * **Validates: Requirements 2.5, 4.4, 4.5, 5.5, 6.7**
 * 
 * Property: For any archive, restore, or permanent delete operation, upon completion 
 * the system should display a success message for successful operations or an error 
 * message with failure reason for failed operations.
 */
class OperationFeedbackPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $adminUser;
    protected User $staffUser;
    protected User $memberUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Disable throttling middleware for property tests
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        
        // Create users with different roles
        $this->adminUser = User::factory()->create(['role' => 'admin']);
        $this->staffUser = User::factory()->create(['role' => 'staff']);
        $this->memberUser = User::factory()->create(['role' => 'readonly']);
        
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
     * Test that successful restore operations return success messages (Property 21).
     * Validates: Requirements 4.4
     * 
     * @test
     */
    public function successful_restore_operations_return_success_messages()
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
                // Authenticate as admin
                Sanctum::actingAs($this->adminUser);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Call restore endpoint
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                
                // Property 21: Successful restore should return success message
                $response->assertStatus(200);
                $response->assertJson(['success' => true]);
                $response->assertJsonStructure(['message']);
                
                // Verify message is a non-empty string
                $message = $response->json('message');
                $this->assertIsString($message);
                $this->assertNotEmpty($message);
                
                // Verify message indicates success
                $this->assertMatchesRegularExpression(
                    '/restored|success/i',
                    $message,
                    "Success message should indicate restoration was successful"
                );
            });
    }

    /**
     * Test that failed restore operations return error messages with failure reasons (Property 21).
     * Validates: Requirements 4.5
     * 
     * @test
     */
    public function failed_restore_operations_return_error_messages()
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
                // Authenticate as admin
                Sanctum::actingAs($this->adminUser);
                
                // Call restore endpoint with non-existent ID
                $response = $this->postJson("/api/archives/{$type}/{$nonExistentId}/restore");
                
                // Property 21: Failed restore should return error message
                $response->assertStatus(404);
                $response->assertJson(['success' => false]);
                $response->assertJsonStructure(['message']);
                
                // Verify message is a non-empty string
                $message = $response->json('message');
                $this->assertIsString($message);
                $this->assertNotEmpty($message);
                
                // Verify message indicates failure reason
                $this->assertMatchesRegularExpression(
                    '/not found|does not exist|failed/i',
                    $message,
                    "Error message should indicate why the operation failed"
                );
            });
    }

    /**
     * Test that successful permanent delete operations return success messages (Property 21).
     * Validates: Requirements 5.5
     * 
     * @test
     */
    public function successful_permanent_delete_operations_return_success_messages()
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
                // Authenticate as admin
                Sanctum::actingAs($this->adminUser);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Call force delete endpoint
                $response = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                
                // Property 21: Successful permanent delete should return success message
                $response->assertStatus(200);
                $response->assertJson(['success' => true]);
                $response->assertJsonStructure(['message']);
                
                // Verify message is a non-empty string
                $message = $response->json('message');
                $this->assertIsString($message);
                $this->assertNotEmpty($message);
                
                // Verify message indicates success
                $this->assertMatchesRegularExpression(
                    '/deleted|removed|success/i',
                    $message,
                    "Success message should indicate deletion was successful"
                );
            });
    }

    /**
     * Test that failed permanent delete operations return error messages (Property 21).
     * Validates: Requirements 5.5
     * 
     * @test
     */
    public function failed_permanent_delete_operations_return_error_messages()
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
                // Authenticate as admin
                Sanctum::actingAs($this->adminUser);
                
                // Call force delete endpoint with non-existent ID
                $response = $this->deleteJson("/api/archives/{$type}/{$nonExistentId}/force");
                
                // Property 21: Failed permanent delete should return error message
                $response->assertStatus(404);
                $response->assertJson(['success' => false]);
                $response->assertJsonStructure(['message']);
                
                // Verify message is a non-empty string
                $message = $response->json('message');
                $this->assertIsString($message);
                $this->assertNotEmpty($message);
                
                // Verify message indicates failure reason
                $this->assertMatchesRegularExpression(
                    '/not found|does not exist|failed/i',
                    $message,
                    "Error message should indicate why the operation failed"
                );
            });
    }

    /**
     * Test that permission denied operations return error messages (Property 21).
     * Validates: Requirements 6.7
     * 
     * @test
     */
    public function permission_denied_operations_return_error_messages()
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
                // Create and archive an instance as admin
                Sanctum::actingAs($this->adminUser);
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Try to restore as non-admin user (should fail)
                Sanctum::actingAs($this->memberUser);
                $response = $this->postJson("/api/archives/{$type}/{$id}/restore");
                
                // Property 21: Permission denied should return error message
                $response->assertStatus(403);
                $response->assertJson(['success' => false]);
                $response->assertJsonStructure(['message']);
                
                // Verify message is a non-empty string
                $message = $response->json('message');
                $this->assertIsString($message);
                $this->assertNotEmpty($message);
                
                // Verify message indicates permission issue
                $this->assertMatchesRegularExpression(
                    '/unauthorized|forbidden|permission|not allowed/i',
                    $message,
                    "Error message should indicate permission was denied"
                );
            });
    }

    /**
     * Test that all successful operations have consistent success message format (Property 21).
     * Validates: Requirements 2.5, 4.4, 5.5
     * 
     * @test
     */
    public function all_successful_operations_have_consistent_message_format()
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
                // Authenticate as admin
                Sanctum::actingAs($this->adminUser);
                
                // Create and archive instances for testing
                $instance1 = $this->createModelInstance($type);
                $instance2 = $this->createModelInstance($type);
                $instance1->delete();
                $instance2->delete();
                
                // Test restore operation
                $restoreResponse = $this->postJson("/api/archives/{$type}/{$instance1->id}/restore");
                $this->assertTrue($restoreResponse->json('success'));
                $this->assertIsString($restoreResponse->json('message'));
                $this->assertNotEmpty($restoreResponse->json('message'));
                
                // Test force delete operation
                $deleteResponse = $this->deleteJson("/api/archives/{$type}/{$instance2->id}/force");
                $this->assertTrue($deleteResponse->json('success'));
                $this->assertIsString($deleteResponse->json('message'));
                $this->assertNotEmpty($deleteResponse->json('message'));
                
                // Property: All success messages should be non-empty strings
                $this->assertArrayHasKey('message', $restoreResponse->json());
                $this->assertArrayHasKey('message', $deleteResponse->json());
            });
    }

    /**
     * Test that all failed operations have consistent error message format (Property 21).
     * Validates: Requirements 4.5, 5.5, 6.7
     * 
     * @test
     */
    public function all_failed_operations_have_consistent_error_message_format()
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
                // Test not found error
                Sanctum::actingAs($this->adminUser);
                $notFoundResponse = $this->postJson("/api/archives/{$type}/99999/restore");
                $this->assertFalse($notFoundResponse->json('success'));
                $this->assertIsString($notFoundResponse->json('message'));
                $this->assertNotEmpty($notFoundResponse->json('message'));
                
                // Test permission error
                $instance = $this->createModelInstance($type);
                $instance->delete();
                
                Sanctum::actingAs($this->memberUser);
                $permissionResponse = $this->postJson("/api/archives/{$type}/{$instance->id}/restore");
                $this->assertFalse($permissionResponse->json('success'));
                $this->assertIsString($permissionResponse->json('message'));
                $this->assertNotEmpty($permissionResponse->json('message'));
                
                // Property: All error messages should be non-empty strings
                $this->assertArrayHasKey('message', $notFoundResponse->json());
                $this->assertArrayHasKey('message', $permissionResponse->json());
            });
    }

    /**
     * Test that invalid type operations return descriptive error messages (Property 21).
     * Validates: Requirements 6.7
     * 
     * @test
     */
    public function invalid_type_operations_return_descriptive_error_messages()
    {
        $this->forAll(
            Generators::elements('invalid_type', 'unknown', 'fake_model')
        )
            ->withMaxSize(2)
            ->then(function ($invalidType) {
                // Authenticate as admin
                Sanctum::actingAs($this->adminUser);
                
                // Test restore with invalid type
                $response = $this->postJson("/api/archives/{$invalidType}/1/restore");
                
                // Property 21: Invalid type should return error message
                $response->assertStatus(400);
                $response->assertJson(['success' => false]);
                $response->assertJsonStructure(['message', 'error']);
                
                // Verify message is a non-empty string
                $message = $response->json('message');
                $this->assertIsString($message);
                $this->assertNotEmpty($message);
                
                // Verify error field provides additional context
                $error = $response->json('error');
                $this->assertIsString($error);
                $this->assertNotEmpty($error);
                
                // Verify message indicates invalid type
                $this->assertMatchesRegularExpression(
                    '/invalid|unsupported|unknown/i',
                    $message . ' ' . $error,
                    "Error message should indicate the type is invalid"
                );
            });
    }

    /**
     * Test that operation feedback messages are human-readable (Property 21).
     * Validates: Requirements 2.5, 4.4, 4.5, 5.5, 6.7
     * 
     * @test
     */
    public function operation_feedback_messages_are_human_readable()
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
                // Authenticate as admin
                Sanctum::actingAs($this->adminUser);
                
                // Create and archive an instance
                $instance = $this->createModelInstance($type);
                $id = $instance->id;
                $instance->delete();
                
                // Test successful restore
                $restoreResponse = $this->postJson("/api/archives/{$type}/{$id}/restore");
                $restoreMessage = $restoreResponse->json('message');
                
                // Property: Message should be human-readable (contains spaces, proper capitalization)
                $this->assertGreaterThan(
                    0,
                    substr_count($restoreMessage, ' '),
                    "Message should contain spaces (be human-readable)"
                );
                
                // Re-archive for force delete test
                $modelClass = $this->getModelClass($type);
                $restoredInstance = $modelClass::find($id);
                $restoredInstance->delete();
                
                // Test successful force delete
                $deleteResponse = $this->deleteJson("/api/archives/{$type}/{$id}/force");
                $deleteMessage = $deleteResponse->json('message');
                
                // Property: Message should be human-readable
                $this->assertGreaterThan(
                    0,
                    substr_count($deleteMessage, ' '),
                    "Message should contain spaces (be human-readable)"
                );
                
                // Test failed operation (not found)
                $errorResponse = $this->postJson("/api/archives/{$type}/99999/restore");
                $errorMessage = $errorResponse->json('message');
                
                // Property: Error message should be human-readable
                $this->assertGreaterThan(
                    0,
                    substr_count($errorMessage, ' '),
                    "Error message should contain spaces (be human-readable)"
                );
            });
    }
}
