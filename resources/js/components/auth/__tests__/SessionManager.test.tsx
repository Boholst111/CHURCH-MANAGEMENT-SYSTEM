import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SessionManager from '../SessionManager';
import { useAuthStore } from '../../../stores';

// Mock the auth store
jest.mock('../../../stores', () => ({
  useAuthStore: jest.fn(),
  authSelectors: {
    isAuthenticated: (state: any) => state.isAuthenticated,
    sessionExpiresAt: (state: any) => state.sessionExpiresAt,
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SessionManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should not render when user is not authenticated', () => {
      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({ isAuthenticated: false, sessionExpiresAt: null });
        }
        return false;
      });

      render(
        <BrowserRouter>
          <SessionManager />
        </BrowserRouter>
      );

      expect(screen.queryByText('Session Expiring Soon')).not.toBeInTheDocument();
    });

    it('should not render when session is not expiring soon', () => {
      const futureTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now

      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({
            isAuthenticated: true,
            sessionExpiresAt: futureTime,
            isSessionExpired: () => false,
          });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <SessionManager />
        </BrowserRouter>
      );

      expect(screen.queryByText('Session Expiring Soon')).not.toBeInTheDocument();
    });

    it('should render warning when session is expiring soon', async () => {
      const soonTime = Date.now() + 4 * 60 * 1000; // 4 minutes from now

      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({
            isAuthenticated: true,
            sessionExpiresAt: soonTime,
            isSessionExpired: () => false,
            refreshAuthToken: vi.fn(),
            performLogout: vi.fn(),
          });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <SessionManager warningTime={5 * 60 * 1000} />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Session Expiring Soon')).toBeInTheDocument();
      });
    });
  });

  describe('Session Expiration', () => {
    it('should logout and redirect when session expires', async () => {
      const expiredTime = Date.now() - 1000; // 1 second ago
      const mockPerformLogout = vi.fn();

      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({
            isAuthenticated: true,
            sessionExpiresAt: expiredTime,
            isSessionExpired: () => true,
            performLogout: mockPerformLogout,
          });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <SessionManager />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(mockPerformLogout).toHaveBeenCalledWith(false);
        expect(mockNavigate).toHaveBeenCalledWith('/login?reason=session-expired', { replace: true });
      });
    });

    it('should save work in progress before logout', async () => {
      const expiredTime = Date.now() - 1000;
      const mockPerformLogout = vi.fn();

      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({
            isAuthenticated: true,
            sessionExpiresAt: expiredTime,
            isSessionExpired: () => true,
            performLogout: mockPerformLogout,
          });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <SessionManager />
        </BrowserRouter>
      );

      await waitFor(() => {
        const saved = localStorage.getItem('work-in-progress');
        expect(saved).toBeTruthy();
        if (saved) {
          const parsed = JSON.parse(saved);
          expect(parsed.location).toBe('/');
          expect(parsed.timestamp).toBeDefined();
        }
      });
    });
  });

  describe('User Actions', () => {
    it('should extend session when continue button is clicked', async () => {
      const user = userEvent.setup({ delay: null });
      const soonTime = Date.now() + 4 * 60 * 1000;
      const mockRefreshAuthToken = jest.fn().mockResolvedValue(true);

      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({
            isAuthenticated: true,
            sessionExpiresAt: soonTime,
            isSessionExpired: () => false,
            refreshAuthToken: mockRefreshAuthToken,
            performLogout: jest.fn(),
          });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <SessionManager warningTime={5 * 60 * 1000} />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Session Expiring Soon')).toBeInTheDocument();
      });

      const continueButton = screen.getByText('Continue Session');
      await user.click(continueButton);

      await waitFor(() => {
        expect(mockRefreshAuthToken).toHaveBeenCalled();
      });
    });

    it('should logout when logout button is clicked', async () => {
      const user = userEvent.setup({ delay: null });
      const soonTime = Date.now() + 4 * 60 * 1000;
      const mockPerformLogout = jest.fn();

      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({
            isAuthenticated: true,
            sessionExpiresAt: soonTime,
            isSessionExpired: () => false,
            refreshAuthToken: jest.fn(),
            performLogout: mockPerformLogout,
          });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <SessionManager warningTime={5 * 60 * 1000} />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Session Expiring Soon')).toBeInTheDocument();
      });

      const logoutButton = screen.getByText('Logout');
      await user.click(logoutButton);

      await waitFor(() => {
        expect(mockPerformLogout).toHaveBeenCalledWith(true);
        expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
      });
    });

    it('should handle failed token refresh', async () => {
      const user = userEvent.setup({ delay: null });
      const soonTime = Date.now() + 4 * 60 * 1000;
      const mockRefreshAuthToken = jest.fn().mockResolvedValue(false);
      const mockPerformLogout = jest.fn();

      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({
            isAuthenticated: true,
            sessionExpiresAt: soonTime,
            isSessionExpired: () => false,
            refreshAuthToken: mockRefreshAuthToken,
            performLogout: mockPerformLogout,
          });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <SessionManager warningTime={5 * 60 * 1000} />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Session Expiring Soon')).toBeInTheDocument();
      });

      const continueButton = screen.getByText('Continue Session');
      await user.click(continueButton);

      await waitFor(() => {
        expect(mockRefreshAuthToken).toHaveBeenCalled();
        expect(mockPerformLogout).toHaveBeenCalledWith(false);
        expect(mockNavigate).toHaveBeenCalledWith('/login?reason=session-expired', { replace: true });
      });
    });
  });

  describe('Time Display', () => {
    it('should display time remaining in correct format', async () => {
      const soonTime = Date.now() + 4 * 60 * 1000 + 30 * 1000; // 4:30 from now

      (useAuthStore as any).mockImplementation((selector: any) => {
        if (typeof selector === 'function') {
          return selector({
            isAuthenticated: true,
            sessionExpiresAt: soonTime,
            isSessionExpired: () => false,
            refreshAuthToken: vi.fn(),
            performLogout: vi.fn(),
          });
        }
        return true;
      });

      render(
        <BrowserRouter>
          <SessionManager warningTime={5 * 60 * 1000} />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/4:30/)).toBeInTheDocument();
      });
    });
  });
});
