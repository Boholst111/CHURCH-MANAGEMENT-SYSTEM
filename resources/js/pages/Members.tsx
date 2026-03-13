import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Upload, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Select } from '../components/ui/select';
import MemberTable, { Member } from '../components/members/MemberTable';
import VirtualMemberTable from '../components/members/VirtualMemberTable';
import MemberForm, { MemberFormData } from '../components/members/MemberForm';
import DeleteMemberDialog from '../components/members/DeleteMemberDialog';
import { memberApi } from '../lib/memberApi';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import { useVirtualScrolling } from '../hooks/useVirtualScrolling';
import { useDebounce } from '../hooks/useDebounce';
import api from '../lib/api';

/**
 * Small Group interface for filter dropdown
 */
interface SmallGroup {
  id: number;
  name: string;
}

/**
 * MemberDirectory Page Component
 * 
 * Displays a searchable and filterable directory of church members.
 * 
 * Features:
 * - Search input for filtering members by name or contact info
 * - Filter controls for member status (Active/Visitor)
 * - Add Member button for creating new member records
 * - Data table with sorting and pagination
 * 
 * Validates Requirements: 3.1, 3.2, 3.3, 3.4, 3.7
 */
const Members: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'archived'>('all');
  const [membershipTypeFilter, setMembershipTypeFilter] = useState<string>('all');
  const [smallGroupFilter, setSmallGroupFilter] = useState<string>('all');
  const [smallGroups, setSmallGroups] = useState<SmallGroup[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Export state
  const [isExporting, setIsExporting] = useState(false);
  
  const { showToast } = useToast();
  const { user } = useAuth();
  
  // Check if user can modify data (not readonly)
  const canModify = user?.role !== 'readonly';

  // Determine if we should use virtual scrolling (>100 items)
  const shouldUseVirtualScrolling = useVirtualScrolling(members.length);

  /**
   * Fetch small groups for filter dropdown
   */
  useEffect(() => {
    const fetchSmallGroups = async () => {
      try {
        const response = await api.get('/small-groups');
        if (response.data.success) {
          setSmallGroups(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching small groups:', error);
        setSmallGroups([]);
      }
    };

    fetchSmallGroups();
  }, []);

  /**
   * Fetch members from API
   */
  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '50',
      });

      if (debouncedSearchQuery) {
        params.append('search', debouncedSearchQuery);
      }

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      if (membershipTypeFilter !== 'all') {
        params.append('membership_type', membershipTypeFilter);
      }

      if (smallGroupFilter !== 'all') {
        params.append('small_group_id', smallGroupFilter);
      }

      const response = await api.get(`/members?${params.toString()}`);
      
      if (response.data.success) {
        setMembers(response.data.data || []);
        setTotalPages(response.data.pagination?.last_page || 1);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch members when filters or page changes
   */
  useEffect(() => {
    fetchMembers();
  }, [currentPage, debouncedSearchQuery, statusFilter, membershipTypeFilter, smallGroupFilter]);

  /**
   * Reset to page 1 when filters change
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter, membershipTypeFilter, smallGroupFilter]);

  const handleAddMember = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDeleteMember = (member: Member) => {
    setDeletingMember(member);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: MemberFormData) => {
    try {
      if (editingMember) {
        // Update existing member
        await memberApi.updateMember(editingMember.id, data);
        showToast('success', 'Member updated successfully');
      } else {
        // Create new member
        await memberApi.createMember(data);
        showToast('success', 'Member created successfully');
      }
      
      // Refresh member list
      await fetchMembers();
      setIsFormOpen(false);
      setEditingMember(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to save member';
      showToast('error', errorMessage);
      throw error; // Re-throw to keep form open
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingMember) return;

    setIsDeleting(true);
    try {
      await memberApi.deleteMember(deletingMember.id);
      showToast('success', 'Member deleted successfully');
      
      // Refresh member list
      await fetchMembers();
      setIsDeleteDialogOpen(false);
      setDeletingMember(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete member';
      showToast('error', errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    if (!isDeleting) {
      setIsDeleteDialogOpen(false);
      setDeletingMember(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Handle CSV export with current filters
   */
  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Build params with current filters
      const params = new URLSearchParams();

      if (debouncedSearchQuery) {
        params.append('search', debouncedSearchQuery);
      }

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      if (membershipTypeFilter !== 'all') {
        params.append('membership_type', membershipTypeFilter);
      }

      if (smallGroupFilter !== 'all') {
        params.append('small_group_id', smallGroupFilter);
      }

      // Call export API
      const blob = await memberApi.exportMembers(params);
      
      // Create download link with timestamped filename
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate timestamped filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      link.download = `members_export_${timestamp}.csv`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showToast('success', 'Members exported successfully');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to export members';
      showToast('error', errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Members</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Manage church members and their information
          </p>
        </div>
        <div className="flex items-center gap-3">
          {canModify && (
            <>
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export'}</span>
              </Button>
              <Button 
                onClick={() => {/* TODO: Implement import */}} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Import</span>
              </Button>
              <Button onClick={handleAddMember} className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Member</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </>
          )}
          {!canModify && (
            <Button 
              onClick={handleExport} 
              disabled={isExporting}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export'}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <Input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              iconPosition="left"
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as 'all' | 'active' | 'inactive' | 'archived')}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
          </div>

          {/* Membership Type Filter */}
          <div>
            <Select
              value={membershipTypeFilter}
              onChange={(value) => setMembershipTypeFilter(Array.isArray(value) ? value[0] : value)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'regular', label: 'Regular' },
                { value: 'associate', label: 'Associate' },
                { value: 'visitor', label: 'Visitor' },
              ]}
            />
          </div>

          {/* Small Group Filter */}
          <div className="lg:col-span-4">
            <Select
              value={smallGroupFilter}
              onChange={(value) => setSmallGroupFilter(Array.isArray(value) ? value[0] : value)}
              options={[
                { value: 'all', label: 'All Small Groups' },
                ...smallGroups.map((group) => ({
                  value: group.id.toString(),
                  label: group.name,
                })),
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Member Table */}
      <Card className="p-6">
        {shouldUseVirtualScrolling ? (
          <VirtualMemberTable
            members={members}
            onEdit={canModify ? handleEditMember : undefined}
            onDelete={canModify ? handleDeleteMember : undefined}
            onArchiveSuccess={fetchMembers}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
            height={600}
          />
        ) : (
          <MemberTable
            members={members}
            onEdit={canModify ? handleEditMember : undefined}
            onDelete={canModify ? handleDeleteMember : undefined}
            onArchiveSuccess={fetchMembers}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        )}
      </Card>

      {/* Member Form Modal */}
      <MemberForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingMember(null);
        }}
        onSubmit={handleFormSubmit}
        member={editingMember}
        smallGroups={smallGroups}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteMemberDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        member={deletingMember}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Members;
