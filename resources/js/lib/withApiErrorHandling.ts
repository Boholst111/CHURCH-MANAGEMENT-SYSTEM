/**
 * Higher-Order Function for API Error Handling
 * 
 * Wraps API calls with automatic error handling, retry logic,
 * and user-friendly error messages.
 * 
 * Validates Requirements: Task 22.3 - API Error Handling
 */

import { getErrorMessage, isRetryableError } from './errorHandler';

/**
 * Options for API error handling
 */
export interface ApiCallOptions {
  /** Custom error message */
  errorMessage?: string;
  /** Whether to throw the error after handling */
  throwError?: boolean;
  /** Maximum number of retry attempts */
  maxRetries?: number;
  /** Delay between retries in milliseconds */
  retryDelay?: number;
  /** Callback for error handling */
  onError?: (error: any) => void;
  /** Context for error logging */
  context?: string;
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Wrap an API call with error handling and retry logic
 * 
 * @param apiCall - The API call function to wrap
 * @param options - Options for error handling
 * @returns Promise with the API response or null on error
 */
export async function withApiErrorHandling<T>(
  apiCall: () => Promise<T>,
  options: ApiCallOptions = {}
): Promise<T | null> {
  const {
    errorMessage,
    throwError = false,
    maxRetries = 0,
    retryDelay = 1000,
    onError,
    context,
  } = options;

  let lastError: any;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const result = await apiCall();
      return result;
    } catch (error: any) {
      lastError = error;
      attempt++;

      // Log error
      console.error(`[API Error] Attempt ${attempt}/${maxRetries + 1}`, {
        context,
        error: getErrorMessage(error),
        isRetryable: isRetryableError(error),
      });

      // Check if we should retry
      if (attempt <= maxRetries && isRetryableError(error)) {
        console.log(`[API] Retrying in ${retryDelay}ms...`);
        await sleep(retryDelay);
        continue;
      }

      // No more retries, handle the error
      if (onError) {
        onError(error);
      }

      if (throwError) {
        throw error;
      }

      return null;
    }
  }

  // This should never be reached, but TypeScript needs it
  if (throwError) {
    throw lastError;
  }
  return null;
}

/**
 * Create a retry function for a failed API call
 * 
 * @param apiCall - The API call function to retry
 * @param onSuccess - Callback on successful retry
 * @param onError - Callback on retry failure
 * @returns Retry function
 */
export function createRetryFunction<T>(
  apiCall: () => Promise<T>,
  onSuccess?: (result: T) => void,
  onError?: (error: any) => void
): () => Promise<void> {
  return async () => {
    try {
      const result = await apiCall();
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };
}
