<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Fund;
use App\Models\Member;
use App\Models\User;
use App\Repositories\OfferingRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Filter Result Accuracy
 * 
 * Feature: finance-management-system
 * Property 4: Filter Result Accuracy
 * **Validates: Requirements 1.4, 5.6, 6.6, 19.1, 19.2, 19.3**
 * 
 * Property: For any collection of financial records and any filter criteria 
 * (date range, type, category, amount range), all returned results should 
 * match ALL specified filter criteria.
 */
class FilterResultAccuracyPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected User $user;
    protected OfferingRepository $offeringRepository;

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
        
        // Initialize repository
        $this->offeringRepository = new OfferingRepository();
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
        // Get or create offering types
        $offeringType1 = OfferingType::firstOrCreate(
            ['name' => 'Tithe'],
            ['description' => 'Regular tithe offering', 'is_active' => true]
        );
        
        $offeringType2 = OfferingType::firstOrCreate(
            ['name' => 'Missions'],
            ['description' => 'Missions offering', 'is_active' => true]
        );
        
        // Get or create funds
        $fund1 = Fund::firstOrCreate(
            ['name' => 'General Fund'],
            ['type' => 'unrestricted', 'description' => 'General church fund', 'current_balance' => 0, 'is_active' => true]
        );
        
        $fund2 = Fund::firstOrCreate(
            ['name' => 'Building Fund'],
            ['type' => 'restricted', 'description' => 'Building fund', 'current_balance' => 0, 'is_active' => true]
        );
        
        // Get or create members
        $member1 = Member::first();
        if (!$member1) {
            $member1 = Member::factory()->create();
        }
        
        $member2 = Member::factory()->create();
        
        return [
            'offeringTypes' => [$offeringType1, $offeringType2],
            'funds' => [$fund1, $fund2],
            'members' => [$member1, $member2],
        ];
    }

    /**
     * Test that date range filter returns only offerings within the specified range.
     * 
     * @test
     */
    public function date_range_filter_returns_only_offerings_within_range()
    {
        $this->forAll(
            Generators::choose(3, 5) // Number of offerings to create
        )
            ->withMaxSize(2) // Run 2 iterations
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType = $records['offeringTypes'][0];
                $fund = $records['funds'][0];
                $member = $records['members'][0];
                
                // Define date range for filter
                $startDate = now()->subDays(30)->format('Y-m-d');
                $endDate = now()->format('Y-m-d');
                
                // Create offerings with various dates (some inside, some outside range)
                $insideRangeCount = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    $isInsideRange = rand(0, 1);
                    
                    if ($isInsideRange) {
                        $date = now()->subDays(rand(0, 30))->format('Y-m-d');
                        $insideRangeCount++;
                    } else {
                        $date = now()->subDays(rand(31, 100))->format('Y-m-d');
                    }
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'cash',
                        'date' => $date,
                        'is_anonymous' => false,
                    ]);
                }
                
                // Apply date range filter
                $filteredOfferings = $this->offeringRepository->getByDateRange($startDate, $endDate);
                
                // Property: All returned offerings should be within the date range
                foreach ($filteredOfferings as $offering) {
                    $this->assertGreaterThanOrEqual(
                        $startDate,
                        $offering->date,
                        "Offering date {$offering->date} should be >= start date {$startDate}"
                    );
                    
                    $this->assertLessThanOrEqual(
                        $endDate,
                        $offering->date,
                        "Offering date {$offering->date} should be <= end date {$endDate}"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $insideRangeCount,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$insideRangeCount} offerings within date range"
                );
            });
    }

    /**
     * Test that offering type filter returns only offerings of the specified type.
     * 
     * @test
     */
    public function offering_type_filter_returns_only_offerings_of_specified_type()
    {
        $this->forAll(
            Generators::choose(3, 5) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType1 = $records['offeringTypes'][0];
                $offeringType2 = $records['offeringTypes'][1];
                $fund = $records['funds'][0];
                $member = $records['members'][0];
                
                // Create offerings with different types
                $type1Count = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    $useType1 = rand(0, 1);
                    $selectedType = $useType1 ? $offeringType1 : $offeringType2;
                    
                    if ($useType1) {
                        $type1Count++;
                    }
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $selectedType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                }
                
                // Apply offering type filter
                $filteredOfferings = $this->offeringRepository->filterByType($offeringType1->id);
                
                // Property: All returned offerings should have the specified type
                foreach ($filteredOfferings as $offering) {
                    $this->assertEquals(
                        $offeringType1->id,
                        $offering->offering_type_id,
                        "Offering should have offering_type_id {$offeringType1->id}"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $type1Count,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$type1Count} offerings of type {$offeringType1->name}"
                );
            });
    }

    /**
     * Test that payment method filter returns only offerings with the specified payment method.
     * 
     * @test
     */
    public function payment_method_filter_returns_only_offerings_with_specified_method()
    {
        $this->forAll(
            Generators::choose(3, 5) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType = $records['offeringTypes'][0];
                $fund = $records['funds'][0];
                $member = $records['members'][0];
                
                $paymentMethods = ['cash', 'check', 'online', 'mobile', 'other'];
                $targetMethod = 'online';
                
                // Create offerings with different payment methods
                $targetMethodCount = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    $useTargetMethod = rand(0, 1);
                    $selectedMethod = $useTargetMethod ? $targetMethod : $paymentMethods[rand(0, 4)];
                    
                    if ($selectedMethod === $targetMethod) {
                        $targetMethodCount++;
                    }
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => $selectedMethod,
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                }
                
                // Apply payment method filter
                $filteredOfferings = $this->offeringRepository->filterByPaymentMethod($targetMethod);
                
                // Property: All returned offerings should have the specified payment method
                foreach ($filteredOfferings as $offering) {
                    $this->assertEquals(
                        $targetMethod,
                        $offering->payment_method,
                        "Offering should have payment_method '{$targetMethod}'"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $targetMethodCount,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$targetMethodCount} offerings with payment method '{$targetMethod}'"
                );
            });
    }

    /**
     * Test that member filter returns only offerings for the specified member.
     * 
     * @test
     */
    public function member_filter_returns_only_offerings_for_specified_member()
    {
        $this->forAll(
            Generators::choose(3, 5) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType = $records['offeringTypes'][0];
                $fund = $records['funds'][0];
                $member1 = $records['members'][0];
                $member2 = $records['members'][1];
                
                // Create offerings for different members
                $member1Count = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    $useMember1 = rand(0, 1);
                    $selectedMember = $useMember1 ? $member1 : $member2;
                    
                    if ($useMember1) {
                        $member1Count++;
                    }
                    
                    Offering::create([
                        'member_id' => $selectedMember->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                }
                
                // Apply member filter
                $filteredOfferings = $this->offeringRepository->filterByMember($member1->id);
                
                // Property: All returned offerings should belong to the specified member
                foreach ($filteredOfferings as $offering) {
                    $this->assertEquals(
                        $member1->id,
                        $offering->member_id,
                        "Offering should have member_id {$member1->id}"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $member1Count,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$member1Count} offerings for member {$member1->id}"
                );
            });
    }

    /**
     * Test that amount range filter returns only offerings within the specified range.
     * 
     * @test
     */
    public function amount_range_filter_returns_only_offerings_within_range()
    {
        $this->forAll(
            Generators::choose(3, 5) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType = $records['offeringTypes'][0];
                $fund = $records['funds'][0];
                $member = $records['members'][0];
                
                // Define amount range for filter
                $minAmount = 100;
                $maxAmount = 500;
                
                // Create offerings with various amounts (some inside, some outside range)
                $insideRangeCount = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    $isInsideRange = rand(0, 1);
                    
                    if ($isInsideRange) {
                        $amount = rand($minAmount, $maxAmount);
                        $insideRangeCount++;
                    } else {
                        // Create amounts outside the range
                        $amount = rand(0, 1) ? rand(1, $minAmount - 1) : rand($maxAmount + 1, 1000);
                    }
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => $amount,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                }
                
                // Apply amount range filter
                $filteredOfferings = $this->offeringRepository->filterByAmountRange($minAmount, $maxAmount);
                
                // Property: All returned offerings should be within the amount range
                foreach ($filteredOfferings as $offering) {
                    $this->assertGreaterThanOrEqual(
                        $minAmount,
                        $offering->amount,
                        "Offering amount {$offering->amount} should be >= min amount {$minAmount}"
                    );
                    
                    $this->assertLessThanOrEqual(
                        $maxAmount,
                        $offering->amount,
                        "Offering amount {$offering->amount} should be <= max amount {$maxAmount}"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $insideRangeCount,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$insideRangeCount} offerings within amount range"
                );
            });
    }

    /**
     * Test that fund filter returns only offerings for the specified fund.
     * 
     * @test
     */
    public function fund_filter_returns_only_offerings_for_specified_fund()
    {
        $this->forAll(
            Generators::choose(3, 5) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType = $records['offeringTypes'][0];
                $fund1 = $records['funds'][0];
                $fund2 = $records['funds'][1];
                $member = $records['members'][0];
                
                // Create offerings for different funds
                $fund1Count = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    $useFund1 = rand(0, 1);
                    $selectedFund = $useFund1 ? $fund1 : $fund2;
                    
                    if ($useFund1) {
                        $fund1Count++;
                    }
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $selectedFund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                }
                
                // Apply fund filter
                $filteredOfferings = $this->offeringRepository->filterByFund($fund1->id);
                
                // Property: All returned offerings should belong to the specified fund
                foreach ($filteredOfferings as $offering) {
                    $this->assertEquals(
                        $fund1->id,
                        $offering->fund_id,
                        "Offering should have fund_id {$fund1->id}"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $fund1Count,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$fund1Count} offerings for fund {$fund1->id}"
                );
            });
    }

    /**
     * Test that multiple filters combined return only offerings matching ALL criteria.
     * 
     * @test
     */
    public function multiple_filters_combined_return_only_offerings_matching_all_criteria()
    {
        $this->forAll(
            Generators::choose(5, 8) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType1 = $records['offeringTypes'][0];
                $offeringType2 = $records['offeringTypes'][1];
                $fund1 = $records['funds'][0];
                $fund2 = $records['funds'][1];
                $member1 = $records['members'][0];
                $member2 = $records['members'][1];
                
                // Define filter criteria
                $startDate = now()->subDays(30)->format('Y-m-d');
                $endDate = now()->format('Y-m-d');
                $targetType = $offeringType1->id;
                $targetPaymentMethod = 'online';
                $minAmount = 100;
                $maxAmount = 500;
                
                // Create offerings with various combinations
                $matchingCount = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    // Randomly decide if this offering matches all criteria
                    $matchesAll = rand(0, 1);
                    
                    if ($matchesAll) {
                        $offering = [
                            'member_id' => $member1->id,
                            'offering_type_id' => $targetType,
                            'fund_id' => $fund1->id,
                            'amount' => rand($minAmount, $maxAmount),
                            'payment_method' => $targetPaymentMethod,
                            'date' => now()->subDays(rand(0, 30))->format('Y-m-d'),
                            'is_anonymous' => false,
                        ];
                        $matchingCount++;
                    } else {
                        // Create offering that doesn't match at least one criterion
                        $offering = [
                            'member_id' => rand(0, 1) ? $member1->id : $member2->id,
                            'offering_type_id' => rand(0, 1) ? $offeringType1->id : $offeringType2->id,
                            'fund_id' => rand(0, 1) ? $fund1->id : $fund2->id,
                            'amount' => rand(1, 1000),
                            'payment_method' => ['cash', 'check', 'online', 'mobile'][rand(0, 3)],
                            'date' => now()->subDays(rand(0, 100))->format('Y-m-d'),
                            'is_anonymous' => false,
                        ];
                    }
                    
                    Offering::create($offering);
                }
                
                // Apply multiple filters using paginate method
                $filters = [
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'offering_type_id' => $targetType,
                    'payment_method' => $targetPaymentMethod,
                    'min_amount' => $minAmount,
                    'max_amount' => $maxAmount,
                ];
                
                $filteredOfferings = $this->offeringRepository->paginate(100, $filters);
                
                // Property: All returned offerings should match ALL filter criteria
                foreach ($filteredOfferings as $offering) {
                    // Check date range
                    $this->assertGreaterThanOrEqual(
                        $startDate,
                        $offering->date,
                        "Offering date should be >= start date"
                    );
                    $this->assertLessThanOrEqual(
                        $endDate,
                        $offering->date,
                        "Offering date should be <= end date"
                    );
                    
                    // Check offering type
                    $this->assertEquals(
                        $targetType,
                        $offering->offering_type_id,
                        "Offering should have the specified offering type"
                    );
                    
                    // Check payment method
                    $this->assertEquals(
                        $targetPaymentMethod,
                        $offering->payment_method,
                        "Offering should have the specified payment method"
                    );
                    
                    // Check amount range
                    $this->assertGreaterThanOrEqual(
                        $minAmount,
                        $offering->amount,
                        "Offering amount should be >= min amount"
                    );
                    $this->assertLessThanOrEqual(
                        $maxAmount,
                        $offering->amount,
                        "Offering amount should be <= max amount"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $matchingCount,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$matchingCount} offerings matching all criteria"
                );
            });
    }

    /**
     * Test that anonymous filter returns only anonymous offerings.
     * 
     * @test
     */
    public function anonymous_filter_returns_only_anonymous_offerings()
    {
        $this->forAll(
            Generators::choose(3, 5) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType = $records['offeringTypes'][0];
                $fund = $records['funds'][0];
                $member = $records['members'][0];
                
                // Create mix of anonymous and non-anonymous offerings
                $anonymousCount = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    $isAnonymous = rand(0, 1);
                    
                    if ($isAnonymous) {
                        $anonymousCount++;
                    }
                    
                    Offering::create([
                        'member_id' => $isAnonymous ? null : $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => $isAnonymous,
                    ]);
                }
                
                // Apply anonymous filter
                $filteredOfferings = $this->offeringRepository->getAnonymous();
                
                // Property: All returned offerings should be anonymous
                foreach ($filteredOfferings as $offering) {
                    $this->assertTrue(
                        $offering->is_anonymous,
                        "Offering should be marked as anonymous"
                    );
                    
                    $this->assertNull(
                        $offering->member_id,
                        "Anonymous offering should have null member_id"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $anonymousCount,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$anonymousCount} anonymous offerings"
                );
            });
    }

    /**
     * Test that empty filter results are returned when no offerings match criteria.
     * 
     * @test
     */
    public function empty_results_returned_when_no_offerings_match_criteria()
    {
        // Clean database
        Offering::query()->delete();
        
        // Get required records
        $records = $this->getRequiredRecords();
        $offeringType = $records['offeringTypes'][0];
        $fund = $records['funds'][0];
        $member = $records['members'][0];
        
        // Create offerings with specific characteristics
        for ($i = 0; $i < 5; $i++) {
            Offering::create([
                'member_id' => $member->id,
                'offering_type_id' => $offeringType->id,
                'fund_id' => $fund->id,
                'amount' => rand(10, 50), // Small amounts
                'payment_method' => 'cash',
                'date' => now()->subDays(100)->format('Y-m-d'), // Old dates
                'is_anonymous' => false,
            ]);
        }
        
        // Apply filter that should return no results
        $filteredOfferings = $this->offeringRepository->filterByAmountRange(1000, 2000);
        
        // Property: Should return empty collection
        $this->assertCount(
            0,
            $filteredOfferings,
            "Filter should return empty collection when no offerings match criteria"
        );
        
        // Apply date range filter that should return no results
        $futureStartDate = now()->addDays(10)->format('Y-m-d');
        $futureEndDate = now()->addDays(20)->format('Y-m-d');
        $filteredOfferings = $this->offeringRepository->getByDateRange($futureStartDate, $futureEndDate);
        
        // Property: Should return empty collection
        $this->assertCount(
            0,
            $filteredOfferings,
            "Filter should return empty collection for future date range"
        );
    }

    /**
     * Test that filter with only minimum amount returns offerings >= minimum.
     * 
     * @test
     */
    public function filter_with_only_minimum_amount_returns_offerings_greater_or_equal()
    {
        $this->forAll(
            Generators::choose(3, 5) // Number of offerings to create
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                Offering::query()->delete();
                
                // Get required records
                $records = $this->getRequiredRecords();
                $offeringType = $records['offeringTypes'][0];
                $fund = $records['funds'][0];
                $member = $records['members'][0];
                
                // Define minimum amount
                $minAmount = 200;
                
                // Create offerings with various amounts
                $aboveMinCount = 0;
                for ($i = 0; $i < $offeringCount; $i++) {
                    $isAboveMin = rand(0, 1);
                    
                    if ($isAboveMin) {
                        $amount = rand($minAmount, 1000);
                        $aboveMinCount++;
                    } else {
                        $amount = rand(1, $minAmount - 1);
                    }
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => $amount,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                }
                
                // Apply filter with only minimum amount (no maximum)
                $filteredOfferings = $this->offeringRepository->filterByAmountRange($minAmount, null);
                
                // Property: All returned offerings should have amount >= minimum
                foreach ($filteredOfferings as $offering) {
                    $this->assertGreaterThanOrEqual(
                        $minAmount,
                        $offering->amount,
                        "Offering amount {$offering->amount} should be >= min amount {$minAmount}"
                    );
                }
                
                // Property: Count should match expected count
                $this->assertEquals(
                    $aboveMinCount,
                    $filteredOfferings->count(),
                    "Filter should return exactly {$aboveMinCount} offerings with amount >= {$minAmount}"
                );
            });
    }

    /**
     * Test that search filter returns offerings matching search criteria.
     * 
     * @test
     */
    public function search_filter_returns_offerings_matching_search_criteria()
    {
        // Clean database
        Offering::query()->delete();
        
        // Get required records
        $records = $this->getRequiredRecords();
        $offeringType = $records['offeringTypes'][0];
        $fund = $records['funds'][0];
        $member = $records['members'][0];
        
        // Create offerings with specific notes
        $searchTerm = 'special';
        $matchingCount = 0;
        
        for ($i = 0; $i < 5; $i++) {
            $hasSearchTerm = rand(0, 1);
            
            Offering::create([
                'member_id' => $member->id,
                'offering_type_id' => $offeringType->id,
                'fund_id' => $fund->id,
                'amount' => rand(10, 1000),
                'payment_method' => 'cash',
                'date' => now()->format('Y-m-d'),
                'notes' => $hasSearchTerm ? "This is a {$searchTerm} offering" : "Regular offering",
                'is_anonymous' => false,
            ]);
            
            if ($hasSearchTerm) {
                $matchingCount++;
            }
        }
        
        // Apply search filter
        $filteredOfferings = $this->offeringRepository->search($searchTerm);
        
        // Property: All returned offerings should contain the search term
        foreach ($filteredOfferings as $offering) {
            $matchesNotes = stripos($offering->notes, $searchTerm) !== false;
            $matchesReceipt = stripos($offering->receipt_number, $searchTerm) !== false;
            $matchesMember = false;
            
            if ($offering->member) {
                $matchesMember = stripos($offering->member->first_name, $searchTerm) !== false ||
                                stripos($offering->member->last_name, $searchTerm) !== false;
            }
            
            $this->assertTrue(
                $matchesNotes || $matchesReceipt || $matchesMember,
                "Offering should match search term '{$searchTerm}' in notes, receipt number, or member name"
            );
        }
        
        // Property: Count should match expected count
        $this->assertEquals(
            $matchingCount,
            $filteredOfferings->count(),
            "Search should return exactly {$matchingCount} offerings matching '{$searchTerm}'"
        );
    }
}
