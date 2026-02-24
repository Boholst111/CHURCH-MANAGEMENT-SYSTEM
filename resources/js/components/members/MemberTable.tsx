import React, { useState } from 'react';
import { Edit, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import ArchiveButton from '../archive/ArchiveButton';

/**
 * Member interface matching backend data structure
 */
export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'visitor';
  small_group_id: number | null;
  date_joined: string;
  birth_date: string | null;
  gender: 'male' | 'female' | 'other';
  created_at: string;
  updated_at: string;
  small_group?: {
    id: number;
    name: string;
  };
}

/**
 * Sort configuration type
 */
type SortColumn = 'name' | 'status' | 'small_group' | 'email' | 'phone';
type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
  column: SortColumn | null;
  direction: SortDirection;
}

/**
 * MemberTable Props
 */
export interface MemberTableProps {
  members: Member[];
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
  onArchiveSuccess?: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

/**
 * MemberTable Component
 * 
 * Displays church members in a sortable data table with pagination.
 * 
 * Features:
 * - Sortable columns (name, status, small group, contact info)
 * - Row actions (edit, delete)
 * - Pagination controls
 * - Responsive design
 * 
 * Validates Requirements: 3.1, 3.7
 */
const MemberTable: React.FC<MemberTableProps> = React.memo(({
  members,
  onEdit,
  onDelete,
  onArchiveSuccess,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    direction: null,
  });

  /**
   * Handle column sort
   */
  const handleSort = (column: SortColumn) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.column === column) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ column: direction ? column : null, direction });
  };

  /**
   * Sort members based on current sort configuration
   */
  const sortedMembers = React.useMemo(() => {
    if (!sortConfig.column || !sortConfig.direction) {
      return members;
    }

    return [...members].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortConfig.column) {
        case 'name':
          aValue = `${a.first_name} ${a.last_name}`.toLowerCase();
          bValue = `${b.first_name} ${b.last_name}`.toLowerCase();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        case 'small_group':
          aValue = a.small_group?.name?.toLowerCase() || '';
          bValue = b.small_group?.name?.toLowerCase() || '';
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'phone':
          aValue = a.phone;
          bValue = b.phone;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [members, sortConfig]);

  /**
   * Render sort icon for column header
   */
  const renderSortIcon = (column: SortColumn) => {
    if (sortConfig.column !== column) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 text-gray-400" />;
    }
    
    if (sortConfig.direction === 'asc') {
      return <ChevronUp className="ml-2 h-4 w-4 text-primary-500" />;
    }
    
    return <ChevronDown className="ml-2 h-4 w-4 text-primary-500" />;
  };

  /**
   * Format status badge
   */
  const getStatusBadge = (status: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    if (status === 'active') {
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          Active
        </span>
      );
    }
    
    return (
      <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
        Visitor
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading members...</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No members found</p>
        <p className="text-sm text-gray-400 mt-2">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center font-semibold text-gray-700 hover:text-gray-900"
                >
                  Name
                  {renderSortIcon('name')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center font-semibold text-gray-700 hover:text-gray-900"
                >
                  Status
                  {renderSortIcon('status')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('small_group')}
                  className="flex items-center font-semibold text-gray-700 hover:text-gray-900"
                >
                  Small Group
                  {renderSortIcon('small_group')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center font-semibold text-gray-700 hover:text-gray-900"
                >
                  Email
                  {renderSortIcon('email')}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('phone')}
                  className="flex items-center font-semibold text-gray-700 hover:text-gray-900"
                >
                  Phone
                  {renderSortIcon('phone')}
                </button>
              </TableHead>
              <TableHead className="text-right">
                <span className="font-semibold text-gray-700">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  {member.first_name} {member.last_name}
                </TableCell>
                <TableCell>
                  {getStatusBadge(member.status)}
                </TableCell>
                <TableCell>
                  {member.small_group ? (
                    <span className="text-gray-700">{member.small_group.name}</span>
                  ) : (
                    <span className="text-gray-400 italic">None</span>
                  )}
                </TableCell>
                <TableCell className="text-gray-600">
                  {member.email}
                </TableCell>
                <TableCell className="text-gray-600">
                  {member.phone}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(member)}
                        className="h-8 w-8 p-0"
                        title="Edit member"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <ArchiveButton
                        itemType="members"
                        itemId={member.id}
                        itemName={`${member.first_name} ${member.last_name}`}
                        onArchiveSuccess={onArchiveSuccess}
                        variant="ghost"
                        size="sm"
                        iconOnly={true}
                        className="h-8 w-8 p-0"
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    className="h-8 w-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});

export default MemberTable;
