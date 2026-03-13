# System Diagnosis Script
# This script identifies issues and unnecessary files in the project

Write-Host "=== System Diagnosis Starting ===" -ForegroundColor Cyan
Write-Host ""

# 1. Check for duplicate/redundant summary files
Write-Host "1. Checking for redundant documentation files..." -ForegroundColor Yellow
$summaryFiles = Get-ChildItem -Path . -Recurse -Include "*SUMMARY*.md", "*_SUMMARY.md" -ErrorAction SilentlyContinue
Write-Host "Found $($summaryFiles.Count) summary files"

# 2. Check for old test files that might be obsolete
Write-Host "`n2. Checking for potentially obsolete test files..." -ForegroundColor Yellow
$oldTestPatterns = @(
    "resources/js/pages/Finance/__tests__/Reports.*.test.tsx",
    "resources/js/pages/Finance/__tests__/Reports.*.property.test.tsx"
)
foreach ($pattern in $oldTestPatterns) {
    $files = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue
    if ($files) {
        Write-Host "Found old Finance Reports tests: $($files.Count) files"
    }
}

# 3. Check for example files
Write-Host "`n3. Checking for example files..." -ForegroundColor Yellow
$exampleFiles = Get-ChildItem -Path "resources/js" -Recurse -Include "*.example.tsx", "*.example.ts" -ErrorAction SilentlyContinue
Write-Host "Found $($exampleFiles.Count) example files"

# 4. Check for compiled/build artifacts
Write-Host "`n4. Checking for build artifacts..." -ForegroundColor Yellow
$buildDirs = @("public/js", "public/css", "public/build")
foreach ($dir in $buildDirs) {
    if (Test-Path $dir) {
        $files = Get-ChildItem -Path $dir -Recurse -File -ErrorAction SilentlyContinue
        Write-Host "$dir contains $($files.Count) files"
    }
}

# 5. Check for node_modules size
Write-Host "`n5. Checking node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    $nodeModulesSize = (Get-ChildItem -Path "node_modules" -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "node_modules size: $([math]::Round($nodeModulesSize, 2)) MB"
}

# 6. Check for vendor directory size
Write-Host "`n6. Checking vendor directory..." -ForegroundColor Yellow
if (Test-Path "vendor") {
    $vendorSize = (Get-ChildItem -Path "vendor" -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "vendor size: $([math]::Round($vendorSize, 2)) MB"
}

# 7. Check for cache files
Write-Host "`n7. Checking for cache files..." -ForegroundColor Yellow
$cacheFiles = @(
    "bootstrap/cache/*.php",
    "storage/framework/cache/*",
    "storage/framework/sessions/*",
    "storage/framework/views/*"
)
foreach ($pattern in $cacheFiles) {
    $files = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue
    if ($files) {
        Write-Host "$pattern contains $($files.Count) files"
    }
}

# 8. Check for log files
Write-Host "`n8. Checking for log files..." -ForegroundColor Yellow
if (Test-Path "storage/logs") {
    $logFiles = Get-ChildItem -Path "storage/logs" -Recurse -File -ErrorAction SilentlyContinue
    $logSize = ($logFiles | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "Found $($logFiles.Count) log files ($([math]::Round($logSize, 2)) MB)"
}

# 9. Run npm audit to check for vulnerabilities
Write-Host "`n9. Checking for npm vulnerabilities..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    npm audit --json | Out-Null
    Write-Host "Run 'npm audit' for detailed vulnerability report"
}

# 10. Check TypeScript compilation
Write-Host "`n10. Checking TypeScript compilation..." -ForegroundColor Yellow
if (Test-Path "tsconfig.json") {
    Write-Host "TypeScript config found - run 'npm run type-check' to verify"
}

Write-Host "`n=== Diagnosis Complete ===" -ForegroundColor Green
Write-Host "Review the output above to identify cleanup opportunities" -ForegroundColor Cyan
