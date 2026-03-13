import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Upload, X } from 'lucide-react';
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
  category: 'worship' | 'outreach' | 'fellowship' | 'training';
  capacity?: number | null;
  image?: File | string | null;
  status?: 'upcoming' | 'completed' | 'cancelled';
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
  category?: string;
  capacity?: string;
  image?: string;
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
 * - Input fields for title, description, date, time, location, category, capacity, image
 * - Date and time pickers
 * - Category selector (Worship, Outreach, Fellowship, Training)
 * - Image upload functionality with preview
 * - Form validation with inline error messages
 * - Validates date is not in the past
 * - Support for both create and edit modes
 * - Loading states during submission
 * 
 * Validates Requirements: 9.1, 9.4
 * Design Reference: Events Page Design section
 * Task: 12.4 Create Add/Edit Event modal
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
    category: 'worship',
    capacity: null,
    image: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        category: (event as any).category || 'worship',
        capacity: (event as any).capacity || null,
        image: (event as any).image || null,
      });
      
      // Set image preview if editing and image exists
      if ((event as any).image && typeof (event as any).image === 'string') {
        setImagePreview((event as any).image);
      }
    } else {
      // Reset form for new event
      setFormData({
        title: '',
        description: '',
        event_date: '',
        event_time: '',
        location: '',
        category: 'worship',
        capacity: null,
        image: null,
      });
      setImagePreview(null);
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
    } else if (!event) {
      // Only validate date is not in the past for new events
      const selectedDate = new Date(formData.event_date + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.event_date = 'Event date cannot be in the past';
      }
    }

    if (!formData.event_time) {
      newErrors.event_time = 'Time is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.length > 200) {
      newErrors.location = 'Location must be 200 characters or less';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    // Validate capacity if provided
    if (formData.capacity !== null && formData.capacity !== undefined) {
      const capacityNum = Number(formData.capacity);
      if (isNaN(capacityNum) || capacityNum < 1) {
        newErrors.capacity = 'Capacity must be a positive number';
      }
    }

    // Validate image if present
    if (formData.image && formData.image instanceof File) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(formData.image.type)) {
        newErrors.image = 'Image must be a valid image file (JPEG, PNG, GIF, or WebP)';
      }
      
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.image.size > maxSize) {
        newErrors.image = 'Image must be less than 5MB';
      }
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
   * Handle image file selection
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear image error
      if (errors.image) {
        setErrors((prev) => ({
          ...prev,
          image: undefined,
        }));
      }
    }
  };

  /**
   * Handle image removal
   */
  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setIsSubmitting(true);
    try {
      // If image is a File, we need to use FormData
      if (formData.image instanceof File) {
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('description', formData.description || '');
        submitData.append('event_date', formData.event_date);
        submitData.append('event_time', formData.event_time);
        submitData.append('location', formData.location);
        submitData.append('category', formData.category);
        if (formData.capacity !== null && formData.capacity !== undefined) {
          submitData.append('capacity', String(formData.capacity));
        }
        submitData.append('status', event?.status || 'upcoming');
        submitData.append('image', formData.image);
        
        await onSubmit(submitData as any);
      } else {
        // Submit as regular JSON
        const submitData = {
          ...formData,
          status: event?.status || 'upcoming' as const,
        };
        console.log('EventForm submitting data:', submitData);
        await onSubmit(submitData);
      }
      console.log('EventForm submission successful, closing form');
      onClose();
    } catch (error: any) {
      console.error('EventForm submission error:', error);
      console.error('Error response data:', error.response?.data);
      // Handle server-side validation errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      // Show alert with error details
      alert('Error creating event: ' + (error.response?.data?.message || error.message));
      // Don't close the form if there's an error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !isSubmitting) {
        onClose();
      }
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

          {/* Category and Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                label="Category"
                value={formData.category}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    category: value as 'worship' | 'outreach' | 'fellowship' | 'training',
                  }));
                  if (errors.category) {
                    setErrors((prev) => ({
                      ...prev,
                      category: undefined,
                    }));
                  }
                }}
                options={[
                  { value: 'worship', label: 'Worship' },
                  { value: 'outreach', label: 'Outreach' },
                  { value: 'fellowship', label: 'Fellowship' },
                  { value: 'training', label: 'Training' },
                ]}
                error={errors.category}
                disabled={isSubmitting}
                required
              />
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacity (Optional)
              </label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                placeholder="e.g., 100"
                value={formData.capacity || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    capacity: value ? parseInt(value) : null,
                  }));
                  if (errors.capacity) {
                    setErrors((prev) => ({
                      ...prev,
                      capacity: undefined,
                    }));
                  }
                }}
                className={errors.capacity ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.capacity && (
                <p className="text-sm text-red-600 mt-1">{errors.capacity}</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Image (Optional)
            </label>
            <div className="space-y-3">
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Event image preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {/* Upload Button */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {imagePreview ? 'Change Image' : 'Upload Image'}
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 16:9 aspect ratio, max 5MB (JPEG, PNG, GIF, or WebP)
                </p>
              </div>
            </div>
            {errors.image && (
              <p className="text-sm text-red-600 mt-1">{errors.image}</p>
            )}
          </div>

          {/* Form Actions */}
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                console.log('Cancel button clicked');
                onClose();
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              onClick={() => console.log('Submit button clicked')}
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
