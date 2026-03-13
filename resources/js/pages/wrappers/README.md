# Page Wrapper Components

## Overview

Page wrapper components provide feature flag-based UI switching between modern and legacy UI implementations. These wrappers enable controlled rollout of the Modern UI/UX redesign on a per-page basis.

## Architecture

Each wrapper component:
1. Uses the `useModernUIPage(pageName)` hook to check if Modern UI is enabled for that specific page
2. Renders the modern UI component when the feature flag is enabled
3. Renders a legacy UI placeholder when the feature flag is disabled

## Available Wrappers

- `DashboardWrapper` - Dashboard page
- `MembersWrapper` - Members management page
- `SmallGroupsWrapper` - Small Groups page
- `LeadershipWrapper` - Leadership page
- `EventsWrapper` - Events management page
- `FinanceWrapper` - Finance management page
- `ReportsWrapper` - Reports page
- `ActivityLogWrapper` - Activity Log page
- `UsersWrapper` - Users management page
- `SettingsWrapper` - Settings page

## Usage

### Basic Usage

Import and use a wrapper component in your routing configuration:

```typescript
import { DashboardWrapper } from './pages/wrappers';

// In your router
<Route path="/dashboard" component={DashboardWrapper} />
```

### How It Works

```typescript
const DashboardWrapper: React.FC = () => {
  // Check if Modern UI is enabled for this page
  const useModernUI = useModernUIPage('dashboard');

  if (useModernUI) {
    // Render new modern UI Dashboard
    return <Dashboard />;
  }

  // Render old UI Dashboard (or placeholder)
  return <LegacyDashboard />;
};
```

## Feature Flag Configuration

Feature flags are controlled via environment variables in `.env`:

```bash
# Master switch - must be true for any users to see new UI
MODERN_UI_ENABLED=true

# Specific user IDs for beta testing (comma-separated)
MODERN_UI_BETA_USERS=1,5,12,23,45

# Percentage of remaining users to show new UI (0-100)
MODERN_UI_ROLLOUT_PERCENTAGE=25

# Per-page flags (optional, defaults to true if MODERN_UI_ENABLED=true)
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

## Rollout Strategy

### Phase 1: Beta Testing
```bash
MODERN_UI_ENABLED=true
MODERN_UI_BETA_USERS=1,5,12
MODERN_UI_ROLLOUT_PERCENTAGE=0
```
Only specified beta users see the new UI.

### Phase 2: Limited Rollout (10%)
```bash
MODERN_UI_ENABLED=true
MODERN_UI_BETA_USERS=
MODERN_UI_ROLLOUT_PERCENTAGE=10
```
10% of all users see the new UI (deterministic based on user ID).

### Phase 3: Expanded Rollout (50%)
```bash
MODERN_UI_ENABLED=true
MODERN_UI_ROLLOUT_PERCENTAGE=50
```
50% of users see the new UI.

### Phase 4: Full Rollout
```bash
MODERN_UI_ENABLED=true
MODERN_UI_ROLLOUT_PERCENTAGE=100
```
All users see the new UI.

### Selective Page Rollout
```bash
MODERN_UI_ENABLED=true
MODERN_UI_ROLLOUT_PERCENTAGE=100
# Disable specific pages
MODERN_UI_FINANCE_ENABLED=false
MODERN_UI_USERS_ENABLED=false
```
All users see new UI except for Finance and Users pages.

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

3. Verify rollback in browser (hard refresh: Ctrl+Shift+R)

### Partial Rollback

Reduce rollout percentage:
```bash
MODERN_UI_ROLLOUT_PERCENTAGE=10  # Reduce from 50% to 10%
```

Or disable specific pages:
```bash
MODERN_UI_FINANCE_ENABLED=false
```

## Testing

### Unit Tests

Run wrapper tests:
```bash
npm test -- PageWrappers.test.tsx
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

## Implementation Details

### Feature Flag Hook

The `useModernUIPage(page)` hook:
- Checks if Modern UI is globally enabled
- Checks if the specific page is enabled
- Returns `true` if both conditions are met
- Returns `false` otherwise

### Deterministic User Assignment

The system uses CRC32 hashing to ensure:
- Same user always sees the same version
- Even distribution across user base
- No database changes needed
- Predictable rollout behavior

### Legacy UI Placeholder

When Modern UI is disabled, wrappers currently show a placeholder message:
- Informs user they're viewing legacy UI
- Provides instructions to contact administrator
- Can be replaced with actual legacy components

## Migration Path

### Step 1: Implement Wrappers
✅ Create wrapper components for all pages

### Step 2: Update Routing
Replace direct page imports with wrapper imports in your router configuration.

**Before:**
```typescript
import Dashboard from './pages/Dashboard';
<Route path="/dashboard" component={Dashboard} />
```

**After:**
```typescript
import { DashboardWrapper } from './pages/wrappers';
<Route path="/dashboard" component={DashboardWrapper} />
```

### Step 3: Test Feature Flags
Test with beta users and gradual rollout.

### Step 4: Full Rollout
Enable for all users once stable.

### Step 5: Cleanup
After successful migration:
- Remove wrapper components
- Remove feature flag checks
- Use modern UI components directly
- Clean up environment variables

## Troubleshooting

### Issue: Feature flag changes not taking effect

**Solution:**
```bash
php artisan config:clear
php artisan cache:clear
```
Then hard refresh browser (Ctrl+Shift+R).

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

## Related Documentation

- [Feature Flag System](../../../.kiro/specs/modern-ui-ux-redesign/FEATURE_FLAG_SYSTEM.md) - Complete system documentation
- [Migration Guide](../../../.kiro/specs/modern-ui-ux-redesign/MIGRATION_GUIDE.md) - Step-by-step migration instructions
- [Design Document](../../../.kiro/specs/modern-ui-ux-redesign/design.md) - UI/UX design specifications
- [User Guide](../../../.kiro/specs/modern-ui-ux-redesign/USER_GUIDE.md) - End-user documentation

## Support

For issues or questions about page wrappers:

1. Check this documentation
2. Review [Feature Flag System](../../../.kiro/specs/modern-ui-ux-redesign/FEATURE_FLAG_SYSTEM.md)
3. Check Laravel logs: `storage/logs/laravel.log`
4. Check browser console for JavaScript errors
5. Contact development team

---

**Last Updated**: Task 28.2 Implementation  
**Version**: 1.0  
**Maintained By**: Development Team
