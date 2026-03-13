import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { cn } from '../../lib/utils';
import { Event } from '../../lib/eventApi';

/**
 * CalendarView Props
 */
export interface CalendarViewProps {
  events: Event[];
  onDayClick?: (date: Date, dayEvents: Event[]) => void;
  onEventClick?: (event: Event) => void;
}

/**
 * Category colors for event dots
 */
const categoryColors: Record<string, string> = {
  worship: 'bg-primary-500',
  outreach: 'bg-success-500',
  fellowship: 'bg-warning-500',
  training: 'bg-info-500',
  default: 'bg-neutral-500',
};

/**
 * Get category color class
 */
const getCategoryColor = (category?: string): string => {
  if (!category) return categoryColors.default;
  const normalizedCategory = category.toLowerCase();
  return categoryColors[normalizedCategory] || categoryColors.default;
};

/**
 * CalendarView Component
 * 
 * Displays events in a monthly calendar grid view with the following features:
 * - Monthly grid view with day cells
 * - Event indicators (dots or mini-cards) on days with events
 * - Color-coded events by category (Worship: blue, Outreach: green, Fellowship: yellow, Training: info)
 * - Navigation buttons to move between months (Previous Month, Today, Next Month)
 * - "+X more" indicator when a day has more than 3 events
 * - Clickable day cells to view all events for that day
 * - Responsive design for mobile devices
 * 
 * Design Reference: Calendar View section
 * Validates Requirements: 12.3
 * Task: 12.3 Implement calendar view
 */
export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onDayClick,
  onEventClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  /**
   * Get the first day of the month
   */
  const getFirstDayOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  /**
   * Get the last day of the month
   */
  const getLastDayOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  /**
   * Get the number of days in the month
   */
  const getDaysInMonth = (date: Date): number => {
    return getLastDayOfMonth(date).getDate();
  };

  /**
   * Get the day of week for the first day of the month (0 = Sunday)
   */
  const getFirstDayOfWeek = (date: Date): number => {
    return getFirstDayOfMonth(date).getDay();
  };

  /**
   * Navigate to previous month
   */
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  /**
   * Navigate to next month
   */
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  /**
   * Navigate to today
   */
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  /**
   * Check if a date is today
   */
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  /**
   * Check if a date is in the current month
   */
  const isCurrentMonth = (date: Date): boolean => {
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  /**
   * Get events for a specific date
   */
  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => {
      const eventDate = new Date(event.event_date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  /**
   * Generate calendar days
   */
  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    const firstDay = getFirstDayOfWeek(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }

    return days;
  }, [currentDate]);

  /**
   * Format month and year for display
   */
  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  /**
   * Day names
   */
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /**
   * Handle day click
   */
  const handleDayClick = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    if (onDayClick) {
      onDayClick(date, dayEvents);
    }
  };

  /**
   * Handle event click
   */
  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(event);
    }
  };

  return (
    <Card className="p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">
          {formatMonthYear(currentDate)}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousMonth}
            aria-label="Previous Month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextMonth}
            aria-label="Next Month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
        {/* Day Names Header */}
        {dayNames.map(day => (
          <div
            key={day}
            className="bg-neutral-50 px-2 py-3 text-center text-sm font-semibold text-neutral-700"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((date, index) => {
          if (!date) {
            // Empty cell for days before the first day of the month
            return (
              <div
                key={`empty-${index}`}
                className="bg-neutral-50 min-h-24 sm:min-h-32"
              />
            );
          }

          const dayEvents = getEventsForDate(date);
          const visibleEvents = dayEvents.slice(0, 3);
          const moreCount = dayEvents.length - visibleEvents.length;
          const today = isToday(date);

          return (
            <div
              key={date.toISOString()}
              onClick={() => handleDayClick(date)}
              className={cn(
                'bg-white min-h-24 sm:min-h-32 p-2 cursor-pointer transition-colors hover:bg-primary-50',
                today && 'bg-primary-50'
              )}
            >
              {/* Day Number */}
              <div className="flex items-center justify-center mb-2">
                <span
                  className={cn(
                    'flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full',
                    today
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-900'
                  )}
                >
                  {date.getDate()}
                </span>
              </div>

              {/* Event Indicators */}
              <div className="space-y-1">
                {visibleEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={(e) => handleEventClick(event, e)}
                    className={cn(
                      'flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium text-white truncate hover:opacity-80 transition-opacity',
                      getCategoryColor((event as any).category)
                    )}
                    title={event.title}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    <span className="truncate hidden sm:inline">{event.title}</span>
                  </div>
                ))}

                {/* "+X more" indicator */}
                {moreCount > 0 && (
                  <div className="px-2 py-1 text-xs font-medium text-neutral-600">
                    +{moreCount} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
        <span className="font-medium text-neutral-700">Categories:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500" />
          <span className="text-neutral-600">Worship</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success-500" />
          <span className="text-neutral-600">Outreach</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning-500" />
          <span className="text-neutral-600">Fellowship</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-info-500" />
          <span className="text-neutral-600">Training</span>
        </div>
      </div>
    </Card>
  );
};

export default CalendarView;
