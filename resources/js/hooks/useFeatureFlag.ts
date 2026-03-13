import { useMemo } from 'react';

/**
 * Feature flags interface
 */
interface FeatureFlags {
  modern_ui: boolean;
  modern_ui_pages: {
    dashboard?: boolean;
    members?: boolean;
    small_groups?: boolean;
    leadership?: boolean;
    events?: boolean;
    finance?: boolean;
    reports?: boolean;
    activity_log?: boolean;
    users?: boolean;
    settings?: boolean;
  };
}

/**
 * Get feature flags from window object
 * These are injected by the Laravel backend in app.blade.php
 */
function getFeatureFlags(): FeatureFlags {
  return (window as any).__FEATURE_FLAGS__ || {
    modern_ui: false,
    modern_ui_pages: {},
  };
}

/**
 * Hook to check if a feature flag is enabled
 * 
 * @param flagName - The name of the feature flag to check
 * @returns boolean indicating if the feature is enabled
 * 
 * @example
 * const isModernUI = useFeatureFlag('modern_ui');
 * 
 * @example
 * const isDashboardEnabled = useFeatureFlag('modern_ui_pages.dashboard');
 */
export function useFeatureFlag(flagName: string): boolean {
  return useMemo(() => {
    const flags = getFeatureFlags();
    
    // Handle nested flags (e.g., 'modern_ui_pages.dashboard')
    if (flagName.includes('.')) {
      const parts = flagName.split('.');
      let value: any = flags;
      
      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          return false;
        }
      }
      
      return Boolean(value);
    }
    
    // Handle top-level flags
    return Boolean((flags as any)[flagName]);
  }, [flagName]);
}

/**
 * Hook to get all feature flags
 * 
 * @returns FeatureFlags object with all flags
 * 
 * @example
 * const flags = useFeatureFlags();
 * if (flags.modern_ui) {
 *   // Show modern UI
 * }
 */
export function useFeatureFlags(): FeatureFlags {
  return useMemo(() => getFeatureFlags(), []);
}

/**
 * Hook to check if Modern UI is enabled for a specific page
 * 
 * @param page - The page identifier (e.g., 'dashboard', 'members')
 * @returns boolean indicating if Modern UI is enabled for this page
 * 
 * @example
 * const isEnabled = useModernUIPage('dashboard');
 */
export function useModernUIPage(page: string): boolean {
  return useMemo(() => {
    const flags = getFeatureFlags();
    
    // Check if Modern UI is globally enabled
    if (!flags.modern_ui) {
      return false;
    }
    
    // Check page-specific flag
    const pageFlags = flags.modern_ui_pages || {};
    return pageFlags[page as keyof typeof pageFlags] !== false;
  }, [page]);
}
