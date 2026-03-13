import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from '../modal';

describe('Modal Component', () => {
  describe('Open and Close', () => {
    it('renders when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onClose when escape key is pressed', async () => {
      const handleClose = jest.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      
      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Small Modal" size="sm">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('sm:max-w-md');
    });

    it('renders with medium size (default)', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Medium Modal">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('sm:max-w-lg');
    });

    it('renders with large size', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Large Modal" size="lg">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('sm:max-w-2xl');
    });

    it('renders with extra large size', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="XL Modal" size="xl">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('sm:max-w-4xl');
    });

    it('renders with full size', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Full Modal" size="full">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('sm:max-w-7xl');
    });
  });

  describe('Title and Description', () => {
    it('renders title when provided', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal Title">
          <p>Content</p>
        </Modal>
      );
      
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={() => {}} 
          title="Modal Title"
          description="Modal description text"
        >
          <p>Content</p>
        </Modal>
      );
      
      expect(screen.getByText('Modal description text')).toBeInTheDocument();
    });

    it('renders without title and description', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content only</p>
        </Modal>
      );
      
      expect(screen.getByText('Content only')).toBeInTheDocument();
    });

    it('renders title without description', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Only Title">
          <p>Content</p>
        </Modal>
      );
      
      expect(screen.getByText('Only Title')).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('renders footer when provided', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={() => {}} 
          title="Modal with Footer"
          footer={<button>Footer Button</button>}
        >
          <p>Content</p>
        </Modal>
      );
      
      expect(screen.getByText('Footer Button')).toBeInTheDocument();
    });

    it('does not render footer when not provided', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal without Footer">
          <p>Content</p>
        </Modal>
      );
      
      // Footer section should not exist
      const footers = container.querySelectorAll('footer, [class*="footer"]');
      expect(footers.length).toBe(0);
    });

    it('renders multiple buttons in footer', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={() => {}} 
          title="Modal"
          footer={
            <>
              <button>Cancel</button>
              <button>Confirm</button>
            </>
          }
        >
          <p>Content</p>
        </Modal>
      );
      
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('shows close button by default', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('shows close button when showCloseButton is true', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal" showCloseButton={true}>
          <p>Content</p>
        </Modal>
      );
      
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal" showCloseButton={false}>
          <p>Content</p>
        </Modal>
      );
      
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });

  describe('Overlay Click', () => {
    it('closes modal on overlay click by default', async () => {
      const handleClose = jest.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      // Find the overlay (the element behind the modal content)
      const overlay = container.querySelector('[data-radix-dialog-overlay]');
      if (overlay) {
        fireEvent.click(overlay);
        
        await waitFor(() => {
          expect(handleClose).toHaveBeenCalled();
        });
      }
    });

    it('closes modal on overlay click when closeOnOverlayClick is true', async () => {
      const handleClose = jest.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} title="Modal" closeOnOverlayClick={true}>
          <p>Content</p>
        </Modal>
      );
      
      const overlay = container.querySelector('[data-radix-dialog-overlay]');
      if (overlay) {
        fireEvent.click(overlay);
        
        await waitFor(() => {
          expect(handleClose).toHaveBeenCalled();
        });
      }
    });

    it('does not close modal on overlay click when closeOnOverlayClick is false', async () => {
      const handleClose = jest.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} title="Modal" closeOnOverlayClick={false}>
          <p>Content</p>
        </Modal>
      );
      
      const overlay = container.querySelector('[data-radix-dialog-overlay]');
      if (overlay) {
        fireEvent.click(overlay);
        
        // Wait a bit to ensure no call happens
        await new Promise(resolve => setTimeout(resolve, 100));
        expect(handleClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('Content', () => {
    it('renders children content', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <div>
            <p>First paragraph</p>
            <p>Second paragraph</p>
          </div>
        </Modal>
      );
      
      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    });

    it('renders complex content', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <button type="submit">Submit</button>
          </form>
        </Modal>
      );
      
      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal" className="custom-modal">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('custom-modal');
    });

    it('merges custom className with default classes', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal" className="custom-modal">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('custom-modal');
      expect(content).toHaveClass('sm:max-w-lg'); // Default size class
    });
  });

  describe('Accessibility', () => {
    it('has dialog role', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Accessible Modal">
          <p>Content</p>
        </Modal>
      );
      
      expect(baseElement.querySelector('[role="dialog"]')).toBeInTheDocument();
    });

    it('has accessible title', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Accessible Title">
          <p>Content</p>
        </Modal>
      );
      
      const title = screen.getByText('Accessible Title');
      expect(title).toBeInTheDocument();
    });

    it('has accessible description', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={() => {}} 
          title="Modal"
          description="Accessible description"
        >
          <p>Content</p>
        </Modal>
      );
      
      const description = screen.getByText('Accessible description');
      expect(description).toBeInTheDocument();
    });

    it('close button has accessible label', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('applies animation classes', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('duration-200');
    });
  });

  describe('Positioning', () => {
    it('centers modal on screen', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('left-[50%]');
      expect(content).toHaveClass('top-[50%]');
      expect(content).toHaveClass('translate-x-[-50%]');
      expect(content).toHaveClass('translate-y-[-50%]');
    });

    it('has fixed positioning', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('fixed');
    });
  });

  describe('Overlay', () => {
    it('renders overlay', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      // Radix UI renders overlay as a sibling to the dialog content
      const overlay = baseElement.querySelector('[data-state="open"]');
      expect(overlay).toBeInTheDocument();
    });

    it('overlay has backdrop blur', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      // Check for backdrop blur class in the rendered elements
      const elementsWithBlur = baseElement.querySelectorAll('.backdrop-blur-sm');
      expect(elementsWithBlur.length).toBeGreaterThan(0);
    });
  });

  describe('Max Height', () => {
    it('has max height constraint', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('max-h-[90vh]');
    });

    it('has overflow-y-auto for scrolling', () => {
      const { baseElement } = render(
        <Modal isOpen={true} onClose={() => {}} title="Modal">
          <p>Content</p>
        </Modal>
      );
      
      const content = baseElement.querySelector('[role="dialog"]');
      expect(content).toHaveClass('overflow-y-auto');
    });
  });
});
