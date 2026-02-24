import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

export interface QuickStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isCurrency?: boolean;
}

export const QuickStatsCard: React.FC<QuickStatsCardProps> = React.memo(({
  title,
  value,
  icon: Icon,
  trend,
  isCurrency = false,
}) => {
  // Format currency values
  const formattedValue = isCurrency && typeof value === 'number'
    ? new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
    : value;

  return (
    <Card className="bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-500">{title}</p>
            <p className="text-2xl font-bold text-neutral-900 mt-2">
              {formattedValue}
            </p>
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    'text-sm font-medium',
                    trend.isPositive ? 'text-success' : 'text-error'
                  )}
                >
                  {trend.isPositive ? '+' : ''}
                  {trend.value}%
                </span>
                <span className="text-xs text-neutral-500 ml-2">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
