import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from '../UserForm';
import { User, UserFormData } from '../../../lib/userApi';

/**
 * Unit tests for UserForm component
 * 
 * Tests form validation, password complexity, rendering, and submission behavior
 * Validates Requirements: 10.4, 10.5
 */
describe('UserForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'staff',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render form with all input fields', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^role/i)).toBeInTheDocument();
    });

    it('should render "Add New User" title when no user is provided', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Add New User')).toBeInTheDocument();
    });

    it('should render "Edit User" title when user is provided', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
        />
      );

      expect(screen.getByText('Edit User')).toBeInTheDocument();
    });

    it('should populate form fields when editing a user', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
        />
      );

      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      
      // Check that the role select has the correct value
      const roleSelect = screen.getByLabelText(/^role/i) as HTMLSelectElement;
      expect(roleSelect.value).toBe('staff');
    });

    it('should render all role options', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByRole('option', { name: /administrator/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^staff$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /read-only/i })).toBeInTheDocument();
    });

    it('should show password as required for new users', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordLabel = screen.getByText(/^password/i);
      expect(passwordLabel).toBeInTheDocument();
      expect(passwordLabel.textContent).toContain('*');
    });

    it('should show password as optional for editing users', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
        />
      );

      expect(screen.getByText(/leave blank to keep current/i)).toBeInTheDocument();
    });

    it('should display password complexity requirements', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText(/must be at least 8 characters with uppercase, lowercase, and number/i)).toBeInTheDocument();
    });

    it('should display role descriptions', () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Default role is staff
      expect(screen.getByText(/can view and edit most data/i)).toBeInTheDocument();
    });
  });

  describe('Validation - Required Fields', () => {
    it('should show error when name is empty', async () => {
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
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when email is empty', async () => {
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
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when password is empty for new user', async () => {
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
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should not require password when editing existing user', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
        />
      );

      // Don't change password, just submit
      const submitButton = screen.getByRole('button', { name: /update user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      // Should not show password required error
      expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
    });

    it('should show error when email format is invalid', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const emailInput = screen.getByLabelText(/^email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when name exceeds 100 characters', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/^name/i);
      const longName = 'a'.repeat(101);
      fireEvent.change(nameInput, { target: { value: longName } });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must be 100 characters or less')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Validation - Password Complexity', () => {
    it('should show error when password is less than 8 characters', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      fireEvent.change(passwordInput, { target: { value: 'Pass1' } });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when password lacks uppercase letter', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when password lacks lowercase letter', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      fireEvent.change(passwordInput, { target: { value: 'PASSWORD123' } });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password must contain at least one lowercase letter')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when password lacks number', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      fireEvent.change(passwordInput, { target: { value: 'Password' } });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should accept valid password with all requirements', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all fields with valid data
      fireEvent.change(screen.getByLabelText(/^name/i), {
        target: { value: 'Jane Smith' },
      });
      fireEvent.change(screen.getByLabelText(/^email/i), {
        target: { value: 'jane.smith@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/^password/i), {
        target: { value: 'Password123' },
      });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      // Should not show any password errors
      expect(screen.queryByText(/password must/i)).not.toBeInTheDocument();
    });

    it('should validate password complexity when editing user with new password', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
        />
      );

      const passwordInput = screen.getByLabelText(/^password/i);
      fireEvent.change(passwordInput, { target: { value: 'weak' } });

      const submitButton = screen.getByRole('button', { name: /update user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form data when all fields are valid', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/^name/i), {
        target: { value: 'Jane Smith' },
      });
      fireEvent.change(screen.getByLabelText(/^email/i), {
        target: { value: 'jane.smith@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/^password/i), {
        target: { value: 'SecurePass123' },
      });
      fireEvent.change(screen.getByLabelText(/^role/i), {
        target: { value: 'admin' },
      });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          password: 'SecurePass123',
          role: 'admin',
        });
      });
    });

    it('should not include password in submission when editing and password is empty', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
        />
      );

      // Don't change password
      const submitButton = screen.getByRole('button', { name: /update user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'staff',
        });
      });

      // Password should not be in the submitted data
      const submittedData = mockOnSubmit.mock.calls[0][0];
      expect(submittedData).not.toHaveProperty('password');
    });

    it('should include password in submission when editing and password is provided', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          user={mockUser}
        />
      );

      // Change password
      fireEvent.change(screen.getByLabelText(/^password/i), {
        target: { value: 'NewPassword123' },
      });

      const submitButton = screen.getByRole('button', { name: /update user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'NewPassword123',
          role: 'staff',
        });
      });
    });

    it('should call onClose after successful submission', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/^name/i), {
        target: { value: 'Jane Smith' },
      });
      fireEvent.change(screen.getByLabelText(/^email/i), {
        target: { value: 'jane.smith@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/^password/i), {
        target: { value: 'SecurePass123' },
      });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should disable submit button while submitting', async () => {
      mockOnSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/^name/i), {
        target: { value: 'Jane Smith' },
      });
      fireEvent.change(screen.getByLabelText(/^email/i), {
        target: { value: 'jane.smith@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/^password/i), {
        target: { value: 'SecurePass123' },
      });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
      });
    });

    it('should handle server-side validation errors', async () => {
      const serverError = {
        response: {
          data: {
            errors: {
              email: 'Email already exists',
            },
          },
        },
      };
      mockOnSubmit.mockRejectedValue(serverError);

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/^name/i), {
        target: { value: 'Jane Smith' },
      });
      fireEvent.change(screen.getByLabelText(/^email/i), {
        target: { value: 'existing@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/^password/i), {
        target: { value: 'SecurePass123' },
      });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });

      // Form should remain open
      expect(screen.getByText('Add New User')).toBeInTheDocument();
    });
  });

  describe('Error Clearing', () => {
    it('should clear error when user starts typing in a field', async () => {
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
      });

      const nameInput = screen.getByLabelText(/^name/i);
      fireEvent.change(nameInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Cancel Button', () => {
    it('should call onClose when cancel button is clicked', () => {
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

    it('should disable cancel button during submission', async () => {
      mockOnSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in required fields and submit
      fireEvent.change(screen.getByLabelText(/^name/i), {
        target: { value: 'Jane Smith' },
      });
      fireEvent.change(screen.getByLabelText(/^email/i), {
        target: { value: 'jane@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/^password/i), {
        target: { value: 'SecurePass123' },
      });

      const submitButton = screen.getByRole('button', { name: /add user/i });
      fireEvent.click(submitButton);

      // Cancel button should be disabled while submitting
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toBeDisabled();
    });
  });

  describe('Role Selection', () => {
    it('should update role description when role changes', async () => {
      render(
        <UserForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Default is staff
      expect(screen.getByText(/can view and edit most data/i)).toBeInTheDocument();

      // Change to admin
      const roleSelect = screen.getByLabelText(/^role/i);
      fireEvent.change(roleSelect, { target: { value: 'admin' } });

      await waitFor(() => {
        expect(screen.getByText(/full access to all features and settings/i)).toBeInTheDocument();
      });

      // Change to readonly
      fireEvent.change(roleSelect, { target: { value: 'readonly' } });

      await waitFor(() => {
        expect(screen.getByText(/can only view data, no editing allowed/i)).toBeInTheDocument();
      });
    });
  });
});
