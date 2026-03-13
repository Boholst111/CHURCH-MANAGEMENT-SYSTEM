import { QueryClient } from '@tanstack/react-query';

/**
 * React Query client configuration
 * 
 * Configures default options for queries and mutations including:
 * - Caching strategies
 * - Retry logic
 * - Stale time settings
 * - Error handling
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time before data is considered stale (5 minutes)
      staleTime: 5 * 60 * 1000,
      
      // Time before inactive queries are garbage collected (10 minutes)
      gcTime: 10 * 60 * 1000,
      
      // Retry failed requests up to 3 times
      retry: 3,
      
      // Exponential backoff for retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus for fresh data
      refetchOnWindowFocus: true,
      
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
      
      // Refetch on reconnect to get latest data
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      
      // Shorter retry delay for mutations
      retryDelay: 1000,
    },
  },
});
