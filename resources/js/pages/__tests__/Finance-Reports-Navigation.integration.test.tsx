/**
 * Integration Test: Finance Reports Navigation Consolidation
 * 
 * Task 9.3: Test navigation consolidation
 * 
 * This test verifies that:
 * 1. Finance section does NOT display a "Reports" tab
 * 2. Finance section displays only 5 tabs (Overview, Offerings, Expenses, Budgets, Settings)
 * 3. Reports page displays all 6 financial reports
 * 4. Financial reports are functional (can open generation modal)
 * 
 * Requirements: 1.5, 2.1, 2.2, 2.3
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Finance from '../Finance';
import Reports from '../Reports';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the lazy-loaded components
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

describe('Finance Reports Navigation Consolidation - Integration Test', () => {
  describe('Finance Section Navigation', () => {
    it('should NOT display a Reports tab in Finance section (Requirement 1.5)', async () => {
      render(<Finance />);

      // Wait for component to render
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

    it('should display exactly 5 tabs: Overview, Offerings, Expenses, Budgets, Settings (Requirement 1.5)', async () => {
      render(<Finance />);

      await waitFor(() => {
        expect(screen.getByText('Finance')).toBeInTheDocument();
      });

      // Get all tab buttons
      const tabs = screen.getAllByRole('button').filter(button => 
        button.className.includes('border-b-2')
      );

      expect(tabs).toHaveLength(5);

      // Verify each expected tab is present
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Offerings')).toBeInTheDocument();
      expect(screen.getByText('Expenses')).toBeInTheDocument();
      expect(screen.getByText('Budgets')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should allow navigation between all 5 tabs without Reports tab', async () => {
      const user = userEvent.setup();
      render(<Finance />);

      await waitFor(() => {
        expect(screen.getByText('Finance')).toBeInTheDocument();
      });

      // Navigate to each tab and verify content loads
      const offeringsTab = screen.getByText('Offerings');
      await user.click(offeringsTab);
      await waitFor(() => {
        expect(screen.getByTestId('finance-offerings')).toBeInTheDocument();
      });

      const expensesTab = screen.getByText('Expenses');
      await user.click(expensesTab);
      await waitFor(() => {
        expect(screen.getByTestId('finance-expenses')).toBeInTheDocument();
      });

      const budgetsTab = screen.getByText('Budgets');
      await user.click(budgetsTab);
      await waitFor(() => {
        expect(screen.getByTestId('finance-budgets')).toBeInTheDocument();
      });

      const settingsTab = screen.getByText('Settings');
      await user.click(settingsTab);
      await waitFor(() => {
        expect(screen.getByTestId('finance-settings')).toBeInTheDocument();
      });

      const overviewTab = screen.getByText('Overview');
      await user.click(overviewTab);
      await waitFor(() => {
        expect(screen.getByTestId('finance-overview')).toBeInTheDocument();
      });
    });
  });

  describe('Reports Page Financial Reports', () => {
    it('should display Financial Reports category with all 6 reports (Requirements 2.1, 2.2)', () => {
      render(
        <ToastProvider>
          <Reports />
        </ToastProvider>
      );

      // Verify Financial Reports category header
      expect(screen.getByText('Financial Reports')).toBeInTheDocument();

      // Verify all 6 financial reports are present (Requirement 2.2)
      expect(screen.getByText('Income Statement')).toBeInTheDocument();
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
      expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
      expect(screen.getByText('Offering Summary')).toBeInTheDocument();
      expect(screen.getByText('Expense Report')).toBeInTheDocument();
    });

    it('should display descriptions for all financial reports', () => {
      render(
        <ToastProvider>
          <Reports />
        </ToastProvider>
      );

      // Verify report descriptions
      expect(screen.getByText('Summary of income and expenses over a period')).toBeInTheDocument();
      expect(screen.getByText('Financial position at a specific point in time')).toBeInTheDocument();
      expect(screen.getByText('Compare actual vs budgeted amounts')).toBeInTheDocument();
      expect(screen.getByText('Current balance of all funds')).toBeInTheDocument();
      expect(screen.getByText('Detailed breakdown of offerings received')).toBeInTheDocument();
      expect(screen.getByText('Detailed listing of all expenses')).toBeInTheDocument();
    });

    it('should open report generation modal when Generate button is clicked (Requirement 2.3)', async () => {
      const user = userEvent.setup();
      
      render(
        <ToastProvider>
          <Reports />
        </ToastProvider>
      );

      // Find and click the Generate button for Income Statement
      const generateButtons = screen.getAllByText('Generate');
      await user.click(generateButtons[0]); // First Generate button (Income Statement)

      // Verify modal opens with correct title
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });

      // Verify modal contains expected form fields
      expect(screen.getByLabelText(/Date Range/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Export Format/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Include Charts and Visualizations/i)).toBeInTheDocument();
    });

    it('should open modal for each financial report type', async () => {
      const user = userEvent.setup();
      
      render(
        <ToastProvider>
          <Reports />
        </ToastProvider>
      );

      const financialReports = [
        'Income Statement',
        'Balance Sheet',
        'Budget Variance Report',
        'Fund Balance Report',
        'Offering Summary',
        'Expense Report'
      ];

      // Test each financial report
      for (let i = 0; i < financialReports.length; i++) {
        const generateButtons = screen.getAllByText('Generate');
        await user.click(generateButtons[i]);

        // Verify modal opens with correct report title
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

    it('should display Generate, View Last, and Schedule buttons for each financial report', () => {
      render(
        <ToastProvider>
          <Reports />
        </ToastProvider>
      );

      // Get all Generate buttons (should be at least 6 for financial reports)
      const generateButtons = screen.getAllByText('Generate');
      expect(generateButtons.length).toBeGreaterThanOrEqual(6);

      // Get all View Last buttons (should be at least 6 for financial reports)
      const viewLastButtons = screen.getAllByText('View Last');
      expect(viewLastButtons.length).toBeGreaterThanOrEqual(6);

      // Get all Schedule buttons (should be at least 6 for financial reports)
      const scheduleButtons = screen.getAllByText('Schedule');
      expect(scheduleButtons.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('Complete Navigation Flow', () => {
    it('should demonstrate complete user flow: Finance section (no Reports tab) → Reports page (financial reports visible)', async () => {
      const user = userEvent.setup();

      // Step 1: Render Finance section
      const { unmount: unmountFinance } = render(<Finance />);

      await waitFor(() => {
        expect(screen.getByText('Finance')).toBeInTheDocument();
      });

      // Verify Reports tab is NOT in Finance section
      const financeTabs = screen.getAllByRole('button').filter(button => 
        button.className.includes('border-b-2')
      );
      const financeTabLabels = financeTabs.map(tab => tab.textContent);
      expect(financeTabLabels).not.toContain('Reports');
      expect(financeTabLabels).toHaveLength(5);

      // Clean up Finance component
      unmountFinance();

      // Step 2: Navigate to Reports page
      render(
        <ToastProvider>
          <Reports />
        </ToastProvider>
      );

      // Verify Financial Reports are visible and functional
      expect(screen.getByText('Financial Reports')).toBeInTheDocument();
      expect(screen.getByText('Income Statement')).toBeInTheDocument();
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
      expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
      expect(screen.getByText('Offering Summary')).toBeInTheDocument();
      expect(screen.getByText('Expense Report')).toBeInTheDocument();

      // Verify functionality by opening a modal
      const generateButtons = screen.getAllByText('Generate');
      await user.click(generateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility and User Experience', () => {
    it('should maintain proper tab navigation order in Finance section', async () => {
      const user = userEvent.setup();
      render(<Finance />);

      await waitFor(() => {
        expect(screen.getByText('Finance')).toBeInTheDocument();
      });

      // Get all tab buttons in order
      const tabs = screen.getAllByRole('button').filter(button => 
        button.className.includes('border-b-2')
      );

      // Verify tab order matches expected order
      expect(tabs[0]).toHaveTextContent('Overview');
      expect(tabs[1]).toHaveTextContent('Offerings');
      expect(tabs[2]).toHaveTextContent('Expenses');
      expect(tabs[3]).toHaveTextContent('Budgets');
      expect(tabs[4]).toHaveTextContent('Settings');
    });

    it('should display proper visual hierarchy in Reports page', () => {
      render(
        <ToastProvider>
          <Reports />
        </ToastProvider>
      );

      // Verify page header
      const pageHeader = screen.getByText('Reports');
      expect(pageHeader).toBeInTheDocument();
      expect(pageHeader.tagName).toBe('H1');

      // Verify category headers
      const financialHeader = screen.getByText('Financial Reports');
      expect(financialHeader).toBeInTheDocument();
      expect(financialHeader.tagName).toBe('H2');

      // Verify report titles
      const incomeStatementTitle = screen.getByText('Income Statement');
      expect(incomeStatementTitle).toBeInTheDocument();
      expect(incomeStatementTitle.tagName).toBe('H3');
    });
  });
});
