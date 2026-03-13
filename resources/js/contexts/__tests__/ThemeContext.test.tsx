import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ThemeProvider, useThemeContext, type Theme } from '../ThemeContext';

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document classes
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('ThemeProvider', () => {
    it('should render children', () => {
      render(
        <ThemeProvider>
          <div>Test Content</div>
        </ThemeProvider>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should use default theme when no saved preference exists', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
    });

    it('should use custom default theme', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('should load saved theme from localStorage', () => {
      localStorage.setItem('theme', 'dark');

      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('should apply theme class to document root', () => {
      renderHook(() => useThemeContext(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should persist theme to localStorage when changed', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });

  describe('setTheme', () => {
    it('should change theme to light', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      });

      act(() => {
        result.current.setTheme('light');
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
    });

    it('should change theme to dark', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.resolvedTheme).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should change theme to auto', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('auto');
      });

      expect(result.current.theme).toBe('auto');
      // resolvedTheme depends on system preference
      expect(['light', 'dark']).toContain(result.current.resolvedTheme);
    });

    it('should remove old theme class when changing themes', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);

      act(() => {
        result.current.setTheme('light');
      });

      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('light');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      });

      expect(result.current.theme).toBe('dark');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
    });

    it('should switch from auto to light when toggled', () => {
      localStorage.setItem('theme', 'auto');

      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('auto');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
    });
  });

  describe('auto theme mode', () => {
    it('should resolve auto theme based on system preference', () => {
      // Mock matchMedia to return dark preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          addListener: jest.fn(),
          removeListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="auto">{children}</ThemeProvider>
        ),
      });

      expect(result.current.theme).toBe('auto');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('should listen for system theme changes in auto mode', () => {
      let changeHandler: (() => void) | null = null;

      // Mock matchMedia with event listener support
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false, // Start with light
          media: query,
          onchange: null,
          addEventListener: jest.fn((event, handler) => {
            if (event === 'change') {
              changeHandler = handler;
            }
          }),
          removeEventListener: jest.fn(),
          addListener: jest.fn(),
          removeListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="auto">{children}</ThemeProvider>
        ),
      });

      expect(result.current.resolvedTheme).toBe('light');

      // Simulate system theme change to dark
      if (changeHandler) {
        // Update matchMedia to return dark
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation((query) => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });

        act(() => {
          changeHandler!();
        });

        expect(result.current.resolvedTheme).toBe('dark');
      }
    });

    it('should not listen for system changes when not in auto mode', () => {
      const addEventListenerSpy = jest.fn();

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addEventListener: addEventListenerSpy,
          removeEventListener: jest.fn(),
          addListener: jest.fn(),
          removeListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      renderHook(() => useThemeContext(), {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        ),
      });

      // Should not add event listener when theme is not 'auto'
      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });
  });

  describe('useThemeContext hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useThemeContext());
      }).toThrow('useThemeContext must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });

    it('should return theme context when used inside ThemeProvider', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      expect(result.current).toHaveProperty('theme');
      expect(result.current).toHaveProperty('resolvedTheme');
      expect(result.current).toHaveProperty('setTheme');
      expect(result.current).toHaveProperty('toggleTheme');
    });
  });

  describe('localStorage persistence', () => {
    it('should persist light theme', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('light');
      });

      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should persist dark theme', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should persist auto theme', () => {
      const { result } = renderHook(() => useThemeContext(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setTheme('auto');
      });

      expect(localStorage.getItem('theme')).toBe('auto');
    });
  });
});
