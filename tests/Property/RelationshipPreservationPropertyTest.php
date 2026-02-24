<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\Fund;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\Pledge;
use App\Models\OfferingType;
use App\Models\ExpenseCategory;
use App\Models\Vendor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Relationship Preservation
 * 
 * Feature: soft-delete-archive-system
 * Property 3: Relationships preserved through archive and restore
 * **Validates: Requirements 1.4, 4.6, 10.5**
 * 
 * Property: For any archivable model instance with relationships, archiving and then 
 * restoring the instance should preserve all relationship data and allow access to 
 * related records.
 */
class RelationshipPreservationPropertyTest extends TestCase
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
        
        // Reset Faker unique generator to avoid overflow
        $this->app->make(\Faker\Generator::class)->unique(true);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    /**
     * Test that Fund relationships are preserved through archive and restore.
     * 
     * @test
     */
    public function fund_relationships_preserved_through_archive_and_restore()
    {
        $this->forAll(
            Generators::choose(1, 3), // Number of offerings
            Generators::choose(1, 2)  // Number of expenses
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount, $expenseCount) {
                // Create a fund with related records
                $fund = Fund::create([
                    'name' => 'Test Fund ' . uniqid(),
                    'type' => 'unrestricted',
                    'description' => 'Test fund for relationship testing',
                    'current_balance' => 0,
                    'is_active' => true,
                ]);
                
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Tithe'],
                    ['description' => 'Regular tithe offering', 'is_active' => true]
                );
                $expenseCategory = ExpenseCategory::firstOrCreate(
                    ['name' => 'Utilities'],
                    ['description' => 'Utility expenses', 'is_active' => true]
                );
                
                // Create offerings for the fund
                $offeringIds = [];
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => 100 + $i,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    $offeringIds[] = $offering->id;
                }
                
                // Create expenses for the fund
                $expenseIds = [];
                for ($i = 0; $i < $expenseCount; $i++) {
                    $expense = Expense::create([
                        'expense_category_id' => $expenseCategory->id,
                        'fund_id' => $fund->id,
                        'amount' => 50 + $i,
                        'date' => now()->format('Y-m-d'),
                        'description' => 'Test expense ' . $i,
                        'approval_status' => 'pending',
                    ]);
                    $expenseIds[] = $expense->id;
                }
                
                // Archive the fund
                $fund->delete();
                
                // Verify fund is archived
                $this->assertNotNull(
                    Fund::withTrashed()->find($fund->id)->deleted_at,
                    "Fund should be archived"
                );
                
                // Property: Relationships should still be accessible on archived fund
                $archivedFund = Fund::withTrashed()->find($fund->id);
                
                $this->assertEquals(
                    $offeringCount,
                    $archivedFund->offerings()->count(),
                    "Archived fund should still have access to {$offeringCount} offerings"
                );
                
                $this->assertEquals(
                    $expenseCount,
                    $archivedFund->expenses()->count(),
                    "Archived fund should still have access to {$expenseCount} expenses"
                );
                
                // Verify relationship data is intact
                foreach ($archivedFund->offerings as $offering) {
                    $this->assertEquals(
                        $fund->id,
                        $offering->fund_id,
                        "Offering should still reference the fund"
                    );
                    $this->assertContains(
                        $offering->id,
                        $offeringIds,
                        "Offering should be one of the created offerings"
                    );
                }
                
                foreach ($archivedFund->expenses as $expense) {
                    $this->assertEquals(
                        $fund->id,
                        $expense->fund_id,
                        "Expense should still reference the fund"
                    );
                    $this->assertContains(
                        $expense->id,
                        $expenseIds,
                        "Expense should be one of the created expenses"
                    );
                }
                
                // Restore the fund
                $archivedFund->restore();
                
                // Property: After restore, relationships should still be accessible
                $restoredFund = Fund::find($fund->id);
                
                $this->assertNotNull(
                    $restoredFund,
                    "Fund should be restored and findable"
                );
                
                $this->assertNull(
                    $restoredFund->deleted_at,
                    "Restored fund should have null deleted_at"
                );
                
                $this->assertEquals(
                    $offeringCount,
                    $restoredFund->offerings()->count(),
                    "Restored fund should still have access to {$offeringCount} offerings"
                );
                
                $this->assertEquals(
                    $expenseCount,
                    $restoredFund->expenses()->count(),
                    "Restored fund should still have access to {$expenseCount} expenses"
                );
                
                // Verify relationship data is still intact after restore
                foreach ($restoredFund->offerings as $offering) {
                    $this->assertEquals(
                        $fund->id,
                        $offering->fund_id,
                        "Offering should still reference the restored fund"
                    );
                }
                
                foreach ($restoredFund->expenses as $expense) {
                    $this->assertEquals(
                        $fund->id,
                        $expense->fund_id,
                        "Expense should still reference the restored fund"
                    );
                }
            });
    }

    /**
     * Test that Pledge relationships are preserved through archive and restore.
     * 
     * @test
     */
    public function pledge_relationships_preserved_through_archive_and_restore()
    {
        $this->forAll(
            Generators::choose(1, 3) // Number of payments (offerings)
        )
            ->withMaxSize(2)
            ->then(function ($paymentCount) {
                // Create a pledge with related records
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Building Fund'],
                    ['description' => 'Building fund offering', 'is_active' => true]
                );
                $fund = Fund::firstOrCreate(
                    ['name' => 'General Fund'],
                    ['type' => 'unrestricted', 'description' => 'General church fund', 'current_balance' => 0, 'is_active' => true]
                );
                
                $pledge = Pledge::create([
                    'member_id' => $member->id,
                    'offering_type_id' => $offeringType->id,
                    'pledged_amount' => 1000,
                    'start_date' => now()->format('Y-m-d'),
                    'end_date' => now()->addYear()->format('Y-m-d'),
                    'is_completed' => false,
                ]);
                
                // Create payments (offerings) for the pledge
                $paymentIds = [];
                for ($i = 0; $i < $paymentCount; $i++) {
                    $payment = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'pledge_id' => $pledge->id,
                        'amount' => 100 + $i,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    $paymentIds[] = $payment->id;
                }
                
                // Store original relationship data
                $originalMemberId = $pledge->member_id;
                $originalOfferingTypeId = $pledge->offering_type_id;
                
                // Archive the pledge
                $pledge->delete();
                
                // Verify pledge is archived
                $this->assertNotNull(
                    Pledge::withTrashed()->find($pledge->id)->deleted_at,
                    "Pledge should be archived"
                );
                
                // Property: Relationships should still be accessible on archived pledge
                $archivedPledge = Pledge::withTrashed()->find($pledge->id);
                
                $this->assertNotNull(
                    $archivedPledge->member,
                    "Archived pledge should still have access to member"
                );
                
                $this->assertEquals(
                    $originalMemberId,
                    $archivedPledge->member->id,
                    "Archived pledge should reference the correct member"
                );
                
                $this->assertNotNull(
                    $archivedPledge->offeringType,
                    "Archived pledge should still have access to offering type"
                );
                
                $this->assertEquals(
                    $originalOfferingTypeId,
                    $archivedPledge->offeringType->id,
                    "Archived pledge should reference the correct offering type"
                );
                
                $this->assertEquals(
                    $paymentCount,
                    $archivedPledge->payments()->count(),
                    "Archived pledge should still have access to {$paymentCount} payments"
                );
                
                // Verify payment data is intact
                foreach ($archivedPledge->payments as $payment) {
                    $this->assertEquals(
                        $pledge->id,
                        $payment->pledge_id,
                        "Payment should still reference the pledge"
                    );
                    $this->assertContains(
                        $payment->id,
                        $paymentIds,
                        "Payment should be one of the created payments"
                    );
                }
                
                // Restore the pledge
                $archivedPledge->restore();
                
                // Property: After restore, relationships should still be accessible
                $restoredPledge = Pledge::find($pledge->id);
                
                $this->assertNotNull(
                    $restoredPledge,
                    "Pledge should be restored and findable"
                );
                
                $this->assertNull(
                    $restoredPledge->deleted_at,
                    "Restored pledge should have null deleted_at"
                );
                
                $this->assertNotNull(
                    $restoredPledge->member,
                    "Restored pledge should still have access to member"
                );
                
                $this->assertEquals(
                    $originalMemberId,
                    $restoredPledge->member->id,
                    "Restored pledge should reference the correct member"
                );
                
                $this->assertNotNull(
                    $restoredPledge->offeringType,
                    "Restored pledge should still have access to offering type"
                );
                
                $this->assertEquals(
                    $originalOfferingTypeId,
                    $restoredPledge->offeringType->id,
                    "Restored pledge should reference the correct offering type"
                );
                
                $this->assertEquals(
                    $paymentCount,
                    $restoredPledge->payments()->count(),
                    "Restored pledge should still have access to {$paymentCount} payments"
                );
                
                // Verify payment data is still intact after restore
                foreach ($restoredPledge->payments as $payment) {
                    $this->assertEquals(
                        $pledge->id,
                        $payment->pledge_id,
                        "Payment should still reference the restored pledge"
                    );
                }
            });
    }

    /**
     * Test that Offering relationships are preserved through archive and restore.
     * 
     * @test
     */
    public function offering_relationships_preserved_through_archive_and_restore()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of offerings to test
        )
            ->withMaxSize(2)
            ->then(function ($offeringCount) {
                // Create required related records
                $member = Member::factory()->create();
                $offeringType = OfferingType::firstOrCreate(
                    ['name' => 'Tithe'],
                    ['description' => 'Regular tithe offering', 'is_active' => true]
                );
                $fund = Fund::firstOrCreate(
                    ['name' => 'General Fund'],
                    ['type' => 'unrestricted', 'description' => 'General church fund', 'current_balance' => 0, 'is_active' => true]
                );
                
                for ($i = 0; $i < $offeringCount; $i++) {
                    // Create offering with relationships
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => 100 + $i,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    
                    // Store original relationship IDs
                    $originalMemberId = $offering->member_id;
                    $originalOfferingTypeId = $offering->offering_type_id;
                    $originalFundId = $offering->fund_id;
                    
                    // Archive the offering
                    $offering->delete();
                    
                    // Verify offering is archived
                    $this->assertNotNull(
                        Offering::withTrashed()->find($offering->id)->deleted_at,
                        "Offering should be archived"
                    );
                    
                    // Property: Relationships should still be accessible on archived offering
                    $archivedOffering = Offering::withTrashed()->find($offering->id);
                    
                    $this->assertNotNull(
                        $archivedOffering->member,
                        "Archived offering should still have access to member"
                    );
                    
                    $this->assertEquals(
                        $originalMemberId,
                        $archivedOffering->member->id,
                        "Archived offering should reference the correct member"
                    );
                    
                    $this->assertNotNull(
                        $archivedOffering->offeringType,
                        "Archived offering should still have access to offering type"
                    );
                    
                    $this->assertEquals(
                        $originalOfferingTypeId,
                        $archivedOffering->offeringType->id,
                        "Archived offering should reference the correct offering type"
                    );
                    
                    $this->assertNotNull(
                        $archivedOffering->fund,
                        "Archived offering should still have access to fund"
                    );
                    
                    $this->assertEquals(
                        $originalFundId,
                        $archivedOffering->fund->id,
                        "Archived offering should reference the correct fund"
                    );
                    
                    // Restore the offering
                    $archivedOffering->restore();
                    
                    // Property: After restore, relationships should still be accessible
                    $restoredOffering = Offering::find($offering->id);
                    
                    $this->assertNotNull(
                        $restoredOffering,
                        "Offering should be restored and findable"
                    );
                    
                    $this->assertNull(
                        $restoredOffering->deleted_at,
                        "Restored offering should have null deleted_at"
                    );
                    
                    $this->assertNotNull(
                        $restoredOffering->member,
                        "Restored offering should still have access to member"
                    );
                    
                    $this->assertEquals(
                        $originalMemberId,
                        $restoredOffering->member->id,
                        "Restored offering should reference the correct member"
                    );
                    
                    $this->assertNotNull(
                        $restoredOffering->offeringType,
                        "Restored offering should still have access to offering type"
                    );
                    
                    $this->assertEquals(
                        $originalOfferingTypeId,
                        $restoredOffering->offeringType->id,
                        "Restored offering should reference the correct offering type"
                    );
                    
                    $this->assertNotNull(
                        $restoredOffering->fund,
                        "Restored offering should still have access to fund"
                    );
                    
                    $this->assertEquals(
                        $originalFundId,
                        $restoredOffering->fund->id,
                        "Restored offering should reference the correct fund"
                    );
                }
            });
    }

    /**
     * Test that Expense relationships are preserved through archive and restore.
     * 
     * @test
     */
    public function expense_relationships_preserved_through_archive_and_restore()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of expenses to test
        )
            ->withMaxSize(2)
            ->then(function ($expenseCount) {
                // Create required related records
                $expenseCategory = ExpenseCategory::firstOrCreate(
                    ['name' => 'Utilities'],
                    ['description' => 'Utility expenses', 'is_active' => true]
                );
                $fund = Fund::firstOrCreate(
                    ['name' => 'General Fund'],
                    ['type' => 'unrestricted', 'description' => 'General church fund', 'current_balance' => 0, 'is_active' => true]
                );
                $vendor = Vendor::create([
                    'name' => 'Test Vendor ' . uniqid(),
                    'contact_name' => 'Test Contact',
                    'email' => 'vendor' . uniqid() . '@example.com',
                    'is_active' => true,
                ]);
                
                for ($i = 0; $i < $expenseCount; $i++) {
                    // Create expense with relationships
                    $expense = Expense::create([
                        'expense_category_id' => $expenseCategory->id,
                        'vendor_id' => $vendor->id,
                        'fund_id' => $fund->id,
                        'amount' => 50 + $i,
                        'date' => now()->format('Y-m-d'),
                        'description' => 'Test expense ' . $i,
                        'approval_status' => 'pending',
                    ]);
                    
                    // Store original relationship IDs
                    $originalCategoryId = $expense->expense_category_id;
                    $originalVendorId = $expense->vendor_id;
                    $originalFundId = $expense->fund_id;
                    
                    // Archive the expense
                    $expense->delete();
                    
                    // Verify expense is archived
                    $this->assertNotNull(
                        Expense::withTrashed()->find($expense->id)->deleted_at,
                        "Expense should be archived"
                    );
                    
                    // Property: Relationships should still be accessible on archived expense
                    $archivedExpense = Expense::withTrashed()->find($expense->id);
                    
                    $this->assertNotNull(
                        $archivedExpense->category,
                        "Archived expense should still have access to category"
                    );
                    
                    $this->assertEquals(
                        $originalCategoryId,
                        $archivedExpense->category->id,
                        "Archived expense should reference the correct category"
                    );
                    
                    $this->assertNotNull(
                        $archivedExpense->vendor,
                        "Archived expense should still have access to vendor"
                    );
                    
                    $this->assertEquals(
                        $originalVendorId,
                        $archivedExpense->vendor->id,
                        "Archived expense should reference the correct vendor"
                    );
                    
                    $this->assertNotNull(
                        $archivedExpense->fund,
                        "Archived expense should still have access to fund"
                    );
                    
                    $this->assertEquals(
                        $originalFundId,
                        $archivedExpense->fund->id,
                        "Archived expense should reference the correct fund"
                    );
                    
                    // Restore the expense
                    $archivedExpense->restore();
                    
                    // Property: After restore, relationships should still be accessible
                    $restoredExpense = Expense::find($expense->id);
                    
                    $this->assertNotNull(
                        $restoredExpense,
                        "Expense should be restored and findable"
                    );
                    
                    $this->assertNull(
                        $restoredExpense->deleted_at,
                        "Restored expense should have null deleted_at"
                    );
                    
                    $this->assertNotNull(
                        $restoredExpense->category,
                        "Restored expense should still have access to category"
                    );
                    
                    $this->assertEquals(
                        $originalCategoryId,
                        $restoredExpense->category->id,
                        "Restored expense should reference the correct category"
                    );
                    
                    $this->assertNotNull(
                        $restoredExpense->vendor,
                        "Restored expense should still have access to vendor"
                    );
                    
                    $this->assertEquals(
                        $originalVendorId,
                        $restoredExpense->vendor->id,
                        "Restored expense should reference the correct vendor"
                    );
                    
                    $this->assertNotNull(
                        $restoredExpense->fund,
                        "Restored expense should still have access to fund"
                    );
                    
                    $this->assertEquals(
                        $originalFundId,
                        $restoredExpense->fund->id,
                        "Restored expense should reference the correct fund"
                    );
                }
            });
    }
}
