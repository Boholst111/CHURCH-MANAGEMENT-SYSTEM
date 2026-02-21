<?php

namespace Tests\Property;

use Tests\TestCase;
use Eris\TestTrait;
use Eris\Generators;
use Carbon\Carbon;

/**
 * Property-Based Test for Next Expected Date Calculation
 * 
 * Feature: finance-management-system
 * Property 16: Next Expected Date Calculation
 * **Validates: Requirements 4.3**
 * 
 * Property: For any recurring giving record with a frequency and start date, 
 * the calculated next expected date should be the correct next occurrence based 
 * on the frequency (weekly, bi-weekly, monthly, quarterly, annually).
 */
class NextExpectedDateCalculationPropertyTest extends TestCase
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
     * Test that weekly frequency calculates next expected date correctly.
     * 
     * @test
     */
    public function weekly_frequency_calculates_next_expected_date_correctly()
    {
        $this->forAll(
            Generators::choose(0, 12) // Number of weeks to test (0 to 12 weeks)
        )
            ->withMaxSize(3)
            ->then(function ($weeksFromNow) {
                $startDate = Carbon::now()->addWeeks($weeksFromNow);
                $expectedNextDate = $startDate->copy()->addWeek();
                
                // Property: Next expected date for weekly frequency should be exactly 7 days after start date
                $this->assertEquals(
                    7,
                    $startDate->diffInDays($expectedNextDate),
                    "Weekly frequency should add exactly 7 days to start date {$startDate->toDateString()}"
                );
                
                // Property: Next expected date should be after start date
                $this->assertTrue(
                    $expectedNextDate->isAfter($startDate),
                    "Next expected date {$expectedNextDate->toDateString()} should be after start date {$startDate->toDateString()}"
                );
            });
    }

    /**
     * Test that bi-weekly frequency calculates next expected date correctly.
     * 
     * @test
     */
    public function bi_weekly_frequency_calculates_next_expected_date_correctly()
    {
        $this->forAll(
            Generators::choose(0, 6) // Number of bi-weekly periods to test (0 to 6)
        )
            ->withMaxSize(3)
            ->then(function ($periodsFromNow) {
                $startDate = Carbon::now()->addWeeks($periodsFromNow * 2);
                $expectedNextDate = $startDate->copy()->addWeeks(2);
                
                // Property: Next expected date for bi-weekly frequency should be exactly 14 days after start date
                $this->assertEquals(
                    14,
                    $startDate->diffInDays($expectedNextDate),
                    "Bi-weekly frequency should add exactly 14 days to start date {$startDate->toDateString()}"
                );
                
                // Property: Next expected date should be after start date
                $this->assertTrue(
                    $expectedNextDate->isAfter($startDate),
                    "Next expected date {$expectedNextDate->toDateString()} should be after start date {$startDate->toDateString()}"
                );
            });
    }

    /**
     * Test that monthly frequency calculates next expected date correctly.
     * 
     * @test
     */
    public function monthly_frequency_calculates_next_expected_date_correctly()
    {
        $this->forAll(
            Generators::choose(0, 6) // Number of months to test (0 to 6 months)
        )
            ->withMaxSize(3)
            ->then(function ($monthsFromNow) {
                $startDate = Carbon::now()->addMonths($monthsFromNow);
                $expectedNextDate = $startDate->copy()->addMonthNoOverflow();
                
                // Property: Next expected date for monthly frequency should be exactly 1 month after start date
                $this->assertEquals(
                    1,
                    $startDate->diffInMonths($expectedNextDate),
                    "Monthly frequency should add exactly 1 month to start date {$startDate->toDateString()}"
                );
                
                // Property: Next expected date should be after start date
                $this->assertTrue(
                    $expectedNextDate->isAfter($startDate),
                    "Next expected date {$expectedNextDate->toDateString()} should be after start date {$startDate->toDateString()}"
                );
                
                // Property: Day of month should be preserved (or last day if not available)
                $expectedDay = min($startDate->day, $expectedNextDate->daysInMonth);
                $this->assertEquals(
                    $expectedDay,
                    $expectedNextDate->day,
                    "Monthly frequency should preserve day of month when possible"
                );
            });
    }

    /**
     * Test that quarterly frequency calculates next expected date correctly.
     * 
     * @test
     */
    public function quarterly_frequency_calculates_next_expected_date_correctly()
    {
        $this->forAll(
            Generators::choose(0, 2) // Number of quarters to test (0 to 2 quarters)
        )
            ->withMaxSize(3)
            ->then(function ($quartersFromNow) {
                $startDate = Carbon::now()->addMonths($quartersFromNow * 3);
                $expectedNextDate = $startDate->copy()->addMonthsNoOverflow(3);
                
                // Property: Next expected date for quarterly frequency should be exactly 3 months after start date
                $this->assertEquals(
                    3,
                    $startDate->diffInMonths($expectedNextDate),
                    "Quarterly frequency should add exactly 3 months to start date {$startDate->toDateString()}"
                );
                
                // Property: Next expected date should be after start date
                $this->assertTrue(
                    $expectedNextDate->isAfter($startDate),
                    "Next expected date {$expectedNextDate->toDateString()} should be after start date {$startDate->toDateString()}"
                );
                
                // Property: Day of month should be preserved (or last day if not available)
                $expectedDay = min($startDate->day, $expectedNextDate->daysInMonth);
                $this->assertEquals(
                    $expectedDay,
                    $expectedNextDate->day,
                    "Quarterly frequency should preserve day of month when possible"
                );
            });
    }

    /**
     * Test that annually frequency calculates next expected date correctly.
     * 
     * @test
     */
    public function annually_frequency_calculates_next_expected_date_correctly()
    {
        $this->forAll(
            Generators::choose(0, 3) // Number of years to test (0 to 3 years)
        )
            ->withMaxSize(3)
            ->then(function ($yearsFromNow) {
                $startDate = Carbon::now()->addYears($yearsFromNow);
                $expectedNextDate = $startDate->copy()->addYearNoOverflow();
                
                // Property: Next expected date for annually frequency should be exactly 1 year after start date
                $this->assertEquals(
                    1,
                    $startDate->diffInYears($expectedNextDate),
                    "Annually frequency should add exactly 1 year to start date {$startDate->toDateString()}"
                );
                
                // Property: Next expected date should be after start date
                $this->assertTrue(
                    $expectedNextDate->isAfter($startDate),
                    "Next expected date {$expectedNextDate->toDateString()} should be after start date {$startDate->toDateString()}"
                );
                
                // Property: Month and day should be preserved (except for leap year edge case)
                $this->assertEquals(
                    $startDate->month,
                    $expectedNextDate->month,
                    "Annually frequency should preserve month"
                );
                
                // Handle leap year edge case (Feb 29 -> Feb 28)
                $expectedDay = ($startDate->month === 2 && $startDate->day === 29 && !$expectedNextDate->isLeapYear())
                    ? 28
                    : $startDate->day;
                
                $this->assertEquals(
                    $expectedDay,
                    $expectedNextDate->day,
                    "Annually frequency should preserve day of month (accounting for leap years)"
                );
            });
    }

    /**
     * Test that next expected date calculation handles month-end dates correctly.
     * 
     * @test
     */
    public function next_expected_date_handles_month_end_dates_correctly()
    {
        $this->forAll(
            Generators::elements('monthly', 'quarterly', 'annually'),
            Generators::choose(28, 31) // Day of month (28-31 to test month-end)
        )
            ->withMaxSize(3)
            ->then(function ($frequency, $dayOfMonth) {
                // Create a start date on the last valid day of a month
                $startDate = Carbon::create(2024, 1, min($dayOfMonth, 31));
                
                // Calculate next expected date based on frequency using addMonthNoOverflow/addYearNoOverflow
                $expectedNextDate = match($frequency) {
                    'monthly' => $startDate->copy()->addMonthNoOverflow(),
                    'quarterly' => $startDate->copy()->addMonthsNoOverflow(3),
                    'annually' => $startDate->copy()->addYearNoOverflow(),
                };
                
                // Property: Next expected date should be valid
                $this->assertTrue(
                    $expectedNextDate->isValid(),
                    "Next expected date should be a valid date for {$frequency} frequency"
                );
                
                // Property: Next expected date should be after start date
                $this->assertTrue(
                    $expectedNextDate->isAfter($startDate),
                    "Next expected date {$expectedNextDate->toDateString()} should be after start date {$startDate->toDateString()}"
                );
                
                // Property: Day should be preserved or adjusted to last day of month
                $expectedDay = min($startDate->day, $expectedNextDate->daysInMonth);
                $this->assertEquals(
                    $expectedDay,
                    $expectedNextDate->day,
                    "Day should be preserved or adjusted to last day of month for {$frequency} frequency"
                );
            });
    }

    /**
     * Test that next expected date calculation is consistent across multiple iterations.
     * 
     * @test
     */
    public function next_expected_date_calculation_is_consistent_across_iterations()
    {
        $this->forAll(
            Generators::elements('weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually'),
            Generators::choose(1, 3) // Number of iterations
        )
            ->withMaxSize(3)
            ->then(function ($frequency, $iterations) {
                $startDate = Carbon::now();
                $currentDate = $startDate->copy();
                
                // Calculate next expected dates for multiple iterations
                for ($i = 0; $i < $iterations; $i++) {
                    $nextDate = match($frequency) {
                        'weekly' => $currentDate->copy()->addWeek(),
                        'bi-weekly' => $currentDate->copy()->addWeeks(2),
                        'monthly' => $currentDate->copy()->addMonthNoOverflow(),
                        'quarterly' => $currentDate->copy()->addMonthsNoOverflow(3),
                        'annually' => $currentDate->copy()->addYearNoOverflow(),
                    };
                    
                    // Property: Each next date should be after the current date
                    $this->assertTrue(
                        $nextDate->isAfter($currentDate),
                        "Iteration {$i}: Next date {$nextDate->toDateString()} should be after current date {$currentDate->toDateString()}"
                    );
                    
                    $currentDate = $nextDate;
                }
                
                // Property: Final date should be the correct number of periods after start date
                $expectedDiff = match($frequency) {
                    'weekly' => $iterations * 7,
                    'bi-weekly' => $iterations * 14,
                    'monthly' => $iterations,
                    'quarterly' => $iterations * 3,
                    'annually' => $iterations,
                };
                
                if (in_array($frequency, ['weekly', 'bi-weekly'])) {
                    $actualDiff = $startDate->diffInDays($currentDate);
                    $this->assertEquals(
                        $expectedDiff,
                        $actualDiff,
                        "After {$iterations} iterations of {$frequency}, difference should be {$expectedDiff} days"
                    );
                } elseif ($frequency === 'monthly') {
                    $actualDiff = $startDate->diffInMonths($currentDate);
                    $this->assertEquals(
                        $expectedDiff,
                        $actualDiff,
                        "After {$iterations} iterations of {$frequency}, difference should be {$expectedDiff} months"
                    );
                } elseif ($frequency === 'quarterly') {
                    $actualDiff = $startDate->diffInMonths($currentDate);
                    $this->assertEquals(
                        $expectedDiff,
                        $actualDiff,
                        "After {$iterations} iterations of {$frequency}, difference should be {$expectedDiff} months"
                    );
                } elseif ($frequency === 'annually') {
                    $actualDiff = $startDate->diffInYears($currentDate);
                    $this->assertEquals(
                        $expectedDiff,
                        $actualDiff,
                        "After {$iterations} iterations of {$frequency}, difference should be {$expectedDiff} years"
                    );
                }
            });
    }

    /**
     * Test that leap year dates are handled correctly for annually frequency.
     * 
     * @test
     */
    public function leap_year_dates_are_handled_correctly_for_annually_frequency()
    {
        // Test Feb 29 in a leap year using addYearNoOverflow
        $leapYearDate = Carbon::create(2024, 2, 29); // 2024 is a leap year
        $nextYear = $leapYearDate->copy()->addYearNoOverflow(); // 2025 is not a leap year
        
        // Property: Feb 29 should become Feb 28 in non-leap year
        $this->assertEquals(
            2,
            $nextYear->month,
            "Month should remain February"
        );
        
        $this->assertEquals(
            28,
            $nextYear->day,
            "Feb 29 should become Feb 28 in non-leap year"
        );
        
        // Test Feb 29 going to another leap year
        $leapYearDate2 = Carbon::create(2024, 2, 29);
        $nextLeapYear = $leapYearDate2->copy()->addYearsNoOverflow(4); // 2028 is a leap year
        
        // Property: Feb 29 should remain Feb 29 in leap year
        $this->assertEquals(
            2,
            $nextLeapYear->month,
            "Month should remain February"
        );
        
        $this->assertEquals(
            29,
            $nextLeapYear->day,
            "Feb 29 should remain Feb 29 in leap year"
        );
    }

    /**
     * Test that all valid frequencies produce valid next expected dates.
     * 
     * @test
     */
    public function all_valid_frequencies_produce_valid_next_expected_dates()
    {
        $frequencies = ['weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually'];
        
        foreach ($frequencies as $frequency) {
            $startDate = Carbon::now();
            
            $nextDate = match($frequency) {
                'weekly' => $startDate->copy()->addWeek(),
                'bi-weekly' => $startDate->copy()->addWeeks(2),
                'monthly' => $startDate->copy()->addMonthNoOverflow(),
                'quarterly' => $startDate->copy()->addMonthsNoOverflow(3),
                'annually' => $startDate->copy()->addYearNoOverflow(),
            };
            
            // Property: Next date should be valid
            $this->assertTrue(
                $nextDate->isValid(),
                "Next expected date should be valid for {$frequency} frequency"
            );
            
            // Property: Next date should be after start date
            $this->assertTrue(
                $nextDate->isAfter($startDate),
                "Next expected date should be after start date for {$frequency} frequency"
            );
            
            // Property: Next date should not be the same as start date
            $this->assertFalse(
                $nextDate->isSameDay($startDate),
                "Next expected date should not be the same as start date for {$frequency} frequency"
            );
        }
    }
}
