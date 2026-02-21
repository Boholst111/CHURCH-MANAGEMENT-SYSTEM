import React, { useState } from 'react';
import { Building2, Bell, User } from 'lucide-react';
import { Card } from '../components/ui/card';
import ChurchDetailsForm from '../components/settings/ChurchDetailsForm';
import NotificationToggles from '../components/settings/NotificationToggles';
import ProfileForm from '../components/settings/ProfileForm';

/**
 * Settings Page Component
 * 
 * Provides configuration interface for church settings, notifications, and user profile.
 * 
 * Features:
 * - Tabbed interface for Church Details, Notifications, and Profile sections
 * - Church Details: Configure church name, address, contact info, and service times
 * - Notifications: Toggle email notifications, SMS alerts, and system announcements
 * - Profile: Edit user profile including name, email, and password
 * 
 * Validates Requirements: 6.1, 6.2, 6.3
 */
const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'church' | 'notifications' | 'profile'>('church');

  const tabs = [
    { 
      id: 'church' as const, 
      name: 'Church Details', 
      icon: Building2,
      description: 'Configure church information and service times'
    },
    { 
      id: 'notifications' as const, 
      name: 'Notifications', 
      icon: Bell,
      description: 'Manage notification preferences'
    },
    { 
      id: 'profile' as const, 
      name: 'Profile', 
      icon: User,
      description: 'Update your personal information'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage church settings, notification preferences, and your profile.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  transition-colors duration-150 ease-in-out
                  ${
                    isActive
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon 
                  className={`
                    mr-2 h-5 w-5
                    ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'church' && (
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-primary-600" />
                  Church Details
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Configure your church's basic information and service times.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <ChurchDetailsForm />
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary-600" />
                  Notification Preferences
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Manage how you receive notifications and alerts.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <NotificationToggles />
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary-600" />
                  User Profile
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Update your personal information and account settings.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <ProfileForm />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
