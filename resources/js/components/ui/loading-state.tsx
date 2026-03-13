import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from './button';
import { Spinner } from './spinner';
import { SkeletonTable, SkeletonCard, SkeletonList } from './skeleton';
import { cn } from '../../lib/utils';

/**
 * LoadingState Props
 */
export interface LoadingStateProps {
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  type?: 'spinner' | 'skeleton-table' | 'skeleton-card' | 'skeleton-list';
  skeletonRows?: number;
  skeletonColumns?: number;
  skeletonCards?: number;
  skeletonItems?: number;
  className?: string;
}

/**
 * LoadingState Component
 * 
 * A wrapper component that handles loading, error, and success states.
 * Automatically shows loading indicators or error messages based on state.
 * 
 * @param loading - Whether data is currently loading
 * @param error - Error message if loading failed
 * @param onRetry - Callback to retry loading
 * @param children - Content to show when loaded successfully
 * @param loadingComponent - Custom loading component
 * @param errorComponent - Custom error component
 * @param type - Type of loading indicator (spinner, skeleton-table, skeleton-card, skeleton-list)
 * @param skeletonRows - Number of skeleton rows (for table)
 * @param skeletonColumns - Number of skeleton columns (for table)
 * @param skeletonCards - Number of skeleton cards
 * @param skeletonItems - Number of skeleton list items
 * @param className - Additional CSS classes
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  error,
  onRetry,
  children,
  loadingComponent,
  errorComponent,
  type = 'spinner',
  skeletonRows = 5,
  skeletonColumns = 5,
  skeletonCards = 3,
  skeletonItems = 5,
  className = '',
}) => {
  // Show loading state
  if (loading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }

    if (type === 'skeleton-table') {
      return <SkeletonTable rows={skeletonRows} columns={skeletonColumns} className={className} />;
    }

    if (type === 'skeleton-card') {
      return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
          {Array.from({ length: skeletonCards }).map((_, index) => (
            <SkeletonCard key={index} hasImage />
          ))}
        </div>
      );
    }

    if (type === 'skeleton-list') {
      return <SkeletonList items={skeletonItems} className={className} />;
    }

    // Default spinner
    return (
      <div className={cn('flex items-center justify-center py-12', className)} role="status" aria-live="polite">
        <div className="flex items-center space-x-2 text-neutral-600">
          <RefreshCw className="h-5 w-5 animate-spin" aria-hidden="true" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }

    return (
      <div className={cn('flex items-center justify-center py-12', className)} role="alert" aria-live="assertive">
        <div className="flex flex-col items-center space-y-4 max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-error-500" aria-hidden="true" />
          <div>
            <p className="text-lg font-semibold text-neutral-900">Failed to load data</p>
            <p className="text-sm text-neutral-600 mt-1">{error}</p>
          </div>
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Show content
  return <>{children}</>;
};

/**
 * PageLoadingState Component
 * 
 * Full-page loading state with centered spinner.
 */
export const PageLoadingState: React.FC<{
  message?: string;
}> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]" role="status" aria-live="polite">
      <Spinner size="lg" label={message} />
    </div>
  );
};

/**
 * InlineLoadingState Component
 * 
 * Inline loading state for smaller sections.
 */
export const InlineLoadingState: React.FC<{
  message?: string;
  className?: string;
}> = ({ message = 'Loading...', className = '' }) => {
  return (
    <div className={cn('flex items-center space-x-2 text-neutral-600', className)} role="status" aria-live="polite">
      <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
      <span className="text-sm">{message}</span>
    </div>
  );
};

/**
 * EmptyState Component
 * 
 * Component to show when there's no data to display.
 */
export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}> = ({ icon, title, description, action, className = '' }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {icon && <div className="mb-4 text-neutral-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      {description && <p className="text-sm text-neutral-600 mt-1 max-w-md">{description}</p>}
      {action && (
        <Button onClick={action.onClick} variant="primary" className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
};
