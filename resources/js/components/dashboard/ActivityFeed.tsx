import React from 'react';
import { 
  Clock, 
  User, 
  UserPlus, 
  Edit, 
  Trash2, 
  LogIn, 
  LogOut,
  FileText,
  Calendar,
  DollarSign,
  Settings,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

// Get icon based on action type
const getActionIcon = (action: string, entityType: string) => {
  const iconClass = "w-4 h-4";
  
  switch (action.toLowerCase()) {
    case 'create':
    case 'created':
      if (entityType === 'member') return <UserPlus className={iconClass} />;
      if (entityType === 'event') return <Calendar className={iconClass} />;
      if (entityType === 'offering' || entityType === 'expense') return <DollarSign className={iconClass} />;
      return <FileText className={iconClass} />;
    case 'update':
    case 'updated':
      return <Edit className={iconClass} />;
    case 'delete':
    case 'deleted':
      return <Trash2 className={iconClass} />;
    case 'login':
      return <LogIn className={iconClass} />;
    case 'logout':
      return <LogOut className={iconClass} />;
    default:
      return <User className={iconClass} />;
  }
};

// Get icon background color based on action
const getIconColor = (action: string) => {
  switch (action.toLowerCase()) {
    case 'create':
    case 'created':
      return 'bg-success-100 text-success-600';
    case 'update':
    case 'updated':
      return 'bg-primary-100 text-primary-600';
    case 'delete':
    case 'deleted':
      return 'bg-error-100 text-error-600';
    case 'login':
    case 'logout':
      return 'bg-info-100 text-info-600';
    default:
      return 'bg-neutral-100 text-neutral-600';
  }
};

export const ActivityFeed: React.FC<ActivityFeedProps> = React.memo(({ activities, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse border-b border-neutral-200 pb-3 last:border-b-0">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
        <p className="text-neutral-500 text-sm">No recent activities to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Activity List */}
      <div className="divide-y divide-neutral-200">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="py-4 first:pt-0 last:pb-0 hover:bg-neutral-50 transition-colors px-2 -mx-2 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              {/* Activity Icon */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(activity.action)}`}>
                  {getActionIcon(activity.action, activity.entity_type)}
                </div>
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-900">
                  <span className="font-medium text-neutral-900">{activity.user_name}</span>
                  {' '}
                  <span className="text-neutral-700">{activity.description}</span>
                </p>
                <div className="flex items-center mt-1 text-xs text-neutral-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{activity.created_at_human}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      {activities.length > 0 && (
        <div className="pt-4 mt-4 border-t border-neutral-200">
          <Link
            to="/activity-log"
            className="flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors group"
          >
            <span>View All Activities</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
});
