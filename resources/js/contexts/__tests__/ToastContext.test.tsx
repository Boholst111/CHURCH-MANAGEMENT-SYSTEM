import { render, screen, waitFor, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../ToastContext';

/**
 * Test component that uses the toast hook
 */
const TestComponent = () => {
  const { showToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast('success', 'Success message')}>
        Show Success
      </button>
      <button onClick={() => showToast('error', 'Error message')}>
        Show Error
      </button>
      <button onClick={() => showToast('info', 'Info message')}>
        Show Info
      </button>
    </div>
  );
};

/**
 * Unit tests for Toast Context
 * 
 * Tests the toast notification system:
 * - Toast provider setup
 * - Showing different toast types
 * - Auto-dismissal after 5 seconds
 * - Manual dismissal
 * 
 * Validates Requirements: 3.4, 3.5 (user feedback)
 */
describe('ToastContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('throws error when useToast is used outside ToastProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');

    consoleSpy.mockRestore();
  });

  it('shows success toast when showToast is called with success type', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Success');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('shows error toast when showToast is called with error type', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Error');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows info toast when showToast is called with info type', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Info');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('auto-dismisses toast after 5 seconds', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Success');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();

    // Fast-forward time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
  });

  it('allows multiple toasts to be shown simultaneously', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Success').click();
      screen.getByText('Show Error').click();
      screen.getByText('Show Info').click();
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('manually dismisses toast when close button is clicked', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Success').click();
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();

    // Find and click the close button (X icon)
    const closeButtons = screen.getAllByRole('button');
    const closeButton = closeButtons.find(
      (btn) => btn.querySelector('svg') && btn !== screen.getByText('Show Success')
    );

    act(() => {
      closeButton?.click();
    });

    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
  });

  it('displays correct icon for each toast type', () => {
    const { container } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Show success toast
    act(() => {
      screen.getByText('Show Success').click();
    });

    // Success toast should have success styling
    const successToast = screen.getByRole('alert');
    expect(successToast).toHaveClass('bg-success-50');

    // Show error toast
    act(() => {
      screen.getByText('Show Error').click();
    });

    // Error toast should have error styling (get all alerts, last one is the new one)
    const alerts = screen.getAllByRole('alert');
    const errorToast = alerts[alerts.length - 1];
    expect(errorToast).toHaveClass('bg-error-50');

    // Show info toast
    act(() => {
      screen.getByText('Show Info').click();
    });

    // Info toast should have info styling
    const allAlerts = screen.getAllByRole('alert');
    const infoToast = allAlerts[allAlerts.length - 1];
    expect(infoToast).toHaveClass('bg-info-50');
  });
});
