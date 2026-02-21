import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';

/**
 * DeleteEventDialog Props
 */
export interface DeleteEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  eventTitle: string;
}

/**
 * DeleteEventDialog Component
 * 
 * Confirmation dialog for deleting an event.
 * 
 * Features:
 * - Display event title to confirm deletion
 * - Warning message about permanent deletion
 * - Cancel and Delete buttons
 * 
 * Validates Requirements: 9.1
 */
const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  eventTitle,
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  /**
   * Handle delete confirmation
   */
  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      // Error is handled by parent component
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle>Delete Event</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete "{eventTitle}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6">
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
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventDialog;
