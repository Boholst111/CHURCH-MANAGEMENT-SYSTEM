import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { StatCard } from '../StatCard';
import { Users, Calendar, TrendingUp, UsersRound } from 'lucide-react';

describe('StatCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('renders with title and icon', () => {
    render(
      <StatCard
        title="Total Members"
        value={1234}
        icon={Users}
        color="primary"
      />
    );

    expect(screen.getByText('Total Members')).toBeInTheDocument();
  });

  it('animates number from 0 to target value', async () => {
    render(
      <StatCard
        title="Total Members"
        value={100}
        icon={Users}
        color="primary"
      />
    );

    // Initially should show 0 or a low number
    const valueElement = screen.getByText(/\d+/);
    expect(parseInt(valueElement.textContent || '0')).toBeLessThan(100);

    // Fast-forward time to complete animation
    jest.advanceTimersByTime(1000);

    // Should now show the target value
    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  it('displays trend indicator with up arrow when direction is up', () => {
    render(
      <StatCard
        title="Total Members"
        value={1234}
        icon={Users}
        color="primary"
        trend={{
          value: 12,
          direction: 'up',
          label: 'vs last month',
        }}
      />
    );

    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
    
    // Check for success color class on trend
    const trendValue = screen.getByText('12%');
    expect(trendValue).toHaveClass('text-success-600');
  });

  it('displays trend indicator with down arrow when direction is down', () => {
    render(
      <StatCard
        title="New Visitors"
        value={24}
        icon={TrendingUp}
        color="success"
        trend={{
          value: 5,
          direction: 'down',
          label: 'this month',
        }}
      />
    );

    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('this month')).toBeInTheDocument();
    
    // Check for error color class on trend
    const trendValue = screen.getByText('5%');
    expect(trendValue).toHaveClass('text-error-600');
  });

  it('displays description when no trend is provided', () => {
    render(
      <StatCard
        title="Upcoming Events"
        value={8}
        icon={Calendar}
        color="info"
        description="Scheduled events"
      />
    );

    expect(screen.getByText('Scheduled events')).toBeInTheDocument();
  });

  it('applies correct color classes for primary color', () => {
    const { container } = render(
      <StatCard
        title="Total Members"
        value={1234}
        icon={Users}
        color="primary"
      />
    );

    const iconContainer = container.querySelector('.bg-primary-100');
    expect(iconContainer).toBeInTheDocument();
    
    const icon = container.querySelector('.text-primary-600');
    expect(icon).toBeInTheDocument();
  });

  it('applies correct color classes for success color', () => {
    const { container } = render(
      <StatCard
        title="New Visitors"
        value={24}
        icon={TrendingUp}
        color="success"
      />
    );

    const iconContainer = container.querySelector('.bg-success-100');
    expect(iconContainer).toBeInTheDocument();
    
    const icon = container.querySelector('.text-success-600');
    expect(icon).toBeInTheDocument();
  });

  it('applies correct color classes for info color', () => {
    const { container } = render(
      <StatCard
        title="Upcoming Events"
        value={8}
        icon={Calendar}
        color="info"
      />
    );

    const iconContainer = container.querySelector('.bg-info-100');
    expect(iconContainer).toBeInTheDocument();
    
    const icon = container.querySelector('.text-info-600');
    expect(icon).toBeInTheDocument();
  });

  it('applies correct color classes for warning color', () => {
    const { container } = render(
      <StatCard
        title="Pending Tasks"
        value={5}
        icon={UsersRound}
        color="warning"
      />
    );

    const iconContainer = container.querySelector('.bg-warning-100');
    expect(iconContainer).toBeInTheDocument();
    
    const icon = container.querySelector('.text-warning-600');
    expect(icon).toBeInTheDocument();
  });

  it('formats large numbers with locale separators', async () => {
    render(
      <StatCard
        title="Total Members"
        value={1234567}
        icon={Users}
        color="primary"
      />
    );

    // Fast-forward animation
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      // Should format with commas (or locale-appropriate separators)
      expect(screen.getByText(/1,234,567/)).toBeInTheDocument();
    });
  });

  it('handles zero value correctly', async () => {
    render(
      <StatCard
        title="New Visitors"
        value={0}
        icon={TrendingUp}
        color="success"
      />
    );

    // Fast-forward animation
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  it('renders with hoverable card variant', () => {
    const { container } = render(
      <StatCard
        title="Total Members"
        value={1234}
        icon={Users}
        color="primary"
      />
    );

    // Check that the card has hoverable styling
    const card = container.querySelector('[class*="hover"]');
    expect(card).toBeInTheDocument();
  });
});
