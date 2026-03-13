# Sidebar Navigation Component

## Overview

The Sidebar component provides a comprehensive navigation system for the Church Management System with support for desktop and mobile layouts, nested navigation, collapsible groups, and full accessibility features.

## Components

### SidebarProvider
Context provider that manages sidebar state (open/closed) and mobile detection.

**Props:**
- `children`: React.ReactNode - Child components
- `defaultOpen?`: boolean - Initial open state (default: true)
- `onOpenChange?`: (open: boolean) => void - Callback when state changes

### Sidebar
Main sidebar container with fixed positioning and responsive behavior.

**Props:**
- `children`: React.ReactNode - Sidebar content
- `className?`: string - Additional CSS classes

**Features:**
- Fixed positioning on desktop (256px width)
- Slide-in overlay on mobile
- Smooth animations (300ms ease-in-out)
- Escape key to close on mobile
- Body scroll prevention when open on mobile

### SidebarHeader
Header section for logo/branding with optional close button.

**Props:**
- `children`: React.ReactNode - Header content
- `showCloseButton?`: boolean - Show close button on mobile (default: true)
- `className?`: string - Additional CSS classes

### SidebarContent
Scrollable content area for navigation items.

**Props:**
- `children`: React.ReactNode - Navigation items
- `className?`: string - Additional CSS classes

### SidebarFooter
Footer section for user profile or logout button.

**Props:**
- `children`: React.ReactNode - Footer content
- `className?`: string - Additional CSS classes

### SidebarItem
Individual navigation item with icon, text, and optional badge.

**Props:**
- `href`: string - Link destination
- `icon?`: React.ReactNode - Icon component
- `children`: React.ReactNode - Item text
- `badge?`: React.ReactNode - Badge component
- `active?`: boolean - Active state highlighting
- `disabled?`: boolean - Disabled state
- `onClick?`: () => void - Click handler

**Features:**
- Active state with primary color background and left border
- Hover effects
- Icon support (left side)
- Badge support (right side)
- Keyboard navigation with focus styles
- Auto-close sidebar on mobile when clicked

### SidebarGroup
Group of navigation items with optional label and collapsible behavior.

**Props:**
- `label?`: string - Group label
- `children`: React.ReactNode - Group items
- `collapsible?`: boolean - Enable collapse/expand (default: false)
- `defaultOpen?`: boolean - Initial open state (default: true)
- `className?`: string - Additional CSS classes

**Features:**
- Optional uppercase label
- Collapsible with chevron icon
- Smooth expand/collapse animation

### SidebarNestedItem
Nested navigation item with automatic indentation.

**Props:**
- Same as SidebarItem
- `level?`: number - Nesting level for indentation (default: 1)

**Features:**
- Automatic indentation based on level (12px per level)
- Inherits all SidebarItem features

### SidebarToggle
Button to open sidebar on mobile.

**Props:**
- `icon?`: React.ReactNode - Custom icon
- `className?`: string - Additional CSS classes

**Features:**
- Hidden on desktop (lg breakpoint)
- Default hamburger menu icon
- Opens sidebar when clicked

### useSidebar Hook
Access sidebar context from any component.

**Returns:**
- `isOpen`: boolean - Current open state
- `setIsOpen`: (open: boolean) => void - Update open state
- `isMobile`: boolean - Mobile viewport detection

## Design Specifications

### Desktop Layout (≥1024px)
- Fixed sidebar: 256px width
- Main content: margin-left 256px
- Always visible
- No overlay

### Mobile Layout (<1024px)
- Slide-in sidebar from left
- Full-screen overlay (black 50% opacity)
- Hidden by default
- Closes on overlay click or Escape key
- Prevents body scroll when open

### Colors
- Background: white
- Border: neutral-200
- Active item: primary-50 background, primary-700 text, primary-600 left border
- Hover: neutral-100 background
- Text: neutral-700 (default), neutral-900 (hover)

### Spacing
- Sidebar padding: 12px (px-3)
- Item padding: 12px horizontal, 8px vertical
- Item gap: 12px (gap-3)
- Group spacing: 4px (space-y-1)

### Typography
- Item text: text-sm (14px), font-medium
- Group label: text-xs (12px), font-semibold, uppercase

### Animations
- Sidebar slide: 300ms ease-in-out
- Overlay fade: 300ms
- Hover transitions: 200ms

## Accessibility

### ARIA Attributes
- Sidebar: `role="navigation"`, `aria-label="Main navigation"`
- Active item: `aria-current="page"`
- Collapsible group: `aria-expanded="true|false"`
- Icons: `aria-hidden="true"`
- Close button: `aria-label="Close sidebar"`
- Toggle button: `aria-label="Open sidebar"`

### Keyboard Navigation
- Tab: Navigate between items
- Enter/Space: Activate item
- Escape: Close sidebar (mobile)
- Focus visible: 2px primary-500 ring with offset

### Screen Readers
- Proper semantic HTML (aside, nav, a)
- ARIA landmarks for navigation
- Active page announcement
- Collapsible state announcement

## Usage Examples

### Basic Sidebar
```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <Logo />
    </SidebarHeader>
    
    <SidebarContent>
      <SidebarItem href="/dashboard" icon={<Home />} active>
        Dashboard
      </SidebarItem>
      <SidebarItem href="/members" icon={<Users />}>
        Members
      </SidebarItem>
    </SidebarContent>
    
    <SidebarFooter>
      <SidebarItem href="/logout" icon={<LogOut />}>
        Logout
      </SidebarItem>
    </SidebarFooter>
  </Sidebar>
  
  <main className="lg:ml-64">
    <SidebarToggle />
    {/* Page content */}
  </main>
</SidebarProvider>
```

### Grouped Navigation
```tsx
<SidebarContent>
  <SidebarGroup label="Main">
    <SidebarItem href="/dashboard" icon={<Home />}>
      Dashboard
    </SidebarItem>
  </SidebarGroup>
  
  <SidebarGroup label="People">
    <SidebarItem href="/members" icon={<Users />}>
      Members
    </SidebarItem>
    <SidebarItem href="/groups" icon={<UsersRound />}>
      Small Groups
    </SidebarItem>
  </SidebarGroup>
</SidebarContent>
```

### Collapsible Groups with Nested Items
```tsx
<SidebarContent>
  <SidebarGroup label="Finance" collapsible defaultOpen={true}>
    <SidebarNestedItem href="/finance/overview">
      Overview
    </SidebarNestedItem>
    <SidebarNestedItem href="/finance/offerings">
      Offerings
    </SidebarNestedItem>
    <SidebarNestedItem href="/finance/expenses">
      Expenses
    </SidebarNestedItem>
  </SidebarGroup>
</SidebarContent>
```

### With Badges
```tsx
<SidebarItem 
  href="/events" 
  icon={<Calendar />}
  badge={<Badge variant="primary" size="sm">3</Badge>}
>
  Events
</SidebarItem>
```

### Controlled State
```tsx
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <SidebarProvider 
      defaultOpen={sidebarOpen}
      onOpenChange={setSidebarOpen}
    >
      {/* Sidebar content */}
    </SidebarProvider>
  )
}
```

## Testing

### Unit Tests
- ✅ SidebarProvider renders and provides context
- ✅ Sidebar renders with correct ARIA attributes
- ✅ SidebarHeader, Content, Footer render children
- ✅ SidebarItem renders with icon, text, and badge
- ✅ Active state applies correct styles
- ✅ Click handlers work correctly
- ✅ Disabled state prevents interaction
- ✅ SidebarGroup renders with label
- ✅ Collapsible groups toggle visibility
- ✅ SidebarNestedItem renders with indentation
- ✅ SidebarToggle opens sidebar
- ✅ Keyboard navigation works
- ✅ Accessibility attributes are correct

### Integration Tests
See `sidebar.example.tsx` for complete working examples.

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support with touch gestures

## Performance

- Minimal re-renders with React context
- CSS transitions for smooth animations
- No external dependencies beyond lucide-react
- Lightweight bundle size

## Related Components

- Button: Used for toggle button
- Badge: Used for notification badges
- Icon: Used for navigation icons

## Design Reference

See `.kiro/specs/modern-ui-ux-redesign/design.md` - Sidebar Navigation System section
