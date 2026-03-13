import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Spinner } from "./spinner"
import { useIsMobile } from "../../hooks/useBreakpoint"

// ============================================================================
// Base Table Components (for manual composition)
// ============================================================================

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky = false, ...props }, ref) => (
  <thead 
    ref={ref} 
    className={cn(
      "[&_tr]:border-b",
      sticky && "sticky top-0 z-10 bg-neutral-50",
      className
    )} 
    {...props} 
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

// ============================================================================
// Generic Data Table Component
// ============================================================================

export interface TableColumn<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (row: T) => void
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  className?: string
  mobileCardView?: boolean  // Enable card view on mobile
  stickyHeader?: boolean     // Enable sticky headers
}

/**
 * Generic Data Table Component
 * 
 * A fully-featured table component with TypeScript generics for type safety.
 * Supports column configuration, loading states, empty states, and various visual styles.
 * Mobile optimizations include horizontal scroll, optional card view, and sticky headers.
 * 
 * @example
 * ```tsx
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 * 
 * const columns: TableColumn<User>[] = [
 *   { key: 'name', header: 'Name' },
 *   { key: 'email', header: 'Email', align: 'right' },
 * ]
 * 
 * <DataTable 
 *   columns={columns} 
 *   data={users} 
 *   loading={isLoading}
 *   mobileCardView={true}
 *   stickyHeader={true}
 * />
 * ```
 */
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  striped = false,
  hoverable = true,
  compact = false,
  className,
  mobileCardView = false,
  stickyHeader = false,
}: DataTableProps<T>) {
  const isMobile = useIsMobile()
  
  // Mobile card view renderer
  const renderMobileCardView = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-neutral-200 p-4 space-y-3">
              {columns.slice(0, 4).map((column) => (
                <div key={column.key} className="space-y-1">
                  <div className="h-3 w-20 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-4 bg-neutral-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
          <p className="text-sm text-neutral-500">{emptyMessage}</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "bg-white rounded-lg border border-neutral-200 p-4 space-y-3",
              hoverable && "hover:shadow-md transition-shadow",
              onRowClick && "cursor-pointer"
            )}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => {
              const cellContent = column.render
                ? column.render(row)
                : row[column.key]

              return (
                <div key={column.key} className="flex flex-col space-y-1">
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {column.header}
                  </span>
                  <span className="text-sm text-neutral-900">
                    {cellContent}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  // Use card view on mobile if enabled
  if (isMobile && mobileCardView) {
    return <div className={className}>{renderMobileCardView()}</div>
  }

  // Render loading state
  if (loading) {
    return (
      <div className={cn("overflow-x-auto rounded-lg border border-neutral-200", className)} role="region" aria-label="Data table" aria-busy="true">
        <table className="min-w-full divide-y divide-neutral-200" role="table">
          <thead className={cn("bg-neutral-50", stickyHeader && "sticky top-0 z-10")} role="rowgroup">
            <tr role="row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
                  style={{ width: column.width }}
                  role="columnheader"
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200" role="rowgroup">
            {/* Skeleton rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} role="row">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      compact ? "px-4 py-2" : "px-6 py-4",
                      "text-sm text-neutral-900"
                    )}
                    role="cell"
                  >
                    <div className="h-4 bg-neutral-200 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <span className="sr-only">Loading data...</span>
      </div>
    )
  }

  // Render empty state
  if (data.length === 0) {
    return (
      <div className={cn("overflow-x-auto rounded-lg border border-neutral-200", className)} role="region" aria-label="Data table">
        <table className="min-w-full divide-y divide-neutral-200" role="table">
          <thead className={cn("bg-neutral-50", stickyHeader && "sticky top-0 z-10")} role="rowgroup">
            <tr role="row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
                  style={{ width: column.width }}
                  role="columnheader"
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white" role="rowgroup">
            <tr role="row">
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-sm text-neutral-500"
                role="cell"
              >
                {emptyMessage}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  // Render data table with horizontal scroll on mobile
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-neutral-200", className)} role="region" aria-label="Data table">
      <table className="min-w-full divide-y divide-neutral-200" role="table">
        <thead className={cn("bg-neutral-50", stickyHeader && "sticky top-0 z-10")} role="rowgroup">
          <tr role="row">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-6 py-3 text-xs font-medium text-neutral-700 uppercase tracking-wider",
                  column.align === 'center' && "text-center",
                  column.align === 'right' && "text-right",
                  column.align !== 'center' && column.align !== 'right' && "text-left"
                )}
                style={{ width: column.width }}
                role="columnheader"
                scope="col"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200" role="rowgroup">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                striped && rowIndex % 2 === 1 && "bg-neutral-50",
                hoverable && "hover:bg-primary-50 transition-colors",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(row)}
              role="row"
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={onRowClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onRowClick(row)
                }
              } : undefined}
            >
              {columns.map((column) => {
                const cellContent = column.render
                  ? column.render(row)
                  : row[column.key]

                return (
                  <td
                    key={column.key}
                    className={cn(
                      compact ? "px-4 py-2" : "px-6 py-4",
                      "text-sm text-neutral-900",
                      column.align === 'center' && "text-center",
                      column.align === 'right' && "text-right"
                    )}
                    role="cell"
                  >
                    {cellContent}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
