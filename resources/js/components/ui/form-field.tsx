/**
 * Form Field Component
 * 
 * Wrapper component for form inputs that integrates with react-hook-form
 * and provides consistent error handling, labels, and helper text.
 * 
 * Validates Requirements: 22.4
 */

import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '../../lib/utils';

export interface FormFieldProps {
  /**
   * Field label
   */
  label?: string;
  
  /**
   * Field error from react-hook-form
   */
  error?: FieldError | string;
  
  /**
   * Helper text shown below the input
   */
  helperText?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * The input element to render
   */
  children: React.ReactElement;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * ID for the input element
   */
  htmlFor?: string;
}

/**
 * Get error message from FieldError or string
 */
const getErrorMessage = (error: FieldError | string | undefined): string | undefined => {
  if (!error) return undefined;
  if (typeof error === 'string') return error;
  return error.message;
};

/**
 * FormField component that wraps form inputs with label, error, and helper text
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  children,
  className,
  htmlFor,
}) => {
  const errorMessage = getErrorMessage(error);
  const hasError = !!errorMessage;
  
  // Clone the child element and add error prop if it has one
  const childWithError = React.cloneElement(children, {
    error: errorMessage,
    'aria-invalid': hasError,
    required,
  } as any);

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-neutral-700"
        >
          {label}
          {required && (
            <span className="text-error-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      
      {childWithError}
      
      {errorMessage && (
        <p className="text-sm text-error-600" role="alert">
          {errorMessage}
        </p>
      )}
      
      {helperText && !errorMessage && (
        <p className="text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Hook to integrate FormField with react-hook-form
 * 
 * @example
 * const { register, formState: { errors } } = useForm();
 * const emailField = useFormField('email', register, errors);
 * 
 * <FormField {...emailField}>
 *   <Input type="email" />
 * </FormField>
 */
export const useFormField = (
  name: string,
  register: (name: string) => UseFormRegisterReturn,
  errors: Record<string, FieldError>
) => {
  return {
    htmlFor: name,
    error: errors[name],
    ...register(name),
  };
};
