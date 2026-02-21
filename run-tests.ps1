# PowerShell script to run PHPUnit tests without TTY warnings
# Usage: .\run-tests.ps1 [filter]

param(
    [string]$Filter = ""
)

Write-Host "Running Tests..." -ForegroundColor Cyan
Write-Host ""

# Suppress TTY warning by redirecting stderr and filtering
$ErrorActionPreference = "Continue"

if ($Filter -eq "") {
    # Run all tests, suppress TTY warning
    $output = php artisan test 2>&1 | Out-String
    $output -split "`n" | Where-Object { $_ -notmatch "TTY mode is not supported" } | ForEach-Object { Write-Host $_ }
} else {
    # Run specific test, suppress TTY warning
    $output = php artisan test --filter=$Filter 2>&1 | Out-String
    $output -split "`n" | Where-Object { $_ -notmatch "TTY mode is not supported" } | ForEach-Object { Write-Host $_ }
}
