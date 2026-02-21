import React from 'react';
import { AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Leadership } from './LeadershipForm';

/**
 * DeleteLeadershipDialog Props
 */
export interface DeleteLeadershipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leadership: Leadership | null;
  isDeleting?: boolean;
}

/**
 * DeleteLeadershipDialog Component
 * 
 * Confirmation dialog for deleting a leadership profile.
 * 
 * Features:
 * - Displays leadership name and role for confirmation
 * - Warning message about permanent deletion
 * - Cancel and confirm actions
 * - Loading state during deletion
 * 
 * Validates Requirements: 4.5
 */
const DeleteLeadershipDialog: React.FC<DeleteLeadershipDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  leadership,
  isDeleting = false,
}) => {
  if (!leadership) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle>Delete Leadership Profile</DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {leadership.first_name} {leadership.last_name}
            </span>
            {' '}({leadership.role})? This action cannot be undone.
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
            {isDeleting ? 'Deleting...' : 'Delete Profile'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLeadershipDialog;
