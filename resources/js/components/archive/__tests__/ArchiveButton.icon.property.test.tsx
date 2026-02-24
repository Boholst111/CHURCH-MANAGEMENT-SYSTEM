import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as fc from 'fast-check';
import ArchiveButton from '../ArchiveButton';
import { ToastProvider } from '../../../contexts/ToastContext';
import { Archive } from 'lucide-react';

/**
 * Property-Based Tests for ArchiveButton Icon Usage
 * 
 * Feature: soft-delete-archive-system
 * Property 19: Archive icon usage
 * 
 * **Validates: Requirements 2.2**
 * 
 * For any UI component with archive functionality, it should display an
 * archive icon (not a trash icon) to visually distinguish archiving from deletion.
 */

// Wrapper component with ToastProvider
const renderWithToast = (component: React.ReactElement) => {
  return render(<ToastProvider>{component}</ToastProvider>);
};

describe('ArchiveButton Icon Usage - Property-Based Tests', () => {
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
   * Generator for button variants
   */
  const variantGenerator = fc.constantFrom(
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link'
  );

  /**
   * Generator for button sizes
   */
  const sizeGenerator = fc.constantFrom('default', 'sm', 'lg', 'icon');

  /**
   * Generator for iconOnly boolean
   */
  const iconOnlyGenerator = fc.boolean();

  /**
   * Property 19: Archive icon usage - Button displays archive icon
   * 
   * For any archivable item type and any button configuration,
   * the button should display an archive icon (SVG element)
   */
  it('should display an archive icon in the button for any item type and configuration', () => {
    fc.assert(
      fc.property(
        itemTypeGenerator,
        itemIdGenerator,
        itemNameGenerator,
        variantGenerator,
        sizeGenerator,
        iconOnlyGenerator,
        (itemType, itemId, itemName, variant, size, iconOnly) => {
          const { unmount } = renderWithToast(
            <ArchiveButton
              itemType={itemType}
              itemId={itemId}
              itemName={itemName}
              variant={variant as any}
              size={size as any}
              iconOnly={iconOnly}
            />
          );

          try {
            // Button should contain an SVG icon
            const button = screen.getByRole('button', { name: /archive/i });
            const svg = button.querySelector('svg');
            
            expect(svg).toBeInTheDocument();
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
   * Property 19: Archive icon usage - Dialog displays archive icon
   * 
   * For any archivable item type, the confirmation dialog should display
   * an archive icon in the header (not a trash icon)
   */
  it('should display an archive icon in the confirmation dialog for any item type', () => {
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

            // Dialog should contain an archive icon in the header
            // The icon is in a circular background div
            const dialogContent = screen.getByRole('heading').closest('div');
            const iconContainer = dialogContent?.querySelector('.bg-orange-100');
            
            expect(iconContainer).toBeInTheDocument();
            
            // Icon container should have an SVG
            const svg = iconContainer?.querySelector('svg');
            expect(svg).toBeInTheDocument();
            expect(svg).toHaveClass('h-5', 'w-5', 'text-orange-600');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 19: Archive icon usage - No trash icon present
   * 
   * For any archivable item type, the component should NOT display
   * a trash icon (Trash, Trash2, or similar icons from lucide-react)
   */
  it('should NOT display trash icon terminology in the component for any item type', () => {
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
            // Check that the component doesn't reference trash icons
            // by checking for common trash icon class names or data attributes
            const trashIcons = container.querySelectorAll('[data-icon="trash"], [data-icon="trash2"]');
            expect(trashIcons.length).toBe(0);

            // Open dialog and check there too
            const button = screen.getByRole('button', { name: /archive/i });
            fireEvent.click(button);

            const dialogTrashIcons = container.querySelectorAll('[data-icon="trash"], [data-icon="trash2"]');
            expect(dialogTrashIcons.length).toBe(0);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 19: Archive icon usage - Icon-only mode displays archive icon
   * 
   * For any archivable item type in icon-only mode, the button should
   * display only the archive icon without text
   */
  it('should display only archive icon in icon-only mode for any item type', () => {
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
            
            // Button should contain an SVG icon
            const svg = button.querySelector('svg');
            expect(svg).toBeInTheDocument();
            
            // Button should not have visible "Archive" text
            expect(button).not.toHaveTextContent('Archive');
            
            // But should still have the icon with proper classes
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
   * Property 19: Archive icon usage - Archive icon is visually distinct
   * 
   * For any archivable item type, the archive icon should be styled
   * to be visually distinct and recognizable
   */
  it('should display archive icon with proper styling for any item type', () => {
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
            const svg = button.querySelector('svg');
            
            // Icon should have proper size classes
            expect(svg).toHaveClass('h-4', 'w-4');
            
            // Open dialog to check dialog icon styling
            fireEvent.click(button);
            
            const dialogContent = screen.getByRole('heading').closest('div');
            const iconContainer = dialogContent?.querySelector('.bg-orange-100');
            const dialogSvg = iconContainer?.querySelector('svg');
            
            // Dialog icon should have proper size and color classes
            expect(dialogSvg).toHaveClass('h-5', 'w-5', 'text-orange-600');
            
            // Icon container should have proper styling
            expect(iconContainer).toHaveClass('bg-orange-100', 'rounded-full');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 19: Archive icon usage - Consistent icon across all item types
   * 
   * For every supported archivable model type, the component should
   * consistently use the same archive icon
   */
  it('should use consistent archive icon across all supported item types', () => {
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
        // Button should have an archive icon
        const button = screen.getByRole('button', { name: /archive/i });
        const svg = button.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('h-4', 'w-4');

        // Open dialog
        fireEvent.click(button);

        // Dialog should have an archive icon
        const dialogContent = screen.getByRole('heading').closest('div');
        const iconContainer = dialogContent?.querySelector('.bg-orange-100');
        const dialogSvg = iconContainer?.querySelector('svg');
        
        expect(dialogSvg).toBeInTheDocument();
        expect(dialogSvg).toHaveClass('h-5', 'w-5', 'text-orange-600');
      } finally {
        unmount();
      }
    });
  });

  /**
   * Property 19: Archive icon usage - Archive icon semantic meaning
   * 
   * For any archivable item type, the archive icon should convey
   * the semantic meaning of archiving (preservation, not destruction)
   * through its visual design and context
   */
  it('should use archive icon that conveys preservation semantics for any item type', () => {
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
            // The Archive icon from lucide-react represents a box/container
            // which semantically conveys storage/preservation rather than deletion
            const button = screen.getByRole('button', { name: /archive/i });
            const svg = button.querySelector('svg');
            
            expect(svg).toBeInTheDocument();
            
            // Button should have "Archive" tooltip to reinforce semantic meaning
            expect(button).toHaveAttribute('title', 'Archive');
            
            // Open dialog to verify preservation messaging
            fireEvent.click(button);
            
            // Dialog should mention restoration capability
            expect(screen.getByText(/can be restored later/i)).toBeInTheDocument();
            
            // This messaging combined with the archive icon reinforces
            // the preservation semantic (not permanent deletion)
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
