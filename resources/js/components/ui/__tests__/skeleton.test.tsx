import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  SkeletonAvatar,
  SkeletonList,
} from '../skeleton';

describe('Skeleton Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;
    
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders with custom width and height', () => {
    const { container } = render(<Skeleton width={200} height={50} />);
    const skeleton = container.firstChild as HTMLElement;
    
    expect(skeleton).toHaveStyle({ width: '200px', height: '50px' });
  });

  it('renders with different variants', () => {
    const { container: textContainer } = render(<Skeleton variant="text" />);
    const { container: circularContainer } = render(<Skeleton variant="circular" />);
    const { container: rectangularContainer } = render(<Skeleton variant="rectangular" />);
    
    expect(textContainer.firstChild).toHaveClass('rounded');
    expect(circularContainer.firstChild).toHaveClass('rounded-full');
    expect(rectangularContainer.firstChild).toHaveClass('rounded-lg');
  });

  it('renders with different animations', () => {
    const { container: pulseContainer } = render(<Skeleton animation="pulse" />);
    const { container: waveContainer } = render(<Skeleton animation="wave" />);
    const { container: noneContainer } = render(<Skeleton animation="none" />);
    
    expect(pulseContainer.firstChild).toHaveClass('animate-pulse');
    expect(waveContainer.firstChild).toHaveClass('animate-shimmer');
    expect(noneContainer.firstChild).not.toHaveClass('animate-pulse');
    expect(noneContainer.firstChild).not.toHaveClass('animate-shimmer');
  });
});

describe('SkeletonText Component', () => {
  it('renders default number of lines', () => {
    const { container } = render(<SkeletonText />);
    const skeletons = container.querySelectorAll('[role="status"]');
    
    expect(skeletons).toHaveLength(3);
  });

  it('renders custom number of lines', () => {
    const { container } = render(<SkeletonText lines={5} />);
    const skeletons = container.querySelectorAll('[role="status"]');
    
    expect(skeletons).toHaveLength(5);
  });
});

describe('SkeletonCard Component', () => {
  it('renders without image', () => {
    const { container } = render(<SkeletonCard />);
    
    expect(container.querySelector('.rounded-xl')).toBeInTheDocument();
  });

  it('renders with image', () => {
    const { container } = render(<SkeletonCard hasImage />);
    const skeletons = container.querySelectorAll('[role="status"]');
    
    // Should have image skeleton + content skeletons
    expect(skeletons.length).toBeGreaterThan(1);
  });
});

describe('SkeletonTable Component', () => {
  it('renders with default rows and columns', () => {
    const { container } = render(<SkeletonTable />);
    
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('tbody')).toBeInTheDocument();
  });

  it('renders custom number of rows and columns', () => {
    const { container } = render(<SkeletonTable rows={3} columns={4} />);
    const headerCells = container.querySelectorAll('thead th');
    const bodyRows = container.querySelectorAll('tbody tr');
    
    expect(headerCells).toHaveLength(4);
    expect(bodyRows).toHaveLength(3);
  });
});

describe('SkeletonAvatar Component', () => {
  it('renders with default size', () => {
    const { container } = render(<SkeletonAvatar />);
    const avatar = container.firstChild as HTMLElement;
    
    expect(avatar).toHaveClass('w-12', 'h-12', 'rounded-full');
  });

  it('renders with different sizes', () => {
    const { container: smContainer } = render(<SkeletonAvatar size="sm" />);
    const { container: lgContainer } = render(<SkeletonAvatar size="lg" />);
    
    expect(smContainer.firstChild).toHaveClass('w-8', 'h-8');
    expect(lgContainer.firstChild).toHaveClass('w-16', 'h-16');
  });
});

describe('SkeletonList Component', () => {
  it('renders default number of items', () => {
    const { container } = render(<SkeletonList />);
    const items = container.querySelectorAll('.flex.items-center');
    
    expect(items).toHaveLength(5);
  });

  it('renders custom number of items', () => {
    const { container } = render(<SkeletonList items={3} />);
    const items = container.querySelectorAll('.flex.items-center');
    
    expect(items).toHaveLength(3);
  });
});
