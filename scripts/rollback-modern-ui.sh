#!/bin/bash

###############################################################################
# Modern UI Rollback Script
#
# This script provides a quick way to rollback the Modern UI feature flag
# in case of critical issues during production deployment.
#
# Usage:
#   ./scripts/rollback-modern-ui.sh [OPTIONS]
#
# Options:
#   --full          Completely disable Modern UI (default)
#   --partial N     Reduce rollout to N% (e.g., --partial 25)
#   --page PAGE     Disable specific page only (e.g., --page dashboard)
#   --dry-run       Show what would be changed without making changes
#   --help          Show this help message
#
# Examples:
#   ./scripts/rollback-modern-ui.sh                    # Full rollback
#   ./scripts/rollback-modern-ui.sh --partial 50      # Reduce to 50%
#   ./scripts/rollback-modern-ui.sh --page dashboard  # Disable dashboard only
#   ./scripts/rollback-modern-ui.sh --dry-run         # Preview changes
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ROLLBACK_TYPE="full"
ROLLOUT_PERCENTAGE=0
PAGE=""
DRY_RUN=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --full)
      ROLLBACK_TYPE="full"
      shift
      ;;
    --partial)
      ROLLBACK_TYPE="partial"
      ROLLOUT_PERCENTAGE="$2"
      shift 2
      ;;
    --page)
      ROLLBACK_TYPE="page"
      PAGE="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --help)
      head -n 25 "$0" | tail -n 23
      exit 0
      ;;
    *)
      echo -e "${RED}Error: Unknown option $1${NC}"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Function to print colored messages
print_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Function to backup .env file
backup_env() {
  local backup_file=".env.backup.$(date +%Y%m%d_%H%M%S)"
  
  if [ "$DRY_RUN" = true ]; then
    print_info "Would create backup: $backup_file"
  else
    cp .env "$backup_file"
    print_success "Created backup: $backup_file"
  fi
}

# Function to update .env file
update_env() {
  local key="$1"
  local value="$2"
  
  if [ "$DRY_RUN" = true ]; then
    print_info "Would update: $key=$value"
  else
    # Check if key exists
    if grep -q "^${key}=" .env; then
      # Update existing key
      sed -i.bak "s/^${key}=.*/${key}=${value}/" .env
      rm .env.bak
      print_success "Updated: $key=$value"
    else
      # Add new key
      echo "${key}=${value}" >> .env
      print_success "Added: $key=$value"
    fi
  fi
}

# Function to clear Laravel cache
clear_cache() {
  if [ "$DRY_RUN" = true ]; then
    print_info "Would clear Laravel cache"
  else
    print_info "Clearing Laravel cache..."
    php artisan config:clear
    php artisan cache:clear
    php artisan view:clear
    print_success "Cache cleared"
  fi
}

# Function to verify rollback
verify_rollback() {
  if [ "$DRY_RUN" = true ]; then
    print_info "Would verify rollback"
    return
  fi
  
  print_info "Verifying rollback..."
  
  # Check if Modern UI is disabled or reduced
  local enabled=$(php artisan tinker --execute="echo config('features.modern_ui.enabled') ? 'true' : 'false';")
  local percentage=$(php artisan tinker --execute="echo config('features.modern_ui.rollout_percentage');")
  
  if [ "$ROLLBACK_TYPE" = "full" ]; then
    if [ "$enabled" = "false" ]; then
      print_success "Verification passed: Modern UI is disabled"
    else
      print_error "Verification failed: Modern UI is still enabled"
      exit 1
    fi
  elif [ "$ROLLBACK_TYPE" = "partial" ]; then
    if [ "$percentage" = "$ROLLOUT_PERCENTAGE" ]; then
      print_success "Verification passed: Rollout reduced to ${ROLLOUT_PERCENTAGE}%"
    else
      print_error "Verification failed: Rollout percentage is $percentage, expected $ROLLOUT_PERCENTAGE"
      exit 1
    fi
  fi
}

# Function to log rollback
log_rollback() {
  local log_file="storage/logs/rollback.log"
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  local message="[$timestamp] Rollback executed: Type=$ROLLBACK_TYPE"
  
  if [ "$ROLLBACK_TYPE" = "partial" ]; then
    message="$message, Percentage=$ROLLOUT_PERCENTAGE"
  elif [ "$ROLLBACK_TYPE" = "page" ]; then
    message="$message, Page=$PAGE"
  fi
  
  if [ "$DRY_RUN" = true ]; then
    print_info "Would log: $message"
  else
    echo "$message" >> "$log_file"
    print_success "Logged rollback to $log_file"
  fi
}

# Main rollback logic
main() {
  echo ""
  echo "========================================="
  echo "  Modern UI Rollback Script"
  echo "========================================="
  echo ""
  
  if [ "$DRY_RUN" = true ]; then
    print_warning "DRY RUN MODE - No changes will be made"
    echo ""
  fi
  
  # Check if .env file exists
  if [ ! -f .env ]; then
    print_error ".env file not found!"
    exit 1
  fi
  
  # Backup .env file
  backup_env
  
  # Perform rollback based on type
  case $ROLLBACK_TYPE in
    full)
      print_info "Performing FULL rollback..."
      update_env "MODERN_UI_ENABLED" "false"
      update_env "MODERN_UI_ROLLOUT_PERCENTAGE" "0"
      ;;
    
    partial)
      print_info "Performing PARTIAL rollback to ${ROLLOUT_PERCENTAGE}%..."
      update_env "MODERN_UI_ENABLED" "true"
      update_env "MODERN_UI_ROLLOUT_PERCENTAGE" "$ROLLOUT_PERCENTAGE"
      ;;
    
    page)
      print_info "Disabling Modern UI for page: $PAGE..."
      local env_key="MODERN_UI_$(echo $PAGE | tr '[:lower:]' '[:upper:]')_ENABLED"
      update_env "$env_key" "false"
      ;;
  esac
  
  # Clear cache
  clear_cache
  
  # Verify rollback
  verify_rollback
  
  # Log rollback
  log_rollback
  
  echo ""
  print_success "Rollback completed successfully!"
  echo ""
  
  # Show next steps
  print_info "Next steps:"
  echo "  1. Verify users see the expected UI"
  echo "  2. Monitor error logs: tail -f storage/logs/laravel.log"
  echo "  3. Check application metrics"
  echo "  4. Investigate root cause of issues"
  echo "  5. Plan re-deployment after fixes"
  echo ""
  
  if [ "$ROLLBACK_TYPE" = "full" ]; then
    print_warning "Modern UI is now COMPLETELY DISABLED for all users"
  elif [ "$ROLLBACK_TYPE" = "partial" ]; then
    print_warning "Modern UI rollout reduced to ${ROLLOUT_PERCENTAGE}%"
  elif [ "$ROLLBACK_TYPE" = "page" ]; then
    print_warning "Modern UI disabled for page: $PAGE"
  fi
  
  echo ""
}

# Run main function
main
