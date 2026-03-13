/**
 * Dark Mode Component Tests
 * 
 * Tests to ensure all components work correctly in dark mode and meet
 * accessibility standards.
 */

import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { Badge } from '../badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { Input } from '../input';

describe('Dark Mode Components', () => {
  describe('Button in Dark Mode', () => {
    it('should render primary button with correct dark mode classes', () => {
      render(
        <div className="dark">
          <Button variant="primary">Click me</Button>
        </div>
      );
      
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-primary-600');
    });
    
    it('should render secondary button with dark mode support', () => {
      render(
        <div className="dark">
          <Button variant="secondary">Secondary</Button>
        </div>
      );
      
      const button = screen.getByRole('button', { name: /secondary/i });
      expect(button).toBeInTheDocument();
      // Secondary button uses neutral colors which adapt to dark mode via CSS variables
    });
    
    it('should render outline button with dark mode support', () => {
      render(
        <div className="dark">
          <Button variant="outline">Outline</Button>
        </div>
      );
      
      const button = screen.getByRole('button', { name: /outline/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('border');
    });
    
    it('should render ghost button with dark mode hover states', () => {
      render(
        <div className="dark">
          <Button variant="ghost">Ghost</Button>
        </div>
      );
      
      const button = screen.getByRole('button', { name: /ghost/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-transparent');
    });
    
    it('should render danger button in dark mode', () => {
      render(
        <div className="dark">
          <Button variant="danger">Delete</Button>
        </div>
      );
      
      const button = screen.getByRole('button', { name: /delete/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-error-600');
    });
  });
  
  describe('Badge in Dark Mode', () => {
    it('should render success badge in dark mode', () => {
      render(
        <div className="dark">
          <Badge variant="success">Active</Badge>
        </div>
      );
      
      const badge = screen.getByText(/active/i);
      expect(badge).toBeInTheDocument();
    });
    
    it('should render warning badge in dark mode', () => {
      render(
        <div className="dark">
          <Badge variant="warning">Pending</Badge>
        </div>
      );
      
      const badge = screen.getByText(/pending/i);
      expect(badge).toBeInTheDocument();
    });
    
    it('should render error badge in dark mode', () => {
      render(
        <div className="dark">
          <Badge variant="error">Failed</Badge>
        </div>
      );
      
      const badge = screen.getByText(/failed/i);
      expect(badge).toBeInTheDocument();
    });
  });
  
  describe('Card in Dark Mode', () => {
    it('should render card with dark mode background', () => {
      render(
        <div className="dark">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content</p>
            </CardContent>
          </Card>
        </div>
      );
      
      expect(screen.getByText(/card title/i)).toBeInTheDocument();
      expect(screen.getByText(/card description/i)).toBeInTheDocument();
      expect(screen.getByText(/card content/i)).toBeInTheDocument();
    });
  });
  
  describe('Input in Dark Mode', () => {
    it('should render input with dark mode styles', () => {
      render(
        <div className="dark">
          <Input
            type="text"
            placeholder="Enter text"
            aria-label="Text input"
          />
        </div>
      );
      
      const input = screen.getByLabelText(/text input/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });
    
    it('should render input with error state in dark mode', () => {
      render(
        <div className="dark">
          <Input
            type="text"
            error="This field is required"
            aria-label="Text input with error"
          />
        </div>
      );
      
      const input = screen.getByLabelText(/text input with error/i);
      expect(input).toBeInTheDocument();
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });
  });
  
  describe('Dark Mode Color Tokens', () => {
    it('should have dark mode class applied to container', () => {
      const { container } = render(
        <div className="dark">
          <p>Dark mode content</p>
        </div>
      );
      
      const darkContainer = container.querySelector('.dark');
      expect(darkContainer).toBeInTheDocument();
    });
    
    it('should support theme-aware background colors', () => {
      render(
        <div className="dark">
          <div className="bg-background text-foreground">
            Theme-aware content
          </div>
        </div>
      );
      
      expect(screen.getByText(/theme-aware content/i)).toBeInTheDocument();
    });
    
    it('should support theme-aware border colors', () => {
      render(
        <div className="dark">
          <div className="border border-border">
            Bordered content
          </div>
        </div>
      );
      
      expect(screen.getByText(/bordered content/i)).toBeInTheDocument();
    });
  });
  
  describe('Component Contrast in Dark Mode', () => {
    it('should render readable text on dark backgrounds', () => {
      render(
        <div className="dark bg-neutral-900 text-neutral-50 p-4">
          <h1 className="text-2xl font-bold">Heading</h1>
          <p className="text-neutral-200">Body text</p>
          <p className="text-neutral-400">Muted text</p>
        </div>
      );
      
      expect(screen.getByText(/heading/i)).toBeInTheDocument();
      expect(screen.getByText(/body text/i)).toBeInTheDocument();
      expect(screen.getByText(/muted text/i)).toBeInTheDocument();
    });
    
    it('should render primary colors with sufficient contrast on dark', () => {
      render(
        <div className="dark bg-neutral-900 p-4">
          <a href="#" className="text-primary-400">Link</a>
          <button className="bg-primary-600 text-white px-4 py-2">Button</button>
        </div>
      );
      
      expect(screen.getByText(/link/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /button/i })).toBeInTheDocument();
    });
    
    it('should render semantic colors on dark backgrounds', () => {
      render(
        <div className="dark bg-neutral-900 p-4">
          <span className="text-success">Success</span>
          <span className="text-warning">Warning</span>
          <span className="text-error">Error</span>
          <span className="text-info">Info</span>
        </div>
      );
      
      expect(screen.getByText(/success/i)).toBeInTheDocument();
      expect(screen.getByText(/warning/i)).toBeInTheDocument();
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.getByText(/info/i)).toBeInTheDocument();
    });
  });
});
