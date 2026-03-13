import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reports from '../Reports';
import { ToastProvider } from '../../contexts/ToastContext';

// Helper function to render with ToastProvider
const renderWithToast = (component: React.ReactElement) => {
  return render(<ToastProvider>{component}</ToastProvider>);
};

describe('Reports Page Layout', () => {
  it('renders page header with title and subtitle', () => {
    renderWithToast(<Reports />);
    
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Generate and view church reports')).toBeInTheDocument();
  });

  it('renders all three report categories', () => {
    renderWithToast(<Reports />);
    
    expect(screen.getByText('Financial Reports')).toBeInTheDocument();
    expect(screen.getByText('Membership Reports')).toBeInTheDocument();
    expect(screen.getByText('Ministry Reports')).toBeInTheDocument();
  });

  it('renders financial report cards', () => {
    renderWithToast(<Reports />);
    
    expect(screen.getByText('Income Statement')).toBeInTheDocument();
    expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
    expect(screen.getByText('Budget Variance Report')).toBeInTheDocument();
    expect(screen.getByText('Fund Balance Report')).toBeInTheDocument();
    expect(screen.getByText('Offering Summary')).toBeInTheDocument();
    expect(screen.getByText('Expense Report')).toBeInTheDocument();
  });

  it('renders membership report cards', () => {
    renderWithToast(<Reports />);
    
    expect(screen.getByText('Member Directory')).toBeInTheDocument();
    expect(screen.getByText('Membership Growth')).toBeInTheDocument();
    expect(screen.getByText('Demographics Report')).toBeInTheDocument();
    expect(screen.getByText('Attendance Report')).toBeInTheDocument();
    expect(screen.getByText('New Members Report')).toBeInTheDocument();
  });

  it('renders ministry report cards', () => {
    renderWithToast(<Reports />);
    
    expect(screen.getByText('Small Groups Report')).toBeInTheDocument();
    expect(screen.getByText('Event Attendance')).toBeInTheDocument();
    expect(screen.getByText('Leadership Report')).toBeInTheDocument();
    expect(screen.getByText('Ministry Participation')).toBeInTheDocument();
  });

  it('displays last generated date for reports', () => {
    renderWithToast(<Reports />);
    
    const lastGeneratedTexts = screen.getAllByText(/Last generated:/);
    expect(lastGeneratedTexts.length).toBeGreaterThan(0);
  });

  it('renders action buttons for each report card', () => {
    renderWithToast(<Reports />);
    
    const generateButtons = screen.getAllByText('Generate');
    const viewLastButtons = screen.getAllByText('View Last');
    const scheduleButtons = screen.getAllByText('Schedule');
    
    expect(generateButtons.length).toBeGreaterThan(0);
    expect(viewLastButtons.length).toBeGreaterThan(0);
    expect(scheduleButtons.length).toBeGreaterThan(0);
  });

  it('opens report generation modal when Generate button is clicked', async () => {
    renderWithToast(<Reports />);
    
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/Generate Income Statement/)).toBeInTheDocument();
    });
  });

  it('report generation modal contains all required fields', async () => {
    renderWithToast(<Reports />);
    
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/Date Range/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Export Format/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Include Charts and Visualizations/)).toBeInTheDocument();
    });
  });

  it('shows custom date fields when Custom Range is selected', async () => {
    renderWithToast(<Reports />);
    
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[0]);
    
    await waitFor(() => {
      const dateRangeSelect = screen.getByLabelText(/Date Range/);
      fireEvent.change(dateRangeSelect, { target: { value: 'custom' } });
    });
    
    await waitFor(() => {
      expect(screen.getByLabelText(/Start Date/)).toBeInTheDocument();
      expect(screen.getByLabelText(/End Date/)).toBeInTheDocument();
    });
  });

  it('closes modal when Cancel button is clicked', async () => {
    renderWithToast(<Reports />);
    
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/Generate Income Statement/)).toBeInTheDocument();
    });
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    await waitFor(() => {
      expect(screen.queryByText(/Generate Income Statement/)).not.toBeInTheDocument();
    });
  });

  it('displays loading state during report generation', async () => {
    // Mock fetch to delay response so we can capture loading state
    global.fetch = jest.fn(() =>
      new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        headers: new Headers({ 'content-type': 'application/pdf' }),
        blob: () => Promise.resolve(new Blob(['test'], { type: 'application/pdf' }))
      } as Response), 100))
    ) as jest.Mock;

    renderWithToast(<Reports />);
    
    const generateButtons = screen.getAllByText('Generate');
    fireEvent.click(generateButtons[0]);
    
    await waitFor(() => {
      const generateReportButton = screen.getByText('Generate Report');
      fireEvent.click(generateReportButton);
    });
    
    // Check for loading state immediately after clicking
    expect(screen.getByText('Generating...')).toBeInTheDocument();
    
    // Clean up
    await waitFor(() => {
      expect(screen.queryByText('Generating...')).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('report cards have hover effects', () => {
    const { container } = renderWithToast(<Reports />);
    
    const reportCards = container.querySelectorAll('.hover\\:shadow-md');
    expect(reportCards.length).toBeGreaterThan(0);
  });

  it('renders report descriptions', () => {
    renderWithToast(<Reports />);
    
    expect(screen.getByText('Summary of income and expenses over a period')).toBeInTheDocument();
    expect(screen.getByText('Complete listing of all church members')).toBeInTheDocument();
    expect(screen.getByText('Overview of all small groups and participation')).toBeInTheDocument();
  });

  it('renders category icons', () => {
    const { container } = renderWithToast(<Reports />);
    
    // Check for icon containers
    const iconContainers = container.querySelectorAll('.bg-primary-100');
    expect(iconContainers.length).toBeGreaterThan(0);
  });
});
