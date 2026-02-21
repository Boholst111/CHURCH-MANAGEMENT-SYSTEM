import api from './api';
import { ApiResponse, DashboardStats, AttendanceData, Activity } from './types';

/**
 * Dashboard API client methods
 */
export const dashboardApi = {
  /**
   * Get dashboard quick stats
   */
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data.data;
  },

  /**
   * Get attendance trends for the past 12 months
   */
  getAttendance: async (): Promise<AttendanceData[]> => {
    const response = await api.get<ApiResponse<AttendanceData[]>>('/dashboard/attendance');
    return response.data.data;
  },

  /**
   * Get recent activities
   * @param limit - Number of activities to fetch (default: 10, max: 50)
   */
  getActivities: async (limit: number = 10): Promise<Activity[]> => {
    const response = await api.get<ApiResponse<Activity[]>>('/dashboard/activities', {
      params: { limit },
    });
    return response.data.data;
  },
};
