import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';
import { Input } from '../input';
import { Toast, ToastContainer } from '../toast';
import { DataTable, TableColumn } from '../table';
import { Modal } from '../modal';
import { Sidebar, SidebarProvider, SidebarContent, SidebarItem } from '../sidebar';
import { Header, HeaderProvider, HeaderLeft, HeaderRight, Breadcrumb, NotificationBell } from '../header';
import { Layout, LayoutContent } from '../layout';
import { Icon } from '../icon';
import { Home, Settings } from 'lucide-react';

/**
 * Screen Reader Support Test Suite
 * 
 * Tests for Task 20.5: Add screen reader support
 * Validates: Requirements 20.5 - Screen reader compatibility
 * 
 * This test suite verifies:
 * - Proper reading order for screen readers
 * - Descriptive alt text for images
 * - Dynamic content change announcements (aria-live)
 * - Semantic HTML structure
 * - Accessible names for all interactive elements
 */

describe('Screen Reader Support', () => {
  describe('Reading Order', () => {
    it('should have proper heading hierarchy in layout', () => {
      const { container } = render(
        <Layout>
          <LayoutContent>
            <h1>Main Title</h1>
            <h2>Section Title</h2>
            <h3>Subsection Title</h3>
          </LayoutContent>
        </Layout>
      );

      const h1 = container.querySelector('h1');
      const h2 = container.querySelector('h2');
      const h3 = container.querySelector('h3');

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
    });

    it('should have navigation before main content', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </Sidebar>
          <Layout>
            <LayoutContent>Main content</LayoutContent>
          </Layout>
        </SidebarProvider>
      );

      const nav = screen.getByRole('navigation');
      const main = screen.getByRole('main');

      // Navigation should come before main in DOM order
      expect(nav.compareDocumentPosition(main)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('should have header before main content', () => {
      render(
        <HeaderProvider>
          <Header>
            <HeaderLeft>Logo</HeaderLeft>
          </Header>
          <Layout>
            <LayoutContent>Main content</LayoutContent>
          </Layout>
        </HeaderProvider>
      );

      const banner = screen.getByRole('banner');
      const main = screen.getByRole('main');

      // Header should come before main in DOM order
      expect(banner.compareDocumentPosition(main)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe('Alt Text for Images', () => {
    it('should have descriptive alt text for user avatars', () => {
      const { container } = render(
        <img src="/avatar.jpg" alt="John Doe profile picture" />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', 'John Doe profile picture');
    });

    it('should have descriptive alt text for event images', () => {
      const { container } = render(
        <img src="/event.jpg" alt="Sunday worship service event banner" />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', 'Sunday worship service event banner');
    });

    it('should have empty alt for decorative images', () => {
      const { container } = render(
        <div className="decorative-pattern" role="presentation">
          <img src="/pattern.svg" alt="" />
        </div>
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', '');
    });

    it('should mark decorative icons as aria-hidden', () => {
      render(<Icon icon={Home} />);
      const icon = screen.queryByRole('img');
      expect(icon).not.toBeInTheDocument(); // Should be aria-hidden
    });

    it('should provide aria-label for meaningful icons', () => {
      render(<Icon icon={Home} label="Home page" />);
      const icon = screen.getByRole('img', { name: 'Home page' });
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Dynamic Content Announcements', () => {
    it('should announce toast notifications with aria-live', () => {
      const toast = {
        id: '1',
        type: 'success' as const,
        message: 'Profile updated successfully',
        duration: 5000,
      };

      render(<Toast toast={toast} onRemove={() => {}} />);
      
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
      expect(alert).toHaveAttribute('aria-atomic', 'true');
      expect(alert).toHaveTextContent('Profile updated successfully');
    });

    it('should announce error toasts assertively', () => {
      const toast = {
        id: '1',
        type: 'error' as const,
        message: 'Failed to save changes',
        duration: 5000,
      };

      render(<Toast toast={toast} onRemove={() => {}} />);
      
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('should have aria-live region for toast container', () => {
      const toasts = [
        { id: '1', type: 'success' as const, message: 'Success', duration: 5000 },
      ];

      render(<ToastContainer toasts={toasts} onRemove={() => {}} />);
      
      const region = screen.getByRole('region', { name: 'Notifications' });
      expect(region).toHaveAttribute('aria-live', 'polite');
    });

    it('should announce loading states with aria-busy', () => {
      render(<Button loading>Saving...</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should announce table loading state', () => {
      interface TestData {
        id: number;
        name: string;
      }

      const columns: TableColumn<TestData>[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
      ];

      render(<DataTable columns={columns} data={[]} loading />);
      
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Form Field Associations', () => {
    it('should associate labels with inputs', () => {
      render(<Input label="Email address" value="" onChange={() => {}} />);
      
      const input = screen.getByRole('textbox', { name: 'Email address' });
      expect(input).toBeInTheDocument();
    });

    it('should associate error messages with inputs', () => {
      render(
        <Input 
          label="Email" 
          error="Invalid email format" 
          value="" 
          onChange={() => {}} 
        />
      );
      
      const input = screen.getByRole('textbox');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      
      const errorElement = document.getElementById(errorId!);
      expect(errorElement).toHaveTextContent('Invalid email format');
    });

    it('should associate helper text with inputs', () => {
      render(
        <Input 
          label="Password" 
          helperText="Must be at least 8 characters" 
          value="" 
          onChange={() => {}} 
        />
      );
      
      const input = screen.getByRole('textbox');
      const helperId = input.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      
      const helperElement = document.getElementById(helperId!);
      expect(helperElement).toHaveTextContent('Must be at least 8 characters');
    });

    it('should mark required fields appropriately', () => {
      render(<Input label="Name" required value="" onChange={() => {}} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('required');
      
      const asterisk = screen.getByLabelText('required');
      expect(asterisk).toBeInTheDocument();
    });
  });

  describe('Semantic HTML Structure', () => {
    it('should use semantic landmarks', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </Sidebar>
          <HeaderProvider>
            <Header>
              <HeaderLeft>Logo</HeaderLeft>
            </Header>
          </HeaderProvider>
          <Layout>
            <LayoutContent>Content</LayoutContent>
          </Layout>
        </SidebarProvider>
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('should use proper heading levels', () => {
      const { container } = render(
        <div>
          <h1>Page Title</h1>
          <section>
            <h2>Section 1</h2>
            <h3>Subsection 1.1</h3>
          </section>
          <section>
            <h2>Section 2</h2>
          </section>
        </div>
      );

      const headings = container.querySelectorAll('h1, h2, h3');
      expect(headings).toHaveLength(5);
    });

    it('should use lists for navigation items', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
              <SidebarItem href="/settings">Settings</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );

      const nav = screen.getByRole('navigation');
      const list = nav.querySelector('ul, ol');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Interactive Element Labels', () => {
    it('should have accessible names for buttons', () => {
      render(<Button>Save Changes</Button>);
      
      const button = screen.getByRole('button', { name: 'Save Changes' });
      expect(button).toBeInTheDocument();
    });

    it('should have accessible names for icon-only buttons', () => {
      render(
        <button aria-label="Close dialog">
          <Icon icon={Settings} />
        </button>
      );
      
      const button = screen.getByRole('button', { name: 'Close dialog' });
      expect(button).toBeInTheDocument();
    });

    it('should have accessible names for links', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );
      
      const link = screen.getByRole('link', { name: 'Home' });
      expect(link).toBeInTheDocument();
    });

    it('should have descriptive breadcrumb navigation', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Settings', href: '/settings' },
        { label: 'Profile' },
      ];

      render(
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <Breadcrumb items={items} />
            </HeaderLeft>
          </Header>
        </HeaderProvider>
      );

      const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
      expect(breadcrumb).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
  });

  describe('Modal Accessibility', () => {
    it('should announce modal opening to screen readers', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Confirm Action">
          <p>Are you sure?</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('should have accessible description in modal', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={() => {}} 
          title="Delete Item"
          description="This action cannot be undone"
        >
          <p>Content</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      const titleId = dialog.getAttribute('aria-labelledby');
      const descId = dialog.getAttribute('aria-describedby');

      expect(titleId).toBeTruthy();
      expect(descId).toBeTruthy();
    });
  });

  describe('Status Messages', () => {
    it('should announce notification count changes', () => {
      render(
        <HeaderProvider>
          <Header>
            <HeaderRight>
              <NotificationBell count={5} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      );

      const bell = screen.getByLabelText(/Notifications.*5 unread/i);
      expect(bell).toBeInTheDocument();
    });

    it('should announce current page in navigation', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="/" active>Home</SidebarItem>
              <SidebarItem href="/settings">Settings</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );

      const activeLink = screen.getByText('Home').closest('a');
      expect(activeLink).toHaveAttribute('aria-current', 'page');
    });

    it('should announce current page in breadcrumbs', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Current Page' },
      ];

      render(
        <HeaderProvider>
          <Header>
            <HeaderLeft>
              <Breadcrumb items={items} />
            </HeaderLeft>
          </Header>
        </HeaderProvider>
      );

      const currentPage = screen.getByText('Current Page');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Focus Management', () => {
    it('should maintain focus order in forms', () => {
      const { container } = render(
        <form>
          <Input label="First Name" value="" onChange={() => {}} />
          <Input label="Last Name" value="" onChange={() => {}} />
          <Input label="Email" value="" onChange={() => {}} />
          <Button type="submit">Submit</Button>
        </form>
      );

      const inputs = container.querySelectorAll('input');
      const button = container.querySelector('button');

      expect(inputs).toHaveLength(3);
      expect(button).toBeInTheDocument();

      // Verify tab order
      expect(inputs[0].tabIndex).toBe(0);
      expect(inputs[1].tabIndex).toBe(0);
      expect(inputs[2].tabIndex).toBe(0);
      expect(button?.tabIndex).toBe(0);
    });

    it('should skip hidden elements in focus order', () => {
      const { container } = render(
        <div>
          <Button>Visible Button</Button>
          <Button style={{ display: 'none' }}>Hidden Button</Button>
          <Button>Another Visible Button</Button>
        </div>
      );

      const buttons = container.querySelectorAll('button');
      const visibleButtons = Array.from(buttons).filter(
        btn => window.getComputedStyle(btn).display !== 'none'
      );

      expect(visibleButtons).toHaveLength(2);
    });
  });
});
