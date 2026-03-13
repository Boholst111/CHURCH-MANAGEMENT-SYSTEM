import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../button';
import { Mail } from 'lucide-react';

describe('Button Component', () => {
  describe('Variant Styles', () => {
    it('renders with primary variant styles', () => {
      const { container } = render(<Button variant="primary">Primary Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-primary-600');
      expect(button).toHaveClass('text-white');
    });

    it('renders with secondary variant styles', () => {
      const { container } = render(<Button variant="secondary">Secondary Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-neutral-100');
      expect(button).toHaveClass('text-neutral-900');
    });

    it('renders with outline variant styles', () => {
      const { container } = render(<Button variant="outline">Outline Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-white');
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-neutral-300');
    });

    it('renders with ghost variant styles', () => {
      const { container } = render(<Button variant="ghost">Ghost Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-transparent');
    });

    it('renders with danger variant styles', () => {
      const { container } = render(<Button variant="danger">Danger Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-error-600');
      expect(button).toHaveClass('text-white');
    });

    it('uses primary variant by default', () => {
      const { container } = render(<Button>Default Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-primary-600');
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      const { container } = render(<Button size="sm">Small Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('h-8');
      expect(button).toHaveClass('px-3');
      expect(button).toHaveClass('text-sm');
    });

    it('renders with medium size', () => {
      const { container } = render(<Button size="md">Medium Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('h-10');
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('text-base');
    });

    it('renders with large size', () => {
      const { container } = render(<Button size="lg">Large Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('h-12');
      expect(button).toHaveClass('px-6');
      expect(button).toHaveClass('text-lg');
    });

    it('uses medium size by default', () => {
      const { container } = render(<Button>Default Size</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('h-10');
    });
  });

  describe('Click Handler', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick handler multiple times', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('disables button when loading', () => {
      render(<Button loading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('shows spinner when loading', () => {
      const { container } = render(<Button loading>Loading Button</Button>);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('sets aria-busy attribute when loading', () => {
      render(<Button loading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} loading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('hides icon when loading', () => {
      const { container } = render(
        <Button loading icon={<Mail data-testid="mail-icon" />}>
          Loading Button
        </Button>
      );
      
      expect(screen.queryByTestId('mail-icon')).not.toBeInTheDocument();
    });

    it('shows spinner with correct classes', () => {
      const { container } = render(<Button loading>Loading</Button>);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('mr-2');
      expect(spinner).toHaveClass('h-4');
      expect(spinner).toHaveClass('w-4');
    });
  });

  describe('Icon Positioning', () => {
    it('renders icon on the left by default', () => {
      const { container } = render(
        <Button icon={<Mail data-testid="mail-icon" />}>
          Email
        </Button>
      );
      
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('mail-icon');
      const iconWrapper = icon.closest('span');
      
      expect(iconWrapper).toHaveClass('mr-2');
      expect(iconWrapper).not.toHaveClass('ml-2');
    });

    it('renders icon on the left when iconPosition is "left"', () => {
      const { container } = render(
        <Button icon={<Mail data-testid="mail-icon" />} iconPosition="left">
          Email
        </Button>
      );
      
      const icon = screen.getByTestId('mail-icon');
      const iconWrapper = icon.closest('span');
      
      expect(iconWrapper).toHaveClass('mr-2');
      expect(iconWrapper).not.toHaveClass('ml-2');
    });

    it('renders icon on the right when iconPosition is "right"', () => {
      const { container } = render(
        <Button icon={<Mail data-testid="mail-icon" />} iconPosition="right">
          Email
        </Button>
      );
      
      const icon = screen.getByTestId('mail-icon');
      const iconWrapper = icon.closest('span');
      
      expect(iconWrapper).toHaveClass('ml-2');
      expect(iconWrapper).not.toHaveClass('mr-2');
    });

    it('renders button without icon when icon prop is not provided', () => {
      const { container } = render(<Button>No Icon</Button>);
      
      const spans = container.querySelectorAll('span');
      expect(spans.length).toBe(0);
    });

    it('icon has aria-hidden attribute', () => {
      const { container } = render(
        <Button icon={<Mail data-testid="mail-icon" />}>
          Email
        </Button>
      );
      
      const icon = screen.getByTestId('mail-icon');
      const iconWrapper = icon.closest('span');
      
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Disabled State', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('prevents clicks when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies disabled cursor style', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:cursor-not-allowed');
    });

    it('applies disabled variant styles for primary', () => {
      render(<Button variant="primary" disabled>Disabled Primary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:bg-primary-300');
    });

    it('applies disabled variant styles for secondary', () => {
      render(<Button variant="secondary" disabled>Disabled Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:bg-neutral-50');
      expect(button).toHaveClass('disabled:text-neutral-400');
    });
  });

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('does not apply full width class by default', () => {
      render(<Button>Normal Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('Base Styles', () => {
    it('applies base button classes', () => {
      render(<Button>Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('inline-flex');
      expect(button).toHaveClass('items-center');
      expect(button).toHaveClass('justify-center');
      expect(button).toHaveClass('font-medium');
      expect(button).toHaveClass('rounded-lg');
    });

    it('applies transition classes', () => {
      render(<Button>Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('transition-all');
      expect(button).toHaveClass('duration-200');
    });

    it('applies focus ring classes', () => {
      render(<Button>Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none');
      expect(button).toHaveClass('focus:ring-2');
      expect(button).toHaveClass('focus:ring-offset-2');
      expect(button).toHaveClass('focus:ring-primary-500');
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className', () => {
      render(<Button className="custom-class">Custom Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('merges custom className with default classes', () => {
      render(<Button className="custom-class">Custom Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('inline-flex');
      expect(button).toHaveClass('bg-primary-600');
    });
  });

  describe('Children Content', () => {
    it('renders text children', () => {
      render(<Button>Click Me</Button>);
      
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('renders with icon and text', () => {
      render(
        <Button icon={<Mail data-testid="mail-icon" />}>
          Send Email
        </Button>
      );
      
      expect(screen.getByText('Send Email')).toBeInTheDocument();
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Button>Accessible Button</Button>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is keyboard accessible', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard Button</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
    });

    it('supports aria attributes', () => {
      render(<Button aria-label="Custom Label">Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom Label');
    });
  });
});
