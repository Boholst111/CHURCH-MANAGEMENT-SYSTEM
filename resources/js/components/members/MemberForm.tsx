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
import { Member } from './MemberTable';

/**
 * Form data interface for member creation/editing
 */
export interface MemberFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'visitor';
  small_group_id: number | null;
  date_joined: string;
  birth_date: string;
  gender: 'male' | 'female' | 'other';
}

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  status?: string;
  date_joined?: string;
  birth_date?: string;
  gender?: string;
}

/**
 * Small group interface for dropdown
 */
export interface SmallGroup {
  id: number;
  name: string;
}

/**
 * MemberForm Props
 */
export interface MemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MemberFormData) => Promise<void>;
  member?: Member | null;
  smallGroups?: SmallGroup[];
  isLoading?: boolean;
}

/**
 * MemberForm Component
 * 
 * Form for adding or editing church member records.
 * 
 * Features:
 * - Input fields for all member properties
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * - Small group selection dropdown
 * 
 * Validates Requirements: 3.4, 3.5, 3.6
 */
const MemberForm: React.FC<MemberFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  member = null,
  smallGroups = [],
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<MemberFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    status: 'active',
    small_group_id: null,
    date_joined: new Date().toISOString().split('T')[0],
    birth_date: '',
    gender: 'male',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Initialize form data when member prop changes
   */
  useEffect(() => {
    if (member) {
      setFormData({
        first_name: member.first_name,
        last_name: member.last_name,
        email: member.email,
        phone: member.phone,
        address: member.address,
        city: member.city,
        status: member.status,
        small_group_id: member.small_group_id,
        date_joined: member.date_joined.split('T')[0],
        birth_date: member.birth_date ? member.birth_date.split('T')[0] : '',
        gender: member.gender,
      });
    } else {
      // Reset form for new member
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        status: 'active',
        small_group_id: null,
        date_joined: new Date().toISOString().split('T')[0],
        birth_date: '',
        gender: 'male',
      });
    }
    setErrors({});
  }, [member, isOpen]);

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

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.date_joined) {
      newErrors.date_joined = 'Date joined is required';
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
      await onSubmit(formData);
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

  /**
   * Handle dialog close
   */
  const handleClose = (open: boolean) => {
    if (!open && !isSubmitting) {
      onClose();
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
            {member ? 'Edit Member' : 'Add New Member'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Address Fields */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.address && (
              <p className="text-sm text-red-600 mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.city && (
              <p className="text-sm text-red-600 mt-1">{errors.city}</p>
            )}
          </div>

          {/* Status and Small Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={isSubmitting}
              >
                <option value="active">Active</option>
                <option value="visitor">Visitor</option>
              </select>
              {errors.status && (
                <p className="text-sm text-red-600 mt-1">{errors.status}</p>
              )}
            </div>

            <div>
              <label htmlFor="small_group_id" className="block text-sm font-medium text-gray-700 mb-1">
                Small Group
              </label>
              <select
                id="small_group_id"
                name="small_group_id"
                value={formData.small_group_id || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    small_group_id: value ? parseInt(value) : null,
                  }));
                }}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={isSubmitting}
              >
                <option value="">None</option>
                {smallGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date_joined" className="block text-sm font-medium text-gray-700 mb-1">
                Date Joined <span className="text-red-500">*</span>
              </label>
              <Input
                id="date_joined"
                name="date_joined"
                type="date"
                value={formData.date_joined}
                onChange={handleChange}
                className={errors.date_joined ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.date_joined && (
                <p className="text-sm text-red-600 mt-1">{errors.date_joined}</p>
              )}
            </div>

            <div>
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
                Birth Date
              </label>
              <Input
                id="birth_date"
                name="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={handleChange}
                className={errors.birth_date ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.birth_date && (
                <p className="text-sm text-red-600 mt-1">{errors.birth_date}</p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={isSubmitting}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
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
              {isSubmitting ? 'Saving...' : member ? 'Update Member' : 'Add Member'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberForm;
