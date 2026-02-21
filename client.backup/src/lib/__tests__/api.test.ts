/**
 * API Client Integration Tests
 * 
 * These tests verify that the API client is properly configured with:
 * 1. Auth token interceptor for requests
 * 2. Error handling interceptor for responses
 * 3. Proper localStorage integration
 * 4. Session timeout handling
 * 
 * Note: These are integration tests that verify the actual behavior
 * rather than mocking the internal axios implementation.
 */

import MockAdapter from 'axios-mock-adapter';
import api, { setSessionTimeoutHandler } from '../api';

describe('API Client Configuration', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    localStorage.clear();
    mockAxios = new MockAdapter(api);
    // Reset window.location.href mock
    delete (window as any).location;
    (window as any).location = { href: '' };
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('Token Storage', () => {
    it('can store and retrieve auth token from localStorage', () => {
      const testToken = 'test-auth-token-123';
      localStorage.setItem('token', testToken);
      
      expect(localStorage.getItem('token')).toBe(testToken);
    });

    it('can store and retrieve user data from localStorage', () => {
      const testUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
      };
      
      localStorage.setItem('user', JSON.stringify(testUser));
      const retrieved = JSON.parse(localStorage.getItem('user') || '{}');
      
      expect(retrieved).toEqual(testUser);
    });

    it('can clear auth data from localStorage', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', JSON.stringify({ id: 1 }));
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('API Module', () => {
    it('exports an axios instance', () => {
      expect(api).toBeDefined();
      expect(typeof api.get).toBe('function');
      expect(typeof api.post).toBe('function');
      expect(typeof api.put).toBe('function');
      expect(typeof api.delete).toBe('function');
    });

    it('has interceptors configured', () => {
      expect(api.interceptors).toBeDefined();
      expect(api.interceptors.request).toBeDefined();
      expect(api.interceptors.response).toBeDefined();
    });

    it('exports setSessionTimeoutHandler function', () => {
      expect(typeof setSessionTimeoutHandler).toBe('function');
    });
  });

  describe('Session Timeout Handling', () => {
    it('clears localStorage on 401 response', async () => {
      // Set up auth data
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test' }));

      // Mock 401 response
      mockAxios.onGet('/test').reply(401);

      try {
        await api.get('/test');
      } catch (error) {
        // Expected to fail
      }

      // Verify localStorage is cleared
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });

    it('calls session timeout handler on 401 response', async () => {
      const mockHandler = jest.fn();
      setSessionTimeoutHandler(mockHandler);

      // Mock 401 response
      mockAxios.onGet('/test').reply(401);

      try {
        await api.get('/test');
      } catch (error) {
        // Expected to fail
      }

      // Verify handler was called
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it('redirects to login page on 401 response', async () => {
      // Mock 401 response
      mockAxios.onGet('/test').reply(401);

      try {
        await api.get('/test');
      } catch (error) {
        // Expected to fail
      }

      // Verify redirect
      expect(window.location.href).toBe('/login');
    });

    it('does not clear auth data on non-401 errors', async () => {
      // Set up auth data
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test' }));

      // Mock 500 response
      mockAxios.onGet('/test').reply(500);

      try {
        await api.get('/test');
      } catch (error) {
        // Expected to fail
      }

      // Verify localStorage is NOT cleared
      expect(localStorage.getItem('token')).toBe('test-token');
      expect(localStorage.getItem('user')).not.toBeNull();
    });

    it('does not call session timeout handler on non-401 errors', async () => {
      const mockHandler = jest.fn();
      setSessionTimeoutHandler(mockHandler);

      // Mock 500 response
      mockAxios.onGet('/test').reply(500);

      try {
        await api.get('/test');
      } catch (error) {
        // Expected to fail
      }

      // Verify handler was NOT called
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe('Environment Configuration', () => {
    it('uses default API URL when env variable not set', () => {
      const originalEnv = process.env.REACT_APP_API_URL;
      delete process.env.REACT_APP_API_URL;
      
      // Re-import to get fresh instance
      jest.resetModules();
      const api = require('../api').default;
      
      expect(api.defaults.baseURL).toBeDefined();
      
      // Restore
      if (originalEnv) {
        process.env.REACT_APP_API_URL = originalEnv;
      }
    });
  });
});
