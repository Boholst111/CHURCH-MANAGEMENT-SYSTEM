import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemberForm from '../MemberForm';

/**
 * Mobile Form Optimization Tests for MemberForm
 * 
 * Tests mobile-specific features:
 * - Form fields stack vertically on mobile
 * - Grid layouts become single column on mobile
 * - Touch-friendly input heights
 * - Modal fits mobile screens
 * 
 * Validates: Task 19.3 - Optimize forms for mobile
 */
describe('MemberForm - Mobile Optimizations', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockSmallGroups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Field Layout', () => {
    it('should render form with proper grid layout classes', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Check for grid layouts that stack on mobile
      const nameFieldsContainer = screen.getByLabelText(/First Name/i).closest('.grid');
      expect(nameFieldsContainer).toHaveClass('grid-cols-1'); // Single column on mobile
      expect(nameFieldsContainer).toHaveClass('md:grid-cols-2'); // Two columns on tablet+
    });

    it('should have all required form fields', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Verify all fields are present
      expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    });

    it('should use proper input types for mobile keyboards', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Email field should have email type
      const emailInput = screen.getByLabelText(/Email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('inputMode', 'email');

      // Phone field should have tel type
      const phoneInput = screen.getByLabelText(/Phone/i);
      expect(phoneInput).toHaveAttribute('type', 'tel');
      expect(phoneInput).toHaveAttribute('inputMode', 'tel');
    });

    it('should have touch-friendly input heights', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const firstNameInput = screen.getByLabelText(/First Name/i);
      
      // Should have minimum 44px height for touch targets
      expect(firstNameInput).toHaveClass('min-h-[44px]');
    });
  });

  describe('Contact Fields Grid', () => {
    it('should stack email and phone fields on mobile', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const emailInput = screen.getByLabelText(/Email/i);
      const contactFieldsContainer = emailInput.closest('.grid');
      
      expect(contactFieldsContainer).toHaveClass('grid-cols-1'); // Single column on mobile
      expect(contactFieldsContainer).toHaveClass('md:grid-cols-2'); // Two columns on tablet+
    });
  });

  describe('Status and Membership Fields', () => {
    it('should stack status, membership type, and small group fields on mobile', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Find the grid container by looking for the first grid with 3 columns on desktop
      const grids = document.querySelectorAll('.grid');
      const statusContainer = Array.from(grids).find(grid => 
        grid.classList.contains('md:grid-cols-3')
      );
      
      expect(statusContainer).toBeTruthy();
      expect(statusContainer).toHaveClass('grid-cols-1'); // Single column on mobile
      expect(statusContainer).toHaveClass('md:grid-cols-3'); // Three columns on tablet+
    });
  });

  describe('Date Fields', () => {
    it('should stack date fields on mobile', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const dateJoinedInput = screen.getByLabelText(/Date Joined/i);
      const dateFieldsContainer = dateJoinedInput.closest('.grid');
      
      expect(dateFieldsContainer).toHaveClass('grid-cols-1'); // Single column on mobile
      expect(dateFieldsContainer).toHaveClass('md:grid-cols-2'); // Two columns on tablet+
    });
  });

  describe('Form Actions', () => {
    it('should have cancel and submit buttons', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Add Member/i })).toBeInTheDocument();
    });

    it('should have touch-friendly button heights', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const submitButton = screen.getByRole('button', { name: /Add Member/i });
      
      // Buttons should have minimum 44px height
      expect(submitButton).toHaveClass('min-h-[44px]');
    });
  });

  describe('Photo Upload', () => {
    it('should render photo upload section', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Photo upload button should be present
      expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();
    });

    it('should have touch-friendly upload button', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const uploadButton = screen.getByText(/Upload Photo/i);
      expect(uploadButton).toBeInTheDocument();
    });
  });

  describe('Modal Container', () => {
    it('should render in a dialog that fits mobile screens', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const dialog = screen.getByRole('dialog');
      
      // Dialog should have mobile-optimized classes from our dialog component
      // Note: MemberForm uses max-w-2xl which overrides some dialog defaults
      expect(dialog).toHaveClass('overflow-y-auto'); // Scrollable
      expect(dialog).toHaveClass('w-[100vw]'); // Full width on mobile
      expect(dialog).toHaveClass('sm:w-full'); // Normal width on desktop
    });
  });

  describe('Edit Mode', () => {
    it('should populate form fields when editing a member', () => {
      const mockMember = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        city: 'Springfield',
        status: 'active' as const,
        membership_type: 'regular' as const,
        small_group_id: 1,
        date_joined: '2024-01-01T00:00:00Z',
        birth_date: '1990-01-01T00:00:00Z',
        gender: 'male' as const,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={mockMember}
          smallGroups={mockSmallGroups}
        />
      );

      // Verify fields are populated
      expect(screen.getByLabelText(/First Name/i)).toHaveValue('John');
      expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
      expect(screen.getByLabelText(/Email/i)).toHaveValue('john@example.com');
      expect(screen.getByLabelText(/Phone/i)).toHaveValue('1234567890');
    });
  });
});
