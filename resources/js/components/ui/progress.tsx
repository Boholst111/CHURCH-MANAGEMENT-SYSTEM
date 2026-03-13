import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Progress Props
 */
export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

/**
 * Progress Component
 * 
 * A progress bar component for displaying operation progress.
 * 
 * @param value - Current progress value (0-100 or 0-max)
 * @param max - Maximum value (default: 100)
 * @param size - Size of the progress bar
 * @param variant - Color variant
 * @param showLabel - Whether to show percentage label
 * @param label - Custom label text
 * @param className - Additional CSS classes
 */
export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-neutral-700">
            {label || `${Math.round(percentage)}%`}
          </span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-neutral-200 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `${Math.round(percentage)}% complete`}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-in-out',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/**
 * CircularProgress Component
 * 
 * A circular progress indicator for indeterminate loading states.
 */
export const CircularProgress: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}> = ({ size = 'md', variant = 'primary', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  const variantClasses = {
    primary: 'border-primary-600',
    success: 'border-success-600',
    warning: 'border-warning-600',
    error: 'border-error-600',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-t-transparent border-l-transparent border-r-transparent',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * LinearProgress Component
 * 
 * An indeterminate linear progress indicator.
 */
export const LinearProgress: React.FC<{
  variant?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}> = ({ variant = 'primary', className = '' }) => {
  const variantClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
  };

  return (
    <div
      className={cn('w-full h-1 bg-neutral-200 rounded-full overflow-hidden', className)}
      role="progressbar"
      aria-label="Loading"
    >
      <div
        className={cn(
          'h-full animate-progress-indeterminate',
          variantClasses[variant]
        )}
        style={{
          animation: 'progress-indeterminate 1.5s ease-in-out infinite',
        }}
      />
    </div>
  );
};
