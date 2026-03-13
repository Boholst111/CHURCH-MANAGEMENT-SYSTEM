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
import { useIsMobile } from '../../hooks/useBreakpoint';

export interface AttendanceData {
  year: number;
  month: number;
  month_name: string;
  total_attendance: number;
  event_count: number;
  average_attendance: number;
  sunday_service?: number;
  midweek_service?: number;
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
  const isMobile = useIsMobile();

  if (loading) {
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-neutral-500">Loading attendance data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-neutral-500">No attendance data available</div>
      </div>
    );
  }

  // Format data for the chart - use month_name for x-axis
  // If sunday_service and midweek_service are provided, use them
  // Otherwise, split total_attendance proportionally (60% Sunday, 40% Midweek as typical pattern)
  const chartData = data.map(item => {
    const hasSeparateData = item.sunday_service !== undefined && item.midweek_service !== undefined;
    
    return {
      month: item.month_name,
      sundayService: hasSeparateData ? item.sunday_service : Math.round(item.total_attendance * 0.6),
      midweekService: hasSeparateData ? item.midweek_service : Math.round(item.total_attendance * 0.4),
    };
  });

  // Mobile optimizations
  const fontSize = isMobile ? 10 : 12;
  const chartHeight = isMobile ? 300 : 400;
  const margin = isMobile 
    ? { top: 5, right: 10, left: 0, bottom: 5 }
    : { top: 5, right: 30, left: 20, bottom: 5 };

  return (
    <div className={className}>
      {/* Add horizontal scroll on mobile if needed */}
      <div className={isMobile ? 'overflow-x-auto' : ''}>
        <div style={{ minWidth: isMobile ? '500px' : '100%' }}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart
              data={chartData}
              margin={margin}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis
                dataKey="month"
                stroke="#737373"
                style={{ fontSize: `${fontSize}px` }}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? 'end' : 'middle'}
                height={isMobile ? 60 : 30}
              />
              <YAxis
                stroke="#737373"
                style={{ fontSize: `${fontSize}px` }}
                label={!isMobile ? { 
                  value: 'Attendance', 
                  angle: -90, 
                  position: 'insideLeft', 
                  style: { fill: '#737373' } 
                } : undefined}
                width={isMobile ? 40 : 60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  padding: isMobile ? '8px' : '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: `${fontSize}px`,
                }}
                labelStyle={{ 
                  color: '#171717', 
                  fontWeight: 600, 
                  marginBottom: '4px',
                  fontSize: `${fontSize}px`,
                }}
                itemStyle={{ padding: '4px 0' }}
              />
              <Legend
                wrapperStyle={{ 
                  paddingTop: isMobile ? '10px' : '20px',
                  fontSize: `${fontSize}px`,
                }}
                iconType="line"
                iconSize={isMobile ? 8 : 14}
                // Simplify legend on mobile - use shorter labels
                formatter={(value) => {
                  if (isMobile) {
                    return value === 'Sunday Service' ? 'Sunday' : 'Midweek';
                  }
                  return value;
                }}
              />
              <Line
                type="monotone"
                dataKey="sundayService"
                stroke="#0ea5e9"
                strokeWidth={isMobile ? 1.5 : 2}
                dot={{ fill: '#0ea5e9', r: isMobile ? 3 : 4 }}
                activeDot={{ r: isMobile ? 5 : 6 }}
                name="Sunday Service"
              />
              <Line
                type="monotone"
                dataKey="midweekService"
                stroke="#10b981"
                strokeWidth={isMobile ? 1.5 : 2}
                dot={{ fill: '#10b981', r: isMobile ? 3 : 4 }}
                activeDot={{ r: isMobile ? 5 : 6 }}
                name="Midweek Service"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});
