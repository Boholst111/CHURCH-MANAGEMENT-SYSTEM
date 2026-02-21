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
import { Member } from './MemberTable';

/**
 * DeleteMemberDialog Props
 */
export interface DeleteMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  member: Member | null;
  isDeleting?: boolean;
}

/**
 * DeleteMemberDialog Component
 * 
 * Confirmation dialog for deleting a member record.
 * 
 * Features:
 * - Displays member name for confirmation
 * - Warning message about permanent deletion
 * - Cancel and confirm actions
 * - Loading state during deletion
 */
const DeleteMemberDialog: React.FC<DeleteMemberDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  member,
  isDeleting = false,
}) => {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle>Delete Member</DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {member.first_name} {member.last_name}
            </span>
            ? This action cannot be undone.
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
            {isDeleting ? 'Deleting...' : 'Delete Member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMemberDialog;
