import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Leadership from '../Leadership';
import { useAuth, AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';
import { leadershipApi } from '../../lib/leadershipApi';
import { Leadership as LeadershipType } from '../../components/leadership/LeadershipForm';

jest.mock('../../lib/leadershipApi');

const mockLeadershipApi = leadershipApi as jest.Mocked<typeof leadershipApi>;

const mockLeadershipData: LeadershipType[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    role: 'Senior Pastor',
    department: 'Pastoral',
    email: 'john.doe@church.com',
    phone: '123-456-7890',
    photo_url: 'https://example.com/photo1.jpg',
    bio: 'A dedicated pastor',
    start_date: '2020-01-15',
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    role: 'Youth Pastor',
    department: 'Youth Ministry',
    email: 'jane.smith@church.com',
    phone: '098-765-4321',
    photo_url: null,
    bio: 'Passionate about youth',
    start_date: '2021-03-10',
  },
];

const renderWithProviders = (component: React.ReactElement, user: any) => {
  // Mock localStorage for AuthProvider
  if (user) {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
  return render(
    <AuthProvider>
      <ToastProvider>
        {component}
      </ToastProvider>
    </AuthProvider>
  );
};

describe('Leadership Page Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading and Display', () => {
    it('should display loading state initially', () => {
      mockLeadershipApi.getLeadership.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<Leadership />, { role: 'admin' });

      expect(screen.getByText('Loading leadership profiles...')).toBeInTheDocument();
    });

    it('should display leadership profiles after loading', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Senior Pastor')).toBeInTheDocument();
        expect(screen.getByText('Youth Pastor')).toBeInTheDocument();
      });
    });

    it('should display empty state when no leadership profiles exist', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue([]);

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText(/No leadership profiles yet/i)).toBeInTheDocument();
      });
    });

    it('should display error toast on load failure', async () => {
      mockLeadershipApi.getLeadership.mockRejectedValue(new Error('Network error'));

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText('Failed to load leadership profiles')).toBeInTheDocument();
      });
    });
  });

  describe('Admin Actions', () => {
    it('should show Add Leadership button for admin users', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Add Leadership/i })).toBeInTheDocument();
      });
    });

    it('should not show Add Leadership button for non-admin users', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'staff' });

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /Add Leadership/i })).not.toBeInTheDocument();
      });
    });

    it('should show edit and delete buttons for admin users', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        const editButtons = screen.getAllByRole('button', { name: /Edit/i });
        const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
        
        expect(editButtons).toHaveLength(2);
        expect(deleteButtons).toHaveLength(2);
      });
    });

    it('should not show edit and delete buttons for non-admin users', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'readonly' });

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /Edit/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Delete/i })).not.toBeInTheDocument();
      });
    });
  });

  describe('Create Leadership', () => {
    it('should open form dialog when Add Leadership button is clicked', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Add Leadership/i })).toBeInTheDocument();
      });

      const addButton = screen.getByRole('button', { name: /Add Leadership/i });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Leadership Profile')).toBeInTheDocument();
      });
    });

    it('should create new leadership profile successfully', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);
      mockLeadershipApi.createLeadership.mockResolvedValue({
        id: 3,
        first_name: 'Bob',
        last_name: 'Johnson',
        role: 'Worship Leader',
        department: 'Worship',
        email: 'bob@church.com',
        phone: '555-555-5555',
        photo_url: null,
        bio: null,
        start_date: '2023-01-01',
      });

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Add Leadership/i })).toBeInTheDocument();
      });

      const addButton = screen.getByRole('button', { name: /Add Leadership/i });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Leadership Profile')).toBeInTheDocument();
      });

      // Fill form
      fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Bob' } });
      fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Johnson' } });
      fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Worship Leader' } });
      fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Worship' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'bob@church.com' } });
      fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '555-555-5555' } });
      fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-01-01' } });

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLeadershipApi.createLeadership).toHaveBeenCalled();
        expect(screen.getByText('Leadership profile created successfully')).toBeInTheDocument();
      });
    });

    it('should display error toast on create failure', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);
      mockLeadershipApi.createLeadership.mockRejectedValue({
        response: {
          data: {
            message: 'Email already exists',
          },
        },
      });

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Add Leadership/i })).toBeInTheDocument();
      });

      const addButton = screen.getByRole('button', { name: /Add Leadership/i });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText('Add New Leadership Profile')).toBeInTheDocument();
      });

      // Fill form
      fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Bob' } });
      fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Johnson' } });
      fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Worship Leader' } });
      fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Worship' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'bob@church.com' } });
      fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '555-555-5555' } });

      const submitButton = screen.getByRole('button', { name: /Add Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });
    });
  });

  describe('Edit Leadership', () => {
    it('should open form dialog with existing data when Edit button is clicked', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const editButtons = screen.getAllByRole('button', { name: /Edit/i });
      fireEvent.click(editButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Edit Leadership Profile')).toBeInTheDocument();
        expect(screen.getByLabelText(/First Name/i)).toHaveValue('John');
        expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
      });
    });

    it('should update leadership profile successfully', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);
      mockLeadershipApi.updateLeadership.mockResolvedValue({
        ...mockLeadershipData[0],
        role: 'Lead Pastor',
      });

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const editButtons = screen.getAllByRole('button', { name: /Edit/i });
      fireEvent.click(editButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Edit Leadership Profile')).toBeInTheDocument();
      });

      // Update role
      fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Lead Pastor' } });

      const submitButton = screen.getByRole('button', { name: /Update Profile/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLeadershipApi.updateLeadership).toHaveBeenCalledWith(
          1,
          expect.objectContaining({
            role: 'Lead Pastor',
          }),
          null
        );
        expect(screen.getByText('Leadership profile updated successfully')).toBeInTheDocument();
      });
    });
  });

  describe('Delete Leadership', () => {
    it('should open delete confirmation dialog when Delete button is clicked', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Delete Leadership Profile')).toBeInTheDocument();
        expect(screen.getByText(/Are you sure you want to delete John Doe/i)).toBeInTheDocument();
      });
    });

    it('should delete leadership profile successfully', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);
      mockLeadershipApi.deleteLeadership.mockResolvedValue();

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Delete Leadership Profile')).toBeInTheDocument();
      });

      const confirmButton = screen.getByRole('button', { name: /Delete Profile/i });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockLeadershipApi.deleteLeadership).toHaveBeenCalledWith(1);
        expect(screen.getByText('Leadership profile deleted successfully')).toBeInTheDocument();
      });
    });

    it('should close dialog when Cancel button is clicked', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Delete Leadership Profile')).toBeInTheDocument();
      });

      const cancelButton = screen.getByRole('button', { name: /Cancel/i });
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText('Delete Leadership Profile')).not.toBeInTheDocument();
      });

      expect(mockLeadershipApi.deleteLeadership).not.toHaveBeenCalled();
    });

    it('should display error toast on delete failure', async () => {
      mockLeadershipApi.getLeadership.mockResolvedValue(mockLeadershipData);
      mockLeadershipApi.deleteLeadership.mockRejectedValue({
        response: {
          data: {
            message: 'Cannot delete leadership profile',
          },
        },
      });

      renderWithProviders(<Leadership />, { role: 'admin' });

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByText('Delete Leadership Profile')).toBeInTheDocument();
      });

      const confirmButton = screen.getByRole('button', { name: /Delete Profile/i });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(screen.getByText('Cannot delete leadership profile')).toBeInTheDocument();
      });
    });
  });
});
