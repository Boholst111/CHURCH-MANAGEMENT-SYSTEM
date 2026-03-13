import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary-100 text-primary-700 border-primary-200 focus:ring-primary-500",
        success: "bg-success-light text-success-dark border-success-DEFAULT focus:ring-success-DEFAULT",
        warning: "bg-warning-light text-warning-dark border-warning-DEFAULT focus:ring-warning-DEFAULT",
        error: "bg-error-light text-error-dark border-error-DEFAULT focus:ring-error-DEFAULT",
        danger: "bg-error-light text-error-dark border-error-DEFAULT focus:ring-error-DEFAULT",
        neutral: "bg-neutral-100 text-neutral-700 border-neutral-300 focus:ring-neutral-500",
        outline: "bg-transparent text-neutral-700 border border-neutral-300 focus:ring-neutral-500",
      },
      size: {
        sm: "h-5 px-2 text-xs gap-1",
        md: "h-6 px-2.5 text-sm gap-1.5",
        lg: "h-7 px-3 text-base gap-2",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
      shape: "rounded",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, shape, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape }), className)}
        {...props}
      >
        {icon && (
          <span className="inline-flex items-center" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </span>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
