import React from 'react';
import { render } from '@testing-library/react';
import { AttendanceChart, AttendanceData } from '../dashboard/AttendanceChart';
import { FinancialChart, FinancialData } from '../reports/FinancialChart';
import { DemographicChart, DemographicData } from '../reports/DemographicChart';

// Mock Recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children, height }: any) => (
    <div data-testid="responsive-container" data-height={height}>{children}</div>
  ),
  LineChart: ({ children, margin }: any) => (
    <div data-testid="line-chart" data-margin={JSON.stringify(margin)}>{children}</div>
  ),
  BarChart: ({ children, margin }: any) => (
    <div data-testid="bar-chart" data-margin={JSON.stringify(margin)}>{children}</div>
  ),
  PieChart: ({ children }: any) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Line: ({ strokeWidth, dot }: any) => (
    <div data-testid="line" data-stroke-width={strokeWidth} data-dot-r={dot?.r} />
  ),
  Bar: () => <div data-testid="bar" />,
  Pie: ({ outerRadius, label }: any) => (
    <div data-testid="pie" data-outer-radius={outerRadius} data-has-label={label !== false} />
  ),
  Cell: () => <div data-testid="cell" />,
  XAxis: ({ style, angle, height, width }: any) => (
    <div data-testid="x-axis" data-font-size={style?.fontSize} data-angle={angle} data-height={height} data-width={width} />
  ),
  YAxis: ({ style, width }: any) => (
    <div data-testid="y-axis" data-font-size={style?.fontSize} data-width={width} />
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: ({ contentStyle }: any) => (
    <div data-testid="tooltip" data-font-size={contentStyle?.fontSize} data-padding={contentStyle?.padding} />
  ),
  Legend: ({ wrapperStyle, iconSize, height }: any) => (
    <div data-testid="legend" data-font-size={wrapperStyle?.fontSize} data-icon-size={iconSize} data-height={height} />
  ),
}));

// Mock data
const mockAttendanceData: AttendanceData[] = [
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

const mockFinancialData: FinancialData[] = [
  { period: 'Jan 2024', amount: 5000, count: 25 },
  { period: 'Feb 2024', amount: 6000, count: 30 },
];

const mockDemographicData: DemographicData = {
  by_age: {
    '18-25': 50,
    '26-35': 75,
    '36-50': 100,
    '51+': 80,
  },
  by_location: {
    'Manila': 120,
    'Quezon City': 85,
    'Makati': 60,
  },
  by_gender: {
    'Male': 150,
    'Female': 155,
  },
  by_status: {
    'Active': 280,
    'Inactive': 25,
  },
  by_small_group: [
    { name: 'Group A', count: 30 },
    { name: 'Group B', count: 25 },
  ],
  total_members: 305,
};

describe('Charts Mobile Integration Tests', () => {
  const setupMobile = () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? false : true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  };

  const setupDesktop = () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('1024px') ? true : false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  };

  describe('AttendanceChart Mobile Optimizations', () => {
    it('should be responsive with horizontal scroll on mobile', () => {
      setupMobile();
      const { container } = render(<AttendanceChart data={mockAttendanceData} />);
      
      const scrollWrapper = container.querySelector('.overflow-x-auto');
      expect(scrollWrapper).toBeInTheDocument();
    });

    it('should use smaller font sizes on mobile', () => {
      setupMobile();
      const { getByTestId } = render(<AttendanceChart data={mockAttendanceData} />);
      
      expect(getByTestId('x-axis').getAttribute('data-font-size')).toBe('10px');
      expect(getByTestId('y-axis').getAttribute('data-font-size')).toBe('10px');
    });

    it('should simplify legend on mobile', () => {
      setupMobile();
      const { getByTestId } = render(<AttendanceChart data={mockAttendanceData} />);
      
      const legend = getByTestId('legend');
      expect(legend.getAttribute('data-icon-size')).toBe('8');
    });
  });

  describe('FinancialChart Mobile Optimizations', () => {
    it('should be responsive with horizontal scroll on mobile', () => {
      setupMobile();
      const { container } = render(<FinancialChart data={mockFinancialData} />);
      
      const scrollWrapper = container.querySelector('.overflow-x-auto');
      expect(scrollWrapper).toBeInTheDocument();
    });

    it('should use smaller font sizes on mobile', () => {
      setupMobile();
      const { getByTestId } = render(<FinancialChart data={mockFinancialData} />);
      
      expect(getByTestId('x-axis').getAttribute('data-font-size')).toBe('10px');
      expect(getByTestId('y-axis').getAttribute('data-font-size')).toBe('10px');
    });

    it('should use reduced chart height on mobile', () => {
      setupMobile();
      const { getByTestId } = render(<FinancialChart data={mockFinancialData} />);
      
      expect(getByTestId('responsive-container').getAttribute('data-height')).toBe('280');
    });

    it('should angle x-axis labels on mobile', () => {
      setupMobile();
      const { getByTestId } = render(<FinancialChart data={mockFinancialData} />);
      
      expect(getByTestId('x-axis').getAttribute('data-angle')).toBe('-45');
    });
  });

  describe('DemographicChart Mobile Optimizations', () => {
    it('should use smaller chart dimensions on mobile', () => {
      setupMobile();
      const { getAllByTestId } = render(<DemographicChart data={mockDemographicData} />);
      
      const containers = getAllByTestId('responsive-container');
      containers.forEach(container => {
        expect(container.getAttribute('data-height')).toBe('250');
      });
    });

    it('should use smaller pie chart radius on mobile', () => {
      setupMobile();
      const { getAllByTestId } = render(<DemographicChart data={mockDemographicData} />);
      
      const pies = getAllByTestId('pie');
      pies.forEach(pie => {
        expect(pie.getAttribute('data-outer-radius')).toBe('60');
      });
    });

    it('should hide labels on mobile pie charts', () => {
      setupMobile();
      const { getAllByTestId } = render(<DemographicChart data={mockDemographicData} />);
      
      const pies = getAllByTestId('pie');
      pies.forEach(pie => {
        expect(pie.getAttribute('data-has-label')).toBe('false');
      });
    });

    it('should show labels on desktop pie charts', () => {
      setupDesktop();
      const { getAllByTestId } = render(<DemographicChart data={mockDemographicData} />);
      
      const pies = getAllByTestId('pie');
      pies.forEach(pie => {
        expect(pie.getAttribute('data-has-label')).toBe('true');
      });
    });

    it('should use smaller legend on mobile', () => {
      setupMobile();
      const { getAllByTestId } = render(<DemographicChart data={mockDemographicData} />);
      
      const legends = getAllByTestId('legend');
      legends.forEach(legend => {
        expect(legend.getAttribute('data-icon-size')).toBe('8');
        expect(legend.getAttribute('data-height')).toBe('50');
      });
    });
  });

  describe('Cross-Chart Consistency', () => {
    it('all charts should use consistent mobile font sizes', () => {
      setupMobile();
      
      const { container: attendanceContainer } = render(<AttendanceChart data={mockAttendanceData} />);
      const { container: financialContainer } = render(<FinancialChart data={mockFinancialData} />);
      
      const attendanceXAxis = attendanceContainer.querySelector('[data-testid="x-axis"]');
      const financialXAxis = financialContainer.querySelector('[data-testid="x-axis"]');
      
      expect(attendanceXAxis?.getAttribute('data-font-size')).toBe('10px');
      expect(financialXAxis?.getAttribute('data-font-size')).toBe('10px');
    });

    it('all charts should use consistent desktop font sizes', () => {
      setupDesktop();
      
      const { container: attendanceContainer } = render(<AttendanceChart data={mockAttendanceData} />);
      const { container: financialContainer } = render(<FinancialChart data={mockFinancialData} />);
      
      const attendanceXAxis = attendanceContainer.querySelector('[data-testid="x-axis"]');
      const financialXAxis = financialContainer.querySelector('[data-testid="x-axis"]');
      
      expect(attendanceXAxis?.getAttribute('data-font-size')).toBe('12px');
      expect(financialXAxis?.getAttribute('data-font-size')).toBe('12px');
    });

    it('all charts should handle empty data gracefully', () => {
      setupMobile();
      
      const { getByText: getAttendanceText } = render(<AttendanceChart data={[]} />);
      const { getByText: getFinancialText } = render(<FinancialChart data={[]} />);
      const { getByText: getDemographicText } = render(<DemographicChart data={null} />);
      
      expect(getAttendanceText('No attendance data available')).toBeInTheDocument();
      expect(getFinancialText('No financial data available')).toBeInTheDocument();
      expect(getDemographicText('No demographic data available')).toBeInTheDocument();
    });

    it('all charts should handle loading state', () => {
      setupMobile();
      
      const { getByText: getAttendanceText } = render(<AttendanceChart data={[]} loading={true} />);
      const { getByText: getFinancialText } = render(<FinancialChart data={[]} loading={true} />);
      const { getByText: getDemographicText } = render(<DemographicChart data={null} loading={true} />);
      
      expect(getAttendanceText('Loading attendance data...')).toBeInTheDocument();
      expect(getFinancialText('Loading financial data...')).toBeInTheDocument();
      expect(getDemographicText('Loading demographic data...')).toBeInTheDocument();
    });
  });

  describe('Readability Requirements', () => {
    it('mobile font sizes should be at least 10px for readability', () => {
      setupMobile();
      
      const { container: attendanceContainer } = render(<AttendanceChart data={mockAttendanceData} />);
      const { container: financialContainer } = render(<FinancialChart data={mockFinancialData} />);
      
      const attendanceXAxis = attendanceContainer.querySelector('[data-testid="x-axis"]');
      const financialXAxis = financialContainer.querySelector('[data-testid="x-axis"]');
      
      const attendanceFontSize = parseInt(attendanceXAxis?.getAttribute('data-font-size') || '0');
      const financialFontSize = parseInt(financialXAxis?.getAttribute('data-font-size') || '0');
      
      expect(attendanceFontSize).toBeGreaterThanOrEqual(10);
      expect(financialFontSize).toBeGreaterThanOrEqual(10);
    });

    it('tooltip font sizes should be readable on mobile', () => {
      setupMobile();
      
      const { container: attendanceContainer } = render(<AttendanceChart data={mockAttendanceData} />);
      const { container: financialContainer } = render(<FinancialChart data={mockFinancialData} />);
      
      const attendanceTooltip = attendanceContainer.querySelector('[data-testid="tooltip"]');
      const financialTooltip = financialContainer.querySelector('[data-testid="tooltip"]');
      
      expect(attendanceTooltip?.getAttribute('data-font-size')).toBe('10px');
      expect(financialTooltip?.getAttribute('data-font-size')).toBe('10px');
    });
  });
});
