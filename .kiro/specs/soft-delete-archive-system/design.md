# Design Document: Soft Delete/Archive System

## Overview

This design implements a comprehensive soft delete/archive system for the church management system using Laravel's built-in SoftDeletes trait. The system replaces all permanent delete operations with soft deletes, adds an Archive Management interface for administrators, and ensures data preservation while maintaining clean user interfaces.

The implementation leverages Laravel's Eloquent ORM features, including the SoftDeletes trait, global scopes, and query builders. The frontend will be updated to use "Archive" terminology and icons, and a new Archive Management page will be added to the Settings section.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ UI Components│  │Archive Buttons│  │Archive Management│  │
│  │  (Updated)   │  │  (New Icons) │  │     Page         │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Archive API Endpoints                                │  │
│  │  - GET /api/archives                                  │  │
│  │  - GET /api/archives/{type}                           │  │
│  │  - POST /api/archives/{type}/{id}/restore             │  │
│  │  - DELETE /api/archives/{type}/{id}/force             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Service Layer                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ArchiveService                                       │  │
│  │  - listArchived()                                     │  │
│  │  - listArchivedByType()                               │  │
│  │  - restore()                                          │  │
│  │  - forceDelete()                                      │  │
│  │  - logActivity()                                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Model Layer                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Eloquent Models with SoftDeletes Trait              │  │
│  │  - Member, Event, Leadership, SmallGroup             │  │
│  │  - Offering, Expense, Budget, Pledge                 │  │
│  │  - Fund, Vendor, ExpenseCategory, OfferingType       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Database Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Tables with deleted_at column                       │  │
│  │  - Indexed for performance                           │  │
│  │  - Nullable timestamp                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

1. **Archive Operation**: User clicks Archive button → Frontend sends DELETE request → Controller checks permissions → Model soft deletes record → Activity logged → Success response
2. **Restore Operation**: Admin clicks Restore button → Frontend sends POST restore request → Controller checks admin permissions → Model restores record → Activity logged → Success response
3. **View Archives**: Admin opens Archive Management → Frontend sends GET request → Service retrieves all archived items → Grouped by type → Displayed in UI
4. **Permanent Delete**: Admin confirms permanent delete → Frontend sends DELETE force request → Controller checks admin permissions → Model force deletes → Activity logged → Success response

## Components and Interfaces

### 1. Database Migrations

**Purpose**: Add deleted_at columns to all archivable model tables

**Migration Structure**:
```php
Schema::table('table_name', function (Blueprint $table) {
    $table->softDeletes(); // Adds deleted_at timestamp column
    $table->index('deleted_at'); // Index for performance
});
```

**Tables to Modify**:
- members
- events
- leadership
- small_groups
- offerings
- expenses
- budgets
- pledges
- funds
- vendors
- expense_categories
- offering_types

### 2. Eloquent Models

**Purpose**: Add SoftDeletes trait to all archivable models

**Model Updates**:
```php
use Illuminate\Database\Eloquent\SoftDeletes;

class ModelName extends Model
{
    use HasFactory, SoftDeletes;
    
    // Existing model code...
}
```

**Models to Update**:
- Member
- Event
- Leadership
- SmallGroup
- Offering
- Expense (already has SoftDeletes)
- Budget
- Pledge
- Fund
- Vendor
- ExpenseCategory
- OfferingType

### 3. ArchiveService

**Purpose**: Centralized service for archive management operations

**Interface**:
```php
class ArchiveService
{
    /**
     * Get all archived items across all types
     * 
     * @return Collection<string, Collection>
     */
    public function listAllArchived(): Collection;
    
    /**
     * Get archived items by type
     * 
     * @param string $type Model type (e.g., 'Member', 'Event')
     * @return Collection
     */
    public function listArchivedByType(string $type): Collection;
    
    /**
     * Restore an archived item
     * 
     * @param string $type Model type
     * @param int $id Item ID
     * @return bool Success status
     */
    public function restore(string $type, int $id): bool;
    
    /**
     * Permanently delete an archived item
     * 
     * @param string $type Model type
     * @param int $id Item ID
     * @return bool Success status
     */
    public function forceDelete(string $type, int $id): bool;
    
    /**
     * Get model class from type string
     * 
     * @param string $type Model type
     * @return string Fully qualified class name
     */
    protected function getModelClass(string $type): string;
    
    /**
     * Log archive-related activity
     * 
     * @param string $action Action performed
     * @param string $type Model type
     * @param int $id Item ID
     * @param array $details Additional details
     * @return void
     */
    protected function logActivity(string $action, string $type, int $id, array $details = []): void;
}
```

**Type Mapping**:
```php
protected $typeMap = [
    'members' => Member::class,
    'events' => Event::class,
    'leadership' => Leadership::class,
    'small_groups' => SmallGroup::class,
    'offerings' => Offering::class,
    'expenses' => Expense::class,
    'budgets' => Budget::class,
    'pledges' => Pledge::class,
    'funds' => Fund::class,
    'vendors' => Vendor::class,
    'expense_categories' => ExpenseCategory::class,
    'offering_types' => OfferingType::class,
];
```

### 4. API Controllers

**ArchiveController**:
```php
class ArchiveController extends Controller
{
    protected ArchiveService $archiveService;
    
    /**
     * List all archived items
     * GET /api/archives
     */
    public function index(): JsonResponse;
    
    /**
     * List archived items by type
     * GET /api/archives/{type}
     */
    public function indexByType(string $type): JsonResponse;
    
    /**
     * Restore an archived item
     * POST /api/archives/{type}/{id}/restore
     */
    public function restore(string $type, int $id): JsonResponse;
    
    /**
     * Permanently delete an archived item
     * DELETE /api/archives/{type}/{id}/force
     */
    public function forceDelete(string $type, int $id): JsonResponse;
}
```

**Existing Controllers**: Update all existing controllers that handle delete operations to ensure they use soft delete (which is automatic with SoftDeletes trait)

### 5. Middleware and Permissions

**Permission Checks**:
- Archive operations: Require 'staff' or 'admin' role
- Restore operations: Require 'admin' role
- Permanent delete operations: Require 'admin' role

**Middleware Application**:
```php
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/api/archives', [ArchiveController::class, 'index']);
    Route::get('/api/archives/{type}', [ArchiveController::class, 'indexByType']);
    Route::post('/api/archives/{type}/{id}/restore', [ArchiveController::class, 'restore']);
    Route::delete('/api/archives/{type}/{id}/force', [ArchiveController::class, 'forceDelete']);
});
```

### 6. Frontend Components

**Archive Button Component** (React/TypeScript):
```typescript
interface ArchiveButtonProps {
    itemType: string;
    itemId: number;
    itemName: string;
    onArchiveSuccess?: () => void;
}

const ArchiveButton: React.FC<ArchiveButtonProps> = ({
    itemType,
    itemId,
    itemName,
    onArchiveSuccess
}) => {
    // Displays archive icon (box-archive or archive icon)
    // Shows confirmation dialog with "Archive" terminology
    // Calls DELETE /api/{itemType}/{itemId}
    // Displays success/error messages
};
```

**Archive Management Page** (React/TypeScript):
```typescript
interface ArchivedItem {
    id: number;
    type: string;
    name: string;
    deleted_at: string;
    deleted_by: string;
}

const ArchiveManagementPage: React.FC = () => {
    // Fetches archived items from GET /api/archives
    // Groups items by type
    // Provides filter controls
    // Provides search functionality
    // Displays Restore and Permanent Delete buttons
    // Handles restore and permanent delete operations
};
```

**UI Updates**:
- Replace all trash icons with archive icons (lucide-react: Archive icon)
- Update all "Delete" button text to "Archive"
- Update all confirmation dialog text to use "Archive" terminology
- Add Archive Management link to Settings navigation

## Data Models

### Database Schema Changes

**Soft Delete Column**:
```sql
ALTER TABLE table_name ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;
CREATE INDEX idx_deleted_at ON table_name(deleted_at);
```

**Affected Tables**:
- members
- events
- leadership
- small_groups
- offerings
- expenses (already has deleted_at)
- budgets
- pledges
- funds
- vendors
- expense_categories
- offering_types

### Query Behavior

**Default Queries** (with SoftDeletes trait):
```php
// Automatically excludes soft-deleted records
Member::all(); // Only active members
Member::where('status', 'active')->get(); // Only active, non-deleted members
```

**Including Archived Items**:
```php
// Include soft-deleted records
Member::withTrashed()->get(); // All members including archived
Member::onlyTrashed()->get(); // Only archived members
```

**Restore and Force Delete**:
```php
// Restore a soft-deleted record
$member = Member::withTrashed()->find($id);
$member->restore();

// Permanently delete a record
$member = Member::withTrashed()->find($id);
$member->forceDelete();
```

### Activity Log Schema

**Activity Log Entry for Archive Operations**:
```php
[
    'user_id' => auth()->id(),
    'action' => 'archived', // or 'restored', 'force_deleted'
    'model_type' => 'Member',
    'model_id' => 123,
    'description' => 'Archived member: John Doe',
    'metadata' => [
        'item_name' => 'John Doe',
        'item_type' => 'Member',
    ],
    'created_at' => now(),
]
```

## 
Error Handling

### Error Scenarios and Handling

#### 1. Permission Errors

**Scenario**: User attempts archive/restore/delete without proper permissions

**Handling**:
```php
if (!auth()->user()->hasRole(['staff', 'admin'])) {
    return response()->json([
        'error' => 'Unauthorized. You do not have permission to archive items.'
    ], 403);
}
```

**Frontend**: Display error toast with permission message

#### 2. Item Not Found

**Scenario**: Attempting to restore or delete an item that doesn't exist

**Handling**:
```php
$item = ModelClass::withTrashed()->find($id);
if (!$item) {
    return response()->json([
        'error' => 'Item not found.'
    ], 404);
}
```

**Frontend**: Display error message and refresh the archive list

#### 3. Item Not Archived

**Scenario**: Attempting to restore an item that isn't archived

**Handling**:
```php
if (!$item->trashed()) {
    return response()->json([
        'error' => 'Item is not archived and cannot be restored.'
    ], 400);
}
```

**Frontend**: Display error message and refresh the archive list

#### 4. Database Constraint Violations

**Scenario**: Permanent delete fails due to foreign key constraints

**Handling**:
```php
try {
    $item->forceDelete();
} catch (\Illuminate\Database\QueryException $e) {
    if ($e->getCode() === '23000') { // Integrity constraint violation
        return response()->json([
            'error' => 'Cannot permanently delete this item because it has related records.'
        ], 409);
    }
    throw $e;
}
```

**Frontend**: Display detailed error message explaining the constraint issue

#### 5. Invalid Model Type

**Scenario**: API request with unsupported model type

**Handling**:
```php
protected function getModelClass(string $type): string
{
    if (!isset($this->typeMap[$type])) {
        throw new \InvalidArgumentException("Invalid model type: {$type}");
    }
    return $this->typeMap[$type];
}
```

**Frontend**: Should not occur with proper UI, but display generic error if it does

#### 6. Activity Logging Failures

**Scenario**: Activity log creation fails

**Handling**:
```php
try {
    $this->logActivity($action, $type, $id, $details);
} catch (\Exception $e) {
    // Log the error but don't fail the operation
    \Log::error('Failed to log archive activity', [
        'action' => $action,
        'type' => $type,
        'id' => $id,
        'error' => $e->getMessage()
    ]);
}
```

**Impact**: Operation succeeds even if logging fails (logging is non-critical)

### Error Response Format

**Standard Error Response**:
```json
{
    "error": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {
        "field": "Additional context if applicable"
    }
}
```

### Frontend Error Handling

**Error Display Strategy**:
- Use toast notifications for transient errors
- Use modal dialogs for critical errors requiring user action
- Log errors to console for debugging
- Provide actionable error messages (e.g., "Contact administrator" for permission errors)

## Testing Strategy

### Overview

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage of the soft delete/archive system. Unit tests verify specific behaviors and edge cases, while property-based tests validate universal properties across all archivable models.

### Unit Testing

**Test Categories**:

1. **Model Tests**
   - Verify SoftDeletes trait is applied to all archivable models
   - Test that deleted_at column exists and is fillable
   - Test model relationships are maintained after archiving
   - Test specific archive/restore scenarios

2. **Service Tests**
   - Test ArchiveService methods with various model types
   - Test type mapping and model class resolution
   - Test activity logging for all operations
   - Test error handling for invalid inputs

3. **Controller Tests**
   - Test API endpoints with valid requests
   - Test permission checks for each endpoint
   - Test response formats and status codes
   - Test error responses for invalid requests

4. **Integration Tests**
   - Test complete archive workflow (archive → list → restore)
   - Test permanent delete workflow with confirmations
   - Test cascading archive operations
   - Test activity log integration

**Example Unit Tests**:
```php
// Test that Member model uses SoftDeletes
public function test_member_model_uses_soft_deletes()
{
    $member = Member::factory()->create();
    $member->delete();
    
    $this->assertSoftDeleted('members', ['id' => $member->id]);
    $this->assertNotNull($member->fresh()->deleted_at);
}

// Test restore functionality
public function test_can_restore_archived_member()
{
    $member = Member::factory()->create();
    $member->delete();
    
    $member->restore();
    
    $this->assertNull($member->fresh()->deleted_at);
    $this->assertDatabaseHas('members', [
        'id' => $member->id,
        'deleted_at' => null
    ]);
}

// Test permission checks
public function test_non_admin_cannot_restore_archived_items()
{
    $user = User::factory()->create(['role' => 'staff']);
    $member = Member::factory()->create();
    $member->delete();
    
    $response = $this->actingAs($user)
        ->postJson("/api/archives/members/{$member->id}/restore");
    
    $response->assertStatus(403);
}
```

### Property-Based Testing

**Property Testing Configuration**:
- Use fast-check library for property-based testing
- Minimum 100 iterations per property test
- Each test references its design document property
- Tag format: **Feature: soft-delete-archive-system, Property {number}: {property_text}**

**Test Data Generators**:
```typescript
// Generator for archivable model types
const archivableModelGen = fc.constantFrom(
    'members', 'events', 'leadership', 'small_groups',
    'offerings', 'expenses', 'budgets', 'pledges',
    'funds', 'vendors', 'expense_categories', 'offering_types'
);

// Generator for model instances
const modelInstanceGen = (type: string) => {
    // Generate valid model data based on type
    // Returns factory-created instance
};

// Generator for user roles
const userRoleGen = fc.constantFrom('admin', 'staff', 'member');
```



## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Core Soft Delete Properties

**Property 1: Soft delete sets timestamp**
*For any* archivable model instance, when a delete operation is performed, the deleted_at timestamp should be set to a non-null datetime value and the record should remain in the database.
**Validates: Requirements 1.2, 10.4**

**Property 2: Default queries exclude archived items**
*For any* archivable model type, when querying without explicit inclusion of trashed items, the results should only contain records with null deleted_at timestamps.
**Validates: Requirements 1.3, 10.1**

**Property 3: Relationships preserved through archive and restore**
*For any* archivable model instance with relationships, archiving and then restoring the instance should preserve all relationship data and allow access to related records.
**Validates: Requirements 1.4, 4.6, 10.5**

**Property 4: Restore clears deleted_at timestamp**
*For any* archived model instance, when a restore operation is performed, the deleted_at timestamp should be set to null and the record should appear in default queries.
**Validates: Requirements 4.2, 4.3**

**Property 5: Force delete removes record permanently**
*For any* archived model instance, when a force delete operation is performed, the record should not exist in the database even when querying with withTrashed().
**Validates: Requirements 5.4**

**Property 6: Explicit trashed queries include archived items**
*For any* archivable model type, when querying with withTrashed() or onlyTrashed(), the results should include records with non-null deleted_at timestamps.
**Validates: Requirements 10.2**

### Permission and Authorization Properties

**Property 7: Archive permission enforcement**
*For any* user with staff or admin role and any archivable model instance, the archive operation should succeed; for any user without staff or admin role, the archive operation should be denied with a 403 error.
**Validates: Requirements 6.1, 6.2**

**Property 8: Restore permission enforcement**
*For any* user with admin role and any archived model instance, the restore operation should succeed; for any user without admin role, the restore operation should be denied with a 403 error.
**Validates: Requirements 6.3, 6.4**

**Property 9: Permanent delete permission enforcement**
*For any* user with admin role and any archived model instance, the permanent delete operation should succeed; for any user without admin role, the permanent delete operation should be denied with a 403 error.
**Validates: Requirements 6.5, 6.6**

**Property 10: API authentication requirement**
*For any* archive-related API endpoint, when called without valid authentication, the response should be 401 Unauthorized; when called with authentication but insufficient permissions, the response should be 403 Forbidden.
**Validates: Requirements 8.5, 8.6**

### Activity Logging Properties

**Property 11: Archive operations create activity logs**
*For any* archive, restore, or permanent delete operation on any archivable model, an activity log entry should be created containing the action type, user ID, model type, model ID, timestamp, and item details.
**Validates: Requirements 7.1, 7.2, 7.3, 7.4**

**Property 12: Activity log immutability**
*For any* activity log entry created by archive operations, the entry should not be modifiable or deletable after creation.
**Validates: Requirements 7.5**

### API Endpoint Properties

**Property 13: Archive listing by type**
*For any* valid archivable model type, calling GET /api/archives/{type} should return only archived items of that specific type with non-null deleted_at timestamps.
**Validates: Requirements 8.2**

**Property 14: Restore endpoint behavior**
*For any* archived model instance, calling POST /api/archives/{type}/{id}/restore should clear the deleted_at timestamp and return a success response with the restored item data.
**Validates: Requirements 8.3**

**Property 15: Force delete endpoint behavior**
*For any* archived model instance, calling DELETE /api/archives/{type}/{id}/force should permanently remove the record from the database and return a success response.
**Validates: Requirements 8.4**

**Property 16: API success response format**
*For any* successful archive-related API operation, the response should include a success status code (200-204), a success message, and the updated or affected data.
**Validates: Requirements 8.7**

**Property 17: API error response format**
*For any* failed archive-related API operation, the response should include an appropriate error status code (400-500), an error message, and optional error details.
**Validates: Requirements 8.8**

### User Interface Properties

**Property 18: Archive terminology consistency**
*For any* UI component that previously displayed "Delete" terminology, it should now display "Archive" terminology including button labels, tooltips, and confirmation dialogs.
**Validates: Requirements 2.1, 2.4**

**Property 19: Archive icon usage**
*For any* UI component with archive functionality, it should display an archive icon (not a trash icon) to visually distinguish archiving from deletion.
**Validates: Requirements 2.2**

**Property 20: Archive confirmation dialog**
*For any* archive button click, a confirmation dialog should appear with "Archive" terminology before the operation is executed.
**Validates: Requirements 2.3**

**Property 21: Operation feedback messages**
*For any* archive, restore, or permanent delete operation, upon completion the system should display a success message for successful operations or an error message with failure reason for failed operations.
**Validates: Requirements 2.5, 4.4, 4.5, 5.5, 6.7**

**Property 22: Restore button visibility**
*For any* archived item displayed in the Archive Management interface, a Restore button should be visible and functional.
**Validates: Requirements 3.6**

**Property 23: Permanent delete button conditional visibility**
*For any* archived item displayed in the Archive Management interface, a Permanent Delete button should be visible only when the current user has admin role.
**Validates: Requirements 3.7, 5.1**

**Property 24: Archived items display required information**
*For any* archived item displayed in the Archive Management interface, the display should include the item name, archive date (deleted_at), and the username of the user who archived it.
**Validates: Requirements 3.3**

**Property 25: Archive filtering by type**
*For any* archivable model type selected in the Archive Management filter, only archived items of that type should be displayed in the results.
**Validates: Requirements 3.4**

**Property 26: Archive search functionality**
*For any* search query entered in the Archive Management search field, the results should include only archived items whose name or relevant fields contain the search term.
**Validates: Requirements 3.5**

**Property 27: Permanent delete double confirmation**
*For any* permanent delete button click, the system should require two separate confirmations before executing the operation, with the first confirmation displaying a strong warning about irreversibility.
**Validates: Requirements 5.2, 5.3**

### Data Migration Properties

**Property 28: Migration preserves existing data**
*For any* existing records in archivable model tables, running the soft delete migration should preserve all existing field values and only add the deleted_at column set to null.
**Validates: Requirements 9.2, 9.3**

### Cascading Behavior Properties

**Property 29: Cascading archive handling**
*For any* archivable model instance with dependent records, archiving the parent should either cascade the archive to dependents or prevent the archive with an appropriate error message, maintaining referential integrity.
**Validates: Requirements 1.5**

**Property 30: Cascading delete handling**
*For any* archived model instance with dependent records, attempting permanent delete should either cascade the delete to dependents or prevent the delete with an appropriate error message explaining the constraint violation.
**Validates: Requirements 5.6**

