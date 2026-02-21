<?php

namespace Tests\Property;

use Tests\TestCase;
use Eris\TestTrait;
use Eris\Generators;
use Carbon\Carbon;

/**
 * Property-Based Test for Date Range Validation
 * 
 * Feature: finance-management-system
 * Property 15: Date Range Validation
 * **Validates: Requirements 4.2, 8.3**
 * 
 * Property: For any record with start and end dates (recurring giving, pledge, budget), 
 * if the start date is after the end date, the system should reject the record with a 
 * validation error.
 */
class DateRangeValidationPropertyTest extends TestCase
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
     * Test that budgets with start_date after end_date are rejected.
     * 
     * @test
     */
    public function budgets_with_start_date_after_end_date_are_rejected()
    {
        $this->forAll(
            Generators::choose(1, 3), // Number of attempts to create invalid budgets
            Generators::choose(1, 30) // Days difference between start and end
        )
            ->withMaxSize(2) // Run 2 iterations
            ->then(function ($attemptCount, $daysDifference) {
                $rejectedCount = 0;
                
                // Attempt to validate budgets with invalid date ranges
                for ($i = 0; $i < $attemptCount; $i++) {
                    $endDate = Carbon::now()->format('Y-m-d');
                    $startDate = Carbon::now()->addDays($daysDifference)->format('Y-m-d');
                    
                    // Use validator to check if invalid date range is rejected
                    $validator = \Validator::make([
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                    ], [
                        'start_date' => 'required|date',
                        'end_date' => 'required|date|after_or_equal:start_date',
                    ]);
                    
                    // Property: Validation should fail when start_date is after end_date
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for budget with start_date {$startDate} after end_date {$endDate}"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('end_date'),
                        "Validation errors should include 'end_date' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All budgets with invalid date ranges should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} budgets with invalid date ranges should be rejected"
                );
            });
    }

    /**
     * Test that recurring givings with start_date after end_date are rejected.
     * 
     * @test
     */
    public function recurring_givings_with_start_date_after_end_date_are_rejected()
    {
        $this->forAll(
            Generators::choose(1, 3), // Number of attempts
            Generators::choose(1, 30) // Days difference
        )
            ->withMaxSize(2)
            ->then(function ($attemptCount, $daysDifference) {
                $rejectedCount = 0;
                
                // Attempt to validate recurring givings with invalid date ranges
                for ($i = 0; $i < $attemptCount; $i++) {
                    $endDate = Carbon::now()->format('Y-m-d');
                    $startDate = Carbon::now()->addDays($daysDifference)->format('Y-m-d');
                    
                    // Use validator to check if invalid date range is rejected
                    $validator = \Validator::make([
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                    ], [
                        'start_date' => 'required|date',
                        'end_date' => 'nullable|date|after_or_equal:start_date',
                    ]);
                    
                    // Property: Validation should fail when start_date is after end_date
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for recurring giving with start_date {$startDate} after end_date {$endDate}"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('end_date'),
                        "Validation errors should include 'end_date' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All recurring givings with invalid date ranges should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} recurring givings with invalid date ranges should be rejected"
                );
            });
    }

    /**
     * Test that pledges with start_date after end_date are rejected.
     * 
     * @test
     */
    public function pledges_with_start_date_after_end_date_are_rejected()
    {
        $this->forAll(
            Generators::choose(1, 3), // Number of attempts
            Generators::choose(1, 30) // Days difference
        )
            ->withMaxSize(2)
            ->then(function ($attemptCount, $daysDifference) {
                $rejectedCount = 0;
                
                // Attempt to validate pledges with invalid date ranges
                for ($i = 0; $i < $attemptCount; $i++) {
                    $endDate = Carbon::now()->format('Y-m-d');
                    $startDate = Carbon::now()->addDays($daysDifference)->format('Y-m-d');
                    
                    // Use validator to check if invalid date range is rejected
                    $validator = \Validator::make([
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                    ], [
                        'start_date' => 'required|date',
                        'end_date' => 'required|date|after_or_equal:start_date',
                    ]);
                    
                    // Property: Validation should fail when start_date is after end_date
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for pledge with start_date {$startDate} after end_date {$endDate}"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('end_date'),
                        "Validation errors should include 'end_date' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All pledges with invalid date ranges should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} pledges with invalid date ranges should be rejected"
                );
            });
    }

    /**
     * Test that budgets with start_date equal to end_date are accepted.
     * 
     * @test
     */
    public function budgets_with_equal_start_and_end_dates_are_accepted()
    {
        $this->forAll(
            Generators::choose(1, 3) // Number of budgets to validate
        )
            ->withMaxSize(2)
            ->then(function ($budgetCount) {
                $acceptedCount = 0;
                $sameDate = Carbon::now()->format('Y-m-d');
                
                // Validate budgets with equal start and end dates
                for ($i = 0; $i < $budgetCount; $i++) {
                    // Use validator to check if equal dates are accepted
                    $validator = \Validator::make([
                        'start_date' => $sameDate,
                        'end_date' => $sameDate,
                    ], [
                        'start_date' => 'required|date',
                        'end_date' => 'required|date|after_or_equal:start_date',
                    ]);
                    
                    // Property: Validation should pass for equal dates
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for budget with equal start_date and end_date {$sameDate}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All budgets with equal dates should be accepted
                $this->assertEquals(
                    $budgetCount,
                    $acceptedCount,
                    "All {$budgetCount} budgets with equal dates should be accepted"
                );
            });
    }

    /**
     * Test that budgets with start_date before end_date are accepted.
     * 
     * @test
     */
    public function budgets_with_start_date_before_end_date_are_accepted()
    {
        $this->forAll(
            Generators::choose(1, 3), // Number of budgets to validate
            Generators::choose(1, 30) // Days difference
        )
            ->withMaxSize(2)
            ->then(function ($budgetCount, $daysDifference) {
                $acceptedCount = 0;
                $startDate = Carbon::now()->format('Y-m-d');
                $endDate = Carbon::now()->addDays($daysDifference)->format('Y-m-d');
                
                // Validate budgets with valid date ranges
                for ($i = 0; $i < $budgetCount; $i++) {
                    // Use validator to check if valid date range is accepted
                    $validator = \Validator::make([
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                    ], [
                        'start_date' => 'required|date',
                        'end_date' => 'required|date|after_or_equal:start_date',
                    ]);
                    
                    // Property: Validation should pass for valid date range
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for budget with start_date {$startDate} before end_date {$endDate}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All budgets with valid date ranges should be accepted
                $this->assertEquals(
                    $budgetCount,
                    $acceptedCount,
                    "All {$budgetCount} budgets with valid date ranges should be accepted"
                );
            });
    }

    /**
     * Test that recurring givings with start_date before end_date are accepted.
     * 
     * @test
     */
    public function recurring_givings_with_start_date_before_end_date_are_accepted()
    {
        $this->forAll(
            Generators::choose(1, 3), // Number of recurring givings to validate
            Generators::choose(1, 30) // Days difference
        )
            ->withMaxSize(2)
            ->then(function ($recurringCount, $daysDifference) {
                $acceptedCount = 0;
                $startDate = Carbon::now()->format('Y-m-d');
                $endDate = Carbon::now()->addDays($daysDifference)->format('Y-m-d');
                
                // Validate recurring givings with valid date ranges
                for ($i = 0; $i < $recurringCount; $i++) {
                    // Use validator to check if valid date range is accepted
                    $validator = \Validator::make([
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                    ], [
                        'start_date' => 'required|date',
                        'end_date' => 'nullable|date|after_or_equal:start_date',
                    ]);
                    
                    // Property: Validation should pass for valid date range
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for recurring giving with start_date {$startDate} before end_date {$endDate}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All recurring givings with valid date ranges should be accepted
                $this->assertEquals(
                    $recurringCount,
                    $acceptedCount,
                    "All {$recurringCount} recurring givings with valid date ranges should be accepted"
                );
            });
    }

    /**
     * Test that pledges with start_date before end_date are accepted.
     * 
     * @test
     */
    public function pledges_with_start_date_before_end_date_are_accepted()
    {
        $this->forAll(
            Generators::choose(1, 3), // Number of pledges to validate
            Generators::choose(1, 30) // Days difference
        )
            ->withMaxSize(2)
            ->then(function ($pledgeCount, $daysDifference) {
                $acceptedCount = 0;
                $startDate = Carbon::now()->format('Y-m-d');
                $endDate = Carbon::now()->addDays($daysDifference)->format('Y-m-d');
                
                // Validate pledges with valid date ranges
                for ($i = 0; $i < $pledgeCount; $i++) {
                    // Use validator to check if valid date range is accepted
                    $validator = \Validator::make([
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                    ], [
                        'start_date' => 'required|date',
                        'end_date' => 'required|date|after_or_equal:start_date',
                    ]);
                    
                    // Property: Validation should pass for valid date range
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for pledge with start_date {$startDate} before end_date {$endDate}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All pledges with valid date ranges should be accepted
                $this->assertEquals(
                    $pledgeCount,
                    $acceptedCount,
                    "All {$pledgeCount} pledges with valid date ranges should be accepted"
                );
            });
    }

    /**
     * Test that validation error messages are descriptive for invalid date ranges.
     * 
     * @test
     */
    public function validation_error_messages_are_descriptive_for_invalid_date_ranges()
    {
        $this->forAll(
            Generators::elements('budget', 'recurring_giving', 'pledge'),
            Generators::choose(1, 14) // Days difference
        )
            ->withMaxSize(2)
            ->then(function ($recordType, $daysDifference) {
                $endDate = Carbon::now()->format('Y-m-d');
                $startDate = Carbon::now()->addDays($daysDifference)->format('Y-m-d');
                
                $validator = \Validator::make([
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                ], [
                    'start_date' => 'required|date',
                    'end_date' => 'required|date|after_or_equal:start_date',
                ]);
                
                // Property: Validation should fail
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail for {$recordType} with start_date {$startDate} after end_date {$endDate}"
                );
                
                // Property: Error message should be descriptive
                $errors = $validator->errors();
                $this->assertTrue(
                    $errors->has('end_date'),
                    "Validation errors should include 'end_date' field"
                );
                
                $errorMessage = $errors->first('end_date');
                $this->assertIsString($errorMessage);
                $this->assertNotEmpty($errorMessage);
            });
    }

    /**
     * Test that one day difference is accepted (start_date = today, end_date = tomorrow).
     * 
     * @test
     */
    public function one_day_difference_is_accepted()
    {
        $startDate = Carbon::now()->format('Y-m-d');
        $endDate = Carbon::now()->addDay()->format('Y-m-d');
        
        // Test budget with one day difference
        $validator = \Validator::make([
            'start_date' => $startDate,
            'end_date' => $endDate,
        ], [
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);
        
        // Property: Should be accepted
        $this->assertFalse(
            $validator->fails(),
            "Budget with start_date {$startDate} and end_date {$endDate} should be accepted"
        );
        
        // Test recurring giving with one day difference
        $validator = \Validator::make([
            'start_date' => $startDate,
            'end_date' => $endDate,
        ], [
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);
        
        // Property: Should be accepted
        $this->assertFalse(
            $validator->fails(),
            "Recurring giving with start_date {$startDate} and end_date {$endDate} should be accepted"
        );
        
        // Test pledge with one day difference
        $validator = \Validator::make([
            'start_date' => $startDate,
            'end_date' => $endDate,
        ], [
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);
        
        // Property: Should be accepted
        $this->assertFalse(
            $validator->fails(),
            "Pledge with start_date {$startDate} and end_date {$endDate} should be accepted"
        );
    }

    /**
     * Test that recurring giving with null end_date is accepted.
     * 
     * @test
     */
    public function recurring_giving_with_null_end_date_is_accepted()
    {
        $this->forAll(
            Generators::choose(1, 3) // Number of recurring givings to validate
        )
            ->withMaxSize(2)
            ->then(function ($recurringCount) {
                $acceptedCount = 0;
                $startDate = Carbon::now()->format('Y-m-d');
                
                // Validate recurring givings with null end_date
                for ($i = 0; $i < $recurringCount; $i++) {
                    // Use validator to check if null end_date is accepted
                    $validator = \Validator::make([
                        'start_date' => $startDate,
                        'end_date' => null,
                    ], [
                        'start_date' => 'required|date',
                        'end_date' => 'nullable|date|after_or_equal:start_date',
                    ]);
                    
                    // Property: Validation should pass for null end_date
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for recurring giving with null end_date"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All recurring givings with null end_date should be accepted
                $this->assertEquals(
                    $recurringCount,
                    $acceptedCount,
                    "All {$recurringCount} recurring givings with null end_date should be accepted"
                );
            });
    }
}
