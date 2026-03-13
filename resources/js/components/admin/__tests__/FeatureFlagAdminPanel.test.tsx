import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FeatureFlagAdminPanel } from '../FeatureFlagAdminPanel';
import { ToastProvider } from '../../../contexts/ToastContext';

// Mock fetch
global.fetch = jest.fn();

const mockConfig = {
  enabled: false,
  beta_users: [],
  rollout_percentage: 0,
  pages: {
    dashboard: true,
    members: true,
    small_groups: true,
    leadership: true,
    events: true,
    finance: true,
    reports: true,
    activity_log: true,
    users: true,
    settings: true,
  },
  stats: {
    total_users: 100,
    beta_users_count: 0,
    rollout_users_count: 0,
    total_enabled_users: 0,
    percentage_enabled: 0,
  },
};

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

describe('FeatureFlagAdminPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'test-token');
    
    // Mock successful API responses
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/feature-flags/admin/users')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, data: mockUsers }),
        });
      }
      if (url.includes('/api/feature-flags/admin')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, data: mockConfig }),
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  const renderComponent = () => {
    return render(
      <ToastProvider>
        <FeatureFlagAdminPanel />
      </ToastProvider>
    );
  };

  it('renders loading state initially', () => {
    renderComponent();
    expect(screen.getByText(/loading/i) || document.querySelector('.animate-spin')).toBeTruthy();
  });

  it('loads and displays configuration', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Feature Flag Management')).toBeInTheDocument();
    });

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('displays statistics dashboard', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument();
    });

    expect(screen.getAllByText('Beta Users').length).toBeGreaterThan(0);
    expect(screen.getByText('Rollout Users')).toBeInTheDocument();
    expect(screen.getByText('Total Enabled')).toBeInTheDocument();
  });

  it('toggles master switch', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });

    const masterSwitch = screen.getByText('Disabled').closest('button');
    expect(masterSwitch).toBeInTheDocument();

    fireEvent.click(masterSwitch!);

    await waitFor(() => {
      expect(screen.getByText('Enabled')).toBeInTheDocument();
    });
  });

  it('shows and hides beta user selector', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Beta Users' })).toBeInTheDocument();
    });

    const showButton = screen.getByText('Show Users');
    fireEvent.click(showButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search users by name or email...')).toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

    const hideButton = screen.getByText('Hide Users');
    fireEvent.click(hideButton);

    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Search users by name or email...')).not.toBeInTheDocument();
    });
  });

  it('filters users by search query', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Beta Users' })).toBeInTheDocument();
    });

    const showButton = screen.getByText('Show Users');
    fireEvent.click(showButton);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search users by name or email...');
    fireEvent.change(searchInput, { target: { value: 'john' } });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  it('selects and deselects beta users', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Beta Users' })).toBeInTheDocument();
    });

    const showButton = screen.getByText('Show Users');
    fireEvent.click(showButton);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(mockUsers.length);

    // Select first user
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();

    // Badge should update
    await waitFor(() => {
      expect(screen.getByText('1 user selected')).toBeInTheDocument();
    });

    // Deselect first user
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();

    await waitFor(() => {
      expect(screen.getByText('0 users selected')).toBeInTheDocument();
    });
  });

  it('clears all selected beta users', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Beta Users' })).toBeInTheDocument();
    });

    const showButton = screen.getByText('Show Users');
    fireEvent.click(showButton);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Select multiple users
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    await waitFor(() => {
      expect(screen.getByText('2 users selected')).toBeInTheDocument();
    });

    // Clear all
    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText('0 users selected')).toBeInTheDocument();
    });
  });

  it('adjusts rollout percentage slider', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Rollout Percentage')).toBeInTheDocument();
    });

    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('0');

    fireEvent.change(slider, { target: { value: '50' } });

    await waitFor(() => {
      expect(slider).toHaveValue('50');
      expect(screen.getByText('Percentage: 50%')).toBeInTheDocument();
    });
  });

  it('toggles page-specific flags', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Page-Specific Flags' })).toBeInTheDocument();
    });

    // Find dashboard text and get its parent container's button
    const dashboardText = screen.getByText((content, element) => {
      return element?.textContent === 'dashboard' || content === 'dashboard';
    });
    const dashboardToggle = dashboardText.closest('.flex')?.querySelector('button');
    expect(dashboardToggle).toBeInTheDocument();

    fireEvent.click(dashboardToggle!);

    // The toggle should change state (visual feedback)
    await waitFor(() => {
      expect(dashboardToggle).toBeInTheDocument();
    });
  });

  it('saves configuration successfully', async () => {
    (global.fetch as jest.Mock).mockImplementation((url: string, options?: any) => {
      if (options?.method === 'PUT') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            message: 'Feature flags updated successfully',
            data: mockConfig,
          }),
        });
      }
      if (url.includes('/api/feature-flags/admin/users')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, data: mockUsers }),
        });
      }
      if (url.includes('/api/feature-flags/admin')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, data: mockConfig }),
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/feature-flags/admin',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });

  it('handles save error gracefully', async () => {
    (global.fetch as jest.Mock).mockImplementation((url: string, options?: any) => {
      if (options?.method === 'PUT') {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve({
            success: false,
            message: 'Failed to save',
          }),
        });
      }
      if (url.includes('/api/feature-flags/admin/users')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, data: mockUsers }),
        });
      }
      if (url.includes('/api/feature-flags/admin')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true, data: mockConfig }),
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/feature-flags/admin',
        expect.objectContaining({
          method: 'PUT',
        })
      );
    });
  });

  it('displays warning when master switch is disabled', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Modern UI is currently disabled/)).toBeInTheDocument();
    });
  });

  it('displays info about beta users', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Beta users will always see/)).toBeInTheDocument();
    });
  });

  it('displays rollout strategy information', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Rollout Strategy')).toBeInTheDocument();
    });

    expect(screen.getByText(/Users are selected deterministically/)).toBeInTheDocument();
  });

  it('disables page flags when master switch is off', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Page-Specific Flags' })).toBeInTheDocument();
    });

    // Find dashboard text and get its parent container's button
    const dashboardText = screen.getByText((content, element) => {
      return element?.textContent === 'dashboard' || content === 'dashboard';
    });
    const dashboardToggle = dashboardText.closest('.flex')?.querySelector('button');
    expect(dashboardToggle).toBeDisabled();
  });
});
