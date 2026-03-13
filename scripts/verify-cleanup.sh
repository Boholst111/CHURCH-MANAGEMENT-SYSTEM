#!/bin/bash

################################################################################
# Cleanup Verification Script
# 
# This script verifies that the old UI cleanup was successful and that
# the application still works correctly.
#
# Usage:
#   ./scripts/verify-cleanup.sh
#
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[✓]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[!]${NC} $1"
  ((WARNINGS++))
}

log_error() {
  echo -e "${RED}[✗]${NC} $1"
  ((ERRORS++))
}

check_file_not_exists() {
  local file=$1
  local description=$2
  
  if [ -f "$file" ]; then
    log_error "$description still exists: $file"
  else
    log_success "$description removed: $file"
  fi
}

check_directory_not_exists() {
  local dir=$1
  local description=$2
  
  if [ -d "$dir" ]; then
    log_error "$description still exists: $dir"
  else
    log_success "$description removed: $dir"
  fi
}

check_file_exists() {
  local file=$1
  local description=$2
  
  if [ -f "$file" ]; then
    log_success "$description exists: $file"
  else
    log_error "$description missing: $file"
  fi
}

check_string_not_in_file() {
  local file=$1
  local string=$2
  local description=$3
  
  if [ ! -f "$file" ]; then
    log_warning "File not found: $file"
    return
  fi
  
  if grep -q "$string" "$file"; then
    log_error "$description found in $file"
  else
    log_success "$description not found in $file"
  fi
}

log_info "=== Old UI Cleanup Verification ==="
echo ""

# Check feature flag files removed
log_info "Checking feature flag files..."
check_file_not_exists "app/Helpers/FeatureFlag.php" "Feature flag helper"
check_file_not_exists "app/Http/Middleware/InjectFeatureFlags.php" "Feature flag middleware"
check_file_not_exists "app/Http/Controllers/Api/FeatureFlagController.php" "Feature flag controller"
check_file_not_exists "app/Http/Controllers/Api/FeatureFlagAdminController.php" "Feature flag admin controller"
check_file_not_exists "resources/js/hooks/useFeatureFlag.ts" "Feature flag hook"
check_file_not_exists "resources/js/components/ui/feature-flag-toggle.tsx" "Feature flag toggle component"
check_file_not_exists "resources/js/components/admin/FeatureFlagAdminPanel.tsx" "Feature flag admin panel"
echo ""

# Check wrapper files removed
log_info "Checking wrapper components..."
check_directory_not_exists "resources/js/pages/wrappers" "Page wrappers directory"
echo ""

# Check deployment scripts removed
log_info "Checking deployment scripts..."
check_file_not_exists "resources/js/scripts/monitor-deployment.ts" "Deployment monitoring script"
check_file_not_exists "scripts/rollback-modern-ui.sh" "Rollback script"
check_file_not_exists "resources/js/scripts/analyze-beta-feedback.ts" "Beta feedback analysis script"
check_file_not_exists "resources/js/scripts/generate-feedback-report.ts" "Feedback report script"
check_file_not_exists "app/Console/Commands/ExportBetaFeedback.php" "Export feedback command"
check_file_not_exists "resources/js/scripts/start-iteration.ts" "Start iteration script"
check_file_not_exists "resources/js/scripts/track-iteration.ts" "Track iteration script"
check_file_not_exists "resources/js/scripts/complete-iteration.ts" "Complete iteration script"
echo ""

# Check beta components removed
log_info "Checking beta testing components..."
check_file_not_exists "resources/js/components/beta/FeedbackWidget.tsx" "Feedback widget"
check_file_not_exists "resources/js/components/admin/FeedbackAnalysisDashboard.tsx" "Feedback analysis dashboard"
check_file_not_exists "app/Http/Controllers/Api/BetaFeedbackController.php" "Beta feedback controller"
echo ""

# Check metrics API removed
log_info "Checking deployment metrics API..."
check_file_not_exists "app/Http/Controllers/Api/DeploymentMetricsController.php" "Deployment metrics controller"
echo ""

# Check documentation archived
log_info "Checking documentation archived..."
check_file_not_exists ".kiro/specs/modern-ui-ux-redesign/FEATURE_FLAG_SYSTEM.md" "Feature flag documentation"
check_file_not_exists ".kiro/specs/modern-ui-ux-redesign/PRODUCTION_DEPLOYMENT_GUIDE.md" "Deployment guide (should be archived)"
echo ""

# Check essential files still exist
log_info "Checking essential files still exist..."
check_file_exists "resources/js/pages/Dashboard.tsx" "Dashboard page"
check_file_exists "resources/js/pages/Members.tsx" "Members page"
check_file_exists "resources/js/pages/Events.tsx" "Events page"
check_file_exists "resources/js/components/ui/button.tsx" "Button component"
check_file_exists "resources/js/components/ui/card.tsx" "Card component"
check_file_exists "resources/js/components/ui/table.tsx" "Table component"
echo ""

# Check .env cleaned
log_info "Checking .env file..."
if [ -f ".env" ]; then
  check_string_not_in_file ".env" "MODERN_UI_ENABLED" "MODERN_UI_ENABLED variable"
  check_string_not_in_file ".env" "MODERN_UI_BETA_USERS" "MODERN_UI_BETA_USERS variable"
  check_string_not_in_file ".env" "MODERN_UI_ROLLOUT_PERCENTAGE" "MODERN_UI_ROLLOUT_PERCENTAGE variable"
else
  log_warning ".env file not found"
fi
echo ""

# Check for references to removed code
log_info "Checking for references to removed code..."

if grep -r "useFeatureFlag" resources/js --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "node_modules" | grep -q .; then
  log_error "Found references to useFeatureFlag in code"
  grep -r "useFeatureFlag" resources/js --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "node_modules" | head -5
else
  log_success "No references to useFeatureFlag found"
fi

if grep -r "FeatureFlag" app --include="*.php" 2>/dev/null | grep -v "vendor" | grep -q .; then
  log_error "Found references to FeatureFlag in PHP code"
  grep -r "FeatureFlag" app --include="*.php" 2>/dev/null | grep -v "vendor" | head -5
else
  log_success "No references to FeatureFlag found in PHP"
fi

if grep -r "Wrapper" resources/js/pages --include="*.tsx" 2>/dev/null | grep -v "node_modules" | grep -q .; then
  log_warning "Found references to Wrapper components (review manually)"
  grep -r "Wrapper" resources/js/pages --include="*.tsx" 2>/dev/null | grep -v "node_modules" | head -5
else
  log_success "No references to Wrapper components found"
fi
echo ""

# Check build
log_info "Checking if production build works..."
if npm run production > /dev/null 2>&1; then
  log_success "Production build successful"
else
  log_error "Production build failed"
fi
echo ""

# Summary
echo "=== Verification Summary ==="
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  log_success "All checks passed! Cleanup was successful."
  exit 0
elif [ $ERRORS -eq 0 ]; then
  log_warning "$WARNINGS warning(s) found. Review manually."
  exit 0
else
  log_error "$ERRORS error(s) and $WARNINGS warning(s) found."
  log_error "Cleanup may be incomplete. Review the errors above."
  exit 1
fi
