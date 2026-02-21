import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import Sidebar from '../Sidebar';

// Feature: church-management-system, Property 17: Navigation highlighting
// **Validates: Requirements 7.7**

describe('Sidebar Navigation Highlighting - Property-Based Tests', () => {
  // Define the navigation items that exist in the Sidebar
  const navigationItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Members', href: '/members' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Small Groups', href: '/small-groups' },
    { name: 'Events', href: '/events' },
    { name: 'Finance', href: '/finance' },
    { name: 'Reports', href: '/reports' },
    { name: 'Settings', href: '/settings' },
  ];

  /**
   * Property 17: Navigation highlighting
   * For any page navigation action, the sidebar menu item corresponding to the 
   * current page should be visually highlighted
   */
  it('should highlight the correct menu item for any valid navigation path', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary navigation items
        fc.constantFrom(...navigationItems),
        (navItem) => {
          // Render the Sidebar with the current path
          const { container, unmount } = render(
            <MemoryRouter initialEntries={[navItem.href]}>
              <Sidebar />
            </MemoryRouter>
          );

          try {
            // Find the link element for this navigation item
            const linkElement = screen.getByText(navItem.name).closest('a');
            
            // Assert that the active link has the highlighting classes
            expect(linkElement).toHaveClass('bg-primary-50');
            expect(linkElement).toHaveClass('text-primary-700');

            // Verify that other navigation items are NOT highlighted
            navigationItems
              .filter(item => item.name !== navItem.name)
              .forEach(otherItem => {
                const otherLink = screen.getByText(otherItem.name).closest('a');
                expect(otherLink).not.toHaveClass('bg-primary-50');
                expect(otherLink).toHaveClass('text-gray-700');
              });
          } finally {
            // Clean up after each property test iteration
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 17: Navigation highlighting for nested routes
   * For any nested route under a main navigation path, the parent menu item 
   * should be highlighted
   */
  it('should highlight the correct menu item for any nested route', () => {
    fc.assert(
      fc.property(
        // Generate navigation items (excluding dashboard which has special handling)
        fc.constantFrom(...navigationItems.filter(item => item.href !== '/')),
        // Generate arbitrary nested path segments
        fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 1, maxLength: 3 }),
        (navItem, pathSegments) => {
          // Construct a nested path
          const nestedPath = `${navItem.href}/${pathSegments.join('/')}`;
          
          // Render the Sidebar with the nested path
          const { unmount } = render(
            <MemoryRouter initialEntries={[nestedPath]}>
              <Sidebar />
            </MemoryRouter>
          );

          try {
            // Find the link element for the parent navigation item
            const linkElement = screen.getByText(navItem.name).closest('a');
            
            // Assert that the parent link is highlighted for nested routes
            expect(linkElement).toHaveClass('bg-primary-50');
            expect(linkElement).toHaveClass('text-primary-700');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 17: Dashboard highlighting specificity
   * The dashboard should only be highlighted when on the exact root path,
   * not for any other path
   */
  it('should only highlight dashboard for exact root path', () => {
    fc.assert(
      fc.property(
        // Generate non-root paths
        fc.constantFrom(...navigationItems.filter(item => item.href !== '/')),
        (navItem) => {
          // Render the Sidebar with a non-root path
          const { unmount } = render(
            <MemoryRouter initialEntries={[navItem.href]}>
              <Sidebar />
            </MemoryRouter>
          );

          try {
            // Find the Dashboard link
            const dashboardLink = screen.getByText('Dashboard').closest('a');
            
            // Assert that Dashboard is NOT highlighted for non-root paths
            expect(dashboardLink).not.toHaveClass('bg-primary-50');
            expect(dashboardLink).toHaveClass('text-gray-700');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 17: Highlighting consistency
   * For any given path, exactly one menu item should be highlighted
   * (or none if the path doesn't match any navigation item)
   */
  it('should highlight exactly one menu item for any valid navigation path', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...navigationItems),
        (navItem) => {
          // Render the Sidebar with the current path
          const { unmount } = render(
            <MemoryRouter initialEntries={[navItem.href]}>
              <Sidebar />
            </MemoryRouter>
          );

          try {
            // Count how many links have the highlighting class
            const highlightedLinks = navigationItems.filter(item => {
              const link = screen.getByText(item.name).closest('a');
              return link?.classList.contains('bg-primary-50');
            });

            // Assert that exactly one link is highlighted
            expect(highlightedLinks.length).toBe(1);
            expect(highlightedLinks[0].name).toBe(navItem.name);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 17: Visual distinction
   * For any navigation state, highlighted items should have visually distinct
   * classes from non-highlighted items
   */
  it('should apply distinct visual classes to highlighted vs non-highlighted items', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...navigationItems),
        (navItem) => {
          // Render the Sidebar with the current path
          const { unmount } = render(
            <MemoryRouter initialEntries={[navItem.href]}>
              <Sidebar />
            </MemoryRouter>
          );

          try {
            const activeLink = screen.getByText(navItem.name).closest('a');
            
            // Active link should have primary colors
            expect(activeLink).toHaveClass('bg-primary-50');
            expect(activeLink).toHaveClass('text-primary-700');
            
            // Find an inactive link
            const inactiveItem = navigationItems.find(item => item.name !== navItem.name);
            if (inactiveItem) {
              const inactiveLink = screen.getByText(inactiveItem.name).closest('a');
              
              // Inactive link should have gray colors
              expect(inactiveLink).toHaveClass('text-gray-700');
              expect(inactiveLink).not.toHaveClass('bg-primary-50');
              expect(inactiveLink).not.toHaveClass('text-primary-700');
            }
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
