import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Dashboard from '../Dashboard';

// Mock the hooks and components
jest.mock('../../hooks/useDashboardData', () => ({
  useDashboardData: () => ({
    stats: {
      total_members: 1234,
      upcoming_events: 8,
      new_visitors: 24,
      active_groups: 15,
      total_offerings: 125450,
      total_expenses: 89320,
      net_income: 36130,
      member_trend: 12,
      visitor_trend: 8,
    },
    attendance: [],
    activities: [],
    upcomingEvents: [],
    loading: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

jest.mock('../../components/dashboard', () => ({
  AttendanceChart: () => <div data-testid="attendance-chart">Attendance Chart</div>,
  ActivityFeed: () => <div data-testid="activity-feed">Activity Feed</div>,
  UpcomingEvents: () => <div data-testid="upcoming-events">Upcoming Events</div>,
}));

describe('Dashboard Layout Structure', () => {
  it('renders page header with title and action buttons', () => {
    render(<Dashboard />);
    
    // Check title and subtitle
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Overview of church activities and metrics')).toBeInTheDocument();
    
    // Check action buttons
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument();
  });

  it('renders 4 quick stat cards in responsive grid', () => {
    render(<Dashboard />);
    
    // Check all 4 stat cards are present
    expect(screen.getByText('Total Members')).toBeInTheDocument();
    // "Upcoming Events" appears in both stat card and section title, so use getAllByText
    expect(screen.getAllByText('Upcoming Events').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('New Visitors')).toBeInTheDocument();
    expect(screen.getByText('Active Groups')).toBeInTheDocument();
  });

  it('renders finance overview section with 4 cards', () => {
    render(<Dashboard />);
    
    // Check section title
    expect(screen.getByText('Finance Overview')).toBeInTheDocument();
    
    // Check all 4 finance cards
    expect(screen.getByText('Total Offerings')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Income')).toBeInTheDocument();
    expect(screen.getByText('Budget Utilization')).toBeInTheDocument();
    
    // Verify currency formatting
    expect(screen.getByText('₱125,450.00')).toBeInTheDocument();
    expect(screen.getByText('₱89,320.00')).toBeInTheDocument();
    expect(screen.getByText('₱36,130.00')).toBeInTheDocument();
  });

  it('renders attendance chart section', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Attendance Trends')).toBeInTheDocument();
    expect(screen.getByText('Monthly attendance over the past year')).toBeInTheDocument();
    expect(screen.getByTestId('attendance-chart')).toBeInTheDocument();
  });

  it('renders recent activity section', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Recent Activities')).toBeInTheDocument();
    expect(screen.getByText('Latest system events and updates')).toBeInTheDocument();
    expect(screen.getByTestId('activity-feed')).toBeInTheDocument();
  });

  it('displays trend indicators when available', () => {
    render(<Dashboard />);
    
    // Check for trend percentages
    expect(screen.getByText('12%')).toBeInTheDocument(); // Member trend
    expect(screen.getByText('8%')).toBeInTheDocument(); // Visitor trend
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('uses design system components with correct variants', () => {
    const { container } = render(<Dashboard />);
    
    // Check for proper grid layout classes
    const quickStatsGrid = container.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');
    expect(quickStatsGrid).toBeInTheDocument();
    
    // Check for finance overview grid (now 4 columns)
    const financeGrid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4');
    expect(financeGrid).toBeInTheDocument();
  });

  it('displays proper color coding for finance cards', () => {
    render(<Dashboard />);
    
    // Check that finance values have the correct color classes
    // Total Offerings should have success color
    const offeringsValue = screen.getByText('₱125,450.00');
    expect(offeringsValue).toHaveClass('text-success-600');
    
    // Total Expenses should have error color
    const expensesValue = screen.getByText('₱89,320.00');
    expect(expensesValue).toHaveClass('text-error-600');
    
    // Net Income should have success color (positive)
    const netIncomeValue = screen.getByText('₱36,130.00');
    expect(netIncomeValue).toHaveClass('text-success-600');
  });
});
