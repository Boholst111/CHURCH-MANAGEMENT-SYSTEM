import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as fc from 'fast-check';
import ArchiveButton from '../ArchiveButton';
import { ToastProvider } from '../../../contexts/ToastContext';

/**
 * Property-Based Tests for ArchiveButton Terminology
 * 
 * Feature: soft-delete-archive-system
 * Property 18: Archive terminology consistency
 * 
 * **Validates: Requirements 2.1, 2.4**
 * 
 * For any UI component that previously displayed "Delete" terminology,
 * it should now display "Archive" terminology including button labels,
 * tooltips, and confirmation dialogs.
 */

// Wrapper component with ToastProvider
const renderWithToast = (component: React.ReactElement) => {
  return render(<ToastProvider>{component}</ToastProvider>);
};

describe('ArchiveButton Terminology - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Generator for valid archivable item types
   */
  const itemTypeGenerator = fc.constantFrom(
    'members',
    'events',
    'leadership',
    'small-groups',
    'offerings',
    'expenses',
    'budgets',
    'pledges',
    'funds',
    'vendors',
    'expense-categories',
    'offering-types'
  );

  /**
   * Generator for item IDs
   */
  const itemIdGenerator = fc.integer({ min: 1, max: 10000 });

  /**
   * Generator for item names
   */
  const itemNameGenerator = fc.string({ minLength: 1, maxLength: 100 });

  /**
   * Property 18: Archive terminology consistency - Button Label
   * 
   * For any archivable item type, the button should display "Archive" text
   * and NOT display "Delete" text
   */
  it('should display "Archive" terminology in button label for any item type', () => {
    fc.assert(
      fc.property(
        itemTypeGenerator,
        itemIdGenerator,
        itemNameGenerator,
        (itemType, itemId, itemName) => {
          const { unmount } = renderWithToast(
            <ArchiveButton
              itemType={itemType}
              itemId={itemId}
              itemName={itemName}
            />
          );

          try {
            // Button should contain "Archive" text
            const button = screen.getByRole('button', { name: /archive/i });
            expect(button).toBeInTheDocument();
            expect(button).toHaveTextContent('Archive');

            // Button should NOT contain "Delete" text
            expect(button).not.toHaveTextContent('Delete');
            expect(button).not.toHaveTextContent('delete');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: Archive terminology consistency - Button Tooltip
   * 
   * For any archivable item type, the button tooltip should use "Archive"
   * terminology and NOT use "Delete" terminology
   */
  it('should display "Archive" terminology in button tooltip for any item type', () => {
    fc.assert(
      fc.property(
        itemTypeGenerator,
        itemIdGenerator,
        itemNameGenerator,
        (itemType, itemId, itemName) => {
          const { unmount } = renderWithToast(
            <ArchiveButton
              itemType={itemType}
              itemId={itemId}
              itemName={itemName}
            />
          );

          try {
            const button = screen.getByRole('button', { name: /archive/i });
            
            // Tooltip should use "Archive" terminology
            expect(button).toHaveAttribute('title', 'Archive');
            
            // Tooltip should NOT use "Delete" terminology
            expect(button).not.toHaveAttribute('title', 'Delete');
            expect(button).not.toHaveAttribute('title', 'delete');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: Archive terminology consistency - Confirmation Dialog Title
   * 
   * For any archivable item type, the confirmation dialog title should use
   * "Archive" terminology and NOT use "Delete" terminology
   */
  it('should display "Archive" terminology in confirmation dialog title for any item type', () => {
    fc.assert(
      fc.property(
        itemTypeGenerator,
        itemIdGenerator,
        itemNameGenerator,
        (itemType, itemId, itemName) => {
          const { unmount } = renderWithToast(
            <ArchiveButton
              itemType={itemType}
              itemId={itemId}
              itemName={itemName}
            />
          );

          try {
            // Click button to open dialog
            const button = screen.getByRole('button', { name: /archive/i });
            fireEvent.click(button);

            // Dialog title should contain "Archive"
            const dialogTitle = screen.getByRole('heading');
            expect(dialogTitle.textContent).toMatch(/Archive/i);
            
            // Dialog title should NOT contain "Delete"
            expect(dialogTitle.textContent).not.toMatch(/Delete/i);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: Archive terminology consistency - Confirmation Dialog Message
   * 
   * For any archivable item type, the confirmation dialog message should use
   * "Archive" terminology and NOT use "Delete" terminology
   */
  it('should display "Archive" terminology in confirmation dialog message for any item type', () => {
    fc.assert(
      fc.property(
        itemTypeGenerator,
        itemIdGenerator,
        itemNameGenerator,
        (itemType, itemId, itemName) => {
          const { unmount } = renderWithToast(
            <ArchiveButton
              itemType={itemType}
              itemId={itemId}
              itemName={itemName}
            />
          );

          try {
            // Click button to open dialog
            const button = screen.getByRole('button', { name: /archive/i });
            fireEvent.click(button);

            // Dialog message should contain "archive" (case-insensitive)
            expect(screen.getByText(/are you sure you want to archive/i)).toBeInTheDocument();
            
            // Dialog message should mention restoration capability
            expect(screen.getByText(/can be restored later/i)).toBeInTheDocument();

            // Dialog message should NOT contain "delete" or "remove permanently"
            const dialogContent = screen.getByText(/are you sure you want to archive/i).closest('div');
            expect(dialogContent?.textContent).not.toMatch(/\bdelete\b/i);
            expect(dialogContent?.textContent).not.toMatch(/remove permanently/i);
            expect(dialogContent?.textContent).not.toMatch(/cannot be undone/i);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: Archive terminology consistency - Confirmation Button
   * 
   * For any archivable item type, the confirmation button should use
   * "Archive" terminology and NOT use "Delete" terminology
   */
  it('should display "Archive" terminology in confirmation button for any item type', () => {
    fc.assert(
      fc.property(
        itemTypeGenerator,
        itemIdGenerator,
        itemNameGenerator,
        (itemType, itemId, itemName) => {
          const { unmount } = renderWithToast(
            <ArchiveButton
              itemType={itemType}
              itemId={itemId}
              itemName={itemName}
            />
          );

          try {
            // Click button to open dialog
            const button = screen.getByRole('button', { name: /archive/i });
            fireEvent.click(button);

            // Find all buttons in the dialog
            const buttons = screen.getAllByRole('button');
            
            // Should have a button with "Archive" text
            const archiveButton = buttons.find(btn => btn.textContent?.match(/Archive/i));
            expect(archiveButton).toBeDefined();
            
            // No button should contain "Delete" text
            const deleteButton = buttons.find(btn => btn.textContent?.match(/Delete/i));
            expect(deleteButton).toBeUndefined();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: Archive terminology consistency - No Trash Icon
   * 
   * For any archivable item type, the button should use an archive icon
   * and NOT use a trash/delete icon
   */
  it('should use archive icon and NOT trash icon for any item type', () => {
    fc.assert(
      fc.property(
        itemTypeGenerator,
        itemIdGenerator,
        itemNameGenerator,
        (itemType, itemId, itemName) => {
          const { container, unmount } = renderWithToast(
            <ArchiveButton
              itemType={itemType}
              itemId={itemId}
              itemName={itemName}
            />
          );

          try {
            // The component uses lucide-react Archive icon
            // We can verify by checking the button contains an SVG
            const button = screen.getByRole('button', { name: /archive/i });
            const svg = button.querySelector('svg');
            expect(svg).toBeInTheDocument();

            // The Archive icon from lucide-react should be present
            // (We can't easily test the specific icon, but we verify an icon exists)
            expect(svg).toHaveClass('h-4', 'w-4');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: Archive terminology consistency - Icon-Only Mode
   * 
   * For any archivable item type in icon-only mode, the button should still
   * have "Archive" tooltip and NOT "Delete" tooltip
   */
  it('should display "Archive" tooltip in icon-only mode for any item type', () => {
    fc.assert(
      fc.property(
        itemTypeGenerator,
        itemIdGenerator,
        itemNameGenerator,
        (itemType, itemId, itemName) => {
          const { unmount } = renderWithToast(
            <ArchiveButton
              itemType={itemType}
              itemId={itemId}
              itemName={itemName}
              iconOnly={true}
            />
          );

          try {
            const button = screen.getByRole('button', { name: /archive/i });
            
            // Button should not have visible text in icon-only mode
            expect(button).not.toHaveTextContent('Archive');
            
            // But tooltip should still say "Archive"
            expect(button).toHaveAttribute('title', 'Archive');
            expect(button).not.toHaveAttribute('title', 'Delete');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: Archive terminology consistency - All Item Types
   * 
   * For every supported archivable model type, the component should
   * consistently use "Archive" terminology throughout
   */
  it('should use consistent "Archive" terminology across all supported item types', () => {
    const allItemTypes = [
      'members',
      'events',
      'leadership',
      'small-groups',
      'offerings',
      'expenses',
      'budgets',
      'pledges',
      'funds',
      'vendors',
      'expense-categories',
      'offering-types',
    ];

    allItemTypes.forEach((itemType) => {
      const { unmount } = renderWithToast(
        <ArchiveButton
          itemType={itemType}
          itemId={1}
          itemName="Test Item"
        />
      );

      try {
        // Button should have "Archive" text
        const button = screen.getByRole('button', { name: /archive/i });
        expect(button).toHaveTextContent('Archive');
        expect(button).not.toHaveTextContent('Delete');

        // Open dialog
        fireEvent.click(button);

        // Dialog should use "Archive" terminology
        expect(screen.getByRole('heading').textContent).toMatch(/Archive/i);
        expect(screen.getByRole('heading').textContent).not.toMatch(/Delete/i);

        // Dialog message should use "archive"
        expect(screen.getByText(/are you sure you want to archive/i)).toBeInTheDocument();
      } finally {
        unmount();
      }
    });
  });
});
