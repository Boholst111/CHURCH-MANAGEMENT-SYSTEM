import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileForm from '../ProfileForm';
import { ToastProvider } from '../../../contexts/ToastContext';
import { AuthProvider } from '../../../contexts/AuthContext';
import api from '../../../lib/api';

// Mock the API module
jest.mock('../../../lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

// Mock AuthContext with a test user
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin',
};

// Wrapper component with providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      <ToastProvider>
        {component}
      </ToastProvider>
    </AuthProvider>
  );
};

// Mock useAuth hook
jest.mock('../../../contexts/AuthContext', () => {
  const actual = jest.requireActual('../../../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: mockUser,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
    }),
  };
});

describe('ProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders profile form with user data', () => {
    renderWithProviders(<ProfileForm />);

    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john.doe@example.com');
    expect(screen.getByPlaceholderText(/enter new password/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/confirm new password/i)).toHaveValue('');
  });

  it('displays required field indicators', () => {
    renderWithProviders(<ProfileForm />);

    const nameLabel = screen.getByText(/name/i).closest('label');
    const emailLabel = screen.getByText(/email/i).closest('label');

    expect(nameLabel).toHaveTextContent('*');
    expect(emailLabel).toHaveTextContent('*');
  });

  it('validates required fields', async () => {
    renderWithProviders(<ProfileForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    // Clear required fields
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderWithProviders(<ProfileForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('validates password complexity - minimum length', async () => {
    renderWithProviders(<ProfileForm />);

    const passwordInput = screen.getByPlaceholderText(/enter new password/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(passwordInput, { target: { value: 'Short1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
    });
  });

  it('validates password complexity - requires lowercase', async () => {
    renderWithProviders(<ProfileForm />);

    const passwordInput = screen.getByPlaceholderText(/enter new password/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(passwordInput, { target: { value: 'PASSWORD123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one lowercase letter')).toBeInTheDocument();
    });
  });

  it('validates password complexity - requires uppercase', async () => {
    renderWithProviders(<ProfileForm />);

    const passwordInput = screen.getByPlaceholderText(/enter new password/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
    });
  });

  it('validates password complexity - requires number', async () => {
    renderWithProviders(<ProfileForm />);

    const passwordInput = screen.getByPlaceholderText(/enter new password/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(passwordInput, { target: { value: 'PasswordOnly' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument();
    });
  });

  it('validates password confirmation matches', async () => {
    renderWithProviders(<ProfileForm />);

    const passwordInput = screen.getByPlaceholderText(/enter new password/i);
    const confirmInput = screen.getByPlaceholderText(/confirm new password/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(passwordInput, { target: { value: 'ValidPass123' } });
    fireEvent.change(confirmInput, { target: { value: 'DifferentPass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('allows updating profile without changing password', async () => {
    const mockResponse = {
      data: {
        success: true,
        message: 'Profile updated successfully',
        user: {
          ...mockUser,
          name: 'Jane Doe',
        },
      },
    };

    mockedApi.put.mockResolvedValueOnce(mockResponse);

    renderWithProviders(<ProfileForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith('/profile', {
        name: 'Jane Doe',
        email: 'john.doe@example.com',
      });
    });
  });

  it('submits form with valid data including password', async () => {
    const mockResponse = {
      data: {
        success: true,
        message: 'Profile updated successfully',
        user: mockUser,
      },
    };

    mockedApi.put.mockResolvedValueOnce(mockResponse);

    renderWithProviders(<ProfileForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/enter new password/i);
    const confirmInput = screen.getByPlaceholderText(/confirm new password/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'NewPass123' } });
    fireEvent.change(confirmInput, { target: { value: 'NewPass123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith('/profile', {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'NewPass123',
      });
    });
  });

  it('clears password fields after successful update', async () => {
    const mockResponse = {
      data: {
        success: true,
        message: 'Profile updated successfully',
        user: mockUser,
      },
    };

    mockedApi.put.mockResolvedValueOnce(mockResponse);

    renderWithProviders(<ProfileForm />);

    const passwordInput = screen.getByPlaceholderText(/enter new password/i) as HTMLInputElement;
    const confirmInput = screen.getByPlaceholderText(/confirm new password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(passwordInput, { target: { value: 'NewPass123' } });
    fireEvent.change(confirmInput, { target: { value: 'NewPass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(passwordInput.value).toBe('');
      expect(confirmInput.value).toBe('');
    });
  });

  it('handles server validation errors', async () => {
    const mockError = {
      response: {
        data: {
          success: false,
          message: 'Validation error',
          errors: {
            email: 'Email is already taken',
          },
        },
      },
    };

    mockedApi.put.mockRejectedValueOnce(mockError);

    renderWithProviders(<ProfileForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(emailInput, { target: { value: 'taken@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is already taken')).toBeInTheDocument();
    });
  });

  it('disables form during submission', async () => {
    const mockResponse = {
      data: {
        success: true,
        message: 'Profile updated successfully',
        user: mockUser,
      },
    };

    mockedApi.put.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockResponse), 100))
    );

    renderWithProviders(<ProfileForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.click(submitButton);

    // Check that button shows "Saving..." and is disabled
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
    });
  });

  it('displays password requirements hint', () => {
    renderWithProviders(<ProfileForm />);

    expect(screen.getByText(/must be at least 8 characters with uppercase, lowercase, and number/i)).toBeInTheDocument();
  });

  it('displays optional password message', () => {
    renderWithProviders(<ProfileForm />);

    expect(screen.getByText(/leave blank to keep your current password/i)).toBeInTheDocument();
  });

  it('clears field error when user starts typing', async () => {
    renderWithProviders(<ProfileForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    // Trigger validation error
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    // Start typing to clear error
    fireEvent.change(nameInput, { target: { value: 'J' } });

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });
});
