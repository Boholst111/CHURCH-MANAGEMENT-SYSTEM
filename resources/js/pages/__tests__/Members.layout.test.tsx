import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Members from '../Members';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import api from '../../lib/api';

// Mock the AuthContext
jest.mock('../../contexts/AuthContext', () => {
  const actual = jest.requireActual('../../contexts/AuthContext');
  return {
    ...actual,
    useAuth: jest.fn(),
  };
});

// Mock the ToastContext
jest.mock('../../contexts/ToastContext', () => {
  const actual = jest.requireActual('../../contexts/ToastContext');
  return {
    ...actual,
    useToast: jest.fn(() => ({
      showToast: jest.fn(),
    })),
  };
});

// Mock the API
jest.mock('../../lib/api');

// Mock the member API
jest.mock('../../lib/memberApi', () => ({
  memberApi: {
    exportMembers: jest.fn(),
  },
}));

// Mock child components
jest.mock('../../components/members/MemberTable', () => ({
  __esModule: true,
  default: ({ members, isLoading }: any) => (
    <div data-testid="member-table">
      {isLoading ? 'Loading...' : `${members.length} members`}
    </div>
  ),
}));

jest.mock('../../components/members/MemberForm', () => ({
  __esModule: true,
  default: () => <div data-testid="member-form">Member Form</div>,
}));

jest.mock('../../components/members/DeleteMemberDialog', () => ({
  __esModule: true,
  default: () => <div data-testid="delete-dialog">Delete Dialog</div>,
}));

const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'admin',
};

const mockMembers = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    membership_type: 'regular',
    status: 'active',
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    membership_type: 'associate',
    status: 'active',
  },
];

const mockSmallGroups = [
  { id: 1, name: 'Group 1' },
  { id: 2, name: 'Group 2' },
];

describe('Members Page Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock useAuth to return admin user by default
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
    });
    
    // Mock API responses
    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/small-groups')) {
        return Promise.resolve({
          data: {
            success: true,
            data: mockSmallGroups,
          },
        });
      }
      if (url.includes('/members')) {
        return Promise.resolve({
          data: {
            success: true,
            data: mockMembers,
            pagination: {
              last_page: 1,
            },
          },
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  it('renders page header with correct title and subtitle', async () => {
    render(<Members />);

    await waitFor(() => {
      expect(screen.getByText('Members')).toBeInTheDocument();
      expect(screen.getByText('Manage church members and their information')).toBeInTheDocument();
    });
  });

  it('renders action buttons in header (Add Member, Import, Export)', async () => {
    render(<Members />);

    await waitFor(() => {
      expect(screen.getByText('Add Member')).toBeInTheDocument();
      expect(screen.getByText('Import')).toBeInTheDocument();
      expect(screen.getByText('Export')).toBeInTheDocument();
    });
  });

  it('renders filter bar with search input', async () => {
    render(<Members />);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search members...');
      expect(searchInput).toBeInTheDocument();
    });
  });

  it('renders status filter dropdown', async () => {
    render(<Members />);

    await waitFor(() => {
      // The Select component renders a button with the selected value
      const statusFilter = screen.getByText('All Status');
      expect(statusFilter).toBeInTheDocument();
    });
  });

  it('renders membership type filter dropdown', async () => {
    render(<Members />);

    await waitFor(() => {
      const membershipTypeFilter = screen.getByText('All Types');
      expect(membershipTypeFilter).toBeInTheDocument();
    });
  });

  it('renders small group filter dropdown', async () => {
    render(<Members />);

    await waitFor(() => {
      const smallGroupFilter = screen.getByText('All Small Groups');
      expect(smallGroupFilter).toBeInTheDocument();
    });
  });

  it('renders member table component', async () => {
    render(<Members />);

    await waitFor(() => {
      expect(screen.getByTestId('member-table')).toBeInTheDocument();
    });
  });

  it('loads and displays members data', async () => {
    render(<Members />);

    await waitFor(() => {
      expect(screen.getByText('2 members')).toBeInTheDocument();
    });
  });

  it('loads small groups for filter dropdown', async () => {
    render(<Members />);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/small-groups');
    });
  });

  it('applies responsive layout classes', async () => {
    const { container } = render(<Members />);

    await waitFor(() => {
      // Check for responsive grid classes in filter bar
      const filterCard = container.querySelector('.grid');
      expect(filterCard).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    });
  });

  it('hides action buttons for readonly users', async () => {
    // Mock useAuth to return readonly user
    (useAuth as jest.Mock).mockReturnValue({
      user: { ...mockUser, role: 'readonly' },
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
    });
    
    render(<Members />);

    await waitFor(() => {
      expect(screen.queryByText('Add Member')).not.toBeInTheDocument();
      expect(screen.queryByText('Import')).not.toBeInTheDocument();
      // Export should still be visible
      expect(screen.getByText('Export')).toBeInTheDocument();
    });
  });
});
