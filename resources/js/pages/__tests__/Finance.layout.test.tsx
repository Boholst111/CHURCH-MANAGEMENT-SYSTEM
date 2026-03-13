import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Finance from '../Finance';

/**
 * Finance Page Layout Tests
 * 
 * Tests the Finance page layout structure including:
 * - Page header with title and subtitle
 * - Tab navigation without Reports tab
 * - Content area for active tab
 * - Tab switching functionality
 * 
 * Feature: finance-reports-consolidation
 * Requirements: 1.1, 1.5
 */

// Mock window.matchMedia for JSDOM
Object.defineProperty(window, 'matchMedia', {
  configurable: true,
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
});

describe('Finance Page Layout', () => {
  it('renders page header with title and subtitle', () => {
    render(<Finance />);
    
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Manage church finances, offerings, and expenses')).toBeInTheDocument();
  });

  it('renders exactly 5 tabs without Reports tab', () => {
    render(<Finance />);
    
    const expectedTabs = [
      'Overview',
      'Offerings',
      'Expenses',
      'Budgets',
      'Settings',
    ];

    expectedTabs.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });

    // Verify Reports tab is NOT present
    expect(screen.queryByText('Reports')).not.toBeInTheDocument();
  });

  it('does not include reports in TabType', () => {
    // This is a compile-time check, but we can verify runtime behavior
    const { container } = render(<Finance />);
    
    // Count the number of tab buttons
    const tabButtons = container.querySelectorAll('nav button');
    expect(tabButtons.length).toBe(5);
  });

  it('displays Overview tab content by default', () => {
    render(<Finance />);
    
    // Overview component should be rendered by default
    // We can verify by checking that the activeTab is set to 'overview'
    const overviewButton = screen.getByText('Overview').closest('button');
    expect(overviewButton?.className).toContain('border-primary-600');
    expect(overviewButton?.className).toContain('text-primary-600');
  });

  it('switches to Offerings tab when clicked', () => {
    render(<Finance />);
    
    const offeringsButton = screen.getByText('Offerings');
    fireEvent.click(offeringsButton);
    
    // Verify active styling
    const button = offeringsButton.closest('button');
    expect(button?.className).toContain('border-primary-600');
    expect(button?.className).toContain('text-primary-600');
  });

  it('switches to Expenses tab when clicked', () => {
    render(<Finance />);
    
    const expensesButton = screen.getByText('Expenses');
    fireEvent.click(expensesButton);
    
    // Verify active styling
    const button = expensesButton.closest('button');
    expect(button?.className).toContain('border-primary-600');
    expect(button?.className).toContain('text-primary-600');
  });

  it('switches to Budgets tab when clicked', () => {
    render(<Finance />);
    
    const budgetsButton = screen.getByText('Budgets');
    fireEvent.click(budgetsButton);
    
    // Verify active styling
    const button = budgetsButton.closest('button');
    expect(button?.className).toContain('border-primary-600');
    expect(button?.className).toContain('text-primary-600');
  });

  it('switches to Settings tab when clicked', () => {
    render(<Finance />);
    
    const settingsButton = screen.getByText('Settings');
    fireEvent.click(settingsButton);
    
    // Verify active styling
    const button = settingsButton.closest('button');
    expect(button?.className).toContain('border-primary-600');
    expect(button?.className).toContain('text-primary-600');
  });

  it('renders tab icons', () => {
    const { container } = render(<Finance />);
    
    // Check that SVG icons are rendered (lucide-react renders as SVG)
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('renders action buttons in header', () => {
    render(<Finance />);
    
    expect(screen.getByText('Add Expense')).toBeInTheDocument();
    expect(screen.getByText('Record Offering')).toBeInTheDocument();
  });

  it('applies active state styling to selected tab', () => {
    const { container } = render(<Finance />);
    
    // Find the navigation
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    
    // The first button should have active styling (Overview is default)
    const firstButton = nav?.querySelector('button');
    expect(firstButton?.className).toContain('border-primary-600');
    expect(firstButton?.className).toContain('text-primary-600');
  });

  it('maintains tab state across interactions', () => {
    render(<Finance />);
    
    // Switch to Offerings
    const offeringsButton = screen.getByText('Offerings');
    fireEvent.click(offeringsButton);
    expect(offeringsButton.closest('button')?.className).toContain('border-primary-600');
    
    // Switch to Budgets
    const budgetsButton = screen.getByText('Budgets');
    fireEvent.click(budgetsButton);
    expect(budgetsButton.closest('button')?.className).toContain('border-primary-600');
    
    // Offerings should no longer be active
    expect(offeringsButton.closest('button')?.className).not.toContain('border-primary-600');
  });

  it('has correct tab order', () => {
    const { container } = render(<Finance />);
    
    const nav = container.querySelector('nav');
    const buttons = nav?.querySelectorAll('button');
    
    expect(buttons?.[0]?.textContent).toContain('Overview');
    expect(buttons?.[1]?.textContent).toContain('Offerings');
    expect(buttons?.[2]?.textContent).toContain('Expenses');
    expect(buttons?.[3]?.textContent).toContain('Budgets');
    expect(buttons?.[4]?.textContent).toContain('Settings');
  });
});
