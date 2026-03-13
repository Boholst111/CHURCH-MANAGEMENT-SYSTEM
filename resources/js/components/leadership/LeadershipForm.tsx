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
import { Upload } from 'lucide-react';

/**
 * Leadership interface
 */
export interface Leadership {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo_url: string | null;
  bio: string | null;
  start_date: string;
  ministry_teams?: string | null;
}

/**
 * Form data interface for leadership creation/editing
 */
export interface LeadershipFormData {
  first_name: string;
  last_name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo_url: string | null;
  bio: string | null;
  start_date: string;
  ministry_teams?: string | null;
}

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  first_name?: string;
  last_name?: string;
  role?: string;
  department?: string;
  email?: string;
  phone?: string;
  photo_url?: string;
  bio?: string;
  start_date?: string;
  ministry_teams?: string;
}

/**
 * LeadershipForm Props
 */
export interface LeadershipFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadershipFormData, photoFile?: File | null) => Promise<void>;
  leadership?: Leadership | null;
  isLoading?: boolean;
}

/**
 * LeadershipForm Component
 * 
 * Form for adding or editing leadership profiles.
 * 
 * Features:
 * - Input fields for all leadership properties
 * - Photo upload functionality
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * 
 * Validates Requirements: 4.5
 */
const LeadershipForm: React.FC<LeadershipFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  leadership = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<LeadershipFormData>({
    first_name: '',
    last_name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    photo_url: null,
    bio: null,
    start_date: new Date().toISOString().split('T')[0],
    ministry_teams: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  /**
   * Initialize form data when leadership prop changes
   */
  useEffect(() => {
    if (leadership) {
      setFormData({
        first_name: leadership.first_name,
        last_name: leadership.last_name,
        role: leadership.role,
        department: leadership.department,
        email: leadership.email,
        phone: leadership.phone,
        photo_url: leadership.photo_url,
        bio: leadership.bio,
        start_date: leadership.start_date.split('T')[0],
        ministry_teams: leadership.ministry_teams || null,
      });
      setPhotoPreview(leadership.photo_url);
    } else {
      // Reset form for new leadership
      setFormData({
        first_name: '',
        last_name: '',
        role: '',
        department: '',
        email: '',
        phone: '',
        photo_url: null,
        bio: null,
        start_date: new Date().toISOString().split('T')[0],
        ministry_teams: null,
      });
      setPhotoPreview(null);
    }
    setErrors({});
    setPhotoFile(null);
  }, [leadership, isOpen]);

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required fields
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (formData.first_name.length > 100) {
      newErrors.first_name = 'First name must be 100 characters or less';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (formData.last_name.length > 100) {
      newErrors.last_name = 'Last name must be 100 characters or less';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    } else if (formData.role.length > 100) {
      newErrors.role = 'Role must be 100 characters or less';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    } else if (formData.department.length > 100) {
      newErrors.department = 'Department must be 100 characters or less';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
   * Handle photo file selection
   */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({
          ...prev,
          photo_url: 'Please select a valid image file',
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo_url: 'Image size must be less than 5MB',
        }));
        return;
      }

      setPhotoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear photo error
      if (errors.photo_url) {
        setErrors((prev) => ({
          ...prev,
          photo_url: undefined,
        }));
      }
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
      await onSubmit(formData, photoFile);
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {leadership ? 'Edit Leadership Profile' : 'Add New Leadership Profile'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            <div className="flex items-center gap-4">
              {photoPreview && (
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <label
                  htmlFor="photo-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {photoPreview ? 'Change Photo' : 'Upload Photo'}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG or GIF (max 5MB)
                </p>
              </div>
            </div>
            {errors.photo_url && (
              <p className="text-sm text-red-600 mt-1">{errors.photo_url}</p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.first_name && (
                <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.last_name && (
                <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>
              )}
            </div>
          </div>

          {/* Role and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <Input
                id="role"
                name="role"
                type="text"
                placeholder="e.g., Senior Pastor, Youth Pastor"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.role && (
                <p className="text-sm text-red-600 mt-1">{errors.role}</p>
              )}
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <Input
                id="department"
                name="department"
                type="text"
                placeholder="e.g., Pastoral, Youth Ministry"
                value={formData.department}
                onChange={handleChange}
                className={errors.department ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.department && (
                <p className="text-sm text-red-600 mt-1">{errors.department}</p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date <span className="text-red-500">*</span>
            </label>
            <Input
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              className={errors.start_date ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.start_date && (
              <p className="text-sm text-red-600 mt-1">{errors.start_date}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Brief biography or description..."
              disabled={isSubmitting}
            />
            {errors.bio && (
              <p className="text-sm text-red-600 mt-1">{errors.bio}</p>
            )}
          </div>

          {/* Ministry Teams */}
          <div>
            <label htmlFor="ministry_teams" className="block text-sm font-medium text-gray-700 mb-1">
              Ministry Teams
            </label>
            <Input
              id="ministry_teams"
              name="ministry_teams"
              type="text"
              value={formData.ministry_teams || ''}
              onChange={handleChange}
              placeholder="e.g., Worship, Youth Ministry, Outreach"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter ministry teams separated by commas
            </p>
            {errors.ministry_teams && (
              <p className="text-sm text-red-600 mt-1">{errors.ministry_teams}</p>
            )}
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
              {isSubmitting ? 'Saving...' : leadership ? 'Update Profile' : 'Add Profile'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadershipForm;
