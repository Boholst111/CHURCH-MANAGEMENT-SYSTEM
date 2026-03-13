import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Toast as ToastType, ToastAction } from '../../contexts/ToastContext';

/**
 * Toast Component Props
 */
interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

/**
 * Toast Component
 * 
 * Displays a notification toast with variants (success, error, warning, info).
 * Supports action buttons and manual dismissal.
 * 
 * Features:
 * - Four variants with appropriate colors and icons
 * - Optional action button
 * - Manual close button
 * - Entrance and exit animations
 * - Accessible with ARIA attributes
 * 
 * Design Reference: Error Handling section
 */
export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-error-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-info-600" />;
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-success-50 border-success-200 text-success-900';
      case 'error':
        return 'bg-error-50 border-error-200 text-error-900';
      case 'warning':
        return 'bg-warning-50 border-warning-200 text-warning-900';
      case 'info':
        return 'bg-info-50 border-info-200 text-info-900';
    }
  };

  const getActionButtonStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'text-success-700 hover:text-success-800';
      case 'error':
        return 'text-error-700 hover:text-error-800';
      case 'warning':
        return 'text-warning-700 hover:text-warning-800';
      case 'info':
        return 'text-info-700 hover:text-info-800';
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${getStyles()} animate-in slide-in-from-right-5 fade-in duration-300`}
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <div className="flex-shrink-0" aria-hidden="true">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{toast.message}</p>
        {toast.action && (
          <button
            onClick={() => {
              toast.action?.onClick();
              onRemove(toast.id);
            }}
            className={`mt-2 text-sm font-semibold underline hover:no-underline transition-all ${getActionButtonStyles()}`}
            aria-label={toast.action.label}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

/**
 * Toast Container Component
 * 
 * Container for displaying multiple toasts in a stack.
 * Positioned in the top-right corner with proper spacing.
 */
interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed top-4 right-4 z-50 space-y-2 max-w-md" 
      aria-label="Notifications"
      role="region"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};
