import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DataTable, TableColumn } from '../table'

// Mock the useIsMobile hook
jest.mock('../../../hooks/useBreakpoint', () => ({
  useIsMobile: jest.fn(() => false),
  useMediaQuery: jest.fn(() => true),
  useIsDesktop: jest.fn(() => true),
  useIsTablet: jest.fn(() => false),
  useBreakpoint: jest.fn(() => 'lg'),
}))

interface TestData {
  id: number
  name: string
  email: string
  status: string
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
]

const columns: TableColumn<TestData>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
]

describe('DataTable - Mobile Optimizations', () => {
  let originalInnerWidth: number

  beforeEach(() => {
    originalInnerWidth = window.innerWidth
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
    jest.clearAllMocks()
  })

  describe('Horizontal Scroll', () => {
    it('should render table with overflow-x-auto for horizontal scrolling', () => {
      const { container } = render(
        <DataTable columns={columns} data={testData} />
      )

      const scrollContainer = container.querySelector('.overflow-x-auto')
      expect(scrollContainer).toBeInTheDocument()
    })

    it('should apply min-w-full to table for proper scrolling', () => {
      const { container } = render(
        <DataTable columns={columns} data={testData} />
      )

      const table = container.querySelector('table')
      expect(table).toHaveClass('min-w-full')
    })

    it('should maintain table structure on small screens', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // Mobile width
      })

      render(<DataTable columns={columns} data={testData} />)

      // Table should still render with all columns
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
    })
  })

  describe('Mobile Card View', () => {
    beforeEach(() => {
      // Mock mobile viewport
      const { useIsMobile } = require('../../../hooks/useBreakpoint')
      useIsMobile.mockReturnValue(true)
    })

    it('should render card view on mobile when mobileCardView is enabled', () => {
      const { container } = render(
        <DataTable columns={columns} data={testData} mobileCardView />
      )

      // Should not render table element
      expect(container.querySelector('table')).not.toBeInTheDocument()

      // Should render cards
      const cards = container.querySelectorAll('.rounded-lg.border')
      expect(cards.length).toBe(testData.length)
    })

    it('should display all column data in card view', () => {
      render(<DataTable columns={columns} data={testData} mobileCardView />)

      // Check first card has all data (using getAllByText since labels repeat)
      expect(screen.getAllByText('Name').length).toBeGreaterThan(0)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getAllByText('Email').length).toBeGreaterThan(0)
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
      expect(screen.getAllByText('Status').length).toBeGreaterThan(0)
      expect(screen.getAllByText('active').length).toBeGreaterThan(0)
    })

    it('should render column headers as labels in card view', () => {
      const { container } = render(
        <DataTable columns={columns} data={testData} mobileCardView />
      )

      // Headers should be rendered as uppercase labels
      const labels = container.querySelectorAll('.uppercase.tracking-wider')
      expect(labels.length).toBeGreaterThan(0)
    })

    it('should apply hover effects in card view when hoverable is true', () => {
      const { container } = render(
        <DataTable columns={columns} data={testData} mobileCardView hoverable />
      )

      const cards = container.querySelectorAll('.rounded-lg.border')
      cards.forEach((card) => {
        expect(card).toHaveClass('hover:shadow-md')
      })
    })

    it('should make cards clickable when onRowClick is provided', () => {
      const handleRowClick = jest.fn()
      const { container } = render(
        <DataTable
          columns={columns}
          data={testData}
          mobileCardView
          onRowClick={handleRowClick}
        />
      )

      const cards = container.querySelectorAll('.cursor-pointer')
      expect(cards.length).toBe(testData.length)
    })

    it('should render loading skeleton in card view', () => {
      const { container } = render(
        <DataTable columns={columns} data={[]} loading mobileCardView />
      )

      // Should render skeleton cards
      const skeletonCards = container.querySelectorAll('.animate-pulse')
      expect(skeletonCards.length).toBeGreaterThan(0)
    })

    it('should render empty state in card view', () => {
      render(
        <DataTable
          columns={columns}
          data={[]}
          emptyMessage="No data found"
          mobileCardView
        />
      )

      expect(screen.getByText('No data found')).toBeInTheDocument()
    })

    it('should use table view on desktop even with mobileCardView enabled', () => {
      const { useIsMobile } = require('../../../hooks/useBreakpoint')
      useIsMobile.mockReturnValue(false)

      const { container } = render(
        <DataTable columns={columns} data={testData} mobileCardView />
      )

      // Should render table on desktop
      expect(container.querySelector('table')).toBeInTheDocument()
    })
  })

  describe('Sticky Headers', () => {
    it('should apply sticky positioning to headers when stickyHeader is enabled', () => {
      const { container } = render(
        <DataTable columns={columns} data={testData} stickyHeader />
      )

      const thead = container.querySelector('thead')
      expect(thead).toHaveClass('sticky')
      expect(thead).toHaveClass('top-0')
      expect(thead).toHaveClass('z-10')
    })

    it('should maintain background color on sticky headers', () => {
      const { container } = render(
        <DataTable columns={columns} data={testData} stickyHeader />
      )

      const thead = container.querySelector('thead')
      expect(thead).toHaveClass('bg-neutral-50')
    })

    it('should not apply sticky positioning when stickyHeader is false', () => {
      const { container } = render(
        <DataTable columns={columns} data={testData} stickyHeader={false} />
      )

      const thead = container.querySelector('thead')
      expect(thead).not.toHaveClass('sticky')
    })

    it('should apply sticky headers in loading state', () => {
      const { container } = render(
        <DataTable columns={columns} data={[]} loading stickyHeader />
      )

      const thead = container.querySelector('thead')
      expect(thead).toHaveClass('sticky')
    })

    it('should apply sticky headers in empty state', () => {
      const { container } = render(
        <DataTable columns={columns} data={[]} stickyHeader />
      )

      const thead = container.querySelector('thead')
      expect(thead).toHaveClass('sticky')
    })
  })

  describe('Action Button Accessibility', () => {
    it('should render action buttons with proper touch targets', () => {
      const columnsWithActions: TableColumn<TestData>[] = [
        ...columns,
        {
          key: 'actions',
          header: 'Actions',
          render: () => (
            <button className="min-h-[44px] min-w-[44px]">Edit</button>
          ),
        },
      ]

      const { container } = render(
        <DataTable columns={columnsWithActions} data={testData} />
      )

      const actionButtons = container.querySelectorAll('button')
      actionButtons.forEach((button) => {
        // Buttons should have minimum touch target size (44px)
        expect(button).toHaveClass('min-h-[44px]')
        expect(button).toHaveClass('min-w-[44px]')
      })
    })

    it('should keep action buttons accessible in card view', () => {
      const { useIsMobile } = require('../../../hooks/useBreakpoint')
      useIsMobile.mockReturnValue(true)

      const columnsWithActions: TableColumn<TestData>[] = [
        ...columns,
        {
          key: 'actions',
          header: 'Actions',
          render: () => <button>Edit</button>,
        },
      ]

      render(
        <DataTable
          columns={columnsWithActions}
          data={testData}
          mobileCardView
        />
      )

      // Action buttons should be rendered in each card
      const editButtons = screen.getAllByText('Edit')
      expect(editButtons.length).toBe(testData.length)
    })
  })

  describe('Combined Features', () => {
    it('should work with all mobile features enabled', () => {
      const { useIsMobile } = require('../../../hooks/useBreakpoint')
      useIsMobile.mockReturnValue(true)

      const { container } = render(
        <DataTable
          columns={columns}
          data={testData}
          mobileCardView
          stickyHeader
          hoverable
          striped
          compact
        />
      )

      // Should render card view on mobile
      expect(container.querySelector('table')).not.toBeInTheDocument()
      const cards = container.querySelectorAll('.rounded-lg.border')
      expect(cards.length).toBe(testData.length)
    })

    it('should handle responsive transitions gracefully', () => {
      const { useIsMobile } = require('../../../hooks/useBreakpoint')
      
      // Start on desktop
      useIsMobile.mockReturnValue(false)
      const { container, rerender } = render(
        <DataTable columns={columns} data={testData} mobileCardView />
      )

      // Should show table
      expect(container.querySelector('table')).toBeInTheDocument()

      // Switch to mobile
      useIsMobile.mockReturnValue(true)
      rerender(<DataTable columns={columns} data={testData} mobileCardView />)

      // Should show cards
      expect(container.querySelector('table')).not.toBeInTheDocument()
      const cards = container.querySelectorAll('.rounded-lg.border')
      expect(cards.length).toBe(testData.length)
    })
  })

  describe('Custom Rendering in Mobile View', () => {
    it('should respect custom render functions in card view', () => {
      const { useIsMobile } = require('../../../hooks/useBreakpoint')
      useIsMobile.mockReturnValue(true)

      const customColumns: TableColumn<TestData>[] = [
        ...columns,
        {
          key: 'custom',
          header: 'Custom',
          render: (row) => <span data-testid="custom-render">{row.name.toUpperCase()}</span>,
        },
      ]

      render(
        <DataTable columns={customColumns} data={testData} mobileCardView />
      )

      const customElements = screen.getAllByTestId('custom-render')
      expect(customElements.length).toBe(testData.length)
      expect(customElements[0]).toHaveTextContent('JOHN DOE')
    })
  })
})
