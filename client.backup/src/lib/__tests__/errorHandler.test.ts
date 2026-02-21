import {
  getErrorMessage,
  getValidationErrors,
  isValidationError,
  isAuthError,
  isAuthorizationError,
  isNotFoundError,
  isServerError,
  getStatusCode,
  formatErrorForLogging,
} from '../errorHandler';

describe('errorHandler', () => {
  describe('getErrorMessage', () => {
    it('should return message from API error response', () => {
      const error = {
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      };

      expect(getErrorMessage(error)).toBe('Invalid credentials');
    });

    it('should return first validation error if no message', () => {
      const error = {
        response: {
          data: {
            errors: {
              email: ['Email is required'],
              password: ['Password is required'],
            },
          },
        },
      };

      expect(getErrorMessage(error)).toBe('Email is required');
    });

    it('should return user-friendly message for network errors', () => {
      const error = {
        message: 'Network Error',
      };

      expect(getErrorMessage(error)).toBe('Unable to connect to the server. Please check your internet connection.');
    });

    it('should return user-friendly message for timeout errors', () => {
      const error = {
        message: 'Request timeout',
      };

      expect(getErrorMessage(error)).toBe('The request took too long. Please try again.');
    });

    it('should return error message if available', () => {
      const error = {
        message: 'Something went wrong',
      };

      expect(getErrorMessage(error)).toBe('Something went wrong');
    });

    it('should return default message if no error info available', () => {
      const error = {};

      expect(getErrorMessage(error)).toBe('An error occurred');
    });

    it('should return custom default message', () => {
      const error = {};

      expect(getErrorMessage(error, 'Custom error')).toBe('Custom error');
    });
  });

  describe('getValidationErrors', () => {
    it('should extract validation errors from API response', () => {
      const error = {
        response: {
          data: {
            errors: {
              email: ['Email is required', 'Email must be valid'],
              password: ['Password is required'],
            },
          },
        },
      };

      const validationErrors = getValidationErrors(error);

      expect(validationErrors).toEqual({
        email: 'Email is required',
        password: 'Password is required',
      });
    });

    it('should return empty object if no validation errors', () => {
      const error = {
        response: {
          data: {
            message: 'Error',
          },
        },
      };

      expect(getValidationErrors(error)).toEqual({});
    });

    it('should return empty object if no response', () => {
      const error = {};

      expect(getValidationErrors(error)).toEqual({});
    });
  });

  describe('isValidationError', () => {
    it('should return true for 422 status', () => {
      const error = {
        response: {
          status: 422,
        },
      };

      expect(isValidationError(error)).toBe(true);
    });

    it('should return true for 400 status', () => {
      const error = {
        response: {
          status: 400,
        },
      };

      expect(isValidationError(error)).toBe(true);
    });

    it('should return false for other status codes', () => {
      const error = {
        response: {
          status: 500,
        },
      };

      expect(isValidationError(error)).toBe(false);
    });
  });

  describe('isAuthError', () => {
    it('should return true for 401 status', () => {
      const error = {
        response: {
          status: 401,
        },
      };

      expect(isAuthError(error)).toBe(true);
    });

    it('should return false for other status codes', () => {
      const error = {
        response: {
          status: 403,
        },
      };

      expect(isAuthError(error)).toBe(false);
    });
  });

  describe('isAuthorizationError', () => {
    it('should return true for 403 status', () => {
      const error = {
        response: {
          status: 403,
        },
      };

      expect(isAuthorizationError(error)).toBe(true);
    });

    it('should return false for other status codes', () => {
      const error = {
        response: {
          status: 401,
        },
      };

      expect(isAuthorizationError(error)).toBe(false);
    });
  });

  describe('isNotFoundError', () => {
    it('should return true for 404 status', () => {
      const error = {
        response: {
          status: 404,
        },
      };

      expect(isNotFoundError(error)).toBe(true);
    });

    it('should return false for other status codes', () => {
      const error = {
        response: {
          status: 500,
        },
      };

      expect(isNotFoundError(error)).toBe(false);
    });
  });

  describe('isServerError', () => {
    it('should return true for 500 status', () => {
      const error = {
        response: {
          status: 500,
        },
      };

      expect(isServerError(error)).toBe(true);
    });

    it('should return true for 503 status', () => {
      const error = {
        response: {
          status: 503,
        },
      };

      expect(isServerError(error)).toBe(true);
    });

    it('should return false for client errors', () => {
      const error = {
        response: {
          status: 400,
        },
      };

      expect(isServerError(error)).toBe(false);
    });
  });

  describe('getStatusCode', () => {
    it('should return status code from error response', () => {
      const error = {
        response: {
          status: 404,
        },
      };

      expect(getStatusCode(error)).toBe(404);
    });

    it('should return null if no status code', () => {
      const error = {};

      expect(getStatusCode(error)).toBeNull();
    });
  });

  describe('formatErrorForLogging', () => {
    it('should format error with all details', () => {
      const error = {
        message: 'Test error',
        response: {
          status: 500,
          data: {
            message: 'Server error',
          },
        },
        stack: 'Error stack trace',
      };

      const formatted = formatErrorForLogging(error, 'Test context');

      expect(formatted).toMatchObject({
        context: 'Test context',
        message: 'Test error',
        status: 500,
        response: {
          message: 'Server error',
        },
        stack: 'Error stack trace',
      });
      expect(formatted).toHaveProperty('timestamp');
    });

    it('should format error without context', () => {
      const error = {
        message: 'Test error',
      };

      const formatted = formatErrorForLogging(error);

      expect(formatted).toMatchObject({
        context: undefined,
        message: 'Test error',
        status: null,
      });
    });
  });
});
