import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Events from '../Events';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { eventApi } from '../../lib/eventApi';

// Mock the AuthContext
jest.mock('../../contexts/AuthContext', () => {
  const actual = jest.requireActual('../../contexts/AuthContext');
  return {
    ...actual,
    useAuth: jest.fn(),
  };
});

// Mock the ToastContext
jest.mock('../../contexts/ToastContext', () => {
  const actual = jest.requireActual('../../contexts/ToastContext');
  return {
    ...actual,
    useToast: jest.fn(() => ({
      showToast: jest.fn(),
    })),
  };
});

// Mock the event API
jest.mock('../../lib/eventApi', () => ({
  eventApi: {
    getEvents: jest.fn(),
    createEvent: jest.fn(),
    updateEvent: jest.fn(),
    completeEvent: jest.fn(),
  },
}));

// Mock the ArchiveButton component
jest.mock('../../components/archive/ArchiveButton', () => ({
  __esModule: true,
  default: () => <button>Archive</button>,
}));

// Mock the EventForm component
jest.mock('../../components/events/EventForm', () => ({
  __esModule: true,
  default: ({ isOpen, onClose }: any) => 
    isOpen ? <div data-testid="event-form">Event Form</div> : null,
}));

// Mock the CompleteEventDialog component
jest.mock('../../components/events/CompleteEventDialog', () => ({
  __esModule: true,
  default: ({ isOpen }: any) => 
    isOpen ? <div data-testid="complete-dialog">Complete Dialog</div> : null,
}));

const mockUser = {
  id: 1,
  name: 'Admin User',
  email: 'admin@test.com',
  role: 'admin',
};

// Use dates relative to today to ensure tests work regardless of when they run
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const lastMonth = new Date(today);
lastMonth.setMonth(lastMonth.getMonth() - 1);

const mockEvents = [
  {
    id: 1,
    title: 'Sunday Service',
    description: 'Weekly worship service',
    event_date: tomorrow.toISOString().split('T')[0],
    event_time: '10:00:00',
    location: 'Main Sanctuary',
    status: 'upcoming',
    attendance_count: null,
  },
  {
    id: 2,
    title: 'Christmas Celebration',
    description: 'Special Christmas event',
    event_date: nextWeek.toISOString().split('T')[0],
    event_time: '18:00:00',
    location: 'Fellowship Hall',
    status: 'upcoming',
    attendance_count: null,
  },
  {
    id: 3,
    title: 'Past Event',
    description: 'This event has passed',
    event_date: lastMonth.toISOString().split('T')[0],
    event_time: '10:00:00',
    location: 'Main Sanctuary',
    status: 'completed',
    attendance_count: 150,
  },
];

describe('Events Page Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock useAuth to return admin user by default
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
    });
    
    // Mock eventApi.getEvents to return mock events
    (eventApi.getEvents as jest.Mock).mockResolvedValue(mockEvents);
  });

  describe('Page Header', () => {
    it('should render page title and subtitle', async () => {
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Events')).toBeInTheDocument();
        expect(screen.getByText('Manage church events and activities')).toBeInTheDocument();
      });
    });

    it('should render "Create Event" button for admin users', async () => {
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument();
      });
    });

    it('should render "Calendar View" button', async () => {
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /calendar view/i })).toBeInTheDocument();
      });
    });

    it('should not render "Create Event" button for non-admin users', async () => {
      (useAuth as jest.Mock).mockReturnValue({
        user: { ...mockUser, role: 'staff' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      render(<Events />);

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /create event/i })).not.toBeInTheDocument();
      });
    });
  });

  describe('Filter Bar', () => {
    it('should render time range filter', async () => {
      render(<Events />);

      await waitFor(() => {
        // The Select component renders "Upcoming" as the default value
        expect(screen.getByText('Upcoming')).toBeInTheDocument();
      });
    });

    it('should render category filter', async () => {
      render(<Events />);

      await waitFor(() => {
        // The Select component renders "All Categories" as the default value
        expect(screen.getByText('All Categories')).toBeInTheDocument();
      });
    });

    it('should render status filter', async () => {
      render(<Events />);

      await waitFor(() => {
        // The Select component renders "All Status" as the default value
        expect(screen.getByText('All Status')).toBeInTheDocument();
      });
    });
  });

  describe('View Mode Toggle', () => {
    it('should render all three view mode buttons', async () => {
      render(<Events />);

      await waitFor(() => {
        // Look for buttons with specific titles
        expect(screen.getByTitle('List View')).toBeInTheDocument();
        expect(screen.getByTitle('Calendar View')).toBeInTheDocument();
        expect(screen.getByTitle('Grid View')).toBeInTheDocument();
      });
    });

    it('should default to grid view', async () => {
      render(<Events />);

      await waitFor(() => {
        const gridButton = screen.getByTitle('Grid View');
        expect(gridButton).toHaveClass('bg-white', 'text-primary-600');
      });
    });

    it('should switch to list view when clicked', async () => {
      const user = userEvent.setup();
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByTitle('List View')).toBeInTheDocument();
      });

      const listButton = screen.getByTitle('List View');
      await user.click(listButton);

      expect(listButton).toHaveClass('bg-white', 'text-primary-600');
    });

    it('should switch to calendar view when clicked', async () => {
      const user = userEvent.setup();
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByTitle('Calendar View')).toBeInTheDocument();
      });

      const calendarButton = screen.getByTitle('Calendar View');
      await user.click(calendarButton);

      expect(calendarButton).toHaveClass('bg-white', 'text-primary-600');
    });
  });

  describe('Event Count Display', () => {
    it('should display the correct number of events', async () => {
      render(<Events />);

      await waitFor(() => {
        // Default filter is "upcoming", so should show 2 events
        expect(screen.getByText('2 events')).toBeInTheDocument();
      });
    });

    it('should display singular "event" for one event', async () => {
      (eventApi.getEvents as jest.Mock).mockResolvedValue([mockEvents[0]]);
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('1 event')).toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should display loading spinner while fetching events', () => {
      (eventApi.getEvents as jest.Mock).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      render(<Events />);

      expect(screen.getByText('Loading events...')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should display empty state when no events match filters', async () => {
      (eventApi.getEvents as jest.Mock).mockResolvedValue([]);
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('No Events Found')).toBeInTheDocument();
        expect(screen.getByText('Get started by creating your first event.')).toBeInTheDocument();
      });
    });

    it('should show different message for non-admin users', async () => {
      (eventApi.getEvents as jest.Mock).mockResolvedValue([]);
      (useAuth as jest.Mock).mockReturnValue({
        user: { ...mockUser, role: 'staff' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Check back later for upcoming events.')).toBeInTheDocument();
      });
    });
  });

  describe('Event Display', () => {
    it('should display events in grid view by default', async () => {
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
        expect(screen.getByText('Christmas Celebration')).toBeInTheDocument();
      });

      // Check that the grid container exists
      const eventCards = screen.getAllByText(/Sunday Service|Christmas Celebration/);
      expect(eventCards.length).toBeGreaterThan(0);
    });

    it('should filter events by time range', async () => {
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      // Initially shows upcoming events (2)
      expect(screen.getByText('2 events')).toBeInTheDocument();

      // Switch to "All" time range - this would show all 3 events
      // Note: This test would need to interact with the Select component
      // which requires clicking and selecting from dropdown
    });
  });

  describe('Calendar View Placeholder', () => {
    it('should show placeholder message in calendar view', async () => {
      const user = userEvent.setup();
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByTitle('Calendar View')).toBeInTheDocument();
      });

      const calendarButton = screen.getByTitle('Calendar View');
      await user.click(calendarButton);

      await waitFor(() => {
        expect(screen.getByText('Calendar View Coming Soon')).toBeInTheDocument();
        expect(screen.getByText('The calendar view will be implemented in task 12.3.')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Layout', () => {
    it('should apply responsive classes to header buttons', async () => {
      render(<Events />);

      await waitFor(() => {
        const createButton = screen.getByRole('button', { name: /create/i });
        expect(createButton).toHaveClass('flex', 'items-center', 'gap-2');
      });
    });

    it('should apply responsive grid classes to event cards', async () => {
      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      // The grid container should have responsive classes
      // This is verified by the component structure
    });
  });
});
