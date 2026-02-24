<?php

namespace Tests\Unit\Services;

use App\Models\Activity;
use App\Models\Budget;
use App\Models\Event;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\Fund;
use App\Models\Leadership;
use App\Models\Member;
use App\Models\Offering;
use App\Models\OfferingType;
use App\Models\Pledge;
use App\Models\SmallGroup;
use App\Models\User;
use App\Models\Vendor;
use App\Services\ArchiveService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArchiveServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ArchiveService $archiveService;
    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->archiveService = new ArchiveService();
        
        // Create and authenticate a user for activity logging
        $this->user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($this->user);
    }

    /** @test */
    public function it_lists_all_archived_items_across_all_types()
    {
        // Create and archive items of different types
        $member = Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        $member->delete();
        
        $event = Event::factory()->create(['title' => 'Test Event']);
        $event->delete();
        
        $category = ExpenseCategory::firstOrCreate(['name' => 'Test Category'], [
            'description' => 'Test',
            'is_active' => true
        ]);
        $fund = Fund::firstOrCreate(['name' => 'Test All Fund'], [
            'type' => 'unrestricted',
            'description' => 'Test',
            'current_balance' => 0,
            'is_active' => true
        ]);
        $vendor = Vendor::firstOrCreate(['name' => 'Test All Vendor'], [
            'contact_name' => 'Test',
            'email' => 'testall@example.com',
            'is_active' => true
        ]);
        $expense = Expense::factory()->create([
            'description' => 'Test Expense',
            'expense_category_id' => $category->id,
            'fund_id' => $fund->id,
            'vendor_id' => $vendor->id
        ]);
        $expense->delete();

        $archived = $this->archiveService->listAllArchived();

        $this->assertGreaterThanOrEqual(3, $archived->count());
        $this->assertTrue($archived->has('members'));
        $this->assertTrue($archived->has('events'));
        $this->assertTrue($archived->has('expenses'));
    }

    /** @test */
    public function it_lists_archived_members_by_type()
    {
        // Create archived and active members
        $archivedMember = Member::factory()->create(['first_name' => 'Archived', 'last_name' => 'Member']);
        $archivedMember->delete();
        
        $activeMember = Member::factory()->create(['first_name' => 'Active', 'last_name' => 'Member']);

        $archived = $this->archiveService->listArchivedByType('members');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedMember->id, $archived->first()['id']);
        $this->assertEquals('members', $archived->first()['type']);
        $this->assertEquals('Archived Member', $archived->first()['name']);
        $this->assertNotNull($archived->first()['deleted_at']);
    }

    /** @test */
    public function it_lists_archived_events_by_type()
    {
        $archivedEvent = Event::factory()->create(['title' => 'Archived Event']);
        $archivedEvent->delete();
        
        $activeEvent = Event::factory()->create(['title' => 'Active Event']);

        $archived = $this->archiveService->listArchivedByType('events');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedEvent->id, $archived->first()['id']);
        $this->assertEquals('events', $archived->first()['type']);
        $this->assertEquals('Archived Event', $archived->first()['name']);
    }

    /** @test */
    public function it_lists_archived_expenses_by_type()
    {
        $category = ExpenseCategory::firstOrCreate(
            ['name' => 'Test Expense Category'],
            ['description' => 'Test', 'is_active' => true]
        );
        $fund = Fund::firstOrCreate(
            ['name' => 'Test Expense Fund'],
            ['type' => 'unrestricted', 'description' => 'Test', 'current_balance' => 0, 'is_active' => true]
        );
        $vendor = Vendor::firstOrCreate(
            ['name' => 'Test Expense Vendor'],
            ['contact_name' => 'Test', 'email' => 'testexpense@example.com', 'is_active' => true]
        );
        $archivedExpense = Expense::factory()->create([
            'description' => 'Archived Expense',
            'expense_category_id' => $category->id,
            'fund_id' => $fund->id,
            'vendor_id' => $vendor->id
        ]);
        $archivedExpense->delete();
        
        $activeExpense = Expense::factory()->create([
            'description' => 'Active Expense',
            'expense_category_id' => $category->id,
            'fund_id' => $fund->id,
            'vendor_id' => $vendor->id
        ]);

        $archived = $this->archiveService->listArchivedByType('expenses');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedExpense->id, $archived->first()['id']);
        $this->assertEquals('expenses', $archived->first()['type']);
    }

    /** @test */
    public function it_lists_archived_budgets_by_type()
    {
        $archivedBudget = Budget::factory()->create(['name' => 'Archived Budget']);
        $archivedBudget->delete();

        $archived = $this->archiveService->listArchivedByType('budgets');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedBudget->id, $archived->first()['id']);
        $this->assertEquals('budgets', $archived->first()['type']);
        $this->assertEquals('Archived Budget', $archived->first()['name']);
    }

    /** @test */
    public function it_lists_archived_funds_by_type()
    {
        $archivedFund = Fund::factory()->create(['name' => 'Archived Fund']);
        $archivedFund->delete();

        $archived = $this->archiveService->listArchivedByType('funds');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedFund->id, $archived->first()['id']);
        $this->assertEquals('funds', $archived->first()['type']);
        $this->assertEquals('Archived Fund', $archived->first()['name']);
    }

    /** @test */
    public function it_lists_archived_pledges_by_type()
    {
        $offeringType = OfferingType::firstOrCreate(
            ['name' => 'Test Pledge Type'],
            ['description' => 'Test', 'is_active' => true]
        );
        $archivedPledge = Pledge::factory()->create(['offering_type_id' => $offeringType->id]);
        $archivedPledge->delete();

        $archived = $this->archiveService->listArchivedByType('pledges');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedPledge->id, $archived->first()['id']);
        $this->assertEquals('pledges', $archived->first()['type']);
    }

    /** @test */
    public function it_lists_archived_offerings_by_type()
    {
        $offeringType = OfferingType::firstOrCreate(
            ['name' => 'Test Offering Type'],
            ['description' => 'Test', 'is_active' => true]
        );
        $fund = Fund::firstOrCreate(
            ['name' => 'Test Offering Fund'],
            ['type' => 'unrestricted', 'description' => 'Test', 'current_balance' => 0, 'is_active' => true]
        );
        $archivedOffering = Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'fund_id' => $fund->id
        ]);
        $archivedOffering->delete();

        $archived = $this->archiveService->listArchivedByType('offerings');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedOffering->id, $archived->first()['id']);
        $this->assertEquals('offerings', $archived->first()['type']);
    }

    /** @test */
    public function it_lists_archived_leadership_by_type()
    {
        $archivedLeadership = Leadership::factory()->create(['first_name' => 'John', 'last_name' => 'Leader']);
        $archivedLeadership->delete();

        $archived = $this->archiveService->listArchivedByType('leadership');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedLeadership->id, $archived->first()['id']);
        $this->assertEquals('leadership', $archived->first()['type']);
        $this->assertEquals('John Leader', $archived->first()['name']);
    }

    /** @test */
    public function it_lists_archived_small_groups_by_type()
    {
        $archivedGroup = SmallGroup::factory()->create(['name' => 'Archived Group']);
        $archivedGroup->delete();

        $archived = $this->archiveService->listArchivedByType('small_groups');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedGroup->id, $archived->first()['id']);
        $this->assertEquals('small_groups', $archived->first()['type']);
        $this->assertEquals('Archived Group', $archived->first()['name']);
    }

    /** @test */
    public function it_lists_archived_vendors_by_type()
    {
        $archivedVendor = Vendor::factory()->create(['name' => 'Archived Vendor']);
        $archivedVendor->delete();

        $archived = $this->archiveService->listArchivedByType('vendors');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedVendor->id, $archived->first()['id']);
        $this->assertEquals('vendors', $archived->first()['type']);
        $this->assertEquals('Archived Vendor', $archived->first()['name']);
    }

    /** @test */
    public function it_lists_archived_expense_categories_by_type()
    {
        $archivedCategory = ExpenseCategory::factory()->create(['name' => 'Archived Category']);
        $archivedCategory->delete();

        $archived = $this->archiveService->listArchivedByType('expense_categories');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedCategory->id, $archived->first()['id']);
        $this->assertEquals('expense_categories', $archived->first()['type']);
        $this->assertEquals('Archived Category', $archived->first()['name']);
    }

    /** @test */
    public function it_lists_archived_offering_types_by_type()
    {
        $archivedType = OfferingType::factory()->create(['name' => 'Archived Type']);
        $archivedType->delete();

        $archived = $this->archiveService->listArchivedByType('offering_types');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedType->id, $archived->first()['id']);
        $this->assertEquals('offering_types', $archived->first()['type']);
        $this->assertEquals('Archived Type', $archived->first()['name']);
    }

    /** @test */
    public function it_throws_exception_for_invalid_model_type()
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid model type: invalid_type');

        $this->archiveService->listArchivedByType('invalid_type');
    }

    /** @test */
    public function it_returns_empty_collection_when_no_archived_items_exist()
    {
        // Create only active items
        Member::factory()->create();
        Event::factory()->create();

        $archived = $this->archiveService->listArchivedByType('members');

        $this->assertCount(0, $archived);
        $this->assertTrue($archived->isEmpty());
    }

    /** @test */
    public function it_restores_archived_member_successfully()
    {
        $member = Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        $member->delete();

        $this->assertSoftDeleted('members', ['id' => $member->id]);

        $result = $this->archiveService->restore('members', $member->id);

        $this->assertTrue($result);
        $this->assertDatabaseHas('members', [
            'id' => $member->id,
            'deleted_at' => null,
        ]);
    }

    /** @test */
    public function it_restores_archived_event_successfully()
    {
        $event = Event::factory()->create(['title' => 'Test Event']);
        $event->delete();

        $result = $this->archiveService->restore('events', $event->id);

        $this->assertTrue($result);
        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'deleted_at' => null,
        ]);
    }

    /** @test */
    public function it_throws_exception_when_restoring_non_existent_item()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Archived item not found with ID: 999');

        $this->archiveService->restore('members', 999);
    }

    /** @test */
    public function it_throws_exception_when_restoring_with_invalid_type()
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid model type: invalid_type');

        $this->archiveService->restore('invalid_type', 1);
    }

    /** @test */
    public function it_logs_activity_when_restoring_item()
    {
        $member = Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        $member->delete();

        $this->archiveService->restore('members', $member->id);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'restored',
            'entity_type' => 'members',
            'entity_id' => $member->id,
        ]);

        $activity = Activity::where('entity_id', $member->id)
            ->where('action', 'restored')
            ->first();
        
        $this->assertStringContainsString('Restored', $activity->description);
        $this->assertStringContainsString('John Doe', $activity->description);
    }

    /** @test */
    public function it_force_deletes_archived_member_successfully()
    {
        $member = Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        $memberId = $member->id;
        $member->delete();

        $this->assertSoftDeleted('members', ['id' => $memberId]);

        $result = $this->archiveService->forceDelete('members', $memberId);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('members', ['id' => $memberId]);
    }

    /** @test */
    public function it_force_deletes_archived_event_successfully()
    {
        $event = Event::factory()->create(['title' => 'Test Event']);
        $eventId = $event->id;
        $event->delete();

        $result = $this->archiveService->forceDelete('events', $eventId);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('events', ['id' => $eventId]);
    }

    /** @test */
    public function it_throws_exception_when_force_deleting_non_existent_item()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Archived item not found with ID: 999');

        $this->archiveService->forceDelete('members', 999);
    }

    /** @test */
    public function it_throws_exception_when_force_deleting_with_invalid_type()
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid model type: invalid_type');

        $this->archiveService->forceDelete('invalid_type', 1);
    }

    /** @test */
    public function it_logs_activity_when_force_deleting_item()
    {
        $member = Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        $memberId = $member->id;
        $member->delete();

        $this->archiveService->forceDelete('members', $memberId);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'force_deleted',
            'entity_type' => 'members',
            'entity_id' => $memberId,
        ]);

        $activity = Activity::where('entity_id', $memberId)
            ->where('action', 'force_deleted')
            ->first();
        
        $this->assertStringContainsString('Permanently deleted', $activity->description);
        $this->assertStringContainsString('John Doe', $activity->description);
    }

    /**
     * Test listArchivedByType with multiple archived items
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_lists_multiple_archived_items_of_same_type()
    {
        $member1 = Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        $member1->delete();
        
        $member2 = Member::factory()->create(['first_name' => 'Jane', 'last_name' => 'Smith']);
        $member2->delete();
        
        $member3 = Member::factory()->create(['first_name' => 'Bob', 'last_name' => 'Johnson']);
        $member3->delete();

        $archived = $this->archiveService->listArchivedByType('members');

        $this->assertCount(3, $archived);
        $this->assertEquals('John Doe', $archived->firstWhere('id', $member1->id)['name']);
        $this->assertEquals('Jane Smith', $archived->firstWhere('id', $member2->id)['name']);
        $this->assertEquals('Bob Johnson', $archived->firstWhere('id', $member3->id)['name']);
    }

    /**
     * Test that active items are excluded from archived list
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_excludes_active_items_from_archived_list()
    {
        $archivedMember = Member::factory()->create(['first_name' => 'Archived']);
        $archivedMember->delete();
        
        $activeMember = Member::factory()->create(['first_name' => 'Active']);

        $archived = $this->archiveService->listArchivedByType('members');

        $this->assertCount(1, $archived);
        $this->assertEquals($archivedMember->id, $archived->first()['id']);
        $this->assertNotEquals($activeMember->id, $archived->first()['id']);
    }

    /**
     * Test restore with valid archived item
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_restores_valid_archived_item()
    {
        $category = ExpenseCategory::firstOrCreate(
            ['name' => 'Test Restore Category'],
            ['description' => 'Test', 'is_active' => true]
        );
        $fund = Fund::firstOrCreate(
            ['name' => 'Test Restore Fund'],
            ['type' => 'unrestricted', 'description' => 'Test', 'current_balance' => 0, 'is_active' => true]
        );
        $vendor = Vendor::firstOrCreate(
            ['name' => 'Test Vendor'],
            ['contact_name' => 'Test', 'email' => 'test@example.com', 'is_active' => true]
        );
        $expense = Expense::factory()->create([
            'description' => 'Test Expense',
            'expense_category_id' => $category->id,
            'fund_id' => $fund->id,
            'vendor_id' => $vendor->id
        ]);
        $expense->delete();

        $this->assertSoftDeleted('expenses', ['id' => $expense->id]);

        $result = $this->archiveService->restore('expenses', $expense->id);

        $this->assertTrue($result);
        $this->assertNull($expense->fresh()->deleted_at);
    }

    /**
     * Test forceDelete with valid archived item
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_force_deletes_valid_archived_item()
    {
        $budget = Budget::factory()->create(['name' => 'Test Budget']);
        $budgetId = $budget->id;
        $budget->delete();

        $result = $this->archiveService->forceDelete('budgets', $budgetId);

        $this->assertTrue($result);
        $this->assertNull(Budget::withTrashed()->find($budgetId));
    }

    /**
     * Test error handling for invalid model type in restore
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_handles_invalid_model_type_in_restore()
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid model type: nonexistent_type');

        $this->archiveService->restore('nonexistent_type', 1);
    }

    /**
     * Test error handling for invalid model type in forceDelete
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_handles_invalid_model_type_in_force_delete()
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid model type: nonexistent_type');

        $this->archiveService->forceDelete('nonexistent_type', 1);
    }

    /**
     * Test error handling for non-existent item in restore
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_handles_non_existent_item_in_restore()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Archived item not found with ID: 99999');

        $this->archiveService->restore('members', 99999);
    }

    /**
     * Test error handling for non-existent item in forceDelete
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_handles_non_existent_item_in_force_delete()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Archived item not found with ID: 99999');

        $this->archiveService->forceDelete('members', 99999);
    }

    /**
     * Test deleted_at timestamp is included in archived list
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_includes_deleted_at_timestamp_in_archived_list()
    {
        $member = Member::factory()->create();
        $member->delete();

        $archived = $this->archiveService->listArchivedByType('members');

        $this->assertNotNull($archived->first()['deleted_at']);
        $this->assertInstanceOf(\Carbon\Carbon::class, $archived->first()['deleted_at']);
    }

    /**
     * Test type field is correctly set in archived list
     * **Validates: Requirements 4.2, 5.4**
     * 
     * @test
     */
    public function it_sets_correct_type_field_in_archived_list()
    {
        $member = Member::factory()->create();
        $member->delete();
        
        $event = Event::factory()->create();
        $event->delete();

        $memberArchived = $this->archiveService->listArchivedByType('members');
        $eventArchived = $this->archiveService->listArchivedByType('events');

        $this->assertEquals('members', $memberArchived->first()['type']);
        $this->assertEquals('events', $eventArchived->first()['type']);
    }
}
