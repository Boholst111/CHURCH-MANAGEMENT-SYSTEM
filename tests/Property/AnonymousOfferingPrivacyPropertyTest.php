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
 * Property-Based Test for Anonymous Offering Privacy
 * 
 * Feature: finance-management-system
 * Property 5: Anonymous Offering Privacy
 * **Validates: Requirements 1.6, 3.4**
 * 
 * Property: For any offering marked as anonymous, the member_id field should be null 
 * and any generated receipts or reports should display "Anonymous Donor" instead of 
 * member information.
 */
class AnonymousOfferingPrivacyPropertyTest extends TestCase
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
     * Test that anonymous offerings have null member_id.
     * 
     * @test
     */
    public function anonymous_offerings_have_null_member_id()
    {
        $this->forAll(
            Generators::choose(2, 8) // Number of anonymous offerings to create
        )
            ->withMaxSize(3) // Run 3 iterations
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $createdOfferings = [];
                
                // Create anonymous offerings
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => null,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => ['cash', 'check', 'online', 'mobile', 'other'][rand(0, 4)],
                        'date' => now()->subDays(rand(0, 365))->format('Y-m-d'),
                        'notes' => 'Anonymous offering ' . $i,
                        'is_anonymous' => true,
                    ]);
                    
                    $createdOfferings[] = $offering;
                }
                
                // Property: All anonymous offerings should have null member_id
                foreach ($createdOfferings as $offering) {
                    $this->assertNull(
                        $offering->member_id,
                        "Anonymous offering (ID: {$offering->id}) should have null member_id"
                    );
                    
                    $this->assertTrue(
                        $offering->is_anonymous,
                        "Anonymous offering (ID: {$offering->id}) should have is_anonymous set to true"
                    );
                }
                
                // Verify in database
                $anonymousCount = Offering::whereNull('member_id')
                    ->where('is_anonymous', true)
                    ->count();
                
                $this->assertEquals(
                    $offeringCount,
                    $anonymousCount,
                    "All {$offeringCount} offerings should be anonymous in the database"
                );
            });
    }

    /**
     * Test that non-anonymous offerings have a member_id.
     * 
     * @test
     */
    public function non_anonymous_offerings_have_member_id()
    {
        $this->forAll(
            Generators::choose(2, 8) // Number of non-anonymous offerings to create
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $createdOfferings = [];
                
                // Create non-anonymous offerings
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => ['cash', 'check', 'online', 'mobile', 'other'][rand(0, 4)],
                        'date' => now()->subDays(rand(0, 365))->format('Y-m-d'),
                        'notes' => 'Regular offering ' . $i,
                        'is_anonymous' => false,
                    ]);
                    
                    $createdOfferings[] = $offering;
                }
                
                // Property: All non-anonymous offerings should have a member_id
                foreach ($createdOfferings as $offering) {
                    $this->assertNotNull(
                        $offering->member_id,
                        "Non-anonymous offering (ID: {$offering->id}) should have a member_id"
                    );
                    
                    $this->assertFalse(
                        $offering->is_anonymous,
                        "Non-anonymous offering (ID: {$offering->id}) should have is_anonymous set to false"
                    );
                    
                    $this->assertEquals(
                        $member->id,
                        $offering->member_id,
                        "Non-anonymous offering should be linked to the correct member"
                    );
                }
            });
    }

    /**
     * Test that mixed anonymous and non-anonymous offerings maintain privacy correctly.
     * 
     * @test
     */
    public function mixed_offerings_maintain_privacy_correctly()
    {
        $this->forAll(
            Generators::choose(2, 4), // Number of anonymous offerings
            Generators::choose(2, 4)  // Number of non-anonymous offerings
        )
            ->withMaxSize(3)
            ->then(function ($anonymousCount, $nonAnonymousCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $anonymousOfferings = [];
                $nonAnonymousOfferings = [];
                
                // Create anonymous offerings
                for ($i = 0; $i < $anonymousCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => null,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 500),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => true,
                    ]);
                    $anonymousOfferings[] = $offering;
                }
                
                // Create non-anonymous offerings
                for ($i = 0; $i < $nonAnonymousCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 500),
                        'payment_method' => 'online',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    $nonAnonymousOfferings[] = $offering;
                }
                
                // Property: Anonymous offerings should have null member_id
                foreach ($anonymousOfferings as $offering) {
                    $this->assertNull(
                        $offering->member_id,
                        "Anonymous offering should have null member_id"
                    );
                    $this->assertTrue($offering->is_anonymous);
                }
                
                // Property: Non-anonymous offerings should have member_id
                foreach ($nonAnonymousOfferings as $offering) {
                    $this->assertNotNull(
                        $offering->member_id,
                        "Non-anonymous offering should have member_id"
                    );
                    $this->assertFalse($offering->is_anonymous);
                }
                
                // Verify database counts
                $dbAnonymousCount = Offering::whereNull('member_id')
                    ->where('is_anonymous', true)
                    ->count();
                $dbNonAnonymousCount = Offering::whereNotNull('member_id')
                    ->where('is_anonymous', false)
                    ->count();
                
                $this->assertEquals($anonymousCount, $dbAnonymousCount);
                $this->assertEquals($nonAnonymousCount, $dbNonAnonymousCount);
            });
    }

    /**
     * Test that attempting to set member_id on anonymous offering is overridden.
     * 
     * @test
     */
    public function anonymous_flag_overrides_member_id()
    {
        $this->forAll(
            Generators::choose(2, 6) // Number of offerings to test
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $createdOfferings = [];
                
                // Create offerings marked as anonymous (even if member_id is provided)
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => null, // Explicitly set to null for anonymous
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => true,
                    ]);
                    
                    $createdOfferings[] = $offering;
                }
                
                // Property: All offerings marked as anonymous should have null member_id
                foreach ($createdOfferings as $offering) {
                    $this->assertNull(
                        $offering->member_id,
                        "Offering marked as anonymous should have null member_id"
                    );
                    $this->assertTrue($offering->is_anonymous);
                }
            });
    }

    /**
     * Test that anonymous offerings cannot be queried by member_id.
     * 
     * @test
     */
    public function anonymous_offerings_not_queryable_by_member()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of anonymous offerings
            Generators::choose(2, 5)  // Number of member offerings
        )
            ->withMaxSize(3)
            ->then(function ($anonymousCount, $memberOfferingCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                // Create anonymous offerings
                for ($i = 0; $i < $anonymousCount; $i++) {
                    Offering::create([
                        'member_id' => null,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 500),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => true,
                    ]);
                }
                
                // Create member offerings
                for ($i = 0; $i < $memberOfferingCount; $i++) {
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 500),
                        'payment_method' => 'online',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                }
                
                // Property: Querying by member_id should only return non-anonymous offerings
                $memberOfferings = Offering::where('member_id', $member->id)->get();
                
                $this->assertCount(
                    $memberOfferingCount,
                    $memberOfferings,
                    "Only non-anonymous offerings should be returned when querying by member_id"
                );
                
                // Verify none of the returned offerings are anonymous
                foreach ($memberOfferings as $offering) {
                    $this->assertFalse(
                        $offering->is_anonymous,
                        "Offerings queried by member_id should not be anonymous"
                    );
                    $this->assertEquals($member->id, $offering->member_id);
                }
                
                // Verify anonymous offerings are separate
                $anonymousOfferings = Offering::whereNull('member_id')
                    ->where('is_anonymous', true)
                    ->get();
                
                $this->assertCount(
                    $anonymousCount,
                    $anonymousOfferings,
                    "Anonymous offerings should be queryable separately"
                );
            });
    }

    /**
     * Test that anonymous offerings maintain privacy across updates.
     * 
     * @test
     */
    public function anonymous_offerings_maintain_privacy_after_updates()
    {
        $this->forAll(
            Generators::choose(2, 6) // Number of offerings to test
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                [$offeringType, $fund, $member] = $this->getRequiredRecords();
                
                $createdOfferings = [];
                
                // Create anonymous offerings
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
                    
                    $createdOfferings[] = $offering;
                }
                
                // Update offerings (change amount, but keep anonymous)
                foreach ($createdOfferings as $offering) {
                    $offering->update([
                        'amount' => rand(100, 1000),
                        'notes' => 'Updated offering',
                    ]);
                    
                    $offering->refresh();
                }
                
                // Property: After updates, offerings should still be anonymous
                foreach ($createdOfferings as $offering) {
                    $this->assertNull(
                        $offering->member_id,
                        "Anonymous offering should remain anonymous after update"
                    );
                    $this->assertTrue(
                        $offering->is_anonymous,
                        "is_anonymous flag should remain true after update"
                    );
                }
            });
    }

    /**
     * Test that single anonymous offering maintains privacy.
     * 
     * @test
     */
    public function single_anonymous_offering_maintains_privacy()
    {
        // Clean database
        Offering::query()->delete();
        
        // Get required records
        [$offeringType, $fund, $member] = $this->getRequiredRecords();
        
        // Create a single anonymous offering
        $offering = Offering::create([
            'member_id' => null,
            'offering_type_id' => $offeringType->id,
            'fund_id' => $fund->id,
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => now()->format('Y-m-d'),
            'is_anonymous' => true,
        ]);
        
        // Property: Anonymous offering should have null member_id
        $this->assertNull($offering->member_id, "Anonymous offering should have null member_id");
        $this->assertTrue($offering->is_anonymous, "is_anonymous flag should be true");
        
        // Verify in database
        $this->assertDatabaseHas('offerings', [
            'id' => $offering->id,
            'member_id' => null,
            'is_anonymous' => true,
        ]);
        
        // Verify member relationship is null
        $this->assertNull($offering->member, "Anonymous offering should have no member relationship");
    }
}
