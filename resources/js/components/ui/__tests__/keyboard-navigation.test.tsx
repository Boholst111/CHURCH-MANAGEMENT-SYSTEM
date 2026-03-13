import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';
import { Modal } from '../modal';
import { Select } from '../select';
import { Sidebar, SidebarProvider, SidebarItem, SidebarContent } from '../sidebar';
import { SkipToMain } from '../skip-to-main';

describe('Keyboard Navigation', () => {
  describe('Focus Indicators', () => {
    it('should show visible focus indicator on button when focused with keyboard', async () => {
      const user = userEvent.setup();
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: /click me/i });
      
      // Tab to focus the button
      await user.tab();
      
      expect(button).toHaveFocus();
      expect(button).toHaveClass('focus:ring-2');
      expect(button).toHaveClass('focus:ring-primary-500');
    });

    it('should show focus indicator on all interactive elements', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Button 1</button>
          <a href="#test">Link</a>
          <input type="text" placeholder="Input" />
          <button>Button 2</button>
        </div>
      );

      // Tab through all elements
      await user.tab();
      expect(screen.getByRole('button', { name: /button 1/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('link', { name: /link/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText(/input/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /button 2/i })).toHaveFocus();
    });
  });

  describe('Tab Order', () => {
    it('should follow logical tab order in forms', async () => {
      const user = userEvent.setup();
      render(
        <form>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <button type="submit">Submit</button>
        </form>
      );

      await user.tab();
      expect(screen.getByPlaceholderText(/first name/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText(/last name/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText(/email/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /submit/i })).toHaveFocus();
    });

    it('should skip disabled elements in tab order', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Button 1</button>
          <button disabled>Disabled Button</button>
          <button>Button 2</button>
        </div>
      );

      await user.tab();
      expect(screen.getByRole('button', { name: /button 1/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /button 2/i })).toHaveFocus();
    });

    it('should respect custom tabIndex order', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button tabIndex={3}>Third</button>
          <button tabIndex={1}>First</button>
          <button tabIndex={2}>Second</button>
        </div>
      );

      await user.tab();
      expect(screen.getByRole('button', { name: /first/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /second/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /third/i })).toHaveFocus();
    });
  });

  describe('Keyboard Activation', () => {
    it('should activate button with Enter key', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button', { name: /click me/i });
      button.focus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should activate button with Space key', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button', { name: /click me/i });
      button.focus();

      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should activate link with Enter key', async () => {
      const handleClick = jest.fn();
      render(
        <a href="#test" onClick={handleClick}>
          Link
        </a>
      );

      const link = screen.getByRole('link', { name: /link/i });
      link.focus();

      fireEvent.keyDown(link, { key: 'Enter', code: 'Enter' });
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Modal Focus Trap', () => {
    it('should trap focus within modal when open', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <Modal isOpen={false} onClose={() => {}} title="Test Modal">
          <button>Button 1</button>
          <button>Button 2</button>
        </Modal>
      );

      // Open modal
      rerender(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <button>Button 1</button>
          <button>Button 2</button>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Focus should be trapped - tabbing should cycle through modal elements only
      const button1 = screen.getByRole('button', { name: /button 1/i });
      const button2 = screen.getByRole('button', { name: /button 2/i });

      // Tab through modal elements
      await user.tab();
      await user.tab();
      
      // Should cycle back to first element
      await user.tab();
      
      // Focus should still be within modal
      const focusedElement = document.activeElement;
      const modal = screen.getByRole('dialog');
      expect(modal.contains(focusedElement)).toBe(true);
    });

    it('should close modal with Escape key', async () => {
      const handleClose = jest.fn();
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      await user.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe('Select Keyboard Navigation', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ];

    it('should open dropdown with Enter key', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      const select = screen.getByRole('combobox');
      select.focus();

      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('should navigate options with arrow keys', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      const select = screen.getByRole('combobox');
      select.focus();

      // Open dropdown
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      // Navigate with arrow down
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      
      // Should be able to select with Enter
      await user.keyboard('{Enter}');
    });

    it('should close dropdown with Escape key', async () => {
      const user = userEvent.setup();
      render(<Select options={options} />);

      const select = screen.getByRole('combobox');
      select.focus();

      // Open dropdown
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      // Close with Escape
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Sidebar Keyboard Navigation', () => {
    it('should navigate sidebar items with Tab key', async () => {
      const user = userEvent.setup();
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#dashboard">Dashboard</SidebarItem>
              <SidebarItem href="#members">Members</SidebarItem>
              <SidebarItem href="#events">Events</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );

      await user.tab();
      expect(screen.getByRole('link', { name: /dashboard/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('link', { name: /members/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('link', { name: /events/i })).toHaveFocus();
    });

    it('should close mobile sidebar with Escape key', async () => {
      // Mock mobile viewport
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));

      const user = userEvent.setup();
      const { container } = render(
        <SidebarProvider defaultOpen={true}>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#dashboard">Dashboard</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );

      // Sidebar should be open
      const sidebar = container.querySelector('aside');
      expect(sidebar).not.toHaveClass('-translate-x-full');

      // Press Escape
      await user.keyboard('{Escape}');

      // Sidebar should close
      await waitFor(() => {
        expect(sidebar).toHaveClass('-translate-x-full');
      });
    });
  });

  describe('Skip to Main Content', () => {
    it('should render skip to main link', () => {
      render(<SkipToMain />);
      const skipLink = screen.getByText(/skip to main content/i);
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('should be focusable with keyboard', async () => {
      const user = userEvent.setup();
      render(<SkipToMain />);
      
      const skipLink = screen.getByText(/skip to main content/i);
      
      await user.tab();
      expect(skipLink).toHaveFocus();
    });
  });

  describe('Keyboard Accessibility', () => {
    it('should have proper ARIA attributes for keyboard users', () => {
      render(
        <div>
          <button aria-label="Close dialog">×</button>
          <input type="text" aria-label="Search" />
          <div role="button" tabIndex={0} aria-label="Custom button">
            Click me
          </div>
        </div>
      );

      expect(screen.getByRole('button', { name: /close dialog/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('textbox', { name: /search/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /custom button/i })).toHaveAttribute('tabIndex', '0');
    });

    it('should announce loading state to screen readers', () => {
      render(<Button loading={true}>Loading</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should announce disabled state properly', () => {
      render(<Button disabled={true}>Disabled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });
});
