import * as React from "react"

import { cn } from "../../lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"

export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

/**
 * Modal component - A wrapper around Dialog for easier usage
 * Provides consistent styling with rounded corners and spacing
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onOpenChange, title, description, children, footer, className }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("sm:max-w-[425px]", className)} ref={ref}>
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}
          <div className="py-4">{children}</div>
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    )
  }
)
Modal.displayName = "Modal"

export { Modal }
