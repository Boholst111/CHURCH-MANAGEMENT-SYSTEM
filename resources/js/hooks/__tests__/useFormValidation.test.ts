/**
 * useFormValidation Hook Tests
 * 
 * Tests the form validation hook utilities including:
 * - Error counting
 * - Error message extraction
 * - First field focusing
 * - Error summary scrolling
 * 
 * Validates Requirements: 22.4
 */

import { renderHook } from '@testing-library/react';
import { useFormValidation } from '../useFormValidation';
import { FieldErrors } from 'react-hook-form';

describe('useFormValidation', () => {
  const mockSetFocus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getErrorCount', () => {
    it('should return 0 for empty errors', () => {
      const { result } = renderHook(() => useFormValidation());
      const errors: FieldErrors = {};
      
      expect(result.current.getErrorCount(errors)).toBe(0);
    });

    it('should return correct count for multiple errors', () => {
      const { result } = renderHook(() => useFormValidation());
      const errors: FieldErrors = {
        email: { type: 'required', message: 'Email is required' },
        password: { type: 'minLength', message: 'Password too short' },
        name: { type: 'required', message: 'Name is required' },
      };
      
      expect(result.current.getErrorCount(errors)).toBe(3);
    });
  });

  describe('getErrorMessages', () => {
    it('should return empty array for no errors', () => {
      const { result } = renderHook(() => useFormValidation());
      const errors: FieldErrors = {};
      
      expect(result.current.getErrorMessages(errors)).toEqual([]);
    });

    it('should extract error messages correctly', () => {
      const { result } = renderHook(() => useFormValidation());
      const errors: FieldErrors = {
        email: { type: 'required', message: 'Email is required' },
        password: { type: 'minLength', message: 'Password too short' },
      };
      
      const messages = result.current.getErrorMessages(errors);
      
      expect(messages).toEqual([
        { field: 'email', message: 'Email is required' },
        { field: 'password', message: 'Password too short' },
      ]);
    });

    it('should use default message when error has no message', () => {
      const { result } = renderHook(() => useFormValidation());
      const errors: FieldErrors = {
        email: { type: 'required' },
      };
      
      const messages = result.current.getErrorMessages(errors);
      
      expect(messages).toEqual([
        { field: 'email', message: 'Invalid value' },
      ]);
    });
  });

  describe('focusFirstInvalidField', () => {
    it('should focus first field when errors exist', () => {
      const { result } = renderHook(() =>
        useFormValidation(mockSetFocus, { focusFirstError: true })
      );
      
      const errors: FieldErrors = {
        email: { type: 'required', message: 'Email is required' },
        password: { type: 'required', message: 'Password is required' },
      };
      
      result.current.focusFirstInvalidField(errors);
      
      expect(mockSetFocus).toHaveBeenCalledWith('email');
      expect(mockSetFocus).toHaveBeenCalledTimes(1);
    });

    it('should not focus when focusFirstError is false', () => {
      const { result } = renderHook(() =>
        useFormValidation(mockSetFocus, { focusFirstError: false })
      );
      
      const errors: FieldErrors = {
        email: { type: 'required', message: 'Email is required' },
      };
      
      result.current.focusFirstInvalidField(errors);
      
      expect(mockSetFocus).not.toHaveBeenCalled();
    });

    it('should not focus when no errors exist', () => {
      const { result } = renderHook(() =>
        useFormValidation(mockSetFocus, { focusFirstError: true })
      );
      
      const errors: FieldErrors = {};
      
      result.current.focusFirstInvalidField(errors);
      
      expect(mockSetFocus).not.toHaveBeenCalled();
    });

    it('should not focus when setFocus is not provided', () => {
      const { result } = renderHook(() =>
        useFormValidation(undefined, { focusFirstError: true })
      );
      
      const errors: FieldErrors = {
        email: { type: 'required', message: 'Email is required' },
      };
      
      // Should not throw error
      expect(() => {
        result.current.focusFirstInvalidField(errors);
      }).not.toThrow();
    });
  });

  describe('scrollToErrorSummary', () => {
    it('should scroll to error summary when ref is set', () => {
      const mockScrollIntoView = jest.fn();
      const mockRef = {
        current: {
          scrollIntoView: mockScrollIntoView,
        } as any,
      };

      const { result } = renderHook(() =>
        useFormValidation(undefined, { scrollToError: true })
      );

      // Manually set the ref
      (result.current.errorSummaryRef as any).current = mockRef.current;

      result.current.scrollToErrorSummary();

      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should not scroll when scrollToError is false', () => {
      const mockScrollIntoView = jest.fn();
      const mockRef = {
        current: {
          scrollIntoView: mockScrollIntoView,
        } as any,
      };

      const { result } = renderHook(() =>
        useFormValidation(undefined, { scrollToError: false })
      );

      (result.current.errorSummaryRef as any).current = mockRef.current;

      result.current.scrollToErrorSummary();

      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });

    it('should use custom scroll behavior', () => {
      const mockScrollIntoView = jest.fn();
      const mockRef = {
        current: {
          scrollIntoView: mockScrollIntoView,
        } as any,
      };

      const { result } = renderHook(() =>
        useFormValidation(undefined, {
          scrollToError: true,
          scrollBehavior: 'auto',
        })
      );

      (result.current.errorSummaryRef as any).current = mockRef.current;

      result.current.scrollToErrorSummary();

      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'auto',
        block: 'start',
      });
    });
  });

  describe('handleValidationErrors', () => {
    it('should focus first field and scroll to summary', () => {
      const mockScrollIntoView = jest.fn();
      const mockRef = {
        current: {
          scrollIntoView: mockScrollIntoView,
        } as any,
      };

      const { result } = renderHook(() =>
        useFormValidation(mockSetFocus, {
          focusFirstError: true,
          scrollToError: true,
        })
      );

      (result.current.errorSummaryRef as any).current = mockRef.current;

      const errors: FieldErrors = {
        email: { type: 'required', message: 'Email is required' },
        password: { type: 'required', message: 'Password is required' },
      };

      result.current.handleValidationErrors(errors);

      expect(mockSetFocus).toHaveBeenCalledWith('email');
      expect(mockScrollIntoView).toHaveBeenCalled();
    });
  });
});
