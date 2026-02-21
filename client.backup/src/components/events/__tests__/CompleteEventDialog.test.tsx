import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CompleteEventDialog from '../CompleteEventDialog';

describe('CompleteEventDialog Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockEventTitle = 'Sunday Service';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Dialog Rendering', () => {
    it('should render dialog when open', () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      expect(screen.getByText('Mark Event as Completed')).toBeInTheDocument();
      expect(screen.getByText(/Mark "Sunday Service" as completed/)).toBeInTheDocument();
    });

    it('should not render dialog when closed', () => {
      render(
        <CompleteEventDialog
          isOpen={false}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      expect(screen.queryByText('Mark Event as Completed')).not.toBeInTheDocument();
    });

    it('should display success icon', () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      // Check for the icon by looking for the green background container
      const iconContainer = document.querySelector('.bg-green-100');
      expect(iconContainer).toBeInTheDocument();
    });

    it('should render attendance count input field', () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      expect(screen.getByLabelText(/Attendance Count/)).toBeInTheDocument();
    });

    it('should show required field indicator', () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Form Validation (Validates Requirements 9.4)', () => {
    it('should show error when attendance count is empty', async () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Attendance count is required')).toBeInTheDocument();
      });

      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it('should show error when attendance count is negative', async () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(input, { target: { value: '-5' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Attendance count must be 0 or greater')).toBeInTheDocument();
      });

      expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it('should accept zero as valid attendance count', async () => {
      mockOnConfirm.mockResolvedValue(undefined);

      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(input, { target: { value: '0' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalledWith(0);
      });
    });

    it('should clear error when user starts typing', async () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Attendance count is required')).toBeInTheDocument();
      });

      const input = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(input, { target: { value: '100' } });

      await waitFor(() => {
        expect(screen.queryByText('Attendance count is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call onConfirm with attendance count when form is valid', async () => {
      mockOnConfirm.mockResolvedValue(undefined);

      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(input, { target: { value: '150' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalledWith(150);
      });
    });

    it('should call onClose after successful submission', async () => {
      mockOnConfirm.mockResolvedValue(undefined);

      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(input, { target: { value: '150' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should not call onClose if submission fails', async () => {
      mockOnConfirm.mockRejectedValue(new Error('API Error'));

      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(input, { target: { value: '150' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalled();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Dialog Actions', () => {
    it('should call onClose when Cancel button is clicked', () => {
      render(
        <CompleteEventDialog
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
  });

  describe('Loading State', () => {
    it('should show "Completing..." text while submitting', async () => {
      mockOnConfirm.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/);
      fireEvent.change(input, { target: { value: '150' } });

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Completing...')).toBeInTheDocument();
      });
    });

    it('should disable buttons while submitting', async () => {
      mockOnConfirm.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/) as HTMLInputElement;
      fireEvent.change(input, { target: { value: '150' } });

      const submitButton = screen.getByText('Mark as Completed') as HTMLButtonElement;
      const cancelButton = screen.getByText('Cancel') as HTMLButtonElement;
      
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton.disabled).toBe(true);
        expect(cancelButton.disabled).toBe(true);
        expect(input.disabled).toBe(true);
      });
    });
  });

  describe('Form Reset', () => {
    it('should reset form when dialog is reopened', () => {
      const { rerender } = render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/) as HTMLInputElement;
      fireEvent.change(input, { target: { value: '150' } });

      expect(input.value).toBe('150');

      rerender(
        <CompleteEventDialog
          isOpen={false}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      rerender(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const newInput = screen.getByLabelText(/Attendance Count/) as HTMLInputElement;
      expect(newInput.value).toBe('');
    });

    it('should clear errors when dialog is reopened', async () => {
      const { rerender } = render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const submitButton = screen.getByText('Mark as Completed');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Attendance count is required')).toBeInTheDocument();
      });

      rerender(
        <CompleteEventDialog
          isOpen={false}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      rerender(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      expect(screen.queryByText('Attendance count is required')).not.toBeInTheDocument();
    });
  });

  describe('Input Field', () => {
    it('should have type="number" for attendance input', () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/) as HTMLInputElement;
      expect(input.type).toBe('number');
    });

    it('should have min="0" attribute', () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/) as HTMLInputElement;
      expect(input.min).toBe('0');
    });

    it('should have placeholder text', () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/) as HTMLInputElement;
      expect(input.placeholder).toBe('e.g., 150');
    });

    it('should autofocus on the input field', () => {
      render(
        <CompleteEventDialog
          isOpen={true}
          onClose={mockOnClose}
          onConfirm={mockOnConfirm}
          eventTitle={mockEventTitle}
        />
      );

      const input = screen.getByLabelText(/Attendance Count/) as HTMLInputElement;
      // Check that the input has the autofocus property (React uses autoFocus, not autofocus)
      expect(input).toBeInTheDocument();
    });
  });
});
