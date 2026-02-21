import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import ProtectedRoute from '../ProtectedRoute';

// Mock the AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../contexts/AuthContext'),
  useAuth: jest.fn(),
}));

const { useAuth } = require('../../contexts/AuthContext');

describe('ProtectedRoute', () => {
  const TestComponent = () => <div>Protected Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication', () => {
    it('should show loading spinner while checking authentication', () => {
      useAuth.mockReturnValue({
        user: null,
        loading: true,
      });

      render(
        <BrowserRouter>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      // Check for the loading spinner by its class
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should redirect to login if not authenticated', () => {
      useAuth.mockReturnValue({
        user: null,
        loading: false,
      });

      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </BrowserRouter>
      );

      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should render children if authenticated', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'staff' },
        loading: false,
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

  describe('Role-Based Access Control', () => {
    it('should allow access when user has exact required role', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'staff' },
        loading: false,
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredRole="staff">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should allow access when user has higher role than required', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        loading: false,
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredRole="staff">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should deny access when user has lower role than required', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Read Only User', email: 'readonly@example.com', role: 'readonly' },
        loading: false,
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredRole="staff">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      expect(screen.getByText('Access Denied')).toBeInTheDocument();
    });

    it('should show error message with required role when access is denied', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Read Only User', email: 'readonly@example.com', role: 'readonly' },
        loading: false,
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredRole="admin">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText(/This page requires/)).toBeInTheDocument();
      expect(screen.getByText('admin')).toBeInTheDocument();
    });

    it('should allow readonly users to access routes without role requirement', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Read Only User', email: 'readonly@example.com', role: 'readonly' },
        loading: false,
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

    it('should handle case-insensitive role comparison', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Staff User', email: 'staff@example.com', role: 'STAFF' },
        loading: false,
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredRole="staff">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  describe('Role Hierarchy', () => {
    it('should enforce correct role hierarchy: admin > staff > readonly', () => {
      // Admin can access staff-required routes
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
        loading: false,
      });

      const { rerender } = render(
        <BrowserRouter>
          <ProtectedRoute requiredRole="staff">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();

      // Staff can access readonly-required routes
      useAuth.mockReturnValue({
        user: { id: 2, name: 'Staff', email: 'staff@example.com', role: 'staff' },
        loading: false,
      });

      rerender(
        <BrowserRouter>
          <ProtectedRoute requiredRole="readonly">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();

      // Readonly cannot access staff-required routes
      useAuth.mockReturnValue({
        user: { id: 3, name: 'Readonly', email: 'readonly@example.com', role: 'readonly' },
        loading: false,
      });

      rerender(
        <BrowserRouter>
          <ProtectedRoute requiredRole="staff">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      expect(screen.getByText('Access Denied')).toBeInTheDocument();
    });
  });

  describe('Error Display', () => {
    it('should show go back button when access is denied', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Read Only User', email: 'readonly@example.com', role: 'readonly' },
        loading: false,
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredRole="admin">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    });

    it('should show warning icon when access is denied', () => {
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Read Only User', email: 'readonly@example.com', role: 'readonly' },
        loading: false,
      });

      render(
        <BrowserRouter>
          <ProtectedRoute requiredRole="admin">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      );

      const svg = screen.getByText('Access Denied').parentElement?.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});
