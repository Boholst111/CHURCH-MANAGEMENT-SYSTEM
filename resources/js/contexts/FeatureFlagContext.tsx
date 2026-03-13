import React, { createContext, useContext, ReactNode } from 'react';

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
 * Feature flag context
 */
const FeatureFlagContext = createContext<FeatureFlags>({
  modern_ui: false,
  modern_ui_pages: {},
});

/**
 * Feature flag provider props
 */
interface FeatureFlagProviderProps {
  children: ReactNode;
  flags?: FeatureFlags;
}

/**
 * Feature flag provider component
 * Provides feature flags to all child components
 */
export function FeatureFlagProvider({ children, flags }: FeatureFlagProviderProps) {
  // Get flags from window object if not provided
  const featureFlags = flags || (window as any).__FEATURE_FLAGS__ || {
    modern_ui: false,
    modern_ui_pages: {},
  };

  return (
    <FeatureFlagContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

/**
 * Hook to access feature flags from context
 * 
 * @returns FeatureFlags object
 * 
 * @example
 * const { modern_ui, modern_ui_pages } = useFeatureFlagContext();
 */
export function useFeatureFlagContext(): FeatureFlags {
  const context = useContext(FeatureFlagContext);
  
  if (!context) {
    throw new Error('useFeatureFlagContext must be used within a FeatureFlagProvider');
  }
  
  return context;
}
