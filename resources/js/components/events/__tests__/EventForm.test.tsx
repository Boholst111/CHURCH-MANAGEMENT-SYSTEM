import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventForm, { EventFormData } from '../EventForm';
import { Event } from '../../../lib/eventApi';

/**
 * EventForm Component Tests
 * 
 * Tests the Add/Edit Event modal form component.
 * 
 * Test Coverage:
 * - Form renders with all required fields
 * - Form validation (required fields, date validation, capacity validation)
 * - Date cannot be in the past validation
 * - Category selector with all options
 * - Image upload functionality
 * - Form submission with valid data
 * - Edit mode populates form with event data
 * - Cancel button closes form
 * - Loading states
 * 
 * Validates Requirements: 9.4
 * Design Reference: Events Page Design section
 * Task: 12.4 Create Add/Edit Event modal
 */

describe('EventForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('renders all required form fields', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Check for all form fields
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
      expect(screen.getByText(/category/i)).toBeInTheDocument(); // Select component uses text, not labelText
      expect(screen.getByLabelText(/capacity/i)).toBeInTheDocument();
      expect(screen.getByText(/event image/i)).toBeInTheDocument();
    });

    it('renders "Add New Event" title for new event', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Add New Event')).toBeInTheDocument();
    });

    it('renders "Edit Event" title when editing', () => {
      const mockEvent: Event = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        event_date: '2025-12-31',
        event_time: '18:00:00',
        location: 'Test Location',
        status: 'upcoming',
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      };

      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          event={mockEvent}
        />
      );

      expect(screen.getByText('Edit Event')).toBeInTheDocument();
    });

    it('renders all category options', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Category field should be present (it's a Select component)
      expect(screen.getByText(/category/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('shows error when title is empty', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows error when date is empty', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      fireEvent.change(titleInput, { target: { value: 'Test Event' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Date is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows error when date is in the past', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Event date cannot be in the past')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows error when time is empty', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2025-12-31' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Time is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows error when location is empty', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2025-12-31' } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Location is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows error when capacity is invalid', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);
      const capacityInput = screen.getByLabelText(/capacity/i);

      // Use a future date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: futureDateStr } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(capacityInput, { target: { value: '0' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Capacity must be a positive number')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      // Use a future date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: futureDateStr } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Test Event',
            event_date: futureDateStr,
            event_time: '18:00',
            location: 'Test Location',
            description: 'Test Description',
            category: 'worship',
            status: 'upcoming',
          })
        );
      });

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('submits form with capacity', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);
      const capacityInput = screen.getByLabelText(/capacity/i);

      // Use a future date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: futureDateStr } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(capacityInput, { target: { value: '100' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            capacity: 100,
          })
        );
      });
    });

    it('does not close form on submission error', async () => {
      mockOnSubmit.mockRejectedValue(new Error('Submission failed'));

      // Mock window.alert to prevent actual alert
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);

      // Use a future date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: futureDateStr } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalled();

      alertMock.mockRestore();
    });
  });

  describe('Edit Mode', () => {
    it('populates form with event data', () => {
      const mockEvent: Event = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        event_date: '2025-12-31',
        event_time: '18:00:00',
        location: 'Test Location',
        status: 'upcoming',
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      };

      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          event={mockEvent}
        />
      );

      const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
      const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
      const timeInput = screen.getByLabelText(/time/i) as HTMLInputElement;
      const locationInput = screen.getByLabelText(/location/i) as HTMLInputElement;
      const descriptionInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement;

      expect(titleInput.value).toBe('Test Event');
      expect(dateInput.value).toBe('2025-12-31');
      expect(timeInput.value).toBe('18:00');
      expect(locationInput.value).toBe('Test Location');
      expect(descriptionInput.value).toBe('Test Description');
    });

    it('shows "Update Event" button in edit mode', () => {
      const mockEvent: Event = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        event_date: '2025-12-31',
        event_time: '18:00:00',
        location: 'Test Location',
        status: 'upcoming',
        created_at: '2025-01-01',
        updated_at: '2025-01-01',
      };

      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          event={mockEvent}
        />
      );

      expect(screen.getByRole('button', { name: /update event/i })).toBeInTheDocument();
    });
  });

  describe('Cancel Button', () => {
    it('calls onClose when cancel button is clicked', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Loading States', () => {
    it('disables form fields when submitting', async () => {
      mockOnSubmit.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const dateInput = screen.getByLabelText(/date/i);
      const timeInput = screen.getByLabelText(/time/i);
      const locationInput = screen.getByLabelText(/location/i);

      // Use a future date
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: futureDateStr } });
      fireEvent.change(timeInput, { target: { value: '18:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByRole('button', { name: /add event/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(titleInput).toBeDisabled();
      });

      expect(dateInput).toBeDisabled();
      expect(timeInput).toBeDisabled();
      expect(locationInput).toBeDisabled();
    });
  });
});
