/**
 * API Client Session Expiration - Property-Based Tests
 * 
 * Feature: church-management-system, Property 32: Session expiration handling
 * **Validates: Requirements 10.6**
 * 
 * Property 32: Session expiration handling
 * For any request with an expired session token, the system should reject 
 * the request and require re-authentication
 */

import * as fc from 'fast-check';
import MockAdapter from 'axios-mock-adapter';
import api, { setSessionTimeoutHandler } from '../api';

describe('Session Expiration Handling - Property-Based Tests', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    localStorage.clear();
    mockAxios = new MockAdapter(api as any);
    // Reset window.location.href mock
    delete (window as any).location;
    (window as any).location = { href: '' };
  });

  afterEach(() => {
    mockAxios.restore();
  });

  /**
   * Generator for API endpoints
   * Generates various API paths that might be called in the system
   */
  const apiEndpointGenerator = () =>
    fc.constantFrom(
      '/dashboard/stats',
      '/dashboard/attendance',
      '/dashboard/activities',
      '/members',
      '/members/1',
      '/leadership',
      '/leadership/5',
      '/small-groups',
      '/finance/tithes',
      '/finance/summary',
      '/events',
      '/events/10',
      '/reports/financial',
      '/reports/demographics',
      '/settings/church',
      '/settings/notifications',
      '/users'
    );

  /**
   * Generator for HTTP methods
   */
  const httpMethodGenerator = () =>
    fc.constantFrom('get', 'post', 'put', 'delete');

  /**
   * Generator for expired session tokens
   * These represent tokens that the backend would reject with 401
   */
  const expiredTokenGenerator = () =>
    fc.oneof(
      fc.constant('expired-token-123'),
      fc.constant('invalid-jwt-token'),
      fc.constant('revoked-session-token'),
      fc.stringMatching(/^expired-[a-z0-9]{10,20}$/),
      fc.stringMatching(/^invalid-[a-z0-9]{10,20}$/)
    );

  /**
   * Generator for user data that might be stored in localStorage
   */
  const userDataGenerator = () =>
    fc.record({
      id: fc.integer({ min: 1, max: 10000 }),
      name: fc.stringMatching(/^[A-Z][a-z]+ [A-Z][a-z]+$/),
      email: fc.emailAddress(),
      role: fc.constantFrom('admin', 'staff', 'readonly'),
    });

  /**
   * Property 32: Session expiration clears authentication state
   * For any API request with an expired token (401 response), the system 
   * should clear localStorage token and user data
   */
  it('should clear localStorage for any 401 response on any endpoint', async () => {
    await fc.assert(
      fc.asyncProperty(
        apiEndpointGenerator(),
        httpMethodGenerator(),
        expiredTokenGenerator(),
        userDataGenerator(),
        async (endpoint, method, expiredToken, userData) => {
          // Setup: Store auth data in localStorage
          localStorage.setItem('token', expiredToken);
          localStorage.setItem('user', JSON.stringify(userData));

          // Verify data is stored
          expect(localStorage.getItem('token')).toBe(expiredToken);
          expect(localStorage.getItem('user')).not.toBeNull();

          // Mock 401 response for this endpoint
          mockAxios.onAny(endpoint).reply(401, {
            success: false,
            message: 'Unauthorized - Session expired',
          });

          // Execute: Make API request
          try {
            if (method === 'get') {
              await api.get(endpoint);
            } else if (method === 'post') {
              await api.post(endpoint, {});
            } else if (method === 'put') {
              await api.put(endpoint, {});
            } else if (method === 'delete') {
              await api.delete(endpoint);
            }
          } catch (error) {
            // Expected to fail with 401
          }

          // Property: localStorage should be cleared
          expect(localStorage.getItem('token')).toBeNull();
          expect(localStorage.getItem('user')).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 32: Session expiration triggers timeout handler
   * For any API request with an expired token, the registered session 
   * timeout handler should be called exactly once
   */
  it('should call session timeout handler for any 401 response', async () => {
    await fc.assert(
      fc.asyncProperty(
        apiEndpointGenerator(),
        httpMethodGenerator(),
        expiredTokenGenerator(),
        async (endpoint, method, expiredToken) => {
          // Setup: Register mock handler
          const mockHandler = jest.fn();
          setSessionTimeoutHandler(mockHandler);

          // Store expired token
          localStorage.setItem('token', expiredToken);

          // Mock 401 response
          mockAxios.onAny(endpoint).reply(401);

          // Execute: Make API request
          try {
            if (method === 'get') {
              await api.get(endpoint);
            } else if (method === 'post') {
              await api.post(endpoint, {});
            } else if (method === 'put') {
              await api.put(endpoint, {});
            } else if (method === 'delete') {
              await api.delete(endpoint);
            }
          } catch (error) {
            // Expected to fail
          }

          // Property: Handler should be called exactly once
          expect(mockHandler).toHaveBeenCalledTimes(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 32: Session expiration redirects to login
   * For any API request with an expired token, the system should redirect 
   * to the login page
   */
  it('should redirect to login page for any 401 response on any endpoint', async () => {
    await fc.assert(
      fc.asyncProperty(
        apiEndpointGenerator(),
        httpMethodGenerator(),
        expiredTokenGenerator(),
        async (endpoint, method, expiredToken) => {
          // Setup: Reset redirect tracking
          (window as any).location.href = '';
          localStorage.setItem('token', expiredToken);

          // Mock 401 response
          mockAxios.onAny(endpoint).reply(401);

          // Execute: Make API request
          try {
            if (method === 'get') {
              await api.get(endpoint);
            } else if (method === 'post') {
              await api.post(endpoint, {});
            } else if (method === 'put') {
              await api.put(endpoint, {});
            } else if (method === 'delete') {
              await api.delete(endpoint);
            }
          } catch (error) {
            // Expected to fail
          }

          // Property: Should redirect to login
          expect(window.location.href).toBe('/login');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 32: Only 401 responses trigger session expiration
   * For any non-401 error response, the system should NOT clear auth data 
   * or trigger session timeout handling
   */
  it('should NOT clear auth data for non-401 errors on any endpoint', async () => {
    await fc.assert(
      fc.asyncProperty(
        apiEndpointGenerator(),
        httpMethodGenerator(),
        fc.constantFrom(400, 403, 404, 500, 502, 503),
        expiredTokenGenerator(),
        userDataGenerator(),
        async (endpoint, method, errorCode, token, userData) => {
          // Setup: Store auth data
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));

          // Setup: Register mock handler
          const mockHandler = jest.fn();
          setSessionTimeoutHandler(mockHandler);

          // Mock non-401 error response
          mockAxios.onAny(endpoint).reply(errorCode, {
            success: false,
            message: `Error ${errorCode}`,
          });

          // Execute: Make API request
          try {
            if (method === 'get') {
              await api.get(endpoint);
            } else if (method === 'post') {
              await api.post(endpoint, {});
            } else if (method === 'put') {
              await api.put(endpoint, {});
            } else if (method === 'delete') {
              await api.delete(endpoint);
            }
          } catch (error) {
            // Expected to fail
          }

          // Property: Auth data should NOT be cleared
          expect(localStorage.getItem('token')).toBe(token);
          expect(localStorage.getItem('user')).toBe(JSON.stringify(userData));

          // Property: Handler should NOT be called
          expect(mockHandler).not.toHaveBeenCalled();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 32: Session expiration handling is consistent
   * For any sequence of requests where some return 401, each 401 should 
   * trigger the same cleanup behavior
   */
  it('should handle multiple 401 responses consistently', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(apiEndpointGenerator(), { minLength: 2, maxLength: 5 }),
        expiredTokenGenerator(),
        async (endpoints, expiredToken) => {
          for (const endpoint of endpoints) {
            // Reset state for each request
            localStorage.setItem('token', expiredToken);
            localStorage.setItem('user', JSON.stringify({ id: 1 }));
            (window as any).location.href = '';

            const mockHandler = jest.fn();
            setSessionTimeoutHandler(mockHandler);

            // Mock 401 response
            mockAxios.reset();
            mockAxios.onGet(endpoint).reply(401);

            // Execute request
            try {
              await api.get(endpoint);
            } catch (error) {
              // Expected to fail
            }

            // Property: Each 401 should trigger consistent behavior
            expect(localStorage.getItem('token')).toBeNull();
            expect(localStorage.getItem('user')).toBeNull();
            expect(mockHandler).toHaveBeenCalledTimes(1);
            expect(window.location.href).toBe('/login');
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 32: Session expiration with request payload
   * For any request with a payload (POST/PUT) that returns 401, session 
   * expiration should still be handled correctly regardless of payload content
   */
  it('should handle 401 responses correctly regardless of request payload', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('/members', '/leadership', '/events', '/finance/tithes'),
        fc.constantFrom('post', 'put'),
        fc.record({
          name: fc.string(),
          email: fc.emailAddress(),
          data: fc.anything(),
        }),
        expiredTokenGenerator(),
        async (endpoint, method, payload, expiredToken) => {
          // Setup
          localStorage.setItem('token', expiredToken);
          localStorage.setItem('user', JSON.stringify({ id: 1 }));

          const mockHandler = jest.fn();
          setSessionTimeoutHandler(mockHandler);

          // Mock 401 response
          mockAxios.onAny(endpoint).reply(401);

          // Execute
          try {
            if (method === 'post') {
              await api.post(endpoint, payload);
            } else {
              await api.put(endpoint, payload);
            }
          } catch (error) {
            // Expected to fail
          }

          // Property: Session expiration should work regardless of payload
          expect(localStorage.getItem('token')).toBeNull();
          expect(localStorage.getItem('user')).toBeNull();
          expect(mockHandler).toHaveBeenCalledTimes(1);
          expect(window.location.href).toBe('/login');
        }
      ),
      { numRuns: 100 }
    );
  });
});
