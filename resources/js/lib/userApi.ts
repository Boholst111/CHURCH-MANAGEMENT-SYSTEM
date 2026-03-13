import api from './api';
import { ApiResponse } from './types';

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
  role: 'admin' | 'pastor' | 'staff' | 'volunteer' | 'readonly';
}

/**
 * User invitation interface
 */
export interface UserInvitation {
  id: number;
  email: string;
  role: 'admin' | 'pastor' | 'staff' | 'volunteer' | 'readonly';
  status: 'pending' | 'accepted' | 'expired';
  invited_by: string;
  invited_at: string;
  expires_at: string;
}

/**
 * Invite user form data interface
 */
export interface InviteUserFormData {
  email: string;
  role: 'admin' | 'pastor' | 'staff' | 'volunteer' | 'readonly';
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

  /**
   * Invite a new user
   */
  async inviteUser(data: InviteUserFormData): Promise<UserInvitation> {
    const response = await api.post<ApiResponse<UserInvitation>>('/users/invite', data);
    return response.data.data;
  },

  /**
   * Get all pending invitations
   */
  async getInvitations(): Promise<UserInvitation[]> {
    const response = await api.get<ApiResponse<UserInvitation[]>>('/users/invitations');
    return response.data.data;
  },

  /**
   * Resend an invitation
   */
  async resendInvitation(id: number): Promise<UserInvitation> {
    const response = await api.post<ApiResponse<UserInvitation>>(`/users/invitations/${id}/resend`);
    return response.data.data;
  },

  /**
   * Cancel an invitation
   */
  async cancelInvitation(id: number): Promise<void> {
    await api.delete(`/users/invitations/${id}`);
  },
};
