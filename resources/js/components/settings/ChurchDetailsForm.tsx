import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../../contexts/ToastContext';
import api from '../../lib/api';

/**
 * Church settings data interface
 */
export interface ChurchSettings {
  id: number;
  church_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  service_times: string;
}

/**
 * Form data interface
 */
export interface ChurchDetailsFormData {
  church_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  service_times: string;
}

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  church_name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone?: string;
  email?: string;
  website?: string;
  service_times?: string;
}

/**
 * ChurchDetailsForm Component
 * 
 * Form for managing church information including name, address, contact details, and service times.
 * 
 * Features:
 * - Input fields for all church details
 * - Form validation with inline error messages
 * - Loads existing church settings on mount
 * - Displays success/error messages via toast notifications
 * 
 * Validates Requirements: 6.1, 6.4
 */
const ChurchDetailsForm: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ChurchDetailsFormData>({
    church_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    email: '',
    website: '',
    service_times: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Load church settings on component mount
   */
  useEffect(() => {
    loadChurchSettings();
  }, []);

  /**
   * Fetch church settings from API
   */
  const loadChurchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/settings/church');
      if (response.data.success && response.data.data) {
        const settings = response.data.data;
        setFormData({
          church_name: settings.church_name || '',
          address: settings.address || '',
          city: settings.city || '',
          state: settings.state || '',
          zip_code: settings.zip_code || '',
          phone: settings.phone || '',
          email: settings.email || '',
          website: settings.website || '',
          service_times: settings.service_times || '',
        });
      }
    } catch (error: any) {
      console.error('Failed to load church settings:', error);
      showToast('error', 'Failed to load church settings');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required fields
    if (!formData.church_name.trim()) {
      newErrors.church_name = 'Church name is required';
    } else if (formData.church_name.length > 200) {
      newErrors.church_name = 'Church name must be 200 characters or less';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length > 200) {
      newErrors.address = 'Address must be 200 characters or less';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zip_code.trim()) {
      newErrors.zip_code = 'Zip code is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Optional website validation
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL (e.g., https://example.com)';
    }

    if (!formData.service_times.trim()) {
      newErrors.service_times = 'Service times are required';
    } else if (formData.service_times.length > 500) {
      newErrors.service_times = 'Service times must be 500 characters or less';
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
      showToast('error', 'Please correct the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.put('/settings/church', formData);
      
      if (response.data.success) {
        showToast('success', 'Church settings saved successfully');
      }
    } catch (error: any) {
      console.error('Failed to save church settings:', error);
      
      // Handle server-side validation errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        showToast('error', 'Please correct the errors in the form');
      } else {
        showToast('error', error.response?.data?.message || 'Failed to save church settings');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading church settings...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Church Name */}
      <div>
        <label htmlFor="church_name" className="block text-sm font-medium text-gray-700 mb-1">
          Church Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="church_name"
          name="church_name"
          type="text"
          value={formData.church_name}
          onChange={handleChange}
          className={errors.church_name ? 'border-red-500' : ''}
          disabled={isSubmitting}
          placeholder="Mahayahay Free Methodist Church"
        />
        {errors.church_name && (
          <p className="text-sm text-red-600 mt-1">{errors.church_name}</p>
        )}
      </div>

      {/* Address */}
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
          placeholder="123 Main Street"
        />
        {errors.address && (
          <p className="text-sm text-red-600 mt-1">{errors.address}</p>
        )}
      </div>

      {/* City, State, Zip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            placeholder="Mahayahay"
          />
          {errors.city && (
            <p className="text-sm text-red-600 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State/Province <span className="text-red-500">*</span>
          </label>
          <Input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? 'border-red-500' : ''}
            disabled={isSubmitting}
            placeholder="Surigao del Sur"
          />
          {errors.state && (
            <p className="text-sm text-red-600 mt-1">{errors.state}</p>
          )}
        </div>

        <div>
          <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
            Zip Code <span className="text-red-500">*</span>
          </label>
          <Input
            id="zip_code"
            name="zip_code"
            type="text"
            value={formData.zip_code}
            onChange={handleChange}
            className={errors.zip_code ? 'border-red-500' : ''}
            disabled={isSubmitting}
            placeholder="8305"
          />
          {errors.zip_code && (
            <p className="text-sm text-red-600 mt-1">{errors.zip_code}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'border-red-500' : ''}
            disabled={isSubmitting}
            placeholder="+63 123 456 7890"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

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
            placeholder="info@mahayahayfreemethodist.org"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          className={errors.website ? 'border-red-500' : ''}
          disabled={isSubmitting}
          placeholder="https://www.mahayahayfreemethodist.org"
        />
        {errors.website && (
          <p className="text-sm text-red-600 mt-1">{errors.website}</p>
        )}
      </div>

      {/* Service Times */}
      <div>
        <label htmlFor="service_times" className="block text-sm font-medium text-gray-700 mb-1">
          Service Times <span className="text-red-500">*</span>
        </label>
        <textarea
          id="service_times"
          name="service_times"
          value={formData.service_times}
          onChange={handleChange}
          className={`flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.service_times ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
          placeholder="Sunday Worship: 9:00 AM&#10;Sunday School: 10:30 AM&#10;Wednesday Prayer: 7:00 PM"
          rows={4}
        />
        {errors.service_times && (
          <p className="text-sm text-red-600 mt-1">{errors.service_times}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Enter service times, one per line
        </p>
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

export default ChurchDetailsForm;
