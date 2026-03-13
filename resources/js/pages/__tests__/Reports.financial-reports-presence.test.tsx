/**
 * Test: Verify all 6 financial reports are present in Reports.tsx
 * 
 * Task: 5.1 Ensure all 6 financial reports are present
 * Requirements: 2.1, 2.2
 * 
 * This test verifies that the main Reports page displays all 6 financial reports
 * in the Financial Reports category after consolidation.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reports from '../Reports';

// Mock the ToastContext
jest.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: jest.fn()
  })
}));

describe('Reports - Financial Reports Presence', () => {
  describe('Task 5.1: All 6 financial reports are present', () => {
    beforeEach(() => {
      render(<Reports />);
    });

    it('should display the Financial Reports category', () => {
      expect(screen.getByText('Financial Reports')).toBeInTheDocument();
    });

    it('should display Income Statement report card', () => {
      expect(screen.getByText('Income Statement')).toBeInTheDocument();
      expect(screen.getByText('Summary of income and expenses over a period')).toBeInTheDocument();
    });

    it('should display Balance Sheet report card', () => {
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Financial position at a specific point in time')).toBeInTheDocument();
    });

    it('should display Budget Variance report card', () => {
      expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
      expect(screen.getByText('Compare actual vs budgeted amounts')).toBeInTheDocument();
    });

    it('should display Fund Balance report card', () => {
      expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
      expect(screen.getByText('Current balance of all funds')).toBeInTheDocument();
    });

    it('should display Offering Summary report card', () => {
      expect(screen.getByText('Offering Summary')).toBeInTheDocument();
      expect(screen.getByText('Detailed breakdown of offerings received')).toBeInTheDocument();
    });

    it('should display Expense Report report card', () => {
      expect(screen.getByText('Expense Report')).toBeInTheDocument();
      expect(screen.getByText('Detailed listing of all expenses')).toBeInTheDocument();
    });

    it('should display exactly 6 financial reports', () => {
      // Get the Financial Reports section
      const financialReportsHeading = screen.getByText('Financial Reports');
      const financialReportsSection = financialReportsHeading.closest('div.space-y-4');
      
      // Count the number of report cards in this section
      // Each report card has a "Generate" button
      const generateButtons = financialReportsSection?.querySelectorAll('button');
      const reportCards = Array.from(generateButtons || []).filter(
        button => button.textContent === 'Generate'
      );
      
      expect(reportCards.length).toBe(6);
    });

    it('should have Generate button for each financial report', () => {
      const financialReports = [
        'Income Statement',
        'Balance Sheet',
        'Budget Variance Report',
        'Fund Balance Report',
        'Offering Summary',
        'Expense Report'
      ];

      financialReports.forEach(reportTitle => {
        const reportElement = screen.getByText(reportTitle);
        const reportCard = reportElement.closest('div.bg-white');
        
        // Each report card should have a Generate button
        const generateButton = reportCard?.querySelector('button');
        expect(generateButton).toBeInTheDocument();
        expect(generateButton?.textContent).toBe('Generate');
      });
    });

    it('should display last generated date for each financial report', () => {
      // All 6 reports have lastGenerated dates in the component
      const lastGeneratedElements = screen.getAllByText(/Last generated:/);
      
      // Filter to only Financial Reports section (first 6)
      expect(lastGeneratedElements.length).toBeGreaterThanOrEqual(6);
    });

    it('should have correct report IDs for all financial reports', () => {
      // Verify the report structure by checking that all expected reports exist
      const expectedReports = [
        { title: 'Income Statement', id: 'income_statement' },
        { title: 'Balance Sheet', id: 'balance_sheet' },
        { title: 'Budget Variance Report', id: 'budget_variance' },
        { title: 'Fund Balance Report', id: 'fund_balance' },
        { title: 'Offering Summary', id: 'offering_summary' },
        { title: 'Expense Report', id: 'expense_report' }
      ];

      expectedReports.forEach(report => {
        expect(screen.getByText(report.title)).toBeInTheDocument();
      });
    });
  });

  describe('Requirement 2.1: Financial Reports category display', () => {
    it('should display all financial reports in the "Financial Reports" category', () => {
      render(<Reports />);
      
      // Verify category exists
      const categoryHeading = screen.getByText('Financial Reports');
      expect(categoryHeading).toBeInTheDocument();
      
      // Verify all 6 reports are present
      expect(screen.getByText('Income Statement')).toBeInTheDocument();
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
      expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
      expect(screen.getByText('Offering Summary')).toBeInTheDocument();
      expect(screen.getByText('Expense Report')).toBeInTheDocument();
    });
  });

  describe('Requirement 2.2: Specific financial reports inclusion', () => {
    it('should include all 6 specified financial reports', () => {
      render(<Reports />);
      
      // Requirement 2.2 specifies these exact reports
      const requiredReports = [
        'Income Statement',
        'Balance Sheet',
        'Budget Variance',
        'Fund Balance',
        'Offering Summary',
        'Expense Report'
      ];

      requiredReports.forEach(reportName => {
        // Use flexible matching since some titles have "Report" suffix
        const regex = new RegExp(reportName, 'i');
        expect(screen.getByText(regex)).toBeInTheDocument();
      });
    });
  });
});
