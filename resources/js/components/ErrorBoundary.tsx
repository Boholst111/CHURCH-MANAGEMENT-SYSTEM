import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

/**
 * Error Boundary Props
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Error Boundary State
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * Features:
 * - Catches unhandled errors in React components
 * - Displays user-friendly error message
 * - Provides recovery options (reload, go back, go home)
 * - Logs errors for debugging
 * - Shows detailed error information in development mode
 * 
 * Design Reference: Error Handling section
 * Validates Requirements: 6.6
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log error details
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to log to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  /**
   * Reset error boundary state and reload the page
   */
  handleReload = (): void => {
    window.location.reload();
  };

  /**
   * Navigate back to previous page
   */
  handleGoBack = (): void => {
    window.history.back();
  };

  /**
   * Navigate to home page
   */
  handleGoHome = (): void => {
    window.location.href = '/';
  };

  /**
   * Render error UI or children
   */
  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI with modern design system styling
      return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-8 shadow-xl">
            <div className="text-center">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-error-100 dark:bg-error-900/20 p-4">
                  <AlertTriangle className="h-12 w-12 text-error-600 dark:text-error-400" />
                </div>
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Oops! Something went wrong
              </h1>

              {/* Error Message */}
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                We're sorry, but something unexpected happened. The error has been logged 
                and we'll look into it. Please try one of the options below to continue.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 text-left">
                  <details className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
                    <summary className="cursor-pointer font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                      Error Details (Development Only)
                    </summary>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Error:</p>
                        <pre className="text-xs text-error-600 dark:text-error-400 overflow-auto p-2 bg-white dark:bg-neutral-900 rounded">
                          {this.state.error.toString()}
                        </pre>
                      </div>
                      {this.state.errorInfo && (
                        <div>
                          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Component Stack:</p>
                          <pre className="text-xs text-neutral-600 dark:text-neutral-400 overflow-auto p-2 bg-white dark:bg-neutral-900 rounded max-h-48">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReload}
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reload Page
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleGoBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
