import React from 'react';
import { EventCard, Event } from './EventCard';

/**
 * EventCard Example Usage
 * 
 * This file demonstrates how to use the EventCard component with various
 * event types and states.
 */

// Sample event data
const upcomingEvent: Event = {
  id: 1,
  title: 'Sunday Worship Service',
  description: 'Join us for our weekly worship service with praise, worship, and a powerful message from Pastor John.',
  date: '2024-02-18',
  time: '10:00 AM',
  location: 'Main Sanctuary, 123 Church Street',
  category: 'Worship',
  image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
  attendees: {
    registered: 145,
    capacity: 200,
  },
  status: 'upcoming',
};

const ongoingEvent: Event = {
  id: 2,
  title: 'Community Outreach Program',
  description: 'Serving our local community with food distribution and prayer support.',
  date: '2024-02-15',
  time: '2:00 PM',
  location: 'Community Center, Downtown',
  category: 'Outreach',
  attendees: {
    registered: 45,
    capacity: 50,
  },
  status: 'ongoing',
};

const completedEvent: Event = {
  id: 3,
  title: 'Youth Fellowship Night',
  description: 'A night of games, worship, and fellowship for our youth group.',
  date: '2024-02-10',
  time: '7:00 PM',
  location: 'Youth Hall',
  category: 'Fellowship',
  image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
  attendees: {
    registered: 32,
    capacity: 40,
  },
  status: 'completed',
};

const cancelledEvent: Event = {
  id: 4,
  title: 'Leadership Training Workshop',
  description: 'Equipping our leaders with essential ministry skills and biblical foundations.',
  date: '2024-02-20',
  time: '9:00 AM',
  location: 'Conference Room A',
  category: 'Training',
  attendees: {
    registered: 15,
    capacity: 30,
  },
  status: 'cancelled',
};

const fullCapacityEvent: Event = {
  id: 5,
  title: 'Marriage Enrichment Seminar',
  description: 'A special seminar for married couples to strengthen their relationships.',
  date: '2024-02-25',
  time: '6:00 PM',
  location: 'Fellowship Hall',
  category: 'Training',
  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
  attendees: {
    registered: 50,
    capacity: 50,
  },
  status: 'upcoming',
};

const EventCardExample: React.FC = () => {
  const handleViewDetails = (event: Event) => {
    console.log('View details for:', event.title);
  };

  const handleEdit = (event: Event) => {
    console.log('Edit event:', event.title);
  };

  const handleManageAttendees = (event: Event) => {
    console.log('Manage attendees for:', event.title);
  };

  const handleCancel = (event: Event) => {
    console.log('Cancel event:', event.title);
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          EventCard Component Examples
        </h1>
        <p className="text-neutral-600 mb-8">
          Demonstrating various event states and configurations
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Event */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              Upcoming Event (73% capacity)
            </h2>
            <EventCard
              event={upcomingEvent}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onManageAttendees={handleManageAttendees}
              onCancel={handleCancel}
            />
          </div>

          {/* Ongoing Event */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              Ongoing Event (90% capacity)
            </h2>
            <EventCard
              event={ongoingEvent}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onManageAttendees={handleManageAttendees}
            />
          </div>

          {/* Completed Event */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              Completed Event
            </h2>
            <EventCard
              event={completedEvent}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Cancelled Event */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              Cancelled Event
            </h2>
            <EventCard
              event={cancelledEvent}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Full Capacity Event */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              Full Capacity Event
            </h2>
            <EventCard
              event={fullCapacityEvent}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onManageAttendees={handleManageAttendees}
              onCancel={handleCancel}
            />
          </div>

          {/* Event Without Actions */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              Event Without Actions
            </h2>
            <EventCard
              event={upcomingEvent}
              showActions={false}
            />
          </div>
        </div>

        {/* Usage Notes */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Usage Notes
          </h2>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li>
              <strong>Status Badges:</strong> Automatically styled based on event status
              (Upcoming: blue, Ongoing: green, Completed: gray, Cancelled: red)
            </li>
            <li>
              <strong>Progress Bar Colors:</strong> Changes based on capacity
              (0-70%: green, 70-90%: yellow, 90-100%: red)
            </li>
            <li>
              <strong>Category Badge:</strong> Displayed as an overlay on the event image
              with predefined colors for common categories
            </li>
            <li>
              <strong>Action Buttons:</strong> Conditionally displayed based on event status
              (Edit and Manage Attendees hidden for completed/cancelled events)
            </li>
            <li>
              <strong>Animated Progress:</strong> Progress bar animates on component mount
              for better visual feedback
            </li>
            <li>
              <strong>Accessibility:</strong> Progress bar includes proper ARIA attributes
              for screen readers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventCardExample;
