import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/button';
import ProfileCard from '../components/leadership/ProfileCard';
import LeadershipForm, { type Leadership as LeadershipType, LeadershipFormData } from '../components/leadership/LeadershipForm';
import DeleteLeadershipDialog from '../components/leadership/DeleteLeadershipDialog';
import { leadershipApi } from '../lib/leadershipApi';

/**
 * Leadership Page Component
 * 
 * Displays a grid of leadership profiles with CRUD operations.
 * 
 * Features:
 * - Display leadership profiles in a responsive grid
 * - Add new leadership profiles (admin only)
 * - Edit existing leadership profiles (admin only)
 * - Delete leadership profiles with confirmation (admin only)
 * - Photo upload support
 * - Toast notifications for success/error feedback
 * 
 * Validates Requirements: 4.1, 4.2, 4.4, 4.5
 */
const Leadership: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';

  // State management
  const [leadership, setLeadership] = useState<LeadershipType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLeadership, setSelectedLeadership] = useState<LeadershipType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Load leadership profiles on mount
   */
  useEffect(() => {
    loadLeadership();
  }, []);

  /**
   * Fetch leadership profiles from API
   */
  const loadLeadership = async () => {
    try {
      setIsLoading(true);
      const data = await leadershipApi.getLeadership();
      setLeadership(data);
    } catch (error: any) {
      showToast('error', 'Failed to load leadership profiles');
      console.error('Error loading leadership:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle add leadership button click
   */
  const handleAddClick = () => {
    setSelectedLeadership(null);
    setIsFormOpen(true);
  };

  /**
   * Handle edit leadership
   */
  const handleEdit = (leader: LeadershipType) => {
    setSelectedLeadership(leader);
    setIsFormOpen(true);
  };

  /**
   * Handle delete leadership button click
   */
  const handleDeleteClick = (leader: LeadershipType) => {
    setSelectedLeadership(leader);
    setIsDeleteDialogOpen(true);
  };

  /**
   * Handle form submission (create or update)
   */
  const handleFormSubmit = async (data: LeadershipFormData, photoFile?: File | null) => {
    try {
      if (selectedLeadership) {
        // Update existing leadership
        await leadershipApi.updateLeadership(selectedLeadership.id, data, photoFile);
        showToast('success', 'Leadership profile updated successfully');
      } else {
        // Create new leadership
        await leadershipApi.createLeadership(data, photoFile);
        showToast('success', 'Leadership profile created successfully');
      }
      
      // Reload leadership list
      await loadLeadership();
      setIsFormOpen(false);
      setSelectedLeadership(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to save leadership profile';
      showToast('error', errorMessage);
      throw error; // Re-throw to prevent form from closing
    }
  };

  /**
   * Handle delete confirmation
   */
  const handleDeleteConfirm = async () => {
    if (!selectedLeadership) return;

    try {
      setIsDeleting(true);
      await leadershipApi.deleteLeadership(selectedLeadership.id);
      showToast('success', 'Leadership profile deleted successfully');
      
      // Reload leadership list
      await loadLeadership();
      setIsDeleteDialogOpen(false);
      setSelectedLeadership(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete leadership profile';
      showToast('error', errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Handle form close
   */
  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedLeadership(null);
  };

  /**
   * Handle delete dialog close
   */
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setSelectedLeadership(null);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pastors & Leadership</h1>
          <p className="text-sm text-gray-600 mt-1">Church leadership and staff directory</p>
        </div>
        {isAdmin && (
          <Button onClick={handleAddClick} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Leadership
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading leadership profiles...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && leadership.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No leadership profiles yet. {isAdmin && 'Click "Add Leadership" to create one.'}
          </p>
        </div>
      )}

      {/* Responsive Grid Layout for Profile Cards */}
      {!isLoading && leadership.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {leadership.map((leader) => (
            <ProfileCard
              key={leader.id}
              leadership={leader}
              onEdit={isAdmin ? handleEdit : undefined}
              onDelete={isAdmin ? handleDeleteClick : undefined}
            />
          ))}
        </div>
      )}

      {/* Leadership Form Dialog */}
      <LeadershipForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        leadership={selectedLeadership}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteLeadershipDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
        leadership={selectedLeadership}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Leadership;
