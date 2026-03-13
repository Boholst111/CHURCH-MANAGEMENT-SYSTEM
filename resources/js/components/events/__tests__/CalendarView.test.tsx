import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import CalendarView from '../CalendarView';
import { Event } from '../../../lib/eventApi';

/**
 * CalendarView Component Tests
 * 
 * Tests the calendar view component functionality including:
 * - Rendering monthly calendar grid
 * - Displaying events on correct dates
 * - Color-coding events by category
 * - Navigation between months
 * - "+X more" indicator for days with many events
 * - Clickable day cells and events
 * - Responsive behavior
 * 
 * Design Reference: Calendar View section
 * Task: 12.3 Implement calendar view
 */

describe('CalendarView', () => {
  const mockEvents: Event[] = [
    {
      id: 1,
      title: 'Sunday Service',
      description: 'Weekly worship service',
      event_date: '2024-01-15',
      event_time: '10:00:00',
      location: 'Main Sanctuary',
      status: 'upcoming',
      attendance_count: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      title: 'Bible Study',
      description: 'Midweek Bible study',
      event_date: '2024-01-15',
      event_time: '19:00:00',
      location: 'Fellowship Hall',
      status: 'upcoming',
      attendance_count: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 3,
      title: 'Youth Meeting',
      description: 'Youth group meeting',
      event_date: '2024-01-15',
      event_time: '18:00:00',
      location: 'Youth Room',
      status: 'upcoming',
      attendance_count: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 4,
      title: 'Prayer Meeting',
      description: 'Morning prayer',
      event_date: '2024-01-15',
      event_time: '06:00:00',
      location: 'Prayer Room',
      status: 'upcoming',
      attendance_count: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 5,
      title: 'Community Outreach',
      description: 'Outreach event',
      event_date: '2024-01-20',
      event_time: '14:00:00',
      location: 'Community Center',
      status: 'upcoming',
      attendance_count: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  ];

  it('renders calendar with month and year', () => {
    render(<CalendarView events={[]} />);
    
    // Should display current month and year
    const monthYear = screen.getByText(/\w+ \d{4}/);
    expect(monthYear).toBeInTheDocument();
  });

  it('renders day names header', () => {
    render(<CalendarView events={[]} />);
    
    // Check for day names
    expect(screen.getByText(/Sun/i)).toBeInTheDocument();
    expect(screen.getByText(/Mon/i)).toBeInTheDocument();
    expect(screen.getByText(/Tue/i)).toBeInTheDocument();
    expect(screen.getByText(/Wed/i)).toBeInTheDocument();
    expect(screen.getByText(/Thu/i)).toBeInTheDocument();
    expect(screen.getByText(/Fri/i)).toBeInTheDocument();
    expect(screen.getByText(/Sat/i)).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<CalendarView events={[]} />);
    
    expect(screen.getByLabelText('Previous Month')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByLabelText('Next Month')).toBeInTheDocument();
  });

  it('navigates to previous month when clicking previous button', () => {
    render(<CalendarView events={[]} />);
    
    const currentMonth = screen.getByText(/\w+ \d{4}/).textContent;
    const prevButton = screen.getByLabelText('Previous Month');
    
    fireEvent.click(prevButton);
    
    const newMonth = screen.getByText(/\w+ \d{4}/).textContent;
    expect(newMonth).not.toBe(currentMonth);
  });

  it('navigates to next month when clicking next button', () => {
    render(<CalendarView events={[]} />);
    
    const currentMonth = screen.getByText(/\w+ \d{4}/).textContent;
    const nextButton = screen.getByLabelText('Next Month');
    
    fireEvent.click(nextButton);
    
    const newMonth = screen.getByText(/\w+ \d{4}/).textContent;
    expect(newMonth).not.toBe(currentMonth);
  });

  it('navigates to current month when clicking Today button', () => {
    render(<CalendarView events={[]} />);
    
    // Navigate to next month first
    const nextButton = screen.getByLabelText('Next Month');
    fireEvent.click(nextButton);
    
    // Click Today button
    const todayButton = screen.getByText('Today');
    fireEvent.click(todayButton);
    
    // Should show current month
    const currentDate = new Date();
    const expectedMonth = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    expect(screen.getByText(expectedMonth)).toBeInTheDocument();
  });

  it('displays events on correct dates', () => {
    // Mock current date to January 2024
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-10'));
    
    render(<CalendarView events={mockEvents} />);
    
    // Should display "Sunday Service" on January 15
    expect(screen.getByText('Sunday Service')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  it('shows "+X more" indicator when day has more than 3 events', () => {
    // Mock current date to January 2024
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-10'));
    
    render(<CalendarView events={mockEvents} />);
    
    // January 15 has 4 events, so should show "+1 more"
    expect(screen.getByText('+1 more')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  it('calls onDayClick when clicking a day cell', () => {
    const onDayClick = jest.fn();
    
    // Mock current date to January 2024
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-10'));
    
    render(<CalendarView events={mockEvents} onDayClick={onDayClick} />);
    
    // Find and click the day cell for January 15
    const dayCells = screen.getAllByText('15');
    fireEvent.click(dayCells[0].closest('div[class*="cursor-pointer"]')!);
    
    expect(onDayClick).toHaveBeenCalled();
    
    jest.useRealTimers();
  });

  it('calls onEventClick when clicking an event', () => {
    const onEventClick = jest.fn();
    
    // Mock current date to January 2024
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-10'));
    
    render(<CalendarView events={mockEvents} onEventClick={onEventClick} />);
    
    // Click on "Sunday Service" event
    const eventElement = screen.getByText('Sunday Service');
    fireEvent.click(eventElement);
    
    expect(onEventClick).toHaveBeenCalledWith(mockEvents[0]);
    
    jest.useRealTimers();
  });

  it('renders category legend', () => {
    render(<CalendarView events={[]} />);
    
    expect(screen.getByText('Categories:')).toBeInTheDocument();
    expect(screen.getByText('Worship')).toBeInTheDocument();
    expect(screen.getByText('Outreach')).toBeInTheDocument();
    expect(screen.getByText('Fellowship')).toBeInTheDocument();
    expect(screen.getByText('Training')).toBeInTheDocument();
  });

  it('highlights today with special styling', () => {
    render(<CalendarView events={[]} />);
    
    const today = new Date().getDate();
    const todayElements = screen.getAllByText(today.toString());
    
    // Find the element that represents today (should have special styling)
    const todayElement = todayElements.find(el => {
      const parent = el.closest('span');
      return parent?.className.includes('bg-primary-600');
    });
    
    expect(todayElement).toBeInTheDocument();
  });

  it('renders empty cells for days before first day of month', () => {
    // Mock current date to January 2024 (starts on Monday)
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-10'));
    
    const { container } = render(<CalendarView events={[]} />);
    
    // January 2024 starts on Monday, so there should be 1 empty cell (Sunday)
    const emptyCells = container.querySelectorAll('.bg-neutral-50.min-h-24');
    expect(emptyCells.length).toBeGreaterThan(0);
    
    jest.useRealTimers();
  });

  it('displays all days of the month', () => {
    // Mock current date to January 2024
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-10'));
    
    render(<CalendarView events={[]} />);
    
    // January has 31 days
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  it('limits visible events to 3 per day', () => {
    // Mock current date to January 2024
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-10'));
    
    render(<CalendarView events={mockEvents} />);
    
    // January 15 has 4 events, but only 3 should be visible
    const sundayService = screen.getByText('Sunday Service');
    const bibleStudy = screen.getByText('Bible Study');
    const youthMeeting = screen.getByText('Youth Meeting');
    
    expect(sundayService).toBeInTheDocument();
    expect(bibleStudy).toBeInTheDocument();
    expect(youthMeeting).toBeInTheDocument();
    
    // Fourth event should not be visible
    expect(screen.queryByText('Prayer Meeting')).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });

  it('renders responsive day names (abbreviated on mobile)', () => {
    const { container } = render(<CalendarView events={[]} />);
    
    // Check for hidden full names on mobile (sm:inline class)
    const dayHeaders = container.querySelectorAll('.sm\\:inline');
    expect(dayHeaders.length).toBeGreaterThan(0);
    
    // Check for visible abbreviated names on mobile (sm:hidden class)
    const abbreviatedHeaders = container.querySelectorAll('.sm\\:hidden');
    expect(abbreviatedHeaders.length).toBeGreaterThan(0);
  });
});
