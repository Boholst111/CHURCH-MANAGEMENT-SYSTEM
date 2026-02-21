import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteSmallGroupDialog from '../DeleteSmallGroupDialog';
import { SmallGroup } from '../../../lib/smallGroupApi';

describe('DeleteSmallGroupDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const mockSmallGroup: SmallGroup = {
    id: 1,
    name: 'Young Adults Fellowship',
    description: 'A group for young adults',
    leader_name: 'John Doe',
    meeting_day: 'Friday',
    meeting_time: '19:00',
    location: 'Fellowship Hall',
    member_count: 12,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render dialog with small group name', () => {
      render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={mockSmallGroup}
        />
      );

      expect(screen.getByText('Delete Small Group')).toBeInTheDocument();
      expect(screen.getByText(/Young Adults Fellowship/)).toBeInTheDocument();
    });

    it('should render warning message', () => {
      render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={mockSmallGroup}
        />
      );

      expect(screen.getByText(/This action cannot be undone/)).toBeInTheDocument();
      expect(screen.getByText(/Members currently assigned to this group/)).toBeInTheDocument();
    });

    it('should render Cancel and Delete buttons', () => {
      render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={mockSmallGroup}
        />
      );

      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /delete group/i })).toBeInTheDocument();
    });

    it('should not render when smallGroup is null', () => {
      const { container } = render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={null}
        />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('User Interactions', () => {
    it('should call onClose when Cancel button is clicked', () => {
      render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={mockSmallGroup}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it('should call onConfirm when Delete button is clicked', () => {
      render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={mockSmallGroup}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /delete group/i });
      fireEvent.click(deleteButton);

      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Deleting State', () => {
    it('should disable buttons when isDeleting is true', () => {
      render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={mockSmallGroup}
          isDeleting={true}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      const deleteButton = screen.getByRole('button', { name: /deleting/i });

      expect(cancelButton).toBeDisabled();
      expect(deleteButton).toBeDisabled();
    });

    it('should show "Deleting..." text when isDeleting is true', () => {
      render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={mockSmallGroup}
          isDeleting={true}
        />
      );

      expect(screen.getByRole('button', { name: /deleting/i })).toBeInTheDocument();
    });

    it('should not call onClose when Cancel is clicked while deleting', () => {
      render(
        <DeleteSmallGroupDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          smallGroup={mockSmallGroup}
          isDeleting={true}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      // Button is disabled, so click should not trigger onClose
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});
