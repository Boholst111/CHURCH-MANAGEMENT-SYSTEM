<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Member;
use App\Models\Leadership;
use App\Models\SmallGroup;
use App\Models\Tithe;
use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ActivityLoggingTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['role' => 'admin']);
    }

    /** @test */
    public function it_logs_member_creation()
    {
        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/members', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => now()->format('Y-m-d'),
            'gender' => 'male',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'create',
            'entity_type' => 'members',
        ]);
    }

    /** @test */
    public function it_logs_member_update()
    {
        Sanctum::actingAs($this->user);
        $member = Member::factory()->create();

        $response = $this->putJson("/api/members/{$member->id}", [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => $member->email,
            'phone' => $member->phone,
            'address' => $member->address,
            'city' => $member->city,
            'status' => $member->status,
            'date_joined' => $member->date_joined->format('Y-m-d'),
            'gender' => $member->gender,
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'update',
            'entity_type' => 'members',
            'entity_id' => (string)$member->id,
        ]);
    }

    /** @test */
    public function it_logs_member_deletion()
    {
        Sanctum::actingAs($this->user);
        $member = Member::factory()->create();

        $response = $this->deleteJson("/api/members/{$member->id}");

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'delete',
            'entity_type' => 'members',
            'entity_id' => (string)$member->id,
        ]);
    }

    /** @test */
    public function it_logs_member_csv_export()
    {
        Sanctum::actingAs($this->user);
        Member::factory()->count(5)->create();

        $response = $this->getJson('/api/members/export');

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'export',
            'entity_type' => 'members',
        ]);

        $activity = Activity::where('user_id', $this->user->id)
            ->where('action', 'export')
            ->where('entity_type', 'members')
            ->first();

        $this->assertStringContainsString('Exported', $activity->description);
        $this->assertStringContainsString('CSV', $activity->description);
    }

    /** @test */
    public function it_logs_leadership_crud_operations()
    {
        Sanctum::actingAs($this->user);

        // Create
        $response = $this->postJson('/api/leadership', [
            'first_name' => 'Pastor',
            'last_name' => 'Smith',
            'role' => 'Senior Pastor',
            'department' => 'Ministry',
            'email' => 'pastor@example.com',
            'phone' => '1234567890',
            'start_date' => now()->format('Y-m-d'),
        ]);

        $response->assertStatus(201);
        $leadershipId = $response->json('data.id');

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'create',
            'entity_type' => 'leadership',
        ]);

        // Update
        $response = $this->putJson("/api/leadership/{$leadershipId}", [
            'first_name' => 'Pastor',
            'last_name' => 'Johnson',
            'role' => 'Senior Pastor',
            'department' => 'Ministry',
            'email' => 'pastor@example.com',
            'phone' => '1234567890',
            'start_date' => now()->format('Y-m-d'),
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'update',
            'entity_type' => 'leadership',
            'entity_id' => (string)$leadershipId,
        ]);

        // Delete
        $response = $this->deleteJson("/api/leadership/{$leadershipId}");

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'delete',
            'entity_type' => 'leadership',
            'entity_id' => (string)$leadershipId,
        ]);
    }

    /** @test */
    public function it_logs_small_group_crud_operations()
    {
        Sanctum::actingAs($this->user);

        // Create
        $response = $this->postJson('/api/small-groups', [
            'name' => 'Youth Group',
            'leader_name' => 'John Leader',
            'meeting_day' => 'Friday',
            'meeting_time' => '19:00',
            'location' => 'Church Hall',
        ]);

        $response->assertStatus(201);
        $groupId = $response->json('data.id');

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'create',
            'entity_type' => 'small-groups',
        ]);

        // Update
        $response = $this->putJson("/api/small-groups/{$groupId}", [
            'name' => 'Youth Group Updated',
            'leader_name' => 'John Leader',
            'meeting_day' => 'Friday',
            'meeting_time' => '19:00',
            'location' => 'Church Hall',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'update',
            'entity_type' => 'small-groups',
            'entity_id' => (string)$groupId,
        ]);

        // Delete
        $response = $this->deleteJson("/api/small-groups/{$groupId}");

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'delete',
            'entity_type' => 'small-groups',
            'entity_id' => (string)$groupId,
        ]);
    }

    /** @test */
    public function it_logs_tithe_creation()
    {
        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/finance/tithes', [
            'amount' => 100.00,
            'payment_method' => 'cash',
            'date' => now()->format('Y-m-d'),
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'create',
            'entity_type' => 'finance',
        ]);
    }

    /** @test */
    public function it_logs_event_crud_operations()
    {
        Sanctum::actingAs($this->user);

        // Create
        $response = $this->postJson('/api/events', [
            'title' => 'Sunday Service',
            'event_date' => now()->addDays(7)->format('Y-m-d'),
            'event_time' => '10:00',
            'location' => 'Main Sanctuary',
            'status' => 'upcoming',
        ]);

        $response->assertStatus(201);
        $eventId = $response->json('data.id');

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'create',
            'entity_type' => 'events',
        ]);

        // Update
        $response = $this->putJson("/api/events/{$eventId}", [
            'title' => 'Sunday Service Updated',
            'event_date' => now()->addDays(7)->format('Y-m-d'),
            'event_time' => '10:00',
            'location' => 'Main Sanctuary',
            'status' => 'upcoming',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'update',
            'entity_type' => 'events',
            'entity_id' => (string)$eventId,
        ]);

        // Delete
        $response = $this->deleteJson("/api/events/{$eventId}");

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'delete',
            'entity_type' => 'events',
            'entity_id' => (string)$eventId,
        ]);
    }

    /** @test */
    public function it_logs_event_completion()
    {
        Sanctum::actingAs($this->user);
        $event = Event::factory()->create(['status' => 'upcoming']);

        $response = $this->putJson("/api/events/{$event->id}/complete", [
            'attendance_count' => 50,
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'update',
            'entity_type' => 'events',
            'entity_id' => (string)$event->id,
        ]);
    }

    /** @test */
    public function it_logs_pdf_export()
    {
        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/reports/export-pdf', [
            'report_type' => 'demographic',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'export',
            'entity_type' => 'report',
        ]);

        $activity = Activity::where('user_id', $this->user->id)
            ->where('action', 'export')
            ->where('entity_type', 'report')
            ->first();

        $this->assertStringContainsString('Exported', $activity->description);
        $this->assertStringContainsString('PDF', $activity->description);
    }

    /** @test */
    public function it_logs_user_login()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('Password123'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'Password123',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $user->id,
            'action' => 'login',
            'entity_type' => 'user',
            'entity_id' => $user->id,
        ]);
    }

    /** @test */
    public function it_logs_user_logout()
    {
        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/auth/logout');

        $response->assertStatus(200);

        $this->assertDatabaseHas('activities', [
            'user_id' => $this->user->id,
            'action' => 'logout',
            'entity_type' => 'user',
            'entity_id' => $this->user->id,
        ]);
    }

    /** @test */
    public function it_includes_required_fields_in_activity_log()
    {
        Sanctum::actingAs($this->user);

        $this->postJson('/api/members', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => now()->format('Y-m-d'),
            'gender' => 'male',
        ]);

        $activity = Activity::where('user_id', $this->user->id)->latest()->first();

        $this->assertNotNull($activity->user_id);
        $this->assertNotNull($activity->action);
        $this->assertNotNull($activity->entity_type);
        $this->assertNotNull($activity->description);
        $this->assertNotNull($activity->ip_address);
        $this->assertNotNull($activity->created_at);
    }

    /** @test */
    public function it_does_not_log_get_requests()
    {
        Sanctum::actingAs($this->user);

        $initialCount = Activity::count();

        $this->getJson('/api/members');

        $this->assertEquals($initialCount, Activity::count());
    }

    /** @test */
    public function it_does_not_log_failed_requests()
    {
        Sanctum::actingAs($this->user);

        $initialCount = Activity::count();

        // Try to create member with invalid data
        $this->postJson('/api/members', [
            'first_name' => 'John',
            // Missing required fields
        ]);

        $this->assertEquals($initialCount, Activity::count());
    }
}
