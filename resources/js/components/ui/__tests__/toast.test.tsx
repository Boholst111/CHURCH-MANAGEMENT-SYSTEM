import { render, screen, waitFor, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../../../contexts/ToastContext';

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
      <button onClick={() => showToast('warning', 'Warning message')}>
        Show Warning
      </button>
      <button onClick={() => showToast('info', 'Info message')}>
        Show Info
      </button>
      <button
        onClick={() =>
          showToast('success', 'With action', {
            action: {
              label: 'Click me',
              onClick: () => console.log('Action clicked'),
            },
          })
        }
      >
        Show With Action
      </button>
      <button
        onClick={() =>
          showToast('info', 'Custom duration', {
            duration: 2000,
          })
        }
      >
        Show Custom Duration
      </button>
      <button
        onClick={() =>
          showToast('warning', 'Persistent', {
            duration: 0,
          })
        }
      >
        Show Persistent
      </button>
    </div>
  );
};

/**
 * Unit tests for Toast Component
 * 
 * Tests the enhanced toast notification system:
 * - All four toast variants (success, error, warning, info)
 * - Action buttons in toasts
 * - Configurable duration
 * - Persistent toasts (duration: 0)
 * - Auto-dismissal
 * - Manual dismissal
 * - Multiple toasts stacking
 * - Accessibility attributes
 * 
 * Validates Requirements: Error Handling section
 */
describe('Toast Component', () => {
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

  it('shows success toast with correct styling', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Success');
    act(() => {
      button.click();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-success-50');
    expect(toast).toHaveClass('border-success-200');
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('shows error toast with correct styling', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Error');
    act(() => {
      button.click();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-error-50');
    expect(toast).toHaveClass('border-error-200');
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows warning toast with correct styling', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Warning');
    act(() => {
      button.click();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-warning-50');
    expect(toast).toHaveClass('border-warning-200');
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('shows info toast with correct styling', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Info');
    act(() => {
      button.click();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-info-50');
    expect(toast).toHaveClass('border-info-200');
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('displays action button when provided', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show With Action');
    act(() => {
      button.click();
    });

    expect(screen.getByText('With action')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls action onClick and removes toast when action button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show With Action');
    act(() => {
      button.click();
    });

    const actionButton = screen.getByText('Click me');
    act(() => {
      actionButton.click();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Action clicked');
    expect(screen.queryByText('With action')).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('auto-dismisses toast after default duration (5 seconds)', async () => {
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

  it('auto-dismisses toast after custom duration', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Custom Duration');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Custom duration')).toBeInTheDocument();

    // Fast-forward time by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Custom duration')).not.toBeInTheDocument();
    });
  });

  it('does not auto-dismiss toast when duration is 0', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Persistent');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Persistent')).toBeInTheDocument();

    // Fast-forward time by 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Toast should still be visible
    expect(screen.getByText('Persistent')).toBeInTheDocument();
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
    const closeButton = screen.getByLabelText('Close notification');
    act(() => {
      closeButton.click();
    });

    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
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
      screen.getByText('Show Warning').click();
      screen.getByText('Show Info').click();
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Success').click();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('role', 'alert');
    expect(toast).toHaveAttribute('aria-live', 'polite');

    const closeButton = screen.getByLabelText('Close notification');
    expect(closeButton).toBeInTheDocument();
  });

  it('displays correct icons for each toast type', () => {
    const { container } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Show all toast types
    act(() => {
      screen.getByText('Show Success').click();
      screen.getByText('Show Error').click();
      screen.getByText('Show Warning').click();
      screen.getByText('Show Info').click();
    });

    // All toasts should have icons (lucide-react icons render as SVGs)
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(4); // At least 4 icons for toast types + close buttons
  });

  it('stacks toasts vertically with proper spacing', () => {
    const { container } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Success').click();
      screen.getByText('Show Error').click();
    });

    // Check that the container has space-y-2 class for vertical spacing
    const toastContainer = container.querySelector('.space-y-2');
    expect(toastContainer).toBeInTheDocument();
  });

  it('positions toast container in top-right corner', () => {
    const { container } = render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Success').click();
    });

    const toastContainer = container.querySelector('.fixed.top-4.right-4');
    expect(toastContainer).toBeInTheDocument();
  });
});
