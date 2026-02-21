import React from 'react';
import { render, screen } from '@testing-library/react';
import { FinancialChart, FinancialData } from '../FinancialChart';

describe('FinancialChart', () => {
  const mockData: FinancialData[] = [
    { period: 'Jan 2024', amount: 5000, count: 25 },
    { period: 'Feb 2024', amount: 6500, count: 30 },
    { period: 'Mar 2024', amount: 5800, count: 28 },
  ];

  it('renders loading state when loading prop is true', () => {
    render(<FinancialChart data={[]} loading={true} />);
    expect(screen.getByText('Loading financial data...')).toBeInTheDocument();
  });

  it('renders empty state when no data is provided', () => {
    render(<FinancialChart data={[]} loading={false} />);
    expect(screen.getByText('No financial data available')).toBeInTheDocument();
  });

  it('renders chart with data', () => {
    const { container } = render(<FinancialChart data={mockData} loading={false} />);
    
    // Check that ResponsiveContainer is rendered
    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <FinancialChart data={mockData} loading={false} className="custom-class" />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('renders with empty data array', () => {
    render(<FinancialChart data={[]} />);
    expect(screen.getByText('No financial data available')).toBeInTheDocument();
  });

  it('handles single data point', () => {
    const singleData: FinancialData[] = [
      { period: 'Jan 2024', amount: 5000, count: 25 },
    ];
    
    const { container } = render(<FinancialChart data={singleData} loading={false} />);
    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });

  it('handles large amounts correctly', () => {
    const largeAmountData: FinancialData[] = [
      { period: 'Jan 2024', amount: 1000000, count: 500 },
      { period: 'Feb 2024', amount: 2500000, count: 750 },
    ];
    
    const { container } = render(<FinancialChart data={largeAmountData} loading={false} />);
    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });

  it('handles zero amounts', () => {
    const zeroData: FinancialData[] = [
      { period: 'Jan 2024', amount: 0, count: 0 },
      { period: 'Feb 2024', amount: 100, count: 1 },
    ];
    
    const { container } = render(<FinancialChart data={zeroData} loading={false} />);
    const responsiveContainer = container.querySelector('.recharts-responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });
});
