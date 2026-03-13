import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  ArrowLeft,
  Edit,
  UserPlus,
  X,
  CheckCircle,
  Info
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { eventApi, type Event } from '../lib/eventApi';
import { cn } from '../lib/utils';

/**
 * Attendee interface
 */
interface Attendee {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
  registration_status: 'registered' | 'waitlist' | 'cancelled';
  registered_at: string;
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
 * EventDetail Page Component
 * 
 * Displays detailed information about a specific event.
 * 
 * Features:
 * - Hero section with event image (or gradient background if no image)
 * - Event title, date, time, location prominently displayed
 * - Category badge and status badge
 * - Event description
 * - Attendee count and capacity with progress bar
 * - List of registered attendees (if user has permission)
 * - "Register" or "Unregister" button for users
 * - Location information
 * - Action buttons for admins (Edit, Manage Attendees, Cancel)
 * 
 * Design Reference: Events Page Design section
 * Validates Requirements: 12.5
 * Task: 12.5 Implement event detail view
 */
const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';

  // State management
  const [event, setEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  /**
   * Load event details on mount
   */
  useEffect(() => {
    if (id) {
      loadEventDetails(parseInt(id));
    }
  }, [id]);

  /**
   * Fetch event details from API
   */
  const loadEventDetails = async (eventId: number) => {
    try {
      setIsLoading(true);
      const data = await eventApi.getEvent(eventId);
      setEvent(data);
      
      // Load attendees (mock data for now)
      loadAttendees(eventId);
      
      // Check if current user is registered (mock for now)
      setIsRegistered(false);
    } catch (error: any) {
      showToast('error', 'Failed to load event details');
      console.error('Error loading event details:', error);
      navigate('/events');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load attendees list (mock implementation)
   */
  const loadAttendees = async (eventId: number) => {
    // Mock attendees data
    const mockAttendees: Attendee[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        photo: null,
        registration_status: 'registered',
        registered_at: '2024-01-10T10:00:00Z',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        photo: null,
        registration_status: 'registered',
        registered_at: '2024-01-11T14:30:00Z',
      },
    ];
    setAttendees(mockAttendees);
  };

  /**
   * Handle back button click
   */
  const handleBack = () => {
    navigate('/events');
  };

  /**
   * Handle edit button click
   */
  const handleEdit = () => {
    // Navigate back to events page with edit modal open
    navigate('/events', { state: { editEventId: event?.id } });
  };

  /**
   * Handle register/unregister button click
   */
  const handleRegistration = async () => {
    if (!event) return;
    
    try {
      setIsRegistering(true);
      
      if (isRegistered) {
        // Unregister logic (mock)
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsRegistered(false);
        showToast('success', 'Successfully unregistered from event');
      } else {
        // Register logic (mock)
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsRegistered(true);
        showToast('success', 'Successfully registered for event');
      }
      
      // Reload event details to update attendee count
      await loadEventDetails(event.id);
    } catch (error: any) {
      showToast('error', 'Failed to update registration');
      console.error('Error updating registration:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  /**
   * Handle cancel event button click
   */
  const handleCancelEvent = async () => {
    if (!event) return;
    
    if (!confirm('Are you sure you want to cancel this event?')) {
      return;
    }
    
    try {
      // Cancel event logic (mock)
      await new Promise(resolve => setTimeout(resolve, 500));
      showToast('success', 'Event cancelled successfully');
      navigate('/events');
    } catch (error: any) {
      showToast('error', 'Failed to cancel event');
      console.error('Error cancelling event:', error);
    }
  };

  /**
   * Get initials from name for avatar placeholder
   */
  const getInitials = (name: string): string => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
   * Get category badge color
   */
  const getCategoryColor = (category: string) => {
    const normalizedCategory = category.toLowerCase();
    return categoryColors[normalizedCategory] || categoryColors.default;
  };

  /**
   * Get progress bar color based on capacity
   */
  const getProgressColor = (percentage: number) => {
    if (percentage < 70) return 'bg-success-600';
    if (percentage < 90) return 'bg-warning-600';
    return 'bg-error-600';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-neutral-600">Loading event details...</p>
      </div>
    );
  }

  // Not found state
  if (!event) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Event Not Found</h2>
        <p className="text-neutral-600 mb-6">The event you're looking for doesn't exist.</p>
        <Button onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </div>
    );
  }

  const statusInfo = statusConfig[event.status];
  
  // Mock attendee data since it's not in the API yet
  const mockAttendees = {
    registered: 15,
    capacity: 50,
  };
  const attendancePercentage = mockAttendees.capacity > 0
    ? Math.round((mockAttendees.registered / mockAttendees.capacity) * 100)
    : 0;
  const spotsLeft = mockAttendees.capacity - mockAttendees.registered;
  const isFull = mockAttendees.registered >= mockAttendees.capacity;
  const canRegister = event.status === 'upcoming' && !isFull;
  
  // Mock category since it's not in the API yet
  const mockCategory = 'worship';

  return (
    <div>
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        {/* Hero Image or Gradient Background */}
        <div className="relative h-80 bg-gradient-to-br from-primary-100 to-primary-200">
          {/* Always show gradient with icon for now since image field is not in API */}
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="h-24 w-24 text-primary-400" />
          </div>
          
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category and Status Badges */}
          <div className="absolute top-6 left-6 flex gap-3">
            <span
              className={cn(
                'inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg',
                getCategoryColor(mockCategory)
              )}
            >
              {mockCategory}
            </span>
            <Badge variant={statusInfo.variant} className="shadow-lg">
              {statusInfo.label}
            </Badge>
          </div>
          
          {/* Event Title and Key Info */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg font-medium">{formatDate(event.event_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-medium">{formatTime(event.event_time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="text-lg font-medium">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Event Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card padding="lg">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">About This Event</h2>
            <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {event.description || 'No description available.'}
            </p>
          </Card>

          {/* Attendees List (Admin Only) */}
          {isAdmin && attendees.length > 0 && (
            <Card padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Registered Attendees ({attendees.length})
                </h2>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Manage Attendees
                </Button>
              </div>
              
              <div className="space-y-3">
                {attendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {attendee.photo ? (
                        <img
                          src={attendee.photo}
                          alt={attendee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {getInitials(attendee.name)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-neutral-900">{attendee.name}</p>
                        <p className="text-sm text-neutral-600">{attendee.email}</p>
                      </div>
                    </div>
                    <Badge variant="success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Registered
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Event Info & Actions */}
        <div className="space-y-6">
          {/* Attendance Card */}
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Attendance</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Users className="h-5 w-5" />
                  <span>Registered</span>
                </div>
                <span className="text-2xl font-bold text-neutral-900">
                  {mockAttendees.registered} / {mockAttendees.capacity}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div>
                <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      getProgressColor(attendancePercentage)
                    )}
                    style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-neutral-600">{attendancePercentage}% capacity</span>
                  {!isFull && (
                    <span className="text-success-600 font-medium">
                      {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                    </span>
                  )}
                  {isFull && (
                    <span className="text-error-600 font-medium">Full</span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Location Card */}
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Location</h3>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-neutral-900 font-medium mb-1">{event.location}</p>
                <p className="text-sm text-neutral-600">
                  Click for directions
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card padding="lg">
            <div className="space-y-3">
              {/* Register/Unregister Button (for non-admin users or all users) */}
              {canRegister && (
                <Button
                  variant={isRegistered ? 'outline' : 'primary'}
                  fullWidth
                  onClick={handleRegistration}
                  disabled={isRegistering}
                  loading={isRegistering}
                >
                  {isRegistered ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Unregister
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Register for Event
                    </>
                  )}
                </Button>
              )}
              
              {isFull && !isRegistered && event.status === 'upcoming' && (
                <div className="flex items-start gap-2 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                  <Info className="h-5 w-5 text-warning-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-warning-800">
                    This event is currently full. Check back later for availability.
                  </p>
                </div>
              )}
              
              {/* Admin Actions */}
              {isAdmin && (
                <>
                  {event.status !== 'completed' && event.status !== 'cancelled' && (
                    <>
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={handleEdit}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Event
                      </Button>
                      
                      <Button
                        variant="outline"
                        fullWidth
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Manage Attendees
                      </Button>
                    </>
                  )}
                  
                  {event.status === 'upcoming' && (
                    <Button
                      variant="danger"
                      fullWidth
                      onClick={handleCancelEvent}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Event
                    </Button>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
