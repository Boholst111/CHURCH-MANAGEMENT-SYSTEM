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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="period"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={formatCurrency}
            label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#111827', fontWeight: 600 }}
            formatter={(value: number | undefined) => 
              value !== undefined ? [formatCurrency(value), 'Giving'] : ['N/A', 'Giving']
            }
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
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
  );
});
