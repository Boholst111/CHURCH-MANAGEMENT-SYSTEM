import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import MemberTable, { Member } from '../MemberTable';

// Feature: church-management-system, Property 9: Pagination triggers correctly
// **Validates: Requirements 3.7**

describe('MemberTable Pagination - Property-Based Tests', () => {
  /**
   * Generator for creating a valid Member object
   */
  const memberGenerator = (id: number): fc.Arbitrary<Member> => {
    return fc.record({
      id: fc.constant(id),
      first_name: fc.string({ minLength: 1, maxLength: 50 }),
      last_name: fc.string({ minLength: 1, maxLength: 50 }),
      email: fc.emailAddress(),
      phone: fc.string({ minLength: 10, maxLength: 15 }),
      address: fc.string({ minLength: 5, maxLength: 100 }),
      city: fc.string({ minLength: 2, maxLength: 50 }),
      status: fc.constantFrom('active' as const, 'visitor' as const),
      small_group_id: fc.option(fc.integer({ min: 1, max: 100 }), { nil: null }),
      date_joined: fc.date().map(d => d.toISOString().split('T')[0]),
      birth_date: fc.option(fc.date().map(d => d.toISOString().split('T')[0]), { nil: null }),
      gender: fc.constantFrom('male' as const, 'female' as const, 'other' as const),
      created_at: fc.date().map(d => d.toISOString()),
      updated_at: fc.date().map(d => d.toISOString()),
      small_group: fc.option(
        fc.record({
          id: fc.integer({ min: 1, max: 100 }),
          name: fc.string({ minLength: 3, maxLength: 50 }),
        }),
        { nil: undefined }
      ),
    });
  };

  /**
   * Generator for creating an array of members
   */
  const membersArrayGenerator = (count: number): fc.Arbitrary<Member[]> => {
    return fc.tuple(...Array.from({ length: count }, (_, i) => memberGenerator(i + 1)));
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  /**
   * Property 9: Pagination triggers correctly - Part 1
   * For any member list with more than 50 records, pagination controls should be displayed
   */
  it('should display pagination controls when total pages > 1 (more than 50 records)', () => {
    fc.assert(
      fc.property(
        // Generate a number of pages between 2 and 10
        fc.integer({ min: 2, max: 10 }),
        // Generate a current page within the range
        fc.integer({ min: 1, max: 10 }),
        // Generate a reasonable number of members for display (1-50)
        fc.integer({ min: 1, max: 50 }),
        (totalPages, currentPageBase, memberCount) => {
          // Ensure current page is within valid range
          const currentPage = Math.min(currentPageBase, totalPages);
          
          // Generate members for the current page
          const members = Array.from({ length: memberCount }, (_, i) => ({
            id: i + 1,
            first_name: `First${i}`,
            last_name: `Last${i}`,
            email: `user${i}@example.com`,
            phone: `555-010${i}`,
            address: `${i} Main St`,
            city: 'Springfield',
            status: 'active' as const,
            small_group_id: null,
            date_joined: '2024-01-01',
            birth_date: null,
            gender: 'male' as const,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          }));

          const { unmount } = render(
            <MemberTable
              members={members}
              onEdit={mockOnEdit}
              onDelete={mockOnDelete}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={mockOnPageChange}
            />
          );

          try {
            // Pagination controls should be visible
            expect(screen.getByText(`Page ${currentPage} of ${totalPages}`)).toBeInTheDocument();
            expect(screen.getByText('Previous')).toBeInTheDocument();
            expect(screen.getByText('Next')).toBeInTheDocument();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9: Pagination triggers correctly - Part 2
   * For any member list with 50 or fewer records (totalPages = 1), 
   * pagination controls should NOT be displayed
   */
  it('should NOT display pagination controls when total pages = 1 (50 or fewer records)', () => {
    fc.assert(
      fc.property(
        // Generate between 1 and 50 members
        fc.integer({ min: 1, max: 50 }),
        (memberCount) => {
          // Generate members
          const members = Array.from({ length: memberCount }, (_, i) => ({
            id: i + 1,
            first_name: `First${i}`,
            last_name: `Last${i}`,
            email: `user${i}@example.com`,
            phone: `555-010${i}`,
            address: `${i} Main St`,
            city: 'Springfield',
            status: 'active' as const,
            small_group_id: null,
            date_joined: '2024-01-01',
            birth_date: null,
            gender: 'male' as const,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          }));

          const { unmount } = render(
            <MemberTable
              members={members}
              onEdit={mockOnEdit}
              onDelete={mockOnDelete}
              currentPage={1}
              totalPages={1}
              onPageChange={mockOnPageChange}
            />
          );

          try {
            // Pagination controls should NOT be visible
            expect(screen.queryByText('Previous')).not.toBeInTheDocument();
            expect(screen.queryByText('Next')).not.toBeInTheDocument();
            expect(screen.queryByText(/Page \d+ of \d+/)).not.toBeInTheDocument();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9: Pagination triggers correctly - Part 3
   * Each page should contain at most 50 records
   */
  it('should display at most 50 members per page', () => {
    fc.assert(
      fc.property(
        // Generate between 1 and 50 members (valid page size)
        fc.integer({ min: 1, max: 50 }),
        (memberCount) => {
          // Generate members
          const members = Array.from({ length: memberCount }, (_, i) => ({
            id: i + 1,
            first_name: `First${i}`,
            last_name: `Last${i}`,
            email: `user${i}@example.com`,
            phone: `555-010${i}`,
            address: `${i} Main St`,
            city: 'Springfield',
            status: 'active' as const,
            small_group_id: null,
            date_joined: '2024-01-01',
            birth_date: null,
            gender: 'male' as const,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          }));

          const { unmount } = render(
            <MemberTable
              members={members}
              onEdit={mockOnEdit}
              onDelete={mockOnDelete}
              currentPage={1}
              totalPages={1}
              onPageChange={mockOnPageChange}
            />
          );

          try {
            // Count the number of table rows (excluding header)
            const rows = screen.getAllByRole('row');
            // First row is the header, so data rows = total rows - 1
            const dataRows = rows.length - 1;
            
            // Should display exactly the number of members provided (which is <= 50)
            expect(dataRows).toBe(memberCount);
            expect(dataRows).toBeLessThanOrEqual(50);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9: Pagination boundary behavior
   * For any pagination state, the Previous button should be disabled on page 1
   * and the Next button should be disabled on the last page
   */
  it('should disable Previous button on first page and Next button on last page', () => {
    fc.assert(
      fc.property(
        // Generate total pages between 2 and 10
        fc.integer({ min: 2, max: 10 }),
        (totalPages) => {
          const members = [{
            id: 1,
            first_name: 'Test',
            last_name: 'User',
            email: 'test@example.com',
            phone: '555-0100',
            address: '123 Main St',
            city: 'Springfield',
            status: 'active' as const,
            small_group_id: null,
            date_joined: '2024-01-01',
            birth_date: null,
            gender: 'male' as const,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          }];

          // Test first page
          const { unmount: unmount1 } = render(
            <MemberTable
              members={members}
              onEdit={mockOnEdit}
              onDelete={mockOnDelete}
              currentPage={1}
              totalPages={totalPages}
              onPageChange={mockOnPageChange}
            />
          );

          try {
            const previousButton = screen.getByText('Previous');
            expect(previousButton).toBeDisabled();
            
            const nextButton = screen.getByText('Next');
            expect(nextButton).not.toBeDisabled();
          } finally {
            unmount1();
          }

          // Test last page
          const { unmount: unmount2 } = render(
            <MemberTable
              members={members}
              onEdit={mockOnEdit}
              onDelete={mockOnDelete}
              currentPage={totalPages}
              totalPages={totalPages}
              onPageChange={mockOnPageChange}
            />
          );

          try {
            const previousButton = screen.getByText('Previous');
            expect(previousButton).not.toBeDisabled();
            
            const nextButton = screen.getByText('Next');
            expect(nextButton).toBeDisabled();
          } finally {
            unmount2();
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property 9: Pagination page indicator accuracy
   * For any valid pagination state, the page indicator should accurately 
   * reflect the current page and total pages
   */
  it('should display accurate page indicator for any pagination state', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }),
        fc.integer({ min: 1, max: 20 }),
        (totalPages, currentPageBase) => {
          const currentPage = Math.min(currentPageBase, totalPages);
          
          const members = [{
            id: 1,
            first_name: 'Test',
            last_name: 'User',
            email: 'test@example.com',
            phone: '555-0100',
            address: '123 Main St',
            city: 'Springfield',
            status: 'active' as const,
            small_group_id: null,
            date_joined: '2024-01-01',
            birth_date: null,
            gender: 'male' as const,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          }];

          const { unmount } = render(
            <MemberTable
              members={members}
              onEdit={mockOnEdit}
              onDelete={mockOnDelete}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={mockOnPageChange}
            />
          );

          try {
            // Verify the page indicator shows correct information
            expect(screen.getByText(`Page ${currentPage} of ${totalPages}`)).toBeInTheDocument();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
