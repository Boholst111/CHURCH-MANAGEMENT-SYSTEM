import React, { useState } from 'react';
import { Edit, ChevronUp, ChevronDown, ChevronsUpDown, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SkeletonTable } from '../ui/skeleton';
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
  photo?: string; // Optional photo URL
  membership_type?: 'regular' | 'associate' | 'visitor'; // Optional membership type
}

/**
 * Sort configuration type
 */
type SortColumn = 'name' | 'status' | 'small_group' | 'email' | 'phone' | 'membership_type';
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
  onView?: (member: Member) => void;
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
  onView,
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
   * Get initials from member name for avatar placeholder
   */
  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  /**
   * Get membership type from member data
   * Maps status to membership type for display
   */
  const getMembershipType = (member: Member): string => {
    if (member.membership_type) {
      return member.membership_type;
    }
    // Fallback: map status to membership type
    return member.status === 'active' ? 'regular' : 'visitor';
  };

  /**
   * Format membership type badge
   */
  const getMembershipTypeBadge = (type: string) => {
    const typeMap: Record<string, { variant: 'primary' | 'success' | 'neutral'; label: string }> = {
      regular: { variant: 'primary', label: 'Regular' },
      associate: { variant: 'success', label: 'Associate' },
      visitor: { variant: 'neutral', label: 'Visitor' },
    };

    const config = typeMap[type.toLowerCase()] || typeMap.visitor;
    
    return (
      <Badge variant={config.variant} size="sm" shape="pill">
        {config.label}
      </Badge>
    );
  };

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
        case 'membership_type':
          aValue = getMembershipType(a).toLowerCase();
          bValue = getMembershipType(b).toLowerCase();
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
    if (status === 'active') {
      return (
        <Badge variant="success" size="sm" shape="pill">
          Active
        </Badge>
      );
    }
    
    return (
      <Badge variant="neutral" size="sm" shape="pill">
        Inactive
      </Badge>
    );
  };

  if (isLoading) {
    return <SkeletonTable rows={10} columns={8} />;
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
              <TableHead className="w-16">
                <span className="font-semibold text-gray-700">Photo</span>
              </TableHead>
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
              <TableHead>
                <button
                  onClick={() => handleSort('membership_type')}
                  className="flex items-center font-semibold text-gray-700 hover:text-gray-900"
                >
                  Membership Type
                  {renderSortIcon('membership_type')}
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
                  onClick={() => handleSort('status')}
                  className="flex items-center font-semibold text-gray-700 hover:text-gray-900"
                >
                  Status
                  {renderSortIcon('status')}
                </button>
              </TableHead>
              <TableHead className="text-right">
                <span className="font-semibold text-gray-700">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMembers.map((member, index) => (
              <TableRow 
                key={member.id}
                className={index % 2 === 0 ? 'bg-white hover:bg-primary-50' : 'bg-neutral-50 hover:bg-primary-50'}
              >
                <TableCell>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={`${member.first_name} ${member.last_name}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-700">
                        {getInitials(member.first_name, member.last_name)}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {member.first_name} {member.last_name}
                </TableCell>
                <TableCell className="text-gray-600">
                  {member.email}
                </TableCell>
                <TableCell className="text-gray-600">
                  {member.phone}
                </TableCell>
                <TableCell>
                  {getMembershipTypeBadge(getMembershipType(member))}
                </TableCell>
                <TableCell>
                  {member.small_group ? (
                    <span className="text-gray-700">{member.small_group.name}</span>
                  ) : (
                    <span className="text-gray-400 italic">None</span>
                  )}
                </TableCell>
                <TableCell>
                  {getStatusBadge(member.status)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(member)}
                        className="h-8 w-8 p-0"
                        title="View member"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
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
