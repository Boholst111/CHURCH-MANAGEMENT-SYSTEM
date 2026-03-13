/**
 * Offline Indicator Component
 * 
 * Displays a banner when the user is offline.
 * 
 * Validates Requirements: Task 22.3 - Show offline indicator if network is down
 */

import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Offline Indicator Component
 */
export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      
      // Hide reconnected message after 3 seconds
      setTimeout(() => {
        setShowReconnected(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't render anything if online and not showing reconnected message
  if (isOnline && !showReconnected) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-4 py-3 text-center text-sm font-medium transition-all duration-300',
        !isOnline && 'bg-error-600 text-white',
        showReconnected && 'bg-success-600 text-white'
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center gap-2">
        {!isOnline ? (
          <>
            <WifiOff className="h-4 w-4" aria-hidden="true" />
            <span>You are offline. Please check your internet connection.</span>
          </>
        ) : (
          <>
            <Wifi className="h-4 w-4" aria-hidden="true" />
            <span>Connection restored. You are back online.</span>
          </>
        )}
      </div>
    </div>
  );
};
