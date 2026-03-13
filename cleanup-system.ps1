# System Cleanup Script
# This script removes unnecessary files and cleans up the project

param(
    [switch]$DryRun = $false,
    [switch]$Aggressive = $false
)

Write-Host "=== System Cleanup Starting ===" -ForegroundColor Cyan
if ($DryRun) {
    Write-Host "DRY RUN MODE - No files will be deleted" -ForegroundColor Yellow
}
Write-Host ""

$deletedCount = 0
$freedSpace = 0

function Remove-SafelyWithLog {
    param($Path, $Description)
    
    if (Test-Path $Path) {
        $size = (Get-ChildItem -Path $Path -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        
        if ($DryRun) {
            Write-Host "[DRY RUN] Would delete: $Description" -ForegroundColor Yellow
            Write-Host "  Path: $Path" -ForegroundColor Gray
            Write-Host "  Size: $([math]::Round($size / 1MB, 2)) MB" -ForegroundColor Gray
        } else {
            Write-Host "Deleting: $Description" -ForegroundColor Green
            Remove-Item -Path $Path -Recurse -Force -ErrorAction SilentlyContinue
            $script:deletedCount++
            $script:freedSpace += $size
        }
    }
}

# 1. Remove redundant summary/documentation files
Write-Host "1. Cleaning up redundant documentation files..." -ForegroundColor Cyan

$redundantDocs = @(
    "DARK_MODE_SIMPLIFICATION_SUMMARY.md",
    "FINANCE_AND_SETTINGS_DEBUG_SUMMARY.md",
    "TYPESCRIPT_FIXES_COMPLETED.md",
    "TYPESCRIPT_ERROR_FIX_PLAN.md",
    "REPORT_PDF_FIX_SUMMARY.md",
    "REPORT_TYPE_MAPPING_VERIFICATION.md",
    "SYSTEM_READY_SUMMARY.md",
    "VERIFICATION_CHECKLIST.md",
    "FEATURE_FLAG_FIX_SUMMARY.md",
    "TYPESCRIPT_FIXES_SUMMARY.md",
    "SYSTEM_VERIFICATION_REPORT.md",
    "FINANCE_SECTION_COMPLETED.md",
    "SOFT_DELETE_SYSTEM_STATUS.md",
    "POSTMAN_COLLECTION_GUIDE.md",
    "TASK_7_CHECKPOINT_VERIFICATION.md",
    "TASK_4_CHECKPOINT_RESULTS.md",
    "FINAL_VALIDATION_RESULTS.md",
    "DEMOGRAPHICS_NEXT_STEPS.md",
    "DEMOGRAPHICS_DEBUG_GUIDE.md",
    "DEMOGRAPHICS_DATA_FLOW.md",
    "EXPENSE_REPOSITORY_IMPLEMENTATION.md",
    "ACTIVITY_LOGGING_IMPLEMENTATION.md"
)

foreach ($doc in $redundantDocs) {
    Remove-SafelyWithLog -Path $doc -Description "Redundant doc: $doc"
}

# 2. Remove old Finance Reports test files (now consolidated)
Write-Host "`n2. Cleaning up old Finance Reports test files..." -ForegroundColor Cyan

$oldFinanceTests = @(
    "resources/js/pages/Finance/__tests__/Reports.download-feedback.test.tsx",
    "resources/js/pages/Finance/__tests__/Reports.error-handling.test.tsx",
    "resources/js/pages/Finance/__tests__/Reports.error-logging.property.test.tsx",
    "resources/js/pages/Finance/__tests__/Reports.cleanup.property.test.tsx",
    "resources/js/pages/Finance/__tests__/Reports.download-validation.property.test.tsx",
    "resources/js/pages/Finance/__tests__/Reports.cleanup.test.tsx",
    "resources/js/pages/Finance/__tests__/Reports.financial-reports.test.tsx"
)

foreach ($test in $oldFinanceTests) {
    Remove-SafelyWithLog -Path $test -Description "Old Finance test: $test"
}

# 3. Clean up cache files
Write-Host "`n3. Cleaning cache files..." -ForegroundColor Cyan

Remove-SafelyWithLog -Path "storage/framework/cache/data/*" -Description "Cache data"
Remove-SafelyWithLog -Path "storage/framework/sessions/*" -Description "Session files"
Remove-SafelyWithLog -Path "storage/framework/views/*" -Description "Compiled views"
Remove-SafelyWithLog -Path ".phpunit.result.cache" -Description "PHPUnit cache"

# 4. Clean up log files (keep structure, remove old logs)
Write-Host "`n4. Cleaning log files..." -ForegroundColor Cyan

if (Test-Path "storage/logs") {
    $logFiles = Get-ChildItem -Path "storage/logs" -Filter "*.log" -File
    foreach ($log in $logFiles) {
        if ($log.LastWriteTime -lt (Get-Date).AddDays(-7)) {
            Remove-SafelyWithLog -Path $log.FullName -Description "Old log: $($log.Name)"
        }
    }
}

# 5. Remove test scripts and diagnostic files
Write-Host "`n5. Cleaning up test/diagnostic scripts..." -ForegroundColor Cyan

$testScripts = @(
    "test-feature-flag-api.ps1",
    "QUICK_TEST_GUIDE.md"
)

foreach ($script in $testScripts) {
    Remove-SafelyWithLog -Path $script -Description "Test script: $script"
}

# 6. Clean up example files (if aggressive mode)
if ($Aggressive) {
    Write-Host "`n6. Cleaning up example files (AGGRESSIVE MODE)..." -ForegroundColor Cyan
    
    $exampleFiles = Get-ChildItem -Path "resources/js" -Recurse -Include "*.example.tsx", "*.example.ts" -ErrorAction SilentlyContinue
    foreach ($example in $exampleFiles) {
        Remove-SafelyWithLog -Path $example.FullName -Description "Example file: $($example.Name)"
    }
}

# 7. Clean up old compiled assets (will be regenerated)
Write-Host "`n7. Cleaning compiled assets..." -ForegroundColor Cyan

if (Test-Path "public/js") {
    $jsFiles = Get-ChildItem -Path "public/js" -Filter "*.js" -File
    Write-Host "Found $($jsFiles.Count) compiled JS files (will be regenerated on build)"
}

if (Test-Path "public/css") {
    $cssFiles = Get-ChildItem -Path "public/css" -Filter "*.css" -File
    Write-Host "Found $($cssFiles.Count) compiled CSS files (will be regenerated on build)"
}

# 8. Clean up spec task summaries (keep requirements and design)
Write-Host "`n8. Cleaning up spec task summaries..." -ForegroundColor Cyan

$specSummaries = Get-ChildItem -Path ".kiro/specs" -Recurse -Include "*SUMMARY*.md", "*CHECKPOINT*.md", "*VERIFICATION*.md" -ErrorAction SilentlyContinue
foreach ($summary in $specSummaries) {
    Remove-SafelyWithLog -Path $summary.FullName -Description "Spec summary: $($summary.Name)"
}

# 9. Remove duplicate/obsolete spec files
Write-Host "`n9. Cleaning up obsolete spec files..." -ForegroundColor Cyan

$obsoleteSpecs = @(
    ".kiro/specs/reports-generation-fix/TASK_1_COUNTEREXAMPLES.md"
)

foreach ($spec in $obsoleteSpecs) {
    Remove-SafelyWithLog -Path $spec -Description "Obsolete spec: $spec"
}

# 10. Clean up temporary PowerShell scripts
Write-Host "`n10. Cleaning up temporary scripts..." -ForegroundColor Cyan

if (-not $DryRun) {
    # Keep this script and diagnose script, remove others
    $tempScripts = Get-ChildItem -Path "." -Filter "*.ps1" -File | Where-Object { 
        $_.Name -ne "cleanup-system.ps1" -and 
        $_.Name -ne "diagnose-system.ps1" -and
        $_.Name -ne "run-tests.ps1"
    }
    
    foreach ($script in $tempScripts) {
        if ($script.Name -match "^(test-|temp-|debug-)") {
            Remove-SafelyWithLog -Path $script.FullName -Description "Temp script: $($script.Name)"
        }
    }
}

# Summary
Write-Host "`n=== Cleanup Summary ===" -ForegroundColor Green
Write-Host "Files/directories processed: $deletedCount" -ForegroundColor White
Write-Host "Space freed: $([math]::Round($freedSpace / 1MB, 2)) MB" -ForegroundColor White

if ($DryRun) {
    Write-Host "`nThis was a DRY RUN. Run without -DryRun to actually delete files." -ForegroundColor Yellow
} else {
    Write-Host "`nCleanup complete! Run 'npm run build' to regenerate assets." -ForegroundColor Cyan
}

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Run 'npm run build' to regenerate compiled assets" -ForegroundColor White
Write-Host "2. Run 'php artisan cache:clear' to clear application cache" -ForegroundColor White
Write-Host "3. Run 'npm test' to verify all tests still pass" -ForegroundColor White
Write-Host "4. Run 'composer dump-autoload' to refresh autoloader" -ForegroundColor White
