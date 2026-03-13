// @ts-nocheck
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
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
  full: 'sm:max-w-7xl',
}

/**
 * Modal component - A wrapper around Dialog for easier usage
 * Provides consistent styling with rounded corners and spacing
 * 
 * Features:
 * - Multiple sizes (sm, md, lg, xl, full)
 * - Optional overlay click to close
 * - Optional close button
 * - Focus trap (handled by Radix UI)
 * - Escape key to close (handled by Radix UI)
 * - Body scroll prevention (handled by Radix UI)
 * - Smooth animations
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    isOpen, 
    onClose, 
    title, 
    description, 
    children, 
    footer, 
    size = 'md',
    closeOnOverlayClick = true,
    showCloseButton = true,
    className 
  }, ref) => {
    const handleOpenChange = (open: boolean) => {
      if (!open) {
        onClose()
      }
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (!closeOnOverlayClick) {
        e.preventDefault()
      }
    }

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent 
          className={cn(sizeClasses[size], className)} 
          ref={ref}
          onPointerDownOutside={handleOverlayClick}
          onInteractOutside={handleOverlayClick}
          showCloseButton={showCloseButton}
        >
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
