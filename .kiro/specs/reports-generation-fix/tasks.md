# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Fault Condition** - File Download Failure with False Success Message Across All Report Types
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists across all 15 report types
  - **Scoped PBT Approach**: Scope the property to concrete failing cases - all 15 report types across three categories (Financial, Membership, Ministry) with "Generate" and "View Last" actions
  - Test that clicking "Generate" or "View Last" on any of the 15 report types results in a file (PDF/Excel/CSV) being downloaded to the user's computer before showing success message
  - **Financial Reports (6)**: Income Statement, Balance Sheet, Budget Variance, Fund Balance, Offering Summary, Expense Report
  - **Membership Reports (5)**: Member Directory, Membership Growth, Demographics, Attendance, New Members
  - **Ministry Reports (4)**: Small Groups, Event Attendance, Leadership, Ministry Participation
  - The test assertions should verify: (1) File blob is valid and non-empty, (2) download is triggered via browser mechanism, (3) success message only appears after download confirmation, (4) correct file format (PDF/Excel/CSV) based on user selection
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found: which report types and categories show success messages without actual downloads, what errors appear in console, whether blob validation or download triggering fails, which formats fail
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Backend and Non-Report Functionality Across All Categories
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs: modal interactions, report card rendering across all three categories (Financial, Membership, Ministry), category navigation, other Finance pages, backend API responses
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements
  - Test that modal opening/closing, form input changes (date range, format selection for PDF/Excel/CSV, include charts), report card display for all 15 report types, category navigation between Financial/Membership/Ministry sections, navigation to/from Reports page, and other Finance pages (Budgets, Expenses, Offerings, Settings) all work exactly as before
  - Test that backend file generation logic (PDF/Excel/CSV), API routes for all report types, and response formats remain unchanged
  - Test that all three report categories render correctly with their respective report cards and category headers
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ] 3. Fix for file download failure with false success messages across all report types

  - [x] 3.1 Implement the fix in main Reports.tsx (not Finance/Reports.tsx)
    - **IMPORTANT**: Fix must be implemented in the main Reports page (`resources/js/pages/Reports.tsx`), NOT in Finance/Reports.tsx
    - Implement API integration: Replace simulated timeout with actual API calls to `/api/reports/{reportType}` for all 15 report types
    - Add report type mapping: Convert frontend report IDs from snake_case to kebab-case for backend compatibility (e.g., 'income_statement' → 'income-statement')
    - Add blob validation before creating download URL (check Content-Type matches format, blob size > 0)
    - Add download verification to ensure download is triggered before showing success message
    - Add format-specific handling: Support PDF (application/pdf, .pdf), Excel (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx), and CSV (text/csv, .csv) formats
    - Improve error handling to distinguish between network errors, invalid responses, backend errors, and 404 errors for missing report types
    - Extract download logic into reusable helper function `downloadFileReport` to avoid duplication between `handleSubmitGenerate` and `handleViewLast`
    - Add response type checking to ensure fetch properly handles binary responses for all formats
    - Implement View Last functionality: Replace alert with actual download logic using the same blob handling
    - Handle all 15 report types uniformly across three categories (Financial, Membership, Ministry)
    - **Backend Support**: Add backend routes and handlers for the 9 new report types (Membership and Ministry categories) in ReportController
    - Add format parameter support in backend to handle PDF/Excel/CSV generation
    - Set correct Content-Type and Content-Disposition headers for each format in backend responses
    - _Bug_Condition: isBugCondition(input) where input.action IN ['generate', 'view_last'] AND input.reportType IN ['income_statement', 'balance_sheet', 'budget_variance', 'fund_balance', 'offering_summary', 'expense_report', 'member_directory', 'membership_growth', 'demographics', 'attendance', 'new_members', 'small_groups', 'event_attendance', 'leadership', 'ministry_participation'] AND input.format IN ['pdf', 'excel', 'csv'] AND apiResponseContainsFileBlob(input) AND NOT fileDownloadTriggered(input)_
    - _Expected_Behavior: fileDownloaded(result) AND successMessageShownAfterDownload(result) AND noSuccessMessageIfDownloadFails(result) AND correctFileFormat(result, input.format) from design_
    - _Preservation: Backend file generation using ReportService, API routes, modal interactions for all report types, category navigation, other Finance pages, error handling for invalid dates/missing data from design_
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

  - [x] 3.2 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - File Download Completion Before Success Message for All Report Types
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior for all 15 report types across three categories
    - When this test passes, it confirms the expected behavior is satisfied for all report types and formats
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed for all 15 report types)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [x] 3.3 Verify preservation tests still pass
    - **Property 2: Preservation** - Backend and Non-Report Functionality Across All Categories
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions in modal interactions, category navigation, backend logic, or other pages)
    - Confirm all tests still pass after fix (no regressions across all three report categories)

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
