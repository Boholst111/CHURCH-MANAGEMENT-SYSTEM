import api from './api';

/**
 * User interface
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'readonly';
  created_at: string;
  updated_at: string;
}

/**
 * User form data interface
 */
export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'staff' | 'readonly';
}

/**
 * API response interface
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * User API Client
 * 
 * Provides methods for user CRUD operations (admin only)
 */
export const userApi = {
  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  },

  /**
   * Create a new user
   */
  async createUser(data: UserFormData): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/users', data);
    return response.data.data;
  },

  /**
   * Update an existing user
   */
  async updateUser(id: number, data: UserFormData): Promise<User> {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a user
   */
  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  /**
   * Get a single user by ID
   */
  async getUser(id: number): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },
};
