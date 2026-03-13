# Feature Flag System Documentation

## Overview

The feature flag system enables controlled rollout of the Modern UI/UX redesign. It allows administrators to:
- Enable/disable the new UI globally
- Test with specific beta users
- Gradually roll out to a percentage of users
- Control individual pages independently
- Instantly rollback if issues arise

## Architecture

### Backend Components

#### 1. Configuration File (`config/features.php`)

Defines feature flag settings loaded from environment variables:

```php
'modern_ui' => [
    'enabled' => env('MODERN_UI_ENABLED', false),
    'beta_users' => array_filter(explode(',', env('MODERN_UI_BETA_USERS', ''))),
    'rollout_percentage' => (int) env('MODERN_UI_ROLLOUT_PERCENTAGE', 0),
    'pages' => [
        'dashboard' => env('MODERN_UI_DASHBOARD_ENABLED', true),
        // ... other pages
    ],
]
```

#### 2. Feature Flag Helper (`app/Helpers/FeatureFlag.php`)

Provides methods to check feature flag status:

- `isModernUIEnabled()`: Check if Modern UI is enabled for current user
- `isPageEnabled($page)`: Check if specific page's Modern UI is enabled
- `getAllFlags()`: Get all feature flags for current user

**Logic Flow:**
1. Check master switch (`MODERN_UI_ENABLED`)
2. Check if user is in beta list
3. Check rollout percentage using deterministic hash
4. Check page-specific flags

#### 3. Middleware (`app/Http/Middleware/InjectFeatureFlags.php`)

Injects feature flags into request attributes for easy access.

#### 4. API Controller (`app/Http/Controllers/Api/FeatureFlagController.php`)

Provides REST API endpoint for frontend to fetch feature flags:

```
GET /api/feature-flags
```

Response:
```json
{
  "success": true,
  "data": {
    "modern_ui": true,
    "modern_ui_pages": {
      "dashboard": true,
      "members": true,
      // ...
    }
  }
}
```

### Frontend Components

#### 1. React Hook (`resources/js/hooks/useFeatureFlag.ts`)

Provides hooks to access feature flags in React components:

```typescript
// Check if Modern UI is enabled
const isModernUI = useFeatureFlag('modern_ui');

// Check nested flags
const isDashboardEnabled = useFeatureFlag('modern_ui_pages.dashboard');

// Get all flags
const flags = useFeatureFlags();

// Check if Modern UI is enabled for specific page
const isEnabled = useModernUIPage('dashboard');
```

#### 2. Feature Flag Context (`resources/js/contexts/FeatureFlagContext.tsx`)

Provides feature flags via React Context:

```typescript
<FeatureFlagProvider>
  <App />
</FeatureFlagProvider>

// In components:
const { modern_ui, modern_ui_pages } = useFeatureFlagContext();
```

#### 3. Feature Flag Toggle Component (`resources/js/components/ui/feature-flag-toggle.tsx`)

UI component for administrators to view feature flag status:

- Displays current status (Enabled/Disabled)
- Shows page-specific settings
- Provides instructions for changing flags
- Integrated into Settings page

## Environment Variables

### Required Variables

```bash
# Master switch - must be true for any users to see new UI
MODERN_UI_ENABLED=false

# Specific user IDs for beta testing (comma-separated)
MODERN_UI_BETA_USERS=

# Percentage of remaining users to show new UI (0-100)
MODERN_UI_ROLLOUT_PERCENTAGE=0
```

### Optional Per-Page Variables

```bash
# Control individual pages (defaults to true if MODERN_UI_ENABLED=true)
MODERN_UI_DASHBOARD_ENABLED=true
MODERN_UI_MEMBERS_ENABLED=true
MODERN_UI_SMALL_GROUPS_ENABLED=true
MODERN_UI_LEADERSHIP_ENABLED=true
MODERN_UI_EVENTS_ENABLED=true
MODERN_UI_FINANCE_ENABLED=true
MODERN_UI_REPORTS_ENABLED=true
MODERN_UI_ACTIVITY_LOG_ENABLED=true
MODERN_UI_USERS_ENABLED=true
MODERN_UI_SETTINGS_ENABLED=true
```

## Usage Examples

### Example 1: Beta Testing with Specific Users

```bash
MODERN_UI_ENABLED=true
MODERN_UI_BETA_USERS=1,5,12,23,45
MODERN_UI_ROLLOUT_PERCENTAGE=0
```

Only users with IDs 1, 5, 12, 23, and 45 will see the new UI.

### Example 2: Gradual Rollout to 25% of Users

```bash
MODERN_UI_ENABLED=true
MODERN_UI_BETA_USERS=
MODERN_UI_ROLLOUT_PERCENTAGE=25
```

Approximately 25% of all users will see the new UI (deterministic based on user ID).

### Example 3: Beta Users + 10% Rollout

```bash
MODERN_UI_ENABLED=true
MODERN_UI_BETA_USERS=1,2,3
MODERN_UI_ROLLOUT_PERCENTAGE=10
```

Users 1, 2, and 3 always see new UI, plus 10% of other users.

### Example 4: Enable Only Specific Pages

```bash
MODERN_UI_ENABLED=true
MODERN_UI_ROLLOUT_PERCENTAGE=100
MODERN_UI_FINANCE_ENABLED=false
MODERN_UI_USERS_ENABLED=false
```

All users see new UI except for Finance and Users pages.

## Rollout Strategy

### Phase 1: Beta Testing (Week 1)

```bash
MODERN_UI_ENABLED=true
MODERN_UI_BETA_USERS=1,5,12,23,45  # 5-10 trusted users
MODERN_UI_ROLLOUT_PERCENTAGE=0
```

**Actions:**
- Monitor for errors
- Collect feedback
- Fix critical bugs

### Phase 2: Limited Rollout (Week 2)

```bash
MODERN_UI_ENABLED=true
MODERN_UI_BETA_USERS=
MODERN_UI_ROLLOUT_PERCENTAGE=10
```

**Actions:**
- Monitor error rates
- Check performance metrics
- Address user complaints

### Phase 3: Expanded Rollout (Week 3)

```bash
MODERN_UI_ENABLED=true
MODERN_UI_ROLLOUT_PERCENTAGE=50
```

**Actions:**
- Validate stability
- Ensure performance is acceptable
- Prepare for full rollout

### Phase 4: Full Rollout (Week 4)

```bash
MODERN_UI_ENABLED=true
MODERN_UI_ROLLOUT_PERCENTAGE=100
```

**Actions:**
- Monitor closely for first 48 hours
- Be ready to rollback if needed
- Announce to all users

## Rollback Procedure

### Immediate Rollback (Emergency)

1. Update `.env`:
   ```bash
   MODERN_UI_ENABLED=false
   ```

2. Clear cache:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

3. Verify rollback:
   - Open application in browser
   - Hard refresh (Ctrl+Shift+R)
   - Confirm old UI is showing

### Partial Rollback

Reduce rollout percentage:
```bash
MODERN_UI_ROLLOUT_PERCENTAGE=10  # Reduce from 50% to 10%
```

Or disable specific pages:
```bash
MODERN_UI_FINANCE_ENABLED=false
```

## Monitoring

### Key Metrics to Track

1. **Error Rate**: Check Laravel logs for errors
   ```bash
   tail -f storage/logs/laravel.log
   ```

2. **User Feedback**: Monitor support tickets and complaints

3. **Performance**: Track page load times and API response times

4. **Adoption**: Monitor percentage of users seeing new UI

### Logging

The feature flag helper logs when Modern UI is enabled:

```
[INFO] Modern UI enabled for beta user (user_id: 5)
[DEBUG] Modern UI enabled via rollout percentage (user_id: 123, percentage: 25, user_hash_mod: 18)
```

## Testing

### Unit Tests

Run feature flag tests:

```bash
npm test -- useFeatureFlag.test.ts
npm test -- feature-flag-toggle.test.tsx
```

### Manual Testing

1. **Test Beta Users:**
   - Set `MODERN_UI_BETA_USERS=YOUR_USER_ID`
   - Login and verify new UI shows
   - Login as different user and verify old UI shows

2. **Test Rollout Percentage:**
   - Set `MODERN_UI_ROLLOUT_PERCENTAGE=50`
   - Login with multiple users
   - Verify approximately 50% see new UI
   - Verify same user always sees same version

3. **Test Page-Specific Flags:**
   - Set `MODERN_UI_FINANCE_ENABLED=false`
   - Verify Finance page shows old UI
   - Verify other pages show new UI

## Troubleshooting

### Issue: Feature flag changes not taking effect

**Solution:**
```bash
php artisan config:clear
php artisan cache:clear
```

### Issue: All users see old UI even with flag enabled

**Possible causes:**
- `MODERN_UI_ENABLED=false` (check .env)
- Cache not cleared
- User not authenticated

**Solution:**
1. Verify .env settings
2. Clear cache
3. Check if user is logged in

### Issue: Feature flags not available in frontend

**Possible causes:**
- Blade template not injecting flags
- JavaScript not loading

**Solution:**
1. Check `resources/views/app.blade.php` has feature flag script
2. Check browser console for `window.__FEATURE_FLAGS__`
3. Verify no JavaScript errors

## Best Practices

1. **Start Small**: Begin with beta users before wider rollout
2. **Monitor Closely**: Watch error logs and user feedback
3. **Be Ready to Rollback**: Have rollback procedure ready
4. **Communicate**: Inform users about changes
5. **Test Thoroughly**: Test all scenarios before production
6. **Document Changes**: Keep track of rollout progress
7. **Gradual Increase**: Increase rollout percentage slowly (10% → 25% → 50% → 100%)

## Security Considerations

1. **User ID Hashing**: Uses deterministic hash to ensure consistent experience
2. **No Client-Side Control**: Feature flags are controlled server-side only
3. **Authentication Required**: Feature flags only work for authenticated users
4. **Admin Access**: Only administrators should modify .env file

## Future Enhancements

Potential improvements to the feature flag system:

1. **Database-Driven Flags**: Store flags in database for dynamic updates
2. **Admin UI**: Web interface to toggle flags without editing .env
3. **A/B Testing**: Track metrics for users on old vs new UI
4. **Scheduled Rollouts**: Automatically increase rollout percentage over time
5. **User Preferences**: Allow users to opt-in/opt-out of new UI
6. **Feature Flag Analytics**: Dashboard showing adoption rates and metrics

## Related Documentation

- [Migration Guide](./MIGRATION_GUIDE.md) - Complete migration instructions
- [Design Document](./design.md) - UI/UX design specifications
- [User Guide](./USER_GUIDE.md) - End-user documentation
- [Component Documentation](../../resources/js/components/ui/COMPONENT_API_DOCUMENTATION.md)

## Support

For issues or questions about the feature flag system:

1. Check this documentation
2. Review [Migration Guide](./MIGRATION_GUIDE.md)
3. Check Laravel logs: `storage/logs/laravel.log`
4. Check browser console for JavaScript errors
5. Contact development team

---

**Last Updated**: Task 28.1 Implementation  
**Version**: 1.0  
**Maintained By**: Development Team
