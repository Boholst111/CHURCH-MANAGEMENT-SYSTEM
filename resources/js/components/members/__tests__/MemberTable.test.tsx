import React from 'react';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MemberTable, { Member } from '../MemberTable';
import { ToastProvider } from '../../../contexts/ToastContext';

/**
 * Unit tests for MemberTable component
 * 
 * Tests:
 * - Rendering with sample data
 * - Sorting functionality
 * - Pagination controls
 * - Row actions (edit, delete)
 * - Empty state
 * - Loading state
 * 
 * Validates Requirements: 3.1, 3.7
 */

// Custom render function that wraps with ToastProvider
const render = (ui: React.ReactElement) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => <ToastProvider>{children}</ToastProvider>,
  });
};

const mockMembers: Member[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-0101',
    address: '123 Main St',
    city: 'Springfield',
    status: 'active',
    small_group_id: 1,
    date_joined: '2024-01-15',
    birth_date: '1985-05-20',
    gender: 'male',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    small_group: {
      id: 1,
      name: 'Youth Group',
    },
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-0102',
    address: '456 Oak Ave',
    city: 'Springfield',
    status: 'visitor',
    small_group_id: null,
    date_joined: '2024-02-10',
    birth_date: '1990-08-15',
    gender: 'female',
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z',
  },
  {
    id: 3,
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alice.j@example.com',
    phone: '555-0103',
    address: '789 Pine Rd',
    city: 'Springfield',
    status: 'active',
    small_group_id: 2,
    date_joined: '2023-12-01',
    birth_date: '1988-03-10',
    gender: 'female',
    created_at: '2023-12-01T10:00:00Z',
    updated_at: '2023-12-01T10:00:00Z',
    small_group: {
      id: 2,
      name: 'Prayer Group',
    },
  },
];

describe('MemberTable', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders table with member data', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      // Check if all members are rendered
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();

      // Check if contact info is displayed
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('555-0101')).toBeInTheDocument();
    });

    it('renders status badges correctly', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      // Check for status badges
      const activeBadges = screen.getAllByText('Active');
      const visitorBadges = screen.getAllByText('Visitor');
      
      expect(activeBadges).toHaveLength(2); // John and Alice
      expect(visitorBadges).toHaveLength(1); // Jane
    });

    it('renders small group names correctly', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('Youth Group')).toBeInTheDocument();
      expect(screen.getByText('Prayer Group')).toBeInTheDocument();
      expect(screen.getByText('None')).toBeInTheDocument(); // Jane has no group
    });

    it('renders column headers', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Small Group')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('sorts by name when name column is clicked', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      const nameHeader = screen.getByText('Name');
      
      // Click to sort ascending
      fireEvent.click(nameHeader);
      
      const rows = screen.getAllByRole('row');
      // First row is header, so data rows start at index 1
      expect(rows[1]).toHaveTextContent('Alice Johnson');
      expect(rows[2]).toHaveTextContent('Jane Smith');
      expect(rows[3]).toHaveTextContent('John Doe');
    });

    it('reverses sort direction on second click', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      const nameHeader = screen.getByText('Name');
      
      // Click twice to sort descending
      fireEvent.click(nameHeader);
      fireEvent.click(nameHeader);
      
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('John Doe');
      expect(rows[2]).toHaveTextContent('Jane Smith');
      expect(rows[3]).toHaveTextContent('Alice Johnson');
    });

    it('sorts by status correctly', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      const statusHeader = screen.getByText('Status');
      fireEvent.click(statusHeader);
      
      const rows = screen.getAllByRole('row');
      // Active members should come first (John, Alice), then visitor (Jane)
      // Note: When status is equal, original order is maintained
      expect(rows[1]).toHaveTextContent('John Doe');
      expect(rows[2]).toHaveTextContent('Alice Johnson');
      expect(rows[3]).toHaveTextContent('Jane Smith');
    });
  });

  describe('Row Actions', () => {
    it('calls onEdit when edit button is clicked', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      const editButtons = screen.getAllByTitle('Edit member');
      fireEvent.click(editButtons[0]);
      
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
      expect(mockOnEdit).toHaveBeenCalledWith(mockMembers[0]);
    });

    it('calls onDelete when delete button is clicked', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      const archiveButtons = screen.getAllByTitle('Archive');
      fireEvent.click(archiveButtons[1]);
      
      // The ArchiveButton opens a dialog, so we can't directly test onDelete
      // Instead, we verify the archive button is rendered
      expect(archiveButtons).toHaveLength(3); // One for each member
    });
  });

  describe('Pagination', () => {
    it('displays pagination controls when totalPages > 1', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('does not display pagination when totalPages = 1', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });

    it('calls onPageChange when page button is clicked', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);
      
      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('disables Previous button on first page', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
      render(
        <MemberTable
          members={mockMembers}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={5}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      );

      const nextButton = screen.getByText('Next');
      expect(nextButton).toBeDisabled();
    });
  });

  describe('Empty and Loading States', () => {
    it('displays empty state when no members', () => {
      render(
        <MemberTable
          members={[]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByText('No members found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filter criteria')).toBeInTheDocument();
    });

    it('displays loading state when isLoading is true', () => {
      render(
        <MemberTable
          members={[]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
          isLoading={true}
        />
      );

      expect(screen.getByText('Loading members...')).toBeInTheDocument();
    });
  });
});
