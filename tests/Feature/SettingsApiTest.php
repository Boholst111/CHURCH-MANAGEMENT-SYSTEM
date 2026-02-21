<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\ChurchSettings;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class SettingsApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }

    /** @test */
    public function church_settings_endpoint_requires_authentication()
    {
        $response = $this->getJson('/api/settings/church');
        $response->assertStatus(401);
    }

    /** @test */
    public function notification_preferences_endpoint_requires_authentication()
    {
        $response = $this->getJson('/api/settings/notifications');
        $response->assertStatus(401);
    }

    /** @test */
    public function complete_church_settings_workflow()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);

        // Create initial settings
        $createResponse = $this->putJson('/api/settings/church', [
            'church_name' => 'Mahayahay Free Methodist Church',
            'address' => '123 Church Street',
            'city' => 'Mahayahay',
            'state' => 'Southern Leyte',
            'zip_code' => '6600',
            'phone' => '+63-123-456-7890',
            'email' => 'info@mahayahay-fmc.org',
            'website' => 'https://mahayahay-fmc.org',
            'service_times' => 'Sunday: 9:00 AM - 11:00 AM, Wednesday: 7:00 PM - 8:30 PM',
        ]);

        $createResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Church settings updated successfully',
            ]);

        // Retrieve settings
        $getResponse = $this->getJson('/api/settings/church');
        $getResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'church_name' => 'Mahayahay Free Methodist Church',
                    'city' => 'Mahayahay',
                ],
            ]);

        // Update settings
        $updateResponse = $this->putJson('/api/settings/church', [
            'church_name' => 'Mahayahay Free Methodist Church - Updated',
            'address' => '456 New Address',
            'city' => 'Mahayahay',
            'state' => 'Southern Leyte',
            'zip_code' => '6600',
            'phone' => '+63-987-654-3210',
            'email' => 'contact@mahayahay-fmc.org',
            'service_times' => 'Sunday: 10:00 AM - 12:00 PM',
        ]);

        $updateResponse->assertStatus(200);

        // Verify update
        $verifyResponse = $this->getJson('/api/settings/church');
        $verifyResponse->assertJson([
            'data' => [
                'church_name' => 'Mahayahay Free Methodist Church - Updated',
                'phone' => '+63-987-654-3210',
            ],
        ]);
    }

    /** @test */
    public function complete_notification_preferences_workflow()
    {
        $user = User::factory()->create(['role' => 'staff']);
        Sanctum::actingAs($user);

        // Get default preferences
        $getResponse = $this->getJson('/api/settings/notifications');
        $getResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'email_notifications' => true,
                    'sms_notifications' => false,
                    'system_notifications' => true,
                ],
            ]);

        // Update all preferences
        $updateAllResponse = $this->putJson('/api/settings/notifications', [
            'email_notifications' => false,
            'sms_notifications' => true,
            'system_notifications' => false,
        ]);

        $updateAllResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Notification preferences updated successfully',
            ]);

        // Verify update
        $verifyResponse = $this->getJson('/api/settings/notifications');
        $verifyResponse->assertJson([
            'data' => [
                'email_notifications' => false,
                'sms_notifications' => true,
                'system_notifications' => false,
            ],
        ]);

        // Update single preference
        $updateSingleResponse = $this->putJson('/api/settings/notifications', [
            'email_notifications' => true,
        ]);

        $updateSingleResponse->assertStatus(200);

        // Verify partial update
        $verifyPartialResponse = $this->getJson('/api/settings/notifications');
        $verifyPartialResponse->assertJson([
            'data' => [
                'email_notifications' => true,
                'sms_notifications' => true, // unchanged
                'system_notifications' => false, // unchanged
            ],
        ]);
    }

    /** @test */
    public function church_settings_validation_errors_are_returned()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);

        $response = $this->putJson('/api/settings/church', [
            'church_name' => '', // required
            'email' => 'invalid-email', // invalid format
        ]);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Validation failed',
            ])
            ->assertJsonStructure([
                'errors' => ['church_name', 'email'],
            ]);
    }

    /** @test */
    public function staff_can_update_church_settings()
    {
        $staff = User::factory()->create(['role' => 'staff']);
        Sanctum::actingAs($staff);

        $response = $this->putJson('/api/settings/church', [
            'church_name' => 'Test Church',
            'address' => '123 Main St',
            'city' => 'Test City',
            'state' => 'TS',
            'zip_code' => '12345',
            'phone' => '555-1234',
            'email' => 'test@church.com',
            'service_times' => 'Sunday 10am',
        ]);

        $response->assertStatus(200);
    }

    /** @test */
    public function readonly_user_can_view_but_not_update_church_settings()
    {
        $readonly = User::factory()->create(['role' => 'readonly']);
        Sanctum::actingAs($readonly);

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

        // Can view
        $getResponse = $this->getJson('/api/settings/church');
        $getResponse->assertStatus(200);

        // Cannot update
        $updateResponse = $this->putJson('/api/settings/church', [
            'church_name' => 'Updated Church',
            'address' => '456 Oak Ave',
            'city' => 'New City',
            'state' => 'NC',
            'zip_code' => '67890',
            'phone' => '555-5678',
            'email' => 'updated@church.com',
            'service_times' => 'Sunday 11am',
        ]);

        $updateResponse->assertStatus(403);
    }

    /** @test */
    public function all_users_can_manage_their_own_notification_preferences()
    {
        $roles = ['admin', 'staff', 'readonly'];

        foreach ($roles as $role) {
            $user = User::factory()->create(['role' => $role]);
            Sanctum::actingAs($user);

            // Can view
            $getResponse = $this->getJson('/api/settings/notifications');
            $getResponse->assertStatus(200);

            // Can update
            $updateResponse = $this->putJson('/api/settings/notifications', [
                'email_notifications' => false,
            ]);
            $updateResponse->assertStatus(200);
        }
    }

    /** @test */
    public function church_settings_persist_across_requests()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);

        // Create settings
        $this->putJson('/api/settings/church', [
            'church_name' => 'Persistent Church',
            'address' => '123 Main St',
            'city' => 'Test City',
            'state' => 'TS',
            'zip_code' => '12345',
            'phone' => '555-1234',
            'email' => 'test@church.com',
            'service_times' => 'Sunday 10am',
        ]);

        // Verify persistence with multiple requests
        for ($i = 0; $i < 3; $i++) {
            $response = $this->getJson('/api/settings/church');
            $response->assertStatus(200)
                ->assertJson([
                    'data' => [
                        'church_name' => 'Persistent Church',
                    ],
                ]);
        }
    }
}
