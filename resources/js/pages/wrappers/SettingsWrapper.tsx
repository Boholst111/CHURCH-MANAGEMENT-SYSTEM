import React from 'react';
import { useModernUIPage } from '../../hooks/useFeatureFlag';
import Settings from '../Settings';

/**
 * Wrapper component for Settings page
 * Switches between old and new UI based on feature flag
 */
const SettingsWrapper: React.FC = () => {
  const useModernUI = useModernUIPage('settings');

  if (useModernUI) {
    // Render new modern UI Settings page
    return <Settings />;
  }

  // Render old UI Settings page (placeholder for now)
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">
            Legacy Settings
          </h2>
          <p className="text-yellow-800">
            You are viewing the legacy Settings page. The modern UI is not enabled for your account.
          </p>
          <p className="text-sm text-yellow-700 mt-2">
            Contact your administrator to enable the modern UI experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsWrapper;
