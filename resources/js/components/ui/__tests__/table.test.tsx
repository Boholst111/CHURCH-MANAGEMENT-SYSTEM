import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

interface TestData {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
}

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
]

const basicColumns: TableColumn<TestData>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
]

describe('DataTable Component', () => {
  describe('Basic Rendering', () => {
    it('renders table with data', () => {
      render(<DataTable columns={basicColumns} data={mockData} />)
      
      // Check headers
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      
      // Check data
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })

    it('renders correct number of rows', () => {
      const { container } = render(<DataTable columns={basicColumns} data={mockData} />)
      const rows = container.querySelectorAll('tbody tr')
      expect(rows).toHaveLength(mockData.length)
    })

    it('renders correct number of columns', () => {
      const { container } = render(<DataTable columns={basicColumns} data={mockData} />)
      const headerCells = container.querySelectorAll('thead th')
      expect(headerCells).toHaveLength(basicColumns.length)
    })
  })

  describe('Column Configuration', () => {
    it('applies custom width to columns', () => {
      const columnsWithWidth: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', width: '200px' },
        { key: 'email', header: 'Email' },
      ]
      
      const { container } = render(
        <DataTable columns={columnsWithWidth} data={mockData} />
      )
      
      const firstHeader = container.querySelector('thead th')
      expect(firstHeader).toHaveStyle({ width: '200px' })
    })

    it('applies text alignment to columns', () => {
      const columnsWithAlign: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', align: 'left' },
        { key: 'email', header: 'Email', align: 'center' },
        { key: 'status', header: 'Status', align: 'right' },
      ]
      
      const { container } = render(
        <DataTable columns={columnsWithAlign} data={mockData} />
      )
      
      const headers = container.querySelectorAll('thead th')
      expect(headers[0]).toHaveClass('text-left')
      expect(headers[1]).toHaveClass('text-center')
      expect(headers[2]).toHaveClass('text-right')
    })

    it('uses custom render function when provided', () => {
      const columnsWithRender: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name' },
        {
          key: 'status',
          header: 'Status',
          render: (row) => (
            <span className="custom-status">{row.status.toUpperCase()}</span>
          ),
        },
      ]
      
      render(<DataTable columns={columnsWithRender} data={mockData} />)
      
      // Use getAllByText since there are multiple "ACTIVE" statuses
      const activeElements = screen.getAllByText('ACTIVE')
      expect(activeElements.length).toBe(2) // Two users with active status
      expect(screen.getByText('INACTIVE')).toBeInTheDocument()
    })
  })

  describe('Visual Variants', () => {
    it('applies striped styling when striped prop is true', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} striped />
      )
      
      const rows = container.querySelectorAll('tbody tr')
      // Second row (index 1) should have striped background
      expect(rows[1]).toHaveClass('bg-neutral-50')
    })

    it('applies hoverable styling when hoverable prop is true', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} hoverable />
      )
      
      const rows = container.querySelectorAll('tbody tr')
      rows.forEach((row) => {
        expect(row).toHaveClass('hover:bg-primary-50')
      })
    })

    it('applies compact styling when compact prop is true', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} compact />
      )
      
      const cells = container.querySelectorAll('tbody td')
      cells.forEach((cell) => {
        expect(cell).toHaveClass('px-4', 'py-2')
      })
    })

    it('applies default padding when compact is false', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} compact={false} />
      )
      
      const cells = container.querySelectorAll('tbody td')
      cells.forEach((cell) => {
        expect(cell).toHaveClass('px-6', 'py-4')
      })
    })
  })

  describe('Loading State', () => {
    it('renders skeleton rows when loading', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={[]} loading />
      )
      
      // Should render 5 skeleton rows
      const skeletonRows = container.querySelectorAll('tbody tr')
      expect(skeletonRows).toHaveLength(5)
      
      // Each skeleton cell should have loading animation
      const skeletonCells = container.querySelectorAll('tbody td div')
      skeletonCells.forEach((cell) => {
        expect(cell).toHaveClass('animate-pulse')
      })
    })

    it('renders headers even when loading', () => {
      render(<DataTable columns={basicColumns} data={[]} loading />)
      
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
    })

    it('does not render actual data when loading', () => {
      render(<DataTable columns={basicColumns} data={mockData} loading />)
      
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
      expect(screen.queryByText('jane@example.com')).not.toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('renders empty message when data is empty', () => {
      render(<DataTable columns={basicColumns} data={[]} />)
      
      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('renders custom empty message', () => {
      const customMessage = 'No users found. Try adjusting your filters.'
      render(
        <DataTable
          columns={basicColumns}
          data={[]}
          emptyMessage={customMessage}
        />
      )
      
      expect(screen.getByText(customMessage)).toBeInTheDocument()
    })

    it('renders headers even when empty', () => {
      render(<DataTable columns={basicColumns} data={[]} />)
      
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
    })

    it('empty message spans all columns', () => {
      const { container } = render(<DataTable columns={basicColumns} data={[]} />)
      
      const emptyCell = container.querySelector('tbody td')
      expect(emptyCell).toHaveAttribute('colSpan', String(basicColumns.length))
    })
  })

  describe('Row Click Handler', () => {
    it('calls onRowClick when row is clicked', () => {
      const handleRowClick = jest.fn()
      const { container } = render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          onRowClick={handleRowClick}
        />
      )
      
      const firstRow = container.querySelector('tbody tr')
      if (firstRow) {
        fireEvent.click(firstRow)
      }
      
      expect(handleRowClick).toHaveBeenCalledTimes(1)
      expect(handleRowClick).toHaveBeenCalledWith(mockData[0])
    })

    it('applies cursor-pointer class when onRowClick is provided', () => {
      const handleRowClick = jest.fn()
      const { container } = render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          onRowClick={handleRowClick}
        />
      )
      
      const rows = container.querySelectorAll('tbody tr')
      rows.forEach((row) => {
        expect(row).toHaveClass('cursor-pointer')
      })
    })

    it('does not apply cursor-pointer when onRowClick is not provided', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} />
      )
      
      const rows = container.querySelectorAll('tbody tr')
      rows.forEach((row) => {
        expect(row).not.toHaveClass('cursor-pointer')
      })
    })
  })

  describe('Custom className', () => {
    it('applies custom className to container', () => {
      const { container } = render(
        <DataTable
          columns={basicColumns}
          data={mockData}
          className="custom-table-class"
        />
      )
      
      const tableContainer = container.querySelector('.custom-table-class')
      expect(tableContainer).toBeInTheDocument()
    })
  })

  describe('Complex Data Scenarios', () => {
    it('handles empty string values', () => {
      const dataWithEmpty: TestData[] = [
        { id: 1, name: '', email: 'test@example.com', status: 'active' },
      ]
      
      render(<DataTable columns={basicColumns} data={dataWithEmpty} />)
      
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })

    it('handles special characters in data', () => {
      const dataWithSpecialChars: TestData[] = [
        {
          id: 1,
          name: "O'Brien & Sons",
          email: 'test+tag@example.com',
          status: 'active',
        },
      ]
      
      render(<DataTable columns={basicColumns} data={dataWithSpecialChars} />)
      
      expect(screen.getByText("O'Brien & Sons")).toBeInTheDocument()
      expect(screen.getByText('test+tag@example.com')).toBeInTheDocument()
    })

    it('handles large datasets', () => {
      const largeData: TestData[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: i % 2 === 0 ? 'active' : 'inactive',
      }))
      
      const { container } = render(
        <DataTable columns={basicColumns} data={largeData} />
      )
      
      const rows = container.querySelectorAll('tbody tr')
      expect(rows).toHaveLength(100)
    })
  })

  describe('Accessibility', () => {
    it('renders table with proper semantic structure', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} />
      )
      
      expect(container.querySelector('table')).toBeInTheDocument()
      expect(container.querySelector('thead')).toBeInTheDocument()
      expect(container.querySelector('tbody')).toBeInTheDocument()
    })

    it('uses th elements for headers', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} />
      )
      
      const headers = container.querySelectorAll('thead th')
      expect(headers).toHaveLength(basicColumns.length)
    })

    it('uses td elements for data cells', () => {
      const { container } = render(
        <DataTable columns={basicColumns} data={mockData} />
      )
      
      const cells = container.querySelectorAll('tbody td')
      expect(cells.length).toBeGreaterThan(0)
    })
  })
})
