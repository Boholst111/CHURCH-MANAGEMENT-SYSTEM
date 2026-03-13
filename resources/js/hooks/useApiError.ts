/**
 * useApiError Hook
 * 
 * Custom hook for handling API errors with user-friendly messages,
 * retry functionality, and offline detection.
 * 
 * Validates Requirements: Task 22.3 - API Error Handling
 */

import { useCallback, useEffect, useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { getErrorMessage, isServerError, formatErrorForLogging } from '../lib/errorHandler';

/**
 * API Error Handler Options
 */
export interface ApiErrorOptions {
  /** Custom error message to display */
  message?: string;
  /** Whether to show a retry button */
  showRetry?: boolean;
  /** Callback function to retry the operation */
  onRetry?: () => void;
  /** Whether to preserve user input on error */
  preserveInput?: boolean;
  /** Context for error logging */
  context?: string;
}

/**
 * Network Status
 */
export interface NetworkStatus {
  isOnline: boolean;
  wasOffline: boolean;
}

/**
 * Hook for handling API errors
 */
export const useApiError = () => {
  const { showToast } = useToast();
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    wasOffline: false,
  });

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus((prev) => ({
        isOnline: true,
        wasOffline: prev.wasOffline || !prev.isOnline,
      }));
      
      // Show reconnection message if was offline
      if (!networkStatus.isOnline) {
        showToast('success', 'Connection restored. You are back online.');
      }
    };

    const handleOffline = () => {
      setNetworkStatus({
        isOnline: false,
        wasOffline: true,
      });
      
      showToast('error', 'You are offline. Please check your internet connection.', {
        duration: 0, // Don't auto-dismiss
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [networkStatus.isOnline, showToast]);

  /**
   * Handle API error with user-friendly message and retry option
   */
  const handleError = useCallback(
    (error: any, options?: ApiErrorOptions) => {
      // Log error for debugging
      console.error('[API Error]', formatErrorForLogging(error, options?.context));

      // Check if offline
      if (!navigator.onLine) {
        showToast('error', 'You are offline. Please check your internet connection.', {
          duration: 0,
        });
        return;
      }

      // Get user-friendly error message
      const message = options?.message || getErrorMessage(error);

      // Determine if we should show retry button
      const shouldShowRetry = options?.showRetry && options?.onRetry && isServerError(error);

      // Show error toast with optional retry button
      showToast('error', message, {
        duration: shouldShowRetry ? 0 : 5000, // Don't auto-dismiss if retry is available
        action: shouldShowRetry
          ? {
              label: 'Retry',
              onClick: options.onRetry!,
            }
          : undefined,
      });
    },
    [showToast]
  );

  /**
   * Check if currently online
   */
  const isOnline = useCallback(() => {
    return networkStatus.isOnline;
  }, [networkStatus.isOnline]);

  /**
   * Reset network status (clear wasOffline flag)
   */
  const resetNetworkStatus = useCallback(() => {
    setNetworkStatus((prev) => ({
      ...prev,
      wasOffline: false,
    }));
  }, []);

  return {
    handleError,
    isOnline,
    networkStatus,
    resetNetworkStatus,
  };
};
