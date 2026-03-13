import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../Settings';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the ToastContext
jest.mock('../../contexts/ToastContext', () => {
  const actual = jest.requireActual('../../contexts/ToastContext');
  return {
    ...actual,
    useToast: () => ({
      showToast: jest.fn(),
    }),
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('Settings - Security Tab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  // Helper function to navigate to Security tab
  const navigateToSecurityTab = () => {
    const securityTabs = screen.getAllByRole('button', { name: /security/i });
    fireEvent.click(securityTabs[0]); // Click desktop version
  };

  it('renders security tab when selected', () => {
    renderWithProviders(<Settings />);
    
    // Click on Security tab
    navigateToSecurityTab();
    
    // Check if security content is displayed
    expect(screen.getByText('Password Policy')).toBeInTheDocument();
    expect(screen.getByText('Session Settings')).toBeInTheDocument();
    expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument();
    expect(screen.getByText('Login Security')).toBeInTheDocument();
    expect(screen.getByText('Security Audit Log')).toBeInTheDocument();
  });

  it('displays password policy settings with default values', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Check password policy fields
    const minLengthInput = screen.getByLabelText(/minimum password length/i);
    expect(minLengthInput).toHaveValue(8);
    
    const expiryInput = screen.getByLabelText(/password expiry/i);
    expect(expiryInput).toHaveValue(90);
    
    // Check complexity requirements checkboxes
    expect(screen.getByLabelText(/require at least one uppercase letter/i)).toBeChecked();
    expect(screen.getByLabelText(/require at least one lowercase letter/i)).toBeChecked();
    expect(screen.getByLabelText(/require at least one number/i)).toBeChecked();
    expect(screen.getByLabelText(/require at least one special character/i)).toBeChecked();
  });

  it('allows updating password policy settings', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Update minimum password length
    const minLengthInput = screen.getByLabelText(/minimum password length/i);
    fireEvent.change(minLengthInput, { target: { value: '12' } });
    expect(minLengthInput).toHaveValue(12);
    
    // Toggle uppercase requirement
    const uppercaseCheckbox = screen.getByLabelText(/require at least one uppercase letter/i);
    fireEvent.click(uppercaseCheckbox);
    expect(uppercaseCheckbox).not.toBeChecked();
  });

  it('displays session timeout configuration', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Check session timeout field
    const sessionTimeoutInput = screen.getByLabelText(/session timeout/i);
    expect(sessionTimeoutInput).toHaveValue(30);
    
    // Check info message
    expect(screen.getByText(/users will be automatically logged out after 30 minutes/i)).toBeInTheDocument();
  });

  it('allows updating session timeout', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Update session timeout
    const sessionTimeoutInput = screen.getByLabelText(/session timeout/i);
    fireEvent.change(sessionTimeoutInput, { target: { value: '60' } });
    expect(sessionTimeoutInput).toHaveValue(60);
    
    // Check updated info message
    expect(screen.getByText(/users will be automatically logged out after 60 minutes/i)).toBeInTheDocument();
  });

  it('displays two-factor authentication toggle', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Check 2FA toggle
    const twoFAToggle = screen.getByLabelText(/enable two-factor authentication/i);
    expect(twoFAToggle).not.toBeChecked();
  });

  it('shows success message when 2FA is enabled', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Enable 2FA
    const twoFAToggle = screen.getByLabelText(/enable two-factor authentication/i);
    fireEvent.click(twoFAToggle);
    expect(twoFAToggle).toBeChecked();
    
    // Check success message appears
    expect(screen.getByText(/two-factor authentication is enabled/i)).toBeInTheDocument();
  });

  it('displays login attempt limits configuration', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Check login attempt fields
    const maxAttemptsInput = screen.getByLabelText(/maximum login attempts/i);
    expect(maxAttemptsInput).toHaveValue(5);
    
    const lockoutDurationInput = screen.getByLabelText(/lockout duration/i);
    expect(lockoutDurationInput).toHaveValue(15);
    
    // Check warning message
    expect(screen.getByText(/after 5 failed login attempts/i)).toBeInTheDocument();
  });

  it('allows updating login attempt limits', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Update max attempts
    const maxAttemptsInput = screen.getByLabelText(/maximum login attempts/i);
    fireEvent.change(maxAttemptsInput, { target: { value: '3' } });
    expect(maxAttemptsInput).toHaveValue(3);
    
    // Update lockout duration
    const lockoutDurationInput = screen.getByLabelText(/lockout duration/i);
    fireEvent.change(lockoutDurationInput, { target: { value: '30' } });
    expect(lockoutDurationInput).toHaveValue(30);
    
    // Check updated warning message
    expect(screen.getByText(/after 3 failed login attempts/i)).toBeInTheDocument();
    expect(screen.getByText(/locked for 30 minutes/i)).toBeInTheDocument();
  });

  it('displays security audit log', async () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Wait for audit logs to load (use getAllByText since there are multiple "Admin User" entries)
    await waitFor(() => {
      expect(screen.getAllByText('Admin User').length).toBeGreaterThan(0);
    });
    
    // Check if audit log entries are displayed
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Successful login')).toBeInTheDocument();
  });

  it('shows refresh button for audit logs', async () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Wait for initial load (use getAllByText since there are multiple "Admin User" entries)
    await waitFor(() => {
      expect(screen.getAllByText('Admin User').length).toBeGreaterThan(0);
    });
    
    // Find and click refresh button
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    expect(refreshButton).toBeInTheDocument();
    fireEvent.click(refreshButton);
  });

  it('displays different badge variants for audit log actions', async () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Wait for audit logs to load (use getAllByText since there are multiple "Admin User" entries)
    await waitFor(() => {
      expect(screen.getAllByText('Admin User').length).toBeGreaterThan(0);
    });
    
    // Check for different action types
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Password Changed')).toBeInTheDocument();
    expect(screen.getByText('Failed Login')).toBeInTheDocument();
    expect(screen.getByText('Account Locked')).toBeInTheDocument();
  });

  it('shows view full activity log button', async () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Wait for audit logs to load (use getAllByText since there are multiple "Admin User" entries)
    await waitFor(() => {
      expect(screen.getAllByText('Admin User').length).toBeGreaterThan(0);
    });
    
    // Check for view full log button
    const viewFullLogButton = screen.getByRole('button', { name: /view full activity log/i });
    expect(viewFullLogButton).toBeInTheDocument();
  });

  it('has save changes button', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Check for save button
    const saveButtons = screen.getAllByRole('button', { name: /save changes/i });
    expect(saveButtons.length).toBeGreaterThan(0);
  });

  it('validates minimum password length range', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Check min/max attributes
    const minLengthInput = screen.getByLabelText(/minimum password length/i);
    expect(minLengthInput).toHaveAttribute('min', '8');
    expect(minLengthInput).toHaveAttribute('max', '32');
  });

  it('validates session timeout range', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Check min/max attributes
    const sessionTimeoutInput = screen.getByLabelText(/session timeout/i);
    expect(sessionTimeoutInput).toHaveAttribute('min', '5');
    expect(sessionTimeoutInput).toHaveAttribute('max', '1440');
  });

  it('validates login attempt limits range', () => {
    renderWithProviders(<Settings />);
    
    // Navigate to Security tab
    navigateToSecurityTab();
    
    // Check min/max attributes
    const maxAttemptsInput = screen.getByLabelText(/maximum login attempts/i);
    expect(maxAttemptsInput).toHaveAttribute('min', '3');
    expect(maxAttemptsInput).toHaveAttribute('max', '10');
    
    const lockoutDurationInput = screen.getByLabelText(/lockout duration/i);
    expect(lockoutDurationInput).toHaveAttribute('min', '5');
    expect(lockoutDurationInput).toHaveAttribute('max', '1440');
  });
});
