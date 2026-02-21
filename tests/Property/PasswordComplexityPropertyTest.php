<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Password Complexity Enforcement
 * 
 * Feature: church-management-system
 * Property 31: Password complexity enforcement
 * Validates: Requirements 10.5
 * 
 * Property: For any password that does not meet complexity requirements 
 * (minimum 8 characters, contains uppercase, lowercase, and number), 
 * the system should reject it with a descriptive error message.
 */
class PasswordComplexityPropertyTest extends TestCase
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
     * Generate a short password (less than 8 characters).
     */
    private function generateShortPassword(int $length): string
    {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $password = '';
        for ($i = 0; $i < $length; $i++) {
            $password .= $chars[rand(0, strlen($chars) - 1)];
        }
        return $password;
    }

    /**
     * Generate a password without uppercase letters.
     */
    private function generateNoUppercasePassword(string $base): string
    {
        // Ensure at least 8 chars, has lowercase and number, but no uppercase
        $password = strtolower($base) . 'abc123';
        return substr($password, 0, max(8, strlen($password)));
    }

    /**
     * Generate a password without lowercase letters.
     */
    private function generateNoLowercasePassword(string $base): string
    {
        // Ensure at least 8 chars, has uppercase and number, but no lowercase
        $password = strtoupper($base) . 'ABC123';
        return substr($password, 0, max(8, strlen($password)));
    }

    /**
     * Generate a password without numbers.
     */
    private function generateNoNumberPassword(string $base): string
    {
        // Ensure at least 8 chars, has uppercase and lowercase, but no number
        $password = 'Aa' . preg_replace('/\d/', '', $base) . 'BbCc';
        return substr($password, 0, max(8, strlen($password)));
    }

    /**
     * Generate a valid password that meets all requirements.
     */
    private function generateValidPassword(int $length, string $base): string
    {
        // Ensure password has at least one uppercase, one lowercase, and one number
        $password = 'Aa1' . $base;
        return substr($password, 0, max(8, min($length, strlen($password))));
    }

    /**
     * Test that passwords shorter than 8 characters are rejected.
     * 
     * **Validates: Requirements 10.5**
     * 
     * @test
     */
    public function passwords_shorter_than_8_characters_are_rejected()
    {
        $this->forAll(
            Generators::choose(1, 7)
        )
            ->withMaxSize(100)
            ->then(function ($length) {
                $password = $this->generateShortPassword($length);

                $userData = [
                    'name' => 'Test User',
                    'email' => 'test' . uniqid() . '@example.com',
                    'password' => $password,
                    'role' => 'staff',
                ];

                try {
                    $this->userService->createUser($userData);
                    $this->fail("Expected ValidationException for short password: {$password}");
                } catch (ValidationException $e) {
                    // Assert that password field has validation errors
                    $errors = $e->errors();
                    $this->assertArrayHasKey(
                        'password',
                        $errors,
                        "Validation errors should include 'password' field for short password: {$password}"
                    );

                    // Assert error message mentions length requirement
                    $errorMessage = implode(' ', $errors['password']);
                    $this->assertTrue(
                        str_contains(strtolower($errorMessage), '8') || 
                        str_contains(strtolower($errorMessage), 'characters') ||
                        str_contains(strtolower($errorMessage), 'length'),
                        "Error message should mention length requirement: {$errorMessage}"
                    );
                }
            });
    }

    /**
     * Test that passwords without uppercase letters are rejected.
     * 
     * **Validates: Requirements 10.5**
     * 
     * @test
     */
    public function passwords_without_uppercase_are_rejected()
    {
        $this->forAll(
            Generators::string()
        )
            ->withMaxSize(100)
            ->then(function ($base) {
                $password = $this->generateNoUppercasePassword($base);
                
                // Skip if password happens to have uppercase (edge case)
                if (preg_match('/[A-Z]/', $password)) {
                    $this->assertTrue(true, "Password has uppercase, skipping");
                    return;
                }

                // Ensure password is at least 8 chars and has lowercase and number
                if (strlen($password) < 8 || !preg_match('/[a-z]/', $password) || !preg_match('/\d/', $password)) {
                    $this->assertTrue(true, "Password doesn't meet other requirements, skipping");
                    return;
                }

                $userData = [
                    'name' => 'Test User',
                    'email' => 'test' . uniqid() . '@example.com',
                    'password' => $password,
                    'role' => 'staff',
                ];

                try {
                    $this->userService->createUser($userData);
                    $this->fail("Expected ValidationException for password without uppercase: {$password}");
                } catch (ValidationException $e) {
                    // Assert that password field has validation errors
                    $errors = $e->errors();
                    $this->assertArrayHasKey(
                        'password',
                        $errors,
                        "Validation errors should include 'password' field for password without uppercase: {$password}"
                    );

                    // Assert error message mentions uppercase requirement
                    $errorMessage = implode(' ', $errors['password']);
                    $this->assertTrue(
                        str_contains(strtolower($errorMessage), 'uppercase') ||
                        str_contains(strtolower($errorMessage), 'capital'),
                        "Error message should mention uppercase requirement: {$errorMessage}"
                    );
                }
            });
    }

    /**
     * Test that passwords without lowercase letters are rejected.
     * 
     * **Validates: Requirements 10.5**
     * 
     * @test
     */
    public function passwords_without_lowercase_are_rejected()
    {
        $this->forAll(
            Generators::string()
        )
            ->withMaxSize(100)
            ->then(function ($base) {
                $password = $this->generateNoLowercasePassword($base);
                
                // Skip if password happens to have lowercase (edge case)
                if (preg_match('/[a-z]/', $password)) {
                    $this->assertTrue(true, "Password has lowercase, skipping");
                    return;
                }

                // Ensure password is at least 8 chars and has uppercase and number
                if (strlen($password) < 8 || !preg_match('/[A-Z]/', $password) || !preg_match('/\d/', $password)) {
                    $this->assertTrue(true, "Password doesn't meet other requirements, skipping");
                    return;
                }

                $userData = [
                    'name' => 'Test User',
                    'email' => 'test' . uniqid() . '@example.com',
                    'password' => $password,
                    'role' => 'staff',
                ];

                try {
                    $this->userService->createUser($userData);
                    $this->fail("Expected ValidationException for password without lowercase: {$password}");
                } catch (ValidationException $e) {
                    // Assert that password field has validation errors
                    $errors = $e->errors();
                    $this->assertArrayHasKey(
                        'password',
                        $errors,
                        "Validation errors should include 'password' field for password without lowercase: {$password}"
                    );

                    // Assert error message mentions lowercase requirement
                    $errorMessage = implode(' ', $errors['password']);
                    $this->assertTrue(
                        str_contains(strtolower($errorMessage), 'lowercase'),
                        "Error message should mention lowercase requirement: {$errorMessage}"
                    );
                }
            });
    }

    /**
     * Test that passwords without numbers are rejected.
     * 
     * **Validates: Requirements 10.5**
     * 
     * @test
     */
    public function passwords_without_numbers_are_rejected()
    {
        $this->forAll(
            Generators::string()
        )
            ->withMaxSize(100)
            ->then(function ($base) {
                $password = $this->generateNoNumberPassword($base);
                
                // Skip if password happens to have a number (edge case)
                if (preg_match('/\d/', $password)) {
                    $this->assertTrue(true, "Password has number, skipping");
                    return;
                }

                // Ensure password is at least 8 chars and has uppercase and lowercase
                if (strlen($password) < 8 || !preg_match('/[A-Z]/', $password) || !preg_match('/[a-z]/', $password)) {
                    $this->assertTrue(true, "Password doesn't meet other requirements, skipping");
                    return;
                }

                $userData = [
                    'name' => 'Test User',
                    'email' => 'test' . uniqid() . '@example.com',
                    'password' => $password,
                    'role' => 'staff',
                ];

                try {
                    $this->userService->createUser($userData);
                    $this->fail("Expected ValidationException for password without number: {$password}");
                } catch (ValidationException $e) {
                    // Assert that password field has validation errors
                    $errors = $e->errors();
                    $this->assertArrayHasKey(
                        'password',
                        $errors,
                        "Validation errors should include 'password' field for password without number: {$password}"
                    );

                    // Assert error message mentions number requirement
                    $errorMessage = implode(' ', $errors['password']);
                    $this->assertTrue(
                        str_contains(strtolower($errorMessage), 'number') ||
                        str_contains(strtolower($errorMessage), 'digit'),
                        "Error message should mention number requirement: {$errorMessage}"
                    );
                }
            });
    }

    /**
     * Test that valid passwords meeting all requirements are accepted.
     * This is the inverse property - valid passwords should NOT be rejected.
     * 
     * **Validates: Requirements 10.5**
     * 
     * @test
     */
    public function valid_passwords_are_accepted()
    {
        $this->forAll(
            Generators::choose(8, 20),
            Generators::string()
        )
            ->withMaxSize(100)
            ->then(function ($length, $base) {
                $password = $this->generateValidPassword($length, $base);
                
                // Verify password meets all requirements
                $meetsRequirements = strlen($password) >= 8 &&
                    preg_match('/[A-Z]/', $password) &&
                    preg_match('/[a-z]/', $password) &&
                    preg_match('/\d/', $password);

                if (!$meetsRequirements) {
                    $this->assertTrue(true, "Generated password doesn't meet requirements, skipping");
                    return;
                }

                $userData = [
                    'name' => 'Test User',
                    'email' => 'test' . uniqid() . '@example.com',
                    'password' => $password,
                    'role' => 'staff',
                ];

                try {
                    $user = $this->userService->createUser($userData);
                    
                    // Assert user was created successfully
                    $this->assertNotNull($user, "User should be created with valid password: {$password}");
                    $this->assertNotNull($user->id, "Created user should have an ID");
                    $this->assertEquals($userData['email'], $user->email, "User email should match");
                    
                    // Verify password was hashed (not stored in plain text)
                    $this->assertNotEquals($password, $user->password, "Password should be hashed");
                    
                } catch (ValidationException $e) {
                    $errors = $e->errors();
                    $this->fail(
                        "Valid password should not be rejected: {$password}\n" .
                        "Errors: " . json_encode($errors)
                    );
                }
            });
    }

    /**
     * Test that password complexity is enforced during user updates as well.
     * 
     * **Validates: Requirements 10.5**
     * 
     * @test
     */
    public function password_complexity_enforced_on_user_updates()
    {
        // Create a user with a valid password first
        $user = User::factory()->create([
            'password' => \Illuminate\Support\Facades\Hash::make('ValidPass123'),
        ]);

        $this->forAll(
            Generators::elements('short', 'nouppercase123', 'NOLOWERCASE123', 'NoNumbers')
        )
            ->withMaxSize(100)
            ->then(function ($invalidPassword) use ($user) {
                $updateData = [
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => $invalidPassword,
                    'role' => $user->role,
                ];

                try {
                    $this->userService->updateUser($user->id, $updateData);
                    $this->fail("Expected ValidationException when updating with invalid password: {$invalidPassword}");
                } catch (ValidationException $e) {
                    // Assert that password field has validation errors
                    $errors = $e->errors();
                    $this->assertArrayHasKey(
                        'password',
                        $errors,
                        "Validation errors should include 'password' field when updating with invalid password: {$invalidPassword}"
                    );
                }
            });
    }

    /**
     * Test that the error message format is consistent and descriptive.
     * 
     * **Validates: Requirements 10.5**
     * 
     * @test
     */
    public function error_messages_are_descriptive()
    {
        $testCases = [
            ['password' => 'short', 'expectedKeyword' => '8'],
            ['password' => 'nouppercase123', 'expectedKeyword' => 'uppercase'],
            ['password' => 'NOLOWERCASE123', 'expectedKeyword' => 'lowercase'],
            ['password' => 'NoNumbers', 'expectedKeyword' => 'number'],
        ];

        foreach ($testCases as $testCase) {
            $userData = [
                'name' => 'Test User',
                'email' => 'test' . uniqid() . '@example.com',
                'password' => $testCase['password'],
                'role' => 'staff',
            ];

            try {
                $this->userService->createUser($userData);
                $this->fail("Expected ValidationException for password: {$testCase['password']}");
            } catch (ValidationException $e) {
                $errors = $e->errors();
                $this->assertArrayHasKey('password', $errors);
                
                $errorMessage = implode(' ', $errors['password']);
                
                // Assert error message is not empty
                $this->assertNotEmpty($errorMessage, "Error message should not be empty");
                
                // Assert error message contains expected keyword
                $this->assertTrue(
                    str_contains(strtolower($errorMessage), strtolower($testCase['expectedKeyword'])),
                    "Error message should contain '{$testCase['expectedKeyword']}' for password '{$testCase['password']}': {$errorMessage}"
                );
            }
        }
    }
}
