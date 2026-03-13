import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventCard, Event } from '../EventCard';

/**
 * EventCard Component Tests
 * 
 * Tests the EventCard component functionality including:
 * - Rendering event information correctly
 * - Status badge display
 * - Progress bar calculation and display
 * - Action button visibility based on event status
 * - Event handler callbacks
 * - Accessibility features
 * 
 * Design Reference: Testing Strategy section
 * Validates Requirements: 12.2
 */

describe('EventCard', () => {
  const mockUpcomingEvent: Event = {
    id: 1,
    title: 'Sunday Worship Service',
    description: 'Join us for worship',
    date: '2024-02-18',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    category: 'Worship',
    attendees: {
      registered: 150,
      capacity: 200,
    },
    status: 'upcoming',
  };

  const mockOngoingEvent: Event = {
    id: 2,
    title: 'Community Outreach',
    description: 'Serving the community',
    date: '2024-02-15',
    time: '2:00 PM',
    location: 'Community Center',
    category: 'Outreach',
    attendees: {
      registered: 45,
      capacity: 50,
    },
    status: 'ongoing',
  };

  const mockCompletedEvent: Event = {
    id: 3,
    title: 'Youth Fellowship',
    description: 'Youth gathering',
    date: '2024-02-10',
    time: '7:00 PM',
    location: 'Youth Hall',
    category: 'Fellowship',
    attendees: {
      registered: 32,
      capacity: 40,
    },
    status: 'completed',
  };

  const mockCancelledEvent: Event = {
    id: 4,
    title: 'Leadership Training',
    description: 'Training workshop',
    date: '2024-02-20',
    time: '9:00 AM',
    location: 'Conference Room',
    category: 'Training',
    attendees: {
      registered: 15,
      capacity: 30,
    },
    status: 'cancelled',
  };

  describe('Rendering', () => {
    it('renders event title and description', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      expect(screen.getByText('Sunday Worship Service')).toBeInTheDocument();
      expect(screen.getByText('Join us for worship')).toBeInTheDocument();
    });

    it('renders event date and time', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      expect(screen.getByText(/10:00 AM/)).toBeInTheDocument();
    });

    it('renders event location', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      expect(screen.getByText('Main Sanctuary')).toBeInTheDocument();
    });

    it('renders event category badge', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      expect(screen.getByText('Worship')).toBeInTheDocument();
    });

    it('renders attendee count', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      expect(screen.getByText('150 / 200')).toBeInTheDocument();
    });

    it('renders event image when provided', () => {
      const eventWithImage = {
        ...mockUpcomingEvent,
        image: 'https://example.com/image.jpg',
      };
      
      render(<EventCard event={eventWithImage} />);
      
      const image = screen.getByAltText('Sunday Worship Service');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders placeholder icon when no image provided', () => {
      const { container } = render(<EventCard event={mockUpcomingEvent} />);
      
      // Check for Calendar icon (placeholder)
      const calendarIcon = container.querySelector('svg');
      expect(calendarIcon).toBeInTheDocument();
    });
  });

  describe('Status Badges', () => {
    it('renders "Upcoming" badge for upcoming events', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });

    it('renders "Ongoing" badge for ongoing events', () => {
      render(<EventCard event={mockOngoingEvent} />);
      
      expect(screen.getByText('Ongoing')).toBeInTheDocument();
    });

    it('renders "Completed" badge for completed events', () => {
      render(<EventCard event={mockCompletedEvent} />);
      
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('renders "Cancelled" badge for cancelled events', () => {
      render(<EventCard event={mockCancelledEvent} />);
      
      expect(screen.getByText('Cancelled')).toBeInTheDocument();
    });
  });

  describe('Progress Bar', () => {
    it('calculates and displays correct attendance percentage', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      // 150/200 = 75%
      expect(screen.getByText('75% capacity')).toBeInTheDocument();
    });

    it('displays spots left when not at capacity', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      // 200 - 150 = 50 spots left
      expect(screen.getByText('50 spots left')).toBeInTheDocument();
    });

    it('displays "Full" when at capacity', () => {
      const fullEvent = {
        ...mockUpcomingEvent,
        attendees: {
          registered: 200,
          capacity: 200,
        },
      };
      
      render(<EventCard event={fullEvent} />);
      
      expect(screen.getByText('Full')).toBeInTheDocument();
      expect(screen.queryByText(/spots left/)).not.toBeInTheDocument();
    });

    it('handles zero capacity gracefully', () => {
      const zeroCapacityEvent = {
        ...mockUpcomingEvent,
        attendees: {
          registered: 0,
          capacity: 0,
        },
      };
      
      render(<EventCard event={zeroCapacityEvent} />);
      
      expect(screen.getByText('0 / 0')).toBeInTheDocument();
      expect(screen.getByText('0% capacity')).toBeInTheDocument();
    });

    it('includes proper ARIA attributes for accessibility', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-label', '75% capacity');
    });
  });

  describe('Action Buttons', () => {
    it('renders all action buttons for upcoming events', () => {
      const handlers = {
        onViewDetails: jest.fn(),
        onEdit: jest.fn(),
        onManageAttendees: jest.fn(),
        onCancel: jest.fn(),
      };
      
      render(<EventCard event={mockUpcomingEvent} {...handlers} />);
      
      expect(screen.getByText('View Details')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Manage Attendees')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('hides Edit and Manage Attendees buttons for completed events', () => {
      const handlers = {
        onViewDetails: jest.fn(),
        onEdit: jest.fn(),
        onManageAttendees: jest.fn(),
      };
      
      render(<EventCard event={mockCompletedEvent} {...handlers} />);
      
      expect(screen.getByText('View Details')).toBeInTheDocument();
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      expect(screen.queryByText('Manage Attendees')).not.toBeInTheDocument();
    });

    it('hides Edit and Manage Attendees buttons for cancelled events', () => {
      const handlers = {
        onViewDetails: jest.fn(),
        onEdit: jest.fn(),
        onManageAttendees: jest.fn(),
      };
      
      render(<EventCard event={mockCancelledEvent} {...handlers} />);
      
      expect(screen.getByText('View Details')).toBeInTheDocument();
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      expect(screen.queryByText('Manage Attendees')).not.toBeInTheDocument();
    });

    it('hides Cancel button for non-upcoming events', () => {
      const onCancel = jest.fn();
      
      render(<EventCard event={mockCompletedEvent} onCancel={onCancel} />);
      
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });

    it('hides all action buttons when showActions is false', () => {
      const handlers = {
        onViewDetails: jest.fn(),
        onEdit: jest.fn(),
        onManageAttendees: jest.fn(),
        onCancel: jest.fn(),
      };
      
      render(<EventCard event={mockUpcomingEvent} {...handlers} showActions={false} />);
      
      expect(screen.queryByText('View Details')).not.toBeInTheDocument();
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      expect(screen.queryByText('Manage Attendees')).not.toBeInTheDocument();
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('calls onViewDetails when View Details button is clicked', () => {
      const onViewDetails = jest.fn();
      
      render(<EventCard event={mockUpcomingEvent} onViewDetails={onViewDetails} />);
      
      fireEvent.click(screen.getByText('View Details'));
      
      expect(onViewDetails).toHaveBeenCalledTimes(1);
      expect(onViewDetails).toHaveBeenCalledWith(mockUpcomingEvent);
    });

    it('calls onEdit when Edit button is clicked', () => {
      const onEdit = jest.fn();
      
      render(<EventCard event={mockUpcomingEvent} onEdit={onEdit} />);
      
      fireEvent.click(screen.getByText('Edit'));
      
      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledWith(mockUpcomingEvent);
    });

    it('calls onManageAttendees when Manage Attendees button is clicked', () => {
      const onManageAttendees = jest.fn();
      
      render(<EventCard event={mockUpcomingEvent} onManageAttendees={onManageAttendees} />);
      
      fireEvent.click(screen.getByText('Manage Attendees'));
      
      expect(onManageAttendees).toHaveBeenCalledTimes(1);
      expect(onManageAttendees).toHaveBeenCalledWith(mockUpcomingEvent);
    });

    it('calls onCancel when Cancel button is clicked', () => {
      const onCancel = jest.fn();
      
      render(<EventCard event={mockUpcomingEvent} onCancel={onCancel} />);
      
      fireEvent.click(screen.getByText('Cancel'));
      
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onCancel).toHaveBeenCalledWith(mockUpcomingEvent);
    });
  });

  describe('Category Colors', () => {
    it('applies correct color for worship category', () => {
      const { container } = render(<EventCard event={mockUpcomingEvent} />);
      
      const categoryBadge = screen.getByText('Worship');
      expect(categoryBadge).toHaveClass('bg-primary-500');
    });

    it('applies correct color for outreach category', () => {
      const { container } = render(<EventCard event={mockOngoingEvent} />);
      
      const categoryBadge = screen.getByText('Outreach');
      expect(categoryBadge).toHaveClass('bg-success-500');
    });

    it('applies correct color for fellowship category', () => {
      const { container } = render(<EventCard event={mockCompletedEvent} />);
      
      const categoryBadge = screen.getByText('Fellowship');
      expect(categoryBadge).toHaveClass('bg-warning-500');
    });

    it('applies correct color for training category', () => {
      const { container } = render(<EventCard event={mockCancelledEvent} />);
      
      const categoryBadge = screen.getByText('Training');
      expect(categoryBadge).toHaveClass('bg-info-500');
    });

    it('applies default color for unknown category', () => {
      const unknownCategoryEvent = {
        ...mockUpcomingEvent,
        category: 'Unknown',
      };
      
      const { container } = render(<EventCard event={unknownCategoryEvent} />);
      
      const categoryBadge = screen.getByText('Unknown');
      expect(categoryBadge).toHaveClass('bg-neutral-500');
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for event image', () => {
      const eventWithImage = {
        ...mockUpcomingEvent,
        image: 'https://example.com/image.jpg',
      };
      
      render(<EventCard event={eventWithImage} />);
      
      const image = screen.getByAltText('Sunday Worship Service');
      expect(image).toBeInTheDocument();
    });

    it('includes ARIA label for progress bar', () => {
      render(<EventCard event={mockUpcomingEvent} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', '75% capacity');
    });

    it('buttons have proper accessible text', () => {
      const handlers = {
        onViewDetails: jest.fn(),
        onEdit: jest.fn(),
        onManageAttendees: jest.fn(),
        onCancel: jest.fn(),
      };
      
      render(<EventCard event={mockUpcomingEvent} {...handlers} />);
      
      expect(screen.getByText('View Details')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Manage Attendees')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });
});
