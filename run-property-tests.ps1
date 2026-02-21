# PowerShell script to run Property-Based Tests without TTY warnings
# Usage: .\run-property-tests.ps1 [test-name]

param(
    [string]$TestName = ""
)

Write-Host "Running Property-Based Tests..." -ForegroundColor Cyan
Write-Host ""

# Suppress TTY warning by redirecting stderr and filtering
$ErrorActionPreference = "Continue"

if ($TestName -eq "") {
    # Run all property tests, suppress TTY warning
    $output = php artisan test tests/Property 2>&1 | Out-String
    $output -split "`n" | Where-Object { $_ -notmatch "TTY mode is not supported" } | ForEach-Object { Write-Host $_ }
} else {
    # Run specific property test, suppress TTY warning
    $output = php artisan test --filter=$TestName 2>&1 | Out-String
    $output -split "`n" | Where-Object { $_ -notmatch "TTY mode is not supported" } | ForEach-Object { Write-Host $_ }
}

Write-Host ""
Write-Host "Note: Property-based tests may take longer to run." -ForegroundColor Yellow
