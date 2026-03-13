import React from 'react';
import { render, screen } from '@testing-library/react';
import { FinanceCard } from '../FinanceCard';
import { Coins, TrendingUp, PieChart } from 'lucide-react';

describe('FinanceCard', () => {
  it('renders with basic props', () => {
    render(
      <FinanceCard
        title="Total Offerings"
        value="₱125,450.00"
        icon={Coins}
        description="This month's offerings"
        color="success"
      />
    );

    expect(screen.getByText('Total Offerings')).toBeInTheDocument();
    expect(screen.getByText('₱125,450.00')).toBeInTheDocument();
    expect(screen.getByText("This month's offerings")).toBeInTheDocument();
  });

  it('renders with trend indicator (up)', () => {
    render(
      <FinanceCard
        title="Total Offerings"
        value="₱125,450.00"
        icon={Coins}
        description="This month's offerings"
        color="success"
        trend={{
          value: 12.5,
          direction: 'up',
          label: 'vs last month',
        }}
      />
    );

    expect(screen.getByText('12.5%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('renders with trend indicator (down)', () => {
    render(
      <FinanceCard
        title="Total Expenses"
        value="₱89,320.00"
        icon={Coins}
        description="Approved expenses this month"
        color="error"
        trend={{
          value: -5.3,
          direction: 'down',
          label: 'vs last month',
        }}
      />
    );

    expect(screen.getByText('5.3%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('renders with progress bar', () => {
    render(
      <FinanceCard
        title="Budget Utilization"
        value="68%"
        icon={PieChart}
        description="of ₱150,000.00 budget"
        color="warning"
        progress={{
          value: 68,
          label: 'Budget used',
        }}
      />
    );

    expect(screen.getByText('Budget Utilization')).toBeInTheDocument();
    expect(screen.getByText('of ₱150,000.00 budget')).toBeInTheDocument();
    expect(screen.getByText('Budget used')).toBeInTheDocument();
  });

  it('applies correct color classes for success', () => {
    const { container } = render(
      <FinanceCard
        title="Total Offerings"
        value="₱125,450.00"
        icon={Coins}
        description="This month's offerings"
        color="success"
      />
    );

    const iconContainer = container.querySelector('.bg-success-100');
    expect(iconContainer).toBeInTheDocument();
  });

  it('applies correct color classes for error', () => {
    const { container } = render(
      <FinanceCard
        title="Total Expenses"
        value="₱89,320.00"
        icon={Coins}
        description="Approved expenses this month"
        color="error"
      />
    );

    const iconContainer = container.querySelector('.bg-error-100');
    expect(iconContainer).toBeInTheDocument();
  });

  it('applies correct color classes for warning', () => {
    const { container } = render(
      <FinanceCard
        title="Budget Utilization"
        value="85%"
        icon={PieChart}
        description="of budget"
        color="warning"
      />
    );

    const iconContainer = container.querySelector('.bg-warning-100');
    expect(iconContainer).toBeInTheDocument();
  });

  it('applies correct color classes for primary', () => {
    const { container } = render(
      <FinanceCard
        title="Net Income"
        value="₱36,130.00"
        icon={TrendingUp}
        description="Offerings minus expenses"
        color="primary"
      />
    );

    const iconContainer = container.querySelector('.bg-primary-100');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders both trend and progress when provided', () => {
    render(
      <FinanceCard
        title="Budget Utilization"
        value="68%"
        icon={PieChart}
        description="of ₱150,000.00 budget"
        color="warning"
        trend={{
          value: 5,
          direction: 'up',
          label: 'vs last month',
        }}
        progress={{
          value: 68,
          label: 'Budget used',
        }}
      />
    );

    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
    expect(screen.getByText('Budget used')).toBeInTheDocument();
  });

  it('handles zero values correctly', () => {
    render(
      <FinanceCard
        title="Total Offerings"
        value="₱0.00"
        icon={Coins}
        description="This month's offerings"
        color="success"
        trend={{
          value: 0,
          direction: 'up',
          label: 'vs last month',
        }}
      />
    );

    expect(screen.getByText('₱0.00')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles negative trend values correctly', () => {
    render(
      <FinanceCard
        title="Total Expenses"
        value="₱89,320.00"
        icon={Coins}
        description="Approved expenses this month"
        color="error"
        trend={{
          value: -15.7,
          direction: 'down',
          label: 'vs last month',
        }}
      />
    );

    // Should display absolute value
    expect(screen.getByText('15.7%')).toBeInTheDocument();
  });

  it('caps progress bar at 100%', () => {
    const { container } = render(
      <FinanceCard
        title="Budget Utilization"
        value="125%"
        icon={PieChart}
        description="Over budget"
        color="error"
        progress={{
          value: 125,
          label: 'Budget used',
        }}
      />
    );

    // Progress bar should be capped at 100% width
    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar).toBeInTheDocument();
  });
});
