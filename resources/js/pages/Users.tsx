import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { UserPlus, Shield, Users as UsersIcon, Edit, Mail, Search, Eye, UserCog, UserX, Trash2, Clock, RefreshCw, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Spinner } from '../components/ui/spinner';
import { userApi, User, UserFormData, UserInvitation, InviteUserFormData } from '../lib/userApi';
import { useToast } from '../contexts/ToastContext';
import { getErrorMessage } from '../lib/errorHandler';
import { formatDistanceToNow } from 'date-fns';
import UserForm from '../components/users/UserForm';
import UserPermissionsModal, { ModulePermissions } from '../components/users/UserPermissionsModal';
import InviteUserModal from '../components/users/InviteUserModal';
import ArchiveButton from '../components/archive/ArchiveButton';

/**
 * Users Page Component (Admin Only)
 * 
 * Displays a list of system users with their roles.
 * Allows administrators to add new users and invite users.
 * 
 * Features:
 * - Display list of users with roles
 * - Add User and Invite User buttons
 * - Filter bar with search, role, and status filters
 * - Role-based display with visual indicators
 * 
 * Validates Requirements: 10.4
 */
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [invitations, setInvitations] = useState<UserInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const { showToast } = useToast();

  /**
   * Fetch users from API
   */
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await userApi.getUsers();
      setUsers(data);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      const errorMessage = getErrorMessage(error, 'Failed to load users');
      showToast('error', errorMessage);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  /**
   * Fetch invitations from API
   */
  const fetchInvitations = useCallback(async () => {
    try {
      const data = await userApi.getInvitations();
      setInvitations(data);
    } catch (error: any) {
      console.error('Error fetching invitations:', error);
      // Don't show error toast for invitations as it's not critical
      setInvitations([]);
    }
  }, []);

  /**
   * Fetch users on component mount
   */
  useEffect(() => {
    fetchUsers();
    fetchInvitations();
  }, []);

  /**
   * Handle add user button click
   */
  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  /**
   * Handle invite user button click
   */
  const handleInviteUser = () => {
    setIsInviteModalOpen(true);
  };

  /**
   * Handle invite user form submission
   */
  const handleInviteSubmit = async (data: InviteUserFormData) => {
    try {
      await userApi.inviteUser(data);
      showToast('success', `Invitation sent to ${data.email}`);
      fetchInvitations(); // Refresh invitations list
      setIsInviteModalOpen(false);
    } catch (error: any) {
      console.error('Error inviting user:', error);
      const errorMessage = getErrorMessage(error, 'Failed to send invitation');
      showToast('error', errorMessage);
      throw error; // Re-throw to prevent modal from closing
    }
  };

  /**
   * Handle resend invitation
   */
  const handleResendInvitation = async (invitation: UserInvitation) => {
    try {
      await userApi.resendInvitation(invitation.id);
      showToast('success', `Invitation resent to ${invitation.email}`);
      fetchInvitations(); // Refresh invitations list
    } catch (error: any) {
      console.error('Error resending invitation:', error);
      const errorMessage = getErrorMessage(error, 'Failed to resend invitation');
      showToast('error', errorMessage);
    }
  };

  /**
   * Handle cancel invitation
   */
  const handleCancelInvitation = async (invitation: UserInvitation) => {
    if (!confirm(`Are you sure you want to cancel the invitation for ${invitation.email}?`)) {
      return;
    }

    try {
      await userApi.cancelInvitation(invitation.id);
      showToast('success', 'Invitation cancelled');
      fetchInvitations(); // Refresh invitations list
    } catch (error: any) {
      console.error('Error cancelling invitation:', error);
      const errorMessage = getErrorMessage(error, 'Failed to cancel invitation');
      showToast('error', errorMessage);
    }
  };

  /**
   * Handle edit user button click
   */
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  /**
   * Handle manage permissions button click
   */
  const handleManagePermissions = (user: User) => {
    setSelectedUser(user);
    setIsPermissionsModalOpen(true);
  };

  /**
   * Handle permissions save
   */
  const handleSavePermissions = async (permissions: ModulePermissions[]) => {
    try {
      // TODO: Implement API call to save permissions when backend is ready
      console.log('Saving permissions:', permissions);
      showToast('success', 'Permissions updated successfully');
    } catch (error: any) {
      console.error('Error saving permissions:', error);
      const errorMessage = getErrorMessage(error, 'Failed to save permissions');
      showToast('error', errorMessage);
      throw error; // Re-throw to prevent modal from closing
    }
  };

  /**
   * Handle archive success callback
   */
  const handleArchiveSuccess = async () => {
    await fetchUsers();
  };

  /**
   * Handle form submission
   */
  const handleFormSubmit = async (data: UserFormData) => {
    try {
      if (selectedUser) {
        await userApi.updateUser(selectedUser.id, data);
        showToast('success', 'User updated successfully');
      } else {
        await userApi.createUser(data);
        showToast('success', 'User created successfully');
      }
      fetchUsers();
      setIsFormOpen(false);
    } catch (error: any) {
      console.error('Error saving user:', error);
      const errorMessage = getErrorMessage(error, 'Failed to save user');
      showToast('error', errorMessage);
      throw error; // Re-throw to let form handle validation errors
    }
  };

  /**
   * Get role badge color based on role
   * Admin: red, Pastor: blue, Staff: green, Volunteer: gray
   */
  const getRoleBadgeColor = (role: string): 'error' | 'primary' | 'success' | 'neutral' => {
    switch (role) {
      case 'admin':
        return 'error'; // Red
      case 'pastor':
        return 'primary'; // Blue
      case 'staff':
        return 'success'; // Green
      case 'volunteer':
      case 'readonly':
        return 'neutral'; // Gray
      default:
        return 'neutral';
    }
  };

  /**
   * Get role display name
   */
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'pastor':
        return 'Pastor';
      case 'staff':
        return 'Staff';
      case 'volunteer':
        return 'Volunteer';
      case 'readonly':
        return 'Read-Only';
      default:
        return role;
    }
  };

  /**
   * Get status badge color
   */
  const getStatusBadgeColor = (status: string): 'success' | 'neutral' | 'warning' => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'neutral';
      case 'pending':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  /**
   * Get status display name
   */
  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'pending':
        return 'Pending';
      default:
        return 'Active'; // Default to active if not specified
    }
  };

  /**
   * Get invitation status badge color
   */
  const getInvitationStatusBadgeColor = (status: string): 'warning' | 'success' | 'neutral' => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'expired':
        return 'neutral';
      default:
        return 'warning';
    }
  };

  /**
   * Get invitation status display name
   */
  const getInvitationStatusDisplayName = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'expired':
        return 'Expired';
      default:
        return status;
    }
  };

  /**
   * Format last login time as relative time
   */
  const formatLastLogin = (lastLogin?: string) => {
    if (!lastLogin) {
      return 'Never';
    }
    try {
      return formatDistanceToNow(new Date(lastLogin), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  /**
   * Get user initials for avatar
   */
  const getUserInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  /**
   * Get permission summary
   * For now, returns a placeholder. Will be enhanced when permissions are added to User model
   */
  const getPermissionSummary = (user: User) => {
    // Placeholder logic - will be replaced when permissions field is added
    const rolePermissions: Record<string, number> = {
      admin: 12,
      pastor: 8,
      staff: 6,
      volunteer: 3,
      readonly: 2,
    };
    return rolePermissions[user.role] || 0;
  };

  /**
   * Filter users based on search query, role, and status
   */
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Role filter
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      // Status filter (for now, all users are considered active)
      // This will be enhanced when status field is added to the User model
      const matchesStatus = statusFilter === 'all' || statusFilter === 'active';
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Users</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Manage system users and permissions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleInviteUser} 
            variant="outline"
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Mail className="h-4 w-4" />
            Invite User
          </Button>
          <Button 
            onClick={handleAddUser} 
            variant="primary"
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-1">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              iconPosition="left"
            />
          </div>

          {/* Role Filter */}
          <div className="md:col-span-1">
            <Select
              value={roleFilter}
              onChange={(value) => setRoleFilter(Array.isArray(value) ? value[0] : value)}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'admin', label: 'Admin' },
                { value: 'pastor', label: 'Pastor' },
                { value: 'staff', label: 'Staff' },
                { value: 'volunteer', label: 'Volunteer' },
                { value: 'readonly', label: 'Read-Only' },
              ]}
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-1">
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(Array.isArray(value) ? value[0] : value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" label="Loading users..." />
          </div>
        ) : !filteredUsers || filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <UsersIcon className="h-12 w-12 text-neutral-400 mb-4" />
            <p className="text-neutral-600 text-center">
              {searchQuery || roleFilter !== 'all' || statusFilter !== 'all' 
                ? 'No users found matching your filters' 
                : 'No users found'}
            </p>
          </div>
        ) : (
          <>
            {/* Pending Invitations Section */}
            {invitations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary-600" />
                  Pending Invitations ({invitations.length})
                </h3>
                <div className="overflow-x-auto mb-6 border border-neutral-200 rounded-lg">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                          Invited By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                          Invited At
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      {invitations.map((invitation) => (
                        <tr key={invitation.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 text-neutral-400 mr-2" />
                              <div className="text-sm font-medium text-neutral-900">
                                {invitation.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={getRoleBadgeColor(invitation.role)}
                              size="sm"
                            >
                              <Shield className="h-3 w-3 mr-1" />
                              {getRoleDisplayName(invitation.role)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-neutral-600">
                              {invitation.invited_by}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-neutral-600">
                              <Clock className="h-4 w-4 mr-1.5 text-neutral-400" />
                              {formatDistanceToNow(new Date(invitation.invited_at), { addSuffix: true })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={getInvitationStatusBadgeColor(invitation.status)}
                              size="sm"
                            >
                              {getInvitationStatusDisplayName(invitation.status)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleResendInvitation(invitation)}
                                className="text-primary-600 hover:text-primary-900"
                                title="Resend invitation"
                                disabled={invitation.status === 'accepted'}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCancelInvitation(invitation)}
                                className="text-error-600 hover:text-error-900"
                                title="Cancel invitation"
                                disabled={invitation.status === 'accepted'}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Active Users Section */}
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              Active Users ({filteredUsers.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center border-2 border-primary-200">
                            <span className="text-primary-700 font-medium text-sm">
                              {getUserInitials(user.name)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={getRoleBadgeColor(user.role)}
                          size="sm"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {getRoleDisplayName(user.role)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-600">
                          {getPermissionSummary(user)} permissions
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-neutral-600">
                          <Clock className="h-4 w-4 mr-1.5 text-neutral-400" />
                          {formatLastLogin((user as any).last_login)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={getStatusBadgeColor((user as any).status || 'active')}
                          size="sm"
                        >
                          {getStatusDisplayName((user as any).status || 'active')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            className="text-neutral-600 hover:text-neutral-900"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            className="text-primary-600 hover:text-primary-900"
                            title="Edit user"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleManagePermissions(user)}
                            className="text-primary-600 hover:text-primary-900"
                            title="Manage permissions"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement change role functionality
                              showToast('info', 'Change role functionality coming soon');
                            }}
                            className="text-neutral-600 hover:text-neutral-900"
                            title="Change role"
                          >
                            <UserCog className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // TODO: Implement deactivate functionality
                              showToast('info', 'Deactivate functionality coming soon');
                            }}
                            className="text-warning-600 hover:text-warning-900"
                            title="Deactivate user"
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                          <ArchiveButton
                            itemType="users"
                            itemId={user.id}
                            itemName={user.name}
                            onArchiveSuccess={handleArchiveSuccess}
                            variant="ghost"
                            size="sm"
                            iconOnly={true}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>

      {/* Invite User Modal */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSubmit={handleInviteSubmit}
      />

      {/* User Form Modal */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        isLoading={isLoading}
      />

      {/* User Permissions Modal */}
      <UserPermissionsModal
        isOpen={isPermissionsModalOpen}
        onClose={() => setIsPermissionsModalOpen(false)}
        onSave={handleSavePermissions}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;
