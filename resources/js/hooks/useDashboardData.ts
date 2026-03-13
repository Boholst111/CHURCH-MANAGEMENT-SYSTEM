import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../lib/dashboardApi';
import { DashboardStats, AttendanceData, Activity, UpcomingEvent } from '../lib/types';

interface UseDashboardDataReturn {
  stats: DashboardStats | null;
  attendance: AttendanceData[];
  activities: Activity[];
  upcomingEvents: UpcomingEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for managing dashboard data fetching and state
 * Implements loading states, error handling, and real-time updates
 */
export const useDashboardData = (activityLimit: number = 10): UseDashboardDataReturn => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [attendance, setAttendance] = useState<AttendanceData[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all dashboard data
   */
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [statsData, attendanceData, activitiesData, eventsData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getAttendance(),
        dashboardApi.getActivities(activityLimit),
        dashboardApi.getUpcomingEvents(5),
      ]);

      setStats(statsData);
      setAttendance(attendanceData);
      setActivities(activitiesData);
      setUpcomingEvents(eventsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError(errorMessage);
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [activityLimit]);

  /**
   * Initial data fetch on mount
   */
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  /**
   * Set up polling for real-time updates
   * Refetch data every 30 seconds
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [fetchDashboardData]);

  return {
    stats,
    attendance,
    activities,
    upcomingEvents,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};
