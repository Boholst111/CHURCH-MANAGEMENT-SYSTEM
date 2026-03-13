import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../../lib/queryKeys';

// Types
export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  membership_type: string;
  small_group_id?: number;
  small_group?: {
    id: number;
    name: string;
  };
  status: 'active' | 'inactive';
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface MemberFilters {
  search?: string;
  status?: string;
  membership_type?: string;
  small_group_id?: number;
  page?: number;
  per_page?: number;
}

export interface MemberFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  membership_type: string;
  small_group_id?: number;
  photo?: File;
}

// API functions
const fetchMembers = async (filters?: MemberFilters) => {
  const { data } = await axios.get('/api/members', { params: filters });
  return data;
};

const fetchMember = async (id: number | string) => {
  const { data } = await axios.get(`/api/members/${id}`);
  return data;
};

const createMember = async (memberData: MemberFormData) => {
  const formData = new FormData();
  Object.entries(memberData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Convert numbers to strings for FormData
      if (typeof value === 'number') {
        formData.append(key, value.toString());
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });
  const { data } = await axios.post('/api/members', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const updateMember = async ({ id, ...memberData }: MemberFormData & { id: number }) => {
  const formData = new FormData();
  Object.entries(memberData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Convert numbers to strings for FormData
      if (typeof value === 'number') {
        formData.append(key, value.toString());
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });
  formData.append('_method', 'PUT');
  const { data } = await axios.post(`/api/members/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const deleteMember = async (id: number) => {
  const { data } = await axios.delete(`/api/members/${id}`);
  return data;
};

const searchMembers = async (query: string) => {
  const { data } = await axios.get('/api/members/search', { params: { q: query } });
  return data;
};

// Query hooks
export const useMembers = (filters?: MemberFilters) => {
  return useQuery({
    queryKey: queryKeys.members.list(filters),
    queryFn: () => fetchMembers(filters),
  });
};

export const useMember = (id: number | string) => {
  return useQuery({
    queryKey: queryKeys.members.detail(id),
    queryFn: () => fetchMember(id),
    enabled: !!id,
  });
};

export const useMemberSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.members.search(query),
    queryFn: () => searchMembers(query),
    enabled: query.length > 0,
    staleTime: 30000, // 30 seconds
  });
};

// Mutation hooks
export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      // Invalidate and refetch members list
      queryClient.invalidateQueries({ queryKey: queryKeys.members.lists() });
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMember,
    onMutate: async (updatedMember) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.members.detail(updatedMember.id) });

      // Snapshot previous value
      const previousMember = queryClient.getQueryData(queryKeys.members.detail(updatedMember.id));

      // Optimistically update
      queryClient.setQueryData(queryKeys.members.detail(updatedMember.id), updatedMember);

      return { previousMember };
    },
    onError: (err, updatedMember, context) => {
      // Rollback on error
      if (context?.previousMember) {
        queryClient.setQueryData(
          queryKeys.members.detail(updatedMember.id),
          context.previousMember
        );
      }
    },
    onSettled: (data, error, variables) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.members.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.members.lists() });
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      // Invalidate members list
      queryClient.invalidateQueries({ queryKey: queryKeys.members.lists() });
    },
  });
};
