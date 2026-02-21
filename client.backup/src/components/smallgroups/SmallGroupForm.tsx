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

/**
 * Small group interface
 */
export interface SmallGroup {
  id: number;
  name: string;
  description: string | null;
  leader_name: string;
  meeting_day: string;
  meeting_time: string;
  location: string;
  created_at: string;
  updated_at: string;
  member_count?: number;
}

/**
 * Form data interface for small group creation/editing
 */
export interface SmallGroupFormData {
  name: string;
  description: string | null;
  leader_name: string;
  meeting_day: string;
  meeting_time: string;
  location: string;
}

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  name?: string;
  description?: string;
  leader_name?: string;
  meeting_day?: string;
  meeting_time?: string;
  location?: string;
}

/**
 * SmallGroupForm Props
 */
export interface SmallGroupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SmallGroupFormData) => Promise<void>;
  smallGroup?: SmallGroup | null;
  isLoading?: boolean;
}

/**
 * SmallGroupForm Component
 * 
 * Form for adding or editing small group records.
 * 
 * Features:
 * - Input fields for name, description, leader, meeting details
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * - Meeting day dropdown with all days of the week
 * 
 * Validates Requirements: 8.4
 */
const SmallGroupForm: React.FC<SmallGroupFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  smallGroup = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<SmallGroupFormData>({
    name: '',
    description: null,
    leader_name: '',
    meeting_day: 'Sunday',
    meeting_time: '18:00',
    location: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Days of the week for dropdown
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  /**
   * Initialize form data when smallGroup prop changes
   */
  useEffect(() => {
    if (smallGroup) {
      setFormData({
        name: smallGroup.name,
        description: smallGroup.description,
        leader_name: smallGroup.leader_name,
        meeting_day: smallGroup.meeting_day,
        meeting_time: smallGroup.meeting_time,
        location: smallGroup.location,
      });
    } else {
      // Reset form for new small group
      setFormData({
        name: '',
        description: null,
        leader_name: '',
        meeting_day: 'Sunday',
        meeting_time: '18:00',
        location: '',
      });
    }
    setErrors({});
  }, [smallGroup, isOpen]);

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Group name must be 100 characters or less';
    }

    if (!formData.leader_name.trim()) {
      newErrors.leader_name = 'Leader name is required';
    } else if (formData.leader_name.length > 100) {
      newErrors.leader_name = 'Leader name must be 100 characters or less';
    }

    if (!formData.meeting_day) {
      newErrors.meeting_day = 'Meeting day is required';
    } else if (!daysOfWeek.includes(formData.meeting_day)) {
      newErrors.meeting_day = 'Please select a valid day of the week';
    }

    if (!formData.meeting_time) {
      newErrors.meeting_time = 'Meeting time is required';
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.meeting_time)) {
      newErrors.meeting_time = 'Please enter a valid time (HH:MM)';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.length > 200) {
      newErrors.location = 'Location must be 200 characters or less';
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

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      // Don't automatically close the dialog
      // The dialog will only close when onClose is explicitly called
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {smallGroup ? 'Edit Small Group' : 'Add New Small Group'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Group Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Group Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Young Adults Fellowship"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Brief description of the group's purpose and activities..."
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Leader Name */}
          <div>
            <label htmlFor="leader_name" className="block text-sm font-medium text-gray-700 mb-1">
              Leader Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="leader_name"
              name="leader_name"
              type="text"
              placeholder="e.g., John Smith"
              value={formData.leader_name}
              onChange={handleChange}
              className={errors.leader_name ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.leader_name && (
              <p className="text-sm text-red-600 mt-1">{errors.leader_name}</p>
            )}
          </div>

          {/* Meeting Day and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="meeting_day" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Day <span className="text-red-500">*</span>
              </label>
              <select
                id="meeting_day"
                name="meeting_day"
                value={formData.meeting_day}
                onChange={handleChange}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={isSubmitting}
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {errors.meeting_day && (
                <p className="text-sm text-red-600 mt-1">{errors.meeting_day}</p>
              )}
            </div>

            <div>
              <label htmlFor="meeting_time" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Time <span className="text-red-500">*</span>
              </label>
              <Input
                id="meeting_time"
                name="meeting_time"
                type="time"
                value={formData.meeting_time}
                onChange={handleChange}
                className={errors.meeting_time ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.meeting_time && (
                <p className="text-sm text-red-600 mt-1">{errors.meeting_time}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="e.g., Church Fellowship Hall"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.location && (
              <p className="text-sm text-red-600 mt-1">{errors.location}</p>
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
              {isSubmitting ? 'Saving...' : smallGroup ? 'Update Group' : 'Add Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SmallGroupForm;
