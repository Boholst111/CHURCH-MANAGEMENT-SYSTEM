import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

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
  if (loading) {
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-500">Loading demographic data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`h-80 flex items-center justify-center ${className || ''}`}>
        <div className="text-gray-500">No demographic data available</div>
      </div>
    );
  }

  // Transform age data for pie chart
  const ageData = Object.entries(data.by_age).map(([name, value]) => ({
    name,
    value,
  }));

  // Transform location data for pie chart
  const locationData = Object.entries(data.by_location).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Age Distribution Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Age Distribution
          </h3>
          {ageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => {
                    const total = ageData.reduce((sum, item) => sum + item.value, 0);
                    const percent = ((entry.value / total) * 100).toFixed(0);
                    return `${entry.name}: ${percent}%`;
                  }}
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
                    padding: '8px 12px',
                  }}
                  formatter={(value: number | undefined) => 
                    value !== undefined ? [value, 'Members'] : ['N/A', 'Members']
                  }
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No age data available
            </div>
          )}
        </div>

        {/* Location Distribution Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Location Distribution
          </h3>
          {locationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => {
                    const total = locationData.reduce((sum, item) => sum + item.value, 0);
                    const percent = ((entry.value / total) * 100).toFixed(0);
                    return `${entry.name}: ${percent}%`;
                  }}
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
                    padding: '8px 12px',
                  }}
                  formatter={(value: number | undefined) => 
                    value !== undefined ? [value, 'Members'] : ['N/A', 'Members']
                  }
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No location data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
