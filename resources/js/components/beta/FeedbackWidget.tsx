import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Modal } from '../ui/modal';
import { useToast } from '../../contexts/ToastContext';

interface FeedbackFormData {
  type: 'bug' | 'feature_request' | 'general';
  severity: 'critical' | 'high' | 'medium' | 'low';
  page: string;
  description: string;
  steps_to_reproduce: string;
  expected_behavior: string;
  actual_behavior: string;
}

/**
 * Beta Feedback Widget Component
 * 
 * Floating feedback button for beta testers to submit feedback.
 * Only visible to beta users during testing phase.
 * 
 * Features:
 * - Quick access feedback form
 * - Bug reports with detailed fields
 * - Feature requests
 * - General feedback
 * - Auto-captures browser and page context
 * 
 * Design Reference: Beta Testing Setup
 */
export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<FeedbackFormData>({
    type: 'bug',
    severity: 'medium',
    page: window.location.pathname,
    description: '',
    steps_to_reproduce: '',
    expected_behavior: '',
    actual_behavior: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/beta-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          browser_info: navigator.userAgent,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
        }),
      });

      if (response.ok) {
        showToast('success', 'Thank you for your feedback!');
        setIsOpen(false);
        // Reset form
        setFormData({
          type: 'bug',
          severity: 'medium',
          page: window.location.pathname,
          description: '',
          steps_to_reproduce: '',
          expected_behavior: '',
          actual_behavior: '',
        });
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      showToast('error', 'Failed to submit feedback. Please try again.');
      console.error('Error submitting feedback:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Provide Beta Feedback"
        title="Provide Beta Feedback"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Feedback Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Beta Feedback"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Info Banner */}
          <div className="bg-info-50 border border-info-200 rounded-lg p-3">
            <p className="text-sm text-info-900">
              Thank you for participating in beta testing! Your feedback helps us improve the system.
            </p>
          </div>

          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Feedback Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="bug">Bug Report</option>
              <option value="feature_request">Feature Request</option>
              <option value="general">General Feedback</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Severity *
            </label>
            <select
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="critical">Critical - System unusable</option>
              <option value="high">High - Major functionality broken</option>
              <option value="medium">Medium - Minor issue</option>
              <option value="low">Low - Cosmetic or enhancement</option>
            </select>
          </div>

          {/* Page/Section */}
          <Input
            label="Page/Section"
            value={formData.page}
            onChange={(value) => setFormData({ ...formData, page: String(value) })}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="Describe the issue or feedback in detail..."
              required
            />
          </div>

          {/* Bug-specific fields */}
          {formData.type === 'bug' && (
            <>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Steps to Reproduce
                </label>
                <textarea
                  value={formData.steps_to_reproduce}
                  onChange={(e) => setFormData({ ...formData, steps_to_reproduce: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="1. Go to...&#10;2. Click on...&#10;3. See error"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Expected Behavior
                </label>
                <textarea
                  value={formData.expected_behavior}
                  onChange={(e) => setFormData({ ...formData, expected_behavior: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={2}
                  placeholder="What should happen?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Actual Behavior
                </label>
                <textarea
                  value={formData.actual_behavior}
                  onChange={(e) => setFormData({ ...formData, actual_behavior: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={2}
                  placeholder="What actually happens?"
                />
              </div>
            </>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              icon={submitting ? <Send className="animate-pulse" /> : <Send />}
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
