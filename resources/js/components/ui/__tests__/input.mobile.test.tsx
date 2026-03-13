import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../input';

/**
 * Mobile Form Optimization Tests for Input Component
 * 
 * Tests mobile-specific features:
 * - Minimum 44px touch target height
 * - Appropriate mobile keyboard types (inputMode)
 * - Proper stacking on mobile
 * 
 * Validates: Task 19.3 - Optimize forms for mobile
 */
describe('Input - Mobile Optimizations', () => {
  describe('Touch Target Size', () => {
    it('should have minimum 44px height for medium size inputs', () => {
      render(<Input label="Test Input" size="md" />);
      const input = screen.getByLabelText('Test Input');
      
      // Check that the input has min-h-[44px] class
      expect(input).toHaveClass('min-h-[44px]');
    });

    it('should maintain proper height for large inputs', () => {
      render(<Input label="Test Input" size="lg" />);
      const input = screen.getByLabelText('Test Input');
      
      // Large inputs should be h-12 (48px)
      expect(input).toHaveClass('h-12');
    });
  });

  describe('Mobile Keyboard Types', () => {
    it('should use email inputMode for email type', () => {
      render(<Input label="Email" type="email" />);
      const input = screen.getByLabelText('Email');
      
      expect(input).toHaveAttribute('inputMode', 'email');
    });

    it('should use tel inputMode for tel type', () => {
      render(<Input label="Phone" type="tel" />);
      const input = screen.getByLabelText('Phone');
      
      expect(input).toHaveAttribute('inputMode', 'tel');
    });

    it('should use numeric inputMode for number type', () => {
      render(<Input label="Age" type="number" />);
      const input = screen.getByLabelText('Age');
      
      expect(input).toHaveAttribute('inputMode', 'numeric');
    });

    it('should use url inputMode for url type', () => {
      render(<Input label="Website" type="url" />);
      const input = screen.getByLabelText('Website');
      
      expect(input).toHaveAttribute('inputMode', 'url');
    });

    it('should use text inputMode for text type', () => {
      render(<Input label="Name" type="text" />);
      const input = screen.getByLabelText('Name');
      
      expect(input).toHaveAttribute('inputMode', 'text');
    });

    it('should allow custom inputMode override', () => {
      render(<Input label="Custom" type="text" inputMode="search" />);
      const input = screen.getByLabelText('Custom');
      
      expect(input).toHaveAttribute('inputMode', 'search');
    });
  });

  describe('Full Width Behavior', () => {
    it('should be full width by default', () => {
      const { container } = render(<Input label="Test" />);
      const wrapper = container.firstChild;
      
      expect(wrapper).toHaveClass('w-full');
    });

    it('should respect fullWidth=false', () => {
      const { container } = render(<Input label="Test" fullWidth={false} />);
      const wrapper = container.firstChild;
      
      expect(wrapper).not.toHaveClass('w-full');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Input label="Test Input" required error="Error message" />);
      const input = screen.getByLabelText(/Test Input/);
      
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('should associate error message with input', () => {
      render(<Input label="Test" error="This field is required" />);
      const input = screen.getByLabelText('Test');
      const errorMessage = screen.getByText('This field is required');
      
      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(input).toHaveAttribute('aria-describedby', errorMessage.id);
    });
  });
});
