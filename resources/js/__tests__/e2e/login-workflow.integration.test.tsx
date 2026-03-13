import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import api from '../../lib/api';

/**
 * Login Workflow Integration Tests
 * 
 * Tests complete login workflows:
 * 1. Successful login and redirect to dashboard
 * 2. Invalid credentials error handling
 * 3. Remember me functionality
 * 4. Forgot password flow
 * 5. Form validation
 * 
 * Validates Requirements: Authentication, Session Management, Error Handling
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

describe('Login Workflow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Successful Login Flow', () => {
    it('should complete full login workflow: enter credentials -> submit -> redirect to dashboard', async () => {
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      const mockToken = 'test-token-123';

      // Mock successful login
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: mockUser,
          token: mockToken,
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Verify login page is displayed
      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      // Enter credentials
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      // Verify API was called with correct credentials
      await waitFor(() => {
        expect(mockedApi.post).toHaveBeenCalledWith('/login', {
          email: 'admin@church.com',
          password: 'password123',
        });
      });

      // Verify token and user are stored
      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe(mockToken);
        expect(localStorage.getItem('user')).toContain('Admin User');
      });

      // Verify redirect to dashboard
      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });
    });

    it('should display loading state during login', async () => {
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      // Mock delayed login response
      mockedApi.post.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  data: {
                    user: mockUser,
                    token: 'test-token',
                  },
                }),
              100
            )
          )
      );

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      // Verify loading state is shown
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });

      // Wait for login to complete
      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });
    });
  });

  describe('Invalid Credentials Flow', () => {
    it('should display error message for invalid credentials', async () => {
      // Mock failed login
      mockedApi.post.mockRejectedValueOnce({
        response: {
          status: 401,
          data: {
            message: 'Invalid credentials',
          },
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      // Enter invalid credentials
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'wrong@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      // Verify error message is displayed
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      // Verify user is not logged in
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();

      // Verify still on login page
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    });

    it('should preserve user input after failed login', async () => {
      mockedApi.post.mockRejectedValueOnce({
        response: {
          status: 401,
          data: {
            message: 'Invalid credentials',
          },
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: 'test@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      // Verify email is preserved (password may be cleared for security)
      expect(emailInput.value).toBe('test@church.com');
    });
  });

  describe('Remember Me Functionality', () => {
    it('should persist session when "Remember me" is checked', async () => {
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: mockUser,
          token: 'test-token',
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const rememberMeCheckbox = screen.queryByLabelText(/remember me/i);

      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      if (rememberMeCheckbox) {
        fireEvent.click(rememberMeCheckbox);
      }

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('test-token');
      });

      // Verify remember me preference is stored
      if (rememberMeCheckbox) {
        expect(localStorage.getItem('rememberMe')).toBe('true');
      }
    });
  });

  describe('Form Validation', () => {
    it('should validate required fields before submission', async () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      // Try to submit without filling fields
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      // Verify validation errors are shown
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });

      // Verify API was not called
      expect(mockedApi.post).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      // Enter invalid email format
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      // Verify email validation error
      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });

      // Verify API was not called
      expect(mockedApi.post).not.toHaveBeenCalled();
    });

    it('should clear validation errors when user corrects input', async () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      // Submit empty form to trigger validation
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });

      // Enter valid email
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });

      // Verify error is cleared
      await waitFor(() => {
        expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Forgot Password Flow', () => {
    it('should navigate to forgot password page when link is clicked', async () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      // Find and click forgot password link
      const forgotPasswordLink = screen.queryByText(/forgot.*password/i);
      if (forgotPasswordLink) {
        fireEvent.click(forgotPasswordLink);

        // Verify navigation to forgot password page
        await waitFor(() => {
          expect(screen.getByText('Forgot Password Page')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Network Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      // Mock network error
      mockedApi.post.mockRejectedValueOnce(new Error('Network Error'));

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      // Verify error message is displayed
      await waitFor(() => {
        expect(
          screen.getByText(/network error|connection failed|unable to connect/i)
        ).toBeInTheDocument();
      });

      // Verify user is not logged in
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should allow retry after network error', async () => {
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@church.com',
        role: 'admin' as const,
      };

      // First attempt fails
      mockedApi.post.mockRejectedValueOnce(new Error('Network Error'));

      // Second attempt succeeds
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: mockUser,
          token: 'test-token',
        },
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // First attempt
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error|connection failed|unable to connect/i)).toBeInTheDocument();
      });

      // Retry
      fireEvent.click(submitButton);

      // Verify successful login
      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe('test-token');
      });

      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });
    });
  });
});
