import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../dialog';

describe('Dialog Component', () => {
  describe('Basic Rendering', () => {
    it('renders dialog when open', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Dialog</DialogTitle>
              <DialogDescription>Test description</DialogDescription>
            </DialogHeader>
            <p>Dialog content</p>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
        expect(screen.getByText('Dialog content')).toBeInTheDocument();
      });
    });

    it('does not render when closed', () => {
      render(
        <Dialog open={false}>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
    });

    it('renders with trigger button', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const trigger = screen.getByText('Open Dialog');
      expect(trigger).toBeInTheDocument();

      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      });
    });
  });

  describe('Close Button', () => {
    it('shows close button by default', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close/i });
        expect(closeButton).toBeInTheDocument();
      });
    });

    it('hides close button when showCloseButton is false', async () => {
      render(
        <Dialog open>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
      });
    });

    it('closes dialog when close button is clicked', async () => {
      const handleOpenChange = jest.fn();
      
      render(
        <Dialog open onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
      });

      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Dialog Header', () => {
    it('renders header with title and description', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>Dialog Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeInTheDocument();
        expect(screen.getByText('Dialog Description')).toBeInTheDocument();
      });
    });

    it('renders header without description', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title Only</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByText('Dialog Title Only')).toBeInTheDocument();
      });
    });

    it('applies custom className to header', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogHeader className="custom-header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const header = baseElement.querySelector('.custom-header');
        expect(header).toBeInTheDocument();
      });
    });
  });

  describe('Dialog Footer', () => {
    it('renders footer with action buttons', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
            <DialogFooter>
              <button>Cancel</button>
              <button>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
      });
    });

    it('applies custom className to footer', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
            <DialogFooter className="custom-footer">
              <button>Action</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const footer = baseElement.querySelector('.custom-footer');
        expect(footer).toBeInTheDocument();
      });
    });
  });

  describe('Dialog Close Component', () => {
    it('renders custom close button', async () => {
      render(
        <Dialog open>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Dialog</DialogTitle>
            <DialogClose asChild>
              <button>Custom Close</button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByText('Custom Close')).toBeInTheDocument();
      });
    });
  });

  describe('Mobile Optimizations', () => {
    it('applies mobile-specific classes', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Mobile Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('[role="dialog"]');
        expect(content).toHaveClass('max-h-[100dvh]');
        expect(content).toHaveClass('sm:max-h-[90vh]');
        expect(content).toHaveClass('w-[100vw]');
        expect(content).toHaveClass('sm:w-full');
      });
    });

    it('applies mobile padding', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Mobile Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('[role="dialog"]');
        expect(content).toHaveClass('p-4');
        expect(content).toHaveClass('sm:p-6');
      });
    });

    it('applies mobile border radius', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Mobile Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('[role="dialog"]');
        expect(content).toHaveClass('rounded-none');
        expect(content).toHaveClass('sm:rounded-lg');
      });
    });
  });

  describe('Overlay', () => {
    it('renders overlay', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const overlay = baseElement.querySelector('[data-state="open"]');
        expect(overlay).toBeInTheDocument();
      });
    });

    it('overlay has backdrop blur', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const elementsWithBlur = baseElement.querySelectorAll('.backdrop-blur-sm');
        expect(elementsWithBlur.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className to content', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent className="custom-dialog">
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('.custom-dialog');
        expect(content).toBeInTheDocument();
      });
    });

    it('merges custom className with default classes', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent className="custom-dialog">
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('[role="dialog"]');
        expect(content).toHaveClass('custom-dialog');
        expect(content).toHaveClass('fixed');
        expect(content).toHaveClass('z-50');
      });
    });
  });

  describe('Accessibility', () => {
    it('has dialog role', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Accessible Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        expect(baseElement.querySelector('[role="dialog"]')).toBeInTheDocument();
      });
    });

    it('title has proper heading structure', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const title = screen.getByText('Dialog Title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('text-lg', 'font-semibold');
      });
    });

    it('description has proper styling', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description text</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const description = screen.getByText('Description text');
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass('text-sm');
      });
    });

    it('close button has accessible label', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close/i });
        expect(closeButton).toBeInTheDocument();
      });
    });
  });

  describe('Scrolling', () => {
    it('has overflow-y-auto for scrolling', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Scrollable Dialog</DialogTitle>
            <div style={{ height: '2000px' }}>Long content</div>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('[role="dialog"]');
        expect(content).toHaveClass('overflow-y-auto');
      });
    });

    it('has max height constraint', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('[role="dialog"]');
        expect(content).toHaveClass('max-h-[100dvh]');
      });
    });
  });

  describe('Positioning', () => {
    it('centers dialog on screen', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Centered Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('[role="dialog"]');
        expect(content).toHaveClass('left-[50%]');
        expect(content).toHaveClass('top-[50%]');
        expect(content).toHaveClass('translate-x-[-50%]');
        expect(content).toHaveClass('translate-y-[-50%]');
      });
    });

    it('has fixed positioning', async () => {
      const { baseElement } = render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        const content = baseElement.querySelector('[role="dialog"]');
        expect(content).toHaveClass('fixed');
      });
    });
  });

  describe('Complete Dialog Example', () => {
    it('renders complete dialog with all features', async () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Dialog</DialogTitle>
              <DialogDescription>This is a complete dialog example</DialogDescription>
            </DialogHeader>
            <div>
              <p>Dialog body content</p>
            </div>
            <DialogFooter>
              <button>Cancel</button>
              <button>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByText('Complete Dialog')).toBeInTheDocument();
        expect(screen.getByText('This is a complete dialog example')).toBeInTheDocument();
        expect(screen.getByText('Dialog body content')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      });
    });
  });
});
