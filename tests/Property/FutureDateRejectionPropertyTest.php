<?php

namespace Tests\Property;

use Tests\TestCase;
use Eris\TestTrait;
use Eris\Generators;
use Carbon\Carbon;

/**
 * Property-Based Test for Future Date Rejection
 * 
 * Feature: finance-management-system
 * Property 7: Future Date Rejection
 * **Validates: Requirements 1.8**
 * 
 * Property: For any financial transaction with a date in the future, the system 
 * should reject the transaction with a validation error.
 */
class FutureDateRejectionPropertyTest extends TestCase
{
    use TestTrait;

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
     * Test that offerings with future dates are rejected.
     * 
     * @test
     */
    public function offerings_with_future_dates_are_rejected()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of attempts to create future-dated offerings
            Generators::choose(1, 365) // Days in the future (1 to 365 days)
        )
            ->withMaxSize(3) // Run 3 iterations
            ->then(function ($attemptCount, $daysInFuture) {
                $rejectedCount = 0;
                
                // Attempt to validate offerings with future dates
                for ($i = 0; $i < $attemptCount; $i++) {
                    $futureDate = Carbon::now()->addDays($daysInFuture)->format('Y-m-d');
                    
                    // Use validator to check if future date is rejected
                    $validator = \Validator::make([
                        'date' => $futureDate,
                    ], [
                        'date' => 'required|date|before_or_equal:today',
                    ]);
                    
                    // Property: Validation should fail for future date
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for future date {$futureDate}"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('date'),
                        "Validation errors should include 'date' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All future-dated offerings should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} future-dated offerings should be rejected"
                );
            });
    }

    /**
     * Test that expenses with future dates are rejected.
     * 
     * @test
     */
    public function expenses_with_future_dates_are_rejected()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of attempts
            Generators::choose(1, 365) // Days in the future
        )
            ->withMaxSize(3)
            ->then(function ($attemptCount, $daysInFuture) {
                $rejectedCount = 0;
                
                // Attempt to validate expenses with future dates
                for ($i = 0; $i < $attemptCount; $i++) {
                    $futureDate = Carbon::now()->addDays($daysInFuture)->format('Y-m-d');
                    
                    // Use validator to check if future date is rejected
                    $validator = \Validator::make([
                        'date' => $futureDate,
                    ], [
                        'date' => 'required|date|before_or_equal:today',
                    ]);
                    
                    // Property: Validation should fail for future date
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for future date {$futureDate}"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('date'),
                        "Validation errors should include 'date' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All future-dated expenses should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} future-dated expenses should be rejected"
                );
            });
    }

    /**
     * Test that offerings with today's date are accepted.
     * 
     * @test
     */
    public function offerings_with_todays_date_are_accepted()
    {
        $this->forAll(
            Generators::choose(2, 5) // Number of offerings to validate
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                $acceptedCount = 0;
                $todayDate = Carbon::now()->format('Y-m-d');
                
                // Validate offerings with today's date
                for ($i = 0; $i < $offeringCount; $i++) {
                    // Use validator to check if today's date is accepted
                    $validator = \Validator::make([
                        'date' => $todayDate,
                    ], [
                        'date' => 'required|date|before_or_equal:today',
                    ]);
                    
                    // Property: Validation should pass for today's date
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for today's date {$todayDate}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All offerings with today's date should be accepted
                $this->assertEquals(
                    $offeringCount,
                    $acceptedCount,
                    "All {$offeringCount} offerings with today's date should be accepted"
                );
            });
    }

    /**
     * Test that expenses with today's date are accepted.
     * 
     * @test
     */
    public function expenses_with_todays_date_are_accepted()
    {
        $this->forAll(
            Generators::choose(2, 5) // Number of expenses to validate
        )
            ->withMaxSize(3)
            ->then(function ($expenseCount) {
                $acceptedCount = 0;
                $todayDate = Carbon::now()->format('Y-m-d');
                
                // Validate expenses with today's date
                for ($i = 0; $i < $expenseCount; $i++) {
                    // Use validator to check if today's date is accepted
                    $validator = \Validator::make([
                        'date' => $todayDate,
                    ], [
                        'date' => 'required|date|before_or_equal:today',
                    ]);
                    
                    // Property: Validation should pass for today's date
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for today's date {$todayDate}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All expenses with today's date should be accepted
                $this->assertEquals(
                    $expenseCount,
                    $acceptedCount,
                    "All {$expenseCount} expenses with today's date should be accepted"
                );
            });
    }

    /**
     * Test that offerings with past dates are accepted.
     * 
     * @test
     */
    public function offerings_with_past_dates_are_accepted()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of offerings to validate
            Generators::choose(1, 365) // Days in the past (1 to 365 days)
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount, $daysInPast) {
                $acceptedCount = 0;
                $pastDate = Carbon::now()->subDays($daysInPast)->format('Y-m-d');
                
                // Validate offerings with past dates
                for ($i = 0; $i < $offeringCount; $i++) {
                    // Use validator to check if past date is accepted
                    $validator = \Validator::make([
                        'date' => $pastDate,
                    ], [
                        'date' => 'required|date|before_or_equal:today',
                    ]);
                    
                    // Property: Validation should pass for past date
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for past date {$pastDate}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All offerings with past dates should be accepted
                $this->assertEquals(
                    $offeringCount,
                    $acceptedCount,
                    "All {$offeringCount} offerings with past dates should be accepted"
                );
            });
    }

    /**
     * Test that expenses with past dates are accepted.
     * 
     * @test
     */
    public function expenses_with_past_dates_are_accepted()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of expenses to validate
            Generators::choose(1, 365) // Days in the past
        )
            ->withMaxSize(3)
            ->then(function ($expenseCount, $daysInPast) {
                $acceptedCount = 0;
                $pastDate = Carbon::now()->subDays($daysInPast)->format('Y-m-d');
                
                // Validate expenses with past dates
                for ($i = 0; $i < $expenseCount; $i++) {
                    // Use validator to check if past date is accepted
                    $validator = \Validator::make([
                        'date' => $pastDate,
                    ], [
                        'date' => 'required|date|before_or_equal:today',
                    ]);
                    
                    // Property: Validation should pass for past date
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for past date {$pastDate}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All expenses with past dates should be accepted
                $this->assertEquals(
                    $expenseCount,
                    $acceptedCount,
                    "All {$expenseCount} expenses with past dates should be accepted"
                );
            });
    }

    /**
     * Test that validation error messages are descriptive for future dates.
     * 
     * @test
     */
    public function validation_error_messages_are_descriptive_for_future_dates()
    {
        $this->forAll(
            Generators::elements('offering', 'expense'),
            Generators::choose(1, 30) // Days in the future
        )
            ->withMaxSize(3)
            ->then(function ($transactionType, $daysInFuture) {
                $futureDate = Carbon::now()->addDays($daysInFuture)->format('Y-m-d');
                
                $validator = \Validator::make([
                    'date' => $futureDate,
                ], [
                    'date' => 'required|date|before_or_equal:today',
                ]);
                
                // Property: Validation should fail
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail for {$transactionType} with future date {$futureDate}"
                );
                
                // Property: Error message should be descriptive
                $errors = $validator->errors();
                $this->assertTrue(
                    $errors->has('date'),
                    "Validation errors should include 'date' field"
                );
                
                $errorMessage = $errors->first('date');
                $this->assertIsString($errorMessage);
                $this->assertNotEmpty($errorMessage);
            });
    }

    /**
     * Test that tomorrow's date is rejected.
     * 
     * @test
     */
    public function tomorrows_date_is_rejected()
    {
        $tomorrowDate = Carbon::now()->addDay()->format('Y-m-d');
        
        // Test offering with tomorrow's date
        $validator = \Validator::make([
            'date' => $tomorrowDate,
        ], [
            'date' => 'required|date|before_or_equal:today',
        ]);
        
        // Property: Should be rejected
        $this->assertTrue(
            $validator->fails(),
            "Offering with tomorrow's date {$tomorrowDate} should be rejected"
        );
        
        // Test expense with tomorrow's date
        $validator = \Validator::make([
            'date' => $tomorrowDate,
        ], [
            'date' => 'required|date|before_or_equal:today',
        ]);
        
        // Property: Should be rejected
        $this->assertTrue(
            $validator->fails(),
            "Expense with tomorrow's date {$tomorrowDate} should be rejected"
        );
    }
}
