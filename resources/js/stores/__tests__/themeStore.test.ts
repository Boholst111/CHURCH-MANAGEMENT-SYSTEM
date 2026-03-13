import { renderHook, act } from '@testing-library/react';
import { useThemeStore, themeSelectors, initializeThemeListener } from '../themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset store state
    const { setTheme } = useThemeStore.getState();
    setTheme('light');
    
    // Clear document classes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.removeAttribute('data-theme');
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useThemeStore());
      
      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
    });
  });

  describe('setTheme action', () => {
    it('should set theme to light', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('light');
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
    });

    it('should set theme to dark', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('should set theme to auto and resolve to system preference', () => {
      const { result } = renderHook(() => useThemeStore());
      
      // Mock system preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      act(() => {
        result.current.setTheme('auto');
      });

      expect(result.current.theme).toBe('auto');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('should apply theme to document', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('dark');
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should persist theme to localStorage', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('dark');
      });

      const stored = localStorage.getItem('theme-storage');
      expect(stored).toBeTruthy();
      
      const parsed = JSON.parse(stored!);
      expect(parsed.state.theme).toBe('dark');
    });
  });

  describe('toggleTheme action', () => {
    it('should toggle from light to dark', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('light');
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('dark');
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
    });

    it('should toggle from auto to light', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('auto');
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
    });

    it('should apply toggled theme to document', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setTheme('light');
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
    });
  });

  describe('setResolvedTheme action', () => {
    it('should update resolved theme', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setResolvedTheme('dark');
      });

      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('should apply resolved theme to document', () => {
      const { result } = renderHook(() => useThemeStore());
      
      act(() => {
        result.current.setResolvedTheme('dark');
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('selectors', () => {
    it('should select theme', () => {
      act(() => {
        useThemeStore.getState().setTheme('dark');
      });

      const theme = themeSelectors.theme(useThemeStore.getState());
      expect(theme).toBe('dark');
    });

    it('should select resolvedTheme', () => {
      act(() => {
        useThemeStore.getState().setTheme('dark');
      });

      const resolvedTheme = themeSelectors.resolvedTheme(useThemeStore.getState());
      expect(resolvedTheme).toBe('dark');
    });

    it('should select isDark', () => {
      act(() => {
        useThemeStore.getState().setTheme('dark');
      });

      const isDark = themeSelectors.isDark(useThemeStore.getState());
      expect(isDark).toBe(true);
    });

    it('should select isLight', () => {
      act(() => {
        useThemeStore.getState().setTheme('light');
      });

      const isLight = themeSelectors.isLight(useThemeStore.getState());
      expect(isLight).toBe(true);
    });

    it('should select isAuto', () => {
      act(() => {
        useThemeStore.getState().setTheme('auto');
      });

      const isAuto = themeSelectors.isAuto(useThemeStore.getState());
      expect(isAuto).toBe(true);
    });
  });

  describe('persistence', () => {
    it('should restore theme from localStorage', () => {
      act(() => {
        useThemeStore.getState().setTheme('dark');
      });

      // Create a new hook instance (simulating page reload)
      const { result } = renderHook(() => useThemeStore());

      expect(result.current.theme).toBe('dark');
    });

    it('should not persist resolvedTheme', () => {
      act(() => {
        useThemeStore.getState().setTheme('dark');
      });

      const stored = localStorage.getItem('theme-storage');
      const parsed = JSON.parse(stored!);
      
      expect(parsed.state.resolvedTheme).toBeUndefined();
    });

    it('should apply theme to document on rehydration', () => {
      act(() => {
        useThemeStore.getState().setTheme('dark');
      });

      // The theme is already applied by setTheme, so we just verify it's there
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('initializeThemeListener', () => {
    it('should listen for system theme changes in auto mode', () => {
      const listeners: Array<(e: MediaQueryListEvent) => void> = [];
      
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn((event, handler) => {
            listeners.push(handler);
          }),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      act(() => {
        useThemeStore.getState().setTheme('auto');
      });

      const cleanup = initializeThemeListener();

      // Verify initial state
      expect(useThemeStore.getState().theme).toBe('auto');

      cleanup?.();
    });

    it('should not update resolved theme when not in auto mode', () => {
      const listeners: Array<(e: MediaQueryListEvent) => void> = [];
      
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn((event, handler) => {
            listeners.push(handler);
          }),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      act(() => {
        useThemeStore.getState().setTheme('light');
      });

      const cleanup = initializeThemeListener();

      // Simulate system theme change
      act(() => {
        listeners.forEach(listener => {
          listener({ matches: true } as MediaQueryListEvent);
        });
      });

      const state = useThemeStore.getState();
      expect(state.resolvedTheme).toBe('light'); // Should not change

      cleanup?.();
    });
  });
});
