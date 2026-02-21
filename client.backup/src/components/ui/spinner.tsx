import React from 'react';

/**
 * Spinner Props
 */
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

/**
 * Spinner Component
 * 
 * A reusable loading spinner component with different sizes.
 * 
 * @param size - Size of the spinner (sm, md, lg, xl)
 * @param className - Additional CSS classes
 * @param label - Optional loading label text
 */
export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className = '',
  label 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-2',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-b-primary-500 border-t-transparent border-l-transparent border-r-transparent ${sizeClasses[size]}`}
        role="status"
        aria-label={label || 'Loading'}
      >
        <span className="sr-only">{label || 'Loading...'}</span>
      </div>
      {label && (
        <p className="mt-2 text-sm text-gray-600">{label}</p>
      )}
    </div>
  );
};

/**
 * LoadingOverlay Component
 * 
 * A full-screen loading overlay with spinner.
 */
export const LoadingOverlay: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <Spinner size="xl" label={message || 'Loading...'} />
    </div>
  );
};

/**
 * InlineLoader Component
 * 
 * A small inline loading indicator for buttons or inline content.
 */
export const InlineLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div 
      className={`inline-block animate-spin rounded-full h-4 w-4 border-2 border-b-white border-t-transparent border-l-transparent border-r-transparent ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
