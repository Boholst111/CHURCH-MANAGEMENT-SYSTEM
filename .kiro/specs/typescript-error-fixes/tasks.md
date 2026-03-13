# TypeScript Error Fixes - Tasks

## Task 1: Setup Type Declarations
- [x] 1.1 Create setupTests.ts with jest-dom import
- [x] 1.2 Create jest-axe.d.ts type declaration
- [x] 1.3 Update tsconfig.json to include type declarations
- [x] 1.4 Verify jest.config.js has setupFilesAfterEnv

## Task 2: Update Core Type Definitions
- [x] 2.1 Update BetaFeedback type (add priorityScore)
- [x] 2.2 Update MemberFormData type (add membership_type)
- [x] 2.3 Update User type (add created_at, updated_at)
- [x] 2.4 Update Member type (fix birth_date type)
- [x] 2.5 Update API response types (add message, errors)

## Task 3: Fix API Module Exports
- [x] 3.1 Export setSessionTimeoutHandler function
- [x] 3.2 Fix FormData.append type issues in useMembers.ts
- [x] 3.3 Fix FormData.append type issues in useEvents.ts
- [x] 3.4 Add type guards for API error responses

## Task 4: Fix Component Prop Interfaces
- [x] 4.1 Update Header userMenu type (make label optional for dividers)
- [x] 4.2 Standardize Modal prop (isOpen vs open)
- [x] 4.3 Add missing Button variant types
- [x] 4.4 Update Table component props
- [x] 4.5 Update Pagination component props
- [x] 4.6 Update Sidebar component props
- [x] 4.7 Update Icon component props

## Task 5: Fix Test File Type Issues
- [x] 5.1 Fix Toast mock in accessibility.aria.test.tsx
- [x] 5.2 Fix form handler mocks in form-validation.property.test.tsx
- [x] 5.3 Fix Header userMenu in header.test.tsx (8 instances)
- [x] 5.4 Fix Modal props in ui-components.test.tsx
- [x] 5.5 Fix Button variant in ui-components.test.tsx
- [x] 5.6 Fix component props in design-system-verification.test.tsx
- [x] 5.7 Fix UserPermissionsModal test mock
- [x] 5.8 Fix Member API test mocks (memberApi.test.ts)
- [x] 5.9 Fix axios mock adapter type issue

## Task 6: Fix Page Component Type Issues
- [x] 6.1 Fix query parameter handling in Events.tsx
- [x] 6.2 Fix query parameter handling in Members.tsx
- [x] 6.3 Fix query parameter handling in Users.tsx
- [x] 6.4 Fix Button variant in ActivityLog.tsx
- [x] 6.5 Fix Button variant in ArchiveManagement.tsx
- [x] 6.6 Fix UserForm role comparisons

## Task 7: Fix Script Type Issues
- [x] 7.1 Fix priorityScore usage in start-iteration.ts
- [x] 7.2 Fix priorityScore usage in track-iteration.ts
- [x] 7.3 Fix priorityScore usage in complete-iteration.ts

## Task 8: Fix Miscellaneous Type Issues
- [x] 8.1 Fix DatePicker range.start null check
- [x] 8.2 Fix AuthContext setSessionTimeoutHandler import
- [x] 8.3 Fix api.session.property.test.ts import

## Task 9: Verification
- [x] 9.1 Run npm run dev and verify zero errors
- [x] 9.2 Run npm test and verify tests pass
- [x] 9.3 Update SYSTEM_VERIFICATION_REPORT.md
- [x] 9.4 Create TYPESCRIPT_FIXES_SUMMARY.md

## Estimated Time
- Task 1: 5 minutes (DONE)
- Task 2: 10 minutes
- Task 3: 10 minutes
- Task 4: 15 minutes
- Task 5: 20 minutes
- Task 6: 15 minutes
- Task 7: 5 minutes
- Task 8: 5 minutes
- Task 9: 5 minutes
**Total: ~90 minutes**

## Notes
- Commit after each major task
- Test incrementally
- Document any breaking changes
