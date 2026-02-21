import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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

const mockShowToast = jest.fn();

/**
 * Integration tests for Small Groups member count accuracy
 * 
 * Tests that member counts are displayed accurately and update correctly.
 * 
 * Validates Requirements: 8.5
 */
describe('SmallGroups - Member Count Accuracy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToast.mockReturnValue({ showToast: mockShowToast });
    mockUseAuth.mockReturnValue({
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      isLoading: false,
    });
  });

  describe('Member Count Display', () => {
    it('should display accurate member count for each small group', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Young Adults',
          description: 'Fellowship for young adults',
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
          description: 'Community for seniors',
          leader_name: 'Jane Smith',
          meeting_day: 'Wednesday',
          meeting_time: '10:00 AM',
          location: 'Community Center',
          member_count: 8,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 3,
          name: 'Youth Ministry',
          description: 'Group for teenagers',
          leader_name: 'Bob Johnson',
          meeting_day: 'Saturday',
          meeting_time: '3:00 PM',
          location: 'Youth Center',
          member_count: 22,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        // Verify each group displays its member count
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('22')).toBeInTheDocument();
      });
    });

    it('should display zero member count for groups with no members', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'New Group',
          description: 'Recently created group',
          leader_name: 'Leader Name',
          meeting_day: 'Monday',
          meeting_time: '6:00 PM',
          location: 'Main Hall',
          member_count: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('0')).toBeInTheDocument();
      });
    });

    it('should display zero when member_count is undefined', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'Test Leader',
          meeting_day: 'Tuesday',
          meeting_time: '7:00 PM',
          location: 'Test Location',
          member_count: undefined,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('0')).toBeInTheDocument();
      });
    });

    it('should display member count with user icon', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'Test Leader',
          meeting_day: 'Wednesday',
          meeting_time: '7:00 PM',
          location: 'Test Location',
          member_count: 10,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      const { container } = render(<SmallGroups />);

      await waitFor(() => {
        // Check for the member count badge with icon
        const badge = container.querySelector('.bg-blue-50.text-blue-700');
        expect(badge).toBeInTheDocument();
        expect(badge?.textContent).toContain('10');
      });
    });
  });

  describe('Member Count Consistency', () => {
    it('should display consistent member counts across multiple groups', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Group A',
          description: 'Description A',
          leader_name: 'Leader A',
          meeting_day: 'Monday',
          meeting_time: '6:00 PM',
          location: 'Location A',
          member_count: 5,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'Group B',
          description: 'Description B',
          leader_name: 'Leader B',
          meeting_day: 'Tuesday',
          meeting_time: '7:00 PM',
          location: 'Location B',
          member_count: 5,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 3,
          name: 'Group C',
          description: 'Description C',
          leader_name: 'Leader C',
          meeting_day: 'Wednesday',
          meeting_time: '8:00 PM',
          location: 'Location C',
          member_count: 5,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        const memberCounts = screen.getAllByText('5');
        expect(memberCounts).toHaveLength(3);
      });
    });

    it('should handle large member counts correctly', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Large Group',
          description: 'A very large group',
          leader_name: 'Leader Name',
          meeting_day: 'Sunday',
          meeting_time: '9:00 AM',
          location: 'Main Sanctuary',
          member_count: 150,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('150')).toBeInTheDocument();
      });
    });

    it('should display member count as integer (not decimal)', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'Test Leader',
          meeting_day: 'Thursday',
          meeting_time: '7:00 PM',
          location: 'Test Location',
          member_count: 7,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        const memberCountText = screen.getByText('7');
        expect(memberCountText).toBeInTheDocument();
        // Ensure it's not displayed as "7.0" or similar
        expect(memberCountText.textContent).toBe('7');
      });
    });
  });

  describe('Member Count Updates', () => {
    it('should display updated member counts when data changes', async () => {
      const initialGroups = [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'Test Leader',
          meeting_day: 'Friday',
          meeting_time: '7:00 PM',
          location: 'Test Location',
          member_count: 10,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(initialGroups);

      const { unmount } = render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('10')).toBeInTheDocument();
      });

      // Unmount and remount with updated data
      unmount();

      // Simulate member count change
      const updatedGroups = [
        {
          ...initialGroups[0],
          member_count: 12,
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(updatedGroups);

      // Render component again (simulating page reload)
      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('12')).toBeInTheDocument();
      });
    });

    it('should call API to get fresh member counts on mount', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'Test Leader',
          meeting_day: 'Saturday',
          meeting_time: '7:00 PM',
          location: 'Test Location',
          member_count: 5,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(mockSmallGroupApi.getSmallGroups).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Member Count Edge Cases', () => {
    it('should handle null member_count gracefully', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'Test Leader',
          meeting_day: 'Sunday',
          meeting_time: '7:00 PM',
          location: 'Test Location',
          member_count: null as any,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('0')).toBeInTheDocument();
      });
    });

    it('should display member counts for all groups even when some have zero members', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Active Group',
          description: 'Has members',
          leader_name: 'Leader 1',
          meeting_day: 'Monday',
          meeting_time: '6:00 PM',
          location: 'Location 1',
          member_count: 10,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'Empty Group',
          description: 'No members yet',
          leader_name: 'Leader 2',
          meeting_day: 'Tuesday',
          meeting_time: '7:00 PM',
          location: 'Location 2',
          member_count: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 3,
          name: 'Another Active Group',
          description: 'Also has members',
          leader_name: 'Leader 3',
          meeting_day: 'Wednesday',
          meeting_time: '8:00 PM',
          location: 'Location 3',
          member_count: 5,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      render(<SmallGroups />);

      await waitFor(() => {
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
      });
    });

    it('should maintain member count display during loading states', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'Test Leader',
          meeting_day: 'Thursday',
          meeting_time: '7:00 PM',
          location: 'Test Location',
          member_count: 8,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(mockGroups), 50);
          })
      );

      render(<SmallGroups />);

      // Should show loading state first
      expect(screen.getByText('Loading small groups...')).toBeInTheDocument();

      // Then show member count after loading
      await waitFor(() => {
        expect(screen.getByText('8')).toBeInTheDocument();
      });
    });
  });

  describe('Member Count Visual Presentation', () => {
    it('should display member count in a badge-style component', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'Test Leader',
          meeting_day: 'Friday',
          meeting_time: '7:00 PM',
          location: 'Test Location',
          member_count: 12,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      const { container } = render(<SmallGroups />);

      await waitFor(() => {
        // Check for badge styling
        const badge = container.querySelector('.bg-blue-50');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('text-blue-700');
        expect(badge?.textContent).toContain('12');
      });
    });

    it('should display member count prominently for each group card', async () => {
      const mockGroups = [
        {
          id: 1,
          name: 'Group 1',
          description: 'Description 1',
          leader_name: 'Leader 1',
          meeting_day: 'Monday',
          meeting_time: '6:00 PM',
          location: 'Location 1',
          member_count: 7,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'Group 2',
          description: 'Description 2',
          leader_name: 'Leader 2',
          meeting_day: 'Tuesday',
          meeting_time: '7:00 PM',
          location: 'Location 2',
          member_count: 14,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      mockSmallGroupApi.getSmallGroups.mockResolvedValue(mockGroups);

      const { container } = render(<SmallGroups />);

      await waitFor(() => {
        const badges = container.querySelectorAll('.bg-blue-50');
        expect(badges).toHaveLength(2);
      });
    });
  });
});
