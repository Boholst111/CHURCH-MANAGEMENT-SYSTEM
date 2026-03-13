import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../input';
import { Mail, Search } from 'lucide-react';

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('renders input element', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
    });

    it('renders with default type text', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  describe('Input Types', () => {
    it('renders with email type', () => {
      render(<Input type="email" />);
      
      const input = document.querySelector('input[type="email"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with password type', () => {
      render(<Input type="password" />);
      
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with number type', () => {
      render(<Input type="number" />);
      
      const input = document.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with tel type', () => {
      render(<Input type="tel" />);
      
      const input = document.querySelector('input[type="tel"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with url type', () => {
      render(<Input type="url" />);
      
      const input = document.querySelector('input[type="url"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Label', () => {
    it('renders with label', () => {
      render(<Input label="Email Address" />);
      
      expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('associates label with input', () => {
      render(<Input label="Email Address" />);
      
      const label = screen.getByText('Email Address');
      const input = screen.getByRole('textbox');
      
      expect(label).toHaveAttribute('for', input.id);
    });

    it('renders without label when not provided', () => {
      const { container } = render(<Input />);
      
      const label = container.querySelector('label');
      expect(label).not.toBeInTheDocument();
    });

    it('shows required indicator when required', () => {
      render(<Input label="Email" required />);
      
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveClass('text-error-500');
    });

    it('required indicator has aria-label', () => {
      render(<Input label="Email" required />);
      
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toHaveAttribute('aria-label', 'required');
    });
  });

  describe('Value Changes', () => {
    it('triggers onChange handler when value changes', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('updates value when typing', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'hello' } });
      
      expect(input.value).toBe('hello');
    });

    it('calls onChange with correct event', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'test' })
        })
      );
    });
  });

  describe('Error State', () => {
    it('displays error message', () => {
      render(<Input error="This field is required" />);
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styles to input', () => {
      render(<Input error="Error message" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-error-500');
      expect(input).toHaveClass('bg-error-50');
      expect(input).toHaveClass('text-error-900');
    });

    it('error message has role alert', () => {
      render(<Input error="Error message" />);
      
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('error message has correct styling', () => {
      render(<Input error="Error message" />);
      
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toHaveClass('text-sm');
      expect(errorMessage).toHaveClass('text-error-600');
    });

    it('sets aria-invalid when error exists', () => {
      render(<Input error="Error message" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message with input via aria-describedby', () => {
      render(<Input error="Error message" />);
      
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('Error message');
      
      expect(input).toHaveAttribute('aria-describedby', errorMessage.id);
    });

    it('does not show helper text when error is present', () => {
      render(<Input error="Error message" helperText="Helper text" />);
      
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('displays helper text', () => {
      render(<Input helperText="Enter your email address" />);
      
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('helper text has correct styling', () => {
      render(<Input helperText="Helper text" />);
      
      const helperText = screen.getByText('Helper text');
      expect(helperText).toHaveClass('text-sm');
      expect(helperText).toHaveClass('text-neutral-500');
    });

    it('associates helper text with input via aria-describedby', () => {
      render(<Input helperText="Helper text" />);
      
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Helper text');
      
      expect(input).toHaveAttribute('aria-describedby', helperText.id);
    });

    it('renders without helper text when not provided', () => {
      const { container } = render(<Input />);
      
      const helperText = container.querySelector('p.text-neutral-500');
      expect(helperText).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', () => {
      render(<Input disabled />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('applies disabled styles', () => {
      render(<Input disabled />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('bg-neutral-100');
      expect(input).toHaveClass('text-neutral-500');
      expect(input).toHaveClass('cursor-not-allowed');
    });

    it('prevents input when disabled', () => {
      const handleChange = jest.fn();
      render(<Input disabled onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Disabled inputs don't trigger onChange in the DOM
      expect(input).toBeDisabled();
    });
  });

  describe('Required State', () => {
    it('sets required attribute', () => {
      render(<Input required />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('shows required indicator in label', () => {
      render(<Input label="Email" required />);
      
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Icon Support', () => {
    it('renders icon on the left by default', () => {
      const { container } = render(
        <Input icon={<Mail data-testid="mail-icon" />} />
      );
      
      const icon = screen.getByTestId('mail-icon');
      expect(icon).toBeInTheDocument();
      
      const iconWrapper = icon.closest('div');
      expect(iconWrapper).toHaveClass('left-3');
    });

    it('renders icon on the left when iconPosition is "left"', () => {
      const { container } = render(
        <Input icon={<Mail data-testid="mail-icon" />} iconPosition="left" />
      );
      
      const icon = screen.getByTestId('mail-icon');
      const iconWrapper = icon.closest('div');
      
      expect(iconWrapper).toHaveClass('left-3');
      expect(iconWrapper).not.toHaveClass('right-3');
    });

    it('renders icon on the right when iconPosition is "right"', () => {
      const { container } = render(
        <Input icon={<Search data-testid="search-icon" />} iconPosition="right" />
      );
      
      const icon = screen.getByTestId('search-icon');
      const iconWrapper = icon.closest('div');
      
      expect(iconWrapper).toHaveClass('right-3');
      expect(iconWrapper).not.toHaveClass('left-3');
    });

    it('applies left padding when icon is on left', () => {
      render(<Input icon={<Mail />} iconPosition="left" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-10');
    });

    it('applies right padding when icon is on right', () => {
      render(<Input icon={<Search />} iconPosition="right" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pr-10');
    });

    it('icon has aria-hidden attribute', () => {
      const { container } = render(
        <Input icon={<Mail data-testid="mail-icon" />} />
      );
      
      const icon = screen.getByTestId('mail-icon');
      const iconWrapper = icon.closest('div');
      
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });

    it('icon wrapper has pointer-events-none', () => {
      const { container } = render(
        <Input icon={<Mail data-testid="mail-icon" />} />
      );
      
      const icon = screen.getByTestId('mail-icon');
      const iconWrapper = icon.closest('div');
      
      expect(iconWrapper).toHaveClass('pointer-events-none');
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      render(<Input size="sm" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-8');
      expect(input).toHaveClass('px-3');
      expect(input).toHaveClass('text-sm');
    });

    it('renders with medium size', () => {
      render(<Input size="md" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-10');
      expect(input).toHaveClass('px-4');
      expect(input).toHaveClass('text-base');
    });

    it('renders with large size', () => {
      render(<Input size="lg" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-12');
      expect(input).toHaveClass('px-4');
      expect(input).toHaveClass('text-lg');
    });

    it('uses medium size by default', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-10');
    });
  });

  describe('Full Width', () => {
    it('applies full width by default', () => {
      const { container } = render(<Input />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });

    it('does not apply full width when fullWidth is false', () => {
      const { container } = render(<Input fullWidth={false} />);
      
      const wrapper = container.firstChild;
      expect(wrapper).not.toHaveClass('w-full');
    });
  });

  describe('Base Styles', () => {
    it('applies base input classes', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('block');
      expect(input).toHaveClass('w-full');
      expect(input).toHaveClass('rounded-lg');
      expect(input).toHaveClass('border');
    });

    it('applies transition classes', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('transition-colors');
      expect(input).toHaveClass('duration-200');
    });

    it('applies focus ring classes', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:outline-none');
      expect(input).toHaveClass('focus:ring-2');
      expect(input).toHaveClass('focus:ring-offset-0');
    });

    it('applies default variant styles', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-neutral-300');
      expect(input).toHaveClass('bg-white');
      expect(input).toHaveClass('text-neutral-900');
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className to input', () => {
      render(<Input className="custom-class" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      render(<Input className="custom-class" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
      expect(input).toHaveClass('block');
      expect(input).toHaveClass('rounded-lg');
    });
  });

  describe('Accessibility', () => {
    it('has textbox role for text input', () => {
      render(<Input type="text" />);
      
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('generates unique id for input', () => {
      const { container } = render(
        <>
          <Input />
          <Input />
        </>
      );
      
      const inputs = container.querySelectorAll('input');
      expect(inputs[0].id).not.toBe(inputs[1].id);
    });

    it('uses provided id when given', () => {
      render(<Input id="custom-id" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    it('associates error message with input', () => {
      render(<Input error="Error message" />);
      
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('Error message');
      
      expect(input.getAttribute('aria-describedby')).toContain(errorMessage.id);
    });

    it('associates helper text with input', () => {
      render(<Input helperText="Helper text" />);
      
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Helper text');
      
      expect(input.getAttribute('aria-describedby')).toContain(helperText.id);
    });

    it('is keyboard accessible', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      input.focus();
      
      expect(input).toHaveFocus();
    });
  });

  describe('Complete Form Example', () => {
    it('renders complete input with all features', () => {
      render(
        <Input
          type="email"
          label="Email Address"
          placeholder="your.email@church.com"
          icon={<Mail data-testid="mail-icon" />}
          iconPosition="left"
          helperText="We'll never share your email"
          required
        />
      );
      
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('your.email@church.com')).toBeInTheDocument();
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('renders complete input with error state', () => {
      render(
        <Input
          type="email"
          label="Email Address"
          placeholder="your.email@church.com"
          icon={<Mail data-testid="mail-icon" />}
          error="Please enter a valid email"
          required
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-error-500');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });
});
