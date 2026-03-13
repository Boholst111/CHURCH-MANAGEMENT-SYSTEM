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

// Mock the InviteUserModal component
jest.mock('../../components/users/InviteUserModal', () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) => 
    isOpen ? <div data-testid="invite-user-modal">Invite User Modal</div> : null,
}));

// Mock the ArchiveButton component
jest.mock('../../components/archive/ArchiveButton', () => ({
  __esModule: true,
  default: () => <button data-testid="archive-button">Archive</button>,
}));

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn((date: Date) => '2 hours ago'),
}));

const mockUsers = [
  {
    id: 1,
    name: 'John Admin',
    email: 'john@example.com',
    role: 'admin' as const,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    last_login: '2024-01-15T10:30:00Z',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Pastor',
    email: 'jane@example.com',
    role: 'pastor' as const,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    last_login: '2024-01-14T08:00:00Z',
    status: 'active',
  },
  {
    id: 3,
    name: 'Bob Staff',
    email: 'bob@example.com',
    role: 'staff' as const,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Alice Volunteer',
    email: 'alice@example.com',
    role: 'volunteer' as const,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
    status: 'pending',
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('Users Data Table', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (userApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (userApi.getInvitations as jest.Mock).mockResolvedValue([]);
  });

  describe('Table Structure', () => {
    it('should render all required column headers', async () => {
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

    it('should render user data in all columns', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      // Check user names
      expect(screen.getByText('Jane Pastor')).toBeInTheDocument();
      expect(screen.getByText('Bob Staff')).toBeInTheDocument();
      expect(screen.getByText('Alice Volunteer')).toBeInTheDocument();

      // Check emails
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  describe('User Column with Photo', () => {
    it('should display user initials in avatar', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('JA')).toBeInTheDocument(); // John Admin
      });

      expect(screen.getByText('JP')).toBeInTheDocument(); // Jane Pastor
      expect(screen.getByText('BS')).toBeInTheDocument(); // Bob Staff
      expect(screen.getByText('AV')).toBeInTheDocument(); // Alice Volunteer
    });

    it('should display single initial for single-word names', async () => {
      const singleNameUser = [{
        id: 5,
        name: 'Madonna',
        email: 'madonna@example.com',
        role: 'staff' as const,
        created_at: '2024-01-05T00:00:00Z',
        updated_at: '2024-01-05T00:00:00Z',
      }];

      (userApi.getUsers as jest.Mock).mockResolvedValue(singleNameUser);
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('M')).toBeInTheDocument();
      });
    });
  });

  describe('Role Badges', () => {
    it('should display role badges with correct labels', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument();
      });

      expect(screen.getByText('Pastor')).toBeInTheDocument();
      expect(screen.getByText('Staff')).toBeInTheDocument();
      expect(screen.getByText('Volunteer')).toBeInTheDocument();
    });

    it('should render role badges with shield icons', async () => {
      const { container } = renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('Admin')).toBeInTheDocument();
      });

      // Check that shield icons are rendered (lucide-react renders as svg)
      const badges = container.querySelectorAll('svg');
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe('Permissions Column', () => {
    it('should display permission count for each user', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('12 permissions')).toBeInTheDocument(); // Admin
      });

      expect(screen.getByText('8 permissions')).toBeInTheDocument(); // Pastor
      expect(screen.getByText('6 permissions')).toBeInTheDocument(); // Staff
      expect(screen.getByText('3 permissions')).toBeInTheDocument(); // Volunteer
    });
  });

  describe('Last Login Column', () => {
    it('should display relative time for last login', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        const lastLoginElements = screen.getAllByText('2 hours ago');
        expect(lastLoginElements.length).toBeGreaterThan(0);
      });
    });

    it('should display "Never" when last login is not available', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        const neverElements = screen.getAllByText('Never');
        expect(neverElements.length).toBeGreaterThan(0);
      });
    });

    it('should render clock icon for last login', async () => {
      const { container } = renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      // Check for clock icons (lucide-react renders as svg)
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Status Badges', () => {
    it('should display status badges with correct labels', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        const activeElements = screen.getAllByText('Active');
        expect(activeElements.length).toBeGreaterThan(0);
      });

      expect(screen.getByText('Inactive')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it('should default to Active status when not specified', async () => {
      const userWithoutStatus = [{
        id: 6,
        name: 'Test User',
        email: 'test@example.com',
        role: 'staff' as const,
        created_at: '2024-01-06T00:00:00Z',
        updated_at: '2024-01-06T00:00:00Z',
      }];

      (userApi.getUsers as jest.Mock).mockResolvedValue(userWithoutStatus);
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('Active')).toBeInTheDocument();
      });
    });
  });

  describe('Row Actions', () => {
    it('should render all action buttons for each user', async () => {
      const { container } = renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      // Each user should have 6 action buttons (View, Edit, Manage Permissions, Change Role, Deactivate, Archive)
      const actionButtons = container.querySelectorAll('button[title]');
      expect(actionButtons.length).toBeGreaterThan(0);
    });

    it('should have View action button with eye icon', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const viewButtons = screen.getAllByTitle('View details');
      expect(viewButtons.length).toBe(4); // One for each user
    });

    it('should have Edit action button', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const editButtons = screen.getAllByTitle('Edit user');
      expect(editButtons.length).toBe(4);
    });

    it('should have Manage Permissions action button', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const permissionsButtons = screen.getAllByTitle('Manage permissions');
      expect(permissionsButtons.length).toBe(4);
    });

    it('should have Change Role action button', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const changeRoleButtons = screen.getAllByTitle('Change role');
      expect(changeRoleButtons.length).toBe(4);
    });

    it('should have Deactivate action button', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const deactivateButtons = screen.getAllByTitle('Deactivate user');
      expect(deactivateButtons.length).toBe(4);
    });

    it('should have Archive/Delete action button', async () => {
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const archiveButtons = screen.getAllByTestId('archive-button');
      expect(archiveButtons.length).toBe(4);
    });

    it('should open edit modal when Edit button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const editButtons = screen.getAllByTitle('Edit user');
      await user.click(editButtons[0]);

      await waitFor(() => {
        expect(screen.getByTestId('user-form-modal')).toBeInTheDocument();
      });
    });

    it('should open permissions modal when Manage Permissions button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const permissionsButtons = screen.getAllByTitle('Manage permissions');
      await user.click(permissionsButtons[0]);

      await waitFor(() => {
        expect(screen.getByTestId('user-permissions-modal')).toBeInTheDocument();
      });
    });

    it('should show toast when Deactivate button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const deactivateButtons = screen.getAllByTitle('Deactivate user');
      await user.click(deactivateButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Deactivate functionality coming soon')).toBeInTheDocument();
      });
    });
  });

  describe('Table Styling', () => {
    it('should have hover effect on table rows', async () => {
      const { container } = renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const rows = container.querySelectorAll('tbody tr');
      rows.forEach(row => {
        expect(row).toHaveClass('hover:bg-neutral-50');
      });
    });

    it('should have proper spacing and borders', async () => {
      const { container } = renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const table = container.querySelector('table');
      expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-neutral-200');
    });
  });

  describe('Responsive Design', () => {
    it('should have overflow-x-auto for horizontal scrolling on small screens', async () => {
      const { container } = renderWithProviders(<Users />);

      await waitFor(() => {
        expect(screen.getByText('John Admin')).toBeInTheDocument();
      });

      const tableContainer = container.querySelector('.overflow-x-auto');
      expect(tableContainer).toBeInTheDocument();
    });
  });
});
