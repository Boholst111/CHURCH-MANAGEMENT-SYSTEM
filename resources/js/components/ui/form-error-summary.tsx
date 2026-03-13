/**
 * Form Error Summary Component
 * 
 * Displays a summary of form validation errors at the top of a form.
 * Shows error count and list of all validation errors.
 * 
 * Validates Requirements: 22.4
 */

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FormErrorSummaryProps {
  /**
   * Field errors from react-hook-form
   */
  errors: FieldErrors;
  
  /**
   * Title for the error summary
   * @default 'Please fix the following errors:'
   */
  title?: string;
  
  /**
   * Whether to show the error count
   * @default true
   */
  showCount?: boolean;
  
  /**
   * Whether to show individual error messages
   * @default true
   */
  showMessages?: boolean;
  
  /**
   * Callback when dismiss button is clicked
   */
  onDismiss?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Format field name for display
 * Converts camelCase or snake_case to Title Case
 */
const formatFieldName = (field: string): string => {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

/**
 * Get error message from field error
 */
const getErrorMessage = (error: any): string => {
  if (typeof error?.message === 'string') {
    return error.message;
  }
  return 'Invalid value';
};

export const FormErrorSummary = React.forwardRef<HTMLDivElement, FormErrorSummaryProps>(
  (
    {
      errors,
      title = 'Please fix the following errors:',
      showCount = true,
      showMessages = true,
      onDismiss,
      className,
    },
    ref
  ) => {
    const errorCount = Object.keys(errors).length;

    // Don't render if no errors
    if (errorCount === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={cn(
          'bg-error-50 border border-error-200 rounded-lg p-4',
          className
        )}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-error-600" aria-hidden="true" />
          </div>
          
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-error-900">
              {title}
              {showCount && ` (${errorCount} ${errorCount === 1 ? 'error' : 'errors'})`}
            </h3>
            
            {showMessages && (
              <div className="mt-2 text-sm text-error-700">
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>
                      <strong>{formatFieldName(field)}:</strong> {getErrorMessage(error)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {onDismiss && (
            <div className="ml-auto pl-3">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex rounded-md bg-error-50 p-1.5 text-error-500 hover:bg-error-100 focus:outline-none focus:ring-2 focus:ring-error-600 focus:ring-offset-2 focus:ring-offset-error-50 transition-colors"
                aria-label="Dismiss error summary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FormErrorSummary.displayName = 'FormErrorSummary';
