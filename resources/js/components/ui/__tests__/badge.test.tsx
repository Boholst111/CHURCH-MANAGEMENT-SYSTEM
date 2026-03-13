import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from '../badge';
import { CheckCircle } from 'lucide-react';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders with default variant (neutral)', () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-neutral-100');
      expect(badge).toHaveClass('text-neutral-700');
    });

    it('renders with default size (md)', () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('h-6');
      expect(badge).toHaveClass('px-2.5');
      expect(badge).toHaveClass('text-sm');
    });

    it('renders with default shape (rounded)', () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('rounded-md');
    });
  });

  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      const { container } = render(<Badge variant="primary">Primary</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-primary-100');
      expect(badge).toHaveClass('text-primary-700');
    });

    it('renders success variant correctly', () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-success-light');
      expect(badge).toHaveClass('text-success-dark');
    });

    it('renders warning variant correctly', () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-warning-light');
      expect(badge).toHaveClass('text-warning-dark');
    });

    it('renders error variant correctly', () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-error-light');
      expect(badge).toHaveClass('text-error-dark');
    });

    it('renders neutral variant correctly', () => {
      const { container } = render(<Badge variant="neutral">Neutral</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-neutral-100');
      expect(badge).toHaveClass('text-neutral-700');
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      const { container } = render(<Badge size="sm">Small</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('h-5');
      expect(badge).toHaveClass('px-2');
      expect(badge).toHaveClass('text-xs');
    });

    it('renders medium size correctly', () => {
      const { container } = render(<Badge size="md">Medium</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('h-6');
      expect(badge).toHaveClass('px-2.5');
      expect(badge).toHaveClass('text-sm');
    });

    it('renders large size correctly', () => {
      const { container } = render(<Badge size="lg">Large</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('h-7');
      expect(badge).toHaveClass('px-3');
      expect(badge).toHaveClass('text-base');
    });
  });

  describe('Shapes', () => {
    it('renders rounded shape correctly', () => {
      const { container } = render(<Badge shape="rounded">Rounded</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('rounded-md');
    });

    it('renders pill shape correctly', () => {
      const { container } = render(<Badge shape="pill">Pill</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('rounded-full');
    });
  });

  describe('Icon Support', () => {
    it('renders with icon', () => {
      const { container } = render(
        <Badge icon={<CheckCircle data-testid="icon" />}>
          With Icon
        </Badge>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders without icon when not provided', () => {
      const { container } = render(<Badge>No Icon</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
    });

    it('icon has aria-hidden attribute', () => {
      const { container } = render(
        <Badge icon={<CheckCircle />}>With Icon</Badge>
      );
      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <Badge className="custom-class">Custom</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-class');
    });

    it('forwards additional HTML attributes', () => {
      render(<Badge data-testid="custom-badge">Test</Badge>);
      expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
    });

    it('supports ref forwarding', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Ref Test</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Combinations', () => {
    it('renders with variant, size, and shape together', () => {
      const { container } = render(
        <Badge variant="success" size="lg" shape="pill">
          Combined
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-success-light');
      expect(badge).toHaveClass('h-7');
      expect(badge).toHaveClass('rounded-full');
    });

    it('renders with all props including icon', () => {
      const { container } = render(
        <Badge
          variant="warning"
          size="sm"
          shape="pill"
          icon={<CheckCircle data-testid="combo-icon" />}
          className="extra-class"
        >
          Full Combo
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-warning-light');
      expect(badge).toHaveClass('h-5');
      expect(badge).toHaveClass('rounded-full');
      expect(badge).toHaveClass('extra-class');
      expect(screen.getByTestId('combo-icon')).toBeInTheDocument();
      expect(screen.getByText('Full Combo')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders as a span element', () => {
      const { container } = render(<Badge>Accessible</Badge>);
      expect(container.firstChild?.nodeName).toBe('SPAN');
    });

    it('has proper focus styles', () => {
      const { container } = render(<Badge>Focus Test</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('focus:outline-none');
      expect(badge).toHaveClass('focus:ring-2');
      expect(badge).toHaveClass('focus:ring-offset-2');
    });
  });
});
