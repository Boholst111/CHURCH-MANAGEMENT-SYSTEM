import { activityApi } from '../activityApi';
import api from '../api';

jest.mock('../api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('activityApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getActivities', () => {
    it('fetches activities without filters', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            {
              id: 1,
              user_id: 1,
              user_name: 'John Doe',
              action: 'create',
              entity_type: 'Member',
              entity_id: 10,
              description: 'Created member',
              ip_address: '192.168.1.1',
              created_at: '2024-01-15T10:30:00Z',
              created_at_human: '2 hours ago',
            },
          ],
          pagination: {
            current_page: 1,
            per_page: 50,
            total: 1,
            last_page: 1,
            from: 1,
            to: 1,
          },
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      const result = await activityApi.getActivities();

      expect(mockedApi.get).toHaveBeenCalledWith('/activities');
      expect(result).toEqual(mockResponse.data);
    });

    it('fetches activities with user filter', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
          pagination: {
            current_page: 1,
            per_page: 50,
            total: 0,
            last_page: 1,
            from: null,
            to: null,
          },
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      await activityApi.getActivities({ user_id: 1 });

      expect(mockedApi.get).toHaveBeenCalledWith('/activities?user_id=1');
    });

    it('fetches activities with date range filter', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
          pagination: {
            current_page: 1,
            per_page: 50,
            total: 0,
            last_page: 1,
            from: null,
            to: null,
          },
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      await activityApi.getActivities({
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      });

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/activities?start_date=2024-01-01&end_date=2024-01-31'
      );
    });

    it('fetches activities with multiple filters', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
          pagination: {
            current_page: 1,
            per_page: 50,
            total: 0,
            last_page: 1,
            from: null,
            to: null,
          },
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      await activityApi.getActivities({
        user_id: 1,
        start_date: '2024-01-01',
        end_date: '2024-01-31',
        action: 'create',
        entity_type: 'Member',
        per_page: 25,
        page: 2,
      });

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/activities?user_id=1&start_date=2024-01-01&end_date=2024-01-31&action=create&entity_type=Member&per_page=25&page=2'
      );
    });

    it('handles API errors', async () => {
      const error = new Error('Network error');
      mockedApi.get.mockRejectedValue(error);

      await expect(activityApi.getActivities()).rejects.toThrow('Network error');
    });

    it('omits undefined filter values from query string', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
          pagination: {
            current_page: 1,
            per_page: 50,
            total: 0,
            last_page: 1,
            from: null,
            to: null,
          },
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      await activityApi.getActivities({
        user_id: 1,
        start_date: undefined,
        end_date: undefined,
      });

      expect(mockedApi.get).toHaveBeenCalledWith('/activities?user_id=1');
    });
  });

  describe('getUsers', () => {
    it('fetches list of users', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Admin', email: 'jane@example.com' },
      ];

      const mockResponse = {
        data: {
          success: true,
          data: mockUsers,
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      const result = await activityApi.getUsers();

      expect(mockedApi.get).toHaveBeenCalledWith('/activities/users');
      expect(result).toEqual(mockUsers);
    });

    it('handles API errors', async () => {
      const error = new Error('Network error');
      mockedApi.get.mockRejectedValue(error);

      await expect(activityApi.getUsers()).rejects.toThrow('Network error');
    });
  });
});
