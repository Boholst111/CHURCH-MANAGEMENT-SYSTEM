import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReportControls } from '../ReportControls';

describe('ReportControls', () => {
  const mockProps = {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    onStartDateChange: jest.fn(),
    onEndDateChange: jest.fn(),
    onPrint: jest.fn(),
    onDownloadPDF: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with all elements', () => {
    render(<ReportControls {...mockProps} />);

    expect(screen.getByText('Report Controls')).toBeInTheDocument();
    expect(screen.getByText('Select date range and export options')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /print/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download pdf/i })).toBeInTheDocument();
  });

  it('displays the correct date values', () => {
    render(<ReportControls {...mockProps} />);

    const startDateInput = screen.getByLabelText('Start Date') as HTMLInputElement;
    const endDateInput = screen.getByLabelText('End Date') as HTMLInputElement;

    expect(startDateInput.value).toBe('2024-01-01');
    expect(endDateInput.value).toBe('2024-12-31');
  });

  it('calls onStartDateChange when start date is changed', () => {
    render(<ReportControls {...mockProps} />);

    const startDateInput = screen.getByLabelText('Start Date');
    fireEvent.change(startDateInput, { target: { value: '2024-02-01' } });

    expect(mockProps.onStartDateChange).toHaveBeenCalledWith('2024-02-01');
    expect(mockProps.onStartDateChange).toHaveBeenCalledTimes(1);
  });

  it('calls onEndDateChange when end date is changed', () => {
    render(<ReportControls {...mockProps} />);

    const endDateInput = screen.getByLabelText('End Date');
    fireEvent.change(endDateInput, { target: { value: '2024-11-30' } });

    expect(mockProps.onEndDateChange).toHaveBeenCalledWith('2024-11-30');
    expect(mockProps.onEndDateChange).toHaveBeenCalledTimes(1);
  });

  it('calls onPrint when Print button is clicked', () => {
    render(<ReportControls {...mockProps} />);

    const printButton = screen.getByRole('button', { name: /print/i });
    fireEvent.click(printButton);

    expect(mockProps.onPrint).toHaveBeenCalledTimes(1);
  });

  it('calls onDownloadPDF when Download PDF button is clicked', () => {
    render(<ReportControls {...mockProps} />);

    const downloadButton = screen.getByRole('button', { name: /download pdf/i });
    fireEvent.click(downloadButton);

    expect(mockProps.onDownloadPDF).toHaveBeenCalledTimes(1);
  });

  it('renders with empty date values', () => {
    const emptyProps = {
      ...mockProps,
      startDate: '',
      endDate: '',
    };

    render(<ReportControls {...emptyProps} />);

    const startDateInput = screen.getByLabelText('Start Date') as HTMLInputElement;
    const endDateInput = screen.getByLabelText('End Date') as HTMLInputElement;

    expect(startDateInput.value).toBe('');
    expect(endDateInput.value).toBe('');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <ReportControls {...mockProps} className="custom-class" />
    );

    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('has correct input types for date fields', () => {
    render(<ReportControls {...mockProps} />);

    const startDateInput = screen.getByLabelText('Start Date') as HTMLInputElement;
    const endDateInput = screen.getByLabelText('End Date') as HTMLInputElement;

    expect(startDateInput.type).toBe('date');
    expect(endDateInput.type).toBe('date');
  });

  it('renders icons in buttons', () => {
    render(<ReportControls {...mockProps} />);

    // Check that buttons contain SVG icons (Lucide icons render as SVGs)
    const printButton = screen.getByRole('button', { name: /print/i });
    const downloadButton = screen.getByRole('button', { name: /download pdf/i });

    expect(printButton.querySelector('svg')).toBeInTheDocument();
    expect(downloadButton.querySelector('svg')).toBeInTheDocument();
  });

  it('maintains responsive grid layout for date inputs', () => {
    const { container } = render(<ReportControls {...mockProps} />);

    const gridContainer = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
  });
});
