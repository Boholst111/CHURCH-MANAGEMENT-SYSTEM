# React Query Hooks

This directory contains React Query hooks for data fetching and state management across the application.

## Overview

React Query (TanStack Query) provides:
- Automatic caching with configurable stale times
- Background refetching for fresh data
- Optimistic updates for better UX
- Automatic retry logic with exponential backoff
- Request deduplication
- Pagination and infinite scroll support

## Configuration

The QueryClient is configured in `lib/queryClient.ts` with the following defaults:

- **Stale Time**: 5 minutes - Data is considered fresh for 5 minutes
- **GC Time**: 10 minutes - Inactive queries are garbage collected after 10 minutes
- **Retry**: 3 attempts for queries, 1 for mutations
- **Refetch on Window Focus**: Enabled - Fresh data when user returns to tab
- **Refetch on Reconnect**: Enabled - Fresh data when connection is restored

## Query Keys

Query keys are organized in `lib/queryKeys.ts` following a hierarchical structure:

```typescript
queryKeys.members.list(filters)
queryKeys.members.detail(id)
queryKeys.finance.offerings.list(filters)
queryKeys.finance.expenses.detail(id)
```

This structure enables:
- Easy cache invalidation (invalidate all members with `queryKeys.members.all`)
- Precise cache updates (update specific member with `queryKeys.members.detail(id)`)
- Consistent key naming across the app

## Usage Examples

### Basic Query

```typescript
import { useMembers } from '@/hooks/queries';

function MembersList() {
  const { data, isLoading, error } = useMembers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.data.map(member => (
        <li key={member.id}>{member.first_name} {member.last_name}</li>
      ))}
    </ul>
  );
}
```

### Query with Filters

```typescript
import { useMembers } from '@/hooks/queries';

function ActiveMembers() {
  const filters = { status: 'active', membership_type: 'regular' };
  const { data, isLoading } = useMembers(filters);

  // React Query automatically caches based on filter values
  // Changing filters will trigger a new request
}
```

### Mutation with Optimistic Update

```typescript
import { useUpdateMember } from '@/hooks/queries';
import { useToast } from '@/contexts/ToastContext';

function EditMemberForm({ member }) {
  const { toast } = useToast();
  const updateMember = useUpdateMember();

  const handleSubmit = (formData) => {
    updateMember.mutate(
      { id: member.id, ...formData },
      {
        onSuccess: () => {
          toast({ title: 'Member updated successfully', variant: 'success' });
        },
        onError: (error) => {
          toast({ title: 'Failed to update member', variant: 'error' });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={updateMember.isPending}>
        {updateMember.isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

### Manual Cache Invalidation

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/hooks/queries';

function RefreshButton() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // Invalidate all member queries
    queryClient.invalidateQueries({ queryKey: queryKeys.members.all });
    
    // Or invalidate specific query
    queryClient.invalidateQueries({ queryKey: queryKeys.members.detail(1) });
  };

  return <button onClick={handleRefresh}>Refresh</button>;
}
```

### Dependent Queries

```typescript
import { useMember, useSmallGroup } from '@/hooks/queries';

function MemberDetail({ memberId }) {
  const { data: member } = useMember(memberId);
  
  // This query only runs when member data is available
  const { data: group } = useSmallGroup(member?.small_group_id, {
    enabled: !!member?.small_group_id,
  });

  return (
    <div>
      <h1>{member?.first_name} {member?.last_name}</h1>
      {group && <p>Group: {group.name}</p>}
    </div>
  );
}
```

### Pagination

```typescript
import { useMembers } from '@/hooks/queries';
import { useState } from 'react';

function PaginatedMembers() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMembers({ page, per_page: 10 });

  return (
    <div>
      {/* Member list */}
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  );
}
```

### Search with Debouncing

```typescript
import { useMemberSearch } from '@/hooks/queries';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

function MemberSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const { data, isLoading } = useMemberSearch(debouncedSearch);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search members..."
      />
      {isLoading && <span>Searching...</span>}
      {data && (
        <ul>
          {data.data.map(member => (
            <li key={member.id}>{member.first_name} {member.last_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Available Hooks

### Dashboard
- `useDashboardStats()` - Overall statistics
- `useAttendanceData(period?)` - Attendance chart data
- `useRecentActivity(limit?)` - Recent activity feed
- `useUpcomingEvents(limit?)` - Upcoming events list

### Members
- `useMembers(filters?)` - List members with optional filters
- `useMember(id)` - Get single member details
- `useMemberSearch(query)` - Search members
- `useCreateMember()` - Create new member
- `useUpdateMember()` - Update existing member
- `useDeleteMember()` - Delete member

### Events
- `useEvents(filters?)` - List events with optional filters
- `useEvent(id)` - Get single event details
- `useEventCalendar(month?, year?)` - Calendar view data
- `useCreateEvent()` - Create new event
- `useUpdateEvent()` - Update existing event
- `useDeleteEvent()` - Delete event

### Finance
- `useFinanceOverview()` - Finance summary statistics
- `useOfferings(filters?)` - List offerings
- `useOffering(id)` - Get single offering
- `useCreateOffering()` - Create new offering
- `useUpdateOffering()` - Update offering
- `useDeleteOffering()` - Delete offering
- `useExpenses(filters?)` - List expenses
- `useExpense(id)` - Get single expense
- `useCreateExpense()` - Create new expense
- `useUpdateExpense()` - Update expense
- `useDeleteExpense()` - Delete expense
- `useApproveExpense()` - Approve expense
- `useRejectExpense()` - Reject expense
- `useBudgets(fiscalYear?)` - List budgets
- `useBudget(id)` - Get single budget
- `useCreateBudget()` - Create new budget
- `useUpdateBudget()` - Update budget
- `useDeleteBudget()` - Delete budget
- `useOfferingTypes()` - List offering types
- `useExpenseCategories()` - List expense categories
- `useFunds()` - List funds

## Best Practices

1. **Use Query Keys Consistently**: Always use the predefined query keys from `queryKeys.ts`

2. **Handle Loading and Error States**: Always provide feedback for loading and error states

3. **Optimistic Updates**: Use optimistic updates for better UX on mutations

4. **Cache Invalidation**: Invalidate related queries after mutations to keep data fresh

5. **Stale Time Configuration**: Adjust stale time based on data volatility
   - Static data (categories, types): `staleTime: Infinity`
   - Frequently changing data (activity log): `staleTime: 1 * 60 * 1000`

6. **Enable/Disable Queries**: Use the `enabled` option for dependent queries

7. **Error Handling**: Provide user-friendly error messages and recovery options

## Testing

Tests are located in `__tests__/` directory. Example test structure:

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMembers } from '../useMembers';

// Create test wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Test query hook
it('should fetch members', async () => {
  const { result } = renderHook(() => useMembers(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toBeDefined();
});
```

## Troubleshooting

### Query Not Refetching
- Check if data is still fresh (within stale time)
- Manually invalidate with `queryClient.invalidateQueries()`
- Check if `refetchOnWindowFocus` is disabled

### Mutation Not Updating UI
- Ensure cache invalidation is set up in `onSuccess`
- Check if query keys match between query and invalidation
- Verify optimistic update logic

### Memory Leaks
- Ensure components unmount properly
- Check for infinite refetch loops
- Verify `enabled` option is used correctly for conditional queries

## Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Query Keys Best Practices](https://tkdodo.eu/blog/effective-react-query-keys)
- [Optimistic Updates Guide](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
