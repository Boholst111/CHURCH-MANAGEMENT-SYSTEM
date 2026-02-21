import api from './api';

/**
 * Event interface
 */
export interface Event {
  id: number;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  attendance_count: number | null;
  created_at: string;
  updated_at: string;
}

/**
 * Event form data interface
 */
export interface EventFormData {
  title: string;
  description?: string;
  event_date: string;
  event_time: string;
  location: string;
  status?: 'upcoming' | 'completed' | 'cancelled';
  attendance_count?: number;
}

/**
 * Event API client
 * 
 * Provides methods for interacting with the events API endpoints.
 */
export const eventApi = {
  /**
   * Get all events
   */
  async getEvents(): Promise<Event[]> {
    const response = await api.get('/events');
    return response.data.data || [];
  },

  /**
   * Get a single event by ID
   */
  async getEvent(id: number): Promise<Event> {
    const response = await api.get(`/events/${id}`);
    return response.data.data;
  },

  /**
   * Create a new event
   */
  async createEvent(data: EventFormData): Promise<Event> {
    const response = await api.post('/events', data);
    return response.data.data;
  },

  /**
   * Update an existing event
   */
  async updateEvent(id: number, data: Partial<EventFormData>): Promise<Event> {
    const response = await api.put(`/events/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete an event
   */
  async deleteEvent(id: number): Promise<void> {
    await api.delete(`/events/${id}`);
  },

  /**
   * Mark an event as completed
   */
  async completeEvent(id: number, attendanceCount: number): Promise<Event> {
    const response = await api.put(`/events/${id}/complete`, {
      attendance_count: attendanceCount,
    });
    return response.data.data;
  },
};
