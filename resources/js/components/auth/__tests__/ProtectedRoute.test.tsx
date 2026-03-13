import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { useAuthStore } from '../../../stores';

// Mock the auth store
jest.mock('../../../stores', () => ({
  useAuthStore: jest.fn(),
  authSelectors: {
    isAuthenticated: (state: any) => state.isAuthenticated,
    loading: (state: any) => state.loading,
  },
}));

describe('ProtectedRoute', () => {
  const TestComponent = () => <div>Protected Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading is true', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({ loading: true, isAuthenticated: false });
        }
        return false;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('Authentication', () => {
    it('should redirect to login when not authenticated', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({ loading: false, isAuthenticated: false });
        }
        return false;
      });

      render(
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </BrowserRouter>
      );

      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should render children when authenticated', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({ loading: false, isAuthenticated: true });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  describe('Permission Checking', () => {
    it('should render children when user has required permission', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          const state = {
            loading: false,
            isAuthenticated: true,
            hasPermission: (perm: string) => perm === 'members.edit',
          };
          return selector(state);
        }
        return true;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredPermission="members.edit">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should show access denied when user lacks required permission', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          const state = {
            loading: false,
            isAuthenticated: true,
            hasPermission: (perm: string) => false,
          };
          return selector(state);
        }
        return true;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredPermission="members.edit">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Access Denied')).toBeInTheDocument();
      expect(screen.getByText(/members.edit/)).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should render children when user has any of required permissions', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          const state = {
            loading: false,
            isAuthenticated: true,
            hasAnyPermission: (perms: string[]) => perms.includes('members.view'),
          };
          return selector(state);
        }
        return true;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredPermissions={['members.view', 'members.edit']}>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should show access denied when user lacks any of required permissions', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          const state = {
            loading: false,
            isAuthenticated: true,
            hasAnyPermission: (perms: string[]) => false,
          };
          return selector(state);
        }
        return true;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredPermissions={['members.view', 'members.edit']}>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Access Denied')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should render children when user has all required permissions', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          const state = {
            loading: false,
            isAuthenticated: true,
            hasAllPermissions: (perms: string[]) => true,
          };
          return selector(state);
        }
        return true;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredPermissions={['members.view', 'members.edit']} requireAll>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should show access denied when user lacks all required permissions', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          const state = {
            loading: false,
            isAuthenticated: true,
            hasAllPermissions: (perms: string[]) => false,
          };
          return selector(state);
        }
        return true;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredPermissions={['members.view', 'members.edit']} requireAll>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Access Denied')).toBeInTheDocument();
      expect(screen.getByText(/all/)).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('Access Denied UI', () => {
    it('should show go back button in access denied screen', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          const state = {
            loading: false,
            isAuthenticated: true,
            hasPermission: (perm: string) => false,
          };
          return selector(state);
        }
        return true;
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredPermission="admin.access">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Go Back')).toBeInTheDocument();
    });
  });
});
