import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import Login from '../../pages/Login';
import Members from '../../pages/Members';
import Finance from '../../pages/Finance';
import Reports from '../../pages/Reports';
import ProtectedRoute from '../../components/ProtectedRoute';
import api from '../../lib/api';
import { memberApi } from '../../lib/memberApi';
import { financeApi } from '../../lib/financeApi';
import { reportsApi } from '../../lib/reportsApi';

/**
 * End-to-End Integration Tests
 * 
 * Tests complete user workflows across the church management system:
 * 1. Add member workflow
 * 2. Record tithe workflow
 * 3. Generate report workflow
 * 
 * Validates Requirements: 3.1, 5.1, 11.1
 */

// Mock all API modules
jest.mock('../../lib/api');
jest.mock('../../lib/memberApi');
jest.mock('../../lib/financeApi');
jest.mock('../../lib/reportsApi');

const mockedApi = api as jest.Mocked<typeof api>;
const mockedMemberApi = memberApi as jest.Mocked<typeof memberApi>;
const mockedFinanceApi = financeApi as jest.Mocked<typeof financeApi>;
const mockedReportsApi = reportsApi as jest.Mocked<typeof reportsApi>;

// Mock dashboard hook
jest.mock('../../hooks/useDashboardData', () => ({
  useDashboardData: () => ({
    stats: {
      totalMembers: 150,
      monthlyTithes: 5000,
      upcomingEvents: 3,
      newVisitors: 12,
    },
    attendanceData: [],
    activities: [],
    loading: false,
    error: null,
  }),
}));

describe('End-to-End Integration Tests', () => {
  const mockAdminUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@church.com',
    role: 'admin' as const,
  };

  const mockToken = 'test-token-123';

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Complete Add Member Workflow (Validates Requirement 3.1)', () => {
    it('should complete full workflow: login -> navigate to members -> add member -> verify member appears', async () => {
      // Step 1: Mock login
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: mockAdminUser,
          token: mockToken,
        },
      });

      // Step 2: Mock initial empty member list
      mockedMemberApi.getMembers.mockResolvedValueOnce([]);

      // Step 3: Mock small groups for dropdown
      mockedMemberApi.getSmallGroups = jest.fn().mockResolvedValue([
        { id: 1, name: 'Youth Group' },
        { id: 2, name: 'Adult Fellowship' },
      ]);

      // Step 4: Mock member creation
      const newMember = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'Springfield',
        status: 'active' as const,
        small_group_id: 1,
        date_joined: '2024-01-15',
        birth_date: '1990-05-20',
        gender: 'male' as const,
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
      };

      mockedMemberApi.createMember.mockResolvedValueOnce(newMember);

      // Step 5: Mock updated member list after creation
      mockedMemberApi.getMembers.mockResolvedValueOnce([newMember]);

      // Render the app with routing
      render(
        <MemoryRouter initialEntries={['/login']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/members"
                  element={
                    <ProtectedRoute>
                      <Members />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Step 1: Login
      await waitFor(() => {
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      });

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@church.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe(mockToken);
      });

      // Step 2: Navigate to Members page
      render(
        <MemoryRouter initialEntries={['/members']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/members"
                  element={
                    <ProtectedRoute>
                      <Members />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Step 3: Wait for page to load
      await waitFor(() => {
        expect(screen.getByText('Member Directory')).toBeInTheDocument();
      });

      // Step 4: Click Add Member button
      const addButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Member')).toBeInTheDocument();
      });

      // Step 5: Fill out member form
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Doe' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'john.doe@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '123-456-7890' },
      });
      fireEvent.change(screen.getByLabelText(/address/i), {
        target: { value: '123 Main St' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Springfield' },
      });

      // Step 6: Submit form
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      // Step 7: Verify member was created
      await waitFor(() => {
        expect(mockedMemberApi.createMember).toHaveBeenCalledWith(
          expect.objectContaining({
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
          })
        );
      });

      // Step 8: Verify success message
      await waitFor(() => {
        expect(screen.getByText('Member added successfully')).toBeInTheDocument();
      });

      // Step 9: Verify member appears in list
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });
    });

    it('should handle validation errors during member creation', async () => {
      mockedMemberApi.getMembers.mockResolvedValue([]);
      mockedMemberApi.getSmallGroups = jest.fn().mockResolvedValue([]);

      mockedMemberApi.createMember.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Validation failed',
            errors: {
              email: ['The email has already been taken.'],
            },
          },
        },
      });

      render(
        <MemoryRouter initialEntries={['/members']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/members"
                  element={
                    <ProtectedRoute>
                      <Members />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Member Directory')).toBeInTheDocument();
      });

      const addButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Member')).toBeInTheDocument();
      });

      // Fill form with duplicate email
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Smith' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'existing@example.com' },
      });

      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      // Verify error message is displayed
      await waitFor(() => {
        expect(screen.getByText(/email has already been taken/i)).toBeInTheDocument();
      });
    });
  });

  describe('Complete Record Tithe Workflow (Validates Requirement 5.1)', () => {
    it('should complete full workflow: login -> navigate to finance -> record tithe -> verify tithe recorded', async () => {
      // Mock login
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: mockAdminUser,
          token: mockToken,
        },
      });

      // Mock initial tithe list
      mockedFinanceApi.getTithes.mockResolvedValueOnce([]);

      // Mock members for dropdown
      mockedMemberApi.getMembers.mockResolvedValue([
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          address: '123 Main St',
          city: 'Springfield',
          status: 'active' as const,
          small_group_id: null,
          date_joined: '2024-01-01',
          birth_date: null,
          gender: 'male' as const,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ]);

      // Mock tithe creation
      const newTithe = {
        id: 1,
        member_id: 1,
        amount: 500.00,
        payment_method: 'cash' as const,
        date: '2024-01-15',
        notes: 'Weekly tithe',
        created_at: '2024-01-15T10:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
        member: {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
        },
      };

      mockedFinanceApi.createTithe.mockResolvedValueOnce(newTithe);

      // Mock updated tithe list
      mockedFinanceApi.getTithes.mockResolvedValueOnce([newTithe]);

      // Mock financial summary
      mockedFinanceApi.getFinancialSummary.mockResolvedValue({
        total_tithes: 500.00,
        monthly_average: 500.00,
        yearly_total: 500.00,
      });

      render(
        <MemoryRouter initialEntries={['/finance']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/finance"
                  element={
                    <ProtectedRoute>
                      <Finance />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Wait for page to load
      await waitFor(() => {
        expect(screen.getByText('Financial Management')).toBeInTheDocument();
      });

      // Click Record Tithe button
      const recordButton = screen.getByRole('button', { name: /record tithe/i });
      fireEvent.click(recordButton);

      await waitFor(() => {
        expect(screen.getByText('Record New Tithe')).toBeInTheDocument();
      });

      // Fill out tithe form
      fireEvent.change(screen.getByLabelText(/amount/i), {
        target: { value: '500.00' },
      });
      fireEvent.change(screen.getByLabelText(/date/i), {
        target: { value: '2024-01-15' },
      });
      fireEvent.change(screen.getByLabelText(/payment method/i), {
        target: { value: 'cash' },
      });
      fireEvent.change(screen.getByLabelText(/notes/i), {
        target: { value: 'Weekly tithe' },
      });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /record tithe/i });
      fireEvent.click(submitButton);

      // Verify tithe was created
      await waitFor(() => {
        expect(mockedFinanceApi.createTithe).toHaveBeenCalledWith(
          expect.objectContaining({
            amount: 500.00,
            payment_method: 'cash',
            date: '2024-01-15',
          })
        );
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText('Tithe recorded successfully')).toBeInTheDocument();
      });

      // Verify tithe appears in list
      await waitFor(() => {
        expect(screen.getByText('$500.00')).toBeInTheDocument();
      });
    });

    it('should validate required fields when recording tithe', async () => {
      mockedFinanceApi.getTithes.mockResolvedValue([]);
      mockedMemberApi.getMembers.mockResolvedValue([]);
      mockedFinanceApi.getFinancialSummary.mockResolvedValue({
        total_tithes: 0,
        monthly_average: 0,
        yearly_total: 0,
      });

      render(
        <MemoryRouter initialEntries={['/finance']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/finance"
                  element={
                    <ProtectedRoute>
                      <Finance />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Financial Management')).toBeInTheDocument();
      });

      const recordButton = screen.getByRole('button', { name: /record tithe/i });
      fireEvent.click(recordButton);

      await waitFor(() => {
        expect(screen.getByText('Record New Tithe')).toBeInTheDocument();
      });

      // Try to submit without filling required fields
      const submitButton = screen.getByRole('button', { name: /record tithe/i });
      fireEvent.click(submitButton);

      // Verify validation errors appear
      await waitFor(() => {
        expect(screen.getByText(/amount is required/i)).toBeInTheDocument();
      });
    });
  });

  describe('Complete Generate Report Workflow (Validates Requirement 11.1)', () => {
    it('should complete full workflow: login -> navigate to reports -> generate report -> export data', async () => {
      // Mock login
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: mockAdminUser,
          token: mockToken,
        },
      });

      // Mock report data
      const mockFinancialData = {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'Tithes',
            data: [1000, 1500, 2000],
          },
        ],
      };

      const mockDemographicData = {
        age_distribution: [
          { label: '18-30', value: 25 },
          { label: '31-50', value: 40 },
          { label: '51+', value: 35 },
        ],
        location_distribution: [
          { label: 'Springfield', value: 60 },
          { label: 'Shelbyville', value: 40 },
        ],
      };

      mockedReportsApi.getFinancialReport.mockResolvedValue(mockFinancialData);
      mockedReportsApi.getDemographicReport.mockResolvedValue(mockDemographicData);

      // Mock PDF export
      const mockPdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      mockedReportsApi.exportReportPdf.mockResolvedValue(mockPdfBlob);

      // Mock URL.createObjectURL
      global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
      global.URL.revokeObjectURL = jest.fn();

      // Mock link click
      const mockLink = {
        click: jest.fn(),
        href: '',
        download: '',
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);

      render(
        <MemoryRouter initialEntries={['/reports']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Wait for page to load
      await waitFor(() => {
        expect(screen.getByText('Reports & Analytics')).toBeInTheDocument();
      });

      // Verify report data is loaded
      await waitFor(() => {
        expect(mockedReportsApi.getFinancialReport).toHaveBeenCalled();
        expect(mockedReportsApi.getDemographicReport).toHaveBeenCalled();
      });

      // Click Download PDF button
      const downloadButton = screen.getByRole('button', { name: /download pdf/i });
      fireEvent.click(downloadButton);

      // Verify PDF export was called
      await waitFor(() => {
        expect(mockedReportsApi.exportReportPdf).toHaveBeenCalled();
      });

      // Verify download was triggered
      await waitFor(() => {
        expect(mockLink.click).toHaveBeenCalled();
        expect(mockLink.download).toContain('.pdf');
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/report downloaded successfully/i)).toBeInTheDocument();
      });
    });

    it('should filter report data by date range', async () => {
      const mockFinancialData = {
        labels: ['Jan', 'Feb'],
        datasets: [
          {
            label: 'Tithes',
            data: [1000, 1500],
          },
        ],
      };

      const mockDemographicData = {
        age_distribution: [],
        location_distribution: [],
      };

      mockedReportsApi.getFinancialReport.mockResolvedValue(mockFinancialData);
      mockedReportsApi.getDemographicReport.mockResolvedValue(mockDemographicData);

      render(
        <MemoryRouter initialEntries={['/reports']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Reports & Analytics')).toBeInTheDocument();
      });

      // Change date range
      const startDateInput = screen.getByLabelText(/start date/i);
      const endDateInput = screen.getByLabelText(/end date/i);

      fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2024-02-28' } });

      // Verify API was called with date range
      await waitFor(() => {
        expect(mockedReportsApi.getFinancialReport).toHaveBeenCalledWith(
          expect.objectContaining({
            start_date: '2024-01-01',
            end_date: '2024-02-28',
          })
        );
      });
    });

    it('should handle export errors gracefully', async () => {
      mockedReportsApi.getFinancialReport.mockResolvedValue({
        labels: [],
        datasets: [],
      });
      mockedReportsApi.getDemographicReport.mockResolvedValue({
        age_distribution: [],
        location_distribution: [],
      });

      mockedReportsApi.exportReportPdf.mockRejectedValueOnce(
        new Error('Export failed')
      );

      render(
        <MemoryRouter initialEntries={['/reports']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Reports & Analytics')).toBeInTheDocument();
      });

      const downloadButton = screen.getByRole('button', { name: /download pdf/i });
      fireEvent.click(downloadButton);

      // Verify error message is displayed
      await waitFor(() => {
        expect(screen.getByText(/failed to download report/i)).toBeInTheDocument();
      });
    });
  });
});
