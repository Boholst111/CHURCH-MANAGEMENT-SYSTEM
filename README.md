# Mahayahay Free Methodist Church Management System

A comprehensive church management system built with Laravel 8 and React/TypeScript. This modern SaaS-style application helps manage church members, leadership, events, finances, and analytics with a clean, professional interface.

## Features

- **Dashboard Overview**: Quick stats, attendance trends, and recent activities
- **Member Directory**: Searchable directory with status tracking and small group management
- **Leadership Directory**: Staff profiles with photos, roles, and contact information
- **Financial Management**: Tithe tracking, financial reports, and analytics
- **Event Management**: Create and track church events with attendance recording
- **Reports & Analytics**: Financial and demographic reports with PDF export
- **Small Groups**: Manage fellowship groups and member assignments
- **Activity Logging**: Comprehensive audit trail of system activities
- **User Management**: Role-based access control (Admin, Staff, Read-Only)
- **Settings**: Church details, notification preferences, and user profiles

## Technology Stack

### Backend
- Laravel 8.75 (PHP 7.3+/8.0+)
- MySQL database
- Laravel Sanctum for API authentication
- DomPDF for PDF generation
- Laravel Excel for data export

### Frontend
- React 18.2 with TypeScript
- Laravel Mix for asset compilation
- React Router 6.30 for navigation
- Tailwind CSS 3.3 for styling
- Lucide React for icons
- ApexCharts for data visualization
- Axios for API communication
- Framer Motion for animations

## Architecture

This application uses a unified single-server architecture where Laravel serves both the frontend and backend:

- **Frontend**: React SPA compiled via Laravel Mix from `resources/js` to `public/js`
- **Backend**: Laravel API serving endpoints under `/api`
- **Development**: Single server on port 8000 with Hot Module Replacement support
- **Production**: Optimized, minified assets with versioning for cache busting

### Directory Structure

```
church-management-system/
├── app/                    # Laravel application code
├── resources/
│   ├── js/                 # React application source
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and API client
│   │   ├── pages/          # Page components
│   │   ├── __tests__/      # Test files
│   │   ├── App.tsx         # Main App component
│   │   └── index.tsx       # React entry point
│   ├── css/                # Stylesheets
│   │   ├── app.css         # Main CSS with Tailwind
│   │   └── print.css       # Print styles
│   └── views/
│       └── app.blade.php   # Main Blade template
├── public/                 # Compiled assets and static files
│   ├── js/                 # Compiled JavaScript
│   ├── css/                # Compiled CSS
│   └── mix-manifest.json   # Asset versioning manifest
├── routes/
│   ├── api.php             # API routes
│   └── web.php             # Web routes (SPA catch-all)
├── webpack.mix.js          # Laravel Mix configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Node dependencies and scripts
```

## Installation

### Prerequisites
- PHP 7.3 or higher
- Composer
- Node.js 14+ and npm
- MySQL 5.7+

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd church-management-system
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database**
   
   Edit `.env` file with your database credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=church_management
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Run migrations and seeders**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

7. **Compile frontend assets**
   ```bash
   npm run dev
   ```
   
   This compiles the React application from `resources/js` to `public/js` and CSS from `resources/css` to `public/css`.

8. **Start the application**
   ```bash
   php artisan serve
   ```
   
   The application will be available at `http://localhost:8000`. Laravel serves both the frontend and API on a single server.

9. **Access the application**
   
   Open your browser and navigate to `http://localhost:8000`

### Default Login Credentials

After seeding, you can log in with:
- **Email**: admin@church.com
- **Password**: password123

## Development Workflow

### Asset Compilation

The application uses Laravel Mix to compile React and CSS assets:

```bash
# Compile assets once for development
npm run dev

# Compile and watch for changes
npm run watch

# Compile with Hot Module Replacement (recommended for development)
npm run hot

# Compile and minify for production
npm run prod
```

### Running the Application

**Development Mode (with HMR):**

1. In one terminal, start the Laravel Mix HMR server:
   ```bash
   npm run hot
   ```

2. In another terminal, start the Laravel server:
   ```bash
   php artisan serve
   ```

3. Open `http://localhost:8000` in your browser. Changes to React components will update instantly without page reload.

**Development Mode (without HMR):**

1. Compile assets:
   ```bash
   npm run dev
   ```

2. Start the Laravel server:
   ```bash
   php artisan serve
   ```

3. Open `http://localhost:8000` in your browser.

**Production:**

1. Build optimized assets:
   ```bash
   npm run prod
   ```

2. Deploy the application with a proper web server (nginx, Apache, etc.)

### Running Tests

```bash
# Backend tests
php artisan test

# Frontend tests
npm test
```

## API Documentation

### Authentication

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@church.com",
  "password": "password123"
}

Response: { "token": "...", "user": {...} }
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer {token}

Response: { "message": "Logged out successfully" }
```

#### Get Current User
```
GET /api/user
Authorization: Bearer {token}

Response: { "id": 1, "name": "...", "email": "...", "role": "admin" }
```

### Dashboard

#### Get Quick Stats
```
GET /api/dashboard/stats
Authorization: Bearer {token}

Response: {
  "totalMembers": 150,
  "monthlyTithes": 25000.00,
  "upcomingEvents": 5,
  "newVisitors": 12
}
```

#### Get Attendance Trends
```
GET /api/dashboard/attendance
Authorization: Bearer {token}

Response: [
  { "month": "2024-01", "attendance": 120 },
  { "month": "2024-02", "attendance": 135 }
]
```

#### Get Recent Activities
```
GET /api/dashboard/activities
Authorization: Bearer {token}

Response: [
  {
    "id": 1,
    "user": "Admin User",
    "action": "created",
    "entity_type": "member",
    "description": "Added new member John Doe",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Members

#### List Members
```
GET /api/members?search=john&status=active&small_group_id=1&page=1
Authorization: Bearer {token}

Query Parameters:
- search: Filter by name, email, or phone
- status: Filter by status (active, visitor)
- small_group_id: Filter by small group
- page: Page number for pagination

Response: {
  "data": [...],
  "current_page": 1,
  "total": 150,
  "per_page": 50
}
```

#### Create Member
```
POST /api/members
Authorization: Bearer {token}
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "city": "Springfield",
  "status": "active",
  "small_group_id": 1,
  "birth_date": "1990-01-15",
  "gender": "male"
}

Response: { "id": 1, "first_name": "John", ... }
```

#### Get Member
```
GET /api/members/{id}
Authorization: Bearer {token}

Response: { "id": 1, "first_name": "John", ... }
```

#### Update Member
```
PUT /api/members/{id}
Authorization: Bearer {token}
Content-Type: application/json

{ "first_name": "John", "last_name": "Smith", ... }

Response: { "id": 1, "first_name": "John", "last_name": "Smith", ... }
```

#### Delete Member
```
DELETE /api/members/{id}
Authorization: Bearer {token}

Response: { "message": "Member deleted successfully" }
```

#### Export Members (CSV)
```
GET /api/members/export?search=&status=active
Authorization: Bearer {token}

Response: CSV file download
```

### Leadership

#### List Leadership
```
GET /api/leadership
Authorization: Bearer {token}

Response: [
  {
    "id": 1,
    "first_name": "Pastor",
    "last_name": "Smith",
    "role": "Senior Pastor",
    "department": "Ministry",
    "email": "pastor@church.com",
    "phone": "555-5678",
    "photo_url": "/storage/photos/pastor.jpg",
    "bio": "...",
    "start_date": "2020-01-01"
  }
]
```

#### Create Leadership Profile
```
POST /api/leadership
Authorization: Bearer {token}
Content-Type: application/json

{
  "first_name": "Pastor",
  "last_name": "Smith",
  "role": "Senior Pastor",
  "department": "Ministry",
  "email": "pastor@church.com",
  "phone": "555-5678",
  "bio": "...",
  "start_date": "2020-01-01"
}

Response: { "id": 1, ... }
```

#### Update/Delete Leadership
```
PUT /api/leadership/{id}
DELETE /api/leadership/{id}
Authorization: Bearer {token}
```

### Small Groups

#### List Small Groups
```
GET /api/small-groups
Authorization: Bearer {token}

Response: [
  {
    "id": 1,
    "name": "Young Adults",
    "description": "...",
    "leader_name": "John Doe",
    "meeting_day": "Wednesday",
    "meeting_time": "19:00",
    "location": "Room 101",
    "member_count": 15
  }
]
```

#### Get Small Group Members
```
GET /api/small-groups/{id}/members
Authorization: Bearer {token}

Response: [ { "id": 1, "first_name": "John", ... } ]
```

#### Create/Update/Delete Small Group
```
POST /api/small-groups
PUT /api/small-groups/{id}
DELETE /api/small-groups/{id}
Authorization: Bearer {token}
```

### Finance

#### Get Tithes
```
GET /api/finance/tithes?start_date=2024-01-01&end_date=2024-12-31
Authorization: Bearer {token}

Response: [
  {
    "id": 1,
    "member_id": 1,
    "amount": 500.00,
    "payment_method": "cash",
    "date": "2024-01-15",
    "notes": "...",
    "member": { "first_name": "John", "last_name": "Doe" }
  }
]
```

#### Record Tithe
```
POST /api/finance/tithes
Authorization: Bearer {token}
Content-Type: application/json

{
  "member_id": 1,
  "amount": 500.00,
  "payment_method": "cash",
  "date": "2024-01-15",
  "notes": "Monthly tithe"
}

Response: { "id": 1, ... }
```

#### Get Financial Summary
```
GET /api/finance/summary?start_date=2024-01-01&end_date=2024-12-31
Authorization: Bearer {token}

Response: {
  "total_giving": 125000.00,
  "average_per_member": 833.33,
  "total_givers": 150,
  "monthly_breakdown": [...]
}
```

### Events

#### List Events
```
GET /api/events?status=upcoming
Authorization: Bearer {token}

Query Parameters:
- status: Filter by status (upcoming, completed, cancelled)

Response: [
  {
    "id": 1,
    "title": "Sunday Service",
    "description": "...",
    "event_date": "2024-01-21",
    "event_time": "10:00",
    "location": "Main Sanctuary",
    "status": "upcoming",
    "attendance_count": null
  }
]
```

#### Create Event
```
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Sunday Service",
  "description": "...",
  "event_date": "2024-01-21",
  "event_time": "10:00",
  "location": "Main Sanctuary",
  "status": "upcoming"
}

Response: { "id": 1, ... }
```

#### Mark Event as Completed
```
PUT /api/events/{id}/complete
Authorization: Bearer {token}
Content-Type: application/json

{
  "attendance_count": 150
}

Response: { "id": 1, "status": "completed", "attendance_count": 150 }
```

#### Update/Delete Event
```
PUT /api/events/{id}
DELETE /api/events/{id}
Authorization: Bearer {token}
```

### Reports

#### Get Financial Report
```
GET /api/reports/financial?start_date=2024-01-01&end_date=2024-12-31
Authorization: Bearer {token}

Response: {
  "total_giving": 125000.00,
  "average_giving": 833.33,
  "monthly_data": [...],
  "trends": {...}
}
```

#### Get Demographic Report
```
GET /api/reports/demographics
Authorization: Bearer {token}

Response: {
  "age_distribution": [...],
  "location_distribution": [...],
  "status_distribution": {...}
}
```

#### Export Report as PDF
```
POST /api/reports/export-pdf
Authorization: Bearer {token}
Content-Type: application/json

{
  "report_type": "financial",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31"
}

Response: PDF file download
```

### Settings

#### Get Church Settings
```
GET /api/settings/church
Authorization: Bearer {token}

Response: {
  "church_name": "Mahayahay Free Methodist Church",
  "address": "...",
  "city": "...",
  "phone": "...",
  "email": "...",
  "service_times": "..."
}
```

#### Update Church Settings
```
PUT /api/settings/church
Authorization: Bearer {token}
Content-Type: application/json

{
  "church_name": "Mahayahay Free Methodist Church",
  "address": "...",
  ...
}

Response: { "message": "Settings updated successfully" }
```

#### Get/Update Notification Preferences
```
GET /api/settings/notifications
PUT /api/settings/notifications
Authorization: Bearer {token}
```

### User Management (Admin Only)

#### List Users
```
GET /api/users
Authorization: Bearer {token}

Response: [
  {
    "id": 1,
    "name": "Admin User",
    "email": "admin@church.com",
    "role": "admin",
    "created_at": "..."
  }
]
```

#### Create User
```
POST /api/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New User",
  "email": "user@church.com",
  "password": "SecurePass123",
  "role": "staff"
}

Response: { "id": 2, ... }
```

#### Update/Delete User
```
PUT /api/users/{id}
DELETE /api/users/{id}
Authorization: Bearer {token}
```

### Activity Log (Admin Only)

#### Get Activity Log
```
GET /api/activities?start_date=2024-01-01&end_date=2024-12-31&user_id=1
Authorization: Bearer {token}

Response: [
  {
    "id": 1,
    "user_id": 1,
    "user": { "name": "Admin User" },
    "action": "created",
    "entity_type": "member",
    "entity_id": 1,
    "description": "Added new member John Doe",
    "ip_address": "127.0.0.1",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

## User Roles

### Admin
- Full access to all features
- User management
- Activity log viewing
- All CRUD operations

### Staff
- Member management
- Event management
- Financial data entry
- Report viewing
- Cannot manage users

### Read-Only
- View-only access to all data
- Cannot create, update, or delete records
- Cannot access user management or activity logs

## Development Guide

For detailed development instructions, see [DEVELOPMENT.md](DEVELOPMENT.md), which covers:

- **Adding React Components** - How to create new components with TypeScript
- **Writing Tests** - Unit tests and integration tests with Jest
- **Using Path Aliases** - Import shortcuts with `@/` prefix
- **Environment Variables** - Configuration for frontend and backend
- **Build Process** - Understanding Laravel Mix compilation
- **Best Practices** - Code style, performance, and security guidelines

### Quick Reference

**Adding a React Component:**
```typescript
// resources/js/components/MyComponent.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Button>Click me</Button>
    </div>
  );
};
```

**Adding Tests:**
```typescript
// resources/js/__tests__/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

test('renders title', () => {
  render(<MyComponent title="Hello" />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

**Using Path Aliases:**
```typescript
// Use @/ to reference resources/js/
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
```

**Environment Variables:**
```env
# .env - Backend variables
APP_NAME="Church Management System"
DB_DATABASE=church_management

# Frontend variables (prefix with MIX_)
MIX_API_TIMEOUT=30000
```

```typescript
// Access in React
const timeout = process.env.MIX_API_TIMEOUT;
```

**Build Process:**
```bash
# Development with HMR (recommended)
npm run hot

# Development build
npm run dev

# Watch for changes
npm run watch

# Production build (minified, optimized)
npm run prod
```

## License

MIT License

## Support

For support, please contact the church administration or open an issue in the repository.
