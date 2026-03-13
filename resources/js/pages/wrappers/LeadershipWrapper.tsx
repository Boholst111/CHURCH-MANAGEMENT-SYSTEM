import React from 'react';
import { useModernUIPage } from '../../hooks/useFeatureFlag';
import Leadership from '../Leadership';

/**
 * Wrapper component for Leadership page
 * Switches between old and new UI based on feature flag
 */
const LeadershipWrapper: React.FC = () => {
  const useModernUI = useModernUIPage('leadership');

  if (useModernUI) {
    // Render new modern UI Leadership page
    return <Leadership />;
  }

  // Render old UI Leadership page (placeholder for now)
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">
            Legacy Leadership
          </h2>
          <p className="text-yellow-800">
            You are viewing the legacy Leadership page. The modern UI is not enabled for your account.
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            Contact your administrator to enable the modern UI experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadershipWrapper;
