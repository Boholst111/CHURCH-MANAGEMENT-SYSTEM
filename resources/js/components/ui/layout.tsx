import * as React from "react"
import { cn } from "../../lib/utils"
import { SidebarProvider, Sidebar, useSidebar } from "./sidebar"
import { HeaderProvider, Header } from "./header"
import { SkipToMain } from "./skip-to-main"
import { KeyboardShortcutsDialog } from "./keyboard-shortcuts-dialog"
import { OfflineIndicator } from "./offline-indicator"

/**
 * Layout Component
 * 
 * Main layout wrapper that combines Sidebar and Header components.
 * Handles responsive behavior, proper spacing, and z-index layering.
 * 
 * Layout Structure:
 * - Desktop (≥1024px): Fixed sidebar (256px width), sticky header, content with left margin
 * - Mobile (<1024px): Overlay sidebar, sticky header, full-width content
 * 
 * Z-Index Layering:
 * - Sidebar: z-30 (desktop), z-50 (mobile)
 * - Overlay: z-40 (mobile only)
 * - Header: z-40
 * - Dropdown: z-50
 */

// Layout Root Component
interface LayoutProps {
  children: React.ReactNode
  className?: string
  sidebarDefaultOpen?: boolean
  onSidebarOpenChange?: (open: boolean) => void
}

export function Layout({
  children,
  className,
  sidebarDefaultOpen = true,
  onSidebarOpenChange,
}: LayoutProps) {
  return (
    <SidebarProvider
      defaultOpen={sidebarDefaultOpen}
      onOpenChange={onSidebarOpenChange}
    >
      <HeaderProvider>
        <SkipToMain />
        <KeyboardShortcutsDialog />
        <OfflineIndicator />
        <div className={cn("min-h-screen bg-neutral-50", className)}>
          {children}
        </div>
      </HeaderProvider>
    </SidebarProvider>
  )
}

// Layout Sidebar Component (wrapper for Sidebar)
interface LayoutSidebarProps {
  children: React.ReactNode
  className?: string
}

export function LayoutSidebar({ children, className }: LayoutSidebarProps) {
  return (
    <Sidebar className={className}>
      {children}
    </Sidebar>
  )
}

// Layout Header Component (wrapper for Header)
interface LayoutHeaderProps {
  children: React.ReactNode
  className?: string
}

export function LayoutHeader({ children, className }: LayoutHeaderProps) {
  return (
    <Header className={className}>
      {children}
    </Header>
  )
}

// Layout Content Component
interface LayoutContentProps {
  children: React.ReactNode
  className?: string
  /**
   * Content padding size
   * - none: No padding
   * - sm: 1rem (16px)
   * - md: 1.5rem (24px)
   * - lg: 2rem (32px)
   */
  padding?: "none" | "sm" | "md" | "lg"
  /**
   * Maximum content width
   * - full: No max width
   * - 7xl: 80rem (1280px)
   * - 6xl: 72rem (1152px)
   * - 5xl: 64rem (1024px)
   */
  maxWidth?: "full" | "7xl" | "6xl" | "5xl"
}

export function LayoutContent({
  children,
  className,
  padding = "lg",
  maxWidth = "full",
}: LayoutContentProps) {
  const { isMobile } = useSidebar()

  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }

  const maxWidthClasses = {
    full: "max-w-full",
    "7xl": "max-w-7xl",
    "6xl": "max-w-6xl",
    "5xl": "max-w-5xl",
  }

  return (
    <main
      id="main-content"
      role="main"
      aria-label="Main content"
      tabIndex={-1}
      className={cn(
        "min-h-screen transition-all duration-300 focus:outline-none",
        // Add left margin for sidebar on desktop
        !isMobile && "lg:ml-64",
        paddingClasses[padding],
        maxWidthClasses[maxWidth],
        maxWidth !== "full" && "mx-auto",
        className
      )}
    >
      {children}
    </main>
  )
}

// Layout Page Component (for page-level structure)
interface LayoutPageProps {
  children: React.ReactNode
  className?: string
}

export function LayoutPage({ children, className }: LayoutPageProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {children}
    </div>
  )
}

// Layout Page Header Component
interface LayoutPageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export function LayoutPageHeader({
  title,
  subtitle,
  actions,
  className,
}: LayoutPageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-center md:justify-between", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-neutral-900 lg:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-neutral-600 lg:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-wrap">
          {actions}
        </div>
      )}
    </div>
  )
}

// Layout Page Content Component
interface LayoutPageContentProps {
  children: React.ReactNode
  className?: string
}

export function LayoutPageContent({ children, className }: LayoutPageContentProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {children}
    </div>
  )
}

// Export all components
export {
  SidebarProvider,
  Sidebar,
  useSidebar,
  HeaderProvider,
  Header,
}

// Re-export Sidebar sub-components for convenience
export {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarGroup,
  SidebarNestedItem,
  SidebarToggle,
} from "./sidebar"

// Re-export Header sub-components for convenience
export {
  HeaderLeft,
  HeaderRight,
  Breadcrumb,
  SearchBar,
  NotificationBell,
  UserProfile,
} from "./header"
