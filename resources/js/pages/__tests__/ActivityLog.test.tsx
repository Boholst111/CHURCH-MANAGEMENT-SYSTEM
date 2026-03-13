import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ActivityLog from '../ActivityLog';
import { activityApi } from '../../lib/activityApi';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the activity API
jest.mock('../../lib/activityApi', () => ({
  activityApi: {
    getActivities: jest.fn(),
    getUsers: jest.fn(),
  },
}));

const mockActivities = [
  {
    id: 1,
    user_id: 1,
    user_name: 'John Doe',
    action: 'create',
    entity_type: 'Member',
    entity_id: 123,
    description: 'Created a new member',
    ip_address: '192.168.1.1',
    created_at: '2024-01-15T10:30:00Z',
    created_at_human: '2 hours ago',
  },
  {
    id: 2,
    user_id: 2,
    user_name: 'Jane Smith',
    action: 'update',
    entity_type: 'Event',
    entity_id: 456,
    description: 'Updated event details',
    ip_address: '192.168.1.2',
    created_at: '2024-01-15T09:15:00Z',
    created_at_human: '3 hours ago',
  },
];

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const mockResponse = {
  success: true,
  data: mockActivities,
  pagination: {
    current_page: 1,
    per_page: 20,
    total: 2,
    last_page: 1,
    from: 1,
    to: 2,
  },
};

describe('ActivityLog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (activityApi.getActivities as jest.Mock).mockResolvedValue(mockResponse);
    (activityApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(<ToastProvider>{component}</ToastProvider>);
  };

  it('renders activity log page with header', async () => {
    renderWithProviders(<ActivityLog />);

    expect(screen.getByText('Activity Log')).toBeInTheDocument();
    expect(screen.getByText('System activity and audit trail')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    renderWithProviders(<ActivityLog />);

    expect(screen.getByText('Loading activities...')).toBeInTheDocument();
  });

  it('displays activities after loading', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Jane Smith')[0]).toBeInTheDocument();
    });

    expect(screen.getByText('Created a new member')).toBeInTheDocument();
    expect(screen.getByText('Updated event details')).toBeInTheDocument();
  });

  it('displays empty state when no activities', async () => {
    (activityApi.getActivities as jest.Mock).mockResolvedValue({
      ...mockResponse,
      data: [],
      pagination: { ...mockResponse.pagination, total: 0, from: null, to: null },
    });

    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('No activities found')).toBeInTheDocument();
    });
  });

  it('renders filter controls', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    // Check for filter labels (not using getByLabelText since labels don't have htmlFor)
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Module')).toBeInTheDocument();
  });

  it('filters activities by user', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('User')).toBeInTheDocument();
    });

    const userSelects = screen.getAllByRole('combobox');
    const userSelect = userSelects.find((select) =>
      select.previousElementSibling?.textContent?.includes('User')
    );

    if (userSelect) {
      fireEvent.change(userSelect, { target: { value: '1' } });

      await waitFor(() => {
        expect(activityApi.getActivities).toHaveBeenCalledWith(
          expect.objectContaining({ user_id: 1 })
        );
      });
    }
  });

  it('clears filters when clear button is clicked', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    });

    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, per_page: 20 })
      );
    });
  });

  it('opens activity detail modal when activity is clicked', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('Created a new member')).toBeInTheDocument();
    });

    const activityCards = screen.getAllByText('Created a new member');
    const activityCard = activityCards[0].closest('div');
    if (activityCard) {
      fireEvent.click(activityCard);
    }

    await waitFor(() => {
      expect(screen.getByText('Activity Details')).toBeInTheDocument();
    });
  });

  it('displays pagination controls', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText(/Showing 1 to 2 of 2 activities/)).toBeInTheDocument();
    });

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 1/)).toBeInTheDocument();
  });

  it('handles pagination navigation', async () => {
    const multiPageResponse = {
      ...mockResponse,
      pagination: {
        current_page: 1,
        per_page: 20,
        total: 50,
        last_page: 3,
        from: 1,
        to: 20,
      },
    };

    (activityApi.getActivities as jest.Mock).mockResolvedValue(multiPageResponse);

    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 })
      );
    });
  });

  it('displays severity indicators', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('Created a new member')).toBeInTheDocument();
    });

    // Check for severity badges
    const severityElements = screen.getAllByText(/info|warning|error|critical/i);
    expect(severityElements.length).toBeGreaterThan(0);
  });

  it('displays metadata for each activity', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('192.168.1.1')).toBeInTheDocument();
      expect(screen.getByText('192.168.1.2')).toBeInTheDocument();
    });
  });

  it('toggles real-time updates', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('Real-time updates')).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('displays export button', async () => {
    renderWithProviders(<ActivityLog />);

    await waitFor(() => {
      expect(screen.getByText('Export Log')).toBeInTheDocument();
    });
  });
});
