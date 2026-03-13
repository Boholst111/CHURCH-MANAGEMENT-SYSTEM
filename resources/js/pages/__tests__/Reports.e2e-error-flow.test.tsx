import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reports from '../Reports';

/**
 * Integration tests for error flow in Reports page
 * 
 * Feature: finance-reports-consolidation
 * Task 9.2: Test error flow
 * Requirements: 6.1, 6.2, 6.3, 6.4
 * 
 * These tests verify the complete error handling flow:
 * - Triggering report generation with invalid parameters
 * - Displaying appropriate error messages
 * - Allowing users to retry after errors
 */

// Mock ToastContext
const mockShowToast = jest.fn();
jest.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: mockShowToast
  })
}));

// Mock fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

// Mock URL.createObjectURL and revokeObjectURL
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

describe('Reports - Error Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockReturnValue('blob:mock-url');
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  /**
   * Test: Trigger report generation with invalid parameters (500 error)
   * Verify error message is displayed
   * Verify user can retry
   * 
   * Requirement 6.1: IF the server returns a 500 error, 
   * THEN THE Main_Reports_Page SHALL display "Server error. Please try again later."
   */
  it('should handle 500 error, display message, and allow retry', async () => {
    // Setup: Mock 500 response for first attempt
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: {
        get: () => null,
      },
    });

    render(<Reports />);

    // Step 1: Open generate modal
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[0]); // Click first Generate button (Income Statement)

    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByText(/Generate Income Statement/i)).toBeInTheDocument();
    });

    // Step 2: Submit form to trigger error
    const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });
    fireEvent.click(generateReportButton);

    // Step 3: Verify error message is displayed
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('error', 'Server error. Please try again later.');
    }, { timeout: 3000 });

    // Verify error was logged
    expect(mockConsoleError).toHaveBeenCalled();

    // Step 4: Verify modal is still open (user can retry)
    expect(screen.getByText(/Generate Income Statement/i)).toBeInTheDocument();
    expect(generateReportButton).toBeInTheDocument();

    // Step 5: Mock successful response for retry
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    Object.defineProperty(mockBlob, 'size', { value: 1024 });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'application/pdf';
          return null;
        },
      },
      blob: async () => mockBlob,
    });

    // Step 6: Retry by clicking Generate Report again
    mockShowToast.mockClear();
    fireEvent.click(generateReportButton);

    // Step 7: Verify successful download
    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    }, { timeout: 3000 });

    // Verify no error toast was shown on retry
    expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));

    // Verify modal closes after successful generation
    await waitFor(() => {
      expect(screen.queryByText(/Generate Income Statement/i)).not.toBeInTheDocument();
    });
  });

  /**
   * Test: Trigger report generation with 404 error (invalid date range)
   * Verify error message is displayed
   * Verify user can retry with different parameters
   * 
   * Requirement 6.2: IF the server returns a 404 error, 
   * THEN THE Main_Reports_Page SHALL display "Report not found. Please check your date range."
   */
  it('should handle 404 error, display message, and allow retry with different date range', async () => {
    // Setup: Mock 404 response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      headers: {
        get: () => null,
      },
    });

    render(<Reports />);

    // Step 1: Open generate modal
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[1]); // Click second Generate button (Balance Sheet)

    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByText(/Generate Balance Sheet/i)).toBeInTheDocument();
    });

    // Step 2: Select custom date range
    const dateRangeSelect = screen.getByLabelText(/Date Range/i);
    fireEvent.change(dateRangeSelect, { target: { value: 'custom' } });

    // Wait for custom date inputs to appear
    await waitFor(() => {
      expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    });

    // Set invalid date range
    const startDateInput = screen.getByLabelText(/Start Date/i);
    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2025-01-31' } });

    // Step 3: Submit form to trigger 404 error
    const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });
    fireEvent.click(generateReportButton);

    // Step 4: Verify error message is displayed
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('error', 'Report not found. Please check your date range.');
    }, { timeout: 3000 });

    // Verify error was logged
    expect(mockConsoleError).toHaveBeenCalled();

    // Step 5: Verify modal is still open (user can retry)
    expect(screen.getByText(/Generate Balance Sheet/i)).toBeInTheDocument();

    // Step 6: Change date range to valid range
    fireEvent.change(dateRangeSelect, { target: { value: 'this_month' } });

    // Step 7: Mock successful response for retry
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    Object.defineProperty(mockBlob, 'size', { value: 1024 });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'application/pdf';
          return null;
        },
      },
      blob: async () => mockBlob,
    });

    // Step 8: Retry with new date range
    mockShowToast.mockClear();
    fireEvent.click(generateReportButton);

    // Step 9: Verify successful download
    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    }, { timeout: 3000 });

    // Verify no error toast was shown on retry
    expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));
  });

  /**
   * Test: Trigger report generation with 401 authentication error
   * Verify error message is displayed
   * Verify user can retry (after re-authentication in real scenario)
   * 
   * Requirement 6.3: IF the server returns a 401 or 403 error, 
   * THEN THE Main_Reports_Page SHALL display "Authentication error. Please log in again."
   */
  it('should handle 401 error, display authentication message, and allow retry', async () => {
    // Setup: Mock 401 response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      headers: {
        get: () => null,
      },
    });

    render(<Reports />);

    // Step 1: Click "View Last" button to trigger quick download
    const incomeStatementTitle = screen.getByText('Income Statement');
    const incomeStatementCard = incomeStatementTitle.closest('.bg-white');
    const buttons = incomeStatementCard!.querySelectorAll('button');
    const viewLastButton = Array.from(buttons).find(
      btn => btn.textContent?.includes('View Last')
    ) as HTMLButtonElement;

    fireEvent.click(viewLastButton);

    // Step 2: Verify authentication error message is displayed
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('error', 'Authentication error. Please log in again.');
    }, { timeout: 3000 });

    // Verify error was logged
    expect(mockConsoleError).toHaveBeenCalled();

    // Step 3: Simulate user re-authenticating (updating token)
    mockLocalStorage.getItem.mockReturnValue('new-valid-token');

    // Step 4: Mock successful response for retry
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    Object.defineProperty(mockBlob, 'size', { value: 1024 });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'application/pdf';
          return null;
        },
      },
      blob: async () => mockBlob,
    });

    // Step 5: Retry by clicking "View Last" again
    mockShowToast.mockClear();
    fireEvent.click(viewLastButton);

    // Step 6: Verify successful download
    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    }, { timeout: 3000 });

    // Verify no error toast was shown on retry
    expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));
  });

  /**
   * Test: Trigger report generation with network error
   * Verify error message is displayed
   * Verify user can retry after connection is restored
   * 
   * Requirement 6.4: IF a network error occurs, 
   * THEN THE Main_Reports_Page SHALL display "Network error. Please check your connection and try again."
   */
  it('should handle network error, display message, and allow retry', async () => {
    // Setup: Mock network error with TypeError (fetch failure)
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    render(<Reports />);

    // Step 1: Open generate modal
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[2]); // Click third Generate button (Budget Variance)

    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByText(/Generate Budget Variance Report/i)).toBeInTheDocument();
    });

    // Step 2: Submit form to trigger network error
    const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });
    fireEvent.click(generateReportButton);

    // Step 3: Verify network error message is displayed
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('error', 'Network error. Please check your connection and try again.');
    }, { timeout: 3000 });

    // Verify error was logged
    expect(mockConsoleError).toHaveBeenCalled();

    // Step 4: Verify modal is still open (user can retry)
    expect(screen.getByText(/Generate Budget Variance Report/i)).toBeInTheDocument();

    // Step 5: Simulate network connection restored - mock successful response
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    Object.defineProperty(mockBlob, 'size', { value: 1024 });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'application/pdf';
          return null;
        },
      },
      blob: async () => mockBlob,
    });

    // Step 6: Retry by clicking Generate Report again
    mockShowToast.mockClear();
    fireEvent.click(generateReportButton);

    // Step 7: Verify successful download
    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    }, { timeout: 3000 });

    // Verify no error toast was shown on retry
    expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));

    // Verify modal closes after successful generation
    await waitFor(() => {
      expect(screen.queryByText(/Generate Budget Variance Report/i)).not.toBeInTheDocument();
    });
  });

  /**
   * Test: Multiple consecutive errors followed by successful retry
   * Verify user can retry multiple times
   */
  it('should allow multiple retry attempts after consecutive errors', async () => {
    render(<Reports />);

    // Step 1: Open generate modal
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[3]); // Click fourth Generate button (Fund Balance)

    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByText(/Generate Fund Balance Report/i)).toBeInTheDocument();
    });

    const generateReportButton = screen.getByRole('button', { name: /Generate Report/i });

    // Step 2: First attempt - 500 error
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: {
        get: () => null,
      },
    });

    fireEvent.click(generateReportButton);

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('error', 'Server error. Please try again later.');
    }, { timeout: 3000 });

    // Verify modal is still open
    expect(screen.getByText(/Generate Fund Balance Report/i)).toBeInTheDocument();

    // Step 3: Second attempt - network error (TypeError for fetch failure)
    mockShowToast.mockClear();
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    fireEvent.click(generateReportButton);

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('error', 'Network error. Please check your connection and try again.');
    }, { timeout: 3000 });

    // Verify modal is still open
    expect(screen.getByText(/Generate Fund Balance Report/i)).toBeInTheDocument();

    // Step 4: Third attempt - success
    mockShowToast.mockClear();
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    Object.defineProperty(mockBlob, 'size', { value: 1024 });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'application/pdf';
          return null;
        },
      },
      blob: async () => mockBlob,
    });

    fireEvent.click(generateReportButton);

    // Step 5: Verify successful download
    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    }, { timeout: 3000 });

    // Verify no error toast was shown on successful retry
    expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));

    // Verify modal closes after successful generation
    await waitFor(() => {
      expect(screen.queryByText(/Generate Fund Balance Report/i)).not.toBeInTheDocument();
    });
  });

  /**
   * Test: Error handling with "View Last" button
   * Verify errors are handled correctly for quick downloads
   */
  it('should handle errors and allow retry when using View Last button', async () => {
    // Setup: Mock 500 response for first attempt
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: {
        get: () => null,
      },
    });

    render(<Reports />);

    // Step 1: Click "View Last" button
    const offeringSummaryTitle = screen.getByText('Offering Summary');
    const offeringSummaryCard = offeringSummaryTitle.closest('.bg-white');
    const buttons = offeringSummaryCard!.querySelectorAll('button');
    const viewLastButton = Array.from(buttons).find(
      btn => btn.textContent?.includes('View Last')
    ) as HTMLButtonElement;

    fireEvent.click(viewLastButton);

    // Step 2: Verify error message is displayed
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('error', 'Server error. Please try again later.');
    }, { timeout: 3000 });

    // Step 3: Mock successful response for retry
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    Object.defineProperty(mockBlob, 'size', { value: 1024 });
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'application/pdf';
          return null;
        },
      },
      blob: async () => mockBlob,
    });

    // Step 4: Retry by clicking "View Last" again
    mockShowToast.mockClear();
    fireEvent.click(viewLastButton);

    // Step 5: Verify successful download
    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    }, { timeout: 3000 });

    // Verify no error toast was shown on retry
    expect(mockShowToast).not.toHaveBeenCalledWith('error', expect.any(String));
  });

  /**
   * Test: Verify all error types are logged to console
   * Requirement 6.5: Error logging for debugging
   */
  it('should log all error types to console for debugging', async () => {
    const errorScenarios = [
      { 
        status: 401, 
        expectedMessage: 'Authentication error. Please log in again.',
        description: 'authentication error'
      },
      { 
        status: 404, 
        expectedMessage: 'Report not found. Please check your date range.',
        description: 'not found error'
      },
      { 
        status: 500, 
        expectedMessage: 'Server error. Please try again later.',
        description: 'server error'
      },
    ];

    for (const scenario of errorScenarios) {
      mockConsoleError.mockClear();
      mockShowToast.mockClear();
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: scenario.status,
        headers: {
          get: () => null,
        },
      });

      const { unmount } = render(<Reports />);

      // Click "View Last" button
      const incomeStatementTitle = screen.getByText('Income Statement');
      const incomeStatementCard = incomeStatementTitle.closest('.bg-white');
      const buttons = incomeStatementCard!.querySelectorAll('button');
      const viewLastButton = Array.from(buttons).find(
        btn => btn.textContent?.includes('View Last')
      ) as HTMLButtonElement;

      fireEvent.click(viewLastButton);

      // Wait for error handling
      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', scenario.expectedMessage);
      }, { timeout: 3000 });

      // Verify error was logged to console
      expect(mockConsoleError).toHaveBeenCalled();
      const errorCall = mockConsoleError.mock.calls[0];
      expect(errorCall[0]).toContain('Error');

      unmount();
    }
  });
});
