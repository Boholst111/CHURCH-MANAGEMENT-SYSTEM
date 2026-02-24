import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardData } from '../useDashboardData';
import { dashboardApi } from '../../lib/dashboardApi';

// Mock the dashboardApi
jest.mock('../../lib/dashboardApi');
const mockedDashboardApi = dashboardApi as jest.Mocked<typeof dashboardApi>;

describe('useDashboardData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const mockStats = {
    total_members: 150,
    monthly_tithes: 5000,
    upcoming_events: 3,
    new_visitors: 12,
    total_offerings: 8000,
    total_expenses: 3000,
    net_income: 5000,
  };

  const mockAttendance = [
    {
      year: 2024,
      month: 1,
      month_name: 'January',
      total_attendance: 450,
      event_count: 5,
      average_attendance: 90,
    },
  ];

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

  it('should fetch dashboard data on mount', async () => {
    mockedDashboardApi.getStats.mockResolvedValueOnce(mockStats);
    mockedDashboardApi.getAttendance.mockResolvedValueOnce(mockAttendance);
    mockedDashboardApi.getActivities.mockResolvedValueOnce(mockActivities);

    const { result } = renderHook(() => useDashboardData());

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.stats).toBeNull();
    expect(result.current.attendance).toEqual([]);
    expect(result.current.activities).toEqual([]);

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.stats).toEqual(mockStats);
    expect(result.current.attendance).toEqual(mockAttendance);
    expect(result.current.activities).toEqual(mockActivities);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors when fetching data', async () => {
    const errorMessage = 'Network error';
    mockedDashboardApi.getStats.mockRejectedValueOnce(new Error(errorMessage));
    mockedDashboardApi.getAttendance.mockResolvedValueOnce(mockAttendance);
    mockedDashboardApi.getActivities.mockResolvedValueOnce(mockActivities);

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.stats).toBeNull();
  });

  it('should refetch data when refetch is called', async () => {
    mockedDashboardApi.getStats.mockResolvedValue(mockStats);
    mockedDashboardApi.getAttendance.mockResolvedValue(mockAttendance);
    mockedDashboardApi.getActivities.mockResolvedValue(mockActivities);

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Clear previous calls
    jest.clearAllMocks();

    // Call refetch
    await result.current.refetch();

    // Verify APIs were called again
    expect(mockedDashboardApi.getStats).toHaveBeenCalledTimes(1);
    expect(mockedDashboardApi.getAttendance).toHaveBeenCalledTimes(1);
    expect(mockedDashboardApi.getActivities).toHaveBeenCalledTimes(1);
  });

  it('should use custom activity limit', async () => {
    mockedDashboardApi.getStats.mockResolvedValueOnce(mockStats);
    mockedDashboardApi.getAttendance.mockResolvedValueOnce(mockAttendance);
    mockedDashboardApi.getActivities.mockResolvedValueOnce(mockActivities);

    renderHook(() => useDashboardData(20));

    await waitFor(() => {
      expect(mockedDashboardApi.getActivities).toHaveBeenCalledWith(20);
    });
  });

  it('should poll for updates every 30 seconds', async () => {
    mockedDashboardApi.getStats.mockResolvedValue(mockStats);
    mockedDashboardApi.getAttendance.mockResolvedValue(mockAttendance);
    mockedDashboardApi.getActivities.mockResolvedValue(mockActivities);

    renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(mockedDashboardApi.getStats).toHaveBeenCalledTimes(1);
    });

    // Clear previous calls
    jest.clearAllMocks();

    // Fast-forward 30 seconds
    jest.advanceTimersByTime(30000);

    await waitFor(() => {
      expect(mockedDashboardApi.getStats).toHaveBeenCalledTimes(1);
      expect(mockedDashboardApi.getAttendance).toHaveBeenCalledTimes(1);
      expect(mockedDashboardApi.getActivities).toHaveBeenCalledTimes(1);
    });
  });

  it('should fetch all data in parallel', async () => {
    let statsResolve: (value: any) => void;
    let attendanceResolve: (value: any) => void;
    let activitiesResolve: (value: any) => void;

    mockedDashboardApi.getStats.mockReturnValueOnce(
      new Promise((resolve) => {
        statsResolve = resolve;
      })
    );
    mockedDashboardApi.getAttendance.mockReturnValueOnce(
      new Promise((resolve) => {
        attendanceResolve = resolve;
      })
    );
    mockedDashboardApi.getActivities.mockReturnValueOnce(
      new Promise((resolve) => {
        activitiesResolve = resolve;
      })
    );

    const { result } = renderHook(() => useDashboardData());

    expect(result.current.loading).toBe(true);

    // Verify all APIs were called immediately (in parallel)
    expect(mockedDashboardApi.getStats).toHaveBeenCalledTimes(1);
    expect(mockedDashboardApi.getAttendance).toHaveBeenCalledTimes(1);
    expect(mockedDashboardApi.getActivities).toHaveBeenCalledTimes(1);

    // Resolve all promises
    statsResolve!(mockStats);
    attendanceResolve!(mockAttendance);
    activitiesResolve!(mockActivities);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.stats).toEqual(mockStats);
    expect(result.current.attendance).toEqual(mockAttendance);
    expect(result.current.activities).toEqual(mockActivities);
  });
});
