import React, { useState, useCallback, useMemo } from 'react';
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
import VirtualList from '../ui/virtual-list';
import { Member } from './MemberTable';

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
 * VirtualMemberTable Props
 */
export interface VirtualMemberTableProps {
  members: Member[];
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
  onView?: (member: Member) => void;
  onArchiveSuccess?: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  height?: number;
}

/**
 * VirtualMemberTable Component
 * 
 * Displays church members in a sortable data table with virtual scrolling
 * for optimal performance with large datasets (>100 items).
 * 
 * Features:
 * - Virtual scrolling for large lists
 * - Sortable columns
 * - Row actions (edit, delete, view)
 * - Pagination controls
 * - Responsive design
 * 
 * Uses react-window for rendering only visible rows.
 */
const VirtualMemberTable: React.FC<VirtualMemberTableProps> = React.memo(({
  members,
  onEdit,
  onDelete,
  onView,
  onArchiveSuccess,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  height = 600,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    direction: null,
  });
  const [scrollOffset, setScrollOffset] = useState(0);

  /**
   * Get initials from member name for avatar placeholder
   */
  const getInitials = useCallback((firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }, []);

  /**
   * Get membership type from member data
   */
  const getMembershipType = useCallback((member: Member): string => {
    if (member.membership_type) {
      return member.membership_type;
    }
    return member.status === 'active' ? 'regular' : 'visitor';
  }, []);

  /**
   * Format membership type badge
   */
  const getMembershipTypeBadge = useCallback((type: string) => {
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
  }, []);

  /**
   * Handle column sort
   */
  const handleSort = useCallback((column: SortColumn) => {
    setSortConfig((prev) => {
      let direction: SortDirection = 'asc';
      
      if (prev.column === column) {
        if (prev.direction === 'asc') {
          direction = 'desc';
        } else if (prev.direction === 'desc') {
          direction = null;
        }
      }
      
      return { column: direction ? column : null, direction };
    });
  }, []);

  /**
   * Sort members based on current sort configuration
   */
  const sortedMembers = useMemo(() => {
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
  }, [members, sortConfig, getMembershipType]);

  /**
   * Render sort icon for column header
   */
  const renderSortIcon = useCallback((column: SortColumn) => {
    if (sortConfig.column !== column) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 text-gray-400" />;
    }
    
    if (sortConfig.direction === 'asc') {
      return <ChevronUp className="ml-2 h-4 w-4 text-primary-500" />;
    }
    
    return <ChevronDown className="ml-2 h-4 w-4 text-primary-500" />;
  }, [sortConfig]);

  /**
   * Format status badge
   */
  const getStatusBadge = useCallback((status: string) => {
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
  }, []);

  /**
   * Render a single member row
   */
  const renderMemberRow = useCallback((member: Member, index: number, style: React.CSSProperties) => {
    return (
      <div style={style} className="border-b border-gray-200">
        <div className={`flex items-center px-6 py-4 ${index % 2 === 0 ? 'bg-white hover:bg-primary-50' : 'bg-neutral-50 hover:bg-primary-50'} transition-colors`}>
          {/* Photo */}
          <div className="w-16 flex-shrink-0">
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
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0 px-4">
            <p className="font-medium text-gray-900 truncate">
              {member.first_name} {member.last_name}
            </p>
          </div>

          {/* Email */}
          <div className="flex-1 min-w-0 px-4">
            <p className="text-gray-600 truncate">{member.email}</p>
          </div>

          {/* Phone */}
          <div className="flex-1 min-w-0 px-4">
            <p className="text-gray-600 truncate">{member.phone}</p>
          </div>

          {/* Membership Type */}
          <div className="w-32 px-4">
            {getMembershipTypeBadge(getMembershipType(member))}
          </div>

          {/* Small Group */}
          <div className="flex-1 min-w-0 px-4">
            {member.small_group ? (
              <span className="text-gray-700 truncate">{member.small_group.name}</span>
            ) : (
              <span className="text-gray-400 italic">None</span>
            )}
          </div>

          {/* Status */}
          <div className="w-24 px-4">
            {getStatusBadge(member.status)}
          </div>

          {/* Actions */}
          <div className="w-32 flex items-center justify-end gap-2 px-4">
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
        </div>
      </div>
    );
  }, [onView, onEdit, onDelete, onArchiveSuccess, getInitials, getMembershipType, getMembershipTypeBadge, getStatusBadge]);

  /**
   * Handle scroll to save position
   */
  const handleScroll = useCallback((offset: number) => {
    setScrollOffset(offset);
  }, []);

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
      {/* Table Header */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center px-6 py-3">
            <div className="w-16 flex-shrink-0">
              <span className="font-semibold text-gray-700 text-sm">Photo</span>
            </div>
            <div className="flex-1 px-4">
              <button
                onClick={() => handleSort('name')}
                className="flex items-center font-semibold text-gray-700 hover:text-gray-900 text-sm"
              >
                Name
                {renderSortIcon('name')}
              </button>
            </div>
            <div className="flex-1 px-4">
              <button
                onClick={() => handleSort('email')}
                className="flex items-center font-semibold text-gray-700 hover:text-gray-900 text-sm"
              >
                Email
                {renderSortIcon('email')}
              </button>
            </div>
            <div className="flex-1 px-4">
              <button
                onClick={() => handleSort('phone')}
                className="flex items-center font-semibold text-gray-700 hover:text-gray-900 text-sm"
              >
                Phone
                {renderSortIcon('phone')}
              </button>
            </div>
            <div className="w-32 px-4">
              <button
                onClick={() => handleSort('membership_type')}
                className="flex items-center font-semibold text-gray-700 hover:text-gray-900 text-sm"
              >
                Type
                {renderSortIcon('membership_type')}
              </button>
            </div>
            <div className="flex-1 px-4">
              <button
                onClick={() => handleSort('small_group')}
                className="flex items-center font-semibold text-gray-700 hover:text-gray-900 text-sm"
              >
                Small Group
                {renderSortIcon('small_group')}
              </button>
            </div>
            <div className="w-24 px-4">
              <button
                onClick={() => handleSort('status')}
                className="flex items-center font-semibold text-gray-700 hover:text-gray-900 text-sm"
              >
                Status
                {renderSortIcon('status')}
              </button>
            </div>
            <div className="w-32 px-4 text-right">
              <span className="font-semibold text-gray-700 text-sm">Actions</span>
            </div>
          </div>
        </div>

        {/* Virtual Scrolling List */}
        <VirtualList
          items={sortedMembers}
          itemHeight={80}
          height={height}
          renderItem={renderMemberRow}
          onScroll={handleScroll}
          initialScrollOffset={scrollOffset}
        />
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

VirtualMemberTable.displayName = 'VirtualMemberTable';

export default VirtualMemberTable;
