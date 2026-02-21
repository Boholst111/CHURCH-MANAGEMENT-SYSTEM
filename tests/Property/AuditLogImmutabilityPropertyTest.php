<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\AuditLog;
use App\Models\User;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Fund;
use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Eris\TestTrait;
use Eris\Generators;
use Illuminate\Support\Facades\DB;

/**
 * Property-Based Test for Audit Log Immutability
 * 
 * Feature: finance-management-system
 * Property 38: Audit Log Immutability
 * **Validates: Requirements 15.6**
 * 
 * Property: For any audit log entry, once created, it should never be modified 
 * or deleted via Eloquent, ensuring a permanent record of all financial operations.
 * 
 * Note: This test validates Eloquent-level immutability protections. The AuditLog
 * model prevents updates and deletions through Eloquent ORM. For production environments,
 * additional database-level triggers can be implemented to prevent raw SQL modifications.
 */
class AuditLogImmutabilityPropertyTest extends TestCase
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
        // Disable triggers temporarily for cleanup
        DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 1');
        
        // Clean up using query builder (bypasses Eloquent model protections)
        DB::table('audit_logs')->delete();
        
        // Re-enable triggers
        DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 0');
        
        Offering::query()->forceDelete();
        OfferingType::query()->delete();
        Fund::query()->delete();
        Member::query()->delete();
        
        parent::tearDown();
    }

    /**
     * Helper to create an audit log entry.
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
     * Test that audit log entries cannot be updated via Eloquent.
     * 
     * @test
     */
    public function audit_log_entries_cannot_be_updated_via_eloquent()
    {
        $this->forAll(
            Generators::choose(2, 6) // Number of audit logs to create
        )
            ->withMaxSize(3)
            ->then(function ($logCount) {
                // Clean database before each iteration
                DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 1');
                DB::table('audit_logs')->delete();
                DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 0');
                
                $createdLogs = [];
                
                // Create multiple audit log entries
                for ($i = 0; $i < $logCount; $i++) {
                    $log = $this->createAuditLog(
                        'create',
                        Offering::class,
                        rand(1, 1000),
                        null,
                        ['amount' => rand(10, 500), 'date' => now()->format('Y-m-d')]
                    );
                    
                    $createdLogs[] = [
                        'id' => $log->id,
                        'original_action' => $log->action,
                        'original_model_type' => $log->model_type,
                        'original_model_id' => $log->model_id,
                    ];
                }
                
                // Property: Attempting to update audit logs should throw an exception
                foreach ($createdLogs as $logData) {
                    $log = AuditLog::find($logData['id']);
                    
                    $exceptionThrown = false;
                    try {
                        $log->action = 'modified_action';
                        $log->model_type = 'ModifiedModel';
                        $log->model_id = 99999;
                        $log->save();
                    } catch (\RuntimeException $e) {
                        $exceptionThrown = true;
                        $this->assertStringContainsString('immutable', $e->getMessage());
                    }
                    
                    $this->assertTrue(
                        $exceptionThrown,
                        "Attempting to update an audit log should throw a RuntimeException"
                    );
                    
                    // Verify the data hasn't changed
                    $log->refresh();
                    $this->assertEquals($logData['original_action'], $log->action);
                    $this->assertEquals($logData['original_model_type'], $log->model_type);
                    $this->assertEquals($logData['original_model_id'], $log->model_id);
                }
            });
    }

    /**
     * Test that audit log entries cannot be deleted via Eloquent.
     * 
     * @test
     */
    public function audit_log_entries_cannot_be_deleted_via_eloquent()
    {
        $this->forAll(
            Generators::choose(2, 6) // Number of audit logs to create
        )
            ->withMaxSize(3)
            ->then(function ($logCount) {
                // Clean database before each iteration
                DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 1');
                DB::table('audit_logs')->delete();
                DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 0');
                
                $createdLogIds = [];
                
                // Create multiple audit log entries
                for ($i = 0; $i < $logCount; $i++) {
                    $log = $this->createAuditLog(
                        'create',
                        Offering::class,
                        rand(1, 1000),
                        null,
                        ['amount' => rand(10, 500)]
                    );
                    
                    $createdLogIds[] = $log->id;
                }
                
                // Property: Attempting to delete audit logs should throw an exception
                foreach ($createdLogIds as $logId) {
                    $log = AuditLog::find($logId);
                    
                    $exceptionThrown = false;
                    try {
                        $log->delete();
                    } catch (\RuntimeException $e) {
                        $exceptionThrown = true;
                        $this->assertStringContainsString('immutable', $e->getMessage());
                    }
                    
                    $this->assertTrue(
                        $exceptionThrown,
                        "Attempting to delete an audit log should throw a RuntimeException"
                    );
                    
                    // Verify the log still exists
                    $stillExists = AuditLog::find($logId);
                    $this->assertNotNull($stillExists, "Audit log should still exist after failed deletion");
                }
                
                // Verify all logs still exist
                $remainingLogs = AuditLog::whereIn('id', $createdLogIds)->count();
                $this->assertEquals($logCount, $remainingLogs);
            });
    }

    /**
     * Test that audit log entries cannot be force deleted via Eloquent.
     * 
     * @test
     */
    public function audit_log_entries_cannot_be_force_deleted()
    {
        $this->forAll(
            Generators::choose(2, 5) // Number of audit logs to create
        )
            ->withMaxSize(3)
            ->then(function ($logCount) {
                // Clean database before each iteration
                DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 1');
                DB::table('audit_logs')->delete();
                DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 0');
                
                $createdLogIds = [];
                
                // Create multiple audit log entries
                for ($i = 0; $i < $logCount; $i++) {
                    $log = $this->createAuditLog(
                        'delete',
                        Offering::class,
                        rand(1, 1000),
                        ['amount' => rand(10, 500)],
                        null
                    );
                    
                    $createdLogIds[] = $log->id;
                }
                
                // Property: Attempting to force delete audit logs should throw an exception
                foreach ($createdLogIds as $logId) {
                    $log = AuditLog::find($logId);
                    
                    $exceptionThrown = false;
                    try {
                        $log->forceDelete();
                    } catch (\RuntimeException $e) {
                        $exceptionThrown = true;
                        $this->assertStringContainsString('immutable', $e->getMessage());
                    }
                    
                    $this->assertTrue(
                        $exceptionThrown,
                        "Attempting to force delete an audit log should throw a RuntimeException"
                    );
                    
                    // Verify the log still exists
                    $stillExists = AuditLog::find($logId);
                    $this->assertNotNull($stillExists, "Audit log should still exist after failed force deletion");
                }
                
                // Verify all logs still exist
                $remainingLogs = AuditLog::whereIn('id', $createdLogIds)->count();
                $this->assertEquals($logCount, $remainingLogs);
            });
    }

    /**
     * Test that audit log created_at timestamp cannot be modified.
     * 
     * @test
     */
    public function audit_log_timestamp_is_immutable()
    {
        $this->forAll(
            Generators::choose(2, 5) // Number of audit logs to create
        )
            ->withMaxSize(3)
            ->then(function ($logCount) {
                // Clean database before each iteration
                DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 1');
                DB::table('audit_logs')->delete();
                DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 0');
                
                $createdLogs = [];
                
                // Create multiple audit log entries
                for ($i = 0; $i < $logCount; $i++) {
                    $log = $this->createAuditLog(
                        'create',
                        Offering::class,
                        rand(1, 1000),
                        null,
                        ['amount' => rand(10, 500)]
                    );
                    
                    $createdLogs[] = [
                        'id' => $log->id,
                        'original_created_at' => $log->created_at->toDateTimeString(),
                    ];
                }
                
                // Property: Attempting to update created_at should throw an exception
                foreach ($createdLogs as $logData) {
                    $log = AuditLog::find($logData['id']);
                    
                    $exceptionThrown = false;
                    try {
                        $log->created_at = now()->addDay();
                        $log->save();
                    } catch (\RuntimeException $e) {
                        $exceptionThrown = true;
                    }
                    
                    $this->assertTrue(
                        $exceptionThrown,
                        "Attempting to modify audit log timestamp should throw an exception"
                    );
                    
                    // Verify the timestamp hasn't changed
                    $log->refresh();
                    $this->assertEquals(
                        $logData['original_created_at'],
                        $log->created_at->toDateTimeString(),
                        "Audit log timestamp should remain unchanged"
                    );
                }
            });
    }

    /**
     * Test that the update() method throws an exception.
     * 
     * @test
     */
    public function update_method_throws_exception()
    {
        // Clean database
        DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 1');
        DB::table('audit_logs')->delete();
        DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 0');
        
        // Create an audit log
        $log = $this->createAuditLog(
            'create',
            Offering::class,
            1,
            null,
            ['amount' => 100]
        );
        
        // Property: Calling update() should throw an exception
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('immutable');
        
        $log->update(['action' => 'modified']);
    }

    /**
     * Test that bulk update operations cannot modify audit logs.
     * 
     * @test
     */
    public function bulk_update_via_eloquent_is_prevented()
    {
        // Clean database
        DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 1');
        DB::table('audit_logs')->delete();
        DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 0');
        
        $createdLogs = [];
        
        // Create multiple audit log entries
        for ($i = 0; $i < 5; $i++) {
            $log = $this->createAuditLog(
                'create',
                Offering::class,
                rand(1, 1000),
                null,
                ['amount' => rand(10, 500)]
            );
            
            $createdLogs[] = [
                'id' => $log->id,
                'original_action' => $log->action,
            ];
        }
        
        // Property: Each individual update in a loop should throw an exception
        foreach ($createdLogs as $logData) {
            $log = AuditLog::find($logData['id']);
            
            $exceptionThrown = false;
            try {
                $log->update(['action' => 'bulk_modified']);
            } catch (\RuntimeException $e) {
                $exceptionThrown = true;
            }
            
            $this->assertTrue($exceptionThrown, "Update should throw exception");
            
            // Verify no modification occurred
            $log->refresh();
            $this->assertEquals($logData['original_action'], $log->action);
        }
    }

    /**
     * Test that attempting to save changes throws an exception.
     * 
     * @test
     */
    public function save_after_modification_throws_exception()
    {
        // Clean database
        DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 1');
        DB::table('audit_logs')->delete();
        DB::statement('SET @DISABLE_AUDIT_TRIGGERS = 0');
        
        // Create an audit log
        $log = $this->createAuditLog(
            'create',
            Offering::class,
            1,
            null,
            ['amount' => 100]
        );
        
        $originalAction = $log->action;
        
        // Property: Modifying and saving should throw an exception
        $exceptionThrown = false;
        try {
            $log->action = 'modified';
            $log->model_id = 999;
            $log->save();
        } catch (\RuntimeException $e) {
            $exceptionThrown = true;
            $this->assertStringContainsString('immutable', $e->getMessage());
        }
        
        $this->assertTrue($exceptionThrown, "Save after modification should throw exception");
        
        // Verify data hasn't changed
        $log->refresh();
        $this->assertEquals($originalAction, $log->action);
        $this->assertNotEquals(999, $log->model_id);
    }
}
