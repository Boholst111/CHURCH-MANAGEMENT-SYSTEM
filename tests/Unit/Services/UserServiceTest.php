<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;

class UserServiceTest extends TestCase
{
    use RefreshDatabase;

    protected UserService $userService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->userService = new UserService();
    }

    public function test_create_user_with_valid_data()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123',
            'role' => 'staff',
        ];

        $user = $this->userService->createUser($userData);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('Test User', $user->name);
        $this->assertEquals('test@example.com', $user->email);
        $this->assertEquals('staff', $user->role);
        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('Password123', $user->password));
    }

    public function test_create_user_validates_password_complexity()
    {
        $this->expectException(ValidationException::class);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'weak', // Too short, no uppercase, no number
            'role' => 'staff',
        ];

        $this->userService->createUser($userData);
    }

    public function test_create_user_validates_password_requires_uppercase()
    {
        $this->expectException(ValidationException::class);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123', // No uppercase
            'role' => 'staff',
        ];

        $this->userService->createUser($userData);
    }

    public function test_create_user_validates_password_requires_lowercase()
    {
        $this->expectException(ValidationException::class);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'PASSWORD123', // No lowercase
            'role' => 'staff',
        ];

        $this->userService->createUser($userData);
    }

    public function test_create_user_validates_password_requires_number()
    {
        $this->expectException(ValidationException::class);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'PasswordOnly', // No number
            'role' => 'staff',
        ];

        $this->userService->createUser($userData);
    }

    public function test_create_user_validates_password_minimum_length()
    {
        $this->expectException(ValidationException::class);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Pass1', // Too short
            'role' => 'staff',
        ];

        $this->userService->createUser($userData);
    }

    public function test_create_user_validates_required_fields()
    {
        $this->expectException(ValidationException::class);

        $userData = [
            'email' => 'test@example.com',
            // Missing name, password, role
        ];

        $this->userService->createUser($userData);
    }

    public function test_create_user_validates_email_format()
    {
        $this->expectException(ValidationException::class);

        $userData = [
            'name' => 'Test User',
            'email' => 'invalid-email',
            'password' => 'Password123',
            'role' => 'staff',
        ];

        $this->userService->createUser($userData);
    }

    public function test_create_user_validates_role_enum()
    {
        $this->expectException(ValidationException::class);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123',
            'role' => 'invalid_role',
        ];

        $this->userService->createUser($userData);
    }

    public function test_update_user_with_valid_data()
    {
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

        $updatedUser = $this->userService->updateUser($user->id, $updateData);

        $this->assertEquals('Updated Name', $updatedUser->name);
        $this->assertEquals('updated@example.com', $updatedUser->email);
        $this->assertEquals('admin', $updatedUser->role);
    }

    public function test_update_user_with_password()
    {
        $user = User::factory()->create();

        $updateData = [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'NewPassword123',
            'role' => $user->role,
        ];

        $updatedUser = $this->userService->updateUser($user->id, $updateData);

        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('NewPassword123', $updatedUser->password));
    }

    public function test_update_user_without_password()
    {
        $user = User::factory()->create();
        $originalPassword = $user->password;

        $updateData = [
            'name' => 'Updated Name',
            'email' => $user->email,
            'role' => $user->role,
        ];

        $updatedUser = $this->userService->updateUser($user->id, $updateData);

        $this->assertEquals($originalPassword, $updatedUser->password);
    }

    public function test_update_user_throws_exception_for_nonexistent_user()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('User not found with ID: 999');

        $this->userService->updateUser(999, ['name' => 'Test']);
    }

    public function test_delete_user()
    {
        $user = User::factory()->create();

        $result = $this->userService->deleteUser($user->id);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_delete_user_throws_exception_for_nonexistent_user()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('User not found with ID: 999');

        $this->userService->deleteUser(999);
    }

    public function test_get_all_users()
    {
        User::factory()->count(3)->create();

        $users = $this->userService->getAllUsers();

        $this->assertCount(3, $users);
    }

    public function test_get_user_by_id()
    {
        $user = User::factory()->create(['name' => 'Test User']);

        $foundUser = $this->userService->getUserById($user->id);

        $this->assertInstanceOf(User::class, $foundUser);
        $this->assertEquals('Test User', $foundUser->name);
    }

    public function test_get_user_by_id_returns_null_for_nonexistent_user()
    {
        $foundUser = $this->userService->getUserById(999);

        $this->assertNull($foundUser);
    }
}
