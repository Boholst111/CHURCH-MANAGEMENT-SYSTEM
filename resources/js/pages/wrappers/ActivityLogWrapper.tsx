import React from 'react';
import { useModernUIPage } from '../../hooks/useFeatureFlag';
import ActivityLog from '../ActivityLog';

/**
 * Wrapper component for Activity Log page
 * Switches between old and new UI based on feature flag
 */
const ActivityLogWrapper: React.FC = () => {
  const useModernUI = useModernUIPage('activity_log');

  if (useModernUI) {
    // Render new modern UI Activity Log page
    return <ActivityLog />;
  }

  // Render old UI Activity Log page (placeholder for now)
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">
            Legacy Activity Log
          </h2>
          <p className="text-yellow-800">
            You are viewing the legacy Activity Log page. The modern UI is not enabled for your account.
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            Contact your administrator to enable the modern UI experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogWrapper;
