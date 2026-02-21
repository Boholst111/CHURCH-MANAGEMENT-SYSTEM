import * as fc from 'fast-check';
import { Event } from '../../lib/eventApi';

/**
 * Property-Based Test for Past Event Categorization
 * 
 * Feature: church-management-system
 * Property 27: Past event categorization
 * **Validates: Requirements 9.5**
 * 
 * Property: For any event with a date in the past, it should not appear 
 * in the upcoming events list.
 */

describe('Property 27: Past Event Categorization', () => {
  /**
   * Helper function to categorize events into upcoming and past
   * This mirrors the logic in Events.tsx
   */
  const categorizeEvents = (events: Event[]) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
    
    const upcomingEvents = events
      .filter(event => {
        const eventDate = new Date(event.event_date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= now && event.status === 'upcoming';
      })
      .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
    
    const pastEvents = events
      .filter(event => {
        const eventDate = new Date(event.event_date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < now || event.status === 'completed';
      })
      .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());

    return { upcomingEvents, pastEvents, now };
  };

  /**
   * Generator for past dates (dates before today)
   */
  const pastDateGenerator = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date('2020-01-01'); // Reasonable minimum date
    const maxDate = new Date(today.getTime() - 24 * 60 * 60 * 1000); // Yesterday
    
    return fc.integer({ min: minDate.getTime(), max: maxDate.getTime() })
      .map(timestamp => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      });
  };

  /**
   * Generator for future dates (dates after today)
   */
  const futureDateGenerator = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
    const maxDate = new Date('2030-12-31'); // Reasonable maximum date
    
    return fc.integer({ min: minDate.getTime(), max: maxDate.getTime() })
      .map(timestamp => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      });
  };

  /**
   * Generator for event time in HH:mm:ss format
   */
  const timeGenerator = () => {
    return fc.tuple(
      fc.integer({ min: 0, max: 23 }),
      fc.integer({ min: 0, max: 59 }),
      fc.integer({ min: 0, max: 59 })
    ).map(([hours, minutes, seconds]) => 
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    );
  };

  /**
   * Generator for valid ISO date strings
   */
  const validISODateGenerator = () => {
    const minDate = new Date('2020-01-01');
    const maxDate = new Date('2030-12-31');
    
    return fc.integer({ min: minDate.getTime(), max: maxDate.getTime() })
      .map(timestamp => new Date(timestamp).toISOString());
  };

  /**
   * Generator for event with past date
   */
  const pastEventGenerator = () => {
    return fc.record({
      id: fc.integer({ min: 1, max: 10000 }),
      title: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
      event_date: pastDateGenerator(),
      event_time: timeGenerator(),
      location: fc.string({ minLength: 1, maxLength: 50 }),
      status: fc.constantFrom('upcoming' as const, 'completed' as const, 'cancelled' as const),
      attendance_count: fc.option(fc.integer({ min: 0, max: 500 }), { nil: null }),
      created_at: validISODateGenerator(),
      updated_at: validISODateGenerator(),
    });
  };

  /**
   * Generator for event with future date
   */
  const futureEventGenerator = () => {
    return fc.record({
      id: fc.integer({ min: 1, max: 10000 }),
      title: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
      event_date: futureDateGenerator(),
      event_time: timeGenerator(),
      location: fc.string({ minLength: 1, maxLength: 50 }),
      status: fc.constantFrom('upcoming' as const, 'completed' as const, 'cancelled' as const),
      attendance_count: fc.option(fc.integer({ min: 0, max: 500 }), { nil: null }),
      created_at: validISODateGenerator(),
      updated_at: validISODateGenerator(),
    });
  };

  /**
   * Property Test: Events with past dates should not appear in upcoming events list
   */
  it('should not include events with past dates in the upcoming events list', () => {
    fc.assert(
      fc.property(
        fc.array(pastEventGenerator(), { minLength: 1, maxLength: 20 }),
        (pastEvents) => {
          // Given: A list of events with past dates
          const { upcomingEvents } = categorizeEvents(pastEvents);
          
          // Then: No events should appear in the upcoming events list
          // (because all have past dates, regardless of status)
          expect(upcomingEvents).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Events with past dates should appear in past events list
   */
  it('should include events with past dates in the past events list', () => {
    fc.assert(
      fc.property(
        fc.array(pastEventGenerator(), { minLength: 1, maxLength: 20 }),
        (pastEvents) => {
          // Given: A list of events with past dates
          const { pastEvents: categorizedPastEvents } = categorizeEvents(pastEvents);
          
          // Then: All events should appear in the past events list
          // (either because of past date OR completed status)
          expect(categorizedPastEvents.length).toBeGreaterThan(0);
          
          // Verify all events in past list have either past dates or completed status
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          
          categorizedPastEvents.forEach(event => {
            const eventDate = new Date(event.event_date);
            eventDate.setHours(0, 0, 0, 0);
            
            const isPastDate = eventDate < now;
            const isCompleted = event.status === 'completed';
            
            expect(isPastDate || isCompleted).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Mixed events should be correctly categorized
   * Note: Past events with 'upcoming' status will NOT appear in upcoming list (date takes precedence)
   */
  it('should correctly categorize mixed past and future events', () => {
    fc.assert(
      fc.property(
        fc.array(pastEventGenerator(), { minLength: 1, maxLength: 10 }),
        fc.array(futureEventGenerator(), { minLength: 1, maxLength: 10 }),
        (pastEvents, futureEvents) => {
          // Given: A mix of past and future events
          const allEvents = [...pastEvents, ...futureEvents];
          const { upcomingEvents, pastEvents: categorizedPastEvents } = categorizeEvents(allEvents);
          
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          
          // Then: All upcoming events should have future dates AND upcoming status
          upcomingEvents.forEach(event => {
            const eventDate = new Date(event.event_date);
            eventDate.setHours(0, 0, 0, 0);
            
            expect(eventDate >= now).toBe(true);
            expect(event.status).toBe('upcoming');
          });
          
          // And: All past events should have either past dates OR completed status
          categorizedPastEvents.forEach(event => {
            const eventDate = new Date(event.event_date);
            eventDate.setHours(0, 0, 0, 0);
            
            const isPastDate = eventDate < now;
            const isCompleted = event.status === 'completed';
            
            expect(isPastDate || isCompleted).toBe(true);
          });
          
          // And: No event should appear in both lists
          const upcomingIds = new Set(upcomingEvents.map(e => e.id));
          const pastIds = new Set(categorizedPastEvents.map(e => e.id));
          
          upcomingIds.forEach(id => {
            expect(pastIds.has(id)).toBe(false);
          });
          
          // Note: Events with past dates but 'upcoming' status will be in past list
          // Events with future dates but 'cancelled' status will be in neither list
          // Events with future dates and 'completed' status will be in past list
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Events with status 'completed' should always be in past events
   */
  it('should always categorize completed events as past events regardless of date', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.integer({ min: 1, max: 10000 }),
            title: fc.string({ minLength: 1, maxLength: 50 }),
            description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
            event_date: fc.oneof(pastDateGenerator(), futureDateGenerator()), // Can be past or future
            event_time: timeGenerator(),
            location: fc.string({ minLength: 1, maxLength: 50 }),
            status: fc.constant('completed' as const), // Always completed
            attendance_count: fc.option(fc.integer({ min: 0, max: 500 }), { nil: null }),
            created_at: validISODateGenerator(),
            updated_at: validISODateGenerator(),
          }),
          { minLength: 1, maxLength: 20 }
        ),
        (completedEvents) => {
          // Given: Events with 'completed' status (regardless of date)
          const { upcomingEvents, pastEvents } = categorizeEvents(completedEvents);
          
          // Then: No completed events should appear in upcoming list
          expect(upcomingEvents).toHaveLength(0);
          
          // And: All completed events should appear in past list
          expect(pastEvents.length).toBe(completedEvents.length);
          
          pastEvents.forEach(event => {
            expect(event.status).toBe('completed');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Only events with future dates AND 'upcoming' status appear in upcoming list
   */
  it('should only include events with future dates AND upcoming status in upcoming list', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.integer({ min: 1, max: 10000 }),
            title: fc.string({ minLength: 1, maxLength: 50 }),
            description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
            event_date: futureDateGenerator(), // Future date
            event_time: timeGenerator(),
            location: fc.string({ minLength: 1, maxLength: 50 }),
            status: fc.constant('upcoming' as const), // Upcoming status
            attendance_count: fc.option(fc.integer({ min: 0, max: 500 }), { nil: null }),
            created_at: validISODateGenerator(),
            updated_at: validISODateGenerator(),
          }),
          { minLength: 1, maxLength: 20 }
        ),
        (upcomingStatusEvents) => {
          // Given: Events with future dates and 'upcoming' status
          const { upcomingEvents } = categorizeEvents(upcomingStatusEvents);
          
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          
          // Then: All should appear in upcoming list
          expect(upcomingEvents.length).toBe(upcomingStatusEvents.length);
          
          // And: All have future dates and upcoming status
          upcomingEvents.forEach(event => {
            const eventDate = new Date(event.event_date);
            eventDate.setHours(0, 0, 0, 0);
            
            expect(eventDate >= now).toBe(true);
            expect(event.status).toBe('upcoming');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Events with future dates but non-upcoming status should not appear in upcoming list
   * Note: Cancelled events with future dates will not appear in either list due to current implementation
   */
  it('should not include events with future dates but non-upcoming status in upcoming list', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.integer({ min: 1, max: 10000 }),
            title: fc.string({ minLength: 1, maxLength: 50 }),
            description: fc.option(fc.string({ maxLength: 200 }), { nil: null }),
            event_date: futureDateGenerator(), // Future date
            event_time: timeGenerator(),
            location: fc.string({ minLength: 1, maxLength: 50 }),
            status: fc.constantFrom('completed' as const, 'cancelled' as const), // Non-upcoming status
            attendance_count: fc.option(fc.integer({ min: 0, max: 500 }), { nil: null }),
            created_at: validISODateGenerator(),
            updated_at: validISODateGenerator(),
          }),
          { minLength: 1, maxLength: 20 }
        ),
        (nonUpcomingEvents) => {
          // Given: Events with future dates but non-upcoming status
          const { upcomingEvents, pastEvents } = categorizeEvents(nonUpcomingEvents);
          
          // Then: None should appear in upcoming list
          expect(upcomingEvents).toHaveLength(0);
          
          // And: Only completed events should appear in past list
          // (cancelled events with future dates won't appear in either list)
          const completedEvents = nonUpcomingEvents.filter(e => e.status === 'completed');
          expect(pastEvents.length).toBe(completedEvents.length);
          
          pastEvents.forEach(event => {
            expect(event.status).toBe('completed');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property Test: Empty event list should return empty categorizations
   */
  it('should handle empty event list correctly', () => {
    const { upcomingEvents, pastEvents } = categorizeEvents([]);
    
    expect(upcomingEvents).toHaveLength(0);
    expect(pastEvents).toHaveLength(0);
  });

  /**
   * Unit Test: Today's date edge case
   * Note: This is a unit test rather than property test due to timezone complexities
   */
  it('should correctly categorize events happening today', () => {
    // Create a date object for "today" in local time
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // Create a date string that will parse to the same local date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    
    // Manually create test events for today
    const testCases = [
      // Upcoming event today
      {
        id: 1,
        title: 'Today Upcoming Event',
        description: null,
        event_date: todayString,
        event_time: '10:00:00',
        location: 'Test Location',
        status: 'upcoming' as const,
        attendance_count: null,
        created_at: '2020-01-01T00:00:00.000Z',
        updated_at: '2020-01-01T00:00:00.000Z',
      },
      // Completed event today
      {
        id: 2,
        title: 'Today Completed Event',
        description: null,
        event_date: todayString,
        event_time: '14:00:00',
        location: 'Test Location',
        status: 'completed' as const,
        attendance_count: 50,
        created_at: '2020-01-01T00:00:00.000Z',
        updated_at: '2020-01-01T00:00:00.000Z',
      },
      // Cancelled event today
      {
        id: 3,
        title: 'Today Cancelled Event',
        description: null,
        event_date: todayString,
        event_time: '18:00:00',
        location: 'Test Location',
        status: 'cancelled' as const,
        attendance_count: null,
        created_at: '2020-01-01T00:00:00.000Z',
        updated_at: '2020-01-01T00:00:00.000Z',
      },
    ];
    
    const { upcomingEvents, pastEvents } = categorizeEvents(testCases);
    
    // Then: Upcoming event should be in upcoming list (eventDate >= now)
    expect(upcomingEvents.length).toBe(1);
    expect(upcomingEvents[0].status).toBe('upcoming');
    expect(upcomingEvents[0].id).toBe(1);
    
    // And: Completed event should be in past list
    expect(pastEvents.length).toBe(1);
    expect(pastEvents[0].status).toBe('completed');
    expect(pastEvents[0].id).toBe(2);
    
    // And: Cancelled event won't appear in either list
    const allIds = [...upcomingEvents, ...pastEvents].map(e => e.id);
    expect(allIds).not.toContain(3);
  });
});
