import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getErrorMessage } from './errorHandler';

const API_BASE_URL = '/api';

/**
 * Type guard to check if an error response has a message property
 */
export function isApiErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}

/**
 * Type guard to check if an error response has validation errors
 */
export function isApiErrorWithValidation(error: unknown): error is { message: string; errors: Record<string, string[]> } {
  return (
    isApiErrorWithMessage(error) &&
    'errors' in error &&
    typeof (error as { errors: unknown }).errors === 'object' &&
    (error as { errors: unknown }).errors !== null
  );
}

/**
 * API request/response logging configuration
 * Enabled in development mode
 */
const API_LOGGING_ENABLED = process.env.NODE_ENV === 'development';

/**
 * Permission denied handler - will be set by the application
 */
let permissionDeniedHandler: ((message: string) => void) | null = null;

export const setPermissionDeniedHandler = (handler: (message: string) => void) => {
  permissionDeniedHandler = handler;
};

/**
 * Session timeout handler - will be set by the application
 */
let sessionTimeoutHandler: (() => void) | null = null;

export const setSessionTimeoutHandler = (handler: () => void) => {
  sessionTimeoutHandler = handler;
};

/**
 * Create axios instance with base configuration
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Required for Sanctum session-based authentication
  timeout: 30000, // 30 second timeout
});

/**
 * Request interceptor
 * - Adds authentication token to requests
 * - Logs request details (in development)
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const startTime = Date.now();
    
    // Store start time for request duration calculation
    config.metadata = { startTime };
    
    // Get authentication token from authStore
    let token: string | null = null;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        token = parsed.state?.token || null;
      }
    } catch (error) {
      console.error('[API] Error reading token from authStore:', error);
    }
    
    // Fallback to direct localStorage access (legacy support)
    if (!token) {
      token = localStorage.getItem('token');
    }
    
    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request details in development
    if (API_LOGGING_ENABLED) {
      console.log('[API Request]', {
        method: config.method?.toUpperCase(),
        url: config.url,
        fullURL: `${config.baseURL}${config.url}`,
        hasAuth: !!token,
        timestamp: new Date().toISOString(),
      });
      
      // Log request body for non-GET requests
      if (config.method !== 'get' && config.data) {
        console.log('[API Request Body]', config.data);
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Logs response details (in development)
 * - Handles authentication errors (401)
 * - Handles authorization errors (403)
 * - Handles network errors
 * - Provides user-friendly error messages
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Calculate request duration
    const duration = response.config.metadata?.startTime 
      ? Date.now() - response.config.metadata.startTime 
      : 0;
    
    // Log response details in development
    if (API_LOGGING_ENABLED) {
      console.log('[API Response]', {
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
        statusText: response.statusText,
        duration: `${duration}ms`,
        contentType: response.headers['content-type'],
        timestamp: new Date().toISOString(),
      });
      
      // Log response data preview
      if (response.data) {
        const dataPreview = typeof response.data === 'string' 
          ? response.data.substring(0, 100) 
          : response.data;
        console.log('[API Response Data]', dataPreview);
      }
    }
    
    return response;
  },
  async (error: AxiosError) => {
    // Calculate request duration
    const duration = error.config?.metadata?.startTime 
      ? Date.now() - error.config.metadata.startTime 
      : 0;
    
    // Enhanced error logging
    console.error('[API Error]', {
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: getErrorMessage(error),
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      isNetworkError: !error.response,
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    });
    
    // Log error response data
    if (error.response?.data) {
      console.error('[API Error Data]', error.response.data);
    }
    
    // Handle network errors (no response from server)
    if (!error.response) {
      // Check if offline
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        error.isOffline = true;
        error.userMessage = 'You are offline. Please check your internet connection.';
      } else {
        error.userMessage = 'Unable to connect to the server. Please try again.';
      }
      return Promise.reject(error);
    }
    
    // Handle authentication errors (401) - Redirect to login
    if (error.response.status === 401) {
      console.warn('[API] Authentication failed (401) - Redirecting to login');
      
      // Clear authentication data
      try {
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (e) {
        console.error('[API] Error clearing auth data:', e);
      }
      
      // Redirect to login page with session expired reason
      const currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        const errorData = error.response.data;
        const reason = isApiErrorWithMessage(errorData) && errorData.message === 'Token has expired' 
          ? 'session-expired' 
          : 'unauthorized';
        window.location.href = `/login?reason=${reason}`;
      }
      
      error.userMessage = 'Your session has expired. Please log in again.';
      return Promise.reject(error);
    }
    
    // Handle authorization errors (403) - Show permission denied
    if (error.response.status === 403) {
      const errorData = error.response.data;
      const message = isApiErrorWithMessage(errorData) 
        ? errorData.message 
        : 'You do not have permission to perform this action.';
      console.warn('[API] Permission denied (403):', message);
      
      // Call permission denied handler if set
      if (permissionDeniedHandler) {
        permissionDeniedHandler(message);
      }
      
      error.userMessage = message;
      return Promise.reject(error);
    }
    
    // Handle not found errors (404)
    if (error.response.status === 404) {
      const errorData = error.response.data;
      error.userMessage = isApiErrorWithMessage(errorData) 
        ? errorData.message 
        : 'The requested resource was not found.';
    }
    
    // Handle validation errors (422)
    if (error.response.status === 422) {
      const errorData = error.response.data;
      error.userMessage = isApiErrorWithMessage(errorData) 
        ? errorData.message 
        : 'Validation failed. Please check your input.';
      error.validationErrors = isApiErrorWithValidation(errorData) 
        ? errorData.errors 
        : undefined;
    }
    
    // Handle server errors (500+)
    if (error.response.status >= 500) {
      error.userMessage = 'A server error occurred. Please try again later.';
      error.isRetryable = true;
    }
    
    return Promise.reject(error);
  }
);

/**
 * Type augmentation for axios error with custom properties
 */
declare module 'axios' {
  export interface AxiosError {
    userMessage?: string;
    isOffline?: boolean;
    isRetryable?: boolean;
    validationErrors?: Record<string, string[]>;
  }
  
  export interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: number;
    };
  }
}

export default api;
