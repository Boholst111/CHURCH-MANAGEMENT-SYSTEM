import api from './api';
import { Member } from '../components/members/MemberTable';
import { MemberFormData } from '../components/members/MemberForm';
import { ApiResponse } from './types';

/**
 * Member API Client
 * 
 * Provides methods for member CRUD operations
 */
export const memberApi = {
  /**
   * Create a new member
   */
  async createMember(data: MemberFormData): Promise<Member> {
    // If photo is present, use FormData
    if (data.photo) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'photo' && value instanceof File) {
          formData.append('photo', value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });
      
      const response = await api.post<ApiResponse<Member>>('/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    }
    
    // Otherwise, send as JSON
    const response = await api.post<ApiResponse<Member>>('/members', data);
    return response.data.data;
  },

  /**
   * Update an existing member
   */
  async updateMember(id: number, data: MemberFormData): Promise<Member> {
    // If photo is present, use FormData
    if (data.photo) {
      const formData = new FormData();
      formData.append('_method', 'PUT'); // Laravel method spoofing for file uploads
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'photo' && value instanceof File) {
          formData.append('photo', value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });
      
      const response = await api.post<ApiResponse<Member>>(`/members/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    }
    
    // Otherwise, send as JSON
    const response = await api.put<ApiResponse<Member>>(`/members/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a member
   */
  async deleteMember(id: number): Promise<void> {
    await api.delete(`/members/${id}`);
  },

  /**
   * Get a single member by ID
   */
  async getMember(id: number): Promise<Member> {
    const response = await api.get<ApiResponse<Member>>(`/members/${id}`);
    return response.data.data;
  },

  /**
   * Export members to CSV with current filters
   */
  async exportMembers(params: URLSearchParams): Promise<Blob> {
    const response = await api.get(`/members/export?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
