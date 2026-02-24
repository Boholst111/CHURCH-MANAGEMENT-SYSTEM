# Requirements Document

## Introduction

This document specifies the requirements for implementing a comprehensive soft delete/archive system for the church management system. The system will replace all permanent delete operations with soft delete (archive) functionality, ensuring data preservation while maintaining a clean user interface. An Archive Management interface will allow administrators to view, restore, and manage archived items.

## Glossary

- **System**: The church management system application
- **Archive**: The action of soft-deleting a record by setting its deleted_at timestamp
- **Restore**: The action of recovering an archived record by clearing its deleted_at timestamp
- **Archived_Item**: Any database record with a non-null deleted_at timestamp
- **Active_Item**: Any database record with a null deleted_at timestamp
- **Admin**: A user with administrative privileges
- **Staff**: A user with staff-level privileges
- **Archive_Management_Page**: The settings interface for viewing and managing archived items
- **Permanent_Delete**: The irreversible removal of a record from the database (admin-only operation)
- **Archivable_Model**: Any model that supports soft delete functionality (Member, Event, Leadership, SmallGroup, Offering, Expense, Budget, Pledge, Fund, Vendor, ExpenseCategory, OfferingType)

## Requirements

### Requirement 1: Soft Delete Implementation

**User Story:** As a system administrator, I want all delete operations to use soft delete instead of permanent deletion, so that data is preserved and can be recovered if needed.

#### Acceptance Criteria

1. THE System SHALL add a deleted_at timestamp column to all Archivable_Model tables
2. WHEN an Archivable_Model is deleted, THE System SHALL set the deleted_at timestamp to the current datetime
3. WHEN querying Archivable_Models, THE System SHALL exclude Archived_Items by default
4. THE System SHALL preserve all relationships and data integrity when archiving records
5. WHEN an Archivable_Model has dependent records, THE System SHALL handle cascading archive operations appropriately

### Requirement 2: Archive User Interface

**User Story:** As a user with appropriate permissions, I want delete buttons to be replaced with archive buttons, so that the interface clearly communicates that data is being archived rather than permanently deleted.

#### Acceptance Criteria

1. WHEN a user views any interface with delete functionality, THE System SHALL display "Archive" buttons instead of "Delete" buttons
2. WHEN displaying archive buttons, THE System SHALL use an archive icon instead of a trash icon
3. WHEN a user clicks an archive button, THE System SHALL display a confirmation dialog with "Archive" terminology
4. THE System SHALL update all button labels, tooltips, and confirmation messages to use "Archive" terminology
5. WHEN an archive operation completes successfully, THE System SHALL display a success message indicating the item was archived

### Requirement 3: Archive Management Interface

**User Story:** As an administrator, I want to access an Archive Management page in Settings, so that I can view all archived items and manage them centrally.

#### Acceptance Criteria

1. THE System SHALL provide an Archive_Management_Page accessible from the Settings section
2. WHEN an Admin accesses the Archive_Management_Page, THE System SHALL display all Archived_Items grouped by type
3. WHEN displaying Archived_Items, THE System SHALL show the item name, archive date, and the user who archived it
4. THE System SHALL provide filter controls to view Archived_Items by type (Members, Events, Leadership, Small Groups, Finance items)
5. THE System SHALL provide search functionality to find specific Archived_Items within the archive
6. WHEN displaying each Archived_Item, THE System SHALL show a Restore button
7. WHERE Admin permissions are granted, THE System SHALL show a Permanent_Delete button for each Archived_Item

### Requirement 4: Restore Functionality

**User Story:** As an administrator, I want to restore archived items, so that I can recover data that was archived by mistake or is needed again.

#### Acceptance Criteria

1. WHEN an Admin clicks a Restore button, THE System SHALL display a confirmation dialog
2. WHEN a restore operation is confirmed, THE System SHALL clear the deleted_at timestamp for the Archived_Item
3. WHEN an item is restored, THE System SHALL make it visible in all standard queries and interfaces
4. WHEN a restore operation completes successfully, THE System SHALL display a success message
5. WHEN a restore operation fails, THE System SHALL display an error message with the reason for failure
6. THE System SHALL restore all relationships and maintain data integrity when restoring records

### Requirement 5: Permanent Delete Functionality

**User Story:** As an administrator, I want the ability to permanently delete archived items when absolutely necessary, so that I can comply with data retention policies or remove truly unwanted data.

#### Acceptance Criteria

1. WHERE Admin permissions are granted, THE System SHALL provide Permanent_Delete functionality
2. WHEN an Admin clicks a Permanent_Delete button, THE System SHALL display a strong confirmation dialog warning about irreversibility
3. WHEN a permanent delete is confirmed, THE System SHALL require a second confirmation
4. WHEN a permanent delete operation is executed, THE System SHALL remove the record from the database permanently
5. WHEN a permanent delete operation completes, THE System SHALL display a confirmation message
6. THE System SHALL handle cascading deletes appropriately to maintain referential integrity

### Requirement 6: Permission Controls

**User Story:** As a system administrator, I want archive and restore operations to be controlled by user permissions, so that only authorized users can perform these sensitive operations.

#### Acceptance Criteria

1. WHEN a Staff or Admin user attempts to archive an item, THE System SHALL allow the operation
2. WHEN a non-Staff user attempts to archive an item, THE System SHALL deny the operation
3. WHEN an Admin attempts to restore an Archived_Item, THE System SHALL allow the operation
4. WHEN a non-Admin user attempts to restore an Archived_Item, THE System SHALL deny the operation
5. WHEN an Admin attempts a Permanent_Delete, THE System SHALL allow the operation
6. WHEN a non-Admin user attempts a Permanent_Delete, THE System SHALL deny the operation
7. WHEN a permission check fails, THE System SHALL display an appropriate error message

### Requirement 7: Activity Logging

**User Story:** As an administrator, I want all archive, restore, and permanent delete operations to be logged, so that I can audit data management activities and maintain accountability.

#### Acceptance Criteria

1. WHEN an item is archived, THE System SHALL create an activity log entry recording the action, user, timestamp, and item details
2. WHEN an item is restored, THE System SHALL create an activity log entry recording the action, user, timestamp, and item details
3. WHEN an item is permanently deleted, THE System SHALL create an activity log entry recording the action, user, timestamp, and item details
4. THE System SHALL include the item type and identifier in all archive-related log entries
5. WHEN viewing activity logs, THE System SHALL display archive-related activities with clear descriptions

### Requirement 8: API Endpoints

**User Story:** As a frontend developer, I want RESTful API endpoints for archive management, so that I can build the archive management interface.

#### Acceptance Criteria

1. THE System SHALL provide a GET /api/archives endpoint that returns all Archived_Items
2. THE System SHALL provide a GET /api/archives/{type} endpoint that returns Archived_Items filtered by type
3. THE System SHALL provide a POST /api/archives/{type}/{id}/restore endpoint that restores an Archived_Item
4. THE System SHALL provide a DELETE /api/archives/{type}/{id}/force endpoint that permanently deletes an Archived_Item
5. WHEN API endpoints are called without proper authentication, THE System SHALL return a 401 Unauthorized response
6. WHEN API endpoints are called without proper permissions, THE System SHALL return a 403 Forbidden response
7. WHEN API operations succeed, THE System SHALL return appropriate success responses with updated data
8. WHEN API operations fail, THE System SHALL return appropriate error responses with descriptive messages

### Requirement 9: Database Migration

**User Story:** As a system administrator, I want database migrations to add soft delete support to existing tables, so that the archive system can be deployed without data loss.

#### Acceptance Criteria

1. THE System SHALL provide database migrations that add deleted_at columns to all Archivable_Model tables
2. WHEN migrations are executed, THE System SHALL preserve all existing data
3. WHEN migrations are executed, THE System SHALL set deleted_at to null for all existing records
4. THE System SHALL create appropriate database indexes on deleted_at columns for query performance
5. THE System SHALL provide rollback migrations to remove soft delete functionality if needed

### Requirement 10: Backward Compatibility

**User Story:** As a system administrator, I want the archive system to maintain backward compatibility with existing code, so that the deployment is smooth and doesn't break existing functionality.

#### Acceptance Criteria

1. WHEN existing queries are executed, THE System SHALL automatically exclude Archived_Items
2. WHEN code explicitly requests archived items, THE System SHALL provide methods to include them in queries
3. THE System SHALL maintain all existing API contracts while adding new archive-related endpoints
4. WHEN existing delete operations are called, THE System SHALL perform archive operations instead
5. THE System SHALL maintain all existing model relationships and behaviors
