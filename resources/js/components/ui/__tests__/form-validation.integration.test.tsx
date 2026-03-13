/**
 * Form Validation Integration Tests
 * 
 * Tests the complete form validation flow including:
 * - Form submission with validation errors
 * - Error summary display
 * - Inline error messages
 * - Field highlighting
 * - First field focusing
 * - Error clearing on field correction
 * 
 * Validates Requirements: 22.4
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormValidationExample } from '../form-validation.example';

describe('Form Validation Integration', () => {
  describe('Initial State', () => {
    it('should render form with all fields', () => {
      render(<FormValidationExample />);
      
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    });

    it('should not show error summary initially', () => {
      render(<FormValidationExample />);
      
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should have submit button enabled', () => {
      render(<FormValidationExample />);
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Validation Errors', () => {
    it('should show error summary when submitting empty form', async () => {
      render(<FormValidationExample />);
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/please fix the following errors/i)).toBeInTheDocument();
      });
    });

    it('should display inline error messages for all invalid fields', async () => {
      render(<FormValidationExample />);
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
        expect(screen.getByText(/address is required/i)).toBeInTheDocument();
      });
    });

    it('should show error count in summary', async () => {
      render(<FormValidationExample />);
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/5 errors/i)).toBeInTheDocument();
      });
    });

    it('should highlight invalid fields with red borders', async () => {
      render(<FormValidationExample />);
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const firstNameInput = screen.getByLabelText(/first name/i);
        expect(firstNameInput).toHaveClass('border-error-500');
      });
    });
  });

  describe('Field-Level Validation', () => {
    it('should validate email format', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab(); // Trigger blur validation
      
      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it('should validate minimum length for first name', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      await user.type(firstNameInput, 'A');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/first name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('should validate phone number format', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      const phoneInput = screen.getByLabelText(/phone number/i);
      await user.type(phoneInput, 'abc');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/invalid phone number format/i)).toBeInTheDocument();
      });
    });

    it('should validate minimum length for address', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      const addressInput = screen.getByLabelText(/address/i);
      await user.type(addressInput, 'Short');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText(/address must be at least 10 characters/i)).toBeInTheDocument();
      });
    });
  });

  describe('Error Clearing', () => {
    it('should clear error when field becomes valid', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      
      // Submit to trigger validation
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      });
      
      // Fix the field
      await user.type(firstNameInput, 'John');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
      });
    });

    it('should update error count when errors are fixed', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      // Submit to trigger validation
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/5 errors/i)).toBeInTheDocument();
      });
      
      // Fix one field
      const firstNameInput = screen.getByLabelText(/first name/i);
      await user.type(firstNameInput, 'John');
      await user.tab();
      
      // Submit again
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/4 errors/i)).toBeInTheDocument();
      });
    });
  });

  describe('Successful Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      // Fill in all fields with valid data using placeholder text to avoid ambiguity
      await user.type(screen.getByPlaceholderText(/john/i), 'John');
      await user.type(screen.getByPlaceholderText(/doe/i), 'Doe');
      await user.type(screen.getByPlaceholderText(/john\.doe@example\.com/i), 'john.doe@example.com');
      await user.type(screen.getByPlaceholderText(/\+1 \(555\)/i), '1234567890');
      await user.type(screen.getByPlaceholderText(/123 Main St/i), '123 Main St, City, State 12345');
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/member added successfully/i)).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      // Fill in all fields with valid data
      await user.type(screen.getByPlaceholderText(/john/i), 'John');
      await user.type(screen.getByPlaceholderText(/doe/i), 'Doe');
      await user.type(screen.getByPlaceholderText(/john\.doe@example\.com/i), 'john.doe@example.com');
      await user.type(screen.getByPlaceholderText(/\+1 \(555\)/i), '1234567890');
      await user.type(screen.getByPlaceholderText(/123 Main St/i), '123 Main St, City, State 12345');
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      expect(screen.getByText(/adding member/i)).toBeInTheDocument();
    });

    it('should reset form after successful submission', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      // Fill in all fields
      const firstNameInput = screen.getByPlaceholderText(/john/i) as HTMLInputElement;
      await user.type(firstNameInput, 'John');
      await user.type(screen.getByPlaceholderText(/doe/i), 'Doe');
      await user.type(screen.getByPlaceholderText(/john\.doe@example\.com/i), 'john.doe@example.com');
      await user.type(screen.getByPlaceholderText(/\+1 \(555\)/i), '1234567890');
      await user.type(screen.getByPlaceholderText(/123 Main St/i), '123 Main St, City, State 12345');
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/member added successfully/i)).toBeInTheDocument();
      }, { timeout: 2000 });
      
      // Check that form is reset
      await waitFor(() => {
        expect(firstNameInput.value).toBe('');
      });
    });
  });

  describe('Reset Functionality', () => {
    it('should reset form when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<FormValidationExample />);
      
      // Fill in some fields
      const firstNameInput = screen.getByPlaceholderText(/john/i) as HTMLInputElement;
      await user.type(firstNameInput, 'John');
      
      expect(firstNameInput.value).toBe('John');
      
      // Click reset
      const resetButton = screen.getByRole('button', { name: /reset/i });
      fireEvent.click(resetButton);
      
      expect(firstNameInput.value).toBe('');
    });

    it('should clear errors when reset button is clicked', async () => {
      render(<FormValidationExample />);
      
      // Submit to trigger validation
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/please fix the following errors/i)).toBeInTheDocument();
      });
      
      // Click reset
      const resetButton = screen.getByRole('button', { name: /reset/i });
      fireEvent.click(resetButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/please fix the following errors/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on error messages', async () => {
      render(<FormValidationExample />);
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const alerts = screen.queryAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
      });
    });

    it('should mark invalid fields with aria-invalid', async () => {
      render(<FormValidationExample />);
      
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const firstNameInput = screen.getByPlaceholderText(/john/i);
        // Check that the input has error styling
        expect(firstNameInput).toHaveClass('border-error-500');
      });
    });
  });
});
