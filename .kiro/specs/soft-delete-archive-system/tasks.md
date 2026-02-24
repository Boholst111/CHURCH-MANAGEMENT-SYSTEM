# Implementation Plan: Soft Delete/Archive System

## Overview

This implementation plan converts the soft delete/archive system design into actionable coding tasks. The approach follows a layered implementation strategy: database migrations first, then models, then services, then API endpoints, and finally frontend components. Each task builds incrementally on previous work, with testing integrated throughout to catch errors early.

## Tasks

- [x] 1. Create database migrations for soft delete support
  - Create migration files to add deleted_at columns to all archivable model tables
  - Add indexes on deleted_at columns for query performance
  - Include rollback functionality to remove columns if needed
  - Tables: members, events, leadership, small_groups, offerings, budgets, pledges, funds, vendors, expense_categories, offering_types
  - Note: expenses table already has deleted_at column
  - _Requirements: 1.1, 9.1, 9.4, 9.5_

- [x] 1.1 Write unit tests for migration data preservation
  - Test that running migrations preserves all existing data
  - Test that deleted_at is set to null for existing records
  - _Requirements: 9.2, 9.3_

- [x] 2. Update Eloquent models with SoftDeletes trait
  - [x] 2.1 Add SoftDeletes trait to all archivable models
    - Import Illuminate\Database\Eloquent\SoftDeletes
    - Add trait to model classes: Member, Event, Leadership, SmallGroup, Offering, Budget, Pledge, Fund, Vendor, ExpenseCategory, OfferingType
    - Note: Expense model already uses SoftDeletes
    - _Requirements: 1.1, 1.2_

  - [x] 2.2 Write property test for soft delete timestamp setting
    - **Property 1: Soft delete sets timestamp**
    - **Validates: Requirements 1.2, 10.4**

  - [x] 2.3 Write property test for default query exclusion
    - **Property 2: Default queries exclude archived items**
    - **Validates: Requirements 1.3, 10.1**

  - [x] 2.4 Write property test for relationship preservation
    - **Property 3: Relationships preserved through archive and restore**
    - **Validates: Requirements 1.4, 4.6, 10.5**

  - [x] 2.5 Write property test for explicit trashed queries
    - **Property 6: Explicit trashed queries include archived items**
    - **Validates: Requirements 10.2**

- [x] 3. Implement ArchiveService
  - [x] 3.1 Create ArchiveService class with core methods
    - Implement listAllArchived() to retrieve all archived items grouped by type
    - Implement listArchivedByType() to retrieve archived items for specific model type
    - Implement restore() to restore archived items
    - Implement forceDelete() to permanently delete archived items
    - Implement getModelClass() for type-to-model mapping
    - Implement logActivity() for activity logging integration
    - _Requirements: 4.1, 4.2, 5.4, 7.1, 7.2, 7.3_

  - [x] 3.2 Write unit tests for ArchiveService methods
    - Test listAllArchived with various model types
    - Test listArchivedByType with valid and invalid types
    - Test restore with valid and invalid items
    - Test forceDelete with valid and invalid items
    - Test error handling for invalid model types
    - _Requirements: 4.2, 5.4_

  - [x] 3.3 Write property test for restore behavior
    - **Property 4: Restore clears deleted_at timestamp**
    - **Validates: Requirements 4.2, 4.3**

  - [x] 3.4 Write property test for force delete behavior
    - **Property 5: Force delete removes record permanently**
    - **Validates: Requirements 5.4**

  - [x] 3.5 Write property test for activity logging
    - **Property 11: Archive operations create activity logs**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**

- [x] 4. Checkpoint - Ensure backend core functionality works
  - Run migrations and verify database schema
  - Test model soft delete behavior manually
  - Test ArchiveService methods manually
  - Ensure all tests pass, ask the user if questions arise

- [x] 5. Create API endpoints for archive management
  - [x] 5.1 Create ArchiveController with CRUD endpoints
    - Implement index() for GET /api/archives
    - Implement indexByType() for GET /api/archives/{type}
    - Implement restore() for POST /api/archives/{type}/{id}/restore
    - Implement forceDelete() for DELETE /api/archives/{type}/{id}/force
    - Add permission middleware (admin role required)
    - Add authentication middleware (sanctum)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 6.3, 6.4, 6.5, 6.6_

  - [x] 5.2 Add API routes to routes/api.php
    - Register archive routes with proper middleware
    - Apply admin role requirement for all archive endpoints
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 5.3 Write property test for archive listing by type
    - **Property 13: Archive listing by type**
    - **Validates: Requirements 8.2**

  - [x] 5.4 Write property test for restore endpoint
    - **Property 14: Restore endpoint behavior**
    - **Validates: Requirements 8.3**

  - [x] 5.5 Write property test for force delete endpoint
    - **Property 15: Force delete endpoint behavior**
    - **Validates: Requirements 8.4**

  - [x] 5.6 Write property test for API authentication
    - **Property 10: API authentication requirement**
    - **Validates: Requirements 8.5, 8.6**

  - [x] 5.7 Write property test for permission enforcement
    - **Property 7: Archive permission enforcement**
    - **Property 8: Restore permission enforcement**
    - **Property 9: Permanent delete permission enforcement**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6**

  - [x] 5.8 Write property test for API response formats
    - **Property 16: API success response format**
    - **Property 17: API error response format**
    - **Validates: Requirements 8.7, 8.8**

- [x] 6. Update existing controllers to use soft delete
  - [x] 6.1 Review and update delete methods in existing controllers
    - Verify that delete operations use model->delete() (soft delete)
    - Ensure no controllers use forceDelete() unintentionally
    - Update MemberController, EventController, LeadershipController, SmallGroupController
    - Update OfferingController, ExpenseController, BudgetController, PledgeController
    - Update FundController, VendorController, ExpenseCategoryController, OfferingTypeController
    - _Requirements: 10.4_

  - [x] 6.2 Write integration tests for existing delete operations
    - Test that existing delete endpoints perform soft delete
    - Test that deleted items are excluded from list endpoints
    - _Requirements: 10.3, 10.4_

- [x] 7. Checkpoint - Ensure backend API is complete
  - Test all archive API endpoints with Postman or similar
  - Verify permission checks work correctly
  - Verify activity logging works for all operations
  - Ensure all tests pass, ask the user if questions arise

- [x] 8. Create frontend Archive button component
  - [x] 8.1 Create ArchiveButton React component
    - Replace trash icon with archive icon (lucide-react Archive icon)
    - Update button text from "Delete" to "Archive"
    - Implement confirmation dialog with "Archive" terminology
    - Call appropriate delete API endpoint on confirmation
    - Display success/error toast messages
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

  - [x] 8.2 Write property test for archive terminology
    - **Property 18: Archive terminology consistency**
    - **Validates: Requirements 2.1, 2.4**

  - [x] 8.3 Write property test for archive icon usage
    - **Property 19: Archive icon usage**
    - **Validates: Requirements 2.2**

  - [x] 8.4 Write property test for confirmation dialog
    - **Property 20: Archive confirmation dialog**
    - **Validates: Requirements 2.3**

  - [x] 8.5 Write property test for operation feedback
    - **Property 21: Operation feedback messages**
    - **Validates: Requirements 2.5, 4.4, 4.5, 5.5, 6.7**

- [x] 9. Update existing UI components to use ArchiveButton
  - [x] 9.1 Replace delete buttons across all feature modules
    - Update Members list/detail pages
    - Update Events list/detail pages
    - Update Leadership list/detail pages
    - Update Small Groups list/detail pages
    - Update Finance module pages (Offerings, Expenses, Budgets, Pledges, Funds, Vendors, Categories)
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 9.2 Write integration tests for UI updates
    - Test that delete buttons are replaced with archive buttons
    - Test that archive operations work from UI
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 10. Create Archive Management page
  - [x] 10.1 Create ArchiveManagementPage React component
    - Fetch archived items from GET /api/archives
    - Display items grouped by type (Members, Events, Leadership, etc.)
    - Show item name, archive date, and archived by user
    - Implement filter controls for item type
    - Implement search functionality
    - Display Restore button for each item
    - Display Permanent Delete button for admins only
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 10.2 Add Archive Management link to Settings navigation
    - Add navigation item in Settings section
    - Restrict visibility to admin users
    - _Requirements: 3.1_

  - [x] 10.3 Write property test for archived items display
    - **Property 24: Archived items display required information**
    - **Validates: Requirements 3.3**

  - [x] 10.4 Write property test for restore button visibility
    - **Property 22: Restore button visibility**
    - **Validates: Requirements 3.6**

  - [x] 10.5 Write property test for permanent delete button visibility
    - **Property 23: Permanent delete button conditional visibility**
    - **Validates: Requirements 3.7, 5.1**

  - [x] 10.6 Write property test for archive filtering
    - **Property 25: Archive filtering by type**
    - **Validates: Requirements 3.4**

  - [x] 10.7 Write property test for archive search
    - **Property 26: Archive search functionality**
    - **Validates: Requirements 3.5**

- [x] 11. Implement restore functionality in Archive Management page
  - [x] 11.1 Add restore confirmation dialog and API integration
    - Implement confirmation dialog for restore operations
    - Call POST /api/archives/{type}/{id}/restore on confirmation
    - Display success/error messages
    - Refresh archive list after successful restore
    - _Requirements: 4.1, 4.4, 4.5_

  - [x] 11.2 Write integration tests for restore functionality
    - Test restore confirmation dialog
    - Test restore API integration
    - Test archive list refresh after restore
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 12. Implement permanent delete functionality in Archive Management page
  - [x] 12.1 Add permanent delete double confirmation and API integration
    - Implement first confirmation dialog with strong warning
    - Implement second confirmation dialog
    - Call DELETE /api/archives/{type}/{id}/force on double confirmation
    - Display success/error messages
    - Refresh archive list after successful delete
    - Handle constraint violation errors gracefully
    - _Requirements: 5.2, 5.3, 5.5_

  - [x] 12.2 Write property test for double confirmation
    - **Property 27: Permanent delete double confirmation**
    - **Validates: Requirements 5.2, 5.3**

  - [x] 12.3 Write integration tests for permanent delete functionality
    - Test double confirmation flow
    - Test permanent delete API integration
    - Test error handling for constraint violations
    - _Requirements: 5.2, 5.3, 5.4, 5.5_

- [x] 13. Implement cascading archive behavior
  - [x] 13.1 Define and implement cascading rules for related records
    - Determine cascading strategy for each model (cascade vs prevent)
    - Implement cascading logic in model event listeners or service layer
    - Add appropriate error messages for prevented operations
    - _Requirements: 1.5, 5.6_

  - [x] 13.2 Write property test for cascading archive
    - **Property 29: Cascading archive handling**
    - **Validates: Requirements 1.5**

  - [x] 13.3 Write property test for cascading delete
    - **Property 30: Cascading delete handling**
    - **Validates: Requirements 5.6**

- [x] 14. Final checkpoint - End-to-end testing
  - Test complete archive workflow: archive → view in archive management → restore
  - Test complete permanent delete workflow with double confirmation
  - Test permission enforcement across all operations
  - Test activity logging for all operations
  - Test UI updates across all modules
  - Verify backward compatibility with existing functionality
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all archivable models
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end workflows
- The Expense model already has SoftDeletes, so it serves as a reference implementation
