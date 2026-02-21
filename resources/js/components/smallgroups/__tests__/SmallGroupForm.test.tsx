import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SmallGroupForm, { SmallGroupFormData, SmallGroup } from '../SmallGroupForm';

/**
 * Unit tests for SmallGroupForm component
 * 
 * Tests form rendering, validation, and submission for small group management.
 * 
 * Validates Requirements: 8.4
 */
describe('SmallGroupForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockSmallGroup: SmallGroup = {
    id: 1,
    name: 'Young Adults Fellowship',
    description: 'A group for young adults',
    leader_name: 'John Smith',
    meeting_day: 'Wednesday',
    meeting_time: '19:00',
    location: 'Fellowship Hall',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    member_count: 15,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render form with all required fields', () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByLabelText(/group name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/leader name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/meeting day/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/meeting time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    });

    it('should render "Add New Small Group" title when creating new group', () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText('Add New Small Group')).toBeInTheDocument();
    });

    it('should render "Edit Small Group" title when editing existing group', () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroup={mockSmallGroup}
        />
      );

      expect(screen.getByText('Edit Small Group')).toBeInTheDocument();
    });

    it('should populate form fields when editing existing group', () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          smallGroup={mockSmallGroup}
        />
      );

      expect(screen.getByDisplayValue('Young Adults Fellowship')).toBeInTheDocument();
      expect(screen.getByDisplayValue('A group for young adults')).toBeInTheDocument();
      expect(screen.getByDisplayValue('John Smith')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Wednesday')).toBeInTheDocument();
      expect(screen.getByDisplayValue('19:00')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Fellowship Hall')).toBeInTheDocument();
    });

    it('should render all days of the week in meeting day dropdown', () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const meetingDaySelect = screen.getByLabelText(/meeting day/i);
      const options = Array.from(meetingDaySelect.querySelectorAll('option'));
      const optionTexts = options.map(option => option.textContent);

      expect(optionTexts).toEqual([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]);
    });

    it('should render Cancel and submit buttons', () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add group/i })).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('should show error when group name is empty', async () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Group name is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when group name exceeds 100 characters', async () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, {
        target: { value: 'A'.repeat(101) },
      });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Group name must be 100 characters or less')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when leader name is empty', async () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Leader name is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when leader name exceeds 100 characters', async () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, {
        target: { value: 'A'.repeat(101) },
      });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Leader name must be 100 characters or less')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when location is empty', async () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, { target: { value: 'John Doe' } });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Location is required')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show error when location exceeds 200 characters', async () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, { target: { value: 'John Doe' } });

      const locationInput = screen.getByLabelText(/location/i);
      fireEvent.change(locationInput, {
        target: { value: 'A'.repeat(201) },
      });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Location must be 200 characters or less')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should clear error when user starts typing in a field', async () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Group name is required')).toBeInTheDocument();
      });

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      await waitFor(() => {
        expect(screen.queryByText('Group name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form data when all fields are valid', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const descriptionInput = screen.getByLabelText(/description/i);
      fireEvent.change(descriptionInput, { target: { value: 'Test description' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, { target: { value: 'John Doe' } });

      const meetingDaySelect = screen.getByLabelText(/meeting day/i);
      fireEvent.change(meetingDaySelect, { target: { value: 'Wednesday' } });

      const meetingTimeInput = screen.getByLabelText(/meeting time/i);
      fireEvent.change(meetingTimeInput, { target: { value: '19:00' } });

      const locationInput = screen.getByLabelText(/location/i);
      fireEvent.change(locationInput, { target: { value: 'Fellowship Hall' } });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'Test Group',
          description: 'Test description',
          leader_name: 'John Doe',
          meeting_day: 'Wednesday',
          meeting_time: '19:00',
          location: 'Fellowship Hall',
        });
      });

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when form submission succeeds', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, { target: { value: 'John Doe' } });

      const locationInput = screen.getByLabelText(/location/i);
      fireEvent.change(locationInput, { target: { value: 'Fellowship Hall' } });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should not call onClose when form submission fails', async () => {
      mockOnSubmit.mockRejectedValue(new Error('Submission failed'));

      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, { target: { value: 'John Doe' } });

      const locationInput = screen.getByLabelText(/location/i);
      fireEvent.change(locationInput, { target: { value: 'Fellowship Hall' } });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should handle server-side validation errors', async () => {
      const serverError = {
        response: {
          data: {
            errors: {
              name: 'Group name already exists',
            },
          },
        },
      };
      mockOnSubmit.mockRejectedValue(serverError);

      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Existing Group' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, { target: { value: 'John Doe' } });

      const locationInput = screen.getByLabelText(/location/i);
      fireEvent.change(locationInput, { target: { value: 'Fellowship Hall' } });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Group name already exists')).toBeInTheDocument();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should disable submit button while submitting', async () => {
      mockOnSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, { target: { value: 'John Doe' } });

      const locationInput = screen.getByLabelText(/location/i);
      fireEvent.change(locationInput, { target: { value: 'Fellowship Hall' } });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe('Cancel Button', () => {
    it('should call onClose when cancel button is clicked', () => {
      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not call onClose when cancel button is clicked while submitting', async () => {
      mockOnSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      const leaderInput = screen.getByLabelText(/leader name/i);
      fireEvent.change(leaderInput, { target: { value: 'John Doe' } });

      const locationInput = screen.getByLabelText(/location/i);
      fireEvent.change(locationInput, { target: { value: 'Fellowship Hall' } });

      const submitButton = screen.getByRole('button', { name: /add group/i });
      fireEvent.click(submitButton);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toBeDisabled();
    });
  });

  describe('Form Reset', () => {
    it('should reset form when dialog is closed and reopened', () => {
      const { rerender } = render(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByLabelText(/group name/i);
      fireEvent.change(nameInput, { target: { value: 'Test Group' } });

      rerender(
        <SmallGroupForm
          isOpen={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      rerender(
        <SmallGroupForm
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByLabelText(/group name/i)).toHaveValue('');
    });
  });
});
