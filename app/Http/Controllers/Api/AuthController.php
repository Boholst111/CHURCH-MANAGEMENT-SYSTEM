<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login user and return token
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are invalid.'],
            ]);
        }

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Log login activity
        \App\Models\Activity::create([
            'user_id' => $user->id,
            'action' => 'login',
            'entity_type' => 'user',
            'entity_id' => $user->id,
            'description' => 'User logged in',
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Register new user
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'
            ],
            'role' => 'sometimes|in:admin,staff,readonly',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'readonly',
        ]);

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken,
        ], 201);
    }

    /**
     * Get current user
     */
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'user' => $user
        ]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|unique:users,email,' . $request->user()->id,
            'password' => [
                'sometimes',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'
            ],
            'phone' => 'sometimes|string|max:20',
            'address' => 'sometimes|string|max:500',
        ]);

        $user = $request->user();

        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }

        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }

        if (isset($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        if (isset($validated['phone'])) {
            $user->phone = $validated['phone'];
        }

        if (isset($validated['address'])) {
            $user->address = $validated['address'];
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    /**
     * Logout user (revoke tokens)
     */
    public function logout(Request $request)
    {
        // Log logout activity before revoking token
        \App\Models\Activity::create([
            'user_id' => $request->user()->id,
            'action' => 'logout',
            'entity_type' => 'user',
            'entity_id' => $request->user()->id,
            'description' => 'User logged out',
            'ip_address' => $request->ip(),
        ]);

        // Revoke current token if it exists
        $token = $request->user()->currentAccessToken();
        if ($token) {
            $token->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * Refresh token (create new one)
     */
    public function refresh(Request $request)
    {
        // Revoke old token and create new one
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'token' => $request->user()->createToken('auth_token')->plainTextToken,
        ]);
    }
}
