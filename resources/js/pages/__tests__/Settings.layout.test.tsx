import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../Settings';

/**
 * Settings Page Layout Tests
 * 
 * Tests the Settings page layout structure including:
 * - Page header with title and subtitle
 * - Vertical tab navigation (desktop)
 * - Horizontal tab navigation (mobile)
 * - Content area for active tab
 * - Tab switching functionality
 * 
 * Design Reference: Settings Page Design section
 */

describe('Settings Page Layout', () => {
  it('renders page header with title and subtitle', () => {
    render(<Settings />);
    
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Configure system preferences and options')).toBeInTheDocument();
  });

  it('renders all tab navigation items', () => {
    render(<Settings />);
    
    const tabs = [
      'General',
      'Church Information',
      'Finance Settings',
      'Email & Notifications',
      'Security',
      'Backup & Restore',
      'Integrations',
    ];

    tabs.forEach(tab => {
      // Each tab appears twice (desktop and mobile navigation)
      const elements = screen.getAllByText(tab);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('displays General tab content by default', () => {
    render(<Settings />);
    
    expect(screen.getByText('General Settings')).toBeInTheDocument();
    expect(screen.getByText('Configure application preferences and display settings.')).toBeInTheDocument();
  });

  it('switches to Church Information tab when clicked', () => {
    render(<Settings />);
    
    // Click on Church Information tab (get first occurrence for desktop nav)
    const churchInfoButtons = screen.getAllByText('Church Information');
    fireEvent.click(churchInfoButtons[0]);
    
    expect(screen.getByText('Manage your church\'s basic information and contact details.')).toBeInTheDocument();
  });

  it('switches to Finance Settings tab when clicked', () => {
    render(<Settings />);
    
    const financeButtons = screen.getAllByText('Finance Settings');
    fireEvent.click(financeButtons[0]);
    
    expect(screen.getByText('Configure finance-related settings and categories.')).toBeInTheDocument();
  });

  it('switches to Email & Notifications tab when clicked', () => {
    render(<Settings />);
    
    const emailButtons = screen.getAllByText('Email & Notifications');
    fireEvent.click(emailButtons[0]);
    
    expect(screen.getByText('Configure email settings and notification preferences.')).toBeInTheDocument();
  });

  it('switches to Security tab when clicked', () => {
    render(<Settings />);
    
    const securityButtons = screen.getAllByText('Security');
    fireEvent.click(securityButtons[0]);
    
    expect(screen.getByText('Manage security settings and password policies.')).toBeInTheDocument();
  });

  it('switches to Backup & Restore tab when clicked', () => {
    render(<Settings />);
    
    const backupButtons = screen.getAllByText('Backup & Restore');
    fireEvent.click(backupButtons[0]);
    
    expect(screen.getByText('Manage database backups and restoration.')).toBeInTheDocument();
  });

  it('switches to Integrations tab when clicked', () => {
    render(<Settings />);
    
    const integrationButtons = screen.getAllByText('Integrations');
    fireEvent.click(integrationButtons[0]);
    
    expect(screen.getByText('Connect and configure third-party integrations.')).toBeInTheDocument();
  });

  it('renders tab icons', () => {
    const { container } = render(<Settings />);
    
    // Check that SVG icons are rendered (lucide-react renders as SVG)
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('applies active state styling to selected tab', () => {
    const { container } = render(<Settings />);
    
    // Find the General tab button in desktop navigation
    const desktopNav = container.querySelector('nav.hidden.lg\\:block');
    expect(desktopNav).toBeInTheDocument();
    
    // The first button should have active styling (General is default)
    const firstButton = desktopNav?.querySelector('button');
    expect(firstButton?.className).toContain('border-primary-600');
    expect(firstButton?.className).toContain('bg-primary-50');
  });

  it('renders content area with white background', () => {
    const { container } = render(<Settings />);
    
    // Content area should have white background and border
    const contentArea = container.querySelector('.bg-white.rounded-lg.border.border-neutral-200.p-6');
    expect(contentArea).toBeInTheDocument();
  });

  it('has responsive layout classes', () => {
    const { container } = render(<Settings />);
    
    // Check for responsive flex layout
    const layoutContainer = container.querySelector('.flex.flex-col.lg\\:flex-row');
    expect(layoutContainer).toBeInTheDocument();
    
    // Check for desktop-only vertical nav
    const desktopNav = container.querySelector('.hidden.lg\\:block');
    expect(desktopNav).toBeInTheDocument();
    
    // Check for mobile-only horizontal nav
    const mobileNav = container.querySelector('.lg\\:hidden');
    expect(mobileNav).toBeInTheDocument();
  });

  it('maintains tab state across interactions', () => {
    render(<Settings />);
    
    // Switch to Finance Settings
    const financeButtons = screen.getAllByText('Finance Settings');
    fireEvent.click(financeButtons[0]);
    expect(screen.getByText('Configure finance-related settings and categories.')).toBeInTheDocument();
    
    // Switch to Security
    const securityButtons = screen.getAllByText('Security');
    fireEvent.click(securityButtons[0]);
    expect(screen.getByText('Manage security settings and password policies.')).toBeInTheDocument();
    
    // Finance content should no longer be visible
    expect(screen.queryByText('Configure finance-related settings and categories.')).not.toBeInTheDocument();
  });
});
