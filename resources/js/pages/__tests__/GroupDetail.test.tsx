import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import GroupDetail from '../GroupDetail';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { smallGroupApi } from '../../lib/smallGroupApi';

// Mock the API
jest.mock('../../lib/smallGroupApi');
const mockSmallGroupApi = smallGroupApi as jest.Mocked<typeof smallGroupApi>;

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

/**
 * Helper function to render component with providers
 */
const renderWithProviders = (ui: React.ReactElement, { route = '/small-groups/1' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/small-groups/:id" element={ui} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

const mockGroup = {
  id: 1,
  name: 'Young Adults Fellowship',
  description: 'A group for young adults to grow in faith together',
  leader_name: 'John Doe',
  leader_photo: 'https://example.com/john.jpg',
  meeting_day: 'Friday',
  meeting_time: '7:00 PM',
  location: 'Church Hall A',
  member_count: 15,
  members: [
    { id: 1, name: 'Jane Smith', photo: 'https://example.com/jane.jpg' },
    { id: 2, name: 'Bob Johnson', photo: null },
    { id: 3, name: 'Alice Williams', photo: 'https://example.com/alice.jpg' },
  ],
  status: 'active' as const,
  image: 'https://example.com/group.jpg',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('GroupDetail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should display loading spinner while fetching group details', () => {
      mockSmallGroupApi.getSmallGroup.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      renderWithProviders(<GroupDetail />);

      expect(screen.getByText(/loading group details/i)).toBeInTheDocument();
    });
  });

  describe('Hero Section', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should display group name in hero section', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Young Adults Fellowship')).toBeInTheDocument();
      });
    });

    it('should display active status badge', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Active')).toBeInTheDocument();
      });
    });

    it('should display inactive status badge for inactive groups', async () => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue({
        ...mockGroup,
        status: 'inactive',
      });

      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Inactive')).toBeInTheDocument();
      });
    });

    it('should display leader information', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Led by')).toBeInTheDocument();
        const leaderNames = screen.getAllByText('John Doe');
        expect(leaderNames.length).toBeGreaterThan(0);
      });
    });

    it('should display member count', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('15 members')).toBeInTheDocument();
      });
    });

    it('should display meeting schedule', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        const scheduleTexts = screen.getAllByText(/Fridays at 7:00 PM/i);
        expect(scheduleTexts.length).toBeGreaterThan(0);
      });
    });

    it('should display location', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        const locationTexts = screen.getAllByText('Church Hall A');
        expect(locationTexts.length).toBeGreaterThan(0);
      });
    });

    it('should display group image when available', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        const image = screen.getByAltText('Young Adults Fellowship');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/group.jpg');
      });
    });
  });

  describe('Tab Navigation', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should display all tab options', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
        expect(screen.getByText('Members')).toBeInTheDocument();
        const scheduleTexts = screen.getAllByText('Schedule');
        expect(scheduleTexts.length).toBeGreaterThan(0);
        expect(screen.getByText('Resources')).toBeInTheDocument();
        expect(screen.getByText('Activity')).toBeInTheDocument();
      });
    });

    it('should show Overview tab as active by default', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        const overviewTab = screen.getByRole('button', { name: /overview/i });
        expect(overviewTab).toHaveClass('border-primary-600');
      });
    });

    it('should switch to Members tab when clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const membersTab = screen.getByRole('button', { name: /members/i });
      await user.click(membersTab);

      expect(membersTab).toHaveClass('border-primary-600');
      expect(screen.getByText(/Members \(3\)/i)).toBeInTheDocument();
    });

    it('should switch to Schedule tab when clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const scheduleTab = screen.getByRole('button', { name: /schedule/i });
      await user.click(scheduleTab);

      expect(scheduleTab).toHaveClass('border-primary-600');
      expect(screen.getByText('Upcoming Meetings')).toBeInTheDocument();
    });
  });

  describe('Overview Tab', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should display group description', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('About This Group')).toBeInTheDocument();
        expect(
          screen.getByText('A group for young adults to grow in faith together')
        ).toBeInTheDocument();
      });
    });

    it('should display meeting details section', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Meeting Details')).toBeInTheDocument();
        const scheduleTexts = screen.getAllByText('Schedule');
        expect(scheduleTexts.length).toBeGreaterThan(0);
        const locationTexts = screen.getAllByText('Location');
        expect(locationTexts.length).toBeGreaterThan(0);
        expect(screen.getByText('Leader')).toBeInTheDocument();
      });
    });

    it('should show placeholder when no description available', async () => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue({
        ...mockGroup,
        description: null,
      });

      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('No description available.')).toBeInTheDocument();
      });
    });
  });

  describe('Members Tab', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should display member count in header', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const membersTab = screen.getByRole('button', { name: /members/i });
      await user.click(membersTab);

      expect(screen.getByText(/Members \(3\)/i)).toBeInTheDocument();
    });

    it('should display all members', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const membersTab = screen.getByRole('button', { name: /members/i });
      await user.click(membersTab);

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.getByText('Alice Williams')).toBeInTheDocument();
    });

    it('should show empty state when no members', async () => {
      const user = userEvent.setup();
      mockSmallGroupApi.getSmallGroup.mockResolvedValue({
        ...mockGroup,
        members: [],
        member_count: 0,
      });

      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const membersTab = screen.getByRole('button', { name: /members/i });
      await user.click(membersTab);

      expect(screen.getByText('No members in this group yet.')).toBeInTheDocument();
    });
  });

  describe('Schedule Tab', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should display upcoming meetings section', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const scheduleTab = screen.getByRole('button', { name: /schedule/i });
      await user.click(scheduleTab);

      expect(screen.getByText('Upcoming Meetings')).toBeInTheDocument();
    });

    it('should display past meetings section', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const scheduleTab = screen.getByRole('button', { name: /schedule/i });
      await user.click(scheduleTab);

      expect(screen.getByText('Past Meetings')).toBeInTheDocument();
    });
  });

  describe('Resources Tab', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should display empty state for resources', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const resourcesTab = screen.getByRole('button', { name: /resources/i });
      await user.click(resourcesTab);

      expect(screen.getByText('No Resources Yet')).toBeInTheDocument();
      expect(
        screen.getByText('Study materials and shared documents will appear here.')
      ).toBeInTheDocument();
    });
  });

  describe('Activity Tab', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should display empty state for activity', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
      });

      const activityTab = screen.getByRole('button', { name: /activity/i });
      await user.click(activityTab);

      expect(screen.getByText('No Activity Yet')).toBeInTheDocument();
      expect(
        screen.getByText('Recent activities and attendance history will appear here.')
      ).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should display back button', async () => {
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Back to Small Groups')).toBeInTheDocument();
      });
    });

    it('should navigate back to small groups list when back button clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Back to Small Groups')).toBeInTheDocument();
      });

      const backButton = screen.getByText('Back to Small Groups');
      await user.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith('/small-groups');
    });
  });

  describe('Error Handling', () => {
    it('should navigate back to small groups list when group not found', async () => {
      mockSmallGroupApi.getSmallGroup.mockRejectedValue(new Error('Not found'));

      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/small-groups');
      });
    });
  });

  describe('Responsive Design', () => {
    beforeEach(() => {
      mockSmallGroupApi.getSmallGroup.mockResolvedValue(mockGroup);
    });

    it('should render properly on mobile viewport', async () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));

      renderWithProviders(<GroupDetail />);

      await waitFor(() => {
        expect(screen.getByText('Young Adults Fellowship')).toBeInTheDocument();
      });

      // Hero section should be visible
      expect(screen.getByText('Led by')).toBeInTheDocument();
      
      // Tabs should be scrollable
      const tabContainer = screen.getByText('Overview').parentElement?.parentElement;
      expect(tabContainer).toHaveClass('overflow-x-auto');
    });
  });
});
