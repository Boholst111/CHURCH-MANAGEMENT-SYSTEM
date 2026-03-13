import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Users from '../Users';
import { userApi } from '../../lib/userApi';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the userApi
jest.mock('../../lib/userApi', () => ({
  userApi: {
    getUsers: jest.fn(),
    getInvitations: jest.fn(),
    inviteUser: jest.fn(),
    resendInvitation: jest.fn(),
    cancelInvitation: jest.fn(),
  },
}));

// Mock the ArchiveButton component
jest.mock('../../components/archive/ArchiveButton', () => {
  return {
    __esModule: true,
    default: () => <button>Archive</button>,
  };
});

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin' as const,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const mockInvitations = [
  {
    id: 1,
    email: 'invited@example.com',
    role: 'staff' as const,
    status: 'pending' as const,
    invited_by: 'John Doe',
    invited_at: '2024-01-15T00:00:00Z',
    expires_at: '2024-01-22T00:00:00Z',
  },
];

describe('Users - Invite Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (userApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (userApi.getInvitations as jest.Mock).mockResolvedValue([]);
  });

  const renderComponent = () => {
    return render(
      <ToastProvider>
        <Users />
      </ToastProvider>
    );
  };

  it('should display Invite User button', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Invite User')).toBeInTheDocument();
    });
  });

  it('should open invite modal when Invite User button is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Invite User')).toBeInTheDocument();
    });

    const inviteButton = screen.getByText('Invite User');
    await user.click(inviteButton);

    await waitFor(() => {
      expect(screen.getByText('Send an invitation email to a new user')).toBeInTheDocument();
    });
  });

  it('should send invitation when form is submitted', async () => {
    const user = userEvent.setup();
    (userApi.inviteUser as jest.Mock).mockResolvedValue({
      id: 2,
      email: 'newuser@example.com',
      role: 'staff',
      status: 'pending',
      invited_by: 'John Doe',
      invited_at: '2024-01-15T00:00:00Z',
      expires_at: '2024-01-22T00:00:00Z',
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Invite User')).toBeInTheDocument();
    });

    // Open invite modal
    const inviteButton = screen.getByText('Invite User');
    await user.click(inviteButton);

    await waitFor(() => {
      expect(screen.getByText('Send an invitation email to a new user')).toBeInTheDocument();
    });

    // Fill in the form
    const emailInput = screen.getByPlaceholderText('user@example.com');
    await user.type(emailInput, 'newuser@example.com');

    // Submit the form
    const sendButton = screen.getByText('Send Invitation');
    await user.click(sendButton);

    await waitFor(() => {
      expect(userApi.inviteUser).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        role: 'staff', // Default role
      });
    });
  });

  it('should display pending invitations in a separate section', async () => {
    (userApi.getInvitations as jest.Mock).mockResolvedValue(mockInvitations);
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Pending Invitations/)).toBeInTheDocument();
    });

    expect(screen.getByText('invited@example.com')).toBeInTheDocument();
  });

  it('should allow resending an invitation', async () => {
    const user = userEvent.setup();
    (userApi.getInvitations as jest.Mock).mockResolvedValue(mockInvitations);
    (userApi.resendInvitation as jest.Mock).mockResolvedValue(mockInvitations[0]);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('invited@example.com')).toBeInTheDocument();
    });

    // Find the resend button (RefreshCw icon button)
    const invitationRow = screen.getByText('invited@example.com').closest('tr');
    const resendButton = within(invitationRow!).getByTitle('Resend invitation');
    
    await user.click(resendButton);

    await waitFor(() => {
      expect(userApi.resendInvitation).toHaveBeenCalledWith(1);
    });
  });

  it('should allow canceling an invitation', async () => {
    const user = userEvent.setup();
    (userApi.getInvitations as jest.Mock).mockResolvedValue(mockInvitations);
    (userApi.cancelInvitation as jest.Mock).mockResolvedValue(undefined);

    // Mock window.confirm
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('invited@example.com')).toBeInTheDocument();
    });

    // Find the cancel button (X icon button)
    const invitationRow = screen.getByText('invited@example.com').closest('tr');
    const cancelButton = within(invitationRow!).getByTitle('Cancel invitation');
    
    await user.click(cancelButton);

    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalled();
      expect(userApi.cancelInvitation).toHaveBeenCalledWith(1);
    });

    confirmSpy.mockRestore();
  });

  it('should validate email format in invite modal', async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Invite User')).toBeInTheDocument();
    });

    // Open invite modal
    const inviteButton = screen.getByText('Invite User');
    await user.click(inviteButton);

    await waitFor(() => {
      expect(screen.getByText('Send an invitation email to a new user')).toBeInTheDocument();
    });

    // Enter invalid email
    const emailInput = screen.getByPlaceholderText('user@example.com');
    await user.type(emailInput, 'invalid-email');

    // Submit the form
    const sendButton = screen.getByText('Send Invitation');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    // API should not be called
    expect(userApi.inviteUser).not.toHaveBeenCalled();
  });

  it('should show invitation status badges correctly', async () => {
    const invitationsWithDifferentStatuses = [
      {
        id: 1,
        email: 'pending@example.com',
        role: 'staff' as const,
        status: 'pending' as const,
        invited_by: 'John Doe',
        invited_at: '2024-01-15T00:00:00Z',
        expires_at: '2024-01-22T00:00:00Z',
      },
      {
        id: 2,
        email: 'accepted@example.com',
        role: 'staff' as const,
        status: 'accepted' as const,
        invited_by: 'John Doe',
        invited_at: '2024-01-10T00:00:00Z',
        expires_at: '2024-01-17T00:00:00Z',
      },
      {
        id: 3,
        email: 'expired@example.com',
        role: 'staff' as const,
        status: 'expired' as const,
        invited_by: 'John Doe',
        invited_at: '2024-01-01T00:00:00Z',
        expires_at: '2024-01-08T00:00:00Z',
      },
    ];

    (userApi.getInvitations as jest.Mock).mockResolvedValue(invitationsWithDifferentStatuses);
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Pending')).toBeInTheDocument();
      expect(screen.getByText('Accepted')).toBeInTheDocument();
      expect(screen.getByText('Expired')).toBeInTheDocument();
    });
  });

  it('should disable resend and cancel buttons for accepted invitations', async () => {
    const acceptedInvitation = {
      id: 1,
      email: 'accepted@example.com',
      role: 'staff' as const,
      status: 'accepted' as const,
      invited_by: 'John Doe',
      invited_at: '2024-01-10T00:00:00Z',
      expires_at: '2024-01-17T00:00:00Z',
    };

    (userApi.getInvitations as jest.Mock).mockResolvedValue([acceptedInvitation]);
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('accepted@example.com')).toBeInTheDocument();
    });

    const invitationRow = screen.getByText('accepted@example.com').closest('tr');
    const resendButton = within(invitationRow!).getByTitle('Resend invitation');
    const cancelButton = within(invitationRow!).getByTitle('Cancel invitation');

    expect(resendButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
});
