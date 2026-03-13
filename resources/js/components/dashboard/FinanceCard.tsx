import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FinanceCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  color: 'success' | 'error' | 'primary' | 'warning';
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label: string;
  };
  progress?: {
    value: number;
    label: string;
  };
}

const colorClasses = {
  success: {
    bg: 'bg-success-100',
    icon: 'text-success-600',
    value: 'text-success-600',
    progress: 'bg-success-600',
  },
  error: {
    bg: 'bg-error-100',
    icon: 'text-error-600',
    value: 'text-error-600',
    progress: 'bg-error-600',
  },
  primary: {
    bg: 'bg-primary-100',
    icon: 'text-primary-600',
    value: 'text-primary-600',
    progress: 'bg-primary-600',
  },
  warning: {
    bg: 'bg-warning-100',
    icon: 'text-warning-600',
    value: 'text-warning-600',
    progress: 'bg-warning-600',
  },
};

export const FinanceCard: React.FC<FinanceCardProps> = React.memo(({
  title,
  value,
  icon: Icon,
  description,
  color,
  trend,
  progress,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animate progress bar
  useEffect(() => {
    if (progress) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress.value);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const colors = colorClasses[color];
  const trendColor = trend?.direction === 'up' ? 'text-success-600' : 'text-error-600';
  const TrendIcon = trend?.direction === 'up' ? ArrowUp : ArrowDown;

  // Determine progress bar color based on utilization
  const getProgressColor = () => {
    if (!progress) return colors.progress;
    if (progress.value < 70) return 'bg-success-600';
    if (progress.value < 90) return 'bg-warning-600';
    return 'bg-error-600';
  };

  return (
    <Card variant="default" role="article" aria-label={`${title} financial metric`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-neutral-700">{title}</CardTitle>
        <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', colors.bg)} aria-hidden="true">
          <Icon className={cn('h-5 w-5', colors.icon)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold', colors.value)} aria-live="polite">
          {value}
        </div>
        <p className="text-xs text-neutral-500 mt-2">{description}</p>
        
        {trend && (
          <div className="flex items-center mt-3 text-xs" aria-label={`Trend: ${trend.direction === 'up' ? 'increased' : 'decreased'} by ${Math.abs(trend.value)}% ${trend.label}`}>
            <TrendIcon className={cn('h-3 w-3 mr-1', trendColor)} aria-hidden="true" />
            <span className={cn('font-medium', trendColor)}>
              {Math.abs(trend.value)}%
            </span>
            <span className="text-neutral-500 ml-1">{trend.label}</span>
          </div>
        )}

        {progress && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-neutral-600">{progress.label}</span>
              <span className="font-medium text-neutral-900">{progress.value}%</span>
            </div>
            <div 
              className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden"
              role="progressbar"
              aria-valuenow={progress.value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${progress.label}: ${progress.value}%`}
            >
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-1000 ease-out',
                  getProgressColor()
                )}
                style={{ width: `${Math.min(animatedProgress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

FinanceCard.displayName = 'FinanceCard';
