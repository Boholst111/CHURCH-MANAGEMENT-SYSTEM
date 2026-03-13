import api from './api';
import { Leadership, LeadershipFormData } from '../components/leadership/LeadershipForm';
import { ApiResponse } from './types';

/**
 * Leadership API Client
 * 
 * Provides methods for leadership CRUD operations
 */
export const leadershipApi = {
  /**
   * Get all leadership profiles
   */
  async getLeadership(): Promise<Leadership[]> {
    const response = await api.get<ApiResponse<Leadership[]>>('/leadership');
    return response.data.data;
  },

  /**
   * Create a new leadership profile
   */
  async createLeadership(data: LeadershipFormData, photoFile?: File | null): Promise<Leadership> {
    // If there's a photo file, use FormData
    if (photoFile) {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('role', data.role);
      formData.append('department', data.department);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('start_date', data.start_date);
      if (data.bio) {
        formData.append('bio', data.bio);
      }
      formData.append('photo', photoFile);

      const response = await api.post<ApiResponse<Leadership>>('/leadership', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    }

    // Otherwise, send JSON
    const response = await api.post<ApiResponse<Leadership>>('/leadership', data);
    return response.data.data;
  },

  /**
   * Update an existing leadership profile
   */
  async updateLeadership(id: number, data: LeadershipFormData, photoFile?: File | null): Promise<Leadership> {
    // If there's a photo file, use FormData
    if (photoFile) {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('role', data.role);
      formData.append('department', data.department);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('start_date', data.start_date);
      if (data.bio) {
        formData.append('bio', data.bio);
      }
      formData.append('photo', photoFile);
      formData.append('_method', 'PUT'); // Laravel method spoofing

      const response = await api.post<ApiResponse<Leadership>>(`/leadership/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    }

    // Otherwise, send JSON
    const response = await api.put<ApiResponse<Leadership>>(`/leadership/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a leadership profile
   */
  async deleteLeadership(id: number): Promise<void> {
    await api.delete(`/leadership/${id}`);
  },

  /**
   * Get a single leadership profile by ID
   */
  async getLeadershipById(id: number): Promise<Leadership> {
    const response = await api.get<ApiResponse<Leadership>>(`/leadership/${id}`);
    return response.data.data;
  },
};
