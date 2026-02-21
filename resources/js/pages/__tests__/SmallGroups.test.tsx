import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SmallGroups from '../SmallGroups';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { smallGroupApi } from '../../lib/smallGroupApi';

// Mock the hooks
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../contexts/ToastContext', () => ({
  useToast: jest.fn(),
}));

// Mock the API
jest.mock('../../lib/smallGroupApi');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockSmallGroupApi = smallGroupApi as jest.Mocked<typeof smallGroupApi>;

// Mock data
const mockSmallGroups = [
  {
    id: 1,
    name: 'Young Adults',
    description: 'Fellowship for young adults aged 18-30',
    leader_name: 'John Doe',
    meeting_day: 'Friday',
    meeting_time: '7:00 PM',
    location: 'Church Hall',
    member_count: 15,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Seniors Fellowship',
    description: 'Community for senior members',
    leader_name: 'Jane Smith',
    meeting_day: 'Wednesday',
    meeting_time: '10:00 AM',
    location: 'Community Center',
    member_count: 8,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const mockShowToast = jest.fn();

describe('SmallGroups Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({ showToast: mockShowToast, toasts: [], removeToast: jest.fn() });
  });

  describe('Page Structure', () => {
    it('should render page title and description', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue([]);

      render(<SmallGroups />);

      expect(screen.getByText('Small Groups')).toBeInTheDocument();
      expect(screen.getByText('Manage fellowship groups and community connections')).toBeInTheDocument();
    });

    it('should show "Add Small Group" button for admin users', async () => {
      mockUseAuth.mockReturnValue({ 
        user: { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false
      });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue([]);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Add Small Group')).toBeInTheDocument();
      });
    });

    it('should not show "Add Small Group" button for non-admin users', async () => {
      mockUseAuth.mockReturnValue({ 
        user: { id: 2, name: 'Staff', email: 'staff@example.com', role: 'staff' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false
      });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue([]);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.queryByText('Add Small Group')).not.toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading message while fetching data', () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      mockSmallGroupApi.getSmallGroups.mockImplementation(() => 
        new Promise(() => {}) // Never resolves
      );

      render(<SmallGroups />);

      expect(screen.getByText('Loading small groups...')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no small groups exist', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue([]);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText(/No small groups yet/)).toBeInTheDocument();
      });
    });

    it('should show helpful message for admin in empty state', async () => {
      mockUseAuth.mockReturnValue({ 
        user: { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false
      });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue([]);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText(/Click "Add Small Group" to create one/)).toBeInTheDocument();
      });
    });
  });

  describe('Small Groups List', () => {
    it('should display list of small groups with member counts', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockSmallGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        // Check group names
        expect(screen.getByText('Young Adults')).toBeInTheDocument();
        expect(screen.getByText('Seniors Fellowship')).toBeInTheDocument();

        // Check leader names
        expect(screen.getByText('Led by John Doe')).toBeInTheDocument();
        expect(screen.getByText('Led by Jane Smith')).toBeInTheDocument();

        // Check member counts (Validates Requirement 8.5)
        const memberCounts = screen.getAllByText(/\d+/);
        expect(memberCounts.some(el => el.textContent === '15')).toBe(true);
        expect(memberCounts.some(el => el.textContent === '8')).toBe(true);
      });
    });

    it('should display group descriptions', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockSmallGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Fellowship for young adults aged 18-30')).toBeInTheDocument();
        expect(screen.getByText('Community for senior members')).toBeInTheDocument();
      });
    });

    it('should display meeting details', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockSmallGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Fridays at 7:00 PM')).toBeInTheDocument();
        expect(screen.getByText('Wednesdays at 10:00 AM')).toBeInTheDocument();
        expect(screen.getByText('Church Hall')).toBeInTheDocument();
        expect(screen.getByText('Community Center')).toBeInTheDocument();
      });
    });

    it('should display member count as 0 when not provided', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      const groupsWithoutCount = [
        {
          ...mockSmallGroups[0],
          member_count: undefined,
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(groupsWithoutCount);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('0')).toBeInTheDocument();
      });
    });
  });

  describe('Admin Actions', () => {
    it('should show edit and delete buttons for admin users', async () => {
      mockUseAuth.mockReturnValue({ 
        user: { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false
      });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockSmallGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        const editButtons = screen.getAllByText('Edit');
        const deleteButtons = screen.getAllByText('Delete');
        
        expect(editButtons).toHaveLength(2);
        expect(deleteButtons).toHaveLength(2);
      });
    });

    it('should not show edit and delete buttons for non-admin users', async () => {
      mockUseAuth.mockReturnValue({ 
        user: { id: 2, name: 'Staff', email: 'staff@example.com', role: 'staff' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false
      });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockSmallGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.queryByText('Edit')).not.toBeInTheDocument();
        expect(screen.queryByText('Delete')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      mockSmallGroupApi.getSmallGroups.mockRejectedValue(new Error('API Error'));

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText(/No small groups yet/)).toBeInTheDocument();
      });

      consoleError.mockRestore();
    });
  });

  describe('Responsive Layout', () => {
    it('should render groups in a grid layout', async () => {
      mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn(), loading: false });
      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockSmallGroups);

      const { container } = render(<SmallGroups />);

      await waitFor(() => {
        const grid = container.querySelector('.grid');
        expect(grid).toBeInTheDocument();
        expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
      });
    });
  });
});
