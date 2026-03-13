import React from 'react';
import { Edit, User, Mail, Phone, Eye, MessageCircle, Calendar, Users, TrendingUp } from 'lucide-react';
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

/**
 * ProfileCard Component
 * 
 * Displays leadership information in a visually appealing card format with:
 * - Gradient header section
 * - Large circular photo overlapping the header
 * - Name, title, and department
 * - Contact information (email, phone) with icons
 * - Brief biography section
 * - Stats (Years of Service, Ministry Teams, Events Led)
 * - Action buttons (View Profile, Edit, Contact)
 * - Elevated shadow and hover effects
 * 
 * Design Reference: Leader Profile Card section
 * Validates Requirements: 4.1, 4.2, 4.4, 4.5
 * Task: 10.2 Build leader profile card
 */
const ProfileCard: React.FC<ProfileCardProps> = React.memo(({
  leadership,
  onEdit,
  onDelete,
  onArchiveSuccess,
}) => {
  const fullName = `${leadership.first_name} ${leadership.last_name}`;
  const isAdmin = onEdit !== undefined || onDelete !== undefined;

  // Calculate years of service from start_date
  const calculateYearsOfService = (startDate: string): number => {
    const start = new Date(startDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const monthDiff = now.getMonth() - start.getMonth();
    
    // Adjust if the anniversary hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
      return years - 1;
    }
    return years;
  };

  const yearsOfService = calculateYearsOfService(leadership.start_date);

  // Mock data for stats (in a real app, these would come from the API)
  const stats = [
    { label: 'Years of Service', value: yearsOfService.toString(), icon: Calendar },
    { label: 'Ministry Teams', value: '3', icon: Users },
    { label: 'Events Led', value: '45', icon: TrendingUp },
  ];

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
      <CardContent className="p-0">
        {/* Gradient Header Section */}
        <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 h-32" />

        {/* Large Photo Overlapping Header */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col items-center -mt-16 mb-4">
            {leadership.photo_url ? (
              <img
                src={leadership.photo_url}
                alt={fullName}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white bg-neutral-100 flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-neutral-400" />
              </div>
            )}
          </div>

          {/* Name, Title, Department */}
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {fullName}
            </h3>
            <p className="text-lg text-primary-600 font-medium mb-1">
              {leadership.role}
            </p>
            <p className="text-sm text-neutral-600">
              {leadership.department}
            </p>
          </div>

          {/* Contact Information with Icons */}
          <div className="space-y-2 mb-4">
            <a
              href={`mailto:${leadership.email}`}
              className="flex items-center text-sm text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <Mail className="h-4 w-4 mr-2 text-neutral-500" />
              <span className="truncate">{leadership.email}</span>
            </a>
            <a
              href={`tel:${leadership.phone}`}
              className="flex items-center text-sm text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2 text-neutral-500" />
              <span>{leadership.phone}</span>
            </a>
          </div>

          {/* Biography Section */}
          {leadership.bio && (
            <div className="mb-4 pb-4 border-b border-neutral-200">
              <p className="text-base text-neutral-700 line-clamp-3">
                {leadership.bio}
              </p>
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-neutral-200">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-1">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-lg font-bold text-neutral-900">{stat.value}</p>
                  <p className="text-xs text-neutral-600 leading-tight">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {/* View Profile and Contact buttons (always visible) */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  // In a real app, this would navigate to a detailed profile page
                  console.log('View profile:', leadership.id);
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  window.location.href = `mailto:${leadership.email}`;
                }}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Contact
              </Button>
            </div>

            {/* Admin Actions (Edit and Archive) */}
            {isAdmin && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
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
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
