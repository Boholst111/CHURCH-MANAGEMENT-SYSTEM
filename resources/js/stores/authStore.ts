import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * User interface matching the existing AuthContext structure
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
  created_at: string;
  updated_at: string;
}

/**
 * Authentication store state
 */
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  sessionExpiresAt: number | null;
}

/**
 * Authentication store actions
 */
interface AuthActions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setLoading: (loading: boolean) => void;
  setSessionExpiresAt: (expiresAt: number | null) => void;
  login: (user: User, token: string, refreshToken?: string, expiresIn?: number) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  refreshAuthToken: () => Promise<boolean>;
  performLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  performLogout: (callApi?: boolean) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  isSessionExpired: () => boolean;
}

/**
 * Combined auth store type
 */
export type AuthStore = AuthState & AuthActions;

/**
 * Authentication store with localStorage persistence
 * 
 * Features:
 * - Stores user data, authentication token, and refresh token
 * - Persists to localStorage for session management
 * - Provides login/logout actions
 * - Tracks authentication state and session expiration
 * - Permission checking utilities
 * - Token refresh mechanism
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout, hasPermission } = useAuthStore();
 * 
 * // Login
 * login(userData, token, refreshToken, expiresIn);
 * 
 * // Logout
 * logout();
 * 
 * // Check authentication
 * if (isAuthenticated) {
 *   // User is logged in
 * }
 * 
 * // Check permission
 * if (hasPermission('members.edit')) {
 *   // User can edit members
 * }
 * ```
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      sessionExpiresAt: null,

      // Actions
      setUser: (user) => 
        set({ 
          user, 
          isAuthenticated: user !== null 
        }),

      setToken: (token) => 
        set({ token }),

      setRefreshToken: (refreshToken) =>
        set({ refreshToken }),

      setLoading: (loading) => 
        set({ loading }),

      setSessionExpiresAt: (expiresAt) =>
        set({ sessionExpiresAt: expiresAt }),

      login: (user, token, refreshToken, expiresIn) => {
        const expiresAt = expiresIn 
          ? Date.now() + (expiresIn * 1000) 
          : null;
        
        set({ 
          user, 
          token, 
          refreshToken: refreshToken || null,
          isAuthenticated: true,
          loading: false,
          sessionExpiresAt: expiresAt,
        });
      },

      logout: () => 
        set({ 
          user: null, 
          token: null, 
          refreshToken: null,
          isAuthenticated: false,
          loading: false,
          sessionExpiresAt: null,
        }),

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...updates } 
          });
        }
      },

      refreshAuthToken: async () => {
        const { refreshToken, logout } = get();
        
        if (!refreshToken) {
          return false;
        }

        try {
          // Import api dynamically to avoid circular dependency
          const { default: api } = await import('../lib/api');
          
          const response = await api.post('/auth/refresh', { 
            refresh_token: refreshToken 
          });
          
          const { token: newToken, refresh_token: newRefreshToken, expires_in } = response.data;
          
          const expiresAt = expires_in 
            ? Date.now() + (expires_in * 1000) 
            : null;
          
          set({ 
            token: newToken,
            refreshToken: newRefreshToken || refreshToken,
            sessionExpiresAt: expiresAt,
          });
          
          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
          return false;
        }
      },

      /**
       * Perform login with email and password
       * Calls the API and stores the user, token, and session info
       */
      performLogin: async (email: string, password: string) => {
        set({ loading: true });
        
        try {
          // Import api dynamically to avoid circular dependency
          const { default: api } = await import('../lib/api');
          
          const response = await api.post('/auth/login', { email, password });
          const { user: userData, token, refresh_token, expires_in } = response.data;
          
          const expiresAt = expires_in 
            ? Date.now() + (expires_in * 1000) 
            : null;
          
          set({ 
            user: userData,
            token,
            refreshToken: refresh_token || null,
            isAuthenticated: true,
            loading: false,
            sessionExpiresAt: expiresAt,
          });
          
          return { success: true };
        } catch (error: any) {
          set({ loading: false });
          const message = error.response?.data?.message || 'Login failed';
          return { success: false, error: message };
        }
      },

      /**
       * Perform logout
       * Optionally calls the API to invalidate the token on the server
       */
      performLogout: async (callApi = false) => {
        if (callApi) {
          try {
            const { default: api } = await import('../lib/api');
            await api.post('/auth/logout');
          } catch (error) {
            console.error('Logout API call failed:', error);
            // Continue with local logout even if API call fails
          }
        }
        
        set({ 
          user: null, 
          token: null, 
          refreshToken: null,
          isAuthenticated: false,
          loading: false,
          sessionExpiresAt: null,
        });
      },

      hasPermission: (permission) => {
        const { user } = get();
        if (!user) return false;
        
        // Admin has all permissions
        if (user.role.toLowerCase() === 'admin') return true;
        
        // Check if user has the specific permission
        return user.permissions?.includes(permission) || false;
      },

      hasAnyPermission: (permissions) => {
        const { hasPermission } = get();
        return permissions.some(permission => hasPermission(permission));
      },

      hasAllPermissions: (permissions) => {
        const { hasPermission } = get();
        return permissions.every(permission => hasPermission(permission));
      },

      isSessionExpired: () => {
        const { sessionExpiresAt } = get();
        if (!sessionExpiresAt) return false;
        return Date.now() >= sessionExpiresAt;
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        sessionExpiresAt: state.sessionExpiresAt,
      }),
    }
  )
);

/**
 * Selectors for accessing specific parts of auth state
 */
export const authSelectors = {
  user: (state: AuthStore) => state.user,
  token: (state: AuthStore) => state.token,
  refreshToken: (state: AuthStore) => state.refreshToken,
  isAuthenticated: (state: AuthStore) => state.isAuthenticated,
  loading: (state: AuthStore) => state.loading,
  sessionExpiresAt: (state: AuthStore) => state.sessionExpiresAt,
  userRole: (state: AuthStore) => state.user?.role,
  userName: (state: AuthStore) => state.user?.name,
  userEmail: (state: AuthStore) => state.user?.email,
  userPermissions: (state: AuthStore) => state.user?.permissions || [],
};
