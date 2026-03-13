import React from 'react';
import { render } from '@testing-library/react';
import { AttendanceChart, AttendanceData } from '../AttendanceChart';

// Mock Recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children, height }: any) => (
    <div data-testid="responsive-container" data-height={height}>{children}</div>
  ),
  LineChart: ({ children, margin }: any) => (
    <div data-testid="line-chart" data-margin={JSON.stringify(margin)}>{children}</div>
  ),
  Line: ({ strokeWidth, dot }: any) => (
    <div data-testid="line" data-stroke-width={strokeWidth} data-dot-r={dot?.r} />
  ),
  XAxis: ({ style, angle, height }: any) => (
    <div data-testid="x-axis" data-font-size={style?.fontSize} data-angle={angle} data-height={height} />
  ),
  YAxis: ({ style, width }: any) => (
    <div data-testid="y-axis" data-font-size={style?.fontSize} data-width={width} />
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: ({ contentStyle }: any) => (
    <div data-testid="tooltip" data-font-size={contentStyle?.fontSize} />
  ),
  Legend: ({ wrapperStyle, iconSize }: any) => (
    <div data-testid="legend" data-font-size={wrapperStyle?.fontSize} data-icon-size={iconSize} />
  ),
}));

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
];

describe('AttendanceChart - Mobile Optimizations', () => {
  beforeEach(() => {
    // Reset matchMedia mock before each test
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should use smaller font sizes on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? false : true, // Below lg breakpoint = mobile
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { getByTestId } = render(<AttendanceChart data={mockData} loading={false} />);
    
    const xAxis = getByTestId('x-axis');
    const yAxis = getByTestId('y-axis');
    
    // Mobile should use 10px font size
    expect(xAxis.getAttribute('data-font-size')).toBe('10px');
    expect(yAxis.getAttribute('data-font-size')).toBe('10px');
  });

  it('should use larger font sizes on desktop', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? true : false, // At or above lg breakpoint = desktop
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { getByTestId } = render(<AttendanceChart data={mockData} loading={false} />);
    
    const xAxis = getByTestId('x-axis');
    const yAxis = getByTestId('y-axis');
    
    // Desktop should use 12px font size
    expect(xAxis.getAttribute('data-font-size')).toBe('12px');
    expect(yAxis.getAttribute('data-font-size')).toBe('12px');
  });

  it('should use smaller chart height on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? false : true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { getByTestId } = render(<AttendanceChart data={mockData} loading={false} />);
    
    const container = getByTestId('responsive-container');
    
    // Mobile should use 300px height
    expect(container.getAttribute('data-height')).toBe('300');
  });

  it('should use larger chart height on desktop', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? true : false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { getByTestId } = render(<AttendanceChart data={mockData} loading={false} />);
    
    const container = getByTestId('responsive-container');
    
    // Desktop should use 400px height
    expect(container.getAttribute('data-height')).toBe('400');
  });

  it('should angle x-axis labels on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? false : true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { getByTestId } = render(<AttendanceChart data={mockData} loading={false} />);
    
    const xAxis = getByTestId('x-axis');
    
    // Mobile should angle labels at -45 degrees
    expect(xAxis.getAttribute('data-angle')).toBe('-45');
    expect(xAxis.getAttribute('data-height')).toBe('60');
  });

  it('should not angle x-axis labels on desktop', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? true : false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { getByTestId } = render(<AttendanceChart data={mockData} loading={false} />);
    
    const xAxis = getByTestId('x-axis');
    
    // Desktop should not angle labels
    expect(xAxis.getAttribute('data-angle')).toBe('0');
    expect(xAxis.getAttribute('data-height')).toBe('30');
  });

  it('should use smaller icon sizes on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? false : true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { getByTestId } = render(<AttendanceChart data={mockData} loading={false} />);
    
    const legend = getByTestId('legend');
    
    // Mobile should use smaller icon size
    expect(legend.getAttribute('data-icon-size')).toBe('8');
  });

  it('should render horizontal scroll wrapper on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? false : true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { container } = render(<AttendanceChart data={mockData} loading={false} />);
    
    // Should have overflow-x-auto class on mobile
    const scrollWrapper = container.querySelector('.overflow-x-auto');
    expect(scrollWrapper).toBeInTheDocument();
  });

  it('should not render horizontal scroll wrapper on desktop', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? true : false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { container } = render(<AttendanceChart data={mockData} loading={false} />);
    
    // Should not have overflow-x-auto class on desktop
    const scrollWrapper = container.querySelector('.overflow-x-auto');
    expect(scrollWrapper).not.toBeInTheDocument();
  });
});
