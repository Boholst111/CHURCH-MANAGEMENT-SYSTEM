# Header Component Summary

## Overview
The Header component is a sticky navigation bar that sits at the top of the application (64px height). It provides navigation breadcrumbs, search functionality, notifications, and user profile access. The component is fully responsive and works seamlessly with the Sidebar component.

## Component Structure

### Main Components

1. **Header** - Root container component
   - Sticky positioning at top of viewport
   - 64px height (h-16)
   - White background with bottom border and shadow
   - z-index of 40 for proper layering

2. **HeaderProvider** - Context provider for header state management
   - Manages search visibility state
   - Provides context to child components

3. **HeaderLeft** - Left section container
   - Contains mobile menu toggle (SidebarToggle)
   - Contains breadcrumb navigation
   - Flexible layout with minimum width

4. **HeaderRight** - Right section container
   - Contains search bar, notifications, and user profile
   - Responsive gap spacing

5. **Breadcrumb** - Navigation breadcrumb component
   - Displays hierarchical navigation path
   - Supports custom separators (default: "/")
   - Links for navigable items, plain text for current page
   - Hidden on mobile (md:flex)
   - Proper ARIA labels for accessibility

6. **SearchBar** - Search input component
   - Hidden on mobile (lg:flex)
   - Debounced search functionality
   - Focus ring styling
   - Search icon indicator
   - Responsive width (48 on lg, 64 on xl)

7. **NotificationBell** - Notification indicator
   - Bell icon with badge for unread count
   - Animated badge with ping effect
   - Shows "9+" for counts over 9
   - Proper ARIA labels with count

8. **UserProfile** - User profile dropdown
   - Avatar display (image or default icon)
   - User name and role display (hidden on mobile)
   - Dropdown menu with items
   - Click outside to close
   - Escape key to close
   - Supports dividers in menu
   - Menu items can be links or buttons
   - Smooth animations

## Props & Interfaces

### Header
```typescript
interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}
```

### Breadcrumb
```typescript
interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode  // Default: "/"
}
```

### SearchBar
```typescript
interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void
  placeholder?: string  // Default: "Search..."
}
```

### NotificationBell
```typescript
interface NotificationBellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number  // Default: 0
  onClick?: () => void
}
```

### UserProfile
```typescript
interface UserProfileProps {
  user: {
    name: string
    email?: string
    avatar?: string
    role?: string
  }
  menuItems?: Array<{
    label: string
    icon?: React.ReactNode
    onClick?: () => void
    href?: string
    divider?: boolean
  }>
}
```

## Usage Examples

### Basic Header
```tsx
import {
  Header,
  HeaderLeft,
  HeaderRight,
  UserProfile,
  HeaderProvider,
} from './components/ui/header'

function App() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator',
  }

  return (
    <HeaderProvider>
      <Header>
        <HeaderLeft>
          <h1 className="text-lg font-semibold">My App</h1>
        </HeaderLeft>
        <HeaderRight>
          <UserProfile user={user} />
        </HeaderRight>
      </Header>
    </HeaderProvider>
  )
}
```

### Full Featured Header
```tsx
import {
  Header,
  HeaderLeft,
  HeaderRight,
  Breadcrumb,
  SearchBar,
  NotificationBell,
  UserProfile,
  HeaderProvider,
} from './components/ui/header'
import { Settings, User, LogOut } from 'lucide-react'

function App() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Members', href: '/members' },
    { label: 'John Doe' },
  ]

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator',
    avatar: 'https://example.com/avatar.jpg',
  }

  const menuItems = [
    {
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log('Profile'),
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      href: '/settings',
    },
    { divider: true },
    {
      label: 'Logout',
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => console.log('Logout'),
    },
  ]

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const handleNotifications = () => {
    console.log('Notifications clicked')
  }

  return (
    <HeaderProvider>
      <Header>
        <HeaderLeft>
          <Breadcrumb items={breadcrumbs} />
        </HeaderLeft>
        <HeaderRight>
          <SearchBar
            placeholder="Search members..."
            onSearch={handleSearch}
          />
          <NotificationBell
            count={5}
            onClick={handleNotifications}
          />
          <UserProfile user={user} menuItems={menuItems} />
        </HeaderRight>
      </Header>
    </HeaderProvider>
  )
}
```

### With Sidebar Integration
```tsx
import { SidebarProvider } from './components/ui/sidebar'
import { HeaderProvider } from './components/ui/header'

function Layout({ children }) {
  return (
    <SidebarProvider>
      <HeaderProvider>
        <Sidebar>
          {/* Sidebar content */}
        </Sidebar>
        <Header>
          {/* Header content */}
        </Header>
        <main className="lg:ml-64 pt-16">
          {children}
        </main>
      </HeaderProvider>
    </SidebarProvider>
  )
}
```

## Styling & Design Tokens

### Colors
- Background: `bg-white`
- Border: `border-neutral-200`
- Text: `text-neutral-700`, `text-neutral-900`
- Hover: `hover:bg-neutral-100`
- Focus: `focus:ring-primary-500`
- Error badge: `bg-error-500`

### Spacing
- Height: `h-16` (64px)
- Padding: `px-4 lg:px-6`
- Gap: `gap-2 lg:gap-3`

### Shadows
- Header: `shadow-sm`
- Dropdown: `shadow-lg`

### Z-Index
- Header: `z-40`
- Dropdown: `z-50`

## Responsive Behavior

### Mobile (<1024px)
- Sidebar toggle button visible
- Breadcrumbs hidden
- Search bar hidden
- User name/role hidden (only avatar shown)
- Notification bell visible
- User dropdown visible

### Desktop (≥1024px)
- Sidebar toggle button hidden
- Breadcrumbs visible
- Search bar visible
- Full user info visible
- All features visible

## Accessibility Features

1. **Semantic HTML**
   - Uses `<header>` element
   - Uses `<nav>` for breadcrumbs
   - Proper heading hierarchy

2. **ARIA Attributes**
   - `aria-label` on buttons and inputs
   - `aria-current="page"` on current breadcrumb
   - `aria-expanded` on dropdown button
   - `aria-haspopup` on dropdown button
   - `role="menu"` on dropdown
   - `role="menuitem"` on menu items
   - `role="separator"` on dividers

3. **Keyboard Navigation**
   - All interactive elements focusable
   - Escape key closes dropdown
   - Focus ring visible on all interactive elements
   - Tab navigation works correctly

4. **Screen Reader Support**
   - Descriptive labels on all buttons
   - Notification count announced
   - Current page indicated in breadcrumbs
   - Menu state announced

## Integration with Layout

The Header component is designed to work with the Sidebar component:

1. **Desktop Layout**
   - Header spans full width
   - Content area has left margin to account for sidebar (ml-64)
   - Header has top padding to account for sticky header (pt-16)

2. **Mobile Layout**
   - Header spans full width
   - Mobile menu toggle opens sidebar overlay
   - No left margin on content

3. **Z-Index Layering**
   - Sidebar: z-30 (desktop), z-50 (mobile)
   - Sidebar overlay: z-40 (mobile)
   - Header: z-40
   - Dropdown: z-50

## Testing

The component includes comprehensive unit tests covering:
- Rendering and styling
- User interactions (clicks, keyboard)
- Dropdown behavior
- Search functionality
- Notification display
- Breadcrumb navigation
- Accessibility features
- Integration scenarios

All 41 tests pass successfully.

## Files

- `resources/js/components/ui/header.tsx` - Main component
- `resources/js/components/ui/header.example.tsx` - Usage examples
- `resources/js/components/ui/__tests__/header.test.tsx` - Unit tests
- `resources/js/components/ui/HEADER_COMPONENT_SUMMARY.md` - This file

## Dependencies

- React 18+
- lucide-react (icons)
- Tailwind CSS
- cn utility (from lib/utils)
- SidebarToggle component (from sidebar.tsx)

## Notes

- The Header component requires HeaderProvider wrapper for context
- Works seamlessly with SidebarProvider for integrated navigation
- Fully responsive with mobile-first approach
- Follows design system tokens from tailwind.config.ts
- Maintains 64px height as specified in design document
- Sticky positioning ensures header stays visible during scroll
