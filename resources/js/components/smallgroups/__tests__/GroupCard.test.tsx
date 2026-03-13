import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GroupCard, SmallGroup } from '../GroupCard';

describe('GroupCard', () => {
  const mockGroup: SmallGroup = {
    id: 1,
    name: 'Young Adults Fellowship',
    description: 'A group for young adults to connect and grow together',
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
    ],
    status: 'active',
    image: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  describe('Rendering', () => {
    it('renders group name', () => {
      render(<GroupCard group={mockGroup} />);
      expect(screen.getByText('Young Adults Fellowship')).toBeInTheDocument();
    });

    it('renders group description in grid view', () => {
      render(<GroupCard group={mockGroup} viewMode="grid" />);
      expect(screen.getByText(/A group for young adults/)).toBeInTheDocument();
    });

    it('does not render description in list view', () => {
      render(<GroupCard group={mockGroup} viewMode="list" />);
      expect(screen.queryByText(/A group for young adults/)).not.toBeInTheDocument();
    });

    it('renders leader name', () => {
      render(<GroupCard group={mockGroup} />);
      expect(screen.getByText('John Smith')).toBeInTheDocument();
      expect(screen.getByText('Led by')).toBeInTheDocument();
    });

    it('renders leader initials when no photo provided', () => {
      render(<GroupCard group={mockGroup} />);
      expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('renders meeting schedule', () => {
      render(<GroupCard group={mockGroup} />);
      expect(screen.getByText('Wednesdays at 19:00')).toBeInTheDocument();
    });

    it('renders location', () => {
      render(<GroupCard group={mockGroup} />);
      expect(screen.getByText('Church Fellowship Hall')).toBeInTheDocument();
    });

    it('renders member count', () => {
      render(<GroupCard group={mockGroup} />);
      expect(screen.getByText('+9 more')).toBeInTheDocument();
    });

    it('renders active status badge', () => {
      render(<GroupCard group={mockGroup} />);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('renders inactive status badge', () => {
      const inactiveGroup = { ...mockGroup, status: 'inactive' as const };
      render(<GroupCard group={inactiveGroup} />);
      expect(screen.getByText('Inactive')).toBeInTheDocument();
    });
  });

  describe('Member Avatars', () => {
    it('renders member avatars when members provided', () => {
      render(<GroupCard group={mockGroup} />);
      expect(screen.getByText('AJ')).toBeInTheDocument(); // Alice Johnson
      expect(screen.getByText('BW')).toBeInTheDocument(); // Bob Williams
      expect(screen.getByText('CD')).toBeInTheDocument(); // Carol Davis
    });

    it('shows member count badge when no member details available', () => {
      const groupWithoutMembers = { ...mockGroup, members: [] };
      render(<GroupCard group={groupWithoutMembers} />);
      expect(screen.getByText('12 members')).toBeInTheDocument();
    });

    it('displays singular "member" for count of 1', () => {
      const groupWithOneMember = { ...mockGroup, member_count: 1, members: [] };
      render(<GroupCard group={groupWithOneMember} />);
      expect(screen.getByText('1 member')).toBeInTheDocument();
    });

    it('limits displayed member avatars to 4', () => {
      const groupWithManyMembers = {
        ...mockGroup,
        members: [
          { id: 1, name: 'Member 1', photo: null },
          { id: 2, name: 'Member 2', photo: null },
          { id: 3, name: 'Member 3', photo: null },
          { id: 4, name: 'Member 4', photo: null },
          { id: 5, name: 'Member 5', photo: null },
        ],
      };
      render(<GroupCard group={groupWithManyMembers} />);
      
      // Should only render 4 avatars
      const avatars = screen.getAllByTitle(/Member \d/);
      expect(avatars).toHaveLength(4);
    });
  });

  describe('Action Buttons', () => {
    it('renders all action buttons when handlers provided', () => {
      const onViewDetails = jest.fn();
      const onEdit = jest.fn();
      const onManageMembers = jest.fn();

      render(
        <GroupCard
          group={mockGroup}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onManageMembers={onManageMembers}
        />
      );

      expect(screen.getByText('View Details')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Manage Members')).toBeInTheDocument();
    });

    it('calls onViewDetails when View Details button clicked', () => {
      const onViewDetails = jest.fn();
      render(<GroupCard group={mockGroup} onViewDetails={onViewDetails} />);

      fireEvent.click(screen.getByText('View Details'));
      expect(onViewDetails).toHaveBeenCalledWith(mockGroup);
    });

    it('calls onEdit when Edit button clicked', () => {
      const onEdit = jest.fn();
      render(<GroupCard group={mockGroup} onEdit={onEdit} />);

      fireEvent.click(screen.getByText('Edit'));
      expect(onEdit).toHaveBeenCalledWith(mockGroup);
    });

    it('calls onManageMembers when Manage Members button clicked', () => {
      const onManageMembers = jest.fn();
      render(<GroupCard group={mockGroup} onManageMembers={onManageMembers} />);

      fireEvent.click(screen.getByText('Manage Members'));
      expect(onManageMembers).toHaveBeenCalledWith(mockGroup);
    });

    it('does not render action buttons when showActions is false', () => {
      render(
        <GroupCard
          group={mockGroup}
          onViewDetails={jest.fn()}
          onEdit={jest.fn()}
          onManageMembers={jest.fn()}
          showActions={false}
        />
      );

      expect(screen.queryByText('View Details')).not.toBeInTheDocument();
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      expect(screen.queryByText('Manage Members')).not.toBeInTheDocument();
    });

    it('only renders buttons for provided handlers', () => {
      const onEdit = jest.fn();
      render(<GroupCard group={mockGroup} onEdit={onEdit} />);

      expect(screen.queryByText('View Details')).not.toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.queryByText('Manage Members')).not.toBeInTheDocument();
    });
  });

  describe('View Modes', () => {
    it('applies grid view styles by default', () => {
      const { container } = render(<GroupCard group={mockGroup} />);
      const card = container.querySelector('.overflow-hidden');
      expect(card).not.toHaveClass('flex-row');
    });

    it('applies list view styles when viewMode is list', () => {
      const { container } = render(<GroupCard group={mockGroup} viewMode="list" />);
      const card = container.querySelector('.overflow-hidden');
      expect(card).toHaveClass('flex-row');
    });

    it('shows group image in grid view', () => {
      const { container } = render(<GroupCard group={mockGroup} viewMode="grid" />);
      const imageContainer = container.querySelector('.h-48');
      expect(imageContainer).toBeInTheDocument();
    });

    it('does not show group image in list view', () => {
      const { container } = render(<GroupCard group={mockGroup} viewMode="list" />);
      const imageContainer = container.querySelector('.h-48');
      expect(imageContainer).not.toBeInTheDocument();
    });
  });

  describe('Image Handling', () => {
    it('renders group image when provided', () => {
      const groupWithImage = { ...mockGroup, image: 'https://example.com/group.jpg' };
      render(<GroupCard group={groupWithImage} viewMode="grid" />);
      
      const img = screen.getByAltText('Young Adults Fellowship');
      expect(img).toHaveAttribute('src', 'https://example.com/group.jpg');
    });

    it('renders placeholder icon when no image provided', () => {
      render(<GroupCard group={mockGroup} viewMode="grid" />);
      
      // Check for Users icon in the placeholder
      const { container } = render(<GroupCard group={mockGroup} viewMode="grid" />);
      const placeholder = container.querySelector('.h-16.w-16');
      expect(placeholder).toBeInTheDocument();
    });

    it('renders leader photo when provided', () => {
      const groupWithLeaderPhoto = {
        ...mockGroup,
        leader_photo: 'https://example.com/leader.jpg',
      };
      render(<GroupCard group={groupWithLeaderPhoto} />);
      
      const img = screen.getByAltText('John Smith');
      expect(img).toHaveAttribute('src', 'https://example.com/leader.jpg');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing description gracefully', () => {
      const groupWithoutDescription = { ...mockGroup, description: null };
      render(<GroupCard group={groupWithoutDescription} viewMode="grid" />);
      
      expect(screen.getByText('Young Adults Fellowship')).toBeInTheDocument();
    });

    it('handles zero member count', () => {
      const groupWithNoMembers = { ...mockGroup, member_count: 0, members: [] };
      render(<GroupCard group={groupWithNoMembers} />);
      
      expect(screen.getByText('0 members')).toBeInTheDocument();
    });

    it('handles missing status (defaults to active)', () => {
      const groupWithoutStatus = { ...mockGroup, status: undefined };
      render(<GroupCard group={groupWithoutStatus} />);
      
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('handles long group names', () => {
      const groupWithLongName = {
        ...mockGroup,
        name: 'This is a very long group name that should still display correctly',
      };
      render(<GroupCard group={groupWithLongName} />);
      
      expect(
        screen.getByText('This is a very long group name that should still display correctly')
      ).toBeInTheDocument();
    });

    it('handles long location names', () => {
      const groupWithLongLocation = {
        ...mockGroup,
        location: 'Church Fellowship Hall, Building A, Room 123, Downtown Campus',
      };
      render(<GroupCard group={groupWithLongLocation} />);
      
      expect(
        screen.getByText('Church Fellowship Hall, Building A, Room 123, Downtown Campus')
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for images', () => {
      const groupWithImage = { ...mockGroup, image: 'https://example.com/group.jpg' };
      render(<GroupCard group={groupWithImage} viewMode="grid" />);
      
      expect(screen.getByAltText('Young Adults Fellowship')).toBeInTheDocument();
    });

    it('has title attributes for member avatars', () => {
      render(<GroupCard group={mockGroup} />);
      
      expect(screen.getByTitle('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByTitle('Bob Williams')).toBeInTheDocument();
      expect(screen.getByTitle('Carol Davis')).toBeInTheDocument();
    });

    it('buttons are keyboard accessible', () => {
      const onEdit = jest.fn();
      render(<GroupCard group={mockGroup} onEdit={onEdit} />);
      
      const editButton = screen.getByText('Edit');
      editButton.focus();
      expect(editButton).toHaveFocus();
    });
  });
});
