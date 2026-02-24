import React, { useState } from 'react';
import { Archive } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { useToast } from '../../contexts/ToastContext';
import api from '../../lib/api';

/**
 * ArchiveButton Props
 */
export interface ArchiveButtonProps {
  /** The type of item being archived (e.g., 'members', 'events') */
  itemType: string;
  /** The ID of the item to archive */
  itemId: number;
  /** Display name of the item for confirmation dialog */
  itemName: string;
  /** Optional callback after successful archive */
  onArchiveSuccess?: () => void;
  /** Optional button variant */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Optional button size */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Optional custom className */
  className?: string;
  /** Show only icon (no text) */
  iconOnly?: boolean;
}

/**
 * ArchiveButton Component
 * 
 * A reusable button component for archiving items with confirmation dialog.
 * Replaces delete buttons throughout the application with archive terminology.
 * 
 * Features:
 * - Archive icon instead of trash icon
 * - Confirmation dialog with "Archive" terminology
 * - Calls DELETE endpoint (which performs soft delete)
 * - Success/error toast notifications
 * - Loading state during archive operation
 * 
 * Validates Requirements: 2.1, 2.2, 2.3, 2.5
 */
const ArchiveButton: React.FC<ArchiveButtonProps> = ({
  itemType,
  itemId,
  itemName,
  onArchiveSuccess,
  variant = 'outline',
  size = 'sm',
  className = '',
  iconOnly = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const { showToast } = useToast();

  /**
   * Handle archive button click - opens confirmation dialog
   */
  const handleArchiveClick = () => {
    setIsDialogOpen(true);
  };

  /**
   * Handle archive confirmation
   */
  const handleConfirmArchive = async () => {
    setIsArchiving(true);
    try {
      // Call the DELETE endpoint which performs soft delete
      await api.delete(`/${itemType}/${itemId}`);
      
      showToast('success', `${getItemTypeName(itemType)} archived successfully`);
      
      // Close dialog
      setIsDialogOpen(false);
      
      // Call success callback if provided
      if (onArchiveSuccess) {
        onArchiveSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || `Failed to archive ${getItemTypeName(itemType).toLowerCase()}`;
      showToast('error', errorMessage);
    } finally {
      setIsArchiving(false);
    }
  };

  /**
   * Handle dialog close
   */
  const handleCloseDialog = () => {
    if (!isArchiving) {
      setIsDialogOpen(false);
    }
  };

  /**
   * Get human-readable item type name
   */
  const getItemTypeName = (type: string): string => {
    const typeMap: Record<string, string> = {
      'members': 'Member',
      'events': 'Event',
      'leadership': 'Leadership',
      'small-groups': 'Small Group',
      'offerings': 'Offering',
      'expenses': 'Expense',
      'budgets': 'Budget',
      'pledges': 'Pledge',
      'funds': 'Fund',
      'vendors': 'Vendor',
      'expense-categories': 'Expense Category',
      'offering-types': 'Offering Type',
    };
    return typeMap[type] || 'Item';
  };

  return (
    <>
      {/* Archive Button */}
      <Button
        variant={variant}
        size={size}
        onClick={handleArchiveClick}
        className={className}
        title="Archive"
      >
        <Archive className="h-4 w-4" />
        {!iconOnly && <span className="ml-2">Archive</span>}
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Archive className="h-5 w-5 text-orange-600" />
              </div>
              <DialogTitle>Archive {getItemTypeName(itemType)}</DialogTitle>
            </div>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to archive{' '}
              <span className="font-semibold">{itemName}</span>? 
              This item will be moved to the archive and can be restored later by an administrator.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseDialog}
              disabled={isArchiving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleConfirmArchive}
              disabled={isArchiving}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isArchiving ? 'Archiving...' : `Archive ${getItemTypeName(itemType)}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArchiveButton;
