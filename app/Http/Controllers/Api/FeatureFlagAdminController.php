<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class FeatureFlagAdminController extends Controller
{
    /**
     * Get current feature flag configuration
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Only admins can access this endpoint
        if (!$this->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $config = config('features.modern_ui');
        
        return response()->json([
            'success' => true,
            'data' => [
                'enabled' => $config['enabled'],
                'beta_users' => $config['beta_users'],
                'rollout_percentage' => $config['rollout_percentage'],
                'pages' => $config['pages'],
                'stats' => $this->getStats(),
            ]
        ]);
    }

    /**
     * Update feature flag configuration
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        // Only admins can access this endpoint
        if (!$this->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $validated = $request->validate([
            'enabled' => 'sometimes|boolean',
            'beta_users' => 'sometimes|array',
            'beta_users.*' => 'integer|exists:users,id',
            'rollout_percentage' => 'sometimes|integer|min:0|max:100',
            'pages' => 'sometimes|array',
            'pages.*' => 'boolean',
        ]);

        try {
            $envPath = base_path('.env');
            
            // Check if .env file exists and is writable
            if (!file_exists($envPath)) {
                throw new \Exception('.env file not found');
            }
            
            if (!is_writable($envPath)) {
                throw new \Exception('.env file is not writable. Please check file permissions.');
            }
            
            $envContent = file_get_contents($envPath);

            // Update enabled flag
            if (isset($validated['enabled'])) {
                $value = $validated['enabled'] ? 'true' : 'false';
                
                if (preg_match('/^MODERN_UI_ENABLED=.*/m', $envContent)) {
                    $envContent = preg_replace(
                        '/^MODERN_UI_ENABLED=.*/m',
                        "MODERN_UI_ENABLED={$value}",
                        $envContent
                    );
                } else {
                    // Add the variable if it doesn't exist
                    $envContent .= "\nMODERN_UI_ENABLED={$value}\n";
                }
                
                Log::info('Feature flag master switch updated', [
                    'enabled' => $validated['enabled'],
                    'admin_id' => Auth::id()
                ]);
            }

            // Update beta users
            if (isset($validated['beta_users'])) {
                $betaUsers = implode(',', $validated['beta_users']);
                
                if (preg_match('/^MODERN_UI_BETA_USERS=.*/m', $envContent)) {
                    $envContent = preg_replace(
                        '/^MODERN_UI_BETA_USERS=.*/m',
                        "MODERN_UI_BETA_USERS={$betaUsers}",
                        $envContent
                    );
                } else {
                    // Add the variable if it doesn't exist
                    $envContent .= "\nMODERN_UI_BETA_USERS={$betaUsers}\n";
                }
                
                Log::info('Feature flag beta users updated', [
                    'beta_users' => $validated['beta_users'],
                    'admin_id' => Auth::id()
                ]);
            }

            // Update rollout percentage
            if (isset($validated['rollout_percentage'])) {
                if (preg_match('/^MODERN_UI_ROLLOUT_PERCENTAGE=.*/m', $envContent)) {
                    $envContent = preg_replace(
                        '/^MODERN_UI_ROLLOUT_PERCENTAGE=.*/m',
                        "MODERN_UI_ROLLOUT_PERCENTAGE={$validated['rollout_percentage']}",
                        $envContent
                    );
                } else {
                    // Add the variable if it doesn't exist
                    $envContent .= "\nMODERN_UI_ROLLOUT_PERCENTAGE={$validated['rollout_percentage']}\n";
                }
                
                Log::info('Feature flag rollout percentage updated', [
                    'percentage' => $validated['rollout_percentage'],
                    'admin_id' => Auth::id()
                ]);
            }

            // Update page-specific flags
            if (isset($validated['pages'])) {
                foreach ($validated['pages'] as $page => $enabled) {
                    $envKey = 'MODERN_UI_' . strtoupper($page) . '_ENABLED';
                    $value = $enabled ? 'true' : 'false';
                    
                    // Check if the key exists
                    if (preg_match("/^{$envKey}=.*/m", $envContent)) {
                        // Update existing key
                        $envContent = preg_replace(
                            "/^{$envKey}=.*/m",
                            "{$envKey}={$value}",
                            $envContent
                        );
                    } else {
                        // Add new key
                        $envContent .= "\n{$envKey}={$value}\n";
                    }
                }
                Log::info('Feature flag page settings updated', [
                    'pages' => $validated['pages'],
                    'admin_id' => Auth::id()
                ]);
            }

            // Write back to .env file
            $result = file_put_contents($envPath, $envContent);
            
            if ($result === false) {
                throw new \Exception('Failed to write to .env file');
            }

            // Clear config cache
            Artisan::call('config:clear');
            Artisan::call('cache:clear');

            return response()->json([
                'success' => true,
                'message' => 'Feature flags updated successfully. Changes will take effect immediately.',
                'data' => [
                    'enabled' => config('features.modern_ui.enabled'),
                    'beta_users' => config('features.modern_ui.beta_users'),
                    'rollout_percentage' => config('features.modern_ui.rollout_percentage'),
                    'pages' => config('features.modern_ui.pages'),
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update feature flags', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'admin_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update feature flags: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get list of all users for beta user selection
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function users()
    {
        // Only admins can access this endpoint
        if (!$this->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $users = User::select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Get statistics about feature flag usage
     *
     * @return array
     */
    private function getStats()
    {
        $config = config('features.modern_ui');
        $totalUsers = User::count();
        
        // Calculate how many users see the new UI
        $betaUserCount = count($config['beta_users']);
        $rolloutCount = 0;
        
        if ($config['enabled'] && $config['rollout_percentage'] > 0) {
            // Approximate rollout count (excluding beta users)
            $rolloutCount = (int) (($totalUsers - $betaUserCount) * ($config['rollout_percentage'] / 100));
        }
        
        $totalEnabled = $config['enabled'] ? ($betaUserCount + $rolloutCount) : 0;
        
        return [
            'total_users' => $totalUsers,
            'beta_users_count' => $betaUserCount,
            'rollout_users_count' => $rolloutCount,
            'total_enabled_users' => $totalEnabled,
            'percentage_enabled' => $totalUsers > 0 ? round(($totalEnabled / $totalUsers) * 100, 1) : 0,
        ];
    }

    /**
     * Check if current user is an admin
     *
     * @return bool
     */
    private function isAdmin()
    {
        $user = Auth::user();
        return $user && $user->role === 'admin';
    }
}
