import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import App from '../App';

// Test component that uses React Query
const TestComponent: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      return { message: 'React Query is working!' };
    },
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.message}</div>;
};

describe('React Query Setup', () => {
  it('should have QueryClientProvider in App component', () => {
    // This test verifies that the App component renders without errors
    // which means QueryClientProvider is properly set up
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });

  it('should allow components to use React Query hooks', async () => {
    const { QueryClientProvider } = await import('@tanstack/react-query');
    const { queryClient } = await import('../lib/queryClient');

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    // Should show loading initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Should show data after loading
    const message = await screen.findByText('React Query is working!');
    expect(message).toBeInTheDocument();
  });

  it('should have proper query client configuration', async () => {
    const { queryClient } = await import('../lib/queryClient');

    const defaultOptions = queryClient.getDefaultOptions();

    // Verify stale time is configured
    expect(defaultOptions.queries?.staleTime).toBe(5 * 60 * 1000);

    // Verify gc time is configured
    expect(defaultOptions.queries?.gcTime).toBe(10 * 60 * 1000);

    // Verify retry is configured
    expect(defaultOptions.queries?.retry).toBe(3);

    // Verify refetch on window focus
    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(true);
  });

  it('should have query keys properly structured', async () => {
    const { queryKeys } = await import('../lib/queryKeys');

    // Verify members keys
    expect(queryKeys.members.all).toEqual(['members']);
    expect(queryKeys.members.list()).toEqual(['members', 'list', undefined]);
    expect(queryKeys.members.detail(1)).toEqual(['members', 'detail', 1]);

    // Verify finance keys
    expect(queryKeys.finance.all).toEqual(['finance']);
    expect(queryKeys.finance.offerings.all()).toEqual(['finance', 'offerings']);
    expect(queryKeys.finance.expenses.list()).toEqual(['finance', 'expenses', 'list', undefined]);

    // Verify dashboard keys
    expect(queryKeys.dashboard.stats()).toEqual(['dashboard', 'stats']);
    expect(queryKeys.dashboard.attendance('monthly')).toEqual(['dashboard', 'attendance', 'monthly']);
  });
});
