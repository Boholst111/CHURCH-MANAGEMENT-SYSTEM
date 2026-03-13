import React from 'react';
import { render, screen } from '@testing-library/react';
import { UpcomingEvents } from '../UpcomingEvents';
import { UpcomingEvent } from '../../../lib/types';

describe('UpcomingEvents', () => {
  const mockEvents: UpcomingEvent[] = [
    {
      id: 1,
      title: 'Sunday Service',
      event_date: '2024-02-15',
      event_date_formatted: 'Feb 15, 2024',
      event_time: '10:00 AM',
      location: 'Main Sanctuary',
      description: 'Weekly worship service',
    },
    {
      id: 2,
      title: 'Bible Study',
      event_date: '2024-02-18',
      event_date_formatted: 'Feb 18, 2024',
      event_time: '7:00 PM',
      location: 'Fellowship Hall',
      description: 'Midweek Bible study',
    },
    {
      id: 3,
      title: 'Youth Group',
      event_date: '2024-02-20',
      event_date_formatted: 'Feb 20, 2024',
      event_time: '6:00 PM',
      location: 'Youth Center',
      description: 'Youth fellowship and activities',
    },
  ];

  it('renders loading state correctly', () => {
    render(<UpcomingEvents events={[]} loading={true} />);
    
    // Should show skeleton loaders
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders empty state when no events', () => {
    render(<UpcomingEvents events={[]} loading={false} />);
    
    expect(screen.getByText('No upcoming events scheduled')).toBeInTheDocument();
  });

  it('renders events list correctly', () => {
    render(<UpcomingEvents events={mockEvents} loading={false} />);
    
    // Check that all event titles are rendered
    expect(screen.getByText('Sunday Service')).toBeInTheDocument();
    expect(screen.getByText('Bible Study')).toBeInTheDocument();
    expect(screen.getByText('Youth Group')).toBeInTheDocument();
  });

  it('displays event time for each event', () => {
    render(<UpcomingEvents events={mockEvents} loading={false} />);
    
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('7:00 PM')).toBeInTheDocument();
    expect(screen.getByText('6:00 PM')).toBeInTheDocument();
  });

  it('displays event location for each event', () => {
    render(<UpcomingEvents events={mockEvents} loading={false} />);
    
    expect(screen.getByText('Main Sanctuary')).toBeInTheDocument();
    expect(screen.getByText('Fellowship Hall')).toBeInTheDocument();
    expect(screen.getByText('Youth Center')).toBeInTheDocument();
  });

  it('displays date icon with month and day', () => {
    render(<UpcomingEvents events={mockEvents} loading={false} />);
    
    // Check for date elements (day numbers)
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('renders View All Events button', () => {
    render(<UpcomingEvents events={mockEvents} loading={false} />);
    
    const viewAllButton = screen.getByText('View All Events');
    expect(viewAllButton).toBeInTheDocument();
  });

  it('renders correct number of events', () => {
    render(<UpcomingEvents events={mockEvents} loading={false} />);
    
    // Should render 3 event items
    const eventItems = screen.getAllByRole('heading', { level: 4 });
    expect(eventItems).toHaveLength(3);
  });

  it('applies hover styles to event items', () => {
    const { container } = render(<UpcomingEvents events={mockEvents} loading={false} />);
    
    // Check that hover classes are present
    const eventItems = container.querySelectorAll('.hover\\:bg-neutral-50');
    expect(eventItems.length).toBeGreaterThan(0);
  });
});
