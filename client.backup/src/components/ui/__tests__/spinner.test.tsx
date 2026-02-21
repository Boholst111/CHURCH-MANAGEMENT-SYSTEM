import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spinner, LoadingOverlay, InlineLoader } from '../spinner';

describe('Spinner', () => {
  it('should render spinner with default size', () => {
    render(<Spinner />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('should render spinner with custom label', () => {
    render(<Spinner label="Loading data..." />);
    
    // Check for the visible label text (not the sr-only one)
    const labels = screen.getAllByText('Loading data...');
    expect(labels.length).toBeGreaterThan(0);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading data...');
  });

  it('should render spinner with small size', () => {
    const { container } = render(<Spinner size="sm" />);
    
    const spinnerDiv = container.querySelector('.h-4.w-4');
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('should render spinner with medium size', () => {
    const { container } = render(<Spinner size="md" />);
    
    const spinnerDiv = container.querySelector('.h-8.w-8');
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('should render spinner with large size', () => {
    const { container } = render(<Spinner size="lg" />);
    
    const spinnerDiv = container.querySelector('.h-12.w-12');
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('should render spinner with extra large size', () => {
    const { container } = render(<Spinner size="xl" />);
    
    const spinnerDiv = container.querySelector('.h-16.w-16');
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Spinner className="custom-class" />);
    
    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('should have animation class', () => {
    const { container } = render(<Spinner />);
    
    const spinnerDiv = container.querySelector('.animate-spin');
    expect(spinnerDiv).toBeInTheDocument();
  });
});

describe('LoadingOverlay', () => {
  it('should render loading overlay with default message', () => {
    render(<LoadingOverlay />);
    
    // Check for the visible label text
    const labels = screen.getAllByText('Loading...');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('should render loading overlay with custom message', () => {
    render(<LoadingOverlay message="Processing..." />);
    
    // Check for the visible label text
    const labels = screen.getAllByText('Processing...');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('should have fixed positioning', () => {
    const { container } = render(<LoadingOverlay />);
    
    const overlay = container.querySelector('.fixed.inset-0');
    expect(overlay).toBeInTheDocument();
  });

  it('should have high z-index', () => {
    const { container } = render(<LoadingOverlay />);
    
    const overlay = container.querySelector('.z-50');
    expect(overlay).toBeInTheDocument();
  });
});

describe('InlineLoader', () => {
  it('should render inline loader', () => {
    const { container } = render(<InlineLoader />);
    
    const loader = container.querySelector('.animate-spin');
    expect(loader).toBeInTheDocument();
  });

  it('should have inline-block display', () => {
    const { container } = render(<InlineLoader />);
    
    const loader = container.querySelector('.inline-block');
    expect(loader).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<InlineLoader className="custom-loader" />);
    
    const loader = container.querySelector('.custom-loader');
    expect(loader).toBeInTheDocument();
  });

  it('should have small size', () => {
    const { container } = render(<InlineLoader />);
    
    const loader = container.querySelector('.h-4.w-4');
    expect(loader).toBeInTheDocument();
  });

  it('should have accessibility attributes', () => {
    const { container } = render(<InlineLoader />);
    
    const loader = container.querySelector('[role="status"]');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-label', 'Loading');
  });
});
