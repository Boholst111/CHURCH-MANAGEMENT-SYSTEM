<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('Password123'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'Password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'user' => ['id', 'name', 'email', 'role'],
                'token',
            ]);

        $this->assertTrue($response->json('success'));
    }

    public function test_user_cannot_login_with_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('Password123'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'WrongPassword',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_login_logs_activity()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('Password123'),
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'Password123',
        ]);

        $this->assertDatabaseHas('activities', [
            'user_id' => $user->id,
            'action' => 'login',
            'entity_type' => 'user',
        ]);
    }

    public function test_user_can_register_with_valid_data()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'newuser@example.com',
            'password' => 'Password123',
            'role' => 'staff',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'user' => ['id', 'name', 'email', 'role'],
                'token',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
            'role' => 'staff',
        ]);
    }

    public function test_registration_requires_password_complexity()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'newuser@example.com',
            'password' => 'simple',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_password_must_contain_uppercase_lowercase_and_number()
    {
        // Missing uppercase
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'test1@example.com',
            'password' => 'password123',
        ]);
        $response->assertStatus(422)->assertJsonValidationErrors(['password']);

        // Missing lowercase
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'test2@example.com',
            'password' => 'PASSWORD123',
        ]);
        $response->assertStatus(422)->assertJsonValidationErrors(['password']);

        // Missing number
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'test3@example.com',
            'password' => 'PasswordOnly',
        ]);
        $response->assertStatus(422)->assertJsonValidationErrors(['password']);

        // Valid password
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'test4@example.com',
            'password' => 'Password123',
        ]);
        $response->assertStatus(201);
    }

    public function test_authenticated_user_can_get_profile()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/profile');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                ],
            ]);
    }

    public function test_authenticated_user_can_update_profile()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->putJson('/api/profile', [
                'name' => 'Updated Name',
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Profile updated successfully',
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
        ]);
    }

    public function test_profile_update_enforces_password_complexity()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->putJson('/api/profile', [
                'password' => 'weak',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_authenticated_user_can_logout()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/auth/logout');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logged out successfully',
            ]);
    }

    public function test_logout_logs_activity()
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/auth/logout');

        $this->assertDatabaseHas('activities', [
            'user_id' => $user->id,
            'action' => 'logout',
            'entity_type' => 'user',
        ]);
    }

    public function test_unauthenticated_user_cannot_access_protected_routes()
    {
        $response = $this->getJson('/api/profile');
        $response->assertStatus(401);

        $response = $this->putJson('/api/profile', ['name' => 'Test']);
        $response->assertStatus(401);

        $response = $this->postJson('/api/auth/logout');
        $response->assertStatus(401);
    }
}
