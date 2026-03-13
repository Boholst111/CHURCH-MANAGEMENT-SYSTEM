import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../card';

describe('Card Component', () => {
  describe('Variants', () => {
    it('renders default variant with correct styles', () => {
      const { container } = render(
        <Card variant="default" data-testid="card">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border', 'border-neutral-200', 'shadow-sm');
    });

    it('renders bordered variant with correct styles', () => {
      const { container } = render(
        <Card variant="bordered" data-testid="card">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border-2', 'border-neutral-300', 'shadow-none');
    });

    it('renders elevated variant with correct styles', () => {
      const { container } = render(
        <Card variant="elevated" data-testid="card">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border-transparent', 'shadow-lg');
    });
  });

  describe('Padding Options', () => {
    it('renders with no padding', () => {
      const { container } = render(
        <Card padding="none">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-0');
    });

    it('renders with small padding', () => {
      const { container } = render(
        <Card padding="sm">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-4');
    });

    it('renders with medium padding (default)', () => {
      const { container } = render(
        <Card>Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-6');
    });

    it('renders with large padding', () => {
      const { container } = render(
        <Card padding="lg">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-8');
    });
  });

  describe('Hoverable Prop', () => {
    it('applies hover styles when hoverable is true', () => {
      const { container } = render(
        <Card hoverable>Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('hover:shadow-xl', 'hover:scale-[1.02]', 'cursor-pointer');
    });

    it('does not apply hover styles when hoverable is false', () => {
      const { container } = render(
        <Card hoverable={false}>Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveClass('hover:shadow-xl');
      expect(card).not.toHaveClass('cursor-pointer');
    });

    it('handles click events on hoverable cards', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      const { container } = render(
        <Card hoverable onClick={handleClick}>
          Clickable Content
        </Card>
      );
      
      const card = container.firstChild as HTMLElement;
      await user.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Title and Description Props', () => {
    it('renders title when provided', () => {
      render(
        <Card title="Test Title">Content</Card>
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <Card description="Test Description">Content</Card>
      );
      
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders both title and description', () => {
      render(
        <Card title="Test Title" description="Test Description">
          Content
        </Card>
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Card title="Test Title">
          <p>Child Content</p>
        </Card>
      );
      
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });
  });

  describe('Footer Prop', () => {
    it('renders footer when provided', () => {
      render(
        <Card 
          title="Test Title"
          footer={<button>Footer Button</button>}
        >
          Content
        </Card>
      );
      
      expect(screen.getByText('Footer Button')).toBeInTheDocument();
    });

    it('renders footer with multiple elements', () => {
      render(
        <Card 
          title="Test Title"
          footer={
            <div>
              <button>Action 1</button>
              <button>Action 2</button>
            </div>
          }
        >
          Content
        </Card>
      );
      
      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
    });
  });

  describe('Structured vs Manual Composition', () => {
    it('uses structured layout when title/description/footer provided', () => {
      const { container } = render(
        <Card 
          title="Title"
          description="Description"
          footer={<div>Footer</div>}
        >
          Content
        </Card>
      );
      
      // Should have no padding on root when using structured content
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-0');
    });

    it('uses padding when no structured props provided', () => {
      const { container } = render(
        <Card padding="md">
          Manual Content
        </Card>
      );
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-6');
    });
  });

  describe('Custom ClassName', () => {
    it('merges custom className with default styles', () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );
      
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('rounded-lg'); // Still has base styles
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card ref={ref}>Content</Card>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('spreads additional HTML attributes', () => {
      render(
        <Card data-testid="custom-card" aria-label="Test Card">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('custom-card');
      expect(card).toHaveAttribute('aria-label', 'Test Card');
    });
  });

  describe('Complex Scenarios', () => {
    it('renders stat card layout correctly', () => {
      render(
        <Card variant="default" padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p>Total Members</p>
              <p className="text-3xl">1,234</p>
            </div>
            <div>Icon</div>
          </div>
        </Card>
      );
      
      expect(screen.getByText('Total Members')).toBeInTheDocument();
      expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('renders card with image and content', () => {
      render(
        <Card variant="default" padding="none">
          <div className="h-48 bg-primary-500" />
          <div className="p-6">
            <h3>Event Title</h3>
            <p>Event Description</p>
          </div>
        </Card>
      );
      
      expect(screen.getByText('Event Title')).toBeInTheDocument();
      expect(screen.getByText('Event Description')).toBeInTheDocument();
    });
  });
});
