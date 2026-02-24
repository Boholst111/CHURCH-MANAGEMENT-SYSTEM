import React, { useState, useEffect } from 'react';
import { Archive, RotateCcw, Trash2, Search, Filter } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import {
  fetchAllArchived,
  restoreArchivedItem,
  forceDeleteArchivedItem,
  ArchivedItem,
} from '../lib/archiveApi';

/**
 * Archive Management Page Component
 * 
 * Provides interface for administrators to view, restore, and manage archived items.
 * 
 * Features:
 * - Display all archived items grouped by type
 * - Filter by item type
 * - Search functionality
 * - Restore archived items
 * - Permanent delete (admin only)
 * 
 * Validates Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 */
const ArchiveManagement: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  // State
  const [archivedItems, setArchivedItems] = useState<{ [key: string]: ArchivedItem[] }>({});
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Restore dialog state
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [itemToRestore, setItemToRestore] = useState<ArchivedItem | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  
  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ArchivedItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  /**
   * Fetch archived items on mount
   */
  useEffect(() => {
    loadArchivedItems();
  }, []);

  /**
   * Load archived items from API
   */
  const loadArchivedItems = async () => {
    try {
      setLoading(true);
      const data = await fetchAllArchived();
      setArchivedItems(data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to load archived items';
      showToast('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get human-readable type name
   */
  const getTypeName = (type: string): string => {
    const typeMap: Record<string, string> = {
      'members': 'Members',
      'events': 'Events',
      'leadership': 'Leadership',
      'small_groups': 'Small Groups',
      'offerings': 'Offerings',
      'expenses': 'Expenses',
      'budgets': 'Budgets',
      'pledges': 'Pledges',
      'funds': 'Funds',
      'vendors': 'Vendors',
      'expense_categories': 'Expense Categories',
      'offering_types': 'Offering Types',
    };
    return typeMap[type] || type;
  };

  /**
   * Get all available types from archived items
   */
  const availableTypes = Object.keys(archivedItems).sort();

  /**
   * Filter and search archived items
   */
  const getFilteredItems = (): { [key: string]: ArchivedItem[] } => {
    let filtered = { ...archivedItems };

    // Filter by type
    if (selectedType !== 'all') {
      filtered = { [selectedType]: archivedItems[selectedType] || [] };
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchedItems: { [key: string]: ArchivedItem[] } = {};
      
      Object.entries(filtered).forEach(([type, items]) => {
        const matchedItems = items.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.deleted_by.toLowerCase().includes(query)
        );
        if (matchedItems.length > 0) {
          searchedItems[type] = matchedItems;
        }
      });
      
      filtered = searchedItems;
    }

    return filtered;
  };

  /**
   * Handle restore button click
   */
  const handleRestoreClick = (item: ArchivedItem) => {
    setItemToRestore(item);
    setRestoreDialogOpen(true);
  };

  /**
   * Confirm restore operation
   */
  const handleConfirmRestore = async () => {
    if (!itemToRestore) return;

    setIsRestoring(true);
    try {
      await restoreArchivedItem(itemToRestore.type, itemToRestore.id);
      showToast('success', `${getTypeName(itemToRestore.type)} restored successfully`);
      setRestoreDialogOpen(false);
      setItemToRestore(null);
      
      // Reload archived items
      await loadArchivedItems();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to restore item';
      showToast('error', errorMessage);
    } finally {
      setIsRestoring(false);
    }
  };

  /**
   * Handle permanent delete button click
   */
  const handleDeleteClick = (item: ArchivedItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  /**
   * Handle first delete confirmation
   */
  const handleFirstDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    setDeleteConfirmDialogOpen(true);
  };

  /**
   * Confirm permanent delete operation
   */
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      await forceDeleteArchivedItem(itemToDelete.type, itemToDelete.id);
      showToast('success', `${getTypeName(itemToDelete.type)} permanently deleted`);
      setDeleteConfirmDialogOpen(false);
      setItemToDelete(null);
      
      // Reload archived items
      await loadArchivedItems();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete item';
      showToast('error', errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Get total count of archived items
   */
  const getTotalCount = (): number => {
    return Object.values(archivedItems).reduce((sum, items) => sum + items.length, 0);
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Archive className="mr-3 h-8 w-8 text-primary-600" />
          Archive Management
        </h1>
        <p className="mt-2 text-gray-600">
          View and manage archived items. Restore items or permanently delete them.
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Type Filter */}
          <div className="flex-1">
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
              <Filter className="inline h-4 w-4 mr-1" />
              Filter by Type
            </label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types ({getTotalCount()})</option>
              {availableTypes.map(type => (
                <option key={type} value={type}>
                  {getTypeName(type)} ({archivedItems[type]?.length || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              <Search className="inline h-4 w-4 mr-1" />
              Search
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Search by name or archived by..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            Loading archived items...
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!loading && getTotalCount() === 0 && (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <Archive className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No archived items</p>
            <p className="text-sm mt-2">Archived items will appear here</p>
          </div>
        </Card>
      )}

      {/* No Results State */}
      {!loading && getTotalCount() > 0 && Object.keys(filteredItems).length === 0 && (
        <Card className="p-8">
          <div className="text-center text-gray-500">
            <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm mt-2">Try adjusting your filters or search query</p>
          </div>
        </Card>
      )}

      {/* Archived Items by Type */}
      {!loading && Object.entries(filteredItems).map(([type, items]) => (
        <Card key={type} className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {getTypeName(type)} ({items.length})
          </h2>
          
          <div className="space-y-3">
            {items.map(item => (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:gap-4 mt-1 text-sm text-gray-600">
                    <span>
                      Archived: {formatDate(item.deleted_at)}
                    </span>
                    <span>
                      By: {item.deleted_by}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {/* Restore Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestoreClick(item)}
                    title="Restore"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Restore</span>
                  </Button>

                  {/* Permanent Delete Button (Admin Only) */}
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(item)}
                      title="Permanently Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Delete</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Restore Confirmation Dialog */}
      <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <RotateCcw className="h-5 w-5 text-green-600" />
              </div>
              <DialogTitle>Restore Item</DialogTitle>
            </div>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to restore{' '}
              <span className="font-semibold">{itemToRestore?.name}</span>?
              This item will be restored and become active again.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRestoreDialogOpen(false)}
              disabled={isRestoring}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleConfirmRestore}
              disabled={isRestoring}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRestoring ? 'Restoring...' : 'Restore'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* First Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <DialogTitle>Permanently Delete Item</DialogTitle>
            </div>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-sm font-semibold text-red-800 mb-2">
                ⚠️ Warning: This action cannot be undone!
              </p>
              <p className="text-sm text-red-700">
                Permanently deleting this item will remove it from the database forever.
                This operation is irreversible.
              </p>
            </div>
            <p className="text-sm text-gray-700">
              Are you sure you want to permanently delete{' '}
              <span className="font-semibold">{itemToDelete?.name}</span>?
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleFirstDeleteConfirm}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmDialogOpen} onOpenChange={setDeleteConfirmDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <DialogTitle>Final Confirmation</DialogTitle>
            </div>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-gray-700 font-medium mb-4">
              This is your final confirmation. Please confirm that you want to permanently delete:
            </p>
            <div className="bg-gray-100 rounded-md p-3 mb-4">
              <p className="text-sm font-semibold text-gray-900">{itemToDelete?.name}</p>
              <p className="text-xs text-gray-600 mt-1">
                Type: {itemToDelete ? getTypeName(itemToDelete.type) : ''}
              </p>
            </div>
            <p className="text-sm text-red-600 font-medium">
              This action is permanent and cannot be undone.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirmDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Permanently Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArchiveManagement;
