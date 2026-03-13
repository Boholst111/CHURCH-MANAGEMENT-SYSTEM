import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeadershipForm, { Leadership, LeadershipFormData } from '../LeadershipForm';

describe('LeadershipForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockLeadership: Leadership = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    role: 'Senior Pastor',
    department: 'Pastoral',
    email: 'john.doe@church.com',
    phone: '123-456-7890',
    photo_url: 'https://example.com/photo.jpg',
    bio: 'A dedicated pastor',
    start_date: '2020-01-15',
    ministry_teams: 'Worship, Youth Ministry',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render form in create mode when no leadership is provided', () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Add New Leadership Profile')).toBeInTheDocument();
      expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
      expect(screen.getByLabelText(/Last Name/i)).toHaveValue('');
    });

    it('should render form in edit mode when leadership is provided', () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          leadership={mockLeadership}
        />
      );

      expect(screen.getByText('Edit Leadership Profile')).toBeInTheDocument();
      expect(screen.getByLabelText(/First Name/i)).toHaveValue('John');
      expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
      expect(screen.getByLabelText(/Role/i)).toHaveValue('Senior Pastor');
      expect(screen.getByLabelText(/Department/i)).toHaveValue('Pastoral');
    });

    it('should render all required form fields', () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Ministry Teams/i)).toBeInTheDocument();
    });

    it('should render photo upload section', () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Upload Photo')).toBeInTheDocument();
      expect(screen.getByText('JPG, PNG or GIF (max 5MB)')).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('should show validation errors for required fields', async () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
        expect(screen.getByText('Last name is required')).toBeInTheDocument();
        expect(screen.getByText('Role is required')).toBeInTheDocument();
        expect(screen.getByText('Department is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields except email with valid values
      fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Pastor' } });
      fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Ministry' } });
      fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123-456-7890' } });
      fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2020-01-15' } });
      
      // Fill in email with invalid format
      const emailInput = screen.getByLabelText(/Email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('should validate phone format', async () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const phoneInput = screen.getByLabelText(/Phone/i);
      fireEvent.change(phoneInput, { target: { value: 'abc-def-ghij' } });

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
      });
    });

    it('should validate field length limits', async () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const firstNameInput = screen.getByLabelText(/First Name/i);
      fireEvent.change(firstNameInput, { target: { value: 'a'.repeat(101) } });

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('First name must be 100 characters or less')).toBeInTheDocument();
      });
    });

    it('should clear validation errors when user types', async () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument();
      });

      const firstNameInput = screen.getByLabelText(/First Name/i);
      fireEvent.change(firstNameInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Senior Pastor' } });
      fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Pastoral' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@church.com' } });
      fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123-456-7890' } });
      fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2020-01-15' } });

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            first_name: 'John',
            last_name: 'Doe',
            role: 'Senior Pastor',
            department: 'Pastoral',
            email: 'john@church.com',
            phone: '123-456-7890',
            start_date: '2020-01-15',
          }),
          null
        );
      });

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should handle submission errors', async () => {
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
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Senior Pastor' } });
      fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Pastoral' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@church.com' } });
      fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123-456-7890' } });

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should disable form during submission', async () => {
      mockOnSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Senior Pastor' } });
      fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Pastoral' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@church.com' } });
      fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123-456-7890' } });

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Saving.../i })).toBeDisabled();
      });
    });
  });

  describe('Photo Upload', () => {
    it('should handle photo file selection', async () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const file = new File(['photo'], 'photo.jpg', { type: 'image/jpeg' });
      const input = document.querySelector('#photo-upload') as HTMLInputElement;

      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(input);

      await waitFor(() => {
        expect(screen.getByText('Change Photo')).toBeInTheDocument();
      });
    });

    it('should validate photo file type', async () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const file = new File(['document'], 'document.pdf', { type: 'application/pdf' });
      const input = document.querySelector('#photo-upload') as HTMLInputElement;

      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });

      fireEvent.change(input);

      await waitFor(() => {
        expect(screen.getByText('Please select a valid image file')).toBeInTheDocument();
      });
    });

    it('should validate photo file size', async () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      const input = document.querySelector('#photo-upload') as HTMLInputElement;

      Object.defineProperty(input, 'files', {
        value: [largeFile],
        writable: false,
      });

      fireEvent.change(input);

      await waitFor(() => {
        expect(screen.getByText('Image size must be less than 5MB')).toBeInTheDocument();
      });
    });
  });

  describe('Cancel Button', () => {
    it('should call onClose when cancel button is clicked', () => {
      render(
        <LeadershipForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /Cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
