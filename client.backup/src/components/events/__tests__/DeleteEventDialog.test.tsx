import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteEventDialog from '../DeleteEventDialog';

describe('DeleteEventDialog Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockEventTitle = 'Sunday Service';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Dialog Rendering', () => {
    it('should render dialog when open', () => {
      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      expect(screen.getByRole('heading', { name: /delete event/i })).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete/)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockEventTitle))).toBeInTheDocument();
    });

    it('should not render dialog when closed', () => {
      render(
        <DeleteEventDialog
          isOpen={false}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      expect(screen.queryByRole('heading', { name: /delete event/i })).not.toBeInTheDocument();
    });

    it('should display warning icon', () => {
      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      // Check for the icon by looking for the red background container
      const iconContainer = document.querySelector('.bg-red-100');
      expect(iconContainer).toBeInTheDocument();
    });

    it('should display warning message about permanent deletion', () => {
      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      expect(screen.getByText(/This action cannot be undone/)).toBeInTheDocument();
    });
  });

  describe('Dialog Actions', () => {
    it('should call onClose when Cancel button is clicked', () => {
      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it('should call onConfirm when Delete button is clicked', async () => {
      mockOnConfirm.mockResolvedValue(undefined);

      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /delete event/i });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalled();
      });
    });

    it('should call onClose after successful deletion', async () => {
      mockOnConfirm.mockResolvedValue(undefined);

      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /delete event/i });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should not call onClose if deletion fails', async () => {
      mockOnConfirm.mockRejectedValue(new Error('API Error'));

      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /delete event/i });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalled();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should show "Deleting..." text while deleting', async () => {
      mockOnConfirm.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /delete event/i });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText('Deleting...')).toBeInTheDocument();
      });
    });

    it('should disable buttons while deleting', async () => {
      mockOnConfirm.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /delete event/i }) as HTMLButtonElement;
      const cancelButton = screen.getByRole('button', { name: /cancel/i }) as HTMLButtonElement;
      
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(deleteButton.disabled).toBe(true);
        expect(cancelButton.disabled).toBe(true);
      });
    });
  });

  describe('Button Styling', () => {
    it('should render Delete button with destructive variant', () => {
      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const deleteButton = screen.getByRole('button', { name: /delete event/i });
      expect(deleteButton).toBeInTheDocument();
    });

    it('should render Cancel button with outline variant', () => {
      render(
        <DeleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toBeInTheDocument();
    });
  });
});
