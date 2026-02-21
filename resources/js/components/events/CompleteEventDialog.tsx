import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CheckCircle } from 'lucide-react';

/**
 * CompleteEventDialog Props
 */
export interface CompleteEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (attendanceCount: number) => Promise<void>;
  eventTitle: string;
}

/**
 * CompleteEventDialog Component
 * 
 * Dialog for marking an event as completed and recording attendance.
 * 
 * Features:
 * - Input field for attendance count
 * - Validation for attendance count (must be >= 0)
 * - Cancel and Complete buttons
 * 
 * Validates Requirements: 9.4
 */
const CompleteEventDialog: React.FC<CompleteEventDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  eventTitle,
}) => {
  const [attendanceCount, setAttendanceCount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Reset form when dialog opens/closes
   */
  React.useEffect(() => {
    if (isOpen) {
      setAttendanceCount('');
      setError('');
    }
  }, [isOpen]);

  /**
   * Validate attendance count
   */
  const validateAttendance = (): boolean => {
    const count = parseInt(attendanceCount, 10);
    
    if (attendanceCount === '' || isNaN(count)) {
      setError('Attendance count is required');
      return false;
    }
    
    if (count < 0) {
      setError('Attendance count must be 0 or greater');
      return false;
    }
    
    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAttendance()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(parseInt(attendanceCount, 10));
      onClose();
    } catch (error) {
      // Error is handled by parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle input change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttendanceCount(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <DialogTitle>Mark Event as Completed</DialogTitle>
          </div>
          <DialogDescription>
            Mark "{eventTitle}" as completed and record the attendance count.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label htmlFor="attendance" className="block text-sm font-medium text-gray-700 mb-2">
              Attendance Count <span className="text-red-500">*</span>
            </label>
            <Input
              id="attendance"
              name="attendance"
              type="number"
              min="0"
              placeholder="e.g., 150"
              value={attendanceCount}
              onChange={handleChange}
              className={error ? 'border-red-500' : ''}
              disabled={isSubmitting}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Completing...' : 'Mark as Completed'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteEventDialog;
