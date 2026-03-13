import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Users from '../Users';
import { userApi } from '../../lib/userApi';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the userApi
jest.mock('../../lib/userApi');

const mockUserApi = userApi as jest.Mocked<typeof userApi>;

/**
 * Helper function to render Users page with required providers
 */
const renderUsers = () => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <Users />
      </ToastProvider>
    </BrowserRouter>
  );
};

describe('Users Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render page title and description', () => {
    mockUserApi.getUsers.mockResolvedValue([]);
    
    renderUsers();
    
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Manage system users and permissions')).toBeInTheDocument();
  });

  it('should render Add User button', () => {
    mockUserApi.getUsers.mockResolvedValue([]);
    
    renderUsers();
    
    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
  });

  it('should display loading state while fetching users', () => {
    mockUserApi.getUsers.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    renderUsers();
    
    // Check for spinner with loading label
    const spinner = screen.getByRole('status', { name: /loading users/i });
    expect(spinner).toBeInTheDocument();
  });

  it('should display users list when data is loaded', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Admin',
        email: 'john@example.com',
        role: 'admin' as const,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        name: 'Jane Staff',
        email: 'jane@example.com',
        role: 'staff' as const,
        created_at: '2024-01-02T00:00:00.000Z',
        updated_at: '2024-01-02T00:00:00.000Z',
      },
    ];

    mockUserApi.getUsers.mockResolvedValue(mockUsers);
    
    renderUsers();
    
    await waitFor(() => {
      expect(screen.getByText('John Admin')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Jane Staff')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  it('should display role badges with correct labels', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' as const,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        name: 'Staff User',
        email: 'staff@example.com',
        role: 'staff' as const,
        created_at: '2024-01-02T00:00:00.000Z',
        updated_at: '2024-01-02T00:00:00.000Z',
      },
      {
        id: 3,
        name: 'ReadOnly User',
        email: 'readonly@example.com',
        role: 'readonly' as const,
        created_at: '2024-01-03T00:00:00.000Z',
        updated_at: '2024-01-03T00:00:00.000Z',
      },
    ];

    mockUserApi.getUsers.mockResolvedValue(mockUsers);
    
    renderUsers();
    
    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Staff')).toBeInTheDocument();
      expect(screen.getByText('Read-Only')).toBeInTheDocument();
    });
  });

  it('should display empty state when no users exist', async () => {
    mockUserApi.getUsers.mockResolvedValue([]);
    
    renderUsers();
    
    await waitFor(() => {
      expect(screen.getByText('No users found')).toBeInTheDocument();
    });
  });

  it('should display user initials in avatar circles', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Alice Anderson',
        email: 'alice@example.com',
        role: 'admin' as const,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      },
    ];

    mockUserApi.getUsers.mockResolvedValue(mockUsers);
    
    renderUsers();
    
    await waitFor(() => {
      expect(screen.getByText('AA')).toBeInTheDocument(); // First and last initials
    });
  });

  it('should display last login time', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'staff' as const,
        created_at: '2024-01-15T00:00:00.000Z',
        updated_at: '2024-01-15T00:00:00.000Z',
      },
    ];

    mockUserApi.getUsers.mockResolvedValue(mockUsers);
    
    renderUsers();
    
    await waitFor(() => {
      // Should show "Never" when last_login is not available
      expect(screen.getByText('Never')).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    mockUserApi.getUsers.mockRejectedValue(new Error('API Error'));
    
    renderUsers();
    
    await waitFor(() => {
      expect(screen.getByText('No users found')).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });
});
