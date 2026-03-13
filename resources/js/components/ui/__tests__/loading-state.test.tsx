import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  LoadingState,
  PageLoadingState,
  InlineLoadingState,
  EmptyState,
} from '../loading-state';

describe('LoadingState Component', () => {
  it('shows loading spinner when loading is true', () => {
    render(
      <LoadingState loading={true} error={null}>
        <div>Content</div>
      </LoadingState>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('shows error message when error is present', () => {
    const onRetry = jest.fn();
    render(
      <LoadingState loading={false} error="Failed to load" onRetry={onRetry}>
        <div>Content</div>
      </LoadingState>
    );
    
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = jest.fn();
    render(
      <LoadingState loading={false} error="Failed to load" onRetry={onRetry}>
        <div>Content</div>
      </LoadingState>
    );
    
    fireEvent.click(screen.getByText('Try Again'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows content when not loading and no error', () => {
    render(
      <LoadingState loading={false} error={null}>
        <div>Content</div>
      </LoadingState>
    );
    
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('shows skeleton table when type is skeleton-table', () => {
    const { container } = render(
      <LoadingState loading={true} error={null} type="skeleton-table">
        <div>Content</div>
      </LoadingState>
    );
    
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('shows skeleton cards when type is skeleton-card', () => {
    const { container } = render(
      <LoadingState loading={true} error={null} type="skeleton-card" skeletonCards={3}>
        <div>Content</div>
      </LoadingState>
    );
    
    const cards = container.querySelectorAll('.rounded-xl');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('shows custom loading component when provided', () => {
    render(
      <LoadingState
        loading={true}
        error={null}
        loadingComponent={<div>Custom Loading</div>}
      >
        <div>Content</div>
      </LoadingState>
    );
    
    expect(screen.getByText('Custom Loading')).toBeInTheDocument();
  });

  it('shows custom error component when provided', () => {
    render(
      <LoadingState
        loading={false}
        error="Error"
        errorComponent={<div>Custom Error</div>}
      >
        <div>Content</div>
      </LoadingState>
    );
    
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
  });
});

describe('PageLoadingState Component', () => {
  it('renders with default message', () => {
    render(<PageLoadingState />);
    
    expect(screen.getAllByText('Loading...').length).toBeGreaterThan(0);
  });

  it('renders with custom message', () => {
    render(<PageLoadingState message="Loading data..." />);
    
    expect(screen.getAllByText('Loading data...').length).toBeGreaterThan(0);
  });
});

describe('InlineLoadingState Component', () => {
  it('renders with default message', () => {
    render(<InlineLoadingState />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<InlineLoadingState message="Processing..." />);
    
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });
});

describe('EmptyState Component', () => {
  it('renders with title', () => {
    render(<EmptyState title="No data found" />);
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <EmptyState
        title="No data found"
        description="Try adjusting your filters"
      />
    );
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
  });

  it('renders with action button', () => {
    const onClick = jest.fn();
    render(
      <EmptyState
        title="No data found"
        action={{ label: 'Add Item', onClick }}
      />
    );
    
    const button = screen.getByText('Add Item');
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with icon', () => {
    const { container } = render(
      <EmptyState
        title="No data found"
        icon={<div data-testid="custom-icon">Icon</div>}
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
