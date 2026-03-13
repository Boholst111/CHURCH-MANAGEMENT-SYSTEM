import React from 'react';
import { render, screen } from '@testing-library/react';
import { AttendanceChart, AttendanceData } from '../AttendanceChart';

// Mock Recharts to avoid rendering issues in tests
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}));

// Mock matchMedia for useBreakpoint hook
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false, // Default to desktop (not mobile)
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('AttendanceChart', () => {
  const mockData: AttendanceData[] = [
    {
      year: 2024,
      month: 1,
      month_name: 'January',
      total_attendance: 150,
      event_count: 4,
      average_attendance: 37.5,
      sunday_service: 90,
      midweek_service: 60,
    },
    {
      year: 2024,
      month: 2,
      month_name: 'February',
      total_attendance: 180,
      event_count: 4,
      average_attendance: 45,
      sunday_service: 108,
      midweek_service: 72,
    },
  ];

  it('should display loading state when loading prop is true', () => {
    render(<AttendanceChart data={[]} loading={true} />);
    
    expect(screen.getByText('Loading attendance data...')).toBeInTheDocument();
  });

  it('should display "no data" message when data array is empty', () => {
    render(<AttendanceChart data={[]} loading={false} />);

    expect(screen.getByText('No attendance data available')).toBeInTheDocument();
  });

  it('should render chart with attendance data', () => {
    render(<AttendanceChart data={mockData} loading={false} />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('should display chart with Sunday Service and Midweek Service lines', () => {
    render(<AttendanceChart data={mockData} loading={false} />);

    // Check that chart components are rendered
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    // Two lines should be rendered (Sunday Service and Midweek Service)
    const lines = screen.getAllByTestId('line');
    expect(lines).toHaveLength(2);
  });

  it('should display at least 12 months of data when available', () => {
    // Generate 12 months of mock data
    const twelveMonthsData: AttendanceData[] = Array.from({ length: 12 }, (_, i) => ({
      year: 2024,
      month: i + 1,
      month_name: new Date(2024, i, 1).toLocaleString('default', { month: 'long' }),
      total_attendance: 100 + i * 10,
      event_count: 4,
      average_attendance: 25 + i * 2.5,
      sunday_service: 60 + i * 6,
      midweek_service: 40 + i * 4,
    }));

    render(<AttendanceChart data={twelveMonthsData} loading={false} />);

    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <AttendanceChart data={[]} loading={false} className="custom-class" />
    );

    const divWithClass = container.querySelector('.custom-class');
    expect(divWithClass).toBeInTheDocument();
  });

  it('should not show loading state when loading is false', () => {
    render(<AttendanceChart data={mockData} loading={false} />);

    expect(screen.queryByText('Loading attendance data...')).not.toBeInTheDocument();
  });

  it('should handle data without separate service types by splitting proportionally', () => {
    const dataWithoutServiceTypes: AttendanceData[] = [
      {
        year: 2024,
        month: 1,
        month_name: 'January',
        total_attendance: 100,
        event_count: 4,
        average_attendance: 25,
      },
    ];

    render(<AttendanceChart data={dataWithoutServiceTypes} loading={false} />);

    // Should still render the chart
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });
});
