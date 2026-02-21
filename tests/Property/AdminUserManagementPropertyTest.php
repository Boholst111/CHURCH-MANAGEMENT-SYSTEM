<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Admin User Management
 * 
 * Feature: church-management-system
 * Property 30: Admin user management
 * Validates: Requirements 10.4
 * 
 * Property: For any valid user account data, an Admin user should be able to 
 * create a new user, update existing users, and delete users, with each 
 * operation succeeding and persisting correctly.
 */
class AdminUserManagementPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected UserService $userService;

    protected function setUp(): void
    {
        parent::setUp();
        // Manually initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        $this->userService = new UserService();
    }

    /**
     * Generate a valid password that meets complexity requirements.
     */
    private function generateValidPassword(string $base): string
    {
        // Ensure password has at least one uppercase, one lowercase, and one number
        $cleanBase = preg_replace('/[^a-zA-Z0-9]/', '', $base);
        $password = 'Pass1' . $cleanBase . 'word';
        // Ensure minimum 8 characters
        if (strlen($password) < 8) {
            $password = 'Password123';
        }
        return substr($password, 0, min(20, strlen($password)));
    }

    /**
     * Generate a valid name (non-empty string).
     */
    private function generateValidName(string $base): string
    {
        $cleanName = trim(preg_replace('/[^a-zA-Z\s]/', '', $base));
        if (empty($cleanName) || strlen($cleanName) < 2) {
            return 'TestUser';
        }
        return substr($cleanName, 0, 100);
    }

    /**
     * Test that admin can perform complete CRUD operations on users.
     * 
     * **Validates: Requirements 10.4**
     * 
     * @test
     */
    public function admin_can_create_retrieve_update_and_delete_users()
    {
        $this->forAll(
            Generators::string(),
            Generators::string(),
            Generators::string(),
            Generators::elements('admin', 'staff', 'readonly')
        )
            ->withMaxSize(100)
            ->then(function ($nameBase, $emailPrefix, $passwordBase, $role) {
                // Generate valid name, email and password
                $name = $this->generateValidName($nameBase);
                $cleanEmail = preg_replace('/[^a-z0-9]/', '', strtolower($emailPrefix));
                if (empty($cleanEmail)) {
                    $cleanEmail = 'user';
                }
                $email = $cleanEmail . uniqid() . '@test.com';
                $password = $this->generateValidPassword($passwordBase);
                
                $userData = [
                    'name' => $name,
                    'email' => $email,
                    'password' => $password,
                    'role' => $role,
                ];
                
                // CREATE: Admin creates a new user
                $user = $this->userService->createUser($userData);
                
                // Assert user was created successfully
                $this->assertNotNull($user->id, 'User should have an ID after creation');
                $this->assertEquals($userData['name'], $user->name, 'User name should match');
                $this->assertEquals($userData['email'], $user->email, 'User email should match');
                $this->assertEquals($userData['role'], $user->role, 'User role should match');
                
                // Verify password was hashed
                $this->assertNotEquals($password, $user->password, 'Password should be hashed');
                $this->assertTrue(
                    Hash::check($password, $user->password),
                    'Hashed password should be verifiable'
                );
                
                // Verify user exists in database
                $this->assertDatabaseHas('users', [
                    'id' => $user->id,
                    'email' => $userData['email'],
                    'role' => $userData['role'],
                ]);
                
                // RETRIEVE: Admin retrieves the user
                $retrievedUser = $this->userService->getUserById($user->id);
                $this->assertNotNull($retrievedUser, 'User should be retrievable after creation');
                $this->assertEquals($user->id, $retrievedUser->id, 'Retrieved user ID should match');
                $this->assertEquals($userData['name'], $retrievedUser->name, 'Retrieved user name should match');
                $this->assertEquals($userData['email'], $retrievedUser->email, 'Retrieved user email should match');
                $this->assertEquals($userData['role'], $retrievedUser->role, 'Retrieved user role should match');
                
                // UPDATE: Admin updates user fields
                $newRole = $role === 'admin' ? 'staff' : 'admin';
                $updateData = [
                    'name' => 'Updated ' . $name,
                    'email' => $email, // Keep same email
                    'role' => $newRole,
                ];
                
                $updatedUser = $this->userService->updateUser($user->id, $updateData);
                
                // Assert updates persisted
                $this->assertEquals($user->id, $updatedUser->id, 'User ID should remain unchanged after update');
                $this->assertEquals('Updated ' . $name, $updatedUser->name, 'Updated name should persist');
                $this->assertEquals($newRole, $updatedUser->role, 'Updated role should persist');
                
                // Verify password remained unchanged (no password in update)
                $this->assertTrue(
                    Hash::check($password, $updatedUser->password),
                    'Password should remain unchanged when not included in update'
                );
                
                $this->assertDatabaseHas('users', [
                    'id' => $user->id,
                    'name' => 'Updated ' . $name,
                    'role' => $newRole,
                ]);
                
                // DELETE: Admin deletes the user
                $userId = $user->id;
                $result = $this->userService->deleteUser($userId);
                
                // Assert deletion succeeded
                $this->assertTrue($result, 'Delete operation should return true');
                
                // Verify user no longer exists in database
                $this->assertDatabaseMissing('users', [
                    'id' => $userId,
                ]);
                
                // Verify user cannot be retrieved after deletion
                $deletedUser = $this->userService->getUserById($userId);
                $this->assertNull($deletedUser, 'User should not be retrievable after deletion');
            });
    }

    /**
     * Test that admin can update user password.
     * 
     * **Validates: Requirements 10.4**
     * 
     * @test
     */
    public function admin_can_update_user_password()
    {
        $this->forAll(
            Generators::string(),
            Generators::string(),
            Generators::string(),
            Generators::string()
        )
            ->withMaxSize(100)
            ->then(function ($nameBase, $emailPrefix, $passwordBase1, $passwordBase2) {
                // Generate valid name, email and passwords
                $name = $this->generateValidName($nameBase);
                $cleanEmail = preg_replace('/[^a-z0-9]/', '', strtolower($emailPrefix));
                if (empty($cleanEmail)) {
                    $cleanEmail = 'user';
                }
                $email = $cleanEmail . uniqid() . '@test.com';
                $originalPassword = $this->generateValidPassword($passwordBase1);
                $newPassword = $this->generateValidPassword($passwordBase2);
                
                // Ensure passwords are different
                if ($originalPassword === $newPassword) {
                    $newPassword = 'Different' . $newPassword;
                }
                
                // Create user with original password
                $userData = [
                    'name' => $name,
                    'email' => $email,
                    'password' => $originalPassword,
                    'role' => 'staff',
                ];
                
                $user = $this->userService->createUser($userData);
                $originalHashedPassword = $user->password;
                
                // Verify original password works
                $this->assertTrue(
                    Hash::check($originalPassword, $originalHashedPassword),
                    'Original password should be verifiable'
                );
                
                // Update password
                $updateData = [
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => $newPassword,
                    'role' => $user->role,
                ];
                
                $updatedUser = $this->userService->updateUser($user->id, $updateData);
                
                // Assert password was changed
                $this->assertNotEquals(
                    $originalHashedPassword,
                    $updatedUser->password,
                    'Password hash should change after update'
                );
                
                // Verify new password works
                $this->assertTrue(
                    Hash::check($newPassword, $updatedUser->password),
                    'New password should be verifiable'
                );
                
                // Verify old password no longer works
                $this->assertFalse(
                    Hash::check($originalPassword, $updatedUser->password),
                    'Old password should not work after update'
                );
                
                // Clean up
                $this->userService->deleteUser($user->id);
            });
    }

    /**
     * Test that admin can create users with all valid role types.
     * 
     * **Validates: Requirements 10.4**
     * 
     * @test
     */
    public function admin_can_create_users_with_all_role_types()
    {
        $roles = ['admin', 'staff', 'readonly'];
        
        foreach ($roles as $role) {
            $this->forAll(
                Generators::string(),
                Generators::string(),
                Generators::string()
            )
                ->withMaxSize(20) // Fewer iterations per role
                ->then(function ($nameBase, $emailPrefix, $passwordBase) use ($role) {
                    $name = $this->generateValidName($nameBase);
                    $cleanEmail = preg_replace('/[^a-z0-9]/', '', strtolower($emailPrefix));
                    if (empty($cleanEmail)) {
                        $cleanEmail = 'user';
                    }
                    $email = $cleanEmail . uniqid() . '@test.com';
                    $password = $this->generateValidPassword($passwordBase);
                    
                    $userData = [
                        'name' => $name,
                        'email' => $email,
                        'password' => $password,
                        'role' => $role,
                    ];
                    
                    $user = $this->userService->createUser($userData);
                    
                    $this->assertNotNull($user->id, "User with role '{$role}' should be created");
                    $this->assertEquals($role, $user->role, "User role should be '{$role}'");
                    
                    $this->assertDatabaseHas('users', [
                        'id' => $user->id,
                        'role' => $role,
                    ]);
                    
                    // Clean up
                    $this->userService->deleteUser($user->id);
                });
        }
    }

    /**
     * Test that admin can update user role.
     * 
     * **Validates: Requirements 10.4**
     * 
     * @test
     */
    public function admin_can_update_user_role()
    {
        $this->forAll(
            Generators::string(),
            Generators::string(),
            Generators::string(),
            Generators::elements('admin', 'staff', 'readonly'),
            Generators::elements('admin', 'staff', 'readonly')
        )
            ->withMaxSize(100)
            ->then(function ($nameBase, $emailPrefix, $passwordBase, $originalRole, $newRole) {
                $name = $this->generateValidName($nameBase);
                $cleanEmail = preg_replace('/[^a-z0-9]/', '', strtolower($emailPrefix));
                if (empty($cleanEmail)) {
                    $cleanEmail = 'user';
                }
                $email = $cleanEmail . uniqid() . '@test.com';
                $password = $this->generateValidPassword($passwordBase);
                
                // Create user with original role
                $userData = [
                    'name' => $name,
                    'email' => $email,
                    'password' => $password,
                    'role' => $originalRole,
                ];
                
                $user = $this->userService->createUser($userData);
                
                $this->assertEquals($originalRole, $user->role, 'Original role should be set');
                
                // Update to new role
                $updateData = [
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $newRole,
                ];
                
                $updatedUser = $this->userService->updateUser($user->id, $updateData);
                
                // Assert role was updated
                $this->assertEquals($newRole, $updatedUser->role, 'Role should be updated');
                
                $this->assertDatabaseHas('users', [
                    'id' => $user->id,
                    'role' => $newRole,
                ]);
                
                // Clean up
                $this->userService->deleteUser($user->id);
            });
    }

    /**
     * Test that multiple users can be created and managed independently.
     * 
     * **Validates: Requirements 10.4**
     * 
     * @test
     */
    public function admin_can_manage_multiple_users_independently()
    {
        $this->forAll(
            Generators::choose(2, 5)
        )
            ->withMaxSize(20)
            ->then(function ($userCount) {
                $createdUsers = [];
                
                // Create multiple users
                for ($i = 0; $i < $userCount; $i++) {
                    $userData = [
                        'name' => "User {$i}",
                        'email' => "user{$i}" . uniqid() . '@test.com',
                        'password' => 'Password123',
                        'role' => ['admin', 'staff', 'readonly'][$i % 3],
                    ];
                    
                    $user = $this->userService->createUser($userData);
                    $createdUsers[] = $user;
                    
                    $this->assertNotNull($user->id, "User {$i} should be created");
                }
                
                // Verify all users exist
                $this->assertCount($userCount, $createdUsers, 'All users should be created');
                
                // Retrieve all users
                $allUsers = $this->userService->getAllUsers();
                $this->assertGreaterThanOrEqual(
                    $userCount,
                    $allUsers->count(),
                    'All created users should be retrievable'
                );
                
                // Update one user
                $userToUpdate = $createdUsers[0];
                $updateData = [
                    'name' => 'Updated User',
                    'email' => $userToUpdate->email,
                    'role' => $userToUpdate->role,
                ];
                
                $updatedUser = $this->userService->updateUser($userToUpdate->id, $updateData);
                $this->assertEquals('Updated User', $updatedUser->name);
                
                // Verify other users were not affected
                foreach ($createdUsers as $index => $user) {
                    if ($index === 0) continue;
                    
                    $retrievedUser = $this->userService->getUserById($user->id);
                    $this->assertEquals($user->name, $retrievedUser->name, "User {$index} should not be affected");
                }
                
                // Delete one user
                $userToDelete = $createdUsers[1];
                $this->userService->deleteUser($userToDelete->id);
                
                $this->assertDatabaseMissing('users', ['id' => $userToDelete->id]);
                
                // Verify other users still exist
                foreach ($createdUsers as $index => $user) {
                    if ($index === 1) continue;
                    
                    $retrievedUser = $this->userService->getUserById($user->id);
                    $this->assertNotNull($retrievedUser, "User {$index} should still exist");
                }
                
                // Clean up remaining users
                foreach ($createdUsers as $index => $user) {
                    if ($index === 1) continue; // Already deleted
                    $this->userService->deleteUser($user->id);
                }
            });
    }

    /**
     * Test that user ID remains unchanged through update operations.
     * 
     * **Validates: Requirements 10.4**
     * 
     * @test
     */
    public function user_id_remains_unchanged_after_updates()
    {
        $this->forAll(
            Generators::string(),
            Generators::string(),
            Generators::string()
        )
            ->withMaxSize(100)
            ->then(function ($nameBase, $emailPrefix, $passwordBase) {
                $name = $this->generateValidName($nameBase);
                $cleanEmail = preg_replace('/[^a-z0-9]/', '', strtolower($emailPrefix));
                if (empty($cleanEmail)) {
                    $cleanEmail = 'user';
                }
                $email = $cleanEmail . uniqid() . '@test.com';
                $password = $this->generateValidPassword($passwordBase);
                
                $userData = [
                    'name' => $name,
                    'email' => $email,
                    'password' => $password,
                    'role' => 'staff',
                ];
                
                $user = $this->userService->createUser($userData);
                $originalId = $user->id;
                
                // Perform multiple updates
                for ($i = 0; $i < 3; $i++) {
                    $updateData = [
                        'name' => "Updated {$i}",
                        'email' => $email,
                        'role' => ['staff', 'admin', 'readonly'][$i % 3],
                    ];
                    
                    $updatedUser = $this->userService->updateUser($user->id, $updateData);
                    
                    $this->assertEquals(
                        $originalId,
                        $updatedUser->id,
                        "User ID should remain {$originalId} after update {$i}"
                    );
                }
                
                // Clean up
                $this->userService->deleteUser($user->id);
            });
    }
}
