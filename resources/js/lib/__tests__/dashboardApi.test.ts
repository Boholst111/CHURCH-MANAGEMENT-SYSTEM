import { dashboardApi } from '../dashboardApi';
import api from '../api';

// Mock the api module
jest.mock('../api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('dashboardApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStats', () => {
    it('should fetch dashboard stats successfully', async () => {
      const mockStats = {
        total_members: 150,
        monthly_tithes: 5000,
        upcoming_events: 3,
        new_visitors: 12,
      };

      mockedApi.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockStats,
        },
      });

      const result = await dashboardApi.getStats();

      expect(mockedApi.get).toHaveBeenCalledWith('/dashboard/stats');
      expect(result).toEqual(mockStats);
    });

    it('should handle errors when fetching stats', async () => {
      mockedApi.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(dashboardApi.getStats()).rejects.toThrow('Network error');
    });
  });

  describe('getAttendance', () => {
    it('should fetch attendance data successfully', async () => {
      const mockAttendance = [
        {
          year: 2024,
          month: 1,
          month_name: 'January',
          total_attendance: 450,
          event_count: 5,
          average_attendance: 90,
        },
        {
          year: 2024,
          month: 2,
          month_name: 'February',
          total_attendance: 480,
          event_count: 6,
          average_attendance: 80,
        },
      ];

      mockedApi.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockAttendance,
        },
      });

      const result = await dashboardApi.getAttendance();

      expect(mockedApi.get).toHaveBeenCalledWith('/dashboard/attendance');
      expect(result).toEqual(mockAttendance);
      expect(result).toHaveLength(2);
    });

    it('should handle empty attendance data', async () => {
      mockedApi.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: [],
        },
      });

      const result = await dashboardApi.getAttendance();

      expect(result).toEqual([]);
    });
  });

  describe('getActivities', () => {
    it('should fetch activities with default limit', async () => {
      const mockActivities = [
        {
          id: 1,
          user_name: 'John Doe',
          action: 'created',
          entity_type: 'member',
          entity_id: 123,
          description: 'created a new member',
          created_at: '2024-01-15T10:30:00Z',
          created_at_human: '2 hours ago',
        },
      ];

      mockedApi.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockActivities,
        },
      });

      const result = await dashboardApi.getActivities();

      expect(mockedApi.get).toHaveBeenCalledWith('/dashboard/activities', {
        params: { limit: 10 },
      });
      expect(result).toEqual(mockActivities);
    });

    it('should fetch activities with custom limit', async () => {
      const mockActivities = [
        {
          id: 1,
          user_name: 'Jane Smith',
          action: 'updated',
          entity_type: 'event',
          entity_id: 456,
          description: 'updated an event',
          created_at: '2024-01-15T09:00:00Z',
          created_at_human: '3 hours ago',
        },
      ];

      mockedApi.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: mockActivities,
        },
      });

      const result = await dashboardApi.getActivities(20);

      expect(mockedApi.get).toHaveBeenCalledWith('/dashboard/activities', {
        params: { limit: 20 },
      });
      expect(result).toEqual(mockActivities);
    });

    it('should handle empty activities list', async () => {
      mockedApi.get.mockResolvedValueOnce({
        data: {
          success: true,
          data: [],
        },
      });

      const result = await dashboardApi.getActivities();

      expect(result).toEqual([]);
    });
  });
});
