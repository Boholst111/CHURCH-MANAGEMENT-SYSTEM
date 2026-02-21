import React, { useState, useEffect } from 'react';
import { Activity as ActivityIcon, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { activityApi, Activity, ActivityFilters, UserOption } from '../lib/activityApi';
import { useToast } from '../contexts/ToastContext';

const ActivityLog: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ActivityFilters>({
    page: 1,
    per_page: 50,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 50,
    total: 0,
    last_page: 1,
    from: null as number | null,
    to: null as number | null,
  });
  const { showToast } = useToast();

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
        setActivities(response.data);
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
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      per_page: 50,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ActivityIcon className="w-8 h-8 text-blue-600" />
          Activity Log
        </h1>
        <p className="text-gray-600 mt-2">
          View and filter system activities and audit trail
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* User Filter */}
          <div>
            <label htmlFor="user-filter" className="block text-sm font-medium text-gray-700 mb-1">
              User
            </label>
            <select
              id="user-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.user_id || ''}
              onChange={(e) => handleFilterChange('user_id', e.target.value ? parseInt(e.target.value) : '')}
            >
              <option value="">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date Filter */}
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.start_date || ''}
              onChange={(e) => handleFilterChange('start_date', e.target.value)}
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.end_date || ''}
              onChange={(e) => handleFilterChange('end_date', e.target.value)}
            />
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <ActivityIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>No activities found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{new Date(activity.created_at).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-xs">
                          {new Date(activity.created_at).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {activity.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.entity_type}
                        {activity.entity_id && (
                          <span className="text-gray-500 ml-1">#{activity.entity_id}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {activity.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {pagination.from || 0} to {pagination.to || 0} of {pagination.total} activities
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
