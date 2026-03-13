import React, { useState, useEffect } from 'react';
import {
  Settings,
  ToggleLeft,
  ToggleRight,
  Users,
  Percent,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectOption } from '../ui/select';
import { useToast } from '../../contexts/ToastContext';
import { Badge } from '../ui/badge';

interface FeatureFlagConfig {
  enabled: boolean;
  beta_users: number[];
  rollout_percentage: number;
  pages: Record<string, boolean>;
  stats: {
    total_users: number;
    beta_users_count: number;
    rollout_users_count: number;
    total_enabled_users: number;
    percentage_enabled: number;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Feature Flag Admin Panel Component
 * 
 * Comprehensive admin interface for managing feature flags.
 * 
 * Features:
 * - Enable/disable master switch
 * - Manage beta user list
 * - Control rollout percentage
 * - Toggle per-page flags
 * - View statistics dashboard
 * - User-level overrides for testing
 * 
 * Design Reference: Migration Strategy section
 */
export function FeatureFlagAdminPanel() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<FeatureFlagConfig | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedBetaUsers, setSelectedBetaUsers] = useState<number[]>([]);
  const [rolloutPercentage, setRolloutPercentage] = useState(0);
  const [masterEnabled, setMasterEnabled] = useState(false);
  const [pageFlags, setPageFlags] = useState<Record<string, boolean>>({});
  const [showUserSelector, setShowUserSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadConfig();
    loadUsers();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/feature-flags/admin', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load feature flag configuration');
      }

      const result = await response.json();
      if (result.success) {
        setConfig(result.data);
        setMasterEnabled(result.data.enabled);
        setSelectedBetaUsers(result.data.beta_users);
        setRolloutPercentage(result.data.rollout_percentage);
        setPageFlags(result.data.pages);
      }
    } catch (error) {
      showToast('error', 'Failed to load feature flag configuration');
      console.error('Error loading config:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/feature-flags/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load users');
      }

      const result = await response.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/feature-flags/admin', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          enabled: masterEnabled,
          beta_users: selectedBetaUsers,
          rollout_percentage: rolloutPercentage,
          pages: pageFlags,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save feature flag configuration');
      }

      const result = await response.json();
      if (result.success) {
        showToast('success', 'Feature flags updated successfully');
        await loadConfig(); // Reload to get updated stats
      } else {
        throw new Error(result.message || 'Failed to save configuration');
      }
    } catch (error) {
      showToast(
        'error',
        error instanceof Error ? error.message : 'Failed to save feature flags'
      );
      console.error('Error saving config:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleBetaUser = (userId: number) => {
    setSelectedBetaUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const togglePageFlag = (page: string) => {
    setPageFlags((prev) => ({
      ...prev,
      [page]: !prev[page],
    }));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(String(searchQuery).toLowerCase()) ||
      user.email.toLowerCase().includes(String(searchQuery).toLowerCase())
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      </Card>
    );
  }

  if (!config) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 text-error-600">
          <AlertCircle className="w-6 h-6" />
          <p>Failed to load feature flag configuration</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Feature Flag Management
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Control the rollout of the Modern UI/UX redesign
          </p>
        </div>
        <Button
          onClick={saveConfig}
          disabled={saving}
          icon={saving ? <RefreshCw className="animate-spin" /> : <Save />}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Users className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Total Users</p>
              <p className="text-2xl font-bold text-neutral-900">
                {config.stats.total_users}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <Shield className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Beta Users</p>
              <p className="text-2xl font-bold text-neutral-900">
                {config.stats.beta_users_count}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-info-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-info-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Rollout Users</p>
              <p className="text-2xl font-bold text-neutral-900">
                {config.stats.rollout_users_count}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Zap className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Total Enabled</p>
              <p className="text-2xl font-bold text-neutral-900">
                {config.stats.total_enabled_users}
                <span className="text-sm text-neutral-600 ml-1">
                  ({config.stats.percentage_enabled}%)
                </span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Master Switch */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Settings className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Master Switch
              </h3>
              <p className="text-sm text-neutral-600">
                Enable or disable Modern UI globally
              </p>
            </div>
          </div>

          <button
            onClick={() => setMasterEnabled(!masterEnabled)}
            className="flex items-center gap-2 transition-colors"
          >
            {masterEnabled ? (
              <>
                <ToggleRight className="w-10 h-10 text-success-600" />
                <span className="text-sm font-medium text-success-600">
                  Enabled
                </span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-10 h-10 text-neutral-400" />
                <span className="text-sm font-medium text-neutral-600">
                  Disabled
                </span>
              </>
            )}
          </button>
        </div>

        {!masterEnabled && (
          <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-warning-900">
                Modern UI is currently disabled for all users. Enable the master
                switch to start the rollout.
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Beta Users */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <Users className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Beta Users
              </h3>
              <p className="text-sm text-neutral-600">
                Select specific users for beta testing
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowUserSelector(!showUserSelector)}
            icon={showUserSelector ? <EyeOff /> : <Eye />}
          >
            {showUserSelector ? 'Hide' : 'Show'} Users
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="primary">
            {selectedBetaUsers.length} user{selectedBetaUsers.length !== 1 ? 's' : ''} selected
          </Badge>
          {selectedBetaUsers.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBetaUsers([])}
            >
              Clear All
            </Button>
          )}
        </div>

        {showUserSelector && (
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(value) => setSearchQuery(String(value))}
            />

            <div className="max-h-64 overflow-y-auto border border-neutral-200 rounded-lg">
              {filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-neutral-600">
                  No users found
                </div>
              ) : (
                <div className="divide-y divide-neutral-200">
                  {filteredUsers.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center gap-3 p-3 hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBetaUsers.includes(user.id)}
                        onChange={() => toggleBetaUser(user.id)}
                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-neutral-600">{user.email}</p>
                      </div>
                      {selectedBetaUsers.includes(user.id) && (
                        <CheckCircle className="w-4 h-4 text-success-600" />
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-info-50 border border-info-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-info-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-info-900">
              Beta users will always see the Modern UI when the master switch is
              enabled, regardless of the rollout percentage.
            </p>
          </div>
        </div>
      </Card>

      {/* Rollout Percentage */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-info-100 rounded-lg">
            <Percent className="w-5 h-5 text-info-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Rollout Percentage
            </h3>
            <p className="text-sm text-neutral-600">
              Gradually roll out to a percentage of users
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-700">
                Percentage: {rolloutPercentage}%
              </label>
              <Badge variant={rolloutPercentage === 0 ? 'neutral' : 'primary'}>
                {rolloutPercentage === 0
                  ? 'No rollout'
                  : rolloutPercentage === 100
                  ? 'Full rollout'
                  : `${rolloutPercentage}% rollout`}
              </Badge>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={rolloutPercentage}
              onChange={(e) => setRolloutPercentage(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-600 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-warning-900">
                <p className="font-medium mb-1">Rollout Strategy</p>
                <p>
                  Users are selected deterministically based on their user ID. The
                  same users will always see the Modern UI at a given percentage.
                  Beta users are excluded from this calculation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Page-Specific Flags */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-warning-100 rounded-lg">
            <Settings className="w-5 h-5 text-warning-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Page-Specific Flags
            </h3>
            <p className="text-sm text-neutral-600">
              Control Modern UI for individual pages
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(pageFlags).map(([page, enabled]) => (
            <div
              key={page}
              className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-900 capitalize">
                {page.replace(/_/g, ' ')}
              </span>
              <button
                onClick={() => togglePageFlag(page)}
                className="flex items-center gap-2"
                disabled={!masterEnabled}
              >
                {enabled ? (
                  <>
                    <ToggleRight className="w-8 h-8 text-success-600" />
                    <span className="text-xs font-medium text-success-600">
                      On
                    </span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-8 h-8 text-neutral-400" />
                    <span className="text-xs font-medium text-neutral-600">
                      Off
                    </span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {!masterEnabled && (
          <div className="mt-4 p-3 bg-neutral-100 border border-neutral-300 rounded-lg">
            <p className="text-sm text-neutral-600">
              Page-specific flags are only active when the master switch is enabled.
            </p>
          </div>
        )}
      </Card>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <Button
          onClick={saveConfig}
          disabled={saving}
          size="lg"
          icon={saving ? <RefreshCw className="animate-spin" /> : <Save />}
        >
          {saving ? 'Saving Changes...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
}
