import api from './api';

/**
 * Small Group interface
 */
export interface SmallGroup {
  id: number;
  name: string;
  description: string | null;
  leader_name: string;
  meeting_day: string;
  meeting_time: string;
  location: string;
  member_count?: number;
  created_at: string;
  updated_at: string;
}

/**
 * Small Group API client
 * 
 * Provides methods for interacting with the small groups API endpoints.
 */
export const smallGroupApi = {
  /**
   * Get all small groups
   */
  async getSmallGroups(): Promise<SmallGroup[]> {
    const response = await api.get('/small-groups');
    return response.data.data || [];
  },

  /**
   * Get a single small group by ID
   */
  async getSmallGroup(id: number): Promise<SmallGroup> {
    const response = await api.get(`/small-groups/${id}`);
    return response.data.data;
  },

  /**
   * Create a new small group
   */
  async createSmallGroup(data: Omit<SmallGroup, 'id' | 'created_at' | 'updated_at' | 'member_count'>): Promise<SmallGroup> {
    const response = await api.post('/small-groups', data);
    return response.data.data;
  },

  /**
   * Update an existing small group
   */
  async updateSmallGroup(id: number, data: Partial<Omit<SmallGroup, 'id' | 'created_at' | 'updated_at' | 'member_count'>>): Promise<SmallGroup> {
    const response = await api.put(`/small-groups/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a small group
   */
  async deleteSmallGroup(id: number): Promise<void> {
    await api.delete(`/small-groups/${id}`);
  },
};
