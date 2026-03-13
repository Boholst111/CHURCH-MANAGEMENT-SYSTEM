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
import { Search, Upload, X } from 'lucide-react';
import api from '../../lib/api';

/**
 * Small group interface
 */
export interface SmallGroup {
  id: number;
  name: string;
  description: string | null;
  leader_name: string;
  leader_id?: number | null;
  meeting_day: string;
  meeting_time: string;
  location: string;
  photo?: File | string | null;
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
  leader_id?: number | null;
  meeting_day: string;
  meeting_time: string;
  location: string;
  photo?: File | string | null;
}

/**
 * Member interface for leader selector
 */
interface Member {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
}

/**
 * Validation errors interface
 */
export interface ValidationErrors {
  name?: string;
  description?: string;
  leader_name?: string;
  leader_id?: string;
  meeting_day?: string;
  meeting_time?: string;
  location?: string;
  photo?: string;
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
 * - Leader selector with search functionality
 * - Photo upload with preview
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * - Meeting day dropdown with all days of the week
 * - Schedule picker (day and time)
 * 
 * Validates Requirements: 8.4
 * Design Reference: Small Groups Page Design section
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
    leader_id: null,
    meeting_day: 'Sunday',
    meeting_time: '18:00',
    location: '',
    photo: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Leader selector state
  const [leaderSearch, setLeaderSearch] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [showLeaderDropdown, setShowLeaderDropdown] = useState(false);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  
  // Photo upload state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
   * Load members for leader selector
   */
  useEffect(() => {
    if (isOpen) {
      loadMembers();
    }
  }, [isOpen]);

  /**
   * Fetch members from API
   */
  const loadMembers = async () => {
    try {
      setIsLoadingMembers(true);
      const response = await api.get('/members');
      setMembers(response.data.data || []);
    } catch (error) {
      console.error('Error loading members:', error);
      setMembers([]);
    } finally {
      setIsLoadingMembers(false);
    }
  };

  /**
   * Filter members based on search query
   */
  useEffect(() => {
    if (leaderSearch.trim() === '') {
      setFilteredMembers(members.slice(0, 10)); // Show first 10 members
    } else {
      const searchLower = leaderSearch.toLowerCase();
      const filtered = members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchLower) ||
          member.email.toLowerCase().includes(searchLower)
      );
      setFilteredMembers(filtered.slice(0, 10)); // Limit to 10 results
    }
  }, [leaderSearch, members]);

  /**
   * Initialize form data when smallGroup prop changes
   */
  useEffect(() => {
    if (smallGroup) {
      setFormData({
        name: smallGroup.name,
        description: smallGroup.description,
        leader_name: smallGroup.leader_name,
        leader_id: smallGroup.leader_id || null,
        meeting_day: smallGroup.meeting_day,
        meeting_time: smallGroup.meeting_time,
        location: smallGroup.location,
        photo: smallGroup.photo || null,
      });
      setLeaderSearch(smallGroup.leader_name);
      
      // Set photo preview if editing and photo exists
      if (smallGroup.photo && typeof smallGroup.photo === 'string') {
        setPhotoPreview(smallGroup.photo);
      }
    } else {
      // Reset form for new small group
      setFormData({
        name: '',
        description: null,
        leader_name: '',
        leader_id: null,
        meeting_day: 'Sunday',
        meeting_time: '18:00',
        location: '',
        photo: null,
      });
      setLeaderSearch('');
      setPhotoPreview(null);
    }
    setErrors({});
    setShowLeaderDropdown(false);
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

    // Validate photo if present
    if (formData.photo && formData.photo instanceof File) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(formData.photo.type)) {
        newErrors.photo = 'Photo must be a valid image file (JPEG, PNG, GIF, or WebP)';
      }
      
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.photo.size > maxSize) {
        newErrors.photo = 'Photo must be less than 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle leader selection from dropdown
   */
  const handleLeaderSelect = (member: Member) => {
    setFormData((prev) => ({
      ...prev,
      leader_name: member.name,
      leader_id: member.id,
    }));
    setLeaderSearch(member.name);
    setShowLeaderDropdown(false);
    
    // Clear error for leader field
    if (errors.leader_name) {
      setErrors((prev) => ({
        ...prev,
        leader_name: undefined,
      }));
    }
  };

  /**
   * Handle leader search input change
   */
  const handleLeaderSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLeaderSearch(value);
    setFormData((prev) => ({
      ...prev,
      leader_name: value,
      leader_id: null, // Clear leader_id when manually typing
    }));
    setShowLeaderDropdown(true);
    
    // Clear error for leader field
    if (errors.leader_name) {
      setErrors((prev) => ({
        ...prev,
        leader_name: undefined,
      }));
    }
  };

  /**
   * Handle photo file selection
   */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear photo error
      if (errors.photo) {
        setErrors((prev) => ({
          ...prev,
          photo: undefined,
        }));
      }
    }
  };

  /**
   * Handle photo removal
   */
  const handlePhotoRemove = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
    }));
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
      // If photo is a File, we need to use FormData
      if (formData.photo instanceof File) {
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('description', formData.description || '');
        submitData.append('leader_name', formData.leader_name);
        if (formData.leader_id) {
          submitData.append('leader_id', String(formData.leader_id));
        }
        submitData.append('meeting_day', formData.meeting_day);
        submitData.append('meeting_time', formData.meeting_time);
        submitData.append('location', formData.location);
        submitData.append('photo', formData.photo);
        
        await onSubmit(submitData as any);
      } else {
        // Submit as regular JSON
        await onSubmit(formData);
      }
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

          {/* Leader Name with Search */}
          <div className="relative">
            <label htmlFor="leader_name" className="block text-sm font-medium text-gray-700 mb-1">
              Leader <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="leader_name"
                name="leader_name"
                type="text"
                placeholder="Search for a member..."
                value={leaderSearch}
                onChange={handleLeaderSearchChange}
                onFocus={() => setShowLeaderDropdown(true)}
                onBlur={() => {
                  // Delay to allow click on dropdown item
                  setTimeout(() => setShowLeaderDropdown(false), 200);
                }}
                className={`pl-10 ${errors.leader_name ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
            </div>
            {errors.leader_name && (
              <p className="text-sm text-red-600 mt-1">{errors.leader_name}</p>
            )}
            
            {/* Leader Dropdown */}
            {showLeaderDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {isLoadingMembers ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Loading members...</div>
                ) : filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleLeaderSelect(member)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 text-sm font-medium">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{member.email}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    {leaderSearch.trim() === '' ? 'Start typing to search...' : 'No members found'}
                  </div>
                )}
              </div>
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

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Photo
            </label>
            <div className="space-y-3">
              {/* Photo Preview */}
              {photoPreview && (
                <div className="relative inline-block">
                  <img
                    src={photoPreview}
                    alt="Group photo preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handlePhotoRemove}
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
                  onChange={handlePhotoChange}
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
                  {photoPreview ? 'Change Photo' : 'Upload Photo'}
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: Square image, max 5MB (JPEG, PNG, GIF, or WebP)
                </p>
              </div>
            </div>
            {errors.photo && (
              <p className="text-sm text-red-600 mt-1">{errors.photo}</p>
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
