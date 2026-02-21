# Requirements Document: Mahayahay Free Methodist Church Management System

## Introduction

This document specifies the requirements for transforming an existing Student Faculty Management System into a comprehensive Church Management System for Mahayahay Free Methodist Church. The system will provide a modern, professional SaaS web application for managing church members, leadership, events, finances, and analytics with a clean, trustworthy design aesthetic.

## Glossary

- **System**: The Mahayahay Free Methodist Church Management System web application
- **Member**: A registered individual in the church database (active member or visitor)
- **Leadership**: Pastors, staff, and administrative personnel of the church
- **Small_Group**: A subdivision of church members for fellowship and community
- **Tithe**: A financial contribution made by members to the church
- **Visitor**: A person who has attended church services but is not yet an active member
- **Dashboard**: The main overview page displaying key metrics and activities
- **Admin**: A user with administrative privileges to manage system settings
- **Activity_Feed**: A chronological list of recent system events and updates
- **Profile_Card**: A visual component displaying leadership information with photo and role

## Requirements

### Requirement 1: System Migration and Data Cleanup

**User Story:** As a system administrator, I want to completely remove all Student Faculty Management System data and references, so that the new Church Management System starts with a clean foundation.

#### Acceptance Criteria

1. THE System SHALL remove all database tables related to student and faculty management
2. THE System SHALL remove all source code files specific to student and faculty functionality
3. THE System SHALL remove all UI components and pages related to student and faculty management
4. THE System SHALL remove all API endpoints serving student and faculty data
5. THE System SHALL remove all configuration files and environment variables specific to the old system
6. WHEN migration is complete, THE System SHALL contain no references to students, faculty, courses, or academic terms

### Requirement 2: Dashboard Overview Page

**User Story:** As a church administrator, I want to view a comprehensive dashboard with key metrics and recent activities, so that I can quickly understand the church's current status.

#### Acceptance Criteria

1. WHEN a user accesses the dashboard, THE System SHALL display four Quick Stats cards showing Total Members, Monthly Tithes, Upcoming Events, and New Visitors
2. THE System SHALL display a line chart showing attendance trends over time
3. THE System SHALL display a Recent Activities feed showing the latest system events
4. THE Dashboard SHALL update Quick Stats in real-time when underlying data changes
5. THE System SHALL format monetary values in the Monthly Tithes card with appropriate currency symbols
6. THE System SHALL display attendance trends for at least the past 12 months

### Requirement 3: Member Directory Management

**User Story:** As a church administrator, I want to manage a searchable directory of all church members, so that I can easily find and update member information.

#### Acceptance Criteria

1. WHEN a user accesses the Member Directory, THE System SHALL display a data table with columns for member name, status, small group affiliation, and contact information
2. THE System SHALL provide a search input that filters members by name or contact information
3. THE System SHALL provide filter controls to show only Active members or only Visitors
4. WHEN a user clicks the Add Member button, THE System SHALL display a form to create a new member record
5. THE System SHALL allow editing of existing member records through the data table
6. THE System SHALL validate that required fields (name, status) are provided before saving a member record
7. THE System SHALL support pagination when the member list exceeds 50 records per page

### Requirement 4: Leadership and Staff Directory

**User Story:** As a church member, I want to view information about pastors and leadership staff, so that I can understand the church's organizational structure and contact appropriate leaders.

#### Acceptance Criteria

1. WHEN a user accesses the Pastors & Leadership page, THE System SHALL display a grid of Profile_Cards for each staff member
2. THE Profile_Card SHALL display a staff photo, name, role title, and department tags
3. THE System SHALL support role titles including Senior Pastor, Youth Pastor, Worship Leader, and Administrative Staff
4. THE System SHALL organize Profile_Cards in a responsive grid layout that adapts to screen size
5. THE System SHALL allow administrators to add, edit, and remove leadership profiles
6. WHEN a staff photo is not available, THE System SHALL display a default placeholder image

### Requirement 5: Financial Reporting and Analytics

**User Story:** As a church treasurer, I want to view detailed financial reports and analytics, so that I can track giving patterns and generate reports for leadership.

#### Acceptance Criteria

1. WHEN a user accesses the Reports & Analytics page, THE System SHALL display bar charts showing financial giving over time
2. THE System SHALL display pie charts showing demographic distribution by age and location
3. THE System SHALL provide a date range selector to filter reports by time period
4. WHEN a user clicks the Print button, THE System SHALL generate a printer-friendly version of the current report
5. WHEN a user clicks the Download PDF button, THE System SHALL generate and download a PDF version of the current report
6. THE System SHALL calculate and display total giving, average giving per member, and giving trends
7. THE System SHALL protect financial data by requiring authentication and appropriate permissions

### Requirement 6: Church Settings and Configuration

**User Story:** As a church administrator, I want to configure church details and system settings, so that the system reflects our church's specific information and preferences.

#### Acceptance Criteria

1. WHEN a user accesses the Settings page, THE System SHALL display a form with fields for church name, address, contact information, and service times
2. THE System SHALL provide notification toggle controls for email notifications, SMS alerts, and system announcements
3. THE System SHALL allow administrators to edit their user profile including name, email, and password
4. WHEN settings are saved, THE System SHALL validate all required fields before persisting changes
5. THE System SHALL display a success message when settings are saved successfully
6. THE System SHALL display error messages when validation fails, indicating which fields need correction

### Requirement 7: User Interface Design and Layout

**User Story:** As a church staff member, I want to use a modern, professional interface with intuitive navigation, so that I can efficiently perform my tasks without confusion.

#### Acceptance Criteria

1. THE System SHALL implement a sidebar navigation layout with links to all major pages
2. THE System SHALL use a soft blue and white color palette throughout the interface
3. THE System SHALL apply rounded corners to all cards, buttons, and input fields
4. THE System SHALL use ample white space between components for visual clarity
5. THE System SHALL use Inter or Roboto font family for all text content
6. THE System SHALL maintain consistent spacing, sizing, and styling across all pages
7. WHEN a user navigates to a page, THE System SHALL highlight the corresponding sidebar menu item
8. THE System SHALL be responsive and adapt layout for desktop, tablet, and mobile screen sizes

### Requirement 8: Member Status and Small Group Management

**User Story:** As a small group coordinator, I want to track member status and small group affiliations, so that I can organize fellowship activities and monitor member engagement.

#### Acceptance Criteria

1. THE System SHALL support two member status types: Active and Visitor
2. THE System SHALL allow assignment of members to Small_Groups
3. WHEN viewing the Member Directory, THE System SHALL display each member's current status and small group affiliation
4. THE System SHALL allow administrators to create, edit, and delete Small_Groups
5. THE System SHALL track the number of members in each Small_Group
6. THE System SHALL allow filtering the Member Directory by Small_Group affiliation

### Requirement 9: Event Management and Tracking

**User Story:** As an events coordinator, I want to create and track upcoming church events, so that members can stay informed and I can monitor attendance.

#### Acceptance Criteria

1. THE System SHALL allow administrators to create event records with title, date, time, location, and description
2. THE System SHALL display upcoming events on the Dashboard
3. THE System SHALL sort upcoming events chronologically with the nearest event first
4. THE System SHALL allow marking events as completed and recording attendance numbers
5. WHEN an event date has passed, THE System SHALL automatically move it from upcoming to past events
6. THE System SHALL display a count of upcoming events in the Dashboard Quick Stats

### Requirement 10: Authentication and Authorization

**User Story:** As a system administrator, I want to control user access to different system features, so that sensitive information is protected and users can only perform authorized actions.

#### Acceptance Criteria

1. WHEN a user attempts to access the System, THE System SHALL require authentication with username and password
2. THE System SHALL support role-based access control with roles including Admin, Staff, and Read-Only
3. WHEN a user with Read-Only role attempts to modify data, THE System SHALL prevent the action and display an appropriate message
4. THE System SHALL allow Admin users to create, edit, and delete user accounts
5. THE System SHALL enforce password complexity requirements including minimum length and character types
6. WHEN a user session expires, THE System SHALL redirect to the login page and require re-authentication

### Requirement 11: Data Export and Backup

**User Story:** As a church administrator, I want to export member data and create backups, so that I can maintain data security and use information in external tools.

#### Acceptance Criteria

1. THE System SHALL provide an export function to download member directory data as CSV format
2. THE System SHALL provide an export function to download financial reports as PDF format
3. WHEN exporting data, THE System SHALL include all visible columns and applied filters
4. THE System SHALL allow administrators to create full database backups
5. THE System SHALL timestamp all exported files with the date and time of export
6. THE System SHALL log all data export actions for audit purposes

### Requirement 12: Activity Logging and Audit Trail

**User Story:** As a church administrator, I want to track system activities and changes, so that I can maintain accountability and troubleshoot issues.

#### Acceptance Criteria

1. THE System SHALL log all member record creations, updates, and deletions
2. THE System SHALL log all financial transactions and report generations
3. THE System SHALL log all user login and logout events
4. THE System SHALL display recent activities in the Dashboard Activity_Feed
5. THE System SHALL include timestamp, user, and action description in each activity log entry
6. THE System SHALL allow administrators to view full activity history with filtering by date range and user
