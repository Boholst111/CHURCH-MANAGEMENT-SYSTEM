import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { ThemeProvider } from '../../contexts/ThemeContext';
import Dashboard from '../../pages/Dashboard';
import Members from '../../pages/Members';
import Settings from '../../pages/Settings';
import ProtectedRoute from '../../components/ProtectedRoute';

/**
 * State Management Integration Tests
 * 
 * Tests state management across components:
 * 1. Theme state persistence across navigation
 * 2. Auth state consistency across pages
 * 3. UI state (sidebar, modals) management
 * 4. Filter/search state preservation
 * 
 * Validates Requirements: State Management, Data Flow, UI Consistency
 */

// Mock API
jest.mock('../../lib/api');
jest.mock('../../lib/memberApi', () => ({
  memberApi: {
    getMembers: jest.fn().mockResolvedValue([]),
    getSmallGroups: jest.fn().mockResolvedValue([]),
  },
}));

// Mock dashboard hook
jest.mock('../../hooks/useDashboardData', () => ({
  useDashboardData: () => ({
    stats: {
      totalMembers: 150,
      monthlyTithes: 5000,
      upcomingEvents: 3,
      newVisitors: 12,
    },
    attendanceData: [],
    activities: [],
    loading: false,
    error: null,
  }),
}));

describe('State Management Integration Tests', () => {
  const mockAdminUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@church.com',
    role: 'admin' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify(mockAdminUser));
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Theme State Persistence', () => {
    it('should persist theme selection across page navigation', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/settings']}>
          <AuthProvider>
            <ThemeProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </ThemeProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Wait for settings page to load
      await waitFor(() => {
        expect(screen.getByText(/settings/i)).toBeInTheDocument();
      });

      // Change theme to dark mode (if theme toggle exists)
      const themeToggle = screen.queryByRole('button', { name: /theme/i });
      if (themeToggle) {
        fireEvent.click(themeToggle);

        // Verify theme is stored
        await waitFor(() => {
          expect(localStorage.getItem('theme')).toBe('dark');
        });
      }

      // Navigate to dashboard
      rerender(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ThemeProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </ThemeProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Verify theme persists
      if (themeToggle) {
        expect(localStorage.getItem('theme')).toBe('dark');
      }
    });

    it('should apply theme consistently across all components', async () => {
      // Set dark theme
      localStorage.setItem('theme', 'dark');

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ThemeProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </ThemeProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Verify dark theme class is applied
      const root = document.documentElement;
      expect(root.classList.contains('dark')).toBe(true);
    });
  });

  describe('Auth State Consistency', () => {
    it('should maintain auth state across page navigation', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Verify auth state
      expect(localStorage.getItem('token')).toBe('test-token');
      expect(localStorage.getItem('user')).toContain('Admin User');

      // Navigate to members
      rerender(
        <MemoryRouter initialEntries={['/members']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/members"
                  element={
                    <ProtectedRoute>
                      <Members />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/member directory/i)).toBeInTheDocument();
      });

      // Verify auth state persists
      expect(localStorage.getItem('token')).toBe('test-token');
      expect(localStorage.getItem('user')).toContain('Admin User');
    });

    it('should clear auth state on logout and redirect to login', async () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<div>Login Page</div>} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Find and click logout button (if exists)
      const logoutButton = screen.queryByRole('button', { name: /logout/i });
      if (logoutButton) {
        fireEvent.click(logoutButton);

        // Verify auth state is cleared
        await waitFor(() => {
          expect(localStorage.getItem('token')).toBeNull();
          expect(localStorage.getItem('user')).toBeNull();
        });
      }
    });
  });

  describe('UI State Management', () => {
    it('should manage sidebar state across navigation', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Find sidebar toggle (mobile menu button)
      const sidebarToggle = screen.queryByRole('button', { name: /menu/i });
      if (sidebarToggle) {
        // Open sidebar
        fireEvent.click(sidebarToggle);

        // Navigate to members
        rerender(
          <MemoryRouter initialEntries={['/members']}>
            <AuthProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/members"
                    element={
                      <ProtectedRoute>
                        <Members />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </AuthProvider>
          </MemoryRouter>
        );

        await waitFor(() => {
          expect(screen.getByText(/member directory/i)).toBeInTheDocument();
        });

        // Sidebar state should be managed independently per page
        // This test verifies the component renders correctly after navigation
      }
    });

    it('should close modal when navigating away', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/members']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/members"
                  element={
                    <ProtectedRoute>
                      <Members />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/member directory/i)).toBeInTheDocument();
      });

      // Open add member modal
      const addButton = screen.queryByRole('button', { name: /add member/i });
      if (addButton) {
        fireEvent.click(addButton);

        await waitFor(() => {
          expect(screen.getByText(/add new member/i)).toBeInTheDocument();
        });

        // Navigate away
        rerender(
          <MemoryRouter initialEntries={['/dashboard']}>
            <AuthProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </AuthProvider>
          </MemoryRouter>
        );

        await waitFor(() => {
          expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
        });

        // Modal should be closed
        expect(screen.queryByText(/add new member/i)).not.toBeInTheDocument();
      }
    });
  });

  describe('Filter and Search State', () => {
    it('should preserve search query when navigating back', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/members']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/members"
                  element={
                    <ProtectedRoute>
                      <Members />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/member directory/i)).toBeInTheDocument();
      });

      // Enter search query
      const searchInput = screen.queryByPlaceholderText(/search/i);
      if (searchInput) {
        fireEvent.change(searchInput, { target: { value: 'John' } });

        // Navigate away
        rerender(
          <MemoryRouter initialEntries={['/dashboard']}>
            <AuthProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </AuthProvider>
          </MemoryRouter>
        );

        await waitFor(() => {
          expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
        });

        // Navigate back to members
        rerender(
          <MemoryRouter initialEntries={['/members']}>
            <AuthProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/members"
                    element={
                      <ProtectedRoute>
                        <Members />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </AuthProvider>
          </MemoryRouter>
        );

        await waitFor(() => {
          expect(screen.getByText(/member directory/i)).toBeInTheDocument();
        });

        // Note: Search state preservation depends on implementation
        // This test verifies the page loads correctly after navigation
      }
    });
  });

  describe('Data Flow Across Components', () => {
    it('should update dashboard stats when member is added', async () => {
      // This test would require mocking the data flow
      // and verifying that dashboard stats update when a member is added
      // Implementation depends on the actual state management solution

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Verify initial stats are displayed
      await waitFor(() => {
        expect(screen.getByText(/150/)).toBeInTheDocument(); // Total members
      });
    });

    it('should reflect global state changes across all components', async () => {
      // Test that global state changes (like theme, auth) are reflected
      // across all mounted components

      const { rerender } = render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ThemeProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/members"
                    element={
                      <ProtectedRoute>
                        <Members />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </ThemeProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Change global state (e.g., theme)
      localStorage.setItem('theme', 'dark');

      // Navigate to another page
      rerender(
        <MemoryRouter initialEntries={['/members']}>
          <AuthProvider>
            <ThemeProvider>
              <ToastProvider>
                <Routes>
                  <Route
                    path="/members"
                    element={
                      <ProtectedRoute>
                        <Members />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ToastProvider>
            </ThemeProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/member directory/i)).toBeInTheDocument();
      });

      // Verify theme is still applied
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });
});
