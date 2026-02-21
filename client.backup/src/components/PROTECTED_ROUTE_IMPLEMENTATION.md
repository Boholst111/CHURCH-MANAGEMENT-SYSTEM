# Protected Route Implementation

## Overview

This document describes the implementation of protected routes and role-based access control for the Church Management System.

## Components

### ProtectedRoute Component

**Location:** `client/src/components/ProtectedRoute.tsx`

The `ProtectedRoute` component provides:
- Authentication checking
- Role-based access control
- Loading states
- Redirect to login for unauthenticated users
- Error messages for insufficient permissions

### Features

1. **Authentication Check**
   - Shows loading spinner while checking authentication status
   - Redirects to `/login` if user is not authenticated
   - Renders protected content if user is authenticated

2. **Role-Based Access Control**
   - Supports three roles: `readonly`, `staff`, and `admin`
   - Implements role hierarchy: `admin` > `staff` > `readonly`
   - Users with higher roles can access routes requiring lower roles
   - Shows error message when user lacks sufficient permissions

3. **Error Handling**
   - Displays user-friendly error page when access is denied
   - Shows which role is required for the page
   - Provides "Go Back" button for navigation

## Usage

### Basic Protected Route (Authentication Only)

```tsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### Role-Based Protected Route

```tsx
<ProtectedRoute requiredRole="staff">
  <Finance />
</ProtectedRoute>

<ProtectedRoute requiredRole="admin">
  <Settings />
</ProtectedRoute>
```

## Route Configuration

The following routes have role-based protection:

| Route | Required Role | Description |
|-------|--------------|-------------|
| `/` | None | Dashboard - accessible to all authenticated users |
| `/members` | None | Member directory - accessible to all authenticated users |
| `/leadership` | None | Leadership directory - accessible to all authenticated users |
| `/small-groups` | None | Small groups - accessible to all authenticated users |
| `/events` | None | Events - accessible to all authenticated users |
| `/finance` | `staff` | Financial data - requires staff or admin role |
| `/reports` | `staff` | Reports & analytics - requires staff or admin role |
| `/settings` | `admin` | System settings - requires admin role only |
| `/profile` | None | User profile - accessible to all authenticated users |

## Role Hierarchy

The system implements a hierarchical role structure:

```
admin (level 3)
  ├─ Can access all routes
  └─ Has full system permissions

staff (level 2)
  ├─ Can access finance and reports
  ├─ Can access all readonly routes
  └─ Cannot access admin settings

readonly (level 1)
  ├─ Can access basic routes (dashboard, members, leadership, etc.)
  └─ Cannot access finance, reports, or settings
```

## Testing

Comprehensive unit tests are provided in `client/src/components/__tests__/ProtectedRoute.test.tsx`:

- Authentication flow tests (12 tests)
- Role-based access control tests
- Role hierarchy enforcement tests
- Error display tests

All tests pass successfully.

## Requirements Validation

This implementation satisfies the following requirements:

- **Requirement 10.1:** Authentication required for system access
- **Requirement 10.2:** Role-based access control with admin, staff, and readonly roles
- **Requirement 10.3:** Read-only role restrictions with appropriate error messages

## Implementation Notes

1. The component uses the `useAuth` hook from `AuthContext` to access user authentication state
2. Role comparison is case-insensitive for flexibility
3. The loading state prevents flickering during authentication checks
4. The error page provides clear feedback about why access was denied
5. The `replace` prop on `Navigate` prevents adding login redirects to browser history
