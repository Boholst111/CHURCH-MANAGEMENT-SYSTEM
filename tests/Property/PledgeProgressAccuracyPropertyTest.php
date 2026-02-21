<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Pledge;
use App\Models\Offering;
use App\Models\Member;
use App\Models\OfferingType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Pledge Progress Accuracy
 * 
 * Feature: finance-management-system
 * Property 17: Pledge Progress Accuracy
 * **Validates: Requirements 4.6**
 * 
 * Property: For any pledge with associated offering payments, the displayed progress 
 * (amount given / pledged amount) should equal the sum of all linked offering amounts 
 * divided by the pledged amount.
 */
class PledgeProgressAccuracyPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    /**
     * Test that pledge progress calculation is accurate for any number of payments.
     * 
     * @test
     */
    public function pledge_progress_equals_sum_of_payments_divided_by_pledged_amount()
    {
        $this->forAll(
            Generators::choose(100, 5000), // Pledged amount (in cents to avoid decimals)
            Generators::choose(1, 3) // Number of payments
        )
            ->withMaxSize(2)
            ->then(function ($pledgedAmountCents, $paymentCount) {
                // Convert cents to dollars
                $pledgedAmount = $pledgedAmountCents / 100;
                
                // Create test data - reuse or create offering type
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Test Offering Type'],
                    ['description' => 'For testing', 'is_active' => true]
                );
                
                // Create a pledge
                $pledge = Pledge::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'pledged_amount' => $pledgedAmount,
                    'start_date' => now()->subMonths(6),
                    'end_date' => now()->addMonths(6),
                    'purpose' => 'Test pledge',
                ]);
                
                // Create random payment amounts
                $totalPaid = 0;
                $paymentAmounts = [];
                
                for ($i = 0; $i < $paymentCount; $i++) {
                    // Generate random payment amount (1 to pledged amount)
                    $paymentAmount = rand(100, min($pledgedAmountCents, 5000)) / 100;
                    $paymentAmounts[] = $paymentAmount;
                    $totalPaid += $paymentAmount;
                    
                    // Create offering linked to pledge
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'pledge_id' => $pledge->id,
                        'amount' => $paymentAmount,
                        'payment_method' => 'cash',
                        'date' => now()->subDays($i),
                    ]);
                }
                
                // Calculate expected progress
                $expectedProgress = $totalPaid / $pledgedAmount;
                
                // Get actual progress from database
                $pledge->refresh();
                $actualTotalPaid = $pledge->payments()->sum('amount');
                $actualProgress = $actualTotalPaid / $pledge->pledged_amount;
                
                // Property: Progress should equal sum of payments / pledged amount
                $this->assertEquals(
                    round($expectedProgress, 2),
                    round($actualProgress, 2),
                    "Pledge progress should equal sum of payments divided by pledged amount. " .
                    "Expected: " . round($expectedProgress, 2) . ", " .
                    "Actual: " . round($actualProgress, 2) . ", " .
                    "Total Paid: {$totalPaid}, Pledged: {$pledgedAmount}, Payments: {$paymentCount}"
                );
                
                // Property: Sum of payment amounts should equal total paid
                $this->assertEquals(
                    round($totalPaid, 2),
                    round($actualTotalPaid, 2),
                    "Sum of payment amounts should match total paid"
                );
            });
    }

    /**
     * Test that pledge with no payments has zero progress.
     * 
     * @test
     */
    public function pledge_with_no_payments_has_zero_progress()
    {
        $this->forAll(
            Generators::choose(100, 5000) // Pledged amount in cents
        )
            ->withMaxSize(2)
            ->then(function ($pledgedAmountCents) {
                $pledgedAmount = $pledgedAmountCents / 100;
                
                // Create test data
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Test Offering Type'],
                    ['description' => 'For testing', 'is_active' => true]
                );
                
                // Create a pledge with no payments
                $pledge = Pledge::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'pledged_amount' => $pledgedAmount,
                    'start_date' => now()->subMonths(6),
                    'end_date' => now()->addMonths(6),
                    'purpose' => 'Test pledge',
                ]);
                
                // Get progress
                $totalPaid = $pledge->payments()->sum('amount');
                $progress = $totalPaid / $pledge->pledged_amount;
                
                // Property: Progress should be zero
                $this->assertEquals(
                    0,
                    $progress,
                    "Pledge with no payments should have zero progress"
                );
            });
    }

    /**
     * Test that pledge progress is accurate when payments exceed pledged amount.
     * 
     * @test
     */
    public function pledge_progress_can_exceed_100_percent()
    {
        $this->forAll(
            Generators::choose(100, 500), // Pledged amount in cents
            Generators::choose(2, 3) // Number of payments
        )
            ->withMaxSize(2)
            ->then(function ($pledgedAmountCents, $paymentCount) {
                $pledgedAmount = $pledgedAmountCents / 100;
                
                // Create test data
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Test Offering Type'],
                    ['description' => 'For testing', 'is_active' => true]
                );
                
                // Create a pledge
                $pledge = Pledge::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'pledged_amount' => $pledgedAmount,
                    'start_date' => now()->subMonths(6),
                    'end_date' => now()->addMonths(6),
                    'purpose' => 'Test pledge',
                ]);
                
                // Create payments that exceed pledged amount
                $totalPaid = 0;
                for ($i = 0; $i < $paymentCount; $i++) {
                    // Each payment is equal to pledged amount to ensure we exceed it
                    $paymentAmount = $pledgedAmount;
                    $totalPaid += $paymentAmount;
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'pledge_id' => $pledge->id,
                        'amount' => $paymentAmount,
                        'payment_method' => 'cash',
                        'date' => now()->subDays($i),
                    ]);
                }
                
                // Calculate progress
                $pledge->refresh();
                $actualTotalPaid = $pledge->payments()->sum('amount');
                $progress = $actualTotalPaid / $pledge->pledged_amount;
                
                // Property: Progress should be greater than 1 (100%)
                $this->assertGreaterThan(
                    1.0,
                    $progress,
                    "Pledge progress should exceed 100% when payments exceed pledged amount"
                );
                
                // Property: Progress calculation should still be accurate
                $expectedProgress = $totalPaid / $pledgedAmount;
                $this->assertEquals(
                    round($expectedProgress, 2),
                    round($progress, 2),
                    "Progress calculation should be accurate even when exceeding 100%"
                );
            });
    }

    /**
     * Test that only offerings linked to the pledge are counted in progress.
     * 
     * @test
     */
    public function only_linked_offerings_count_toward_pledge_progress()
    {
        $this->forAll(
            Generators::choose(100, 500), // Pledged amount in cents
            Generators::choose(1, 3), // Number of linked payments
            Generators::choose(1, 3) // Number of unlinked payments
        )
            ->withMaxSize(2)
            ->then(function ($pledgedAmountCents, $linkedCount, $unlinkedCount) {
                $pledgedAmount = $pledgedAmountCents / 100;
                
                // Create test data
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Test Offering Type'],
                    ['description' => 'For testing', 'is_active' => true]
                );
                
                // Create a pledge
                $pledge = Pledge::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'pledged_amount' => $pledgedAmount,
                    'start_date' => now()->subMonths(6),
                    'end_date' => now()->addMonths(6),
                    'purpose' => 'Test pledge',
                ]);
                
                // Create linked payments
                $totalLinkedPaid = 0;
                for ($i = 0; $i < $linkedCount; $i++) {
                    $paymentAmount = rand(10, 100) / 100;
                    $totalLinkedPaid += $paymentAmount;
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'pledge_id' => $pledge->id,
                        'amount' => $paymentAmount,
                        'payment_method' => 'cash',
                        'date' => now()->subDays($i),
                    ]);
                }
                
                // Create unlinked payments (no pledge_id)
                for ($i = 0; $i < $unlinkedCount; $i++) {
                    $paymentAmount = rand(10, 100) / 100;
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'pledge_id' => null, // Not linked to pledge
                        'amount' => $paymentAmount,
                        'payment_method' => 'cash',
                        'date' => now()->subDays($i),
                    ]);
                }
                
                // Get progress
                $pledge->refresh();
                $actualTotalPaid = $pledge->payments()->sum('amount');
                
                // Property: Only linked payments should be counted
                $this->assertEquals(
                    round($totalLinkedPaid, 2),
                    round($actualTotalPaid, 2),
                    "Only offerings linked to the pledge should count toward progress. " .
                    "Expected: {$totalLinkedPaid}, Actual: {$actualTotalPaid}"
                );
                
                // Property: Progress should be based only on linked payments
                $expectedProgress = $totalLinkedPaid / $pledgedAmount;
                $actualProgress = $actualTotalPaid / $pledge->pledged_amount;
                
                $this->assertEquals(
                    round($expectedProgress, 2),
                    round($actualProgress, 2),
                    "Progress should be calculated only from linked payments"
                );
            });
    }

    /**
     * Test that pledge progress is accurate with decimal amounts.
     * 
     * @test
     */
    public function pledge_progress_handles_decimal_amounts_correctly()
    {
        // Create test data
        $member = Member::factory()->create();
        $offeringType = OfferingType::firstOrCreate(
            ['name' => 'Test Offering Type'],
            ['description' => 'For testing', 'is_active' => true]
        );
        
        // Create a pledge with decimal amount
        $pledge = Pledge::create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
            'pledged_amount' => 123.45,
            'start_date' => now()->subMonths(6),
            'end_date' => now()->addMonths(6),
            'purpose' => 'Test pledge',
        ]);
        
        // Create payments with decimal amounts
        $payments = [10.50, 25.75, 33.33, 15.99];
        $expectedTotal = array_sum($payments);
        
        foreach ($payments as $amount) {
            Offering::create([
                'member_id' => $member->id,
                'offering_type_id' => $offeringType->id,
                'pledge_id' => $pledge->id,
                'amount' => $amount,
                'payment_method' => 'cash',
                'date' => now(),
            ]);
        }
        
        // Get progress
        $pledge->refresh();
        $actualTotal = $pledge->payments()->sum('amount');
        $progress = $actualTotal / $pledge->pledged_amount;
        
        // Property: Sum should be accurate with decimals
        $this->assertEquals(
            round($expectedTotal, 2),
            round($actualTotal, 2),
            "Sum of decimal payment amounts should be accurate"
        );
        
        // Property: Progress calculation should be accurate with decimals
        $expectedProgress = $expectedTotal / 123.45;
        $this->assertEquals(
            round($expectedProgress, 4),
            round($progress, 4),
            "Progress calculation should handle decimal amounts correctly"
        );
    }

    /**
     * Test that progress calculation is consistent across multiple queries.
     * 
     * @test
     */
    public function pledge_progress_is_consistent_across_queries()
    {
        $this->forAll(
            Generators::choose(100, 500), // Pledged amount in cents
            Generators::choose(1, 3) // Number of payments
        )
            ->withMaxSize(2)
            ->then(function ($pledgedAmountCents, $paymentCount) {
                $pledgedAmount = $pledgedAmountCents / 100;
                
                // Create test data
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Test Offering Type'],
                    ['description' => 'For testing', 'is_active' => true]
                );
                
                // Create a pledge
                $pledge = Pledge::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'pledged_amount' => $pledgedAmount,
                    'start_date' => now()->subMonths(6),
                    'end_date' => now()->addMonths(6),
                    'purpose' => 'Test pledge',
                ]);
                
                // Create payments
                for ($i = 0; $i < $paymentCount; $i++) {
                    $paymentAmount = rand(10, 100) / 100;
                    
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'pledge_id' => $pledge->id,
                        'amount' => $paymentAmount,
                        'payment_method' => 'cash',
                        'date' => now()->subDays($i),
                    ]);
                }
                
                // Query progress multiple times
                $pledge->refresh();
                $progress1 = $pledge->payments()->sum('amount') / $pledge->pledged_amount;
                
                $pledge->refresh();
                $progress2 = $pledge->payments()->sum('amount') / $pledge->pledged_amount;
                
                $pledge->refresh();
                $progress3 = $pledge->payments()->sum('amount') / $pledge->pledged_amount;
                
                // Property: Progress should be consistent across queries
                $this->assertEquals(
                    round($progress1, 2),
                    round($progress2, 2),
                    "Progress should be consistent across queries"
                );
                
                $this->assertEquals(
                    round($progress2, 2),
                    round($progress3, 2),
                    "Progress should be consistent across queries"
                );
            });
    }
}
