import React, { useState } from 'react';
import UserPermissionsModal, { ModulePermissions } from './UserPermissionsModal';
import { Button } from '../ui/button';
import { User } from '../../lib/userApi';

/**
 * Example: Basic User Permissions Modal
 * 
 * Demonstrates the basic usage of the UserPermissionsModal component
 * for managing user permissions grouped by module.
 */
export const BasicUserPermissionsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'staff',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const handleSave = async (permissions: ModulePermissions[]) => {
    console.log('Saving permissions:', permissions);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Permissions saved successfully!');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Basic User Permissions Modal</h2>
      <p className="text-neutral-600 mb-6">
        Click the button below to open the permissions management modal.
      </p>
      
      <Button onClick={() => setIsOpen(true)}>
        Manage Permissions
      </Button>

      <UserPermissionsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        user={mockUser}
      />
    </div>
  );
};

/**
 * Example: User Permissions Modal with Different Roles
 * 
 * Demonstrates how the modal can be used for users with different roles.
 */
export const UserPermissionsModalWithRoles: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    { 
      id: 1, 
      name: 'Admin User', 
      email: 'admin@example.com', 
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { 
      id: 2, 
      name: 'Staff User', 
      email: 'staff@example.com', 
      role: 'staff',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { 
      id: 3, 
      name: 'Read-Only User', 
      email: 'readonly@example.com', 
      role: 'readonly',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleSave = async (permissions: ModulePermissions[]) => {
    console.log('Saving permissions for', selectedUser?.name, ':', permissions);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Permissions saved for ${selectedUser?.name}!`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User Permissions Modal with Different Roles</h2>
      <p className="text-neutral-600 mb-6">
        Click on any user to manage their permissions.
      </p>
      
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-neutral-600">{user.email}</div>
              <div className="text-xs text-neutral-500 mt-1">Role: {user.role}</div>
            </div>
            <Button onClick={() => handleOpenModal(user)} variant="outline" size="sm">
              Manage Permissions
            </Button>
          </div>
        ))}
      </div>

      <UserPermissionsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        user={selectedUser}
      />
    </div>
  );
};

/**
 * Example: User Permissions Modal with Error Handling
 * 
 * Demonstrates error handling when saving permissions fails.
 */
export const UserPermissionsModalWithErrorHandling: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldFail, setShouldFail] = useState(false);

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'staff',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const handleSave = async (permissions: ModulePermissions[]) => {
    console.log('Attempting to save permissions:', permissions);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (shouldFail) {
      throw new Error('Failed to save permissions. Please try again.');
    }
    
    alert('Permissions saved successfully!');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User Permissions Modal with Error Handling</h2>
      <p className="text-neutral-600 mb-6">
        Toggle the "Simulate Error" checkbox to test error handling.
      </p>
      
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => setShouldFail(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-primary-600"
          />
          <span className="text-sm">Simulate Error</span>
        </label>
      </div>

      <Button onClick={() => setIsOpen(true)}>
        Manage Permissions
      </Button>

      <UserPermissionsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        user={mockUser}
      />
    </div>
  );
};

/**
 * Example: User Permissions Modal Integration
 * 
 * Demonstrates how the modal integrates with a user management table.
 */
export const UserPermissionsModalIntegration: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    { 
      id: 1, 
      name: 'Alice Johnson', 
      email: 'alice@example.com', 
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { 
      id: 2, 
      name: 'Bob Smith', 
      email: 'bob@example.com', 
      role: 'staff',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { 
      id: 3, 
      name: 'Carol Williams', 
      email: 'carol@example.com', 
      role: 'readonly',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const handleManagePermissions = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleSave = async (permissions: ModulePermissions[]) => {
    console.log('Saving permissions for', selectedUser?.name);
    
    // Count granted permissions
    const grantedCount = permissions.reduce(
      (total, module) => total + module.permissions.filter(p => p.granted).length,
      0
    );
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Saved ${grantedCount} permissions for ${selectedUser?.name}!`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User Permissions Modal Integration</h2>
      <p className="text-neutral-600 mb-6">
        Example of how the permissions modal integrates with a user table.
      </p>
      
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Button
                    onClick={() => handleManagePermissions(user)}
                    variant="outline"
                    size="sm"
                  >
                    Manage Permissions
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserPermissionsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        user={selectedUser}
      />
    </div>
  );
};
