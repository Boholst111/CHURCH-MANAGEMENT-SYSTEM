#!/bin/bash

################################################################################
# Old UI Cleanup Script
# 
# This script automates the removal of old UI code, feature flag system,
# and deployment-specific files after successful Modern UI deployment.
#
# Usage:
#   ./scripts/cleanup-old-ui.sh [--dry-run] [--skip-backup] [--phase PHASE]
#
# Options:
#   --dry-run       Show what would be deleted without actually deleting
#   --skip-backup   Skip creating backup (not recommended)
#   --phase PHASE   Run specific phase only (1-12)
#   --help          Show this help message
#
# Prerequisites:
#   - Production deployment complete and stable for 30+ days
#   - 100% rollout achieved
#   - No critical issues
#
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DRY_RUN=false
SKIP_BACKUP=false
SPECIFIC_PHASE=""
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
CLEANUP_REPORT_DIR="cleanup-reports"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --skip-backup)
      SKIP_BACKUP=true
      shift
      ;;
    --phase)
      SPECIFIC_PHASE="$2"
      shift 2
      ;;
    --help)
      head -n 30 "$0" | tail -n 25
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Helper functions
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

confirm() {
  if [ "$DRY_RUN" = true ]; then
    return 0
  fi
  
  read -p "$1 (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_warning "Operation cancelled by user"
    exit 1
  fi
}

delete_file() {
  local file=$1
  if [ -f "$file" ]; then
    if [ "$DRY_RUN" = true ]; then
      log_info "[DRY RUN] Would delete file: $file"
    else
      rm "$file"
      log_success "Deleted file: $file"
    fi
  else
    log_warning "File not found (already deleted?): $file"
  fi
}

delete_directory() {
  local dir=$1
  if [ -d "$dir" ]; then
    if [ "$DRY_RUN" = true ]; then
      log_info "[DRY RUN] Would delete directory: $dir"
    else
      rm -rf "$dir"
      log_success "Deleted directory: $dir"
    fi
  else
    log_warning "Directory not found (already deleted?): $dir"
  fi
}

move_to_archive() {
  local file=$1
  local archive_dir=".kiro/specs/modern-ui-ux-redesign/archive"
  
  if [ -f "$file" ]; then
    if [ "$DRY_RUN" = true ]; then
      log_info "[DRY RUN] Would move to archive: $file"
    else
      mkdir -p "$archive_dir"
      mv "$file" "$archive_dir/"
      log_success "Moved to archive: $file"
    fi
  else
    log_warning "File not found: $file"
  fi
}

# Phase 1: Preparation
phase_1_preparation() {
  log_info "=== Phase 1: Preparation ==="
  
  # Create cleanup reports directory
  if [ "$DRY_RUN" = false ]; then
    mkdir -p "$CLEANUP_REPORT_DIR"
  fi
  
  # Create backup
  if [ "$SKIP_BACKUP" = false ]; then
    log_info "Creating backup branch..."
    if [ "$DRY_RUN" = false ]; then
      git checkout -b "backup/pre-cleanup-$BACKUP_DATE" 2>/dev/null || log_warning "Backup branch may already exist"
      git push origin "backup/pre-cleanup-$BACKUP_DATE" 2>/dev/null || log_warning "Could not push backup branch"
    else
      log_info "[DRY RUN] Would create backup branch: backup/pre-cleanup-$BACKUP_DATE"
    fi
    
    # Backup .env
    if [ -f ".env" ]; then
      if [ "$DRY_RUN" = false ]; then
        cp .env ".env.backup.$BACKUP_DATE"
        log_success "Created .env backup"
      else
        log_info "[DRY RUN] Would backup .env"
      fi
    fi
  else
    log_warning "Skipping backup (--skip-backup flag used)"
  fi
  
  # Document current state
  log_info "Documenting current state..."
  if [ "$DRY_RUN" = false ]; then
    npm list --depth=0 > "$CLEANUP_REPORT_DIR/dependencies-before.txt" 2>&1 || true
    find resources/js -name "*.tsx" -o -name "*.ts" | xargs wc -l > "$CLEANUP_REPORT_DIR/loc-before.txt" 2>&1 || true
    ls -la resources/js/pages/wrappers/ > "$CLEANUP_REPORT_DIR/wrappers-before.txt" 2>&1 || true
    log_success "Current state documented in $CLEANUP_REPORT_DIR/"
  fi
  
  log_success "Phase 1 complete"
}

# Phase 2: Remove Feature Flag System
phase_2_feature_flags() {
  log_info "=== Phase 2: Remove Feature Flag System ==="
  
  # Remove backend files
  log_info "Removing backend feature flag files..."
  delete_file "app/Helpers/FeatureFlag.php"
  delete_file "app/Http/Middleware/InjectFeatureFlags.php"
  delete_file "app/Http/Controllers/Api/FeatureFlagController.php"
  delete_file "app/Http/Controllers/Api/FeatureFlagAdminController.php"
  
  # Remove frontend files
  log_info "Removing frontend feature flag files..."
  delete_file "resources/js/hooks/useFeatureFlag.ts"
  delete_file "resources/js/hooks/__tests__/useFeatureFlag.test.ts"
  delete_file "resources/js/components/ui/feature-flag-toggle.tsx"
  delete_file "resources/js/components/ui/__tests__/feature-flag-toggle.test.tsx"
  delete_file "resources/js/components/admin/FeatureFlagAdminPanel.tsx"
  delete_file "resources/js/components/admin/__tests__/FeatureFlagAdminPanel.test.tsx"
  
  # Remove documentation
  log_info "Removing feature flag documentation..."
  delete_file ".kiro/specs/modern-ui-ux-redesign/FEATURE_FLAG_SYSTEM.md"
  delete_file ".kiro/specs/modern-ui-ux-redesign/TASK_28.1_FEATURE_FLAG_SUMMARY.md"
  delete_file ".kiro/specs/modern-ui-ux-redesign/TASK_28.2_PAGE_WRAPPERS_SUMMARY.md"
  delete_file ".kiro/specs/modern-ui-ux-redesign/TASK_28.3_ADMIN_PANEL_SUMMARY.md"
  
  # Clean .env
  if [ "$DRY_RUN" = false ] && [ -f ".env" ]; then
    log_info "Cleaning feature flag variables from .env..."
    sed -i.bak '/MODERN_UI_ENABLED/d' .env
    sed -i.bak '/MODERN_UI_BETA_USERS/d' .env
    sed -i.bak '/MODERN_UI_ROLLOUT_PERCENTAGE/d' .env
    sed -i.bak '/MODERN_UI_.*_ENABLED/d' .env
    rm .env.bak
    log_success "Cleaned .env file"
  fi
  
  log_success "Phase 2 complete"
}

# Phase 3: Remove Page Wrapper Components
phase_3_wrappers() {
  log_info "=== Phase 3: Remove Page Wrapper Components ==="
  
  delete_directory "resources/js/pages/wrappers"
  
  log_success "Phase 3 complete"
}

# Phase 4: Remove Old UI Components
phase_4_old_ui() {
  log_info "=== Phase 4: Remove Old UI Components ==="
  
  # Search for old UI components
  log_info "Searching for old UI components..."
  if [ "$DRY_RUN" = false ]; then
    find resources/js -type f \( -name "*Legacy*" -o -name "*Old*" \) > "$CLEANUP_REPORT_DIR/old-ui-files.txt" 2>&1 || true
    
    if [ -s "$CLEANUP_REPORT_DIR/old-ui-files.txt" ]; then
      log_warning "Found old UI files (review $CLEANUP_REPORT_DIR/old-ui-files.txt):"
      cat "$CLEANUP_REPORT_DIR/old-ui-files.txt"
      confirm "Delete these files?"
      while IFS= read -r file; do
        delete_file "$file"
      done < "$CLEANUP_REPORT_DIR/old-ui-files.txt"
    else
      log_info "No old UI components found"
    fi
  fi
  
  log_success "Phase 4 complete"
}

# Phase 5: Clean Up Dependencies
phase_5_dependencies() {
  log_info "=== Phase 5: Clean Up Dependencies ==="
  
  log_info "Checking for unused dependencies..."
  if command -v npx &> /dev/null; then
    if [ "$DRY_RUN" = false ]; then
      npx depcheck > "$CLEANUP_REPORT_DIR/depcheck-results.txt" 2>&1 || true
      log_info "Dependency check results saved to $CLEANUP_REPORT_DIR/depcheck-results.txt"
      log_info "Review the file and manually remove any truly unused dependencies"
    else
      log_info "[DRY RUN] Would run depcheck"
    fi
  else
    log_warning "npx not found, skipping dependency check"
  fi
  
  log_success "Phase 5 complete"
}

# Phase 6: Remove Deployment/Migration Scripts
phase_6_scripts() {
  log_info "=== Phase 6: Remove Deployment/Migration Scripts ==="
  
  # Remove deployment scripts
  log_info "Removing deployment scripts..."
  delete_file "resources/js/scripts/monitor-deployment.ts"
  delete_file "scripts/rollback-modern-ui.sh"
  
  # Remove beta testing scripts
  log_info "Removing beta testing scripts..."
  delete_file "resources/js/scripts/analyze-beta-feedback.ts"
  delete_file "resources/js/scripts/generate-feedback-report.ts"
  delete_file "app/Console/Commands/ExportBetaFeedback.php"
  
  # Remove iteration scripts
  log_info "Removing iteration tracking scripts..."
  delete_file "resources/js/scripts/start-iteration.ts"
  delete_file "resources/js/scripts/track-iteration.ts"
  delete_file "resources/js/scripts/complete-iteration.ts"
  
  # Remove beta components
  log_info "Removing beta testing components..."
  delete_file "resources/js/components/beta/FeedbackWidget.tsx"
  delete_file "resources/js/components/admin/FeedbackAnalysisDashboard.tsx"
  delete_file "app/Http/Controllers/Api/BetaFeedbackController.php"
  
  # Archive deployment documentation
  log_info "Archiving deployment documentation..."
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/PRODUCTION_DEPLOYMENT_GUIDE.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/DEPLOYMENT_CHECKLIST.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/TASK_30.1_DEPLOYMENT_SUMMARY.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/BETA_TESTING_SETUP.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/TASK_29.1_BETA_TESTING_SUMMARY.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/TASK_29.1_DEPLOYMENT_CHECKLIST.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/TASK_29.2_FEEDBACK_ANALYSIS_SUMMARY.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/TASK_29.3_ITERATION_SUMMARY.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/FEEDBACK_ANALYSIS_QUICK_START.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/FEEDBACK_ITERATION_WORKFLOW.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/FEEDBACK_PRIORITIZATION_FRAMEWORK.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/ITERATION_QUICK_START.md"
  move_to_archive ".kiro/specs/modern-ui-ux-redesign/REGRESSION_TEST_CHECKLIST.md"
  
  log_success "Phase 6 complete"
}

# Phase 7: Remove Deployment Metrics API
phase_7_metrics() {
  log_info "=== Phase 7: Remove Deployment Metrics API ==="
  
  delete_file "app/Http/Controllers/Api/DeploymentMetricsController.php"
  
  log_warning "Remember to manually remove deployment metrics route from routes/api.php"
  
  log_success "Phase 7 complete"
}

# Phase 8: Generate Cleanup Report
phase_8_report() {
  log_info "=== Phase 8: Generate Cleanup Report ==="
  
  if [ "$DRY_RUN" = false ]; then
    # Document final state
    npm list --depth=0 > "$CLEANUP_REPORT_DIR/dependencies-after.txt" 2>&1 || true
    find resources/js -name "*.tsx" -o -name "*.ts" | xargs wc -l > "$CLEANUP_REPORT_DIR/loc-after.txt" 2>&1 || true
    
    # Generate summary
    cat > "$CLEANUP_REPORT_DIR/cleanup-summary.txt" << EOF
Old UI Cleanup Summary
======================
Date: $(date)
Backup Branch: backup/pre-cleanup-$BACKUP_DATE

Files Removed:
- Feature flag system (backend and frontend)
- Page wrapper components
- Deployment/migration scripts
- Beta testing components
- Deployment metrics API

Files Archived:
- Deployment documentation
- Beta testing documentation
- Iteration tracking documentation

Next Steps:
1. Review manual changes needed:
   - Update routes/api.php (remove feature flag and metrics routes)
   - Update resources/js/app.tsx (update route imports)
   - Update resources/views/app.blade.php (remove feature flag injection)
   - Update app/Http/Kernel.php (remove feature flag middleware)
   - Update package.json (remove deployment scripts)

2. Run tests:
   npm test
   php artisan test

3. Build production:
   npm run production

4. Deploy to staging and test thoroughly

5. Deploy to production

For detailed instructions, see:
.kiro/specs/modern-ui-ux-redesign/OLD_UI_CLEANUP_GUIDE.md
EOF
    
    log_success "Cleanup report generated in $CLEANUP_REPORT_DIR/"
    cat "$CLEANUP_REPORT_DIR/cleanup-summary.txt"
  fi
  
  log_success "Phase 8 complete"
}

# Main execution
main() {
  log_info "Old UI Cleanup Script"
  log_info "====================="
  
  if [ "$DRY_RUN" = true ]; then
    log_warning "DRY RUN MODE - No files will be deleted"
  fi
  
  if [ -n "$SPECIFIC_PHASE" ]; then
    log_info "Running specific phase: $SPECIFIC_PHASE"
    case $SPECIFIC_PHASE in
      1) phase_1_preparation ;;
      2) phase_2_feature_flags ;;
      3) phase_3_wrappers ;;
      4) phase_4_old_ui ;;
      5) phase_5_dependencies ;;
      6) phase_6_scripts ;;
      7) phase_7_metrics ;;
      8) phase_8_report ;;
      *)
        log_error "Invalid phase number: $SPECIFIC_PHASE"
        exit 1
        ;;
    esac
  else
    # Run all phases
    confirm "This will remove old UI code and feature flag system. Continue?"
    
    phase_1_preparation
    phase_2_feature_flags
    phase_3_wrappers
    phase_4_old_ui
    phase_5_dependencies
    phase_6_scripts
    phase_7_metrics
    phase_8_report
  fi
  
  log_success "=== Cleanup Complete ==="
  log_info ""
  log_info "Next steps:"
  log_info "1. Review $CLEANUP_REPORT_DIR/cleanup-summary.txt"
  log_info "2. Make manual changes (see cleanup guide)"
  log_info "3. Run tests: npm test && php artisan test"
  log_info "4. Build: npm run production"
  log_info "5. Deploy to staging and test"
  log_info "6. Deploy to production"
  log_info ""
  log_info "For detailed instructions, see:"
  log_info ".kiro/specs/modern-ui-ux-redesign/OLD_UI_CLEANUP_GUIDE.md"
}

# Run main function
main
