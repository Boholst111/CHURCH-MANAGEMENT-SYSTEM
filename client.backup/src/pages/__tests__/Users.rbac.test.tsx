import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Users from '../Users';
import { userApi } from '../../lib/userApi';
import { ToastProvider } from '../../contexts/ToastContext';
import ProtectedRoute from '../../components/ProtectedRoute';

// Mock the userApi
jest.mock('../../lib/userApi');

// Mock the AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../contexts/AuthContext'),
  useAuth: jest.fn(),
}));

const { useAuth } = require('../../contexts/AuthContext');
const mockUserApi = userApi as jest.Mocked<typeof userApi>;

/**
 * Role-Based Access Control Tests for Users Page
 * 
 * Tests that only admin users can access user management functionality
 * Validates Requirements: 10.4, 10.5
 */
describe('Users Page - Role-Based Access Control', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin' as const,
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 2,
      name: 'Staff User',
      email: 'staff@example.com',
      role: 'staff' as const,
      created_at: '2024-01-02T00:00:00.000Z',
      updated_at: '2024-01-02T00:00:00.000Z',
    },
  ];

  const renderUsersWithAuth = (userRole: 'admin' | 'staff' | 'readonly') => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: userRole,
    };

    useAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    return render(
      <MemoryRouter initialEntries={['/users']}>
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
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </ToastProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserApi.getUsers.mockResolvedValue(mockUsers);
  });

  describe('Admin Access', () => {
    it('should allow admin users to access user management page', async () => {
      renderUsersWithAuth('admin');

      await waitFor(() => {
        expect(screen.getByText('User Management')).toBeInTheDocument();
      });

      expect(screen.getByText('Manage system users and their access roles')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
    });

    it('should allow admin users to view user list', async () => {
      renderUsersWithAuth('admin');

      await waitFor(() => {
        expect(screen.getByText('Admin User')).toBeInTheDocument();
        expect(screen.getByText('Staff User')).toBeInTheDocument();
      });
    });

    it('should show Add User button for admin users', async () => {
      renderUsersWithAuth('admin');

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
      });
    });
  });

  describe('Staff Access Restriction', () => {
    it('should deny staff users access to user management page', () => {
      renderUsersWithAuth('staff');

      expect(screen.queryByText('User Management')).not.toBeInTheDocument();
      expect(screen.getByText('Access Denied')).toBeInTheDocument();
    });

    it('should show access denied message for staff users', () => {
      renderUsersWithAuth('staff');

      expect(screen.getByText(/This page requires/i)).toBeInTheDocument();
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    it('should not call userApi.getUsers for staff users', () => {
      renderUsersWithAuth('staff');

      expect(mockUserApi.getUsers).not.toHaveBeenCalled();
    });

    it('should show go back button for staff users', () => {
      renderUsersWithAuth('staff');

      expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    });
  });

  describe('Read-Only Access Restriction', () => {
    it('should deny readonly users access to user management page', () => {
      renderUsersWithAuth('readonly');

      expect(screen.queryByText('User Management')).not.toBeInTheDocument();
      expect(screen.getByText('Access Denied')).toBeInTheDocument();
    });

    it('should show access denied message for readonly users', () => {
      renderUsersWithAuth('readonly');

      expect(screen.getByText(/This page requires/i)).toBeInTheDocument();
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    it('should not call userApi.getUsers for readonly users', () => {
      renderUsersWithAuth('readonly');

      expect(mockUserApi.getUsers).not.toHaveBeenCalled();
    });

    it('should show go back button for readonly users', () => {
      renderUsersWithAuth('readonly');

      expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    });
  });

  describe('Unauthenticated Access', () => {
    it('should redirect unauthenticated users to login', () => {
      useAuth.mockReturnValue({
        user: null,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(
        <MemoryRouter initialEntries={['/users']}>
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
              <Route path="/login" element={<div>Login Page</div>} />
            </Routes>
          </ToastProvider>
        </MemoryRouter>
      );

      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('User Management')).not.toBeInTheDocument();
    });

    it('should not call userApi.getUsers for unauthenticated users', () => {
      useAuth.mockReturnValue({
        user: null,
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(
        <MemoryRouter initialEntries={['/users']}>
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
              <Route path="/login" element={<div>Login Page</div>} />
            </Routes>
          </ToastProvider>
        </MemoryRouter>
      );

      expect(mockUserApi.getUsers).not.toHaveBeenCalled();
    });
  });

  describe('Role Hierarchy Enforcement', () => {
    it('should allow only admin role to access user management', async () => {
      // Test admin access
      const { unmount: unmountAdmin } = renderUsersWithAuth('admin');
      
      await waitFor(() => {
        expect(screen.queryByText('Access Denied')).not.toBeInTheDocument();
        expect(screen.getByText('User Management')).toBeInTheDocument();
      });
      
      unmountAdmin();
      jest.clearAllMocks();

      // Test staff denial
      const { unmount: unmountStaff } = renderUsersWithAuth('staff');
      
      expect(screen.getByText('Access Denied')).toBeInTheDocument();
      expect(screen.queryByText('User Management')).not.toBeInTheDocument();
      
      unmountStaff();
      jest.clearAllMocks();

      // Test readonly denial
      const { unmount: unmountReadonly } = renderUsersWithAuth('readonly');
      
      expect(screen.getByText('Access Denied')).toBeInTheDocument();
      expect(screen.queryByText('User Management')).not.toBeInTheDocument();
      
      unmountReadonly();
    });
  });

  describe('Loading State with Authentication', () => {
    it('should show loading state while checking authentication', () => {
      useAuth.mockReturnValue({
        user: null,
        loading: true,
        login: jest.fn(),
        logout: jest.fn(),
      });

      render(
        <MemoryRouter initialEntries={['/users']}>
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
        </MemoryRouter>
      );

      // ProtectedRoute shows loading state, not the Users page
      expect(screen.queryByText('User Management')).not.toBeInTheDocument();
      expect(screen.queryByText('Access Denied')).not.toBeInTheDocument();
    });
  });
});

