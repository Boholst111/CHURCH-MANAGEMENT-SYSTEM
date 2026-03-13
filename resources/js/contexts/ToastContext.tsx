import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from '../components/ui/toast';

/**
 * Toast types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast action button interface
 */
export interface ToastAction {
  label: string;
  onClick: () => void;
}

/**
 * Toast options interface
 */
export interface ToastOptions {
  duration?: number; // Duration in milliseconds (0 = no auto-dismiss)
  action?: ToastAction;
}

/**
 * Toast interface
 */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  action?: ToastAction;
}

/**
 * Toast context interface
 */
interface ToastContextType {
  toasts: Toast[];
  showToast: (type: ToastType, message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Toast Provider Component
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string, options?: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const duration = options?.duration !== undefined ? options.duration : 5000;
    const newToast: Toast = { 
      id, 
      type, 
      message, 
      duration,
      action: options?.action 
    };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after specified duration (if duration > 0)
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Hook to use toast notifications
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
