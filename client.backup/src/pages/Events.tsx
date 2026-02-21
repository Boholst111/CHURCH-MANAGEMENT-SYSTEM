import React, { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, Clock, Users, Edit, Trash2, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { eventApi, type Event } from '../lib/eventApi';
import EventForm, { EventFormData } from '../components/events/EventForm';
import DeleteEventDialog from '../components/events/DeleteEventDialog';
import CompleteEventDialog from '../components/events/CompleteEventDialog';

/**
 * Events Page Component
 * 
 * Displays a list of upcoming and past church events with management capabilities.
 * 
 * Features:
 * - Display list of upcoming events (sorted chronologically)
 * - Display list of past events
 * - Add Event button for creating new events (admin only)
 * - View event details
 * - Responsive layout
 * 
 * Validates Requirements: 9.1, 9.2
 */
const Events: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';

  // State management
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [eventToComplete, setEventToComplete] = useState<Event | null>(null);

  /**
   * Load events on mount
   */
  useEffect(() => {
    loadEvents();
  }, []);

  /**
   * Fetch events from API
   */
  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const data = await eventApi.getEvents();
      setEvents(data);
    } catch (error: any) {
      showToast('error', 'Failed to load events');
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle add event button click
   */
  const handleAddClick = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  /**
   * Handle edit event button click
   */
  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  /**
   * Handle form close
   */
  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  /**
   * Handle form submit
   */
  const handleFormSubmit = async (data: EventFormData) => {
    try {
      if (selectedEvent) {
        // Update existing event
        await eventApi.updateEvent(selectedEvent.id, data);
        showToast('success', 'Event updated successfully');
      } else {
        // Create new event
        await eventApi.createEvent(data);
        showToast('success', 'Event created successfully');
      }
      await loadEvents();
    } catch (error: any) {
      showToast('error', selectedEvent ? 'Failed to update event' : 'Failed to create event');
      throw error; // Re-throw to prevent form from closing
    }
  };

  /**
   * Handle delete event button click
   */
  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Handle delete confirmation
   */
  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    try {
      await eventApi.deleteEvent(eventToDelete.id);
      showToast('success', 'Event deleted successfully');
      await loadEvents();
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (error: any) {
      showToast('error', 'Failed to delete event');
      console.error('Error deleting event:', error);
    }
  };

  /**
   * Handle mark as completed button click
   */
  const handleCompleteClick = (event: Event) => {
    setEventToComplete(event);
    setIsCompleteDialogOpen(true);
  };

  /**
   * Handle complete confirmation
   */
  const handleCompleteConfirm = async (attendanceCount: number) => {
    if (!eventToComplete) return;

    try {
      await eventApi.completeEvent(eventToComplete.id, attendanceCount);
      showToast('success', 'Event marked as completed');
      await loadEvents();
      setIsCompleteDialogOpen(false);
      setEventToComplete(null);
    } catch (error: any) {
      showToast('error', 'Failed to mark event as completed');
      console.error('Error completing event:', error);
      throw error; // Re-throw to prevent dialog from closing
    }
  };

  /**
   * Separate events into upcoming and past
   */
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.event_date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= now && event.status === 'upcoming';
    })
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  
  const pastEvents = events
    .filter(event => {
      const eventDate = new Date(event.event_date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < now || event.status === 'completed';
    })
    .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  /**
   * Format time for display
   */
  const formatTime = (timeString: string) => {
    // Handle both HH:mm:ss and HH:mm formats
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  /**
   * Render event card
   */
  const renderEventCard = (event: Event, isPast: boolean = false) => (
    <Card key={event.id} className={`p-6 hover:shadow-lg transition-shadow ${isPast ? 'opacity-75' : ''}`}>
      {/* Event Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {event.title}
          </h3>
          {event.status === 'completed' && event.attendance_count !== null && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{event.attendance_count} attendees</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {event.status === 'completed' && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Completed
            </span>
          )}
          {event.status === 'cancelled' && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Cancelled
            </span>
          )}
        </div>
      </div>

      {/* Event Description */}
      {event.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Event Details */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{formatDate(event.event_date)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{formatTime(event.event_time)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
      </div>

      {/* Action Buttons (Admin Only) */}
      {isAdmin && (
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          {event.status === 'upcoming' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCompleteClick(event)}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Complete
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditClick(event)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteClick(event)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <div>
      {/* Event Form Dialog */}
      <EventForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        event={selectedEvent}
        isLoading={isLoading}
      />

      {/* Delete Event Dialog */}
      <DeleteEventDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setEventToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        eventTitle={eventToDelete?.title || ''}
      />

      {/* Complete Event Dialog */}
      <CompleteEventDialog
        isOpen={isCompleteDialogOpen}
        onClose={() => {
          setIsCompleteDialogOpen(false);
          setEventToComplete(null);
        }}
        onConfirm={handleCompleteConfirm}
        eventTitle={eventToComplete?.title || ''}
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage church events and track attendance
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleAddClick} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading events...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No events yet. {isAdmin && 'Click "Add Event" to create one.'}
          </p>
        </div>
      )}

      {/* Events Content */}
      {!isLoading && events.length > 0 && (
        <div className="space-y-8">
          {/* Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(event => renderEventCard(event))}
              </div>
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map(event => renderEventCard(event, true))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
