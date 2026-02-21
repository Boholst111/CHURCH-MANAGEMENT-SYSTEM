import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export interface AttendanceData {
  year: number;
  month: number;
  month_name: string;
  total_attendance: number;
  event_count: number;
  average_attendance: number;
}

export interface AttendanceChartProps {
  data: AttendanceData[];
  loading?: boolean;
  className?: string;
}

export const AttendanceChart: React.FC<AttendanceChartProps> = React.memo(({ 
  data, 
  loading = false, 
  className 
}) => {
  if (loading) {
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-500">Loading attendance data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-500">No attendance data available</div>
      </div>
    );
  }

  // Format data for the chart - use month_name for x-axis
  const chartData = data.map(item => ({
    month: item.month_name,
    attendance: item.total_attendance,
    average: item.average_attendance,
  }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'Attendance', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#111827', fontWeight: 600 }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Total Attendance"
          />
          <Line
            type="monotone"
            dataKey="average"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Average per Event"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
