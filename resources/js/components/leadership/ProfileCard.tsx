import React from 'react';
import { Edit, User } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import ArchiveButton from '../archive/ArchiveButton';

interface Leadership {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo_url: string | null;
  bio: string | null;
  start_date: string;
}

interface ProfileCardProps {
  leadership: Leadership;
  onEdit?: (leadership: Leadership) => void;
  onDelete?: (leadership: Leadership) => void;
  onArchiveSuccess?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  leadership,
  onEdit,
  onDelete,
  onArchiveSuccess,
}) => {
  const fullName = `${leadership.first_name} ${leadership.last_name}`;
  const isAdmin = onEdit !== undefined || onDelete !== undefined;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Photo Section */}
        <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 h-48 flex items-center justify-center">
          {leadership.photo_url ? (
            <img
              src={leadership.photo_url}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <User className="w-12 h-12 text-primary-500" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Name */}
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {fullName}
          </h3>

          {/* Role */}
          <p className="text-sm font-medium text-primary-600 mb-3">
            {leadership.role}
          </p>

          {/* Department Tag */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
              {leadership.department}
            </span>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit?.(leadership)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <ArchiveButton
                itemType="leadership"
                itemId={leadership.id}
                itemName={fullName}
                onArchiveSuccess={onArchiveSuccess}
                variant="outline"
                size="sm"
                className="flex-1"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
