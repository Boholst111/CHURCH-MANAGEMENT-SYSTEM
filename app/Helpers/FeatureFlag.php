<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FeatureFlag
{
    /**
     * Check if Modern UI is enabled for the current user
     *
     * @return bool
     */
    public static function isModernUIEnabled(): bool
    {
        $config = config('features.modern_ui');
        
        // Check master switch
        if (!$config['enabled']) {
            return false;
        }
        
        $user = Auth::user();
        
        // If no user is authenticated, default to disabled
        if (!$user) {
            return false;
        }
        
        // Check if user is in beta list
        if (!empty($config['beta_users']) && in_array($user->id, $config['beta_users'])) {
            Log::info('Modern UI enabled for beta user', ['user_id' => $user->id]);
            return true;
        }
        
        // Check rollout percentage using deterministic hash
        $rolloutPercentage = $config['rollout_percentage'];
        if ($rolloutPercentage > 0) {
            $userHash = crc32((string) $user->id);
            $percentage = $userHash % 100;
            $enabled = $percentage < $rolloutPercentage;
            
            if ($enabled) {
                Log::debug('Modern UI enabled via rollout percentage', [
                    'user_id' => $user->id,
                    'percentage' => $rolloutPercentage,
                    'user_hash_mod' => $percentage
                ]);
            }
            
            return $enabled;
        }
        
        return false;
    }
    
    /**
     * Check if a specific page's Modern UI is enabled
     *
     * @param string $page Page identifier (e.g., 'dashboard', 'members')
     * @return bool
     */
    public static function isPageEnabled(string $page): bool
    {
        // First check if Modern UI is enabled globally
        if (!self::isModernUIEnabled()) {
            return false;
        }
        
        // Then check page-specific flag
        $pages = config('features.modern_ui.pages', []);
        return $pages[$page] ?? true; // Default to true if not specified
    }
    
    /**
     * Get all feature flags for the current user
     *
     * @return array
     */
    public static function getAllFlags(): array
    {
        $modernUIEnabled = self::isModernUIEnabled();
        
        return [
            'modern_ui' => $modernUIEnabled,
            'modern_ui_pages' => $modernUIEnabled ? config('features.modern_ui.pages', []) : [],
        ];
    }
}
