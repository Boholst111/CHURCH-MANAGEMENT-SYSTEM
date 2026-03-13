import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventDetail from '../EventDetail';
import { eventApi } from '../../lib/eventApi';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the API
jest.mock('../../lib/eventApi');
const mockedEventApi = eventApi as jest.Mocked<typeof eventApi>;

// Mock useParams and useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => mockNavigate,
}));

// Mock AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  ...jest.requireActual('../../contexts/AuthContext'),
  useAuth: () => ({
    user: { id: 1, name: 'Test User', email: 'test@example.com', role: 'admin' },
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: true,
  }),
}));

const mockEvent = {
  id: 1,
  title: 'Sunday Service',
  description: 'Join us for our weekly Sunday service',
  event_date: '2024-02-15',
  event_time: '10:00:00',
  location: 'Main Sanctuary',
  status: 'upcoming' as const,
  attendance_count: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const renderEventDetail = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <EventDetail />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('EventDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockedEventApi.getEvent.mockImplementation(() => new Promise(() => {}));
    renderEventDetail();
    expect(screen.getByText(/loading event details/i)).toBeInTheDocument();
  });

  it('renders event details after loading', async () => {
    mockedEventApi.getEvent.mockResolvedValue(mockEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Sunday Service')).toBeInTheDocument();
    });

    expect(screen.getByText(/join us for our weekly sunday service/i)).toBeInTheDocument();
    // Use getAllByText since location appears in multiple places
    expect(screen.getAllByText('Main Sanctuary').length).toBeGreaterThan(0);
  });

  it('displays event date and time', async () => {
    mockedEventApi.getEvent.mockResolvedValue(mockEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText(/thursday, february 15, 2024/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/10:00 AM/i)).toBeInTheDocument();
  });

  it('displays status badge', async () => {
    mockedEventApi.getEvent.mockResolvedValue(mockEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });
  });

  it('displays attendance information', async () => {
    mockedEventApi.getEvent.mockResolvedValue(mockEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Sunday Service')).toBeInTheDocument();
    });

    // Mock attendees: 15 / 50
    expect(screen.getByText(/15 \/ 50/)).toBeInTheDocument();
    expect(screen.getByText(/35 spots left/i)).toBeInTheDocument();
  });

  it('shows admin action buttons for admin users', async () => {
    mockedEventApi.getEvent.mockResolvedValue(mockEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Sunday Service')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /edit event/i })).toBeInTheDocument();
    // Use getAllByRole since "Manage Attendees" appears twice (in attendee list and action buttons)
    expect(screen.getAllByRole('button', { name: /manage attendees/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /cancel event/i })).toBeInTheDocument();
  });

  it('shows register button for upcoming events', async () => {
    mockedEventApi.getEvent.mockResolvedValue(mockEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Sunday Service')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /register for event/i })).toBeInTheDocument();
  });

  it('displays back button', async () => {
    mockedEventApi.getEvent.mockResolvedValue(mockEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Sunday Service')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /back to events/i })).toBeInTheDocument();
  });

  it('shows attendee list for admin users', async () => {
    mockedEventApi.getEvent.mockResolvedValue(mockEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Sunday Service')).toBeInTheDocument();
    });

    // Check for attendee list heading
    expect(screen.getByText(/registered attendees/i)).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    mockedEventApi.getEvent.mockRejectedValue(new Error('Failed to load'));
    renderEventDetail();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/events');
    });
  });

  it('displays completed status for completed events', async () => {
    const completedEvent = { ...mockEvent, status: 'completed' as const };
    mockedEventApi.getEvent.mockResolvedValue(completedEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
  });

  it('displays cancelled status for cancelled events', async () => {
    const cancelledEvent = { ...mockEvent, status: 'cancelled' as const };
    mockedEventApi.getEvent.mockResolvedValue(cancelledEvent);
    renderEventDetail();

    await waitFor(() => {
      expect(screen.getByText('Cancelled')).toBeInTheDocument();
    });
  });
});
