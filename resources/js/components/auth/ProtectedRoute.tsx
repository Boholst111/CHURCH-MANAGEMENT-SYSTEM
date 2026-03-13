import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, authSelectors } from '../../stores';
import { Spinner } from '../ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredPermissions?: string[];
  requireAll?: boolean;
}

/**
 * ProtectedRoute component that guards routes based on authentication and permissions
 * 
 * Features:
 * - Redirects to login if not authenticated
 * - Checks single or multiple permissions
 * - Shows loading state while checking auth
 * - Shows access denied message if permissions insufficient
 * - Preserves intended destination for redirect after login
 * 
 * @example
 * ```tsx
 * // Require authentication only
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * 
 * // Require specific permission
 * <ProtectedRoute requiredPermission="members.edit">
 *   <EditMember />
 * </ProtectedRoute>
 * 
 * // Require any of multiple permissions
 * <ProtectedRoute requiredPermissions={["members.view", "members.edit"]}>
 *   <MembersList />
 * </ProtectedRoute>
 * 
 * // Require all permissions
 * <ProtectedRoute requiredPermissions={["finance.view", "finance.approve"]} requireAll>
 *   <ApproveExpense />
 * </ProtectedRoute>
 * ```
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission,
  requiredPermissions,
  requireAll = false,
}) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  const loading = useAuthStore(authSelectors.loading);
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const hasAnyPermission = useAuthStore((state) => state.hasAnyPermission);
  const hasAllPermissions = useAuthStore((state) => state.hasAllPermissions);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" label="Checking authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated, preserving the intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check permissions if required
  let hasRequiredPermissions = true;

  if (requiredPermission) {
    hasRequiredPermissions = hasPermission(requiredPermission);
  } else if (requiredPermissions && requiredPermissions.length > 0) {
    hasRequiredPermissions = requireAll
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);
  }

  // Show access denied if permissions are insufficient
  if (!hasRequiredPermissions) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-error-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-error-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-neutral-900 mb-2">
            Access Denied
          </h2>
          <p className="text-center text-neutral-600 mb-6">
            You do not have sufficient permissions to access this page.
            {requiredPermission && (
              <span className="block mt-2 text-sm font-medium">
                Required permission: <code className="bg-neutral-100 px-2 py-1 rounded">{requiredPermission}</code>
              </span>
            )}
            {requiredPermissions && requiredPermissions.length > 0 && (
              <span className="block mt-2 text-sm font-medium">
                Required permissions ({requireAll ? 'all' : 'any'}): 
                <code className="bg-neutral-100 px-2 py-1 rounded ml-1">
                  {requiredPermissions.join(', ')}
                </code>
              </span>
            )}
          </p>
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and has sufficient permissions
  return <>{children}</>;
};

export default ProtectedRoute;
