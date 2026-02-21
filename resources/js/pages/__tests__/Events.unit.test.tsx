import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
 * Events Functionality Unit Tests
 * 
 * Tests three core areas:
 * 1. EventForm validation
 * 2. Event sorting (chronological)
 * 3. Mark as completed functionality
 * 
 * Validates Requirements: 9.1, 9.3, 9.4
 */
describe('Events Page - Unit Tests (Validates Requirements 9.1, 9.3, 9.4)', () => {
  const mockAdminUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({ showToast: mockShowToast, toasts: [], removeToast: jest.fn() });
  });

  /**
   * Test Suite 1: EventForm Validation
   * Validates Requirement 9.1
   */
  describe('EventForm Validation (Validates Requirement 9.1)', () => {
    it('should validate required fields before submission', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Add Event')).toBeInTheDocument();
      });

      // Open form
      const addButton = screen.getByText('Add Event');
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Event')).toBeInTheDocument();
      });

      // Try to submit without filling fields
      const submitButtons = screen.getAllByText('Add Event');
      const formSubmitButton = submitButtons[1]; // The second one is in the form
      fireEvent.click(formSubmitButton);

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
        expect(screen.getByText('Date is required')).toBeInTheDocument();
        expect(screen.getByText('Time is required')).toBeInTheDocument();
        expect(screen.getByText('Location is required')).toBeInTheDocument();
      });

      // API should not be called
      expect(mockEventApi.createEvent).not.toHaveBeenCalled();
    });

    it('should validate title length constraint', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Add Event')).toBeInTheDocument();
      });

      const addButton = screen.getByText('Add Event');
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Event')).toBeInTheDocument();
      });

      // Enter a title that's too long (>200 characters)
      const titleInput = screen.getByLabelText(/title/i);
      const longTitle = 'a'.repeat(201);
      fireEvent.change(titleInput, { target: { value: longTitle } });

      const submitButtons = screen.getAllByText('Add Event');
      const formSubmitButton = submitButtons[1]; // The second one is in the form
      fireEvent.click(formSubmitButton);

      await waitFor(() => {
        expect(screen.getByText('Title must be 200 characters or less')).toBeInTheDocument();
      });

      expect(mockEventApi.createEvent).not.toHaveBeenCalled();
    });

    it('should validate location length constraint', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      mockEventApi.getEvents.mockResolvedValue([]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Add Event')).toBeInTheDocument();
      });

      const addButton = screen.getByText('Add Event');
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Event')).toBeInTheDocument();
      });

      // Fill required fields
      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2099-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });

      // Enter a location that's too long (>200 characters)
      const longLocation = 'a'.repeat(201);
      fireEvent.change(locationInput, { target: { value: longLocation } });

      const submitButtons = screen.getAllByText('Add Event');
      const formSubmitButton = submitButtons[1]; // The second one is in the form
      fireEvent.click(formSubmitButton);

      await waitFor(() => {
        expect(screen.getByText('Location must be 200 characters or less')).toBeInTheDocument();
      });

      expect(mockEventApi.createEvent).not.toHaveBeenCalled();
    });

    it('should allow submission with valid data', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const newEvent: Event = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Test Location',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([newEvent]);
      mockEventApi.createEvent.mockResolvedValue(newEvent);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Add Event')).toBeInTheDocument();
      });

      const addButton = screen.getByText('Add Event');
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Event')).toBeInTheDocument();
      });

      // Fill all required fields with valid data
      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2099-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

      const submitButtons = screen.getAllByText('Add Event');
      const formSubmitButton = submitButtons[1]; // The second one is in the form
      fireEvent.click(formSubmitButton);

      await waitFor(() => {
        expect(mockEventApi.createEvent).toHaveBeenCalledWith({
          title: 'Test Event',
          event_date: '2099-12-31',
          event_time: '10:00',
          location: 'Test Location',
          description: 'Test Description',
        });
      });

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('success', 'Event created successfully');
      });
    });

    it('should allow description to be optional', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const newEvent: Event = {
        id: 1,
        title: 'Test Event',
        description: '',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Test Location',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([newEvent]);
      mockEventApi.createEvent.mockResolvedValue(newEvent);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Add Event')).toBeInTheDocument();
      });

      const addButton = screen.getByText('Add Event');
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Event')).toBeInTheDocument();
      });

      // Fill only required fields (no description)
      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2099-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButtons = screen.getAllByText('Add Event');
      const formSubmitButton = submitButtons[1]; // The second one is in the form
      fireEvent.click(formSubmitButton);

      await waitFor(() => {
        expect(mockEventApi.createEvent).toHaveBeenCalledWith({
          title: 'Test Event',
          event_date: '2099-12-31',
          event_time: '10:00',
          location: 'Test Location',
          description: '',
        });
      });
    });
  });

  /**
   * Test Suite 2: Event Sorting
   * Validates Requirement 9.3
   */
  describe('Event Sorting (Validates Requirement 9.3)', () => {
    it('should sort upcoming events chronologically (nearest first)', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const unsortedEvents: Event[] = [
        {
          id: 3,
          title: 'Event C - December',
          description: 'Far future event',
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
          title: 'Event A - January',
          description: 'Near future event',
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
          title: 'Event B - June',
          description: 'Mid future event',
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
        expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
      });

      const eventTitles = screen.getAllByRole('heading', { level: 3 });
      const titles = eventTitles.map(el => el.textContent);

      // Verify chronological order: Jan -> Jun -> Dec
      const eventAIndex = titles.indexOf('Event A - January');
      const eventBIndex = titles.indexOf('Event B - June');
      const eventCIndex = titles.indexOf('Event C - December');

      expect(eventAIndex).toBeLessThan(eventBIndex);
      expect(eventBIndex).toBeLessThan(eventCIndex);
    });

    it('should sort past events in reverse chronological order (most recent first)', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const pastEvents: Event[] = [
        {
          id: 1,
          title: 'Event A - 2020',
          description: 'Oldest event',
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
          title: 'Event C - 2023',
          description: 'Most recent event',
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
          title: 'Event B - 2022',
          description: 'Middle event',
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
        expect(screen.getByText('Past Events')).toBeInTheDocument();
      });

      const eventTitles = screen.getAllByRole('heading', { level: 3 });
      const titles = eventTitles.map(el => el.textContent);

      // Verify reverse chronological order: 2023 -> 2022 -> 2020
      const eventCIndex = titles.indexOf('Event C - 2023');
      const eventBIndex = titles.indexOf('Event B - 2022');
      const eventAIndex = titles.indexOf('Event A - 2020');

      expect(eventCIndex).toBeLessThan(eventBIndex);
      expect(eventBIndex).toBeLessThan(eventAIndex);
    });

    it('should handle events with same date correctly', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const sameDayEvents: Event[] = [
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
      ];

      mockEventApi.getEvents.mockResolvedValue(sameDayEvents);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Morning Service')).toBeInTheDocument();
        expect(screen.getByText('Evening Service')).toBeInTheDocument();
      });

      // Both events should be displayed
      const dateElements = screen.getAllByText(/Thursday, December 31, 2099/);
      expect(dateElements.length).toBe(2);
    });

    it('should maintain sort order after data reload', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

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

      const updatedEvents: Event[] = [
        ...initialEvents,
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
      ];

      mockEventApi.getEvents
        .mockResolvedValueOnce(initialEvents)
        .mockResolvedValueOnce(updatedEvents);

      const { rerender } = render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Event A')).toBeInTheDocument();
      });

      // Force reload
      rerender(<div />);
      rerender(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Event B')).toBeInTheDocument();
      });

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

  /**
   * Test Suite 3: Mark as Completed
   * Validates Requirement 9.4
   */
  describe('Mark as Completed (Validates Requirement 9.4)', () => {
    it('should show Complete button for upcoming events (admin only)', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const upcomingEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents.mockResolvedValue([upcomingEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Complete')).toBeInTheDocument();
      });
    });

    it('should not show Complete button for non-admin users', async () => {
      mockUseAuth.mockReturnValue({
        user: { ...mockAdminUser, role: 'staff' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const upcomingEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents.mockResolvedValue([upcomingEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      expect(screen.queryByText('Complete')).not.toBeInTheDocument();
    });

    it('should not show Complete button for completed events', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const completedEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2020-01-01',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'completed',
        attendance_count: 150,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents.mockResolvedValue([completedEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      expect(screen.queryByText('Complete')).not.toBeInTheDocument();
    });

    it('should open complete dialog when Complete button is clicked', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const upcomingEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents.mockResolvedValue([upcomingEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Complete')).toBeInTheDocument();
      });

      const completeButton = screen.getByText('Complete');
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
        expect(screen.getByText(/Mark "Sunday Service" as completed/)).toBeInTheDocument();
      });
    });

    it('should successfully mark event as completed with attendance count', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const upcomingEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const completedEvent: Event = {
        ...upcomingEvent,
        status: 'completed',
        attendance_count: 150,
        updated_at: '2024-01-02T00:00:00Z',
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([upcomingEvent])
        .mockResolvedValueOnce([completedEvent]);
      mockEventApi.completeEvent.mockResolvedValue(completedEvent);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Complete')).toBeInTheDocument();
      });

      // Click Complete button
      const completeButton = screen.getByText('Complete');
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      });

      // Enter attendance count
      const attendanceInput = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(attendanceInput, { target: { value: '150' } });

      // Submit form
      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockEventApi.completeEvent).toHaveBeenCalledWith(1, 150);
      });
    });

    it('should show success toast after completing event', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const upcomingEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const completedEvent: Event = {
        ...upcomingEvent,
        status: 'completed',
        attendance_count: 150,
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([upcomingEvent])
        .mockResolvedValueOnce([completedEvent]);
      mockEventApi.completeEvent.mockResolvedValue(completedEvent);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Complete')).toBeInTheDocument();
      });

      const completeButton = screen.getByText('Complete');
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      });

      const attendanceInput = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(attendanceInput, { target: { value: '150' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('success', 'Event marked as completed');
      });
    });

    it('should reload events after successful completion', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const upcomingEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const completedEvent: Event = {
        ...upcomingEvent,
        status: 'completed',
        attendance_count: 150,
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([upcomingEvent])
        .mockResolvedValueOnce([completedEvent]);
      mockEventApi.completeEvent.mockResolvedValue(completedEvent);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Complete')).toBeInTheDocument();
      });

      const completeButton = screen.getByText('Complete');
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      });

      const attendanceInput = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(attendanceInput, { target: { value: '150' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        // getEvents should be called twice: initial load + reload after completion
        expect(mockEventApi.getEvents).toHaveBeenCalledTimes(2);
      });
    });

    it('should accept zero as valid attendance count', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const upcomingEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const completedEvent: Event = {
        ...upcomingEvent,
        status: 'completed',
        attendance_count: 0,
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([upcomingEvent])
        .mockResolvedValueOnce([completedEvent]);
      mockEventApi.completeEvent.mockResolvedValue(completedEvent);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Complete')).toBeInTheDocument();
      });

      const completeButton = screen.getByText('Complete');
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      });

      const attendanceInput = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(attendanceInput, { target: { value: '0' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockEventApi.completeEvent).toHaveBeenCalledWith(1, 0);
      });
    });

    it('should display attendance count for completed events', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const completedEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2020-01-01',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'completed',
        attendance_count: 150,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents.mockResolvedValue([completedEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('150 attendees')).toBeInTheDocument();
      });
    });

    it('should display completed badge for completed events', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const completedEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2020-01-01',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'completed',
        attendance_count: 150,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents.mockResolvedValue([completedEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Completed')).toBeInTheDocument();
      });
    });

    it('should handle completion errors gracefully', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const upcomingEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2099-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockEventApi.getEvents.mockResolvedValue([upcomingEvent]);
      mockEventApi.completeEvent.mockRejectedValue(new Error('API Error'));

      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Complete')).toBeInTheDocument();
      });

      const completeButton = screen.getByText('Complete');
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      });

      const attendanceInput = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(attendanceInput, { target: { value: '150' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith('error', 'Failed to mark event as completed');
      });

      // Dialog should still be open after error
      expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();

      consoleError.mockRestore();
    });
  });
});
