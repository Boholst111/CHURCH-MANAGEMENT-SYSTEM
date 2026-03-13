import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { useIsMobile } from '../../hooks/useBreakpoint';

export interface DemographicData {
  by_age: Record<string, number>;
  by_location: Record<string, number>;
  by_gender: Record<string, number>;
  by_status: Record<string, number>;
  by_small_group: Array<{name: string; count: number}>;
  total_members: number;
}

export interface DemographicChartProps {
  data: DemographicData | null;
  loading?: boolean;
  className?: string;
}

// Color palette for charts
const COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // green-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#f97316', // orange-500
];

export const DemographicChart: React.FC<DemographicChartProps> = React.memo(({ 
  data, 
  loading = false, 
  className 
}) => {
  const isMobile = useIsMobile();
  
  console.log('[DEMOGRAPHIC_CHART] Rendering with:', { data, loading, dataType: typeof data, isNull: data === null, isUndefined: data === undefined });
  
  if (loading) {
    console.log('[DEMOGRAPHIC_CHART] Showing loading state');
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-500">Loading demographic data...</div>
      </div>
    );
  }

  if (!data) {
    console.warn('[DEMOGRAPHIC_CHART] No data available - showing empty state');
    console.warn('[DEMOGRAPHIC_CHART] Data value:', data);
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-500">No demographic data available</div>
      </div>
    );
  }

  console.log('[DEMOGRAPHIC_CHART] Data is valid, transforming for charts...');
  
  // Transform age data for pie chart
  const ageData = Object.entries(data.by_age).map(([name, value]) => ({
    name,
    value,
  }));
  console.log('[DEMOGRAPHIC_CHART] Age data:', ageData);

  // Transform location data for pie chart
  const locationData = Object.entries(data.by_location).map(([name, value]) => ({
    name,
    value,
  }));
  console.log('[DEMOGRAPHIC_CHART] Location data:', locationData);

  // Mobile optimizations
  const fontSize = isMobile ? 10 : 12;
  const chartHeight = isMobile ? 250 : 300;
  const outerRadius = isMobile ? 60 : 80;
  const legendHeight = isMobile ? 50 : 36;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Age Distribution Chart */}
        <div>
          <h3 className={`font-semibold text-gray-900 mb-4 text-center ${isMobile ? 'text-base' : 'text-lg'}`}>
            Age Distribution
          </h3>
          {ageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={chartHeight}>
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={outerRadius}
                  fill="#8884d8"
                  dataKey="value"
                  label={!isMobile ? (entry) => {
                    const total = ageData.reduce((sum, item) => sum + item.value, 0);
                    const percent = ((entry.value / total) * 100).toFixed(0);
                    return `${entry.name}: ${percent}%`;
                  } : false}
                >
                  {ageData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: isMobile ? '6px 10px' : '8px 12px',
                    fontSize: `${fontSize}px`,
                  }}
                  formatter={(value: number | undefined) => 
                    value !== undefined ? [value, 'Members'] : ['N/A', 'Members']
                  }
                />
                <Legend
                  verticalAlign="bottom"
                  height={legendHeight}
                  iconType="circle"
                  iconSize={isMobile ? 8 : 10}
                  wrapperStyle={{
                    fontSize: `${fontSize}px`,
                  }}
                  // Simplify legend on mobile - truncate long labels
                  formatter={(value) => {
                    if (isMobile && value.length > 10) {
                      return value.substring(0, 10) + '...';
                    }
                    return value;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className={`flex items-center justify-center text-gray-500 ${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
              No age data available
            </div>
          )}
        </div>

        {/* Location Distribution Chart */}
        <div>
          <h3 className={`font-semibold text-gray-900 mb-4 text-center ${isMobile ? 'text-base' : 'text-lg'}`}>
            Location Distribution
          </h3>
          {locationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={chartHeight}>
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={outerRadius}
                  fill="#8884d8"
                  dataKey="value"
                  label={!isMobile ? (entry) => {
                    const total = locationData.reduce((sum, item) => sum + item.value, 0);
                    const percent = ((entry.value / total) * 100).toFixed(0);
                    return `${entry.name}: ${percent}%`;
                  } : false}
                >
                  {locationData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: isMobile ? '6px 10px' : '8px 12px',
                    fontSize: `${fontSize}px`,
                  }}
                  formatter={(value: number | undefined) => 
                    value !== undefined ? [value, 'Members'] : ['N/A', 'Members']
                  }
                />
                <Legend
                  verticalAlign="bottom"
                  height={legendHeight}
                  iconType="circle"
                  iconSize={isMobile ? 8 : 10}
                  wrapperStyle={{
                    fontSize: `${fontSize}px`,
                  }}
                  // Simplify legend on mobile - truncate long labels
                  formatter={(value) => {
                    if (isMobile && value.length > 10) {
                      return value.substring(0, 10) + '...';
                    }
                    return value;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className={`flex items-center justify-center text-gray-500 ${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
              No location data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
