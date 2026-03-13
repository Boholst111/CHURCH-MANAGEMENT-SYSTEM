import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../../lib/queryKeys';

// Types
export interface DashboardStats {
  total_members: number;
  upcoming_events: number;
  new_visitors: number;
  active_groups: number;
  member_trend?: number;
  visitor_trend?: number;
}

export interface AttendanceData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface RecentActivity {
  id: number;
  user_id: number;
  user_name: string;
  user_photo?: string;
  action: string;
  module: string;
  description: string;
  created_at: string;
}

export interface UpcomingEvent {
  id: number;
  title: string;
  start_date: string;
  location: string;
  category: string;
}

// API functions
const fetchDashboardStats = async () => {
  const { data } = await axios.get('/api/dashboard/stats');
  return data;
};

const fetchAttendanceData = async (period?: string) => {
  const { data } = await axios.get('/api/dashboard/attendance', { params: { period } });
  return data;
};

const fetchRecentActivity = async (limit: number = 10) => {
  const { data } = await axios.get('/api/dashboard/activity', { params: { limit } });
  return data;
};

const fetchUpcomingEvents = async (limit: number = 5) => {
  const { data } = await axios.get('/api/dashboard/events', { params: { limit } });
  return data;
};

// Query hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: fetchDashboardStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useAttendanceData = (period?: string) => {
  return useQuery({
    queryKey: queryKeys.dashboard.attendance(period),
    queryFn: () => fetchAttendanceData(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRecentActivity = (limit: number = 10) => {
  return useQuery({
    queryKey: queryKeys.dashboard.recentActivity(limit),
    queryFn: () => fetchRecentActivity(limit),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30000, // Refetch every 30 seconds for real-time feel
  });
};

export const useUpcomingEvents = (limit: number = 5) => {
  return useQuery({
    queryKey: queryKeys.dashboard.upcomingEvents(limit),
    queryFn: () => fetchUpcomingEvents(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
