import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Events from '../Events';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { eventApi, Event } from '../../lib/eventApi';

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

const mockShowToast = jest.fn();

/**
 * Event Sorting Unit Tests
 * 
 * Tests event chronological sorting functionality
 * Validates Requirements: 9.3
 */
describe('Events Page - Event Sorting (Validates Requirements 9.3)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({ 
      user: null, 
      login: jest.fn(), 
      logout: jest.fn(), 
      loading: false 
    });
    mockUseToast.mockReturnValue({ showToast: mockShowToast, toasts: [], removeToast: jest.fn() });
  });

  describe('Upcoming Events Chronological Sorting', () => {
    it('should sort upcoming events by date in ascending order (nearest first)', async () => {
      const unsortedEvents: Event[] = [
        {
          id: 3,
          title: 'Event C - Far Future',
          description: 'Event in December',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Location C',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 1,
          title: 'Event A - Near Future',
          description: 'Event in January',
          event_date: '2099-01-15',
          event_time: '10:00:00',
          location: 'Location A',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Event B - Mid Future',
          description: 'Event in June',
          event_date: '2099-06-15',
          event_time: '10:00:00',
          location: 'Location B',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockEventApi.getEvents.mockResolvedValue(unsortedEvents);

      render(<Events />);

      await waitFor(() => {
        const eventTitles = screen.getAllByRole('heading', { level: 3 });
        const titles = eventTitles.map(el => el.textContent);
        
        // Verify chronological order: Jan -> Jun -> Dec
        const eventAIndex = titles.indexOf('Event A - Near Future');
        const eventBIndex = titles.indexOf('Event B - Mid Future');
        const eventCIndex = titles.indexOf('Event C - Far Future');
        
        expect(eventAIndex).toBeLessThan(eventBIndex);
        expect(eventBIndex).toBeLessThan(eventCIndex);
      });
    });

    it('should display all events with same date', async () => {
      const sameDayEvents: Event[] = [
        {
          id: 2,
          title: 'Evening Service',
          description: 'Evening event',
          event_date: '2099-12-31',
          event_time: '19:00:00',
          location: 'Main Hall',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 1,
          title: 'Morning Service',
          description: 'Morning event',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Main Hall',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 3,
          title: 'Afternoon Service',
          description: 'Afternoon event',
          event_date: '2099-12-31',
          event_time: '14:00:00',
          location: 'Main Hall',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockEventApi.getEvents.mockResolvedValue(sameDayEvents);

      render(<Events />);

      await waitFor(() => {
        // All events should be displayed
        expect(screen.getByText('Morning Service')).toBeInTheDocument();
        expect(screen.getByText('Afternoon Service')).toBeInTheDocument();
        expect(screen.getByText('Evening Service')).toBeInTheDocument();
        
        // All should show the same date
        const dateElements = screen.getAllByText(/Thursday, December 31, 2099/);
        expect(dateElements.length).toBe(3);
      });
    });

    it('should handle events spanning multiple years correctly', async () => {
      const multiYearEvents: Event[] = [
        {
          id: 3,
          title: 'Event 2101',
          description: 'Event in 2101',
          event_date: '2101-01-01',
          event_time: '10:00:00',
          location: 'Location',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 1,
          title: 'Event 2099',
          description: 'Event in 2099',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Location',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Event 2100',
          description: 'Event in 2100',
          event_date: '2100-06-15',
          event_time: '10:00:00',
          location: 'Location',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockEventApi.getEvents.mockResolvedValue(multiYearEvents);

      render(<Events />);

      await waitFor(() => {
        const eventTitles = screen.getAllByRole('heading', { level: 3 });
        const titles = eventTitles.map(el => el.textContent);
        
        // Verify year order: 2099 -> 2100 -> 2101
        const event2099Index = titles.indexOf('Event 2099');
        const event2100Index = titles.indexOf('Event 2100');
        const event2101Index = titles.indexOf('Event 2101');
        
        expect(event2099Index).toBeLessThan(event2100Index);
        expect(event2100Index).toBeLessThan(event2101Index);
      });
    });

    it('should correctly sort events after data reload', async () => {
      const initialEvents: Event[] = [
        {
          id: 1,
          title: 'Event A',
          description: 'First event',
          event_date: '2099-01-15',
          event_time: '10:00:00',
          location: 'Location A',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 3,
          title: 'Event C',
          description: 'Third event',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Location C',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      // Add a new event in the middle
      const updatedEvents: Event[] = [
        {
          id: 1,
          title: 'Event A',
          description: 'First event',
          event_date: '2099-01-15',
          event_time: '10:00:00',
          location: 'Location A',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Event B',
          description: 'Second event',
          event_date: '2099-06-15',
          event_time: '10:00:00',
          location: 'Location B',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 3,
          title: 'Event C',
          description: 'Third event',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Location C',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockEventApi.getEvents
        .mockResolvedValueOnce(initialEvents)
        .mockResolvedValueOnce(updatedEvents);

      const { rerender } = render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Event A')).toBeInTheDocument();
        expect(screen.getByText('Event C')).toBeInTheDocument();
      });

      // Force a reload by unmounting and remounting
      rerender(<div />);
      rerender(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Event B')).toBeInTheDocument();
        
        const eventTitles = screen.getAllByRole('heading', { level: 3 });
        const titles = eventTitles.map(el => el.textContent);
        
        // Verify order: A -> B -> C
        const eventAIndex = titles.indexOf('Event A');
        const eventBIndex = titles.indexOf('Event B');
        const eventCIndex = titles.indexOf('Event C');
        
        expect(eventAIndex).toBeLessThan(eventBIndex);
        expect(eventBIndex).toBeLessThan(eventCIndex);
      });
    });
  });

  describe('Past Events Reverse Chronological Sorting', () => {
    it('should sort past events by date in descending order (most recent first)', async () => {
      const pastEvents: Event[] = [
        {
          id: 1,
          title: 'Event A - Oldest',
          description: 'Event in January',
          event_date: '2020-01-15',
          event_time: '10:00:00',
          location: 'Location A',
          status: 'completed',
          attendance_count: 100,
          created_at: '2020-01-01T00:00:00Z',
          updated_at: '2020-01-16T00:00:00Z',
        },
        {
          id: 3,
          title: 'Event C - Most Recent',
          description: 'Event in December',
          event_date: '2023-12-31',
          event_time: '10:00:00',
          location: 'Location C',
          status: 'completed',
          attendance_count: 150,
          created_at: '2023-12-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Event B - Middle',
          description: 'Event in June',
          event_date: '2022-06-15',
          event_time: '10:00:00',
          location: 'Location B',
          status: 'completed',
          attendance_count: 120,
          created_at: '2022-06-01T00:00:00Z',
          updated_at: '2022-06-16T00:00:00Z',
        },
      ];

      mockEventApi.getEvents.mockResolvedValue(pastEvents);

      render(<Events />);

      await waitFor(() => {
        const eventTitles = screen.getAllByRole('heading', { level: 3 });
        const titles = eventTitles.map(el => el.textContent);
        
        // Verify reverse chronological order: Dec 2023 -> Jun 2022 -> Jan 2020
        const eventCIndex = titles.indexOf('Event C - Most Recent');
        const eventBIndex = titles.indexOf('Event B - Middle');
        const eventAIndex = titles.indexOf('Event A - Oldest');
        
        expect(eventCIndex).toBeLessThan(eventBIndex);
        expect(eventBIndex).toBeLessThan(eventAIndex);
      });
    });
  });

  describe('Mixed Events Sorting', () => {
    it('should correctly separate and sort upcoming vs past events', async () => {
      const mixedEvents: Event[] = [
        {
          id: 1,
          title: 'Past Event A',
          description: 'Old event',
          event_date: '2020-01-15',
          event_time: '10:00:00',
          location: 'Location',
          status: 'completed',
          attendance_count: 100,
          created_at: '2020-01-01T00:00:00Z',
          updated_at: '2020-01-16T00:00:00Z',
        },
        {
          id: 2,
          title: 'Future Event A',
          description: 'Upcoming event',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Location',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 3,
          title: 'Past Event B',
          description: 'Recent past event',
          event_date: '2023-12-31',
          event_time: '10:00:00',
          location: 'Location',
          status: 'completed',
          attendance_count: 150,
          created_at: '2023-12-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 4,
          title: 'Future Event B',
          description: 'Near future event',
          event_date: '2099-01-15',
          event_time: '10:00:00',
          location: 'Location',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockEventApi.getEvents.mockResolvedValue(mixedEvents);

      render(<Events />);

      await waitFor(() => {
        // Check that sections exist
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
        expect(screen.getByText('Past Events')).toBeInTheDocument();

        const eventTitles = screen.getAllByRole('heading', { level: 3 });
        const titles = eventTitles.map(el => el.textContent);
        
        // Verify upcoming events come before past events in DOM
        const futureAIndex = titles.indexOf('Future Event B');
        const futureBIndex = titles.indexOf('Future Event A');
        const pastAIndex = titles.indexOf('Past Event B');
        const pastBIndex = titles.indexOf('Past Event A');
        
        // Upcoming events should be sorted ascending
        expect(futureAIndex).toBeLessThan(futureBIndex);
        
        // Past events should be sorted descending
        expect(pastAIndex).toBeLessThan(pastBIndex);
        
        // All upcoming events should come before past events
        expect(futureAIndex).toBeLessThan(pastAIndex);
        expect(futureBIndex).toBeLessThan(pastAIndex);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle single event correctly', async () => {
      const singleEvent: Event[] = [
        {
          id: 1,
          title: 'Only Event',
          description: 'Single event',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Location',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockEventApi.getEvents.mockResolvedValue(singleEvent);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Only Event')).toBeInTheDocument();
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
      });
    });

    it('should handle events with identical dates and times', async () => {
      const identicalEvents: Event[] = [
        {
          id: 1,
          title: 'Event 1',
          description: 'First',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Location A',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Event 2',
          description: 'Second',
          event_date: '2099-12-31',
          event_time: '10:00:00',
          location: 'Location B',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockEventApi.getEvents.mockResolvedValue(identicalEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Event 1')).toBeInTheDocument();
        expect(screen.getByText('Event 2')).toBeInTheDocument();
      });
    });

    it('should handle empty events list', async () => {
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText(/No events yet/)).toBeInTheDocument();
        expect(screen.queryByText('Upcoming Events')).not.toBeInTheDocument();
        expect(screen.queryByText('Past Events')).not.toBeInTheDocument();
      });
    });
  });
});
