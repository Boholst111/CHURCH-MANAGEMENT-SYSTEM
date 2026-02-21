import api from './api';

export interface Activity {
  id: number;
  user_id: number;
  user_name: string;
  action: string;
  entity_type: string;
  entity_id: number | null;
  description: string;
  ip_address: string | null;
  created_at: string;
  created_at_human: string;
}

export interface ActivityFilters {
  user_id?: number;
  start_date?: string;
  end_date?: string;
  action?: string;
  entity_type?: string;
  per_page?: number;
  page?: number;
}

export interface ActivityResponse {
  success: boolean;
  data: Activity[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
  };
}

export interface UserOption {
  id: number;
  name: string;
  email: string;
}

export const activityApi = {
  /**
   * Get paginated activities with optional filters
   */
  getActivities: async (filters?: ActivityFilters): Promise<ActivityResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.user_id) {
      params.append('user_id', filters.user_id.toString());
    }
    
    if (filters?.start_date) {
      params.append('start_date', filters.start_date);
    }
    
    if (filters?.end_date) {
      params.append('end_date', filters.end_date);
    }
    
    if (filters?.action) {
      params.append('action', filters.action);
    }
    
    if (filters?.entity_type) {
      params.append('entity_type', filters.entity_type);
    }
    
    if (filters?.per_page) {
      params.append('per_page', filters.per_page.toString());
    }
    
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    
    const queryString = params.toString();
    const url = queryString ? `/activities?${queryString}` : '/activities';
    
    const response = await api.get<ActivityResponse>(url);
    return response.data;
  },

  /**
   * Get list of users for filter dropdown
   */
  getUsers: async (): Promise<UserOption[]> => {
    const response = await api.get<{ success: boolean; data: UserOption[] }>('/activities/users');
    return response.data.data;
  },
};
