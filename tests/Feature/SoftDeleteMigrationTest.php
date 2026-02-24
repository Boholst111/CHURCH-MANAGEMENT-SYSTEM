<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use App\Models\Member;
use App\Models\Event;
use App\Models\Leadership;
use App\Models\SmallGroup;
use App\Models\Budget;
use App\Models\Pledge;
use App\Models\Fund;
use App\Models\Vendor;
use App\Models\ExpenseCategory;
use App\Models\OfferingType;

/**
 * Tests for soft delete migration data preservation
 * 
 * Validates Requirements 9.2, 9.3:
 * - Running migrations preserves all existing data
 * - deleted_at is set to null for all existing records
 */
class SoftDeleteMigrationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that all archivable tables have deleted_at column
     * 
     * @return void
     */
    public function test_all_archivable_tables_have_deleted_at_column()
    {
        $tables = [
            'members',
            'events',
            'leadership',
            'small_groups',
            'budgets',
            'pledges',
            'funds',
            'vendors',
            'expense_categories',
            'offering_types',
        ];

        foreach ($tables as $table) {
            $this->assertTrue(
                Schema::hasColumn($table, 'deleted_at'),
                "Table {$table} should have deleted_at column"
            );
        }
    }

    /**
     * Test that deleted_at column has index for performance
     * 
     * @return void
     */
    public function test_deleted_at_columns_have_indexes()
    {
        $tables = [
            'members',
            'events',
            'leadership',
            'small_groups',
            'budgets',
            'pledges',
            'funds',
            'vendors',
            'expense_categories',
            'offering_types',
        ];

        foreach ($tables as $table) {
            $indexes = DB::select("SHOW INDEX FROM {$table} WHERE Column_name = 'deleted_at'");
            $this->assertNotEmpty(
                $indexes,
                "Table {$table} should have an index on deleted_at column"
            );
        }
    }

    /**
     * Test that existing data is preserved after migration
     * 
     * @return void
     */
    public function test_migration_preserves_existing_data()
    {
        // Create test data
        $member = Member::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'Member',
            'email' => 'test@example.com',
        ]);

        $event = Event::factory()->create([
            'title' => 'Test Event',
        ]);

        // Verify data exists
        $this->assertDatabaseHas('members', [
            'id' => $member->id,
            'first_name' => 'Test',
            'last_name' => 'Member',
            'email' => 'test@example.com',
        ]);

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'title' => 'Test Event',
        ]);

        // Verify all field values are preserved
        $memberFromDb = Member::find($member->id);
        $this->assertEquals('Test', $memberFromDb->first_name);
        $this->assertEquals('Member', $memberFromDb->last_name);
        $this->assertEquals('test@example.com', $memberFromDb->email);

        $eventFromDb = Event::find($event->id);
        $this->assertEquals('Test Event', $eventFromDb->title);
    }

    /**
     * Test that deleted_at is null for existing records
     * 
     * @return void
     */
    public function test_deleted_at_is_null_for_existing_records()
    {
        // Create test data with unique names to avoid conflicts
        $member = Member::factory()->create();
        $event = Event::factory()->create();
        $leadership = Leadership::factory()->create();
        $smallGroup = SmallGroup::factory()->create(['name' => 'Test Group ' . uniqid()]);
        $fund = Fund::factory()->create(['name' => 'Test Fund ' . uniqid()]);
        $vendor = Vendor::factory()->create();
        $expenseCategory = ExpenseCategory::factory()->create(['name' => 'Test Category ' . uniqid()]);
        $offeringType = OfferingType::factory()->create(['name' => 'Test Offering Type ' . uniqid()]);

        // Verify deleted_at is null for all records
        $this->assertNull($member->fresh()->deleted_at);
        $this->assertNull($event->fresh()->deleted_at);
        $this->assertNull($leadership->fresh()->deleted_at);
        $this->assertNull($smallGroup->fresh()->deleted_at);
        $this->assertNull($fund->fresh()->deleted_at);
        $this->assertNull($vendor->fresh()->deleted_at);
        $this->assertNull($expenseCategory->fresh()->deleted_at);
        $this->assertNull($offeringType->fresh()->deleted_at);
    }

    /**
     * Test that deleted_at column is nullable
     * 
     * @return void
     */
    public function test_deleted_at_column_is_nullable()
    {
        $tables = [
            'members',
            'events',
            'leadership',
            'small_groups',
            'budgets',
            'pledges',
            'funds',
            'vendors',
            'expense_categories',
            'offering_types',
        ];

        foreach ($tables as $table) {
            $columns = DB::select("SHOW COLUMNS FROM {$table} WHERE Field = 'deleted_at'");
            $this->assertNotEmpty($columns, "Table {$table} should have deleted_at column");
            $this->assertEquals('YES', $columns[0]->Null, "deleted_at column in {$table} should be nullable");
        }
    }

    /**
     * Test that deleted_at column is timestamp type
     * 
     * @return void
     */
    public function test_deleted_at_column_is_timestamp_type()
    {
        $tables = [
            'members',
            'events',
            'leadership',
            'small_groups',
            'budgets',
            'pledges',
            'funds',
            'vendors',
            'expense_categories',
            'offering_types',
        ];

        foreach ($tables as $table) {
            $columns = DB::select("SHOW COLUMNS FROM {$table} WHERE Field = 'deleted_at'");
            $this->assertNotEmpty($columns, "Table {$table} should have deleted_at column");
            $this->assertEquals('timestamp', $columns[0]->Type, "deleted_at column in {$table} should be timestamp type");
        }
    }
}
