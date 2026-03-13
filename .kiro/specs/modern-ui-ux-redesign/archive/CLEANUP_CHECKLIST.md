# Old UI Cleanup Checklist

Quick reference checklist for Task 30.2: Remove old UI code

## Pre-Cleanup Verification

- [ ] Production deployment complete (Task 30.1)
- [ ] System stable for 30+ days
- [ ] 100% rollout achieved
- [ ] Error rate < 0.5%
- [ ] No critical issues in last 30 days
- [ ] User satisfaction > 80%
- [ ] Support ticket volume normal

## Preparation

- [ ] Review cleanup guide: `.kiro/specs/modern-ui-ux-redesign/OLD_UI_CLEANUP_GUIDE.md`
- [ ] Preview cleanup: `./scripts/cleanup-old-ui.sh --dry-run`
- [ ] Create backup branch
- [ ] Backup .env file
- [ ] Document current state

## Automated Cleanup

- [ ] Run cleanup script: `./scripts/cleanup-old-ui.sh`
- [ ] Review cleanup report: `cleanup-reports/cleanup-summary.txt`
- [ ] Verify files removed

## Manual Changes

### Update routes/api.php
- [ ] Remove feature flag routes
- [ ] Remove deployment metrics routes
- [ ] Remove beta feedback routes

### Update resources/js/app.tsx
- [ ] Remove wrapper imports
- [ ] Update routes to use direct component imports
- [ ] Verify all routes updated

### Update resources/views/app.blade.php
- [ ] Remove `window.__FEATURE_FLAGS__` injection script

### Update app/Http/Kernel.php
- [ ] Remove `InjectFeatureFlags` middleware

### Update package.json
- [ ] Remove `feedback:report` script
- [ ] Remove `feedback:export` script
- [ ] Remove `iteration:start` script
- [ ] Remove `iteration:track` script
- [ ] Remove `iteration:complete` script

## Verification

- [ ] Run verification script: `./scripts/verify-cleanup.sh`
- [ ] All checks pass (green)
- [ ] Review any warnings (yellow)
- [ ] Fix any errors (red)

## Testing

### Automated Tests
- [ ] Run JavaScript tests: `npm test`
- [ ] All tests pass
- [ ] Run PHP tests: `php artisan test`
- [ ] All tests pass

### Build
- [ ] Run production build: `npm run production`
- [ ] Build completes without errors
- [ ] No import errors
- [ ] Bundle size acceptable

### Manual Testing
- [ ] Login page works
- [ ] Dashboard loads and displays data
- [ ] Members page works (list, add, edit, delete)
- [ ] Small Groups page works
- [ ] Leadership page works
- [ ] Events page works (list, calendar, add, edit)
- [ ] Finance page works (all tabs)
- [ ] Reports page works
- [ ] Activity Log page works
- [ ] Users page works
- [ ] Settings page works (all tabs)
- [ ] Navigation between pages works
- [ ] No console errors
- [ ] No 404 errors

### Responsive Testing
- [ ] Test on mobile (320px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1024px+)
- [ ] All pages responsive

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Deployment

### Staging
- [ ] Create cleanup branch: `git checkout -b cleanup/remove-old-ui`
- [ ] Commit changes
- [ ] Push to staging
- [ ] Deploy to staging environment
- [ ] Test thoroughly on staging
- [ ] All functionality works
- [ ] No errors in logs

### Production
- [ ] Merge to main branch
- [ ] Deploy to production
- [ ] Clear production cache
  - [ ] `php artisan config:clear`
  - [ ] `php artisan cache:clear`
  - [ ] `php artisan route:clear`
  - [ ] `php artisan view:clear`
- [ ] Verify deployment successful

## Post-Deployment Monitoring

### Immediate (First Hour)
- [ ] All pages load correctly
- [ ] No 500 errors
- [ ] No console errors
- [ ] Error rate < 0.5%

### First 24 Hours
- [ ] Monitor error logs
- [ ] Check error rate
- [ ] Review user feedback
- [ ] Check support tickets
- [ ] Monitor performance metrics

### First 48 Hours
- [ ] Error rate remains low
- [ ] Performance maintained
- [ ] No user complaints
- [ ] Support ticket volume normal

## Documentation Updates

- [ ] Update README.md
  - [ ] Remove feature flag references
  - [ ] Update setup instructions
  - [ ] Update screenshots (if needed)
- [ ] Update developer documentation
  - [ ] Remove feature flag usage
  - [ ] Remove wrapper patterns
  - [ ] Update component imports
  - [ ] Update routing examples
- [ ] Create cleanup summary document
- [ ] Archive old documentation

## Rollback Plan (If Needed)

If issues arise:
- [ ] Identify the issue
- [ ] Determine if rollback needed
- [ ] Checkout backup branch: `git checkout backup/pre-cleanup-YYYYMMDD`
- [ ] Deploy backup branch
- [ ] Restore .env: `cp .env.backup.YYYYMMDD .env`
- [ ] Clear cache
- [ ] Verify rollback successful
- [ ] Investigate issue
- [ ] Fix and retry cleanup

## Final Verification

- [ ] All checklist items complete
- [ ] All tests passing
- [ ] Production stable
- [ ] Error rate < 0.5%
- [ ] Performance maintained
- [ ] No critical issues
- [ ] Documentation updated
- [ ] Team informed

## Success Criteria

✅ Cleanup is successful when:
- All feature flag code removed
- All wrapper components removed
- All deployment scripts removed
- All tests passing
- Production build successful
- All pages working correctly
- No console errors
- Error rate remains low
- Performance maintained
- Documentation updated

## Files Removed Summary

### Backend (PHP)
- `app/Helpers/FeatureFlag.php`
- `app/Http/Middleware/InjectFeatureFlags.php`
- `app/Http/Controllers/Api/FeatureFlagController.php`
- `app/Http/Controllers/Api/FeatureFlagAdminController.php`
- `app/Http/Controllers/Api/DeploymentMetricsController.php`
- `app/Http/Controllers/Api/BetaFeedbackController.php`
- `app/Console/Commands/ExportBetaFeedback.php`

### Frontend (TypeScript/React)
- `resources/js/hooks/useFeatureFlag.ts`
- `resources/js/components/ui/feature-flag-toggle.tsx`
- `resources/js/components/admin/FeatureFlagAdminPanel.tsx`
- `resources/js/components/beta/FeedbackWidget.tsx`
- `resources/js/components/admin/FeedbackAnalysisDashboard.tsx`
- `resources/js/pages/wrappers/` (entire directory - 11 files)

### Scripts
- `resources/js/scripts/monitor-deployment.ts`
- `resources/js/scripts/analyze-beta-feedback.ts`
- `resources/js/scripts/generate-feedback-report.ts`
- `resources/js/scripts/start-iteration.ts`
- `resources/js/scripts/track-iteration.ts`
- `resources/js/scripts/complete-iteration.ts`
- `scripts/rollback-modern-ui.sh`

### Documentation (Archived)
- 15+ documentation files moved to archive

**Total**: ~40 files removed or archived

## Quick Commands

```bash
# Preview cleanup
./scripts/cleanup-old-ui.sh --dry-run

# Run cleanup
./scripts/cleanup-old-ui.sh

# Verify cleanup
./scripts/verify-cleanup.sh

# Run tests
npm test && php artisan test

# Build production
npm run production

# Deploy
git checkout -b cleanup/remove-old-ui
git add .
git commit -m "Remove old UI code and feature flag system"
git push origin cleanup/remove-old-ui
```

## Support

For issues or questions:
1. Review [Old UI Cleanup Guide](./OLD_UI_CLEANUP_GUIDE.md)
2. Check [Task 30.2 Summary](./TASK_30.2_CLEANUP_SUMMARY.md)
3. Review cleanup reports in `cleanup-reports/`
4. Check Laravel logs: `storage/logs/laravel.log`
5. Check browser console for errors
6. Contact development team

---

**Estimated Time**: 4-6 hours  
**Risk Level**: Low  
**Backup Available**: Yes  
**Rollback Available**: Yes

✅ **Ready to proceed with cleanup!**
