import React from 'react';
import { Clock, User } from 'lucide-react';

export interface Activity {
  id: number;
  user_name: string;
  action: string;
  entity_type: string;
  entity_id: number | null;
  description: string;
  created_at: string;
  created_at_human: string;
}

export interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = React.memo(({ activities, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No recent activities to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{activity.user_name}</span>
              {' '}
              <span className="text-gray-600">{activity.description}</span>
            </p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>{activity.created_at_human}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
