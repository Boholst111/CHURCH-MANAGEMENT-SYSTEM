import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';

/**
 * Invite User Modal Props
 */
interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InviteUserFormData) => Promise<void>;
}

/**
 * Invite User Form Data
 */
export interface InviteUserFormData {
  email: string;
  role: 'admin' | 'pastor' | 'staff' | 'volunteer' | 'readonly';
}

/**
 * Invite User Modal Component
 * 
 * Modal for inviting new users via email.
 * Sends an invitation email with a setup link.
 * 
 * Features:
 * - Email input with validation
 * - Role selection
 * - Form validation
 * - Loading state during submission
 */
const InviteUserModal: React.FC<InviteUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'pastor' | 'staff' | 'volunteer' | 'readonly'>('staff');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; role?: string }>({});

  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    const newErrors: { email?: string; role?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ email, role });
      
      // Reset form on success
      setEmail('');
      setRole('staff');
      setErrors({});
    } catch (error) {
      // Error is handled by parent component
      console.error('Error inviting user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle modal close
   */
  const handleClose = () => {
    if (!isSubmitting) {
      setEmail('');
      setRole('staff');
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Invite User"
      description="Send an invitation email to a new user"
      size="md"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Email Input */}
        <div>
          <Input
            type="email"
            label="Email Address"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({ ...errors, email: undefined });
              }
            }}
            error={errors.email}
            required
            disabled={isSubmitting}
            icon={<Mail className="h-4 w-4" />}
            iconPosition="left"
          />
          <p className="mt-2 text-sm text-neutral-600">
            An invitation email will be sent to this address with a setup link.
          </p>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Role <span className="text-error-600">*</span>
          </label>
          <Select
            value={role}
            onChange={(value) => {
              setRole(value as 'admin' | 'pastor' | 'staff' | 'volunteer' | 'readonly');
              if (errors.role) {
                setErrors({ ...errors, role: undefined });
              }
            }}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'pastor', label: 'Pastor' },
              { value: 'staff', label: 'Staff' },
              { value: 'volunteer', label: 'Volunteer' },
              { value: 'readonly', label: 'Read-Only' },
            ]}
            disabled={isSubmitting}
          />
          {errors.role && (
            <p className="mt-1 text-sm text-error-600">{errors.role}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteUserModal;
