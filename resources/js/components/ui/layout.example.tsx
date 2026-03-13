import * as React from "react"
import {
  Layout,
  LayoutSidebar,
  LayoutHeader,
  LayoutContent,
  LayoutPage,
  LayoutPageHeader,
  LayoutPageContent,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarGroup,
  HeaderLeft,
  HeaderRight,
  Breadcrumb,
  SearchBar,
  NotificationBell,
  UserProfile,
} from "./layout"
import {
  Home,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  User,
  Bell,
} from "lucide-react"
import { Button } from "./button"

/**
 * Layout Example
 * 
 * Demonstrates the complete Layout system with:
 * - Responsive sidebar (fixed on desktop, overlay on mobile)
 * - Sticky header with breadcrumbs and user profile
 * - Content area with proper margins
 * - Sidebar state management
 * - Proper z-index layering
 */

export function LayoutExample() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@church.com",
    role: "Administrator",
    avatar: undefined, // Will use default icon
  }

  // Mock user menu items
  const userMenuItems = [
    {
      label: "Profile",
      icon: <User className="w-4 h-4" />,
      onClick: () => console.log("Profile clicked"),
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      onClick: () => console.log("Settings clicked"),
    },
    { divider: true },
    {
      label: "Logout",
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => console.log("Logout clicked"),
    },
  ]

  // Mock breadcrumb items
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Members", href: "/members" },
    { label: "John Doe" },
  ]

  return (
    <Layout
      sidebarDefaultOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    >
      {/* Sidebar */}
      <LayoutSidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-neutral-900 text-sm">
                Church Manager
              </span>
              <span className="text-xs text-neutral-500">MFMC</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarItem
              href="/dashboard"
              icon={<Home className="w-5 h-5" />}
              active
            >
              Dashboard
            </SidebarItem>
            <SidebarItem href="/members" icon={<Users className="w-5 h-5" />}>
              Members
            </SidebarItem>
            <SidebarItem href="/events" icon={<Calendar className="w-5 h-5" />}>
              Events
            </SidebarItem>
            <SidebarItem
              href="/finance"
              icon={<DollarSign className="w-5 h-5" />}
            >
              Finance
            </SidebarItem>
            <SidebarItem href="/reports" icon={<FileText className="w-5 h-5" />}>
              Reports
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup label="Administration" collapsible defaultOpen={false}>
            <SidebarItem
              href="/settings"
              icon={<Settings className="w-5 h-5" />}
            >
              Settings
            </SidebarItem>
            <SidebarItem href="/users" icon={<Users className="w-5 h-5" />}>
              Users
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="text-xs text-neutral-500 text-center">
            © 2024 Church Manager
          </div>
        </SidebarFooter>
      </LayoutSidebar>

      {/* Header */}
      <LayoutHeader>
        <HeaderLeft>
          <Breadcrumb items={breadcrumbItems} />
        </HeaderLeft>

        <HeaderRight>
          <SearchBar
            placeholder="Search..."
            onSearch={(query) => console.log("Search:", query)}
          />
          <NotificationBell
            count={3}
            onClick={() => console.log("Notifications clicked")}
          />
          <UserProfile user={user} menuItems={userMenuItems} />
        </HeaderRight>
      </LayoutHeader>

      {/* Main Content */}
      <LayoutContent padding="lg" maxWidth="7xl">
        <LayoutPage>
          <LayoutPageHeader
            title="Dashboard"
            subtitle="Welcome back! Here's what's happening today."
            actions={
              <>
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="primary" size="sm">
                  Add New
                </Button>
              </>
            }
          />

          <LayoutPageContent>
            {/* Page content goes here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Card {i}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-2">
                    This is a sample card demonstrating the layout system.
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Content Section
              </h2>
              <p className="text-neutral-700">
                This demonstrates the main content area with proper margins and
                spacing. The sidebar is fixed on desktop (≥1024px) with 16rem
                width, and the content has a matching left margin. On mobile
                (&lt;1024px), the sidebar becomes an overlay that can be toggled.
              </p>
              <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">
                  Layout Features:
                </h3>
                <ul className="list-disc list-inside text-sm text-primary-800 space-y-1">
                  <li>Desktop (≥1024px): Fixed sidebar with 16rem width</li>
                  <li>Mobile (&lt;1024px): Collapsible sidebar with overlay</li>
                  <li>Sticky header at z-40</li>
                  <li>Sidebar at z-30 (desktop) / z-50 (mobile)</li>
                  <li>Overlay at z-40 (mobile only)</li>
                  <li>Responsive content padding and max-width</li>
                </ul>
              </div>
            </div>
          </LayoutPageContent>
        </LayoutPage>
      </LayoutContent>
    </Layout>
  )
}

/**
 * Minimal Layout Example
 * 
 * Shows the simplest possible layout setup
 */
export function MinimalLayoutExample() {
  return (
    <Layout>
      <LayoutSidebar>
        <SidebarHeader>
          <span className="font-bold">My App</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem href="/" icon={<Home className="w-5 h-5" />} active>
            Home
          </SidebarItem>
          <SidebarItem href="/settings" icon={<Settings className="w-5 h-5" />}>
            Settings
          </SidebarItem>
        </SidebarContent>
      </LayoutSidebar>

      <LayoutHeader>
        <HeaderLeft>
          <h1 className="text-lg font-semibold">My Page</h1>
        </HeaderLeft>
        <HeaderRight>
          <UserProfile
            user={{ name: "User", email: "user@example.com" }}
            menuItems={[
              {
                label: "Logout",
                icon: <LogOut className="w-4 h-4" />,
                onClick: () => console.log("Logout"),
              },
            ]}
          />
        </HeaderRight>
      </LayoutHeader>

      <LayoutContent>
        <h1 className="text-2xl font-bold">Welcome!</h1>
        <p className="mt-4">This is a minimal layout example.</p>
      </LayoutContent>
    </Layout>
  )
}

/**
 * Custom Padding and Max Width Example
 * 
 * Demonstrates different content padding and max-width options
 */
export function CustomContentExample() {
  return (
    <Layout>
      <LayoutSidebar>
        <SidebarHeader>
          <span className="font-bold">My App</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem href="/" icon={<Home className="w-5 h-5" />}>
            Home
          </SidebarItem>
        </SidebarContent>
      </LayoutSidebar>

      <LayoutHeader>
        <HeaderLeft>
          <h1 className="text-lg font-semibold">Custom Content</h1>
        </HeaderLeft>
      </LayoutHeader>

      {/* Small padding with 5xl max width */}
      <LayoutContent padding="sm" maxWidth="5xl">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h2 className="text-xl font-bold mb-2">Small Padding + 5xl Width</h2>
          <p className="text-neutral-600">
            This content has small padding (1rem) and a max width of 64rem.
          </p>
        </div>
      </LayoutContent>
    </Layout>
  )
}

export default LayoutExample
