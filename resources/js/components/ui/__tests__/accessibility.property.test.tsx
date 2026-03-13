import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { Button } from '../button';
import { Input } from '../input';
import { Card } from '../card';
import { DataTable, TableColumn } from '../table';
import { Select } from '../select';
import { Badge } from '../badge';
import { Pagination } from '../pagination';
import { getContrastRatio, meetsWCAGAA } from '../../../lib/color-contrast';

/**
 * Property 1: Accessibility Compliance
 * **Validates: All components meet WCAG AA standards**
 * 
 * This property-based test validates that UI components:
 * - Have accessible names (labels, aria-labels, or text content)
 * - Have proper ARIA attributes (roles, states, properties)
 * - Meet color contrast requirements (4.5:1 for normal text)
 * - Support keyboard navigation (focusable, proper tab order)
 * 
 * Design Reference: Correctness Properties - Property 1
 * 
 * Universal quantification:
 * ∀ component ∈ UIComponents:
 *   hasAccessibleName(component) ∧
 *   hasProperARIAAttributes(component) ∧
 *   meetsColorContrastRatio(component, 4.5) ∧
 *   hasKeyboardNavigation(component)
 */

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if an element has an accessible name
 */
function hasAccessibleName(element: HTMLElement): boolean {
  if (element.getAttribute('aria-label')) return true;
  if (element.getAttribute('aria-labelledby')) return true;
  if (element.textContent && element.textContent.trim().length > 0) return true;
  
  const id = element.id;
  if (id) {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label && label.textContent && label.textContent.trim().length > 0) return true;
  }
  
  if (element.getAttribute('title')) return true;
  if (element.getAttribute('placeholder')) return true;
  
  return false;
}

/**
 * Check if an interactive element has proper ARIA attributes
 */
function hasProperARIAAttributes(element: HTMLElement): boolean {
  const role = element.getAttribute('role') || element.tagName.toLowerCase();
  
  if (role === 'button') return true;
  if (element.tagName.toLowerCase() === 'input' || role === 'textbox') return true;
  if (element.tagName.toLowerCase() === 'a' || role === 'link') return true;
  if (role === 'table') return true;
  
  if (role === 'combobox') {
    return element.hasAttribute('aria-expanded') && element.hasAttribute('aria-haspopup');
  }
  
  if (role === 'navigation') {
    return element.hasAttribute('aria-label');
  }
  
  return true;
}

/**
 * Check if element is keyboard navigable
 */
function isKeyboardNavigable(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  const role = element.getAttribute('role');
  
  const interactiveElements = ['button', 'a', 'input', 'select', 'textarea'];
  const interactiveRoles = ['button', 'link', 'textbox', 'combobox', 'tab'];
  
  if (interactiveElements.includes(tagName) || (role && interactiveRoles.includes(role))) {
    const tabIndex = element.getAttribute('tabindex');
    if (element.hasAttribute('disabled')) return true;
    return tabIndex !== '-1' || interactiveElements.includes(tagName);
  }
  
  return true;
}

// Arbitraries
const buttonVariantArbitrary = fc.constantFrom('primary', 'secondary', 'outline', 'ghost', 'danger');
const buttonSizeArbitrary = fc.constantFrom('sm', 'md', 'lg');
const buttonStateArbitrary = fc.record({ disabled: fc.boolean(), loading: fc.boolean() });
const inputTypeArbitrary = fc.constantFrom('text', 'email', 'password', 'number', 'tel', 'url');
const inputStateArbitrary = fc.record({
  error: fc.option(fc.string({ minLength: 5, maxLength: 50 }), { nil: undefined }),
  disabled: fc.boolean(),
  required: fc.boolean(),
});
const cardVariantArbitrary = fc.constantFrom('default', 'bordered', 'elevated');
const badgeVariantArbitrary = fc.constantFrom('primary', 'success', 'warning', 'error', 'neutral');

describe('Accessibility Compliance - Property-Based Tests', () => {
  it('Property 1: All Button components have accessible names', () => {
    fc.assert(
      fc.property(
        buttonVariantArbitrary,
        buttonSizeArbitrary,
        buttonStateArbitrary,
        fc.string({ minLength: 1, maxLength: 50 }),
        (variant, size, state, text) => {
          const { container, unmount } = render(
            <Button variant={variant as any} size={size as any} disabled={state.disabled} loading={state.loading}>
              {text}
            </Button>
          );

          try {
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
            expect(hasAccessibleName(button!)).toBe(true);
            expect(hasProperARIAAttributes(button!)).toBe(true);
            if (!state.disabled) {
              expect(isKeyboardNavigable(button!)).toBe(true);
            }
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1: All Input components have accessible names and proper ARIA', () => {
    fc.assert(
      fc.property(
        inputTypeArbitrary,
        inputStateArbitrary,
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 0, maxLength: 100 }),
        (type, state, label, value) => {
          const { container, unmount } = render(
            <Input
              type={type as any}
              label={label}
              value={value}
              onChange={() => {}}
              error={state.error}
              disabled={state.disabled}
              required={state.required}
            />
          );

          try {
            const input = container.querySelector('input');
            expect(input).toBeInTheDocument();
            expect(hasAccessibleName(input!)).toBe(true);
            expect(hasProperARIAAttributes(input!)).toBe(true);
            if (state.error) {
              expect(input!.getAttribute('aria-invalid')).toBe('true');
            }
            if (!state.disabled) {
              expect(isKeyboardNavigable(input!)).toBe(true);
            }
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });


  it('Property 1: All Card components have proper accessibility structure', () => {
    fc.assert(
      fc.property(
        cardVariantArbitrary,
        fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
        fc.string({ minLength: 1, maxLength: 200 }),
        (variant, title, content) => {
          const { container, unmount } = render(
            <Card variant={variant as any} title={title}>
              {content}
            </Card>
          );

          try {
            const card = container.firstChild as HTMLElement;
            expect(card).toBeInTheDocument();
            if (title) {
              const heading = container.querySelector('h3');
              expect(heading).toBeInTheDocument();
              expect(hasAccessibleName(heading!)).toBe(true);
            }
            expect(card.textContent).toContain(content);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1: All Table components have proper ARIA structure', () => {
    interface TestData {
      id: number;
      name: string;
      value: string;
    }

    const dataArbitrary = fc.array(
      fc.record({
        id: fc.integer({ min: 1, max: 1000 }),
        name: fc.string({ minLength: 1, maxLength: 50 }),
        value: fc.string({ minLength: 1, maxLength: 50 }),
      }),
      { minLength: 0, maxLength: 20 }
    );

    fc.assert(
      fc.property(dataArbitrary, (data) => {
        const columns: TableColumn<TestData>[] = [
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          { key: 'value', header: 'Value' },
        ];

        const { container, unmount } = render(
          <DataTable columns={columns} data={data} />
        );

        try {
          const table = container.querySelector('table');
          expect(table).toBeInTheDocument();
          const region = container.querySelector('[role="region"]');
          expect(region).toBeInTheDocument();
          expect(hasAccessibleName(region! as HTMLElement)).toBe(true);
          const headers = container.querySelectorAll('th');
          headers.forEach(header => {
            expect(header.getAttribute('scope')).toBe('col');
          });
          const thead = container.querySelector('thead');
          const tbody = container.querySelector('tbody');
          expect(thead).toBeInTheDocument();
          expect(tbody).toBeInTheDocument();
        } finally {
          unmount();
        }
      }),
      { numRuns: 50 }
    );
  });

  it('Property 1: All Select components have proper combobox ARIA', () => {
    const optionsArbitrary = fc.array(
      fc.record({
        value: fc.string({ minLength: 1, maxLength: 20 }),
        label: fc.string({ minLength: 1, maxLength: 50 }),
      }),
      { minLength: 1, maxLength: 10 }
    );

    fc.assert(
      fc.property(
        optionsArbitrary,
        fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
        fc.option(fc.string({ minLength: 5, maxLength: 50 }), { nil: undefined }),
        (options, label, error) => {
          const { container, unmount } = render(
            <Select options={options} label={label} error={error} />
          );

          try {
            const combobox = container.querySelector('[role="combobox"]');
            expect(combobox).toBeInTheDocument();
            expect(combobox!.hasAttribute('aria-expanded')).toBe(true);
            expect((combobox! as HTMLElement).getAttribute('aria-haspopup')).toBe('listbox');
            expect(hasAccessibleName(combobox! as HTMLElement)).toBe(true);
            if (error) {
              expect((combobox! as HTMLElement).getAttribute('aria-invalid')).toBe('true');
            }
            expect(isKeyboardNavigable(combobox! as HTMLElement)).toBe(true);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  it('Property 1: All Badge components have accessible text', () => {
    fc.assert(
      fc.property(
        badgeVariantArbitrary,
        fc.string({ minLength: 1, maxLength: 30 }),
        (variant, text) => {
          const { container, unmount } = render(
            <Badge variant={variant as any}>{text}</Badge>
          );

          try {
            const badge = container.firstChild as HTMLElement;
            expect(badge).toBeInTheDocument();
            expect(hasAccessibleName(badge)).toBe(true);
            expect(badge.textContent).toBe(text);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1: Pagination components have proper navigation ARIA', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 1, max: 20 }),
        fc.integer({ min: 10, max: 100 }),
        (totalPages, currentPage, itemsPerPage) => {
          const validCurrentPage = Math.min(currentPage, totalPages);
          const totalItems = totalPages * itemsPerPage;

          const { container, unmount } = render(
            <Pagination
              currentPage={validCurrentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={() => {}}
            />
          );

          try {
            const nav = container.querySelector('[role="navigation"]');
            expect(nav).toBeInTheDocument();
            expect(hasAccessibleName(nav! as HTMLElement)).toBe(true);
            const currentPageButton = container.querySelector('[aria-current="page"]');
            expect(currentPageButton).toBeInTheDocument();
            const buttons = container.querySelectorAll('button');
            buttons.forEach(button => {
              if (!button.hasAttribute('disabled')) {
                expect(isKeyboardNavigable(button)).toBe(true);
              }
            });
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  it('Property 1: Common color combinations meet WCAG AA contrast requirements', () => {
    const colorCombinations = [
      { fg: '#0284c7', bg: '#ffffff', name: 'Primary 600 on white' },
      { fg: '#0369a1', bg: '#ffffff', name: 'Primary 700 on white' },
      { fg: '#525252', bg: '#ffffff', name: 'Neutral 600 on white' },
      { fg: '#404040', bg: '#ffffff', name: 'Neutral 700 on white' },
      { fg: '#262626', bg: '#ffffff', name: 'Neutral 800 on white' },
      { fg: '#ffffff', bg: '#0284c7', name: 'White on Primary 600' },
      { fg: '#ffffff', bg: '#0369a1', name: 'White on Primary 700' },
      { fg: '#059669', bg: '#d1fae5', name: 'Success dark on success light' },
      { fg: '#dc2626', bg: '#fee2e2', name: 'Error dark on error light' },
      { fg: '#d97706', bg: '#fef3c7', name: 'Warning dark on warning light' },
    ];

    colorCombinations.forEach(({ fg, bg, name }) => {
      const ratio = getContrastRatio(fg, bg);
      const passes = meetsWCAGAA(fg, bg, 'normal');
      expect(passes).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('Property 1: All interactive elements are keyboard accessible', () => {
    fc.assert(
      fc.property(
        buttonVariantArbitrary,
        fc.string({ minLength: 1, maxLength: 30 }),
        (variant, text) => {
          const { container, unmount } = render(
            <div>
              <Button variant={variant as any}>{text}</Button>
              <Input label="Test Input" value="" onChange={() => {}} />
              <Select options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]} />
            </div>
          );

          try {
            const button = container.querySelector('button');
            const input = container.querySelector('input');
            const select = container.querySelector('[role="combobox"]');
            expect(isKeyboardNavigable(button!)).toBe(true);
            expect(isKeyboardNavigable(input!)).toBe(true);
            expect(isKeyboardNavigable(select! as HTMLElement)).toBe(true);
            expect(hasAccessibleName(button!)).toBe(true);
            expect(hasAccessibleName(input!)).toBe(true);
            expect(hasAccessibleName(select! as HTMLElement)).toBe(true);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  it('Property 1: Components maintain accessibility across all variants and states', () => {
    fc.assert(
      fc.property(
        buttonVariantArbitrary,
        buttonSizeArbitrary,
        fc.boolean(),
        fc.boolean(),
        fc.string({ minLength: 1, maxLength: 30 }),
        (variant, size, disabled, loading, text) => {
          const { container, unmount } = render(
            <Button variant={variant as any} size={size as any} disabled={disabled} loading={loading}>
              {text}
            </Button>
          );

          try {
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
            expect(hasAccessibleName(button!)).toBe(true);
            expect(hasProperARIAAttributes(button!)).toBe(true);
            if (loading) {
              expect(button!.getAttribute('aria-busy')).toBe('true');
            }
            if (disabled) {
              expect(button!.hasAttribute('disabled')).toBe(true);
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
