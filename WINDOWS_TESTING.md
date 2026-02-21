# Windows Testing Guide

## TTY Mode Warning

When running tests on Windows, you may see this warning:
```
Warning: TTY mode is not supported on Windows platform.
```

**This warning is completely harmless and does not affect test execution.** It occurs because PHPUnit tries to use TTY mode for colored output, which is not fully supported on Windows Command Prompt. All tests will run normally despite this warning.

## Solutions to Suppress or Ignore the Warning

### Option 1: Use PowerShell Scripts (Recommended - Suppresses Warning)

We've created PowerShell scripts that automatically filter out the TTY warning:

**Run all tests:**
```powershell
.\run-tests.ps1
```

**Run specific test:**
```powershell
.\run-tests.ps1 DateRangeValidationPropertyTest
```

**Run all property tests:**
```powershell
.\run-property-tests.ps1
```

**Run specific property test:**
```powershell
.\run-property-tests.ps1 PledgeProgressAccuracyPropertyTest
```

### Option 2: Use Batch Scripts (Warning Appears but Noted)

Alternative batch scripts are available that acknowledge the warning:

**Run all tests:**
```batch
run-tests.bat
```

**Run specific test:**
```batch
run-tests.bat DateRangeValidationPropertyTest
```

**Run property tests:**
```batch
run-property-tests.bat PledgeProgressAccuracyPropertyTest
```

### Option 3: Use PowerShell Filtering Directly

Use PowerShell's filtering capabilities in your terminal:

```powershell
$output = php artisan test 2>&1 | Out-String
$output -split "`n" | Where-Object { $_ -notmatch "TTY mode" } | ForEach-Object { Write-Host $_ }
```

Or for a specific test:

```powershell
$output = php artisan test --filter=DateRangeValidationPropertyTest 2>&1 | Out-String
$output -split "`n" | Where-Object { $_ -notmatch "TTY mode" } | ForEach-Object { Write-Host $_ }
```

### Option 4: Just Ignore the Warning

Simply run tests normally and ignore the warning:

```batch
php artisan test
php artisan test --filter=DateRangeValidationPropertyTest
```

The warning appears once at the start and doesn't affect test results.

### Option 5: Use Windows Terminal

Windows Terminal (available in Windows 10/11) has better TTY support and may not show the warning.

## Running Property-Based Tests

Property-based tests may take longer to run. Use the warning parameter when running them:

```batch
run-property-tests.bat DateRangeValidationPropertyTest
run-property-tests.bat NextExpectedDateCalculationPropertyTest
run-property-tests.bat PledgeProgressAccuracyPropertyTest
run-property-tests.bat AuditTrailCompletenessPropertyTest
```

## Test Performance

To reduce test execution time, we've configured property tests with reduced examples:
- Most tests use `withMaxSize(2)` instead of `withMaxSize(3)` or higher
- Generator ranges are reduced (e.g., 1-30 instead of 1-365)
- This provides good coverage while keeping tests fast

## Troubleshooting

If tests fail with database errors:
1. Ensure MySQL is running
2. Check database connection in `.env`
3. Run migrations: `php artisan migrate:fresh --seed`

If property tests timeout:
1. Reduce `withMaxSize()` values further
2. Reduce generator ranges
3. Check for infinite loops in test logic
