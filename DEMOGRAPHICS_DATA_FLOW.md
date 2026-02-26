# Demographics Data Flow Documentation

## Overview
The Demographics feature in the Reports & Analytics page is fully connected to the Church Management System's **members** database table. Here's the complete data flow:

---

## Data Source: Members Table

### Database Table: `members`
**Location**: Your MySQL/MariaDB database
**Current Data**: 12 members

### Table Structure (Fields Used for Demographics):
```
- id (primary key)
- first_name
- last_name
- email
- phone
- address
- city              ← Used for "by_location" demographics
- status            ← Used for "by_status" demographics (active/visitor)
- small_group_id    ← Used for "by_small_group" demographics
- date_joined
- birth_date        ← Used for "by_age" demographics (calculates age)
- gender            ← Used for "by_gender" demographics (male/female/other)
- created_at
- updated_at
- deleted_at        ← Soft delete support
```

---

## Complete Data Flow

### 1. Frontend (React/TypeScript)
**File**: `resources/js/pages/Reports.tsx`

```typescript
// When page loads, it calls:
fetchDemographicData()
  ↓
// Which calls the API:
reportsApi.getDemographicReport()
```

### 2. API Layer
**File**: `resources/js/lib/reportsApi.ts`

```typescript
getDemographicReport: async (): Promise<DemographicData> => {
    const response = await api.get<ApiResponse<DemographicData>>('/api/reports/demographics');
    return response.data.data;
}
```

**API Endpoint**: `GET /api/reports/demographics`
**Route File**: `routes/api.php` (Line 186)

### 3. Controller Layer
**File**: `app/Http/Controllers/Api/ReportController.php`

```php
public function getDemographicReport(): JsonResponse
{
    $reportData = $this->reportService->generateDemographicReport();
    
    return response()->json([
        'success' => true,
        'data' => $reportData,
    ]);
}
```

### 4. Service Layer
**File**: `app/Services/ReportService.php`

```php
public function generateDemographicReport(): array
{
    // Fetches ALL members from database
    $members = $this->memberRepository->all();

    return [
        'by_age' => $this->aggregateByAge($members),           // Groups by age ranges
        'by_location' => $this->aggregateByLocation($members), // Groups by city
        'by_gender' => $this->aggregateByGender($members),     // Groups by gender
        'by_status' => $this->aggregateByStatus($members),     // Groups by status
        'by_small_group' => $this->aggregateBySmallGroup($members), // Groups by small group
        'total_members' => $members->count(),                  // Total count
    ];
}
```

### 5. Repository Layer
**File**: `app/Repositories/MemberRepository.php`

```php
public function all()
{
    // Fetches all members from the 'members' table
    return Member::all();
}

public function getAllWithSmallGroups()
{
    // Fetches members with their small group relationships
    return Member::with('smallGroup')->get();
}
```

### 6. Model Layer
**File**: `app/Models/Member.php`

```php
class Member extends Model
{
    use HasFactory, SoftDeletes;
    
    // Defines relationship to SmallGroup
    public function smallGroup()
    {
        return $this->belongsTo(SmallGroup::class);
    }
}
```

---

## Data Aggregation Methods

### 1. By Age (`aggregateByAge`)
**Source Field**: `birth_date`
**Logic**: Calculates age from birth_date and groups into:
- 0-17 years
- 18-30 years
- 31-50 years
- 51-70 years
- 71+ years
- unknown (no birth_date)

### 2. By Location (`aggregateByLocation`)
**Source Field**: `city`
**Logic**: Groups members by their city field
**Example Output**: 
```json
{
  "Manila": 5,
  "Cebu": 3,
  "Davao": 4
}
```

### 3. By Gender (`aggregateByGender`)
**Source Field**: `gender`
**Logic**: Groups by gender (male/female/other)
**Example Output**:
```json
{
  "male": 6,
  "female": 5,
  "other": 1
}
```

### 4. By Status (`aggregateByStatus`)
**Source Field**: `status`
**Logic**: Groups by member status (active/visitor)
**Example Output**:
```json
{
  "active": 10,
  "visitor": 2
}
```

### 5. By Small Group (`aggregateBySmallGroup`)
**Source Field**: `small_group_id` (relationship)
**Logic**: Groups members by their assigned small group
**Example Output**:
```json
[
  {"name": "Youth Group", "count": 4},
  {"name": "Prayer Group", "count": 3},
  {"name": "No Small Group", "count": 5}
]
```

---

## How to Verify the Connection

### 1. Check Database Connection
```bash
php artisan tinker --execute="echo App\Models\Member::count();"
```
**Current Result**: 12 members

### 2. Test API Endpoint
```bash
# Using curl or Postman
GET http://127.0.0.1:8000/api/reports/demographics
```

### 3. Check Frontend
- Navigate to: Reports & Analytics page
- The Demographics card should display charts and statistics
- If you see "No demographic data available", check:
  - Database connection
  - Member data exists
  - API authentication

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  resources/js/pages/Reports.tsx                             │
│  - Displays Demographics Chart                              │
│  - Shows summary statistics                                 │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP GET Request
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  API ENDPOINT                                │
│  GET /api/reports/demographics                               │
│  routes/api.php                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  CONTROLLER                                  │
│  app/Http/Controllers/Api/ReportController.php               │
│  getDemographicReport()                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  SERVICE LAYER                               │
│  app/Services/ReportService.php                              │
│  generateDemographicReport()                                 │
│  - aggregateByAge()                                          │
│  - aggregateByLocation()                                     │
│  - aggregateByGender()                                       │
│  - aggregateByStatus()                                       │
│  - aggregateBySmallGroup()                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  REPOSITORY                                  │
│  app/Repositories/MemberRepository.php                       │
│  all() - Fetches all members                                 │
│  getAllWithSmallGroups() - Fetches with relationships        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  MODEL                                       │
│  app/Models/Member.php                                       │
│  - Defines database structure                                │
│  - Defines relationships (smallGroup)                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  DATABASE                                    │
│  Table: members                                              │
│  Current Records: 12 members                                 │
│  Fields: birth_date, city, gender, status, small_group_id    │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

**Demographics IS connected to the Church Management System!**

- **Data Source**: `members` table in your database (currently has 12 members)
- **Fields Used**: birth_date, city, gender, status, small_group_id
- **Connection**: Direct database connection through Laravel Eloquent ORM
- **Real-time**: Data is fetched fresh from the database each time you load the page
- **Relationships**: Includes Small Groups data through Eloquent relationships

The demographics feature pulls real member data from your church management system and displays it in visual charts and statistics on the Reports & Analytics page.
