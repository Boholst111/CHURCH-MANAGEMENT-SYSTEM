import React, { useCallback, useMemo, useState } from 'react';
import {
  User,
  Tag,
  Globe,
  Clock,
  AlertCircle,
  AlertTriangle,
  Info,
  XCircle,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import VirtualList from '../ui/virtual-list';

type SeverityLevel = 'info' | 'warning' | 'error' | 'critical';

export interface Activity {
  id: number;
  user_id: number;
  user_name: string;
  action: string;
  description: string;
  entity_type: string;
  entity_id: number | null;
  ip_address: string | null;
  created_at: string;
}

export interface ActivityWithSeverity extends Activity {
  severity?: SeverityLevel;
  module?: string;
}

/**
 * VirtualActivityTimeline Props
 */
export interface VirtualActivityTimelineProps {
  activities: ActivityWithSeverity[];
  onActivityClick: (activity: ActivityWithSeverity) => void;
  height?: number;
}

/**
 * VirtualActivityTimeline Component
 * 
 * Displays activity log in a virtual scrolling timeline for optimal
 * performance with large datasets (>100 items).
 * 
 * Features:
 * - Virtual scrolling for large activity logs
 * - Color-coded severity indicators
 * - Relative time formatting
 * - Click to view details
 * - Maintains scroll position
 */
const VirtualActivityTimeline: React.FC<VirtualActivityTimelineProps> = React.memo(({
  activities,
  onActivityClick,
  height = 600,
}) => {
  const [scrollOffset, setScrollOffset] = useState(0);

  /**
   * Get severity color class
   */
  const getSeverityColor = useCallback((severity: SeverityLevel) => {
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
  }, []);

  /**
   * Get severity icon
   */
  const getSeverityIcon = useCallback((severity: SeverityLevel) => {
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
  }, []);

  /**
   * Format relative time
   */
  const formatRelativeTime = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  }, []);

  /**
   * Render a single activity item
   */
  const renderActivityItem = useCallback((activity: ActivityWithSeverity, index: number, style: React.CSSProperties) => {
    const isLast = index === activities.length - 1;

    return (
      <div style={style}>
        <div
          className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer mx-4 my-2"
          onClick={() => onActivityClick(activity)}
        >
          <div className="flex items-start gap-4">
            {/* Timeline Dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${getSeverityColor(
                  activity.severity || 'info'
                )} mt-1`}
              />
              {!isLast && (
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
      </div>
    );
  }, [activities.length, onActivityClick, getSeverityColor, getSeverityIcon, formatRelativeTime]);

  /**
   * Handle scroll to save position
   */
  const handleScroll = useCallback((offset: number) => {
    setScrollOffset(offset);
  }, []);

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
        <p className="text-neutral-600 text-lg">No activities found</p>
        <p className="text-neutral-500 text-sm mt-2">
          Try adjusting your filters or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
      <VirtualList
        items={activities}
        itemHeight={140}
        height={height}
        renderItem={renderActivityItem}
        onScroll={handleScroll}
        initialScrollOffset={scrollOffset}
        overscanCount={3}
      />
    </div>
  );
});

VirtualActivityTimeline.displayName = 'VirtualActivityTimeline';

export default VirtualActivityTimeline;
