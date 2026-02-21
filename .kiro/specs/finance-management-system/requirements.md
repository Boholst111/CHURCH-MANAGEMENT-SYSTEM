# Requirements Document: Finance Management System

## Introduction

The Finance Management System (FMS) is a comprehensive financial tracking and reporting solution for church management. It extends the existing basic tithe tracking functionality to provide complete financial oversight including income management, expense tracking, budgeting, reporting, and analytics. The system enables church administrators and staff to maintain accurate financial records, generate donor receipts, track budgets, and produce detailed financial reports for transparency and compliance.

## Glossary

- **System**: The Finance Management System (FMS)
- **Tithe**: A monetary contribution representing 10% of income, given by members to the church
- **Offering**: Any monetary contribution to the church (includes tithes, special offerings, missions, building fund, etc.)
- **Offering_Type**: A category of offering (e.g., tithe, missions, building fund, special offering)
- **Expense**: A monetary outflow from the church for operational or ministry purposes
- **Expense_Category**: A classification for expenses (e.g., utilities, salaries, maintenance, missions)
- **Budget**: A financial plan allocating expected income and expenses over a specific period
- **Budget_Period**: A time frame for budget planning (monthly, quarterly, annually)
- **Fund**: A designated pool of money for specific purposes (restricted or unrestricted)
- **Pledge**: A commitment by a member to give a specific amount over a defined period
- **Donor**: A member or anonymous contributor who gives offerings to the church
- **Receipt**: A document confirming a financial transaction (donation or expense)
- **Vendor**: An external entity that provides goods or services to the church
- **Financial_Year**: The 12-month period used for financial reporting and budgeting
- **Reconciliation**: The process of matching bank statements with recorded transactions
- **Audit_Trail**: A chronological record of all financial transactions and modifications
- **Administrator**: A user with full access to all financial operations
- **Staff**: A user with limited access to view and add financial records
- **Member**: A church member who can view their own giving history

## Requirements

### Requirement 1: Enhanced Tithe and Offering Management

**User Story:** As a church administrator, I want to manage all types of offerings with full CRUD operations, so that I can maintain accurate and complete financial records.

#### Acceptance Criteria

1. WHEN an administrator creates an offering record, THE System SHALL validate all required fields and store the record with a unique identifier
2. WHEN an administrator updates an offering record, THE System SHALL preserve the audit trail and update the modified timestamp
3. WHEN an administrator deletes an offering record, THE System SHALL perform a soft delete and maintain the record in the audit trail
4. WHEN retrieving offering records, THE System SHALL support filtering by date range, offering type, payment method, member, and amount range
5. THE System SHALL support multiple offering types including tithes, missions, building fund, special offerings, and custom types
6. WHEN a member gives anonymously, THE System SHALL record the offering without associating a member_id
7. WHEN an offering is recorded, THE System SHALL validate that the amount is greater than zero
8. WHEN an offering is recorded, THE System SHALL validate that the date is not in the future

### Requirement 2: Bulk Import and Export

**User Story:** As a church administrator, I want to import and export financial records in bulk, so that I can efficiently manage large datasets and integrate with external systems.

#### Acceptance Criteria

1. WHEN an administrator uploads a CSV file with offering records, THE System SHALL validate the file format and import valid records
2. WHEN importing offering records, THE System SHALL provide a detailed report of successful imports, validation errors, and duplicate records
3. WHEN an administrator exports offering records, THE System SHALL generate a CSV file containing all selected records with proper formatting
4. WHEN an administrator exports offering records, THE System SHALL support Excel format (.xlsx) with proper column headers and data types
5. WHEN importing records, THE System SHALL validate that required fields (amount, date, payment_method) are present
6. WHEN importing records with member identifiers, THE System SHALL validate that the member exists in the database
7. WHEN a duplicate record is detected during import, THE System SHALL skip the duplicate and report it in the import summary
8. WHEN exporting records, THE System SHALL apply any active filters (date range, offering type, etc.) to the export

### Requirement 3: Receipt Generation

**User Story:** As a church administrator, I want to generate PDF receipts for donors, so that I can provide official documentation for tax and record-keeping purposes.

#### Acceptance Criteria

1. WHEN an administrator generates a receipt for a single offering, THE System SHALL create a PDF document with offering details, church information, and a unique receipt number
2. WHEN an administrator generates an annual giving statement, THE System SHALL create a PDF summarizing all offerings by a donor for the specified year
3. WHEN generating a receipt, THE System SHALL include the donor name, date, amount, payment method, and offering type
4. WHEN generating a receipt for an anonymous donation, THE System SHALL display "Anonymous Donor" instead of a member name
5. WHEN generating receipts, THE System SHALL assign sequential receipt numbers that are unique and non-reusable
6. WHEN a receipt is generated, THE System SHALL store a record of the receipt generation including timestamp and generated-by user
7. WHEN generating annual statements, THE System SHALL group offerings by offering type and display subtotals
8. WHEN generating receipts, THE System SHALL include church tax identification number and official contact information

### Requirement 4: Recurring Giving Management

**User Story:** As a church administrator, I want to track recurring giving commitments and pledges, so that I can monitor donor commitments and follow up appropriately.

#### Acceptance Criteria

1. WHEN a member sets up a recurring giving schedule, THE System SHALL store the frequency (weekly, bi-weekly, monthly), amount, start date, and end date
2. WHEN a recurring giving record is created, THE System SHALL validate that the start date is not after the end date
3. WHEN viewing recurring giving records, THE System SHALL display the next expected giving date based on the frequency
4. WHEN a recurring giving payment is received, THE System SHALL allow linking it to the recurring giving record
5. WHEN a member creates a pledge, THE System SHALL store the pledged amount, time period, and purpose
6. WHEN viewing pledge progress, THE System SHALL calculate and display the amount given versus the pledged amount
7. WHEN a pledge period ends, THE System SHALL mark the pledge as completed or incomplete based on fulfillment
8. WHEN a recurring giving schedule is cancelled, THE System SHALL record the cancellation date and reason

### Requirement 5: Expense Tracking

**User Story:** As a church administrator, I want to record and categorize all church expenses, so that I can track spending and maintain financial accountability.

#### Acceptance Criteria

1. WHEN an administrator records an expense, THE System SHALL require amount, date, category, and description
2. WHEN recording an expense, THE System SHALL validate that the amount is greater than zero
3. WHEN recording an expense, THE System SHALL allow attaching digital receipts or invoices as file uploads
4. WHEN an expense is created, THE System SHALL support multiple expense categories including utilities, salaries, maintenance, missions, supplies, and custom categories
5. WHEN an expense includes a vendor, THE System SHALL link the expense to the vendor record
6. WHEN retrieving expenses, THE System SHALL support filtering by date range, category, vendor, and amount range
7. WHEN an expense is updated, THE System SHALL preserve the audit trail with modification timestamp and user
8. WHEN an expense is deleted, THE System SHALL perform a soft delete and maintain the record in the audit trail

### Requirement 6: Expense Approval Workflow

**User Story:** As a church administrator, I want to implement an approval workflow for expenses, so that I can maintain financial controls and oversight.

#### Acceptance Criteria

1. WHEN an expense is created, THE System SHALL set the initial status to "pending" if approval is required
2. WHEN an expense amount exceeds a configurable threshold, THE System SHALL require approval before marking as "approved"
3. WHEN an approver reviews an expense, THE System SHALL allow approving or rejecting with optional comments
4. WHEN an expense is approved, THE System SHALL record the approver user ID and approval timestamp
5. WHEN an expense is rejected, THE System SHALL record the rejection reason and notify the expense creator
6. WHEN viewing expenses, THE System SHALL allow filtering by approval status (pending, approved, rejected)
7. WHEN an approved expense is modified, THE System SHALL reset the status to "pending" and require re-approval
8. THE System SHALL restrict expense approval permissions to users with administrator or approver roles

### Requirement 7: Vendor Management

**User Story:** As a church administrator, I want to maintain a database of vendors, so that I can track relationships and expense history with service providers.

#### Acceptance Criteria

1. WHEN an administrator creates a vendor record, THE System SHALL store vendor name, contact information, tax ID, and payment terms
2. WHEN creating a vendor, THE System SHALL validate that the vendor name is unique
3. WHEN viewing a vendor record, THE System SHALL display all associated expenses and total amount paid
4. WHEN an expense is linked to a vendor, THE System SHALL update the vendor's total expense amount
5. WHEN searching for vendors, THE System SHALL support searching by name, tax ID, or contact information
6. WHEN a vendor is deleted, THE System SHALL prevent deletion if expenses are linked and suggest archiving instead
7. WHEN a vendor is archived, THE System SHALL hide the vendor from active lists but preserve historical expense data
8. WHEN generating vendor reports, THE System SHALL show total payments by vendor for a specified period

### Requirement 8: Budget Management

**User Story:** As a church administrator, I want to create and manage budgets, so that I can plan spending and monitor financial health.

#### Acceptance Criteria

1. WHEN an administrator creates a budget, THE System SHALL require a budget period (monthly, quarterly, annually), start date, and end date
2. WHEN creating a budget, THE System SHALL allow setting budget amounts for each income category and expense category
3. WHEN a budget is created, THE System SHALL validate that the start date is before the end date
4. WHEN viewing a budget, THE System SHALL display budgeted amounts, actual amounts, and variance for each category
5. WHEN actual spending in a category reaches 80% of the budgeted amount, THE System SHALL generate a warning alert
6. WHEN actual spending exceeds the budgeted amount, THE System SHALL generate an over-budget alert
7. WHEN comparing budgets across years, THE System SHALL display side-by-side comparison of budgeted and actual amounts
8. WHEN a budget period ends, THE System SHALL allow copying the budget to create a new budget for the next period

### Requirement 9: Financial Reporting - Income

**User Story:** As a church administrator, I want to generate comprehensive income reports, so that I can analyze giving patterns and trends.

#### Acceptance Criteria

1. WHEN generating an income report, THE System SHALL allow filtering by date range, offering type, and payment method
2. WHEN displaying income by period, THE System SHALL support grouping by day, week, month, quarter, or year
3. WHEN generating an income report, THE System SHALL calculate and display total income, average transaction, and transaction count
4. WHEN viewing income by offering type, THE System SHALL display a breakdown showing amount and percentage for each type
5. WHEN viewing income by payment method, THE System SHALL display a breakdown showing amount and percentage for each method
6. WHEN generating donor giving history, THE System SHALL display all offerings by a specific donor with dates and amounts
7. WHEN generating a top donors report, THE System SHALL rank donors by total giving for the specified period
8. WHEN viewing income trends, THE System SHALL display month-over-month or year-over-year comparison with percentage change

### Requirement 10: Financial Reporting - Expenses

**User Story:** As a church administrator, I want to generate comprehensive expense reports, so that I can analyze spending patterns and control costs.

#### Acceptance Criteria

1. WHEN generating an expense report, THE System SHALL allow filtering by date range, category, vendor, and approval status
2. WHEN displaying expenses by period, THE System SHALL support grouping by day, week, month, quarter, or year
3. WHEN generating an expense report, THE System SHALL calculate and display total expenses, average expense, and transaction count
4. WHEN viewing expenses by category, THE System SHALL display a breakdown showing amount and percentage for each category
5. WHEN viewing expenses by vendor, THE System SHALL display total paid to each vendor for the specified period
6. WHEN generating expense trends, THE System SHALL display month-over-month or year-over-year comparison with percentage change
7. WHEN comparing expense categories, THE System SHALL display a visual breakdown (pie chart or bar chart data)
8. WHEN exporting expense reports, THE System SHALL support CSV and PDF formats

### Requirement 11: Budget Variance Reporting

**User Story:** As a church administrator, I want to view budget variance reports, so that I can identify areas of over-spending or under-spending.

#### Acceptance Criteria

1. WHEN generating a budget variance report, THE System SHALL display budgeted amount, actual amount, variance amount, and variance percentage for each category
2. WHEN viewing variance, THE System SHALL highlight categories with variance exceeding 10% in either direction
3. WHEN filtering variance reports, THE System SHALL support filtering by budget period and category type (income or expense)
4. WHEN displaying variance, THE System SHALL use positive values for favorable variance and negative values for unfavorable variance
5. WHEN generating variance trends, THE System SHALL show variance progression over multiple periods
6. WHEN a category has no budget set, THE System SHALL display "No Budget" instead of calculating variance
7. WHEN exporting variance reports, THE System SHALL include visual indicators for over-budget and under-budget categories
8. WHEN viewing variance summary, THE System SHALL calculate overall budget health as a percentage

### Requirement 12: Dashboard and Analytics

**User Story:** As a church administrator, I want to view a financial dashboard with key metrics and visualizations, so that I can quickly assess financial health.

#### Acceptance Criteria

1. WHEN viewing the dashboard, THE System SHALL display total income, total expenses, and net income for the current month
2. WHEN viewing the dashboard, THE System SHALL display year-to-date totals for income, expenses, and net income
3. WHEN viewing the dashboard, THE System SHALL display budget status showing percentage of budget used for the current period
4. WHEN viewing the dashboard, THE System SHALL display a line chart showing income and expense trends over the past 12 months
5. WHEN viewing the dashboard, THE System SHALL display a pie chart showing income distribution by offering type
6. WHEN viewing the dashboard, THE System SHALL display a pie chart showing expense distribution by category
7. WHEN viewing the dashboard, THE System SHALL display comparison metrics showing month-over-month and year-over-year percentage changes
8. WHEN viewing the dashboard, THE System SHALL display top 5 donors for the current year
9. WHEN viewing the dashboard, THE System SHALL display recent transactions (last 10 offerings and expenses)
10. WHEN viewing the dashboard, THE System SHALL allow selecting different time periods (current month, quarter, year, custom range)

### Requirement 13: Fund Accounting

**User Story:** As a church administrator, I want to track restricted and unrestricted funds separately, so that I can ensure donor-designated funds are used appropriately.

#### Acceptance Criteria

1. WHEN creating a fund, THE System SHALL require a fund name, type (restricted or unrestricted), and optional description
2. WHEN recording an offering, THE System SHALL allow designating the offering to a specific fund
3. WHEN recording an expense, THE System SHALL allow charging the expense to a specific fund
4. WHEN viewing fund balances, THE System SHALL display current balance, total income, and total expenses for each fund
5. WHEN a restricted fund balance reaches zero, THE System SHALL prevent recording expenses against that fund
6. WHEN generating fund reports, THE System SHALL show all transactions (income and expenses) for a specific fund
7. WHEN transferring money between funds, THE System SHALL record the transfer with date, amount, from-fund, to-fund, and reason
8. WHEN viewing fund history, THE System SHALL display a chronological list of all transactions affecting the fund balance

### Requirement 14: Bank Reconciliation

**User Story:** As a church administrator, I want to reconcile bank statements with recorded transactions, so that I can ensure accuracy and identify discrepancies.

#### Acceptance Criteria

1. WHEN starting a reconciliation, THE System SHALL require selecting a bank account, statement date, and ending balance
2. WHEN reconciling transactions, THE System SHALL display all unreconciled income and expense transactions for the period
3. WHEN marking a transaction as reconciled, THE System SHALL update the transaction status and include it in the reconciled balance calculation
4. WHEN the reconciled balance matches the statement ending balance, THE System SHALL allow completing the reconciliation
5. WHEN completing a reconciliation, THE System SHALL record the reconciliation date, user, and final balanced amount
6. WHEN a discrepancy exists, THE System SHALL display the difference between reconciled balance and statement balance
7. WHEN viewing reconciliation history, THE System SHALL display all completed reconciliations with dates and balanced amounts
8. WHEN a reconciled transaction is modified, THE System SHALL mark the reconciliation as requiring review

### Requirement 15: Audit Trail and Logging

**User Story:** As a church administrator, I want to maintain a complete audit trail of all financial operations, so that I can ensure accountability and trace any changes.

#### Acceptance Criteria

1. WHEN any financial record is created, THE System SHALL log the action with timestamp, user ID, and record details
2. WHEN any financial record is updated, THE System SHALL log the action with timestamp, user ID, old values, and new values
3. WHEN any financial record is deleted, THE System SHALL log the action with timestamp, user ID, and deleted record details
4. WHEN viewing audit logs, THE System SHALL support filtering by date range, user, action type, and record type
5. WHEN viewing audit logs, THE System SHALL display entries in reverse chronological order (newest first)
6. THE System SHALL prevent modification or deletion of audit log entries
7. WHEN exporting audit logs, THE System SHALL generate a CSV file with all log entries matching the filter criteria
8. WHEN a sensitive operation is performed (deletion, large transaction), THE System SHALL require additional authentication or confirmation

### Requirement 16: Security and Permissions

**User Story:** As a church administrator, I want to control access to financial data based on user roles, so that I can maintain security and confidentiality.

#### Acceptance Criteria

1. WHEN a user with administrator role accesses the system, THE System SHALL grant full access to all financial operations
2. WHEN a user with staff role accesses the system, THE System SHALL grant read access to all records and write access to offerings and expenses
3. WHEN a user with member role accesses the system, THE System SHALL grant read access only to their own giving history
4. WHEN a user attempts an unauthorized operation, THE System SHALL deny access and return an appropriate error message
5. THE System SHALL restrict budget management operations to administrator role only
6. THE System SHALL restrict expense approval operations to administrator and approver roles only
7. THE System SHALL restrict vendor management operations to administrator and staff roles only
8. WHEN a user views sensitive financial data, THE System SHALL log the access in the audit trail

### Requirement 17: Data Export and Integration

**User Story:** As a church administrator, I want to export financial data to external accounting software, so that I can integrate with existing financial systems.

#### Acceptance Criteria

1. WHEN exporting to QuickBooks format, THE System SHALL generate an IIF file with all transactions in QuickBooks-compatible format
2. WHEN exporting to Xero format, THE System SHALL generate a CSV file with all transactions in Xero-compatible format
3. WHEN exporting data, THE System SHALL allow selecting a date range and transaction types (income, expenses, or both)
4. WHEN exporting data, THE System SHALL map offering types and expense categories to appropriate account codes
5. WHEN exporting data, THE System SHALL include all required fields for the target accounting system
6. WHEN an export is generated, THE System SHALL log the export action with timestamp, user, and export parameters
7. WHEN exporting data, THE System SHALL validate that all required mappings are configured before generating the file
8. WHEN viewing export history, THE System SHALL display all previous exports with dates, users, and download links

### Requirement 18: Financial Year-End Closing

**User Story:** As a church administrator, I want to perform year-end closing procedures, so that I can finalize annual records and prepare for the new fiscal year.

#### Acceptance Criteria

1. WHEN initiating year-end closing, THE System SHALL validate that all transactions for the year are reconciled
2. WHEN performing year-end closing, THE System SHALL generate annual summary reports for income, expenses, and fund balances
3. WHEN year-end closing is completed, THE System SHALL mark the fiscal year as closed and prevent modifications to closed-year transactions
4. WHEN a fiscal year is closed, THE System SHALL carry forward fund balances to the new fiscal year
5. WHEN attempting to modify a closed-year transaction, THE System SHALL deny the modification and display an appropriate message
6. WHEN viewing closed fiscal years, THE System SHALL display the closing date, closing user, and final balances
7. WHEN reopening a closed fiscal year, THE System SHALL require administrator permission and log the reopening action
8. WHEN generating year-end tax receipts, THE System SHALL include all offerings from the closed fiscal year

### Requirement 19: Search and Filtering

**User Story:** As a church administrator, I want advanced search and filtering capabilities, so that I can quickly find specific financial records.

#### Acceptance Criteria

1. WHEN searching offerings, THE System SHALL support searching by member name, amount range, date range, and notes
2. WHEN searching expenses, THE System SHALL support searching by vendor name, category, amount range, date range, and description
3. WHEN applying multiple filters, THE System SHALL combine filters using AND logic
4. WHEN search results are displayed, THE System SHALL support sorting by any column (date, amount, type, etc.)
5. WHEN search results exceed one page, THE System SHALL provide pagination with configurable page size
6. WHEN a search returns no results, THE System SHALL display a message indicating no matching records found
7. WHEN saving a search filter, THE System SHALL allow naming and saving the filter for future use
8. WHEN loading a saved filter, THE System SHALL apply all saved filter criteria and execute the search

### Requirement 20: Mobile Responsiveness

**User Story:** As a church administrator, I want to access the finance system on mobile devices, so that I can manage finances while away from my desk.

#### Acceptance Criteria

1. WHEN accessing the system on a mobile device, THE System SHALL display a responsive layout optimized for small screens
2. WHEN viewing tables on mobile, THE System SHALL provide horizontal scrolling or card-based layout for better readability
3. WHEN entering data on mobile, THE System SHALL provide appropriately sized input fields and touch-friendly buttons
4. WHEN viewing charts on mobile, THE System SHALL scale charts to fit the screen width while maintaining readability
5. WHEN navigating on mobile, THE System SHALL provide a collapsible menu for easy navigation
6. WHEN viewing reports on mobile, THE System SHALL provide a print-friendly view or PDF export option
7. WHEN uploading files on mobile, THE System SHALL support camera capture for receipt photos
8. WHEN performing actions on mobile, THE System SHALL provide confirmation dialogs for destructive operations

### Requirement 21: Notification System

**User Story:** As a church administrator, I want to receive notifications for important financial events, so that I can respond promptly to issues requiring attention.

#### Acceptance Criteria

1. WHEN a budget category reaches 80% of allocated amount, THE System SHALL send a notification to administrators
2. WHEN a budget category exceeds allocated amount, THE System SHALL send an alert notification to administrators
3. WHEN an expense requires approval, THE System SHALL send a notification to users with approver role
4. WHEN a recurring giving payment is missed, THE System SHALL send a notification to the designated follow-up user
5. WHEN a large transaction (above configurable threshold) is recorded, THE System SHALL send a notification to administrators
6. WHEN year-end closing deadline approaches, THE System SHALL send reminder notifications to administrators
7. WHEN a bank reconciliation shows a discrepancy, THE System SHALL send a notification to administrators
8. THE System SHALL allow users to configure notification preferences (email, in-app, or both)

### Requirement 22: Data Validation and Integrity

**User Story:** As a church administrator, I want the system to enforce data validation rules, so that I can maintain accurate and consistent financial records.

#### Acceptance Criteria

1. WHEN entering an amount, THE System SHALL validate that the value is numeric and greater than zero
2. WHEN entering a date, THE System SHALL validate that the date is in a valid format and not in the future (for transactions)
3. WHEN selecting a payment method, THE System SHALL restrict choices to predefined valid options
4. WHEN linking a transaction to a member, THE System SHALL validate that the member exists in the database
5. WHEN linking an expense to a vendor, THE System SHALL validate that the vendor exists in the database
6. WHEN creating a budget, THE System SHALL validate that budget amounts are non-negative
7. WHEN recording a fund transfer, THE System SHALL validate that the source fund has sufficient balance
8. WHEN importing data, THE System SHALL validate all records before committing any changes to the database

### Requirement 23: Reporting Customization

**User Story:** As a church administrator, I want to customize report parameters and layouts, so that I can generate reports tailored to specific needs.

#### Acceptance Criteria

1. WHEN generating a report, THE System SHALL allow selecting which columns to include in the output
2. WHEN generating a report, THE System SHALL allow selecting the sort order for results
3. WHEN generating a report, THE System SHALL allow grouping data by selected fields (date, category, type, etc.)
4. WHEN generating a report, THE System SHALL allow selecting the output format (PDF, CSV, Excel)
5. WHEN saving a report configuration, THE System SHALL allow naming and saving the configuration for future use
6. WHEN loading a saved report configuration, THE System SHALL apply all saved parameters and generate the report
7. WHEN scheduling a report, THE System SHALL allow setting a recurring schedule (daily, weekly, monthly) for automatic generation
8. WHEN a scheduled report is generated, THE System SHALL email the report to designated recipients

### Requirement 24: Multi-Currency Support (Optional)

**User Story:** As a church administrator, I want to record transactions in multiple currencies, so that I can track international missions and foreign donations.

#### Acceptance Criteria

1. WHEN recording a transaction in a foreign currency, THE System SHALL store both the original currency amount and the converted amount in base currency
2. WHEN converting currency, THE System SHALL use a configurable exchange rate or fetch current rates from an external service
3. WHEN viewing transactions, THE System SHALL display amounts in the original currency with base currency equivalent
4. WHEN generating reports, THE System SHALL allow displaying amounts in base currency or original currencies
5. WHEN a transaction is recorded in foreign currency, THE System SHALL store the exchange rate used for conversion
6. WHEN viewing historical transactions, THE System SHALL display the exchange rate that was used at the time of transaction
7. WHEN configuring currencies, THE System SHALL allow setting a base currency for the organization
8. WHEN adding a new currency, THE System SHALL validate that the currency code is a valid ISO 4217 code

### Requirement 25: Pledge Tracking and Reminders

**User Story:** As a church administrator, I want to track pledge fulfillment and send reminders, so that I can help members meet their commitments.

#### Acceptance Criteria

1. WHEN a member creates a pledge, THE System SHALL calculate the expected payment schedule based on pledge amount and duration
2. WHEN viewing pledge status, THE System SHALL display total pledged, amount paid, amount remaining, and percentage complete
3. WHEN a pledge payment is overdue, THE System SHALL flag the pledge as requiring follow-up
4. WHEN generating pledge reports, THE System SHALL show all active pledges with fulfillment status
5. WHEN a pledge is fully paid, THE System SHALL mark the pledge as completed and record the completion date
6. WHEN sending pledge reminders, THE System SHALL generate a list of members with outstanding pledge balances
7. WHEN viewing pledge history, THE System SHALL display all payments made toward the pledge with dates and amounts
8. WHEN a pledge is cancelled, THE System SHALL record the cancellation reason and preserve the pledge history
