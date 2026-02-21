import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { User, UserFormData } from '../../lib/userApi';

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

/**
 * UserForm Props
 */
export interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => Promise<void>;
  user?: User | null;
  isLoading?: boolean;
}

/**
 * UserForm Component
 * 
 * Form for adding or editing user accounts.
 * 
 * Features:
 * - Input fields for name, email, password, and role
 * - Password complexity validation (min 8 chars, uppercase, lowercase, number)
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * - Password field optional when editing (only required for new users)
 * 
 * Validates Requirements: 10.4, 10.5
 */
const UserForm: React.FC<UserFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'staff',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Initialize form data when user prop changes
   */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '', // Password is optional when editing
        role: user.role,
      });
    } else {
      // Reset form for new user
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'staff',
      });
    }
    setErrors({});
  }, [user, isOpen]);

  /**
   * Validate password complexity
   * Requirements: minimum 8 characters, contains uppercase, lowercase, and number
   */
  const validatePasswordComplexity = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }

    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }

    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }

    return null;
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be 100 characters or less';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    // Password is required for new users, optional for editing
    if (!user && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password) {
      // Validate password complexity if password is provided
      const passwordError = validatePasswordComplexity(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Role is required';
    } else if (!['admin', 'staff', 'readonly'].includes(formData.role)) {
      newErrors.role = 'Invalid role selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // If editing and password is empty, don't send password field
      const submitData: UserFormData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      // Only include password if it's provided
      if (formData.password) {
        submitData.password = formData.password;
      }

      await onSubmit(submitData);
      onClose();
    } catch (error: any) {
      // Handle server-side validation errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      // Don't close the form if there's an error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      // Don't automatically close the dialog
      // The dialog will only close when onClose is explicitly called
    }}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {user ? 'Edit User' : 'Add New User'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-red-500' : ''}
              disabled={isSubmitting}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-red-500' : ''}
              disabled={isSubmitting}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password {!user && <span className="text-red-500">*</span>}
              {user && <span className="text-gray-500 text-xs ml-1">(leave blank to keep current)</span>}
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'border-red-500' : ''}
              disabled={isSubmitting}
              placeholder={user ? 'Enter new password (optional)' : 'Enter password'}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
            {!errors.password && (
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={isSubmitting}
            >
              <option value="admin">Administrator</option>
              <option value="staff">Staff</option>
              <option value="readonly">Read-Only</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-600 mt-1">{errors.role}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.role === 'admin' && 'Full access to all features and settings'}
              {formData.role === 'staff' && 'Can view and edit most data'}
              {formData.role === 'readonly' && 'Can only view data, no editing allowed'}
            </p>
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
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? 'Saving...' : user ? 'Update User' : 'Add User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
