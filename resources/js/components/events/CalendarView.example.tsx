import React from 'react';
import CalendarView from './CalendarView';
import { Event } from '../../lib/eventApi';

/**
 * CalendarView Component Examples
 * 
 * Demonstrates various use cases of the CalendarView component.
 */

/**
 * Example 1: Basic Calendar View
 * 
 * Shows a simple calendar with a few events.
 */
export const BasicCalendarView: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      title: 'Sunday Service',
      description: 'Weekly worship service',
      event_date: new Date().toISOString().split('T')[0],
      event_time: '10:00:00',
      location: 'Main Sanctuary',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Bible Study',
      description: 'Midweek Bible study',
      event_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      event_time: '19:00:00',
      location: 'Fellowship Hall',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Basic Calendar View</h2>
      <CalendarView events={events} />
    </div>
  );
};

/**
 * Example 2: Calendar with Many Events
 * 
 * Shows a calendar with multiple events on the same day to demonstrate
 * the "+X more" indicator.
 */
export const CalendarWithManyEvents: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const events: Event[] = [
    {
      id: 1,
      title: 'Sunday Service',
      description: 'Weekly worship service',
      event_date: today,
      event_time: '10:00:00',
      location: 'Main Sanctuary',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Bible Study',
      description: 'Midweek Bible study',
      event_date: today,
      event_time: '19:00:00',
      location: 'Fellowship Hall',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Youth Meeting',
      description: 'Youth group meeting',
      event_date: today,
      event_time: '18:00:00',
      location: 'Youth Room',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      title: 'Prayer Meeting',
      description: 'Morning prayer',
      event_date: today,
      event_time: '06:00:00',
      location: 'Prayer Room',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 5,
      title: 'Choir Practice',
      description: 'Weekly choir practice',
      event_date: today,
      event_time: '20:00:00',
      location: 'Music Room',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Calendar with Many Events</h2>
      <p className="text-neutral-600 mb-6">
        Today has 5 events. Only 3 are visible, with a "+2 more" indicator.
      </p>
      <CalendarView events={events} />
    </div>
  );
};

/**
 * Example 3: Calendar with Click Handlers
 * 
 * Shows a calendar with click handlers for days and events.
 */
export const CalendarWithClickHandlers: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      title: 'Sunday Service',
      description: 'Weekly worship service',
      event_date: new Date().toISOString().split('T')[0],
      event_time: '10:00:00',
      location: 'Main Sanctuary',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const handleDayClick = (date: Date, dayEvents: Event[]) => {
    alert(`Clicked on ${date.toLocaleDateString()}. Events: ${dayEvents.length}`);
  };

  const handleEventClick = (event: Event) => {
    alert(`Clicked on event: ${event.title}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Calendar with Click Handlers</h2>
      <p className="text-neutral-600 mb-6">
        Click on a day or event to see the click handlers in action.
      </p>
      <CalendarView
        events={events}
        onDayClick={handleDayClick}
        onEventClick={handleEventClick}
      />
    </div>
  );
};

/**
 * Example 4: Empty Calendar
 * 
 * Shows a calendar with no events.
 */
export const EmptyCalendar: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Empty Calendar</h2>
      <p className="text-neutral-600 mb-6">
        A calendar with no events scheduled.
      </p>
      <CalendarView events={[]} />
    </div>
  );
};

/**
 * Example 5: Calendar with Multiple Months
 * 
 * Shows how to navigate between months.
 */
export const CalendarWithNavigation: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      title: 'Sunday Service',
      description: 'Weekly worship service',
      event_date: new Date().toISOString().split('T')[0],
      event_time: '10:00:00',
      location: 'Main Sanctuary',
      status: 'upcoming',
      attendance_count: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Calendar with Navigation</h2>
      <p className="text-neutral-600 mb-6">
        Use the navigation buttons to move between months or return to today.
      </p>
      <CalendarView events={events} />
    </div>
  );
};

export default {
  BasicCalendarView,
  CalendarWithManyEvents,
  CalendarWithClickHandlers,
  EmptyCalendar,
  CalendarWithNavigation,
};
