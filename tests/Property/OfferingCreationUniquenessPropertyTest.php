<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Fund;
use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Offering Creation Uniqueness
 * 
 * Feature: finance-management-system
 * Property 1: Offering Creation Uniqueness
 * **Validates: Requirements 1.1**
 * 
 * Property: For any valid offering data, when the system creates an offering record, 
 * the assigned ID should be unique and not conflict with any existing offering ID.
 */
class OfferingCreationUniquenessPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Disable throttling middleware for property tests to avoid rate limiting
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);
        
        // Create and authenticate a user
        $this->user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($this->user);
    }

    protected function tearDown(): void
    {
        // RefreshDatabase trait handles cleanup automatically
        parent::tearDown();
    }
    
    /**
     * Get or create required related records for each test iteration.
     */
    protected function getRequiredRecords(): array
    {
        // Get or create offering type
        $offeringType = OfferingType::firstOrCreate(
            ['name' => 'Tithe'],
            ['description' => 'Regular tithe offering', 'is_active' => true]
        );
        
        // Get or create fund
        $fund = Fund::firstOrCreate(
            ['name' => 'General Fund'],
            ['type' => 'unrestricted', 'description' => 'General church fund', 'current_balance' => 0, 'is_active' => true]
        );
        
        // Get or create member
        $member = Member::first();
        if (!$member) {
            $member = Member::factory()->create();
        }
        
        return [$offeringType, $fund, $member];
    }

    /**
     * Test that all created offerings have unique IDs.
     * 
     * @test
     */
    public function all_created_offerings_have_unique_ids()
    {
        $this->forAll(
            Generators::choose(2, 8) // Number of offerings to create
        )
            ->withMaxSize(3) // Run 3 iterations
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $createdIds = [];
                
                // Create multiple offerings
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => ['cash', 'check', 'online', 'mobile', 'other'][rand(0, 4)],
                        'date' => now()->subDays(rand(0, 365))->format('Y-m-d'),
                        'notes' => 'Test offering ' . $i,
                        'is_anonymous' => false,
                    ]);
                    
                    $createdIds[] = $offering->id;
                }
                
                // Property: All IDs should be unique
                $uniqueIds = array_unique($createdIds);
                
                $this->assertCount(
                    $offeringCount,
                    $uniqueIds,
                    "All {$offeringCount} created offerings should have unique IDs. Found " . count($uniqueIds) . " unique IDs."
                );
                
                // Verify no duplicate IDs exist
                $this->assertEquals(
                    count($createdIds),
                    count($uniqueIds),
                    "No duplicate IDs should exist in created offerings"
                );
                
                // Verify all IDs are positive integers
                foreach ($createdIds as $id) {
                    $this->assertIsInt($id, "Offering ID should be an integer");
                    $this->assertGreaterThan(0, $id, "Offering ID should be positive");
                }
            });
    }

    /**
     * Test that offering IDs do not conflict with existing IDs.
     * 
     * @test
     */
    public function new_offering_ids_do_not_conflict_with_existing_ids()
    {
        $this->forAll(
            Generators::choose(1, 5), // Number of existing offerings
            Generators::choose(1, 5)  // Number of new offerings to create
        )
            ->withMaxSize(3)
            ->then(function ($existingCount, $newCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                // Create existing offerings
                $existingIds = [];
                for ($i = 0; $i < $existingCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    $existingIds[] = $offering->id;
                }
                
                // Create new offerings
                $newIds = [];
                for ($i = 0; $i < $newCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'online',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    $newIds[] = $offering->id;
                }
                
                // Property: New IDs should not conflict with existing IDs
                $conflicts = array_intersect($existingIds, $newIds);
                
                $this->assertEmpty(
                    $conflicts,
                    "New offering IDs should not conflict with existing offering IDs. Found conflicts: " . implode(', ', $conflicts)
                );
                
                // Verify all new IDs are unique
                $uniqueNewIds = array_unique($newIds);
                $this->assertCount(
                    $newCount,
                    $uniqueNewIds,
                    "All new offerings should have unique IDs"
                );
                
                // Verify total count in database
                $totalCount = Offering::count();
                $this->assertEquals(
                    $existingCount + $newCount,
                    $totalCount,
                    "Database should contain all created offerings"
                );
            });
    }

    /**
     * Test that offerings created with different attributes still have unique IDs.
     * 
     * @test
     */
    public function offerings_with_different_attributes_have_unique_ids()
    {
        $this->forAll(
            Generators::choose(2, 8) // Number of offerings to create
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $createdIds = [];
                $paymentMethods = ['cash', 'check', 'online', 'mobile', 'other'];
                
                // Create offerings with varying attributes
                for ($i = 0; $i < $offeringCount; $i++) {
                    $isAnonymous = (bool) rand(0, 1);
                    
                    $offering = Offering::create([
                        'member_id' => $isAnonymous ? null : $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(1, 10000) / 10, // Random amounts with decimals
                        'payment_method' => $paymentMethods[rand(0, 4)],
                        'date' => now()->subDays(rand(0, 730))->format('Y-m-d'),
                        'notes' => rand(0, 1) ? 'Note ' . uniqid() : null,
                        'is_anonymous' => $isAnonymous,
                    ]);
                    
                    $createdIds[] = $offering->id;
                }
                
                // Property: All IDs should be unique regardless of attribute variations
                $uniqueIds = array_unique($createdIds);
                
                $this->assertCount(
                    $offeringCount,
                    $uniqueIds,
                    "All offerings should have unique IDs regardless of their attributes"
                );
                
                // Verify IDs are sequential (auto-increment behavior)
                sort($createdIds);
                for ($i = 0; $i < count($createdIds) - 1; $i++) {
                    $this->assertLessThan(
                        $createdIds[$i + 1],
                        $createdIds[$i],
                        "IDs should be in ascending order (auto-increment)"
                    );
                }
            });
    }

    /**
     * Test that anonymous offerings have unique IDs.
     * 
     * @test
     */
    public function anonymous_offerings_have_unique_ids()
    {
        $this->forAll(
            Generators::choose(2, 6) // Number of anonymous offerings
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $createdIds = [];
                
                // Create anonymous offerings (member_id is null)
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => null,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 500),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => true,
                    ]);
                    
                    $createdIds[] = $offering->id;
                }
                
                // Property: All anonymous offerings should have unique IDs
                $uniqueIds = array_unique($createdIds);
                
                $this->assertCount(
                    $offeringCount,
                    $uniqueIds,
                    "All anonymous offerings should have unique IDs"
                );
                
                // Verify all offerings are indeed anonymous
                $anonymousCount = Offering::whereNull('member_id')
                    ->where('is_anonymous', true)
                    ->count();
                
                $this->assertEquals(
                    $offeringCount,
                    $anonymousCount,
                    "All created offerings should be anonymous"
                );
            });
    }

    /**
     * Test that offerings created in rapid succession have unique IDs.
     * 
     * @test
     */
    public function rapidly_created_offerings_have_unique_ids()
    {
        $this->forAll(
            Generators::choose(3, 8) // Number of offerings to create rapidly
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $createdIds = [];
                
                // Create offerings in rapid succession (simulating concurrent creation)
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => 100,
                        'payment_method' => 'online',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    
                    $createdIds[] = $offering->id;
                }
                
                // Property: All IDs should be unique even when created rapidly
                $uniqueIds = array_unique($createdIds);
                
                $this->assertCount(
                    $offeringCount,
                    $uniqueIds,
                    "All rapidly created offerings should have unique IDs"
                );
                
                // Verify database integrity
                $dbCount = Offering::count();
                $this->assertEquals(
                    $offeringCount,
                    $dbCount,
                    "Database should contain exactly the number of offerings created"
                );
            });
    }

    /**
     * Test that offering IDs remain unique across multiple batches.
     * 
     * @test
     */
    public function offering_ids_remain_unique_across_multiple_batches()
    {
        $this->forAll(
            Generators::choose(2, 3),  // Number of batches
            Generators::choose(2, 3)  // Offerings per batch
        )
            ->withMaxSize(3)
            ->then(function ($batchCount, $offeringsPerBatch) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $allIds = [];
                
                // Create multiple batches of offerings
                for ($batch = 0; $batch < $batchCount; $batch++) {
                    for ($i = 0; $i < $offeringsPerBatch; $i++) {
                        $offering = Offering::create([
                            'member_id' => $member->id,
                            'offering_type_id' => $offeringType->id,
                            'fund_id' => $fund->id,
                            'amount' => rand(10, 1000),
                            'payment_method' => 'cash',
                            'date' => now()->format('Y-m-d'),
                            'is_anonymous' => false,
                        ]);
                        
                        $allIds[] = $offering->id;
                    }
                }
                
                // Property: All IDs across all batches should be unique
                $uniqueIds = array_unique($allIds);
                $totalOfferings = $batchCount * $offeringsPerBatch;
                
                $this->assertCount(
                    $totalOfferings,
                    $uniqueIds,
                    "All offerings across {$batchCount} batches should have unique IDs"
                );
                
                // Verify database count
                $dbCount = Offering::count();
                $this->assertEquals(
                    $totalOfferings,
                    $dbCount,
                    "Database should contain all created offerings"
                );
            });
    }

    /**
     * Test that single offering creation assigns a unique ID.
     * 
     * @test
     */
    public function single_offering_creation_assigns_unique_id()
    {
        // Clean database
        Offering::query()->delete();
        
        // Get required records
        [$offeringType, $fund, $member] = $this->getRequiredRecords();
        
        // Create a single offering
        $offering = Offering::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'fund_id' => $fund->id,
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => now()->format('Y-m-d'),
            'is_anonymous' => false,
        ]);
        
        // Property: Single offering should have a valid unique ID
        $this->assertNotNull($offering->id, "Offering should have an ID assigned");
        $this->assertIsInt($offering->id, "Offering ID should be an integer");
        $this->assertGreaterThan(0, $offering->id, "Offering ID should be positive");
        
        // Verify it's in the database
        $this->assertDatabaseHas('offerings', [
            'id' => $offering->id,
            'amount' => 100.00,
        ]);
    }
}
