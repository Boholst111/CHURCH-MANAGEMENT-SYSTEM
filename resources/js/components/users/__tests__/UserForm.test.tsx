import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from '../UserForm';
import { User, UserFormData } from '../../../lib/userApi';

/**
 * Unit tests for UserForm component
 * 
 * Tests:
 * - Form rendering with all fields
 * - Add user mode (new user)
 * - Edit user mode (existing user)
 * - Form validation
 * - Password strength indicator
 * - Photo upload functionality
 * - Role selector with all options
 * - Email format validation
 */
describe('UserForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders add user form with all fields', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Add New User')).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
      expect(screen.getByText('Upload Photo')).toBeInTheDocument();
    });

    it('renders edit user form with existing user data', () => {
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'staff',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      };

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={user}
        />
      );

      expect(screen.getByText('Edit User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
      // Check that staff role is selected
      const roleSelect = screen.getByLabelText(/role/i) as HTMLSelectElement;
      expect(roleSelect.value).toBe('staff');
    });

    it('renders all role options', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const roleSelect = screen.getByLabelText(/role/i);
      expect(roleSelect).toBeInTheDocument();
      
      // Check all role options exist
      expect(screen.getByRole('option', { name: /administrator/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /pastor/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^staff$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /volunteer/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /read-only/i })).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('validates required fields for new user', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('validates email format', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const emailInput = screen.getByLabelText(/email/i);
      const nameInput = screen.getByLabelText(/name/i);
      const passwordInput = screen.getByLabelText(/^password/i);
      
      // Fill in required fields
      await userEvent.type(nameInput, 'Test User');
      await userEvent.type(emailInput, 'invalid-email');
      await userEvent.type(passwordInput, 'ValidPass123');

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('validates password complexity', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      
      // Test too short
      await userEvent.type(passwordInput, 'short');
      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/must be at least 8 characters/i)).toBeInTheDocument();
      });

      // Clear and test missing uppercase
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, 'lowercase123');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/must contain at least one uppercase letter/i)).toBeInTheDocument();
      });
    });

    it('does not require password when editing existing user', async () => {
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'staff',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      };

      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={user}
        />
      );

      const submitButton = screen.getByRole('button', { name: /update user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });
  });

  describe('Password Strength Indicator', () => {
    it('shows password strength indicator for new users', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      
      // Type a weak password
      await userEvent.type(passwordInput, 'Pass123');
      
      await waitFor(() => {
        expect(screen.getByText(/password strength:/i)).toBeInTheDocument();
      });
    });

    it('calculates weak password strength correctly', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      // Use a password that meets minimum length but is still weak
      await userEvent.type(passwordInput, 'Pass1234');
      
      await waitFor(() => {
        expect(screen.getByText('Fair')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('calculates strong password strength correctly', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      await userEvent.type(passwordInput, 'StrongP@ssw0rd123');
      
      await waitFor(() => {
        expect(screen.getByText(/strong/i)).toBeInTheDocument();
      });
    });

    it('does not show password strength indicator when editing user', async () => {
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'staff',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      };

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={user}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      await userEvent.type(passwordInput, 'NewPass123');
      
      // Should not show strength indicator for edit mode
      expect(screen.queryByText(/password strength:/i)).not.toBeInTheDocument();
    });
  });

  describe('Photo Upload', () => {
    it('renders photo upload section', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText(/upload photo/i)).toBeInTheDocument();
      expect(screen.getByText(/jpg, png or gif/i)).toBeInTheDocument();
    });

    it('shows photo preview after upload', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      await userEvent.upload(input, file);

      await waitFor(() => {
        const img = screen.getByAltText(/user photo preview/i);
        expect(img).toBeInTheDocument();
      });
    });

    it('validates file type', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('Please select a valid image file')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('allows removing uploaded photo', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByAltText(/user photo preview/i)).toBeInTheDocument();
      });

      // Find and click remove button
      const removeButton = screen.getByRole('button', { name: '' }).closest('button');
      if (removeButton) {
        fireEvent.click(removeButton);
      }

      await waitFor(() => {
        expect(screen.queryByAltText(/user photo preview/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('submits form with valid data for new user', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      await userEvent.type(screen.getByLabelText(/name/i), 'Jane Smith');
      await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await userEvent.type(screen.getByLabelText(/^password/i), 'SecurePass123');
      
      const roleSelect = screen.getByLabelText(/role/i);
      await userEvent.selectOptions(roleSelect, 'pastor');

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'SecurePass123',
          role: 'pastor',
        });
      });
    });

    it('submits form without password when editing and password is empty', async () => {
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'staff',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      };

      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={user}
        />
      );

      // Change name only
      const nameInput = screen.getByLabelText(/name/i);
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'John Updated');

      const submitButton = screen.getByRole('button', { name: /update user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'John Updated',
          email: 'john@example.com',
          role: 'staff',
        });
      });
    });

    it('closes form after successful submission', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      await userEvent.type(screen.getByLabelText(/name/i), 'Jane Smith');
      await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await userEvent.type(screen.getByLabelText(/^password/i), 'SecurePass123');

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('handles submission errors', async () => {
      const error = {
        response: {
          data: {
            errors: {
              email: 'Email already exists',
            },
          },
        },
      };
      mockOnSubmit.mockRejectedValue(error);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      await userEvent.type(screen.getByLabelText(/name/i), 'Jane Smith');
      await userEvent.type(screen.getByLabelText(/email/i), 'existing@example.com');
      await userEvent.type(screen.getByLabelText(/^password/i), 'SecurePass123');

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Role Selection', () => {
    it('allows selecting admin role', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const roleSelect = screen.getByLabelText(/role/i);
      await userEvent.selectOptions(roleSelect, 'admin');

      expect(screen.getByText(/full access to all features and settings/i)).toBeInTheDocument();
    });

    it('allows selecting pastor role', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const roleSelect = screen.getByLabelText(/role/i);
      await userEvent.selectOptions(roleSelect, 'pastor');

      expect(screen.getByText(/access to ministry and member management/i)).toBeInTheDocument();
    });

    it('allows selecting volunteer role', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const roleSelect = screen.getByLabelText(/role/i);
      await userEvent.selectOptions(roleSelect, 'volunteer');

      expect(screen.getByText(/limited access to assigned areas/i)).toBeInTheDocument();
    });
  });

  describe('Cancel Button', () => {
    it('calls onClose when cancel button is clicked', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
