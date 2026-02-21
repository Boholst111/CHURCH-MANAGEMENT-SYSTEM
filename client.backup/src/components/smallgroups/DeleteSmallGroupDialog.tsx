import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';
import { SmallGroup } from '../../lib/smallGroupApi';

/**
 * DeleteSmallGroupDialog Props
 */
export interface DeleteSmallGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  smallGroup: SmallGroup | null;
  isDeleting?: boolean;
}

/**
 * DeleteSmallGroupDialog Component
 * 
 * Confirmation dialog for deleting a small group.
 * 
 * Features:
 * - Warning message about permanent deletion
 * - Display small group name for confirmation
 * - Disable actions while deletion is in progress
 * 
 * Validates Requirements: 8.4
 */
const DeleteSmallGroupDialog: React.FC<DeleteSmallGroupDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  smallGroup,
  isDeleting = false,
}) => {
  if (!smallGroup) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle>Delete Small Group</DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete <strong>{smallGroup.name}</strong>?
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This action cannot be undone. Members currently assigned to this group will no longer have a small group assignment.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Group'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSmallGroupDialog;
