import React from 'react';
import { render, screen } from '@testing-library/react';
import { Users, DollarSign, Calendar, UserPlus } from 'lucide-react';
import { QuickStatsCard } from '../QuickStatsCard';

describe('QuickStatsCard', () => {
  it('renders with basic props', () => {
    render(
      <QuickStatsCard
        title="Total Members"
        value={150}
        icon={Users}
      />
    );

    expect(screen.getByText('Total Members')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    render(
      <QuickStatsCard
        title="Monthly Tithes"
        value={12500.50}
        icon={DollarSign}
        isCurrency={true}
      />
    );

    expect(screen.getByText('Monthly Tithes')).toBeInTheDocument();
    expect(screen.getByText('$12,500.50')).toBeInTheDocument();
  });

  it('displays positive trend correctly', () => {
    render(
      <QuickStatsCard
        title="New Visitors"
        value={25}
        icon={UserPlus}
        trend={{ value: 12.5, isPositive: true }}
      />
    );

    expect(screen.getByText('New Visitors')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('displays negative trend correctly', () => {
    render(
      <QuickStatsCard
        title="Upcoming Events"
        value={8}
        icon={Calendar}
        trend={{ value: -5, isPositive: false }}
      />
    );

    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('-5%')).toBeInTheDocument();
  });

  it('renders without trend when not provided', () => {
    render(
      <QuickStatsCard
        title="Total Members"
        value={150}
        icon={Users}
      />
    );

    expect(screen.queryByText('vs last month')).not.toBeInTheDocument();
  });

  it('handles string values', () => {
    render(
      <QuickStatsCard
        title="Status"
        value="Active"
        icon={Users}
      />
    );

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('formats zero currency value correctly', () => {
    render(
      <QuickStatsCard
        title="Monthly Tithes"
        value={0}
        icon={DollarSign}
        isCurrency={true}
      />
    );

    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('formats large currency values with commas', () => {
    render(
      <QuickStatsCard
        title="Annual Giving"
        value={1234567.89}
        icon={DollarSign}
        isCurrency={true}
      />
    );

    expect(screen.getByText('$1,234,567.89')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(
      <QuickStatsCard
        title="Total Members"
        value={150}
        icon={Users}
      />
    );

    // Check for card styling
    const card = container.querySelector('.bg-white');
    expect(card).toBeInTheDocument();
    
    // Check for icon container styling
    const iconContainer = container.querySelector('.bg-primary-50');
    expect(iconContainer).toBeInTheDocument();
  });

  it('displays trend with correct color for positive values', () => {
    const { container } = render(
      <QuickStatsCard
        title="Members"
        value={150}
        icon={Users}
        trend={{ value: 10, isPositive: true }}
      />
    );

    const trendElement = screen.getByText('+10%');
    expect(trendElement).toHaveClass('text-success');
  });

  it('displays trend with correct color for negative values', () => {
    const { container } = render(
      <QuickStatsCard
        title="Members"
        value={150}
        icon={Users}
        trend={{ value: -10, isPositive: false }}
      />
    );

    const trendElement = screen.getByText('-10%');
    expect(trendElement).toHaveClass('text-error');
  });
});
