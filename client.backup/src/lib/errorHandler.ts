/**
 * Error Handler Utilities
 * 
 * Provides utilities for handling API errors and converting them
 * to user-friendly error messages.
 * 
 * Validates Requirements: 6.6
 */

/**
 * API Error Response Interface
 */
export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  code?: string;
}

/**
 * Get user-friendly error message from API error
 * 
 * @param error - The error object from API call
 * @param defaultMessage - Default message if no specific message is found
 * @returns User-friendly error message
 */
export const getErrorMessage = (error: any, defaultMessage: string = 'An error occurred'): string => {
  // Check if error has a response (axios error)
  if (error.response?.data) {
    const data: ApiErrorResponse = error.response.data;
    
    // Return the message if available
    if (data.message) {
      return data.message;
    }
    
    // If there are validation errors, return the first one
    if (data.errors) {
      const firstErrorKey = Object.keys(data.errors)[0];
      if (firstErrorKey && data.errors[firstErrorKey]?.length > 0) {
        return data.errors[firstErrorKey][0];
      }
    }
  }
  
  // Check if error has a message property
  if (error.message) {
    // Convert technical error messages to user-friendly ones
    if (error.message.includes('Network Error')) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (error.message.includes('timeout')) {
      return 'The request took too long. Please try again.';
    }
    return error.message;
  }
  
  // Return default message
  return defaultMessage;
};

/**
 * Get validation errors from API error response
 * 
 * @param error - The error object from API call
 * @returns Object with field names as keys and error messages as values
 */
export const getValidationErrors = (error: any): Record<string, string> => {
  const validationErrors: Record<string, string> = {};
  
  if (error.response?.data?.errors) {
    const errors: Record<string, string[]> = error.response.data.errors;
    
    // Convert array of errors to single string per field
    Object.keys(errors).forEach((field) => {
      if (errors[field]?.length > 0) {
        validationErrors[field] = errors[field][0];
      }
    });
  }
  
  return validationErrors;
};

/**
 * Check if error is a validation error
 * 
 * @param error - The error object from API call
 * @returns True if error is a validation error
 */
export const isValidationError = (error: any): boolean => {
  return error.response?.status === 422 || error.response?.status === 400;
};

/**
 * Check if error is an authentication error
 * 
 * @param error - The error object from API call
 * @returns True if error is an authentication error
 */
export const isAuthError = (error: any): boolean => {
  return error.response?.status === 401;
};

/**
 * Check if error is an authorization error
 * 
 * @param error - The error object from API call
 * @returns True if error is an authorization error
 */
export const isAuthorizationError = (error: any): boolean => {
  return error.response?.status === 403;
};

/**
 * Check if error is a not found error
 * 
 * @param error - The error object from API call
 * @returns True if error is a not found error
 */
export const isNotFoundError = (error: any): boolean => {
  return error.response?.status === 404;
};

/**
 * Check if error is a server error
 * 
 * @param error - The error object from API call
 * @returns True if error is a server error
 */
export const isServerError = (error: any): boolean => {
  return error.response?.status >= 500;
};

/**
 * Get HTTP status code from error
 * 
 * @param error - The error object from API call
 * @returns HTTP status code or null if not available
 */
export const getStatusCode = (error: any): number | null => {
  return error.response?.status || null;
};

/**
 * Format error for logging
 * 
 * @param error - The error object
 * @param context - Additional context about where the error occurred
 * @returns Formatted error object for logging
 */
export const formatErrorForLogging = (error: any, context?: string): object => {
  return {
    context,
    message: error.message,
    status: getStatusCode(error),
    response: error.response?.data,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  };
};
