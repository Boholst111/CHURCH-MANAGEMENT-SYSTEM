import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChurchDetailsForm from '../ChurchDetailsForm';
import { ToastProvider } from '../../../contexts/ToastContext';
import api from '../../../lib/api';

// Mock the API
jest.mock('../../../lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

/**
 * Test wrapper with ToastProvider
 */
const renderWithToast = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('ChurchDetailsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should display loading state initially', () => {
      mockedApi.get.mockImplementation(() => new Promise(() => {}));
      
      renderWithToast(<ChurchDetailsForm />);
      
      expect(screen.getByText('Loading church settings...')).toBeInTheDocument();
    });

    it('should render all form fields after loading', async () => {
      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: {
            church_name: 'Test Church',
            address: '123 Main St',
            city: 'Test City',
            state: 'Test State',
            zip_code: '12345',
            phone: '123-456-7890',
            email: 'test@church.org',
            website: 'https://testchurch.org',
            service_times: 'Sunday 9:00 AM',
          },
        },
      });

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/State\/Province/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Service Times/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    });

    it('should populate form fields with loaded data', async () => {
      const mockData = {
        church_name: 'Mahayahay Free Methodist Church',
        address: '123 Church Street',
        city: 'Mahayahay',
        state: 'Surigao del Sur',
        zip_code: '8305',
        phone: '+63 123 456 7890',
        email: 'info@mahayahay.org',
        website: 'https://mahayahay.org',
        service_times: 'Sunday Worship: 9:00 AM',
      };

      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: mockData,
        },
      });

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByDisplayValue(mockData.church_name)).toBeInTheDocument();
      });

      expect(screen.getByDisplayValue(mockData.address)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockData.city)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockData.state)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockData.zip_code)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockData.phone)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockData.email)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockData.website)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockData.service_times)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    beforeEach(async () => {
      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: {
            church_name: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            phone: '',
            email: '',
            website: '',
            service_times: '',
          },
        },
      });
    });

    it('should show validation errors for required fields when submitting empty form', async () => {
      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Church name is required')).toBeInTheDocument();
      });

      expect(screen.getByText('Address is required')).toBeInTheDocument();
      expect(screen.getByText('City is required')).toBeInTheDocument();
      expect(screen.getByText('State is required')).toBeInTheDocument();
      expect(screen.getByText('Zip code is required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Service times are required')).toBeInTheDocument();
    });

    it('should validate email format', async () => {
      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/Email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('should validate phone format', async () => {
      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
      });

      const phoneInput = screen.getByLabelText(/Phone Number/i);
      fireEvent.change(phoneInput, { target: { value: 'abc123' } });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
      });
    });

    it('should validate website URL format', async () => {
      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
      });

      const websiteInput = screen.getByLabelText(/Website/i);
      fireEvent.change(websiteInput, { target: { value: 'not-a-url' } });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid URL/i)).toBeInTheDocument();
      });
    });

    it('should clear validation error when user starts typing', async () => {
      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Church name is required')).toBeInTheDocument();
      });

      const churchNameInput = screen.getByLabelText(/Church Name/i);
      fireEvent.change(churchNameInput, { target: { value: 'Test Church' } });

      await waitFor(() => {
        expect(screen.queryByText('Church name is required')).not.toBeInTheDocument();
      });
    });

    it('should validate maximum length for church name', async () => {
      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      const churchNameInput = screen.getByLabelText(/Church Name/i);
      const longName = 'a'.repeat(201);
      fireEvent.change(churchNameInput, { target: { value: longName } });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Church name must be 200 characters or less')).toBeInTheDocument();
      });
    });

    it('should validate maximum length for service times', async () => {
      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Service Times/i)).toBeInTheDocument();
      });

      const serviceTimesInput = screen.getByLabelText(/Service Times/i);
      const longText = 'a'.repeat(501);
      fireEvent.change(serviceTimesInput, { target: { value: longText } });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Service times must be 500 characters or less')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    beforeEach(async () => {
      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: {
            church_name: 'Test Church',
            address: '123 Main St',
            city: 'Test City',
            state: 'Test State',
            zip_code: '12345',
            phone: '123-456-7890',
            email: 'test@church.org',
            website: 'https://testchurch.org',
            service_times: 'Sunday 9:00 AM',
          },
        },
      });
    });

    it('should submit form with valid data', async () => {
      mockedApi.put.mockResolvedValue({
        data: {
          success: true,
          message: 'Church settings saved successfully',
        },
      });

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockedApi.put).toHaveBeenCalledWith('/settings/church', expect.objectContaining({
          church_name: 'Test Church',
          address: '123 Main St',
          city: 'Test City',
          state: 'Test State',
          zip_code: '12345',
          phone: '123-456-7890',
          email: 'test@church.org',
          website: 'https://testchurch.org',
          service_times: 'Sunday 9:00 AM',
        }));
      });
    });

    it('should disable submit button while submitting', async () => {
      mockedApi.put.mockImplementation(() => new Promise(() => {}));

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
        expect(screen.getByText('Saving...')).toBeInTheDocument();
      });
    });

    it('should handle server-side validation errors', async () => {
      mockedApi.put.mockRejectedValue({
        response: {
          data: {
            success: false,
            errors: {
              email: 'Email is already in use',
            },
          },
        },
      });

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email is already in use')).toBeInTheDocument();
      });
    });

    it('should handle network errors gracefully', async () => {
      mockedApi.put.mockRejectedValue({
        response: {
          data: {
            success: false,
            message: 'Network error',
          },
        },
      });

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Data Loading', () => {
    it('should handle API error when loading settings', async () => {
      mockedApi.get.mockRejectedValue(new Error('API Error'));

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      // Form should still render with empty fields
      expect(screen.getByLabelText(/Church Name/i)).toHaveValue('');
    });

    it('should handle empty response data', async () => {
      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: null,
        },
      });

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      // Form should render with empty fields
      expect(screen.getByLabelText(/Church Name/i)).toHaveValue('');
    });
  });

  describe('Field Interactions', () => {
    beforeEach(async () => {
      mockedApi.get.mockResolvedValue({
        data: {
          success: true,
          data: {
            church_name: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            phone: '',
            email: '',
            website: '',
            service_times: '',
          },
        },
      });
    });

    it('should update form data when typing in fields', async () => {
      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      const churchNameInput = screen.getByLabelText(/Church Name/i);
      fireEvent.change(churchNameInput, { target: { value: 'New Church Name' } });

      expect(churchNameInput).toHaveValue('New Church Name');
    });

    it('should allow optional website field to be empty', async () => {
      mockedApi.put.mockResolvedValue({
        data: {
          success: true,
        },
      });

      renderWithToast(<ChurchDetailsForm />);

      await waitFor(() => {
        expect(screen.getByLabelText(/Church Name/i)).toBeInTheDocument();
      });

      // Fill required fields
      fireEvent.change(screen.getByLabelText(/Church Name/i), { target: { value: 'Test Church' } });
      fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main St' } });
      fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Test City' } });
      fireEvent.change(screen.getByLabelText(/State\/Province/i), { target: { value: 'Test State' } });
      fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: '12345' } });
      fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123-456-7890' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@church.org' } });
      fireEvent.change(screen.getByLabelText(/Service Times/i), { target: { value: 'Sunday 9:00 AM' } });

      // Leave website empty
      const websiteInput = screen.getByLabelText(/Website/i);
      expect(websiteInput).toHaveValue('');

      const submitButton = screen.getByRole('button', { name: /Save Changes/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockedApi.put).toHaveBeenCalled();
      });
    });
  });
});
