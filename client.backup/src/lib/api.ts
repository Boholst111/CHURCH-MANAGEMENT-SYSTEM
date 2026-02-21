import axios from 'axios';
import { getErrorMessage } from './errorHandler';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Session timeout handler - will be set by AuthContext
let sessionTimeoutHandler: (() => void) | null = null;

export const setSessionTimeoutHandler = (handler: () => void) => {
  sessionTimeoutHandler = handler;
};

// Handle auth errors and session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: getErrorMessage(error),
    });

    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Call the session timeout handler if set (to clear AuthContext state)
      if (sessionTimeoutHandler) {
        sessionTimeoutHandler();
      }
      
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
