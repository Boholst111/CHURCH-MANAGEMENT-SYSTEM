import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Icon } from '../icon';
import { Home, Mail, CheckCircle } from 'lucide-react';

describe('Icon Component', () => {
  describe('Rendering', () => {
    it('renders the icon component', () => {
      render(<Icon icon={Home} label="Home icon" />);
      const icon = screen.getByRole('img', { name: 'Home icon' });
      expect(icon).toBeInTheDocument();
    });

    it('renders without label (decorative)', () => {
      const { container } = render(<Icon icon={Home} />);
      const icon = container.querySelector('span');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).not.toHaveAttribute('role');
    });

    it('renders with aria-label when label is provided', () => {
      render(<Icon icon={Mail} label="Email icon" />);
      const icon = screen.getByRole('img', { name: 'Email icon' });
      expect(icon).toHaveAttribute('aria-label', 'Email icon');
      expect(icon).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Size Variants', () => {
    it('renders small size (16px)', () => {
      const { container } = render(<Icon icon={Home} size="sm" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('w-4', 'h-4');
    });

    it('renders medium size (20px) by default', () => {
      const { container } = render(<Icon icon={Home} />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('w-5', 'h-5');
    });

    it('renders large size (24px)', () => {
      const { container } = render(<Icon icon={Home} size="lg" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('w-6', 'h-6');
    });

    it('renders extra large size (32px)', () => {
      const { container } = render(<Icon icon={Home} size="xl" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('w-8', 'h-8');
    });
  });

  describe('Color Variants', () => {
    it('renders with primary color', () => {
      const { container } = render(<Icon icon={Home} color="primary" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('text-primary-600');
    });

    it('renders with secondary color', () => {
      const { container } = render(<Icon icon={Home} color="secondary" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('text-neutral-600');
    });

    it('renders with success color', () => {
      const { container } = render(<Icon icon={CheckCircle} color="success" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('text-success-DEFAULT');
    });

    it('renders with warning color', () => {
      const { container } = render(<Icon icon={Home} color="warning" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('text-warning-DEFAULT');
    });

    it('renders with error color', () => {
      const { container } = render(<Icon icon={Home} color="error" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('text-error-DEFAULT');
    });

    it('renders with info color', () => {
      const { container } = render(<Icon icon={Home} color="info" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('text-info-DEFAULT');
    });

    it('renders with muted color', () => {
      const { container } = render(<Icon icon={Home} color="muted" />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('text-neutral-400');
    });

    it('renders with inherit color by default', () => {
      const { container } = render(<Icon icon={Home} />);
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('text-current');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Icon icon={Home} className="custom-class text-purple-600" />
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('custom-class', 'text-purple-600');
    });

    it('merges custom className with default classes', () => {
      const { container } = render(
        <Icon icon={Home} size="lg" color="primary" className="hover:text-primary-800" />
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveClass('w-6', 'h-6', 'text-primary-600', 'hover:text-primary-800');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes when label is provided', () => {
      render(<Icon icon={Home} label="Navigate to home" />);
      const icon = screen.getByRole('img', { name: 'Navigate to home' });
      expect(icon).toHaveAttribute('aria-label', 'Navigate to home');
      expect(icon).not.toHaveAttribute('aria-hidden');
    });

    it('is hidden from screen readers when no label is provided', () => {
      const { container } = render(<Icon icon={Home} />);
      const icon = container.querySelector('span');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).not.toHaveAttribute('role');
      expect(icon).not.toHaveAttribute('aria-label');
    });

    it('supports additional ARIA attributes', () => {
      const { container } = render(
        <Icon icon={Home} aria-describedby="home-description" />
      );
      const icon = container.querySelector('span');
      expect(icon).toHaveAttribute('aria-describedby', 'home-description');
    });
  });

  describe('Combinations', () => {
    it('renders with combined size and color props', () => {
      const { container } = render(
        <Icon icon={CheckCircle} size="xl" color="success" label="Success indicator" />
      );
      const icon = screen.getByRole('img', { name: 'Success indicator' });
      expect(icon).toHaveClass('w-8', 'h-8', 'text-success-DEFAULT');
    });

    it('renders with all props combined', () => {
      const { container } = render(
        <Icon 
          icon={Mail} 
          size="lg" 
          color="primary" 
          label="Email contact"
          className="cursor-pointer"
        />
      );
      const icon = screen.getByRole('img', { name: 'Email contact' });
      expect(icon).toHaveClass('w-6', 'h-6', 'text-primary-600', 'cursor-pointer');
      expect(icon).toHaveAttribute('aria-label', 'Email contact');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to the span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Icon icon={Home} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
