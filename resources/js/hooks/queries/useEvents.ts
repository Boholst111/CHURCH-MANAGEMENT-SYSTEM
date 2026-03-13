import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../../lib/queryKeys';

// Types
export interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  category: string;
  capacity?: number;
  registered_count?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface EventFilters {
  search?: string;
  category?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
}

export interface EventFormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  category: string;
  capacity?: number;
  image?: File;
}

// API functions
const fetchEvents = async (filters?: EventFilters) => {
  const { data } = await axios.get('/api/events', { params: filters });
  return data;
};

const fetchEvent = async (id: number | string) => {
  const { data } = await axios.get(`/api/events/${id}`);
  return data;
};

const fetchEventCalendar = async (month?: string, year?: string) => {
  const { data } = await axios.get('/api/events/calendar', { params: { month, year } });
  return data;
};

const createEvent = async (eventData: EventFormData) => {
  const formData = new FormData();
  Object.entries(eventData).forEach(([key, value]) => {
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
  const { data } = await axios.post('/api/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const updateEvent = async ({ id, ...eventData }: EventFormData & { id: number }) => {
  const formData = new FormData();
  Object.entries(eventData).forEach(([key, value]) => {
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
  const { data } = await axios.post(`/api/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const deleteEvent = async (id: number) => {
  const { data } = await axios.delete(`/api/events/${id}`);
  return data;
};

// Query hooks
export const useEvents = (filters?: EventFilters) => {
  return useQuery({
    queryKey: queryKeys.events.list(filters),
    queryFn: () => fetchEvents(filters),
  });
};

export const useEvent = (id: number | string) => {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => fetchEvent(id),
    enabled: !!id,
  });
};

export const useEventCalendar = (month?: string, year?: string) => {
  return useQuery({
    queryKey: queryKeys.events.calendar(month, year),
    queryFn: () => fetchEventCalendar(month, year),
  });
};

// Mutation hooks
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onMutate: async (updatedEvent) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.events.detail(updatedEvent.id) });
      const previousEvent = queryClient.getQueryData(queryKeys.events.detail(updatedEvent.id));
      queryClient.setQueryData(queryKeys.events.detail(updatedEvent.id), updatedEvent);
      return { previousEvent };
    },
    onError: (err, updatedEvent, context) => {
      if (context?.previousEvent) {
        queryClient.setQueryData(
          queryKeys.events.detail(updatedEvent.id),
          context.previousEvent
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all });
    },
  });
};
