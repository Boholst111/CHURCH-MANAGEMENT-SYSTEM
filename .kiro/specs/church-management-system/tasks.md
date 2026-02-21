# Implementation Plan: Mahayahay Free Methodist Church Management System

## Overview

This implementation plan outlines the transformation of the existing Student Faculty Management System into a comprehensive Church Management System. The approach follows a phased migration strategy: (1) database migration and cleanup, (2) backend API development, (3) frontend UI transformation, and (4) testing and integration. Each task builds incrementally to ensure the system remains functional throughout the transformation.

## Tasks

- [x] 1. Database Migration and Cleanup
  - [x] 1.1 Create new church database schema
    - Create migration files for members, leadership, small_groups, tithes, events, activities, and church_settings tables
    - Define all columns, data types, indexes, and foreign key constraints
    - Update users table migration to add church-specific role column
    - _Requirements: 1.1, 8.1, 8.2_
  
  - [x] 1.2 Remove old student/faculty database tables
    - Create migration to drop students, faculty, courses, enrollments, grades, and related tables
    - Ensure no foreign key constraints remain pointing to dropped tables
    - _Requirements: 1.1_
  
  - [x] 1.3 Create database seeders for initial church data
    - Create seeder for default admin user with church roles
    - Create seeder for sample members, leadership, and small groups
    - Create seeder for church settings with default values
    - _Requirements: 6.1, 10.2_

- [x] 2. Backend Models and Repositories
  - [x] 2.1 Create Eloquent models for church entities
    - Implement Member, Leadership, SmallGroup, Tithe, Event, Activity, and ChurchSettings models
    - Define relationships (hasMany, belongsTo) between models
    - Implement model validation rules and fillable fields
    - _Requirements: 3.1, 4.1, 8.1, 9.1_
  
  - [x] 2.2 Write property test for Member model CRUD operations
    - **Property 11: Leadership CRUD operations** (adapted for Member)
    - **Validates: Requirements 3.5**
  
  - [x] 2.3 Create repository classes for data access
    - Implement MemberRepository, FinanceRepository, and ActivityRepository
    - Add methods for common queries (search, filter, pagination)
    - Implement query optimization with eager loading
    - _Requirements: 3.2, 3.3, 5.6_

- [x] 3. Backend Services and Business Logic
  - [x] 3.1 Implement MemberService for member management
    - Create methods for member CRUD operations
    - Implement search and filter logic
    - Add validation for member data
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6_
  
  - [x] 3.2 Write property test for member search functionality
    - **Property 5: Search filters members correctly**
    - **Validates: Requirements 3.2**
  
  - [x] 3.3 Write property test for status filtering
    - **Property 6: Status filter accuracy**
    - **Validates: Requirements 3.3**
  
  - [x] 3.4 Implement FinanceService for financial operations
    - Create methods for recording tithes
    - Implement financial calculation methods (totals, averages, trends)
    - Add date range filtering for financial reports
    - _Requirements: 5.6, 5.1_
  
  - [x] 3.5 Write property test for financial calculations
    - **Property 13: Financial calculations accuracy**
    - **Validates: Requirements 5.6**
  
  - [x] 3.6 Implement ReportService for report generation
    - Create methods for generating financial reports
    - Implement demographic data aggregation
    - Add PDF generation using DomPDF
    - _Requirements: 5.1, 5.2, 5.5_
  
  - [x] 3.7 Write property test for PDF generation
    - **Property 12: PDF generation succeeds**
    - **Validates: Requirements 5.5**
  
  - [x] 3.8 Implement ExportService for data export
    - Create CSV export functionality for member directory
    - Add filename timestamping for exports
    - Implement export filtering based on current view
    - _Requirements: 11.1, 11.3, 11.5_
  
  - [x] 3.9 Write property test for export completeness
    - **Property 33: CSV export completeness**
    - **Validates: Requirements 11.1, 11.3**

- [x] 4. Backend API Controllers and Routes
  - [x] 4.1 Remove old student/faculty controllers and routes
    - Delete StudentController, FacultyController, CourseController, and related files
    - Remove all student/faculty API routes from routes/api.php
    - Remove student/faculty middleware and request validation classes
    - _Requirements: 1.2, 1.4_
  
  - [x] 4.2 Implement authentication and authorization
    - Create AuthController with login/logout endpoints
    - Implement CheckRole middleware for role-based access control
    - Create LogActivity middleware for activity logging
    - Update Laravel Sanctum configuration for API authentication
    - _Requirements: 10.1, 10.2, 10.3, 12.1_
  
  - [x] 4.3 Write property test for authentication requirement
    - **Property 28: Authentication requirement**
    - **Validates: Requirements 10.1**
  
  - [x] 4.4 Write property test for read-only role restrictions
    - **Property 29: Read-only role restrictions**
    - **Validates: Requirements 10.3**
  
  - [x] 4.5 Implement DashboardController
    - Create endpoint for quick stats (GET /api/dashboard/stats)
    - Create endpoint for attendance trends (GET /api/dashboard/attendance)
    - Create endpoint for recent activities (GET /api/dashboard/activities)
    - _Requirements: 2.1, 2.2, 2.3, 2.6_
  
  - [x] 4.6 Write property test for dashboard stats accuracy
    - **Property 1: Dashboard stats reflect current data**
    - **Validates: Requirements 2.1, 9.6**
  
  - [x] 4.7 Implement MemberController
    - Create CRUD endpoints for members (GET, POST, PUT, DELETE /api/members)
    - Add search and filter query parameters
    - Implement pagination for member list
    - Add CSV export endpoint (GET /api/members/export)
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.7, 11.1_
  
  - [x] 4.8 Implement LeadershipController
    - Create CRUD endpoints for leadership (GET, POST, PUT, DELETE /api/leadership)
    - Add photo upload handling
    - _Requirements: 4.1, 4.5_
  
  - [x] 4.9 Implement SmallGroupController
    - Create CRUD endpoints for small groups (GET, POST, PUT, DELETE /api/small-groups)
    - Add endpoint to get members by group
    - _Requirements: 8.2, 8.4, 8.6_
  
  - [x] 4.10 Write property test for small group member count
    - **Property 21: Count accuracy invariant**
    - **Validates: Requirements 8.5**
  
  - [x] 4.11 Implement FinanceController
    - Create endpoints for tithe records (GET, POST /api/finance/tithes)
    - Create endpoint for financial summary (GET /api/finance/summary)
    - Add date range filtering
    - _Requirements: 5.6_
  
  - [x] 4.12 Implement EventController
    - Create CRUD endpoints for events (GET, POST, PUT, DELETE /api/events)
    - Add endpoint to mark event as completed (PUT /api/events/{id}/complete)
    - Implement automatic categorization of past/upcoming events
    - _Requirements: 9.1, 9.2, 9.4, 9.5_
  
  - [x] 4.13 Write property test for event chronological sorting
    - **Property 25: Event chronological sorting**
    - **Validates: Requirements 9.3**
  
  - [x] 4.14 Implement ReportController
    - Create endpoint for financial report data (GET /api/reports/financial)
    - Create endpoint for demographic data (GET /api/reports/demographics)
    - Create endpoint for PDF export (POST /api/reports/export-pdf)
    - _Requirements: 5.1, 5.2, 5.5_
  
  - [x] 4.15 Implement SettingsController
    - Create endpoints for church settings (GET, PUT /api/settings/church)
    - Create endpoints for notification preferences (GET, PUT /api/settings/notifications)
    - _Requirements: 6.1, 6.2_
  
  - [x] 4.16 Implement UserController
    - Create CRUD endpoints for user management (GET, POST, PUT, DELETE /api/users)
    - Add role-based access control (admin only)
    - Implement password complexity validation
    - _Requirements: 10.4, 10.5_
  
  - [x] 4.17 Write property test for password complexity enforcement
    - **Property 31: Password complexity enforcement**
    - **Validates: Requirements 10.5**

- [x] 5. Checkpoint - Backend API Complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Frontend Layout and Design System
  - [x] 6.1 Remove old student/faculty frontend code
    - Delete all student/faculty pages from client/src/pages/
    - Delete all student/faculty components from client/src/components/
    - Remove student/faculty routes from App.tsx
    - _Requirements: 1.3_
  
  - [x] 6.2 Implement design system and theme configuration
    - Create CSS variables for color palette (soft blue and white)
    - Configure Tailwind with custom colors, spacing, and border radius
    - Set up Inter/Roboto font family
    - Create ThemeContext for theme management
    - _Requirements: 7.2, 7.3, 7.4, 7.5_
  
  - [x] 6.3 Create reusable UI components
    - Implement Button, Input, Card, Table, and Modal components
    - Apply consistent styling with rounded corners and spacing
    - Add TypeScript interfaces for component props
    - _Requirements: 7.3, 7.4_
  
  - [x] 6.4 Implement main layout with sidebar navigation
    - Create Layout component with sidebar and main content area
    - Create Sidebar component with navigation links to all pages
    - Create Header component with user menu
    - Implement active menu item highlighting
    - Make layout responsive for desktop, tablet, and mobile
    - _Requirements: 7.1, 7.7, 7.8_
  
  - [x] 6.5 Write property test for navigation highlighting
    - **Property 17: Navigation highlighting**
    - **Validates: Requirements 7.7**

- [x] 7. Frontend Dashboard Page
  - [x] 7.1 Implement Dashboard page structure
    - Create Dashboard.tsx page component
    - Set up layout with grid for Quick Stats cards
    - Add sections for attendance chart and activity feed
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 7.2 Implement QuickStatsCard component
    - Create reusable card component for displaying stats
    - Add props for title, value, icon, and trend
    - Format monetary values with currency symbols
    - _Requirements: 2.1, 2.5_
  
  - [x] 7.3 Write property test for currency formatting
    - **Property 3: Currency formatting consistency**
    - **Validates: Requirements 2.5**
  
  - [x] 7.4 Implement AttendanceChart component
    - Use ApexCharts or Recharts for line chart
    - Fetch attendance data from API
    - Display at least 12 months of data
    - _Requirements: 2.2, 2.6_
  
  - [x] 7.5 Implement ActivityFeed component
    - Create list component for recent activities
    - Fetch activities from API
    - Display timestamp, user, and action description
    - _Requirements: 2.3, 12.4_
  
  - [x] 7.6 Implement dashboard data fetching and state management
    - Create API client methods for dashboard endpoints
    - Implement React state management for dashboard data
    - Add loading and error states
    - Implement real-time updates when data changes
    - _Requirements: 2.1, 2.4_
  
  - [x] 7.7 Write unit tests for Dashboard components
    - Test QuickStatsCard rendering with different props
    - Test AttendanceChart with sample data
    - Test ActivityFeed with sample activities
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 8. Frontend Member Directory Page
  - [x] 8.1 Implement MemberDirectory page structure
    - Create MemberDirectory.tsx page component
    - Add search input and filter controls
    - Add "Add Member" button
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 8.2 Implement MemberTable component
    - Create data table with columns for name, status, small group, and contact info
    - Implement sorting by column
    - Add row actions (edit, delete)
    - Implement pagination controls
    - _Requirements: 3.1, 3.7_
  
  - [x] 8.3 Write property test for pagination
    - **Property 9: Pagination triggers correctly**
    - **Validates: Requirements 3.7**
  
  - [x] 8.4 Implement MemberForm component
    - Create form for adding/editing members
    - Add input fields for all member properties
    - Implement form validation
    - Display validation errors inline
    - _Requirements: 3.4, 3.5, 3.6_
  
  - [x] 8.5 Write property test for required field validation
    - **Property 8: Required field validation**
    - **Validates: Requirements 3.6**
  
  - [x] 8.6 Implement member search and filter functionality
    - Add search input with debouncing
    - Implement status filter dropdown (Active/Visitor)
    - Implement small group filter dropdown
    - Update table when filters change
    - _Requirements: 3.2, 3.3, 8.6_
  
  - [x] 8.7 Implement member CRUD operations
    - Create API client methods for member endpoints
    - Implement create member functionality
    - Implement edit member functionality
    - Implement delete member with confirmation
    - Add success/error toast notifications
    - _Requirements: 3.4, 3.5_
  
  - [x] 8.8 Write unit tests for Member Directory components
    - Test MemberTable rendering with sample data
    - Test MemberForm validation
    - Test search and filter interactions
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 9. Frontend Leadership Page
  - [x] 9.1 Implement Leadership page structure
    - Create Leadership.tsx page component
    - Set up responsive grid layout for profile cards
    - Add "Add Leadership" button (admin only)
    - _Requirements: 4.1, 4.4_
  
  - [x] 9.2 Implement ProfileCard component
    - Create card component for leadership profiles
    - Display photo (or placeholder), name, role, and department tags
    - Add edit/delete actions (admin only)
    - _Requirements: 4.2, 4.6_
  
  - [x] 9.3 Write property test for profile card completeness
    - **Property 10: Profile cards display complete information**
    - **Validates: Requirements 4.2, 4.6**
  
  - [x] 9.4 Implement LeadershipForm component
    - Create form for adding/editing leadership profiles
    - Add photo upload functionality
    - Implement form validation
    - _Requirements: 4.5_
  
  - [x] 9.5 Implement leadership CRUD operations
    - Create API client methods for leadership endpoints
    - Implement create leadership functionality
    - Implement edit leadership functionality
    - Implement delete leadership with confirmation
    - _Requirements: 4.5_
  
  - [x] 9.6 Write unit tests for Leadership components
    - Test ProfileCard rendering with and without photo
    - Test LeadershipForm validation
    - Test grid layout responsiveness
    - _Requirements: 4.1, 4.2_

- [x] 10. Frontend Reports & Analytics Page
  - [x] 10.1 Implement Reports page structure
    - Create Reports.tsx page component
    - Add date range selector controls
    - Add export buttons (Print, Download PDF)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 10.2 Implement FinancialChart component
    - Use ApexCharts or Recharts for bar chart
    - Display financial giving over time
    - Update chart when date range changes
    - _Requirements: 5.1_
  
  - [x] 10.3 Implement DemographicChart component
    - Use ApexCharts or Recharts for pie charts
    - Display age and location distribution
    - _Requirements: 5.2_
  
  - [x] 10.4 Implement report controls and export functionality
    - Create ReportControls component with date range picker
    - Implement print functionality (window.print with print-friendly CSS)
    - Implement PDF download (call API endpoint)
    - _Requirements: 5.3, 5.4, 5.5_
  
  - [x] 10.5 Implement financial data fetching and calculations
    - Create API client methods for report endpoints
    - Fetch and display total giving, average giving, and trends
    - Implement authorization checks (redirect if unauthorized)
    - _Requirements: 5.6, 5.7_
  
  - [x] 10.6 Write unit tests for Reports components
    - Test FinancialChart with sample data
    - Test DemographicChart with sample data
    - Test date range filtering
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 11. Frontend Settings Page
  - [x] 11.1 Implement Settings page structure
    - Create Settings.tsx page component
    - Add tabs or sections for Church Details, Notifications, and Profile
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 11.2 Implement ChurchDetailsForm component
    - Create form for church information
    - Add fields for name, address, contact info, service times
    - Implement form validation
    - _Requirements: 6.1, 6.4_
  
  - [x] 11.3 Implement NotificationToggles component
    - Create toggle switches for email, SMS, and system notifications
    - Save preferences to API
    - _Requirements: 6.2_
  
  - [x] 11.4 Implement ProfileForm component
    - Create form for user profile editing
    - Add fields for name, email, and password
    - Implement password complexity validation
    - _Requirements: 6.3, 10.5_
  
  - [x] 11.5 Implement settings save functionality
    - Create API client methods for settings endpoints
    - Implement save handlers for each form
    - Display success messages on successful save
    - Display error messages with field-specific errors
    - _Requirements: 6.4, 6.5, 6.6_
  
  - [x] 11.6 Write property test for settings validation
    - **Property 8: Required field validation** (for settings)
    - **Validates: Requirements 6.4**
  
  - [x] 11.7 Write unit tests for Settings components
    - Test ChurchDetailsForm validation
    - Test NotificationToggles state management
    - Test ProfileForm password validation
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 12. Checkpoint - Frontend UI Complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Authentication and Authorization Integration
  - [x] 13.1 Implement AuthContext for authentication state
    - Create AuthContext with login, logout, and user state
    - Implement token storage in localStorage
    - Add API interceptor to include auth token in requests
    - _Requirements: 10.1_
  
  - [x] 13.2 Implement login page and authentication flow
    - Create Login.tsx page component
    - Implement login form with email and password
    - Handle authentication errors
    - Redirect to dashboard on successful login
    - _Requirements: 10.1_
  
  - [x] 13.3 Implement protected routes and role-based access
    - Create ProtectedRoute component that checks authentication
    - Implement role-based route protection
    - Redirect to login if not authenticated
    - Show error message if insufficient permissions
    - _Requirements: 10.1, 10.2, 10.3_
  
  - [x] 13.4 Implement session timeout handling
    - Add API interceptor to handle 401 responses
    - Clear auth state and redirect to login on session expiration
    - _Requirements: 10.6_
  
  - [x] 13.5 Write property test for session expiration
    - **Property 32: Session expiration handling**
    - **Validates: Requirements 10.6**
  
  - [x] 13.6 Write integration tests for authentication flow
    - Test login with valid credentials
    - Test login with invalid credentials
    - Test protected route access
    - Test session timeout
    - _Requirements: 10.1, 10.6_

- [x] 14. Activity Logging Implementation
  - [x] 14.1 Implement activity logging in backend
    - Add activity logging to all CRUD operations
    - Log authentication events (login, logout)
    - Log data export operations
    - Include user ID, timestamp, action, entity type, and description
    - _Requirements: 12.1, 12.2, 12.3, 12.5, 11.6_
  
  - [x] 14.2 Write property test for activity logging completeness
    - **Property 35: Activity logging completeness**
    - **Validates: Requirements 11.6, 12.1, 12.2, 12.3, 12.5**
  
  - [x] 14.3 Implement activity log viewing in frontend
    - Add activity log page (admin only)
    - Implement filtering by date range and user
    - Display activities in reverse chronological order
    - _Requirements: 12.4, 12.6_
  
  - [x] 14.4 Write property test for activity log filtering
    - **Property 37: Activity log filtering**
    - **Validates: Requirements 12.6**

- [x] 15. Data Export and Backup Features
  - [x] 15.1 Implement CSV export for member directory
    - Add export button to member directory page
    - Call export API endpoint with current filters
    - Download CSV file with timestamped filename
    - _Requirements: 11.1, 11.3, 11.5_
  
  - [x] 15.2 Write property test for export file timestamping
    - **Property 34: Export file timestamping**
    - **Validates: Requirements 11.5**
  
  - [x] 15.3 Implement PDF export for reports
    - Add download PDF button to reports page
    - Call PDF export API endpoint
    - Download PDF file with report data
    - _Requirements: 11.2_
  
  - [x] 15.4 Write unit tests for export functionality
    - Test CSV export with filtered data
    - Test PDF export with report data
    - Test filename formatting
    - _Requirements: 11.1, 11.2, 11.5_

- [x] 16. Small Groups Management
  - [x] 16.1 Implement small groups management page
    - Create SmallGroups.tsx page component
    - Display list of small groups with member counts
    - Add "Add Small Group" button
    - _Requirements: 8.4, 8.5_
  
  - [x] 16.2 Implement SmallGroupForm component
    - Create form for adding/editing small groups
    - Add fields for name, description, leader, meeting details
    - Implement form validation
    - _Requirements: 8.4_
  
  - [x] 16.3 Implement small group CRUD operations
    - Create API client methods for small group endpoints
    - Implement create, edit, and delete functionality
    - Update member directory to show small group assignments
    - _Requirements: 8.2, 8.4_
  
  - [x] 16.4 Write property test for small group assignment
    - **Property 18: Small group assignment**
    - **Validates: Requirements 8.2**
  
  - [x] 16.5 Write unit tests for small groups functionality
    - Test SmallGroupForm validation
    - Test member assignment to groups
    - Test member count accuracy
    - _Requirements: 8.4, 8.5_

- [x] 17. Events Management
  - [x] 17.1 Implement events management page
    - Create Events.tsx page component
    - Display list of upcoming and past events
    - Add "Add Event" button
    - _Requirements: 9.1, 9.2_
  
  - [x] 17.2 Implement EventForm component
    - Create form for adding/editing events
    - Add fields for title, date, time, location, description
    - Implement form validation
    - _Requirements: 9.1_
  
  - [x] 17.3 Implement event CRUD operations
    - Create API client methods for event endpoints
    - Implement create, edit, and delete functionality
    - Implement mark as completed functionality
    - _Requirements: 9.1, 9.4_
  
  - [x] 17.4 Write property test for past event categorization
    - **Property 27: Past event categorization**
    - **Validates: Requirements 9.5**
  
  - [x] 17.5 Write unit tests for events functionality
    - Test EventForm validation
    - Test event sorting
    - Test mark as completed
    - _Requirements: 9.1, 9.3, 9.4_

- [x] 18. User Management (Admin)
  - [x] 18.1 Implement user management page (admin only)
    - Create Users.tsx page component
    - Display list of users with roles
    - Add "Add User" button
    - _Requirements: 10.4_
  
  - [x] 18.2 Implement UserForm component
    - Create form for adding/editing users
    - Add fields for name, email, password, and role
    - Implement password complexity validation
    - _Requirements: 10.4, 10.5_
  
  - [x] 18.3 Implement user CRUD operations
    - Create API client methods for user endpoints
    - Implement create, edit, and delete functionality
    - Restrict access to admin role only
    - _Requirements: 10.4_
  
  - [x] 18.4 Write property test for admin user management
    - **Property 30: Admin user management**
    - **Validates: Requirements 10.4**
  
  - [x] 18.5 Write unit tests for user management
    - Test UserForm validation
    - Test password complexity requirements
    - Test role-based access control
    - _Requirements: 10.4, 10.5_

- [x] 19. Final Integration and Polish
  - [x] 19.1 Implement error handling and loading states
    - Add global error boundary component
    - Implement loading spinners for all async operations
    - Add toast notifications for success/error messages
    - Implement user-friendly error messages
    - _Requirements: 6.5, 6.6_
  
  - [x] 19.2 Implement responsive design refinements
    - Test all pages on mobile, tablet, and desktop
    - Adjust layouts for smaller screens
    - Ensure sidebar collapses on mobile
    - Test touch interactions
    - _Requirements: 7.8_
  
  - [x] 19.3 Optimize performance
    - Implement code splitting for routes
    - Add React.memo to expensive components
    - Implement debouncing for search inputs
    - Optimize chart rendering
    - Add database indexes for common queries
    - _Requirements: 3.7_
  
  - [x] 19.4 Update package.json and documentation
    - Update package.json name and description for church system
    - Remove student/faculty keywords
    - Update README.md with church system information
    - Document API endpoints
    - _Requirements: 1.2, 1.5_
  
  - [x] 19.5 Write end-to-end integration tests
    - Test complete user workflows (add member, record tithe, generate report)
    - Test authentication and authorization flows
    - Test data export workflows
    - _Requirements: 3.1, 5.1, 11.1_

- [x] 20. Final Checkpoint - System Complete
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all student/faculty references are removed
  - Verify all church features are functional
  - Review error logs for any issues
  - Conduct final user acceptance testing

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at major milestones
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples, edge cases, and error conditions
- The migration follows a phased approach: database → backend → frontend → integration
- All student/faculty code must be completely removed before implementing church features
- The existing tech stack (Laravel 8 + React/TypeScript) is maintained throughout the transformation
