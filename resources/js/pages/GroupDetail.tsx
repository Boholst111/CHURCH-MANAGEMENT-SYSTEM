import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Info, 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  ArrowLeft,
  MapPin,
  Clock,
  Mail,
  Phone,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { smallGroupApi, type SmallGroup } from '../lib/smallGroupApi';
import { cn } from '../lib/utils';

/**
 * Tab type definition
 */
type TabType = 'overview' | 'members' | 'schedule' | 'resources' | 'activity';

/**
 * Tab configuration
 */
const tabs = [
  { id: 'overview' as TabType, label: 'Overview', icon: Info },
  { id: 'members' as TabType, label: 'Members', icon: Users },
  { id: 'schedule' as TabType, label: 'Schedule', icon: Calendar },
  { id: 'resources' as TabType, label: 'Resources', icon: FileText },
  { id: 'activity' as TabType, label: 'Activity', icon: Activity },
];

/**
 * GroupDetail Page Component
 * 
 * Displays detailed information about a small group with multiple tabs.
 * 
 * Features:
 * - Hero section with gradient background
 * - Tab navigation (Overview, Members, Schedule, Resources, Activity)
 * - Overview tab with description and meeting details
 * - Members tab with member list and "Add Member" button
 * - Schedule tab with upcoming and past meetings
 * - Responsive design
 * 
 * Validates Requirements: 8.4, 8.5
 * Design Reference: Group Detail View section
 */
const GroupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';

  // State management
  const [group, setGroup] = useState<SmallGroup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  /**
   * Load group details on mount
   */
  useEffect(() => {
    if (id) {
      loadGroupDetails(parseInt(id));
    }
  }, [id]);

  /**
   * Fetch group details from API
   */
  const loadGroupDetails = async (groupId: number) => {
    try {
      setIsLoading(true);
      const data = await smallGroupApi.getSmallGroup(groupId);
      setGroup(data);
    } catch (error: any) {
      showToast('error', 'Failed to load group details');
      console.error('Error loading group details:', error);
      navigate('/small-groups');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle back button click
   */
  const handleBack = () => {
    navigate('/small-groups');
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

  /**
   * Format meeting day and time for display
   */
  const formatMeetingTime = (day: string, time: string) => {
    return `${day}s at ${time}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-neutral-600">Loading group details...</p>
      </div>
    );
  }

  // Not found state
  if (!group) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Group Not Found</h2>
        <p className="text-neutral-600 mb-6">The group you're looking for doesn't exist.</p>
        <Button onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Small Groups
        </Button>
      </div>
    );
  }

  const isActive = group.status !== 'inactive';
  const memberCount = group.member_count || 0;

  return (
    <div>
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Small Groups
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl overflow-hidden mb-8">
        <div className="px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Group Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-white">{group.name}</h1>
                <Badge variant={isActive ? 'success' : 'neutral'}>
                  {isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              
              {/* Leader Info */}
              <div className="flex items-center gap-3 mb-4">
                {group.leader_photo ? (
                  <img
                    src={group.leader_photo}
                    alt={group.leader_name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {getInitials(group.leader_name)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm text-white/80">Led by</p>
                  <p className="text-lg font-medium text-white">{group.leader_name}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">
                    {memberCount} {memberCount === 1 ? 'member' : 'members'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">
                    {formatMeetingTime(group.meeting_day, group.meeting_time)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">{group.location}</span>
                </div>
              </div>
            </div>

            {/* Group Image */}
            {group.image && (
              <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden border-4 border-white/20">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-neutral-200 mb-8">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActiveTab = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 border-b-2 transition-all duration-200 whitespace-nowrap',
                  isActiveTab
                    ? 'border-primary-600 text-primary-600 font-medium'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pb-8">
        {activeTab === 'overview' && <OverviewTab group={group} />}
        {activeTab === 'members' && <MembersTab group={group} isAdmin={isAdmin} />}
        {activeTab === 'schedule' && <ScheduleTab group={group} />}
        {activeTab === 'resources' && <ResourcesTab group={group} />}
        {activeTab === 'activity' && <ActivityTab group={group} />}
      </div>
    </div>
  );
};

/**
 * Overview Tab Component
 */
const OverviewTab: React.FC<{ group: SmallGroup }> = ({ group }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Description */}
      <Card className="lg:col-span-2" padding="lg">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">About This Group</h2>
        <p className="text-neutral-700 leading-relaxed">
          {group.description || 'No description available.'}
        </p>
      </Card>

      {/* Meeting Details */}
      <Card padding="lg">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Meeting Details</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-900">Schedule</p>
              <p className="text-sm text-neutral-600">
                {group.meeting_day}s at {group.meeting_time}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-900">Location</p>
              <p className="text-sm text-neutral-600">{group.location}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-900">Leader</p>
              <p className="text-sm text-neutral-600">{group.leader_name}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

/**
 * Members Tab Component
 */
const MembersTab: React.FC<{ group: SmallGroup; isAdmin: boolean }> = ({ group, isAdmin }) => {
  const members = group.members || [];
  
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
    <div>
      {/* Header with Add Member Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          Members ({members.length})
        </h2>
        {isAdmin && (
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        )}
      </div>

      {/* Members List */}
      {members.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600">No members in this group yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <Card key={member.id} padding="md" hoverable>
              <div className="flex items-center gap-3">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 truncate">{member.name}</p>
                  <p className="text-sm text-neutral-600">Member</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Schedule Tab Component
 */
const ScheduleTab: React.FC<{ group: SmallGroup }> = ({ group }) => {
  // Mock data for upcoming and past meetings
  const upcomingMeetings = [
    {
      id: 1,
      date: '2024-01-15',
      time: group.meeting_time,
      topic: 'Bible Study: Romans Chapter 8',
      location: group.location,
    },
    {
      id: 2,
      date: '2024-01-22',
      time: group.meeting_time,
      topic: 'Prayer and Fellowship',
      location: group.location,
    },
  ];

  const pastMeetings = [
    {
      id: 3,
      date: '2024-01-08',
      time: group.meeting_time,
      topic: 'Bible Study: Romans Chapter 7',
      attendance: 12,
    },
    {
      id: 4,
      date: '2024-01-01',
      time: group.meeting_time,
      topic: 'New Year Fellowship',
      attendance: 15,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Upcoming Meetings */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Upcoming Meetings</h2>
        {upcomingMeetings.length === 0 ? (
          <Card className="text-center py-12">
            <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">No upcoming meetings scheduled.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <Card key={meeting.id} padding="md" hoverable>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="bg-primary-100 rounded-lg p-2">
                      <p className="text-xs font-medium text-primary-600 uppercase">
                        {new Date(meeting.date).toLocaleDateString('en-US', { month: 'short' })}
                      </p>
                      <p className="text-2xl font-bold text-primary-700">
                        {new Date(meeting.date).getDate()}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-2">{meeting.topic}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past Meetings */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Past Meetings</h2>
        {pastMeetings.length === 0 ? (
          <Card className="text-center py-12">
            <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">No past meetings recorded.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {pastMeetings.map((meeting) => (
              <Card key={meeting.id} padding="md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="bg-neutral-100 rounded-lg p-2">
                      <p className="text-xs font-medium text-neutral-600 uppercase">
                        {new Date(meeting.date).toLocaleDateString('en-US', { month: 'short' })}
                      </p>
                      <p className="text-2xl font-bold text-neutral-700">
                        {new Date(meeting.date).getDate()}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-2">{meeting.topic}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{meeting.attendance} attended</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Resources Tab Component
 */
const ResourcesTab: React.FC<{ group: SmallGroup }> = ({ group }) => {
  return (
    <Card className="text-center py-16">
      <FileText className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Resources Yet</h3>
      <p className="text-neutral-600">
        Study materials and shared documents will appear here.
      </p>
    </Card>
  );
};

/**
 * Activity Tab Component
 */
const ActivityTab: React.FC<{ group: SmallGroup }> = ({ group }) => {
  return (
    <Card className="text-center py-16">
      <Activity className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Activity Yet</h3>
      <p className="text-neutral-600">
        Recent activities and attendance history will appear here.
      </p>
    </Card>
  );
};

export default GroupDetail;
