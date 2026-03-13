/**
 * FormField Component Tests
 * 
 * Tests the form field wrapper component including:
 * - Label rendering
 * - Error display
 * - Helper text
 * - Required indicator
 * - Child element integration
 * 
 * Validates Requirements: 22.4
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from '../form-field';
import { FieldError } from 'react-hook-form';

describe('FormField', () => {
  const MockInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
    <input ref={ref} {...props} data-testid="mock-input" />
  ));
  MockInput.displayName = 'MockInput';

  describe('Label Rendering', () => {
    it('should render label when provided', () => {
      render(
        <FormField label="Email Address" htmlFor="email">
          <MockInput />
        </FormField>
      );
      
      expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('should not render label when not provided', () => {
      const { container } = render(
        <FormField>
          <MockInput />
        </FormField>
      );
      
      expect(container.querySelector('label')).not.toBeInTheDocument();
    });

    it('should associate label with input using htmlFor', () => {
      render(
        <FormField label="Email Address" htmlFor="email">
          <MockInput id="email" />
        </FormField>
      );
      
      const label = screen.getByText('Email Address');
      expect(label).toHaveAttribute('for', 'email');
    });

    it('should show required indicator when required is true', () => {
      render(
        <FormField label="Email Address" required={true}>
          <MockInput />
        </FormField>
      );
      
      const requiredIndicator = screen.getByLabelText('required');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveTextContent('*');
    });

    it('should not show required indicator when required is false', () => {
      render(
        <FormField label="Email Address" required={false}>
          <MockInput />
        </FormField>
      );
      
      expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message from FieldError object', () => {
      const error: FieldError = {
        type: 'required',
        message: 'Email is required',
      };
      
      render(
        <FormField error={error}>
          <MockInput />
        </FormField>
      );
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should display error message from string', () => {
      render(
        <FormField error="Email is required">
          <MockInput />
        </FormField>
      );
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('should pass error to child component', () => {
      const error: FieldError = {
        type: 'required',
        message: 'Email is required',
      };
      
      render(
        <FormField error={error}>
          <MockInput />
        </FormField>
      );
      
      const input = screen.getByTestId('mock-input');
      expect(input).toHaveAttribute('error', 'Email is required');
    });

    it('should set aria-invalid on child when error exists', () => {
      const error: FieldError = {
        type: 'required',
        message: 'Email is required',
      };
      
      render(
        <FormField error={error}>
          <MockInput />
        </FormField>
      );
      
      const input = screen.getByTestId('mock-input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should not display helper text when error exists', () => {
      const error: FieldError = {
        type: 'required',
        message: 'Email is required',
      };
      
      render(
        <FormField error={error} helperText="Enter your email address">
          <MockInput />
        </FormField>
      );
      
      expect(screen.queryByText('Enter your email address')).not.toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('should display helper text when provided and no error', () => {
      render(
        <FormField helperText="Enter your email address">
          <MockInput />
        </FormField>
      );
      
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('should not display helper text when not provided', () => {
      const { container } = render(
        <FormField>
          <MockInput />
        </FormField>
      );
      
      const helperText = container.querySelector('.text-neutral-500');
      expect(helperText).not.toBeInTheDocument();
    });
  });

  describe('Child Element Integration', () => {
    it('should render child element', () => {
      render(
        <FormField>
          <MockInput />
        </FormField>
      );
      
      expect(screen.getByTestId('mock-input')).toBeInTheDocument();
    });

    it('should pass required prop to child', () => {
      render(
        <FormField required={true}>
          <MockInput />
        </FormField>
      );
      
      const input = screen.getByTestId('mock-input');
      expect(input).toHaveAttribute('required');
    });

    it('should preserve existing child props', () => {
      render(
        <FormField>
          <MockInput placeholder="Enter email" disabled={true} />
        </FormField>
      );
      
      const input = screen.getByTestId('mock-input');
      expect(input).toHaveAttribute('placeholder', 'Enter email');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('Styling', () => {
    it('should apply custom className to container', () => {
      const { container } = render(
        <FormField className="custom-class">
          <MockInput />
        </FormField>
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should have default spacing classes', () => {
      const { container } = render(
        <FormField>
          <MockInput />
        </FormField>
      );
      
      expect(container.firstChild).toHaveClass('space-y-1');
    });
  });

  describe('Accessibility', () => {
    it('should have role="alert" on error message', () => {
      const error: FieldError = {
        type: 'required',
        message: 'Email is required',
      };
      
      render(
        <FormField error={error}>
          <MockInput />
        </FormField>
      );
      
      expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
    });

    it('should have proper text color for error', () => {
      const error: FieldError = {
        type: 'required',
        message: 'Email is required',
      };
      
      render(
        <FormField error={error}>
          <MockInput />
        </FormField>
      );
      
      const errorElement = screen.getByText('Email is required');
      expect(errorElement).toHaveClass('text-error-600');
    });

    it('should have proper text color for helper text', () => {
      render(
        <FormField helperText="Enter your email">
          <MockInput />
        </FormField>
      );
      
      const helperElement = screen.getByText('Enter your email');
      expect(helperElement).toHaveClass('text-neutral-500');
    });
  });
});
