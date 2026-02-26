import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import Members from '../../pages/Members';
import Reports from '../../pages/Reports';
import ProtectedRoute from '../../components/ProtectedRoute';
import { memberApi } from '../../lib/memberApi';
import { reportsApi } from '../../lib/reportsApi';

/**
 * End-to-End Data Export Tests
 * 
 * Tests complete data export workflows:
 * 1. Export member directory as CSV
 * 2. Export filtered member data
 * 3. Export financial reports as PDF
 * 4. Verify file naming and timestamps
 * 
 * Validates Requirements: 11.1, 11.3, 11.5
 */

jest.mock('../../lib/memberApi');
jest.mock('../../lib/reportsApi');

const mockedMemberApi = memberApi as jest.Mocked<typeof memberApi> & {
  getMembers: jest.Mock;
  getSmallGroups: jest.Mock;
};
const mockedReportsApi = reportsApi as jest.Mocked<typeof reportsApi> & {
  exportReportPdf: jest.Mock;
};

describe('End-to-End Data Export Tests', () => {
  const mockAdminUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@church.com',
    role: 'admin' as const,
  };

  const mockMembers = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      city: 'Springfield',
      status: 'active' as const,
      small_group_id: 1,
      date_joined: '2024-01-01',
      birth_date: '1990-01-01',
      gender: 'male' as const,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      small_group: {
        id: 1,
        name: 'Youth Group',
      },
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
      address: '456 Oak Ave',
      city: 'Springfield',
      status: 'visitor' as const,
      small_group_id: null,
      date_joined: '2024-02-01',
      birth_date: '1985-05-15',
      gender: 'female' as const,
      created_at: '2024-02-01T00:00:00Z',
      updated_at: '2024-02-01T00:00:00Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'admin-token');
    localStorage.setItem('user', JSON.stringify(mockAdminUser));

    // Mock URL.createObjectURL and revokeObjectURL
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = jest.fn();

    // Mock Date for consistent timestamps
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2024-01-15T10:30:00.000Z');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('CSV Export Workflow (Validates Requirements 11.1, 11.3)', () => {
    it('should export all members as CSV with correct filename', async () => {
      mockedMemberApi.getMembers.mockResolvedValue(mockMembers);
      mockedMemberApi.getSmallGroups = jest.fn().mockResolvedValue([
        { id: 1, name: 'Youth Group' },
      ]);

      // Mock CSV export
      const mockCsvBlob = new Blob(['CSV content'], { type: 'text/csv' });
      mockedMemberApi.exportMembers = jest.fn().mockResolvedValue(mockCsvBlob);

      // Mock link element
      const mockLink = {
        click: jest.fn(),
        href: '',
        download: '',
        style: {},
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

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

      // Wait for page to load
      await waitFor(() => {
        expect(screen.getByText('Member Directory')).toBeInTheDocument();
      });

      // Click Export CSV button
      const exportButton = screen.getByRole('button', { name: /export csv/i });
      fireEvent.click(exportButton);

      // Verify export was called
      await waitFor(() => {
        expect(mockedMemberApi.exportMembers).toHaveBeenCalled();
      });

      // Verify download was triggered with timestamped filename
      await waitFor(() => {
        expect(mockLink.download).toMatch(/members_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.csv/);
        expect(mockLink.click).toHaveBeenCalled();
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/exported successfully/i)).toBeInTheDocument();
      });
    });

    it('should export filtered members with applied filters', async () => {
      const activeMembers = mockMembers.filter(m => m.status === 'active');
      
      mockedMemberApi.getMembers.mockResolvedValue(activeMembers);
      mockedMemberApi.getSmallGroups = jest.fn().mockResolvedValue([
        { id: 1, name: 'Youth Group' },
      ]);

      const mockCsvBlob = new Blob(['CSV content'], { type: 'text/csv' });
      mockedMemberApi.exportMembers = jest.fn().mockResolvedValue(mockCsvBlob);

      const mockLink = {
        click: jest.fn(),
        href: '',
        download: '',
        style: {},
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

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

      // Apply status filter
      const statusFilter = screen.getByLabelText(/status/i);
      fireEvent.change(statusFilter, { target: { value: 'active' } });

      await waitFor(() => {
        expect(mockedMemberApi.getMembers).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 'active',
          })
        );
      });

      // Export filtered data
      const exportButton = screen.getByRole('button', { name: /export csv/i });
      fireEvent.click(exportButton);

      // Verify export includes filter parameters
      await waitFor(() => {
        expect(mockedMemberApi.exportMembers).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 'active',
          })
        );
      });
    });

    it('should export members with search query applied', async () => {
      const searchResults = mockMembers.filter(m => m.first_name === 'John');
      
      mockedMemberApi.getMembers.mockResolvedValue(searchResults);
      mockedMemberApi.getSmallGroups = jest.fn().mockResolvedValue([]);

      const mockCsvBlob = new Blob(['CSV content'], { type: 'text/csv' });
      mockedMemberApi.exportMembers = jest.fn().mockResolvedValue(mockCsvBlob);

      const mockLink = {
        click: jest.fn(),
        href: '',
        download: '',
        style: {},
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

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

      // Apply search
      const searchInput = screen.getByPlaceholderText(/search members/i);
      fireEvent.change(searchInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(mockedMemberApi.getMembers).toHaveBeenCalledWith(
          expect.objectContaining({
            search: 'John',
          })
        );
      });

      // Export with search
      const exportButton = screen.getByRole('button', { name: /export csv/i });
      fireEvent.click(exportButton);

      await waitFor(() => {
        expect(mockedMemberApi.exportMembers).toHaveBeenCalledWith(
          expect.objectContaining({
            search: 'John',
          })
        );
      });
    });

    it('should handle export errors gracefully', async () => {
      mockedMemberApi.getMembers.mockResolvedValue(mockMembers);
      mockedMemberApi.getSmallGroups = jest.fn().mockResolvedValue([]);
      mockedMemberApi.exportMembers = jest.fn().mockRejectedValue(
        new Error('Export failed')
      );

      const consoleError = jest.spyOn(console, 'error').mockImplementation();

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

      const exportButton = screen.getByRole('button', { name: /export csv/i });
      fireEvent.click(exportButton);

      // Verify error message is displayed
      await waitFor(() => {
        expect(screen.getByText(/failed to export/i)).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });
  });

  describe('PDF Export Workflow (Validates Requirements 11.1, 11.5)', () => {
    it('should export report as PDF with timestamped filename', async () => {
      const mockFinancialData = {
        data: [
          { period: 'Jan', amount: 1000, count: 10 },
          { period: 'Feb', amount: 1500, count: 15 },
          { period: 'Mar', amount: 2000, count: 20 },
        ],
        summary: {
          total_giving: 4500,
          average_giving: 150,
          giving_trend: 10,
          period_start: '2024-01-01',
          period_end: '2024-03-31',
        },
      };

      const mockDemographicData = {
        by_age: { '18-30': 25, '31-50': 40 },
        by_location: { 'Springfield': 100 },
        by_gender: { 'male': 60, 'female': 65 },
        by_status: { 'active': 100, 'visitor': 25 },
        by_small_group: [
          { name: 'Youth Group', count: 30 },
          { name: 'None', count: 95 },
        ],
        total_members: 125,
      };

      mockedReportsApi.getFinancialReport.mockResolvedValue(mockFinancialData);
      mockedReportsApi.getDemographicReport.mockResolvedValue(mockDemographicData);

      const mockPdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      mockedReportsApi.exportReportPdf.mockResolvedValue(mockPdfBlob);

      const mockLink = {
        click: jest.fn(),
        href: '',
        download: '',
        style: {},
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

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

      // Click Download PDF button
      const downloadButton = screen.getByRole('button', { name: /download pdf/i });
      fireEvent.click(downloadButton);

      // Verify PDF export was called
      await waitFor(() => {
        expect(mockedReportsApi.exportReportPdf).toHaveBeenCalled();
      });

      // Verify filename includes timestamp
      await waitFor(() => {
        expect(mockLink.download).toMatch(/report_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.pdf/);
        expect(mockLink.click).toHaveBeenCalled();
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/downloaded successfully/i)).toBeInTheDocument();
      });
    });

    it('should export PDF with date range parameters', async () => {
      mockedReportsApi.getFinancialReport.mockResolvedValue({
        data: [], summary: { total_giving: 0, average_giving: 0, giving_trend: 0, period_start: "", period_end: "" },
      });
      mockedReportsApi.getDemographicReport.mockResolvedValue({
        by_age: {}, by_location: {}, by_gender: {}, by_status: {}, by_small_group: [], total_members: 0,
      });

      const mockPdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      mockedReportsApi.exportReportPdf.mockResolvedValue(mockPdfBlob);

      const mockLink = {
        click: jest.fn(),
        href: '',
        download: '',
        style: {},
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

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

      // Set date range
      const startDateInput = screen.getByLabelText(/start date/i);
      const endDateInput = screen.getByLabelText(/end date/i);

      fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2024-03-31' } });

      // Export PDF
      const downloadButton = screen.getByRole('button', { name: /download pdf/i });
      fireEvent.click(downloadButton);

      // Verify date range is included in export
      await waitFor(() => {
        expect(mockedReportsApi.exportReportPdf).toHaveBeenCalledWith(
          expect.objectContaining({
            start_date: '2024-01-01',
            end_date: '2024-03-31',
          })
        );
      });
    });

    it('should handle PDF export errors', async () => {
      mockedReportsApi.getFinancialReport.mockResolvedValue({
        data: [], summary: { total_giving: 0, average_giving: 0, giving_trend: 0, period_start: "", period_end: "" },
      });
      mockedReportsApi.getDemographicReport.mockResolvedValue({
        by_age: {}, by_location: {}, by_gender: {}, by_status: {}, by_small_group: [], total_members: 0,
      });

      mockedReportsApi.exportReportPdf.mockRejectedValue(
        new Error('PDF generation failed')
      );

      const consoleError = jest.spyOn(console, 'error').mockImplementation();

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

      // Verify error message
      await waitFor(() => {
        expect(screen.getByText(/failed to download/i)).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });
  });

  describe('Export File Naming (Validates Requirement 11.5)', () => {
    it('should include timestamp in CSV filename format YYYY-MM-DD_HH-MM-SS', async () => {
      mockedMemberApi.getMembers.mockResolvedValue(mockMembers);
      mockedMemberApi.getSmallGroups = jest.fn().mockResolvedValue([]);

      const mockCsvBlob = new Blob(['CSV content'], { type: 'text/csv' });
      mockedMemberApi.exportMembers = jest.fn().mockResolvedValue(mockCsvBlob);

      const mockLink = {
        click: jest.fn(),
        href: '',
        download: '',
        style: {},
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

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

      const exportButton = screen.getByRole('button', { name: /export csv/i });
      fireEvent.click(exportButton);

      await waitFor(() => {
        // Verify filename matches pattern: members_YYYY-MM-DD_HH-MM-SS.csv
        expect(mockLink.download).toMatch(/^members_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.csv$/);
      });
    });

    it('should include timestamp in PDF filename format YYYY-MM-DD_HH-MM-SS', async () => {
      mockedReportsApi.getFinancialReport.mockResolvedValue({
        data: [], summary: { total_giving: 0, average_giving: 0, giving_trend: 0, period_start: "", period_end: "" },
      });
      mockedReportsApi.getDemographicReport.mockResolvedValue({
        by_age: {}, by_location: {}, by_gender: {}, by_status: {}, by_small_group: [], total_members: 0,
      });

      const mockPdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      mockedReportsApi.exportReportPdf.mockResolvedValue(mockPdfBlob);

      const mockLink = {
        click: jest.fn(),
        href: '',
        download: '',
        style: {},
      };
      jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

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

      await waitFor(() => {
        // Verify filename matches pattern: report_YYYY-MM-DD_HH-MM-SS.pdf
        expect(mockLink.download).toMatch(/^report_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.pdf$/);
      });
    });
  });
});

