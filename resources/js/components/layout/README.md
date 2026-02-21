# Layout Components

This directory contains the main layout components for the Church Management System.

## Components

### Layout (`Layout.tsx`)
The main layout wrapper that provides the overall structure for the application.

**Features:**
- Responsive sidebar navigation (fixed on desktop, overlay on mobile)
- Top header with user menu
- Main content area with proper spacing
- Mobile-friendly with hamburger menu

**Usage:**
```tsx
import Layout from './components/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

### Sidebar (`Sidebar.tsx`)
The navigation sidebar component with links to all major pages.

**Features:**
- Navigation links with icons
- Active menu item highlighting
- Responsive design (fixed on desktop, overlay on mobile)
- Church branding in header and footer

**Navigation Items:**
- Dashboard
- Members
- Leadership
- Small Groups
- Events
- Finance
- Reports
- Settings

**Active State:**
The sidebar automatically highlights the current page based on the URL path. It uses `useLocation()` from React Router to determine the active route.

### Header (`Header.tsx`)
The top header component with user menu and mobile controls.

**Features:**
- Mobile menu button (hamburger icon)
- User avatar with dropdown menu
- User name and role display
- Dropdown menu with:
  - My Profile
  - Settings
  - Logout

**User Menu:**
The user menu is a dropdown that appears when clicking the user avatar. It automatically closes when clicking outside.

## Responsive Design

### Desktop (≥1024px)
- Fixed sidebar on the left (64 units wide)
- Content area with left padding to accommodate sidebar
- Header spans full width
- User menu shows full user info

### Tablet (768px - 1023px)
- Same as desktop layout
- Sidebar remains fixed

### Mobile (<768px)
- Sidebar hidden by default
- Hamburger menu button in header
- Sidebar appears as overlay when opened
- Backdrop closes sidebar when clicked
- Close button (X) in sidebar overlay

## Styling

The layout uses the church design system with:
- **Primary Color:** Soft blue (#3b82f6)
- **Background:** White and light gray
- **Typography:** Inter/Roboto font family
- **Spacing:** Consistent padding and margins
- **Border Radius:** Rounded corners on interactive elements

## Active Menu Highlighting

The sidebar implements active menu highlighting using the following logic:

1. For the dashboard (`/`), only exact match is highlighted
2. For other routes, any path starting with the route is highlighted
3. This allows nested routes to keep their parent highlighted (e.g., `/members/123` highlights "Members")

**Implementation:**
```tsx
const isActive = (href: string) => {
  if (href === '/') {
    return location.pathname === '/';
  }
  return location.pathname.startsWith(href);
};
```

## Testing

The layout components include comprehensive tests:

- **Layout.test.tsx:** Basic rendering and navigation tests
- **Sidebar.test.tsx:** Active menu highlighting tests
- **Header.test.tsx:** User menu interaction tests
- **Layout.responsive.test.tsx:** Responsive design tests

Run tests with:
```bash
npm test
```

## Requirements Validation

This implementation satisfies the following requirements:

- **7.1:** Sidebar navigation layout with links to all major pages ✓
- **7.7:** Active menu item highlighting ✓
- **7.8:** Responsive design for desktop, tablet, and mobile ✓

## Future Enhancements

Potential improvements for future iterations:

1. Breadcrumb navigation in header
2. Search functionality in header
3. Notifications dropdown
4. Collapsible sidebar on desktop
5. Keyboard navigation support
6. Dark mode support
