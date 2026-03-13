import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { UpcomingEvent } from '../../lib/types';
import { Button } from '../ui/button';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
  loading?: boolean;
}

/**
 * UpcomingEvents component displays the next 5 upcoming events
 * Shows event name, date, time, and location in a compact list format
 */
export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, loading = false }) => {
  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-start space-x-3 animate-pulse">
            <div className="w-10 h-10 bg-neutral-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
        <p className="text-neutral-600 text-sm">No upcoming events scheduled</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Events List */}
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
          >
            {/* Date Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex flex-col items-center justify-center text-primary-600">
              <span className="text-xs font-medium uppercase">
                {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}
              </span>
              <span className="text-lg font-bold leading-none">
                {new Date(event.event_date).getDate()}
              </span>
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                {event.title}
              </h4>
              
              <div className="mt-1 space-y-1">
                {/* Time */}
                <div className="flex items-center text-xs text-neutral-600">
                  <Clock className="h-3 w-3 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{event.event_time}</span>
                </div>

                {/* Location */}
                <div className="flex items-center text-xs text-neutral-600">
                  <MapPin className="h-3 w-3 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="pt-2 border-t border-neutral-200">
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
          onClick={() => {
            // Navigate to Events page
            window.location.href = '/events';
          }}
        >
          View All Events
        </Button>
      </div>
    </div>
  );
};
