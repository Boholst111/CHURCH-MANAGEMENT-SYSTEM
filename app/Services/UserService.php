<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserService
{
    /**
     * Get all users.
     *
     * @return Collection
     */
    public function getAllUsers(): Collection
    {
        return User::all();
    }

    /**
     * Get a user by ID.
     *
     * @param int $id
     * @return User|null
     */
    public function getUserById(int $id): ?User
    {
        return User::find($id);
    }

    /**
     * Create a new user with validation.
     *
     * @param array $data
     * @return User
     * @throws ValidationException
     */
    public function createUser(array $data): User
    {
        $this->validateUserData($data);
        
        // Hash password before creating user
        $data['password'] = Hash::make($data['password']);
        
        return User::create($data);
    }

    /**
     * Update a user with validation.
     *
     * @param int $id
     * @param array $data
     * @return User
     * @throws ValidationException
     * @throws \Exception
     */
    public function updateUser(int $id, array $data): User
    {
        $user = User::find($id);
        
        if (!$user) {
            throw new \Exception("User not found with ID: {$id}");
        }

        $this->validateUserData($data, $id);
        
        // Hash password if provided
        if (isset($data['password']) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            // Remove password from update if not provided
            unset($data['password']);
        }
        
        $user->update($data);
        
        return $user->fresh();
    }

    /**
     * Delete a user.
     *
     * @param int $id
     * @return bool
     * @throws \Exception
     */
    public function deleteUser(int $id): bool
    {
        $user = User::find($id);
        
        if (!$user) {
            throw new \Exception("User not found with ID: {$id}");
        }

        return $user->delete();
    }

    /**
     * Validate user data.
     *
     * @param array $data
     * @param int|null $userId
     * @return void
     * @throws ValidationException
     */
    protected function validateUserData(array $data, ?int $userId = null): void
    {
        $rules = [
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email' . ($userId ? ",{$userId}" : ''),
            'role' => 'required|in:admin,staff,readonly',
        ];

        // Password is required for new users, optional for updates
        if ($userId === null) {
            // Creating new user - password is required
            $rules['password'] = [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/', // Must contain uppercase, lowercase, and number
            ];
        } else {
            // Updating existing user - password is optional
            $rules['password'] = [
                'nullable',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/', // Must contain uppercase, lowercase, and number
            ];
        }

        $messages = [
            'password.regex' => 'The password must contain at least one uppercase letter, one lowercase letter, and one number.',
            'password.min' => 'The password must be at least 8 characters.',
        ];

        $validator = Validator::make($data, $rules, $messages);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
