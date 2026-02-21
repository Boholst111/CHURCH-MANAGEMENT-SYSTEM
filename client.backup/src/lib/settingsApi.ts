import api from './api';

/**
 * Church settings data interface
 */
export interface ChurchSettings {
  id: number;
  church_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  service_times: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Church settings form data interface
 */
export interface ChurchSettingsFormData {
  church_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  service_times: string;
}

/**
 * Notification preferences interface
 */
export interface NotificationPreferences {
  email_notifications: boolean;
  sms_notifications: boolean;
  system_notifications: boolean;
}

/**
 * User profile data interface
 */
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Profile update data interface
 */
export interface ProfileUpdateData {
  name: string;
  email: string;
  password?: string;
}

/**
 * API response interface
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Settings API Client
 * 
 * Provides methods for managing church settings, notification preferences, and user profiles.
 * 
 * Validates Requirements: 6.4, 6.5, 6.6
 */
export const settingsApi = {
  /**
   * Get church settings
   * 
   * @returns Promise resolving to church settings data
   * @throws Error if request fails
   */
  async getChurchSettings(): Promise<ChurchSettings> {
    const response = await api.get<ApiResponse<ChurchSettings>>('/settings/church');
    return response.data.data;
  },

  /**
   * Update church settings
   * 
   * @param data - Church settings form data
   * @returns Promise resolving to updated church settings
   * @throws Error if validation fails or request fails
   */
  async updateChurchSettings(data: ChurchSettingsFormData): Promise<ChurchSettings> {
    const response = await api.put<ApiResponse<ChurchSettings>>('/settings/church', data);
    return response.data.data;
  },

  /**
   * Get notification preferences for the authenticated user
   * 
   * @returns Promise resolving to notification preferences
   * @throws Error if request fails
   */
  async getNotificationPreferences(): Promise<NotificationPreferences> {
    const response = await api.get<ApiResponse<NotificationPreferences>>('/settings/notifications');
    return response.data.data;
  },

  /**
   * Update notification preferences for the authenticated user
   * 
   * @param preferences - Notification preferences to update
   * @returns Promise resolving to updated notification preferences
   * @throws Error if request fails
   */
  async updateNotificationPreferences(preferences: NotificationPreferences): Promise<NotificationPreferences> {
    const response = await api.put<ApiResponse<NotificationPreferences>>('/settings/notifications', preferences);
    return response.data.data;
  },

  /**
   * Update user profile
   * 
   * @param data - Profile update data (name, email, optional password)
   * @returns Promise resolving to updated user profile
   * @throws Error if validation fails or request fails
   */
  async updateProfile(data: ProfileUpdateData): Promise<UserProfile> {
    const response = await api.put<ApiResponse<UserProfile>>('/profile', data);
    return response.data.data;
  },
};

