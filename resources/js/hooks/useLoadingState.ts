import { useState, useCallback } from 'react';

/**
 * Loading State Hook
 * 
 * A hook for managing loading states for async operations.
 * Provides utilities for tracking loading, error, and success states.
 * 
 * @returns Object with loading state and utilities
 */
export const useLoadingState = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  /**
   * Execute an async operation with automatic loading state management
   */
  const execute = useCallback(async <T>(
    operation: () => Promise<T>,
    options?: {
      onSuccess?: (result: T) => void;
      onError?: (error: Error) => void;
      errorMessage?: string;
    }
  ): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await operation();
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = options?.errorMessage || 
        (err instanceof Error ? err.message : 'An error occurred');
      setError(errorMessage);
      options?.onError?.(err instanceof Error ? err : new Error(errorMessage));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Reset the loading state
   */
  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  /**
   * Set loading state manually
   */
  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
    if (loading) {
      setError(null);
    }
  }, []);

  return {
    isLoading,
    error,
    execute,
    reset,
    setLoading,
    setError,
  };
};

/**
 * Multiple Loading States Hook
 * 
 * Manages multiple named loading states for complex components.
 */
export const useMultipleLoadingStates = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  }, []);

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some(loading => loading);
  }, [loadingStates]);

  const reset = useCallback(() => {
    setLoadingStates({});
  }, []);

  return {
    setLoading,
    isLoading,
    isAnyLoading,
    reset,
    loadingStates,
  };
};
