import { renderHook, act } from '@testing-library/react';
import { useAuthStore, authSelectors, User } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset store state
    const { logout } = useAuthStore.getState();
    logout();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAuthStore());
      
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.loading).toBe(false);
    });
  });

  describe('login action', () => {
    it('should set user and token on login', () => {
      const { result } = renderHook(() => useAuthStore());
      
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };
      const mockToken = 'test-token-123';

      act(() => {
        result.current.login(mockUser, mockToken);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.token).toBe(mockToken);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.loading).toBe(false);
    });

    it('should persist user and token to localStorage', () => {
      const { result } = renderHook(() => useAuthStore());
      
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };
      const mockToken = 'test-token-123';

      act(() => {
        result.current.login(mockUser, mockToken);
      });

      const stored = localStorage.getItem('auth-storage');
      expect(stored).toBeTruthy();
      
      const parsed = JSON.parse(stored!);
      expect(parsed.state.user).toEqual(mockUser);
      expect(parsed.state.token).toBe(mockToken);
      expect(parsed.state.isAuthenticated).toBe(true);
    });
  });

  describe('logout action', () => {
    it('should clear user and token on logout', () => {
      const { result } = renderHook(() => useAuthStore());
      
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      act(() => {
        result.current.login(mockUser, 'test-token');
      });

      expect(result.current.isAuthenticated).toBe(true);

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.loading).toBe(false);
    });

    it('should clear localStorage on logout', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.login(
          { id: 1, name: 'John', email: 'john@example.com', role: 'admin', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
          'test-token'
        );
      });

      act(() => {
        result.current.logout();
      });

      const stored = localStorage.getItem('auth-storage');
      const parsed = JSON.parse(stored!);
      expect(parsed.state.user).toBeNull();
      expect(parsed.state.token).toBeNull();
      expect(parsed.state.isAuthenticated).toBe(false);
    });
  });

  describe('setUser action', () => {
    it('should update user and authentication state', () => {
      const { result } = renderHook(() => useAuthStore());
      
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should set isAuthenticated to false when user is null', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.setUser({ id: 1, name: 'John', email: 'john@example.com', role: 'admin', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' });
      });

      expect(result.current.isAuthenticated).toBe(true);

      act(() => {
        result.current.setUser(null);
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('setToken action', () => {
    it('should update token', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.setToken('new-token');
      });

      expect(result.current.token).toBe('new-token');
    });
  });

  describe('setLoading action', () => {
    it('should update loading state', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.loading).toBe(true);

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.loading).toBe(false);
    });
  });

  describe('updateUser action', () => {
    it('should update user properties', () => {
      const { result } = renderHook(() => useAuthStore());
      
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      act(() => {
        result.current.login(mockUser, 'test-token');
      });

      act(() => {
        result.current.updateUser({ name: 'Jane Doe', email: 'jane@example.com' });
      });

      expect(result.current.user).toEqual({
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'admin',
      });
    });

    it('should not update if user is null', () => {
      const { result } = renderHook(() => useAuthStore());
      
      act(() => {
        result.current.updateUser({ name: 'Jane Doe' });
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('selectors', () => {
    it('should select user', () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      act(() => {
        useAuthStore.getState().login(mockUser, 'test-token');
      });

      const user = authSelectors.user(useAuthStore.getState());
      expect(user).toEqual(mockUser);
    });

    it('should select token', () => {
      act(() => {
        useAuthStore.getState().setToken('test-token');
      });

      const token = authSelectors.token(useAuthStore.getState());
      expect(token).toBe('test-token');
    });

    it('should select isAuthenticated', () => {
      const isAuth = authSelectors.isAuthenticated(useAuthStore.getState());
      expect(isAuth).toBe(false);

      act(() => {
        useAuthStore.getState().login(
          { id: 1, name: 'John', email: 'john@example.com', role: 'admin', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
          'test-token'
        );
      });

      const isAuthAfter = authSelectors.isAuthenticated(useAuthStore.getState());
      expect(isAuthAfter).toBe(true);
    });

    it('should select loading', () => {
      act(() => {
        useAuthStore.getState().setLoading(true);
      });

      const loading = authSelectors.loading(useAuthStore.getState());
      expect(loading).toBe(true);
    });

    it('should select userRole', () => {
      act(() => {
        useAuthStore.getState().login(
          { id: 1, name: 'John', email: 'john@example.com', role: 'admin', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
          'test-token'
        );
      });

      const role = authSelectors.userRole(useAuthStore.getState());
      expect(role).toBe('admin');
    });

    it('should select userName', () => {
      act(() => {
        useAuthStore.getState().login(
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
          'test-token'
        );
      });

      const name = authSelectors.userName(useAuthStore.getState());
      expect(name).toBe('John Doe');
    });

    it('should select userEmail', () => {
      act(() => {
        useAuthStore.getState().login(
          { id: 1, name: 'John', email: 'john@example.com', role: 'admin', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
          'test-token'
        );
      });

      const email = authSelectors.userEmail(useAuthStore.getState());
      expect(email).toBe('john@example.com');
    });
  });

  describe('persistence', () => {
    it('should restore state from localStorage', () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      // Set initial state
      act(() => {
        useAuthStore.getState().login(mockUser, 'test-token');
      });

      // Create a new hook instance (simulating page reload)
      const { result } = renderHook(() => useAuthStore());

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.token).toBe('test-token');
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should not persist loading state', () => {
      act(() => {
        useAuthStore.getState().setLoading(true);
      });

      const stored = localStorage.getItem('auth-storage');
      const parsed = JSON.parse(stored!);
      
      expect(parsed.state.loading).toBeUndefined();
    });
  });
});

  describe('performLogin action', () => {
    it('should set loading to true during login', async () => {
      const { result } = renderHook(() => useAuthStore());

      // Start login (will fail but we can check loading state)
      const loginPromise = result.current.performLogin('john@example.com', 'password123');

      // Loading should be true immediately
      expect(result.current.loading).toBe(true);

      // Wait for completion
      await act(async () => {
        await loginPromise;
      });

      // Loading should be false after completion
      expect(result.current.loading).toBe(false);
    });
  });

  describe('performLogout action', () => {
    it('should clear state without calling API when callApi is false', async () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.login(
          { id: 1, name: 'John', email: 'john@example.com', role: 'admin', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
          'test-token'
        );
      });

      expect(result.current.isAuthenticated).toBe(true);

      await act(async () => {
        await result.current.performLogout(false);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('permission checking', () => {
    it('should check if user has permission', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.login(
          {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            role: 'staff',
            permissions: ['members.view', 'members.edit'],
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          'test-token'
        );
      });

      expect(result.current.hasPermission('members.view')).toBe(true);
      expect(result.current.hasPermission('members.delete')).toBe(false);
    });

    it('should return true for admin role regardless of permissions', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.login(
          {
            id: 1,
            name: 'Admin',
            email: 'admin@example.com',
            role: 'admin',
            permissions: [],
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          'test-token'
        );
      });

      expect(result.current.hasPermission('any.permission')).toBe(true);
    });

    it('should check if user has any of the permissions', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.login(
          {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            role: 'staff',
            permissions: ['members.view'],
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          'test-token'
        );
      });

      expect(result.current.hasAnyPermission(['members.view', 'members.edit'])).toBe(true);
      expect(result.current.hasAnyPermission(['members.delete', 'finance.view'])).toBe(false);
    });

    it('should check if user has all permissions', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.login(
          {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            role: 'staff',
            permissions: ['members.view', 'members.edit'],
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          'test-token'
        );
      });

      expect(result.current.hasAllPermissions(['members.view', 'members.edit'])).toBe(true);
      expect(result.current.hasAllPermissions(['members.view', 'members.delete'])).toBe(false);
    });
  });

  describe('session expiration', () => {
    it('should track session expiration time', () => {
      const { result } = renderHook(() => useAuthStore());
      const expiresIn = 3600; // 1 hour

      act(() => {
        result.current.login(
          { id: 1, name: 'John', email: 'john@example.com', role: 'admin', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
          'test-token',
          'refresh-token',
          expiresIn
        );
      });

      expect(result.current.sessionExpiresAt).toBeDefined();
      expect(result.current.sessionExpiresAt).toBeGreaterThan(Date.now());
    });

    it('should detect expired session', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setSessionExpiresAt(Date.now() - 1000); // 1 second ago
      });

      expect(result.current.isSessionExpired()).toBe(true);
    });

    it('should detect valid session', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setSessionExpiresAt(Date.now() + 3600000); // 1 hour from now
      });

      expect(result.current.isSessionExpired()).toBe(false);
    });
  });
