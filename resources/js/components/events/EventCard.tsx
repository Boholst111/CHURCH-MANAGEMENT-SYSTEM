import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Eye, Edit, UserPlus, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

/**
 * Event interface
 */
export interface Event {
  id: number;
  title: string;
  description: string | null;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string | null;
  attendees: {
    registered: number;
    capacity: number;
  };
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

/**
 * EventCard Props
 */
export interface EventCardProps {
  event: Event;
  onViewDetails?: (event: Event) => void;
  onEdit?: (event: Event) => void;
  onManageAttendees?: (event: Event) => void;
  onCancel?: (event: Event) => void;
  showActions?: boolean;
}

/**
 * Status badge configuration
 */
const statusConfig = {
  upcoming: {
    variant: 'primary' as const,
    label: 'Upcoming',
  },
  ongoing: {
    variant: 'success' as const,
    label: 'Ongoing',
  },
  completed: {
    variant: 'neutral' as const,
    label: 'Completed',
  },
  cancelled: {
    variant: 'error' as const,
    label: 'Cancelled',
  },
};

/**
 * Category badge colors
 */
const categoryColors: Record<string, string> = {
  worship: 'bg-primary-500',
  outreach: 'bg-success-500',
  fellowship: 'bg-warning-500',
  training: 'bg-info-500',
  default: 'bg-neutral-500',
};

/**
 * EventCard Component
 * 
 * Displays event information in a card format with image, title, date, time,
 * location, category, attendee count with progress bar, status badge, and action buttons.
 * 
 * Features:
 * - Event image or placeholder
 * - Event title and description
 * - Date and time display with icon
 * - Location with icon
 * - Category badge overlay on image
 * - Attendee count with progress bar (registered/capacity)
 * - Status badge (Upcoming, Ongoing, Completed, Cancelled)
 * - Action buttons (View Details, Edit, Manage Attendees, Cancel)
 * - Hover effects
 * - Animated progress bar
 * 
 * Design Reference: Event Card section
 * Validates Requirements: 12.2
 */
export const EventCard: React.FC<EventCardProps> = React.memo(({
  event,
  onViewDetails,
  onEdit,
  onManageAttendees,
  onCancel,
  showActions = true,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Calculate attendance percentage
  const attendancePercentage = event.attendees.capacity > 0
    ? Math.round((event.attendees.registered / event.attendees.capacity) * 100)
    : 0;

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(attendancePercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [attendancePercentage]);

  /**
   * Get progress bar color based on capacity
   */
  const getProgressColor = () => {
    if (attendancePercentage < 70) return 'bg-success-600';
    if (attendancePercentage < 90) return 'bg-warning-600';
    return 'bg-error-600';
  };

  /**
   * Get category badge color
   */
  const getCategoryColor = (category: string) => {
    const normalizedCategory = category.toLowerCase();
    return categoryColors[normalizedCategory] || categoryColors.default;
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const statusInfo = statusConfig[event.status];

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300"
      hoverable
    >
      {/* Event Image with Category Badge Overlay */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="h-16 w-16 text-primary-400" />
          </div>
        )}
        
        {/* Category Badge Overlay */}
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium shadow-lg',
              getCategoryColor(event.category)
            )}
          >
            {event.category}
          </span>
        </div>

        {/* Status Badge Overlay */}
        <div className="absolute top-4 right-4">
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Event Title */}
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            {event.title}
          </h3>
          {event.description && (
            <p className="text-sm text-neutral-600 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>

        {/* Date and Time */}
        <div className="flex items-center text-sm font-medium text-neutral-900">
          <Calendar className="h-4 w-4 mr-2 text-primary-600" />
          <span>{formatDate(event.date)} at {event.time}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-neutral-600">
          <MapPin className="h-4 w-4 mr-2 text-neutral-500" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        {/* Attendees Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center text-neutral-600">
              <Users className="h-4 w-4 mr-2 text-neutral-500" />
              <span>Attendees</span>
            </div>
            <span className="font-medium text-neutral-900">
              {event.attendees.registered} / {event.attendees.capacity}
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000 ease-out',
                getProgressColor()
              )}
              style={{ width: `${Math.min(animatedProgress, 100)}%` }}
              role="progressbar"
              aria-valuenow={attendancePercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${attendancePercentage}% capacity`}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-neutral-500">
              {attendancePercentage}% capacity
            </span>
            {event.attendees.capacity > event.attendees.registered && (
              <span className="text-success-600 font-medium">
                {event.attendees.capacity - event.attendees.registered} spots left
              </span>
            )}
            {event.attendees.registered >= event.attendees.capacity && (
              <span className="text-error-600 font-medium">
                Full
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="pt-4 border-t border-neutral-200 flex flex-wrap gap-2">
            {onViewDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(event)}
                className="flex-1 sm:flex-none"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            )}
            {onEdit && event.status !== 'completed' && event.status !== 'cancelled' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event)}
                className="flex-1 sm:flex-none"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            {onManageAttendees && event.status !== 'completed' && event.status !== 'cancelled' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onManageAttendees(event)}
                className="flex-1 sm:flex-none"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Manage Attendees
              </Button>
            )}
            {onCancel && event.status === 'upcoming' && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onCancel(event)}
                className="flex-1 sm:flex-none"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;
