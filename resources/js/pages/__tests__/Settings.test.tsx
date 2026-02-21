import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Settings from '../Settings';

/**
 * Settings Page Unit Tests
 * 
 * Tests the Settings page structure and tab navigation functionality.
 * 
 * Validates Requirements: 6.1, 6.2, 6.3
 */

const renderSettings = () => {
  return render(
    <BrowserRouter>
      <Settings />
    </BrowserRouter>
  );
};

describe('Settings Page', () => {
  describe('Page Structure', () => {
    it('should render the page title and description', () => {
      renderSettings();
      
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText(/Manage church settings, notification preferences, and your profile/i)).toBeInTheDocument();
    });

    it('should render all three tabs', () => {
      renderSettings();
      
      expect(screen.getByRole('button', { name: /Church Details/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Notifications/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Profile/i })).toBeInTheDocument();
    });

    it('should display Church Details tab as active by default', () => {
      renderSettings();
      
      const churchTab = screen.getByRole('button', { name: /Church Details/i });
      expect(churchTab).toHaveClass('border-primary-500');
      expect(churchTab).toHaveClass('text-primary-600');
    });
  });

  describe('Tab Navigation', () => {
    it('should switch to Notifications tab when clicked', () => {
      renderSettings();
      
      const notificationsTab = screen.getByRole('button', { name: /Notifications/i });
      fireEvent.click(notificationsTab);
      
      expect(notificationsTab).toHaveClass('border-primary-500');
      expect(screen.getByText('Notification Preferences')).toBeInTheDocument();
    });

    it('should switch to Profile tab when clicked', () => {
      renderSettings();
      
      const profileTab = screen.getByRole('button', { name: /Profile/i });
      fireEvent.click(profileTab);
      
      expect(profileTab).toHaveClass('border-primary-500');
      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    it('should switch back to Church Details tab', () => {
      renderSettings();
      
      // Switch to Profile
      const profileTab = screen.getByRole('button', { name: /Profile/i });
      fireEvent.click(profileTab);
      
      // Switch back to Church Details
      const churchTab = screen.getByRole('button', { name: /Church Details/i });
      fireEvent.click(churchTab);
      
      expect(churchTab).toHaveClass('border-primary-500');
      expect(screen.getByText(/Configure your church's basic information and service times/i)).toBeInTheDocument();
    });
  });

  describe('Tab Content', () => {
    it('should display Church Details content', () => {
      renderSettings();
      
      expect(screen.getByRole('heading', { name: /Church Details/i })).toBeInTheDocument();
      expect(screen.getByText(/Configure your church's basic information and service times/i)).toBeInTheDocument();
    });

    it('should display Notifications content when tab is active', () => {
      renderSettings();
      
      const notificationsTab = screen.getByRole('button', { name: /Notifications/i });
      fireEvent.click(notificationsTab);
      
      expect(screen.getByText('Notification Preferences')).toBeInTheDocument();
      expect(screen.getByText(/Manage how you receive notifications and alerts/i)).toBeInTheDocument();
    });

    it('should display Profile content when tab is active', () => {
      renderSettings();
      
      const profileTab = screen.getByRole('button', { name: /Profile/i });
      fireEvent.click(profileTab);
      
      expect(screen.getByText('User Profile')).toBeInTheDocument();
      expect(screen.getByText(/Update your personal information and account settings/i)).toBeInTheDocument();
    });
  });

  describe('Visual Indicators', () => {
    it('should show icons for each tab', () => {
      renderSettings();
      
      const tabs = screen.getAllByRole('button');
      // Each tab should have an icon (svg element)
      tabs.forEach(tab => {
        expect(tab.querySelector('svg')).toBeInTheDocument();
      });
    });

    it('should highlight only the active tab', () => {
      renderSettings();
      
      const churchTab = screen.getByRole('button', { name: /Church Details/i });
      const notificationsTab = screen.getByRole('button', { name: /Notifications/i });
      const profileTab = screen.getByRole('button', { name: /Profile/i });
      
      // Initially, Church Details should be active
      expect(churchTab).toHaveClass('border-primary-500');
      expect(notificationsTab).not.toHaveClass('border-primary-500');
      expect(profileTab).not.toHaveClass('border-primary-500');
      
      // Click Notifications
      fireEvent.click(notificationsTab);
      
      expect(churchTab).not.toHaveClass('border-primary-500');
      expect(notificationsTab).toHaveClass('border-primary-500');
      expect(profileTab).not.toHaveClass('border-primary-500');
    });
  });
});
