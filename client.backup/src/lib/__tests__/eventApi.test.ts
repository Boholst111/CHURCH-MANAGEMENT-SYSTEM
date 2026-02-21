import { eventApi, Event, EventFormData } from '../eventApi';
import api from '../api';

// Mock the api module
jest.mock('../api');

const mockApi = api as jest.Mocked<typeof api>;

describe('Event API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getEvents', () => {
    it('should fetch all events', async () => {
      const mockEvents: Event[] = [
        {
          id: 1,
          title: 'Sunday Service',
          description: 'Weekly worship',
          event_date: '2024-12-31',
          event_time: '10:00:00',
          location: 'Main Sanctuary',
          status: 'upcoming',
          attendance_count: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockApi.get.mockResolvedValue({ data: { data: mockEvents } });

      const result = await eventApi.getEvents();

      expect(mockApi.get).toHaveBeenCalledWith('/events');
      expect(result).toEqual(mockEvents);
    });

    it('should return empty array if data is missing', async () => {
      mockApi.get.mockResolvedValue({ data: {} });

      const result = await eventApi.getEvents();

      expect(result).toEqual([]);
    });
  });

  describe('getEvent', () => {
    it('should fetch a single event by ID', async () => {
      const mockEvent: Event = {
        id: 1,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2024-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockApi.get.mockResolvedValue({ data: { data: mockEvent } });

      const result = await eventApi.getEvent(1);

      expect(mockApi.get).toHaveBeenCalledWith('/events/1');
      expect(result).toEqual(mockEvent);
    });
  });

  describe('createEvent (Validates Requirements 9.1)', () => {
    it('should create a new event', async () => {
      const formData: EventFormData = {
        title: 'New Event',
        description: 'Event description',
        event_date: '2024-12-31',
        event_time: '10:00',
        location: 'Main Hall',
      };

      const mockResponse: Event = {
        id: 1,
        ...formData,
        event_time: '10:00:00',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockApi.post.mockResolvedValue({ data: { data: mockResponse } });

      const result = await eventApi.createEvent(formData);

      expect(mockApi.post).toHaveBeenCalledWith('/events', formData);
      expect(result).toEqual(mockResponse);
    });

    it('should create event with minimal required fields', async () => {
      const formData: EventFormData = {
        title: 'New Event',
        event_date: '2024-12-31',
        event_time: '10:00',
        location: 'Main Hall',
      };

      const mockResponse: Event = {
        id: 1,
        title: formData.title,
        description: null,
        event_date: formData.event_date,
        event_time: '10:00:00',
        location: formData.location,
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      mockApi.post.mockResolvedValue({ data: { data: mockResponse } });

      const result = await eventApi.createEvent(formData);

      expect(mockApi.post).toHaveBeenCalledWith('/events', formData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateEvent (Validates Requirements 9.1)', () => {
    it('should update an existing event', async () => {
      const eventId = 1;
      const updateData: Partial<EventFormData> = {
        title: 'Updated Event',
        location: 'New Location',
      };

      const mockResponse: Event = {
        id: eventId,
        title: 'Updated Event',
        description: 'Original description',
        event_date: '2024-12-31',
        event_time: '10:00:00',
        location: 'New Location',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      };

      mockApi.put.mockResolvedValue({ data: { data: mockResponse } });

      const result = await eventApi.updateEvent(eventId, updateData);

      expect(mockApi.put).toHaveBeenCalledWith(`/events/${eventId}`, updateData);
      expect(result).toEqual(mockResponse);
    });

    it('should update event with all fields', async () => {
      const eventId = 1;
      const updateData: EventFormData = {
        title: 'Updated Event',
        description: 'Updated description',
        event_date: '2025-01-01',
        event_time: '14:00',
        location: 'New Location',
      };

      const mockResponse: Event = {
        id: eventId,
        ...updateData,
        event_time: '14:00:00',
        status: 'upcoming',
        attendance_count: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      };

      mockApi.put.mockResolvedValue({ data: { data: mockResponse } });

      const result = await eventApi.updateEvent(eventId, updateData);

      expect(mockApi.put).toHaveBeenCalledWith(`/events/${eventId}`, updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteEvent (Validates Requirements 9.1)', () => {
    it('should delete an event', async () => {
      const eventId = 1;

      mockApi.delete.mockResolvedValue({ data: { success: true } });

      await eventApi.deleteEvent(eventId);

      expect(mockApi.delete).toHaveBeenCalledWith(`/events/${eventId}`);
    });

    it('should handle delete errors', async () => {
      const eventId = 1;
      const error = new Error('Delete failed');

      mockApi.delete.mockRejectedValue(error);

      await expect(eventApi.deleteEvent(eventId)).rejects.toThrow('Delete failed');
    });
  });

  describe('completeEvent (Validates Requirements 9.4)', () => {
    it('should mark event as completed with attendance count', async () => {
      const eventId = 1;
      const attendanceCount = 150;

      const mockResponse: Event = {
        id: eventId,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2024-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'completed',
        attendance_count: attendanceCount,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      };

      mockApi.put.mockResolvedValue({ data: { data: mockResponse } });

      const result = await eventApi.completeEvent(eventId, attendanceCount);

      expect(mockApi.put).toHaveBeenCalledWith(`/events/${eventId}/complete`, {
        attendance_count: attendanceCount,
      });
      expect(result).toEqual(mockResponse);
      expect(result.status).toBe('completed');
      expect(result.attendance_count).toBe(attendanceCount);
    });

    it('should accept zero attendance count', async () => {
      const eventId = 1;
      const attendanceCount = 0;

      const mockResponse: Event = {
        id: eventId,
        title: 'Sunday Service',
        description: 'Weekly worship',
        event_date: '2024-12-31',
        event_time: '10:00:00',
        location: 'Main Sanctuary',
        status: 'completed',
        attendance_count: 0,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      };

      mockApi.put.mockResolvedValue({ data: { data: mockResponse } });

      const result = await eventApi.completeEvent(eventId, attendanceCount);

      expect(mockApi.put).toHaveBeenCalledWith(`/events/${eventId}/complete`, {
        attendance_count: 0,
      });
      expect(result.attendance_count).toBe(0);
    });

    it('should handle completion errors', async () => {
      const eventId = 1;
      const attendanceCount = 150;
      const error = new Error('Completion failed');

      mockApi.put.mockRejectedValue(error);

      await expect(eventApi.completeEvent(eventId, attendanceCount)).rejects.toThrow('Completion failed');
    });
  });

  describe('Error Handling', () => {
    it('should propagate API errors for getEvents', async () => {
      const error = new Error('Network error');
      mockApi.get.mockRejectedValue(error);

      await expect(eventApi.getEvents()).rejects.toThrow('Network error');
    });

    it('should propagate API errors for createEvent', async () => {
      const formData: EventFormData = {
        title: 'New Event',
        event_date: '2024-12-31',
        event_time: '10:00',
        location: 'Main Hall',
      };
      const error = new Error('Validation error');
      mockApi.post.mockRejectedValue(error);

      await expect(eventApi.createEvent(formData)).rejects.toThrow('Validation error');
    });

    it('should propagate API errors for updateEvent', async () => {
      const error = new Error('Update error');
      mockApi.put.mockRejectedValue(error);

      await expect(eventApi.updateEvent(1, { title: 'Updated' })).rejects.toThrow('Update error');
    });
  });
});
