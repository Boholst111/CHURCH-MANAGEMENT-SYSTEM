import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Pagination } from '../pagination'

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: jest.fn(),
  }

  it('renders pagination component', () => {
    render(<Pagination {...defaultProps} />)
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
  })

  it('displays current range of items', () => {
    render(<Pagination {...defaultProps} />)
    expect(screen.getByText(/Showing/)).toBeInTheDocument()
    // Check for the text content using a function matcher since text is split across elements
    const container = screen.getByText(/Showing/).parentElement
    expect(container).toHaveTextContent('Showing 1 to 10 of 100 items')
  })

  it('calculates correct item range for middle page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />)
    expect(screen.getByText('41')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('calculates correct item range for last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />)
    expect(screen.getByText('91')).toBeInTheDocument()
    // Check for the full text content
    const container = screen.getByText(/Showing/).parentElement
    expect(container).toHaveTextContent('Showing 91 to 100 of 100 items')
  })

  it('disables previous and first buttons on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)
    
    const firstButton = screen.getByLabelText('Go to first page')
    const previousButton = screen.getByLabelText('Go to previous page')
    
    expect(firstButton).toBeDisabled()
    expect(previousButton).toBeDisabled()
  })

  it('disables next and last buttons on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />)
    
    const nextButton = screen.getByLabelText('Go to next page')
    const lastButton = screen.getByLabelText('Go to last page')
    
    expect(nextButton).toBeDisabled()
    expect(lastButton).toBeDisabled()
  })

  it('calls onPageChange when clicking next button', () => {
    const onPageChange = jest.fn()
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />)
    
    const nextButton = screen.getByLabelText('Go to next page')
    fireEvent.click(nextButton)
    
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when clicking previous button', () => {
    const onPageChange = jest.fn()
    render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
    
    const previousButton = screen.getByLabelText('Go to previous page')
    fireEvent.click(previousButton)
    
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('calls onPageChange when clicking first button', () => {
    const onPageChange = jest.fn()
    render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
    
    const firstButton = screen.getByLabelText('Go to first page')
    fireEvent.click(firstButton)
    
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange when clicking last button', () => {
    const onPageChange = jest.fn()
    render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
    
    const lastButton = screen.getByLabelText('Go to last page')
    fireEvent.click(lastButton)
    
    expect(onPageChange).toHaveBeenCalledWith(10)
  })

  it('calls onPageChange when clicking a page number', () => {
    const onPageChange = jest.fn()
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />)
    
    const pageButton = screen.getByLabelText('Go to page 3')
    fireEvent.click(pageButton)
    
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('highlights current page button', () => {
    render(<Pagination {...defaultProps} currentPage={3} />)
    
    const currentPageButton = screen.getByLabelText('Go to page 3')
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
  })

  it('shows ellipsis for large page counts', () => {
    render(<Pagination {...defaultProps} totalPages={50} totalItems={500} currentPage={25} />)
    
    // Should show ellipsis (MoreHorizontal icons)
    const ellipsis = screen.getAllByRole('generic', { hidden: true })
    const hasEllipsis = ellipsis.some(el => el.querySelector('svg'))
    expect(hasEllipsis).toBe(true)
  })

  it('shows all page numbers when total pages is small', () => {
    render(<Pagination {...defaultProps} totalPages={5} totalItems={50} />)
    
    // Should show all 5 page buttons
    expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to page 3')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to page 4')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to page 5')).toBeInTheDocument()
  })

  it('calls onItemsPerPageChange when changing items per page', () => {
    const onItemsPerPageChange = jest.fn()
    render(
      <Pagination 
        {...defaultProps} 
        onItemsPerPageChange={onItemsPerPageChange}
        showItemsPerPage={true}
      />
    )
    
    // Find the select component by its current value text
    const select = screen.getByText('10 per page').closest('[role="combobox"]')
    fireEvent.click(select!)
    
    // Click on the 50 per page option
    const option50 = screen.getByText('50 per page')
    fireEvent.click(option50)
    
    expect(onItemsPerPageChange).toHaveBeenCalledWith(50)
  })

  it('hides items per page selector when showItemsPerPage is false', () => {
    render(<Pagination {...defaultProps} showItemsPerPage={false} />)
    
    expect(screen.queryByRole('combobox', { name: 'Items per page' })).not.toBeInTheDocument()
  })

  it('hides total items display when showTotalItems is false', () => {
    render(<Pagination {...defaultProps} showTotalItems={false} />)
    
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument()
  })

  it('hides page numbers when showPageNumbers is false', () => {
    render(<Pagination {...defaultProps} showPageNumbers={false} />)
    
    expect(screen.queryByLabelText('Go to page 1')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument()
  })

  it('disables all buttons when disabled prop is true', () => {
    render(<Pagination {...defaultProps} currentPage={5} disabled={true} />)
    
    const firstButton = screen.getByLabelText('Go to first page')
    const previousButton = screen.getByLabelText('Go to previous page')
    const nextButton = screen.getByLabelText('Go to next page')
    const lastButton = screen.getByLabelText('Go to last page')
    
    expect(firstButton).toBeDisabled()
    expect(previousButton).toBeDisabled()
    expect(nextButton).toBeDisabled()
    expect(lastButton).toBeDisabled()
  })

  it('handles keyboard navigation - ArrowRight', () => {
    const onPageChange = jest.fn()
    const { container } = render(<Pagination {...defaultProps} onPageChange={onPageChange} />)
    
    const nav = container.querySelector('[role="navigation"]')
    fireEvent.keyDown(nav!, { key: 'ArrowRight' })
    
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('handles keyboard navigation - ArrowLeft', () => {
    const onPageChange = jest.fn()
    const { container } = render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
    
    const nav = container.querySelector('[role="navigation"]')
    fireEvent.keyDown(nav!, { key: 'ArrowLeft' })
    
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('handles keyboard navigation - Home', () => {
    const onPageChange = jest.fn()
    const { container } = render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
    
    const nav = container.querySelector('[role="navigation"]')
    fireEvent.keyDown(nav!, { key: 'Home' })
    
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('handles keyboard navigation - End', () => {
    const onPageChange = jest.fn()
    const { container } = render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)
    
    const nav = container.querySelector('[role="navigation"]')
    fireEvent.keyDown(nav!, { key: 'End' })
    
    expect(onPageChange).toHaveBeenCalledWith(10)
  })

  it('does not navigate beyond first page with keyboard', () => {
    const onPageChange = jest.fn()
    const { container } = render(<Pagination {...defaultProps} currentPage={1} onPageChange={onPageChange} />)
    
    const nav = container.querySelector('[role="navigation"]')
    fireEvent.keyDown(nav!, { key: 'ArrowLeft' })
    
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('does not navigate beyond last page with keyboard', () => {
    const onPageChange = jest.fn()
    const { container } = render(<Pagination {...defaultProps} currentPage={10} onPageChange={onPageChange} />)
    
    const nav = container.querySelector('[role="navigation"]')
    fireEvent.keyDown(nav!, { key: 'ArrowRight' })
    
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('shows 0 to 0 of 0 items when totalItems is 0', () => {
    render(<Pagination {...defaultProps} totalItems={0} totalPages={0} />)
    
    const container = screen.getByText(/Showing/).parentElement
    expect(container).toHaveTextContent('Showing 0 to 0 of 0 items')
  })

  it('respects custom itemsPerPageOptions', () => {
    render(
      <Pagination 
        {...defaultProps} 
        itemsPerPageOptions={[5, 15, 30]}
        showItemsPerPage={true}
        onItemsPerPageChange={jest.fn()}
      />
    )
    
    // The select shows the current value (10) which is not in the custom options, so it shows placeholder
    const select = screen.getAllByRole('combobox')[0]
    fireEvent.click(select)
    
    expect(screen.getByText('5 per page')).toBeInTheDocument()
    expect(screen.getByText('15 per page')).toBeInTheDocument()
    expect(screen.getByText('30 per page')).toBeInTheDocument()
  })

  it('respects custom maxPageButtons', () => {
    render(
      <Pagination 
        {...defaultProps} 
        totalPages={20}
        totalItems={200}
        currentPage={10}
        maxPageButtons={5}
      />
    )
    
    // With maxPageButtons=5, should show fewer page buttons
    const pageButtons = screen.getAllByRole('button').filter(
      button => button.getAttribute('aria-label')?.startsWith('Go to page')
    )
    
    // Should have limited number of page buttons (not all 20)
    expect(pageButtons.length).toBeLessThan(20)
  })
})

