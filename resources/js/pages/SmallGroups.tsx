import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Users, Grid, List } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { smallGroupApi, type SmallGroup } from '../lib/smallGroupApi';
import SmallGroupForm, { SmallGroupFormData } from '../components/smallgroups/SmallGroupForm';
import GroupCard from '../components/smallgroups/GroupCard';
import ArchiveButton from '../components/archive/ArchiveButton';

/**
 * SmallGroups Page Component
 * 
 * Displays a list of small groups with member counts and management capabilities.
 * 
 * Features:
 * - Display list of small groups with member counts
 * - Add new small groups (admin only)
 * - View small group details
 * - Toggle between Grid View and List View
 * - Responsive grid layout
 * 
 * Validates Requirements: 8.4, 8.5
 * Design Reference: Small Groups Page Design section
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  /**
   * Load small groups on mount
   */
  useEffect(() => {
    loadSmallGroups();
  }, []);

  /**
   * Fetch small groups from API
   */
  const loadSmallGroups = useCallback(async () => {
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
  }, [showToast]);

  /**
   * Handle add small group button click
   */
  const handleAddClick = useCallback(() => {
    setSelectedGroup(null);
    setIsFormOpen(true);
  }, []);

  /**
   * Handle edit small group button click
   */
  const handleEditClick = useCallback((group: SmallGroup) => {
    setSelectedGroup(group);
    setIsFormOpen(true);
  }, []);

  /**
   * Handle form close
   */
  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setSelectedGroup(null);
  }, []);

  /**
   * Handle form submission
   */
  const handleFormSubmit = useCallback(async (data: SmallGroupFormData) => {
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
  }, [selectedGroup, showToast, loadSmallGroups]);

  /**
   * Handle delete small group button click
   */
  const handleDeleteClick = useCallback((group: SmallGroup) => {
    // Handled by ArchiveButton component
  }, []);

  /**
   * Handle archive success callback
   */
  const handleArchiveSuccess = useCallback(async () => {
    await loadSmallGroups();
  }, [loadSmallGroups]);

  /**
   * Handle view details button click
   */
  const handleViewDetails = useCallback((group: SmallGroup) => {
    // Navigate to group detail page
    window.location.href = `/small-groups/${group.id}`;
  }, []);

  /**
   * Handle manage members button click
   */
  const handleManageMembers = useCallback((group: SmallGroup) => {
    // TODO: Open manage members modal
    console.log('Manage members for group:', group);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Small Groups</h1>
            <p className="text-base text-neutral-600 mt-2">
              Manage small groups and their members
            </p>
          </div>
          {isAdmin && (
            <Button onClick={handleAddClick} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create Group
            </Button>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-white text-primary-600 shadow-sm font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Grid className="h-4 w-4" />
            <span className="text-sm">Grid View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-white text-primary-600 shadow-sm font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <List className="h-4 w-4" />
            <span className="text-sm">List View</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-neutral-600">Loading small groups...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && smallGroups.length === 0 && (
        <Card className="text-center py-16">
          <Users className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Small Groups Yet</h3>
          <p className="text-neutral-600 mb-6">
            {isAdmin 
              ? 'Get started by creating your first small group.' 
              : 'Check back later for small group opportunities.'}
          </p>
          {isAdmin && (
            <Button onClick={handleAddClick}>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          )}
        </Card>
      )}

      {/* Small Groups Grid/List View */}
      {!isLoading && smallGroups.length > 0 && (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {smallGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              viewMode={viewMode}
              onViewDetails={handleViewDetails}
              onEdit={isAdmin ? handleEditClick : undefined}
              onManageMembers={isAdmin ? handleManageMembers : undefined}
              showActions={true}
            />
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
    </div>
  );
};

export default SmallGroups;
