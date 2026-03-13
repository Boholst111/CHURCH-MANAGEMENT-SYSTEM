import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { Input } from '../input';
import { Select } from '../select';
import { Modal } from '../modal';
import { Toast } from '../toast';
import { DataTable, TableColumn } from '../table';
import { Card } from '../card';
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarItem, SidebarGroup } from '../sidebar';
import { Header, HeaderProvider, HeaderLeft, HeaderRight, Breadcrumb, NotificationBell, UserProfile } from '../header';
import { Layout, LayoutContent, LayoutSidebar, LayoutHeader } from '../layout';
import { Pagination } from '../pagination';
import { Home, Settings, Users } from 'lucide-react';

/**
 * Accessibility ARIA Labels and Roles Test Suite
 * 
 * Tests for Task 20.1: Add ARIA labels and roles
 * Validates: Requirements 20.1 - All interactive elements have proper ARIA labels
 * 
 * This test suite verifies:
 * - All interactive elements have proper ARIA labels
 * - Landmark roles (navigation, main, complementary) are present
 * - aria-live regions for dynamic content
 * - aria-expanded for collapsible elements
 */

describe('Accessibility - ARIA Labels and Roles', () => {
  describe('Button Component', () => {
    it('should have aria-busy when loading', () => {
      render(<Button loading>Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should mark icons as aria-hidden', () => {
      const { container } = render(
        <Button icon={<Home data-testid="icon" />}>Home</Button>
      );
      const iconSpan = container.querySelector('[aria-hidden="true"]');
      expect(iconSpan).toBeInTheDocument();
    });
  });

  describe('Input Component', () => {
    it('should have proper aria-invalid when error is present', () => {
      render(<Input label="Email" error="Invalid email" value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-describedby linking to error message', () => {
      render(<Input label="Email" error="Invalid email" value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      const errorElement = document.getElementById(errorId!);
      expect(errorElement).toHaveTextContent('Invalid email');
    });

    it('should have aria-describedby linking to helper text', () => {
      render(<Input label="Email" helperText="Enter your email" value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      const helperId = input.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      const helperElement = document.getElementById(helperId!);
      expect(helperElement).toHaveTextContent('Enter your email');
    });

    it('should mark required fields with aria-label on asterisk', () => {
      render(<Input label="Email" required value="" onChange={() => {}} />);
      const asterisk = screen.getByLabelText('required');
      expect(asterisk).toBeInTheDocument();
    });

    it('should mark icons as aria-hidden', () => {
      const { container } = render(
        <Input label="Search" icon={<Home />} value="" onChange={() => {}} />
      );
      const iconDiv = container.querySelector('[aria-hidden="true"]');
      expect(iconDiv).toBeInTheDocument();
    });
  });

  describe('Select Component', () => {
    const options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];

    it('should have combobox role', () => {
      render(<Select options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('should have aria-expanded attribute', () => {
      render(<Select options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-expanded');
    });

    it('should have aria-haspopup attribute', () => {
      render(<Select options={options} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('should have aria-invalid when error is present', () => {
      render(<Select options={options} error="Required field" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Table Component', () => {
    interface TestData {
      id: number;
      name: string;
    }

    const columns: TableColumn<TestData>[] = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
    ];

    const data: TestData[] = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];

    it('should have table role', () => {
      render(<DataTable columns={columns} data={data} />);
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    it('should have region role on container', () => {
      render(<DataTable columns={columns} data={data} />);
      const region = screen.getByRole('region', { name: 'Data table' });
      expect(region).toBeInTheDocument();
    });

    it('should have columnheader roles', () => {
      render(<DataTable columns={columns} data={data} />);
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(2);
    });

    it('should have rowgroup roles', () => {
      render(<DataTable columns={columns} data={data} />);
      const rowgroups = screen.getAllByRole('rowgroup');
      expect(rowgroups.length).toBeGreaterThan(0);
    });

    it('should have aria-busy when loading', () => {
      render(<DataTable columns={columns} data={[]} loading />);
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-busy', 'true');
    });

    it('should have scope="col" on column headers', () => {
      const { container } = render(<DataTable columns={columns} data={data} />);
      const headers = container.querySelectorAll('th[scope="col"]');
      expect(headers.length).toBe(2);
    });
  });

  describe('Toast Component', () => {
    const mockToast = {
      id: '1',
      type: 'success' as const,
      message: 'Success message',
      duration: 5000,
    };

    it('should have alert role', () => {
      render(<Toast toast={mockToast} onRemove={() => {}} />);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('should have aria-live="polite" for non-error toasts', () => {
      render(<Toast toast={mockToast} onRemove={() => {}} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-live="assertive" for error toasts', () => {
      const errorToast = { ...mockToast, type: 'error' as const };
      render(<Toast toast={errorToast} onRemove={() => {}} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('should have aria-atomic="true"', () => {
      render(<Toast toast={mockToast} onRemove={() => {}} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-atomic', 'true');
    });

    it('should have aria-label on close button', () => {
      render(<Toast toast={mockToast} onRemove={() => {}} />);
      const closeButton = screen.getByLabelText('Close notification');
      expect(closeButton).toBeInTheDocument();
    });

    it('should mark icons as aria-hidden', () => {
      const { container } = render(<Toast toast={mockToast} onRemove={() => {}} />);
      const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBeGreaterThan(0);
    });
  });

  describe('Sidebar Component', () => {
    it('should have navigation role', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="/">Home</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });

    it('should have aria-label on close button', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>Logo</SidebarHeader>
          </Sidebar>
        </SidebarProvider>
      );
      // Mobile close button should have aria-label
      const closeButton = screen.queryByLabelText('Close sidebar');
      // May not be visible on desktop, but should exist in DOM
      expect(closeButton).toBeTruthy();
    });

    it('should have aria-current on active items', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="/" active>Home</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );
      const activeItem = screen.getByText('Home').closest('a');
      expect(activeItem).toHaveAttribute('aria-current', 'page');
    });

    it('should have aria-expanded on collapsible groups', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup label="Settings" collapsible>
                <SidebarItem href="/settings">General</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );
      const groupButton = screen.getByRole('button', { name: /Settings/i });
      expect(groupButton).toHaveAttribute('aria-expanded');
    });

    it('should have aria-controls on collapsible groups', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup label="Settings" collapsible>
                <SidebarItem href="/settings">General</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      );
      const groupButton = screen.getByRole('button', { name: /Settings/i });
      const controlsId = groupButton.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
    });
  });

  describe('Header Component', () => {
    it('should have banner role', () => {
      render(
        <HeaderProvider>
          <Header>
            <HeaderLeft>Logo</HeaderLeft>
          </Header>
        </HeaderProvider>
      );
      const banner = screen.getByRole('banner');
      expect(banner).toBeInTheDocument();
    });

    it('should have breadcrumb navigation with proper aria-label', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Settings' },
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
    });

    it('should have aria-current on last breadcrumb item', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Settings' },
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
      const lastItem = screen.getByText('Settings');
      expect(lastItem).toHaveAttribute('aria-current', 'page');
    });

    it('should have aria-label on notification bell', () => {
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

    it('should have aria-expanded on user profile dropdown', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      render(
        <HeaderProvider>
          <Header>
            <HeaderRight>
              <UserProfile user={user} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      );
      const profileButton = screen.getByLabelText('User menu');
      expect(profileButton).toHaveAttribute('aria-expanded');
    });

    it('should have aria-haspopup on user profile dropdown', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      render(
        <HeaderProvider>
          <Header>
            <HeaderRight>
              <UserProfile user={user} />
            </HeaderRight>
          </Header>
        </HeaderProvider>
      );
      const profileButton = screen.getByLabelText('User menu');
      expect(profileButton).toHaveAttribute('aria-haspopup', 'true');
    });
  });

  describe('Layout Component', () => {
    it('should have main role on content area', () => {
      render(
        <Layout>
          <LayoutContent>Content</LayoutContent>
        </Layout>
      );
      const main = screen.getByRole('main', { name: 'Main content' });
      expect(main).toBeInTheDocument();
    });
  });

  describe('Pagination Component', () => {
    it('should have navigation role', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          totalItems={50}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );
      const nav = screen.getByRole('navigation', { name: 'Pagination' });
      expect(nav).toBeInTheDocument();
    });

    it('should have aria-label on page buttons', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          totalItems={50}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );
      const firstPageButton = screen.getByLabelText('Go to first page');
      expect(firstPageButton).toBeInTheDocument();
    });

    it('should have aria-current on current page', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          totalItems={50}
          itemsPerPage={10}
          onPageChange={() => {}}
        />
      );
      const currentPage = screen.getByLabelText('Go to page 2');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Card Component', () => {
    it('should have article role when hoverable', () => {
      render(<Card hoverable title="Test Card">Content</Card>);
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
    });

    it('should have aria-label when no title is provided', () => {
      render(<Card hoverable>Content</Card>);
      const card = screen.getByLabelText('Card');
      expect(card).toBeInTheDocument();
    });
  });
});
