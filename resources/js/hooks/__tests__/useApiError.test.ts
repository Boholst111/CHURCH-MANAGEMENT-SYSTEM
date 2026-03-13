/**
 * Unit Tests for useApiError Hook
 * 
 * Tests the API error handling hook functionality including:
 * - Error message display
 * - Retry functionality
 * - Network status monitoring
 * - Offline detection
 * 
 * Validates Requirements: Task 22.3 - API Error Handling
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useApiError } from '../useApiError';
import { useToast } from '../../contexts/ToastContext';

// Mock the toast context
jest.mock('../../contexts/ToastContext', () => ({
  useToast: jest.fn(),
}));

// Mock navigator.onLine
const mockNavigatorOnLine = (isOnline: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: isOnline,
  });
};

describe('useApiError', () => {
  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
    mockNavigatorOnLine(true);
  });

  describe('handleError', () => {
    it('should display user-friendly error message', () => {
      const { result } = renderHook(() => useApiError());

      const error = {
        response: {
          data: {
            message: 'Something went wrong',
          },
        },
      };

      act(() => {
        result.current.handleError(error);
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        'error',
        'Something went wrong',
        expect.objectContaining({
          duration: 5000,
        })
      );
    });

    it('should show offline message when navigator is offline', () => {
      mockNavigatorOnLine(false);
      const { result } = renderHook(() => useApiError());

      const error = new Error('Network error');

      act(() => {
        result.current.handleError(error);
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        'error',
        'You are offline. Please check your internet connection.',
        expect.objectContaining({
          duration: 0,
        })
      );
    });

    it('should show retry button for server errors', () => {
      const { result } = renderHook(() => useApiError());
      const mockRetry = jest.fn();

      const error = {
        response: {
          status: 500,
          data: {
            message: 'Internal server error',
          },
        },
      };

      act(() => {
        result.current.handleError(error, {
          showRetry: true,
          onRetry: mockRetry,
        });
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        'error',
        'Internal server error',
        expect.objectContaining({
          duration: 0,
          action: {
            label: 'Retry',
            onClick: mockRetry,
          },
        })
      );
    });

    it('should use custom error message when provided', () => {
      const { result } = renderHook(() => useApiError());

      const error = new Error('Technical error');

      act(() => {
        result.current.handleError(error, {
          message: 'Custom error message',
        });
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        'error',
        'Custom error message',
        expect.any(Object)
      );
    });

    it('should not show retry button for non-server errors', () => {
      const { result } = renderHook(() => useApiError());
      const mockRetry = jest.fn();

      const error = {
        response: {
          status: 400,
          data: {
            message: 'Bad request',
          },
        },
      };

      act(() => {
        result.current.handleError(error, {
          showRetry: true,
          onRetry: mockRetry,
        });
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        'error',
        'Bad request',
        expect.objectContaining({
          duration: 5000,
          action: undefined,
        })
      );
    });
  });

  describe('Network Status Monitoring', () => {
    it('should detect when user goes offline', async () => {
      const { result } = renderHook(() => useApiError());

      expect(result.current.isOnline()).toBe(true);

      // Simulate going offline
      mockNavigatorOnLine(false);
      act(() => {
        window.dispatchEvent(new Event('offline'));
      });

      await waitFor(() => {
        expect(result.current.isOnline()).toBe(false);
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        'error',
        'You are offline. Please check your internet connection.',
        expect.objectContaining({
          duration: 0,
        })
      );
    });

    it('should detect when user comes back online', async () => {
      mockNavigatorOnLine(false);
      const { result } = renderHook(() => useApiError());

      // Simulate going online
      mockNavigatorOnLine(true);
      act(() => {
        window.dispatchEvent(new Event('online'));
      });

      await waitFor(() => {
        expect(result.current.isOnline()).toBe(true);
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        'success',
        'Connection restored. You are back online.'
      );
    });

    it('should provide network status', () => {
      const { result } = renderHook(() => useApiError());

      expect(result.current.networkStatus).toEqual({
        isOnline: true,
        wasOffline: false,
      });
    });

    it('should track wasOffline flag', async () => {
      const { result } = renderHook(() => useApiError());

      // Go offline
      mockNavigatorOnLine(false);
      act(() => {
        window.dispatchEvent(new Event('offline'));
      });

      await waitFor(() => {
        expect(result.current.networkStatus.wasOffline).toBe(true);
      });

      // Come back online
      mockNavigatorOnLine(true);
      act(() => {
        window.dispatchEvent(new Event('online'));
      });

      await waitFor(() => {
        expect(result.current.networkStatus.isOnline).toBe(true);
        expect(result.current.networkStatus.wasOffline).toBe(true);
      });
    });

    it('should reset network status', async () => {
      const { result } = renderHook(() => useApiError());

      // Go offline and back online
      mockNavigatorOnLine(false);
      act(() => {
        window.dispatchEvent(new Event('offline'));
      });

      await waitFor(() => {
        expect(result.current.networkStatus.wasOffline).toBe(true);
      });

      mockNavigatorOnLine(true);
      act(() => {
        window.dispatchEvent(new Event('online'));
      });

      // Reset status
      act(() => {
        result.current.resetNetworkStatus();
      });

      expect(result.current.networkStatus.wasOffline).toBe(false);
    });
  });

  describe('isOnline', () => {
    it('should return true when online', () => {
      mockNavigatorOnLine(true);
      const { result } = renderHook(() => useApiError());

      expect(result.current.isOnline()).toBe(true);
    });

    it('should return false when offline', async () => {
      mockNavigatorOnLine(false);
      const { result } = renderHook(() => useApiError());

      act(() => {
        window.dispatchEvent(new Event('offline'));
      });

      await waitFor(() => {
        expect(result.current.isOnline()).toBe(false);
      });
    });
  });
});
