import React from 'react';
import { Spinner } from './spinner';

/**
 * LoadingFallback Component
 * 
 * A full-page loading fallback for Suspense boundaries.
 * Used when lazy-loading route components.
 */
export const LoadingFallback: React.FC<{ message?: string }> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-neutral-600">{message}</p>
      </div>
    </div>
  );
};

/**
 * ContentLoadingFallback Component
 * 
 * A smaller loading fallback for content areas within pages.
 * Used when lazy-loading tab components or sections.
 */
export const ContentLoadingFallback: React.FC<{ message?: string }> = ({ 
  message = 'Loading content...' 
}) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Spinner size="md" />
        <p className="mt-3 text-sm text-neutral-600">{message}</p>
      </div>
    </div>
  );
};
