import React from 'react';
import { useToast } from '../../contexts/ToastContext';
import { Button } from './button';

/**
 * Toast Component Examples
 * 
 * Demonstrates all toast variants and features:
 * - Success, error, warning, and info variants
 * - Action buttons
 * - Configurable duration
 * - Manual dismissal
 * - Multiple toasts stacking
 */
export const ToastExamples: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Toast Notification Examples</h2>
        <p className="text-neutral-600 mb-6">
          Click the buttons below to see different toast notification variants.
        </p>
      </div>

      {/* Basic Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() => showToast('success', 'Operation completed successfully!')}
          >
            Show Success Toast
          </Button>
          <Button
            variant="danger"
            onClick={() => showToast('error', 'An error occurred. Please try again.')}
          >
            Show Error Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => showToast('warning', 'Warning: This action cannot be undone.')}
          >
            Show Warning Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => showToast('info', 'Here is some helpful information.')}
          >
            Show Info Toast
          </Button>
        </div>
      </section>

      {/* With Action Buttons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">With Action Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() =>
              showToast('success', 'Member added successfully!', {
                action: {
                  label: 'View Member',
                  onClick: () => console.log('Navigate to member details'),
                },
              })
            }
          >
            Success with Action
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              showToast('error', 'Failed to save changes.', {
                action: {
                  label: 'Retry',
                  onClick: () => console.log('Retrying operation...'),
                },
              })
            }
          >
            Error with Retry
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              showToast('info', 'New update available!', {
                action: {
                  label: 'Update Now',
                  onClick: () => console.log('Starting update...'),
                },
              })
            }
          >
            Info with Action
          </Button>
        </div>
      </section>

      {/* Custom Duration */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Duration</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              showToast('info', 'This toast will disappear in 2 seconds', {
                duration: 2000,
              })
            }
          >
            2 Second Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              showToast('info', 'This toast will disappear in 10 seconds', {
                duration: 10000,
              })
            }
          >
            10 Second Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              showToast('warning', 'This toast stays until manually closed', {
                duration: 0,
              })
            }
          >
            Persistent Toast
          </Button>
        </div>
      </section>

      {/* Multiple Toasts */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Multiple Toasts</h3>
        <Button
          variant="primary"
          onClick={() => {
            showToast('success', 'First operation completed');
            setTimeout(() => showToast('info', 'Processing second operation...'), 500);
            setTimeout(() => showToast('success', 'Second operation completed'), 1000);
            setTimeout(() => showToast('warning', 'Please review the results'), 1500);
          }}
        >
          Show Multiple Toasts
        </Button>
      </section>

      {/* Real-World Examples */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Real-World Examples</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() =>
              showToast('success', 'Member profile updated successfully', {
                duration: 3000,
              })
            }
          >
            Profile Updated
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              showToast('error', 'Failed to connect to server', {
                action: {
                  label: 'Retry',
                  onClick: () => console.log('Retrying connection...'),
                },
                duration: 0,
              })
            }
          >
            Connection Error
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showToast('warning', 'Your session will expire in 5 minutes', {
                action: {
                  label: 'Extend Session',
                  onClick: () => console.log('Extending session...'),
                },
                duration: 0,
              })
            }
          >
            Session Warning
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              showToast('info', 'New features are available!', {
                action: {
                  label: 'Learn More',
                  onClick: () => console.log('Opening feature guide...'),
                },
                duration: 8000,
              })
            }
          >
            Feature Announcement
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ToastExamples;
