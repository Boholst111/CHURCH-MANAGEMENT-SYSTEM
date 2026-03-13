import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarItem,
  SidebarToggle,
  useSidebar,
} from '../sidebar'
import { Home, Settings } from 'lucide-react'

// Helper to set viewport size
function setViewportSize(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  window.dispatchEvent(new Event('resize'))
}

// Helper component to test sidebar state
function SidebarStateDisplay() {
  const { isOpen, isMobile } = useSidebar()
  return (
    <div>
      <span data-testid="sidebar-open">{isOpen ? 'open' : 'closed'}</span>
      <span data-testid="sidebar-mobile">{isMobile ? 'mobile' : 'desktop'}</span>
    </div>
  )
}

describe('Sidebar Mobile Optimization', () => {
  beforeEach(() => {
    // Reset viewport to desktop size before each test
    setViewportSize(1280)
  })

  describe('Responsive Behavior', () => {
    it('should detect mobile viewport (<1024px)', async () => {
      setViewportSize(768)

      render(
        <SidebarProvider>
          <SidebarStateDisplay />
        </SidebarProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('sidebar-mobile')).toHaveTextContent('mobile')
      })
    })

    it('should detect desktop viewport (≥1024px)', async () => {
      setViewportSize(1280)

      render(
        <SidebarProvider>
          <SidebarStateDisplay />
        </SidebarProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('sidebar-mobile')).toHaveTextContent('desktop')
      })
    })

    it('should close sidebar automatically on mobile', async () => {
      setViewportSize(768)

      render(
        <SidebarProvider defaultOpen={true}>
          <SidebarStateDisplay />
        </SidebarProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('sidebar-open')).toHaveTextContent('closed')
      })
    })
  })

  describe('Hamburger Menu', () => {
    it('should show hamburger toggle button on mobile', () => {
      setViewportSize(768)

      render(
        <SidebarProvider>
          <SidebarToggle />
        </SidebarProvider>
      )

      const toggleButton = screen.getByLabelText('Open sidebar')
      expect(toggleButton).toBeInTheDocument()
      expect(toggleButton).toHaveClass('lg:hidden')
    })

    it('should open sidebar when hamburger is clicked', async () => {
      setViewportSize(768)

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

      fireEvent.click(screen.getByLabelText('Open sidebar'))

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('open')
      })
    })
  })

  describe('Slide-in Animation', () => {
    it('should have smooth transition classes', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#">Dashboard</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveClass('transition-transform', 'duration-300', 'ease-in-out')
    })

    it('should be hidden off-screen when closed on mobile', async () => {
      setViewportSize(768)

      render(
        <SidebarProvider defaultOpen={false}>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#">Dashboard</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      await waitFor(() => {
        const sidebar = screen.getByRole('navigation')
        expect(sidebar).toHaveClass('-translate-x-full')
      })
    })
  })

  describe('Overlay', () => {
    it('should show overlay when sidebar is open on mobile', async () => {
      setViewportSize(768)

      function TestComponent() {
        const { setIsOpen } = useSidebar()
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <Sidebar>
              <SidebarContent>
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarContent>
            </Sidebar>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>
      )

      await waitFor(() => {
        expect(screen.queryByRole('navigation')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Open'))

      await waitFor(() => {
        const overlay = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50')
        expect(overlay).toBeInTheDocument()
      })
    })

    it('should close sidebar when overlay is clicked', async () => {
      setViewportSize(768)

      function TestComponent() {
        const { isOpen, setIsOpen } = useSidebar()
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <Sidebar>
              <SidebarContent>
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarContent>
            </Sidebar>
            <div data-testid="state">{isOpen ? 'open' : 'closed'}</div>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>
      )

      // Open sidebar
      fireEvent.click(screen.getByText('Open'))

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('open')
      })

      // Click overlay
      const overlay = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50')
      expect(overlay).toBeInTheDocument()
      fireEvent.click(overlay!)

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('closed')
      })
    })

    it('should not show overlay on desktop', () => {
      setViewportSize(1280)

      render(
        <SidebarProvider defaultOpen={true}>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#">Dashboard</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const overlay = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50')
      expect(overlay).not.toBeInTheDocument()
    })
  })

  describe('Touch-Friendly Sizing', () => {
    it('should have minimum 44px height for navigation items', () => {
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
      expect(item).toHaveClass('min-h-[44px]')
    })

    it('should have adequate padding for touch targets', () => {
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
      expect(item).toHaveClass('py-3')
    })
  })

  describe('Mobile Interactions', () => {
    it('should close sidebar when navigation item is clicked on mobile', async () => {
      setViewportSize(768)

      function TestComponent() {
        const { isOpen, setIsOpen } = useSidebar()
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <Sidebar>
              <SidebarContent>
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarContent>
            </Sidebar>
            <div data-testid="state">{isOpen ? 'open' : 'closed'}</div>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>
      )

      // Open sidebar
      fireEvent.click(screen.getByText('Open'))

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('open')
      })

      // Click navigation item
      fireEvent.click(screen.getByRole('link', { name: 'Dashboard' }))

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('closed')
      })
    })

    it('should not close sidebar when navigation item is clicked on desktop', async () => {
      setViewportSize(1280)

      function TestComponent() {
        const { isOpen } = useSidebar()
        return (
          <>
            <Sidebar>
              <SidebarContent>
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarContent>
            </Sidebar>
            <div data-testid="state">{isOpen ? 'open' : 'closed'}</div>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={true}>
          <TestComponent />
        </SidebarProvider>
      )

      expect(screen.getByTestId('state')).toHaveTextContent('open')

      // Click navigation item
      fireEvent.click(screen.getByRole('link', { name: 'Dashboard' }))

      // Should still be open on desktop
      expect(screen.getByTestId('state')).toHaveTextContent('open')
    })

    it('should close sidebar when escape key is pressed on mobile', async () => {
      setViewportSize(768)

      function TestComponent() {
        const { isOpen, setIsOpen } = useSidebar()
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <Sidebar>
              <SidebarContent>
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarContent>
            </Sidebar>
            <div data-testid="state">{isOpen ? 'open' : 'closed'}</div>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>
      )

      // Open sidebar
      fireEvent.click(screen.getByText('Open'))

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('open')
      })

      // Press escape
      fireEvent.keyDown(document, { key: 'Escape' })

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('closed')
      })
    })

    it('should prevent body scroll when mobile sidebar is open', async () => {
      setViewportSize(768)

      function TestComponent() {
        const { setIsOpen } = useSidebar()
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <Sidebar>
              <SidebarContent>
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarContent>
            </Sidebar>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>
      )

      expect(document.body.style.overflow).toBe('')

      // Open sidebar
      fireEvent.click(screen.getByText('Open'))

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden')
      })
    })

    it('should show close button in header on mobile', async () => {
      setViewportSize(768)

      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader showCloseButton={true}>
              <span>Logo</span>
            </SidebarHeader>
          </Sidebar>
        </SidebarProvider>
      )

      await waitFor(() => {
        const closeButton = screen.getByLabelText('Close sidebar')
        expect(closeButton).toBeInTheDocument()
        expect(closeButton).toHaveClass('lg:hidden')
      })
    })

    it('should close sidebar when close button is clicked', async () => {
      setViewportSize(768)

      function TestComponent() {
        const { isOpen, setIsOpen } = useSidebar()
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <Sidebar>
              <SidebarHeader showCloseButton={true}>
                <span>Logo</span>
              </SidebarHeader>
              <SidebarContent>
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarContent>
            </Sidebar>
            <div data-testid="state">{isOpen ? 'open' : 'closed'}</div>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>
      )

      // Open sidebar
      fireEvent.click(screen.getByText('Open'))

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('open')
      })

      // Click close button
      fireEvent.click(screen.getByLabelText('Close sidebar'))

      await waitFor(() => {
        expect(screen.getByTestId('state')).toHaveTextContent('closed')
      })
    })
  })

  describe('Z-Index Layering', () => {
    it('should have correct z-index for overlay (z-40)', async () => {
      setViewportSize(768)

      function TestComponent() {
        const { setIsOpen } = useSidebar()
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <Sidebar>
              <SidebarContent>
                <SidebarItem href="#">Dashboard</SidebarItem>
              </SidebarContent>
            </Sidebar>
          </>
        )
      }

      render(
        <SidebarProvider defaultOpen={false}>
          <TestComponent />
        </SidebarProvider>
      )

      fireEvent.click(screen.getByText('Open'))

      await waitFor(() => {
        const overlay = document.querySelector('.z-40')
        expect(overlay).toBeInTheDocument()
      })
    })

    it('should have correct z-index for sidebar (z-50 on mobile, z-30 on desktop)', () => {
      render(
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarItem href="#">Dashboard</SidebarItem>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveClass('z-50')
      expect(sidebar).toHaveClass('lg:z-30')
    })
  })
})
