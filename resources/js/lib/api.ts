import axios from 'axios';
import { getErrorMessage } from './errorHandler';

const API_BASE_URL = '/api';

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
  
  // Log the full request URL for debugging
  console.log('[API] Making request:', {
    method: config.method,
    baseURL: config.baseURL,
    url: config.url,
    fullURL: `${config.baseURL}${config.url}`,
    headers: config.headers
  });
  
  return config;
});

// Session timeout handler - will be set by AuthContext
let sessionTimeoutHandler: (() => void) | null = null;

export const setSessionTimeoutHandler = (handler: () => void) => {
  sessionTimeoutHandler = handler;
};

// Handle auth errors and session expiration
api.interceptors.response.use(
  (response) => {
    console.log('[API] Response received:', {
      url: response.config.url,
      status: response.status,
      contentType: response.headers['content-type'],
      dataType: typeof response.data,
      dataPreview: typeof response.data === 'string' ? response.data.substring(0, 100) : 'object'
    });
    return response;
  },
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
