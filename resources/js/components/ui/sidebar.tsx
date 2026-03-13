import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, ChevronDown, ChevronRight } from "lucide-react"

import { cn } from "../../lib/utils"

// Sidebar context for managing open/close state
interface SidebarContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Sidebar Provider Component
interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({ 
  children, 
  defaultOpen = true,
  onOpenChange 
}: SidebarProviderProps) {
  const [isOpen, setIsOpenState] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  // Detect mobile viewport
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar on mobile by default
  React.useEffect(() => {
    if (isMobile) {
      setIsOpenState(false)
    }
  }, [isMobile])

  const setIsOpen = React.useCallback((open: boolean) => {
    setIsOpenState(open)
    onOpenChange?.(open)
  }, [onOpenChange])

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Sidebar Root Component
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Sidebar({ children, className, ...props }: SidebarProps) {
  const { isOpen, setIsOpen, isMobile } = useSidebar()

  // Prevent body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isMobile, isOpen])

  // Handle escape key to close sidebar on mobile
  React.useEffect(() => {
    if (!isMobile || !isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobile, isOpen, setIsOpen])

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-white border-r border-neutral-200 z-50 transition-transform duration-300 ease-in-out",
          "lg:z-30 lg:translate-x-0",
          isMobile && !isOpen && "-translate-x-full",
          className
        )}
        role="navigation"
        aria-label="Main navigation"
        {...props}
      >
        {children}
      </aside>
    </>
  )
}

// Sidebar Header Component (for logo/branding)
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  showCloseButton?: boolean
}

export function SidebarHeader({ 
  children, 
  showCloseButton = true,
  className, 
  ...props 
}: SidebarHeaderProps) {
  const { setIsOpen, isMobile } = useSidebar()

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-neutral-200",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {children}
      </div>
      
      {/* Close button for mobile */}
      {isMobile && showCloseButton && (
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-neutral-600" />
        </button>
      )}
    </div>
  )
}

// Sidebar Content Component
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarContent({ children, className, ...props }: SidebarContentProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto px-3 py-4 space-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Sidebar Footer Component
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarFooter({ children, className, ...props }: SidebarFooterProps) {
  return (
    <div
      role="complementary"
      aria-label="Sidebar footer"
      className={cn(
        "px-3 py-4 border-t border-neutral-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Sidebar Item Component
const sidebarItemVariants = cva(
  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px]",
  {
    variants: {
      active: {
        true: "bg-primary-50 text-primary-700 border-l-4 border-primary-600",
        false: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
)

export interface SidebarItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode
  children: React.ReactNode
  badge?: React.ReactNode
}

export const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ className, active, disabled, icon, children, badge, ...props }, ref) => {
    const { setIsOpen, isMobile } = useSidebar()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      
      // Close sidebar on mobile when item is clicked
      if (isMobile) {
        setIsOpen(false)
      }
      
      props.onClick?.(e)
    }

    return (
      <a
        ref={ref}
        className={cn(sidebarItemVariants({ active, disabled }), className)}
        aria-current={active ? "page" : undefined}
        onClick={handleClick}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex-1">{children}</span>
        {badge && (
          <span className="flex-shrink-0">
            {badge}
          </span>
        )}
      </a>
    )
  }
)
SidebarItem.displayName = "SidebarItem"

// Sidebar Group Component (for nested items)
interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  children: React.ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
}

export function SidebarGroup({ 
  label, 
  children, 
  collapsible = false,
  defaultOpen = true,
  className,
  ...props 
}: SidebarGroupProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const groupId = React.useId()

  const toggleOpen = () => {
    if (collapsible) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={cn("space-y-1", className)} {...props}>
      {label && (
        <button
          onClick={toggleOpen}
          className={cn(
            "flex items-center justify-between w-full px-3 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider min-h-[44px]",
            collapsible && "hover:text-neutral-700 cursor-pointer",
            !collapsible && "cursor-default"
          )}
          aria-expanded={collapsible ? isOpen : undefined}
          aria-controls={collapsible ? groupId : undefined}
          disabled={!collapsible}
        >
          <span>{label}</span>
          {collapsible && (
            <span aria-hidden="true">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
        </button>
      )}
      
      {(!collapsible || isOpen) && (
        <div 
          id={collapsible ? groupId : undefined}
          className="space-y-1"
          role={collapsible ? "region" : undefined}
          aria-label={collapsible && label ? `${label} navigation items` : undefined}
        >
          {children}
        </div>
      )}
    </div>
  )
}

// Sidebar Nested Item Component
interface SidebarNestedItemProps extends SidebarItemProps {
  level?: number
}

export const SidebarNestedItem = React.forwardRef<HTMLAnchorElement, SidebarNestedItemProps>(
  ({ className, level = 1, ...props }, ref) => {
    const paddingLeft = `${(level * 0.75) + 0.75}rem` // 12px per level + base padding

    return (
      <SidebarItem
        ref={ref}
        className={cn(className)}
        style={{ paddingLeft }}
        {...props}
      />
    )
  }
)
SidebarNestedItem.displayName = "SidebarNestedItem"

// Sidebar Toggle Button (for mobile menu)
interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
}

export function SidebarToggle({ icon, className, ...props }: SidebarToggleProps) {
  const { setIsOpen } = useSidebar()

  return (
    <button
      onClick={() => setIsOpen(true)}
      className={cn(
        "lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
        className
      )}
      aria-label="Open sidebar"
      {...props}
    >
      {icon || (
        <svg
          className="w-6 h-6 text-neutral-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  )
}

export { useSidebar }
