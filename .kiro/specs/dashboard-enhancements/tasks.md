# Implementation Plan: Dashboard Enhancements

## Overview

This implementation plan transforms the existing church management dashboard into an advanced analytics platform with customizable widgets, real-time updates, and comprehensive comparison features. The implementation follows a backend-first approach, building the data foundation before creating the interactive frontend components.

## Tasks

- [ ] 1. Backend foundation - Database migrations and models
  - [ ] 1.1 Create dashboard_layouts migration
    - Add table for storing user dashboard configurations
    - Include columns: id, user_id, name, is_default, widgets (JSON), timestamps
    - Add unique constraint on (user_id, is_default) where is_default = true
    - Add foreign key constraint to users table
    - _Requirements: Design Section "Data Models - DashboardLayout"_
  
  - [ ] 1.2 Create dashboard_metrics migration
    - Add table for storing time-series metrics data
    - Include columns: id, key, category, value, metadata (JSON), timestamp, period
    - Add indexes on (key, period), timestamp, and category
    - Add enum constraint for category field
    - _Requirements: Design Section "Data Models - DashboardMetric"_
  
  - [ ] 1.3 Create analytics_snapshots migration
    - Add table for storing pre-aggregated analytics data
    - Include columns: id, snapshot_date, metrics (JSON), comparisons (JSON), insights (JSON), timestamps
    - Add unique index on snapshot_date
    - _Requirements: Design Section "Data Models - AnalyticsSnapshot"_
  
  - [ ] 1.4 Create Eloquent models
    - Create DashboardLayout model with relationships and validation
    - Create DashboardMetric model with scopes for filtering
    - Create AnalyticsSnapshot model with JSON casting
    - Add model factories for testing
    - _Requirements: Design Section "Data Models"_

- [ ] 2. Backend services - Analytics and aggregation
  - [ ] 2.1 Create MetricsAggregator service
    - Implement methods for aggregating member growth data
    - Implement methods for aggregating giving patterns
    - Implement methods for aggregating event attendance
    - Add caching layer with 5-minute TTL
    - _Requirements: Design Section "Architecture - Metrics Aggregator"_
  
  - [ ] 2.2 Create AnalyticsService
    - Implement member growth analytics with breakdown options
    - Implement giving patterns analysis with trend calculation
    - Implement event attendance analytics with predictions
    - Add comparison calculation methods
    - _Requirements: Design Section "Architecture - Analytics Service"_
  
  - [ ] 2.3 Create ComparisonEngine service
    - Implement period comparison logic (MoM, YoY, custom)
    - Calculate variance and percentage changes
    - Generate comparison insights
    - _Requirements: Design Section "Architecture - Comparison Engine"_
  
  - [ ]* 2.4 Write property test for comparison calculations
    - **Property 3: Comparison Accuracy**
    - **Validates: Design Section "Correctness Properties - Property 3"**
    - Test that variance calculations are mathematically correct
    - Generate random metric values and verify variance = v1 - v2

- [ ] 3. Backend API endpoints - Dashboard data
  - [ ] 3.1 Create DashboardController with layout endpoints
    - Implement GET /api/dashboard/layout
    - Implement POST /api/dashboard/layout
    - Implement GET /api/dashboard/widgets/available
    - Add validation and authorization
    - _Requirements: Design Section "API Endpoints"_
  
  - [ ] 3.2 Create AnalyticsController with analytics endpoints
    - Implement GET /api/dashboard/analytics/member-growth
    - Implement GET /api/dashboard/analytics/giving-patterns
    - Implement GET /api/dashboard/analytics/event-attendance
    - Add request validation and error handling
    - _Requirements: Design Section "API Endpoints"_
  
  - [ ] 3.3 Create MetricsController for real-time data
    - Implement GET /api/dashboard/metrics/realtime
    - Implement GET /api/dashboard/comparison
    - Add rate limiting (100 requests/minute)
    - _Requirements: Design Section "API Endpoints"_
  
  - [ ]* 3.4 Write unit tests for API controllers
    - Test all endpoint responses and error cases
    - Test validation rules
    - Test authorization checks
    - _Requirements: Design Section "Testing Strategy - Unit Testing"_

- [ ] 4. Checkpoint - Backend foundation complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Frontend state management - Zustand and React Query
  - [ ] 5.1 Create dashboardStore with Zustand
    - Implement layout state management
    - Implement widget state management
    - Implement comparison state management
    - Implement real-time connection state
    - _Requirements: Design Section "State Management - Zustand Store"_
  
  - [ ] 5.2 Create React Query hooks for dashboard data
    - Implement useDashboardLayout hook
    - Implement useMemberGrowthAnalytics hook
    - Implement useGivingPatterns hook
    - Implement useEventAttendanceAnalytics hook
    - Implement useSaveDashboardLayout mutation
    - _Requirements: Design Section "State Management - React Query Hooks"_
  
  - [ ] 5.3 Create useRealtimeMetrics hook with polling fallback
    - Implement polling-based real-time updates
    - Add 30-second refetch interval
    - Handle connection errors gracefully
    - _Requirements: Design Section "State Management - React Query Hooks"_
  
  - [ ]* 5.4 Write unit tests for state management
    - Test Zustand store actions and state updates
    - Test React Query hooks with MSW mocks
    - Test error handling and loading states
    - _Requirements: Design Section "Testing Strategy - Unit Testing"_

- [ ] 6. Core widget components - Base widgets
  - [ ] 6.1 Create RealTimeMetricCard component
    - Display real-time updating metrics
    - Show change indicators and sparklines
    - Handle loading and error states
    - Support number, currency, and percentage formats
    - _Requirements: Design Section "Components - RealTimeMetricCard"_
  
  - [ ] 6.2 Create MemberGrowthChart component
    - Implement line chart with Recharts
    - Support multiple breakdown views (total, by-status, by-age-group)
    - Add interactive tooltips
    - Implement responsive chart sizing
    - _Requirements: Design Section "Components - MemberGrowthChart"_
  
  - [ ] 6.3 Create GivingPatternsWidget component
    - Implement bar/area chart for giving trends
    - Display trend indicators
    - Show recurring vs one-time givers
    - Add export functionality
    - _Requirements: Design Section "Components - GivingPatternsWidget"_
  
  - [ ] 6.4 Create EventAttendanceAnalytics component
    - Implement attendance comparison chart
    - Show expected vs actual attendance
    - Display demographic breakdowns
    - Add attendance predictions
    - _Requirements: Design Section "Components - EventAttendanceAnalytics"_
  
  - [ ]* 6.5 Write unit tests for widget components
    - Test rendering with various data states
    - Test responsive behavior
    - Test error handling
    - _Requirements: Design Section "Testing Strategy - Unit Testing"_

- [ ] 7. Widget grid system - Drag-and-drop layout
  - [ ] 7.1 Install and configure react-grid-layout
    - Add react-grid-layout dependency
    - Configure grid breakpoints and columns
    - Set up responsive grid configuration
    - _Requirements: Design Section "Dependencies - react-grid-layout"_
  
  - [ ] 7.2 Create WidgetGrid component
    - Implement drag-and-drop widget positioning
    - Support widget resize operations
    - Handle responsive breakpoints (mobile, tablet, desktop)
    - Persist layout changes to backend
    - _Requirements: Design Section "Components - WidgetGrid"_
  
  - [ ] 7.3 Create widget registry and factory
    - Register all available widget types
    - Implement widget factory for dynamic rendering
    - Add widget configuration validation
    - _Requirements: Design Section "Components - WidgetGrid"_
  
  - [ ]* 7.4 Write property test for layout validity
    - **Property 5: Responsive Layout Validity**
    - **Validates: Design Section "Correctness Properties - Property 5"**
    - Test that widgets don't overlap at any viewport size
    - Verify minimum size constraints are respected

- [ ] 8. Comparison functionality - Period comparison
  - [ ] 8.1 Create ComparisonSelector component
    - Implement period selection UI
    - Add preset options (MoM, YoY)
    - Support custom period selection
    - Validate period selections
    - _Requirements: Design Section "Components - ComparisonSelector"_
  
  - [ ] 8.2 Integrate comparison into widget components
    - Update MemberGrowthChart to show comparison data
    - Update GivingPatternsWidget to show comparison
    - Update EventAttendanceAnalytics to show comparison
    - Add comparison toggle controls
    - _Requirements: Design Section "Components - Comparison Integration"_
  
  - [ ] 8.3 Create comparison visualization components
    - Implement variance indicators (up/down arrows, percentages)
    - Create comparison overlay for charts
    - Add comparison summary cards
    - _Requirements: Design Section "Architecture - Comparison Engine"_
  
  - [ ]* 8.4 Write property test for comparison accuracy
    - **Property 3: Comparison Accuracy**
    - **Validates: Design Section "Correctness Properties - Property 3"**
    - Verify variance calculations match actual differences
    - Test with various metric values and periods

- [ ] 9. Checkpoint - Core functionality complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Real-time features - WebSocket integration
  - [ ] 10.1 Set up Laravel WebSocket or Pusher integration
    - Configure WebSocket server (Laravel WebSockets or Pusher)
    - Set up Redis for pub/sub
    - Configure broadcasting channels
    - Add authentication for WebSocket connections
    - _Requirements: Design Section "Dependencies - Real-time Communication"_
  
  - [ ] 10.2 Create DashboardRealtimeManager class
    - Implement WebSocket connection management
    - Add subscription management for metrics
    - Handle reconnection with exponential backoff
    - Implement message handling and routing
    - _Requirements: Design Section "State Management - WebSocket Integration"_
  
  - [ ] 10.3 Create backend event broadcasting
    - Create DashboardMetricUpdated event
    - Implement broadcasting logic in services
    - Add channel authorization
    - _Requirements: Design Section "Sequence Diagrams - Real-time Data Update Flow"_
  
  - [ ] 10.4 Integrate real-time updates into widgets
    - Connect widgets to real-time manager
    - Update widget data on metric updates
    - Show connection status indicator
    - Implement fallback to polling on disconnect
    - _Requirements: Design Section "Components - RealTimeMetricCard"_
  
  - [ ]* 10.5 Write integration test for real-time updates
    - **Property 2: Real-time Data Consistency**
    - **Validates: Design Section "Correctness Properties - Property 2"**
    - Test that all subscribed clients receive updates
    - Verify update latency is within threshold

- [ ] 11. Dashboard customization - Edit mode and persistence
  - [ ] 11.1 Create dashboard edit mode UI
    - Add "Customize Dashboard" button
    - Implement edit mode toggle
    - Show widget picker/selector
    - Add save/cancel controls
    - _Requirements: Design Section "Sequence Diagrams - Widget Customization Flow"_
  
  - [ ] 11.2 Create widget picker component
    - Display available widgets with descriptions
    - Support drag-to-add functionality
    - Show widget previews
    - Filter widgets by category
    - _Requirements: Design Section "API Endpoints - GET /api/dashboard/widgets/available"_
  
  - [ ] 11.3 Implement layout persistence
    - Save layout on user action
    - Auto-save with debouncing
    - Handle save errors with retry
    - Store unsaved changes in localStorage
    - _Requirements: Design Section "API Endpoints - POST /api/dashboard/layout"_
  
  - [ ]* 11.4 Write property test for layout persistence
    - **Property 1: Layout Persistence**
    - **Validates: Design Section "Correctness Properties - Property 1"**
    - Test that saved layouts are retrieved correctly
    - Verify all widget configurations are preserved

- [ ] 12. Responsive design - Mobile and tablet optimization
  - [ ] 12.1 Implement mobile-specific layout
    - Create single-column widget stacking for mobile
    - Add swipe gestures for navigation
    - Simplify charts for small screens
    - Implement collapsible widget groups
    - _Requirements: Design Section "Responsive Design - Mobile Optimizations"_
  
  - [ ] 12.2 Implement tablet-specific layout
    - Create two-column grid for tablets
    - Enable horizontal scrolling for wide charts
    - Adjust touch target sizes
    - _Requirements: Design Section "Responsive Design - Tablet Optimizations"_
  
  - [ ] 12.3 Optimize chart responsiveness
    - Implement responsive chart configurations
    - Reduce data points on mobile
    - Adjust margins and font sizes per breakpoint
    - Toggle legend visibility based on screen size
    - _Requirements: Design Section "Responsive Design - Chart Responsiveness"_
  
  - [ ]* 12.4 Write responsive layout tests
    - Test layout at multiple viewport sizes
    - Verify no widget overlaps
    - Test touch interactions on mobile
    - _Requirements: Design Section "Testing Strategy - End-to-End Testing"_

- [ ] 13. Performance optimization - Frontend
  - [ ] 13.1 Implement code splitting for widgets
    - Use React.lazy() for widget components
    - Add Suspense boundaries with loading states
    - Configure Vite for optimal chunking
    - _Requirements: Design Section "Performance Considerations - Code Splitting"_
  
  - [ ] 13.2 Add memoization to expensive operations
    - Memoize chart data transformations
    - Use React.memo for widget components
    - Implement useMemo for derived state
    - Cache comparison calculations
    - _Requirements: Design Section "Performance Considerations - Memoization Strategy"_
  
  - [ ] 13.3 Implement virtual scrolling for activity feed
    - Add react-window for long lists
    - Implement virtual list component
    - Optimize rendering performance
    - _Requirements: Design Section "Performance Considerations - Virtual Scrolling"_
  
  - [ ] 13.4 Add debouncing and throttling
    - Debounce widget resize operations (300ms)
    - Throttle real-time updates (1s)
    - Debounce search inputs (500ms)
    - _Requirements: Design Section "Performance Considerations - Debouncing and Throttling"_

- [ ] 14. Performance optimization - Backend
  - [ ] 14.1 Implement database query optimization
    - Add indexes for frequently queried columns
    - Implement eager loading for relationships
    - Add query result caching
    - _Requirements: Design Section "Performance Considerations - Query Optimization"_
  
  - [ ] 14.2 Implement caching strategy
    - Cache dashboard metrics with 5-minute TTL
    - Cache analytics snapshots with 15-minute TTL
    - Use Redis for metric caching
    - Implement cache warming for popular metrics
    - _Requirements: Design Section "Performance Considerations - Caching Strategy"_
  
  - [ ] 14.3 Create background jobs for data aggregation
    - Create daily metrics aggregation job
    - Create analytics snapshot generation job
    - Schedule jobs with Laravel scheduler
    - _Requirements: Design Section "Performance Considerations - Data Aggregation"_

- [ ] 15. Checkpoint - Performance optimizations complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Error handling - Comprehensive error states
  - [ ] 16.1 Implement widget error boundaries
    - Create error boundary for widget containers
    - Display error state with retry button
    - Log errors to monitoring service
    - Preserve last known good data
    - _Requirements: Design Section "Error Handling - Widget Data Fetch Failure"_
  
  - [ ] 16.2 Implement connection error handling
    - Display connection status indicator
    - Show notification for WebSocket disconnection
    - Implement automatic reconnection
    - Fallback to polling on connection loss
    - _Requirements: Design Section "Error Handling - WebSocket Connection Loss"_
  
  - [ ] 16.3 Implement validation error handling
    - Show validation errors for comparison periods
    - Highlight invalid inputs
    - Suggest valid date ranges
    - Prevent invalid API requests
    - _Requirements: Design Section "Error Handling - Invalid Comparison Period"_
  
  - [ ]* 16.4 Write error handling tests
    - Test widget error states
    - Test connection loss scenarios
    - Test validation error display
    - _Requirements: Design Section "Testing Strategy - Integration Testing"_

- [ ] 17. Security implementation - Authentication and authorization
  - [ ] 17.1 Implement widget access control
    - Add permission checks for sensitive widgets
    - Implement role-based widget visibility
    - Filter data based on user permissions
    - Audit widget access attempts
    - _Requirements: Design Section "Security Considerations - Widget Access Control"_
  
  - [ ] 17.2 Implement API security measures
    - Add rate limiting to dashboard endpoints
    - Validate all input parameters
    - Implement CSRF protection
    - Add request logging
    - _Requirements: Design Section "Security Considerations - API Security"_
  
  - [ ] 17.3 Implement WebSocket security
    - Require JWT token for WebSocket connections
    - Verify user identity on connection
    - Implement connection timeout
    - Validate all incoming messages
    - _Requirements: Design Section "Security Considerations - WebSocket Security"_

- [ ] 18. Accessibility - WCAG 2.1 Level AA compliance
  - [ ] 18.1 Add ARIA labels and roles
    - Add comprehensive ARIA labels to all interactive elements
    - Implement proper role attributes
    - Add aria-live regions for dynamic updates
    - _Requirements: Design Section "Responsive Design - Accessibility Considerations"_
  
  - [ ] 18.2 Implement keyboard navigation
    - Add keyboard support for widget management
    - Implement focus management in edit mode
    - Add keyboard shortcuts for common actions
    - Ensure proper tab order
    - _Requirements: Design Section "Responsive Design - Accessibility Considerations"_
  
  - [ ] 18.3 Ensure color contrast compliance
    - Verify WCAG AA contrast ratios in all themes
    - Test dark mode color contrast
    - Provide alternative visual indicators beyond color
    - _Requirements: Design Section "Responsive Design - Accessibility Considerations"_
  
  - [ ]* 18.4 Write accessibility tests
    - Run axe-core automated tests
    - Test keyboard navigation
    - Verify screen reader announcements
    - _Requirements: Design Section "Testing Strategy - Accessibility Testing"_

- [ ] 19. Integration testing - Complete workflows
  - [ ]* 19.1 Write dashboard customization workflow test
    - Test complete customization flow
    - Verify layout persistence
    - Test widget add/remove/reposition
    - _Requirements: Design Section "Testing Strategy - Integration Testing"_
  
  - [ ]* 19.2 Write real-time updates workflow test
    - Test WebSocket connection and updates
    - Verify fallback to polling
    - Test reconnection behavior
    - _Requirements: Design Section "Testing Strategy - Integration Testing"_
  
  - [ ]* 19.3 Write comparison analysis workflow test
    - Test period selection and comparison
    - Verify comparison calculations
    - Test comparison visualization
    - _Requirements: Design Section "Testing Strategy - Integration Testing"_
  
  - [ ]* 19.4 Write multi-widget interaction test
    - Test independent widget data fetching
    - Verify no state interference between widgets
    - Test concurrent updates
    - **Property 4: Widget Data Isolation**
    - **Validates: Design Section "Correctness Properties - Property 4"**

- [ ] 20. Property-based testing - Universal properties
  - [ ]* 20.1 Write data aggregation correctness property test
    - **Property 6: Data Aggregation Correctness**
    - **Validates: Design Section "Correctness Properties - Property 6"**
    - Test that aggregated values equal F(dataPoints)
    - Generate random data sets and aggregation functions
  
  - [ ]* 20.2 Write widget position property test
    - Test that widget positions never overlap
    - Verify positions are within grid bounds
    - Generate random widget configurations
    - _Requirements: Design Section "Testing Strategy - Property-Based Testing"_
  
  - [ ]* 20.3 Write date range property test
    - Test all date calculations are correct
    - Verify period comparisons (MoM, YoY)
    - Generate random date ranges
    - _Requirements: Design Section "Testing Strategy - Property-Based Testing"_

- [ ] 21. Final checkpoint - Complete system verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 22. Documentation and deployment preparation
  - [ ] 22.1 Create user documentation
    - Document dashboard customization features
    - Create guide for using analytics widgets
    - Document comparison functionality
    - Add troubleshooting section
    - _Requirements: Design Section "Overview"_
  
  - [ ] 22.2 Create developer documentation
    - Document widget creation process
    - Document API endpoints and responses
    - Document state management patterns
    - Add architecture diagrams
    - _Requirements: Design Section "Architecture"_
  
  - [ ] 22.3 Create deployment checklist
    - Document environment variables needed
    - List required migrations
    - Document WebSocket server setup
    - Add Redis configuration steps
    - _Requirements: Design Section "Dependencies - Infrastructure Requirements"_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific design sections for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties from the design
- Unit and integration tests validate specific functionality and workflows
- Backend foundation is built first to support frontend development
- Real-time features can be implemented with polling fallback initially
- Performance optimizations can be deferred until after core functionality is complete
