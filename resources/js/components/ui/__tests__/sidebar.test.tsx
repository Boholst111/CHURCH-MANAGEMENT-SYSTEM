import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarGroup,
  SidebarNestedItem,
  SidebarToggle,
  useSidebar,
} from '../sidebar'
import { Home } from 'lucide-react'

// Helper component to test useSidebar hook
function SidebarStateDisplay() {
  const { isOpen } = useSidebar()
  return (
    <div>
      <span data-testid="sidebar-open">{isOpen ? 'open' : 'closed'}</span>
    </div>
  )
}

describe('Sidebar Component', () => {
  describe('SidebarProvider', () => {
    it('should render children', () => {
      render(
        <SidebarProvider>
          <div data-testid="child">Child content</div>
        </SidebarProvider>
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('should provide sidebar context', () => {
      render(
        <SidebarProvider defaultOpen={true}>
          <SidebarStateDisplay />
        </SidebarProvider>
      )

      expect(screen.getByTestId('sidebar-open')).toHaveTextContent('open')
    })

    it('should call onOpenChange when state changes', () => {
      const onOpenChange = jest.fn()
      
      function TestComponent() {
        const { setIsOpen } = useSidebar()
        return <button onClick={() => setIsOpen(false)}>Close</button>
      }

      render(
        <SidebarProvider defaultOpen={true} onOpenChange={onOpenChange}>
          <TestComponent />
        </SidebarProvider>
      )

      fireEvent.click(screen.getByText('Close'))
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Sidebar', () => {
    it('should render with navigation role', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <div>Sidebar content</div>
          </Sidebar>
        </SidebarProvider>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toBeInTheDocument()
      expect(sidebar).toHaveAttribute('aria-label', 'Main navigation')
    })

    it('should apply correct classes', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <div>Sidebar content</div>
          </Sidebar>
        </SidebarProvider>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveClass('fixed', 'w-64', 'bg-white', 'border-r')
    })
  })

  describe('SidebarHeader', () => {
    it('should render children', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div data-testid="header-content">Header</div>
            </SidebarHeader>
          </Sidebar>
        </SidebarProvider>
      )

      expect(screen.getByTestId('header-content')).toBeInTheDocument()
    })
  })

  describe('SidebarContent', () => {
    it('should render children', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <div data-testid="content">Content</div>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      expect(screen.getByTestId('content')).toBeInTheDocument()
    })
  })

  describe('SidebarFooter', () => {
    it('should render children', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarFooter>
              <div data-testid="footer">Footer</div>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      )

      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })

  describe('SidebarItem', () => {
    it('should render with text and icon', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#" icon={<Home data-testid="icon" />}>
                Dashboard
              </SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('should apply active styles when active', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#" active={true}>
                Dashboard
              </SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const item = screen.getByRole('link', { name: 'Dashboard' })
      expect(item).toHaveClass('bg-primary-50', 'text-primary-700')
      expect(item).toHaveAttribute('aria-current', 'page')
    })

    it('should call onClick when clicked', () => {
      const onClick = jest.fn()

      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#" onClick={onClick}>
                Dashboard
              </SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      fireEvent.click(screen.getByRole('link', { name: 'Dashboard' }))
      expect(onClick).toHaveBeenCalled()
    })

    it('should have pointer-events-none when disabled', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#" disabled={true}>
                Dashboard
              </SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const item = screen.getByRole('link', { name: 'Dashboard' })
      expect(item).toHaveClass('pointer-events-none')
    })

    it('should render badge when provided', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#" badge={<span data-testid="badge">3</span>}>
                Events
              </SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      expect(screen.getByTestId('badge')).toBeInTheDocument()
    })
  })

  describe('SidebarGroup', () => {
    it('should render label and children', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup label="Main">
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      expect(screen.getByText('Main')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    })

    it('should be collapsible when collapsible prop is true', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup label="Finance" collapsible defaultOpen={true}>
                <SidebarItem href="#">Overview</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const button = screen.getByRole('button', { name: /Finance/i })
      expect(button).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument()
    })

    it('should toggle children visibility when clicked', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup label="Finance" collapsible defaultOpen={true}>
                <SidebarItem href="#">Overview</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument()

      const button = screen.getByRole('button', { name: /Finance/i })
      fireEvent.click(button)

      expect(screen.queryByRole('link', { name: 'Overview' })).not.toBeInTheDocument()
    })

    it('should start collapsed when defaultOpen is false', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup label="Finance" collapsible defaultOpen={false}>
                <SidebarItem href="#">Overview</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      expect(screen.queryByRole('link', { name: 'Overview' })).not.toBeInTheDocument()
    })
  })

  describe('SidebarNestedItem', () => {
    it('should render nested item', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarNestedItem href="#" level={1}>
                Nested Item
              </SidebarNestedItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const item = screen.getByRole('link', { name: 'Nested Item' })
      expect(item).toBeInTheDocument()
    })
  })

  describe('SidebarToggle', () => {
    it('should render toggle button', () => {
      render(
        <SidebarProvider>
          <SidebarToggle />
        </SidebarProvider>
      )

      const button = screen.getByLabelText('Open sidebar')
      expect(button).toBeInTheDocument()
    })

    it('should open sidebar when clicked', async () => {
      function TestComponent() {
        const { isOpen } = useSidebar()
        return (
          <>
            <SidebarToggle />
            <div data-testid="state">{isOpen ? 'open' : 'closed'}</div>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>
      )

      expect(screen.getByTestId('state')).toHaveTextContent('closed')

      const button = screen.getByLabelText('Open sidebar')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('open')
      })
    })

    it('should render custom icon when provided', () => {
      render(
        <SidebarProvider>
          <SidebarToggle icon={<Home data-testid="custom-icon" />} />
        </SidebarProvider>
      )

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('should support keyboard focus on sidebar items', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#">Dashboard</SidebarItem>
              <SidebarItem href="#">Members</SidebarItem>
              <SidebarItem href="#">Settings</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const items = screen.getAllByRole('link')
      items[0].focus()
      expect(items[0]).toHaveFocus()
    })

    it('should have proper focus styles', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#">Dashboard</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const item = screen.getByRole('link', { name: 'Dashboard' })
      expect(item).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#" active={true}>
                Dashboard
              </SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveAttribute('aria-label', 'Main navigation')

      const activeItem = screen.getByRole('link', { name: 'Dashboard' })
      expect(activeItem).toHaveAttribute('aria-current', 'page')
    })

    it('should have aria-expanded on collapsible groups', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup label="Finance" collapsible defaultOpen={true}>
                <SidebarItem href="#">Overview</SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const button = screen.getByRole('button', { name: /Finance/i })
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
