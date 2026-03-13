import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../Settings';
import { ToastProvider } from '../../contexts/ToastContext';

/**
 * Settings Page - Email & Notifications Tab Tests
 * 
 * Tests for the Email & Notifications tab functionality including:
 * - SMTP configuration fields
 * - Notification preferences toggles
 * - Notification type toggles
 * - Test email functionality
 * - Form validation and submission
 */

// Mock fetch for API calls
global.fetch = jest.fn();

const renderWithToast = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

// Helper function to navigate to Email & Notifications tab
const navigateToEmailTab = () => {
  const emailTabs = screen.getAllByRole('button', { name: /email & notifications/i });
  fireEvent.click(emailTabs[0]); // Click first match (desktop version)
};

describe('Settings - Email & Notifications Tab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ success: true, data: [] }),
    });
  });

  it('should render email & notifications tab when selected', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    expect(screen.getByRole('heading', { name: /email & notifications/i })).toBeInTheDocument();
    expect(screen.getByText(/configure email settings and notification preferences/i)).toBeInTheDocument();
  });

  it('should display SMTP configuration fields', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    expect(screen.getByText('SMTP Configuration')).toBeInTheDocument();
    expect(screen.getByLabelText(/smtp host/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/smtp port/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/smtp username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/smtp password/i)).toBeInTheDocument();
    expect(screen.getByText(/^Encryption$/i)).toBeInTheDocument(); // Check for label text instead
    expect(screen.getByLabelText(/from email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/from name/i)).toBeInTheDocument();
  });

  it('should allow entering SMTP configuration values', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const hostInput = screen.getByLabelText(/smtp host/i) as HTMLInputElement;
    const portInput = screen.getByLabelText(/smtp port/i) as HTMLInputElement;
    const usernameInput = screen.getByLabelText(/smtp username/i) as HTMLInputElement;
    const fromEmailInput = screen.getByLabelText(/from email/i) as HTMLInputElement;
    
    fireEvent.change(hostInput, { target: { value: 'smtp.gmail.com' } });
    fireEvent.change(portInput, { target: { value: '587' } });
    fireEvent.change(usernameInput, { target: { value: 'test@example.com' } });
    fireEvent.change(fromEmailInput, { target: { value: 'noreply@mfmc.church' } });
    
    expect(hostInput.value).toBe('smtp.gmail.com');
    expect(portInput.value).toBe('587');
    expect(usernameInput.value).toBe('test@example.com');
    expect(fromEmailInput.value).toBe('noreply@mfmc.church');
  });

  it('should toggle password visibility', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const passwordInput = screen.getByLabelText(/smtp password/i) as HTMLInputElement;
    expect(passwordInput.type).toBe('password');
    
    const toggleButton = screen.getByLabelText(/show password/i);
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    const hideButton = screen.getByLabelText(/hide password/i);
    fireEvent.click(hideButton);
    expect(passwordInput.type).toBe('password');
  });

  it('should display notification preferences section', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    expect(screen.getByText('Notification Preferences')).toBeInTheDocument();
    expect(screen.getByLabelText(/email notifications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/in-app notifications/i)).toBeInTheDocument();
  });

  it('should toggle notification preferences', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const emailNotificationsCheckbox = screen.getByLabelText(/email notifications/i) as HTMLInputElement;
    expect(emailNotificationsCheckbox.checked).toBe(true);
    
    fireEvent.click(emailNotificationsCheckbox);
    expect(emailNotificationsCheckbox.checked).toBe(false);
    
    fireEvent.click(emailNotificationsCheckbox);
    expect(emailNotificationsCheckbox.checked).toBe(true);
  });

  it('should display notification type toggles', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    expect(screen.getByText('Notification Types')).toBeInTheDocument();
    expect(screen.getByLabelText(/new member/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event reminder/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/finance approval/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expense submitted/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/offering recorded/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget threshold/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user invite/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/system update/i)).toBeInTheDocument();
  });

  it('should toggle notification types', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const newMemberCheckbox = screen.getByLabelText(/new member/i) as HTMLInputElement;
    expect(newMemberCheckbox.checked).toBe(true);
    
    fireEvent.click(newMemberCheckbox);
    expect(newMemberCheckbox.checked).toBe(false);
    
    fireEvent.click(newMemberCheckbox);
    expect(newMemberCheckbox.checked).toBe(true);
  });

  it('should display test email button', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const testEmailButton = screen.getByRole('button', { name: /send test email/i });
    expect(testEmailButton).toBeInTheDocument();
  });

  it('should disable test email button when SMTP settings are incomplete', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const testEmailButton = screen.getByRole('button', { name: /send test email/i });
    expect(testEmailButton).toBeDisabled();
  });

  it('should enable test email button when SMTP settings are complete', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const hostInput = screen.getByLabelText(/smtp host/i);
    const fromEmailInput = screen.getByLabelText(/from email/i);
    
    fireEvent.change(hostInput, { target: { value: 'smtp.gmail.com' } });
    fireEvent.change(fromEmailInput, { target: { value: 'noreply@mfmc.church' } });
    
    const testEmailButton = screen.getByRole('button', { name: /send test email/i });
    expect(testEmailButton).not.toBeDisabled();
  });

  it('should show loading state when sending test email', async () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const hostInput = screen.getByLabelText(/smtp host/i);
    const fromEmailInput = screen.getByLabelText(/from email/i);
    
    fireEvent.change(hostInput, { target: { value: 'smtp.gmail.com' } });
    fireEvent.change(fromEmailInput, { target: { value: 'noreply@mfmc.church' } });
    
    const testEmailButton = screen.getByRole('button', { name: /send test email/i });
    fireEvent.click(testEmailButton);
    
    expect(testEmailButton).toBeDisabled();
  });

  it('should save email notification settings', async () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const hostInput = screen.getByLabelText(/smtp host/i);
    fireEvent.change(hostInput, { target: { value: 'smtp.gmail.com' } });
    
    const newMemberCheckbox = screen.getByLabelText(/new member/i);
    fireEvent.click(newMemberCheckbox);
    
    const saveButton = screen.getByRole('button', { name: /save changes/i });
    
    // Button should be enabled before clicking
    expect(saveButton).not.toBeDisabled();
    
    fireEvent.click(saveButton);
    
    // Button should be disabled while saving
    expect(saveButton).toBeDisabled();
  });

  it('should display helper text for SMTP fields', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    expect(screen.getByText(/your email server hostname/i)).toBeInTheDocument();
    expect(screen.getByText(/common ports: 587 \(tls\), 465 \(ssl\), 25 \(none\)/i)).toBeInTheDocument();
    expect(screen.getByText(/encryption method for secure connection/i)).toBeInTheDocument();
  });

  it('should display descriptions for notification types', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    expect(screen.getByText(/notify when a new member is added to the system/i)).toBeInTheDocument();
    expect(screen.getByText(/send reminders for upcoming events/i)).toBeInTheDocument();
    expect(screen.getByText(/notify when expenses require approval/i)).toBeInTheDocument();
    expect(screen.getByText(/notify when budget reaches threshold/i)).toBeInTheDocument();
  });

  it('should have proper ARIA labels for accessibility', () => {
    renderWithToast(<Settings />);
    navigateToEmailTab();
    
    const passwordToggle = screen.getByLabelText(/show password/i);
    expect(passwordToggle).toHaveAttribute('aria-label');
  });
});
