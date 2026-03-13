import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Header,
  HeaderLeft,
  HeaderRight,
  Breadcrumb,
  SearchBar,
  NotificationBell,
  UserProfile,
  HeaderProvider,
} from '../header'
import { User, Settings, LogOut } from 'lucide-react'
import { ThemeProvider } from '../../../contexts/ThemeContext'

// Mock SidebarToggle component
jest.mock('../sidebar', () => ({
  SidebarToggle: () => <button data-testid="sidebar-toggle">Menu</button>,
}))

describe('Header Component', () => {
  describe('Header Root', () => {
    it('renders with correct styling classes', () => {
      const { container } = render(
        <Header>
          <div>Content</div>
        </Header>
      )
      const header = container.querySelector('header')
      expect(header).toHaveClass('sticky', 'top-0', 'z-40', 'h-16', 'bg-white')
    })

    it('renders children correctly', () => {
      render(
        <Header>
          <div data-testid="header-content">Test Content</div>
        </Header>
      )
      expect(screen.getByTestId('header-content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <Header className="custom-class">
          <div>Content</div>
        </Header>
      )
      const header = container.querySelector('header')
      expect(header).toHaveClass('custom-class')
    })
  })

  describe('HeaderLeft', () => {
    it('renders sidebar toggle button', () => {
      render(
        <HeaderLeft>
          <span>Content</span>
        </HeaderLeft>
      )
      expect(screen.getByTestId('sidebar-toggle')).toBeInTheDocument()
    })

    it('renders children after sidebar toggle', () => {
      render(
        <HeaderLeft>
          <span data-testid="left-content">Left Content</span>
        </HeaderLeft>
      )
      expect(screen.getByTestId('left-content')).toBeInTheDocument()
    })
  })

  describe('HeaderRight', () => {
    it('renders children correctly', () => {
      render(
        <ThemeProvider defaultTheme="light">
          <HeaderRight>
            <span data-testid="right-content">Right Content</span>
          </HeaderRight>
        </ThemeProvider>
      )
      expect(screen.getByTestId('right-content')).toBeInTheDocument()
    })
  })

  describe('Breadcrumb', () => {
    const breadcrumbItems = [
      { label: 'Home', href: '/home' },
      { label: 'Members', href: '/members' },
      { label: 'John Doe' },
    ]

    it('renders all breadcrumb items', () => {
      render(<Breadcrumb items={breadcrumbItems} />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Members')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders links for items with href', () => {
      render(<Breadcrumb items={breadcrumbItems} />)
      const homeLink = screen.getByText('Home')
      expect(homeLink.tagName).toBe('A')
      expect(homeLink).toHaveAttribute('href', '/home')
    })

    it('renders last item as span without link', () => {
      render(<Breadcrumb items={breadcrumbItems} />)
      const lastItem = screen.getByText('John Doe')
      expect(lastItem.tagName).toBe('SPAN')
      expect(lastItem).toHaveAttribute('aria-current', 'page')
    })

    it('renders default separator between items', () => {
      const { container } = render(<Breadcrumb items={breadcrumbItems} />)
      const separators = container.querySelectorAll('[aria-hidden="true"]')
      // Should have 2 separators for 3 items
      expect(separators.length).toBeGreaterThanOrEqual(2)
    })

    it('renders custom separator', () => {
      render(<Breadcrumb items={breadcrumbItems} separator=">" />)
      expect(screen.getAllByText('>').length).toBeGreaterThan(0)
    })

    it('applies correct styling to last item', () => {
      render(<Breadcrumb items={breadcrumbItems} />)
      const lastItem = screen.getByText('John Doe')
      expect(lastItem).toHaveClass('text-neutral-900', 'font-medium')
    })
  })

  describe('SearchBar', () => {
    it('renders search input with placeholder', () => {
      render(<SearchBar placeholder="Search members..." />)
      const input = screen.getByPlaceholderText('Search members...')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'search')
    })

    it('calls onSearch when input changes', () => {
      const handleSearch = jest.fn()
      render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByRole('searchbox')
      fireEvent.change(input, { target: { value: 'test query' } })
      
      expect(handleSearch).toHaveBeenCalledWith('test query')
    })

    it('calls onSearch when form is submitted', () => {
      const handleSearch = jest.fn()
      const { container } = render(<SearchBar onSearch={handleSearch} />)
      
      const input = screen.getByRole('searchbox')
      const form = container.querySelector('form')
      
      fireEvent.change(input, { target: { value: 'submit test' } })
      fireEvent.submit(form!)
      
      expect(handleSearch).toHaveBeenCalledWith('submit test')
    })

    it('updates input value on change', () => {
      render(<SearchBar />)
      const input = screen.getByRole('searchbox') as HTMLInputElement
      
      fireEvent.change(input, { target: { value: 'new value' } })
      
      expect(input.value).toBe('new value')
    })

    it('has proper aria-label', () => {
      render(<SearchBar />)
      const input = screen.getByRole('searchbox')
      expect(input).toHaveAttribute('aria-label', 'Search')
    })
  })

  describe('NotificationBell', () => {
    it('renders notification bell button', () => {
      render(<NotificationBell />)
      const button = screen.getByRole('button', { name: /notifications/i })
      expect(button).toBeInTheDocument()
    })

    it('calls onClick when clicked', () => {
      const handleClick = jest.fn()
      render(<NotificationBell onClick={handleClick} />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not show badge when count is 0', () => {
      render(<NotificationBell count={0} />)
      const button = screen.getByRole('button')
      expect(button.querySelector('.bg-error-500')).not.toBeInTheDocument()
    })

    it('shows badge with count when count > 0', () => {
      render(<NotificationBell count={3} />)
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('shows "9+" when count > 9', () => {
      render(<NotificationBell count={15} />)
      expect(screen.getByText('9+')).toBeInTheDocument()
    })

    it('includes count in aria-label', () => {
      render(<NotificationBell count={5} />)
      const button = screen.getByRole('button', { name: /5 unread/i })
      expect(button).toBeInTheDocument()
    })

    it('shows animation on badge', () => {
      const { container } = render(<NotificationBell count={3} />)
      const animatedElement = container.querySelector('.animate-ping')
      expect(animatedElement).toBeInTheDocument()
    })
  })

  describe('UserProfile', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Administrator',
    }

    const mockMenuItems = [
      {
        label: 'Profile',
        icon: <User className="w-4 h-4" />,
        onClick: jest.fn(),
      },
      {
        label: 'Settings',
        icon: <Settings className="w-4 h-4" />,
        onClick: jest.fn(),
      },
      { divider: true },
      {
        label: 'Logout',
        icon: <LogOut className="w-4 h-4" />,
        onClick: jest.fn(),
      },
    ]

    beforeEach(() => {
      mockMenuItems.forEach(item => {
        if (item.onClick) {
          jest.clearAllMocks()
        }
      })
    })

    it('renders user profile button', () => {
      render(<UserProfile user={mockUser} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      expect(button).toBeInTheDocument()
    })

    it('displays user name', () => {
      render(<UserProfile user={mockUser} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('displays user role', () => {
      render(<UserProfile user={mockUser} />)
      expect(screen.getByText('Administrator')).toBeInTheDocument()
    })

    it('shows default avatar when no avatar provided', () => {
      const { container } = render(<UserProfile user={mockUser} />)
      const avatar = container.querySelector('.bg-primary-100')
      expect(avatar).toBeInTheDocument()
    })

    it('shows user avatar image when provided', () => {
      const userWithAvatar = { ...mockUser, avatar: 'https://example.com/avatar.jpg' }
      render(<UserProfile user={userWithAvatar} />)
      const img = screen.getByRole('img', { name: 'John Doe' })
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    })

    it('toggles dropdown menu on button click', async () => {
      render(<UserProfile user={mockUser} menuItems={mockMenuItems} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      // Menu should not be visible initially
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      
      // Click to open
      fireEvent.click(button)
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })
      
      // Click to close
      fireEvent.click(button)
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('displays menu items when dropdown is open', async () => {
      render(<UserProfile user={mockUser} menuItems={mockMenuItems} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument()
        expect(screen.getByText('Settings')).toBeInTheDocument()
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
    })

    it('calls onClick handler when menu item is clicked', async () => {
      render(<UserProfile user={mockUser} menuItems={mockMenuItems} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      fireEvent.click(button)
      
      await waitFor(() => {
        const profileItem = screen.getByText('Profile')
        fireEvent.click(profileItem)
      })
      
      expect(mockMenuItems[0].onClick).toHaveBeenCalledTimes(1)
    })

    it('closes dropdown after menu item click', async () => {
      render(<UserProfile user={mockUser} menuItems={mockMenuItems} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      fireEvent.click(button)
      
      await waitFor(() => {
        const profileItem = screen.getByText('Profile')
        fireEvent.click(profileItem)
      })
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('closes dropdown on escape key', async () => {
      render(<UserProfile user={mockUser} menuItems={mockMenuItems} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('closes dropdown when clicking outside', async () => {
      render(
        <div>
          <UserProfile user={mockUser} menuItems={mockMenuItems} />
          <div data-testid="outside">Outside</div>
        </div>
      )
      const button = screen.getByRole('button', { name: /user menu/i })
      
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })
      
      fireEvent.mouseDown(screen.getByTestId('outside'))
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })

    it('renders divider in menu', async () => {
      render(<UserProfile user={mockUser} menuItems={mockMenuItems} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      fireEvent.click(button)
      
      await waitFor(() => {
        const divider = screen.getByRole('separator')
        expect(divider).toBeInTheDocument()
      })
    })

    it('renders menu item with href as link', async () => {
      const itemsWithLink = [
        {
          label: 'Profile',
          href: '/profile',
          onClick: jest.fn(),
        },
      ]
      
      render(<UserProfile user={mockUser} menuItems={itemsWithLink} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      fireEvent.click(button)
      
      await waitFor(() => {
        const link = screen.getByRole('menuitem', { name: /profile/i })
        expect(link.tagName).toBe('A')
        expect(link).toHaveAttribute('href', '/profile')
      })
    })

    it('displays user email in dropdown header', async () => {
      render(<UserProfile user={mockUser} menuItems={mockMenuItems} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      fireEvent.click(button)
      
      await waitFor(() => {
        expect(screen.getByText('john@example.com')).toBeInTheDocument()
      })
    })

    it('rotates chevron icon when dropdown is open', async () => {
      const { container } = render(<UserProfile user={mockUser} menuItems={mockMenuItems} />)
      const button = screen.getByRole('button', { name: /user menu/i })
      
      const chevron = container.querySelector('.rotate-180')
      expect(chevron).not.toBeInTheDocument()
      
      fireEvent.click(button)
      
      await waitFor(() => {
        const rotatedChevron = container.querySelector('.rotate-180')
        expect(rotatedChevron).toBeInTheDocument()
      })
    })
  })

  describe('HeaderProvider', () => {
    it('provides context to children', () => {
      const TestComponent = () => {
        return (
          <HeaderProvider>
            <Header>
              <HeaderLeft>
                <span>Test</span>
              </HeaderLeft>
            </Header>
          </HeaderProvider>
        )
      }
      
      expect(() => render(<TestComponent />)).not.toThrow()
    })
  })

  describe('Integration', () => {
    it('renders complete header with all components', () => {
      const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Members' },
      ]

      const user = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'Admin',
      }

      render(
        <ThemeProvider defaultTheme="light">
          <HeaderProvider>
            <Header>
              <HeaderLeft>
                <Breadcrumb items={breadcrumbItems} />
              </HeaderLeft>
              <HeaderRight>
                <SearchBar placeholder="Search..." />
                <NotificationBell count={5} />
                <UserProfile user={user} />
              </HeaderRight>
            </Header>
          </HeaderProvider>
        </ThemeProvider>
      )

      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Members')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('Test User')).toBeInTheDocument()
    })
  })
})
