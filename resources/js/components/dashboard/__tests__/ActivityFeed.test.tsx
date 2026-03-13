import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ActivityFeed, Activity } from '../ActivityFeed';

// Wrapper component for tests that need routing
const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('ActivityFeed', () => {
  const mockActivities: Activity[] = [
    {
      id: 1,
      user_name: 'John Doe',
      action: 'created',
      entity_type: 'member',
      entity_id: 123,
      description: 'added a new member',
      created_at: '2024-01-15T10:30:00Z',
      created_at_human: '2 hours ago',
    },
    {
      id: 2,
      user_name: 'Jane Smith',
      action: 'updated',
      entity_type: 'event',
      entity_id: 456,
      description: 'updated an event',
      created_at: '2024-01-15T09:00:00Z',
      created_at_human: '3 hours ago',
    },
  ];

  it('should display loading state when loading prop is true', () => {
    render(<ActivityFeed activities={[]} loading={true} />);
    
    // Check for loading skeleton
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should display activities when data is provided', () => {
    render(
      <RouterWrapper>
        <ActivityFeed activities={mockActivities} loading={false} />
      </RouterWrapper>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('added a new member')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('updated an event')).toBeInTheDocument();
    expect(screen.getByText('3 hours ago')).toBeInTheDocument();
  });

  it('should display empty state when no activities exist', () => {
    render(<ActivityFeed activities={[]} loading={false} />);

    expect(screen.getByText('No recent activities to display')).toBeInTheDocument();
  });

  it('should display all activity fields correctly', () => {
    const singleActivity: Activity[] = [
      {
        id: 1,
        user_name: 'Test User',
        action: 'deleted',
        entity_type: 'member',
        entity_id: 789,
        description: 'removed a member from the system',
        created_at: '2024-01-15T08:00:00Z',
        created_at_human: '5 hours ago',
      },
    ];

    render(
      <RouterWrapper>
        <ActivityFeed activities={singleActivity} loading={false} />
      </RouterWrapper>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('removed a member from the system')).toBeInTheDocument();
    expect(screen.getByText('5 hours ago')).toBeInTheDocument();
  });

  it('should display activities in the order provided', () => {
    const orderedActivities: Activity[] = [
      {
        id: 3,
        user_name: 'User C',
        action: 'created',
        entity_type: 'event',
        entity_id: 1,
        description: 'created event C',
        created_at: '2024-01-15T12:00:00Z',
        created_at_human: '1 hour ago',
      },
      {
        id: 2,
        user_name: 'User B',
        action: 'created',
        entity_type: 'event',
        entity_id: 2,
        description: 'created event B',
        created_at: '2024-01-15T11:00:00Z',
        created_at_human: '2 hours ago',
      },
      {
        id: 1,
        user_name: 'User A',
        action: 'created',
        entity_type: 'event',
        entity_id: 3,
        description: 'created event A',
        created_at: '2024-01-15T10:00:00Z',
        created_at_human: '3 hours ago',
      },
    ];

    render(
      <RouterWrapper>
        <ActivityFeed activities={orderedActivities} loading={false} />
      </RouterWrapper>
    );

    const activities = screen.getAllByText(/created event/);
    expect(activities[0]).toHaveTextContent('created event C');
    expect(activities[1]).toHaveTextContent('created event B');
    expect(activities[2]).toHaveTextContent('created event A');
  });

  it('should not show loading state when loading is false', () => {
    render(
      <RouterWrapper>
        <ActivityFeed activities={mockActivities} loading={false} />
      </RouterWrapper>
    );

    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(0);
  });

  it('should display "View All Activities" link when activities exist', () => {
    render(
      <RouterWrapper>
        <ActivityFeed activities={mockActivities} loading={false} />
      </RouterWrapper>
    );

    const viewAllLink = screen.getByText('View All Activities');
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink.closest('a')).toHaveAttribute('href', '/activity-log');
  });

  it('should not display "View All Activities" link when no activities exist', () => {
    render(<ActivityFeed activities={[]} loading={false} />);

    const viewAllLink = screen.queryByText('View All Activities');
    expect(viewAllLink).not.toBeInTheDocument();
  });

  it('should display appropriate icons for different action types', () => {
    const activityWithCreate: Activity[] = [
      {
        id: 1,
        user_name: 'User',
        action: 'created',
        entity_type: 'member',
        entity_id: 1,
        description: 'created a member',
        created_at: '2024-01-15T10:00:00Z',
        created_at_human: '1 hour ago',
      },
    ];

    const { container } = render(
      <RouterWrapper>
        <ActivityFeed activities={activityWithCreate} loading={false} />
      </RouterWrapper>
    );

    // Check that an icon is rendered (SVG element)
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should apply correct color classes based on action type', () => {
    const activities: Activity[] = [
      {
        id: 1,
        user_name: 'User',
        action: 'created',
        entity_type: 'member',
        entity_id: 1,
        description: 'created a member',
        created_at: '2024-01-15T10:00:00Z',
        created_at_human: '1 hour ago',
      },
      {
        id: 2,
        user_name: 'User',
        action: 'deleted',
        entity_type: 'member',
        entity_id: 2,
        description: 'deleted a member',
        created_at: '2024-01-15T09:00:00Z',
        created_at_human: '2 hours ago',
      },
    ];

    const { container } = render(
      <RouterWrapper>
        <ActivityFeed activities={activities} loading={false} />
      </RouterWrapper>
    );

    // Check for success color (create action)
    const successIcon = container.querySelector('.bg-success-100');
    expect(successIcon).toBeInTheDocument();

    // Check for error color (delete action)
    const errorIcon = container.querySelector('.bg-error-100');
    expect(errorIcon).toBeInTheDocument();
  });
});
