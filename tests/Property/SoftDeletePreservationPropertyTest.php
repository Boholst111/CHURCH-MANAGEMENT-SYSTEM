<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\Vendor;
use App\Models\OfferingType;
use App\Models\ExpenseCategory;
use App\Models\Fund;
use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Soft Delete Preservation
 * 
 * Feature: finance-management-system
 * Property 3: Soft Delete Preservation
 * **Validates: Requirements 1.3, 5.8**
 * 
 * Property: For any financial record deletion (offering, expense, vendor), 
 * the record should remain in the database with a deleted_at timestamp and 
 * should not appear in standard queries but should be accessible in audit trails.
 */
class SoftDeletePreservationPropertyTest extends TestCase
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
        
        // Create and authenticate a user
        $this->user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($this->user);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }
    
    /**
     * Get or create required related records.
     */
    protected function getRequiredRecords(): array
    {
        $offeringType = OfferingType::firstOrCreate(
            ['name' => 'Tithe'],
            ['description' => 'Regular tithe offering', 'is_active' => true]
        );
        
        $expenseCategory = ExpenseCategory::firstOrCreate(
            ['name' => 'Utilities'],
            ['description' => 'Utility expenses', 'is_active' => true]
        );
        
        $fund = Fund::firstOrCreate(
            ['name' => 'General Fund'],
            ['type' => 'unrestricted', 'description' => 'General church fund', 'current_balance' => 0, 'is_active' => true]
        );
        
        $member = Member::first();
        if (!$member) {
            $member = Member::factory()->create();
        }
        
        return [$offeringType, $expenseCategory, $fund, $member];
    }

    /**
     * Test that deleted offerings remain in database with deleted_at timestamp.
     * 
     * @test
     */
    public function deleted_offerings_remain_in_database_with_timestamp()
    {
        $this->forAll(
            Generators::choose(1, 5) // Number of offerings to create and delete
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                // Clean database
                Offering::withTrashed()->forceDelete();
                
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $createdIds = [];
                
                // Create offerings
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    $createdIds[] = $offering->id;
                }
                
                // Delete all offerings
                foreach ($createdIds as $id) {
                    $offering = Offering::find($id);
                    $offering->delete();
                }
                
                // Property: Records should remain in database
                foreach ($createdIds as $id) {
                    $deletedOffering = Offering::withTrashed()->find($id);
                    
                    $this->assertNotNull(
                        $deletedOffering,
                        "Deleted offering with ID {$id} should still exist in database"
                    );
                    
                    $this->assertNotNull(
                        $deletedOffering->deleted_at,
                        "Deleted offering should have deleted_at timestamp"
                    );
                    
                    $this->assertInstanceOf(
                        \Illuminate\Support\Carbon::class,
                        $deletedOffering->deleted_at,
                        "deleted_at should be a Carbon instance"
                    );
                }
                
                // Verify count with trashed
                $totalWithTrashed = Offering::withTrashed()->count();
                $this->assertEquals(
                    $offeringCount,
                    $totalWithTrashed,
                    "All offerings should exist when including trashed"
                );
            });
    }

    /**
     * Test that soft deleted offerings do not appear in standard queries.
     * 
     * @test
     */
    public function soft_deleted_offerings_not_in_standard_queries()
    {
        $this->forAll(
            Generators::choose(2, 6), // Total offerings
            Generators::choose(1, 3)  // Offerings to delete
        )
            ->withMaxSize(3)
            ->then(function ($totalCount, $deleteCount) {
                if ($deleteCount > $totalCount) {
                    $deleteCount = $totalCount;
                }
                
                // Clean database
                Offering::withTrashed()->forceDelete();
                
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $allIds = [];
                
                // Create offerings
                for ($i = 0; $i < $totalCount; $i++) {
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
                
                // Delete some offerings
                $idsToDelete = array_slice($allIds, 0, $deleteCount);
                foreach ($idsToDelete as $id) {
                    Offering::find($id)->delete();
                }
                
                // Property: Standard queries should not return deleted records
                $standardQueryCount = Offering::count();
                $expectedCount = $totalCount - $deleteCount;
                
                $this->assertEquals(
                    $expectedCount,
                    $standardQueryCount,
                    "Standard query should return only non-deleted offerings"
                );
                
                // Verify deleted offerings are not in standard query
                foreach ($idsToDelete as $id) {
                    $offering = Offering::find($id);
                    $this->assertNull(
                        $offering,
                        "Deleted offering {$id} should not be found in standard query"
                    );
                }
                
                // Verify non-deleted offerings are in standard query
                $remainingIds = array_slice($allIds, $deleteCount);
                foreach ($remainingIds as $id) {
                    $offering = Offering::find($id);
                    $this->assertNotNull(
                        $offering,
                        "Non-deleted offering {$id} should be found in standard query"
                    );
                }
            });
    }

    /**
     * Test that deleted expenses remain in database with deleted_at timestamp.
     * 
     * @test
     */
    public function deleted_expenses_remain_in_database_with_timestamp()
    {
        $this->forAll(
            Generators::choose(1, 5) // Number of expenses to create and delete
        )
            ->withMaxSize(3)
            ->then(function ($expenseCount) {
                // Clean database
                Expense::withTrashed()->forceDelete();
                
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $createdIds = [];
                
                // Create expenses
                for ($i = 0; $i < $expenseCount; $i++) {
                    $expense = Expense::create([
                        'expense_category_id' => $expenseCategory->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'date' => now()->format('Y-m-d'),
                        'description' => 'Test expense ' . $i,
                        'approval_status' => 'pending',
                    ]);
                    $createdIds[] = $expense->id;
                }
                
                // Delete all expenses
                foreach ($createdIds as $id) {
                    Expense::find($id)->delete();
                }
                
                // Property: Records should remain in database
                foreach ($createdIds as $id) {
                    $deletedExpense = Expense::withTrashed()->find($id);
                    
                    $this->assertNotNull(
                        $deletedExpense,
                        "Deleted expense with ID {$id} should still exist in database"
                    );
                    
                    $this->assertNotNull(
                        $deletedExpense->deleted_at,
                        "Deleted expense should have deleted_at timestamp"
                    );
                }
                
                // Verify count with trashed
                $totalWithTrashed = Expense::withTrashed()->count();
                $this->assertEquals(
                    $expenseCount,
                    $totalWithTrashed,
                    "All expenses should exist when including trashed"
                );
            });
    }

    /**
     * Test that soft deleted expenses do not appear in standard queries.
     * 
     * @test
     */
    public function soft_deleted_expenses_not_in_standard_queries()
    {
        $this->forAll(
            Generators::choose(2, 6), // Total expenses
            Generators::choose(1, 3)  // Expenses to delete
        )
            ->withMaxSize(3)
            ->then(function ($totalCount, $deleteCount) {
                if ($deleteCount > $totalCount) {
                    $deleteCount = $totalCount;
                }
                
                // Clean database
                Expense::withTrashed()->forceDelete();
                
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $allIds = [];
                
                // Create expenses
                for ($i = 0; $i < $totalCount; $i++) {
                    $expense = Expense::create([
                        'expense_category_id' => $expenseCategory->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'date' => now()->format('Y-m-d'),
                        'description' => 'Test expense ' . $i,
                        'approval_status' => 'pending',
                    ]);
                    $allIds[] = $expense->id;
                }
                
                // Delete some expenses
                $idsToDelete = array_slice($allIds, 0, $deleteCount);
                foreach ($idsToDelete as $id) {
                    Expense::find($id)->delete();
                }
                
                // Property: Standard queries should not return deleted records
                $standardQueryCount = Expense::count();
                $expectedCount = $totalCount - $deleteCount;
                
                $this->assertEquals(
                    $expectedCount,
                    $standardQueryCount,
                    "Standard query should return only non-deleted expenses"
                );
                
                // Verify deleted expenses are not in standard query
                foreach ($idsToDelete as $id) {
                    $this->assertNull(
                        Expense::find($id),
                        "Deleted expense {$id} should not be found in standard query"
                    );
                }
            });
    }

    /**
     * Test that deleted vendors remain in database with deleted_at timestamp.
     * 
     * @test
     */
    public function deleted_vendors_remain_in_database_with_timestamp()
    {
        $this->forAll(
            Generators::choose(1, 5) // Number of vendors to create and delete
        )
            ->withMaxSize(3)
            ->then(function ($vendorCount) {
                // Clean database
                Vendor::withTrashed()->forceDelete();
                
                $createdIds = [];
                
                // Create vendors
                for ($i = 0; $i < $vendorCount; $i++) {
                    $vendor = Vendor::create([
                        'name' => 'Vendor ' . uniqid(),
                        'contact_name' => 'Contact ' . $i,
                        'email' => 'vendor' . $i . '@example.com',
                        'phone' => '123-456-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                        'is_active' => true,
                    ]);
                    $createdIds[] = $vendor->id;
                }
                
                // Delete all vendors
                foreach ($createdIds as $id) {
                    Vendor::find($id)->delete();
                }
                
                // Property: Records should remain in database
                foreach ($createdIds as $id) {
                    $deletedVendor = Vendor::withTrashed()->find($id);
                    
                    $this->assertNotNull(
                        $deletedVendor,
                        "Deleted vendor with ID {$id} should still exist in database"
                    );
                    
                    $this->assertNotNull(
                        $deletedVendor->deleted_at,
                        "Deleted vendor should have deleted_at timestamp"
                    );
                }
                
                // Verify count with trashed
                $totalWithTrashed = Vendor::withTrashed()->count();
                $this->assertEquals(
                    $vendorCount,
                    $totalWithTrashed,
                    "All vendors should exist when including trashed"
                );
            });
    }

    /**
     * Test that soft deleted vendors do not appear in standard queries.
     * 
     * @test
     */
    public function soft_deleted_vendors_not_in_standard_queries()
    {
        $this->forAll(
            Generators::choose(2, 6), // Total vendors
            Generators::choose(1, 3)  // Vendors to delete
        )
            ->withMaxSize(3)
            ->then(function ($totalCount, $deleteCount) {
                if ($deleteCount > $totalCount) {
                    $deleteCount = $totalCount;
                }
                
                // Clean database
                Vendor::withTrashed()->forceDelete();
                
                $allIds = [];
                
                // Create vendors
                for ($i = 0; $i < $totalCount; $i++) {
                    $vendor = Vendor::create([
                        'name' => 'Vendor ' . uniqid(),
                        'contact_name' => 'Contact ' . $i,
                        'email' => 'vendor' . $i . '@example.com',
                        'is_active' => true,
                    ]);
                    $allIds[] = $vendor->id;
                }
                
                // Delete some vendors
                $idsToDelete = array_slice($allIds, 0, $deleteCount);
                foreach ($idsToDelete as $id) {
                    Vendor::find($id)->delete();
                }
                
                // Property: Standard queries should not return deleted records
                $standardQueryCount = Vendor::count();
                $expectedCount = $totalCount - $deleteCount;
                
                $this->assertEquals(
                    $expectedCount,
                    $standardQueryCount,
                    "Standard query should return only non-deleted vendors"
                );
                
                // Verify deleted vendors are not in standard query
                foreach ($idsToDelete as $id) {
                    $this->assertNull(
                        Vendor::find($id),
                        "Deleted vendor {$id} should not be found in standard query"
                    );
                }
            });
    }

    /**
     * Test that soft deleted records preserve all original data.
     * 
     * @test
     */
    public function soft_deleted_records_preserve_original_data()
    {
        $this->forAll(
            Generators::choose(1, 3) // Number of offerings to test
        )
            ->withMaxSize(3)
            ->then(function ($offeringCount) {
                // Clean database
                Offering::withTrashed()->forceDelete();
                
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $originalData = [];
                
                // Create and store original data
                for ($i = 0; $i < $offeringCount; $i++) {
                    $amount = rand(10, 1000);
                    $notes = 'Test offering ' . uniqid();
                    
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => $amount,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'notes' => $notes,
                        'is_anonymous' => false,
                    ]);
                    
                    $originalData[$offering->id] = [
                        'amount' => $amount,
                        'notes' => $notes,
                        'member_id' => $member->id,
                    ];
                }
                
                // Delete offerings
                foreach (array_keys($originalData) as $id) {
                    Offering::find($id)->delete();
                }
                
                // Property: Deleted records should preserve all original data
                foreach ($originalData as $id => $data) {
                    $deletedOffering = Offering::withTrashed()->find($id);
                    
                    $this->assertEquals(
                        $data['amount'],
                        $deletedOffering->amount,
                        "Deleted offering should preserve original amount"
                    );
                    
                    $this->assertEquals(
                        $data['notes'],
                        $deletedOffering->notes,
                        "Deleted offering should preserve original notes"
                    );
                    
                    $this->assertEquals(
                        $data['member_id'],
                        $deletedOffering->member_id,
                        "Deleted offering should preserve original member_id"
                    );
                }
            });
    }

    /**
     * Test that multiple deletions maintain separate deleted_at timestamps.
     * 
     * @test
     */
    public function multiple_deletions_maintain_separate_timestamps()
    {
        // Clean database
        Offering::withTrashed()->forceDelete();
        
        [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
        
        $offerings = [];
        
        // Create offerings
        for ($i = 0; $i < 3; $i++) {
            $offerings[] = Offering::create([
                'member_id' => $member->id,
                'offering_type_id' => $offeringType->id,
                'fund_id' => $fund->id,
                'amount' => 100,
                'payment_method' => 'cash',
                'date' => now()->format('Y-m-d'),
                'is_anonymous' => false,
            ]);
        }
        
        // Delete offerings at different times
        $deletedTimestamps = [];
        foreach ($offerings as $offering) {
            $offering->delete();
            $deletedTimestamps[$offering->id] = Offering::withTrashed()->find($offering->id)->deleted_at;
            sleep(1); // Ensure different timestamps
        }
        
        // Property: Each deletion should have its own timestamp
        $uniqueTimestamps = array_unique(array_map(fn($ts) => $ts->timestamp, $deletedTimestamps));
        
        $this->assertCount(
            count($offerings),
            $uniqueTimestamps,
            "Each deleted offering should have a unique deleted_at timestamp"
        );
    }

    /**
     * Test that onlyTrashed query returns only soft deleted records.
     * 
     * @test
     */
    public function only_trashed_query_returns_only_deleted_records()
    {
        $this->forAll(
            Generators::choose(2, 5), // Active offerings
            Generators::choose(1, 3)  // Deleted offerings
        )
            ->withMaxSize(3)
            ->then(function ($activeCount, $deletedCount) {
                // Clean database
                Offering::withTrashed()->forceDelete();
                
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                // Create active offerings
                for ($i = 0; $i < $activeCount; $i++) {
                    Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => 100,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                }
                
                // Create and delete offerings
                for ($i = 0; $i < $deletedCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => 200,
                        'payment_method' => 'online',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    $offering->delete();
                }
                
                // Property: onlyTrashed should return only deleted records
                $trashedCount = Offering::onlyTrashed()->count();
                
                $this->assertEquals(
                    $deletedCount,
                    $trashedCount,
                    "onlyTrashed query should return only soft deleted offerings"
                );
                
                // Verify all trashed records have deleted_at
                $trashedOfferings = Offering::onlyTrashed()->get();
                foreach ($trashedOfferings as $offering) {
                    $this->assertNotNull(
                        $offering->deleted_at,
                        "All trashed offerings should have deleted_at timestamp"
                    );
                }
            });
    }
}
