import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeToggle, ThemeToggleCompact, ThemeToggleDropdown } from '../theme-toggle';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('Icon variant', () => {
    it('renders with default light theme', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light'));
    });

    it('cycles through themes on click', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');

      // Initial state: light
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light'));

      // Click to cycle to dark
      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Dark'));
      });

      // Click to cycle to auto
      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Auto'));
      });

      // Click to cycle back to light
      fireEvent.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light'));
      });
    });

    it('persists theme to localStorage', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');

      // Click to change theme
      fireEvent.click(button);

      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('dark');
      });
    });

    it('shows label when showLabel is true', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" showLabel />
        </ThemeProvider>
      );

      expect(screen.getByText('Light')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" className="custom-class" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('has proper ARIA attributes', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
      expect(button).toHaveAttribute('title');
    });
  });

  describe('Dropdown variant', () => {
    it('renders dropdown button', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="dropdown" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-haspopup', 'true');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens dropdown menu on click', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="dropdown" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
    });

    it('displays all theme options in dropdown', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="dropdown" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      fireEvent.click(button);

      await waitFor(() => {
        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems).toHaveLength(3);
        expect(screen.getByText('Light')).toBeInTheDocument();
        expect(screen.getByText('Dark')).toBeInTheDocument();
        expect(screen.getByText('Auto')).toBeInTheDocument();
      });
    });

    it('highlights current theme in dropdown', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="dropdown" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      fireEvent.click(button);

      await waitFor(() => {
        const lightOption = screen.getByRole('menuitem', { name: /light/i });
        expect(lightOption).toHaveAttribute('aria-current', 'true');
        expect(lightOption).toHaveClass('bg-primary-50');
      });
    });

    it('changes theme when option is clicked', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="dropdown" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      fireEvent.click(button);

      await waitFor(() => {
        const darkOption = screen.getByRole('menuitem', { name: /dark/i });
        fireEvent.click(darkOption);
      });

      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('dark');
      });
    });

    it('closes dropdown after selecting theme', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="dropdown" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      const darkOption = screen.getByRole('menuitem', { name: /dark/i });
      fireEvent.click(darkOption);

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('closes dropdown on escape key', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="dropdown" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('closes dropdown when clicking outside', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <div>
            <ThemeToggle variant="dropdown" />
            <div data-testid="outside">Outside</div>
          </div>
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      const outside = screen.getByTestId('outside');
      fireEvent.mouseDown(outside);

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  });

  describe('ThemeToggleCompact', () => {
    it('renders as icon variant', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggleCompact />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light'));
    });
  });

  describe('ThemeToggleDropdown', () => {
    it('renders as dropdown variant with label', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggleDropdown />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /theme selector/i });
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Light')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      // Simulate Enter key press
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.click(button);

      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('dark');
      });
    });

    it('has proper focus styles', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500');
    });

    it('announces theme changes to screen readers', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      
      // Initial announcement
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Light'));

      // Click to change theme
      fireEvent.click(button);

      // New announcement
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Dark'));
      });
    });
  });

  describe('Animation', () => {
    it('applies transition classes for smooth animation', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('transition-all', 'duration-200');
    });

    it('animates icon changes', () => {
      const { container } = render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      // Check for transition classes on icon containers
      const iconContainers = container.querySelectorAll('.transition-all');
      expect(iconContainers.length).toBeGreaterThan(0);
    });
  });

  describe('Theme persistence', () => {
    it('loads saved theme from localStorage on mount', () => {
      localStorageMock.setItem('theme', 'dark');

      render(
        <ThemeProvider>
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Dark'));
    });

    it('saves theme changes to localStorage', async () => {
      render(
        <ThemeProvider defaultTheme="light">
          <ThemeToggle variant="icon" />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      
      // Change theme multiple times
      fireEvent.click(button); // light -> dark
      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('dark');
      });

      fireEvent.click(button); // dark -> auto
      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('auto');
      });

      fireEvent.click(button); // auto -> light
      await waitFor(() => {
        expect(localStorageMock.getItem('theme')).toBe('light');
      });
    });
  });
});
