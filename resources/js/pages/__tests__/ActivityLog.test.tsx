import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActivityLog from '../ActivityLog';
import { activityApi } from '../../lib/activityApi';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the activity API
jest.mock('../../lib/activityApi');

const mockActivities = {
  success: true,
  data: [
    {
      id: 1,
      user_id: 1,
      user_name: 'John Doe',
      action: 'create',
      entity_type: 'Member',
      entity_id: 10,
      description: 'Created member Jane Smith',
      ip_address: '192.168.1.1',
      created_at: '2024-01-15T10:30:00Z',
      created_at_human: '2 hours ago',
    },
    {
      id: 2,
      user_id: 2,
      user_name: 'Jane Admin',
      action: 'update',
      entity_type: 'Event',
      entity_id: 5,
      description: 'Updated event Sunday Service',
      ip_address: '192.168.1.2',
      created_at: '2024-01-15T09:00:00Z',
      created_at_human: '3 hours ago',
    },
  ],
  pagination: {
    current_page: 1,
    per_page: 50,
    total: 2,
    last_page: 1,
    from: 1,
    to: 2,
  },
};

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Admin', email: 'jane@example.com' },
];

const renderActivityLog = () => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <ActivityLog />
      </ToastProvider>
    </BrowserRouter>
  );
};

describe('ActivityLog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (activityApi.getActivities as jest.Mock).mockResolvedValue(mockActivities);
    (activityApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  it('renders activity log page with title', async () => {
    renderActivityLog();
    
    expect(screen.getByText('Activity Log')).toBeInTheDocument();
    expect(screen.getByText('View and filter system activities and audit trail')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    renderActivityLog();
    
    expect(screen.getByText('Loading activities...')).toBeInTheDocument();
  });

  it('fetches and displays activities', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalled();
    });
    
    expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Updated event Sunday Service')).toBeInTheDocument();
    expect(screen.getByText('Member')).toBeInTheDocument();
    expect(screen.getByText('Event')).toBeInTheDocument();
  });

  it('displays activities in reverse chronological order', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
    });
    
    const rows = screen.getAllByRole('row');
    // First row is header, second should be most recent activity
    expect(rows[1]).toHaveTextContent('John Doe');
    expect(rows[2]).toHaveTextContent('Jane Admin');
  });

  it('fetches and displays users for filter dropdown', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(activityApi.getUsers).toHaveBeenCalled();
    });
    
    const userSelect = screen.getByLabelText('User');
    expect(userSelect).toBeInTheDocument();
    
    // Check that users are in the dropdown
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'John Doe' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Jane Admin' })).toBeInTheDocument();
    });
  });

  it('filters activities by user', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    const userSelect = screen.getByLabelText('User');
    fireEvent.change(userSelect, { target: { value: '1' } });
    
    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalledWith(
        expect.objectContaining({ user_id: 1, page: 1 })
      );
    });
  });

  it('filters activities by date range', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');
    
    fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2024-01-31' } });
    
    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalledWith(
        expect.objectContaining({
          start_date: '2024-01-01',
          end_date: '2024-01-31',
          page: 1,
        })
      );
    });
  });

  it('clears filters when clear button is clicked', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    // Set filters
    const userSelect = screen.getByLabelText('User');
    fireEvent.change(userSelect, { target: { value: '1' } });
    
    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalledWith(
        expect.objectContaining({ user_id: 1 })
      );
    });
    
    // Clear filters
    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, per_page: 50 })
      );
    });
    
    // Check that filters are cleared
    expect(userSelect).toHaveValue('');
  });

  it('displays pagination controls', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Showing 1 to 2 of 2 activities')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('handles pagination navigation', async () => {
    const multiPageActivities = {
      ...mockActivities,
      pagination: {
        current_page: 1,
        per_page: 50,
        total: 100,
        last_page: 2,
        from: 1,
        to: 50,
      },
    };
    
    (activityApi.getActivities as jest.Mock).mockResolvedValue(multiPageActivities);
    
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 })
      );
    });
  });

  it('disables previous button on first page', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('disables next button on last page', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('displays empty state when no activities found', async () => {
    (activityApi.getActivities as jest.Mock).mockResolvedValue({
      success: true,
      data: [],
      pagination: {
        current_page: 1,
        per_page: 50,
        total: 0,
        last_page: 1,
        from: null,
        to: null,
      },
    });
    
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('No activities found')).toBeInTheDocument();
    });
  });

  it('displays action badges with correct styling', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('create')).toBeInTheDocument();
    });
    
    const createBadge = screen.getByText('create');
    expect(createBadge).toHaveClass('px-2', 'py-1', 'text-xs', 'font-medium', 'rounded-full');
  });

  it('displays entity type and ID', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Member')).toBeInTheDocument();
    });
    
    expect(screen.getByText('#10')).toBeInTheDocument();
    expect(screen.getByText('#5')).toBeInTheDocument();
  });

  it('formats dates correctly', async () => {
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    // Check that dates are displayed (format may vary by locale)
    const dateElements = screen.getAllByText(/\d{1,2}\/\d{1,2}\/\d{4}/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it('resets to page 1 when filters change', async () => {
    const multiPageActivities = {
      ...mockActivities,
      pagination: {
        current_page: 2,
        per_page: 50,
        total: 100,
        last_page: 2,
        from: 51,
        to: 100,
      },
    };
    
    (activityApi.getActivities as jest.Mock).mockResolvedValue(multiPageActivities);
    
    renderActivityLog();
    
    await waitFor(() => {
      expect(screen.getByText('Created member Jane Smith')).toBeInTheDocument();
    });
    
    // Change filter
    const userSelect = screen.getByLabelText('User');
    fireEvent.change(userSelect, { target: { value: '1' } });
    
    // Should reset to page 1
    await waitFor(() => {
      expect(activityApi.getActivities).toHaveBeenCalledWith(
        expect.objectContaining({ user_id: 1, page: 1 })
      );
    });
  });
});
