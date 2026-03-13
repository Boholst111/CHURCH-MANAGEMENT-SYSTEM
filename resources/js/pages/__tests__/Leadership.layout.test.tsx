import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Leadership from '../Leadership';
import { leadershipApi } from '../../lib/leadershipApi';

// Mock the API
jest.mock('../../lib/leadershipApi', () => ({
  leadershipApi: {
    getLeadership: jest.fn(),
    createLeadership: jest.fn(),
    updateLeadership: jest.fn(),
    deleteLeadership: jest.fn(),
  },
}));

// Mock the contexts
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../contexts/ToastContext', () => ({
  useToast: jest.fn(),
}));

// Mock child components
jest.mock('../../components/leadership/ProfileCard', () => ({
  __esModule: true,
  default: ({ leadership }: any) => (
    <div data-testid={`profile-card-${leadership.id}`}>
      {leadership.first_name} {leadership.last_name}
    </div>
  ),
}));

jest.mock('../../components/leadership/LeadershipForm', () => ({
  __esModule: true,
  default: () => <div data-testid="leadership-form">Form</div>,
}));

jest.mock('../../components/leadership/DeleteLeadershipDialog', () => ({
  __esModule: true,
  default: () => <div data-testid="delete-dialog">Delete Dialog</div>,
}));

describe('Leadership Page Layout', () => {
  const mockShowToast = jest.fn();
  
  const mockLeadershipData = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      role: 'Senior Pastor',
      department: 'Pastoral',
      email: 'john@church.com',
      phone: '123-456-7890',
      photo_url: null,
      bio: 'Bio text',
      start_date: '2020-01-01',
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      role: 'Worship Leader',
      department: 'Worship',
      email: 'jane@church.com',
      phone: '123-456-7891',
      photo_url: null,
      bio: 'Bio text',
      start_date: '2021-01-01',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    const { useAuth } = require('../../contexts/AuthContext');
    const { useToast } = require('../../contexts/ToastContext');
    
    useAuth.mockReturnValue({
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      loading: false,
    });
    
    useToast.mockReturnValue({
      showToast: mockShowToast,
      toasts: [],
    });
  });

  describe('Page Header', () => {
    it('should render page title "Leadership"', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue([]);
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.getByText('Leadership')).toBeInTheDocument();
      });
    });

    it('should render subtitle "Church leadership structure and roles"', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue([]);
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.getByText('Church leadership structure and roles')).toBeInTheDocument();
      });
    });

    it('should render "Add Leader" button for admin users', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue([]);
      
      const { useAuth } = require('../../contexts/AuthContext');
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Admin', role: 'admin' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /add leader/i })).toBeInTheDocument();
      });
    });

    it('should not render "Add Leader" button for non-admin users', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue([]);
      
      const { useAuth } = require('../../contexts/AuthContext');
      useAuth.mockReturnValue({
        user: { id: 2, name: 'User', role: 'user' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /add leader/i })).not.toBeInTheDocument();
      });
    });
  });

  describe('Grid Layout', () => {
    it('should render leader cards in a grid layout', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue(mockLeadershipData);
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.getByTestId('profile-card-1')).toBeInTheDocument();
        expect(screen.getByTestId('profile-card-2')).toBeInTheDocument();
      });
    });

    it('should display all leadership profiles', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue(mockLeadershipData);
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading state while fetching data', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve([]), 100))
      );
      
      render(<Leadership />);
      
      expect(screen.getByText('Loading leadership profiles...')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.queryByText('Loading leadership profiles...')).not.toBeInTheDocument();
      });
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no leadership profiles exist', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue([]);
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.getByText('No Leadership Profiles')).toBeInTheDocument();
      });
    });

    it('should show helpful message for admin users in empty state', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue([]);
      
      const { useAuth } = require('../../contexts/AuthContext');
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Admin', role: 'admin' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.getByText(/get started by adding your first leadership profile/i)).toBeInTheDocument();
      });
    });

    it('should show "Add First Leader" button in empty state for admin', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue([]);
      
      const { useAuth } = require('../../contexts/AuthContext');
      useAuth.mockReturnValue({
        user: { id: 1, name: 'Admin', role: 'admin' },
        login: jest.fn(),
        logout: jest.fn(),
        loading: false,
      });
      
      render(<Leadership />);
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /add first leader/i })).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should apply responsive grid classes', async () => {
      (leadershipApi.getLeadership as jest.Mock).mockResolvedValue(mockLeadershipData);
      
      const { container } = render(<Leadership />);
      
      await waitFor(() => {
        const gridContainer = container.querySelector('.grid');
        expect(gridContainer).toHaveClass('grid-cols-1');
        expect(gridContainer).toHaveClass('md:grid-cols-2');
        expect(gridContainer).toHaveClass('lg:grid-cols-3');
      });
    });
  });
});
