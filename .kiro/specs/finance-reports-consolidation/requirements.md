# Requirements Document

## Introduction

This feature addresses navigation redundancy in the finance section by consolidating all report functionality into a single, unified Reports section. Currently, there is a "Reports" tab within the Finance navigation panel (Finance.tsx) that duplicates financial reports already available in the main Reports page (Reports.tsx). This creates confusion for users and violates the DRY (Don't Repeat Yourself) principle.

Additionally, this feature ensures that PDF downloads work reliably with clear user feedback about download location and status.

## Glossary

- **Finance_Section**: The Finance page component (Finance.tsx) that contains tabs for Overview, Offerings, Expenses, Budgets, Reports, and Settings
- **Finance_Reports_Tab**: The "Reports" tab within the Finance section that displays financial reports (Finance/Reports.tsx)
- **Main_Reports_Page**: The standalone Reports page (Reports.tsx) that displays all report categories including Financial, Membership, and Ministry reports
- **Report_Controller**: The backend PHP controller (ReportController.php) that handles report generation and PDF downloads
- **PDF_Download**: The process of generating a report file and triggering a browser download to the user's local machine
- **Navigation_Consolidation**: The process of removing duplicate navigation entries and unifying access to reports through a single location
- **Download_Feedback**: User interface elements that inform users about download status, location, and any errors

## Requirements

### Requirement 1: Remove Redundant Finance Reports Tab

**User Story:** As a church administrator, I want a single location to access all reports, so that I don't have to search in multiple places for the same functionality.

#### Acceptance Criteria

1. THE Finance_Section SHALL NOT display a "Reports" tab in its navigation
2. THE Finance_Section SHALL remove the Reports component from its lazy-loaded imports
3. THE Finance_Section SHALL remove the 'reports' tab definition from its tabs array
4. THE Finance_Section SHALL update the TabType type definition to exclude 'reports'
5. WHEN a user navigates to the Finance section, THE Finance_Section SHALL display only Overview, Offerings, Expenses, Budgets, and Settings tabs

### Requirement 2: Consolidate Financial Reports in Main Reports Page

**User Story:** As a church administrator, I want all financial reports accessible from the main Reports page, so that I have a unified reporting experience.

#### Acceptance Criteria

1. THE Main_Reports_Page SHALL display all financial reports in the "Financial Reports" category
2. THE Main_Reports_Page SHALL include Income Statement, Balance Sheet, Budget Variance, Fund Balance, Offering Summary, and Expense Report
3. WHEN a user clicks on any financial report card, THE Main_Reports_Page SHALL open the report generation modal
4. THE Main_Reports_Page SHALL maintain the existing report generation functionality without regression

### Requirement 3: Ensure PDF Download Functionality

**User Story:** As a church administrator, I want PDF reports to download reliably to my computer, so that I can save and share financial information.

#### Acceptance Criteria

1. WHEN a user generates a PDF report, THE Report_Controller SHALL return a valid PDF file with Content-Type "application/pdf"
2. WHEN a PDF response is received, THE Main_Reports_Page SHALL create a blob URL and trigger a browser download
3. THE PDF_Download SHALL include a filename with the format "{report_type}_{start_date}_to_{end_date}.pdf"
4. WHEN the download completes, THE Main_Reports_Page SHALL revoke the blob URL to free memory
5. IF the PDF generation fails, THEN THE Report_Controller SHALL return an HTTP error status with a descriptive message

### Requirement 4: Provide Clear Download Feedback

**User Story:** As a church administrator, I want to know where my downloaded reports are saved and if the download was successful, so that I can easily locate and use the files.

#### Acceptance Criteria

1. WHEN a PDF download is triggered, THE Main_Reports_Page SHALL display a loading indicator during generation
2. WHEN a PDF download fails, THE Main_Reports_Page SHALL display an error message with the specific failure reason
3. THE Download_Feedback SHALL inform users that files are saved to their browser's default download location
4. WHEN a download succeeds, THE Main_Reports_Page SHALL allow the browser's native download notification to inform the user
5. IF the server returns an empty PDF file, THEN THE Main_Reports_Page SHALL display an error message "Received empty report file. Please try again."

### Requirement 5: Validate PDF Response Integrity

**User Story:** As a church administrator, I want the system to validate downloaded files, so that I don't receive corrupted or invalid reports.

#### Acceptance Criteria

1. WHEN a report response is received, THE Main_Reports_Page SHALL validate the Content-Type header matches "application/pdf"
2. WHEN a report blob is created, THE Main_Reports_Page SHALL validate the blob size is greater than zero
3. IF the Content-Type is invalid, THEN THE Main_Reports_Page SHALL throw an error with message "Invalid response type. Expected PDF but received {actual_type}."
4. IF the blob size is zero, THEN THE Main_Reports_Page SHALL throw an error with message "Received empty report file. Please try again."
5. THE Main_Reports_Page SHALL validate the blob type property matches "application/pdf" when available

### Requirement 6: Handle Download Errors Gracefully

**User Story:** As a church administrator, I want clear error messages when downloads fail, so that I can understand what went wrong and how to fix it.

#### Acceptance Criteria

1. IF the server returns a 500 error, THEN THE Main_Reports_Page SHALL display "Server error. Please try again later."
2. IF the server returns a 404 error, THEN THE Main_Reports_Page SHALL display "Report not found. Please check your date range."
3. IF the server returns a 401 or 403 error, THEN THE Main_Reports_Page SHALL display "Authentication error. Please log in again."
4. IF a network error occurs, THEN THE Main_Reports_Page SHALL display "Network error. Please check your connection and try again."
5. WHEN any error occurs, THE Main_Reports_Page SHALL log the error details to the console for debugging

### Requirement 7: Maintain Backward Compatibility

**User Story:** As a system maintainer, I want existing report generation functionality to continue working, so that users experience no disruption during the transition.

#### Acceptance Criteria

1. THE Report_Controller SHALL continue to support all existing report types: financial-summary, income-statement, expense-report, budget-variance, donor-giving, and fund-balance
2. THE Report_Controller SHALL continue to accept start_date and end_date query parameters
3. THE Report_Controller SHALL continue to return PDF responses with proper headers
4. THE Main_Reports_Page SHALL use the same API endpoints as Finance_Reports_Tab
5. WHEN the Finance_Reports_Tab is removed, THE Report_Controller SHALL continue to function without modification

### Requirement 8: Update Navigation References

**User Story:** As a developer, I want all code references to the Finance Reports tab removed, so that the codebase remains clean and maintainable.

#### Acceptance Criteria

1. THE Finance_Section SHALL remove the Finance/Reports.tsx import statement
2. THE Finance_Section SHALL remove the 'reports' case from the activeTab conditional rendering
3. THE Finance_Section SHALL remove the 'reports' entry from the tabs array
4. THE Finance_Section SHALL update TypeScript type definitions to exclude 'reports' from TabType
5. WHEN the Finance/Reports.tsx file is no longer referenced, THE system SHALL allow the file to be deleted or archived

### Requirement 9: Preserve Test Coverage

**User Story:** As a quality assurance engineer, I want existing tests to be updated or removed appropriately, so that the test suite remains accurate and valuable.

#### Acceptance Criteria

1. WHEN Finance/Reports.tsx is removed, THE test file Finance/__tests__/Reports.preservation.property.test.tsx SHALL be updated or removed
2. WHEN Finance/Reports.tsx is removed, THE test file Finance/__tests__/Reports.bugfix.property.test.tsx SHALL be updated or removed
3. THE Main_Reports_Page tests SHALL continue to pass without modification
4. THE Report_Controller tests SHALL continue to pass without modification
5. IF property-based tests exist for Finance Reports, THEN they SHALL be migrated to test the Main_Reports_Page instead

### Requirement 10: Document Download Location for Users

**User Story:** As a church administrator, I want to know where my downloaded reports are saved, so that I can easily find them after download.

#### Acceptance Criteria

1. THE Main_Reports_Page SHALL include a help tooltip or information icon near the download buttons
2. WHEN a user hovers over or clicks the information icon, THE Main_Reports_Page SHALL display "Reports are downloaded to your browser's default download folder"
3. THE Download_Feedback SHALL include the default download location in the user interface (typically shown in browser settings)
4. THE Main_Reports_Page SHALL provide a link or instruction on how to change the browser's download location
5. THE system documentation SHALL include information about where downloaded reports are saved
