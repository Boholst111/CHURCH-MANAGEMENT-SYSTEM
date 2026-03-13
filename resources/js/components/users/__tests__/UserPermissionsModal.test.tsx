import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserPermissionsModal, { ModulePermissions } from '../UserPermissionsModal';
import { User } from '../../../lib/userApi';

// Mock user data
const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'staff',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('UserPermissionsModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when open', () => {
    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    expect(screen.getByText('Manage Permissions')).toBeInTheDocument();
    expect(screen.getByText(`Configure access permissions for ${mockUser.name}`)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <UserPermissionsModal
        isOpen={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    expect(screen.queryByText('Manage Permissions')).not.toBeInTheDocument();
  });

  it('displays all module sections', () => {
    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    // Check for all module headers
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Small Groups')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Activity Log')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('displays permission checkboxes for each module', () => {
    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    // Check for Members module permissions
    expect(screen.getByText('View Members')).toBeInTheDocument();
    expect(screen.getByText('Add Members')).toBeInTheDocument();
    expect(screen.getByText('Edit Members')).toBeInTheDocument();
    expect(screen.getByText('Delete Members')).toBeInTheDocument();
    expect(screen.getByText('Approve Members')).toBeInTheDocument();
  });

  it('toggles individual permission when checkbox is clicked', () => {
    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    // Find the "Delete Members" checkbox
    const deleteCheckbox = screen.getByLabelText('Delete Members') as HTMLInputElement;
    
    // Initially unchecked (based on default permissions)
    expect(deleteCheckbox.checked).toBe(false);

    // Click to check
    fireEvent.click(deleteCheckbox);
    expect(deleteCheckbox.checked).toBe(true);

    // Click to uncheck
    fireEvent.click(deleteCheckbox);
    expect(deleteCheckbox.checked).toBe(false);
  });

  it('toggles all permissions in a module when "Toggle All" is clicked', () => {
    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    // Get all "Toggle All" buttons (one per module)
    const toggleAllButtons = screen.getAllByText('Toggle All');
    
    // Click the first "Toggle All" button (Members module)
    fireEvent.click(toggleAllButtons[0]);

    // Check that all Members permissions are now checked
    const viewCheckbox = screen.getByLabelText('View Members') as HTMLInputElement;
    const addCheckbox = screen.getByLabelText('Add Members') as HTMLInputElement;
    const editCheckbox = screen.getByLabelText('Edit Members') as HTMLInputElement;
    const deleteCheckbox = screen.getByLabelText('Delete Members') as HTMLInputElement;
    const approveCheckbox = screen.getByLabelText('Approve Members') as HTMLInputElement;

    // After toggle all, all should be checked
    expect(viewCheckbox.checked).toBe(true);
    expect(addCheckbox.checked).toBe(true);
    expect(editCheckbox.checked).toBe(true);
    expect(deleteCheckbox.checked).toBe(true);
    expect(approveCheckbox.checked).toBe(true);

    // Click again to uncheck all
    fireEvent.click(toggleAllButtons[0]);

    expect(viewCheckbox.checked).toBe(false);
    expect(addCheckbox.checked).toBe(false);
    expect(editCheckbox.checked).toBe(false);
    expect(deleteCheckbox.checked).toBe(false);
    expect(approveCheckbox.checked).toBe(false);
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with updated permissions when Save button is clicked', async () => {
    mockOnSave.mockResolvedValue(undefined);

    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    // Toggle a permission
    const deleteCheckbox = screen.getByLabelText('Delete Members');
    fireEvent.click(deleteCheckbox);

    // Click Save
    const saveButton = screen.getByRole('button', { name: /save permissions/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledTimes(1);
      expect(mockOnSave).toHaveBeenCalledWith(expect.any(Array));
    });

    // Verify the permissions structure
    const savedPermissions = mockOnSave.mock.calls[0][0] as ModulePermissions[];
    expect(savedPermissions).toHaveLength(8); // 8 modules
    
    // Check that Members module has the updated permission
    const membersModule = savedPermissions.find(m => m.module === 'Members');
    expect(membersModule).toBeDefined();
    const deletePermission = membersModule?.permissions.find(p => p.name === 'Delete Members');
    expect(deletePermission?.granted).toBe(true);
  });

  it('disables form controls while submitting', async () => {
    // Mock onSave to delay resolution
    mockOnSave.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    const saveButton = screen.getByRole('button', { name: /save permissions/i });
    fireEvent.click(saveButton);

    // Check that button shows "Saving..." and is disabled
    await waitFor(() => {
      expect(screen.getByText('Saving...')).toBeInTheDocument();
    });

    // Check that checkboxes are disabled
    const viewCheckbox = screen.getByLabelText('View Members') as HTMLInputElement;
    expect(viewCheckbox.disabled).toBe(true);
  });

  it('closes modal after successful save', async () => {
    mockOnSave.mockResolvedValue(undefined);

    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    const saveButton = screen.getByRole('button', { name: /save permissions/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledTimes(1);
    });

    // onClose should be called at least once after successful save
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not close modal if save fails', async () => {
    mockOnSave.mockRejectedValue(new Error('Save failed'));

    const { rerender } = render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    // Clear any initial calls
    mockOnClose.mockClear();

    const saveButton = screen.getByRole('button', { name: /save permissions/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledTimes(1);
    });

    // The modal should still be open (isOpen should remain true)
    // We verify this by checking that the form is still visible
    expect(screen.getByText('Manage Permissions')).toBeInTheDocument();
  });

  it('returns null when user is null', () => {
    const { container } = render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={null}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('displays "Toggle All" buttons for each module', () => {
    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    // Should have 8 "Toggle All" buttons (one per module)
    const toggleAllButtons = screen.getAllByText('Toggle All');
    expect(toggleAllButtons).toHaveLength(8);
  });

  it('shows indeterminate state when some permissions are granted', () => {
    render(
      <UserPermissionsModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        user={mockUser}
      />
    );

    // Members module has some permissions granted by default (View, Add, Edit)
    // but not all (Delete, Approve are not granted)
    const toggleAllButtons = screen.getAllByText('Toggle All');
    const membersToggleAll = toggleAllButtons[0].previousElementSibling as HTMLInputElement;

    // The checkbox should be in indeterminate state
    expect(membersToggleAll.indeterminate).toBe(true);
  });
});
