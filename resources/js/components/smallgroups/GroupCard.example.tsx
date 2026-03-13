import React from 'react';
import { GroupCard, SmallGroup } from './GroupCard';

/**
 * GroupCard Component Examples
 * 
 * This file demonstrates various usage patterns for the GroupCard component.
 */

// Sample group data
const sampleGroup: SmallGroup = {
  id: 1,
  name: 'Young Adults Fellowship',
  description: 'A vibrant community for young adults to connect, grow in faith, and build lasting friendships through Bible study, worship, and fellowship activities.',
  leader_name: 'John Smith',
  leader_photo: null,
  meeting_day: 'Wednesday',
  meeting_time: '19:00',
  location: 'Church Fellowship Hall',
  member_count: 12,
  members: [
    { id: 1, name: 'Alice Johnson', photo: null },
    { id: 2, name: 'Bob Williams', photo: null },
    { id: 3, name: 'Carol Davis', photo: null },
    { id: 4, name: 'David Brown', photo: null },
  ],
  status: 'active',
  image: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const groupWithImage: SmallGroup = {
  ...sampleGroup,
  id: 2,
  name: 'Prayer Warriors',
  description: 'Dedicated to intercessory prayer for our church, community, and world.',
  image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
  leader_name: 'Sarah Johnson',
  leader_photo: 'https://i.pravatar.cc/150?img=1',
  meeting_day: 'Tuesday',
  meeting_time: '06:00',
  location: 'Prayer Room',
  member_count: 8,
  status: 'active',
};

const inactiveGroup: SmallGroup = {
  ...sampleGroup,
  id: 3,
  name: 'Summer Bible Study',
  description: 'Seasonal Bible study group focusing on the Gospel of John.',
  meeting_day: 'Saturday',
  meeting_time: '10:00',
  location: 'Community Center',
  member_count: 15,
  status: 'inactive',
};

const GroupCardExamples: React.FC = () => {
  const handleViewDetails = (group: SmallGroup) => {
    console.log('View details:', group);
  };

  const handleEdit = (group: SmallGroup) => {
    console.log('Edit group:', group);
  };

  const handleManageMembers = (group: SmallGroup) => {
    console.log('Manage members:', group);
  };

  return (
    <div className="p-8 space-y-12 bg-neutral-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">GroupCard Component Examples</h1>
        <p className="text-neutral-600">
          Demonstrations of the GroupCard component in various configurations
        </p>
      </div>

      {/* Grid View Examples */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Grid View</h2>
        <p className="text-neutral-600 mb-6">
          Default card layout optimized for grid display with image, description, and full details.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GroupCard
            group={sampleGroup}
            viewMode="grid"
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onManageMembers={handleManageMembers}
          />
          <GroupCard
            group={groupWithImage}
            viewMode="grid"
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onManageMembers={handleManageMembers}
          />
          <GroupCard
            group={inactiveGroup}
            viewMode="grid"
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onManageMembers={handleManageMembers}
          />
        </div>
      </section>

      {/* List View Examples */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">List View</h2>
        <p className="text-neutral-600 mb-6">
          Compact horizontal layout optimized for list display with essential information.
        </p>
        <div className="space-y-4">
          <GroupCard
            group={sampleGroup}
            viewMode="list"
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onManageMembers={handleManageMembers}
          />
          <GroupCard
            group={groupWithImage}
            viewMode="list"
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onManageMembers={handleManageMembers}
          />
          <GroupCard
            group={inactiveGroup}
            viewMode="list"
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onManageMembers={handleManageMembers}
          />
        </div>
      </section>

      {/* Without Actions */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Without Action Buttons</h2>
        <p className="text-neutral-600 mb-6">
          Card display without action buttons for read-only views.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GroupCard
            group={sampleGroup}
            viewMode="grid"
            showActions={false}
          />
          <GroupCard
            group={groupWithImage}
            viewMode="grid"
            showActions={false}
          />
        </div>
      </section>

      {/* Selective Actions */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Selective Action Buttons</h2>
        <p className="text-neutral-600 mb-6">
          Cards with only specific action buttons based on user permissions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-neutral-600 mb-2">View Only</p>
            <GroupCard
              group={sampleGroup}
              viewMode="grid"
              onViewDetails={handleViewDetails}
            />
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">View & Edit</p>
            <GroupCard
              group={groupWithImage}
              viewMode="grid"
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
            />
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">Edit & Manage Members</p>
            <GroupCard
              group={inactiveGroup}
              viewMode="grid"
              onEdit={handleEdit}
              onManageMembers={handleManageMembers}
            />
          </div>
        </div>
      </section>

      {/* Edge Cases */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Edge Cases</h2>
        <p className="text-neutral-600 mb-6">
          Handling various data scenarios and edge cases.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-neutral-600 mb-2">No Description</p>
            <GroupCard
              group={{ ...sampleGroup, description: null }}
              viewMode="grid"
              onViewDetails={handleViewDetails}
            />
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">No Members</p>
            <GroupCard
              group={{ ...sampleGroup, member_count: 0, members: [] }}
              viewMode="grid"
              onViewDetails={handleViewDetails}
            />
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">Many Members</p>
            <GroupCard
              group={{
                ...sampleGroup,
                member_count: 25,
                members: [
                  { id: 1, name: 'Member 1', photo: null },
                  { id: 2, name: 'Member 2', photo: null },
                  { id: 3, name: 'Member 3', photo: null },
                  { id: 4, name: 'Member 4', photo: null },
                  { id: 5, name: 'Member 5', photo: null },
                ],
              }}
              viewMode="grid"
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </section>

      {/* Status Variations */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Status Variations</h2>
        <p className="text-neutral-600 mb-6">
          Different group status indicators.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-neutral-600 mb-2">Active Group</p>
            <GroupCard
              group={{ ...sampleGroup, status: 'active' }}
              viewMode="grid"
              onViewDetails={handleViewDetails}
            />
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">Inactive Group</p>
            <GroupCard
              group={{ ...sampleGroup, status: 'inactive' }}
              viewMode="grid"
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupCardExamples;
