import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const inputVariants = cva(
  "block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0",
  {
    variants: {
      variant: {
        default: "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:ring-primary-500",
        error: "border-error-500 bg-error-50 text-error-900 placeholder-error-400 focus:border-error-500 focus:ring-error-500",
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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

/**
 * Get appropriate inputMode for mobile keyboards based on input type
 */
const getInputMode = (type: string): React.HTMLAttributes<HTMLInputElement>['inputMode'] => {
  switch (type) {
    case 'email':
      return 'email'
    case 'tel':
      return 'tel'
    case 'number':
      return 'numeric'
    case 'url':
      return 'url'
    case 'search':
      return 'search'
    default:
      return 'text'
  }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    type = 'text',
    label,
    error,
    helperText,
    icon,
    iconPosition = 'left',
    fullWidth = true,
    disabled,
    required,
    id,
    variant,
    size,
    inputMode,
    ...props 
  }, ref) => {
    const inputId = id || `input-${React.useId()}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperTextId = helperText ? `${inputId}-helper` : undefined
    const hasError = !!error
    const currentVariant = hasError ? 'error' : variant
    
    // Use provided inputMode or determine from type for mobile keyboard optimization
    const mobileInputMode = inputMode || getInputMode(type)

    return (
      <div className={cn("space-y-1", fullWidth && "w-full")}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="text-error-500 ml-1" aria-label="required">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            id={inputId}
            disabled={disabled}
            required={required}
            inputMode={mobileInputMode}
            aria-invalid={hasError}
            aria-describedby={cn(
              errorId && errorId,
              helperTextId && helperTextId
            ) || undefined}
            className={cn(
              inputVariants({ variant: currentVariant, size }),
              icon && iconPosition === 'left' && "pl-10",
              icon && iconPosition === 'right' && "pr-10",
              disabled && "bg-neutral-100 text-neutral-500 cursor-not-allowed",
              className
            )}
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true">
              {icon}
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
Input.displayName = "Input"

export { Input, inputVariants }
