<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\UserInvitation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserInvitationMail;

class UserInvitationTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create an admin user for testing
        $this->admin = User::factory()->create([
            'role' => 'admin',
        ]);
    }

    /**
     * Test that an admin can invite a new user.
     */
    public function test_admin_can_invite_user(): void
    {
        Mail::fake();

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/users/invite', [
                'email' => 'newuser@example.com',
                'role' => 'staff',
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Invitation sent successfully',
            ]);

        // Verify invitation was created in database
        $this->assertDatabaseHas('user_invitations', [
            'email' => 'newuser@example.com',
            'role' => 'staff',
            'status' => 'pending',
            'invited_by' => $this->admin->id,
        ]);

        // Verify email was queued
        Mail::assertQueued(UserInvitationMail::class, function ($mail) {
            return $mail->invitation->email === 'newuser@example.com';
        });
    }

    /**
     * Test that invitation requires valid email.
     */
    public function test_invitation_requires_valid_email(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/users/invite', [
                'email' => 'invalid-email',
                'role' => 'staff',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test that invitation requires valid role.
     */
    public function test_invitation_requires_valid_role(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/users/invite', [
                'email' => 'newuser@example.com',
                'role' => 'invalid-role',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);
    }

    /**
     * Test that email must be unique among users.
     */
    public function test_invitation_email_must_be_unique_among_users(): void
    {
        User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/users/invite', [
                'email' => 'existing@example.com',
                'role' => 'staff',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test that email must be unique among pending invitations.
     */
    public function test_invitation_email_must_be_unique_among_invitations(): void
    {
        UserInvitation::factory()->create([
            'email' => 'pending@example.com',
            'status' => 'pending',
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/users/invite', [
                'email' => 'pending@example.com',
                'role' => 'staff',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test that admin can get all invitations.
     */
    public function test_admin_can_get_invitations(): void
    {
        $invitation = UserInvitation::factory()->create([
            'email' => 'invited@example.com',
            'role' => 'staff',
            'status' => 'pending',
            'invited_by' => $this->admin->id,
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/users/invitations');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonFragment([
                'email' => 'invited@example.com',
                'role' => 'staff',
                'status' => 'pending',
            ]);
    }

    /**
     * Test that admin can resend an invitation.
     */
    public function test_admin_can_resend_invitation(): void
    {
        Mail::fake();

        $invitation = UserInvitation::factory()->create([
            'email' => 'invited@example.com',
            'role' => 'staff',
            'status' => 'pending',
            'invited_by' => $this->admin->id,
        ]);

        $oldToken = $invitation->token;
        $oldExpiresAt = $invitation->expires_at;

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson("/api/users/invitations/{$invitation->id}/resend");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Invitation resent successfully',
            ]);

        // Verify token and expiration were updated
        $invitation->refresh();
        $this->assertNotEquals($oldToken, $invitation->token);
        $this->assertNotEquals($oldExpiresAt, $invitation->expires_at);

        // Verify email was queued
        Mail::assertQueued(UserInvitationMail::class);
    }

    /**
     * Test that accepted invitations cannot be resent.
     */
    public function test_accepted_invitations_cannot_be_resent(): void
    {
        $invitation = UserInvitation::factory()->create([
            'email' => 'accepted@example.com',
            'role' => 'staff',
            'status' => 'accepted',
            'invited_by' => $this->admin->id,
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson("/api/users/invitations/{$invitation->id}/resend");

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'This invitation has already been accepted',
            ]);
    }

    /**
     * Test that admin can cancel an invitation.
     */
    public function test_admin_can_cancel_invitation(): void
    {
        $invitation = UserInvitation::factory()->create([
            'email' => 'invited@example.com',
            'role' => 'staff',
            'status' => 'pending',
            'invited_by' => $this->admin->id,
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/users/invitations/{$invitation->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Invitation cancelled successfully',
            ]);

        // Verify invitation was deleted
        $this->assertDatabaseMissing('user_invitations', [
            'id' => $invitation->id,
        ]);
    }

    /**
     * Test that accepted invitations cannot be cancelled.
     */
    public function test_accepted_invitations_cannot_be_cancelled(): void
    {
        $invitation = UserInvitation::factory()->create([
            'email' => 'accepted@example.com',
            'role' => 'staff',
            'status' => 'accepted',
            'invited_by' => $this->admin->id,
        ]);

        $response = $this->actingAs($this->admin, 'sanctum')
            ->deleteJson("/api/users/invitations/{$invitation->id}");

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Cannot cancel an accepted invitation',
            ]);

        // Verify invitation still exists
        $this->assertDatabaseHas('user_invitations', [
            'id' => $invitation->id,
        ]);
    }

    /**
     * Test that non-admin users cannot invite users.
     */
    public function test_non_admin_cannot_invite_users(): void
    {
        $staff = User::factory()->create([
            'role' => 'staff',
        ]);

        $response = $this->actingAs($staff, 'sanctum')
            ->postJson('/api/users/invite', [
                'email' => 'newuser@example.com',
                'role' => 'staff',
            ]);

        $response->assertStatus(403);
    }

    /**
     * Test that non-admin users cannot view invitations.
     */
    public function test_non_admin_cannot_view_invitations(): void
    {
        $staff = User::factory()->create([
            'role' => 'staff',
        ]);

        $response = $this->actingAs($staff, 'sanctum')
            ->getJson('/api/users/invitations');

        $response->assertStatus(403);
    }
}

