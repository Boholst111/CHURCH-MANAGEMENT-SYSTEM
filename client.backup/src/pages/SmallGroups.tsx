import React, { useState, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { smallGroupApi, type SmallGroup } from '../lib/smallGroupApi';
import SmallGroupForm, { SmallGroupFormData } from '../components/smallgroups/SmallGroupForm';
import DeleteSmallGroupDialog from '../components/smallgroups/DeleteSmallGroupDialog';

/**
 * SmallGroups Page Component
 * 
 * Displays a list of small groups with member counts and management capabilities.
 * 
 * Features:
 * - Display list of small groups with member counts
 * - Add new small groups (admin only)
 * - View small group details
 * - Responsive grid layout
 * 
 * Validates Requirements: 8.4, 8.5
 */
const SmallGroups: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';

  // State management
  const [smallGroups, setSmallGroups] = useState<SmallGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<SmallGroup | null>(null);
  
  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState<SmallGroup | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Load small groups on mount
   */
  useEffect(() => {
    loadSmallGroups();
  }, []);

  /**
   * Fetch small groups from API
   */
  const loadSmallGroups = async () => {
    try {
      setIsLoading(true);
      const data = await smallGroupApi.getSmallGroups();
      setSmallGroups(data);
    } catch (error: any) {
      showToast('error', 'Failed to load small groups');
      console.error('Error loading small groups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle add small group button click
   */
  const handleAddClick = () => {
    setSelectedGroup(null);
    setIsFormOpen(true);
  };

  /**
   * Handle edit small group button click
   */
  const handleEditClick = (group: SmallGroup) => {
    setSelectedGroup(group);
    setIsFormOpen(true);
  };

  /**
   * Handle form close
   */
  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedGroup(null);
  };

  /**
   * Handle form submission
   */
  const handleFormSubmit = async (data: SmallGroupFormData) => {
    try {
      if (selectedGroup) {
        // Update existing group
        await smallGroupApi.updateSmallGroup(selectedGroup.id, data);
        showToast('success', 'Small group updated successfully');
      } else {
        // Create new group
        await smallGroupApi.createSmallGroup(data);
        showToast('success', 'Small group created successfully');
      }
      await loadSmallGroups();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to save small group';
      showToast('error', errorMessage);
      throw error; // Re-throw to prevent form from closing
    }
  };

  /**
   * Handle delete small group button click
   */
  const handleDeleteClick = (group: SmallGroup) => {
    setDeletingGroup(group);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Handle delete confirmation
   */
  const handleConfirmDelete = async () => {
    if (!deletingGroup) return;

    setIsDeleting(true);
    try {
      await smallGroupApi.deleteSmallGroup(deletingGroup.id);
      showToast('success', 'Small group deleted successfully');
      
      // Refresh small groups list
      await loadSmallGroups();
      setIsDeleteDialogOpen(false);
      setDeletingGroup(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete small group';
      showToast('error', errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Handle close delete dialog
   */
  const handleCloseDeleteDialog = () => {
    if (!isDeleting) {
      setIsDeleteDialogOpen(false);
      setDeletingGroup(null);
    }
  };

  /**
   * Format meeting day and time for display
   */
  const formatMeetingTime = (day: string, time: string) => {
    return `${day}s at ${time}`;
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Small Groups</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage fellowship groups and community connections
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleAddClick} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Small Group
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading small groups...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && smallGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No small groups yet. {isAdmin && 'Click "Add Small Group" to create one.'}
          </p>
        </div>
      )}

      {/* Small Groups Grid */}
      {!isLoading && smallGroups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {smallGroups.map((group) => (
            <Card key={group.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Group Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Led by {group.leader_name}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {group.member_count || 0}
                  </span>
                </div>
              </div>

              {/* Group Description */}
              {group.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {group.description}
                </p>
              )}

              {/* Meeting Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Meets:</span>
                  <span>{formatMeetingTime(group.meeting_day, group.meeting_time)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Location:</span>
                  <span>{group.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {isAdmin && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditClick(group)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClick(group)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Small Group Form Dialog */}
      <SmallGroupForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        smallGroup={selectedGroup}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteSmallGroupDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        smallGroup={deletingGroup}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default SmallGroups;
