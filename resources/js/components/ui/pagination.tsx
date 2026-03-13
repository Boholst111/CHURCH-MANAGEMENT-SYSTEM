import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Select, SelectOption } from "./select"

const paginationVariants = cva(
  "flex items-center justify-between gap-4",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
  itemsPerPageOptions?: number[]
  showItemsPerPage?: boolean
  showTotalItems?: boolean
  showPageNumbers?: boolean
  maxPageButtons?: number
  disabled?: boolean
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ 
    className,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    itemsPerPageOptions = [10, 25, 50, 100],
    showItemsPerPage = true,
    showTotalItems = true,
    showPageNumbers = true,
    maxPageButtons = 7,
    disabled = false,
    size,
    ...props 
  }, ref) => {
    // Calculate current range
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    // Generate page numbers with ellipsis
    const getPageNumbers = (): (number | 'ellipsis')[] => {
      if (totalPages <= maxPageButtons) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }

      const pages: (number | 'ellipsis')[] = []
      const halfButtons = Math.floor((maxPageButtons - 3) / 2) // Reserve space for first, last, and ellipsis

      if (currentPage <= halfButtons + 2) {
        // Near the start
        for (let i = 1; i <= maxPageButtons - 2; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - halfButtons - 1) {
        // Near the end
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - (maxPageButtons - 3); i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - halfButtons; i <= currentPage + halfButtons; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }

      return pages
    }

    const pageNumbers = getPageNumbers()

    // Navigation handlers
    const goToFirstPage = () => {
      if (currentPage !== 1 && !disabled) {
        onPageChange(1)
      }
    }

    const goToPreviousPage = () => {
      if (currentPage > 1 && !disabled) {
        onPageChange(currentPage - 1)
      }
    }

    const goToNextPage = () => {
      if (currentPage < totalPages && !disabled) {
        onPageChange(currentPage + 1)
      }
    }

    const goToLastPage = () => {
      if (currentPage !== totalPages && !disabled) {
        onPageChange(totalPages)
      }
    }

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage && !disabled) {
        onPageChange(page)
      }
    }

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPreviousPage()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNextPage()
          break
        case 'Home':
          e.preventDefault()
          goToFirstPage()
          break
        case 'End':
          e.preventDefault()
          goToLastPage()
          break
      }
    }

    // Convert itemsPerPageOptions to SelectOption format
    const itemsPerPageSelectOptions: SelectOption[] = itemsPerPageOptions.map(value => ({
      value: value.toString(),
      label: `${value} per page`,
    }))

    return (
      <div 
        ref={ref}
        className={cn(paginationVariants({ size }), className)}
        role="navigation"
        aria-label="Pagination"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Left section: Items per page and total items */}
        <div className="flex items-center gap-4">
          {showItemsPerPage && onItemsPerPageChange && (
            <div className="flex items-center gap-2">
              <Select
                options={itemsPerPageSelectOptions}
                value={itemsPerPage.toString()}
                onChange={(value) => {
                  const newItemsPerPage = parseInt(Array.isArray(value) ? value[0] : value)
                  onItemsPerPageChange(newItemsPerPage)
                }}
                size="sm"
                disabled={disabled}
                fullWidth={false}
                aria-label="Items per page"
              />
            </div>
          )}
          
          {showTotalItems && (
            <div className="text-sm text-neutral-600">
              Showing <span className="font-medium">{startItem}</span> to{' '}
              <span className="font-medium">{endItem}</span> of{' '}
              <span className="font-medium">{totalItems}</span> items
            </div>
          )}
        </div>

        {/* Right section: Page navigation */}
        {showPageNumbers && totalPages > 0 && (
          <div className="flex items-center gap-1">
            {/* First page button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToFirstPage}
              disabled={currentPage === 1 || disabled}
              aria-label="Go to first page"
              className="h-8 w-8 p-0"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>

            {/* Previous page button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1 || disabled}
              aria-label="Go to previous page"
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1">
              {pageNumbers.map((page, index) => {
                if (page === 'ellipsis') {
                  return (
                    <div
                      key={`ellipsis-${index}`}
                      className="flex h-8 w-8 items-center justify-center"
                      aria-hidden="true"
                    >
                      <MoreHorizontal className="h-4 w-4 text-neutral-400" />
                    </div>
                  )
                }

                const isCurrentPage = page === currentPage

                return (
                  <Button
                    key={page}
                    variant={isCurrentPage ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    disabled={disabled}
                    aria-label={`Go to page ${page}`}
                    aria-current={isCurrentPage ? "page" : undefined}
                    className={cn(
                      "h-8 min-w-[2rem] px-2",
                      isCurrentPage && "pointer-events-none"
                    )}
                  >
                    {page}
                  </Button>
                )
              })}
            </div>

            {/* Next page button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages || disabled}
              aria-label="Go to next page"
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Last page button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={goToLastPage}
              disabled={currentPage === totalPages || disabled}
              aria-label="Go to last page"
              className="h-8 w-8 p-0"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination, paginationVariants }
