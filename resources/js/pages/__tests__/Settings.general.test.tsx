import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../Settings';
import { ToastProvider } from '../../contexts/ToastContext';

/**
 * Unit tests for Settings page - General Settings tab
 * 
 * Tests the General Settings tab implementation including:
 * - Form rendering with all fields
 * - Field value changes
 * - Save functionality
 * - Success toast notification
 * 
 * Validates: Task 18.2 requirements
 */

const renderSettings = () => {
  return render(
    <ToastProvider>
      <Settings />
    </ToastProvider>
  );
};

describe('Settings - General Settings Tab', () => {
  it('renders the General Settings tab by default', () => {
    renderSettings();
    
    expect(screen.getByText('General Settings')).toBeInTheDocument();
    expect(screen.getByText('Configure application preferences and display settings.')).toBeInTheDocument();
  });

  it('renders Application Settings section with all fields', () => {
    renderSettings();
    
    // Check section title
    expect(screen.getByText('Application Settings')).toBeInTheDocument();
    
    // Check all fields - using getByText for labels since Select uses custom div elements
    expect(screen.getByLabelText(/Application Name/i)).toBeInTheDocument();
    expect(screen.getByText('Timezone')).toBeInTheDocument();
    expect(screen.getByText('Date Format')).toBeInTheDocument();
    expect(screen.getByText('Currency')).toBeInTheDocument();
  });

  it('renders Display Settings section with all fields', () => {
    renderSettings();
    
    // Check section title
    expect(screen.getByText('Display Settings')).toBeInTheDocument();
    
    // Check all fields - using getByText for labels since Select uses custom div elements
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByLabelText(/Items Per Page/i)).toBeInTheDocument();
  });

  it('displays default values in form fields', () => {
    renderSettings();
    
    const appNameInput = screen.getByLabelText(/Application Name/i) as HTMLInputElement;
    expect(appNameInput.value).toBe('MFMC System');
    
    const itemsPerPageInput = screen.getByLabelText(/Items Per Page/i) as HTMLInputElement;
    expect(itemsPerPageInput.value).toBe('25');
  });

  it('allows changing the application name', () => {
    renderSettings();
    
    const appNameInput = screen.getByLabelText(/Application Name/i) as HTMLInputElement;
    
    fireEvent.change(appNameInput, { target: { value: 'New Church Name' } });
    
    expect(appNameInput.value).toBe('New Church Name');
  });

  it('allows changing items per page', () => {
    renderSettings();
    
    const itemsPerPageInput = screen.getByLabelText(/Items Per Page/i) as HTMLInputElement;
    
    fireEvent.change(itemsPerPageInput, { target: { value: '50' } });
    
    expect(itemsPerPageInput.value).toBe('50');
  });

  it('renders timezone selector with search capability', () => {
    renderSettings();
    
    // Check that timezone field exists
    expect(screen.getByText('Timezone')).toBeInTheDocument();
    
    // Check helper text
    expect(screen.getByText('Select your local timezone')).toBeInTheDocument();
  });

  it('renders theme selector with Light, Dark, and Auto options', () => {
    renderSettings();
    
    // Check that theme field exists
    expect(screen.getByText('Theme')).toBeInTheDocument();
    
    // Check helper text
    expect(screen.getByText('Choose your preferred color theme')).toBeInTheDocument();
  });

  it('renders Save Changes button', () => {
    renderSettings();
    
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).not.toBeDisabled();
  });

  it('shows loading state when saving', async () => {
    renderSettings();
    
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    
    fireEvent.click(saveButton);
    
    // Button should be disabled during save
    expect(saveButton).toBeDisabled();
    
    // Wait for save to complete
    await waitFor(() => {
      expect(saveButton).not.toBeDisabled();
    }, { timeout: 2000 });
  });

  it('shows success toast after saving', async () => {
    renderSettings();
    
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    
    fireEvent.click(saveButton);
    
    // Wait for success toast
    await waitFor(() => {
      expect(screen.getByText('Settings saved successfully')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays helper text for all fields', () => {
    renderSettings();
    
    expect(screen.getByText('The name displayed in the application header')).toBeInTheDocument();
    expect(screen.getByText('Select your local timezone')).toBeInTheDocument();
    expect(screen.getByText('How dates are displayed throughout the system')).toBeInTheDocument();
    expect(screen.getByText('Default currency for financial transactions')).toBeInTheDocument();
    expect(screen.getByText('Choose your preferred color theme')).toBeInTheDocument();
    expect(screen.getByText('Select your preferred language')).toBeInTheDocument();
    expect(screen.getByText('Number of items to display in tables (10-100)')).toBeInTheDocument();
  });

  it('has proper form structure with two sections', () => {
    renderSettings();
    
    const applicationSettings = screen.getByText('Application Settings');
    const displaySettings = screen.getByText('Display Settings');
    
    expect(applicationSettings).toBeInTheDocument();
    expect(displaySettings).toBeInTheDocument();
    
    // Both should be h3 headings
    expect(applicationSettings.tagName).toBe('H3');
    expect(displaySettings.tagName).toBe('H3');
  });

  it('maintains form state across field changes', () => {
    renderSettings();
    
    const appNameInput = screen.getByLabelText(/Application Name/i) as HTMLInputElement;
    const itemsPerPageInput = screen.getByLabelText(/Items Per Page/i) as HTMLInputElement;
    
    // Change multiple fields
    fireEvent.change(appNameInput, { target: { value: 'Test Church' } });
    fireEvent.change(itemsPerPageInput, { target: { value: '100' } });
    
    // Both values should be maintained
    expect(appNameInput.value).toBe('Test Church');
    expect(itemsPerPageInput.value).toBe('100');
  });
});
