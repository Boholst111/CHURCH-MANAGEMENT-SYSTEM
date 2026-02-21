import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemberForm, { MemberFormData, SmallGroup } from '../MemberForm';
import { Member } from '../MemberTable';

/**
 * Unit tests for MemberForm small group assignment functionality
 * 
 * Tests member assignment to small groups through the form interface.
 * 
 * Validates Requirements: 8.2, 8.4, 8.5
 */
describe('MemberForm - Small Group Assignment', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockSmallGroups: SmallGroup[] = [
    { id: 1, name: 'Young Adults Fellowship' },
    { id: 2, name: 'Seniors Group' },
    { id: 3, name: 'Youth Ministry' },
  ];

  const mockMember: Member = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St',
    city: 'Springfield',
    status: 'active',
    small_group_id: null,
    date_joined: '2024-01-01',
    birth_date: '1990-01-01',
    gender: 'male',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Small Group Dropdown', () => {
    it('should render small group dropdown with all available groups', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdown = screen.getByLabelText(/small group/i);
      expect(dropdown).toBeInTheDocument();

      // Check that all groups are in the dropdown
      const options = Array.from(dropdown.querySelectorAll('option'));
      expect(options).toHaveLength(4); // 3 groups + "None" option

      expect(options[0].textContent).toBe('None');
      expect(options[1].textContent).toBe('Young Adults Fellowship');
      expect(options[2].textContent).toBe('Seniors Group');
      expect(options[3].textContent).toBe('Youth Ministry');
    });

    it('should default to "None" when creating new member', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdown = screen.getByLabelText(/small group/i) as HTMLSelectElement;
      expect(dropdown.value).toBe('');
    });

    it('should show current small group when editing member with group assignment', () => {
      const memberWithGroup = {
        ...mockMember,
        small_group_id: 2,
      };

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={memberWithGroup}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdown = screen.getByLabelText(/small group/i) as HTMLSelectElement;
      expect(dropdown.value).toBe('2');
    });

    it('should show "None" when editing member without group assignment', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={mockMember}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdown = screen.getByLabelText(/small group/i) as HTMLSelectElement;
      expect(dropdown.value).toBe('');
    });

    it('should handle empty small groups list', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={[]}
        />
      );

      const dropdown = screen.getByLabelText(/small group/i);
      const options = Array.from(dropdown.querySelectorAll('option'));
      expect(options).toHaveLength(1); // Only "None" option
      expect(options[0].textContent).toBe('None');
    });
  });

  describe('Member Assignment to Groups', () => {
    it('should allow assigning member to a small group', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Fill required fields
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Smith' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'jane.smith@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '+1234567890' },
      });
      fireEvent.change(screen.getByLabelText(/^address/i), {
        target: { value: '456 Oak Ave' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Springfield' },
      });

      // Select a small group
      const dropdown = screen.getByLabelText(/small group/i);
      fireEvent.change(dropdown, { target: { value: '1' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            first_name: 'Jane',
            last_name: 'Smith',
            small_group_id: 1,
          })
        );
      });
    });

    it('should allow changing member small group assignment', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      const memberWithGroup = {
        ...mockMember,
        small_group_id: 1,
      };

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={memberWithGroup}
          smallGroups={mockSmallGroups}
        />
      );

      // Change small group
      const dropdown = screen.getByLabelText(/small group/i);
      fireEvent.change(dropdown, { target: { value: '3' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /update member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            small_group_id: 3,
          })
        );
      });
    });

    it('should allow removing member from small group', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      const memberWithGroup = {
        ...mockMember,
        small_group_id: 2,
      };

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={memberWithGroup}
          smallGroups={mockSmallGroups}
        />
      );

      // Change to "None"
      const dropdown = screen.getByLabelText(/small group/i);
      fireEvent.change(dropdown, { target: { value: '' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /update member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            small_group_id: null,
          })
        );
      });
    });

    it('should submit null for small_group_id when "None" is selected', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Fill required fields
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Test' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'User' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '+1234567890' },
      });
      fireEvent.change(screen.getByLabelText(/^address/i), {
        target: { value: 'Test Address' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Test City' },
      });

      // Ensure "None" is selected (default)
      const dropdown = screen.getByLabelText(/small group/i) as HTMLSelectElement;
      expect(dropdown.value).toBe('');

      // Submit form
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            small_group_id: null,
          })
        );
      });
    });
  });

  describe('Form Validation with Small Groups', () => {
    it('should not require small group selection for valid submission', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Fill only required fields (not small group)
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Test' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'User' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '+1234567890' },
      });
      fireEvent.change(screen.getByLabelText(/^address/i), {
        target: { value: 'Test Address' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Test City' },
      });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });

    it('should preserve small group selection when validation fails', async () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Select a small group
      const dropdown = screen.getByLabelText(/small group/i);
      fireEvent.change(dropdown, { target: { value: '2' } });

      // Submit form without required fields
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      });

      // Small group selection should be preserved
      const dropdownAfter = screen.getByLabelText(/small group/i) as HTMLSelectElement;
      expect(dropdownAfter.value).toBe('2');
    });
  });

  describe('Small Group Dropdown Behavior', () => {
    it('should update form data when small group is changed', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdown = screen.getByLabelText(/small group/i) as HTMLSelectElement;

      // Change to group 1
      fireEvent.change(dropdown, { target: { value: '1' } });
      expect(dropdown.value).toBe('1');

      // Change to group 3
      fireEvent.change(dropdown, { target: { value: '3' } });
      expect(dropdown.value).toBe('3');

      // Change back to None
      fireEvent.change(dropdown, { target: { value: '' } });
      expect(dropdown.value).toBe('');
    });

    it('should not be disabled during normal operation', () => {
      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdown = screen.getByLabelText(/small group/i);
      expect(dropdown).not.toBeDisabled();
    });

    it('should be disabled while form is submitting', async () => {
      mockOnSubmit.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Fill required fields
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'Test' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'User' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/phone/i), {
        target: { value: '+1234567890' },
      });
      fireEvent.change(screen.getByLabelText(/^address/i), {
        target: { value: 'Test Address' },
      });
      fireEvent.change(screen.getByLabelText(/city/i), {
        target: { value: 'Test City' },
      });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /add member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const dropdown = screen.getByLabelText(/small group/i);
        expect(dropdown).toBeDisabled();
      });
    });
  });

  describe('Form Reset with Small Groups', () => {
    it('should reset small group selection when form is closed and reopened', () => {
      const { rerender } = render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Select a small group
      const dropdown = screen.getByLabelText(/small group/i);
      fireEvent.change(dropdown, { target: { value: '2' } });

      // Close form
      rerender(
        <MemberForm
          isOpen={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      // Reopen form
      rerender(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdownAfter = screen.getByLabelText(/small group/i) as HTMLSelectElement;
      expect(dropdownAfter.value).toBe('');
    });

    it('should maintain small group when switching between edit modes', () => {
      const memberWithGroup = {
        ...mockMember,
        small_group_id: 1,
      };

      const { rerender } = render(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={memberWithGroup}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdown = screen.getByLabelText(/small group/i) as HTMLSelectElement;
      expect(dropdown.value).toBe('1');

      // Change to different member with different group
      const anotherMember = {
        ...mockMember,
        id: 2,
        small_group_id: 3,
      };

      rerender(
        <MemberForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          member={anotherMember}
          smallGroups={mockSmallGroups}
        />
      );

      const dropdownAfter = screen.getByLabelText(/small group/i) as HTMLSelectElement;
      expect(dropdownAfter.value).toBe('3');
    });
  });
});
