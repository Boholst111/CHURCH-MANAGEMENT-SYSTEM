import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';

/**
 * Profile form data interface
 */
export interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

/**
 * ProfileForm Component
 * 
 * Form for editing user profile including name, email, and password.
 * 
 * Features:
 * - Input fields for name, email, and password
 * - Password complexity validation (min 8 chars, uppercase, lowercase, number)
 * - Loads existing user profile on mount
 * - Displays success/error messages via toast notifications
 * - Password fields are optional (only update if provided)
 * 
 * Validates Requirements: 6.3, 10.5
 */
const ProfileForm: React.FC = () => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Load user profile on component mount
   */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
      });
      setIsLoading(false);
    }
  }, [user]);

  /**
   * Validate password complexity
   * Requirements: min 8 characters, uppercase, lowercase, and number
   */
  const validatePassword = (password: string): string | null => {
    if (password.length === 0) {
      return null; // Password is optional
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }

    if (!/\d/.test(password)) {
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
    } else if (formData.name.length > 255) {
      newErrors.name = 'Name must be 255 characters or less';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation (only if provided)
    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }

      // Password confirmation validation
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
      showToast('error', 'Please correct the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare data to send (only include password if provided)
      const dataToSend: any = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password) {
        dataToSend.password = formData.password;
      }

      const response = await api.put('/profile', dataToSend);
      
      if (response.data.success) {
        showToast('success', 'Profile updated successfully');
        
        // Update local storage with new user data
        const updatedUser = response.data.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Clear password fields after successful update
        setFormData((prev) => ({
          ...prev,
          password: '',
          password_confirmation: '',
        }));
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      
      // Handle server-side validation errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        showToast('error', 'Please correct the errors in the form');
      } else {
        showToast('error', error.response?.data?.message || 'Failed to update profile');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
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
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
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
          placeholder="john.doe@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password Section */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Change Password
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Leave blank to keep your current password
        </p>

        {/* New Password */}
        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'border-red-500' : ''}
              disabled={isSubmitting}
              placeholder="Enter new password"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters with uppercase, lowercase, and number
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              className={errors.password_confirmation ? 'border-red-500' : ''}
              disabled={isSubmitting}
              placeholder="Confirm new password"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-600 mt-1">{errors.password_confirmation}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
