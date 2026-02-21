import React, { useState, useEffect } from 'react';
import { UserPlus, Shield, Users as UsersIcon, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Spinner } from '../components/ui/spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { userApi, User, UserFormData } from '../lib/userApi';
import { useToast } from '../contexts/ToastContext';
import { getErrorMessage } from '../lib/errorHandler';
import UserForm from '../components/users/UserForm';

/**
 * Users Page Component (Admin Only)
 * 
 * Displays a list of system users with their roles.
 * Allows administrators to add new users.
 * 
 * Features:
 * - Display list of users with roles
 * - Add User button for creating new user accounts
 * - Role-based display with visual indicators
 * 
 * Validates Requirements: 10.4
 */
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  const { showToast } = useToast();

  /**
   * Fetch users from API
   */
  const fetchUsers = async () => {
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
  };

  /**
   * Fetch users on component mount
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Handle add user button click
   */
  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  /**
   * Handle edit user button click
   */
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  /**
   * Handle delete user button click
   */
  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  /**
   * Confirm delete user
   */
  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await userApi.deleteUser(userToDelete.id);
      showToast('success', 'User deleted successfully');
      fetchUsers();
      setUserToDelete(null);
    } catch (error: any) {
      console.error('Error deleting user:', error);
      const errorMessage = getErrorMessage(error, 'Failed to delete user');
      showToast('error', errorMessage);
    }
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
   */
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'staff':
        return 'bg-blue-100 text-blue-800';
      case 'readonly':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Get role display name
   */
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'staff':
        return 'Staff';
      case 'readonly':
        return 'Read-Only';
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage system users and their access roles
          </p>
        </div>
        <Button onClick={handleAddUser} className="flex items-center gap-2 w-full sm:w-auto">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Users List */}
      <Card className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" label="Loading users..." />
          </div>
        ) : !users || users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <UsersIcon className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 text-center">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-medium text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        <Shield className="h-3 w-3" />
                        {getRoleDisplayName(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* User Form Modal */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      {userToDelete && (
        <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong>{userToDelete.name}</strong>? This action cannot be undone.
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setUserToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDeleteUser}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Users;
