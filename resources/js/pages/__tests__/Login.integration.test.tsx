import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../Login';
import { AuthProvider } from '../../contexts/AuthContext';
import api from '../../lib/api';

// Mock the API module
jest.mock('../../lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper function to render Login with all required providers
const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Integration Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Clear localStorage
    localStorage.clear();
    
    // Reset navigate mock
    mockNavigate.mockReset();
  });

  describe('Successful Login Flow', () => {
    it('redirects to dashboard after successful login', async () => {
      // Mock successful API response
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: 'admin',
          },
          token: 'fake-jwt-token',
        },
      });

      renderLogin();

      // Fill in the login form
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Wait for the API call and navigation
      await waitFor(() => {
        expect(mockedApi.post).toHaveBeenCalledWith('/auth/login', {
          email: 'test@example.com',
          password: 'password123',
        });
      });

      // Verify navigation to dashboard
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });

      // Verify token and user are stored in localStorage
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(localStorage.getItem('user')).toBe(
        JSON.stringify({
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
        })
      );
    });

    it('shows loading state during authentication', async () => {
      // Mock API with a delay
      mockedApi.post.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  data: {
                    user: {
                      id: 1,
                      name: 'Test User',
                      email: 'test@example.com',
                      role: 'admin',
                    },
                    token: 'fake-jwt-token',
                  },
                }),
              100
            )
          )
      );

      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText(/signing in/i)).toBeInTheDocument();
      });

      // Button should be disabled during loading
      expect(submitButton).toBeDisabled();

      // Wait for completion
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('Invalid Credentials Flow', () => {
    it('shows error message for invalid credentials', async () => {
      // Mock failed API response
      mockedApi.post.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      });

      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      // Wait for error message to appear
      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      // Verify no navigation occurred
      expect(mockNavigate).not.toHaveBeenCalled();

      // Verify no token was stored
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('shows generic error message when API error has no message', async () => {
      // Mock failed API response without message
      mockedApi.post.mockRejectedValueOnce({
        response: {
          data: {},
        },
      });

      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Wait for generic error message (the actual error message shown)
      await waitFor(() => {
        expect(screen.getByText(/login failed/i)).toBeInTheDocument();
      });
    });

    it('clears previous error when submitting again', async () => {
      // First attempt - fail
      mockedApi.post.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      });

      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // First attempt
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });

      // Second attempt - success
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: 'admin',
          },
          token: 'fake-jwt-token',
        },
      });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Error should be cleared
      await waitFor(() => {
        expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Remember Me Functionality', () => {
    it('persists session when "Remember me" is checked', async () => {
      // Mock successful API response
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            role: 'admin',
          },
          token: 'fake-jwt-token',
        },
      });

      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i });
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Check "Remember me"
      fireEvent.click(rememberMeCheckbox);
      expect(rememberMeCheckbox).toBeChecked();

      // Fill in credentials and submit
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Wait for successful login
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });

      // Verify session data is stored (token and user)
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(localStorage.getItem('user')).toBeTruthy();
    });

    it('allows unchecking "Remember me" checkbox', () => {
      renderLogin();

      const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i });

      // Initially unchecked
      expect(rememberMeCheckbox).not.toBeChecked();

      // Check it
      fireEvent.click(rememberMeCheckbox);
      expect(rememberMeCheckbox).toBeChecked();

      // Uncheck it
      fireEvent.click(rememberMeCheckbox);
      expect(rememberMeCheckbox).not.toBeChecked();
    });
  });

  describe('Forgot Password Link', () => {
    it('displays "Forgot password?" link', () => {
      renderLogin();

      const forgotPasswordLink = screen.getByText(/forgot password\?/i);
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink).toHaveAttribute('href', '#');
    });

    it('handles "Forgot password?" link click', () => {
      // Mock window.alert
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      renderLogin();

      const forgotPasswordLink = screen.getByText(/forgot password\?/i);
      fireEvent.click(forgotPasswordLink);

      // Verify alert is shown (temporary implementation)
      expect(alertMock).toHaveBeenCalledWith('Forgot password functionality coming soon!');

      alertMock.mockRestore();
    });

    it('prevents default navigation on "Forgot password?" link click', () => {
      renderLogin();

      const forgotPasswordLink = screen.getByText(/forgot password\?/i);
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

      forgotPasswordLink.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Form Validation', () => {
    it('prevents submission with invalid email format', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Enter invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Wait a bit to ensure form validation runs
      await waitFor(() => {
        // API should not be called with invalid email
        expect(mockedApi.post).not.toHaveBeenCalled();
      }, { timeout: 1000 });
    });

    it('prevents submission with short password', async () => {
      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Enter short password
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'short' } });
      fireEvent.click(submitButton);

      // Wait a bit to ensure form validation runs
      await waitFor(() => {
        // API should not be called with short password
        expect(mockedApi.post).not.toHaveBeenCalled();
      }, { timeout: 1000 });
    });

    it('validates form fields before submission', async () => {
      renderLogin();

      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Submit without filling any fields
      fireEvent.click(submitButton);

      // Wait a bit to ensure form validation runs
      await waitFor(() => {
        // API should not be called with empty fields
        expect(mockedApi.post).not.toHaveBeenCalled();
      }, { timeout: 1000 });
    });
  });

  describe('UI Elements', () => {
    it('displays church branding on desktop', () => {
      renderLogin();

      // Check for church name (use getAllByText since it appears multiple times)
      const churchNames = screen.getAllByText(/mahayahay free methodist church/i);
      expect(churchNames.length).toBeGreaterThan(0);
      
      // Check for system name (also appears multiple times)
      const systemNames = screen.getAllByText(/church management system/i);
      expect(systemNames.length).toBeGreaterThan(0);
    });

    it('displays welcome message', () => {
      renderLogin();

      expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
      expect(screen.getByText(/sign in to your account to continue/i)).toBeInTheDocument();
    });

    it('displays demo credentials', () => {
      renderLogin();

      expect(screen.getByText(/demo credentials:/i)).toBeInTheDocument();
      expect(screen.getByText(/admin@example\.com/i)).toBeInTheDocument();
      
      // Look for the specific "password" text in the demo credentials section
      const demoSection = screen.getByText(/demo credentials:/i).closest('div');
      expect(demoSection).toHaveTextContent('Password: password');
    });

    it('displays input fields with proper labels', () => {
      renderLogin();

      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('displays submit button', () => {
      renderLogin();

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has proper form structure', () => {
      renderLogin();

      const form = screen.getByRole('button', { name: /sign in/i }).closest('form');
      expect(form).toBeInTheDocument();
    });

    it('has accessible input labels', () => {
      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('marks required fields', () => {
      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });

    it('disables form inputs during loading', async () => {
      mockedApi.post.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  data: {
                    user: { id: 1, name: 'Test', email: 'test@example.com', role: 'admin' },
                    token: 'token',
                  },
                }),
              100
            )
          )
      );

      renderLogin();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i });
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      // Check that inputs are disabled during loading
      await waitFor(() => {
        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
        expect(rememberMeCheckbox).toBeDisabled();
        expect(submitButton).toBeDisabled();
      });
    });
  });
});
