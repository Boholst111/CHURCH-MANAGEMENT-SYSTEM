import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Filter, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import MemberTable, { Member } from '../components/members/MemberTable';
import MemberForm, { MemberFormData } from '../components/members/MemberForm';
import DeleteMemberDialog from '../components/members/DeleteMemberDialog';
import { memberApi } from '../lib/memberApi';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
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
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'visitor'>('all');
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

  /**
   * Debounce search query (300ms delay)
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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
  }, [currentPage, debouncedSearchQuery, statusFilter, smallGroupFilter]);

  /**
   * Reset to page 1 when filters change
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter, smallGroupFilter]);

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
          <h1 className="text-2xl font-bold text-gray-900">Member Directory</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and view all church members and visitors
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export CSV'}</span>
            <span className="sm:hidden">{isExporting ? 'Exporting...' : 'Export'}</span>
          </Button>
          {canModify && (
            <Button onClick={handleAddMember} className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Member</span>
              <span className="sm:hidden">Add</span>
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'visitor')}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All Members</option>
              <option value="active">Active Members</option>
              <option value="visitor">Visitors</option>
            </select>
          </div>

          {/* Small Group Filter */}
          <div className="flex items-center gap-2">
            <select
              value={smallGroupFilter}
              onChange={(e) => setSmallGroupFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All Small Groups</option>
              {smallGroups.map((group) => (
                <option key={group.id} value={group.id.toString()}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Member Table */}
      <Card className="p-6">
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
