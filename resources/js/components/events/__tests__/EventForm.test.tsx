import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventForm, { EventFormData } from '../EventForm';
import { Event } from '../../../lib/eventApi';

// Mock data
const mockEvent: Event = {
  id: 1,
  title: 'Sunday Service',
  description: 'Weekly worship service',
  event_date: '2024-12-31',
  event_time: '10:00:00',
  location: 'Main Sanctuary',
  status: 'upcoming',
  attendance_count: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('EventForm Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('should render form with all required fields', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    });

    it('should show "Add New Event" title when creating new event', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Add New Event')).toBeInTheDocument();
    });

    it('should show "Edit Event" title when editing existing event', () => {
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

    it('should populate form fields when editing existing event', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          event={mockEvent}
        />
      );

      expect(screen.getByDisplayValue('Sunday Service')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Weekly worship service')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2024-12-31')).toBeInTheDocument();
      expect(screen.getByDisplayValue('10:00')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Main Sanctuary')).toBeInTheDocument();
    });

    it('should show required field indicators', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const requiredIndicators = screen.getAllByText('*');
      expect(requiredIndicators.length).toBeGreaterThan(0);
    });
  });

  describe('Form Validation (Validates Requirements 9.1)', () => {
    it('should show error when title is empty', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when date is empty', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      fireEvent.change(titleInput, { target: { value: 'Test Event' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Date is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when time is empty', async () => {
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
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Time is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when location is empty', async () => {
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
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Location is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when title exceeds 200 characters', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i);
      const longTitle = 'a'.repeat(201);
      fireEvent.change(titleInput, { target: { value: longTitle } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title must be 200 characters or less')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when location exceeds 200 characters', async () => {
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
      
      const longLocation = 'a'.repeat(201);
      
      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: longLocation } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Location must be 200 characters or less')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should clear error when user starts typing in field', async () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });

      const titleInput = screen.getByLabelText(/title/i);
      fireEvent.change(titleInput, { target: { value: 'Test Event' } });

      await waitFor(() => {
        expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form data when all fields are valid', async () => {
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

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Event',
          event_date: '2024-12-31',
          event_time: '10:00',
          location: 'Test Location',
          description: 'Test Description',
        });
      });
    });

    it('should call onClose after successful submission', async () => {
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

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should not call onClose if submission fails', async () => {
      mockOnSubmit.mockRejectedValue(new Error('API Error'));

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
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should handle server-side validation errors', async () => {
      const serverError = {
        response: {
          data: {
            errors: {
              title: 'Title already exists',
            },
          },
        },
      };
      mockOnSubmit.mockRejectedValue(serverError);

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
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title already exists')).toBeInTheDocument();
      });
    });

    it('should show "Saving..." text while submitting', async () => {
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

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Saving...')).toBeInTheDocument();
      });
    });

    it('should disable form fields while submitting', async () => {
      mockOnSubmit.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
      const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
      const timeInput = screen.getByLabelText(/time/i) as HTMLInputElement;
      const locationInput = screen.getByLabelText(/location/i) as HTMLInputElement;

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(titleInput.disabled).toBe(true);
        expect(dateInput.disabled).toBe(true);
        expect(timeInput.disabled).toBe(true);
        expect(locationInput.disabled).toBe(true);
      });
    });
  });

  describe('Form Actions', () => {
    it('should call onClose when Cancel button is clicked', () => {
      render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not allow cancel while submitting', async () => {
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

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        const cancelButton = screen.getByText('Cancel') as HTMLButtonElement;
        expect(cancelButton.disabled).toBe(true);
      });
    });
  });

  describe('Form Reset', () => {
    it('should reset form when switching from edit to create mode', () => {
      const { rerender } = render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          event={mockEvent}
        />
      );

      expect(screen.getByDisplayValue('Sunday Service')).toBeInTheDocument();

      rerender(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          event={null}
        />
      );

      const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
      expect(titleInput.value).toBe('');
    });

    it('should clear errors when form is reopened', () => {
      const { rerender } = render(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      expect(screen.getByText('Title is required')).toBeInTheDocument();

      rerender(
        <EventForm
          isOpen={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      rerender(
        <EventForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
    });
  });

  describe('Description Field', () => {
    it('should allow description to be optional', async () => {
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

      fireEvent.change(titleInput, { target: { value: 'Test Event' } });
      fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
      fireEvent.change(timeInput, { target: { value: '10:00' } });
      fireEvent.change(locationInput, { target: { value: 'Test Location' } });

      const submitButton = screen.getByText('Add Event');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Event',
          event_date: '2024-12-31',
          event_time: '10:00',
          location: 'Test Location',
          description: '',
        });
      });
    });
  });
});
