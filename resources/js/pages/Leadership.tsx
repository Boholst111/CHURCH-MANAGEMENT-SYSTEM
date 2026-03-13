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
 * Displays church leadership profiles in a modern, responsive grid layout.
 * Implements the Leadership Page Design from the Modern UI/UX Redesign spec.
 * 
 * Layout Structure:
 * - Page header with title "Leadership" and subtitle
 * - "Add Leader" button (admin only) in the header
 * - Organization chart section (placeholder for phase 2)
 * - Responsive grid layout for leader profile cards (1 col mobile, 2 cols tablet, 3 cols desktop)
 * 
 * Features:
 * - Display leadership profiles in a responsive grid
 * - Add new leadership profiles (admin only)
 * - Edit existing leadership profiles (admin only)
 * - Delete leadership profiles with confirmation (admin only)
 * - Photo upload support
 * - Toast notifications for success/error feedback
 * - Loading and empty states
 * 
 * Design Reference: Leadership Page Design section
 * Validates Requirements: 4.1, 4.2, 4.4, 4.5
 * Task: 10.1 Create Leadership page layout
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
    <div className="space-y-6">
      {/* Page Header with Title and Action Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Leadership</h1>
          <p className="text-base text-neutral-600 mt-2">Church leadership structure and roles</p>
        </div>
        {isAdmin && (
          <Button 
            onClick={handleAddClick} 
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Leader
          </Button>
        )}
      </div>

      {/* Organization Chart Section - Placeholder for Phase 2 */}
      {/* This section can be implemented in a future phase with an interactive org chart */}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent mb-4"></div>
            <p className="text-neutral-600">Loading leadership profiles...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && leadership.length === 0 && (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Leadership Profiles</h3>
            <p className="text-neutral-600 mb-6">
              {isAdmin 
                ? 'Get started by adding your first leadership profile to showcase your church leaders.' 
                : 'No leadership profiles have been added yet.'}
            </p>
            {isAdmin && (
              <Button onClick={handleAddClick} variant="primary" size="md">
                <Plus className="h-5 w-5 mr-2" />
                Add First Leader
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Grid Layout for Leader Cards */}
      {!isLoading && leadership.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadership.map((leader) => (
            <ProfileCard
              key={leader.id}
              leadership={leader}
              onEdit={isAdmin ? handleEdit : undefined}
              onDelete={isAdmin ? handleDeleteClick : undefined}
              onArchiveSuccess={loadLeadership}
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
