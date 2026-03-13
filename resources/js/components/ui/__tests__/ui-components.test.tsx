/**
 * Unit tests for UI components
 * Validates that components render correctly with proper styling
 * Requirements: 7.3, 7.4
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'
import { Input } from '../input'
import { Card, CardHeader, CardTitle, CardContent } from '../card'
import { Modal } from '../modal'

describe('UI Components', () => {
  describe('Button', () => {
    it('renders with default variant', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('rounded-lg')
    })

    it('renders with different variants', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-primary-600')

      rerender(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-neutral-100')

      rerender(<Button variant="outline">Outline</Button>)
      expect(screen.getByRole('button')).toHaveClass('border')

      rerender(<Button variant="ghost">Ghost</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-transparent')

      rerender(<Button variant="danger">Danger</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-error-600')
    })

    it('renders with different sizes', () => {
      const { rerender } = render(<Button size="md">Medium</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-10')

      rerender(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-8')

      rerender(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-12')
    })

    it('applies rounded corners', () => {
      render(<Button>Rounded</Button>)
      expect(screen.getByRole('button')).toHaveClass('rounded-lg')
    })

    it('renders with loading state', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
      // Check for spinner icon
      const spinner = button.querySelector('svg')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('animate-spin')
    })

    it('renders with icon on left', () => {
      const icon = <span data-testid="test-icon">Icon</span>
      render(<Button icon={icon} iconPosition="left">With Icon</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('renders with icon on right', () => {
      const icon = <span data-testid="test-icon">Icon</span>
      render(<Button icon={icon} iconPosition="right">With Icon</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('renders with fullWidth prop', () => {
      render(<Button fullWidth>Full Width</Button>)
      expect(screen.getByRole('button')).toHaveClass('w-full')
    })

    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disables button when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('Input', () => {
    it('renders with default styling', () => {
      render(<Input placeholder="Enter text" />)
      const input = screen.getByPlaceholderText(/enter text/i)
      expect(input).toBeInTheDocument()
      expect(input).toHaveClass('rounded-md')
    })

    it('accepts different input types', () => {
      const { rerender } = render(<Input type="text" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'text')

      rerender(<Input type="email" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email')

      rerender(<Input type="password" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'password')
    })

    it('applies consistent spacing and rounded corners', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('rounded-md', 'px-3', 'py-2')
    })
  })

  describe('Card', () => {
    it('renders with header, title, and content', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>Card content goes here</CardContent>
        </Card>
      )

      expect(screen.getByText('Card Title')).toBeInTheDocument()
      expect(screen.getByText('Card content goes here')).toBeInTheDocument()
    })

    it('applies rounded corners and shadow', () => {
      const { container } = render(<Card data-testid="card">Content</Card>)
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('rounded-lg', 'shadow-sm')
    })

    it('applies consistent spacing in header and content', () => {
      const { container } = render(
        <Card>
          <CardHeader data-testid="header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent data-testid="content">Content</CardContent>
        </Card>
      )

      const header = screen.getByTestId('header')
      const content = screen.getByTestId('content')
      
      expect(header).toHaveClass('p-6')
      expect(content).toHaveClass('p-6')
    })
  })

  describe('Modal', () => {
    it('renders when open', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      )

      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(
        <Modal isOpen={false} onClose={() => {}} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      )

      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    })

    it('renders with title, description, and footer', () => {
      render(
        <Modal
          isOpen={true}
          onClose={() => {}}
          title="Modal Title"
          description="Modal description"
          footer={<button>Close</button>}
        >
          <p>Content</p>
        </Modal>
      )

      expect(screen.getByText('Modal Title')).toBeInTheDocument()
      expect(screen.getByText('Modal description')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    })

    it('applies rounded corners', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      )

      // The DialogContent has rounded-lg class
      const content = container.querySelector('[role="dialog"]')
      expect(content).toHaveClass('sm:rounded-lg')
    })
  })

  describe('TypeScript Interfaces', () => {
    it('Button accepts ButtonProps interface', () => {
      const props: React.ComponentProps<typeof Button> = {
        variant: 'default',
        size: 'md',
        children: 'Test',
      }
      render(<Button {...props} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('Input accepts InputProps interface', () => {
      const props: React.ComponentProps<typeof Input> = {
        type: 'text',
        placeholder: 'Test',
      }
      render(<Input {...props} />)
      expect(screen.getByPlaceholderText('Test')).toBeInTheDocument()
    })

    it('Modal accepts ModalProps interface', () => {
      const props: React.ComponentProps<typeof Modal> = {
        isOpen: true,
        onClose: () => {},
        title: 'Test',
        children: <p>Content</p>,
      }
      render(<Modal {...props} />)
      expect(screen.getByText('Test')).toBeInTheDocument()
    })
  })
})
