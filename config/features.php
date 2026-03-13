<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Modern UI Feature Flag
    |--------------------------------------------------------------------------
    |
    | This configuration controls the rollout of the Modern UI/UX redesign.
    | The feature flag system allows for gradual rollout and easy rollback.
    |
    */

    'modern_ui' => [
        // Master switch - must be true for any users to see new UI
        'enabled' => env('MODERN_UI_ENABLED', false),
        
        // Specific user IDs for beta testing (comma-separated in .env)
        'beta_users' => array_filter(explode(',', env('MODERN_UI_BETA_USERS', ''))),
        
        // Percentage of remaining users to show new UI (0-100)
        'rollout_percentage' => (int) env('MODERN_UI_ROLLOUT_PERCENTAGE', 0),
        
        // Per-page feature flags (optional, for granular control)
        'pages' => [
            'dashboard' => env('MODERN_UI_DASHBOARD_ENABLED', true),
            'members' => env('MODERN_UI_MEMBERS_ENABLED', true),
            'small_groups' => env('MODERN_UI_SMALL_GROUPS_ENABLED', true),
            'leadership' => env('MODERN_UI_LEADERSHIP_ENABLED', true),
            'events' => env('MODERN_UI_EVENTS_ENABLED', true),
            'finance' => env('MODERN_UI_FINANCE_ENABLED', true),
            'reports' => env('MODERN_UI_REPORTS_ENABLED', true),
            'activity_log' => env('MODERN_UI_ACTIVITY_LOG_ENABLED', true),
            'users' => env('MODERN_UI_USERS_ENABLED', true),
            'settings' => env('MODERN_UI_SETTINGS_ENABLED', true),
        ],
    ],
];
