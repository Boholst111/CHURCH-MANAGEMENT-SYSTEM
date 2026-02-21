import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from './ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'staff' | 'readonly';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" label="Checking authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if requiredRole is specified
  if (requiredRole) {
    const roleHierarchy: Record<string, number> = {
      readonly: 1,
      staff: 2,
      admin: 3,
    };

    const userRoleLevel = roleHierarchy[user.role.toLowerCase()] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole.toLowerCase()] || 0;

    // If user doesn't have sufficient permissions, show error message
    if (userRoleLevel < requiredRoleLevel) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-red-600"
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
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-center text-gray-600 mb-6">
              You do not have sufficient permissions to access this page. This page requires{' '}
              <span className="font-semibold">{requiredRole}</span> role or higher.
            </p>
            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and has sufficient permissions
  return <>{children}</>;
};

export default ProtectedRoute;
