# Simple System Cleanup Script
Write-Host "=== Church Management System Cleanup ===" -ForegroundColor Cyan

$filesDeleted = 0

# Remove temporary summary files
$tempFiles = @(
    "ACTIVITY_LOGGING_IMPLEMENTATION.md",
    "DARK_MODE_SIMPLIFICATION_SUMMARY.md",
    "DEMOGRAPHICS_DATA_FLOW.md",
    "DEMOGRAPHICS_DEBUG_GUIDE.md",
    "DEMOGRAPHICS_NEXT_STEPS.md",
    "EXPENSE_REPOSITORY_IMPLEMENTATION.md",
    "FEATURE_FLAG_FIX_SUMMARY.md",
    "FINAL_VALIDATION_RESULTS.md",
    "FINANCE_AND_SETTINGS_DEBUG_SUMMARY.md",
    "FINANCE_SECTION_COMPLETED.md",
    "fix-typescript-errors.md",
    "LOGIN_FIX_SUMMARY.md",
    "PROPERTY_TESTS_SUMMARY.md",
    "REPORT_PDF_FIX_SUMMARY.md",
    "REPORT_TYPE_MAPPING_VERIFICATION.md",
    "SOFT_DELETE_SYSTEM_STATUS.md",
    "SYSTEM_FIXED_SUMMARY.md",
    "SYSTEM_READY_SUMMARY.md",
    "TASK_4_CHECKPOINT_RESULTS.md",
    "TASK_6.6_VERIFICATION_RESULTS.md",
    "TASK_6.7_HMR_TESTING_RESULTS.md",
    "TASK_7_CHECKPOINT_VERIFICATION.md",
    "TROUBLESHOOTING_REPORT.md",
    "TYPESCRIPT_ERROR_FIX_PLAN.md",
    "TYPESCRIPT_FIXES_COMPLETED.md",
    "TYPESCRIPT_FIXES_SUMMARY.md",
    "VERIFICATION_CHECKLIST.md",
    "WINDOWS_TESTING.md"
)

Write-Host "`nRemoving temporary files..." -ForegroundColor Yellow
foreach ($file in $tempFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  Deleted: $file" -ForegroundColor Green
        $filesDeleted++
    }
}

# Remove old test scripts
$testScripts = @(
    "run-property-tests.bat",
    "run-property-tests.ps1",
    "run-tests.bat",
    "test-feature-flag-api.ps1"
)

Write-Host "`nRemoving old test scripts..." -ForegroundColor Yellow
foreach ($script in $testScripts) {
    if (Test-Path $script) {
        Remove-Item $script -Force
        Write-Host "  Deleted: $script" -ForegroundColor Green
        $filesDeleted++
    }
}

# Clean Laravel caches
Write-Host "`nCleaning Laravel caches..." -ForegroundColor Yellow
php artisan cache:clear | Out-Null
php artisan config:clear | Out-Null
php artisan route:clear | Out-Null
php artisan view:clear | Out-Null
Write-Host "  Laravel caches cleared" -ForegroundColor Green

# Remove .phpunit.result.cache
if (Test-Path ".phpunit.result.cache") {
    Remove-Item ".phpunit.result.cache" -Force
    Write-Host "  Deleted: .phpunit.result.cache" -ForegroundColor Green
    $filesDeleted++
}

Write-Host "`n=== Cleanup Complete ===" -ForegroundColor Cyan
Write-Host "Files deleted: $filesDeleted" -ForegroundColor Green
