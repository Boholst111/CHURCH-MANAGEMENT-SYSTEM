import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useThemeContext } from '../ThemeContext';

// Test component that uses the theme context
const TestComponent: React.FC = () => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useThemeContext();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="resolved-theme">{resolvedTheme}</div>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
      <button onClick={() => setTheme('auto')} data-testid="set-auto">
        Set Auto
      </button>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle
      </button>
    </div>
  );
};

describe('ThemeContext Integration', () => {
  beforeEach(() => {
    localStorage.clear();
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

  it('should provide theme context to child components', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
  });

  it('should allow changing theme through context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const setDarkButton = screen.getByTestId('set-dark');

    act(() => {
      setDarkButton.click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should allow toggling theme through context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle');

    // Start with light, toggle to dark
    act(() => {
      toggleButton.click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    // Toggle back to light
    act(() => {
      toggleButton.click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('should persist theme changes to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const setDarkButton = screen.getByTestId('set-dark');

    act(() => {
      setDarkButton.click();
    });

    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should handle auto theme mode', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const setAutoButton = screen.getByTestId('set-auto');

    act(() => {
      setAutoButton.click();
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('auto');
    // resolvedTheme should be either 'light' or 'dark' based on system preference
    expect(['light', 'dark']).toContain(screen.getByTestId('resolved-theme').textContent);
  });

  it('should apply theme classes to document root', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    const setLightButton = screen.getByTestId('set-light');

    act(() => {
      setLightButton.click();
    });

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should load saved theme preference on mount', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
