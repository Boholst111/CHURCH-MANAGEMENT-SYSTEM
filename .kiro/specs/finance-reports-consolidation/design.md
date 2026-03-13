# Design Document: Finance Reports Consolidation

## Overview

This feature eliminates navigation redundancy by consolidating all financial report functionality into the main Reports page. Currently, the Finance section contains a redundant "Reports" tab that duplicates financial reports already available in the main Reports page, creating confusion and violating DRY principles.

The design focuses on three key objectives:

1. **Navigation Simplification**: Remove the Finance Reports tab and ensure all reports are accessible from a single location
2. **Reliable PDF Downloads**: Implement robust PDF download functionality with proper validation and error handling
3. **Clear User Feedback**: Provide transparent feedback about download status, location, and any errors

### Key Design Decisions

- **Single Source of Truth**: The main Reports page (Reports.tsx) becomes the sole location for all report generation
- **Backward Compatibility**: The backend ReportController.php requires no changes, ensuring existing functionality continues to work
- **Progressive Enhancement**: The download functionality includes comprehensive validation at multiple stages (response headers, blob size, content type)
- **User-Centric Feedback**: Error messages are specific and actionable, helping users understand and resolve issues

## Architecture

### Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      Finance.tsx                             │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ Overview │Offerings │ Expenses │ Budgets  │ Settings │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
│                   (Reports tab removed)                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Reports.tsx                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Financial Reports Category                   │   │
│  │  ┌──────────┬──────────┬──────────┬──────────┐     │   │
│  │  │  Income  │ Balance  │  Budget  │   Fund   │     │   │
│  │  │Statement │  Sheet   │ Variance │ Balance  │     │   │
│  │  └──────────┴──────────┴──────────┴──────────┘     │   │
│  │  ┌──────────┬──────────┐                           │   │
│  │  │Offering  │ Expense  │                           │   │
│  │  │ Summary  │  Report  │                           │   │
│  │  └──────────┴──────────┘                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Membership Reports Category                  │   │
│  │         (existing reports)                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Ministry Reports Category                    │   │
│  │         (existing reports)                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              ReportController.php (Backend)                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  generateReport(reportType, startDate, endDate)     │   │
│  │    ├─ financial-summary                             │   │
│  │    ├─ income-statement                              │   │
│  │    ├─ expense-report                                │   │
│  │    ├─ budget-variance                               │   │
│  │    ├─ donor-giving                                  │   │
│  │    └─ fund-balance                                  │   │
│  │                                                      │   │
│  │  Returns: PDF Response with proper headers          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

#### PDF Download Flow

```
User clicks "Generate" → Modal opens → User selects date range
                                              ↓
                                    User clicks "Generate Report"
                                              ↓
                          Frontend validates inputs (dates, format)
                                              ↓
                    API Request: GET /api/reports/{type}?start_date=X&end_date=Y
                                              ↓
                              Backend generates PDF via ReportService
                                              ↓
                        Response: PDF blob with Content-Type header
                                              ↓
                          Frontend validates response (status, headers)
                                              ↓
                            Frontend validates blob (size, type)
                                              ↓
                          Create blob URL and trigger download
                                              ↓
                            Browser saves to default location
                                              ↓
                              Cleanup: revoke blob URL
```

### Layer Responsibilities

**Frontend (Reports.tsx)**:
- Display all report categories including Financial Reports
- Handle user interactions (generate, view last, schedule)
- Validate user inputs before API calls
- Make API requests with proper headers
- Validate API responses (status codes, content types)
- Validate blob data (size, type)
- Trigger browser downloads
- Display loading states and error messages
- Clean up resources (revoke blob URLs)

**Backend (ReportController.php)**:
- Receive report generation requests
- Validate request parameters
- Delegate to ReportService for PDF generation
- Return PDF response with proper headers (Content-Type: application/pdf)
- Handle errors and return appropriate HTTP status codes
- Log generation activities

**Frontend (Finance.tsx)**:
- Remove Reports tab from navigation
- Remove Reports component import
- Update TypeScript types to exclude 'reports'

## Components and Interfaces

### Frontend Components

#### Reports.tsx (Main Reports Page)

**Existing Structure** (to be enhanced):
```typescript
interface Report {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  lastGenerated?: string;
}

interface ReportCategory {
  title: string;
  icon: React.ReactNode;
  reports: Report[];
}

interface ReportConfig {
  dateRange: string;
  startDate: string;
  endDate: string;
  format: string;
  includeCharts: boolean;
}
```

**Key Functions**:
- `handleGenerateReport(report: Report)`: Opens modal for report configuration
- `handleViewLast(report: Report)`: Downloads report with default date range
- `handleSubmitGenerate(e: FormEvent)`: Processes form submission and triggers download
- `downloadFileReport(...)`: Core download function with validation (already exists)

**Enhancement Required**:
The existing `downloadFileReport` function already implements most validation requirements. We need to ensure it's used consistently for all financial reports and that error messages match the requirements specification.

#### Finance.tsx (Finance Section)

**Current Structure**:
```typescript
type TabType = 'overview' | 'offerings' | 'expenses' | 'budgets' | 'reports' | 'settings';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'overview', ... },
  { id: 'offerings', ... },
  { id: 'expenses', ... },
  { id: 'budgets', ... },
  { id: 'reports', ... },  // TO BE REMOVED
  { id: 'settings', ... },
];
```

**Changes Required**:
1. Remove 'reports' from TabType union
2. Remove reports entry from tabs array
3. Remove Reports component import
4. Remove reports case from conditional rendering

**Updated Structure**:
```typescript
type TabType = 'overview' | 'offerings' | 'expenses' | 'budgets' | 'settings';

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard /> },
  { id: 'offerings', label: 'Offerings', icon: <Coins /> },
  { id: 'expenses', label: 'Expenses', icon: <Receipt /> },
  { id: 'budgets', label: 'Budgets', icon: <PieChart /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];
```

### Backend API

#### ReportController.php

**Existing Endpoint** (no changes required):
```php
GET /api/reports/{reportType}?start_date={date}&end_date={date}

Parameters:
  - reportType: string (financial-summary, income-statement, expense-report, 
                        budget-variance, donor-giving, fund-balance)
  - start_date: date (YYYY-MM-DD format)
  - end_date: date (YYYY-MM-DD format)

Response:
  - Success: PDF file with Content-Type: application/pdf
  - Error 404: Report type not found
  - Error 500: Server error during generation
```

**Supported Report Types**:
- `financial-summary` → Balance Sheet
- `income-statement` → Income Statement
- `expense-report` → Expense Report
- `budget-variance` → Budget Variance Report
- `donor-giving` → Offering Summary
- `fund-balance` → Fund Balance Report

## Data Models

### Report Configuration

```typescript
interface ReportConfig {
  dateRange: 'this_month' | 'last_month' | 'this_quarter' | 
             'last_quarter' | 'this_year' | 'last_year' | 'custom';
  startDate: string;  // YYYY-MM-DD format
  endDate: string;    // YYYY-MM-DD format
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
}
```

### Report Metadata

```typescript
interface Report {
  id: string;           // Frontend identifier (snake_case)
  title: string;        // Display name
  description: string;  // User-facing description
  icon: React.ReactNode;
  lastGenerated?: string; // ISO date string
}
```

### Report Type Mapping

The frontend uses snake_case IDs while the backend expects kebab-case:

```typescript
const reportTypeMap: Record<string, string> = {
  'income_statement': 'income-statement',
  'balance_sheet': 'financial-summary',
  'budget_variance': 'budget-variance',
  'fund_balance': 'fund-balance',
  'offering_summary': 'donor-giving',
  'expense_report': 'expense-report'
};
```

### Download Response Validation

```typescript
interface DownloadValidation {
  // HTTP Response validation
  statusCode: number;           // Must be 200-299
  contentType: string | null;   // Must include 'application/pdf'
  
  // Blob validation
  blobSize: number;             // Must be > 0
  blobType: string;             // Should be 'application/pdf'
  
  // Error handling
  errorMessage?: string;        // Specific error for user
}
```

### Error Response Structure

```typescript
interface ErrorResponse {
  status: number;
  message: string;
  userMessage: string;  // User-friendly error message
}

// Error mapping
const errorMessages: Record<number, string> = {
  401: 'Authentication error. Please log in again.',
  403: 'Authentication error. Please log in again.',
  404: 'Report not found. Please check your date range.',
  500: 'Server error. Please try again later.',
};
```

### File Naming Convention

```typescript
interface DownloadFilename {
  reportTitle: string;    // e.g., "Income Statement"
  startDate: string;      // YYYY-MM-DD
  endDate: string;        // YYYY-MM-DD
  extension: string;      // .pdf, .xlsx, .csv
  
  // Format: "{Report_Title}_{start_date}_to_{end_date}.{ext}"
  // Example: "Income_Statement_2024-01-01_to_2024-01-31.pdf"
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Download Response Validation

*For any* PDF download response received from the backend, the frontend SHALL validate that:
- The HTTP status code is in the 200-299 range
- The Content-Type header includes "application/pdf"
- The response blob size is greater than zero
- The blob type property (when available) matches "application/pdf"

If any validation fails, the system SHALL throw an error with a specific message indicating which validation failed.

**Validates: Requirements 5.1, 5.2, 5.3, 5.5**

### Property 2: Error Logging Completeness

*For any* error that occurs during report generation or download (including network errors, validation errors, or server errors), the system SHALL log the error details to the console for debugging purposes.

**Validates: Requirements 6.5**

### Property 3: Backend Response Headers

*For any* successful report generation request to the backend, the ReportController SHALL return a response with Content-Type header set to "application/pdf" and appropriate Content-Disposition headers for file download.

**Validates: Requirements 7.3**

### Property 4: Blob URL Cleanup

*For any* PDF download that creates a blob URL (whether successful or failed), the system SHALL revoke the blob URL using `URL.revokeObjectURL()` to prevent memory leaks.

**Validates: Requirements 3.4**

### Property 5: Report Type Mapping Consistency

*For any* financial report ID used in the frontend (income_statement, balance_sheet, budget_variance, fund_balance, offering_summary, expense_report), there SHALL exist a corresponding backend report type mapping (income-statement, financial-summary, budget-variance, fund-balance, donor-giving, expense-report), and the mapping SHALL be bijective (one-to-one).

**Validates: Requirements 7.1, 7.4**

## Error Handling

### Error Categories

The system handles four categories of errors:

1. **HTTP Errors**: Server returns non-2xx status code
2. **Validation Errors**: Response fails validation checks
3. **Network Errors**: Connection or fetch failures
4. **Client Errors**: Invalid user input or configuration

### Error Handling Strategy

#### HTTP Error Responses

```typescript
const handleHttpError = (status: number): string => {
  switch (status) {
    case 401:
    case 403:
      return 'Authentication error. Please log in again.';
    case 404:
      return 'Report not found. Please check your date range.';
    case 500:
    case 502:
    case 503:
      return 'Server error. Please try again later.';
    default:
      return 'Failed to generate report. Please try again.';
  }
};
```

**Rationale**: Specific error messages help users understand the issue and take appropriate action. Authentication errors prompt re-login, 404 errors suggest checking inputs, and server errors indicate temporary issues.

#### Validation Errors

```typescript
// Content-Type validation
if (!contentType || !contentType.includes('application/pdf')) {
  throw new Error(
    `Invalid response type. Expected PDF but received ${contentType || 'unknown type'}.`
  );
}

// Blob size validation
if (blob.size === 0) {
  throw new Error('Received empty report file. Please try again.');
}

// Blob type validation
if (blob.type && !blob.type.includes('application/pdf')) {
  throw new Error('Invalid file type received. Expected PDF.');
}
```

**Rationale**: Multi-stage validation catches issues early and provides specific feedback about what went wrong. This helps with debugging and prevents corrupted files from being saved.

#### Network Errors

```typescript
catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw error;
  }
  throw new Error('An unexpected error occurred. Please try again.');
}
```

**Rationale**: Network errors are distinguished from other errors to help users understand connectivity issues vs. application issues.

#### Error Logging

All errors are logged to the console with context:

```typescript
catch (error) {
  console.error('Error generating report:', error);
  // Display user-friendly message
  alert(errorMessage);
}
```

**Rationale**: Console logging preserves technical details for debugging while user-facing messages remain friendly and actionable.

### Error Recovery

- **Transient Errors** (network, 500 errors): Users can retry immediately
- **Authentication Errors**: Users are prompted to log in again
- **Validation Errors**: Users are informed of the specific issue
- **Client Errors**: Form validation prevents submission

### User Feedback

Error messages are displayed via:
- **Modal alerts**: For errors during report generation
- **Inline messages**: For form validation errors
- **Loading states**: To indicate processing and prevent duplicate requests

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit Tests**: Verify specific examples, edge cases, and UI interactions
- **Property Tests**: Verify universal properties across all inputs and scenarios

### Unit Testing

Unit tests focus on:

**Component Behavior**:
- Finance.tsx renders without Reports tab
- Finance.tsx displays exactly 5 tabs (Overview, Offerings, Expenses, Budgets, Settings)
- Reports.tsx displays Financial Reports category with 6 reports
- Modal opens when Generate button is clicked
- Modal closes after successful generation

**Download Functionality**:
- Blob URL is created when download is triggered
- Download anchor element is created with correct filename format
- URL.revokeObjectURL is called after download
- Loading state is shown during generation

**Error Handling**:
- 401/403 errors display authentication message
- 404 errors display "Report not found" message
- 500 errors display "Server error" message
- Network errors display connection message
- Empty blob displays "Received empty report file" message
- Invalid Content-Type displays appropriate error message

**UI Elements**:
- Help tooltip/icon is present near download buttons
- Tooltip displays correct download location message
- All 6 financial reports are present in the category
- Report cards display correct icons and descriptions

### Property-Based Testing

Property tests verify universal behaviors using a property-based testing library (fast-check for TypeScript/JavaScript).

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with: `Feature: finance-reports-consolidation, Property {number}: {property_text}`

**Property Test Cases**:

**Property 1: Download Response Validation**
```typescript
// Feature: finance-reports-consolidation, Property 1: Download Response Validation
fc.assert(
  fc.property(
    fc.record({
      status: fc.integer({ min: 100, max: 599 }),
      contentType: fc.option(fc.string(), { nil: null }),
      blobSize: fc.nat(),
      blobType: fc.string()
    }),
    (response) => {
      // Test that validation correctly identifies valid/invalid responses
      const isValid = 
        response.status >= 200 && response.status < 300 &&
        response.contentType?.includes('application/pdf') &&
        response.blobSize > 0 &&
        (!response.blobType || response.blobType.includes('application/pdf'));
      
      // Validation should match expected validity
      const validationResult = validateDownloadResponse(response);
      return validationResult.isValid === isValid;
    }
  ),
  { numRuns: 100 }
);
```

**Property 2: Error Logging Completeness**
```typescript
// Feature: finance-reports-consolidation, Property 2: Error Logging Completeness
fc.assert(
  fc.property(
    fc.oneof(
      fc.record({ type: fc.constant('http'), status: fc.integer() }),
      fc.record({ type: fc.constant('network'), message: fc.string() }),
      fc.record({ type: fc.constant('validation'), field: fc.string() })
    ),
    (error) => {
      // Mock console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Trigger error handling
      handleReportError(error);
      
      // Verify error was logged
      const wasLogged = consoleSpy.mock.calls.length > 0;
      consoleSpy.mockRestore();
      
      return wasLogged;
    }
  ),
  { numRuns: 100 }
);
```

**Property 3: Backend Response Headers**
```typescript
// Feature: finance-reports-consolidation, Property 3: Backend Response Headers
fc.assert(
  fc.property(
    fc.constantFrom(
      'financial-summary',
      'income-statement',
      'expense-report',
      'budget-variance',
      'donor-giving',
      'fund-balance'
    ),
    fc.date(),
    fc.date(),
    async (reportType, startDate, endDate) => {
      // Make request to backend
      const response = await fetch(
        `/api/reports/${reportType}?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`
      );
      
      // Verify headers if successful
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        return contentType?.includes('application/pdf') ?? false;
      }
      
      return true; // Skip validation for error responses
    }
  ),
  { numRuns: 100 }
);
```

**Property 4: Blob URL Cleanup**
```typescript
// Feature: finance-reports-consolidation, Property 4: Blob URL Cleanup
fc.assert(
  fc.property(
    fc.record({
      shouldSucceed: fc.boolean(),
      blobSize: fc.nat()
    }),
    async (scenario) => {
      // Mock URL.createObjectURL and URL.revokeObjectURL
      const createSpy = jest.spyOn(URL, 'createObjectURL');
      const revokeSpy = jest.spyOn(URL, 'revokeObjectURL');
      
      // Trigger download
      try {
        await downloadReport(scenario);
      } catch (error) {
        // Error is expected for some scenarios
      }
      
      // Verify cleanup
      const created = createSpy.mock.calls.length;
      const revoked = revokeSpy.mock.calls.length;
      
      createSpy.mockRestore();
      revokeSpy.mockRestore();
      
      // Every created URL should be revoked
      return created === revoked;
    }
  ),
  { numRuns: 100 }
);
```

**Property 5: Report Type Mapping Consistency**
```typescript
// Feature: finance-reports-consolidation, Property 5: Report Type Mapping Consistency
fc.assert(
  fc.property(
    fc.constantFrom(
      'income_statement',
      'balance_sheet',
      'budget_variance',
      'fund_balance',
      'offering_summary',
      'expense_report'
    ),
    (frontendId) => {
      // Get backend mapping
      const backendType = reportTypeMap[frontendId];
      
      // Verify mapping exists
      if (!backendType) return false;
      
      // Verify mapping is unique (bijective)
      const allMappings = Object.values(reportTypeMap);
      const occurrences = allMappings.filter(t => t === backendType).length;
      
      return occurrences === 1;
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

Integration tests verify the complete flow:

1. **End-to-End Report Generation**:
   - User opens Reports page
   - User clicks Generate on a financial report
   - User selects date range
   - User submits form
   - PDF downloads successfully
   - Modal closes

2. **Error Flow**:
   - User triggers report generation
   - Server returns error
   - Error message is displayed
   - User can retry

3. **Navigation Consolidation**:
   - User navigates to Finance section
   - Reports tab is not visible
   - User navigates to Reports page
   - Financial reports are visible and functional

### Test Coverage Goals

- **Unit Tests**: 90%+ coverage of component logic
- **Property Tests**: 100% coverage of correctness properties
- **Integration Tests**: All critical user flows
- **Edge Cases**: All error conditions and boundary cases

### Testing Tools

- **Unit Tests**: Jest + React Testing Library
- **Property Tests**: fast-check
- **Integration Tests**: Jest + React Testing Library
- **Backend Tests**: PHPUnit (existing tests should continue to pass)

