import React, { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, Clock, Users, Edit, CheckCircle, Grid, List, LayoutGrid, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select } from '../components/ui/select';
import { SkeletonCard } from '../components/ui/skeleton';
import { eventApi, type Event } from '../lib/eventApi';
import EventForm, { EventFormData } from '../components/events/EventForm';
import CompleteEventDialog from '../components/events/CompleteEventDialog';
import ArchiveButton from '../components/archive/ArchiveButton';
import CalendarView from '../components/events/CalendarView';

/**
 * Events Page Component
 * 
 * Displays a list of upcoming and past church events with management capabilities.
 * Implements the Events Page Design from the Modern UI/UX Redesign spec.
 * 
 * Layout Structure:
 * - Page header with "Create Event" and "Calendar View" buttons
 * - Filter bar with Time Range, Category, and Status filters
 * - View mode toggle (List / Calendar / Grid)
 * - Event cards in selected view mode
 * 
 * Features:
 * - Display list of upcoming events (sorted chronologically)
 * - Display list of past events
 * - Filter events by time range, category, and status
 * - Toggle between List, Calendar, and Grid views
 * - Add Event button for creating new events (admin only)
 * - View event details
 * - Responsive layout
 * 
 * Design Reference: Events Page Design section
 * Validates Requirements: 9.1, 9.2
 * Task: 12.1 Create Events page layout
 */
const Events: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  // State management
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [eventToComplete, setEventToComplete] = useState<Event | null>(null);
  
  // Filter and view state
  const [timeRangeFilter, setTimeRangeFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'grid'>('grid');

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
   * Handle view details button click
   */
  const handleViewDetails = (event: Event) => {
    navigate(`/events/${event.id}`);
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
      console.log('Events.tsx: Submitting event data:', data);
      if (selectedEvent) {
        // Update existing event
        const result = await eventApi.updateEvent(selectedEvent.id, data);
        console.log('Events.tsx: Event updated:', result);
        showToast('success', 'Event updated successfully');
      } else {
        // Create new event
        const result = await eventApi.createEvent(data);
        console.log('Events.tsx: Event created successfully:', result);
        showToast('success', 'Event created successfully');
      }
      console.log('Events.tsx: Reloading events list...');
      await loadEvents();
      console.log('Events.tsx: Events list reloaded');
    } catch (error: any) {
      console.error('Events.tsx: Error submitting event:', error);
      console.error('Events.tsx: Error response:', error.response?.data);
      console.error('Events.tsx: Error status:', error.response?.status);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      showToast('error', selectedEvent ? 'Failed to update event: ' + errorMessage : 'Failed to create event: ' + errorMessage);
      throw error; // Re-throw to prevent form from closing
    }
  };

  /**
   * Handle delete event button click
   */
  const handleDeleteClick = (event: Event) => {
    // Handled by ArchiveButton component
  };

  /**
   * Handle archive success callback
   */
  const handleArchiveSuccess = async () => {
    await loadEvents();
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
   * Separate events into upcoming and past, then apply filters
   */
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  
  // First, separate by time
  let filteredEvents = events;
  
  // Apply time range filter
  if (timeRangeFilter === 'upcoming') {
    filteredEvents = events.filter(event => {
      const eventDate = new Date(event.event_date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= now && event.status === 'upcoming';
    });
  } else if (timeRangeFilter === 'past') {
    filteredEvents = events.filter(event => {
      const eventDate = new Date(event.event_date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < now || event.status === 'completed';
    });
  }
  
  // Apply category filter (placeholder - categories not yet in data model)
  if (categoryFilter !== 'all') {
    // TODO: Filter by category when category field is added to Event model
    // filteredEvents = filteredEvents.filter(event => event.category === categoryFilter);
  }
  
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredEvents = filteredEvents.filter(event => event.status === statusFilter);
  }
  
  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.event_date).getTime();
    const dateB = new Date(b.event_date).getTime();
    return timeRangeFilter === 'past' ? dateB - dateA : dateA - dateB;
  });

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
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
            {event.title}
          </h3>
          {event.status === 'completed' && event.attendance_count !== null && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Users className="h-4 w-4" />
              <span>{event.attendance_count} attendees</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {event.status === 'completed' && (
            <span className="bg-success-100 text-success-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Completed
            </span>
          )}
          {event.status === 'cancelled' && (
            <span className="bg-error-100 text-error-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Cancelled
            </span>
          )}
          {event.status === 'upcoming' && (
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Upcoming
            </span>
          )}
        </div>
      </div>

      {/* Event Description */}
      {event.description && (
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Event Details */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center text-neutral-600">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{formatDate(event.event_date)}</span>
        </div>
        <div className="flex items-center text-neutral-600">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{formatTime(event.event_time)}</span>
        </div>
        <div className="flex items-center text-neutral-600">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
      </div>

      {/* Action Buttons (Admin Only) */}
      {isAdmin && (
        <div className="flex items-center gap-2 pt-4 border-t border-neutral-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewDetails(event)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {event.status === 'upcoming' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCompleteClick(event)}
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
          <ArchiveButton
            itemType="events"
            itemId={event.id}
            itemName={event.title}
            onArchiveSuccess={handleArchiveSuccess}
            variant="outline"
            size="sm"
            iconOnly={false}
          />
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Event Form Dialog */}
      <EventForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        event={selectedEvent}
        isLoading={isLoading}
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Events</h1>
          <p className="text-base text-neutral-600 mt-2">
            Manage church events and activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setViewMode('calendar')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar View</span>
          </Button>
          {isAdmin && (
            <Button onClick={handleAddClick} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Event</span>
              <span className="sm:hidden">Create</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Time Range Filter */}
          <div>
            <Select
              value={timeRangeFilter}
              onChange={(value) => setTimeRangeFilter(value as 'upcoming' | 'past' | 'all')}
              options={[
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'past', label: 'Past' },
                { value: 'all', label: 'All' },
              ]}
            />
          </div>

          {/* Category Filter */}
          <div>
            <Select
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(Array.isArray(value) ? value[0] ?? '' : value)}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'worship', label: 'Worship' },
                { value: 'outreach', label: 'Outreach' },
                { value: 'fellowship', label: 'Fellowship' },
                { value: 'training', label: 'Training' },
              ]}
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(Array.isArray(value) ? value[0] ?? '' : value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-white text-primary-600 shadow-sm font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            title="List View"
          >
            <List className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">List</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
              viewMode === 'calendar'
                ? 'bg-white text-primary-600 shadow-sm font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            title="Calendar View"
          >
            <Calendar className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">Calendar</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-white text-primary-600 shadow-sm font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">Grid</span>
          </button>
        </div>
        
        {/* Event count */}
        <div className="text-sm text-neutral-600">
          {sortedEvents.length} {sortedEvents.length === 1 ? 'event' : 'events'}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} hasImage={false} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && sortedEvents.length === 0 && (
        <Card className="text-center py-16">
          <Calendar className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Events Found</h3>
          <p className="text-neutral-600 mb-6">
            {isAdmin 
              ? 'Get started by creating your first event.' 
              : 'Check back later for upcoming events.'}
          </p>
          {isAdmin && (
            <Button onClick={handleAddClick}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          )}
        </Card>
      )}

      {/* Events Content - Grid View */}
      {!isLoading && sortedEvents.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map(event => {
            const eventDate = new Date(event.event_date);
            eventDate.setHours(0, 0, 0, 0);
            const isPast = eventDate < now || event.status === 'completed';
            return renderEventCard(event, isPast);
          })}
        </div>
      )}

      {/* Events Content - List View */}
      {!isLoading && sortedEvents.length > 0 && viewMode === 'list' && (
        <div className="space-y-4">
          {sortedEvents.map(event => {
            const eventDate = new Date(event.event_date);
            eventDate.setHours(0, 0, 0, 0);
            const isPast = eventDate < now || event.status === 'completed';
            return renderEventCard(event, isPast);
          })}
        </div>
      )}

      {/* Events Content - Calendar View */}
      {!isLoading && viewMode === 'calendar' && (
        <CalendarView
          events={events}
          onDayClick={(date, dayEvents) => {
            // Show events for the selected day
            console.log('Day clicked:', date, 'Events:', dayEvents);
            // TODO: Could open a modal or filter to show only these events
          }}
          onEventClick={(event) => {
            // Handle event click - could open event details or edit
            if (isAdmin) {
              handleEditClick(event);
            }
          }}
        />
      )}
    </div>
  );
};

export default Events;
