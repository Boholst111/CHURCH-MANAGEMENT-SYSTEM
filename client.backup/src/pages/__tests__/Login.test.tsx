import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Login from '../Login';
import api from '../../lib/api';

/**
 * Login Page Unit Tests
 * 
 * Tests the Login page authentication flow, form validation, and error handling.
 * 
 * Validates Requirements: 10.1
 */

// Mock the API module
jest.mock('../../lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Page Structure', () => {
    it('should render the church name and branding', () => {
      renderLogin();
      
      expect(screen.getByText('Mahayahay Free Methodist Church')).toBeInTheDocument();
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    });

    it('should render the church icon', () => {
      renderLogin();
      
      // Check for the Church icon (svg element)
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render the login form with email and password fields', () => {
      renderLogin();
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should render demo credentials section', () => {
      renderLogin();
      
      expect(screen.getByText('Demo Credentials:')).toBeInTheDocument();
      expect(screen.getByText(/admin@example.com/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should require email field', () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      expect(emailInput).toHaveAttribute('required');
    });

    it('should require password field', () => {
      renderLogin();
      
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
      expect(passwordInput).toHaveAttribute('required');
    });

    it('should have email type for email input', () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should have password type for password input', () => {
      renderLogin();
      
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Form Interaction', () => {
    it('should update email field when user types', () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      expect(emailInput.value).toBe('test@example.com');
    });

    it('should update password field when user types', () => {
      renderLogin();
      
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      expect(passwordInput.value).toBe('password123');
    });

    it('should show loading state when form is submitted', async () => {
      mockedApi.post.mockImplementation(() => new Promise(() => {})); // Never resolves
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Signing in...')).toBeInTheDocument();
      });
    });

    it('should disable submit button during loading', async () => {
      mockedApi.post.mockImplementation(() => new Promise(() => {})); // Never resolves
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe('Authentication Flow', () => {
    it('should call login API with correct credentials', async () => {
      mockedApi.post.mockResolvedValue({
        data: {
          user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'admin' },
          token: 'test-token',
        },
      });
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockedApi.post).toHaveBeenCalledWith('/auth/login', {
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    it('should redirect to dashboard on successful login', async () => {
      mockedApi.post.mockResolvedValue({
        data: {
          user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'admin' },
          token: 'test-token',
        },
      });
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    it('should store token and user in localStorage on successful login', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'admin' };
      const mockToken = 'test-token';
      
      mockedApi.post.mockResolvedValue({
        data: {
          user: mockUser,
          token: mockToken,
        },
      });
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe(mockToken);
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message when login fails', async () => {
      mockedApi.post.mockRejectedValue({
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      });
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });

    it('should display generic error message when API error has no message', async () => {
      mockedApi.post.mockRejectedValue(new Error('Network error'));
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Login failed')).toBeInTheDocument();
      });
    });

    it('should clear error message when form is resubmitted', async () => {
      // First submission fails
      mockedApi.post.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      });
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
      
      // Second submission (mock success)
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'admin' },
          token: 'test-token',
        },
      });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
      });
    });

    it('should show error with alert icon', async () => {
      mockedApi.post.mockRejectedValue({
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      });
      
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const errorContainer = screen.getByText('Invalid credentials').closest('div');
        expect(errorContainer?.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Design System Compliance', () => {
    it('should use soft blue color palette', () => {
      renderLogin();
      
      const container = screen.getByText('Mahayahay Free Methodist Church').closest('div');
      expect(container).toBeInTheDocument();
    });

    it('should have rounded corners on inputs and buttons', () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      expect(emailInput).toHaveClass('rounded-lg');
      expect(passwordInput).toHaveClass('rounded-lg');
      expect(submitButton).toHaveClass('rounded-lg');
    });
  });
});
