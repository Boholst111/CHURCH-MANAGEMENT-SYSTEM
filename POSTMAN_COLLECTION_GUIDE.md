# Archive API - Postman Testing Guide

## Setup

### 1. Authentication
First, you need to authenticate and get a Sanctum token:

**Login Request:**
```
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "1|abc123...",
  "user": { ... }
}
```

### 2. Configure Authorization
For all subsequent requests, add the token to the Authorization header:
```
Authorization: Bearer 1|abc123...
```

## API Endpoints

### 1. List All Archived Items

**Request:**
```
GET http://localhost:8000/api/archives
Authorization: Bearer {your-token}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": 1,
        "type": "members",
        "name": "John Doe",
        "deleted_at": "2024-01-15T10:30:00.000000Z",
        "deleted_by": "Admin User"
      }
    ],
    "events": [...],
    "expenses": [...]
  }
}
```

**Error Responses:**
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User is not an admin

---

### 2. List Archived Items by Type

**Request:**
```
GET http://localhost:8000/api/archives/members
Authorization: Bearer {your-token}
```

**Valid Types:**
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

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "members",
      "name": "John Doe",
      "deleted_at": "2024-01-15T10:30:00.000000Z",
      "deleted_by": "Admin User"
    },
    {
      "id": 2,
      "type": "members",
      "name": "Jane Smith",
      "deleted_at": "2024-01-16T14:20:00.000000Z",
      "deleted_by": "Admin User"
    }
  ]
}
```

**Error Responses:**
- 400 Bad Request: Invalid model type
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User is not an admin

---

### 3. Restore Archived Item

**Request:**
```
POST http://localhost:8000/api/archives/members/1/restore
Authorization: Bearer {your-token}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Item restored successfully"
}
```

**Error Responses:**
- 400 Bad Request: Invalid model type
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User is not an admin
- 404 Not Found: Item doesn't exist or is not archived
- 500 Internal Server Error: Restore operation failed

**Side Effects:**
- Item's deleted_at timestamp is set to null
- Item appears in normal queries again
- Activity log entry is created

---

### 4. Permanently Delete Archived Item

**Request:**
```
DELETE http://localhost:8000/api/archives/members/1/force
Authorization: Bearer {your-token}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Item permanently deleted successfully"
}
```

**Error Responses:**
- 400 Bad Request: Invalid model type
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User is not an admin
- 404 Not Found: Item doesn't exist or is not archived
- 409 Conflict: Item has related records (foreign key constraint)
  ```json
  {
    "success": false,
    "message": "Cannot permanently delete this item because it has related records",
    "error": "Integrity constraint violation"
  }
  ```
- 500 Internal Server Error: Delete operation failed

**Side Effects:**
- Item is permanently removed from database
- Item cannot be recovered
- Activity log entry is created

---

## Testing Workflow

### Complete Test Scenario

1. **Create a test member** (if needed):
   ```
   POST http://localhost:8000/api/members
   {
     "first_name": "Test",
     "last_name": "User",
     "email": "test@example.com",
     ...
   }
   ```

2. **Archive the member** (soft delete):
   ```
   DELETE http://localhost:8000/api/members/1
   ```

3. **Verify it's archived**:
   ```
   GET http://localhost:8000/api/archives/members
   ```
   Should show the member in the archived list.

4. **Verify it's not in normal list**:
   ```
   GET http://localhost:8000/api/members
   ```
   Should NOT show the archived member.

5. **Restore the member**:
   ```
   POST http://localhost:8000/api/archives/members/1/restore
   ```

6. **Verify it's restored**:
   ```
   GET http://localhost:8000/api/members
   ```
   Should show the member again.

7. **Archive again**:
   ```
   DELETE http://localhost:8000/api/members/1
   ```

8. **Permanently delete**:
   ```
   DELETE http://localhost:8000/api/archives/members/1/force
   ```

9. **Verify it's gone**:
   ```
   GET http://localhost:8000/api/archives/members
   ```
   Should NOT show the member.

---

## Permission Testing

### Test as Non-Admin User

1. Login as a staff or readonly user
2. Try to access archive endpoints
3. Should receive 403 Forbidden responses

**Example:**
```
GET http://localhost:8000/api/archives
Authorization: Bearer {staff-user-token}

Response: 403 Forbidden
{
  "message": "Unauthorized"
}
```

### Test Without Authentication

1. Try to access archive endpoints without token
2. Should receive 401 Unauthorized responses

**Example:**
```
GET http://localhost:8000/api/archives

Response: 401 Unauthorized
{
  "message": "Unauthenticated."
}
```

---

## Activity Log Verification

After performing archive operations, check the activity logs:

**Request:**
```
GET http://localhost:8000/api/activities
Authorization: Bearer {your-token}
```

Look for entries with actions:
- `restored` - When an item is restored
- `force_deleted` - When an item is permanently deleted

Each entry should include:
- user_id
- action
- entity_type
- entity_id
- description
- ip_address
- created_at

---

## Common Issues

### Issue: 401 Unauthorized
**Solution:** Ensure you're including the Bearer token in the Authorization header

### Issue: 403 Forbidden
**Solution:** Ensure you're logged in as an admin user

### Issue: 404 Not Found
**Solution:** 
- Verify the item ID exists
- Verify the item is actually archived (has deleted_at set)
- Check the type parameter is correct

### Issue: 409 Conflict
**Solution:** The item has related records. You need to either:
- Delete the related records first
- Use cascade delete (if implemented)
- Keep the item archived instead of permanently deleting

---

## Postman Collection

You can import this collection into Postman:

```json
{
  "info": {
    "name": "Archive API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "List All Archives",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/archives",
          "host": ["{{base_url}}"],
          "path": ["api", "archives"]
        }
      }
    },
    {
      "name": "List Archives by Type",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/archives/members",
          "host": ["{{base_url}}"],
          "path": ["api", "archives", "members"]
        }
      }
    },
    {
      "name": "Restore Item",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/archives/members/1/restore",
          "host": ["{{base_url}}"],
          "path": ["api", "archives", "members", "1", "restore"]
        }
      }
    },
    {
      "name": "Force Delete Item",
      "request": {
        "method": "DELETE",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/archives/members/1/force",
          "host": ["{{base_url}}"],
          "path": ["api", "archives", "members", "1", "force"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8000"
    },
    {
      "key": "token",
      "value": "your-token-here"
    }
  ]
}
```

Save this as `archive-api.postman_collection.json` and import into Postman.
