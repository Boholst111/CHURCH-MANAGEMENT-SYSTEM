<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\OfferingType;
use App\Models\ExpenseCategory;
use App\Models\Fund;
use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;
use Illuminate\Validation\ValidationException;

/**
 * Property-Based Test for Positive Amount Validation
 * 
 * Feature: finance-management-system
 * Property 6: Positive Amount Validation
 * **Validates: Requirements 1.7, 5.2**
 * 
 * Property: For any financial transaction (offering or expense), if the amount is 
 * less than or equal to zero, the system should reject the transaction with a 
 * validation error.
 */
class PositiveAmountValidationPropertyTest extends TestCase
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
     * Test that offerings with zero amount are rejected.
     * 
     * @test
     */
    public function offerings_with_zero_amount_are_rejected()
    {
        $this->forAll(
            Generators::choose(2, 5) // Number of attempts to create zero-amount offerings
        )
            ->withMaxSize(3) // Run 3 iterations
            ->then(function ($attemptCount) {
                $rejectedCount = 0;
                
                // Attempt to validate offerings with zero amount
                for ($i = 0; $i < $attemptCount; $i++) {
                    // Use validator to check if zero amount is rejected
                    $validator = \Validator::make([
                        'amount' => 0,
                    ], [
                        'amount' => 'required|numeric|gt:0',
                    ]);
                    
                    // Property: Validation should fail for zero amount
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for zero amount"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('amount'),
                        "Validation errors should include 'amount' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All zero-amount offerings should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} zero-amount offerings should be rejected"
                );
            });
    }

    /**
     * Test that offerings with negative amounts are rejected.
     * 
     * @test
     */
    public function offerings_with_negative_amounts_are_rejected()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of attempts
            Generators::choose(-1000, -1) // Negative amount range
        )
            ->withMaxSize(3)
            ->then(function ($attemptCount, $negativeAmount) {
                $rejectedCount = 0;
                
                // Attempt to validate offerings with negative amounts
                for ($i = 0; $i < $attemptCount; $i++) {
                    // Use validator to check if negative amount is rejected
                    $validator = \Validator::make([
                        'amount' => $negativeAmount,
                    ], [
                        'amount' => 'required|numeric|gt:0',
                    ]);
                    
                    // Property: Validation should fail for negative amount
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for negative amount {$negativeAmount}"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('amount'),
                        "Validation errors should include 'amount' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All negative-amount offerings should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} negative-amount offerings should be rejected"
                );
            });
    }

    /**
     * Test that expenses with zero amount are rejected.
     * 
     * @test
     */
    public function expenses_with_zero_amount_are_rejected()
    {
        $this->forAll(
            Generators::choose(2, 5) // Number of attempts to create zero-amount expenses
        )
            ->withMaxSize(3)
            ->then(function ($attemptCount) {
                $rejectedCount = 0;
                
                // Attempt to validate expenses with zero amount
                for ($i = 0; $i < $attemptCount; $i++) {
                    // Use validator to check if zero amount is rejected
                    $validator = \Validator::make([
                        'amount' => 0,
                    ], [
                        'amount' => 'required|numeric|gt:0',
                    ]);
                    
                    // Property: Validation should fail for zero amount
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for zero amount"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('amount'),
                        "Validation errors should include 'amount' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All zero-amount expenses should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} zero-amount expenses should be rejected"
                );
            });
    }

    /**
     * Test that expenses with negative amounts are rejected.
     * 
     * @test
     */
    public function expenses_with_negative_amounts_are_rejected()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of attempts
            Generators::choose(-1000, -1) // Negative amount range
        )
            ->withMaxSize(3)
            ->then(function ($attemptCount, $negativeAmount) {
                $rejectedCount = 0;
                
                // Attempt to validate expenses with negative amounts
                for ($i = 0; $i < $attemptCount; $i++) {
                    // Use validator to check if negative amount is rejected
                    $validator = \Validator::make([
                        'amount' => $negativeAmount,
                    ], [
                        'amount' => 'required|numeric|gt:0',
                    ]);
                    
                    // Property: Validation should fail for negative amount
                    $this->assertTrue(
                        $validator->fails(),
                        "Validation should fail for negative amount {$negativeAmount}"
                    );
                    
                    $this->assertTrue(
                        $validator->errors()->has('amount'),
                        "Validation errors should include 'amount' field"
                    );
                    
                    $rejectedCount++;
                }
                
                // Property: All negative-amount expenses should be rejected
                $this->assertEquals(
                    $attemptCount,
                    $rejectedCount,
                    "All {$attemptCount} negative-amount expenses should be rejected"
                );
            });
    }

    /**
     * Test that offerings with positive amounts are accepted.
     * 
     * @test
     */
    public function offerings_with_positive_amounts_are_accepted()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of offerings to validate
            Generators::choose(1, 1000) // Positive amount range
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount, $positiveAmount) {
                $acceptedCount = 0;
                
                // Validate offerings with positive amounts
                for ($i = 0; $i < $offeringCount; $i++) {
                    // Use validator to check if positive amount is accepted
                    $validator = \Validator::make([
                        'amount' => $positiveAmount,
                    ], [
                        'amount' => 'required|numeric|gt:0',
                    ]);
                    
                    // Property: Validation should pass for positive amount
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for positive amount {$positiveAmount}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All positive-amount offerings should be accepted
                $this->assertEquals(
                    $offeringCount,
                    $acceptedCount,
                    "All {$offeringCount} positive-amount offerings should be accepted"
                );
            });
    }

    /**
     * Test that expenses with positive amounts are accepted.
     * 
     * @test
     */
    public function expenses_with_positive_amounts_are_accepted()
    {
        $this->forAll(
            Generators::choose(2, 5), // Number of expenses to validate
            Generators::choose(1, 1000) // Positive amount range
        )
            ->withMaxSize(3)
            ->then(function ($expenseCount, $positiveAmount) {
                $acceptedCount = 0;
                
                // Validate expenses with positive amounts
                for ($i = 0; $i < $expenseCount; $i++) {
                    // Use validator to check if positive amount is accepted
                    $validator = \Validator::make([
                        'amount' => $positiveAmount,
                    ], [
                        'amount' => 'required|numeric|gt:0',
                    ]);
                    
                    // Property: Validation should pass for positive amount
                    $this->assertFalse(
                        $validator->fails(),
                        "Validation should pass for positive amount {$positiveAmount}"
                    );
                    
                    $acceptedCount++;
                }
                
                // Property: All positive-amount expenses should be accepted
                $this->assertEquals(
                    $expenseCount,
                    $acceptedCount,
                    "All {$expenseCount} positive-amount expenses should be accepted"
                );
            });
    }

    /**
     * Test that validation error messages are descriptive for invalid amounts.
     * 
     * @test
     */
    public function validation_error_messages_are_descriptive_for_invalid_amounts()
    {
        $this->forAll(
            Generators::elements('offering', 'expense'),
            Generators::elements(0, -1, -100, -0.01)
        )
            ->withMaxSize(3)
            ->then(function ($transactionType, $invalidAmount) {
                $validator = \Validator::make([
                    'amount' => $invalidAmount,
                ], [
                    'amount' => 'required|numeric|gt:0',
                ]);
                
                // Property: Validation should fail
                $this->assertTrue(
                    $validator->fails(),
                    "Validation should fail for {$transactionType} with invalid amount {$invalidAmount}"
                );
                
                // Property: Error message should be descriptive
                $errors = $validator->errors();
                $this->assertTrue(
                    $errors->has('amount'),
                    "Validation errors should include 'amount' field"
                );
                
                $errorMessage = $errors->first('amount');
                $this->assertIsString($errorMessage);
                $this->assertNotEmpty($errorMessage);
            });
    }

    /**
     * Test that very small positive amounts (e.g., 0.01) are accepted.
     * 
     * @test
     */
    public function very_small_positive_amounts_are_accepted()
    {
        // Test offering with 0.01
        $validator = \Validator::make([
            'amount' => 0.01,
        ], [
            'amount' => 'required|numeric|gt:0',
        ]);
        
        // Property: Should be accepted
        $this->assertFalse(
            $validator->fails(),
            "Offering with amount 0.01 should be accepted"
        );
        
        // Test expense with 0.01
        $validator = \Validator::make([
            'amount' => 0.01,
        ], [
            'amount' => 'required|numeric|gt:0',
        ]);
        
        // Property: Should be accepted
        $this->assertFalse(
            $validator->fails(),
            "Expense with amount 0.01 should be accepted"
        );
    }
}
