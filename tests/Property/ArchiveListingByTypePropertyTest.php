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
 * Property-Based Test for Archive Listing by Type
 * 
 * Feature: soft-delete-archive-system
 * Property 13: Archive listing by type
 * **Validates: Requirements 8.2**
 * 
 * Property: For any valid archivable model type, calling GET /api/archives/{type} 
 * should return only archived items of that specific type with non-null deleted_at timestamps.
 */
class ArchiveListingByTypePropertyTest extends TestCase
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
                // For simple models without dependencies (Member)
                if ($type === 'members') {
                    return Member::create([
                        'first_name' => 'Test',
                        'last_name' => 'Member',
                        'email' => 'test.member.' . uniqid() . '@example.com',
                        'phone' => '123-456-7890',
                        'address' => '123 Test St',
                        'city' => 'Test City',
                        'status' => 'active',
                        'date_joined' => now()->format('Y-m-d'),
                        'birth_date' => now()->subYears(30)->format('Y-m-d'),
                        'gender' => 'male',
                    ]);
                }
                return $modelClass::factory()->create();
        }
    }

    /**
     * Test that GET /api/archives/{type} returns only archived items of that type.
     * 
     * @test
     */
    public function archive_listing_returns_only_archived_items_of_specified_type()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'leadership', 'small_groups',
                'offerings', 'expenses', 'budgets', 'pledges',
                'funds', 'vendors', 'expense_categories', 'offering_types'
            ),
            Generators::choose(1, 3) // Number of archived items to create
        )
            ->withMaxSize(2)
            ->then(function ($type, $archivedCount) {
                $modelClass = $this->getModelClass($type);
                
                // Create and archive items of the specified type
                $archivedIds = [];
                for ($i = 0; $i < $archivedCount; $i++) {
                    $instance = $this->createModelInstance($type);
                    $instance->delete();
                    $archivedIds[] = $instance->id;
                }
                
                // Create some active (non-archived) items of the same type
                $activeIds = [];
                for ($i = 0; $i < 2; $i++) {
                    $instance = $this->createModelInstance($type);
                    $activeIds[] = $instance->id;
                }
                
                // Call the API endpoint
                $response = $this->getJson("/api/archives/{$type}");
                
                // Property: Response should be successful
                $response->assertStatus(200);
                $response->assertJsonStructure([
                    'success',
                    'data',
                ]);
                
                $data = $response->json('data');
                
                // Property: All returned items should be of the specified type
                foreach ($data as $item) {
                    $this->assertEquals(
                        $type,
                        $item['type'],
                        "All returned items should be of type {$type}"
                    );
                }
                
                // Property: All archived items should be in the response
                $returnedIds = array_column($data, 'id');
                foreach ($archivedIds as $archivedId) {
                    $this->assertContains(
                        $archivedId,
                        $returnedIds,
                        "Archived {$type} with ID {$archivedId} should be in the response"
                    );
                }
                
                // Property: Active items should NOT be in the response
                foreach ($activeIds as $activeId) {
                    $this->assertNotContains(
                        $activeId,
                        $returnedIds,
                        "Active {$type} with ID {$activeId} should NOT be in the response"
                    );
                }
                
                // Property: All returned items should have deleted_at timestamp
                foreach ($data as $item) {
                    $this->assertNotNull(
                        $item['deleted_at'],
                        "All returned items should have deleted_at timestamp"
                    );
                }
                
                // Verify the actual database state
                foreach ($archivedIds as $archivedId) {
                    $dbItem = $modelClass::withTrashed()->find($archivedId);
                    $this->assertNotNull(
                        $dbItem->deleted_at,
                        "Archived item should have deleted_at in database"
                    );
                }
            });
    }

    /**
     * Test that GET /api/archives/{type} returns empty array when no archived items exist.
     * 
     * @test
     */
    public function archive_listing_returns_empty_array_when_no_archived_items()
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
                // Create only active items (no archived items)
                for ($i = 0; $i < 2; $i++) {
                    $this->createModelInstance($type);
                }
                
                // Call the API endpoint
                $response = $this->getJson("/api/archives/{$type}");
                
                // Property: Response should be successful
                $response->assertStatus(200);
                $response->assertJson([
                    'success' => true,
                    'data' => [],
                ]);
            });
    }

    /**
     * Test that GET /api/archives/{type} does not return items from other types.
     * 
     * @test
     */
    public function archive_listing_excludes_items_from_other_types()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'offerings', 'expenses'
            ),
            Generators::elements(
                'members', 'events', 'offerings', 'expenses'
            )
        )
            ->withMaxSize(2)
            ->when(function ($type1, $type2) {
                // Only test when types are different
                return $type1 !== $type2;
            })
            ->then(function ($type1, $type2) {
                // Create and archive items of type1
                $type1Instance = $this->createModelInstance($type1);
                $type1Instance->delete();
                $type1Id = $type1Instance->id;
                
                // Create and archive items of type2
                $type2Instance = $this->createModelInstance($type2);
                $type2Instance->delete();
                $type2Id = $type2Instance->id;
                
                // Call the API endpoint for type1
                $response = $this->getJson("/api/archives/{$type1}");
                
                // Property: Response should only contain type1 items
                $response->assertStatus(200);
                $data = $response->json('data');
                
                $returnedTypes = array_column($data, 'type');
                
                // Property: All returned items should be of type1
                foreach ($returnedTypes as $returnedType) {
                    $this->assertEquals(
                        $type1,
                        $returnedType,
                        "All returned items should be of type {$type1}"
                    );
                }
                
                // Property: type2 should not appear in the types
                $this->assertNotContains(
                    $type2,
                    $returnedTypes,
                    "Type {$type2} should NOT appear in results for {$type1}"
                );
                
                // Verify by checking each item's type field
                foreach ($data as $item) {
                    $this->assertNotEquals(
                        $type2,
                        $item['type'],
                        "No item should have type {$type2} in results for {$type1}"
                    );
                }
            });
    }

    /**
     * Test that GET /api/archives/{type} returns 400 for invalid type.
     * 
     * @test
     */
    public function archive_listing_returns_error_for_invalid_type()
    {
        $this->forAll(
            Generators::elements(
                'invalid_type', 'nonexistent', 'users', 'activities'
            )
        )
            ->withMaxSize(2)
            ->then(function ($invalidType) {
                // Call the API endpoint with invalid type
                $response = $this->getJson("/api/archives/{$invalidType}");
                
                // Property: Response should return 400 error
                $response->assertStatus(400);
                $response->assertJsonStructure([
                    'success',
                    'message',
                    'error',
                ]);
                
                $response->assertJson([
                    'success' => false,
                ]);
            });
    }

    /**
     * Test that GET /api/archives/{type} requires authentication.
     * 
     * @test
     */
    public function archive_listing_includes_required_item_information()
    {
        $this->forAll(
            Generators::elements(
                'members', 'events', 'offerings', 'expenses'
            ),
            Generators::choose(1, 2)
        )
            ->withMaxSize(2)
            ->then(function ($type, $count) {
                // Create and archive items
                for ($i = 0; $i < $count; $i++) {
                    $instance = $this->createModelInstance($type);
                    $instance->delete();
                }
                
                // Call the API endpoint
                $response = $this->getJson("/api/archives/{$type}");
                
                // Property: Response should be successful
                $response->assertStatus(200);
                $data = $response->json('data');
                
                // Property: Each item should have required fields
                foreach ($data as $item) {
                    $this->assertArrayHasKey('id', $item);
                    $this->assertArrayHasKey('type', $item);
                    $this->assertArrayHasKey('name', $item);
                    $this->assertArrayHasKey('deleted_at', $item);
                    $this->assertArrayHasKey('deleted_by', $item);
                    
                    // Verify field types
                    $this->assertIsInt($item['id']);
                    $this->assertIsString($item['type']);
                    $this->assertIsString($item['name']);
                    $this->assertIsString($item['deleted_at']);
                }
            });
    }

    /**
     * Test that multiple archived items of same type are all returned.
     * 
     * @test
     */
    public function archive_listing_returns_all_archived_items_of_type()
    {
        $this->forAll(
            Generators::elements('members', 'events', 'offerings', 'expenses'),
            Generators::choose(2, 4) // Create multiple archived items
        )
            ->withMaxSize(2)
            ->then(function ($type, $count) {
                $archivedIds = [];
                
                // Create and archive multiple items
                for ($i = 0; $i < $count; $i++) {
                    $instance = $this->createModelInstance($type);
                    $instance->delete();
                    $archivedIds[] = $instance->id;
                }
                
                // Call the API endpoint
                $response = $this->getJson("/api/archives/{$type}");
                
                // Property: Response should be successful
                $response->assertStatus(200);
                $data = $response->json('data');
                
                $returnedIds = array_column($data, 'id');
                
                // Property: All archived items should be in the response
                foreach ($archivedIds as $archivedId) {
                    $this->assertContains(
                        $archivedId,
                        $returnedIds,
                        "All archived {$type} items should be returned"
                    );
                }
                
                // Property: Count should match (at least the ones we created)
                $this->assertGreaterThanOrEqual(
                    $count,
                    count($returnedIds),
                    "Response should contain at least {$count} archived items"
                );
            });
    }
}
