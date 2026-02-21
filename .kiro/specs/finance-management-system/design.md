# Design Document: Finance Management System

## Overview

The Finance Management System (FMS) is a comprehensive financial tracking and reporting solution built on Laravel PHP backend with React TypeScript frontend. The system extends the existing basic tithe tracking functionality to provide complete financial oversight including:

- Enhanced offering/tithe management with full CRUD operations
- Expense tracking with approval workflows
- Budget management and variance reporting
- Comprehensive financial reporting and analytics
- Fund accounting for restricted/unrestricted funds
- Bank reconciliation and audit trails
- Receipt generation and donor management
- Multi-format data export capabilities

The system follows a layered architecture pattern with clear separation between presentation (React), business logic (Laravel Services), data access (Repositories), and persistence (MySQL database).

## Architecture

### System Architecture

The FMS follows a three-tier architecture:

1. **Presentation Layer (React + TypeScript)**
   - Component-based UI with React hooks
   - State management using React Context or Redux
   - API communication via Axios
   - Chart visualization using Chart.js or Recharts
   - PDF generation using jsPDF or react-pdf
   - Form validation using React Hook Form

2. **Application Layer (Laravel PHP)**
   - RESTful API endpoints
   - Service layer for business logic
   - Repository pattern for data access
   - Middleware for authentication and authorization
   - Event/listener system for notifications
   - Job queues for async operations (reports, exports)

3. **Data Layer (MySQL)**
   - Normalized relational database
   - Foreign key constraints for referential integrity
   - Indexes for query optimization
   - Soft deletes for audit trail preservation

### Key Architectural Patterns

**Repository Pattern**: Abstracts data access logic from business logic
- `OfferingRepository`, `ExpenseRepository`, `BudgetRepository`, etc.
- Provides consistent interface for CRUD operations
- Enables easier testing through dependency injection

**Service Layer Pattern**: Encapsulates business logic
- `OfferingService`, `ExpenseService`, `BudgetService`, `ReportService`, etc.
- Validates data before persistence
- Coordinates between multiple repositories
- Handles complex business rules

**Observer Pattern**: For event-driven notifications
- Events: `OfferingRecorded`, `ExpenseApproved`, `BudgetThresholdReached`
- Listeners: Send notifications, update aggregates, log activities

**Strategy Pattern**: For export formats
- `ExportStrategy` interface with implementations: `CsvExportStrategy`, `ExcelExportStrategy`, `PdfExportStrategy`, `QuickBooksExportStrategy`

## Components and Interfaces

### Backend Components

#### 1. Models

**Offering Model** (extends existing Tithe model)
```php
class Offering extends Model
{
    protected $fillable = [
        'member_id', 'offering_type_id', 'fund_id', 'amount', 
        'payment_method', 'date', 'notes', 'is_anonymous', 
        'receipt_number', 'recurring_giving_id'
    ];
    
    // Relationships
    public function member(): BelongsTo
    public function offeringType(): BelongsTo
    public function fund(): BelongsTo
    public function recurringGiving(): BelongsTo
}
```

**OfferingType Model**
```php
class OfferingType extends Model
{
    protected $fillable = ['name', 'description', 'is_active'];
    
    public function offerings(): HasMany
}
```

**Expense Model**
```php
class Expense extends Model
{
    protected $fillable = [
        'expense_category_id', 'vendor_id', 'fund_id', 'amount', 
        'date', 'description', 'receipt_path', 'approval_status', 
        'approved_by', 'approved_at', 'rejection_reason'
    ];
    
    public function category(): BelongsTo
    public function vendor(): BelongsTo
    public function fund(): BelongsTo
    public function approver(): BelongsTo
}
```

**ExpenseCategory Model**
```php
class ExpenseCategory extends Model
{
    protected $fillable = ['name', 'description', 'is_active'];
    
    public function expenses(): HasMany
}
```

**Budget Model**
```php
class Budget extends Model
{
    protected $fillable = [
        'name', 'period_type', 'start_date', 'end_date', 
        'is_active', 'notes'
    ];
    
    public function items(): HasMany
}
```

**BudgetItem Model**
```php
class BudgetItem extends Model
{
    protected $fillable = [
        'budget_id', 'category_type', 'category_id', 
        'budgeted_amount', 'notes'
    ];
    
    public function budget(): BelongsTo
}
```

**Fund Model**
```php
class Fund extends Model
{
    protected $fillable = [
        'name', 'type', 'description', 'current_balance', 'is_active'
    ];
    
    public function offerings(): HasMany
    public function expenses(): HasMany
    public function transfers(): HasMany
}
```

**Vendor Model**
```php
class Vendor extends Model
{
    protected $fillable = [
        'name', 'contact_name', 'email', 'phone', 
        'address', 'tax_id', 'payment_terms', 'is_active'
    ];
    
    public function expenses(): HasMany
}
```

**RecurringGiving Model**
```php
class RecurringGiving extends Model
{
    protected $fillable = [
        'member_id', 'offering_type_id', 'amount', 'frequency', 
        'start_date', 'end_date', 'next_expected_date', 
        'is_active', 'cancellation_reason'
    ];
    
    public function member(): BelongsTo
    public function offeringType(): BelongsTo
    public function offerings(): HasMany
}
```

**Pledge Model**
```php
class Pledge extends Model
{
    protected $fillable = [
        'member_id', 'offering_type_id', 'pledged_amount', 
        'start_date', 'end_date', 'purpose', 'is_completed'
    ];
    
    public function member(): BelongsTo
    public function offeringType(): BelongsTo
    public function payments(): HasMany
}
```

**BankReconciliation Model**
```php
class BankReconciliation extends Model
{
    protected $fillable = [
        'account_name', 'statement_date', 'statement_balance', 
        'reconciled_balance', 'difference', 'is_balanced', 
        'reconciled_by', 'reconciled_at', 'notes'
    ];
    
    public function reconciledBy(): BelongsTo
}
```

**AuditLog Model**
```php
class AuditLog extends Model
{
    protected $fillable = [
        'user_id', 'action', 'model_type', 'model_id', 
        'old_values', 'new_values', 'ip_address'
    ];
    
    public function user(): BelongsTo
}
```

#### 2. Services

**OfferingService**
- `createOffering(array $data): Offering`
- `updateOffering(int $id, array $data): Offering`
- `deleteOffering(int $id): bool`
- `getOfferings(array $filters): Collection`
- `generateReceipt(int $offeringId): string` (PDF path)
- `generateAnnualStatement(int $memberId, int $year): string`
- `importOfferings(UploadedFile $file): array`
- `exportOfferings(array $filters, string $format): string`

**ExpenseService**
- `createExpense(array $data): Expense`
- `updateExpense(int $id, array $data): Expense`
- `deleteExpense(int $id): bool`
- `getExpenses(array $filters): Collection`
- `approveExpense(int $id, int $approverId, string $comments): Expense`
- `rejectExpense(int $id, int $approverId, string $reason): Expense`
- `attachReceipt(int $id, UploadedFile $file): string`

**BudgetService**
- `createBudget(array $data): Budget`
- `updateBudget(int $id, array $data): Budget`
- `deleteBudget(int $id): bool`
- `getBudgetVariance(int $budgetId): array`
- `checkBudgetAlerts(int $budgetId): array`
- `copyBudget(int $budgetId, array $newPeriod): Budget`

**FundService**
- `createFund(array $data): Fund`
- `updateFund(int $id, array $data): Fund`
- `getFundBalance(int $fundId): float`
- `transferFunds(int $fromFundId, int $toFundId, float $amount, string $reason): FundTransfer`
- `getFundTransactions(int $fundId, array $filters): Collection`

**ReportService**
- `generateIncomeReport(array $filters): array`
- `generateExpenseReport(array $filters): array`
- `generateBudgetVarianceReport(int $budgetId): array`
- `generateDashboardData(array $filters): array`
- `generateDonorGivingHistory(int $memberId, array $filters): array`
- `generateTopDonorsReport(array $filters, int $limit): array`

**ReconciliationService**
- `startReconciliation(array $data): BankReconciliation`
- `markTransactionReconciled(int $transactionId, int $reconciliationId): bool`
- `completeReconciliation(int $reconciliationId): BankReconciliation`
- `getUnreconciledTransactions(string $accountName, string $date): Collection`

**ExportService**
- `exportToQuickBooks(array $filters): string`
- `exportToXero(array $filters): string`
- `exportToCsv(array $data, array $columns): string`
- `exportToExcel(array $data, array $columns): string`
- `exportToPdf(array $data, string $template): string`

**NotificationService**
- `sendBudgetAlert(Budget $budget, string $alertType): void`
- `sendExpenseApprovalRequest(Expense $expense): void`
- `sendRecurringGivingReminder(RecurringGiving $recurringGiving): void`
- `sendYearEndReminder(): void`

**AuditService**
- `logAction(string $action, Model $model, array $oldValues, array $newValues): void`
- `getAuditLogs(array $filters): Collection`
- `exportAuditLogs(array $filters): string`

#### 3. Controllers

**OfferingController**
- `index(Request $request): JsonResponse` - List offerings with filters
- `store(Request $request): JsonResponse` - Create offering
- `show(int $id): JsonResponse` - Get single offering
- `update(Request $request, int $id): JsonResponse` - Update offering
- `destroy(int $id): JsonResponse` - Delete offering
- `generateReceipt(int $id): Response` - Generate PDF receipt
- `generateAnnualStatement(Request $request): Response` - Generate annual statement
- `import(Request $request): JsonResponse` - Import offerings from file
- `export(Request $request): Response` - Export offerings to file

**ExpenseController**
- `index(Request $request): JsonResponse`
- `store(Request $request): JsonResponse`
- `show(int $id): JsonResponse`
- `update(Request $request, int $id): JsonResponse`
- `destroy(int $id): JsonResponse`
- `approve(Request $request, int $id): JsonResponse`
- `reject(Request $request, int $id): JsonResponse`
- `attachReceipt(Request $request, int $id): JsonResponse`

**BudgetController**
- `index(Request $request): JsonResponse`
- `store(Request $request): JsonResponse`
- `show(int $id): JsonResponse`
- `update(Request $request, int $id): JsonResponse`
- `destroy(int $id): JsonResponse`
- `variance(int $id): JsonResponse`
- `copy(Request $request, int $id): JsonResponse`

**FundController**
- `index(Request $request): JsonResponse`
- `store(Request $request): JsonResponse`
- `show(int $id): JsonResponse`
- `update(Request $request, int $id): JsonResponse`
- `balance(int $id): JsonResponse`
- `transfer(Request $request): JsonResponse`
- `transactions(int $id): JsonResponse`

**ReportController**
- `income(Request $request): JsonResponse`
- `expenses(Request $request): JsonResponse`
- `budgetVariance(Request $request): JsonResponse`
- `dashboard(Request $request): JsonResponse`
- `donorHistory(Request $request): JsonResponse`
- `topDonors(Request $request): JsonResponse`

**ReconciliationController**
- `index(Request $request): JsonResponse`
- `start(Request $request): JsonResponse`
- `markReconciled(Request $request): JsonResponse`
- `complete(int $id): JsonResponse`
- `unreconciledTransactions(Request $request): JsonResponse`

**ExportController**
- `quickbooks(Request $request): Response`
- `xero(Request $request): Response`

**VendorController**
- `index(Request $request): JsonResponse`
- `store(Request $request): JsonResponse`
- `show(int $id): JsonResponse`
- `update(Request $request, int $id): JsonResponse`
- `destroy(int $id): JsonResponse`

**RecurringGivingController**
- `index(Request $request): JsonResponse`
- `store(Request $request): JsonResponse`
- `show(int $id): JsonResponse`
- `update(Request $request, int $id): JsonResponse`
- `cancel(Request $request, int $id): JsonResponse`

**PledgeController**
- `index(Request $request): JsonResponse`
- `store(Request $request): JsonResponse`
- `show(int $id): JsonResponse`
- `update(Request $request, int $id): JsonResponse`
- `cancel(Request $request, int $id): JsonResponse`
- `progress(int $id): JsonResponse`

### Frontend Components

#### 1. Pages

- `FinanceDashboard` - Main dashboard with metrics and charts
- `OfferingList` - List and manage offerings
- `OfferingForm` - Create/edit offering
- `ExpenseList` - List and manage expenses
- `ExpenseForm` - Create/edit expense
- `BudgetList` - List and manage budgets
- `BudgetForm` - Create/edit budget
- `BudgetVariance` - View budget variance report
- `FundList` - List and manage funds
- `FundDetails` - View fund transactions and balance
- `VendorList` - List and manage vendors
- `ReconciliationList` - List and manage reconciliations
- `ReconciliationForm` - Perform bank reconciliation
- `ReportIncome` - Income reports
- `ReportExpense` - Expense reports
- `ReportDonor` - Donor giving history
- `AuditLogList` - View audit logs

#### 2. Components

- `OfferingTable` - Reusable table for displaying offerings
- `ExpenseTable` - Reusable table for displaying expenses
- `FilterPanel` - Reusable filter component
- `DateRangePicker` - Date range selection
- `ChartComponent` - Wrapper for Chart.js charts
- `ExportButton` - Export data to various formats
- `ReceiptGenerator` - Generate PDF receipts
- `ApprovalWorkflow` - Expense approval interface
- `BudgetProgressBar` - Visual budget progress indicator
- `NotificationBell` - Display notifications
- `SearchBar` - Global search component

#### 3. Hooks

- `useOfferings` - Fetch and manage offerings
- `useExpenses` - Fetch and manage expenses
- `useBudgets` - Fetch and manage budgets
- `useFunds` - Fetch and manage funds
- `useReports` - Fetch report data
- `useNotifications` - Manage notifications
- `useAuth` - Authentication and permissions

## Data Models

### Database Schema

#### offerings table
```sql
CREATE TABLE offerings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT UNSIGNED NULL,
    offering_type_id BIGINT UNSIGNED NOT NULL,
    fund_id BIGINT UNSIGNED NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('cash', 'check', 'online', 'mobile', 'other') NOT NULL,
    date DATE NOT NULL,
    notes TEXT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    receipt_number VARCHAR(50) UNIQUE NULL,
    recurring_giving_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_member_id (member_id),
    INDEX idx_offering_type_id (offering_type_id),
    INDEX idx_fund_id (fund_id),
    INDEX idx_date (date),
    INDEX idx_payment_method (payment_method),
    INDEX idx_receipt_number (receipt_number),
    
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL,
    FOREIGN KEY (offering_type_id) REFERENCES offering_types(id) ON DELETE RESTRICT,
    FOREIGN KEY (fund_id) REFERENCES funds(id) ON DELETE SET NULL,
    FOREIGN KEY (recurring_giving_id) REFERENCES recurring_givings(id) ON DELETE SET NULL
);
```

#### offering_types table
```sql
CREATE TABLE offering_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

#### expenses table
```sql
CREATE TABLE expenses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    expense_category_id BIGINT UNSIGNED NOT NULL,
    vendor_id BIGINT UNSIGNED NULL,
    fund_id BIGINT UNSIGNED NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    receipt_path VARCHAR(255) NULL,
    approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    approved_by BIGINT UNSIGNED NULL,
    approved_at TIMESTAMP NULL,
    rejection_reason TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_expense_category_id (expense_category_id),
    INDEX idx_vendor_id (vendor_id),
    INDEX idx_fund_id (fund_id),
    INDEX idx_date (date),
    INDEX idx_approval_status (approval_status),
    
    FOREIGN KEY (expense_category_id) REFERENCES expense_categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE SET NULL,
    FOREIGN KEY (fund_id) REFERENCES funds(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);
```

#### expense_categories table
```sql
CREATE TABLE expense_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

#### budgets table
```sql
CREATE TABLE budgets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    period_type ENUM('monthly', 'quarterly', 'annually') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_period (start_date, end_date),
    INDEX idx_is_active (is_active)
);
```

#### budget_items table
```sql
CREATE TABLE budget_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    budget_id BIGINT UNSIGNED NOT NULL,
    category_type ENUM('income', 'expense') NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    budgeted_amount DECIMAL(10, 2) NOT NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_budget_id (budget_id),
    INDEX idx_category (category_type, category_id),
    
    FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE
);
```

#### funds table
```sql
CREATE TABLE funds (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    type ENUM('restricted', 'unrestricted') NOT NULL,
    description TEXT NULL,
    current_balance DECIMAL(10, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_type (type),
    INDEX idx_is_active (is_active)
);
```

#### fund_transfers table
```sql
CREATE TABLE fund_transfers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    from_fund_id BIGINT UNSIGNED NOT NULL,
    to_fund_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    reason TEXT NOT NULL,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_from_fund (from_fund_id),
    INDEX idx_to_fund (to_fund_id),
    INDEX idx_date (date),
    
    FOREIGN KEY (from_fund_id) REFERENCES funds(id) ON DELETE RESTRICT,
    FOREIGN KEY (to_fund_id) REFERENCES funds(id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
);
```

#### vendors table
```sql
CREATE TABLE vendors (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    tax_id VARCHAR(50) NULL,
    payment_terms VARCHAR(100) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
);
```

#### recurring_givings table
```sql
CREATE TABLE recurring_givings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT UNSIGNED NOT NULL,
    offering_type_id BIGINT UNSIGNED NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    frequency ENUM('weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    next_expected_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    cancellation_reason TEXT NULL,
    cancelled_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_member_id (member_id),
    INDEX idx_next_expected_date (next_expected_date),
    INDEX idx_is_active (is_active),
    
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (offering_type_id) REFERENCES offering_types(id) ON DELETE RESTRICT
);
```

#### pledges table
```sql
CREATE TABLE pledges (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT UNSIGNED NOT NULL,
    offering_type_id BIGINT UNSIGNED NOT NULL,
    pledged_amount DECIMAL(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    purpose TEXT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_member_id (member_id),
    INDEX idx_period (start_date, end_date),
    INDEX idx_is_completed (is_completed),
    
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (offering_type_id) REFERENCES offering_types(id) ON DELETE RESTRICT
);
```

#### bank_reconciliations table
```sql
CREATE TABLE bank_reconciliations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    account_name VARCHAR(255) NOT NULL,
    statement_date DATE NOT NULL,
    statement_balance DECIMAL(10, 2) NOT NULL,
    reconciled_balance DECIMAL(10, 2) DEFAULT 0.00,
    difference DECIMAL(10, 2) DEFAULT 0.00,
    is_balanced BOOLEAN DEFAULT FALSE,
    reconciled_by BIGINT UNSIGNED NULL,
    reconciled_at TIMESTAMP NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_account_name (account_name),
    INDEX idx_statement_date (statement_date),
    INDEX idx_is_balanced (is_balanced),
    
    FOREIGN KEY (reconciled_by) REFERENCES users(id) ON DELETE SET NULL
);
```

#### reconciliation_items table
```sql
CREATE TABLE reconciliation_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    reconciliation_id BIGINT UNSIGNED NOT NULL,
    transaction_type ENUM('offering', 'expense') NOT NULL,
    transaction_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    
    INDEX idx_reconciliation_id (reconciliation_id),
    INDEX idx_transaction (transaction_type, transaction_id),
    
    FOREIGN KEY (reconciliation_id) REFERENCES bank_reconciliations(id) ON DELETE CASCADE
);
```

#### audit_logs table
```sql
CREATE TABLE audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    action VARCHAR(50) NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP NULL,
    
    INDEX idx_user_id (user_id),
    INDEX idx_model (model_type, model_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

#### receipt_logs table
```sql
CREATE TABLE receipt_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    offering_id BIGINT UNSIGNED NOT NULL,
    receipt_number VARCHAR(50) NOT NULL,
    generated_by BIGINT UNSIGNED NOT NULL,
    generated_at TIMESTAMP NOT NULL,
    receipt_type ENUM('single', 'annual') NOT NULL,
    file_path VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    
    INDEX idx_offering_id (offering_id),
    INDEX idx_receipt_number (receipt_number),
    INDEX idx_generated_at (generated_at),
    
    FOREIGN KEY (offering_id) REFERENCES offerings(id) ON DELETE CASCADE,
    FOREIGN KEY (generated_by) REFERENCES users(id) ON DELETE RESTRICT
);
```

### Data Migration Strategy

Since the system already has a `tithes` table, we need to:

1. **Create new tables**: All new tables listed above
2. **Migrate existing tithe data**: 
   - Create default offering type "Tithe"
   - Create default fund "General Fund"
   - Migrate data from `tithes` to `offerings` table
   - Preserve all existing relationships and data
3. **Deprecate tithes table**: Keep for historical reference but use `offerings` going forward

### Data Relationships

- **Member → Offerings**: One-to-Many (a member can have multiple offerings)
- **Member → Pledges**: One-to-Many (a member can have multiple pledges)
- **Member → RecurringGivings**: One-to-Many (a member can have multiple recurring giving schedules)
- **OfferingType → Offerings**: One-to-Many (an offering type can have multiple offerings)
- **Fund → Offerings**: One-to-Many (a fund can receive multiple offerings)
- **Fund → Expenses**: One-to-Many (a fund can have multiple expenses)
- **ExpenseCategory → Expenses**: One-to-Many (a category can have multiple expenses)
- **Vendor → Expenses**: One-to-Many (a vendor can have multiple expenses)
- **Budget → BudgetItems**: One-to-Many (a budget has multiple line items)
- **BankReconciliation → ReconciliationItems**: One-to-Many (a reconciliation includes multiple transactions)


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas where properties can be consolidated to avoid redundancy:

1. **Audit Trail Properties**: Requirements 1.2, 5.7, and 5.8 all test audit trail creation. These can be combined into comprehensive audit trail properties.

2. **Validation Properties**: Requirements 1.7, 1.8, 5.1, 5.2 all test input validation. These can be grouped as validation properties.

3. **Filter Properties**: Requirements 1.4, 5.6, 6.6 all test filtering functionality. These can be combined into comprehensive filter properties.

4. **Calculation Properties**: Requirements 4.6, 7.3, 7.4, 7.8, 8.4 all test calculation accuracy. These can be grouped as calculation properties.

5. **Export/Import Round-Trip**: Requirements 2.3, 2.4 test export functionality which can be validated through round-trip properties.

### Core Properties

#### Property 1: Offering Creation Uniqueness
*For any* valid offering data, when the system creates an offering record, the assigned ID should be unique and not conflict with any existing offering ID.
**Validates: Requirements 1.1**

#### Property 2: Audit Trail Completeness
*For any* create, update, or delete operation on financial records (offerings, expenses, budgets, funds), the system should create an audit log entry containing the action type, user ID, timestamp, and affected record details.
**Validates: Requirements 1.2, 5.7, 5.8, 15.1, 15.2, 15.3**

#### Property 3: Soft Delete Preservation
*For any* financial record deletion (offering, expense, vendor), the record should remain in the database with a deleted_at timestamp and should not appear in standard queries but should be accessible in audit trails.
**Validates: Requirements 1.3, 5.8**

#### Property 4: Filter Result Accuracy
*For any* collection of financial records and any filter criteria (date range, type, category, amount range), all returned results should match ALL specified filter criteria.
**Validates: Requirements 1.4, 5.6, 6.6, 19.1, 19.2, 19.3**

#### Property 5: Anonymous Offering Privacy
*For any* offering marked as anonymous, the member_id field should be null and any generated receipts or reports should display "Anonymous Donor" instead of member information.
**Validates: Requirements 1.6, 3.4**

#### Property 6: Positive Amount Validation
*For any* financial transaction (offering or expense), if the amount is less than or equal to zero, the system should reject the transaction with a validation error.
**Validates: Requirements 1.7, 5.2, 22.1**

#### Property 7: Future Date Rejection
*For any* financial transaction with a date in the future, the system should reject the transaction with a validation error.
**Validates: Requirements 1.8, 22.2**

#### Property 8: Import Validation Accuracy
*For any* CSV import file, the system should correctly identify and separate valid records, invalid records, and duplicate records, with the import summary counts matching the actual categorization.
**Validates: Requirements 2.1, 2.2, 2.5, 2.6, 2.7**

#### Property 9: Export Round-Trip Consistency
*For any* set of offering records, exporting to CSV or Excel and then importing the exported file should produce records equivalent to the original records (excluding system-generated fields like timestamps).
**Validates: Requirements 2.3, 2.4**

#### Property 10: Export Filter Application
*For any* export operation with active filters, all records in the exported file should match the filter criteria applied before export.
**Validates: Requirements 2.8**

#### Property 11: Receipt Content Completeness
*For any* offering, a generated receipt PDF should contain all required fields: donor name (or "Anonymous Donor"), date, amount, payment method, offering type, receipt number, church tax ID, and contact information.
**Validates: Requirements 3.1, 3.3, 3.4, 3.8**

#### Property 12: Annual Statement Accuracy
*For any* member and year, an annual giving statement should include all offerings made by that member during the specified year, grouped by offering type with accurate subtotals.
**Validates: Requirements 3.2, 3.7**

#### Property 13: Receipt Number Uniqueness
*For any* sequence of receipt generations, each receipt number should be unique, sequential, and never reused even if a receipt is regenerated.
**Validates: Requirements 3.5**

#### Property 14: Receipt Logging
*For any* receipt generation, a receipt log entry should be created containing the offering ID, receipt number, generated-by user ID, generation timestamp, and receipt type.
**Validates: Requirements 3.6**

#### Property 15: Date Range Validation
*For any* record with start and end dates (recurring giving, pledge, budget), if the start date is after the end date, the system should reject the record with a validation error.
**Validates: Requirements 4.2, 8.3, 22.2**

#### Property 16: Next Expected Date Calculation
*For any* recurring giving record with a frequency and start date, the calculated next expected date should be the correct next occurrence based on the frequency (weekly, bi-weekly, monthly, quarterly, annually).
**Validates: Requirements 4.3**

#### Property 17: Pledge Progress Accuracy
*For any* pledge with associated offering payments, the displayed progress (amount given / pledged amount) should equal the sum of all linked offering amounts divided by the pledged amount.
**Validates: Requirements 4.6**

#### Property 18: Pledge Completion Status
*For any* pledge past its end date, the is_completed status should be true if and only if the sum of linked offering amounts is greater than or equal to the pledged amount.
**Validates: Requirements 4.7**

#### Property 19: Required Field Validation
*For any* financial record creation (offering, expense, budget), if any required field is missing or empty, the system should reject the creation with a validation error specifying the missing fields.
**Validates: Requirements 5.1, 8.1, 22.5**

#### Property 20: File Attachment Persistence
*For any* expense with an attached receipt file, the file path should be stored in the database and the file should be retrievable from storage.
**Validates: Requirements 5.3**

#### Property 21: Vendor Relationship Integrity
*For any* expense linked to a vendor, the vendor relationship should be stored correctly and the expense should appear in the vendor's expense list.
**Validates: Requirements 5.5, 7.3**

#### Property 22: Approval Status Initialization
*For any* expense creation where approval is required (based on amount threshold or configuration), the initial approval_status should be "pending".
**Validates: Requirements 6.1, 6.2**

#### Property 23: Approval Metadata Recording
*For any* expense approval or rejection, the system should record the approver user ID, action timestamp, and optional comments/reason.
**Validates: Requirements 6.3, 6.4, 6.5**

#### Property 24: Approval Reset on Modification
*For any* expense with approval_status "approved", if any field is modified, the approval_status should be reset to "pending".
**Validates: Requirements 6.7**

#### Property 25: Vendor Name Uniqueness
*For any* vendor creation, if a vendor with the same name already exists, the system should reject the creation with a validation error.
**Validates: Requirements 7.2**

#### Property 26: Vendor Total Calculation
*For any* vendor, the displayed total amount paid should equal the sum of all expense amounts linked to that vendor.
**Validates: Requirements 7.3, 7.4, 7.8**

#### Property 27: Vendor Deletion Protection
*For any* vendor with linked expenses, deletion attempts should be rejected with a message suggesting archiving instead.
**Validates: Requirements 7.6**

#### Property 28: Vendor Archive Behavior
*For any* archived vendor, the vendor should not appear in active vendor lists, but all historical expense data should remain accessible and unchanged.
**Validates: Requirements 7.7**

#### Property 29: Budget Variance Calculation
*For any* budget category with budgeted amount and actual transactions, the variance should equal (actual amount - budgeted amount) and variance percentage should equal ((actual - budgeted) / budgeted * 100).
**Validates: Requirements 8.4, 11.1**

#### Property 30: Budget Alert Generation
*For any* budget category where actual spending reaches 80% of budgeted amount, a warning alert should be generated; when actual spending exceeds 100% of budgeted amount, an over-budget alert should be generated.
**Validates: Requirements 8.5, 8.6, 21.1, 21.2**

#### Property 31: Budget Copy Consistency
*For any* budget copy operation, the new budget should have the same structure (categories and amounts) as the source budget, with updated period dates.
**Validates: Requirements 8.8**

#### Property 32: Income Report Aggregation
*For any* income report with date range and grouping criteria, the total income should equal the sum of all offering amounts within the date range, and grouped subtotals should sum to the total.
**Validates: Requirements 9.1, 9.3**

#### Property 33: Expense Report Aggregation
*For any* expense report with date range and grouping criteria, the total expenses should equal the sum of all expense amounts within the date range, and grouped subtotals should sum to the total.
**Validates: Requirements 10.1, 10.3**

#### Property 34: Fund Balance Accuracy
*For any* fund, the current balance should equal the sum of all offering amounts credited to the fund minus the sum of all expense amounts charged to the fund minus the sum of all transfers out plus the sum of all transfers in.
**Validates: Requirements 13.4**

#### Property 35: Fund Transfer Validation
*For any* fund transfer, if the source fund balance is less than the transfer amount, the system should reject the transfer with an insufficient balance error.
**Validates: Requirements 13.5, 22.7**

#### Property 36: Reconciliation Balance Calculation
*For any* bank reconciliation, the reconciled balance should equal the sum of all marked-as-reconciled transaction amounts, and the difference should equal (statement balance - reconciled balance).
**Validates: Requirements 14.3, 14.4, 14.6**

#### Property 37: Reconciliation Completion Validation
*For any* bank reconciliation, completion should only be allowed when the difference between statement balance and reconciled balance is zero (or within a configurable tolerance).
**Validates: Requirements 14.4**

#### Property 38: Audit Log Immutability
*For any* audit log entry, once created, it should never be modified or deleted, ensuring a permanent record of all financial operations.
**Validates: Requirements 15.6**

#### Property 39: Search Result Relevance
*For any* search query on offerings or expenses, all returned results should contain the search term in at least one searchable field (member name, notes, description, vendor name).
**Validates: Requirements 19.1, 19.2**

#### Property 40: Pagination Consistency
*For any* paginated result set, the total count of records across all pages should equal the total number of records matching the query criteria.
**Validates: Requirements 19.5**

#### Property 41: Member Identifier Validation
*For any* financial record creation with a member_id, if the member does not exist in the database, the system should reject the creation with a validation error.
**Validates: Requirements 2.6, 22.4**

#### Property 42: Category Identifier Validation
*For any* financial record creation with a category_id (offering type or expense category), if the category does not exist or is inactive, the system should reject the creation with a validation error.
**Validates: Requirements 22.4**

#### Property 43: Vendor Identifier Validation
*For any* expense creation with a vendor_id, if the vendor does not exist in the database, the system should reject the creation with a validation error.
**Validates: Requirements 22.5**

#### Property 44: Budget Amount Non-Negativity
*For any* budget item creation, if the budgeted amount is negative, the system should reject the creation with a validation error.
**Validates: Requirements 22.6**

#### Property 45: Report Column Customization
*For any* report generation with selected columns, the output should contain only the specified columns in the specified order.
**Validates: Requirements 23.1**

#### Property 46: Report Grouping Accuracy
*For any* report with grouping criteria, records should be grouped correctly by the specified field, and each group should contain only records with matching values for that field.
**Validates: Requirements 23.3**

### Testing Strategy

The Finance Management System will employ a dual testing approach combining unit tests and property-based tests to ensure comprehensive coverage and correctness.

#### Property-Based Testing

Property-based testing will be the primary method for validating the correctness properties defined above. We will use **Pest PHP** with the **Pest Property Testing Plugin** for backend testing.

**Configuration:**
- Each property test will run a minimum of 100 iterations with randomly generated data
- Each test will be tagged with a comment referencing its design property
- Tag format: `// Feature: finance-management-system, Property {number}: {property_text}`

**Example Property Test Structure:**
```php
// Feature: finance-management-system, Property 1: Offering Creation Uniqueness
it('assigns unique IDs to all created offerings', function () {
    $offerings = [];
    
    // Generate 100 random offerings
    for ($i = 0; $i < 100; $i++) {
        $offering = Offering::factory()->create();
        $offerings[] = $offering->id;
    }
    
    // Verify all IDs are unique
    expect($offerings)->toHaveCount(100);
    expect(array_unique($offerings))->toHaveCount(100);
})->repeat(100);
```

**Property Test Coverage:**
- All 46 correctness properties will have corresponding property-based tests
- Tests will use factories to generate random valid and invalid data
- Tests will verify properties hold across diverse input combinations
- Tests will catch edge cases that unit tests might miss

#### Unit Testing

Unit tests will complement property-based tests by focusing on:

1. **Specific Examples**: Concrete scenarios that demonstrate correct behavior
2. **Edge Cases**: Boundary conditions and special cases
3. **Error Conditions**: Specific error messages and error handling paths
4. **Integration Points**: Interactions between components

**Unit Test Focus Areas:**
- Service layer business logic validation
- Repository query correctness
- Controller request/response handling
- Event and notification triggering
- File upload and PDF generation
- Export format validation

**Balance:**
- Property tests handle comprehensive input coverage
- Unit tests handle specific scenarios and integration validation
- Together they provide complete confidence in system correctness

#### Integration Testing

Integration tests will verify:
- End-to-end API workflows
- Database transaction integrity
- File storage operations
- PDF generation accuracy
- Email notification delivery
- Permission and authorization enforcement

#### Frontend Testing

Frontend tests will use **Jest** and **React Testing Library**:
- Component rendering tests
- User interaction tests
- Form validation tests
- API integration tests
- Chart rendering tests

## Error Handling

### Validation Errors

All validation errors will return HTTP 422 with a structured error response:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "amount": ["The amount must be greater than 0"],
    "date": ["The date must not be in the future"]
  }
}
```

### Business Logic Errors

Business logic errors (insufficient funds, duplicate records, etc.) will return HTTP 400 with descriptive messages:
```json
{
  "success": false,
  "message": "Insufficient fund balance for transfer",
  "error_code": "INSUFFICIENT_BALANCE"
}
```

### Authorization Errors

Unauthorized access attempts will return HTTP 403:
```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

### Not Found Errors

Resource not found errors will return HTTP 404:
```json
{
  "success": false,
  "message": "Offering not found with ID: 123"
}
```

### Server Errors

Unexpected server errors will return HTTP 500 with logged details:
```json
{
  "success": false,
  "message": "An unexpected error occurred. Please try again later.",
  "error_id": "ERR-2025-001-12345"
}
```

### Error Logging

All errors will be logged with:
- Error type and message
- Stack trace
- User ID and IP address
- Request parameters
- Timestamp

### Graceful Degradation

- PDF generation failures will return error but preserve data
- Export failures will not affect source data
- Notification failures will be logged but not block operations
- File upload failures will provide clear feedback

## Testing Strategy

### Backend Testing Stack

- **Framework**: Pest PHP
- **Property Testing**: Pest Property Testing Plugin
- **Database**: In-memory SQLite for fast test execution
- **Factories**: Laravel Factories for test data generation
- **Mocking**: Mockery for external dependencies

### Frontend Testing Stack

- **Framework**: Jest
- **Component Testing**: React Testing Library
- **E2E Testing**: Cypress (optional for critical paths)
- **API Mocking**: MSW (Mock Service Worker)

### Test Organization

```
tests/
├── Unit/
│   ├── Models/
│   ├── Services/
│   ├── Repositories/
│   └── Helpers/
├── Feature/
│   ├── Api/
│   ├── Auth/
│   └── Permissions/
├── Property/
│   ├── OfferingProperties/
│   ├── ExpenseProperties/
│   ├── BudgetProperties/
│   ├── FundProperties/
│   └── ReportProperties/
└── Integration/
    ├── Workflows/
    ├── Exports/
    └── Notifications/
```

### Continuous Integration

- All tests run on every commit
- Property tests run with 100 iterations in CI
- Code coverage target: 80% minimum
- No merge without passing tests

### Performance Testing

- Load testing for report generation
- Stress testing for bulk imports
- Query performance monitoring
- API response time benchmarks
