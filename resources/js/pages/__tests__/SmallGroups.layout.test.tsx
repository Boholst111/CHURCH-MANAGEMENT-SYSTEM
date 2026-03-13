import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SmallGroups from '../SmallGroups';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { smallGroupApi } from '../../lib/smallGroupApi';

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
jest.mock('../../lib/smallGroupApi', () => ({
  smallGroupApi: {
    getSmallGroups: jest.fn(),
    createSmallGroup: jest.fn(),
    updateSmallGroup: jest.fn(),
  },
}));

// Mock the SmallGroupForm component
jest.mock('../../components/smallgroups/SmallGroupForm', () => ({
  __esModule: true,
  default: () => <div data-testid="small-group-form">Small Group Form</div>,
}));

// Mock the ArchiveButton component
jest.mock('../../components/archive/ArchiveButton', () => ({
  __esModule: true,
  default: () => <button data-testid="archive-button">Archive</button>,
}));

const mockSmallGroups = [
  {
    id: 1,
    name: 'Youth Group',
    description: 'A group for young adults',
    leader_name: 'John Doe',
    meeting_day: 'Friday',
    meeting_time: '7:00 PM',
    location: 'Church Hall',
    member_count: 15,
  },
  {
    id: 2,
    name: 'Bible Study',
    description: 'Weekly Bible study sessions',
    leader_name: 'Jane Smith',
    meeting_day: 'Wednesday',
    meeting_time: '6:30 PM',
    location: 'Room 101',
    member_count: 8,
  },
];

describe('SmallGroups Page Layout', () => {
  const mockUser = { id: 1, name: 'Test User', role: 'admin' };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock useAuth to return admin user by default
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
    });
  });

  describe('Page Header', () => {
    it('should render page title and subtitle', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      render(<SmallGroups />);

      expect(screen.getByText('Small Groups')).toBeInTheDocument();
      expect(screen.getByText('Manage small groups and their members')).toBeInTheDocument();
    });

    it('should render "Create Group" button for admin users', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /create group/i })).toBeInTheDocument();
      });
    });

    it('should not render "Create Group" button for non-admin users', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      (useAuth as jest.Mock).mockReturnValue({
        user: { id: 1, name: 'Test User', role: 'member' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      
      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /create group/i })).not.toBeInTheDocument();
      });
    });
  });

  describe('View Toggle', () => {
    it('should render Grid View and List View toggle buttons', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Grid View')).toBeInTheDocument();
        expect(screen.getByText('List View')).toBeInTheDocument();
      });
    });

    it('should default to Grid View', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      render(<SmallGroups />);

      await waitFor(() => {
        const gridButton = screen.getByText('Grid View').closest('button');
        expect(gridButton).toHaveClass('bg-white', 'text-primary-600');
      });
    });

    it('should switch to List View when clicked', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Youth Group')).toBeInTheDocument();
      });

      const listViewButton = screen.getByText('List View').closest('button');
      fireEvent.click(listViewButton!);

      expect(listViewButton).toHaveClass('bg-white', 'text-primary-600');
    });

    it('should switch back to Grid View when clicked', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Youth Group')).toBeInTheDocument();
      });

      // Switch to List View
      const listViewButton = screen.getByText('List View').closest('button');
      fireEvent.click(listViewButton!);

      // Switch back to Grid View
      const gridViewButton = screen.getByText('Grid View').closest('button');
      fireEvent.click(gridViewButton!);

      expect(gridViewButton).toHaveClass('bg-white', 'text-primary-600');
    });
  });

  describe('Responsive Grid Layout', () => {
    it('should render groups in a grid layout by default', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      const { container } = render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Youth Group')).toBeInTheDocument();
      });

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
    });

    it('should render groups in a list layout when List View is selected', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      const { container } = render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Youth Group')).toBeInTheDocument();
      });

      // Switch to List View
      const listViewButton = screen.getByText('List View').closest('button');
      fireEvent.click(listViewButton!);

      const listContainer = container.querySelector('.space-y-4');
      expect(listContainer).toBeInTheDocument();
    });

    it('should display all group information in cards', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue(mockSmallGroups);
      
      render(<SmallGroups />);

      await waitFor(() => {
        // Check first group
        expect(screen.getByText('Youth Group')).toBeInTheDocument();
        expect(screen.getByText('Led by John Doe')).toBeInTheDocument();
        expect(screen.getByText(/Fridays at 7:00 PM/)).toBeInTheDocument();
        expect(screen.getByText('Church Hall')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();

        // Check second group
        expect(screen.getByText('Bible Study')).toBeInTheDocument();
        expect(screen.getByText('Led by Jane Smith')).toBeInTheDocument();
        expect(screen.getByText(/Wednesdays at 6:30 PM/)).toBeInTheDocument();
        expect(screen.getByText('Room 101')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should display loading spinner while fetching groups', () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );
      
      render(<SmallGroups />);

      expect(screen.getByText('Loading small groups...')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should display empty state when no groups exist', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue([]);
      
      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('No Small Groups Yet')).toBeInTheDocument();
        expect(screen.getByText('Get started by creating your first small group.')).toBeInTheDocument();
      });
    });

    it('should show different message for non-admin users in empty state', async () => {
      (smallGroupApi.getSmallGroups as jest.Mock).mockResolvedValue([]);
      (useAuth as jest.Mock).mockReturnValue({
        user: { id: 1, name: 'Test User', role: 'member' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      
      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('Check back later for small group opportunities.')).toBeInTheDocument();
      });
    });
  });
});
