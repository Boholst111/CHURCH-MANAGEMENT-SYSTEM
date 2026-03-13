import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Reports from '../Reports';

/**
 * Preservation Property Tests for Reports Generation Fix
 * 
 * These tests verify that all non-buggy behaviors remain unchanged after the fix.
 * Following the observation-first methodology, these tests capture the baseline
 * behavior that must be preserved:
 * 
 * - Modal interactions (open/close, form inputs)
 * - Report card rendering (all 6 financial reports)
 * - Page structure and navigation
 * - Form validation and input handling
 * - Date range selection options
 * - Format selection (PDF/Excel/CSV)
 * - Include charts checkbox
 * 
 * Property 2: Preservation - Backend and Non-Report Functionality
 * For any functionality that is NOT the "Generate" or "View Last" button click
 * handlers (isBugCondition returns false), the fixed code SHALL produce exactly
 * the same behavior as the original code.
 */

describe('Reports - Preservation Property Tests', () => {
  describe('Property 2.1: Page Rendering Preservation', () => {
    it('should preserve basic page structure and header', () => {
      render(<Reports />);
      
      // Verify page header
      expect(screen.getByText('Financial Reports')).toBeInTheDocument();
      expect(screen.getByText('Generate and view financial reports')).toBeInTheDocument();
    });

    it('should preserve all 6 financial report cards', () => {
      render(<Reports />);
      
      // Verify all report titles are displayed
      expect(screen.getByText('Income Statement')).toBeInTheDocument();
      expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
      expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
      expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
      expect(screen.getByText('Offering Summary')).toBeInTheDocument();
      expect(screen.getByText('Expense Report')).toBeInTheDocument();
    });

    it('should preserve report card descriptions', () => {
      render(<Reports />);
      
      // Verify descriptions are displayed
      expect(screen.getByText('Summary of income and expenses over a period')).toBeInTheDocument();
      expect(screen.getByText('Financial position at a specific point in time')).toBeInTheDocument();
      expect(screen.getByText('Compare actual vs budgeted amounts')).toBeInTheDocument();
      expect(screen.getByText('Current balance of all funds')).toBeInTheDocument();
      expect(screen.getByText('Detailed breakdown of offerings received')).toBeInTheDocument();
      expect(screen.getByText('Detailed listing of all expenses')).toBeInTheDocument();
    });

    it('should preserve last generated dates display', () => {
      render(<Reports />);
      
      // Verify last generated dates are shown
      const lastGeneratedElements = screen.getAllByText(/Last generated:/);
      expect(lastGeneratedElements.length).toBe(6);
    });
  });

  describe('Property 2.2: Report Card Button Structure Preservation', () => {
    it('should preserve Generate button for all reports', () => {
      const { container } = render(<Reports />);
      
      const generateButtons = Array.from(container.querySelectorAll('button')).filter(
        btn => btn.textContent?.includes('Generate') && !btn.textContent?.includes('Generating')
      );
      
      // Should have 6 Generate buttons (one per report)
      expect(generateButtons.length).toBe(6);
    });

    it('should preserve View Last button for all reports', () => {
      const { container } = render(<Reports />);
      
      const viewLastButtons = Array.from(container.querySelectorAll('button')).filter(
        btn => btn.textContent?.includes('View Last')
      );
      
      // Should have 6 View Last buttons (one per report)
      expect(viewLastButtons.length).toBe(6);
    });
  });

  describe('Property 2.3: Modal Interaction Preservation', () => {
    it('should preserve modal opening behavior when Generate is clicked', async () => {
      render(<Reports />);
      
      // Click Generate button on first report
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Modal should open with correct title
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
    });

    it('should preserve modal closing behavior when Cancel is clicked', async () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
      
      // Click Cancel button
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      
      // Modal should close
      await waitFor(() => {
        expect(screen.queryByText('Generate Income Statement')).not.toBeInTheDocument();
      });
    });

    it('should preserve modal form structure and labels', async () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        // Verify all form labels are present
        expect(screen.getByText(/Date Range/)).toBeInTheDocument();
        expect(screen.getByText(/Export Format/)).toBeInTheDocument();
        expect(screen.getByText(/Include Charts and Visualizations/)).toBeInTheDocument();
      });
    });
  });

  describe('Property 2.4: Date Range Selection Preservation', () => {
    it('should preserve all date range options', async () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        const dateRangeSelect = screen.getByLabelText(/Date Range/);
        expect(dateRangeSelect).toBeInTheDocument();
        
        // Verify all options exist
        const options = Array.from(dateRangeSelect.querySelectorAll('option'));
        const optionTexts = options.map(opt => opt.textContent);
        
        expect(optionTexts).toContain('This Month');
        expect(optionTexts).toContain('Last Month');
        expect(optionTexts).toContain('This Quarter');
        expect(optionTexts).toContain('Last Quarter');
        expect(optionTexts).toContain('This Year');
        expect(optionTexts).toContain('Last Year');
        expect(optionTexts).toContain('Custom Range');
      });
    });

    it('should preserve custom date range input behavior', async () => {
      const user = userEvent.setup();
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
      
      // Select custom range
      const dateRangeSelect = screen.getByLabelText(/Date Range/);
      await user.selectOptions(dateRangeSelect, 'custom');
      
      // Custom date inputs should appear
      await waitFor(() => {
        expect(screen.getByLabelText(/Start Date/)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date/)).toBeInTheDocument();
      });
    });

    it('should preserve date range state changes', async () => {
      const user = userEvent.setup();
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
      
      // Change date range
      const dateRangeSelect = screen.getByLabelText(/Date Range/) as HTMLSelectElement;
      await user.selectOptions(dateRangeSelect, 'last_month');
      
      // Verify selection changed
      expect(dateRangeSelect.value).toBe('last_month');
    });
  });

  describe('Property 2.5: Format Selection Preservation', () => {
    it('should preserve all format options (PDF, Excel, CSV)', async () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        const formatSelect = screen.getByLabelText(/Export Format/);
        expect(formatSelect).toBeInTheDocument();
        
        // Verify all format options exist
        const options = Array.from(formatSelect.querySelectorAll('option'));
        const optionTexts = options.map(opt => opt.textContent);
        
        expect(optionTexts).toContain('PDF');
        expect(optionTexts).toContain('Excel');
        expect(optionTexts).toContain('CSV');
      });
    });

    it('should preserve format selection state changes', async () => {
      const user = userEvent.setup();
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
      
      // Change format
      const formatSelect = screen.getByLabelText(/Export Format/) as HTMLSelectElement;
      await user.selectOptions(formatSelect, 'excel');
      
      // Verify selection changed
      expect(formatSelect.value).toBe('excel');
      
      // Change to CSV
      await user.selectOptions(formatSelect, 'csv');
      expect(formatSelect.value).toBe('csv');
    });

    it('should preserve default format selection (PDF)', async () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        const formatSelect = screen.getByLabelText(/Export Format/) as HTMLSelectElement;
        // Default should be PDF
        expect(formatSelect.value).toBe('pdf');
      });
    });
  });

  describe('Property 2.6: Include Charts Checkbox Preservation', () => {
    it('should preserve include charts checkbox rendering', async () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        const checkbox = screen.getByLabelText(/Include Charts and Visualizations/);
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('type', 'checkbox');
      });
    });

    it('should preserve include charts default state (checked)', async () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        const checkbox = screen.getByLabelText(/Include Charts and Visualizations/) as HTMLInputElement;
        // Default should be checked
        expect(checkbox.checked).toBe(true);
      });
    });

    it('should preserve include charts toggle behavior', async () => {
      const user = userEvent.setup();
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
      
      const checkbox = screen.getByLabelText(/Include Charts and Visualizations/) as HTMLInputElement;
      
      // Initially checked
      expect(checkbox.checked).toBe(true);
      
      // Uncheck
      await user.click(checkbox);
      expect(checkbox.checked).toBe(false);
      
      // Check again
      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Property 2.7: Modal State Independence Preservation', () => {
    it('should preserve independent modal state for different reports', async () => {
      const user = userEvent.setup();
      render(<Reports />);
      
      // Open modal for first report
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
      
      // Change format to Excel
      const formatSelect = screen.getByLabelText(/Export Format/) as HTMLSelectElement;
      await user.selectOptions(formatSelect, 'excel');
      
      // Close modal
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      
      // Open modal for second report
      fireEvent.click(generateButtons[1]);
      
      await waitFor(() => {
        expect(screen.getByText('Generate Balance Sheet')).toBeInTheDocument();
      });
      
      // Format should reset to default (PDF)
      const newFormatSelect = screen.getByLabelText(/Export Format/) as HTMLSelectElement;
      expect(newFormatSelect.value).toBe('pdf');
    });
  });

  describe('Property 2.8: Form Validation Preservation', () => {
    it('should preserve required field indicators', async () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        // Check for required field asterisks
        const requiredIndicators = screen.getAllByText('*');
        expect(requiredIndicators.length).toBeGreaterThanOrEqual(2); // Date Range and Export Format
      });
    });

    it('should preserve custom date validation requirement', async () => {
      const user = userEvent.setup();
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      });
      
      // Select custom range
      const dateRangeSelect = screen.getByLabelText(/Date Range/);
      await user.selectOptions(dateRangeSelect, 'custom');
      
      await waitFor(() => {
        const startDateInput = screen.getByLabelText(/Start Date/);
        const endDateInput = screen.getByLabelText(/End Date/);
        
        // Both should be required
        expect(startDateInput).toHaveAttribute('required');
        expect(endDateInput).toHaveAttribute('required');
      });
    });
  });

  describe('Property 2.9: Report Card Icons Preservation', () => {
    it('should preserve icon rendering for all report cards', () => {
      const { container } = render(<Reports />);
      
      // Verify icons are rendered (Lucide icons render as SVG elements)
      const svgIcons = container.querySelectorAll('svg');
      
      // Should have at least 6 icons (one per report card) plus any in buttons
      expect(svgIcons.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('Property 2.10: Multiple Report Modal Interactions', () => {
    it('should preserve ability to open modals for different reports sequentially', async () => {
      render(<Reports />);
      
      const generateButtons = screen.getAllByText('Generate');
      
      // Test opening modal for each report type
      const reportTitles = [
        'Income Statement',
        'Balance Sheet',
        'Budget Variance Report',
        'Fund Balance Report',
        'Offering Summary',
        'Expense Report'
      ];
      
      for (let i = 0; i < reportTitles.length; i++) {
        // Open modal
        fireEvent.click(generateButtons[i]);
        
        await waitFor(() => {
          expect(screen.getByText(`Generate ${reportTitles[i]}`)).toBeInTheDocument();
        });
        
        // Close modal
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);
        
        await waitFor(() => {
          expect(screen.queryByText(`Generate ${reportTitles[i]}`)).not.toBeInTheDocument();
        });
      }
    });
  });
});   expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
      expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
      expect(screen.getByText('Offering Summary')).toBeInTheDocument();
      expect(screen.getByText('Expense Report')).toBeInTheDocument();
    });

    it('should preserve report card descriptions', () => {
      render(<Reports />);
      
      // Verify descriptions are displayed
      expect(screen.getByText('Summary of income and expenses over a period')).toBeInTheDocument();
      expect(screen.getByText('Financial position at a specific point in time')).toBeInTheDocument();
      expect(screen.getByText('Compare actual vs budgeted amounts')).toBeInTheDocument();
      expect(screen.getByText('Current balance of all funds')).toBeInTheDocument();
      expect(screen.getByText('Detailed breakdown of offerings received')).toBeInTheDocument();
      expect(screen.getByText('Detailed listing of all expenses')).toBeInTheDocument();
    });

    it('should preserve report card structure with Generate and View Last buttons', () => {
      const { container } = render(<Reports />);
      const buttons = container.querySelectorAll('button');
      
      const generateButtons = Array.from(buttons).filter(
        btn => btn.textContent?.includes('Generate') && !btn.textContent?.includes('Generating')
      );
      expect(generateButtons.length).toBeGreaterThanOrEqual(6);
      
      const viewLastButtons = Array.from(buttons).filter(
        btn => btn.textContent?.includes('View Last')
      );
      expect(viewLastButtons.length).toBeGreaterThanOrEqual(6);
    });

    it('should preserve last generated dates display', () => {
      render(<Reports />);
      
      // All reports have lastGenerated dates in the mock data
      const lastGeneratedElements = screen.getAllByText(/Last generated:/);
      expect(lastGeneratedElements.length).toBe(6);
    });

    it('should preserve report card icons', () => {
      const { container } = render(<Reports />);
      
      // Check that icon containers exist (they have specific styling classes)
      const iconContainers = container.querySelectorAll('.bg-primary-100');
      expect(iconContainers.length).toBe(6);
    });
  });

  describe('Property 2: Preservation - Modal Interactions', () => {
    it('should preserve modal opening when Generate button is clicked', () => {
      render(<Reports />);
      
      // Click the first Generate button (Income Statement)
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Modal should open with the report title
      expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
    });

    it('should preserve modal closing when Cancel button is clicked', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Verify modal is open
      expect(screen.getByText('Generate Income Statement')).toBeInTheDocument();
      
      // Click Cancel
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      
      // Modal should close
      expect(screen.queryByText('Generate Income Statement')).not.toBeInTheDocument();
    });

    it('should preserve modal opening for different report types', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            'Income Statement',
            'Balance Sheet',
            'Budget Variance Report',
            'Fund Balance Report',
            'Offering Summary',
            'Expense Report'
          ),
          (reportTitle) => {
            const { unmount } = render(<Reports />);
            
            // Find and click the Generate button for this report
            const reportCard = screen.getByText(reportTitle).closest('.p-6');
            expect(reportCard).toBeInTheDocument();
            
            const generateButton = reportCard?.querySelector('button');
            expect(generateButton).toBeInTheDocument();
            fireEvent.click(generateButton!);
            
            // Modal should open with correct title
            expect(screen.getByText(`Generate ${reportTitle}`)).toBeInTheDocument();
            
            unmount();
          }
        ),
        { numRuns: 6 } // Test all 6 report types
      );
    });
  });

  describe('Property 2: Preservation - Form Input Handling', () => {
    it('should preserve date range selection changes', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Find date range select
      const dateRangeSelect = screen.getByLabelText(/Date Range/);
      expect(dateRangeSelect).toBeInTheDocument();
      
      // Change to different options
      fireEvent.change(dateRangeSelect, { target: { value: 'last_month' } });
      expect(dateRangeSelect).toHaveValue('last_month');
      
      fireEvent.change(dateRangeSelect, { target: { value: 'this_quarter' } });
      expect(dateRangeSelect).toHaveValue('this_quarter');
      
      fireEvent.change(dateRangeSelect, { target: { value: 'custom' } });
      expect(dateRangeSelect).toHaveValue('custom');
    });

    it('should preserve custom date range input fields appearing when custom is selected', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Initially, custom date fields should not be visible
      expect(screen.queryByLabelText(/Start Date/)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/End Date/)).not.toBeInTheDocument();
      
      // Change to custom range
      const dateRangeSelect = screen.getByLabelText(/Date Range/);
      fireEvent.change(dateRangeSelect, { target: { value: 'custom' } });
      
      // Custom date fields should now be visible
      expect(screen.getByLabelText(/Start Date/)).toBeInTheDocument();
      expect(screen.getByLabelText(/End Date/)).toBeInTheDocument();
    });

    it('should preserve format selection changes', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Find format select
      const formatSelect = screen.getByLabelText(/Export Format/);
      expect(formatSelect).toHaveValue('pdf');
      
      // Change format
      fireEvent.change(formatSelect, { target: { value: 'excel' } });
      expect(formatSelect).toHaveValue('excel');
      
      fireEvent.change(formatSelect, { target: { value: 'csv' } });
      expect(formatSelect).toHaveValue('csv');
    });

    it('should preserve include charts checkbox toggle', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Find checkbox
      const checkbox = screen.getByLabelText(/Include Charts and Visualizations/);
      expect(checkbox).toBeChecked(); // Default is true
      
      // Toggle checkbox
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('should preserve all date range options availability', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            'this_month',
            'last_month',
            'this_quarter',
            'last_quarter',
            'this_year',
            'last_year',
            'custom'
          ),
          (dateRange) => {
            const { unmount } = render(<Reports />);
            
            // Open modal
            const generateButtons = screen.getAllByText('Generate');
            fireEvent.click(generateButtons[0]);
            
            // Find and change date range
            const dateRangeSelect = screen.getByLabelText(/Date Range/);
            fireEvent.change(dateRangeSelect, { target: { value: dateRange } });
            
            // Verify the value was set
            expect(dateRangeSelect).toHaveValue(dateRange);
            
            unmount();
          }
        ),
        { numRuns: 7 } // Test all 7 date range options
      );
    });
  });

  describe('Property 2: Preservation - Form Validation', () => {
    it('should preserve required field indicators', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Check for required field asterisks
      const requiredLabels = screen.getAllByText('*');
      expect(requiredLabels.length).toBeGreaterThan(0);
    });

    it('should preserve custom date validation (fields required when custom selected)', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Change to custom range
      const dateRangeSelect = screen.getByLabelText(/Date Range/);
      fireEvent.change(dateRangeSelect, { target: { value: 'custom' } });
      
      // Custom date fields should have required attribute
      const startDateInput = screen.getByLabelText(/Start Date/);
      const endDateInput = screen.getByLabelText(/End Date/);
      
      expect(startDateInput).toHaveAttribute('required');
      expect(endDateInput).toHaveAttribute('required');
    });
  });

  describe('Property 2: Preservation - Button States', () => {
    it('should preserve Generate button initial enabled state', () => {
      render(<Reports />);
      
      const generateButtons = screen.getAllByText('Generate');
      generateButtons.forEach(button => {
        expect(button).not.toBeDisabled();
      });
    });

    it('should preserve View Last button initial enabled state', () => {
      render(<Reports />);
      
      const viewLastButtons = screen.getAllByText('View Last');
      viewLastButtons.forEach(button => {
        expect(button).not.toBeDisabled();
      });
    });

    it('should preserve modal action buttons initial state', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Check Cancel and Generate Report buttons
      const cancelButton = screen.getByText('Cancel');
      const generateReportButton = screen.getByText('Generate Report');
      
      expect(cancelButton).not.toBeDisabled();
      expect(generateReportButton).not.toBeDisabled();
    });
  });

  describe('Property 2: Preservation - Page Header and Layout', () => {
    it('should preserve page header title', () => {
      render(<Reports />);
      
      expect(screen.getByText('Financial Reports')).toBeInTheDocument();
    });

    it('should preserve page header description', () => {
      render(<Reports />);
      
      expect(screen.getByText('Generate and view financial reports')).toBeInTheDocument();
    });

    it('should preserve grid layout structure', () => {
      const { container } = render(<Reports />);
      
      // Check for grid container
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });
  });

  describe('Property 2: Preservation - Modal Structure', () => {
    it('should preserve modal form structure', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Verify form elements exist
      expect(screen.getByLabelText(/Date Range/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Export Format/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Include Charts and Visualizations/)).toBeInTheDocument();
    });

    it('should preserve modal action buttons', () => {
      render(<Reports />);
      
      // Open modal
      const generateButtons = screen.getAllByText('Generate');
      fireEvent.click(generateButtons[0]);
      
      // Verify action buttons exist
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Generate Report')).toBeInTheDocument();
    });
  });

  describe('Property 2: Preservation - Date Formatting', () => {
    it('should preserve date formatting for last generated dates', () => {
      render(<Reports />);
      
      // Check that dates are formatted (e.g., "Jan 15, 2024" format)
      const dateElements = screen.getAllByText(/Last generated:/);
      expect(dateElements.length).toBe(6);
      
      // Verify at least one date is properly formatted
      expect(screen.getByText(/Last generated: \w+ \d+, \d{4}/)).toBeInTheDocument();
    });
  });

  describe('Property 2: Preservation - Report Type Mapping', () => {
    it('should preserve all six report types in the data structure', () => {
      render(<Reports />);
      
      // Verify all report IDs are represented by checking titles
      const expectedReports = [
        'Income Statement',
        'Balance Sheet',
        'Budget Variance Report',
        'Fund Balance Report',
        'Offering Summary',
        'Expense Report'
      ];
      
      expectedReports.forEach(reportTitle => {
        expect(screen.getByText(reportTitle)).toBeInTheDocument();
      });
    });
  });
});
  it('should preserve report card structure with Generate and View Last buttons', () => {
    const { container } = render(<Reports />);
    
    // Find all buttons with "Generate" text
    const generateButtons = container.querySelectorAll('button');
    const generateButtonsArray = Array.from(generateButtons).filter(
      btn => btn.textContent?.includes('Generate')
    );
    
    // Should have 6 Generate buttons (one per report type)
    expect(generateButtonsArray.length).toBeGreaterThanOrEqual(6);
    
    // Find all buttons with "View Last" text
    const viewLastButtons = Array.from(generateButtons).filter(
      btn => btn.textContent?.includes('View Last')
    );
    
    // Should have 6 View Last buttons (one per report type)
    expect(viewLastButtons.length).toBeGreaterThanOrEqual(6);
  });
});
