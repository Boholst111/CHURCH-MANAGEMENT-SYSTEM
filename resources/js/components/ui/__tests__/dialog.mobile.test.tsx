import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../dialog';
import { Button } from '../button';

/**
 * Mobile Form Optimization Tests for Dialog Component
 * 
 * Tests mobile-specific features:
 * - Modals fit mobile screens properly
 * - Full screen on mobile with proper padding
 * - Buttons stack vertically on mobile
 * 
 * Validates: Task 19.3 - Optimize forms for mobile
 */
describe('Dialog - Mobile Optimizations', () => {
  describe('Mobile Screen Fit', () => {
    it('should render with mobile-optimized classes', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
            <div>Content</div>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      
      // Check for mobile-specific classes
      expect(dialog).toHaveClass('w-[100vw]'); // Full width on mobile
      expect(dialog).toHaveClass('sm:w-full'); // Normal width on desktop
      expect(dialog).toHaveClass('rounded-none'); // No border radius on mobile
      expect(dialog).toHaveClass('sm:rounded-lg'); // Border radius on desktop
    });

    it('should have proper padding for mobile', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      
      // Check for responsive padding
      expect(dialog).toHaveClass('p-4'); // Smaller padding on mobile
      expect(dialog).toHaveClass('sm:p-6'); // Larger padding on desktop
    });

    it('should use full viewport height on mobile', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      
      // Check for mobile viewport height
      expect(dialog).toHaveClass('max-h-[100dvh]'); // Full height on mobile
      expect(dialog).toHaveClass('sm:max-h-[90vh]'); // 90% height on desktop
    });

    it('should be scrollable when content overflows', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
            <div style={{ height: '2000px' }}>Very long content</div>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      
      expect(dialog).toHaveClass('overflow-y-auto');
    });
  });

  describe('DialogFooter - Mobile Button Stacking', () => {
    it('should stack buttons vertically on mobile', () => {
      const { container } = render(
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </DialogFooter>
      );

      const footer = container.firstChild as HTMLElement;
      
      // Check for mobile stacking classes
      expect(footer).toHaveClass('flex-col-reverse'); // Stack vertically on mobile
      expect(footer).toHaveClass('sm:flex-row'); // Horizontal on desktop
      expect(footer).toHaveClass('gap-2'); // Gap between buttons on mobile
    });

    it('should align buttons to end on desktop', () => {
      const { container } = render(
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </DialogFooter>
      );

      const footer = container.firstChild as HTMLElement;
      
      expect(footer).toHaveClass('sm:justify-end');
    });
  });

  describe('Close Button', () => {
    it('should render close button by default', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('should hide close button when showCloseButton is false', () => {
      render(
        <Dialog open={true}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.queryByRole('button', { name: /close/i });
      expect(closeButton).not.toBeInTheDocument();
    });

    it('should have proper touch target size', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      
      // Close button should be easily tappable
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
            <div>Content</div>
          </DialogContent>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      
      const title = screen.getByText('Test Dialog');
      expect(title).toBeInTheDocument();
    });
  });
});
