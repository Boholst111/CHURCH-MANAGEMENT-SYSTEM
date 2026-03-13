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
import { Upload, X, Check } from 'lucide-react';

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  photo?: string;
}

/**
 * Password strength levels
 */
type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

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
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);

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
      // Set photo preview if user has a photo
      if ((user as any).photo) {
        setPhotoPreview((user as any).photo);
      }
    } else {
      // Reset form for new user
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'staff',
      });
      setPhotoPreview(null);
      setPhotoFile(null);
    }
    setErrors({});
    setPasswordStrength(null);
  }, [user, isOpen]);

  /**
   * Calculate password strength
   */
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++; // Special characters
    
    // Map strength score to label
    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'fair';
    if (strength <= 4) return 'good';
    return 'strong';
  };

  /**
   * Get password strength color
   */
  const getPasswordStrengthColor = (strength: PasswordStrength): string => {
    switch (strength) {
      case 'weak':
        return 'bg-error-500';
      case 'fair':
        return 'bg-warning-500';
      case 'good':
        return 'bg-primary-500';
      case 'strong':
        return 'bg-success-500';
      default:
        return 'bg-neutral-300';
    }
  };

  /**
   * Get password strength width
   */
  const getPasswordStrengthWidth = (strength: PasswordStrength): string => {
    switch (strength) {
      case 'weak':
        return 'w-1/4';
      case 'fair':
        return 'w-2/4';
      case 'good':
        return 'w-3/4';
      case 'strong':
        return 'w-full';
      default:
        return 'w-0';
    }
  };

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
    } else if (!['admin', 'pastor', 'staff', 'volunteer', 'readonly'].includes(formData.role)) {
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
    
    // Update password strength indicator
    if (name === 'password' && value) {
      setPasswordStrength(calculatePasswordStrength(value));
    } else if (name === 'password' && !value) {
      setPasswordStrength(null);
    }
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle photo upload
   */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        photo: 'Please select a valid image file',
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        photo: 'Image size must be less than 5MB',
      }));
      return;
    }

    // Clear photo error
    setErrors((prev) => ({
      ...prev,
      photo: undefined,
    }));

    // Set photo file and preview
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Remove photo
   */
  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setErrors((prev) => ({
      ...prev,
      photo: undefined,
    }));
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
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="User photo preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary-200"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 bg-error-500 text-white rounded-full p-1 hover:bg-error-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                  <Upload className="h-8 w-8 text-neutral-400" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <label htmlFor="photo">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('photo')?.click()}
                    disabled={isSubmitting}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {photoPreview ? 'Change Photo' : 'Upload Photo'}
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>
            {errors.photo && (
              <p className="text-sm text-red-600 mt-1">{errors.photo}</p>
            )}
          </div>

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
            
            {/* Password Strength Indicator */}
            {!user && formData.password && passwordStrength && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Password strength:</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength === 'weak' ? 'text-error-600' :
                    passwordStrength === 'fair' ? 'text-warning-600' :
                    passwordStrength === 'good' ? 'text-primary-600' :
                    'text-success-600'
                  }`}>
                    {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                  </span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)} ${getPasswordStrengthWidth(passwordStrength)}`}
                  />
                </div>
              </div>
            )}
            
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
              <option value="pastor">Pastor</option>
              <option value="staff">Staff</option>
              <option value="volunteer">Volunteer</option>
              <option value="readonly">Read-Only</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-600 mt-1">{errors.role}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.role === 'admin' && 'Full access to all features and settings'}
              {formData.role === 'pastor' && 'Access to ministry and member management'}
              {formData.role === 'staff' && 'Can view and edit most data'}
              {formData.role === 'volunteer' && 'Limited access to assigned areas'}
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
