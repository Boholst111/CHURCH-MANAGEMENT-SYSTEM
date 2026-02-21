# Design Document: Mahayahay Free Methodist Church Management System

## Overview

This design document outlines the technical architecture and implementation approach for transforming an existing Student Faculty Management System (Laravel 8 + React/TypeScript) into a comprehensive Church Management System. The transformation involves complete removal of existing student/faculty functionality and replacement with church-specific features including member management, leadership directory, financial tracking, and analytics.

The system will maintain the existing technology stack (Laravel 8 backend, React/TypeScript frontend with Tailwind CSS) while implementing a modern SaaS-style interface with sidebar navigation, soft blue/white color palette, and professional typography.

## Architecture

### High-Level Architecture

The system follows a client-server architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  (React/TypeScript + Tailwind CSS + Lucide Icons)       │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Dashboard │  │ Members  │  │Leadership│             │
│  └──────────┘  └──────────┘  └──────────┘             │
│  ┌──────────┐  ┌──────────┐                            │
│  │ Reports  │  │ Settings │                            │
│  └──────────┘  └──────────┘                            │
└─────────────────────────────────────────────────────────┘
                         │
                    HTTP/REST API
                         │
┌─────────────────────────────────────────────────────────┐
│                    Server Layer                          │
│              (Laravel 8 + MySQL)                         │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │           API Controllers                         │  │
│  │  MemberController | LeadershipController         │  │
│  │  FinanceController | EventController             │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Business Logic Layer                    │  │
│  │  Services | Repositories | Validators            │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Data Layer                              │  │
│  │  Eloquent Models | Database Migrations           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                    MySQL Database
                         │
┌─────────────────────────────────────────────────────────┐
│                  Database Schema                         │
│  members | leadership | small_groups | tithes           │
│  events | activities | users | roles                    │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18.2 with TypeScript
- React Router 6.30 for navigation
- Tailwind CSS 3.3 for styling
- Lucide React for icons
- ApexCharts/Recharts for data visualization
- Axios for API communication
- Framer Motion for animations

**Backend:**
- Laravel 8.75 (PHP 7.3+/8.0+)
- Laravel Sanctum for API authentication
- MySQL database
- DomPDF for PDF generation
- Laravel Excel for data export

**Development Tools:**
- Laravel Mix for asset compilation
- Babel for JavaScript transpilation
- PostCSS with Autoprefixer

## Components and Interfaces

### Frontend Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           # Main navigation sidebar
│   │   ├── Header.tsx            # Top header with user menu
│   │   └── Layout.tsx            # Main layout wrapper
│   ├── dashboard/
│   │   ├── QuickStatsCard.tsx    # Reusable stat card component
│   │   ├── AttendanceChart.tsx   # Line chart for attendance
│   │   └── ActivityFeed.tsx      # Recent activities list
│   ├── members/
│   │   ├── MemberTable.tsx       # Data table with search/filter
│   │   ├── MemberForm.tsx        # Add/Edit member form
│   │   └── MemberRow.tsx         # Individual table row
│   ├── leadership/
│   │   ├── LeadershipGrid.tsx    # Grid layout container
│   │   ├── ProfileCard.tsx       # Individual leader card
│   │   └── LeadershipForm.tsx    # Add/Edit leader form
│   ├── reports/
│   │   ├── FinancialChart.tsx    # Bar chart for giving
│   │   ├── DemographicChart.tsx  # Pie chart for demographics
│   │   └── ReportControls.tsx    # Date range and export controls
│   ├── settings/
│   │   ├── ChurchDetailsForm.tsx # Church information form
│   │   ├── NotificationToggles.tsx # Notification preferences
│   │   └── ProfileForm.tsx       # User profile editor
│   └── ui/
│       ├── Button.tsx            # Reusable button component
│       ├── Input.tsx             # Form input component
│       ├── Card.tsx              # Card container component
│       ├── Table.tsx             # Table component
│       └── Modal.tsx             # Modal dialog component
├── pages/
│   ├── Dashboard.tsx
│   ├── MemberDirectory.tsx
│   ├── Leadership.tsx
│   ├── Reports.tsx
│   └── Settings.tsx
├── contexts/
│   ├── AuthContext.tsx           # Authentication state
│   └── ThemeContext.tsx          # Theme configuration
├── lib/
│   ├── api.ts                    # API client configuration
│   ├── utils.ts                  # Utility functions
│   └── types.ts                  # TypeScript type definitions
└── App.tsx                       # Main application component
```

### Backend Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── API/
│   │   │   ├── MemberController.php
│   │   │   ├── LeadershipController.php
│   │   │   ├── FinanceController.php
│   │   │   ├── EventController.php
│   │   │   ├── DashboardController.php
│   │   │   ├── ReportController.php
│   │   │   └── SettingsController.php
│   │   └── AuthController.php
│   ├── Middleware/
│   │   ├── CheckRole.php         # Role-based access control
│   │   └── LogActivity.php       # Activity logging
│   └── Requests/
│       ├── MemberRequest.php     # Member validation rules
│       ├── LeadershipRequest.php
│       └── SettingsRequest.php
├── Models/
│   ├── Member.php
│   ├── Leadership.php
│   ├── SmallGroup.php
│   ├── Tithe.php
│   ├── Event.php
│   ├── Activity.php
│   └── User.php
├── Services/
│   ├── MemberService.php         # Business logic for members
│   ├── FinanceService.php        # Financial calculations
│   ├── ReportService.php         # Report generation
│   └── ExportService.php         # Data export functionality
└── Repositories/
    ├── MemberRepository.php      # Data access for members
    ├── FinanceRepository.php
    └── ActivityRepository.php
```

### API Endpoints

**Authentication:**
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout
- `GET /api/user` - Get authenticated user

**Dashboard:**
- `GET /api/dashboard/stats` - Get quick stats (members, tithes, events, visitors)
- `GET /api/dashboard/attendance` - Get attendance trend data
- `GET /api/dashboard/activities` - Get recent activities

**Members:**
- `GET /api/members` - List all members (with search/filter)
- `POST /api/members` - Create new member
- `GET /api/members/{id}` - Get member details
- `PUT /api/members/{id}` - Update member
- `DELETE /api/members/{id}` - Delete member
- `GET /api/members/export` - Export members as CSV

**Leadership:**
- `GET /api/leadership` - List all leadership staff
- `POST /api/leadership` - Create new leadership profile
- `GET /api/leadership/{id}` - Get leadership details
- `PUT /api/leadership/{id}` - Update leadership profile
- `DELETE /api/leadership/{id}` - Delete leadership profile

**Small Groups:**
- `GET /api/small-groups` - List all small groups
- `POST /api/small-groups` - Create new small group
- `PUT /api/small-groups/{id}` - Update small group
- `DELETE /api/small-groups/{id}` - Delete small group

**Finance:**
- `GET /api/finance/tithes` - Get tithe records (with date range)
- `POST /api/finance/tithes` - Record new tithe
- `GET /api/finance/summary` - Get financial summary

**Events:**
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event
- `PUT /api/events/{id}/complete` - Mark event as completed

**Reports:**
- `GET /api/reports/financial` - Get financial report data
- `GET /api/reports/demographics` - Get demographic data
- `POST /api/reports/export-pdf` - Generate and download PDF report

**Settings:**
- `GET /api/settings/church` - Get church settings
- `PUT /api/settings/church` - Update church settings
- `GET /api/settings/notifications` - Get notification preferences
- `PUT /api/settings/notifications` - Update notification preferences

**Users:**
- `GET /api/users` - List all users (admin only)
- `POST /api/users` - Create new user (admin only)
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user (admin only)

## Data Models

### Member Model

```typescript
interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'visitor';
  small_group_id: number | null;
  date_joined: Date;
  birth_date: Date | null;
  gender: 'male' | 'female' | 'other';
  created_at: Date;
  updated_at: Date;
  
  // Relationships
  small_group?: SmallGroup;
}
```

**Validation Rules:**
- `first_name`: required, string, max 100 characters
- `last_name`: required, string, max 100 characters
- `email`: required, email format, unique
- `phone`: required, string, valid phone format
- `status`: required, enum ['active', 'visitor']
- `small_group_id`: optional, exists in small_groups table

### Leadership Model

```typescript
interface Leadership {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo_url: string | null;
  bio: string | null;
  start_date: Date;
  created_at: Date;
  updated_at: Date;
}
```

**Validation Rules:**
- `first_name`: required, string, max 100 characters
- `last_name`: required, string, max 100 characters
- `role`: required, string, max 100 characters
- `department`: required, string, max 100 characters
- `email`: required, email format
- `photo_url`: optional, valid URL or file path

### SmallGroup Model

```typescript
interface SmallGroup {
  id: number;
  name: string;
  description: string | null;
  leader_name: string;
  meeting_day: string;
  meeting_time: string;
  location: string;
  created_at: Date;
  updated_at: Date;
  
  // Relationships
  members?: Member[];
  member_count?: number;
}
```

**Validation Rules:**
- `name`: required, string, max 100 characters, unique
- `leader_name`: required, string, max 100 characters
- `meeting_day`: required, enum ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

### Tithe Model

```typescript
interface Tithe {
  id: number;
  member_id: number | null;
  amount: number;
  payment_method: 'cash' | 'check' | 'online' | 'other';
  date: Date;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  
  // Relationships
  member?: Member;
}
```

**Validation Rules:**
- `amount`: required, numeric, min 0.01
- `payment_method`: required, enum ['cash', 'check', 'online', 'other']
- `date`: required, date format
- `member_id`: optional, exists in members table

### Event Model

```typescript
interface Event {
  id: number;
  title: string;
  description: string | null;
  event_date: Date;
  event_time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  attendance_count: number | null;
  created_at: Date;
  updated_at: Date;
}
```

**Validation Rules:**
- `title`: required, string, max 200 characters
- `event_date`: required, date format
- `event_time`: required, time format
- `location`: required, string, max 200 characters
- `status`: required, enum ['upcoming', 'completed', 'cancelled']
- `attendance_count`: optional, integer, min 0

### Activity Model

```typescript
interface Activity {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number | null;
  description: string;
  ip_address: string | null;
  created_at: Date;
  
  // Relationships
  user?: User;
}
```

**Validation Rules:**
- `user_id`: required, exists in users table
- `action`: required, string, max 50 characters
- `entity_type`: required, string, max 50 characters
- `description`: required, string, max 500 characters

### User Model

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff' | 'readonly';
  created_at: Date;
  updated_at: Date;
}
```

**Validation Rules:**
- `name`: required, string, max 100 characters
- `email`: required, email format, unique
- `password`: required, min 8 characters, must contain uppercase, lowercase, and number
- `role`: required, enum ['admin', 'staff', 'readonly']

### ChurchSettings Model

```typescript
interface ChurchSettings {
  id: number;
  church_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string | null;
  service_times: string;
  created_at: Date;
  updated_at: Date;
}
```

**Validation Rules:**
- `church_name`: required, string, max 200 characters
- `address`: required, string, max 200 characters
- `phone`: required, string, valid phone format
- `email`: required, email format
- `service_times`: required, string, max 500 characters

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified several areas where properties can be consolidated:

**Redundancy Analysis:**

1. **CRUD Operations**: Multiple requirements test create/update/delete operations for different entities (members, leadership, small groups, events, users). These can be consolidated into entity-specific CRUD properties rather than separate properties for each operation.

2. **Activity Logging**: Requirements 11.6, 12.1, 12.2, and 12.3 all test that operations create activity logs. These can be combined into a single comprehensive property about activity logging.

3. **Filtering Operations**: Requirements 3.2, 3.3, 8.6, and 12.6 all test filtering functionality. While they filter different entities, the core property (filtered results match criteria) is the same pattern.

4. **Validation**: Requirements 3.6, 6.4, and 10.5 all test that invalid data is rejected. These follow the same pattern of error condition handling.

5. **Display Properties**: Requirements 8.3 and 4.2 both test that entity data is displayed with all required fields. These can be consolidated.

6. **Count Accuracy**: Requirements 8.5 and 9.6 both test that counts match actual data. These follow the same invariant pattern.

**Consolidation Decisions:**

- Combine activity logging properties into one comprehensive property
- Keep CRUD properties separate per entity (they test different business logic)
- Keep filtering properties separate (different entities have different filter logic)
- Combine validation error properties into one comprehensive property
- Keep display properties separate (different UI components)
- Combine count accuracy properties into one invariant property

### Correctness Properties

Property 1: Dashboard stats reflect current data
*For any* point in time, the Quick Stats cards on the dashboard should display counts that match the actual database records (total members count equals member records, upcoming events count equals future event records, new visitors count equals visitor records from current month)
**Validates: Requirements 2.1, 9.6**

Property 2: Dashboard updates reactively
*For any* data change (member added, tithe recorded, event created), the dashboard Quick Stats should update to reflect the new values without requiring a page refresh
**Validates: Requirements 2.4**

Property 3: Currency formatting consistency
*For any* monetary value displayed in the system, it should be formatted with the appropriate currency symbol and two decimal places
**Validates: Requirements 2.5**

Property 4: Attendance data completeness
*For any* attendance trend query, the returned dataset should contain at least 12 monthly data points (or all available data if less than 12 months of history exists)
**Validates: Requirements 2.6**

Property 5: Search filters members correctly
*For any* search query string, all returned member records should have the query string present in either their name or contact information fields (case-insensitive)
**Validates: Requirements 3.2**

Property 6: Status filter accuracy
*For any* status filter selection (Active or Visitor), all returned member records should have exactly that status value
**Validates: Requirements 3.3**

Property 7: Member record editing preserves identity
*For any* member record, after editing and saving, the member ID should remain unchanged and all updated fields should reflect the new values
**Validates: Requirements 3.5**

Property 8: Required field validation
*For any* entity save operation (member, leadership, event, settings), if required fields are missing or invalid, the operation should be rejected with descriptive error messages indicating which fields need correction
**Validates: Requirements 3.6, 6.4, 6.6**

Property 9: Pagination triggers correctly
*For any* member list with more than 50 records, pagination controls should be displayed and each page should contain at most 50 records
**Validates: Requirements 3.7**

Property 10: Profile cards display complete information
*For any* leadership profile, the rendered Profile_Card should contain the staff member's name, role title, department tags, and either their photo or a default placeholder image
**Validates: Requirements 4.2, 4.6**

Property 11: Leadership CRUD operations
*For any* valid leadership profile data, administrators should be able to create a new profile, retrieve it, update its fields, and delete it, with each operation succeeding and persisting correctly
**Validates: Requirements 4.5**

Property 12: PDF generation succeeds
*For any* report data (financial or demographic), the system should be able to generate a valid PDF document containing all the report information
**Validates: Requirements 5.5**

Property 13: Financial calculations accuracy
*For any* set of tithe records within a date range, the calculated total giving should equal the sum of all tithe amounts, and the average giving per member should equal total giving divided by the number of unique members who gave
**Validates: Requirements 5.6**

Property 14: Financial data authorization
*For any* request to access financial data (tithes, reports) without valid authentication or appropriate role permissions, the system should deny access and return an authorization error
**Validates: Requirements 5.7**

Property 15: Profile updates succeed
*For any* valid user profile data (name, email, password), an administrator should be able to update their profile and the changes should persist correctly
**Validates: Requirements 6.3**

Property 16: Settings save confirmation
*For any* successful settings save operation, the system should display a success message to the user
**Validates: Requirements 6.5**

Property 17: Navigation highlighting
*For any* page navigation action, the sidebar menu item corresponding to the current page should be visually highlighted
**Validates: Requirements 7.7**

Property 18: Small group assignment
*For any* member and any small group, an administrator should be able to assign the member to the group, and the assignment should be reflected in both the member record and the group's member list
**Validates: Requirements 8.2**

Property 19: Member directory displays affiliations
*For any* member record displayed in the directory, their current status and small group affiliation (if any) should be visible in the table row
**Validates: Requirements 8.3**

Property 20: Small group CRUD operations
*For any* valid small group data, administrators should be able to create a new group, retrieve it, update its fields, and delete it, with each operation succeeding and persisting correctly
**Validates: Requirements 8.4**

Property 21: Count accuracy invariant
*For any* small group, the displayed member_count should always equal the actual number of member records assigned to that group
**Validates: Requirements 8.5**

Property 22: Small group filtering
*For any* small group filter selection, all returned member records should be assigned to exactly that small group
**Validates: Requirements 8.6**

Property 23: Event creation and retrieval
*For any* valid event data (title, date, time, location), an administrator should be able to create an event record and subsequently retrieve it with all fields intact
**Validates: Requirements 9.1**

Property 24: Upcoming events display
*For any* event with a date in the future, it should appear in the upcoming events list on the dashboard
**Validates: Requirements 9.2**

Property 25: Event chronological sorting
*For any* list of upcoming events, they should be sorted by event_date in ascending order (nearest event first)
**Validates: Requirements 9.3**

Property 26: Event completion updates
*For any* event, an administrator should be able to mark it as completed and record an attendance count, and these changes should persist correctly
**Validates: Requirements 9.4**

Property 27: Past event categorization
*For any* event with a date in the past, it should not appear in the upcoming events list
**Validates: Requirements 9.5**

Property 28: Authentication requirement
*For any* system endpoint (except login), requests without valid authentication credentials should be rejected with an authentication error
**Validates: Requirements 10.1**

Property 29: Read-only role restrictions
*For any* data modification request (create, update, delete) from a user with Read-Only role, the operation should be denied with an appropriate authorization error message
**Validates: Requirements 10.3**

Property 30: Admin user management
*For any* valid user account data, an Admin user should be able to create a new user, update existing users, and delete users, with each operation succeeding and persisting correctly
**Validates: Requirements 10.4**

Property 31: Password complexity enforcement
*For any* password that does not meet complexity requirements (minimum 8 characters, contains uppercase, lowercase, and number), the system should reject it with a descriptive error message
**Validates: Requirements 10.5**

Property 32: Session expiration handling
*For any* request with an expired session token, the system should reject the request and require re-authentication
**Validates: Requirements 10.6**

Property 33: CSV export completeness
*For any* member directory view with applied filters, the exported CSV should contain exactly the members visible in the current view with all displayed columns
**Validates: Requirements 11.1, 11.3**

Property 34: Export file timestamping
*For any* data export operation, the generated filename should include a timestamp in the format YYYY-MM-DD_HH-MM-SS
**Validates: Requirements 11.5**

Property 35: Activity logging completeness
*For any* significant system operation (member CRUD, financial transaction, report generation, user authentication, data export), an activity log entry should be created with timestamp, user ID, action description, and entity information
**Validates: Requirements 11.6, 12.1, 12.2, 12.3, 12.5**

Property 36: Recent activities display
*For any* query for recent activities, the returned list should contain the most recent activity log entries sorted by timestamp in descending order (newest first)
**Validates: Requirements 12.4**

Property 37: Activity log filtering
*For any* activity log filter criteria (date range, user), all returned activity records should match the specified criteria
**Validates: Requirements 12.6**

## Error Handling

### Error Categories

**Validation Errors (400 Bad Request):**
- Missing required fields
- Invalid data formats (email, phone, date)
- Data type mismatches
- Business rule violations (e.g., duplicate email)

**Authentication Errors (401 Unauthorized):**
- Missing authentication token
- Invalid credentials
- Expired session token

**Authorization Errors (403 Forbidden):**
- Insufficient permissions for requested operation
- Role-based access control violations

**Not Found Errors (404 Not Found):**
- Requested resource does not exist
- Invalid entity ID

**Server Errors (500 Internal Server Error):**
- Database connection failures
- Unexpected exceptions
- External service failures (PDF generation, email)

### Error Response Format

All API errors should return a consistent JSON structure:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {
    "field_name": ["Specific validation error for this field"]
  },
  "code": "ERROR_CODE"
}
```

### Error Handling Strategies

**Frontend:**
- Display validation errors inline with form fields
- Show toast notifications for success/error messages
- Implement global error boundary for unhandled exceptions
- Provide user-friendly error messages (avoid technical jargon)
- Log errors to console for debugging

**Backend:**
- Use Laravel's validation system for request validation
- Implement custom exception handlers for specific error types
- Log all errors with context (user, request, stack trace)
- Return appropriate HTTP status codes
- Sanitize error messages to avoid exposing sensitive information

**Database:**
- Use transactions for multi-step operations
- Implement foreign key constraints for referential integrity
- Handle unique constraint violations gracefully
- Provide meaningful error messages for constraint violations

## Testing Strategy

### Dual Testing Approach

The system will employ both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests:**
- Specific examples demonstrating correct behavior
- Edge cases (empty data, boundary values, null handling)
- Error conditions and validation failures
- Integration points between components
- UI component rendering and interactions

**Property-Based Tests:**
- Universal properties that hold for all inputs
- Data invariants and consistency rules
- CRUD operation correctness
- Filtering and search accuracy
- Calculation correctness (financial totals, counts)
- Authorization and authentication rules

### Property-Based Testing Configuration

**Library Selection:**
- **Frontend (TypeScript)**: Use `fast-check` library for property-based testing
- **Backend (PHP)**: Use `eris` library for property-based testing

**Test Configuration:**
- Each property test should run a minimum of 100 iterations
- Use appropriate generators for each data type (strings, numbers, dates, enums)
- Implement custom generators for domain models (Member, Leadership, Event, etc.)
- Tag each test with a comment referencing the design property

**Tag Format:**
```typescript
// Feature: church-management-system, Property 5: Search filters members correctly
test('member search returns only matching records', () => {
  fc.assert(
    fc.property(
      fc.array(memberGenerator()),
      fc.string(),
      (members, searchQuery) => {
        const results = searchMembers(members, searchQuery);
        return results.every(member => 
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.phone.includes(searchQuery)
        );
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Organization

**Frontend Tests:**
```
client/src/__tests__/
├── unit/
│   ├── components/
│   │   ├── QuickStatsCard.test.tsx
│   │   ├── MemberTable.test.tsx
│   │   └── ProfileCard.test.tsx
│   └── utils/
│       ├── formatting.test.ts
│       └── validation.test.ts
├── property/
│   ├── member-operations.property.test.ts
│   ├── financial-calculations.property.test.ts
│   ├── filtering.property.test.ts
│   └── authorization.property.test.ts
└── integration/
    ├── dashboard.integration.test.tsx
    ├── member-directory.integration.test.tsx
    └── reports.integration.test.tsx
```

**Backend Tests:**
```
tests/
├── Unit/
│   ├── Models/
│   │   ├── MemberTest.php
│   │   └── LeadershipTest.php
│   ├── Services/
│   │   ├── MemberServiceTest.php
│   │   └── FinanceServiceTest.php
│   └── Validators/
│       └── MemberValidatorTest.php
├── Property/
│   ├── MemberOperationsPropertyTest.php
│   ├── FinancialCalculationsPropertyTest.php
│   ├── FilteringPropertyTest.php
│   └── AuthorizationPropertyTest.php
└── Feature/
    ├── MemberApiTest.php
    ├── LeadershipApiTest.php
    └── DashboardApiTest.php
```

### Testing Guidelines

**Unit Test Focus:**
- Test specific examples (e.g., "adding a member with valid data succeeds")
- Test edge cases (e.g., "empty search query returns all members")
- Test error conditions (e.g., "invalid email format is rejected")
- Keep tests focused and fast
- Mock external dependencies

**Property Test Focus:**
- Test universal properties (e.g., "for any search query, results match the query")
- Test data invariants (e.g., "member count always equals actual members")
- Test calculation correctness (e.g., "total giving equals sum of all tithes")
- Use generators to create diverse test data
- Avoid testing implementation details

**Integration Test Focus:**
- Test complete user workflows
- Test API endpoint interactions
- Test database transactions
- Test authentication and authorization flows
- Use test database with seeded data

### Migration Testing

**Pre-Migration Verification:**
- Backup existing database
- Document current system state
- Verify all student/faculty data is archived

**Post-Migration Verification:**
- Confirm all student/faculty tables are removed
- Confirm all student/faculty code is removed
- Verify new church tables are created
- Verify no broken references exist
- Run full test suite to ensure system functionality

**Migration Rollback Plan:**
- Keep database backup for 30 days
- Document rollback procedures
- Test rollback process in staging environment

## Implementation Notes

### Migration Strategy

The transformation from Student Faculty Management System to Church Management System will follow this approach:

1. **Phase 1: Database Migration**
   - Create new church-specific tables (members, leadership, small_groups, tithes, events)
   - Drop all student/faculty tables (students, faculty, courses, enrollments, grades)
   - Update users table to support church roles
   - Create database seeders for initial church data

2. **Phase 2: Backend Cleanup**
   - Remove all student/faculty controllers, models, and services
   - Remove all student/faculty API routes
   - Implement new church-specific controllers and models
   - Implement new API endpoints
   - Update authentication and authorization logic

3. **Phase 3: Frontend Transformation**
   - Remove all student/faculty pages and components
   - Implement new layout with sidebar navigation
   - Implement new pages (Dashboard, Members, Leadership, Reports, Settings)
   - Apply new design system (colors, typography, spacing)
   - Implement new UI components

4. **Phase 4: Testing and Validation**
   - Write unit tests for all new components
   - Write property-based tests for core functionality
   - Perform integration testing
   - Conduct user acceptance testing
   - Performance testing

### Design System

**Color Palette:**
```css
:root {
  /* Primary Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;  /* Main blue */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  
  /* Neutral Colors */
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-500: #6b7280;
  --color-neutral-700: #374151;
  --color-neutral-900: #111827;
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Background */
  --color-background: #ffffff;
  --color-background-secondary: #f9fafb;
}
```

**Typography:**
```css
:root {
  --font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

**Spacing:**
```css
:root {
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
}
```

**Border Radius:**
```css
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
}
```

### Performance Considerations

**Frontend Optimization:**
- Implement code splitting for route-based lazy loading
- Use React.memo for expensive components
- Implement virtual scrolling for large data tables
- Optimize chart rendering with data sampling for large datasets
- Use debouncing for search inputs
- Implement optimistic UI updates

**Backend Optimization:**
- Use database indexing on frequently queried columns (email, status, date fields)
- Implement query result caching for dashboard stats
- Use eager loading to prevent N+1 query problems
- Implement pagination for all list endpoints
- Use database transactions for multi-step operations
- Optimize PDF generation with background jobs

**Database Optimization:**
- Create indexes on foreign keys
- Create composite indexes for common filter combinations
- Use appropriate column types (ENUM for status fields)
- Implement soft deletes for audit trail
- Regular database maintenance and optimization

### Security Considerations

**Authentication:**
- Use Laravel Sanctum for API token authentication
- Implement secure password hashing (bcrypt)
- Enforce password complexity requirements
- Implement session timeout (30 minutes of inactivity)
- Log all authentication attempts

**Authorization:**
- Implement role-based access control (RBAC)
- Use Laravel policies for resource authorization
- Validate permissions on every API request
- Implement middleware for route protection

**Data Protection:**
- Sanitize all user inputs
- Use parameterized queries (Eloquent ORM)
- Implement CSRF protection
- Use HTTPS for all communications
- Encrypt sensitive data at rest
- Implement rate limiting on API endpoints

**Audit Trail:**
- Log all data modifications
- Log all authentication events
- Log all data exports
- Include user, timestamp, and IP address in logs
- Retain logs for compliance requirements

### Deployment Considerations

**Environment Configuration:**
- Separate configurations for development, staging, production
- Use environment variables for sensitive data
- Implement proper error logging (Laravel Log)
- Configure email service for notifications
- Set up database backups

**Migration Deployment:**
- Schedule migration during low-traffic period
- Notify users of system downtime
- Run migration in staging environment first
- Keep rollback plan ready
- Monitor system after migration

**Post-Deployment:**
- Verify all features are working
- Check error logs for issues
- Monitor performance metrics
- Gather user feedback
- Plan for iterative improvements
