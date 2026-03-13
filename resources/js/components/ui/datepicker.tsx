import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"

import { cn } from "../../lib/utils"

const datePickerTriggerVariants = cva(
  "flex items-center justify-between w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-neutral-300 bg-white text-neutral-900 focus:border-primary-500 focus:ring-primary-500",
        error: "border-error-500 bg-error-50 text-error-900 focus:border-error-500 focus:ring-error-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm h-8",
        md: "px-4 py-2 text-base h-10",
        lg: "px-4 py-3 text-lg h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export type DateRange = {
  start: Date | null
  end: Date | null
}

export type DatePreset = {
  label: string
  getValue: () => Date | DateRange
}

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof datePickerTriggerVariants> {
  label?: string
  error?: string
  helperText?: string
  value?: Date | DateRange | null
  onChange?: (value: Date | DateRange | null) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  mode?: 'single' | 'range'
  minDate?: Date
  maxDate?: Date
  presets?: DatePreset[]
  showPresets?: boolean
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DEFAULT_PRESETS: DatePreset[] = [
  {
    label: 'Today',
    getValue: () => new Date()
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    }
  },
  {
    label: 'This Week',
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - start.getDay())
      return { start, end }
    }
  },
  {
    label: 'Last Week',
    getValue: () => {
      const end = new Date()
      end.setDate(end.getDate() - end.getDay() - 1)
      const start = new Date(end)
      start.setDate(start.getDate() - 6)
      return { start, end }
    }
  },
  {
    label: 'This Month',
    getValue: () => {
      const end = new Date()
      const start = new Date(end.getFullYear(), end.getMonth(), 1)
      return { start, end }
    }
  },
  {
    label: 'Last Month',
    getValue: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 0)
      return { start, end }
    }
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 6)
      return { start, end }
    }
  },
  {
    label: 'Last 30 Days',
    getValue: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 29)
      return { start, end }
    }
  }
]

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ 
    className,
    label,
    error,
    helperText,
    value,
    onChange,
    placeholder = "Select date",
    disabled = false,
    required = false,
    fullWidth = true,
    mode = 'single',
    minDate,
    maxDate,
    presets,
    showPresets = true,
    variant,
    size,
    id,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [currentMonth, setCurrentMonth] = React.useState(new Date())
    const [hoverDate, setHoverDate] = React.useState<Date | null>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    
    const datePickerId = id || `datepicker-${React.useId()}`
    const errorId = error ? `${datePickerId}-error` : undefined
    const helperTextId = helperText ? `${datePickerId}-helper` : undefined
    const hasError = !!error
    const currentVariant = hasError ? 'error' : variant

    const effectivePresets = presets || (mode === 'range' ? DEFAULT_PRESETS : DEFAULT_PRESETS.filter(p => {
      const val = p.getValue()
      return val instanceof Date
    }))

    // Format date for display
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }

    // Get display text
    const displayText = React.useMemo(() => {
      if (!value) return placeholder
      
      if (mode === 'single' && value instanceof Date) {
        return formatDate(value)
      }
      
      if (mode === 'range' && value && typeof value === 'object' && 'start' in value) {
        const range = value as DateRange
        if (range.start && range.end) {
          return `${formatDate(range.start)} - ${formatDate(range.end)}`
        }
        if (range.start) {
          return `${formatDate(range.start)} - ...`
        }
      }
      
      return placeholder
    }, [value, placeholder, mode])

    // Check if date is disabled
    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      return false
    }

    // Check if date is selected
    const isDateSelected = (date: Date): boolean => {
      if (!value) return false
      
      if (mode === 'single' && value instanceof Date) {
        return isSameDay(date, value)
      }
      
      if (mode === 'range' && value && typeof value === 'object' && 'start' in value) {
        const range = value as DateRange
        if (range.start && isSameDay(date, range.start)) return true
        if (range.end && isSameDay(date, range.end)) return true
      }
      
      return false
    }

    // Check if date is in range
    const isDateInRange = (date: Date): boolean => {
      if (mode !== 'range' || !value || typeof value !== 'object' || !('start' in value)) return false
      
      const range = value as DateRange
      if (!range.start) return false
      
      const endDate = range.end || hoverDate
      if (!endDate) return false
      
      const start = range.start < endDate ? range.start : endDate
      const end = range.start < endDate ? endDate : range.start
      
      return date > start && date < end
    }

    // Check if two dates are the same day
    const isSameDay = (date1: Date, date2: Date): boolean => {
      return date1.getDate() === date2.getDate() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getFullYear() === date2.getFullYear()
    }

    // Handle date selection
    const handleDateSelect = (date: Date) => {
      if (disabled || isDateDisabled(date)) return

      if (mode === 'single') {
        onChange?.(date)
        setIsOpen(false)
      } else {
        // Range mode
        const currentRange = (value && typeof value === 'object' && 'start' in value) 
          ? value as DateRange 
          : { start: null, end: null }
        
        if (!currentRange.start || (currentRange.start && currentRange.end)) {
          // Start new range
          onChange?.({ start: date, end: null })
        } else {
          // Complete range
          if (date < currentRange.start) {
            onChange?.({ start: date, end: currentRange.start })
          } else {
            onChange?.({ start: currentRange.start, end: date })
          }
          setIsOpen(false)
        }
      }
    }

    // Handle preset selection
    const handlePresetSelect = (preset: DatePreset) => {
      const presetValue = preset.getValue()
      onChange?.(presetValue)
      setIsOpen(false)
    }

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.(null)
    }

    // Navigate months
    const goToPreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }

    const goToNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }

    // Get calendar days
    const getCalendarDays = (): (Date | null)[] => {
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth()
      
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      
      const startPadding = firstDay.getDay()
      const days: (Date | null)[] = Array(startPadding).fill(null)
      
      for (let day = 1; day <= lastDay.getDate(); day++) {
        days.push(new Date(year, month, day))
      }
      
      return days
    }

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    // Set current month based on value
    React.useEffect(() => {
      if (value) {
        if (value instanceof Date) {
          setCurrentMonth(new Date(value.getFullYear(), value.getMonth()))
        } else if (typeof value === 'object' && 'start' in value && value.start) {
          setCurrentMonth(new Date(value.start.getFullYear(), value.start.getMonth()))
        }
      }
    }, [value])

    const calendarDays = getCalendarDays()

    return (
      <div 
        ref={containerRef}
        className={cn("space-y-1", fullWidth && "w-full", className)}
        {...props}
      >
        {label && (
          <label 
            htmlFor={datePickerId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="text-error-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative">
          <div
            ref={ref}
            id={datePickerId}
            role="button"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-invalid={hasError}
            aria-describedby={cn(
              errorId && errorId,
              helperTextId && helperTextId
            ) || undefined}
            aria-required={required}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className={cn(
              datePickerTriggerVariants({ variant: currentVariant, size }),
              disabled && "bg-neutral-100 text-neutral-500 cursor-not-allowed opacity-60",
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                !disabled && setIsOpen(!isOpen)
              }
            }}
          >
            <div className="flex items-center gap-2 flex-1">
              <Calendar className="h-4 w-4 text-neutral-500 flex-shrink-0" aria-hidden="true" />
              <span className={cn(
                "truncate",
                !value && "text-neutral-400"
              )}>
                {displayText}
              </span>
            </div>
            
            {value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="hover:bg-neutral-200 rounded-full p-1 transition-colors flex-shrink-0"
                aria-label="Clear date"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {isOpen && (
            <div
              role="dialog"
              aria-label="Date picker"
              className="absolute z-50 mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95"
            >
              <div className="flex">
                {/* Presets sidebar */}
                {showPresets && effectivePresets.length > 0 && (
                  <div className="border-r border-neutral-200 p-2 space-y-1 min-w-[140px]">
                    <div className="text-xs font-medium text-neutral-500 px-2 py-1">
                      Presets
                    </div>
                    {effectivePresets.map((preset, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handlePresetSelect(preset)}
                        className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-neutral-100 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Calendar */}
                <div className="p-3">
                  {/* Month navigation */}
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      className="p-1 hover:bg-neutral-100 rounded transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    <div className="font-medium text-sm">
                      {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </div>
                    
                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="p-1 hover:bg-neutral-100 rounded transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {DAYS.map(day => (
                      <div
                        key={day}
                        className="text-center text-xs font-medium text-neutral-500 w-8 h-8 flex items-center justify-center"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                      if (!date) {
                        return <div key={`empty-${index}`} className="w-8 h-8" />
                      }

                      const isDisabled = isDateDisabled(date)
                      const isSelected = isDateSelected(date)
                      const isInRange = isDateInRange(date)
                      const isToday = isSameDay(date, new Date())

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDateSelect(date)}
                          onMouseEnter={() => mode === 'range' && setHoverDate(date)}
                          onMouseLeave={() => mode === 'range' && setHoverDate(null)}
                          disabled={isDisabled}
                          className={cn(
                            "w-8 h-8 text-sm rounded transition-colors",
                            "hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500",
                            isDisabled && "text-neutral-300 cursor-not-allowed hover:bg-transparent",
                            isSelected && "bg-primary-600 text-white hover:bg-primary-700",
                            isInRange && !isSelected && "bg-primary-100 text-primary-900",
                            isToday && !isSelected && "border border-primary-500",
                            !isDisabled && !isSelected && !isInRange && "text-neutral-900"
                          )}
                          aria-label={formatDate(date)}
                          aria-selected={isSelected}
                        >
                          {date.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </div>
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
DatePicker.displayName = "DatePicker"

export { DatePicker, datePickerTriggerVariants }
