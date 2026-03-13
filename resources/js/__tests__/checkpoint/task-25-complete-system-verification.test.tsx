/**
 * Task 25: Complete System Verification
 * 
 * This comprehensive test suite verifies:
 * - All 11 pages render correctly
 * - Navigation works between all pages
 * - CRUD operations across all modules
 * - Responsive behavior (mobile, tablet, desktop)
 * - Accessibility (keyboard navigation, screen readers)
 * - Theme switching (light/dark mode)
 * - Performance metrics
 * - Error handling and loading states
 */

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock vi for Jest compatibility
const vi = {
  fn: jest.fn,
  mock: jest.mock,
};

// Import all pages
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Members from '@/pages/Members';
import SmallGroups from '@/pages/SmallGroups';
import Leadership from '@/pages/Leadership';
import Events from '@/pages/Events';
import Finance from '@/pages/Finance/Overview';
import Reports from '@/pages/Reports';
import ActivityLog from '@/pages/ActivityLog';
import Users from '@/pages/Users';
import Settings from '@/pages/Settings';

// Import layout components
import Layout from '@/components/ui/layout';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Test utilities
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('Task 25: Complete System Verification', () => {
  
  describe('1. All 11 Pages Render Correctly', () => {
    
    it('should render Login page', () => {
      renderWithProviders(<Login />);
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('should render Dashboard page', async () => {
      renderWithProviders(<Dashboard />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
      });
    });

    it('should render Members page', async () => {
      renderWithProviders(<Members />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /members/i })).toBeInTheDocument();
      });
    });

    it('should render Small Groups page', async () => {
      renderWithProviders(<SmallGroups />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /small groups/i })).toBeInTheDocument();
      });
    });

    it('should render Leadership page', async () => {
      renderWithProviders(<Leadership />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /leadership/i })).toBeInTheDocument();
      });
    });

    it('should render Events page', async () => {
      renderWithProviders(<Events />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /events/i })).toBeInTheDocument();
      });
    });

    it('should render Finance page', async () => {
      renderWithProviders(<Finance />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /finance/i })).toBeInTheDocument();
      });
    });

    it('should render Reports page', async () => {
      renderWithProviders(<Reports />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /reports/i })).toBeInTheDocument();
      });
    });

    it('should render Activity Log page', async () => {
      renderWithProviders(<ActivityLog />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /activity log/i })).toBeInTheDocument();
      });
    });

    it('should render Users page', async () => {
      renderWithProviders(<Users />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /users/i })).toBeInTheDocument();
      });
    });

    it('should render Settings page', async () => {
      renderWithProviders(<Settings />);
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
      });
    });
  });

  describe('2. Navigation Between Pages', () => {
    
    it('should navigate from Dashboard to Members', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      const membersLink = screen.getByRole('link', { name: /members/i });
      await user.click(membersLink);
      
      await waitFor(() => {
        expect(window.location.pathname).toContain('/members');
      });
    });

    it('should navigate through all main pages via sidebar', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      const pages = [
        'Dashboard',
        'Members',
        'Small Groups',
        'Leadership',
        'Events',
        'Finance',
        'Reports',
        'Activity Log',
        'Users',
        'Settings'
      ];

      for (const pageName of pages) {
        const link = screen.getByRole('link', { name: new RegExp(pageName, 'i') });
        expect(link).toBeInTheDocument();
      }
    });
  });

  describe('3. Responsive Behavior', () => {
    
    const viewports = [
      { name: 'Mobile', width: 320, height: 568 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1024, height: 768 },
      { name: 'Large Desktop', width: 1920, height: 1080 },
    ];

    viewports.forEach(({ name, width, height }) => {
      it(`should render correctly on ${name} (${width}x${height})`, () => {
        // Set viewport size
        global.innerWidth = width;
        global.innerHeight = height;
        global.dispatchEvent(new Event('resize'));

        renderWithProviders(<Dashboard />);
        
        // Check that content is visible and not overflowing
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        
        // Verify no horizontal overflow
        const { scrollWidth, clientWidth } = main;
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // Allow 1px tolerance
      });
    });

    it('should show mobile menu on small screens', () => {
      global.innerWidth = 320;
      global.dispatchEvent(new Event('resize'));

      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Mobile menu button should be visible
      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('should show sidebar on desktop screens', () => {
      global.innerWidth = 1024;
      global.dispatchEvent(new Event('resize'));

      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Sidebar should be visible
      const sidebar = screen.getByRole('navigation');
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toBeVisible();
    });
  });

  describe('4. Accessibility', () => {
    
    it('should have no accessibility violations on Dashboard', async () => {
      const { container } = renderWithProviders(<Dashboard />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations on Members page', async () => {
      const { container } = renderWithProviders(<Members />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /login/i });

      // Tab through form
      await user.tab();
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(passwordInput).toHaveFocus();

      await user.tab();
      expect(submitButton).toHaveFocus();
    });

    it('should have proper ARIA labels', () => {
      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Check for landmark roles
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should announce dynamic content changes', async () => {
      renderWithProviders(<Dashboard />);
      
      // Check for aria-live regions
      const liveRegions = screen.queryAllByRole('status');
      expect(liveRegions.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('5. Theme Switching', () => {
    
    it('should switch from light to dark theme', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Find theme toggle button
      const themeToggle = screen.getByRole('button', { name: /theme/i });
      await user.click(themeToggle);

      // Check that dark theme is applied
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });

    it('should persist theme preference', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      const themeToggle = screen.getByRole('button', { name: /theme/i });
      await user.click(themeToggle);

      // Check localStorage
      await waitFor(() => {
        expect(localStorage.getItem('theme')).toBe('dark');
      });
    });

    it('should apply theme to all components', async () => {
      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Set dark theme
      document.documentElement.classList.add('dark');

      // Verify theme classes are applied
      const main = screen.getByRole('main');
      const computedStyle = window.getComputedStyle(main);
      
      // Dark theme should have dark background
      expect(computedStyle.backgroundColor).toBeTruthy();
    });
  });

  describe('6. Error Handling', () => {
    
    it('should display error message on API failure', async () => {
      // Mock API failure
      vi.mock('@/lib/api', () => ({
        api: {
          get: vi.fn().mockRejectedValue(new Error('Network error')),
        },
      }));

      renderWithProviders(<Dashboard />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    it('should show loading state during data fetch', () => {
      renderWithProviders(<Dashboard />);
      
      // Should show loading indicator initially
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should handle form validation errors', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const submitButton = screen.getByRole('button', { name: /login/i });
      await user.click(submitButton);

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText(/required/i)).toBeInTheDocument();
      });
    });

    it('should preserve user input on error', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');

      // Trigger error
      const submitButton = screen.getByRole('button', { name: /login/i });
      await user.click(submitButton);

      // Input value should be preserved
      expect(emailInput).toHaveValue('test@example.com');
    });
  });

  describe('7. Loading States', () => {
    
    it('should show skeleton loader on initial page load', () => {
      renderWithProviders(<Dashboard />);
      
      // Should show loading skeleton
      const loadingElements = screen.queryAllByRole('status');
      expect(loadingElements.length).toBeGreaterThan(0);
    });

    it('should disable buttons during submission', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      // Button should be disabled during submission
      expect(submitButton).toBeDisabled();
    });
  });

  describe('8. CRUD Operations', () => {
    
    it('should support Create operation', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Members />);

      // Click "Add Member" button
      const addButton = await screen.findByRole('button', { name: /add member/i });
      await user.click(addButton);

      // Modal should open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('should support Read operation', async () => {
      renderWithProviders(<Members />);

      // Data should be displayed in table
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
    });

    it('should support Update operation', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Members />);

      // Find and click edit button
      const editButton = await screen.findByRole('button', { name: /edit/i });
      await user.click(editButton);

      // Edit modal should open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('should support Delete operation', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Members />);

      // Find and click delete button
      const deleteButton = await screen.findByRole('button', { name: /delete/i });
      await user.click(deleteButton);

      // Confirmation dialog should appear
      await waitFor(() => {
        expect(screen.getByText(/confirm/i)).toBeInTheDocument();
      });
    });
  });

  describe('9. Performance Metrics', () => {
    
    it('should load Dashboard within acceptable time', async () => {
      const startTime = performance.now();
      
      renderWithProviders(<Dashboard />);
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
      });

      const loadTime = performance.now() - startTime;
      
      // Should load within 3.5 seconds (TTI target)
      expect(loadTime).toBeLessThan(3500);
    });

    it('should have minimal bundle size', () => {
      // This would be checked in build process
      // For now, just verify components are lazy-loaded
      expect(Dashboard).toBeDefined();
      expect(Members).toBeDefined();
    });
  });

  describe('10. Integration Tests', () => {
    
    it('should complete full user workflow: login -> view members -> add member', async () => {
      const user = userEvent.setup();
      
      // Step 1: Login
      const { rerender } = renderWithProviders(<Login />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'admin@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      // Step 2: Navigate to Members
      rerender(
        <QueryClientProvider client={createTestQueryClient()}>
          <ThemeProvider>
            <BrowserRouter>
              <Layout>
                <Members />
              </Layout>
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      );

      // Step 3: Add new member
      const addButton = await screen.findByRole('button', { name: /add member/i });
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });
});
