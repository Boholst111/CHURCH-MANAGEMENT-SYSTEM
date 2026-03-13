import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const cardVariants = cva(
  "rounded-lg bg-white text-neutral-900 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border border-neutral-200 shadow-sm",
        bordered: "border-2 border-neutral-300 shadow-none",
        elevated: "border-transparent shadow-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hoverable: {
        true: "hover:shadow-xl hover:scale-[1.02] cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hoverable: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string
  description?: string
  footer?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, title, description, footer, children, ...props }, ref) => {
    // If using title/description/footer props, override padding to none and handle internally
    const hasStructuredContent = title || description || footer
    const effectivePadding = hasStructuredContent ? "none" : padding

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding: effectivePadding, hoverable }), className)}
        role={hoverable ? "article" : undefined}
        aria-label={title ? undefined : "Card"}
        {...props}
      >
        {hasStructuredContent ? (
          <>
            {(title || description) && (
              <CardHeader>
                {title && <CardTitle>{title}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
              </CardHeader>
            )}
            {children && <CardContent>{children}</CardContent>}
            {footer && <CardFooter>{footer}</CardFooter>}
          </>
        ) : (
          children
        )}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
