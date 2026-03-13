import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X } from 'lucide-react';
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
import { Member } from './MemberTable';

/**
 * Form validation schema using Zod
 */
const memberFormSchema = z.object({
  first_name: z.string()
    .min(1, 'First name is required')
    .max(100, 'First name must be 100 characters or less'),
  last_name: z.string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be 100 characters or less'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  status: z.enum(['active', 'visitor']),
  membership_type: z.enum(['regular', 'associate', 'visitor']),
  small_group_id: z.number().nullable(),
  date_joined: z.string().min(1, 'Date joined is required'),
  birth_date: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']),
});

type MemberFormValues = z.infer<typeof memberFormSchema>;

/**
 * Form data interface for member creation/editing
 */
export interface MemberFormData extends Omit<MemberFormValues, 'birth_date'> {
  birth_date: string | null;
  photo?: File | null;
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
  membership_type?: string;
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
 * - Form validation with react-hook-form and zod
 * - Photo upload functionality with preview
 * - Inline error messages
 * - Support for both create and edit modes
 * - Small group and membership type selection
 * - Loading states during submission
 * 
 * Validates Requirements: 3.4, 3.5, 3.6
 * Design Reference: Modal with Form example
 */
const MemberForm: React.FC<MemberFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  member = null,
  smallGroups = [],
  isLoading = false,
}) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      status: 'active',
      membership_type: 'regular',
      small_group_id: null,
      date_joined: new Date().toISOString().split('T')[0],
      birth_date: '',
      gender: 'male',
    },
  });

  const statusValue = watch('status');
  const membershipTypeValue = watch('membership_type');
  const smallGroupValue = watch('small_group_id');
  const genderValue = watch('gender');

  /**
   * Initialize form data when member prop changes
   */
  useEffect(() => {
    if (member) {
      reset({
        first_name: member.first_name,
        last_name: member.last_name,
        email: member.email,
        phone: member.phone,
        address: member.address,
        city: member.city,
        status: member.status,
        membership_type: (member as any).membership_type || 'regular',
        small_group_id: member.small_group_id,
        date_joined: member.date_joined.split('T')[0],
        birth_date: member.birth_date ? member.birth_date.split('T')[0] : '',
        gender: member.gender,
      });
      
      // Set photo preview if member has a photo
      if ((member as any).photo_url) {
        setPhotoPreview((member as any).photo_url);
      }
    } else {
      // Reset form for new member
      reset({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        status: 'active',
        membership_type: 'regular',
        small_group_id: null,
        date_joined: new Date().toISOString().split('T')[0],
        birth_date: '',
        gender: 'male',
      });
      setPhotoPreview(null);
      setPhotoFile(null);
    }
  }, [member, isOpen, reset]);

  /**
   * Handle photo file selection
   */
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      setPhotoFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Remove photo
   */
  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  /**
   * Handle form submission
   */
  const onFormSubmit = async (data: MemberFormValues) => {
    setIsSubmitting(true);
    try {
      const formData: MemberFormData = {
        ...data,
        birth_date: data.birth_date || null,
        photo: photoFile,
      };
      await onSubmit(formData);
      // Form will be closed by parent component on success
    } catch (error: any) {
      // Error handling is done in parent component
      console.error('Form submission error:', error);
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
            {member ? 'Edit Member' : 'Add New Member'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Photo Upload */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Member photo preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-200"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 bg-error-500 text-white rounded-full p-1 hover:bg-error-600 transition-colors"
                    aria-label="Remove photo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-neutral-400" />
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <span className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                {photoPreview ? 'Change Photo' : 'Upload Photo'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                disabled={isSubmitting}
              />
            </label>
            <p className="text-xs text-neutral-500">
              JPG, PNG or GIF. Max size 5MB.
            </p>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              {...register('first_name')}
              error={errors.first_name?.message}
              disabled={isSubmitting}
              required
            />

            <Input
              label="Last Name"
              {...register('last_name')}
              error={errors.last_name?.message}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              disabled={isSubmitting}
              required
            />

            <Input
              label="Phone"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Address Fields */}
          <Input
            label="Address"
            {...register('address')}
            error={errors.address?.message}
            disabled={isSubmitting}
            required
          />

          <Input
            label="City"
            {...register('city')}
            error={errors.city?.message}
            disabled={isSubmitting}
            required
          />

          {/* Status, Membership Type, and Small Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Status"
              value={statusValue}
              onChange={(value) => setValue('status', value as 'active' | 'visitor')}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'visitor', label: 'Visitor' },
              ]}
              error={errors.status?.message}
              disabled={isSubmitting}
              required
            />

            <Select
              label="Membership Type"
              value={membershipTypeValue}
              onChange={(value) => setValue('membership_type', value as 'regular' | 'associate' | 'visitor')}
              options={[
                { value: 'regular', label: 'Regular Member' },
                { value: 'associate', label: 'Associate Member' },
                { value: 'visitor', label: 'Visitor' },
              ]}
              error={errors.membership_type?.message}
              disabled={isSubmitting}
              required
            />

            <Select
              label="Small Group"
              value={smallGroupValue?.toString() || ''}
              onChange={(value) => {
                const val = Array.isArray(value) ? value[0] : value;
                setValue('small_group_id', val ? parseInt(val) : null);
              }}
              options={[
                { value: '', label: 'None' },
                ...smallGroups.map((group) => ({
                  value: group.id.toString(),
                  label: group.name,
                })),
              ]}
              disabled={isSubmitting}
            />
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date Joined"
              type="date"
              {...register('date_joined')}
              error={errors.date_joined?.message}
              disabled={isSubmitting}
              required
            />

            <Input
              label="Birth Date"
              type="date"
              {...register('birth_date')}
              error={errors.birth_date?.message}
              disabled={isSubmitting}
            />
          </div>

          {/* Gender */}
          <Select
            label="Gender"
            value={genderValue}
            onChange={(value) => setValue('gender', value as 'male' | 'female' | 'other')}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            error={errors.gender?.message}
            disabled={isSubmitting}
            required
          />

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
