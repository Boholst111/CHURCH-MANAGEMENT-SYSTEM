<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Member;
use App\Models\Event;
use App\Models\Leadership;
use App\Models\SmallGroup;
use App\Models\Offering;
use App\Models\Expense;
use App\Models\Budget;
use App\Models\Pledge;
use App\Models\Fund;
use App\Models\Vendor;
use App\Models\ExpenseCategory;
use App\Models\OfferingType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

/**
 * Integration tests for existing delete operations to verify soft delete behavior.
 * 
 * These tests verify that:
 * 1. Delete operations perform soft delete (set deleted_at timestamp)
 * 2. Deleted items are excluded from list endpoints
 * 
 * Requirements: 10.3, 10.4
 */
class ExistingDeleteOperationsTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $staffUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->adminUser = User::factory()->create(['role' => 'admin']);
        $this->staffUser = User::factory()->create(['role' => 'staff']);
    }

    /** @test */
    public function member_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        $member = Member::factory()->create();

        $response = $this->deleteJson("/api/members/{$member->id}");

        $response->assertStatus(200);
        
        // Verify soft delete: record exists with deleted_at timestamp
        $this->assertSoftDeleted('members', ['id' => $member->id]);
        
        // Verify the deleted_at timestamp is set
        $deletedMember = Member::withTrashed()->find($member->id);
        $this->assertNotNull($deletedMember->deleted_at);
    }

    /** @test */
    public function deleted_members_are_excluded_from_list()
    {
        Sanctum::actingAs($this->adminUser);
        
        // Create active and deleted members
        $activeMember = Member::factory()->create(['first_name' => 'Active']);
        $deletedMember = Member::factory()->create(['first_name' => 'Deleted']);
        $deletedMember->delete();

        // List members
        $response = $this->getJson('/api/members');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        // Verify only active member is returned
        $this->assertCount(1, $data);
        $this->assertEquals($activeMember->id, $data[0]['id']);
        $this->assertEquals('Active', $data[0]['first_name']);
    }

    /** @test */
    public function event_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        $event = Event::factory()->create();

        $response = $this->deleteJson("/api/events/{$event->id}");

        $response->assertStatus(200);
        $this->assertSoftDeleted('events', ['id' => $event->id]);
        
        $deletedEvent = Event::withTrashed()->find($event->id);
        $this->assertNotNull($deletedEvent->deleted_at);
    }

    /** @test */
    public function deleted_events_are_excluded_from_list()
    {
        Sanctum::actingAs($this->adminUser);
        
        $activeEvent = Event::factory()->create(['title' => 'Active Event']);
        $deletedEvent = Event::factory()->create(['title' => 'Deleted Event']);
        $deletedEvent->delete();

        $response = $this->getJson('/api/events');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        $eventTitles = array_column($data, 'title');
        $this->assertContains('Active Event', $eventTitles);
        $this->assertNotContains('Deleted Event', $eventTitles);
    }

    /** @test */
    public function leadership_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        $leadership = Leadership::factory()->create();

        $response = $this->deleteJson("/api/leadership/{$leadership->id}");

        $response->assertStatus(200);
        $this->assertSoftDeleted('leadership', ['id' => $leadership->id]);
        
        $deletedLeadership = Leadership::withTrashed()->find($leadership->id);
        $this->assertNotNull($deletedLeadership->deleted_at);
    }

    /** @test */
    public function deleted_leadership_are_excluded_from_list()
    {
        Sanctum::actingAs($this->adminUser);
        
        $activeLeadership = Leadership::factory()->create(['first_name' => 'Active', 'last_name' => 'Leader']);
        $deletedLeadership = Leadership::factory()->create(['first_name' => 'Deleted', 'last_name' => 'Leader']);
        $deletedLeadership->delete();

        $response = $this->getJson('/api/leadership');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        $firstNames = array_column($data, 'first_name');
        $this->assertContains('Active', $firstNames);
        $this->assertNotContains('Deleted', $firstNames);
    }

    /** @test */
    public function small_group_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        $smallGroup = SmallGroup::factory()->create();

        $response = $this->deleteJson("/api/small-groups/{$smallGroup->id}");

        $response->assertStatus(200);
        $this->assertSoftDeleted('small_groups', ['id' => $smallGroup->id]);
        
        $deletedGroup = SmallGroup::withTrashed()->find($smallGroup->id);
        $this->assertNotNull($deletedGroup->deleted_at);
    }

    /** @test */
    public function deleted_small_groups_are_excluded_from_list()
    {
        Sanctum::actingAs($this->adminUser);
        
        $activeGroup = SmallGroup::factory()->create(['name' => 'Active Group']);
        $deletedGroup = SmallGroup::factory()->create(['name' => 'Deleted Group']);
        $deletedGroup->delete();

        $response = $this->getJson('/api/small-groups');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        $names = array_column($data, 'name');
        $this->assertContains('Active Group', $names);
        $this->assertNotContains('Deleted Group', $names);
    }

    /** @test */
    public function offering_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        
        // Create required dependencies with unique names
        $offeringType = OfferingType::factory()->create(['name' => 'Test Offering Type ' . uniqid()]);
        $fund = Fund::factory()->create(['name' => 'Test Fund ' . uniqid()]);
        
        $offering = Offering::factory()->create([
            'offering_type_id' => $offeringType->id,
            'fund_id' => $fund->id,
        ]);

        // Delete through repository (as done in the service layer)
        $offering->delete();

        $this->assertSoftDeleted('offerings', ['id' => $offering->id]);
        
        $deletedOffering = Offering::withTrashed()->find($offering->id);
        $this->assertNotNull($deletedOffering->deleted_at);
    }

    /** @test */
    public function expense_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        
        // Create required dependencies with unique names
        $category = ExpenseCategory::factory()->create(['name' => 'Test Category ' . uniqid()]);
        $fund = Fund::factory()->create(['name' => 'Test Fund ' . uniqid()]);
        $vendor = Vendor::factory()->create(['name' => 'Test Vendor ' . uniqid()]);
        
        $expense = Expense::factory()->create([
            'expense_category_id' => $category->id,
            'fund_id' => $fund->id,
            'vendor_id' => $vendor->id,
        ]);

        $expense->delete();

        $this->assertSoftDeleted('expenses', ['id' => $expense->id]);
        
        $deletedExpense = Expense::withTrashed()->find($expense->id);
        $this->assertNotNull($deletedExpense->deleted_at);
    }

    /** @test */
    public function budget_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        
        $budget = Budget::factory()->create(['name' => 'Test Budget ' . uniqid()]);

        $budget->delete();

        $this->assertSoftDeleted('budgets', ['id' => $budget->id]);
        
        $deletedBudget = Budget::withTrashed()->find($budget->id);
        $this->assertNotNull($deletedBudget->deleted_at);
    }

    /** @test */
    public function pledge_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        
        $member = Member::factory()->create();
        $offeringType = OfferingType::factory()->create(['name' => 'Test Type ' . uniqid()]);
        
        $pledge = Pledge::factory()->create([
            'member_id' => $member->id,
            'offering_type_id' => $offeringType->id,
        ]);

        $pledge->delete();

        $this->assertSoftDeleted('pledges', ['id' => $pledge->id]);
        
        $deletedPledge = Pledge::withTrashed()->find($pledge->id);
        $this->assertNotNull($deletedPledge->deleted_at);
    }

    /** @test */
    public function fund_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        
        $fund = Fund::factory()->create(['name' => 'Test Fund ' . uniqid()]);

        $fund->delete();

        $this->assertSoftDeleted('funds', ['id' => $fund->id]);
        
        $deletedFund = Fund::withTrashed()->find($fund->id);
        $this->assertNotNull($deletedFund->deleted_at);
    }

    /** @test */
    public function vendor_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        
        $vendor = Vendor::factory()->create(['name' => 'Test Vendor ' . uniqid()]);

        $vendor->delete();

        $this->assertSoftDeleted('vendors', ['id' => $vendor->id]);
        
        $deletedVendor = Vendor::withTrashed()->find($vendor->id);
        $this->assertNotNull($deletedVendor->deleted_at);
    }

    /** @test */
    public function expense_category_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        
        $category = ExpenseCategory::factory()->create(['name' => 'Test Category ' . uniqid()]);

        $category->delete();

        $this->assertSoftDeleted('expense_categories', ['id' => $category->id]);
        
        $deletedCategory = ExpenseCategory::withTrashed()->find($category->id);
        $this->assertNotNull($deletedCategory->deleted_at);
    }

    /** @test */
    public function offering_type_delete_performs_soft_delete()
    {
        Sanctum::actingAs($this->adminUser);
        
        $offeringType = OfferingType::factory()->create(['name' => 'Test Type ' . uniqid()]);

        $offeringType->delete();

        $this->assertSoftDeleted('offering_types', ['id' => $offeringType->id]);
        
        $deletedType = OfferingType::withTrashed()->find($offeringType->id);
        $this->assertNotNull($deletedType->deleted_at);
    }

    /** @test */
    public function deleted_items_can_be_queried_with_trashed()
    {
        Sanctum::actingAs($this->adminUser);
        
        // Create and delete a member
        $member = Member::factory()->create(['first_name' => 'Deleted']);
        $memberId = $member->id;
        $member->delete();

        // Verify it's not in default query
        $this->assertNull(Member::find($memberId));
        
        // Verify it can be found with withTrashed
        $trashedMember = Member::withTrashed()->find($memberId);
        $this->assertNotNull($trashedMember);
        $this->assertEquals('Deleted', $trashedMember->first_name);
        $this->assertNotNull($trashedMember->deleted_at);
    }

    /** @test */
    public function only_trashed_query_returns_only_deleted_items()
    {
        Sanctum::actingAs($this->adminUser);
        
        // Create active and deleted members
        $activeMember = Member::factory()->create(['first_name' => 'Active']);
        $deletedMember = Member::factory()->create(['first_name' => 'Deleted']);
        $deletedMember->delete();

        // Query only trashed
        $trashedMembers = Member::onlyTrashed()->get();

        $this->assertCount(1, $trashedMembers);
        $this->assertEquals('Deleted', $trashedMembers->first()->first_name);
    }
}
