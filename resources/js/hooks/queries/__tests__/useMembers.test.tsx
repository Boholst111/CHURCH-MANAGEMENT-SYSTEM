import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  useMembers,
  useMember,
  useCreateMember,
  useUpdateMember,
  useDeleteMember,
  useMemberSearch,
} from '../useMembers';
import React from 'react';

const mock = new MockAdapter(axios);

// Create a wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useMembers', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('useMembers', () => {
    it('should fetch members list', async () => {
      const mockMembers = {
        data: [
          { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
          { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
        ],
        total: 2,
      };

      mock.onGet('/api/members').reply(200, mockMembers);

      const { result } = renderHook(() => useMembers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockMembers);
    });

    it('should fetch members with filters', async () => {
      const filters = { status: 'active', membership_type: 'regular' };
      const mockMembers = {
        data: [{ id: 1, first_name: 'John', last_name: 'Doe' }],
        total: 1,
      };

      mock.onGet('/api/members', { params: filters }).reply(200, mockMembers);

      const { result } = renderHook(() => useMembers(filters), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockMembers);
    });

    it('should handle fetch error', async () => {
      mock.onGet('/api/members').reply(500, { message: 'Server error' });

      const { result } = renderHook(() => useMembers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('useMember', () => {
    it('should fetch single member', async () => {
      const mockMember = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
      };

      mock.onGet('/api/members/1').reply(200, mockMember);

      const { result } = renderHook(() => useMember(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockMember);
    });

    it('should not fetch when id is not provided', () => {
      const { result } = renderHook(() => useMember(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
    });
  });

  describe('useMemberSearch', () => {
    it('should search members', async () => {
      const mockResults = {
        data: [{ id: 1, first_name: 'John', last_name: 'Doe' }],
      };

      mock.onGet('/api/members/search', { params: { q: 'john' } }).reply(200, mockResults);

      const { result } = renderHook(() => useMemberSearch('john'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockResults);
    });

    it('should not search with empty query', () => {
      const { result } = renderHook(() => useMemberSearch(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
    });
  });

  describe('useCreateMember', () => {
    it('should create a member', async () => {
      const newMember = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        membership_type: 'regular',
      };

      const createdMember = { id: 1, ...newMember };

      mock.onPost('/api/members').reply(200, createdMember);

      const { result } = renderHook(() => useCreateMember(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(newMember);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(createdMember);
    });
  });

  describe('useUpdateMember', () => {
    it('should update a member', async () => {
      const updatedMember = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe Updated',
        email: 'john@example.com',
        phone: '1234567890',
        membership_type: 'regular',
      };

      mock.onPost('/api/members/1').reply(200, updatedMember);

      const { result } = renderHook(() => useUpdateMember(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(updatedMember);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(updatedMember);
    });
  });

  describe('useDeleteMember', () => {
    it('should delete a member', async () => {
      mock.onDelete('/api/members/1').reply(200, { message: 'Member deleted' });

      const { result } = renderHook(() => useDeleteMember(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(1);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual({ message: 'Member deleted' });
    });
  });
});
