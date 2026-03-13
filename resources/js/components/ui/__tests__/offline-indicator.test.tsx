/**
 * Unit Tests for Offline Indicator Component
 * 
 * Tests the offline indicator functionality including:
 * - Display when offline
 * - Hide when online
 * - Show reconnection message
 * - Accessibility
 * 
 * Validates Requirements: Task 22.3 - Show offline indicator if network is down
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { OfflineIndicator } from '../offline-indicator';

// Mock navigator.onLine
const mockNavigatorOnLine = (isOnline: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: isOnline,
  });
};

describe('OfflineIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigatorOnLine(true);
  });

  it('should not render when online', () => {
    mockNavigatorOnLine(true);
    const { container } = render(<OfflineIndicator />);
    expect(container.firstChild).toBeNull();
  });

  it('should render offline message when offline', async () => {
    mockNavigatorOnLine(false);
    render(<OfflineIndicator />);

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('You are offline. Please check your internet connection.')
      ).toBeInTheDocument();
    });
  });

  it('should show reconnection message when coming back online', async () => {
    mockNavigatorOnLine(false);
    render(<OfflineIndicator />);

    // Go offline
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('You are offline. Please check your internet connection.')
      ).toBeInTheDocument();
    });

    // Come back online
    mockNavigatorOnLine(true);
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('Connection restored. You are back online.')
      ).toBeInTheDocument();
    });
  });

  it('should hide reconnection message after 3 seconds', async () => {
    jest.useFakeTimers();
    mockNavigatorOnLine(false);
    render(<OfflineIndicator />);

    // Go offline
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    // Come back online
    mockNavigatorOnLine(true);
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('Connection restored. You are back online.')
      ).toBeInTheDocument();
    });

    // Fast-forward 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Connection restored. You are back online.')
      ).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('should have proper ARIA attributes', async () => {
    mockNavigatorOnLine(false);
    render(<OfflineIndicator />);

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });
  });

  it('should display wifi off icon when offline', async () => {
    mockNavigatorOnLine(false);
    render(<OfflineIndicator />);

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    await waitFor(() => {
      const icon = screen.getByText(
        'You are offline. Please check your internet connection.'
      ).previousSibling;
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('should display wifi icon when reconnected', async () => {
    mockNavigatorOnLine(false);
    render(<OfflineIndicator />);

    // Go offline
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    // Come back online
    mockNavigatorOnLine(true);
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    await waitFor(() => {
      const icon = screen.getByText(
        'Connection restored. You are back online.'
      ).previousSibling;
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('should apply correct styling when offline', async () => {
    mockNavigatorOnLine(false);
    render(<OfflineIndicator />);

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('bg-error-600');
      expect(alert).toHaveClass('text-white');
    });
  });

  it('should apply correct styling when reconnected', async () => {
    mockNavigatorOnLine(false);
    render(<OfflineIndicator />);

    // Go offline
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    // Come back online
    mockNavigatorOnLine(true);
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('bg-success-600');
      expect(alert).toHaveClass('text-white');
    });
  });
});
