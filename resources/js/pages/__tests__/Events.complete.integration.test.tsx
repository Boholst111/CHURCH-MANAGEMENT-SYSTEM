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
 * Event Completion Integration Tests
 * 
 * Tests the complete workflow of marking events as completed
 * Validates Requirements: 9.4
 */
describe('Events Page - Mark as Completed Integration (Validates Requirements 9.4)', () => {
  const mockAdminUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as const,
  };

  const mockUpcomingEvent: Event = {
    id: 1,
    title: 'Sunday Service',
    description: 'Weekly worship service',
    event_date: '2099-12-31',
    event_time: '10:00:00',
    location: 'Main Sanctuary',
    status: 'upcoming',
    attendance_count: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({ showToast: mockShowToast, toasts: [], removeToast: jest.fn() });
  });

  describe('Complete Button Visibility', () => {
    it('should show Complete button for upcoming events when user is admin', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      mockEventApi.getEvents.mockResolvedValue([mockUpcomingEvent]);

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
      mockEventApi.getEvents.mockResolvedValue([mockUpcomingEvent]);

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
        ...mockUpcomingEvent,
        event_date: '2020-01-01',
        status: 'completed',
        attendance_count: 150,
      };

      mockEventApi.getEvents.mockResolvedValue([completedEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      expect(screen.queryByText('Complete')).not.toBeInTheDocument();
    });
  });

  describe('Complete Dialog Workflow', () => {
    it('should open complete dialog when Complete button is clicked', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      mockEventApi.getEvents.mockResolvedValue([mockUpcomingEvent]);

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

    it('should close dialog when Cancel is clicked', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      mockEventApi.getEvents.mockResolvedValue([mockUpcomingEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Complete')).toBeInTheDocument();
      });

      const completeButton = screen.getByText('Complete');
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      });

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText('Mark Event as Completed')).not.toBeInTheDocument();
      });
    });
  });

  describe('Event Completion Success', () => {
    it('should successfully mark event as completed with attendance count', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const completedEvent: Event = {
        ...mockUpcomingEvent,
        status: 'completed',
        attendance_count: 150,
        updated_at: '2024-01-02T00:00:00Z',
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([mockUpcomingEvent])
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

      const completedEvent: Event = {
        ...mockUpcomingEvent,
        status: 'completed',
        attendance_count: 150,
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([mockUpcomingEvent])
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

      const completedEvent: Event = {
        ...mockUpcomingEvent,
        status: 'completed',
        attendance_count: 150,
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([mockUpcomingEvent])
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

    it('should close dialog after successful completion', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const completedEvent: Event = {
        ...mockUpcomingEvent,
        status: 'completed',
        attendance_count: 150,
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([mockUpcomingEvent])
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
        expect(screen.queryByText('Mark Event as Completed')).not.toBeInTheDocument();
      });
    });

    it('should accept zero as valid attendance count', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const completedEvent: Event = {
        ...mockUpcomingEvent,
        status: 'completed',
        attendance_count: 0,
      };

      mockEventApi.getEvents
        .mockResolvedValueOnce([mockUpcomingEvent])
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
  });

  describe('Event Completion Error Handling', () => {
    it('should show error toast when completion fails', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      mockEventApi.getEvents.mockResolvedValue([mockUpcomingEvent]);
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

      consoleError.mockRestore();
    });

    it('should keep dialog open when completion fails', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      mockEventApi.getEvents.mockResolvedValue([mockUpcomingEvent]);
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
        expect(mockShowToast).toHaveBeenCalled();
      });

      // Dialog should still be open
      expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();

      consoleError.mockRestore();
    });

    it('should not reload events when completion fails', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      mockEventApi.getEvents.mockResolvedValue([mockUpcomingEvent]);
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
        expect(mockShowToast).toHaveBeenCalled();
      });

      // getEvents should only be called once (initial load)
      expect(mockEventApi.getEvents).toHaveBeenCalledTimes(1);

      consoleError.mockRestore();
    });
  });

  describe('Multiple Events Completion', () => {
    it('should handle completing multiple events sequentially', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const event1: Event = { ...mockUpcomingEvent, id: 1, title: 'Event 1' };
      const event2: Event = { ...mockUpcomingEvent, id: 2, title: 'Event 2' };

      const completedEvent1: Event = { ...event1, status: 'completed', attendance_count: 100 };
      const completedEvent2: Event = { ...event2, status: 'completed', attendance_count: 150 };

      mockEventApi.getEvents
        .mockResolvedValueOnce([event1, event2])
        .mockResolvedValueOnce([completedEvent1, event2])
        .mockResolvedValueOnce([completedEvent1, completedEvent2]);

      mockEventApi.completeEvent
        .mockResolvedValueOnce(completedEvent1)
        .mockResolvedValueOnce(completedEvent2);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Event 1')).toBeInTheDocument();
        expect(screen.getByText('Event 2')).toBeInTheDocument();
      });

      // Complete first event
      const completeButtons = screen.getAllByText('Complete');
      fireEvent.click(completeButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      });

      let attendanceInput = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(attendanceInput, { target: { value: '100' } });

      let submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockEventApi.completeEvent).toHaveBeenCalledWith(1, 100);
      });

      // Complete second event
      await waitFor(() => {
        const newCompleteButtons = screen.getAllByText('Complete');
        expect(newCompleteButtons.length).toBeGreaterThan(0);
      });

      const secondCompleteButton = screen.getAllByText('Complete')[0];
      fireEvent.click(secondCompleteButton);

      await waitFor(() => {
        expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      });

      attendanceInput = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(attendanceInput, { target: { value: '150' } });

      submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockEventApi.completeEvent).toHaveBeenCalledWith(2, 150);
      });
    });
  });

  describe('Completed Event Display', () => {
    it('should display attendance count for completed events', async () => {
      mockUseAuth.mockReturnValue({
        user: mockAdminUser,
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });

      const completedEvent: Event = {
        ...mockUpcomingEvent,
        event_date: '2020-01-01',
        status: 'completed',
        attendance_count: 150,
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
        ...mockUpcomingEvent,
        event_date: '2020-01-01',
        status: 'completed',
        attendance_count: 150,
      };

      mockEventApi.getEvents.mockResolvedValue([completedEvent]);

      render(<Events />);

      await waitFor(() => {
        expect(screen.getByText('Completed')).toBeInTheDocument();
      });
    });
  });
});
