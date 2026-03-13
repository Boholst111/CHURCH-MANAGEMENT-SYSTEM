import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Users from '../Users';
import { userApi } from '../../lib/userApi';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the userApi
jest.mock('../../lib/userApi', () => ({
  userApi: {
    getUsers: jest.fn(),
    getInvitations: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
  },
}));

// Mock the InviteUserModal component
jest.mock('../../components/users/InviteUserModal', () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) => 
    isOpen ? <div data-testid="invite-user-modal">Invite User Modal</div> : null,
}));

// Mock the UserForm component
jest.mock('../../components/users/UserForm', () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) => 
    isOpen ? <div data-testid="user-form-modal">User Form Modal</div> : null,
}));

// Mock the UserPermissionsModal component
jest.mock('../../components/users/UserPermissionsModal', () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) => 
    isOpen ? <div data-testid="user-permissions-modal">User Permissions Modal</div> : null,
}));

// Mock the ArchiveButton component
jest.mock('../../components/archive/ArchiveButton', () => ({
  __esModule: true,
  default: () => <button data-testid="archive-button">Archive</button>,
}));

const mockUsers = [
  {
    id: 1,
    name: 'John Admin',
    email: 'john@example.com',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Jane Staff',
    email: 'jane@example.com',
    role: 'staff',
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: 'Bob Readonly',
    email: 'bob@example.com',
    role: 'readonly',
    created_at: '2024-01-03T00:00:00Z',
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('Users Page Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (userApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (userApi.getInvitations as jest.Mock).mockResolvedValue([]);
  });

  describe('Page Header', () => {
    it('should render page title and subtitle', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('Users')).toBeInTheDocument();
      });

      expect(screen.getByText('Manage system users and permissions')).toBeInTheDocument();
    });

    it('should render Add User button', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
      });
    });

    it('should render Invite User button', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /invite user/i })).toBeInTheDocument();
      });
    });
  });

  describe('Filter Bar', () => {
    it('should render search input', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search by name or email...')).toBeInTheDocument();
      });
    });

    it('should render role filter dropdown', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        const roleSelects = screen.getAllByRole('combobox');
        expect(roleSelects.length).toBeGreaterThan(0);
      });
    });

    it('should render status filter dropdown', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        const statusSelects = screen.getAllByRole('combobox');
        expect(statusSelects.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Users Table', () => {
    it('should render table with correct headers', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('User')).toBeInTheDocument();
      });

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
      expect(screen.getByText('Permissions')).toBeInTheDocument();
      expect(screen.getByText('Last Login')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('should render user data in table rows', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Jane Staff')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bob Readonly')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    });

    it('should render role badges with correct labels', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument();
      });

      expect(screen.getByText('Staff')).toBeInTheDocument();
      expect(screen.getByText('Read-Only')).toBeInTheDocument();
    });

    it('should render action buttons for each user', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        const archiveButtons = screen.getAllByTestId('archive-button');
        expect(archiveButtons).toHaveLength(3);
      });
    });
  });

  describe('Search Functionality', () => {
    it('should filter users by name', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      await user.type(searchInput, 'Jane');

      await waitFor(() => {
        expect(screen.getByText('Jane Staff')).toBeInTheDocument();
        expect(screen.queryByText('John Admin')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob Readonly')).not.toBeInTheDocument();
      });
    });

    it('should filter users by email', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      await user.type(searchInput, 'bob@');

      await waitFor(() => {
        expect(screen.getByText('Bob Readonly')).toBeInTheDocument();
        expect(screen.queryByText('John Admin')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane Staff')).not.toBeInTheDocument();
      });
    });

    it('should show no results message when search has no matches', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      await user.type(searchInput, 'nonexistent');

      await waitFor(() => {
        expect(screen.getByText('No users found matching your filters')).toBeInTheDocument();
      });
    });
  });

  describe('Role Filter', () => {
    it('should have role filter dropdown with correct options', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('All Roles')).toBeInTheDocument();
      });

      // Verify the role filter is present
      const roleSelects = screen.getAllByRole('combobox');
      expect(roleSelects.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner while fetching users', () => {
      (userApi.getUsers as jest.Mock).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      renderWithProviders(<Users />);

      // Use getAllByText since the Spinner component has multiple instances of the text
      const loadingElements = screen.getAllByText('Loading users...');
      expect(loadingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no users exist', async () => {
      (userApi.getUsers as jest.Mock).mockResolvedValue([]);

      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('No users found')).toBeInTheDocument();
      });
    });
  });

  describe('Modal Interactions', () => {
    it('should open user form modal when Add User button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
      });

      const addButton = screen.getByRole('button', { name: /add user/i });
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.getByTestId('user-form-modal')).toBeInTheDocument();
      });
    });

    it('should open invite user modal when Invite User button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /invite user/i })).toBeInTheDocument();
      });

      const inviteButton = screen.getByRole('button', { name: /invite user/i });
      await user.click(inviteButton);

      await waitFor(() => {
        expect(screen.getByTestId('invite-user-modal')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should render with proper spacing classes', async () => {
      const { container } = renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('Users')).toBeInTheDocument();
      });

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass('space-y-6');
    });

    it('should have responsive grid for filters', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search by name or email...')).toBeInTheDocument();
      });

      const filterGrid = screen.getByPlaceholderText('Search by name or email...').closest('.grid');
      expect(filterGrid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
    });
  });
});
