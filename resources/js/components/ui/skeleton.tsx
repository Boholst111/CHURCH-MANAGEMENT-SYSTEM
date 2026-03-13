import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Skeleton Props
 */
export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton Component
 * 
 * A placeholder component for loading states that mimics the shape of content.
 * Provides a better user experience than spinners for page loads.
 * 
 * @param className - Additional CSS classes
 * @param variant - Shape of the skeleton (text, circular, rectangular)
 * @param width - Width of the skeleton
 * @param height - Height of the skeleton
 * @param animation - Animation type (pulse, wave, none)
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        'bg-neutral-200',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * SkeletonText Component
 * 
 * Skeleton for text content with multiple lines.
 */
export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = '' }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          height={16}
          width={index === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  );
};

/**
 * SkeletonCard Component
 * 
 * Skeleton for card components.
 */
export const SkeletonCard: React.FC<{
  className?: string;
  hasImage?: boolean;
}> = ({ className = '', hasImage = false }) => {
  return (
    <div className={cn('bg-white rounded-xl border border-neutral-200 overflow-hidden', className)}>
      {hasImage && <Skeleton variant="rectangular" height={192} className="rounded-none" />}
      <div className="p-6 space-y-4">
        <Skeleton variant="text" height={24} width="60%" />
        <SkeletonText lines={2} />
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" height={16} width="40%" />
        </div>
      </div>
    </div>
  );
};

/**
 * SkeletonTable Component
 * 
 * Skeleton for table components.
 */
export const SkeletonTable: React.FC<{
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 5, className = '' }) => {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-neutral-200', className)}>
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-6 py-3">
                <Skeleton variant="text" height={16} width="80%" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton variant="text" height={16} width="90%" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * SkeletonAvatar Component
 * 
 * Skeleton for avatar/profile pictures.
 */
export const SkeletonAvatar: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
    />
  );
};

/**
 * SkeletonList Component
 * 
 * Skeleton for list items.
 */
export const SkeletonList: React.FC<{
  items?: number;
  className?: string;
}> = ({ items = 5, className = '' }) => {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <SkeletonAvatar size="md" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" height={16} width="40%" />
            <Skeleton variant="text" height={14} width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
};
