import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemberForm, { MemberFormData, SmallGroup } from '../MemberForm';
import { Member } from '../MemberTable';

/**
 * Unit tests for MemberForm component
 * 
 * Tests form validation, rendering, and submission behavior
 * Validates Requirements: 3.4, 3.5, 3.6
 */
describe('MemberForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  
  const mockSmallGroups: SmallGroup[] = [
    { id: 1, name: 'Youth Group' },
    { id: 2, name: 'Prayer Group' },
  ];

  const mockMember: Member = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    city: 'Springfield',
    status: 'active',
    small_group_id: 1,
    date_joined: '2024-01-01T00:00:00Z',
    birth_date: '1990-01-01T00:00:00Z',
    gender: 'male',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    small_group: {
      id: 1,
      name: 'Youth Group',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render form with all input fields', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/small group/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/date joined/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    });

    it('should render "Add New Member" title when no member is provided', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Add New Member')).toBeInTheDocument();
    });

    it('should render "Edit Member" title when member is provided', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={mockMember}
        />
      );

      expect(screen.getByText('Edit Member')).toBeInTheDocument();
    });

    it('should populate form fields when editing a member', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={mockMember}
          smallGroups={mockSmallGroups}
        />
      );

      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Springfield')).toBeInTheDocument();
    });

    it('should render small group options', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const smallGroupSelect = screen.getByLabelText(/small group/i);
      expect(smallGroupSelect).toBeInTheDocument();
      
      // Check that options are rendered
      const options = screen.getAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should show error when first name is empty', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when last name is empty', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Last name is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when email is empty', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when email format is invalid', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when phone is empty', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when address is empty', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Address is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when city is empty', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('City is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should clear error when user starts typing in a field', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
      });

      const firstNameInput = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
      });
    });

    it('should show error when first name exceeds 100 characters', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const firstNameInput = screen.getByLabelText(/first name/i);
      const longName = 'a'.repeat(101);
      fireEvent.change(firstNameInput, { target: { value: longName } });

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('First name must be 100 characters or less')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form data when all fields are valid', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Smith' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'jane.smith@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '555-1234' },
      });
      fireEvent.change(screen.getByLabelText(/address/i), {
        target: { value: '456 Oak Ave' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Portland' },
      });

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@example.com',
            phone: '555-1234',
            address: '456 Oak Ave',
            city: 'Portland',
            status: 'active',
            gender: 'male',
          })
        );
      });
    });

    it('should call onClose after successful submission', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Smith' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'jane.smith@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '555-1234' },
      });
      fireEvent.change(screen.getByLabelText(/address/i), {
        target: { value: '456 Oak Ave' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Portland' },
      });

      const submitButton = screen.getByRole('button', { name: /add member/i });
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
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Smith' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'jane.smith@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '555-1234' },
      });
      fireEvent.change(screen.getByLabelText(/address/i), {
        target: { value: '456 Oak Ave' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Portland' },
      });

      const submitButton = screen.getByRole('button', { name: /add member/i });
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
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Smith' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'existing@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '555-1234' },
      });
      fireEvent.change(screen.getByLabelText(/address/i), {
        target: { value: '456 Oak Ave' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Portland' },
      });

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });

      // Form should remain open (Edit Member title should still be visible)
      expect(screen.getByText('Add New Member')).toBeInTheDocument();
    });
  });

  describe('Cancel Button', () => {
    it('should call onClose when cancel button is clicked', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not call onClose when cancel is clicked during submission', async () => {
      mockOnSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in required fields and submit
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Smith' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'jane@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '555-1234' },
      });
      fireEvent.change(screen.getByLabelText(/address/i), {
        target: { value: '456 Oak Ave' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Portland' },
      });

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      // Try to click cancel while submitting
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toBeDisabled();
    });
  });
});
