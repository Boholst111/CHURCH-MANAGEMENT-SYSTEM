import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useIsMobile } from '../../hooks/useBreakpoint';

export interface FinancialData {
  period: string;
  amount: number;
  count: number;
}

export interface FinancialChartProps {
  data: FinancialData[];
  loading?: boolean;
  className?: string;
}

export const FinancialChart: React.FC<FinancialChartProps> = React.memo(({ 
  data, 
  loading = false, 
  className 
}) => {
  const isMobile = useIsMobile();

  if (loading) {
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-500">Loading financial data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-500">No financial data available</div>
      </div>
    );
  }

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value);
  };

  // Format currency for mobile - shorter format
  const formatCurrencyMobile = (value: number) => {
    if (value >= 1000000) {
      return `₱${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₱${(value / 1000).toFixed(0)}K`;
    }
    return `₱${value}`;
  };

  // Mobile optimizations
  const fontSize = isMobile ? 10 : 12;
  const chartHeight = isMobile ? 280 : 320;
  const margin = isMobile 
    ? { top: 5, right: 10, left: 10, bottom: 5 }
    : { top: 5, right: 30, left: 20, bottom: 5 };

  return (
    <div className={className}>
      {/* Add horizontal scroll on mobile if needed */}
      <div className={isMobile ? 'overflow-x-auto' : ''}>
        <div style={{ minWidth: isMobile ? '400px' : '100%' }}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={data}
              margin={margin}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="period"
                stroke="#6b7280"
                style={{ fontSize: `${fontSize}px` }}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? 'end' : 'middle'}
                height={isMobile ? 60 : 30}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: `${fontSize}px` }}
                tickFormatter={isMobile ? formatCurrencyMobile : formatCurrency}
                label={!isMobile ? { 
                  value: 'Amount', 
                  angle: -90, 
                  position: 'insideLeft' 
                } : undefined}
                width={isMobile ? 50 : 80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: isMobile ? '6px 10px' : '8px 12px',
                  fontSize: `${fontSize}px`,
                }}
                labelStyle={{ 
                  color: '#111827', 
                  fontWeight: 600,
                  fontSize: `${fontSize}px`,
                }}
                formatter={(value: number | undefined) => 
                  value !== undefined ? [formatCurrency(value), 'Giving'] : ['N/A', 'Giving']
                }
              />
              <Legend
                wrapperStyle={{ 
                  paddingTop: isMobile ? '10px' : '20px',
                  fontSize: `${fontSize}px`,
                }}
                iconType="rect"
                iconSize={isMobile ? 8 : 14}
                // Simplify legend on mobile
                formatter={(value) => {
                  if (isMobile && value === 'Total Giving') {
                    return 'Giving';
                  }
                  return value;
                }}
              />
              <Bar
                dataKey="amount"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                name="Total Giving"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});
