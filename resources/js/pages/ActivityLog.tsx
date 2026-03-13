import React, { useState, useEffect } from 'react';
import {
  Activity as ActivityIcon,
  Filter,
  Download,
  X,
  User,
  Tag,
  Globe,
  Clock,
  AlertCircle,
  AlertTriangle,
  Info,
  XCircle,
} from 'lucide-react';
import { activityApi, Activity, ActivityFilters, UserOption } from '../lib/activityApi';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui/select';
import { DatePicker } from '../components/ui/datepicker';
import { Modal } from '../components/ui/modal';
import { Badge } from '../components/ui/badge';
import { useVirtualScrolling } from '../hooks/useVirtualScrolling';
import VirtualActivityTimeline, { ActivityWithSeverity } from '../components/activity/VirtualActivityTimeline';

type SeverityLevel = 'info' | 'warning' | 'error' | 'critical';

const ActivityLog: React.FC = () => {
  const [activities, setActivities] = useState<ActivityWithSeverity[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<ActivityWithSeverity | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [realTimeEnabled, setRealTimeEnabled] = useState(false);
  const [filters, setFilters] = useState<ActivityFilters>({
    page: 1,
    per_page: 20,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0,
    last_page: 1,
    from: null as number | null,
    to: null as number | null,
  });
  const { showToast } = useToast();

  // Determine if we should use virtual scrolling (>100 items)
  const shouldUseVirtualScrolling = useVirtualScrolling(activities.length);

  // Fetch users for filter dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await activityApi.getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch activities when filters change
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await activityApi.getActivities(filters);
        // Enhance activities with severity and module info
        const enhancedActivities = response.data.map((activity) => ({
          ...activity,
          severity: determineSeverity(activity),
          module: extractModule(activity.entity_type),
        }));
        setActivities(enhancedActivities);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        showToast('error', 'Failed to load activity log');
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [filters, showToast]);

  // Real-time updates polling
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(async () => {
      try {
        const response = await activityApi.getActivities({ ...filters, page: 1 });
        const enhancedActivities = response.data.map((activity) => ({
          ...activity,
          severity: determineSeverity(activity),
          module: extractModule(activity.entity_type),
        }));
        setActivities(enhancedActivities);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Failed to refresh activities:', error);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [realTimeEnabled, filters]);

  // Helper function to determine severity based on action
  const determineSeverity = (activity: Activity): SeverityLevel => {
    const action = activity.action.toLowerCase();
    if (action.includes('delete') || action.includes('remove')) return 'error';
    if (action.includes('fail') || action.includes('error')) return 'critical';
    if (action.includes('update') || action.includes('edit')) return 'warning';
    return 'info';
  };

  // Helper function to extract module from entity type
  const extractModule = (entityType: string): string => {
    if (!entityType) return 'System';
    // Convert entity type like "App\\Models\\Member" to "Members"
    const parts = entityType.split('\\');
    const modelName = parts[parts.length - 1];
    return modelName.endsWith('s') ? modelName : `${modelName}s`;
  };

  const handleFilterChange = (key: keyof ActivityFilters, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      per_page: 20,
    });
    showToast('success', 'Filters cleared');
  };

  const handleExportLog = () => {
    showToast('info', 'Export functionality coming soon');
    // TODO: Implement export to CSV/PDF
  };

  const handleActivityClick = (activity: ActivityWithSeverity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'info':
        return 'bg-primary-500';
      case 'warning':
        return 'bg-warning-500';
      case 'error':
        return 'bg-error-500';
      case 'critical':
        return 'bg-error-700';
      default:
        return 'bg-neutral-500';
    }
  };

  const getSeverityIcon = (severity: SeverityLevel) => {
    switch (severity) {
      case 'info':
        return <Info className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'critical':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
              <ActivityIcon className="w-8 h-8 text-primary-600" />
              Activity Log
            </h1>
            <p className="text-neutral-600 mt-2">System activity and audit trail</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" icon={<Download />} onClick={handleExportLog}>
              Export Log
            </Button>
            <Button variant="ghost" icon={<X />} onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={realTimeEnabled}
              onChange={(e) => setRealTimeEnabled(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">Real-time updates</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              value={filters.start_date || ''}
              onChange={(e) => handleFilterChange('start_date', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              value={filters.end_date || ''}
              onChange={(e) => handleFilterChange('end_date', e.target.value)}
            />
          </div>

          {/* User Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">User</label>
            <select
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              value={filters.user_id || ''}
              onChange={(e) =>
                handleFilterChange('user_id', e.target.value ? parseInt(e.target.value) : '')
              }
            >
              <option value="">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Action</label>
            <select
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              value={filters.action || ''}
              onChange={(e) => handleFilterChange('action', e.target.value)}
            >
              <option value="">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
            </select>
          </div>

          {/* Module Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Module</label>
            <select
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              value={filters.entity_type || ''}
              onChange={(e) => handleFilterChange('entity_type', e.target.value)}
            >
              <option value="">All Modules</option>
              <option value="Member">Members</option>
              <option value="Event">Events</option>
              <option value="Offering">Finance</option>
              <option value="Expense">Finance</option>
              <option value="SmallGroup">Small Groups</option>
              <option value="User">Users</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary-600 border-t-transparent"></div>
            <p className="mt-4 text-neutral-600">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
            <ActivityIcon className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <p className="text-neutral-600 text-lg">No activities found</p>
            <p className="text-neutral-500 text-sm mt-2">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : shouldUseVirtualScrolling ? (
          <>
            <VirtualActivityTimeline
              activities={activities}
              onActivityClick={handleActivityClick}
              height={600}
            />

            {/* Pagination */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-neutral-700">
                Showing {pagination.from || 0} to {pagination.to || 0} of {pagination.total}{' '}
                activities
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-neutral-700 px-3">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-start gap-4">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${getSeverityColor(
                        activity.severity || 'info'
                      )} mt-1`}
                    />
                    {index < activities.length - 1 && (
                      <div className="w-0.5 h-full bg-neutral-200 mt-2" />
                    )}
                  </div>

                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-neutral-900">
                          {activity.user_name}
                        </span>
                        <Badge variant="outline" size="sm">
                          {activity.action}
                        </Badge>
                      </div>
                      <span className="text-sm text-neutral-500">
                        {formatRelativeTime(activity.created_at)}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-700 mb-3">{activity.description}</p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <div className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{activity.module || 'System'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getSeverityIcon(activity.severity || 'info')}
                        <span className="capitalize">{activity.severity || 'info'}</span>
                      </div>
                      {activity.ip_address && (
                        <div className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" />
                          <span>{activity.ip_address}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(activity.created_at).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-neutral-700">
                Showing {pagination.from || 0} to {pagination.to || 0} of {pagination.total}{' '}
                activities
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-neutral-700 px-3">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title="Activity Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* User Information */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">User Information</h3>
              <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Name:</span>
                  <span className="text-sm font-medium text-neutral-900">
                    {selectedActivity.user_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">User ID:</span>
                  <span className="text-sm font-medium text-neutral-900">
                    #{selectedActivity.user_id}
                  </span>
                </div>
                {selectedActivity.ip_address && (
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">IP Address:</span>
                    <span className="text-sm font-medium text-neutral-900">
                      {selectedActivity.ip_address}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Details */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Action Details</h3>
              <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Action Type:</span>
                  <Badge variant="outline">{selectedActivity.action}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Module:</span>
                  <span className="text-sm font-medium text-neutral-900">
                    {selectedActivity.module || 'System'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Timestamp:</span>
                  <span className="text-sm font-medium text-neutral-900">
                    {new Date(selectedActivity.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Severity:</span>
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(selectedActivity.severity || 'info')}
                    <span className="text-sm font-medium text-neutral-900 capitalize">
                      {selectedActivity.severity || 'info'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Description</h3>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-sm text-neutral-700">{selectedActivity.description}</p>
              </div>
            </div>

            {/* Entity Information */}
            {selectedActivity.entity_id && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                  Entity Information
                </h3>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Entity Type:</span>
                    <span className="text-sm font-medium text-neutral-900">
                      {selectedActivity.entity_type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Entity ID:</span>
                    <span className="text-sm font-medium text-neutral-900">
                      #{selectedActivity.entity_id}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ActivityLog;
