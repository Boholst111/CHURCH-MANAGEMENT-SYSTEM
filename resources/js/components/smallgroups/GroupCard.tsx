import React from 'react';
import { Users, Calendar, MapPin, Edit, Eye, UserPlus } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

/**
 * Small Group interface
 */
export interface SmallGroup {
  id: number;
  name: string;
  description: string | null;
  leader_name: string;
  leader_photo?: string | null;
  meeting_day: string;
  meeting_time: string;
  location: string;
  member_count?: number;
  members?: Array<{
    id: number;
    name: string;
    photo?: string | null;
  }>;
  status?: 'active' | 'inactive';
  image?: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * GroupCard Props
 */
export interface GroupCardProps {
  group: SmallGroup;
  onViewDetails?: (group: SmallGroup) => void;
  onEdit?: (group: SmallGroup) => void;
  onManageMembers?: (group: SmallGroup) => void;
  viewMode?: 'grid' | 'list';
  showActions?: boolean;
}

/**
 * GroupCard Component
 * 
 * Displays small group information in a card format with image, leader info,
 * member count, schedule, location, and action buttons.
 * 
 * Features:
 * - Group image or placeholder
 * - Group name and description
 * - Leader photo and name
 * - Member avatars (first 3-4 members)
 * - Status badge (Active/Inactive)
 * - Meeting schedule and location
 * - Action buttons (View Details, Edit, Manage Members)
 * - Hover effects
 * - Supports both grid and list view modes
 * 
 * Design Reference: Small Groups Page Design section
 * Validates Requirements: 8.4, 8.5
 */
export const GroupCard: React.FC<GroupCardProps> = React.memo(({
  group,
  onViewDetails,
  onEdit,
  onManageMembers,
  viewMode = 'grid',
  showActions = true,
}) => {
  const isActive = group.status !== 'inactive';
  const memberCount = group.member_count || 0;
  const displayMembers = group.members?.slice(0, 4) || [];

  /**
   * Format meeting day and time for display
   */
  const formatMeetingTime = (day: string, time: string) => {
    return `${day}s at ${time}`;
  };

  /**
   * Get initials from name for avatar placeholder
   */
  const getInitials = (name: string): string => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card
      className={cn(
        'overflow-hidden hover:shadow-lg transition-all duration-300',
        viewMode === 'list' && 'flex flex-row'
      )}
      hoverable
    >
      {/* Group Image */}
      {viewMode === 'grid' && (
        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
          {group.image ? (
            <img
              src={group.image}
              alt={group.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Users className="h-16 w-16 text-primary-400" />
            </div>
          )}
          
          {/* Status Badge Overlay */}
          <div className="absolute top-4 right-4">
            <Badge variant={isActive ? 'success' : 'neutral'}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className={cn('p-6', viewMode === 'list' && 'flex-1 flex items-center gap-6')}>
        {/* Group Header */}
        <div className={cn('mb-4', viewMode === 'list' && 'flex-1 mb-0')}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                {group.name}
              </h3>
              {viewMode === 'list' && (
                <Badge variant={isActive ? 'success' : 'neutral'} className="mb-2">
                  {isActive ? 'Active' : 'Inactive'}
                </Badge>
              )}
            </div>
          </div>

          {/* Group Description */}
          {group.description && viewMode === 'grid' && (
            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
              {group.description}
            </p>
          )}

          {/* Leader Info */}
          <div className="flex items-center gap-3 mb-4">
            {/* Leader Photo */}
            <div className="relative">
              {group.leader_photo ? (
                <img
                  src={group.leader_photo}
                  alt={group.leader_name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-700">
                    {getInitials(group.leader_name)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Leader Name */}
            <div>
              <p className="text-xs text-neutral-500">Led by</p>
              <p className="text-sm font-medium text-neutral-900">{group.leader_name}</p>
            </div>
          </div>

          {/* Member Avatars */}
          {displayMembers.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {displayMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="relative"
                    style={{ zIndex: displayMembers.length - index }}
                  >
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                        title={member.name}
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center"
                        title={member.name}
                      >
                        <span className="text-xs font-medium text-neutral-600">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <span className="text-sm text-neutral-600">
                {memberCount > displayMembers.length
                  ? `+${memberCount - displayMembers.length} more`
                  : `${memberCount} ${memberCount === 1 ? 'member' : 'members'}`}
              </span>
            </div>
          )}

          {/* Member Count Badge (when no member details available) */}
          {displayMembers.length === 0 && (
            <div className="mb-4">
              <Badge variant="primary">
                <Users className="h-3 w-3 mr-1" />
                {memberCount} {memberCount === 1 ? 'member' : 'members'}
              </Badge>
            </div>
          )}

          {/* Meeting Details */}
          <div className={cn('space-y-2', viewMode === 'list' && 'flex gap-6 space-y-0')}>
            <div className="flex items-center text-sm text-neutral-600">
              <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
              <span>{formatMeetingTime(group.meeting_day, group.meeting_time)}</span>
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <MapPin className="h-4 w-4 mr-2 text-neutral-400" />
              <span className="line-clamp-1">{group.location}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div
            className={cn(
              'mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-2',
              viewMode === 'list' && 'mt-0 pt-0 border-t-0 ml-auto flex-col'
            )}
          >
            {onViewDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(group)}
                className="flex-1 sm:flex-none"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            )}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(group)}
                className="flex-1 sm:flex-none"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            {onManageMembers && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onManageMembers(group)}
                className="flex-1 sm:flex-none"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Manage Members
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
});

GroupCard.displayName = 'GroupCard';

export default GroupCard;
