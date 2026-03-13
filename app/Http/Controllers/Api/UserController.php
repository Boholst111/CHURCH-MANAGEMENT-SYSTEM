<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Models\UserInvitation;
use App\Mail\UserInvitationMail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of users (admin only).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $users = $this->userService->getAllUsers();
            
            return response()->json([
                'success' => true,
                'data' => $users,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve users',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created user in storage (admin only).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $user = $this->userService->createUser($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data' => $user,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create user',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified user (admin only).
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $user = $this->userService->getUserById($id);
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found',
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified user in storage (admin only).
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $user = $this->userService->updateUser($id, $request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'data' => $user,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified user from storage (admin only).
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->userService->deleteUser($id);
            
            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Invite a new user via email (admin only).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function invite(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email|unique:user_invitations,email',
                'role' => 'required|in:admin,pastor,staff,volunteer,readonly',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Create invitation
            $invitation = UserInvitation::create([
                'email' => $request->email,
                'role' => $request->role,
                'token' => UserInvitation::generateToken(),
                'invited_by' => auth()->id(),
                'expires_at' => UserInvitation::getDefaultExpirationDate(),
            ]);

            // Send invitation email
            Mail::to($invitation->email)->send(new UserInvitationMail($invitation));

            // Load the inviter relationship for the response
            $invitation->load('inviter');

            return response()->json([
                'success' => true,
                'message' => 'Invitation sent successfully',
                'data' => [
                    'id' => $invitation->id,
                    'email' => $invitation->email,
                    'role' => $invitation->role,
                    'status' => $invitation->status,
                    'invited_by' => $invitation->inviter->name,
                    'invited_at' => $invitation->created_at->toISOString(),
                    'expires_at' => $invitation->expires_at->toISOString(),
                ],
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send invitation',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all pending invitations (admin only).
     *
     * @return JsonResponse
     */
    public function getInvitations(): JsonResponse
    {
        try {
            $invitations = UserInvitation::with('inviter')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($invitation) {
                    return [
                        'id' => $invitation->id,
                        'email' => $invitation->email,
                        'role' => $invitation->role,
                        'status' => $invitation->status,
                        'invited_by' => $invitation->inviter->name,
                        'invited_at' => $invitation->created_at->toISOString(),
                        'expires_at' => $invitation->expires_at->toISOString(),
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $invitations,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve invitations',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Resend an invitation (admin only).
     *
     * @param int $id
     * @return JsonResponse
     */
    public function resendInvitation(int $id): JsonResponse
    {
        try {
            $invitation = UserInvitation::findOrFail($id);

            // Check if invitation is still valid
            if ($invitation->status === 'accepted') {
                return response()->json([
                    'success' => false,
                    'message' => 'This invitation has already been accepted',
                ], 400);
            }

            // Update expiration date and regenerate token
            $invitation->update([
                'token' => UserInvitation::generateToken(),
                'expires_at' => UserInvitation::getDefaultExpirationDate(),
                'status' => 'pending',
            ]);

            // Resend invitation email
            Mail::to($invitation->email)->send(new UserInvitationMail($invitation));

            // Load the inviter relationship for the response
            $invitation->load('inviter');

            return response()->json([
                'success' => true,
                'message' => 'Invitation resent successfully',
                'data' => [
                    'id' => $invitation->id,
                    'email' => $invitation->email,
                    'role' => $invitation->role,
                    'status' => $invitation->status,
                    'invited_by' => $invitation->inviter->name,
                    'invited_at' => $invitation->created_at->toISOString(),
                    'expires_at' => $invitation->expires_at->toISOString(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to resend invitation',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cancel an invitation (admin only).
     *
     * @param int $id
     * @return JsonResponse
     */
    public function cancelInvitation(int $id): JsonResponse
    {
        try {
            $invitation = UserInvitation::findOrFail($id);

            // Check if invitation has already been accepted
            if ($invitation->status === 'accepted') {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot cancel an accepted invitation',
                ], 400);
            }

            $invitation->delete();

            return response()->json([
                'success' => true,
                'message' => 'Invitation cancelled successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to cancel invitation',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
