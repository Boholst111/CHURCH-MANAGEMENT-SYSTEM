import * as React from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "../../lib/utils"
import { useThemeContext, Theme } from "../../contexts/ThemeContext"

interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Show labels next to icons (default: false) */
  showLabel?: boolean
  /** Variant style */
  variant?: 'icon' | 'dropdown'
}

/**
 * Theme Toggle Component
 * 
 * Allows users to switch between light, dark, and auto (system) themes.
 * Integrates with ThemeContext for state management.
 * 
 * Features:
 * - Icon-only button or dropdown menu variant
 * - Visual indication of current theme
 * - Smooth transitions between themes
 * - Keyboard accessible
 * - ARIA labels for screen readers
 * 
 * @example
 * // Icon button (for header)
 * <ThemeToggle />
 * 
 * @example
 * // Dropdown menu
 * <ThemeToggle variant="dropdown" />
 */
export function ThemeToggle({ 
  showLabel = false,
  variant = 'icon',
  className,
  ...props 
}: ThemeToggleProps) {
  const { theme, setTheme } = useThemeContext()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (variant !== 'dropdown') return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, variant])

  // Close dropdown on escape key
  React.useEffect(() => {
    if (variant !== 'dropdown') return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, variant])

  const getThemeIcon = (themeValue: Theme) => {
    switch (themeValue) {
      case 'light':
        return <Sun className="w-5 h-5" aria-hidden="true" />
      case 'dark':
        return <Moon className="w-5 h-5" aria-hidden="true" />
    }
  }

  const getThemeLabel = (themeValue: Theme) => {
    switch (themeValue) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  // Icon button variant - toggles between light and dark only
  if (variant === 'icon') {
    const toggleTheme = () => {
      const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
    }

    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          "group",
          className
        )}
        aria-label={`Current theme: ${getThemeLabel(theme)}. Click to toggle theme.`}
        title={`Theme: ${getThemeLabel(theme)}`}
        {...props}
      >
        <div className="relative w-5 h-5 text-neutral-700 dark:text-neutral-300">
          {/* Animated icon transition */}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300",
              "transform",
              theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
            )}
          >
            <Sun className="w-5 h-5" aria-hidden="true" />
          </div>
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300",
              "transform",
              theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            )}
          >
            <Moon className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        {showLabel && (
          <span className="ml-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {getThemeLabel(theme)}
          </span>
        )}
      </button>
    )
  }

  // Dropdown variant - shows all theme options
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          className
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Theme selector"
        {...props}
      >
        <div className="text-neutral-700">
          {getThemeIcon(theme)}
        </div>
        {showLabel && (
          <span className="text-sm font-medium text-neutral-700">
            {getThemeLabel(theme)}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-50",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
          role="menu"
          aria-orientation="vertical"
          aria-label="Theme options"
        >
          {(['light', 'dark'] as Theme[]).map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => handleThemeChange(themeOption)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-left",
                theme === themeOption
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              )}
              role="menuitem"
              aria-current={theme === themeOption ? 'true' : undefined}
            >
              <span className="flex-shrink-0">
                {getThemeIcon(themeOption)}
              </span>
              <span>{getThemeLabel(themeOption)}</span>
              {theme === themeOption && (
                <span className="ml-auto text-primary-600 dark:text-primary-400" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Compact theme toggle for mobile or space-constrained areas
 */
export function ThemeToggleCompact(props: Omit<ThemeToggleProps, 'variant'>) {
  return <ThemeToggle variant="icon" {...props} />
}

/**
 * Theme toggle with dropdown menu for settings pages
 */
export function ThemeToggleDropdown(props: Omit<ThemeToggleProps, 'variant'>) {
  return <ThemeToggle variant="dropdown" showLabel {...props} />
}
