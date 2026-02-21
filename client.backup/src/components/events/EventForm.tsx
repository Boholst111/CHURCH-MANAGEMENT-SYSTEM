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
import { Event } from '../../lib/eventApi';

/**
 * Form data interface for event creation/editing
 */
export interface EventFormData {
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
}

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  title?: string;
  description?: string;
  event_date?: string;
  event_time?: string;
  location?: string;
}

/**
 * EventForm Props
 */
export interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormData) => Promise<void>;
  event?: Event | null;
  isLoading?: boolean;
}

/**
 * EventForm Component
 * 
 * Form for adding or editing church events.
 * 
 * Features:
 * - Input fields for title, date, time, location, description
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * 
 * Validates Requirements: 9.1
 */
const EventForm: React.FC<EventFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  event = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    location: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Initialize form data when event prop changes
   */
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        event_date: event.event_date.split('T')[0],
        event_time: event.event_time.substring(0, 5), // HH:mm format
        location: event.location,
      });
    } else {
      // Reset form for new event
      setFormData({
        title: '',
        description: '',
        event_date: '',
        event_time: '',
        location: '',
      });
    }
    setErrors({});
  }, [event, isOpen]);

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required fields
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    if (!formData.event_date) {
      newErrors.event_date = 'Date is required';
    }

    if (!formData.event_time) {
      newErrors.event_time = 'Time is required';
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            {event ? 'Edit Event' : 'Add New Event'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Sunday Service, Youth Night"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <Input
                id="event_date"
                name="event_date"
                type="date"
                value={formData.event_date}
                onChange={handleChange}
                className={errors.event_date ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.event_date && (
                <p className="text-sm text-red-600 mt-1">{errors.event_date}</p>
              )}
            </div>

            <div>
              <label htmlFor="event_time" className="block text-sm font-medium text-gray-700 mb-1">
                Time <span className="text-red-500">*</span>
              </label>
              <Input
                id="event_time"
                name="event_time"
                type="time"
                value={formData.event_time}
                onChange={handleChange}
                className={errors.event_time ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.event_time && (
                <p className="text-sm text-red-600 mt-1">{errors.event_time}</p>
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
              placeholder="e.g., Main Sanctuary, Youth Hall"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {errors.location && (
              <p className="text-sm text-red-600 mt-1">{errors.location}</p>
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
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Brief description of the event..."
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
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
              {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Add Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
