/**
 * API Error Handling Example Component
 * 
 * Demonstrates how to use the API error handling utilities:
 * - useApiError hook
 * - withApiErrorHandling wrapper
 * - Retry functionality
 * - Offline indicator
 * 
 * Validates Requirements: Task 22.3 - API Error Handling
 */

import React, { useState } from 'react';
import { useApiError } from '../../hooks/useApiError';
import { withApiErrorHandling, createRetryFunction } from '../../lib/withApiErrorHandling';
import api from '../../lib/api';
import { Button } from './button';
import { Card } from './card';
import { OfflineIndicator } from './offline-indicator';

/**
 * Example 1: Basic Error Handling with useApiError Hook
 */
export const BasicErrorHandlingExample: React.FC = () => {
  const { handleError, isOnline } = useApiError();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/example-endpoint');
      setData(response.data);
    } catch (error) {
      handleError(error, {
        message: 'Failed to load data. Please try again.',
        showRetry: true,
        onRetry: fetchData,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Basic Error Handling Example">
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">
          Status: {isOnline() ? 'Online' : 'Offline'}
        </p>
        <Button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </Button>
        {data && (
          <pre className="bg-neutral-100 p-4 rounded text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </Card>
  );
};

/**
 * Example 2: Error Handling with Automatic Retry
 */
export const AutoRetryExample: React.FC = () => {
  const { handleError } = useApiError();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDataWithRetry = async () => {
    setLoading(true);
    
    const result = await withApiErrorHandling(
      () => api.get('/api/example-endpoint'),
      {
        maxRetries: 3,
        retryDelay: 1000,
        context: 'Fetch Example Data',
        onError: (error) => {
          handleError(error, {
            message: 'Failed to load data after 3 attempts.',
          });
        },
      }
    );

    if (result) {
      setData(result.data);
    }
    
    setLoading(false);
  };

  return (
    <Card title="Auto Retry Example">
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">
          This example automatically retries failed requests up to 3 times.
        </p>
        <Button onClick={fetchDataWithRetry} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data with Auto Retry'}
        </Button>
        {data && (
          <pre className="bg-neutral-100 p-4 rounded text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </Card>
  );
};

/**
 * Example 3: Form Submission with Error Handling
 */
export const FormSubmissionExample: React.FC = () => {
  const { handleError } = useApiError();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [savedData, setSavedData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/example-endpoint', formData);
      setSavedData(response.data);
      
      // Clear form on success
      setFormData({ name: '', email: '' });
    } catch (error) {
      // Preserve user input on error
      handleError(error, {
        message: 'Failed to save data. Your input has been preserved.',
        showRetry: true,
        onRetry: () => handleSubmit(e),
        preserveInput: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Form Submission Example">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
        {savedData && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <p className="text-sm text-success-800">Data saved successfully!</p>
          </div>
        )}
      </form>
    </Card>
  );
};

/**
 * Example 4: Manual Retry Function
 */
export const ManualRetryExample: React.FC = () => {
  const { handleError } = useApiError();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [retryFn, setRetryFn] = useState<(() => Promise<void>) | null>(null);

  const fetchData = async () => {
    setLoading(true);
    
    try {
      const response = await api.get('/api/example-endpoint');
      setData(response.data);
      setRetryFn(null); // Clear retry function on success
    } catch (error) {
      // Create retry function
      const retry = createRetryFunction(
        () => api.get('/api/example-endpoint'),
        (result) => {
          setData(result.data);
          setRetryFn(null);
        },
        (err) => {
          handleError(err, {
            message: 'Retry failed. Please try again.',
          });
        }
      );
      
      setRetryFn(() => retry);
      handleError(error, {
        message: 'Failed to load data.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Manual Retry Example">
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">
          This example provides a manual retry button when an error occurs.
        </p>
        <div className="flex gap-2">
          <Button onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Data'}
          </Button>
          {retryFn && (
            <Button onClick={retryFn} variant="outline">
              Retry
            </Button>
          )}
        </div>
        {data && (
          <pre className="bg-neutral-100 p-4 rounded text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </Card>
  );
};

/**
 * Complete Example with Offline Indicator
 */
export const CompleteExample: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <OfflineIndicator />
      
      <h1 className="text-2xl font-bold text-neutral-900">
        API Error Handling Examples
      </h1>
      
      <BasicErrorHandlingExample />
      <AutoRetryExample />
      <FormSubmissionExample />
      <ManualRetryExample />
    </div>
  );
};
