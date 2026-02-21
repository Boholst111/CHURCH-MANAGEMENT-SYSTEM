import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Events from '../Events';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { eventApi } from '../../lib/eventApi';

// Mock the hooks
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../contexts/ToastContext', () => ({
  useToast: jest.fn(),
}));

// Mock the API
jest.mock('../../lib/eventApi');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockEventApi = eventApi as jest.Mocked<typeof eventApi>;

// Mock data
const mockUpcomingEvents = [
  {
    id: 1,
    title: 'Sunday Service',
    description: 'Weekly worship service',
    event_date: '2099-12-31',
    event_time: '10:00:00',
    location: 'Main Sanctuary',
    status: 'upcoming' as const,
    attendance_count: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Youth Night',
    description: 'Fellowship for young people',
    event_date: '2099-01-15',
    event_time: '19:00:00',
    location: 'Youth Hall',
    status: 'upcoming' as const,
    attendance_count: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const mockPastEvents = [
  {
    id: 3,
    title: 'Christmas Service',
    description: 'Special Christmas celebration',
    event_date: '2023-12-25',
    event_time: '18:00:00',
    location: 'Main Sanctuary',
    status: 'completed' as const,
    attendance_count: 150,
    created_at: '2023-12-01T00:00:00Z',
    updated_at: '2023-12-26T00:00:00Z',
  },
];

const mockShowToast = jest.fn();

describe('Events Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({ showToast: mockShowToast });
  });

  describe('Page Structure', () => {
    it('should render page title and description', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      expect(screen.getByText('Events')).toBeInTheDocument();
      expect(screen.getByText('Manage church events and track attendance')).toBeInTheDocument();
    });

    it('should show "Add Event" button for admin users', async () => {
      mockUseAuth.mockReturnValue({ 
        user: { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
        login: jest.fn(),
        logout: jest.fn(),
        isLoading: false
      });
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Add Event')).toBeInTheDocument();
      });
    });

    it('should not show "Add Event" button for non-admin users', async () => {
      mockUseAuth.mockReturnValue({ 
        user: { id: 2, name: 'Staff', email: 'staff@example.com', role: 'staff' },
        login: jest.fn(),
        logout: jest.fn(),
        isLoading: false
      });
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.queryByText('Add Event')).not.toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading message while fetching data', () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockImplementation(() => 
        new Promise(() => {}) // Never resolves
      );

      render(<Events />);

      expect(screen.getByText('Loading events...')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no events exist', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText(/No events yet/)).toBeInTheDocument();
      });
    });

    it('should show helpful message for admin in empty state', async () => {
      mockUseAuth.mockReturnValue({ 
        user: { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
        login: jest.fn(),
        logout: jest.fn(),
        isLoading: false
      });
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText(/Click "Add Event" to create one/)).toBeInTheDocument();
      });
    });
  });

  describe('Upcoming Events Display (Validates Requirements 9.1, 9.2)', () => {
    it('should display list of upcoming events', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockUpcomingEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
        expect(screen.getByText('Youth Night')).toBeInTheDocument();
      });
    });

    it('should display event details including date, time, and location', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockUpcomingEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Main Sanctuary')).toBeInTheDocument();
        expect(screen.getByText('Youth Hall')).toBeInTheDocument();
        expect(screen.getByText(/10:00 AM/)).toBeInTheDocument();
        expect(screen.getByText(/7:00 PM/)).toBeInTheDocument();
      });
    });

    it('should display event descriptions', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockUpcomingEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Weekly worship service')).toBeInTheDocument();
        expect(screen.getByText('Fellowship for young people')).toBeInTheDocument();
      });
    });

    it('should sort upcoming events chronologically (nearest first)', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockUpcomingEvents);

      render(<Events />);

      await waitFor(() => {
        const eventTitles = screen.getAllByRole('heading', { level: 3 });
        const upcomingTitles = eventTitles.map(el => el.textContent);
        
        // Youth Night (2099-01-15) should come before Sunday Service (2099-12-31)
        const youthIndex = upcomingTitles.indexOf('Youth Night');
        const sundayIndex = upcomingTitles.indexOf('Sunday Service');
        
        expect(youthIndex).toBeLessThan(sundayIndex);
      });
    });
  });

  describe('Past Events Display', () => {
    it('should display list of past events', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockPastEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Past Events')).toBeInTheDocument();
        expect(screen.getByText('Christmas Service')).toBeInTheDocument();
      });
    });

    it('should display attendance count for completed events', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockPastEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('150 attendees')).toBeInTheDocument();
      });
    });

    it('should show completed badge for past events', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockPastEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Completed')).toBeInTheDocument();
      });
    });

    it('should apply opacity styling to past events', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockPastEvents);

      const { container } = render(<Events />);

      await waitFor(() => {
        const pastEventCards = container.querySelectorAll('.opacity-75');
        expect(pastEventCards.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Event Categorization', () => {
    it('should separate upcoming and past events correctly', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      const allEvents = [...mockUpcomingEvents, ...mockPastEvents];
      mockEventApi.getEvents.mockResolvedValue(allEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
        expect(screen.getByText('Past Events')).toBeInTheDocument();
        
        // Verify upcoming events are in upcoming section
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
        expect(screen.getByText('Youth Night')).toBeInTheDocument();
        
        // Verify past events are in past section
        expect(screen.getByText('Christmas Service')).toBeInTheDocument();
      });
    });

    it('should not show "Upcoming Events" section when no upcoming events exist', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockPastEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.queryByText('Upcoming Events')).not.toBeInTheDocument();
        expect(screen.getByText('Past Events')).toBeInTheDocument();
      });
    });

    it('should not show "Past Events" section when no past events exist', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockUpcomingEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
        expect(screen.queryByText('Past Events')).not.toBeInTheDocument();
      });
    });
  });

  describe('Event Status Display', () => {
    it('should show cancelled badge for cancelled events', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      const cancelledEvent = {
        ...mockUpcomingEvents[0],
        status: 'cancelled' as const,
        event_date: '2020-01-01', // Past date so it shows up
      };
      mockEventApi.getEvents.mockResolvedValue([cancelledEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Cancelled')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      mockEventApi.getEvents.mockRejectedValue(new Error('API Error'));

      render(<Events />);

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', 'Failed to load events');
        expect(screen.getByText(/No events yet/)).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });
  });

  describe('Responsive Layout', () => {
    it('should render events in a grid layout', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockUpcomingEvents);

      const { container } = render(<Events />);

      await waitFor(() => {
        const grid = container.querySelector('.grid');
        expect(grid).toBeInTheDocument();
        expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
      });
    });
  });

  describe('Date and Time Formatting', () => {
    it('should format dates in readable format', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockUpcomingEvents);

      render(<Events />);

      await waitFor(() => {
        // Check that dates are formatted (not raw ISO strings)
        expect(screen.queryByText('2099-12-31')).not.toBeInTheDocument();
        expect(screen.queryByText('2099-01-15')).not.toBeInTheDocument();
      });
    });

    it('should format times in 12-hour format with AM/PM', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), isLoading: false });
      mockEventApi.getEvents.mockResolvedValue(mockUpcomingEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText(/10:00 AM/)).toBeInTheDocument();
        expect(screen.getByText(/7:00 PM/)).toBeInTheDocument();
      });
    });
  });
});
