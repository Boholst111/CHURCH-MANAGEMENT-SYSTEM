import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../Settings';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the ToastContext
const mockShowToast = jest.fn();
jest.mock('../../contexts/ToastContext', () => {
  const actual = jest.requireActual('../../contexts/ToastContext');
  return {
    ...actual,
    useToast: () => ({ showToast: mockShowToast }),
  };
});

describe('Settings - Church Information Tab', () => {
  beforeEach(() => {
    mockShowToast.mockClear();
  });

  const renderSettings = () => {
    return render(
      <ToastProvider>
        <Settings />
      </ToastProvider>
    );
  };

  const clickChurchInfoTab = () => {
    const churchInfoTabs = screen.getAllByRole('button', { name: /Church Information/i });
    fireEvent.click(churchInfoTabs[0]);
  };

  it('renders Church Information tab when clicked', () => {
    renderSettings();
    clickChurchInfoTab();
    
    const headings = screen.getAllByText('Church Information');
    expect(headings.length).toBeGreaterThan(0);
    expect(screen.getByText(/Manage your church's basic information/i)).toBeInTheDocument();
  });

  it('displays all form sections', () => {
    renderSettings();
    clickChurchInfoTab();
    
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Social Media')).toBeInTheDocument();
    expect(screen.getByText('Branding')).toBeInTheDocument();
  });

  it('displays all basic information fields', () => {
    renderSettings();
    clickChurchInfoTab();
    
    expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Denomination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Founded Year/i)).toBeInTheDocument();
  });

  it('displays all contact information fields', () => {
    renderSettings();
    clickChurchInfoTab();
    
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
  });

  it('displays all social media fields', () => {
    renderSettings();
    clickChurchInfoTab();
    
    expect(screen.getByLabelText(/Facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/YouTube/i)).toBeInTheDocument();
  });

  it('displays branding fields (logo upload and color picker)', () => {
    renderSettings();
    clickChurchInfoTab();
    
    expect(screen.getByText(/Church Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload Logo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Color/i)).toBeInTheDocument();
  });

  it('updates church name when input changes', () => {
    renderSettings();
    clickChurchInfoTab();
    
    const churchNameInput = screen.getByLabelText(/Church Name/i) as HTMLInputElement;
    fireEvent.change(churchNameInput, { target: { value: 'New Church Name' } });
    
    expect(churchNameInput.value).toBe('New Church Name');
  });

  it('updates denomination when input changes', () => {
    renderSettings();
    clickChurchInfoTab();
    
    const denominationInput = screen.getByLabelText(/Denomination/i) as HTMLInputElement;
    fireEvent.change(denominationInput, { target: { value: 'Baptist' } });
    
    expect(denominationInput.value).toBe('Baptist');
  });

  it('updates primary color when color picker changes', () => {
    renderSettings();
    clickChurchInfoTab();
    
    const colorInput = screen.getByLabelText(/Primary Color/i) as HTMLInputElement;
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });
    
    expect(colorInput.value).toBe('#ff0000');
  });

  it('shows success toast when save is successful', async () => {
    renderSettings();
    clickChurchInfoTab();
    
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('success', 'Church information saved successfully');
    }, { timeout: 2000 });
  });

  it('disables save button while saving', async () => {
    renderSettings();
    clickChurchInfoTab();
    
    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    
    // Button should be enabled initially
    expect(saveButton).not.toBeDisabled();
    
    fireEvent.click(saveButton);
    
    // Button should be disabled immediately after click
    expect(saveButton).toBeDisabled();
    
    // Wait for the save operation to complete
    await waitFor(() => {
      expect(saveButton).not.toBeDisabled();
    }, { timeout: 2000 });
  });

  it('displays logo preview when file is uploaded', () => {
    renderSettings();
    clickChurchInfoTab();
    
    const file = new File(['logo'], 'logo.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Upload Logo/i).parentElement?.querySelector('input[type="file"]') as HTMLInputElement;
    
    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onloadend: null as any,
      result: 'data:image/png;base64,mockbase64',
    };
    
    global.FileReader = jest.fn(() => mockFileReader) as any;
    
    fireEvent.change(input, { target: { files: [file] } });
    
    // Trigger onloadend
    if (mockFileReader.onloadend) {
      mockFileReader.onloadend();
    }
    
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);
  });

  it('validates file type on logo upload', () => {
    renderSettings();
    clickChurchInfoTab();
    
    const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/Upload Logo/i).parentElement?.querySelector('input[type="file"]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(mockShowToast).toHaveBeenCalledWith('error', 'Please upload an image file');
  });

  it('validates file size on logo upload', () => {
    renderSettings();
    clickChurchInfoTab();
    
    // Create a file larger than 2MB
    const largeFile = new File(['x'.repeat(3 * 1024 * 1024)], 'large.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Upload Logo/i).parentElement?.querySelector('input[type="file"]') as HTMLInputElement;
    
    fireEvent.change(input, { target: { files: [largeFile] } });
    
    expect(mockShowToast).toHaveBeenCalledWith('error', 'Image size must be less than 2MB');
  });

  it('displays color preview swatches', () => {
    renderSettings();
    clickChurchInfoTab();
    
    expect(screen.getByText(/Preview:/i)).toBeInTheDocument();
  });

  it('has proper input types for fields', () => {
    renderSettings();
    clickChurchInfoTab();
    
    const phoneInput = screen.getByLabelText(/Phone/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const websiteInput = screen.getByLabelText(/Website/i);
    const foundedYearInput = screen.getByLabelText(/Founded Year/i);
    
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(websiteInput).toHaveAttribute('type', 'url');
    expect(foundedYearInput).toHaveAttribute('type', 'number');
  });

  it('displays helper text for all fields', () => {
    renderSettings();
    clickChurchInfoTab();
    
    expect(screen.getByText(/Official name of your church/i)).toBeInTheDocument();
    expect(screen.getByText(/Church denomination or affiliation/i)).toBeInTheDocument();
    expect(screen.getByText(/Year the church was established/i)).toBeInTheDocument();
    expect(screen.getByText(/Physical address of the church/i)).toBeInTheDocument();
    expect(screen.getByText(/Primary contact phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/Primary contact email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Church website URL/i)).toBeInTheDocument();
  });
});
