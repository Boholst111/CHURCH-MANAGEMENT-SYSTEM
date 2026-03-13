import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import { Button } from '../button';
import { Card } from '../card';
import { DataTable } from '../table';

/**
 * Property 2: Responsive Behavior
 * **Validates: Components render correctly at all breakpoints**
 * 
 * This test validates that UI components:
 * - Render without errors at all viewport widths (320px to 2560px)
 * - Have appropriate responsive classes
 * - Maintain proper structure across breakpoints
 * 
 * Design Reference: Correctness Properties - Property 2
 * 
 * Note: JSDOM doesn't calculate layout dimensions, so we test for:
 * - Successful rendering without errors
 * - Presence of responsive Tailwind classes
 * - Correct DOM structure
 */

// Mock window.matchMedia for JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Responsive Behavior - Property-Based Tests', () => {
  /**
   * Generator for viewport widths from 320px (mobile) to 2560px (large desktop)
   */
  const viewportWidthGenerator = () =>
    fc.integer({ min: 320, max: 2560 });

  /**
   * Helper to set viewport width
   */
  const setViewportWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  /**
   * Helper to check if element has responsive classes
   */
  const hasResponsiveClasses = (element: HTMLElement): boolean => {
    const classList = element.className;
    // Check for common responsive prefixes: sm:, md:, lg:, xl:, 2xl:
    return /\b(sm|md|lg|xl|2xl):/.test(classList);
  };

  /**
   * Helper to check if element has proper sizing classes
   */
  const hasProperSizing = (element: HTMLElement): boolean => {
    const classList = element.className;
    // Check for width/height/padding/margin classes
    return /\b(w-|h-|p-|m-|px-|py-|mx-|my-|min-w-|max-w-|min-h-|max-h-)/.test(classList);
  };

  /**
   * Property 2: Button component renders correctly at any viewport width
   */
  it('should render Button correctly at any viewport width', () => {
    fc.assert(
      fc.property(
        viewportWidthGenerator(),
        fc.constantFrom('primary', 'secondary', 'outline', 'ghost', 'danger'),
        fc.constantFrom('sm', 'md', 'lg'),
        (width, variant, size) => {
          setViewportWidth(width);

          const { container, unmount } = render(
            <Button variant={variant as any} size={size as any}>
              Test Button
            </Button>
          );

          try {
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();

            // Property: Button should have content
            expect(button!.textContent).toBe('Test Button');

            // Property: Button should have proper sizing classes
            expect(hasProperSizing(button!)).toBe(true);

            // Property: Button should have transition classes for responsiveness
            expect(button!.className).toContain('transition');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 2: Card component renders correctly at any viewport width
   */
  it('should render Card correctly at any viewport width', () => {
    fc.assert(
      fc.property(
        viewportWidthGenerator(),
        fc.constantFrom('default', 'bordered', 'elevated'),
        fc.constantFrom('sm', 'md', 'lg'),
        (width, variant, padding) => {
          setViewportWidth(width);

          const { container, unmount } = render(
            <Card
              variant={variant as any}
              padding={padding as any}
              title="Test Card"
              description="This is a test card description"
            >
              <div>Card content goes here</div>
            </Card>
          );

          try {
            const card = container.firstChild as HTMLElement;
            expect(card).toBeInTheDocument();

            // Property: Card should have proper structure
            expect(card.className).toContain('rounded');
            expect(card.className).toContain('bg-white');

            // Property: Content should be present
            const title = container.querySelector('h3');
            expect(title).toBeInTheDocument();
            expect(title!.textContent).toBe('Test Card');

            const description = container.querySelector('p');
            expect(description).toBeInTheDocument();
            expect(description!.textContent).toBe('This is a test card description');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 2: Table component renders correctly at any viewport width
   */
  it('should render Table correctly at any viewport width', () => {
    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    ];

    const columns = [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ];

    fc.assert(
      fc.property(
        viewportWidthGenerator(),
        (width) => {
          setViewportWidth(width);

          const { container, unmount } = render(
            <DataTable data={mockData} columns={columns} />
          );

          try {
            // Property: Table should render
            const table = container.querySelector('table');
            expect(table).toBeInTheDocument();

            // Property: Table should have proper structure
            const thead = container.querySelector('thead');
            const tbody = container.querySelector('tbody');
            expect(thead).toBeInTheDocument();
            expect(tbody).toBeInTheDocument();

            // Property: Table cells should contain data
            const cells = container.querySelectorAll('td');
            expect(cells.length).toBeGreaterThan(0);
            
            // Verify data is rendered
            expect(container.textContent).toContain('John Doe');
            expect(container.textContent).toContain('Jane Smith');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 2: Multiple components together render correctly at any viewport width
   */
  it('should render multiple components together correctly at any viewport width', () => {
    fc.assert(
      fc.property(
        viewportWidthGenerator(),
        (width) => {
          setViewportWidth(width);

          const { container, unmount } = render(
            <div className="p-6 space-y-6">
              <Card title="Dashboard" padding="md">
                <div className="space-y-4">
                  <Button variant="primary" size="md">
                    Add New
                  </Button>
                  <DataTable
                    data={[
                      { id: 1, name: 'Item 1', status: 'Active' },
                      { id: 2, name: 'Item 2', status: 'Inactive' },
                    ]}
                    columns={[
                      { key: 'name', header: 'Name' },
                      { key: 'status', header: 'Status' },
                    ]}
                  />
                </div>
              </Card>
            </div>
          );

          try {
            // Property: All components should render
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
            expect(button!.textContent).toBe('Add New');

            const table = container.querySelector('table');
            expect(table).toBeInTheDocument();

            const card = container.querySelector('.bg-white');
            expect(card).toBeInTheDocument();

            // Property: Content should be present
            const cardTitle = container.querySelector('h3');
            expect(cardTitle).toBeInTheDocument();
            expect(cardTitle!.textContent).toBe('Dashboard');

            // Verify table data is rendered
            expect(container.textContent).toContain('Item 1');
            expect(container.textContent).toContain('Item 2');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 30 }
    );
  });

  /**
   * Property 2: Components maintain structure at extreme viewport widths
   */
  it('should maintain structure at extreme viewport widths (320px and 2560px)', () => {
    const extremeWidths = [320, 2560];

    extremeWidths.forEach(width => {
      setViewportWidth(width);

      const { container, unmount } = render(
        <div className="p-6">
          <Card title="Test Card" description="Test description" padding="md">
            <p>This is test content that should be readable at all viewport sizes.</p>
            <Button variant="primary" size="md">
              Action Button
            </Button>
          </Card>
        </div>
      );

      try {
        // Property: Card should render
        const card = container.querySelector('.bg-white');
        expect(card).toBeInTheDocument();

        // Property: Text content should be present
        const paragraph = container.querySelector('p');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph!.textContent).toBeTruthy();

        // Property: Button should be present
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
        expect(button!.textContent).toBe('Action Button');

        // Property: Card title should be present
        const title = container.querySelector('h3');
        expect(title).toBeInTheDocument();
        expect(title!.textContent).toBe('Test Card');
      } finally {
        unmount();
      }
    });
  });

  /**
   * Property 2: Components with responsive classes adapt to viewport changes
   */
  it('should have responsive Tailwind classes that adapt to viewport changes', () => {
    fc.assert(
      fc.property(
        viewportWidthGenerator(),
        (width) => {
          setViewportWidth(width);

          const { container, unmount } = render(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card title="Card 1" padding="md">
                <Button variant="primary" size="md">Button 1</Button>
              </Card>
              <Card title="Card 2" padding="md">
                <Button variant="secondary" size="md">Button 2</Button>
              </Card>
              <Card title="Card 3" padding="md">
                <Button variant="outline" size="md">Button 3</Button>
              </Card>
              <Card title="Card 4" padding="md">
                <Button variant="ghost" size="md">Button 4</Button>
              </Card>
            </div>
          );

          try {
            const gridContainer = container.firstChild as HTMLElement;
            expect(gridContainer).toBeInTheDocument();

            // Property: Container should have responsive grid classes
            expect(gridContainer.className).toContain('grid');
            expect(hasResponsiveClasses(gridContainer)).toBe(true);

            // Property: All cards should render (Card component has bg-white on inner div)
            const cards = container.querySelectorAll('[class*="rounded"]');
            expect(cards.length).toBeGreaterThanOrEqual(4);

            // Property: All buttons should render
            const buttons = container.querySelectorAll('button');
            expect(buttons.length).toBe(4);

            // Verify content is present
            expect(container.textContent).toContain('Card 1');
            expect(container.textContent).toContain('Button 1');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 30 }
    );
  });
});
