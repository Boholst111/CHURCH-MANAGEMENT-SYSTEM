import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { User } from '../../lib/userApi';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Settings, 
  FileText, 
  Shield,
  Activity,
  UsersRound,
  Building
} from 'lucide-react';

/**
 * Permission definition
 */
export interface Permission {
  name: string;
  granted: boolean;
}

/**
 * Module permissions definition
 */
export interface ModulePermissions {
  module: string;
  icon: React.ReactNode;
  permissions: Permission[];
}

/**
 * UserPermissionsModal Props
 */
export interface UserPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissions: ModulePermissions[]) => Promise<void>;
  user: User | null;
}

/**
 * Default permissions structure
 */
const getDefaultPermissions = (): ModulePermissions[] => [
  {
    module: 'Members',
    icon: <Users className="h-5 w-5" />,
    permissions: [
      { name: 'View Members', granted: true },
      { name: 'Add Members', granted: true },
      { name: 'Edit Members', granted: true },
      { name: 'Delete Members', granted: false },
      { name: 'Approve Members', granted: false },
    ],
  },
  {
    module: 'Finance',
    icon: <DollarSign className="h-5 w-5" />,
    permissions: [
      { name: 'View Finance', granted: true },
      { name: 'Add Offerings', granted: false },
      { name: 'Edit Offerings', granted: false },
      { name: 'Delete Offerings', granted: false },
      { name: 'Approve Expenses', granted: false },
    ],
  },
  {
    module: 'Events',
    icon: <Calendar className="h-5 w-5" />,
    permissions: [
      { name: 'View Events', granted: true },
      { name: 'Add Events', granted: true },
      { name: 'Edit Events', granted: true },
      { name: 'Delete Events', granted: false },
      { name: 'Approve Events', granted: false },
    ],
  },
  {
    module: 'Small Groups',
    icon: <UsersRound className="h-5 w-5" />,
    permissions: [
      { name: 'View Groups', granted: true },
      { name: 'Add Groups', granted: false },
      { name: 'Edit Groups', granted: false },
      { name: 'Delete Groups', granted: false },
      { name: 'Approve Groups', granted: false },
    ],
  },
  {
    module: 'Leadership',
    icon: <Building className="h-5 w-5" />,
    permissions: [
      { name: 'View Leadership', granted: true },
      { name: 'Add Leaders', granted: false },
      { name: 'Edit Leaders', granted: false },
      { name: 'Delete Leaders', granted: false },
      { name: 'Approve Leaders', granted: false },
    ],
  },
  {
    module: 'Reports',
    icon: <FileText className="h-5 w-5" />,
    permissions: [
      { name: 'View Reports', granted: true },
      { name: 'Add Reports', granted: false },
      { name: 'Edit Reports', granted: false },
      { name: 'Delete Reports', granted: false },
      { name: 'Approve Reports', granted: false },
    ],
  },
  {
    module: 'Activity Log',
    icon: <Activity className="h-5 w-5" />,
    permissions: [
      { name: 'View Activity', granted: true },
      { name: 'Add Activity', granted: false },
      { name: 'Edit Activity', granted: false },
      { name: 'Delete Activity', granted: false },
      { name: 'Approve Activity', granted: false },
    ],
  },
  {
    module: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    permissions: [
      { name: 'View Settings', granted: false },
      { name: 'Add Settings', granted: false },
      { name: 'Edit Settings', granted: false },
      { name: 'Delete Settings', granted: false },
      { name: 'Approve Settings', granted: false },
    ],
  },
];

/**
 * UserPermissionsModal Component
 * 
 * Modal for managing user permissions grouped by module.
 * 
 * Features:
 * - Display modules (Members, Finance, Events, Settings, etc.)
 * - Show permissions as checkboxes (View, Add, Edit, Delete, Approve)
 * - Add "Toggle All" for each module
 * - Save permissions on submit
 * 
 * Validates Requirements: 10.4
 */
const UserPermissionsModal: React.FC<UserPermissionsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [permissions, setPermissions] = useState<ModulePermissions[]>(getDefaultPermissions());
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Initialize permissions when user changes
   */
  useEffect(() => {
    if (user) {
      // TODO: Load user's actual permissions from API when backend is ready
      // For now, use default permissions
      setPermissions(getDefaultPermissions());
    }
  }, [user, isOpen]);

  /**
   * Toggle a specific permission
   */
  const togglePermission = (moduleIndex: number, permissionIndex: number) => {
    setPermissions((prev) => {
      const updated = [...prev];
      updated[moduleIndex].permissions[permissionIndex].granted = 
        !updated[moduleIndex].permissions[permissionIndex].granted;
      return updated;
    });
  };

  /**
   * Toggle all permissions for a module
   */
  const toggleAllModulePermissions = (moduleIndex: number) => {
    setPermissions((prev) => {
      const updated = [...prev];
      const allGranted = updated[moduleIndex].permissions.every(p => p.granted);
      
      // If all are granted, uncheck all. Otherwise, check all.
      updated[moduleIndex].permissions = updated[moduleIndex].permissions.map(p => ({
        ...p,
        granted: !allGranted,
      }));
      
      return updated;
    });
  };

  /**
   * Check if all permissions in a module are granted
   */
  const areAllModulePermissionsGranted = (moduleIndex: number): boolean => {
    return permissions[moduleIndex].permissions.every(p => p.granted);
  };

  /**
   * Check if some (but not all) permissions in a module are granted
   */
  const areSomeModulePermissionsGranted = (moduleIndex: number): boolean => {
    const grantedCount = permissions[moduleIndex].permissions.filter(p => p.granted).length;
    return grantedCount > 0 && grantedCount < permissions[moduleIndex].permissions.length;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await onSave(permissions);
      onClose();
    } catch (error) {
      console.error('Error saving permissions:', error);
      // Error handling is done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-600" />
            Manage Permissions
          </DialogTitle>
          <DialogDescription>
            Configure access permissions for {user.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Permissions Grid */}
          <div className="space-y-6">
            {permissions.map((module, moduleIndex) => (
              <div 
                key={module.module} 
                className="border border-neutral-200 rounded-lg p-4 bg-neutral-50"
              >
                {/* Module Header with Toggle All */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-primary-600">
                      {module.icon}
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900">
                      {module.module}
                    </h3>
                  </div>
                  
                  {/* Toggle All Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={areAllModulePermissionsGranted(moduleIndex)}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = areSomeModulePermissionsGranted(moduleIndex);
                        }
                      }}
                      onChange={() => toggleAllModulePermissions(moduleIndex)}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
                      Toggle All
                    </span>
                  </label>
                </div>

                {/* Permissions Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {module.permissions.map((permission, permissionIndex) => (
                    <label
                      key={permission.name}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-white transition-colors cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={permission.granted}
                        onChange={() => togglePermission(moduleIndex, permissionIndex)}
                        className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
                        {permission.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Permissions'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionsModal;
