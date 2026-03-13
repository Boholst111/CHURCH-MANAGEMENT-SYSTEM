import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary-600 hover:bg-primary-700 text-white border-transparent shadow-sm disabled:bg-primary-300",
        primary: "bg-primary-600 hover:bg-primary-700 text-white border-transparent shadow-sm disabled:bg-primary-300",
        secondary: "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-transparent disabled:bg-neutral-50 disabled:text-neutral-400",
        destructive: "bg-error-600 hover:bg-error-700 text-white border-transparent shadow-sm disabled:bg-error-300",
        outline: "bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-400",
        ghost: "bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 border-transparent",
        danger: "bg-error-600 hover:bg-error-700 text-white border-transparent shadow-sm disabled:bg-error-300",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-sm",
        md: "h-10 min-h-[44px] px-4 py-2 text-base", // Minimum 44px for touch targets on mobile
        lg: "h-12 px-6 py-3 text-lg",
        icon: "h-10 w-10 p-0", // Square icon button
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2" aria-hidden="true">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2" aria-hidden="true">{icon}</span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
