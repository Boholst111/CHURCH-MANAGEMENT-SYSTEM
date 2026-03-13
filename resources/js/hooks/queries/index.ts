/**
 * React Query hooks for data fetching and mutations
 * 
 * This module exports all query hooks organized by domain.
 * Each hook provides type-safe data fetching with automatic caching,
 * background refetching, and optimistic updates.
 */

// Dashboard hooks
export * from './useDashboard';

// Members hooks
export * from './useMembers';

// Events hooks
export * from './useEvents';

// Finance hooks
export * from './useFinance';

// Re-export query keys for manual cache manipulation
export { queryKeys } from '../../lib/queryKeys';

// Re-export query client for advanced usage
export { queryClient } from '../../lib/queryClient';
