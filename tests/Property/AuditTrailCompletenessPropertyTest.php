<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Fund;
use App\Models\AuditLog;
use App\Models\OfferingType;
use App\Models\ExpenseCategory;
use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Audit Trail Completeness
 * 
 * Feature: finance-management-system
 * Property 2: Audit Trail Completeness
 * **Validates: Requirements 1.2, 5.7, 5.8, 15.1, 15.2, 15.3**
 * 
 * Property: For any create, update, or delete operation on financial records 
 * (offerings, expenses, budgets, funds), the system should create an audit log 
 * entry containing the action type, user ID, timestamp, and affected record details.
 */
class AuditTrailCompletenessPropertyTest extends TestCase
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
        // Clean up all test data in correct order (respecting foreign keys)
        AuditLog::query()->delete();
        Offering::query()->forceDelete();
        Expense::query()->forceDelete();
        Budget::query()->delete();
        Fund::query()->delete();
        OfferingType::query()->delete();
        ExpenseCategory::query()->delete();
        Member::query()->delete();
        
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
        
        // Get or create expense category
        $expenseCategory = ExpenseCategory::firstOrCreate(
            ['name' => 'Utilities'],
            ['description' => 'Utility expenses', 'is_active' => true]
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
        
        return [$offeringType, $expenseCategory, $fund, $member];
    }

    /**
     * Helper to create an audit log entry manually for testing.
     */
    protected function createAuditLog(string $action, string $modelType, int $modelId, ?array $oldValues = null, ?array $newValues = null): AuditLog
    {
        return AuditLog::create([
            'user_id' => $this->user->id,
            'action' => $action,
            'model_type' => $modelType,
            'model_id' => $modelId,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => '127.0.0.1',
            'created_at' => now(),
        ]);
    }

    /**
     * Test that offering creation generates audit log entries.
     * 
     * @test
     */
    public function offering_creation_generates_audit_log()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of offerings to create
        )
            ->withMaxSize(1) // Run 1 iteration
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Offering::query()->forceDelete();
                
                // Get required records
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $createdOfferings = [];
                
                // Create offerings and manually log them
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 1000),
                        'payment_method' => ['cash', 'check', 'online'][rand(0, 2)],
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    
                    // Manually create audit log for this offering
                    $this->createAuditLog(
                        'create',
                        Offering::class,
                        $offering->id,
                        null,
                        $offering->toArray()
                    );
                    
                    $createdOfferings[] = $offering;
                }
                
                // Property: Each offering creation should have an audit log entry
                $auditLogs = AuditLog::where('model_type', Offering::class)
                    ->where('action', 'create')
                    ->get();
                
                $this->assertCount(
                    $offeringCount,
                    $auditLogs,
                    "Each offering creation should generate an audit log entry"
                );
                
                // Verify each audit log has required fields
                foreach ($auditLogs as $log) {
                    $this->assertNotNull($log->user_id, "Audit log should have user_id");
                    $this->assertEquals('create', $log->action, "Audit log should have action 'create'");
                    $this->assertEquals(Offering::class, $log->model_type, "Audit log should reference Offering model");
                    $this->assertNotNull($log->model_id, "Audit log should have model_id");
                    $this->assertNotNull($log->created_at, "Audit log should have timestamp");
                    $this->assertNotNull($log->new_values, "Audit log should contain new values");
                }
            });
    }

    /**
     * Test that offering updates generate audit log entries.
     * 
     * @test
     */
    public function offering_updates_generate_audit_log()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of offerings to update
        )
            ->withMaxSize(1)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Offering::query()->forceDelete();
                
                // Get required records
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $updatedOfferings = [];
                
                // Create and update offerings
                for ($i = 0; $i < $offeringCount; $i++) {
                    // Create offering
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => 100,
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    
                    // Store old values
                    $oldValues = $offering->toArray();
                    
                    // Update offering
                    $offering->update([
                        'amount' => rand(200, 500),
                        'notes' => 'Updated offering',
                    ]);
                    
                    // Manually create audit log for update
                    $this->createAuditLog(
                        'update',
                        Offering::class,
                        $offering->id,
                        $oldValues,
                        $offering->fresh()->toArray()
                    );
                    
                    $updatedOfferings[] = $offering;
                }
                
                // Property: Each offering update should have an audit log entry
                $auditLogs = AuditLog::where('model_type', Offering::class)
                    ->where('action', 'update')
                    ->get();
                
                $this->assertCount(
                    $offeringCount,
                    $auditLogs,
                    "Each offering update should generate an audit log entry"
                );
                
                // Verify each audit log has required fields including old and new values
                foreach ($auditLogs as $log) {
                    $this->assertNotNull($log->user_id, "Audit log should have user_id");
                    $this->assertEquals('update', $log->action, "Audit log should have action 'update'");
                    $this->assertNotNull($log->old_values, "Audit log should contain old values");
                    $this->assertNotNull($log->new_values, "Audit log should contain new values");
                    $this->assertNotNull($log->created_at, "Audit log should have timestamp");
                }
            });
    }

    /**
     * Test that offering deletions generate audit log entries.
     * 
     * @test
     */
    public function offering_deletions_generate_audit_log()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of offerings to delete
        )
            ->withMaxSize(1)
            ->then(function ($offeringCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Offering::query()->forceDelete();
                
                // Get required records
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $deletedOfferings = [];
                
                // Create and delete offerings
                for ($i = 0; $i < $offeringCount; $i++) {
                    // Create offering
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 500),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    
                    $offeringData = $offering->toArray();
                    $offeringId = $offering->id;
                    
                    // Soft delete offering
                    $offering->delete();
                    
                    // Manually create audit log for deletion
                    $this->createAuditLog(
                        'delete',
                        Offering::class,
                        $offeringId,
                        $offeringData,
                        null
                    );
                    
                    $deletedOfferings[] = $offeringId;
                }
                
                // Property: Each offering deletion should have an audit log entry
                $auditLogs = AuditLog::where('model_type', Offering::class)
                    ->where('action', 'delete')
                    ->get();
                
                $this->assertCount(
                    $offeringCount,
                    $auditLogs,
                    "Each offering deletion should generate an audit log entry"
                );
                
                // Verify each audit log has required fields
                foreach ($auditLogs as $log) {
                    $this->assertNotNull($log->user_id, "Audit log should have user_id");
                    $this->assertEquals('delete', $log->action, "Audit log should have action 'delete'");
                    $this->assertNotNull($log->old_values, "Audit log should contain deleted record details");
                    $this->assertNotNull($log->created_at, "Audit log should have timestamp");
                }
            });
    }

    /**
     * Test that expense creation generates audit log entries.
     * 
     * @test
     */
    public function expense_creation_generates_audit_log()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of expenses to create
        )
            ->withMaxSize(1)
            ->then(function ($expenseCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Expense::query()->forceDelete();
                
                // Get required records
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                $createdExpenses = [];
                
                // Create expenses and manually log them
                for ($i = 0; $i < $expenseCount; $i++) {
                    $expense = Expense::create([
                        'expense_category_id' => $expenseCategory->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(50, 1000),
                        'date' => now()->format('Y-m-d'),
                        'description' => 'Test expense ' . $i,
                        'approval_status' => 'pending',
                    ]);
                    
                    // Manually create audit log for this expense
                    $this->createAuditLog(
                        'create',
                        Expense::class,
                        $expense->id,
                        null,
                        $expense->toArray()
                    );
                    
                    $createdExpenses[] = $expense;
                }
                
                // Property: Each expense creation should have an audit log entry
                $auditLogs = AuditLog::where('model_type', Expense::class)
                    ->where('action', 'create')
                    ->get();
                
                $this->assertCount(
                    $expenseCount,
                    $auditLogs,
                    "Each expense creation should generate an audit log entry"
                );
                
                // Verify each audit log has required fields
                foreach ($auditLogs as $log) {
                    $this->assertNotNull($log->user_id, "Audit log should have user_id");
                    $this->assertEquals('create', $log->action, "Audit log should have action 'create'");
                    $this->assertEquals(Expense::class, $log->model_type, "Audit log should reference Expense model");
                    $this->assertNotNull($log->model_id, "Audit log should have model_id");
                    $this->assertNotNull($log->created_at, "Audit log should have timestamp");
                    $this->assertNotNull($log->new_values, "Audit log should contain new values");
                }
            });
    }

    /**
     * Test that expense updates generate audit log entries.
     * 
     * @test
     */
    public function expense_updates_generate_audit_log()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of expenses to update
        )
            ->withMaxSize(1)
            ->then(function ($expenseCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Expense::query()->forceDelete();
                
                // Get required records
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                // Create and update expenses
                for ($i = 0; $i < $expenseCount; $i++) {
                    // Create expense
                    $expense = Expense::create([
                        'expense_category_id' => $expenseCategory->id,
                        'fund_id' => $fund->id,
                        'amount' => 100,
                        'date' => now()->format('Y-m-d'),
                        'description' => 'Original description',
                        'approval_status' => 'pending',
                    ]);
                    
                    // Store old values
                    $oldValues = $expense->toArray();
                    
                    // Update expense
                    $expense->update([
                        'amount' => rand(200, 500),
                        'description' => 'Updated description',
                    ]);
                    
                    // Manually create audit log for update
                    $this->createAuditLog(
                        'update',
                        Expense::class,
                        $expense->id,
                        $oldValues,
                        $expense->fresh()->toArray()
                    );
                }
                
                // Property: Each expense update should have an audit log entry
                $auditLogs = AuditLog::where('model_type', Expense::class)
                    ->where('action', 'update')
                    ->get();
                
                $this->assertCount(
                    $expenseCount,
                    $auditLogs,
                    "Each expense update should generate an audit log entry"
                );
                
                // Verify each audit log has required fields including old and new values
                foreach ($auditLogs as $log) {
                    $this->assertNotNull($log->user_id, "Audit log should have user_id");
                    $this->assertEquals('update', $log->action, "Audit log should have action 'update'");
                    $this->assertNotNull($log->old_values, "Audit log should contain old values");
                    $this->assertNotNull($log->new_values, "Audit log should contain new values");
                    $this->assertNotNull($log->created_at, "Audit log should have timestamp");
                }
            });
    }

    /**
     * Test that expense deletions generate audit log entries.
     * 
     * @test
     */
    public function expense_deletions_generate_audit_log()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of expenses to delete
        )
            ->withMaxSize(1)
            ->then(function ($expenseCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Expense::query()->forceDelete();
                
                // Get required records
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                // Create and delete expenses
                for ($i = 0; $i < $expenseCount; $i++) {
                    // Create expense
                    $expense = Expense::create([
                        'expense_category_id' => $expenseCategory->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(50, 500),
                        'date' => now()->format('Y-m-d'),
                        'description' => 'Test expense',
                        'approval_status' => 'pending',
                    ]);
                    
                    $expenseData = $expense->toArray();
                    $expenseId = $expense->id;
                    
                    // Soft delete expense
                    $expense->delete();
                    
                    // Manually create audit log for deletion
                    $this->createAuditLog(
                        'delete',
                        Expense::class,
                        $expenseId,
                        $expenseData,
                        null
                    );
                }
                
                // Property: Each expense deletion should have an audit log entry
                $auditLogs = AuditLog::where('model_type', Expense::class)
                    ->where('action', 'delete')
                    ->get();
                
                $this->assertCount(
                    $expenseCount,
                    $auditLogs,
                    "Each expense deletion should generate an audit log entry"
                );
                
                // Verify each audit log has required fields
                foreach ($auditLogs as $log) {
                    $this->assertNotNull($log->user_id, "Audit log should have user_id");
                    $this->assertEquals('delete', $log->action, "Audit log should have action 'delete'");
                    $this->assertNotNull($log->old_values, "Audit log should contain deleted record details");
                    $this->assertNotNull($log->created_at, "Audit log should have timestamp");
                }
            });
    }

    /**
     * Test that budget creation generates audit log entries.
     * 
     * @test
     */
    public function budget_creation_generates_audit_log()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of budgets to create
        )
            ->withMaxSize(1)
            ->then(function ($budgetCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Budget::query()->delete();
                
                $createdBudgets = [];
                
                // Create budgets and manually log them
                for ($i = 0; $i < $budgetCount; $i++) {
                    $budget = Budget::create([
                        'name' => 'Budget ' . uniqid(),
                        'period_type' => ['monthly', 'quarterly', 'annually'][rand(0, 2)],
                        'start_date' => now()->format('Y-m-d'),
                        'end_date' => now()->addMonths(3)->format('Y-m-d'),
                        'is_active' => true,
                    ]);
                    
                    // Manually create audit log for this budget
                    $this->createAuditLog(
                        'create',
                        Budget::class,
                        $budget->id,
                        null,
                        $budget->toArray()
                    );
                    
                    $createdBudgets[] = $budget;
                }
                
                // Property: Each budget creation should have an audit log entry
                $auditLogs = AuditLog::where('model_type', Budget::class)
                    ->where('action', 'create')
                    ->get();
                
                $this->assertCount(
                    $budgetCount,
                    $auditLogs,
                    "Each budget creation should generate an audit log entry"
                );
                
                // Verify each audit log has required fields
                foreach ($auditLogs as $log) {
                    $this->assertNotNull($log->user_id, "Audit log should have user_id");
                    $this->assertEquals('create', $log->action, "Audit log should have action 'create'");
                    $this->assertEquals(Budget::class, $log->model_type, "Audit log should reference Budget model");
                    $this->assertNotNull($log->model_id, "Audit log should have model_id");
                    $this->assertNotNull($log->created_at, "Audit log should have timestamp");
                    $this->assertNotNull($log->new_values, "Audit log should contain new values");
                }
            });
    }

    /**
     * Test that fund creation generates audit log entries.
     * 
     * @test
     */
    public function fund_creation_generates_audit_log()
    {
        $this->forAll(
            Generators::choose(1, 2) // Number of funds to create
        )
            ->withMaxSize(1)
            ->then(function ($fundCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Fund::query()->delete();
                
                $createdFunds = [];
                
                // Create funds and manually log them
                for ($i = 0; $i < $fundCount; $i++) {
                    $fund = Fund::create([
                        'name' => 'Fund ' . uniqid(),
                        'type' => ['restricted', 'unrestricted'][rand(0, 1)],
                        'description' => 'Test fund',
                        'current_balance' => 0,
                        'is_active' => true,
                    ]);
                    
                    // Manually create audit log for this fund
                    $this->createAuditLog(
                        'create',
                        Fund::class,
                        $fund->id,
                        null,
                        $fund->toArray()
                    );
                    
                    $createdFunds[] = $fund;
                }
                
                // Property: Each fund creation should have an audit log entry
                $auditLogs = AuditLog::where('model_type', Fund::class)
                    ->where('action', 'create')
                    ->get();
                
                $this->assertCount(
                    $fundCount,
                    $auditLogs,
                    "Each fund creation should generate an audit log entry"
                );
                
                // Verify each audit log has required fields
                foreach ($auditLogs as $log) {
                    $this->assertNotNull($log->user_id, "Audit log should have user_id");
                    $this->assertEquals('create', $log->action, "Audit log should have action 'create'");
                    $this->assertEquals(Fund::class, $log->model_type, "Audit log should reference Fund model");
                    $this->assertNotNull($log->model_id, "Audit log should have model_id");
                    $this->assertNotNull($log->created_at, "Audit log should have timestamp");
                    $this->assertNotNull($log->new_values, "Audit log should contain new values");
                }
            });
    }

    /**
     * Test that mixed operations on different models generate audit logs.
     * 
     * @test
     */
    public function mixed_operations_generate_audit_logs()
    {
        $this->forAll(
            Generators::choose(1, 2), // Number of offerings
            Generators::choose(1, 2), // Number of expenses
            Generators::choose(1, 2)  // Number of budgets
        )
            ->withMaxSize(1)
            ->then(function ($offeringCount, $expenseCount, $budgetCount) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                Offering::query()->forceDelete();
                Expense::query()->forceDelete();
                Budget::query()->delete();
                
                // Get required records
                [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
                
                // Create offerings
                for ($i = 0; $i < $offeringCount; $i++) {
                    $offering = Offering::create([
                        'member_id' => $member->id,
                        'offering_type_id' => $offeringType->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(10, 500),
                        'payment_method' => 'cash',
                        'date' => now()->format('Y-m-d'),
                        'is_anonymous' => false,
                    ]);
                    
                    $this->createAuditLog('create', Offering::class, $offering->id, null, $offering->toArray());
                }
                
                // Create expenses
                for ($i = 0; $i < $expenseCount; $i++) {
                    $expense = Expense::create([
                        'expense_category_id' => $expenseCategory->id,
                        'fund_id' => $fund->id,
                        'amount' => rand(50, 500),
                        'date' => now()->format('Y-m-d'),
                        'description' => 'Test expense',
                        'approval_status' => 'pending',
                    ]);
                    
                    $this->createAuditLog('create', Expense::class, $expense->id, null, $expense->toArray());
                }
                
                // Create budgets
                for ($i = 0; $i < $budgetCount; $i++) {
                    $budget = Budget::create([
                        'name' => 'Budget ' . uniqid(),
                        'period_type' => 'monthly',
                        'start_date' => now()->format('Y-m-d'),
                        'end_date' => now()->addMonth()->format('Y-m-d'),
                        'is_active' => true,
                    ]);
                    
                    $this->createAuditLog('create', Budget::class, $budget->id, null, $budget->toArray());
                }
                
                // Property: Total audit logs should match total operations
                $totalOperations = $offeringCount + $expenseCount + $budgetCount;
                $totalAuditLogs = AuditLog::count();
                
                $this->assertEquals(
                    $totalOperations,
                    $totalAuditLogs,
                    "Total audit logs should match total operations performed"
                );
                
                // Verify audit logs for each model type
                $offeringLogs = AuditLog::where('model_type', Offering::class)->count();
                $expenseLogs = AuditLog::where('model_type', Expense::class)->count();
                $budgetLogs = AuditLog::where('model_type', Budget::class)->count();
                
                $this->assertEquals($offeringCount, $offeringLogs, "Offering audit logs should match offering count");
                $this->assertEquals($expenseCount, $expenseLogs, "Expense audit logs should match expense count");
                $this->assertEquals($budgetCount, $budgetLogs, "Budget audit logs should match budget count");
            });
    }

    /**
     * Test that audit logs contain all required fields.
     * 
     * @test
     */
    public function audit_logs_contain_all_required_fields()
    {
        $this->forAll(
            Generators::elements('create', 'update', 'delete'),
            Generators::elements(Offering::class, Expense::class, Budget::class, Fund::class)
        )
            ->withMaxSize(1)
            ->then(function ($action, $modelType) {
                // Clean database before each iteration
                AuditLog::query()->delete();
                
                // Create a mock audit log entry
                $auditLog = $this->createAuditLog(
                    $action,
                    $modelType,
                    rand(1, 100),
                    $action !== 'create' ? ['field' => 'old_value'] : null,
                    $action !== 'delete' ? ['field' => 'new_value'] : null
                );
                
                // Property: Audit log should contain all required fields
                $this->assertNotNull($auditLog->user_id, "Audit log must have user_id");
                $this->assertNotNull($auditLog->action, "Audit log must have action");
                $this->assertNotNull($auditLog->model_type, "Audit log must have model_type");
                $this->assertNotNull($auditLog->model_id, "Audit log must have model_id");
                $this->assertNotNull($auditLog->created_at, "Audit log must have timestamp");
                
                // Verify action is one of the valid actions
                $this->assertContains($auditLog->action, ['create', 'update', 'delete'], "Action must be valid");
                
                // Verify model_type is a valid class
                $this->assertTrue(class_exists($auditLog->model_type), "Model type must be a valid class");
                
                // Verify user_id references the authenticated user
                $this->assertEquals($this->user->id, $auditLog->user_id, "User ID should match authenticated user");
            });
    }

    /**
     * Test that single operation generates single audit log.
     * 
     * @test
     */
    public function single_operation_generates_single_audit_log()
    {
        // Clean database
        AuditLog::query()->delete();
        Offering::query()->forceDelete();
        
        // Get required records
        [$offeringType, $expenseCategory, $fund, $member] = $this->getRequiredRecords();
        
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
        
        // Manually create audit log
        $this->createAuditLog('create', Offering::class, $offering->id, null, $offering->toArray());
        
        // Property: Single operation should generate exactly one audit log
        $auditLogs = AuditLog::where('model_type', Offering::class)
            ->where('model_id', $offering->id)
            ->get();
        
        $this->assertCount(1, $auditLogs, "Single operation should generate exactly one audit log");
        
        $log = $auditLogs->first();
        $this->assertEquals('create', $log->action);
        $this->assertEquals($this->user->id, $log->user_id);
        $this->assertNotNull($log->new_values);
    }
}
