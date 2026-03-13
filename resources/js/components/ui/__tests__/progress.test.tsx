import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Progress, CircularProgress, LinearProgress } from '../progress';

describe('Progress Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Progress value={50} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders with custom max value', () => {
    const { container } = render(<Progress value={25} max={50} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(progressBar).toHaveAttribute('aria-valuemax', '50');
  });

  it('calculates percentage correctly', () => {
    const { container } = render(<Progress value={25} max={50} />);
    const progressFill = container.querySelector('.h-full');
    
    // 25/50 = 50%
    expect(progressFill).toHaveStyle({ width: '50%' });
  });

  it('clamps value between 0 and max', () => {
    const { container: negativeContainer } = render(<Progress value={-10} />);
    const { container: overContainer } = render(<Progress value={150} />);
    
    const negativeFill = negativeContainer.querySelector('.h-full');
    const overFill = overContainer.querySelector('.h-full');
    
    expect(negativeFill).toHaveStyle({ width: '0%' });
    expect(overFill).toHaveStyle({ width: '100%' });
  });

  it('shows label when showLabel is true', () => {
    render(<Progress value={75} showLabel />);
    
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('shows custom label', () => {
    render(<Progress value={50} label="Uploading..." />);
    
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { container: smContainer } = render(<Progress value={50} size="sm" />);
    const { container: lgContainer } = render(<Progress value={50} size="lg" />);
    
    const smProgress = smContainer.querySelector('.h-1');
    const lgProgress = lgContainer.querySelector('.h-3');
    
    expect(smProgress).toBeInTheDocument();
    expect(lgProgress).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { container: successContainer } = render(<Progress value={50} variant="success" />);
    const { container: errorContainer } = render(<Progress value={50} variant="error" />);
    
    const successFill = successContainer.querySelector('.bg-success-600');
    const errorFill = errorContainer.querySelector('.bg-error-600');
    
    expect(successFill).toBeInTheDocument();
    expect(errorFill).toBeInTheDocument();
  });
});

describe('CircularProgress Component', () => {
  it('renders with default props', () => {
    const { container } = render(<CircularProgress />);
    const spinner = container.querySelector('[role="status"]');
    
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  it('renders with different sizes', () => {
    const { container: smContainer } = render(<CircularProgress size="sm" />);
    const { container: xlContainer } = render(<CircularProgress size="xl" />);
    
    expect(smContainer.firstChild).toHaveClass('h-4', 'w-4');
    expect(xlContainer.firstChild).toHaveClass('h-16', 'w-16');
  });

  it('renders with different variants', () => {
    const { container: successContainer } = render(<CircularProgress variant="success" />);
    const { container: warningContainer } = render(<CircularProgress variant="warning" />);
    
    expect(successContainer.firstChild).toHaveClass('border-success-600');
    expect(warningContainer.firstChild).toHaveClass('border-warning-600');
  });
});

describe('LinearProgress Component', () => {
  it('renders with default props', () => {
    const { container } = render(<LinearProgress />);
    const progress = container.querySelector('[role="progressbar"]');
    
    expect(progress).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { container: errorContainer } = render(<LinearProgress variant="error" />);
    const errorFill = errorContainer.querySelector('.bg-error-600');
    
    expect(errorFill).toBeInTheDocument();
  });

  it('has indeterminate animation', () => {
    const { container } = render(<LinearProgress />);
    const fill = container.querySelector('.animate-progress-indeterminate');
    
    expect(fill).toBeInTheDocument();
  });
});
