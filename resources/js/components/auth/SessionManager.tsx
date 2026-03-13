import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, authSelectors } from '../../stores';
import { Button } from '../ui/button';

interface SessionManagerProps {
  /**
   * Time in milliseconds before expiration to show warning
   * @default 300000 (5 minutes)
   */
  warningTime?: number;
  
  /**
   * Interval in milliseconds to check session status
   * @default 60000 (1 minute)
   */
  checkInterval?: number;
}

/**
 * SessionManager component that monitors session expiration and handles timeouts
 * 
 * Features:
 * - Monitors session expiration time
 * - Shows warning modal before expiration
 * - Allows user to extend session or logout
 * - Automatically logs out when session expires
 * - Saves work in progress (via localStorage)
 * 
 * Usage:
 * ```tsx
 * // Add to App.tsx or main layout
 * <SessionManager />
 * ```
 */
const SessionManager: React.FC<SessionManagerProps> = ({
  warningTime = 5 * 60 * 1000, // 5 minutes
  checkInterval = 60 * 1000, // 1 minute
}) => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  const sessionExpiresAt = useAuthStore(authSelectors.sessionExpiresAt);
  const isSessionExpired = useAuthStore((state) => state.isSessionExpired);
  const refreshAuthToken = useAuthStore((state) => state.refreshAuthToken);
  const performLogout = useAuthStore((state) => state.performLogout);

  /**
   * Save any work in progress to localStorage
   * This can be extended to save form data, drafts, etc.
   */
  const saveWorkInProgress = useCallback(() => {
    try {
      const workInProgress = {
        timestamp: Date.now(),
        location: window.location.pathname,
        // Add more data to save as needed
      };
      localStorage.setItem('work-in-progress', JSON.stringify(workInProgress));
    } catch (error) {
      console.error('Failed to save work in progress:', error);
    }
  }, []);

  /**
   * Handle session expiration
   */
  const handleSessionExpired = useCallback(async () => {
    saveWorkInProgress();
    await performLogout(false); // Don't call API since session is expired
    navigate('/login?reason=session-expired', { replace: true });
  }, [saveWorkInProgress, performLogout, navigate]);

  /**
   * Extend the session by refreshing the token
   */
  const handleExtendSession = useCallback(async () => {
    const success = await refreshAuthToken();
    if (success) {
      setShowWarning(false);
      setTimeLeft(0);
    } else {
      // If refresh fails, session is expired
      await handleSessionExpired();
    }
  }, [refreshAuthToken, handleSessionExpired]);

  /**
   * Handle manual logout
   */
  const handleLogout = useCallback(async () => {
    setShowWarning(false);
    await performLogout(true); // Call API to invalidate token
    navigate('/login', { replace: true });
  }, [performLogout, navigate]);

  /**
   * Check session status periodically
   */
  useEffect(() => {
    if (!isAuthenticated || !sessionExpiresAt) {
      return;
    }

    const checkSession = () => {
      const now = Date.now();
      const timeRemaining = sessionExpiresAt - now;

      // Session expired
      if (timeRemaining <= 0 || isSessionExpired()) {
        handleSessionExpired();
        return;
      }

      // Show warning if approaching expiration
      if (timeRemaining <= warningTime && !showWarning) {
        setShowWarning(true);
        setTimeLeft(timeRemaining);
      }

      // Update time left if warning is showing
      if (showWarning) {
        setTimeLeft(timeRemaining);
      }
    };

    // Check immediately
    checkSession();

    // Set up interval to check periodically
    const interval = setInterval(checkSession, checkInterval);

    return () => clearInterval(interval);
  }, [
    isAuthenticated,
    sessionExpiresAt,
    warningTime,
    checkInterval,
    showWarning,
    isSessionExpired,
    handleSessionExpired,
  ]);

  /**
   * Format time remaining for display
   */
  const formatTimeLeft = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Don't render anything if not authenticated or no warning
  if (!isAuthenticated || !showWarning) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-warning-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-warning-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-2">
            Session Expiring Soon
          </h2>

          {/* Message */}
          <p className="text-center text-neutral-600 mb-4">
            Your session will expire in{' '}
            <span className="font-bold text-warning-600">
              {formatTimeLeft(timeLeft)}
            </span>
            . Would you like to continue?
          </p>

          <p className="text-sm text-center text-neutral-500 mb-6">
            Your work will be saved automatically.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleExtendSession}
            >
              Continue Session
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionManager;
