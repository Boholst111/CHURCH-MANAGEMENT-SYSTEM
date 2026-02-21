<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\User;
use App\Models\ChurchSettings;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class SettingsControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    /** @test */
    public function it_can_get_church_settings()
    {
        $user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($user);

        $settings = ChurchSettings::create([
            'church_name' => 'Test Church',
            'address' => '123 Main St',
            'city' => 'Test City',
            'state' => 'TS',
            'zip_code' => '12345',
            'phone' => '555-1234',
            'email' => 'test@church.com',
            'service_times' => 'Sunday 10am',
        ]);

        $response = $this->getJson('/api/settings/church');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'church_name' => 'Test Church',
                    'address' => '123 Main St',
                    'city' => 'Test City',
                ],
            ]);
    }

    /** @test */
    public function it_returns_404_when_church_settings_not_found()
    {
        $user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/settings/church');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Church settings not found',
            ]);
    }

    /** @test */
    public function it_can_update_church_settings()
    {
        $user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($user);

        ChurchSettings::create([
            'church_name' => 'Old Church',
            'address' => '123 Main St',
            'city' => 'Test City',
            'state' => 'TS',
            'zip_code' => '12345',
            'phone' => '555-1234',
            'email' => 'test@church.com',
            'service_times' => 'Sunday 10am',
        ]);

        $response = $this->putJson('/api/settings/church', [
            'church_name' => 'Updated Church',
            'address' => '456 Oak Ave',
            'city' => 'New City',
            'state' => 'NC',
            'zip_code' => '67890',
            'phone' => '555-5678',
            'email' => 'updated@church.com',
            'service_times' => 'Sunday 11am',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Church settings updated successfully',
                'data' => [
                    'church_name' => 'Updated Church',
                    'address' => '456 Oak Ave',
                ],
            ]);

        $this->assertDatabaseHas('church_settings', [
            'church_name' => 'Updated Church',
            'address' => '456 Oak Ave',
        ]);
    }

    /** @test */
    public function it_creates_church_settings_if_not_exists()
    {
        $user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/settings/church', [
            'church_name' => 'New Church',
            'address' => '789 Pine St',
            'city' => 'Another City',
            'state' => 'AC',
            'zip_code' => '11111',
            'phone' => '555-9999',
            'email' => 'new@church.com',
            'service_times' => 'Sunday 9am',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Church settings updated successfully',
            ]);

        $this->assertDatabaseHas('church_settings', [
            'church_name' => 'New Church',
        ]);
    }

    /** @test */
    public function it_validates_required_fields_for_church_settings()
    {
        $user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/settings/church', [
            'church_name' => '',
            'address' => '',
        ]);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Validation failed',
            ])
            ->assertJsonStructure([
                'errors' => ['church_name', 'address'],
            ]);
    }

    /** @test */
    public function it_can_get_notification_preferences()
    {
        $user = User::factory()->create([
            'role' => 'admin',
            'email_notifications' => true,
            'sms_notifications' => false,
            'system_notifications' => true,
        ]);
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/settings/notifications');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'email_notifications' => true,
                    'sms_notifications' => false,
                    'system_notifications' => true,
                ],
            ]);
    }

    /** @test */
    public function it_returns_default_notification_preferences_when_not_set()
    {
        $user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/settings/notifications');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'email_notifications' => true,
                    'sms_notifications' => false,
                    'system_notifications' => true,
                ],
            ]);
    }

    /** @test */
    public function it_can_update_notification_preferences()
    {
        $user = User::factory()->create([
            'role' => 'admin',
            'email_notifications' => true,
            'sms_notifications' => false,
            'system_notifications' => true,
        ]);
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/settings/notifications', [
            'email_notifications' => false,
            'sms_notifications' => true,
            'system_notifications' => false,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Notification preferences updated successfully',
                'data' => [
                    'email_notifications' => false,
                    'sms_notifications' => true,
                    'system_notifications' => false,
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email_notifications' => false,
            'sms_notifications' => true,
            'system_notifications' => false,
        ]);
    }

    /** @test */
    public function it_can_update_partial_notification_preferences()
    {
        $user = User::factory()->create([
            'role' => 'admin',
            'email_notifications' => true,
            'sms_notifications' => false,
            'system_notifications' => true,
        ]);
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/settings/notifications', [
            'email_notifications' => false,
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email_notifications' => false,
            'sms_notifications' => false, // unchanged
            'system_notifications' => true, // unchanged
        ]);
    }

    /** @test */
    public function it_validates_notification_preferences_are_boolean()
    {
        $user = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/settings/notifications', [
            'email_notifications' => 'not-a-boolean',
            'sms_notifications' => 123,
        ]);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Validation failed',
            ]);
    }

    /** @test */
    public function readonly_user_cannot_update_church_settings()
    {
        $user = User::factory()->create(['role' => 'readonly']);
        Sanctum::actingAs($user);

        ChurchSettings::create([
            'church_name' => 'Test Church',
            'address' => '123 Main St',
            'city' => 'Test City',
            'state' => 'TS',
            'zip_code' => '12345',
            'phone' => '555-1234',
            'email' => 'test@church.com',
            'service_times' => 'Sunday 10am',
        ]);

        $response = $this->putJson('/api/settings/church', [
            'church_name' => 'Updated Church',
            'address' => '456 Oak Ave',
            'city' => 'New City',
            'state' => 'NC',
            'zip_code' => '67890',
            'phone' => '555-5678',
            'email' => 'updated@church.com',
            'service_times' => 'Sunday 11am',
        ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function any_authenticated_user_can_update_their_notification_preferences()
    {
        $user = User::factory()->create(['role' => 'readonly']);
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/settings/notifications', [
            'email_notifications' => false,
        ]);

        $response->assertStatus(200);
    }
}
