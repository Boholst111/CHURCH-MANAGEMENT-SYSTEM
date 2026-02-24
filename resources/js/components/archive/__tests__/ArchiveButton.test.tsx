import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArchiveButton from '../ArchiveButton';
import { ToastProvider } from '../../../contexts/ToastContext';
import api from '../../../lib/api';

// Mock the API
jest.mock('../../../lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

/**
 * Unit tests for ArchiveButton component
 * 
 * Tests:
 * - Rendering with archive icon and text
 * - Confirmation dialog display
 * - Archive operation success
 * - Archive operation error handling
 * - Loading state during archive
 * 
 * Validates Requirements: 2.1, 2.2, 2.3, 2.5
 */

// Wrapper component with ToastProvider
const renderWithToast = (component: React.ReactElement) => {
  return render(<ToastProvider>{component}</ToastProvider>);
};

describe('ArchiveButton', () => {
  const mockOnArchiveSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders archive button with icon and text', () => {
      renderWithToast(
        <ArchiveButton
          itemType="members"
          itemId={1}
          itemName="John Doe"
          onArchiveSuccess={mockOnArchiveSuccess}
        />
      );

      const button = screen.getByRole('button', { name: /archive/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Archive');
    });

    it('renders icon-only button when iconOnly prop is true', () => {
      renderWithToast(
        <ArchiveButton
          itemType="members"
          itemId={1}
          itemName="John Doe"
          iconOnly={true}
        />
      );

      const button = screen.getByRole('button', { name: /archive/i });
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveTextContent('Archive');
    });
  });

  describe('Confirmation Dialog', () => {
    it('opens confirmation dialog when button is clicked', () => {
      renderWithToast(
        <ArchiveButton
          itemType="members"
          itemId={1}
          itemName="John Doe"
        />
      );

      const button = screen.getByRole('button', { name: /archive/i });
      fireEvent.click(button);

      // Check dialog is displayed
      expect(screen.getByRole('heading', { name: 'Archive Member' })).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to archive/i)).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText(/can be restored later/i)).toBeInTheDocument();
    });

    it('displays correct item type in dialog title', () => {
      renderWithToast(
        <ArchiveButton
          itemType="events"
          itemId={1}
          itemName="Sunday Service"
        />
      );

      const button = screen.getByRole('button', { name: /archive/i });
      fireEvent.click(button);

      expect(screen.getByRole('heading', { name: 'Archive Event' })).toBeInTheDocument();
    });

    it('closes dialog when cancel button is clicked', () => {
      renderWithToast(
        <ArchiveButton
          itemType="members"
          itemId={1}
          itemName="John Doe"
        />
      );

      // Open dialog
      const archiveButton = screen.getByRole('button', { name: /archive/i });
      fireEvent.click(archiveButton);

      // Click cancel
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      // Dialog should be closed
      expect(screen.queryByText('Archive Member')).not.toBeInTheDocument();
    });
  });

  describe('Archive Operation', () => {
    it('calls API and shows success toast on successful archive', async () => {
      mockedApi.delete.mockResolvedValueOnce({ data: { success: true } });

      renderWithToast(
        <ArchiveButton
          itemType="members"
          itemId={1}
          itemName="John Doe"
          onArchiveSuccess={mockOnArchiveSuccess}
        />
      );

      // Open dialog
      const archiveButton = screen.getByRole('button', { name: /archive/i });
      fireEvent.click(archiveButton);

      // Confirm archive
      const confirmButton = screen.getByRole('button', { name: /archive member/i });
      fireEvent.click(confirmButton);

      // Wait for API call
      await waitFor(() => {
        expect(mockedApi.delete).toHaveBeenCalledWith('/members/1');
      });

      // Check success callback was called
      await waitFor(() => {
        expect(mockOnArchiveSuccess).toHaveBeenCalledTimes(1);
      });

      // Check success toast is displayed
      await waitFor(() => {
        expect(screen.getByText('Member archived successfully')).toBeInTheDocument();
      });
    });

    it('shows error toast on failed archive', async () => {
      const errorMessage = 'Failed to archive member';
      mockedApi.delete.mockRejectedValueOnce({
        response: { data: { message: errorMessage } },
      });

      renderWithToast(
        <ArchiveButton
          itemType="members"
          itemId={1}
          itemName="John Doe"
        />
      );

      // Open dialog
      const archiveButton = screen.getByRole('button', { name: /archive/i });
      fireEvent.click(archiveButton);

      // Confirm archive
      const confirmButton = screen.getByRole('button', { name: /archive member/i });
      fireEvent.click(confirmButton);

      // Wait for error toast
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      // Dialog should remain open on error
      expect(screen.getByRole('heading', { name: 'Archive Member' })).toBeInTheDocument();
    });

    it('displays loading state during archive operation', async () => {
      // Create a promise that we can control
      let resolveArchive: (value: any) => void;
      const archivePromise = new Promise((resolve) => {
        resolveArchive = resolve;
      });
      mockedApi.delete.mockReturnValueOnce(archivePromise as any);

      renderWithToast(
        <ArchiveButton
          itemType="members"
          itemId={1}
          itemName="John Doe"
        />
      );

      // Open dialog
      const archiveButton = screen.getByRole('button', { name: /archive/i });
      fireEvent.click(archiveButton);

      // Confirm archive
      const confirmButton = screen.getByRole('button', { name: /archive member/i });
      fireEvent.click(confirmButton);

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText('Archiving...')).toBeInTheDocument();
      });

      // Buttons should be disabled during loading
      expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /archiving/i })).toBeDisabled();

      // Resolve the promise
      resolveArchive!({ data: { success: true } });
    });
  });

  describe('Item Type Mapping', () => {
    it('handles different item types correctly', () => {
      const itemTypes = [
        { type: 'members', expected: 'Member' },
        { type: 'events', expected: 'Event' },
        { type: 'leadership', expected: 'Leadership' },
        { type: 'small-groups', expected: 'Small Group' },
        { type: 'offerings', expected: 'Offering' },
        { type: 'expenses', expected: 'Expense' },
      ];

      itemTypes.forEach(({ type, expected }) => {
        const { unmount } = renderWithToast(
          <ArchiveButton
            itemType={type}
            itemId={1}
            itemName="Test Item"
          />
        );

        const button = screen.getByRole('button', { name: /archive/i });
        fireEvent.click(button);

        expect(screen.getByRole('heading', { name: `Archive ${expected}` })).toBeInTheDocument();

        unmount();
      });
    });
  });
});
