// @ts-nocheck
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

import { cn } from "../../lib/utils"

const iconVariants = cva(
  "inline-flex items-center justify-center shrink-0",
  {
    variants: {
      size: {
        sm: "w-4 h-4",      // 16px
        md: "w-5 h-5",      // 20px
        lg: "w-6 h-6",      // 24px
        xl: "w-8 h-8",      // 32px
      },
      color: {
        primary: "text-primary-600",
        secondary: "text-neutral-600",
        success: "text-success-DEFAULT",
        warning: "text-warning-DEFAULT",
        error: "text-error-DEFAULT",
        info: "text-info-DEFAULT",
        muted: "text-neutral-400",
        inherit: "text-current",
      },
    },
    defaultVariants: {
      size: "md",
      color: "inherit",
    },
  }
)

export interface IconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconVariants> {
  icon?: LucideIcon
  name?: LucideIcon  // Alias for icon prop
  label?: string
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, size, color, icon: iconProp, name, label, ...props }, ref) => {
    // Support both icon and name props (name is an alias)
    const IconComponent = iconProp || name;
    
    if (!IconComponent) {
      console.warn('Icon component requires either icon or name prop');
      return null;
    }
    
    const ariaProps = label
      ? { role: "img", "aria-label": label }
      : { "aria-hidden": true };

    return (
      <span
        ref={ref}
        className={cn(iconVariants({ size, color }), className)}
        {...ariaProps}
        {...props}
      >
        <IconComponent className="w-full h-full" />
      </span>
    )
  }
)
Icon.displayName = "Icon"

export { Icon, iconVariants }
