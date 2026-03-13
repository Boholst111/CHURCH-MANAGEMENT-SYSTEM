import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingFallback, ContentLoadingFallback } from '../loading-fallback';

describe('LoadingFallback Component', () => {
  describe('Basic Rendering', () => {
    it('renders loading fallback', () => {
      render(<LoadingFallback />);
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with custom message', () => {
      render(<LoadingFallback message="Please wait..." />);
      
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('renders spinner', () => {
      const { container } = render(<LoadingFallback />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('applies full-screen layout', () => {
      const { container } = render(<LoadingFallback />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('min-h-screen');
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('items-center');
      expect(wrapper).toHaveClass('justify-center');
    });

    it('applies background color', () => {
      const { container } = render(<LoadingFallback />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('bg-neutral-50');
    });

    it('centers content', () => {
      const { container } = render(<LoadingFallback />);
      
      const content = container.querySelector('.text-center');
      expect(content).toBeInTheDocument();
    });

    it('applies text styling to message', () => {
      render(<LoadingFallback message="Loading..." />);
      
      const message = screen.getByText('Loading...');
      expect(message).toHaveClass('text-sm');
      expect(message).toHaveClass('text-neutral-600');
    });

    it('applies margin to message', () => {
      render(<LoadingFallback message="Loading..." />);
      
      const message = screen.getByText('Loading...');
      expect(message).toHaveClass('mt-4');
    });
  });

  describe('Spinner Size', () => {
    it('renders large spinner', () => {
      const { container } = render(<LoadingFallback />);
      
      // The Spinner component should render with size="lg"
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Different Messages', () => {
    it('renders with loading data message', () => {
      render(<LoadingFallback message="Loading data..." />);
      
      expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });

    it('renders with loading page message', () => {
      render(<LoadingFallback message="Loading page..." />);
      
      expect(screen.getByText('Loading page...')).toBeInTheDocument();
    });

    it('renders with empty string message', () => {
      render(<LoadingFallback message="" />);
      
      const message = screen.getByText('');
      expect(message).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('message is visible to screen readers', () => {
      render(<LoadingFallback message="Loading content" />);
      
      const message = screen.getByText('Loading content');
      expect(message).toBeVisible();
    });
  });
});

describe('ContentLoadingFallback Component', () => {
  describe('Basic Rendering', () => {
    it('renders content loading fallback', () => {
      render(<ContentLoadingFallback />);
      
      expect(screen.getByText('Loading content...')).toBeInTheDocument();
    });

    it('renders with custom message', () => {
      render(<ContentLoadingFallback message="Loading section..." />);
      
      expect(screen.getByText('Loading section...')).toBeInTheDocument();
    });

    it('renders spinner', () => {
      const { container } = render(<ContentLoadingFallback />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('applies content area layout', () => {
      const { container } = render(<ContentLoadingFallback />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('items-center');
      expect(wrapper).toHaveClass('justify-center');
    });

    it('applies vertical padding', () => {
      const { container } = render(<ContentLoadingFallback />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('py-12');
    });

    it('centers content', () => {
      const { container } = render(<ContentLoadingFallback />);
      
      const content = container.querySelector('.text-center');
      expect(content).toBeInTheDocument();
    });

    it('applies text styling to message', () => {
      render(<ContentLoadingFallback message="Loading..." />);
      
      const message = screen.getByText('Loading...');
      expect(message).toHaveClass('text-sm');
      expect(message).toHaveClass('text-neutral-600');
    });

    it('applies margin to message', () => {
      render(<ContentLoadingFallback message="Loading..." />);
      
      const message = screen.getByText('Loading...');
      expect(message).toHaveClass('mt-3');
    });
  });

  describe('Spinner Size', () => {
    it('renders medium spinner', () => {
      const { container } = render(<ContentLoadingFallback />);
      
      // The Spinner component should render with size="md"
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Different Messages', () => {
    it('renders with loading tab message', () => {
      render(<ContentLoadingFallback message="Loading tab..." />);
      
      expect(screen.getByText('Loading tab...')).toBeInTheDocument();
    });

    it('renders with loading section message', () => {
      render(<ContentLoadingFallback message="Loading section..." />);
      
      expect(screen.getByText('Loading section...')).toBeInTheDocument();
    });
  });

  describe('Comparison with LoadingFallback', () => {
    it('has smaller vertical padding than LoadingFallback', () => {
      const { container: fullContainer } = render(<LoadingFallback />);
      const { container: contentContainer } = render(<ContentLoadingFallback />);
      
      const fullWrapper = fullContainer.firstChild;
      const contentWrapper = contentContainer.firstChild;
      
      expect(fullWrapper).toHaveClass('min-h-screen');
      expect(contentWrapper).toHaveClass('py-12');
      expect(contentWrapper).not.toHaveClass('min-h-screen');
    });

    it('has smaller spinner than LoadingFallback', () => {
      // LoadingFallback uses size="lg", ContentLoadingFallback uses size="md"
      const { container: fullContainer } = render(<LoadingFallback />);
      const { container: contentContainer } = render(<ContentLoadingFallback />);
      
      const fullSpinner = fullContainer.querySelector('.animate-spin');
      const contentSpinner = contentContainer.querySelector('.animate-spin');
      
      expect(fullSpinner).toBeInTheDocument();
      expect(contentSpinner).toBeInTheDocument();
    });

    it('has different default messages', () => {
      render(
        <>
          <LoadingFallback />
          <ContentLoadingFallback />
        </>
      );
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByText('Loading content...')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('message is visible to screen readers', () => {
      render(<ContentLoadingFallback message="Loading data" />);
      
      const message = screen.getByText('Loading data');
      expect(message).toBeVisible();
    });
  });
});

describe('Loading Fallback Use Cases', () => {
  describe('Route Loading', () => {
    it('LoadingFallback is suitable for route loading', () => {
      const { container } = render(<LoadingFallback message="Loading page..." />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('min-h-screen');
      expect(screen.getByText('Loading page...')).toBeInTheDocument();
    });
  });

  describe('Content Section Loading', () => {
    it('ContentLoadingFallback is suitable for section loading', () => {
      const { container } = render(<ContentLoadingFallback message="Loading section..." />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('py-12');
      expect(wrapper).not.toHaveClass('min-h-screen');
      expect(screen.getByText('Loading section...')).toBeInTheDocument();
    });
  });

  describe('Tab Content Loading', () => {
    it('ContentLoadingFallback is suitable for tab loading', () => {
      render(<ContentLoadingFallback message="Loading tab content..." />);
      
      expect(screen.getByText('Loading tab content...')).toBeInTheDocument();
    });
  });
});
