import React from 'react';
import { useModernUIPage } from '../../hooks/useFeatureFlag';
import Dashboard from '../Dashboard';

/**
 * Wrapper component for Dashboard page
 * Switches between old and new UI based on feature flag
 */
const DashboardWrapper: React.FC = () => {
  const useModernUI = useModernUIPage('dashboard');

  if (useModernUI) {
    // Render new modern UI Dashboard
    return <Dashboard />;
  }

  // Render old UI Dashboard (placeholder for now)
  // In a real migration, this would render the legacy Dashboard component
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">
            Legacy Dashboard
          </h2>
          <p className="text-yellow-800">
            You are viewing the legacy Dashboard. The modern UI is not enabled for your account.
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            Contact your administrator to enable the modern UI experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
