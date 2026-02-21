import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useToast } from '../../contexts/ToastContext';
import api from '../../lib/api';

/**
 * Notification preferences interface
 */
export interface NotificationPreferences {
  email_notifications: boolean;
  sms_notifications: boolean;
  system_notifications: boolean;
}

/**
 * NotificationToggles Component
 * 
 * Provides toggle switches for managing notification preferences including
 * email notifications, SMS alerts, and system announcements.
 * 
 * Features:
 * - Toggle switches for each notification type
 * - Loads existing preferences on mount
 * - Saves changes to API
 * - Displays success/error messages via toast notifications
 * 
 * Validates Requirements: 6.2
 */
const NotificationToggles: React.FC = () => {
  const { showToast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_notifications: true,
    sms_notifications: false,
    system_notifications: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Load notification preferences on component mount
   */
  useEffect(() => {
    loadNotificationPreferences();
  }, []);

  /**
   * Fetch notification preferences from API
   */
  const loadNotificationPreferences = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/settings/notifications');
      if (response.data.success && response.data.data) {
        setPreferences(response.data.data);
      }
    } catch (error: any) {
      console.error('Failed to load notification preferences:', error);
      showToast('error', 'Failed to load notification preferences');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle toggle change
   */
  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await api.put('/settings/notifications', preferences);
      
      if (response.data.success) {
        showToast('success', 'Notification preferences saved successfully');
      }
    } catch (error: any) {
      console.error('Failed to save notification preferences:', error);
      showToast('error', error.response?.data?.message || 'Failed to save notification preferences');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading notification preferences...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
          <p className="text-sm text-gray-500 mt-1">
            Receive email notifications for important updates and announcements
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleToggle('email_notifications')}
          disabled={isSubmitting}
          className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${preferences.email_notifications ? 'bg-primary-600' : 'bg-gray-200'}
          `}
          role="switch"
          aria-checked={preferences.email_notifications}
          aria-label="Toggle email notifications"
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
              transition duration-200 ease-in-out
              ${preferences.email_notifications ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>

      {/* SMS Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">SMS Alerts</h3>
          <p className="text-sm text-gray-500 mt-1">
            Receive text message alerts for urgent notifications
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleToggle('sms_notifications')}
          disabled={isSubmitting}
          className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${preferences.sms_notifications ? 'bg-primary-600' : 'bg-gray-200'}
          `}
          role="switch"
          aria-checked={preferences.sms_notifications}
          aria-label="Toggle SMS notifications"
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
              transition duration-200 ease-in-out
              ${preferences.sms_notifications ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>

      {/* System Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">System Announcements</h3>
          <p className="text-sm text-gray-500 mt-1">
            Receive in-app notifications for system updates and announcements
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleToggle('system_notifications')}
          disabled={isSubmitting}
          className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${preferences.system_notifications ? 'bg-primary-600' : 'bg-gray-200'}
          `}
          role="switch"
          aria-checked={preferences.system_notifications}
          aria-label="Toggle system notifications"
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
              transition duration-200 ease-in-out
              ${preferences.system_notifications ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </form>
  );
};

export default NotificationToggles;
