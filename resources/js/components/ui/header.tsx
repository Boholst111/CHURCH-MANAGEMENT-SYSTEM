import * as React from "react"
import { Menu, Search, Bell, ChevronDown, User } from "lucide-react"
import { cn } from "../../lib/utils"
import { SidebarToggle } from "./sidebar"
import { ThemeToggle } from "./theme-toggle"

// Header context for managing state
interface HeaderContextValue {
  showSearch: boolean
  setShowSearch: (show: boolean) => void
}

const HeaderContext = React.createContext<HeaderContextValue | undefined>(undefined)

function useHeader() {
  const context = React.useContext(HeaderContext)
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider")
  }
  return context
}

// Header Provider Component
interface HeaderProviderProps {
  children: React.ReactNode
}

export function HeaderProvider({ children }: HeaderProviderProps) {
  const [showSearch, setShowSearch] = React.useState(false)

  return (
    <HeaderContext.Provider value={{ showSearch, setShowSearch }}>
      {children}
    </HeaderContext.Provider>
  )
}

// Header Root Component
interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Header({ children, className, ...props }: HeaderProps) {
  return (
    <header
      role="banner"
      className={cn(
        "sticky top-0 z-40 h-16 bg-white border-b border-neutral-200 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {children}
      </div>
    </header>
  )
}

// Header Left Section (Mobile menu + Breadcrumbs)
interface HeaderLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function HeaderLeft({ children, className, ...props }: HeaderLeftProps) {
  return (
    <div
      className={cn("flex items-center gap-3 flex-1 min-w-0", className)}
      {...props}
    >
      {/* Mobile menu toggle */}
      <SidebarToggle />
      
      {children}
    </div>
  )
}

// Breadcrumb Component
interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

export function Breadcrumb({ 
  items, 
  separator = "/",
  className, 
  ...props 
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("hidden md:flex items-center gap-2 text-sm", className)}
      {...props}
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    isLast
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-600"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="text-neutral-400" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Header Right Section (Search, Notifications, Profile)
interface HeaderRightProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function HeaderRight({ children, className, ...props }: HeaderRightProps) {
  return (
    <div
      className={cn("flex items-center gap-2 lg:gap-3", className)}
      {...props}
    >
      {/* Theme toggle */}
      <ThemeToggle />
      
      {children}
    </div>
  )
}

// Search Bar Component
interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void
}

export function SearchBar({ 
  onSearch, 
  className,
  placeholder = "Search...",
  ...props 
}: SearchBarProps) {
  const [query, setQuery] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "hidden lg:flex items-center gap-2 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all",
        className
      )}
    >
      <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-sm text-neutral-900 placeholder-neutral-400 w-48 xl:w-64"
        aria-label="Search"
        {...props}
      />
    </form>
  )
}

// Notification Bell Component
interface NotificationBellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number
  onClick?: () => void
}

export function NotificationBell({ 
  count = 0, 
  onClick,
  className,
  ...props 
}: NotificationBellProps) {
  const hasNotifications = count > 0

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-2 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
        className
      )}
      aria-label={`Notifications${hasNotifications ? ` (${count} unread)` : ""}`}
      {...props}
    >
      <Bell className="w-5 h-5 text-neutral-700" aria-hidden="true" />
      
      {hasNotifications && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error-400 opacity-75" />
          <span className="relative inline-flex items-center justify-center h-4 w-4 rounded-full bg-error-500 text-[10px] font-semibold text-white">
            {count > 9 ? "9+" : count}
          </span>
        </span>
      )}
    </button>
  )
}

// User Profile Dropdown Component
interface UserProfileProps {
  user: {
    name: string
    email?: string
    avatar?: string
    role?: string
  }
  menuItems?: Array<{
    label?: string
    icon?: React.ReactNode
    onClick?: () => void
    href?: string
    divider?: boolean
  }>
}

export function UserProfile({ user, menuItems = [] }: UserProfileProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleItemClick = (item: typeof menuItems[0]) => {
    item.onClick?.()
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden border-2 border-primary-200">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-primary-600" aria-hidden="true" />
          )}
        </div>

        {/* User info (hidden on mobile) */}
        <div className="hidden lg:flex flex-col items-start min-w-0">
          <span className="text-sm font-medium text-neutral-900 truncate max-w-[120px]">
            {user.name}
          </span>
          {user.role && (
            <span className="text-xs text-neutral-500 truncate max-w-[120px]">
              {user.role}
            </span>
          )}
        </div>

        <ChevronDown
          className={cn(
            "hidden lg:block w-4 h-4 text-neutral-500 transition-transform",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {/* User info in dropdown (always visible) */}
          <div className="px-4 py-3 border-b border-neutral-200">
            <p className="text-sm font-medium text-neutral-900 truncate">
              {user.name}
            </p>
            {user.email && (
              <p className="text-xs text-neutral-500 truncate">
                {user.email}
              </p>
            )}
          </div>

          {/* Menu items */}
          {menuItems.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={index}
                  className="my-1 border-t border-neutral-200"
                  role="separator"
                />
              )
            }

            const content = (
              <>
                {item.icon && (
                  <span className="flex-shrink-0" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </>
            )

            if (item.href) {
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  role="menuitem"
                >
                  {content}
                </a>
              )
            }

            return (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
                role="menuitem"
              >
                {content}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { useHeader }
