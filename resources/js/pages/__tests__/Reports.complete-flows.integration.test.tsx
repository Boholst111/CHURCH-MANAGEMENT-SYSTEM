/**
 * Complete Integration Tests: Finance Reports Consolidation
 * 
 * Feature: finance-reports-consolidation
 * Task 9.4: Write integration tests for complete flows
 * 
 * This test suite consolidates all integration tests from tasks 9.1, 9.2, and 9.3
 * into a single comprehensive test file that covers:
 * 
 * 1. End-to-end report generation flow (Task 9.1)
 * 2. Error flow with server errors (Task 9.2)
 * 3. Navigation consolidation (Task 9.3)
 * 
 * Requirements: 2.3, 2.4, 6.1, 6.2, 1.5, 2.1
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Finance from '../Finance';
import Reports from '../Reports';
import { ToastProvider } from '../../contexts/ToastContext';

// Helper function to render with ToastProvider
const renderWithToast = (component: React.ReactElement) => {
  return render(<ToastProvider>{component}</ToastProvider>);
};

// Mock the lazy-loaded Finance components
jest.mock('../Finance/Overview', () => ({
  __esModule: true,
  default: () => <div data-testid="finance-overview">Finance Overview</div>
}));

jest.mock('../Finance/Offerings', () => ({
  __esModule: true,
  default: () => <div data-testid="finance-offerings">Offerings</div>
}));

jest.mock('../Finance/Expenses', () => ({
  __esModule: true,
  default: () => <div data-testid="finance-expenses">Expenses</div>
}));

jest.mock('../Finance/Budgets', () => ({
  __esModule: true,
  default: () => <div data-testid="finance-budgets">Budgets</div>
}));

jest.mock('../Finance/Settings', () => ({
  __esModule: true,
  default: () => <div data-testid="finance-settings">Settings</div>
}));

// Mock URL.createObjectURL and revokeObjectURL globally
const mockCreateObjectURL = jest.fn();
const mockRevokeObjectURL = jest.fn();
global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(() => 'mock-token'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

// Mock console.error to verify error logging
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

// Mock ToastContext for error messages
const mockShowToast = jest.fn();
jest.mock('../../contexts/ToastContext', () => ({
  ...jest.requireActual('../../contexts/ToastContext'),
  useToast: () => ({
    showToast: mockShowToast
  }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('Finance Reports Consolidation - Complete Integration Tests', () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    mockCreateObjectURL.mockReturnValue('blob:mock-url');

    // Mock successful PDF response by default
    mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/pdf' }),
        blob: () => Promise.resolve(new Blob(['mock-pdf-content'], { type: 'application/pdf' }))
      } as Response)
    );
    global.fetch = mockFetch;
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  /**
   * FLOW 1: End-to-End Report Generation
   * 
   * Tests from Task 9.1
   * Requirements: 2.3, 2.4, 3.1, 3.2, 3.3, 4.1
   */
  describe('Flow 1: End-to-End Report Generation', () => {
    it('completes full report generation flow: navigate, click, select, submit, download, close', async () => {
      // Requirement 2.3: Modal opens when clicking report card
      renderWithToast(<Reports />);

      expect(screen.getByText('Reports')).toBeInTheDocument();
      expect(screen.getByText('Financial Reports')).toBeInTheDocument();

      // Click Generate on Income Statement
      const incomeStatementCard = screen.getByText('Income Statement').closest('.bg-white');
      const generateButton = incomeStatementCard?.querySelector('button');
      
      expect(generateButton).toBeInTheDocument();
      fireEvent.click(generateButton!);

      // Verify modal opens
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });

      // Select date range and format
      const dateRangeSelect = screen.getByLabelText(/Date Range/);
      fireEvent.change(dateRangeSelect, { target: { value: 'this_month' } });

      const formatSelect = screen.getByLabelText(/Export Format/);
      fireEvent.change(formatSelect, { target: { value: 'pdf' } });

      // Submit the form
      const generateReportButton = screen.getByText('Generate Report');
      fireEvent.click(generateReportButton);

      // Verify API call with correct parameters
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/reports/income-statement'),
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              'Accept': 'application/pdf',
              'Authorization': 'Bearer mock-token'
            })
          })
        );
      });

      // Verify blob URL was created (download triggered)
      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalled();
      });

      // Verify blob URL was revoked (cleanup)
      await waitFor(() => {
        expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
      });

      // Requirement 2.4: Modal closes after generation
      await waitFor(() => {
        expect(screen.queryByText('Generate Income Statement')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('generates report with custom date range', async () => {
      renderWithToast(<Reports />);

      // Open Balance Sheet modal
      const balanceSheetCard = screen.getByText('Balance Sheet').closest('.bg-white');
      const generateButton = balanceSheetCard?.querySelector('button');
      fireEvent.click(generateButton!);

      await waitFor(() => {
        expect(screen.getByText('Generate Balance Sheet')).toBeInTheDocument();
      });

      // Select custom date range
      const dateRangeSelect = screen.getByLabelText(/Date Range/);
      fireEvent.change(dateRangeSelect, { target: { value: 'custom' } });

      // Wait for custom date fields
      await waitFor(() => {
        expect(screen.getByLabelText(/Start Date/)).toBeInTheDocument();
      });

      // Fill in custom dates
      const startDateInput = screen.getByLabelText(/Start Date/);
      const endDateInput = screen.getByLabelText(/End Date/);
      
      fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2024-01-31' } });

      // Submit
      const generateReportButton = screen.getByText('Generate Report');
      fireEvent.click(generateReportButton);

      // Verify API call with custom dates
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('start_date=2024-01-01'),
          expect.any(Object)
        );
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('end_date=2024-01-31'),
          expect.any(Object)
        );
      });

      // Verify download completed
      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalled();
        expect(mockRevokeObjectURL).toHaveBeenCalled();
      });
    });

    it('generates all 6 financial report types successfully', async () => {
      const financialReports = [
        { title: 'Income Statement', backendType: 'income-statement' },
        { title: 'Balance Sheet', backendType: 'financial-summary' },
        { title: 'Budget Variance Report', backendType: 'budget-variance' },
        { title: 'Fund Balance Report', backendType: 'fund-balance' },
        { title: 'Offering Summary', backendType: 'donor-giving' },
        { title: 'Expense Report', backendType: 'expense-report' }
      ];

      for (const report of financialReports) {
        mockFetch.mockClear();
        mockCreateObjectURL.mockClear();
        mockRevokeObjectURL.mockClear();

        const { unmount } = renderWithToast(<Reports />);

        // Find and click the report's Generate button
        const reportCard = screen.getByText(report.title).closest('.bg-white');
        const generateButton = reportCard?.querySelector('button');
        fireEvent.click(generateButton!);

        await waitFor(() => {
          expect(screen.getByText(`Generate ${report.title}`)).toBeInTheDocument();
        });

        // Submit with default settings
        const generateReportButton = screen.getByText('Generate Report');
        fireEvent.click(generateReportButton);

        // Verify correct backend endpoint
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining(`/api/reports/${report.backendType}`),
            expect.any(Object)
          );
        });

        // Verify download completed
        await waitFor(() => {
          expect(mockCreateObjectURL).toHaveBeenCalled();
          expect(mockRevokeObjectURL).toHaveBeenCalled();
        });

        unmount();
      }
    });

    it('displays loading indicator during generation', async () => {
      // Mock delayed response
      mockFetch.mockImplementation(() =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/pdf' }),
                blob: () => Promise.resolve(new Blob(['mock-pdf'], { type: 'application/pdf' }))
              } as Response),
            100
          )
        )
      );

      renderWithToast(<Reports />);

      // Open modal and submit
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/Generate Income Statement/)).toBeInTheDocument();
      });

      const generateReportButton = screen.getByText('Generate Report');
      fireEvent.click(generateReportButton);

      // Verify loading state appears
      await waitFor(() => {
        expect(screen.getByText('Generating...')).toBeInTheDocument();
      });

      // Verify loading state disappears after completion
      await waitFor(() => {
        expect(screen.queryByText('Generating...')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  /**
   * FLOW 2: Error Handling
   * 
   * Tests from Task 9.2
   * Requirements: 6.1, 6.2, 6.3, 6.4
   */
  describe('Flow 2: Error Handling with Server Errors', () => {
    it('handles 500 error, displays message, and allows retry (Requirement 6.1)', async () => {
      // Mock 500 response for first attempt
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        headers: {
          get: () => null,
        },
      });

      renderWithToast(<Reports />);

      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/Generate Income Statement/i)).toBeInTheDocument();
      });

      // Submit to trigger error
      const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });
      fireEvent.click(generateReportButton);

      // Verify error message
      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', 'Server error. Please try again later.');
      }, { timeout: 3000 });

      // Verify error was logged
      expect(mockConsoleError).toHaveBeenCalled();

      // Verify modal is still open (user can retry)
      expect(screen.getByText(/Generate Income Statement/i)).toBeInTheDocument();

      // Mock successful response for retry
      const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      Object.defineProperty(mockBlob, 'size', { value: 1024 });
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/pdf' : null,
        },
        blob: async () => mockBlob,
      });

      // Retry
      mockShowToast.mockClear();
      fireEvent.click(generateReportButton);

      // Verify successful download
      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
      }, { timeout: 3000 });

      // Verify no error on retry
      expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));
    });

    it('handles 404 error and allows retry with different date range (Requirement 6.2)', async () => {
      // Mock 404 response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        headers: {
          get: () => null,
        },
      });

      renderWithToast(<Reports />);

      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[1]);

      await waitFor(() => {
        expect(screen.getByText(/Generate Balance Sheet/i)).toBeInTheDocument();
      });

      // Select custom date range
      const dateRangeSelect = screen.getByLabelText(/Date Range/i);
      fireEvent.change(dateRangeSelect, { target: { value: 'custom' } });

      await waitFor(() => {
        expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
      });

      // Set invalid date range
      const startDateInput = screen.getByLabelText(/Start Date/i);
      const endDateInput = screen.getByLabelText(/End Date/i);
      fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2025-01-31' } });

      // Submit to trigger 404
      const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });
      fireEvent.click(generateReportButton);

      // Verify error message
      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', 'Report not found. Please check your date range.');
      }, { timeout: 3000 });

      // Change to valid date range
      fireEvent.change(dateRangeSelect, { target: { value: 'this_month' } });

      // Mock successful response
      const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      Object.defineProperty(mockBlob, 'size', { value: 1024 });
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/pdf' : null,
        },
        blob: async () => mockBlob,
      });

      // Retry
      mockShowToast.mockClear();
      fireEvent.click(generateReportButton);

      // Verify successful download
      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
      }, { timeout: 3000 });
    });

    it('handles network error and allows retry (Requirement 6.4)', async () => {
      // Mock network error
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      renderWithToast(<Reports />);

      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[2]);

      await waitFor(() => {
        expect(screen.getByText(/Generate Budget Variance Report/i)).toBeInTheDocument();
      });

      // Submit to trigger network error
      const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });
      fireEvent.click(generateReportButton);

      // Verify network error message
      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', 'Network error. Please check your connection and try again.');
      }, { timeout: 3000 });

      // Verify modal is still open
      expect(screen.getByText(/Generate Budget Variance Report/i)).toBeInTheDocument();

      // Mock successful response for retry
      const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      Object.defineProperty(mockBlob, 'size', { value: 1024 });
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/pdf' : null,
        },
        blob: async () => mockBlob,
      });

      // Retry
      mockShowToast.mockClear();
      fireEvent.click(generateReportButton);

      // Verify successful download
      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
      }, { timeout: 3000 });

      // Verify modal closes
      await waitFor(() => {
        expect(screen.queryByText(/Generate Budget Variance Report/i)).not.toBeInTheDocument();
      });
    });

    it('allows multiple retry attempts after consecutive errors', async () => {
      renderWithToast(<Reports />);

      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[3]);

      await waitFor(() => {
        expect(screen.getByText(/Generate Fund Balance Report/i)).toBeInTheDocument();
      });

      const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });

      // First attempt - 500 error
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        headers: { get: () => null },
      });

      fireEvent.click(generateReportButton);

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', 'Server error. Please try again later.');
      }, { timeout: 3000 });

      // Second attempt - network error
      mockShowToast.mockClear();
      mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      fireEvent.click(generateReportButton);

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', 'Network error. Please check your connection and try again.');
      }, { timeout: 3000 });

      // Third attempt - success
      mockShowToast.mockClear();
      const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      Object.defineProperty(mockBlob, 'size', { value: 1024 });
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/pdf' : null,
        },
        blob: async () => mockBlob,
      });

      fireEvent.click(generateReportButton);

      // Verify successful download
      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
      }, { timeout: 3000 });

      // Verify no error on success
      expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));
    });
  });

  /**
   * FLOW 3: Navigation Consolidation
   * 
   * Tests from Task 9.3
   * Requirements: 1.5, 2.1, 2.2, 2.3
   */
  describe('Flow 3: Navigation Consolidation', () => {
    it('verifies Finance section does NOT display Reports tab (Requirement 1.5)', async () => {
      render(<Finance />);

      await waitFor(() => {
        expect(screen.getByText('Finance')).toBeInTheDocument();
      });

      // Verify Reports tab is NOT present
      const tabs = screen.getAllByRole('button').filter(button => 
        button.className.includes('border-b-2')
      );

      const tabLabels = tabs.map(tab => tab.textContent);
      
      expect(tabLabels).not.toContain('Reports');
      expect(tabLabels).toHaveLength(5);
    });

    it('verifies Finance section displays exactly 5 tabs (Requirement 1.5)', async () => {
      render(<Finance />);

      await waitFor(() => {
        expect(screen.getByText('Finance')).toBeInTheDocument();
      });

      // Verify each expected tab
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Offerings')).toBeInTheDocument();
      expect(screen.getByText('Expenses')).toBeInTheDocument();
      expect(screen.getByText('Budgets')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();

      // Verify total count
      const tabs = screen.getAllByRole('button').filter(button => 
        button.className.includes('border-b-2')
      );
      expect(tabs).toHaveLength(5);
    });

    it('verifies Reports page displays all 6 financial reports (Requirements 2.1, 2.2)', () => {
      renderWithToast(<Reports />);

      // Verify Financial Reports category
      expect(screen.getByText('Financial Reports')).toBeInTheDocument();

      // Verify all 6 financial reports
      expect(screen.getByText('Income Statement')).toBeInTheDocument();
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
      expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
      expect(screen.getByText('Offering Summary')).toBeInTheDocument();
      expect(screen.getByText('Expense Report')).toBeInTheDocument();
    });

    it('verifies financial reports are functional - modal opens on click (Requirement 2.3)', async () => {
      const user = userEvent.setup();
      
      renderWithToast(<Reports />);

      // Test each financial report
      const financialReports = [
        'Income Statement',
        'Balance Sheet',
        'Budget Variance Report',
        'Fund Balance Report',
        'Offering Summary',
        'Expense Report'
      ];

      for (let i = 0; i < financialReports.length; i++) {
        const generateButtons = screen.getAllByText('Generate');
        await user.click(generateButtons[i]);

        // Verify modal opens
        await waitFor(() => {
          expect(screen.getByText(`Generate ${financialReports[i]}`)).toBeInTheDocument();
        });

        // Close modal
        const cancelButton = screen.getByText('Cancel');
        await user.click(cancelButton);

        // Wait for modal to close
        await waitFor(() => {
          expect(screen.queryByText(`Generate ${financialReports[i]}`)).not.toBeInTheDocument();
        });
      }
    });

    it('demonstrates complete navigation flow: Finance (no Reports) → Reports (financial reports visible)', async () => {
      const user = userEvent.setup();

      // Step 1: Render Finance section
      const { unmount: unmountFinance } = render(<Finance />);

      await waitFor(() => {
        expect(screen.getByText('Finance')).toBeInTheDocument();
      });

      // Verify Reports tab is NOT in Finance
      const financeTabs = screen.getAllByRole('button').filter(button => 
        button.className.includes('border-b-2')
      );
      const financeTabLabels = financeTabs.map(tab => tab.textContent);
      expect(financeTabLabels).not.toContain('Reports');
      expect(financeTabLabels).toHaveLength(5);

      unmountFinance();

      // Step 2: Navigate to Reports page
      renderWithToast(<Reports />);

      // Verify Financial Reports are visible
      expect(screen.getByText('Financial Reports')).toBeInTheDocument();
      expect(screen.getByText('Income Statement')).toBeInTheDocument();
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
      expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
      expect(screen.getByText('Offering Summary')).toBeInTheDocument();
      expect(screen.getByText('Expense Report')).toBeInTheDocument();

      // Verify functionality
      const generateButtons = screen.getAllByText('Generate');
      await user.click(generateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
    });
  });

  /**
   * COMPREHENSIVE FLOW: Complete User Journey
   * 
   * Tests the complete user experience across all three flows
   */
  describe('Complete User Journey', () => {
    it('executes full workflow: verify navigation → generate report → handle error → retry successfully', async () => {
      const user = userEvent.setup();

      // STEP 1: Verify Finance section navigation (no Reports tab)
      const { unmount: unmountFinance } = render(<Finance />);

      await waitFor(() => {
        expect(screen.getByText('Finance')).toBeInTheDocument();
      });

      const financeTabs = screen.getAllByRole('button').filter(button => 
        button.className.includes('border-b-2')
      );
      expect(financeTabs).toHaveLength(5);
      expect(financeTabs.map(t => t.textContent)).not.toContain('Reports');

      unmountFinance();

      // STEP 2: Navigate to Reports page
      renderWithToast(<Reports />);

      expect(screen.getByText('Financial Reports')).toBeInTheDocument();
      expect(screen.getByText('Income Statement')).toBeInTheDocument();

      // STEP 3: Attempt to generate report (trigger error)
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        headers: { get: () => null },
      });

      const generateButtons = screen.getAllByText('Generate');
      await user.click(generateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });

      const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });
      fireEvent.click(generateReportButton);

      // STEP 4: Verify error handling
      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', 'Server error. Please try again later.');
      }, { timeout: 3000 });

      expect(mockConsoleError).toHaveBeenCalled();
      expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();

      // STEP 5: Retry successfully
      const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      Object.defineProperty(mockBlob, 'size', { value: 1024 });
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: {
          get: (name: string) => name === 'content-type' ? 'application/pdf' : null,
        },
        blob: async () => mockBlob,
      });

      mockShowToast.mockClear();
      fireEvent.click(generateReportButton);

      // STEP 6: Verify successful download
      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
        expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
      }, { timeout: 3000 });

      // STEP 7: Verify modal closes
      await waitFor(() => {
        expect(screen.queryByText('Generate Income Statement')).not.toBeInTheDocument();
      }, { timeout: 3000 });

      // Verify no error on success
      expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));
    });
  });
});
