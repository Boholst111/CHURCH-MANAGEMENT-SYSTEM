/**
 * Unit Tests for withApiErrorHandling Utility
 * 
 * Tests the API error handling wrapper including:
 * - Successful API calls
 * - Error handling
 * - Retry logic
 * - Custom error messages
 * 
 * Validates Requirements: Task 22.3 - API Error Handling with Retry
 */

import { withApiErrorHandling, createRetryFunction } from '../withApiErrorHandling';

describe('withApiErrorHandling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Successful API Calls', () => {
    it('should return data on successful API call', async () => {
      const mockApiCall = jest.fn().mockResolvedValue({ data: 'success' });

      const result = await withApiErrorHandling(mockApiCall);

      expect(result).toEqual({ data: 'success' });
      expect(mockApiCall).toHaveBeenCalledTimes(1);
    });

    it('should not retry on successful call', async () => {
      const mockApiCall = jest.fn().mockResolvedValue({ data: 'success' });

      await withApiErrorHandling(mockApiCall, { maxRetries: 3 });

      expect(mockApiCall).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Handling', () => {
    it('should return null on error by default', async () => {
      const mockApiCall = jest.fn().mockRejectedValue(new Error('API Error'));

      const result = await withApiErrorHandling(mockApiCall);

      expect(result).toBeNull();
    });

    it('should throw error when throwError is true', async () => {
      const mockApiCall = jest.fn().mockRejectedValue(new Error('API Error'));

      await expect(
        withApiErrorHandling(mockApiCall, { throwError: true })
      ).rejects.toThrow('API Error');
    });

    it('should call onError callback on error', async () => {
      const mockApiCall = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockOnError = jest.fn();

      await withApiErrorHandling(mockApiCall, { onError: mockOnError });

      expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should not call onError on successful call', async () => {
      const mockApiCall = jest.fn().mockResolvedValue({ data: 'success' });
      const mockOnError = jest.fn();

      await withApiErrorHandling(mockApiCall, { onError: mockOnError });

      expect(mockOnError).not.toHaveBeenCalled();
    });
  });

  describe('Retry Logic', () => {
    it('should retry on retryable errors', async () => {
      const mockApiCall = jest
        .fn()
        .mockRejectedValueOnce({
          response: { status: 500 },
          message: 'Server error',
        })
        .mockResolvedValueOnce({ data: 'success' });

      const result = await withApiErrorHandling(mockApiCall, {
        maxRetries: 1,
        retryDelay: 10,
      });

      expect(result).toEqual({ data: 'success' });
      expect(mockApiCall).toHaveBeenCalledTimes(2);
    });

    it('should retry on network errors', async () => {
      const mockApiCall = jest
        .fn()
        .mockRejectedValueOnce({
          message: 'Network Error',
          code: 'ERR_NETWORK',
        })
        .mockResolvedValueOnce({ data: 'success' });

      const result = await withApiErrorHandling(mockApiCall, {
        maxRetries: 1,
        retryDelay: 10,
      });

      expect(result).toEqual({ data: 'success' });
      expect(mockApiCall).toHaveBeenCalledTimes(2);
    });

    it('should respect maxRetries limit', async () => {
      const mockApiCall = jest.fn().mockRejectedValue({
        response: { status: 500 },
        message: 'Server error',
      });

      await withApiErrorHandling(mockApiCall, {
        maxRetries: 3,
        retryDelay: 10,
      });

      expect(mockApiCall).toHaveBeenCalledTimes(4); // Initial + 3 retries
    });

    it('should not retry non-retryable errors', async () => {
      const mockApiCall = jest.fn().mockRejectedValue({
        response: { status: 400 },
        message: 'Bad request',
      });

      await withApiErrorHandling(mockApiCall, {
        maxRetries: 3,
        retryDelay: 10,
      });

      expect(mockApiCall).toHaveBeenCalledTimes(1); // No retries
    });

    it('should wait between retries', async () => {
      jest.useFakeTimers();
      const mockApiCall = jest.fn().mockRejectedValue({
        response: { status: 500 },
        message: 'Server error',
      });

      const promise = withApiErrorHandling(mockApiCall, {
        maxRetries: 2,
        retryDelay: 1000,
      });

      // Fast-forward time
      await jest.advanceTimersByTimeAsync(2000);

      await promise;

      expect(mockApiCall).toHaveBeenCalledTimes(3);
      jest.useRealTimers();
    });
  });

  describe('Context Logging', () => {
    it('should log context with errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockApiCall = jest.fn().mockRejectedValue(new Error('API Error'));

      await withApiErrorHandling(mockApiCall, {
        context: 'User Login',
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[API Error]'),
        expect.objectContaining({
          context: 'User Login',
        })
      );

      consoleSpy.mockRestore();
    });
  });
});

describe('createRetryFunction', () => {
  it('should create a retry function', async () => {
    const mockApiCall = jest.fn().mockResolvedValue({ data: 'success' });
    const mockOnSuccess = jest.fn();

    const retryFn = createRetryFunction(mockApiCall, mockOnSuccess);

    await retryFn();

    expect(mockApiCall).toHaveBeenCalledTimes(1);
    expect(mockOnSuccess).toHaveBeenCalledWith({ data: 'success' });
  });

  it('should call onError on failure', async () => {
    const mockApiCall = jest.fn().mockRejectedValue(new Error('API Error'));
    const mockOnError = jest.fn();

    const retryFn = createRetryFunction(mockApiCall, undefined, mockOnError);

    await retryFn();

    expect(mockApiCall).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should not throw on error', async () => {
    const mockApiCall = jest.fn().mockRejectedValue(new Error('API Error'));

    const retryFn = createRetryFunction(mockApiCall);

    await expect(retryFn()).resolves.not.toThrow();
  });
});
