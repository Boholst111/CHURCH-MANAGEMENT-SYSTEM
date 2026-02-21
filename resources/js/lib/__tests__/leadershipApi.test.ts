import { leadershipApi } from '../leadershipApi';
import api from '../api';
import { Leadership, LeadershipFormData } from '../../components/leadership/LeadershipForm';

jest.mock('../api');

describe('leadershipApi', () => {
  const mockApi = api as jest.Mocked<typeof api>;

  const mockLeadership: Leadership = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    role: 'Senior Pastor',
    department: 'Pastoral',
    email: 'john.doe@church.com',
    phone: '123-456-7890',
    photo_url: 'https://example.com/photo.jpg',
    bio: 'A dedicated pastor',
    start_date: '2020-01-15',
  };

  const mockFormData: LeadershipFormData = {
    first_name: 'Jane',
    last_name: 'Smith',
    role: 'Youth Pastor',
    department: 'Youth Ministry',
    email: 'jane.smith@church.com',
    phone: '098-765-4321',
    photo_url: null,
    bio: 'Passionate about youth',
    start_date: '2021-03-10',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLeadership', () => {
    it('should fetch all leadership profiles', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [mockLeadership],
        },
      };
      mockApi.get.mockResolvedValue(mockResponse);

      const result = await leadershipApi.getLeadership();

      expect(mockApi.get).toHaveBeenCalledWith('/leadership');
      expect(result).toEqual([mockLeadership]);
    });

    it('should handle empty leadership list', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
        },
      };
      mockApi.get.mockResolvedValue(mockResponse);

      const result = await leadershipApi.getLeadership();

      expect(result).toEqual([]);
    });
  });

  describe('createLeadership', () => {
    it('should create leadership profile without photo', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: { ...mockFormData, id: 2 } as Leadership,
        },
      };
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await leadershipApi.createLeadership(mockFormData);

      expect(mockApi.post).toHaveBeenCalledWith('/leadership', mockFormData);
      expect(result).toEqual({ ...mockFormData, id: 2 });
    });

    it('should create leadership profile with photo', async () => {
      const photoFile = new File(['photo'], 'photo.jpg', { type: 'image/jpeg' });
      const mockResponse = {
        data: {
          success: true,
          data: { ...mockFormData, id: 2, photo_url: 'https://example.com/new-photo.jpg' } as Leadership,
        },
      };
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await leadershipApi.createLeadership(mockFormData, photoFile);

      expect(mockApi.post).toHaveBeenCalledWith(
        '/leadership',
        expect.any(FormData),
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
      expect(result.photo_url).toBe('https://example.com/new-photo.jpg');
    });
  });

  describe('updateLeadership', () => {
    it('should update leadership profile without photo', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: { ...mockFormData, id: 1 } as Leadership,
        },
      };
      mockApi.put.mockResolvedValue(mockResponse);

      const result = await leadershipApi.updateLeadership(1, mockFormData);

      expect(mockApi.put).toHaveBeenCalledWith('/leadership/1', mockFormData);
      expect(result).toEqual({ ...mockFormData, id: 1 });
    });

    it('should update leadership profile with photo', async () => {
      const photoFile = new File(['photo'], 'photo.jpg', { type: 'image/jpeg' });
      const mockResponse = {
        data: {
          success: true,
          data: { ...mockFormData, id: 1, photo_url: 'https://example.com/updated-photo.jpg' } as Leadership,
        },
      };
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await leadershipApi.updateLeadership(1, mockFormData, photoFile);

      expect(mockApi.post).toHaveBeenCalledWith(
        '/leadership/1',
        expect.any(FormData),
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
      expect(result.photo_url).toBe('https://example.com/updated-photo.jpg');
    });
  });

  describe('deleteLeadership', () => {
    it('should delete leadership profile', async () => {
      mockApi.delete.mockResolvedValue({ data: { success: true } });

      await leadershipApi.deleteLeadership(1);

      expect(mockApi.delete).toHaveBeenCalledWith('/leadership/1');
    });
  });

  describe('getLeadershipById', () => {
    it('should fetch single leadership profile', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: mockLeadership,
        },
      };
      mockApi.get.mockResolvedValue(mockResponse);

      const result = await leadershipApi.getLeadershipById(1);

      expect(mockApi.get).toHaveBeenCalledWith('/leadership/1');
      expect(result).toEqual(mockLeadership);
    });
  });

  describe('Error Handling', () => {
    it('should propagate API errors', async () => {
      const error = new Error('Network error');
      mockApi.get.mockRejectedValue(error);

      await expect(leadershipApi.getLeadership()).rejects.toThrow('Network error');
    });

    it('should handle validation errors on create', async () => {
      const validationError = {
        response: {
          data: {
            success: false,
            errors: {
              email: 'Email already exists',
            },
          },
        },
      };
      mockApi.post.mockRejectedValue(validationError);

      await expect(leadershipApi.createLeadership(mockFormData)).rejects.toEqual(validationError);
    });
  });
});
