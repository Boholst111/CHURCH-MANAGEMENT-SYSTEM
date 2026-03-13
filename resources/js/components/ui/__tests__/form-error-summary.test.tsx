/**
 * FormErrorSummary Component Tests
 * 
 * Tests the form error summary component including:
 * - Error display
 * - Error count
 * - Error messages
 * - Dismiss functionality
 * - Accessibility
 * 
 * Validates Requirements: 22.4
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormErrorSummary } from '../form-error-summary';
import { FieldErrors } from 'react-hook-form';

describe('FormErrorSummary', () => {
  const mockErrors: FieldErrors = {
    email: { type: 'required', message: 'Email is required' },
    password: { type: 'minLength', message: 'Password must be at least 8 characters' },
    firstName: { type: 'required', message: 'First name is required' },
  };

  describe('Rendering', () => {
    it('should not render when no errors', () => {
      const { container } = render(<FormErrorSummary errors={{}} />);
      expect(container.firstChild).toBeNull();
    });

    it('should render error summary with errors', () => {
      render(<FormErrorSummary errors={mockErrors} />);
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Please fix the following errors/i)).toBeInTheDocument();
    });

    it('should display error count', () => {
      render(<FormErrorSummary errors={mockErrors} showCount={true} />);
      
      expect(screen.getByText(/3 errors/i)).toBeInTheDocument();
    });

    it('should display singular "error" for one error', () => {
      const singleError: FieldErrors = {
        email: { type: 'required', message: 'Email is required' },
      };
      
      render(<FormErrorSummary errors={singleError} showCount={true} />);
      
      expect(screen.getByText(/1 error/i)).toBeInTheDocument();
    });

    it('should not display error count when showCount is false', () => {
      render(<FormErrorSummary errors={mockErrors} showCount={false} />);
      
      expect(screen.queryByText(/3 errors/i)).not.toBeInTheDocument();
    });

    it('should display individual error messages', () => {
      render(<FormErrorSummary errors={mockErrors} showMessages={true} />);
      
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    });

    it('should not display error messages when showMessages is false', () => {
      render(<FormErrorSummary errors={mockErrors} showMessages={false} />);
      
      expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
    });

    it('should format field names correctly', () => {
      const camelCaseErrors: FieldErrors = {
        firstName: { type: 'required', message: 'Required' },
        emailAddress: { type: 'required', message: 'Required' },
      };
      
      render(<FormErrorSummary errors={camelCaseErrors} />);
      
      expect(screen.getByText(/First Name:/i)).toBeInTheDocument();
      expect(screen.getByText(/Email Address:/i)).toBeInTheDocument();
    });

    it('should use custom title', () => {
      render(
        <FormErrorSummary
          errors={mockErrors}
          title="Validation failed"
        />
      );
      
      expect(screen.getByText(/Validation failed/i)).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <FormErrorSummary
          errors={mockErrors}
          className="custom-class"
        />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Dismiss Functionality', () => {
    it('should render dismiss button when onDismiss is provided', () => {
      const mockDismiss = jest.fn();
      
      render(
        <FormErrorSummary
          errors={mockErrors}
          onDismiss={mockDismiss}
        />
      );
      
      expect(screen.getByLabelText(/dismiss error summary/i)).toBeInTheDocument();
    });

    it('should not render dismiss button when onDismiss is not provided', () => {
      render(<FormErrorSummary errors={mockErrors} />);
      
      expect(screen.queryByLabelText(/dismiss error summary/i)).not.toBeInTheDocument();
    });

    it('should call onDismiss when dismiss button is clicked', () => {
      const mockDismiss = jest.fn();
      
      render(
        <FormErrorSummary
          errors={mockErrors}
          onDismiss={mockDismiss}
        />
      );
      
      const dismissButton = screen.getByLabelText(/dismiss error summary/i);
      fireEvent.click(dismissButton);
      
      expect(mockDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have role="alert"', () => {
      render(<FormErrorSummary errors={mockErrors} />);
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should have aria-live="assertive"', () => {
      const { container } = render(<FormErrorSummary errors={mockErrors} />);
      const alert = container.querySelector('[aria-live="assertive"]');
      
      expect(alert).toBeInTheDocument();
    });

    it('should have proper ARIA label for dismiss button', () => {
      const mockDismiss = jest.fn();
      
      render(
        <FormErrorSummary
          errors={mockErrors}
          onDismiss={mockDismiss}
        />
      );
      
      const dismissButton = screen.getByLabelText(/dismiss error summary/i);
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss error summary');
    });

    it('should hide icon from screen readers', () => {
      const { container } = render(<FormErrorSummary errors={mockErrors} />);
      const icon = container.querySelector('svg');
      
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Error Message Handling', () => {
    it('should handle errors without messages', () => {
      const errorsWithoutMessages: FieldErrors = {
        email: { type: 'required' },
      };
      
      render(<FormErrorSummary errors={errorsWithoutMessages} />);
      
      expect(screen.getByText(/Invalid value/i)).toBeInTheDocument();
    });

    it('should handle errors with non-string messages', () => {
      const errorsWithObjectMessages: FieldErrors = {
        email: { type: 'required', message: { key: 'value' } as any },
      };
      
      render(<FormErrorSummary errors={errorsWithObjectMessages} />);
      
      expect(screen.getByText(/Invalid value/i)).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      
      render(<FormErrorSummary ref={ref} errors={mockErrors} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('role', 'alert');
    });
  });
});
