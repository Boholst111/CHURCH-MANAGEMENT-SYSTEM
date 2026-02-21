import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NotificationToggles from '../NotificationToggles';
import { ToastProvider } from '../../../contexts/ToastContext';
import api from '../../../lib/api';

// Mock the API module
jest.mock('../../../lib/api');

const mockedApi = api as jest.Mocked<typeof api>;

/**
 * Helper function to render component with ToastProvider
 */
const renderWithToast = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('NotificationToggles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockedApi.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    renderWithToast(<NotificationToggles />);
    
    expect(screen.getByText('Loading notification preferences...')).toBeInTheDocument();
  });

  it('loads and displays notification preferences', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    });

    // Check that toggles are rendered
    expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    expect(screen.getByText('SMS Alerts')).toBeInTheDocument();
    expect(screen.getByText('System Announcements')).toBeInTheDocument();

    // Check toggle states
    const emailToggle = screen.getByLabelText('Toggle email notifications');
    const smsToggle = screen.getByLabelText('Toggle SMS notifications');
    const systemToggle = screen.getByLabelText('Toggle system notifications');

    expect(emailToggle).toHaveAttribute('aria-checked', 'true');
    expect(smsToggle).toHaveAttribute('aria-checked', 'false');
    expect(systemToggle).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles email notifications when clicked', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    });

    const emailToggle = screen.getByLabelText('Toggle email notifications');
    
    // Initially true
    expect(emailToggle).toHaveAttribute('aria-checked', 'true');
    
    // Click to toggle
    fireEvent.click(emailToggle);
    
    // Should now be false
    expect(emailToggle).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles SMS notifications when clicked', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('SMS Alerts')).toBeInTheDocument();
    });

    const smsToggle = screen.getByLabelText('Toggle SMS notifications');
    
    // Initially false
    expect(smsToggle).toHaveAttribute('aria-checked', 'false');
    
    // Click to toggle
    fireEvent.click(smsToggle);
    
    // Should now be true
    expect(smsToggle).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles system notifications when clicked', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('System Announcements')).toBeInTheDocument();
    });

    const systemToggle = screen.getByLabelText('Toggle system notifications');
    
    // Initially true
    expect(systemToggle).toHaveAttribute('aria-checked', 'true');
    
    // Click to toggle
    fireEvent.click(systemToggle);
    
    // Should now be false
    expect(systemToggle).toHaveAttribute('aria-checked', 'false');
  });

  it('saves preferences when form is submitted', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    mockedApi.put.mockResolvedValue({
      data: {
        success: true,
        message: 'Notification preferences saved successfully',
      },
    } as any);

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    });

    // Toggle email notifications
    const emailToggle = screen.getByLabelText('Toggle email notifications');
    fireEvent.click(emailToggle);

    // Submit form
    const saveButton = screen.getByRole('button', { name: /save preferences/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockedApi.put).toHaveBeenCalledWith('/settings/notifications', {
        email_notifications: false,
        sms_notifications: false,
        system_notifications: true,
      });
    });
  });

  it('displays success message after saving', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    mockedApi.put.mockResolvedValue({
      data: {
        success: true,
        message: 'Notification preferences saved successfully',
      },
    } as any);

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    });

    // Submit form
    const saveButton = screen.getByRole('button', { name: /save preferences/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Notification preferences saved successfully')).toBeInTheDocument();
    });
  });

  it('displays error message when save fails', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    mockedApi.put.mockRejectedValue({
      response: {
        data: {
          message: 'Failed to save preferences',
        },
      },
    });

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    });

    // Submit form
    const saveButton = screen.getByRole('button', { name: /save preferences/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to save preferences')).toBeInTheDocument();
    });
  });

  it('displays error message when loading fails', async () => {
    mockedApi.get.mockRejectedValue({
      response: {
        data: {
          message: 'Failed to load preferences',
        },
      },
    });

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load notification preferences')).toBeInTheDocument();
    });
  });

  it('disables toggles while submitting', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    mockedApi.put.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    });

    // Submit form
    const saveButton = screen.getByRole('button', { name: /save preferences/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    // Check that toggles are disabled
    const emailToggle = screen.getByLabelText('Toggle email notifications');
    const smsToggle = screen.getByLabelText('Toggle SMS notifications');
    const systemToggle = screen.getByLabelText('Toggle system notifications');

    expect(emailToggle).toBeDisabled();
    expect(smsToggle).toBeDisabled();
    expect(systemToggle).toBeDisabled();
  });

  it('renders all toggle descriptions', async () => {
    const mockPreferences = {
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true,
    };

    mockedApi.get.mockResolvedValue({
      data: {
        success: true,
        data: mockPreferences,
      },
    } as any);

    renderWithToast(<NotificationToggles />);

    await waitFor(() => {
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    });

    expect(screen.getByText('Receive email notifications for important updates and announcements')).toBeInTheDocument();
    expect(screen.getByText('Receive text message alerts for urgent notifications')).toBeInTheDocument();
    expect(screen.getByText('Receive in-app notifications for system updates and announcements')).toBeInTheDocument();
  });
});
