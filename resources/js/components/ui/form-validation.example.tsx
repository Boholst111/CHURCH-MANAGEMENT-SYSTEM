/**
 * Form Validation Example Component
 * 
 * Demonstrates all form validation error handling features:
 * - Inline error messages for invalid fields
 * - Highlighting invalid fields with red borders
 * - Focusing first invalid field on submit
 * - Error summary at top of form
 * - Clearing errors when field becomes valid
 * 
 * Validates Requirements: 22.4
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from './input';
import { Button } from './button';
import { FormErrorSummary } from './form-error-summary';
import { useFormValidation } from '../../hooks/useFormValidation';
import { Mail, User, Phone, MapPin } from 'lucide-react';

// Validation schema
const memberSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits'),
  address: z
    .string()
    .min(1, 'Address is required')
    .min(10, 'Address must be at least 10 characters'),
});

type MemberFormData = z.infer<typeof memberSchema>;

export const FormValidationExample: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  const {
    errorSummaryRef,
    handleValidationErrors,
    getErrorCount,
  } = useFormValidation(setFocus, {
    focusFirstError: true,
    scrollToError: true,
    scrollBehavior: 'smooth',
  });

  const onSubmit = async (data: MemberFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    // Handle validation errors
    handleValidationErrors(errors);
  };

  const errorCount = getErrorCount(errors);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            Add New Member
          </h2>
          <p className="text-neutral-600 mt-2">
            Fill in the member information below. All fields are required.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* Error Summary */}
          {errorCount > 0 && (
            <FormErrorSummary
              ref={errorSummaryRef}
              errors={errors}
              title="Please fix the following errors"
              showCount={true}
              showMessages={true}
            />
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div
              role="alert"
              className="bg-success-50 border border-success-200 rounded-lg p-4"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-success-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-success-900">
                    Member added successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('firstName')}
              type="text"
              label="First Name"
              placeholder="John"
              error={errors.firstName?.message}
              icon={<User className="h-5 w-5" />}
              iconPosition="left"
              disabled={isSubmitting}
              required
            />

            <Input
              {...register('lastName')}
              type="text"
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
              icon={<User className="h-5 w-5" />}
              iconPosition="left"
              disabled={isSubmitting}
              required
            />
          </div>

          <Input
            {...register('email')}
            type="email"
            label="Email Address"
            placeholder="john.doe@example.com"
            error={errors.email?.message}
            helperText="We'll use this email for communication"
            icon={<Mail className="h-5 w-5" />}
            iconPosition="left"
            disabled={isSubmitting}
            required
          />

          <Input
            {...register('phone')}
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            error={errors.phone?.message}
            icon={<Phone className="h-5 w-5" />}
            iconPosition="left"
            disabled={isSubmitting}
            required
          />

          <Input
            {...register('address')}
            type="text"
            label="Address"
            placeholder="123 Main St, City, State 12345"
            error={errors.address?.message}
            icon={<MapPin className="h-5 w-5" />}
            iconPosition="left"
            disabled={isSubmitting}
            required
          />

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-neutral-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Member...' : 'Add Member'}
            </Button>
          </div>
        </form>

        {/* Feature Highlights */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">
            Form Validation Features:
          </h3>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Inline error messages for each invalid field</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Red borders highlight invalid fields</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>First invalid field is automatically focused on submit</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Error summary at top shows all validation errors</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Errors clear automatically when field becomes valid</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Real-time validation on blur for better UX</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
