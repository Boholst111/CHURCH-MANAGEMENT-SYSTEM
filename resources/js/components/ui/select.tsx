import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronDown, X, Search } from "lucide-react"

import { cn } from "../../lib/utils"

const selectTriggerVariants = cva(
  "flex items-center justify-between w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-neutral-300 bg-white text-neutral-900 focus:border-primary-500 focus:ring-primary-500",
        error: "border-error-500 bg-error-50 text-error-900 focus:border-error-500 focus:ring-error-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm h-8",
        md: "px-4 py-2 text-base h-10 min-h-[44px]", // Minimum 44px for touch targets on mobile
        lg: "px-4 py-3 text-lg h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof selectTriggerVariants> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  searchable?: boolean
  fullWidth?: boolean
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ 
    className,
    label,
    error,
    helperText,
    options,
    value,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    required = false,
    multiple = false,
    searchable = false,
    fullWidth = true,
    variant,
    size,
    id,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [focusedIndex, setFocusedIndex] = React.useState(-1)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    
    const selectId = id || `select-${React.useId()}`
    const errorId = error ? `${selectId}-error` : undefined
    const helperTextId = helperText ? `${selectId}-helper` : undefined
    const hasError = !!error
    const currentVariant = hasError ? 'error' : variant

    // Normalize value to array for easier handling
    const selectedValues = React.useMemo(() => {
      if (value === undefined || value === null) return []
      return Array.isArray(value) ? value : [value]
    }, [value])

    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options
      return options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }, [options, searchQuery])

    // Get display text for selected values
    const displayText = React.useMemo(() => {
      if (selectedValues.length === 0) return placeholder
      
      if (multiple) {
        if (selectedValues.length === 1) {
          const option = options.find(opt => opt.value === selectedValues[0])
          return option?.label || placeholder
        }
        return `${selectedValues.length} selected`
      }
      
      const option = options.find(opt => opt.value === selectedValues[0])
      return option?.label || placeholder
    }, [selectedValues, options, placeholder, multiple])

    // Handle option selection
    const handleSelect = (optionValue: string) => {
      if (disabled) return

      let newValue: string | string[]
      
      if (multiple) {
        if (selectedValues.includes(optionValue)) {
          newValue = selectedValues.filter(v => v !== optionValue)
        } else {
          newValue = [...selectedValues, optionValue]
        }
      } else {
        newValue = optionValue
        setIsOpen(false)
      }

      onChange?.(newValue)
      setSearchQuery("")
    }

    // Handle removing a selected value (for multiple select)
    const handleRemove = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation()
      if (disabled) return
      
      const newValue = selectedValues.filter(v => v !== optionValue)
      onChange?.(newValue)
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[focusedIndex].value)
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setSearchQuery("")
          setFocusedIndex(-1)
          break
        case 'ArrowDown':
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setFocusedIndex(prev => 
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            )
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (isOpen) {
            setFocusedIndex(prev => prev > 0 ? prev - 1 : 0)
          }
          break
        case 'Tab':
          if (isOpen) {
            setIsOpen(false)
            setSearchQuery("")
          }
          break
      }
    }

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setSearchQuery("")
          setFocusedIndex(-1)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen, searchable])

    // Scroll focused option into view
    React.useEffect(() => {
      if (focusedIndex >= 0 && dropdownRef.current) {
        const focusedElement = dropdownRef.current.children[focusedIndex] as HTMLElement
        if (focusedElement && focusedElement.scrollIntoView) {
          focusedElement.scrollIntoView({ block: 'nearest' })
        }
      }
    }, [focusedIndex])

    return (
      <div 
        ref={containerRef}
        className={cn("space-y-1", fullWidth && "w-full", className)}
        {...props}
      >
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="text-error-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative">
          <div
            ref={ref}
            id={selectId}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={`${selectId}-listbox`}
            aria-invalid={hasError}
            aria-describedby={cn(
              errorId && errorId,
              helperTextId && helperTextId
            ) || undefined}
            aria-required={required}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className={cn(
              selectTriggerVariants({ variant: currentVariant, size }),
              disabled && "bg-neutral-100 text-neutral-500 cursor-not-allowed opacity-60",
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
          >
            <div className="flex-1 flex items-center gap-1 flex-wrap min-h-0">
              {multiple && selectedValues.length > 0 ? (
                selectedValues.map(val => {
                  const option = options.find(opt => opt.value === val)
                  return option ? (
                    <span
                      key={val}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-sm"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => handleRemove(val, e)}
                        className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                        aria-label={`Remove ${option.label}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : null
                })
              ) : (
                <span className={cn(
                  "truncate",
                  selectedValues.length === 0 && "text-neutral-400"
                )}>
                  {displayText}
                </span>
              )}
            </div>
            
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-neutral-500 transition-transform duration-200 flex-shrink-0 ml-2",
                isOpen && "transform rotate-180"
              )}
              aria-hidden="true"
            />
          </div>

          {isOpen && (
            <div
              id={`${selectId}-listbox`}
              role="listbox"
              aria-multiselectable={multiple}
              className="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-auto animate-in fade-in-0 zoom-in-95"
            >
              {searchable && (
                <div className="sticky top-0 bg-white border-b border-neutral-200 p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" aria-hidden="true" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setFocusedIndex(0)
                      }}
                      placeholder="Search..."
                      className="w-full pl-9 pr-3 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Search options"
                    />
                  </div>
                </div>
              )}
              
              <div ref={dropdownRef}>
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-neutral-500 text-center">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = selectedValues.includes(option.value)
                    const isFocused = index === focusedIndex
                    
                    return (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        className={cn(
                          "flex items-center justify-between px-4 py-2 cursor-pointer transition-colors",
                          isSelected && "bg-primary-50 text-primary-700",
                          !isSelected && !option.disabled && "hover:bg-neutral-50",
                          isFocused && "bg-neutral-100",
                          option.disabled && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() => !option.disabled && handleSelect(option.value)}
                      >
                        <span className="text-sm">{option.label}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-primary-600" aria-hidden="true" />
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <p 
            id={errorId}
            className="text-sm text-error-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={helperTextId}
            className="text-sm text-neutral-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select, selectTriggerVariants }
