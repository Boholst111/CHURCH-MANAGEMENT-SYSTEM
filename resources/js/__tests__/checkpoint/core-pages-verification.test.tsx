/**
 * Task 11: Checkpoint - Verify Core Pages
 * 
 * This test suite verifies that the core pages (Login, Dashboard, Members, 
 * Small Groups, and Leadership) are functioning correctly:
 * - Navigation between pages works
 * - Data loads correctly from API
 * - Responsive behavior on mobile and tablet
 * - CRUD operations function properly
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import App from '../../App';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import Members from '../../pages/Members';
import SmallGroups from '../../pages/SmallGroups';
import Leadership from '../../pages/Leadership';
import Layout from '../../components/Layout';
import api from '../../lib/api';

// Mock API
jest.mock('../../lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

// Mock data
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
    address: '123 Main St',
    city: 'Manila',
    status: 'active' as const,
    small_group_id: 1,
    date_joined: '2024-01-01',
    birth_date: '1990-01-01',
    gender: 'male' as const,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    small_group: {
      id: 1,
      name: 'Group A',
    },
    membership_type: 'regular' as const,
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    address: '456 Oak Ave',
    city: 'Quezon City',
    status: 'active' as const,
    small_group_id: 2,
    date_joined: '2024-01-15',
    birth_date: '1992-05-15',
    gender: 'female' as const,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
    small_group: {
      id: 2,
      name: 'Group B',
    },
    membership_type: 'associate' as const,
  },
];

const mockSmallGroups = [
  {
    id: 1,
    name: 'Group A',
    description: 'A great small group',
    leader_name: 'John Leader',
    leader_photo: null,
    meeting_day: 'Wednesday',
    meeting_time: '7:00 PM',
    location: 'Room 101',
    member_count: 12,
    status: 'active' as const,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: 2,
    name: 'Group B',
    description: 'Another great group',
    leader_name: 'Jane Leader',
    leader_photo: null,
    meeting_day: 'Thursday',
    meeting_time: '6:00 PM',
    location: 'Room 202',
    member_count: 8,
    status: 'active' as const,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
];

const mockLeaders = [
  {
    id: 1,
    first_name: 'Pastor',
    last_name: 'John',
    role: 'Senior Pastor',
    department: 'Leadership',
    email: 'pastor@example.com',
    phone: '555-0001',
    photo_url: null,
    bio: 'Leading the church for 10 years',
    start_date: '2014-01-01',
  },
  {
    id: 2,
    first_name: 'Elder',
    last_name: 'Jane',
    role: 'Associate Pastor',
    department: 'Worship',
    email: 'elder@example.com',
    phone: '555-0002',
    photo_url: null,
    bio: 'Passionate about worship ministry',
    start_date: '2018-06-01',
  },
];

const mockDashboardStats = {
  total_members: 150,
  upcoming_events: 5,
  new_visitors: 12,
  active_groups: 8,
  total_offerings: 125450,
  total_expenses: 89320,
  net_income: 36130,
};

// Helper to render with providers
const renderWithProviders = (component: React.ReactElement, initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <ToastProvider>
          {component}
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Task 11: Core Pages Verification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    
    // Setup default API mocks
    mockedApi.get.mockImplementation((url: string) => {
      if (url.includes('/dashboard/stats')) {
        return Promise.resolve({ data: mockDashboardStats });
      }
      if (url.includes('/members')) {
        return Promise.resolve({ data: { data: mockMembers, total: mockMembers.length } });
      }
      if (url.includes('/small-groups')) {
        return Promise.resolve({ data: { data: mockSmallGroups, total: mockSmallGroups.length } });
      }
      if (url.includes('/leadership')) {
        return Promise.resolve({ data: { data: mockLeaders, total: mockLeaders.length } });
      }
      return Promise.resolve({ data: {} });
    });

    mockedApi.post.mockResolvedValue({ data: { success: true } });
    mockedApi.put.mockResolvedValue({ data: { success: true } });
    mockedApi.delete.mockResolvedValue({ data: { success: true } });
  });

  describe('1. Navigation Tests', () => {
    test('should navigate from Login to Dashboard after successful login', async () => {
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: mockUser,
          token: 'test-token',
        },
      });

      renderWithProviders(<App />, '/login');

      // Fill in login form
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in|login/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      // Should redirect to dashboard
      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });
    });

    test('should navigate between core pages using sidebar', async () => {
      // Set authenticated user
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));

      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Wait for dashboard to load
      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Find and click Members link in sidebar
      const membersLink = screen.getByRole('link', { name: /members/i });
      expect(membersLink).toBeInTheDocument();
      expect(membersLink).toHaveAttribute('href', '/members');

      // Find and click Small Groups link
      const groupsLink = screen.getByRole('link', { name: /small groups/i });
      expect(groupsLink).toBeInTheDocument();
      expect(groupsLink).toHaveAttribute('href', '/small-groups');

      // Find and click Leadership link
      const leadershipLink = screen.getByRole('link', { name: /leadership/i });
      expect(leadershipLink).toBeInTheDocument();
      expect(leadershipLink).toHaveAttribute('href', '/leadership');
    });

    test('should highlight active page in sidebar navigation', async () => {
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));

      renderWithProviders(
        <Layout>
          <Members />
        </Layout>,
        '/members'
      );

      await waitFor(() => {
        const membersLink = screen.getByRole('link', { name: /members/i });
        // Active link should have specific styling (check for active class or aria-current)
        expect(membersLink).toHaveClass(/active|bg-primary/);
      });
    });
  });

  describe('2. Data Loading Tests', () => {
    beforeEach(() => {
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
    });

    test('Dashboard should load stats from API', async () => {
      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      await waitFor(() => {
        expect(mockedApi.get).toHaveBeenCalledWith(expect.stringContaining('/dashboard/stats'));
      });

      // Check if stats are displayed
      await waitFor(() => {
        expect(screen.getByText(/150/)).toBeInTheDocument(); // total_members
        expect(screen.getByText(/5/)).toBeInTheDocument(); // upcoming_events
      });
    });

    test('Members page should load members data from API', async () => {
      renderWithProviders(
        <Layout>
          <Members />
        </Layout>
      );

      await waitFor(() => {
        expect(mockedApi.get).toHaveBeenCalledWith(expect.stringContaining('/members'));
      });

      // Check if members are displayed
      await waitFor(() => {
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
      });
    });

    test('Small Groups page should load groups data from API', async () => {
      renderWithProviders(
        <Layout>
          <SmallGroups />
        </Layout>
      );

      await waitFor(() => {
        expect(mockedApi.get).toHaveBeenCalledWith(expect.stringContaining('/small-groups'));
      });

      // Check if groups are displayed
      await waitFor(() => {
        expect(screen.getByText('Group A')).toBeInTheDocument();
        expect(screen.getByText('Group B')).toBeInTheDocument();
      });
    });

    test('Leadership page should load leaders data from API', async () => {
      renderWithProviders(
        <Layout>
          <Leadership />
        </Layout>
      );

      await waitFor(() => {
        expect(mockedApi.get).toHaveBeenCalledWith(expect.stringContaining('/leadership'));
      });

      // Check if leaders are displayed
      await waitFor(() => {
        expect(screen.getByText(/Pastor/)).toBeInTheDocument();
        expect(screen.getByText(/Elder/)).toBeInTheDocument();
      });
    });

    test('should show loading state while fetching data', async () => {
      // Delay API response
      mockedApi.get.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ data: { data: [] } }), 100))
      );

      renderWithProviders(
        <Layout>
          <Members />
        </Layout>
      );

      // Should show loading indicator
      expect(screen.getByRole('status') || screen.getByText(/loading/i)).toBeInTheDocument();

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      }, { timeout: 2000 });
    });

    test('should handle API errors gracefully', async () => {
      mockedApi.get.mockRejectedValueOnce(new Error('API Error'));

      renderWithProviders(
        <Layout>
          <Members />
        </Layout>
      );

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText(/error|failed/i)).toBeInTheDocument();
      });
    });
  });

  describe('3. Responsive Behavior Tests', () => {
    beforeEach(() => {
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
    });

    test('should render mobile layout at 375px width', () => {
      // Mock window.innerWidth
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));

      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Mobile menu button should be visible
      const menuButton = screen.getByRole('button', { name: /menu|toggle/i });
      expect(menuButton).toBeInTheDocument();
    });

    test('should render tablet layout at 768px width', () => {
      global.innerWidth = 768;
      global.dispatchEvent(new Event('resize'));

      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Layout should adapt to tablet size
      const container = screen.getByRole('main') || document.querySelector('main');
      expect(container).toBeInTheDocument();
    });

    test('should render desktop layout at 1024px width', () => {
      global.innerWidth = 1024;
      global.dispatchEvent(new Event('resize'));

      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      // Sidebar should be visible on desktop
      const sidebar = screen.getByRole('navigation') || document.querySelector('nav');
      expect(sidebar).toBeInTheDocument();
    });

    test('mobile sidebar should toggle open/close', async () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));

      renderWithProviders(
        <Layout>
          <Dashboard />
        </Layout>
      );

      const menuButton = screen.getByRole('button', { name: /menu|toggle/i });
      
      // Open sidebar
      fireEvent.click(menuButton);
      await waitFor(() => {
        const sidebar = screen.getByRole('navigation');
        expect(sidebar).toHaveClass(/open|visible/);
      });

      // Close sidebar
      fireEvent.click(menuButton);
      await waitFor(() => {
        const sidebar = screen.getByRole('navigation');
        expect(sidebar).not.toHaveClass(/open|visible/);
      });
    });
  });

  describe('4. CRUD Operations Tests', () => {
    beforeEach(() => {
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
    });

    describe('Members CRUD', () => {
      test('should create a new member', async () => {
        mockedApi.post.mockResolvedValueOnce({
          data: {
            id: 3,
            first_name: 'New',
            last_name: 'Member',
            email: 'new@example.com',
            status: 'active',
          },
        });

        renderWithProviders(
          <Layout>
            <Members />
          </Layout>
        );

        // Wait for page to load
        await waitFor(() => {
          expect(screen.getByText('John')).toBeInTheDocument();
        });

        // Click Add Member button
        const addButton = screen.getByRole('button', { name: /add member/i });
        fireEvent.click(addButton);

        // Modal should open
        await waitFor(() => {
          expect(screen.getByRole('dialog') || screen.getByText(/add member/i)).toBeInTheDocument();
        });

        // Fill form (simplified - actual implementation may vary)
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/email/i);
        
        fireEvent.change(firstNameInput, { target: { value: 'New' } });
        fireEvent.change(lastNameInput, { target: { value: 'Member' } });
        fireEvent.change(emailInput, { target: { value: 'new@example.com' } });

        // Submit form
        const submitButton = screen.getByRole('button', { name: /save|submit/i });
        fireEvent.click(submitButton);

        // Should call API
        await waitFor(() => {
          expect(mockedApi.post).toHaveBeenCalledWith(
            expect.stringContaining('/members'),
            expect.objectContaining({
              first_name: 'New',
              last_name: 'Member',
              email: 'new@example.com',
            })
          );
        });
      });

      test('should read/display member details', async () => {
        renderWithProviders(
          <Layout>
            <Members />
          </Layout>
        );

        await waitFor(() => {
          expect(screen.getByText('John')).toBeInTheDocument();
          expect(screen.getByText('john@example.com')).toBeInTheDocument();
          expect(screen.getByText('123-456-7890')).toBeInTheDocument();
        });
      });

      test('should update an existing member', async () => {
        mockedApi.put.mockResolvedValueOnce({
          data: {
            id: 1,
            first_name: 'John',
            last_name: 'Doe Updated',
            email: 'john.updated@example.com',
          },
        });

        renderWithProviders(
          <Layout>
            <Members />
          </Layout>
        );

        await waitFor(() => {
          expect(screen.getByText('John')).toBeInTheDocument();
        });

        // Click Edit button for first member
        const editButtons = screen.getAllByRole('button', { name: /edit/i });
        fireEvent.click(editButtons[0]);

        // Modal should open with existing data
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        // Update last name
        const lastNameInput = screen.getByLabelText(/last name/i);
        fireEvent.change(lastNameInput, { target: { value: 'Doe Updated' } });

        // Submit
        const submitButton = screen.getByRole('button', { name: /save|update/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(mockedApi.put).toHaveBeenCalledWith(
            expect.stringContaining('/members/1'),
            expect.objectContaining({
              last_name: 'Doe Updated',
            })
          );
        });
      });

      test('should delete a member', async () => {
        mockedApi.delete.mockResolvedValueOnce({ data: { success: true } });

        renderWithProviders(
          <Layout>
            <Members />
          </Layout>
        );

        await waitFor(() => {
          expect(screen.getByText('John')).toBeInTheDocument();
        });

        // Click Delete/Archive button
        const deleteButtons = screen.getAllByRole('button', { name: /delete|archive/i });
        fireEvent.click(deleteButtons[0]);

        // Confirm deletion
        await waitFor(() => {
          const confirmButton = screen.getByRole('button', { name: /confirm|yes/i });
          fireEvent.click(confirmButton);
        });

        await waitFor(() => {
          expect(mockedApi.delete).toHaveBeenCalledWith(
            expect.stringContaining('/members/1')
          );
        });
      });
    });

    describe('Small Groups CRUD', () => {
      test('should create a new small group', async () => {
        mockedApi.post.mockResolvedValueOnce({
          data: {
            id: 3,
            name: 'New Group',
            leader: 'New Leader',
            status: 'active',
          },
        });

        renderWithProviders(
          <Layout>
            <SmallGroups />
          </Layout>
        );

        await waitFor(() => {
          expect(screen.getByText('Group A')).toBeInTheDocument();
        });

        const addButton = screen.getByRole('button', { name: /create group|add group/i });
        fireEvent.click(addButton);

        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: 'New Group' } });

        const submitButton = screen.getByRole('button', { name: /save|submit/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(mockedApi.post).toHaveBeenCalledWith(
            expect.stringContaining('/small-groups'),
            expect.objectContaining({
              name: 'New Group',
            })
          );
        });
      });

      test('should display small group details', async () => {
        renderWithProviders(
          <Layout>
            <SmallGroups />
          </Layout>
        );

        await waitFor(() => {
          expect(screen.getByText('Group A')).toBeInTheDocument();
          expect(screen.getByText('John Leader')).toBeInTheDocument();
          expect(screen.getByText(/12/)).toBeInTheDocument(); // member count
        });
      });
    });

    describe('Leadership CRUD', () => {
      test('should create a new leader', async () => {
        mockedApi.post.mockResolvedValueOnce({
          data: {
            id: 3,
            first_name: 'New',
            last_name: 'Leader',
            role: 'Youth Pastor',
          },
        });

        renderWithProviders(
          <Layout>
            <Leadership />
          </Layout>
        );

        await waitFor(() => {
          expect(screen.getByText(/Pastor/)).toBeInTheDocument();
        });

        const addButton = screen.getByRole('button', { name: /add leader/i });
        fireEvent.click(addButton);

        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        const firstNameInput = screen.getByLabelText(/first name/i);
        fireEvent.change(firstNameInput, { target: { value: 'New' } });

        const submitButton = screen.getByRole('button', { name: /save|submit/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(mockedApi.post).toHaveBeenCalledWith(
            expect.stringContaining('/leadership'),
            expect.objectContaining({
              first_name: 'New',
            })
          );
        });
      });

      test('should display leader details', async () => {
        renderWithProviders(
          <Layout>
            <Leadership />
          </Layout>
        );

        await waitFor(() => {
          expect(screen.getByText(/Pastor/)).toBeInTheDocument();
          expect(screen.getByText('Senior Pastor')).toBeInTheDocument();
          expect(screen.getByText('pastor@example.com')).toBeInTheDocument();
        });
      });
    });
  });

  describe('5. Integration Tests', () => {
    beforeEach(() => {
      localStorage.setItem('auth_token', 'test-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
    });

    test('complete workflow: login -> dashboard -> members -> create member', async () => {
      // Step 1: Login
      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: mockUser,
          token: 'test-token',
        },
      });

      const { rerender } = renderWithProviders(<App />, '/login');

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /sign in|login/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      // Step 2: Should be on Dashboard
      await waitFor(() => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
      });

      // Step 3: Navigate to Members
      rerender(
        <MemoryRouter initialEntries={['/members']}>
          <AuthProvider>
            <ToastProvider>
              <Layout>
                <Members />
              </Layout>
            </ToastProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText('John')).toBeInTheDocument();
      });

      // Step 4: Create new member
      mockedApi.post.mockResolvedValueOnce({
        data: {
          id: 3,
          name: 'Workflow Test Member',
          email: 'workflow@example.com',
        },
      });

      const addButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Success!
      expect(true).toBe(true);
    });
  });
});
