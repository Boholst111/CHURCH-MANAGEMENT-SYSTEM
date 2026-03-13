import * as React from "react"
import {
  Home,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  UserCircle,
  UsersRound,
  Crown,
  Activity,
  ChevronDown,
} from "lucide-react"
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
} from "./sidebar"
import { Badge } from "./badge"

/**
 * Example 1: Basic Sidebar with Navigation Items
 */
export function BasicSidebarExample() {
  const [activePage, setActivePage] = React.useState("dashboard")

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">Church Manager</h2>
                <p className="text-xs text-neutral-500">MFMC</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarItem
              href="#"
              icon={<Home className="w-5 h-5" />}
              active={activePage === "dashboard"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("dashboard")
              }}
            >
              Dashboard
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={<Users className="w-5 h-5" />}
              active={activePage === "members"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("members")
              }}
            >
              Members
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={<Calendar className="w-5 h-5" />}
              active={activePage === "events"}
              badge={<Badge variant="primary" size="sm">3</Badge>}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("events")
              }}
            >
              Events
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={<DollarSign className="w-5 h-5" />}
              active={activePage === "finance"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("finance")
              }}
            >
              Finance
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={<FileText className="w-5 h-5" />}
              active={activePage === "reports"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("reports")
              }}
            >
              Reports
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={<Settings className="w-5 h-5" />}
              active={activePage === "settings"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("settings")
              }}
            >
              Settings
            </SidebarItem>
          </SidebarContent>

          <SidebarFooter>
            <SidebarItem
              href="#"
              icon={<LogOut className="w-5 h-5" />}
              onClick={(e) => {
                e.preventDefault()
                console.log("Logout clicked")
              }}
            >
              Logout
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8 bg-neutral-50">
          <div className="mb-4">
            <SidebarToggle />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>
          <p className="text-neutral-600">
            This is the main content area. The sidebar is responsive and will collapse on mobile.
          </p>
        </main>
      </div>
    </SidebarProvider>
  )
}

/**
 * Example 2: Sidebar with Grouped Navigation
 */
export function GroupedSidebarExample() {
  const [activePage, setActivePage] = React.useState("dashboard")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">Church Manager</h2>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup label="Main">
              <SidebarItem
                href="#"
                icon={<Home className="w-5 h-5" />}
                active={activePage === "dashboard"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("dashboard")
                }}
              >
                Dashboard
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={<Activity className="w-5 h-5" />}
                active={activePage === "activity"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("activity")
                }}
              >
                Activity Log
              </SidebarItem>
            </SidebarGroup>

            <SidebarGroup label="People">
              <SidebarItem
                href="#"
                icon={<Users className="w-5 h-5" />}
                active={activePage === "members"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("members")
                }}
              >
                Members
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={<UsersRound className="w-5 h-5" />}
                active={activePage === "groups"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("groups")
                }}
              >
                Small Groups
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={<Crown className="w-5 h-5" />}
                active={activePage === "leadership"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("leadership")
                }}
              >
                Leadership
              </SidebarItem>
            </SidebarGroup>

            <SidebarGroup label="Management">
              <SidebarItem
                href="#"
                icon={<Calendar className="w-5 h-5" />}
                active={activePage === "events"}
                badge={<Badge variant="primary" size="sm">3</Badge>}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("events")
                }}
              >
                Events
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={<DollarSign className="w-5 h-5" />}
                active={activePage === "finance"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("finance")
                }}
              >
                Finance
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={<FileText className="w-5 h-5" />}
                active={activePage === "reports"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("reports")
                }}
              >
                Reports
              </SidebarItem>
            </SidebarGroup>

            <SidebarGroup label="System">
              <SidebarItem
                href="#"
                icon={<UserCircle className="w-5 h-5" />}
                active={activePage === "users"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("users")
                }}
              >
                Users
              </SidebarItem>

              <SidebarItem
                href="#"
                icon={<Settings className="w-5 h-5" />}
                active={activePage === "settings"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("settings")
                }}
              >
                Settings
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-neutral-100">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">John Doe</p>
                <p className="text-xs text-neutral-500 truncate">Admin</p>
              </div>
              <button className="p-1 hover:bg-neutral-200 rounded">
                <ChevronDown className="w-4 h-4 text-neutral-600" />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8 bg-neutral-50">
          <div className="mb-4">
            <SidebarToggle />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </h1>
          <p className="text-neutral-600">
            This example shows grouped navigation items with labels.
          </p>
        </main>
      </div>
    </SidebarProvider>
  )
}

/**
 * Example 3: Sidebar with Nested Navigation Items
 */
export function NestedSidebarExample() {
  const [activePage, setActivePage] = React.useState("dashboard")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">Church Manager</h2>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarItem
              href="#"
              icon={<Home className="w-5 h-5" />}
              active={activePage === "dashboard"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("dashboard")
              }}
            >
              Dashboard
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={<Users className="w-5 h-5" />}
              active={activePage === "members"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("members")
              }}
            >
              Members
            </SidebarItem>

            <SidebarGroup label="Finance" collapsible defaultOpen={true}>
              <SidebarNestedItem
                href="#"
                active={activePage === "finance-overview"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("finance-overview")
                }}
              >
                Overview
              </SidebarNestedItem>

              <SidebarNestedItem
                href="#"
                active={activePage === "finance-offerings"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("finance-offerings")
                }}
              >
                Offerings
              </SidebarNestedItem>

              <SidebarNestedItem
                href="#"
                active={activePage === "finance-expenses"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("finance-expenses")
                }}
              >
                Expenses
              </SidebarNestedItem>

              <SidebarNestedItem
                href="#"
                active={activePage === "finance-budgets"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("finance-budgets")
                }}
              >
                Budgets
              </SidebarNestedItem>
            </SidebarGroup>

            <SidebarGroup label="Reports" collapsible defaultOpen={false}>
              <SidebarNestedItem
                href="#"
                active={activePage === "reports-financial"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("reports-financial")
                }}
              >
                Financial Reports
              </SidebarNestedItem>

              <SidebarNestedItem
                href="#"
                active={activePage === "reports-membership"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("reports-membership")
                }}
              >
                Membership Reports
              </SidebarNestedItem>

              <SidebarNestedItem
                href="#"
                active={activePage === "reports-ministry"}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("reports-ministry")
                }}
              >
                Ministry Reports
              </SidebarNestedItem>
            </SidebarGroup>

            <SidebarItem
              href="#"
              icon={<Settings className="w-5 h-5" />}
              active={activePage === "settings"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("settings")
              }}
            >
              Settings
            </SidebarItem>
          </SidebarContent>

          <SidebarFooter>
            <SidebarItem
              href="#"
              icon={<LogOut className="w-5 h-5" />}
              onClick={(e) => {
                e.preventDefault()
                console.log("Logout clicked")
              }}
            >
              Logout
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8 bg-neutral-50">
          <div className="mb-4">
            <SidebarToggle />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1).replace(/-/g, ' ')}
          </h1>
          <p className="text-neutral-600">
            This example shows nested navigation items with collapsible groups.
          </p>
        </main>
      </div>
    </SidebarProvider>
  )
}

/**
 * Example 4: Controlled Sidebar State
 */
export function ControlledSidebarExample() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [activePage, setActivePage] = React.useState("dashboard")

  return (
    <SidebarProvider 
      defaultOpen={sidebarOpen}
      onOpenChange={setSidebarOpen}
    >
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">Church Manager</h2>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarItem
              href="#"
              icon={<Home className="w-5 h-5" />}
              active={activePage === "dashboard"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("dashboard")
              }}
            >
              Dashboard
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={<Users className="w-5 h-5" />}
              active={activePage === "members"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("members")
              }}
            >
              Members
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={<Settings className="w-5 h-5" />}
              active={activePage === "settings"}
              onClick={(e) => {
                e.preventDefault()
                setActivePage("settings")
              }}
            >
              Settings
            </SidebarItem>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8 bg-neutral-50">
          <div className="mb-4 flex items-center gap-4">
            <SidebarToggle />
            <p className="text-sm text-neutral-600">
              Sidebar is {sidebarOpen ? "open" : "closed"}
            </p>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Controlled Sidebar Example
          </h1>
          <p className="text-neutral-600">
            This example demonstrates controlled sidebar state with external state management.
          </p>
        </main>
      </div>
    </SidebarProvider>
  )
}
