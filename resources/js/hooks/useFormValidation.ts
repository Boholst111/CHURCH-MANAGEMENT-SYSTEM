/**
 * Form Validation Hook
 * 
 * Provides utilities for handling form validation errors including:
 * - Inline error messages for invalid fields
 * - Highlighting invalid fields with red borders
 * - Focusing first invalid field on submit
 * - Error summary at top of form
 * - Clearing errors when field becomes valid
 * 
 * Validates Requirements: 22.4
 */

import { useCallback, useRef } from 'react';
import { FieldErrors, UseFormSetFocus } from 'react-hook-form';

export interface FormValidationOptions {
  /**
   * Whether to focus the first invalid field on validation error
   * @default true
   */
  focusFirstError?: boolean;
  
  /**
   * Whether to scroll to the first invalid field
   * @default true
   */
  scrollToError?: boolean;
  
  /**
   * Scroll behavior when navigating to error
   * @default 'smooth'
   */
  scrollBehavior?: ScrollBehavior;
}

/**
 * Hook for handling form validation errors
 * 
 * @param setFocus - react-hook-form's setFocus function
 * @param options - Configuration options
 * @returns Validation utilities
 */
export const useFormValidation = (
  setFocus?: UseFormSetFocus<any>,
  options: FormValidationOptions = {}
) => {
  const {
    focusFirstError = true,
    scrollToError = true,
    scrollBehavior = 'smooth',
  } = options;

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  /**
   * Focus the first invalid field in the form
   * 
   * @param errors - Field errors from react-hook-form
   */
  const focusFirstInvalidField = useCallback(
    (errors: FieldErrors) => {
      if (!focusFirstError) return;

      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField && setFocus) {
        setFocus(firstErrorField as any);
      }
    },
    [focusFirstError, setFocus]
  );

  /**
   * Scroll to the error summary at the top of the form
   */
  const scrollToErrorSummary = useCallback(() => {
    if (!scrollToError || !errorSummaryRef.current) return;

    errorSummaryRef.current.scrollIntoView({
      behavior: scrollBehavior,
      block: 'start',
    });
  }, [scrollToError, scrollBehavior]);

  /**
   * Get error count from field errors
   * 
   * @param errors - Field errors from react-hook-form
   * @returns Number of errors
   */
  const getErrorCount = useCallback((errors: FieldErrors): number => {
    return Object.keys(errors).length;
  }, []);

  /**
   * Get error messages as an array
   * 
   * @param errors - Field errors from react-hook-form
   * @returns Array of error messages with field names
   */
  const getErrorMessages = useCallback((errors: FieldErrors): Array<{ field: string; message: string }> => {
    return Object.entries(errors).map(([field, error]) => ({
      field,
      message: error?.message as string || 'Invalid value',
    }));
  }, []);

  /**
   * Handle form validation errors
   * Called when form submission fails validation
   * 
   * @param errors - Field errors from react-hook-form
   */
  const handleValidationErrors = useCallback(
    (errors: FieldErrors) => {
      // Focus first invalid field
      focusFirstInvalidField(errors);
      
      // Scroll to error summary if it exists
      scrollToErrorSummary();
    },
    [focusFirstInvalidField, scrollToErrorSummary]
  );

  return {
    errorSummaryRef,
    focusFirstInvalidField,
    scrollToErrorSummary,
    getErrorCount,
    getErrorMessages,
    handleValidationErrors,
  };
};
