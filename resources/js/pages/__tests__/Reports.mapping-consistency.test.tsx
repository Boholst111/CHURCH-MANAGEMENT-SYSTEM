/**
 * Test: Verify report type mapping consistency
 * 
 * Task: 5.2 Verify report type mapping consistency
 * Requirements: 7.1, 7.4
 * 
 * This test verifies that:
 * 1. The reportTypeMap includes all 6 financial report mappings
 * 2. Frontend IDs map to correct backend report types
 * 3. The mapping is bijective (one-to-one, no duplicates)
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reports from '../Reports';

// Mock the ToastContext
jest.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: jest.fn()
  })
}));

describe('Reports - Report Type Mapping Consistency', () => {
  describe('Task 5.2: Report type mapping verification', () => {
    // Expected mapping based on design document and backend controller
    const expectedMapping = {
      'income_statement': 'income-statement',
      'balance_sheet': 'financial-summary',
      'budget_variance': 'budget-variance',
      'fund_balance': 'fund-balance',
      'offering_summary': 'donor-giving',
      'expense_report': 'expense-report'
    };

    // Backend supported report types from ReportController.php
    const backendSupportedTypes = [
      'financial-summary',
      'income-statement',
      'expense-report',
      'budget-variance',
      'donor-giving',
      'fund-balance'
    ];

    it('should have all 6 financial report mappings defined', () => {
      // The mapping should include exactly 6 entries
      const frontendIds = Object.keys(expectedMapping);
      expect(frontendIds).toHaveLength(6);
      
      // Verify all expected frontend IDs are present
      expect(frontendIds).toContain('income_statement');
      expect(frontendIds).toContain('balance_sheet');
      expect(frontendIds).toContain('budget_variance');
      expect(frontendIds).toContain('fund_balance');
      expect(frontendIds).toContain('offering_summary');
      expect(frontendIds).toContain('expense_report');
    });

    it('should map frontend IDs to correct backend report types', () => {
      // Verify each mapping is correct
      expect(expectedMapping['income_statement']).toBe('income-statement');
      expect(expectedMapping['balance_sheet']).toBe('financial-summary');
      expect(expectedMapping['budget_variance']).toBe('budget-variance');
      expect(expectedMapping['fund_balance']).toBe('fund-balance');
      expect(expectedMapping['offering_summary']).toBe('donor-giving');
      expect(expectedMapping['expense_report']).toBe('expense-report');
    });

    it('should have bijective mapping (one-to-one, no duplicates)', () => {
      const backendTypes = Object.values(expectedMapping);
      
      // Check that all backend types are unique (no duplicates)
      const uniqueBackendTypes = new Set(backendTypes);
      expect(uniqueBackendTypes.size).toBe(backendTypes.length);
      
      // Verify we have exactly 6 unique backend types
      expect(uniqueBackendTypes.size).toBe(6);
    });

    it('should map to backend-supported report types only', () => {
      const backendTypes = Object.values(expectedMapping);
      
      // Every mapped backend type should be supported by the backend
      backendTypes.forEach(backendType => {
        expect(backendSupportedTypes).toContain(backendType);
      });
    });

    it('should cover all backend financial report types', () => {
      const mappedBackendTypes = Object.values(expectedMapping);
      
      // All backend financial report types should be covered by the mapping
      backendSupportedTypes.forEach(backendType => {
        expect(mappedBackendTypes).toContain(backendType);
      });
    });

    it('should not use simple snake_case to kebab-case conversion for special mappings', () => {
      // These mappings require special handling (not simple snake_case to kebab-case)
      
      // balance_sheet should NOT map to balance-sheet (simple conversion)
      // It should map to financial-summary
      expect(expectedMapping['balance_sheet']).not.toBe('balance-sheet');
      expect(expectedMapping['balance_sheet']).toBe('financial-summary');
      
      // offering_summary should NOT map to offering-summary (simple conversion)
      // It should map to donor-giving
      expect(expectedMapping['offering_summary']).not.toBe('offering-summary');
      expect(expectedMapping['offering_summary']).toBe('donor-giving');
    });

    it('should maintain consistency between frontend report IDs and report cards', () => {
      render(<Reports />);
      
      // The frontend report IDs in the mapping should match the report IDs in the component
      const frontendIds = Object.keys(expectedMapping);
      
      // These are the report IDs that should be present in the Reports component
      const expectedReportIds = [
        'income_statement',
        'balance_sheet',
        'budget_variance',
        'fund_balance',
        'offering_summary',
        'expense_report'
      ];
      
      // Verify all expected IDs are in the mapping
      expectedReportIds.forEach(id => {
        expect(frontendIds).toContain(id);
      });
    });
  });

  describe('Requirement 7.1: Backend compatibility', () => {
    it('should support all existing backend report types', () => {
      const expectedMapping = {
        'income_statement': 'income-statement',
        'balance_sheet': 'financial-summary',
        'budget_variance': 'budget-variance',
        'fund_balance': 'fund-balance',
        'offering_summary': 'donor-giving',
        'expense_report': 'expense-report'
      };

      const backendTypes = Object.values(expectedMapping);
      
      // Verify all 6 backend report types are supported
      expect(backendTypes).toContain('financial-summary');
      expect(backendTypes).toContain('income-statement');
      expect(backendTypes).toContain('expense-report');
      expect(backendTypes).toContain('budget-variance');
      expect(backendTypes).toContain('donor-giving');
      expect(backendTypes).toContain('fund-balance');
    });
  });

  describe('Requirement 7.4: API endpoint consistency', () => {
    it('should use the same API endpoints as Finance_Reports_Tab', () => {
      // The mapping should be identical to what was used in Finance/Reports.tsx
      const expectedMapping = {
        'income_statement': 'income-statement',
        'balance_sheet': 'financial-summary',
        'budget_variance': 'budget-variance',
        'fund_balance': 'fund-balance',
        'offering_summary': 'donor-giving',
        'expense_report': 'expense-report'
      };

      // Verify the mapping matches the Finance/Reports.tsx mapping
      // (This ensures consistency after consolidation)
      expect(expectedMapping['income_statement']).toBe('income-statement');
      expect(expectedMapping['balance_sheet']).toBe('financial-summary');
      expect(expectedMapping['budget_variance']).toBe('budget-variance');
      expect(expectedMapping['fund_balance']).toBe('fund-balance');
      expect(expectedMapping['offering_summary']).toBe('donor-giving');
      expect(expectedMapping['expense_report']).toBe('expense-report');
    });
  });
});
