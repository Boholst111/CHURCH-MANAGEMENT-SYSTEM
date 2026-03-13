import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import Events from '../../pages/Events';
import EventDetail from '../../pages/EventDetail';
import ProtectedRoute from '../../components/ProtectedRoute';
import * as eventsApi from '../../lib/eventsApi';

/**
 * Event Management Workflow Integration Tests
 * 
 * Tests complete event management workflows:
 * 1. Create new event
 * 2. View event details
 * 3. Edit event
 * 4. Register for event
 * 5. Cancel event
 * 
 * Validates Requirements: Event Management, CRUD Operations, State Management
 */

jest.mock('../../lib/eventsApi');

const mockedEventsApi = eventsApi as jest.Mocked<typeof eventsApi>;

describe('Event Management Workflow Integration Tests', () => {
  const mockAdminUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@church.com',
    role: 'admin' as const,
  };

  const mockEvent = {
    id: 1,
    title: 'Sunday Service',
    description: 'Weekly Sunday worship service',
    date: '2024-12-25',
    time: '10:00:00',
    location: 'Main Sanctuary',
    category: 'worship' as const,
    capacity: 200,
    registered_count: 50,
    status: 'upcoming' as const,
    image: '/images/event.jpg',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify(mockAdminUser));
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Create Event Workflow', () => {
    it('should complete full workflow: open form -> fill details -> submit -> verify event created', async () => {
      // Mock initial empty event list
      mockedEventsApi.getEvents.mockResolvedValueOnce([]);

      // Mock event creation
      mockedEventsApi.createEvent.mockResolvedValueOnce(mockEvent);

      // Mock updated event list
      mockedEventsApi.getEvents.mockResolvedValueOnce([mockEvent]);

      render(
        <MemoryRouter initialEntries={['/events']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Wait for page to load
      await waitFor(() => {
        expect(screen.getByText(/events/i)).toBeInTheDocument();
      });

      // Click Create Event button
      const createButton = screen.getByRole('button', { name: /create event/i });
      fireEvent.click(createButton);

      // Wait for form to appear
      await waitFor(() => {
        expect(screen.getByText(/add new event/i)).toBeInTheDocument();
      });

      // Fill out event form
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: 'Sunday Service' },
      });
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: 'Weekly Sunday worship service' },
      });
      fireEvent.change(screen.getByLabelText(/date/i), {
        target: { value: '2024-12-25' },
      });
      fireEvent.change(screen.getByLabelText(/time/i), {
        target: { value: '10:00' },
      });
      fireEvent.change(screen.getByLabelText(/location/i), {
        target: { value: 'Main Sanctuary' },
      });
      fireEvent.change(screen.getByLabelText(/capacity/i), {
        target: { value: '200' },
      });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /create event/i });
      fireEvent.click(submitButton);

      // Verify event was created
      await waitFor(() => {
        expect(mockedEventsApi.createEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Sunday Service',
            description: 'Weekly Sunday worship service',
            date: '2024-12-25',
          })
        );
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/event created successfully/i)).toBeInTheDocument();
      });

      // Verify event appears in list
      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });
    });

    it('should validate required fields when creating event', async () => {
      mockedEventsApi.getEvents.mockResolvedValue([]);

      render(
        <MemoryRouter initialEntries={['/events']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/events/i)).toBeInTheDocument();
      });

      const createButton = screen.getByRole('button', { name: /create event/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(screen.getByText(/add new event/i)).toBeInTheDocument();
      });

      // Try to submit without filling required fields
      const submitButton = screen.getByRole('button', { name: /create event/i });
      fireEvent.click(submitButton);

      // Verify validation errors appear
      await waitFor(() => {
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      });
    });

    it('should prevent creating events with past dates', async () => {
      mockedEventsApi.getEvents.mockResolvedValue([]);

      render(
        <MemoryRouter initialEntries={['/events']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/events/i)).toBeInTheDocument();
      });

      const createButton = screen.getByRole('button', { name: /create event/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(screen.getByText(/add new event/i)).toBeInTheDocument();
      });

      // Fill form with past date
      fireEvent.change(screen.getByLabelText(/title/i), {
        target: { value: 'Past Event' },
      });
      fireEvent.change(screen.getByLabelText(/date/i), {
        target: { value: '2020-01-01' },
      });

      const submitButton = screen.getByRole('button', { name: /create event/i });
      fireEvent.click(submitButton);

      // Verify validation error for past date
      await waitFor(() => {
        expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument();
      });
    });
  });

  describe('Edit Event Workflow', () => {
    it('should complete full workflow: select event -> edit details -> save -> verify changes', async () => {
      // Mock initial event list
      mockedEventsApi.getEvents.mockResolvedValueOnce([mockEvent]);

      // Mock event update
      const updatedEvent = { ...mockEvent, title: 'Updated Sunday Service' };
      mockedEventsApi.updateEvent.mockResolvedValueOnce(updatedEvent);

      // Mock updated event list
      mockedEventsApi.getEvents.mockResolvedValueOnce([updatedEvent]);

      render(
        <MemoryRouter initialEntries={['/events']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Wait for events to load
      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      // Click Edit button
      const editButton = screen.getByRole('button', { name: /edit/i });
      fireEvent.click(editButton);

      // Wait for edit form
      await waitFor(() => {
        expect(screen.getByText(/edit event/i)).toBeInTheDocument();
      });

      // Update title
      const titleInput = screen.getByLabelText(/title/i);
      fireEvent.change(titleInput, {
        target: { value: 'Updated Sunday Service' },
      });

      // Save changes
      const saveButton = screen.getByRole('button', { name: /save/i });
      fireEvent.click(saveButton);

      // Verify update was called
      await waitFor(() => {
        expect(mockedEventsApi.updateEvent).toHaveBeenCalledWith(
          mockEvent.id,
          expect.objectContaining({
            title: 'Updated Sunday Service',
          })
        );
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/event updated successfully/i)).toBeInTheDocument();
      });

      // Verify updated title appears
      await waitFor(() => {
        expect(screen.getByText('Updated Sunday Service')).toBeInTheDocument();
      });
    });
  });

  describe('Event Registration Workflow', () => {
    it('should allow user to register for an event', async () => {
      mockedEventsApi.getEvents.mockResolvedValue([mockEvent]);
      mockedEventsApi.getEvent.mockResolvedValue(mockEvent);
      mockedEventsApi.registerForEvent.mockResolvedValue({
        ...mockEvent,
        registered_count: 51,
      });

      render(
        <MemoryRouter initialEntries={[`/events/${mockEvent.id}`]}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Wait for event details to load
      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      // Click Register button
      const registerButton = screen.getByRole('button', { name: /register/i });
      fireEvent.click(registerButton);

      // Verify registration was called
      await waitFor(() => {
        expect(mockedEventsApi.registerForEvent).toHaveBeenCalledWith(mockEvent.id);
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/registered successfully/i)).toBeInTheDocument();
      });

      // Verify registered count updated
      await waitFor(() => {
        expect(screen.getByText(/51/)).toBeInTheDocument();
      });
    });

    it('should prevent registration when event is at capacity', async () => {
      const fullEvent = { ...mockEvent, registered_count: 200, capacity: 200 };
      mockedEventsApi.getEvents.mockResolvedValue([fullEvent]);
      mockedEventsApi.getEvent.mockResolvedValue(fullEvent);

      render(
        <MemoryRouter initialEntries={[`/events/${fullEvent.id}`]}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      // Verify Register button is disabled or shows "Full"
      const registerButton = screen.queryByRole('button', { name: /register/i });
      if (registerButton) {
        expect(registerButton).toBeDisabled();
      } else {
        expect(screen.getByText(/event full/i)).toBeInTheDocument();
      }
    });
  });

  describe('Cancel Event Workflow', () => {
    it('should complete full workflow: select event -> confirm cancellation -> verify event cancelled', async () => {
      mockedEventsApi.getEvents.mockResolvedValueOnce([mockEvent]);

      const cancelledEvent = { ...mockEvent, status: 'cancelled' as const };
      mockedEventsApi.cancelEvent.mockResolvedValueOnce(cancelledEvent);
      mockedEventsApi.getEvents.mockResolvedValueOnce([cancelledEvent]);

      render(
        <MemoryRouter initialEntries={['/events']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
      });

      // Click Cancel button
      const cancelButton = screen.getByRole('button', { name: /cancel event/i });
      fireEvent.click(cancelButton);

      // Confirm cancellation
      await waitFor(() => {
        expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
      });

      const confirmButton = screen.getByRole('button', { name: /confirm/i });
      fireEvent.click(confirmButton);

      // Verify cancellation was called
      await waitFor(() => {
        expect(mockedEventsApi.cancelEvent).toHaveBeenCalledWith(mockEvent.id);
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/event cancelled successfully/i)).toBeInTheDocument();
      });

      // Verify cancelled badge appears
      await waitFor(() => {
        expect(screen.getByText(/cancelled/i)).toBeInTheDocument();
      });
    });
  });

  describe('Data Flow from API to UI', () => {
    it('should correctly display event data from API', async () => {
      mockedEventsApi.getEvents.mockResolvedValue([mockEvent]);

      render(
        <MemoryRouter initialEntries={['/events']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Verify API was called
      await waitFor(() => {
        expect(mockedEventsApi.getEvents).toHaveBeenCalled();
      });

      // Verify event data is displayed
      await waitFor(() => {
        expect(screen.getByText('Sunday Service')).toBeInTheDocument();
        expect(screen.getByText(/main sanctuary/i)).toBeInTheDocument();
        expect(screen.getByText(/50.*200/)).toBeInTheDocument(); // registered/capacity
      });
    });

    it('should handle API errors gracefully', async () => {
      mockedEventsApi.getEvents.mockRejectedValue(new Error('API Error'));

      render(
        <MemoryRouter initialEntries={['/events']}>
          <AuthProvider>
            <ToastProvider>
              <Routes>
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              </Routes>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Verify error message is displayed
      await waitFor(() => {
        expect(screen.getByText(/failed to load events/i)).toBeInTheDocument();
      });
    });
  });
});
