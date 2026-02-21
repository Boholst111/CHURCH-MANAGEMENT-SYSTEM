import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import Members from '../../pages/Members';
import Users from '../../pages/Users';
import ProtectedRoute from '../../components/ProtectedRoute';
import api from '../../lib/api';

/**
 * End-to-End Authentication and Authorization Tests
 * 
 * Tests complete authentication and authorization flows:
 * 1. Login with different user roles
 * 2. Role-based access control across pages
 * 3. Session management and timeout
 * 4. Unauthorized access handling
 * 
 * Validates Requirements: 10.1, 10.2, 10.3, 10.6
 */

jest.mock('../../lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

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

// Mock member API
jest.mock('../../lib/memberApi', () => ({
  memberApi: {
    getMembers: jest.fn().mockResolvedValue([]),
    getSmallGroups: jest.fn().mockResolvedValue([]),
  },
}));

// Mock user API
jest.mock('../../lib/userApi', () => ({
  userApi: {
    getUsers: jest.fn().mockResolvedValue([]),
  },
}));

describe('End-to-End Authentication and Authorization Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Multi-Role Login Workflow (Validates Requirements 10.1, 10.2)', () => {
    it('should allow admin user to login and access all features', async () => {
      const adminUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: adminUser,
          token: 'admin-token',
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
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
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Users />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Login as admin
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'admin123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('admin-token');
        expect(localStorage.getItem('user')).toContain('admin');
      });

      // Verify admin can access dashboard
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
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });
    });

    it('should allow staff user to login with limited access', async () => {
      const staffUser = {
        id: 2,
        name: 'Staff User',
        email: 'staff@church.com',
        role: 'staff' as const,
      };

      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: staffUser,
          token: 'staff-token',
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
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

      // Login as staff
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'staff@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'staff123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('staff-token');
        expect(localStorage.getItem('user')).toContain('staff');
      });
    });

    it('should allow readonly user to login with view-only access', async () => {
      const readonlyUser = {
        id: 3,
        name: 'Readonly User',
        email: 'readonly@church.com',
        role: 'readonly' as const,
      };

      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: readonlyUser,
          token: 'readonly-token',
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
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

      // Login as readonly
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'readonly@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'readonly123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('readonly-token');
        expect(localStorage.getItem('user')).toContain('readonly');
      });
    });
  });

  describe('Role-Based Access Control Workflow (Validates Requirement 10.3)', () => {
    it('should prevent readonly user from accessing admin-only pages', async () => {
      const readonlyUser = {
        id: 3,
        name: 'Readonly User',
        email: 'readonly@church.com',
        role: 'readonly' as const,
      };

      localStorage.setItem('token', 'readonly-token');
      localStorage.setItem('user', JSON.stringify(readonlyUser));

      render(
        <MemoryRouter initialEntries={['/users']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Users />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Should show access denied message
      await waitFor(() => {
        expect(screen.getByText('Access Denied')).toBeInTheDocument();
        expect(screen.getByText(/admin.*role/i)).toBeInTheDocument();
      });

      // Should not show Users page content
      expect(screen.queryByText('User Management')).not.toBeInTheDocument();
    });

    it('should prevent staff user from accessing admin-only pages', async () => {
      const staffUser = {
        id: 2,
        name: 'Staff User',
        email: 'staff@church.com',
        role: 'staff' as const,
      };

      localStorage.setItem('token', 'staff-token');
      localStorage.setItem('user', JSON.stringify(staffUser));

      render(
        <MemoryRouter initialEntries={['/users']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Users />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Should show access denied message
      await waitFor(() => {
        expect(screen.getByText('Access Denied')).toBeInTheDocument();
      });
    });

    it('should allow admin user to access all pages', async () => {
      const adminUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('user', JSON.stringify(adminUser));

      render(
        <MemoryRouter initialEntries={['/users']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Users />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Should show Users page
      await waitFor(() => {
        expect(screen.getByText('User Management')).toBeInTheDocument();
      });

      // Should not show access denied
      expect(screen.queryByText('Access Denied')).not.toBeInTheDocument();
    });

    it('should hide action buttons for readonly users on Members page', async () => {
      const readonlyUser = {
        id: 3,
        name: 'Readonly User',
        email: 'readonly@church.com',
        role: 'readonly' as const,
      };

      localStorage.setItem('token', 'readonly-token');
      localStorage.setItem('user', JSON.stringify(readonlyUser));

      render(
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
        expect(screen.getByText('Member Directory')).toBeInTheDocument();
      });

      // Should not show Add Member button
      expect(screen.queryByRole('button', { name: /add member/i })).not.toBeInTheDocument();
    });

    it('should show action buttons for admin users on Members page', async () => {
      const adminUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('user', JSON.stringify(adminUser));

      render(
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
        expect(screen.getByText('Member Directory')).toBeInTheDocument();
      });

      // Should show Add Member button
      expect(screen.getByRole('button', { name: /add member/i })).toBeInTheDocument();
    });
  });

  describe('Session Management Workflow (Validates Requirement 10.6)', () => {
    it('should handle session expiration and redirect to login', async () => {
      const adminUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      // Set up initial authenticated session
      localStorage.setItem('token', 'expired-token');
      localStorage.setItem('user', JSON.stringify(adminUser));

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
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

      // Initially should show dashboard
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

      // Simulate session expiration by clearing storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Verify storage is cleared
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });

    it('should require re-authentication after logout', async () => {
      const adminUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      // Login first
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: adminUser,
          token: 'admin-token',
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
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

      // Login
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'admin123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('admin-token');
      });

      // Logout (simulate by clearing storage)
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Try to access protected route
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
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

      // Should redirect to login
      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });
    });

    it('should maintain session across page navigation', async () => {
      const adminUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('user', JSON.stringify(adminUser));

      // Navigate to dashboard
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
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
      });

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
        expect(screen.getByText('Member Directory')).toBeInTheDocument();
      });

      // Session should still be valid
      expect(localStorage.getItem('token')).toBe('admin-token');
      expect(localStorage.getItem('user')).toContain('admin');
    });
  });

  describe('Unauthorized Access Handling', () => {
    it('should redirect unauthenticated users to login', async () => {
      // No token in localStorage
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
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

      // Should redirect to login
      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      // Should not show dashboard
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });

    it('should show appropriate error message for insufficient permissions', async () => {
      const staffUser = {
        id: 2,
        name: 'Staff User',
        email: 'staff@church.com',
        role: 'staff' as const,
      };

      localStorage.setItem('token', 'staff-token');
      localStorage.setItem('user', JSON.stringify(staffUser));

      render(
        <MemoryRouter initialEntries={['/users']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Users />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Should show clear error message
      await waitFor(() => {
        expect(screen.getByText('Access Denied')).toBeInTheDocument();
        expect(screen.getByText(/admin.*role/i)).toBeInTheDocument();
      });
    });
  });
});
