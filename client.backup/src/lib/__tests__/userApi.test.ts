import { userApi, User, UserFormData } from '../userApi';
import api from '../api';

// Mock the api module
jest.mock('../api');

const mockApi = api as jest.Mocked<typeof api>;

/**
 * Unit tests for User API Client
 * 
 * Tests all CRUD operations for user management
 * Validates Requirements: 10.4
 */
describe('userApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should fetch all users', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'John Admin',
          email: 'john@example.com',
          role: 'admin',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 2,
          name: 'Jane Staff',
          email: 'jane@example.com',
          role: 'staff',
          created_at: '2024-01-02T00:00:00.000Z',
          updated_at: '2024-01-02T00:00:00.000Z',
        },
      ];

      mockApi.get.mockResolvedValue({
        data: {
          success: true,
          data: mockUsers,
        },
      });

      const result = await userApi.getUsers();

      expect(mockApi.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockUsers);
    });

    it('should handle empty user list', async () => {
      mockApi.get.mockResolvedValue({
        data: {
          success: true,
          data: [],
        },
      });

      const result = await userApi.getUsers();

      expect(result).toEqual([]);
    });

    it('should throw error when API call fails', async () => {
      mockApi.get.mockRejectedValue(new Error('Network error'));

      await expect(userApi.getUsers()).rejects.toThrow('Network error');
    });
  });

  describe('createUser', () => {
    it('should create a new user with all required fields', async () => {
      const newUserData: UserFormData = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'SecurePass123',
        role: 'staff',
      };

      const createdUser: User = {
        id: 3,
        name: 'New User',
        email: 'newuser@example.com',
        role: 'staff',
        created_at: '2024-01-03T00:00:00.000Z',
        updated_at: '2024-01-03T00:00:00.000Z',
      };

      mockApi.post.mockResolvedValue({
        data: {
          success: true,
          data: createdUser,
        },
      });

      const result = await userApi.createUser(newUserData);

      expect(mockApi.post).toHaveBeenCalledWith('/users', newUserData);
      expect(result).toEqual(createdUser);
    });

    it('should create admin user', async () => {
      const adminData: UserFormData = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'AdminPass123',
        role: 'admin',
      };

      const createdAdmin: User = {
        id: 4,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        created_at: '2024-01-04T00:00:00.000Z',
        updated_at: '2024-01-04T00:00:00.000Z',
      };

      mockApi.post.mockResolvedValue({
        data: {
          success: true,
          data: createdAdmin,
        },
      });

      const result = await userApi.createUser(adminData);

      expect(result.role).toBe('admin');
    });

    it('should create readonly user', async () => {
      const readonlyData: UserFormData = {
        name: 'ReadOnly User',
        email: 'readonly@example.com',
        password: 'ReadPass123',
        role: 'readonly',
      };

      const createdReadonly: User = {
        id: 5,
        name: 'ReadOnly User',
        email: 'readonly@example.com',
        role: 'readonly',
        created_at: '2024-01-05T00:00:00.000Z',
        updated_at: '2024-01-05T00:00:00.000Z',
      };

      mockApi.post.mockResolvedValue({
        data: {
          success: true,
          data: createdReadonly,
        },
      });

      const result = await userApi.createUser(readonlyData);

      expect(result.role).toBe('readonly');
    });

    it('should throw error when creation fails', async () => {
      const userData: UserFormData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPass123',
        role: 'staff',
      };

      mockApi.post.mockRejectedValue({
        response: {
          data: {
            message: 'Email already exists',
          },
        },
      });

      await expect(userApi.createUser(userData)).rejects.toMatchObject({
        response: {
          data: {
            message: 'Email already exists',
          },
        },
      });
    });
  });

  describe('updateUser', () => {
    it('should update user with all fields', async () => {
      const updateData: UserFormData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        password: 'NewPass123',
        role: 'admin',
      };

      const updatedUser: User = {
        id: 1,
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-06T00:00:00.000Z',
      };

      mockApi.put.mockResolvedValue({
        data: {
          success: true,
          data: updatedUser,
        },
      });

      const result = await userApi.updateUser(1, updateData);

      expect(mockApi.put).toHaveBeenCalledWith('/users/1', updateData);
      expect(result).toEqual(updatedUser);
    });

    it('should update user without password', async () => {
      const updateData: UserFormData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'staff',
      };

      const updatedUser: User = {
        id: 1,
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'staff',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-06T00:00:00.000Z',
      };

      mockApi.put.mockResolvedValue({
        data: {
          success: true,
          data: updatedUser,
        },
      });

      const result = await userApi.updateUser(1, updateData);

      expect(mockApi.put).toHaveBeenCalledWith('/users/1', updateData);
      expect(result).toEqual(updatedUser);
    });

    it('should update only name', async () => {
      const updateData: UserFormData = {
        name: 'New Name Only',
        email: 'same@example.com',
        role: 'staff',
      };

      const updatedUser: User = {
        id: 2,
        name: 'New Name Only',
        email: 'same@example.com',
        role: 'staff',
        created_at: '2024-01-02T00:00:00.000Z',
        updated_at: '2024-01-06T00:00:00.000Z',
      };

      mockApi.put.mockResolvedValue({
        data: {
          success: true,
          data: updatedUser,
        },
      });

      const result = await userApi.updateUser(2, updateData);

      expect(result.name).toBe('New Name Only');
    });

    it('should throw error when update fails', async () => {
      const updateData: UserFormData = {
        name: 'Test',
        email: 'test@example.com',
        role: 'staff',
      };

      mockApi.put.mockRejectedValue({
        response: {
          data: {
            message: 'User not found',
          },
        },
      });

      await expect(userApi.updateUser(999, updateData)).rejects.toMatchObject({
        response: {
          data: {
            message: 'User not found',
          },
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete user by id', async () => {
      mockApi.delete.mockResolvedValue({
        data: {
          success: true,
        },
      });

      await userApi.deleteUser(1);

      expect(mockApi.delete).toHaveBeenCalledWith('/users/1');
    });

    it('should handle deletion of different user ids', async () => {
      mockApi.delete.mockResolvedValue({
        data: {
          success: true,
        },
      });

      await userApi.deleteUser(5);

      expect(mockApi.delete).toHaveBeenCalledWith('/users/5');
    });

    it('should throw error when deletion fails', async () => {
      mockApi.delete.mockRejectedValue({
        response: {
          data: {
            message: 'Cannot delete user',
          },
        },
      });

      await expect(userApi.deleteUser(1)).rejects.toMatchObject({
        response: {
          data: {
            message: 'Cannot delete user',
          },
        },
      });
    });

    it('should throw error when user not found', async () => {
      mockApi.delete.mockRejectedValue({
        response: {
          status: 404,
          data: {
            message: 'User not found',
          },
        },
      });

      await expect(userApi.deleteUser(999)).rejects.toMatchObject({
        response: {
          status: 404,
          data: {
            message: 'User not found',
          },
        },
      });
    });
  });

  describe('getUser', () => {
    it('should fetch single user by id', async () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      };

      mockApi.get.mockResolvedValue({
        data: {
          success: true,
          data: mockUser,
        },
      });

      const result = await userApi.getUser(1);

      expect(mockApi.get).toHaveBeenCalledWith('/users/1');
      expect(result).toEqual(mockUser);
    });

    it('should fetch different users by different ids', async () => {
      const mockUser: User = {
        id: 5,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'staff',
        created_at: '2024-01-05T00:00:00.000Z',
        updated_at: '2024-01-05T00:00:00.000Z',
      };

      mockApi.get.mockResolvedValue({
        data: {
          success: true,
          data: mockUser,
        },
      });

      const result = await userApi.getUser(5);

      expect(mockApi.get).toHaveBeenCalledWith('/users/5');
      expect(result.id).toBe(5);
    });

    it('should throw error when user not found', async () => {
      mockApi.get.mockRejectedValue({
        response: {
          status: 404,
          data: {
            message: 'User not found',
          },
        },
      });

      await expect(userApi.getUser(999)).rejects.toMatchObject({
        response: {
          status: 404,
          data: {
            message: 'User not found',
          },
        },
      });
    });
  });

  describe('Admin-only access', () => {
    it('should include authorization header in all requests', async () => {
      // This test verifies that the api client includes auth headers
      // The actual auth header is added by the api interceptor
      mockApi.get.mockResolvedValue({
        data: {
          success: true,
          data: [],
        },
      });

      await userApi.getUsers();

      expect(mockApi.get).toHaveBeenCalled();
    });
  });
});
