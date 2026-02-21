<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChurchSettings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    /**
     * Get church settings
     *
     * @return JsonResponse
     */
    public function getChurchSettings(): JsonResponse
    {
        try {
            // Get the first (and should be only) church settings record
            $settings = ChurchSettings::first();
            
            if (!$settings) {
                return response()->json([
                    'success' => false,
                    'message' => 'Church settings not found',
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $settings,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve church settings',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update church settings
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateChurchSettings(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), ChurchSettings::validationRules());
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 400);
            }
            
            // Get or create the church settings record
            $settings = ChurchSettings::first();
            
            if (!$settings) {
                $settings = ChurchSettings::create($validator->validated());
            } else {
                $settings->update($validator->validated());
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Church settings updated successfully',
                'data' => $settings,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update church settings',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get notification preferences for the authenticated user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getNotificationPreferences(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'email_notifications' => $user->email_notifications ?? true,
                    'sms_notifications' => $user->sms_notifications ?? false,
                    'system_notifications' => $user->system_notifications ?? true,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve notification preferences',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update notification preferences for the authenticated user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateNotificationPreferences(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email_notifications' => 'nullable|boolean',
                'sms_notifications' => 'nullable|boolean',
                'system_notifications' => 'nullable|boolean',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 400);
            }
            
            $user = $request->user();
            $validated = $validator->validated();
            
            // Update only the fields that were provided
            if (isset($validated['email_notifications'])) {
                $user->email_notifications = $validated['email_notifications'];
            }
            if (isset($validated['sms_notifications'])) {
                $user->sms_notifications = $validated['sms_notifications'];
            }
            if (isset($validated['system_notifications'])) {
                $user->system_notifications = $validated['system_notifications'];
            }
            
            $user->save();
            
            return response()->json([
                'success' => true,
                'message' => 'Notification preferences updated successfully',
                'data' => [
                    'email_notifications' => $user->email_notifications ?? true,
                    'sms_notifications' => $user->sms_notifications ?? false,
                    'system_notifications' => $user->system_notifications ?? true,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update notification preferences',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
