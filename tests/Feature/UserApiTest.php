<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Create an admin user for testing
        $this->adminUser = User::factory()->create(['role' => 'admin']);
    }

    public function test_admin_can_list_all_users()
    {
        Sanctum::actingAs($this->adminUser);

        User::factory()->count(3)->create();

        $response = $this->getJson('/api/users');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'name', 'email', 'role']
                ]
            ]);

        $this->assertTrue($response->json('success'));
        $this->assertCount(4, $response->json('data')); // 3 + admin user
    }

    public function test_non_admin_cannot_list_users()
    {
        $staffUser = User::factory()->create(['role' => 'staff']);
        Sanctum::actingAs($staffUser);

        $response = $this->getJson('/api/users');

        $response->assertStatus(403);
    }

    public function test_admin_can_create_user_with_valid_data()
    {
        Sanctum::actingAs($this->adminUser);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'Password123',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'User created successfully',
            ]);

        $this->assertDatabaseHas('users', [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'role' => 'staff',
        ]);
    }

    public function test_create_user_validates_password_complexity()
    {
        Sanctum::actingAs($this->adminUser);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'weak',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors' => ['password']
            ]);

        $this->assertFalse($response->json('success'));
    }

    public function test_create_user_validates_password_requires_uppercase()
    {
        Sanctum::actingAs($this->adminUser);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_create_user_validates_password_requires_lowercase()
    {
        Sanctum::actingAs($this->adminUser);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'PASSWORD123',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_create_user_validates_password_requires_number()
    {
        Sanctum::actingAs($this->adminUser);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'PasswordOnly',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_create_user_validates_password_minimum_length()
    {
        Sanctum::actingAs($this->adminUser);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'Pass1',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_create_user_validates_required_fields()
    {
        Sanctum::actingAs($this->adminUser);

        $response = $this->postJson('/api/users', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password', 'role']);
    }

    public function test_create_user_validates_email_format()
    {
        Sanctum::actingAs($this->adminUser);

        $userData = [
            'name' => 'New User',
            'email' => 'invalid-email',
            'password' => 'Password123',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_create_user_validates_unique_email()
    {
        Sanctum::actingAs($this->adminUser);

        $existingUser = User::factory()->create(['email' => 'existing@example.com']);

        $userData = [
            'name' => 'New User',
            'email' => 'existing@example.com',
            'password' => 'Password123',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_create_user_validates_role_enum()
    {
        Sanctum::actingAs($this->adminUser);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'Password123',
            'role' => 'invalid_role',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);
    }

    public function test_admin_can_show_user()
    {
        Sanctum::actingAs($this->adminUser);

        $user = User::factory()->create(['name' => 'Test User']);

        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => 'Test User',
                ]
            ]);
    }

    public function test_show_user_returns_not_found()
    {
        Sanctum::actingAs($this->adminUser);

        $response = $this->getJson('/api/users/999');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'User not found',
            ]);
    }

    public function test_admin_can_update_user()
    {
        Sanctum::actingAs($this->adminUser);

        $user = User::factory()->create([
            'name' => 'Original Name',
            'email' => 'original@example.com',
            'role' => 'staff',
        ]);

        $updateData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'role' => 'admin',
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'User updated successfully',
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'role' => 'admin',
        ]);
    }

    public function test_update_user_can_change_password()
    {
        Sanctum::actingAs($this->adminUser);

        $user = User::factory()->create();

        $updateData = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'NewPassword123',
            'role' => $user->role,
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updateData);

        $response->assertStatus(200);

        $user->refresh();
        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('NewPassword123', $user->password));
    }

    public function test_update_user_without_password_keeps_old_password()
    {
        Sanctum::actingAs($this->adminUser);

        $user = User::factory()->create();
        $originalPassword = $user->password;

        $updateData = [
            'name' => 'Updated Name',
            'email' => $user->email,
            'role' => $user->role,
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updateData);

        $response->assertStatus(200);

        $user->refresh();
        $this->assertEquals($originalPassword, $user->password);
    }

    public function test_admin_can_delete_user()
    {
        Sanctum::actingAs($this->adminUser);

        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'User deleted successfully',
            ]);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_non_admin_cannot_create_user()
    {
        $staffUser = User::factory()->create(['role' => 'staff']);
        Sanctum::actingAs($staffUser);

        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'Password123',
            'role' => 'staff',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(403);
    }

    public function test_non_admin_cannot_update_user()
    {
        $staffUser = User::factory()->create(['role' => 'staff']);
        Sanctum::actingAs($staffUser);

        $user = User::factory()->create();

        $response = $this->putJson("/api/users/{$user->id}", ['name' => 'Updated']);

        $response->assertStatus(403);
    }

    public function test_non_admin_cannot_delete_user()
    {
        $staffUser = User::factory()->create(['role' => 'staff']);
        Sanctum::actingAs($staffUser);

        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_access_users()
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(401);
    }
}
