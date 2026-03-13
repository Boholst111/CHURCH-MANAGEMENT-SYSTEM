import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label: string;
  };
  color: 'primary' | 'success' | 'warning' | 'info';
  description?: string;
}

const colorClasses = {
  primary: {
    bg: 'bg-primary-100',
    icon: 'text-primary-600',
    trend: 'text-primary-600',
  },
  success: {
    bg: 'bg-success-100',
    icon: 'text-success-600',
    trend: 'text-success-600',
  },
  warning: {
    bg: 'bg-warning-100',
    icon: 'text-warning-600',
    trend: 'text-warning-600',
  },
  info: {
    bg: 'bg-info-100',
    icon: 'text-info-600',
    trend: 'text-info-600',
  },
};

export const StatCard: React.FC<StatCardProps> = React.memo(({
  title,
  value,
  icon: Icon,
  trend,
  color,
  description,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Animate number on load
  useEffect(() => {
    setIsAnimating(true);
    const duration = 1000; // 1 second animation
    const steps = 60; // 60 frames
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const colors = colorClasses[color];
  const trendColor = trend?.direction === 'up' ? 'text-success-600' : 'text-error-600';
  const TrendIcon = trend?.direction === 'up' ? ArrowUp : ArrowDown;

  return (
    <Card variant="default" hoverable role="article" aria-label={`${title} statistic`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-neutral-700">{title}</CardTitle>
        <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', colors.bg)} aria-hidden="true">
          <Icon className={cn('h-5 w-5', colors.icon)} />
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'text-2xl font-bold text-neutral-900 transition-all duration-300',
            isAnimating && 'scale-105'
          )}
          aria-live="polite"
          aria-atomic="true"
        >
          {displayValue.toLocaleString()}
        </div>
        {trend && (
          <div className="flex items-center mt-2 text-xs" aria-label={`Trend: ${trend.direction === 'up' ? 'increased' : 'decreased'} by ${trend.value}% ${trend.label}`}>
            <TrendIcon className={cn('h-3 w-3 mr-1', trendColor)} aria-hidden="true" />
            <span className={cn('font-medium', trendColor)}>{trend.value}%</span>
            <span className="text-neutral-500 ml-1">{trend.label}</span>
          </div>
        )}
        {!trend && description && (
          <p className="text-xs text-neutral-500 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
});

StatCard.displayName = 'StatCard';
