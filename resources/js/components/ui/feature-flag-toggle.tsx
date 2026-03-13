import React, { useState } from 'react';
import { Settings, ToggleLeft, ToggleRight, Info } from 'lucide-react';
import { useFeatureFlags } from '@/hooks/useFeatureFlag';
import { Card } from './card';
import { Button } from './button';

/**
 * Feature Flag Toggle Component
 * 
 * Displays current feature flag status and provides information
 * about the Modern UI rollout. This is an informational component
 * for administrators to see which features are enabled.
 * 
 * Note: Actual feature flag changes must be made in the .env file
 * and require cache clearing. This component only displays status.
 */
export function FeatureFlagToggle() {
  const flags = useFeatureFlags();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Settings className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Modern UI Feature Flag
            </h3>
            <p className="text-sm text-neutral-600">
              Current status of the Modern UI/UX redesign rollout
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {flags.modern_ui ? (
            <ToggleRight className="w-8 h-8 text-success-600" />
          ) : (
            <ToggleLeft className="w-8 h-8 text-neutral-400" />
          )}
          <span className={`text-sm font-medium ${
            flags.modern_ui ? 'text-success-600' : 'text-neutral-600'
          }`}>
            {flags.modern_ui ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Status Information */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
          <span className="text-sm font-medium text-neutral-700">
            Global Status
          </span>
          <span className={`text-sm font-semibold ${
            flags.modern_ui ? 'text-success-600' : 'text-neutral-600'
          }`}>
            {flags.modern_ui ? 'Active' : 'Inactive'}
          </span>
        </div>

        {flags.modern_ui && (
          <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-primary-900">
                <p className="font-medium mb-1">Modern UI is enabled for your account</p>
                <p className="text-primary-700">
                  You are seeing the new interface design. If you encounter any issues,
                  please contact your system administrator.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Page-specific flags */}
      {flags.modern_ui && (
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full justify-between"
          >
            <span className="text-sm font-medium">Page-specific Settings</span>
            <span className="text-xs text-neutral-500">
              {showDetails ? 'Hide' : 'Show'}
            </span>
          </Button>

          {showDetails && (
            <div className="mt-3 space-y-2">
              {Object.entries(flags.modern_ui_pages).map(([page, enabled]) => (
                <div
                  key={page}
                  className="flex items-center justify-between p-2 bg-neutral-50 rounded"
                >
                  <span className="text-sm text-neutral-700 capitalize">
                    {page.replace(/_/g, ' ')}
                  </span>
                  <span className={`text-xs font-medium ${
                    enabled ? 'text-success-600' : 'text-neutral-500'
                  }`}>
                    {enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Administrator Information */}
      <div className="pt-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-600 mb-2">
          <strong>For Administrators:</strong>
        </p>
        <p className="text-xs text-neutral-600 mb-2">
          To change feature flag settings, update the following environment variables
          in your <code className="px-1 py-0.5 bg-neutral-100 rounded">.env</code> file:
        </p>
        <ul className="text-xs text-neutral-600 space-y-1 list-disc list-inside">
          <li><code className="px-1 py-0.5 bg-neutral-100 rounded">MODERN_UI_ENABLED</code> - Master switch (true/false)</li>
          <li><code className="px-1 py-0.5 bg-neutral-100 rounded">MODERN_UI_BETA_USERS</code> - Comma-separated user IDs</li>
          <li><code className="px-1 py-0.5 bg-neutral-100 rounded">MODERN_UI_ROLLOUT_PERCENTAGE</code> - Percentage (0-100)</li>
        </ul>
        <p className="text-xs text-neutral-600 mt-2">
          After making changes, run: <code className="px-1 py-0.5 bg-neutral-100 rounded">php artisan config:clear</code>
        </p>
      </div>
    </Card>
  );
}
