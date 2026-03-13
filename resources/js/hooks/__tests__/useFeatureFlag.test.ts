import { renderHook } from '@testing-library/react';
import { useFeatureFlag, useFeatureFlags, useModernUIPage } from '../useFeatureFlag';

describe('useFeatureFlag', () => {
  beforeEach(() => {
    // Clear window.__FEATURE_FLAGS__ before each test
    delete (window as any).__FEATURE_FLAGS__;
  });

  describe('useFeatureFlag', () => {
    it('should return false when feature flags are not set', () => {
      const { result } = renderHook(() => useFeatureFlag('modern_ui'));
      expect(result.current).toBe(false);
    });

    it('should return true when feature flag is enabled', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: true,
        modern_ui_pages: {},
      };

      const { result } = renderHook(() => useFeatureFlag('modern_ui'));
      expect(result.current).toBe(true);
    });

    it('should return false when feature flag is disabled', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: false,
        modern_ui_pages: {},
      };

      const { result } = renderHook(() => useFeatureFlag('modern_ui'));
      expect(result.current).toBe(false);
    });

    it('should handle nested flags', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: true,
        modern_ui_pages: {
          dashboard: true,
          members: false,
        },
      };

      const { result: dashboardResult } = renderHook(() => 
        useFeatureFlag('modern_ui_pages.dashboard')
      );
      expect(dashboardResult.current).toBe(true);

      const { result: membersResult } = renderHook(() => 
        useFeatureFlag('modern_ui_pages.members')
      );
      expect(membersResult.current).toBe(false);
    });

    it('should return false for non-existent nested flags', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: true,
        modern_ui_pages: {},
      };

      const { result } = renderHook(() => 
        useFeatureFlag('modern_ui_pages.nonexistent')
      );
      expect(result.current).toBe(false);
    });
  });

  describe('useFeatureFlags', () => {
    it('should return default flags when not set', () => {
      const { result } = renderHook(() => useFeatureFlags());
      
      expect(result.current).toEqual({
        modern_ui: false,
        modern_ui_pages: {},
      });
    });

    it('should return all feature flags', () => {
      const flags = {
        modern_ui: true,
        modern_ui_pages: {
          dashboard: true,
          members: true,
          settings: false,
        },
      };

      (window as any).__FEATURE_FLAGS__ = flags;

      const { result } = renderHook(() => useFeatureFlags());
      expect(result.current).toEqual(flags);
    });
  });

  describe('useModernUIPage', () => {
    it('should return false when modern_ui is disabled', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: false,
        modern_ui_pages: {
          dashboard: true,
        },
      };

      const { result } = renderHook(() => useModernUIPage('dashboard'));
      expect(result.current).toBe(false);
    });

    it('should return true when modern_ui is enabled and page flag is true', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: true,
        modern_ui_pages: {
          dashboard: true,
        },
      };

      const { result } = renderHook(() => useModernUIPage('dashboard'));
      expect(result.current).toBe(true);
    });

    it('should return false when modern_ui is enabled but page flag is false', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: true,
        modern_ui_pages: {
          dashboard: false,
        },
      };

      const { result } = renderHook(() => useModernUIPage('dashboard'));
      expect(result.current).toBe(false);
    });

    it('should return true when modern_ui is enabled and page flag is not specified', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: true,
        modern_ui_pages: {},
      };

      const { result } = renderHook(() => useModernUIPage('dashboard'));
      expect(result.current).toBe(true);
    });

    it('should handle missing modern_ui_pages object', () => {
      (window as any).__FEATURE_FLAGS__ = {
        modern_ui: true,
      };

      const { result } = renderHook(() => useModernUIPage('dashboard'));
      expect(result.current).toBe(true);
    });
  });
});
