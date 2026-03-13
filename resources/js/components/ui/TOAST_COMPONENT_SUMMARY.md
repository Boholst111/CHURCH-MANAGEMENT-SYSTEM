# Toast Notification System - Implementation Summary

## Overview

The Toast notification system provides user feedback for actions, errors, and success messages across the application. It features four variants (success, error, warning, info), configurable duration, action buttons, and smooth animations.

## Components

### 1. Toast Component (`toast.tsx`)
- **Location**: `resources/js/components/ui/toast.tsx`
- **Purpose**: Individual toast notification with icon, message, and optional action button
- **Features**:
  - Four variants: success, error, warning, info
  - Semantic color coding
  - Optional action button
  - Manual close button
  - Entrance animations
  - Accessible with ARIA attributes

### 2. ToastContext (`ToastContext.tsx`)
- **Location**: `resources/js/contexts/ToastContext.tsx`
- **Purpose**: Global toast state management and provider
- **Features**:
  - `showToast(type, message, options?)` - Display a toast
  - `removeToast(id)` - Manually dismiss a toast
  - Auto-dismiss with configurable duration
  - Multiple toasts stacking

### 3. ToastContainer
- **Location**: `resources/js/components/ui/toast.tsx`
- **Purpose**: Container for displaying multiple toasts
- **Features**:
  - Fixed positioning in top-right corner
  - Vertical stacking with spacing
  - High z-index for visibility

## Usage

### Basic Usage

```tsx
import { useToast } from '../../contexts/ToastContext';

const MyComponent = () => {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast('success', 'Operation completed successfully!');
  };

  const handleError = () => {
    showToast('error', 'An error occurred. Please try again.');
  };

  const handleWarning = () => {
    showToast('warning', 'Warning: This action cannot be undone.');
  };

  const handleInfo = () => {
    showToast('info', 'Here is some helpful information.');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleWarning}>Warning</button>
      <button onClick={handleInfo}>Info</button>
    </div>
  );
};
```

### With Action Button

```tsx
showToast('error', 'Failed to save changes.', {
  action: {
    label: 'Retry',
    onClick: () => {
      // Retry the operation
      saveChanges();
    },
  },
});
```

### Custom Duration

```tsx
// Auto-dismiss after 2 seconds
showToast('info', 'Quick message', { duration: 2000 });

// Auto-dismiss after 10 seconds
showToast('success', 'Longer message', { duration: 10000 });

// Persistent toast (no auto-dismiss)
showToast('warning', 'Important message', { duration: 0 });
```

### Real-World Examples

```tsx
// Profile update success
showToast('success', 'Profile updated successfully', { duration: 3000 });

// Connection error with retry
showToast('error', 'Failed to connect to server', {
  action: {
    label: 'Retry',
    onClick: () => retryConnection(),
  },
  duration: 0, // Don't auto-dismiss
});

// Session warning
showToast('warning', 'Your session will expire in 5 minutes', {
  action: {
    label: 'Extend Session',
    onClick: () => extendSession(),
  },
  duration: 0,
});

// Feature announcement
showToast('info', 'New features are available!', {
  action: {
    label: 'Learn More',
    onClick: () => openFeatureGuide(),
  },
  duration: 8000,
});
```

## API Reference

### `showToast(type, message, options?)`

**Parameters:**
- `type`: `'success' | 'error' | 'warning' | 'info'` - Toast variant
- `message`: `string` - Message to display
- `options?`: `ToastOptions` - Optional configuration
  - `duration?`: `number` - Auto-dismiss duration in milliseconds (default: 5000, 0 = no auto-dismiss)
  - `action?`: `ToastAction` - Optional action button
    - `label`: `string` - Button label
    - `onClick`: `() => void` - Click handler

### `removeToast(id)`

**Parameters:**
- `id`: `string` - Toast ID to remove

Manually dismisses a specific toast. Usually not needed as toasts can be dismissed by clicking the close button or auto-dismiss.

## Styling

### Color Variants

| Variant | Background | Border | Text | Icon |
|---------|-----------|--------|------|------|
| Success | `bg-success-50` | `border-success-200` | `text-success-900` | `text-success-600` |
| Error | `bg-error-50` | `border-error-200` | `text-error-900` | `text-error-600` |
| Warning | `bg-warning-50` | `border-warning-200` | `text-warning-900` | `text-warning-600` |
| Info | `bg-info-50` | `border-info-200` | `text-info-900` | `text-info-600` |

### Positioning

- **Container**: Fixed at `top-4 right-4` (16px from top and right)
- **Z-Index**: `z-50` for high visibility
- **Max Width**: `max-w-md` (448px)
- **Spacing**: `space-y-2` (8px vertical gap between toasts)

### Animations

- **Entrance**: `animate-in slide-in-from-right-5 fade-in duration-300`
- **Exit**: Handled by React state removal (instant)

## Accessibility

- **Role**: `role="alert"` for screen reader announcements
- **ARIA Live**: `aria-live="polite"` for non-intrusive announcements
- **Close Button**: `aria-label="Close notification"` for screen readers
- **Keyboard**: Close button is keyboard accessible

## Testing

### Unit Tests
- **Location**: `resources/js/components/ui/__tests__/toast.test.tsx`
- **Coverage**: 16 tests covering all variants, actions, durations, and accessibility

### Test Coverage
- ✅ All four toast variants (success, error, warning, info)
- ✅ Action buttons
- ✅ Configurable duration
- ✅ Persistent toasts (duration: 0)
- ✅ Auto-dismissal
- ✅ Manual dismissal
- ✅ Multiple toasts stacking
- ✅ Accessibility attributes
- ✅ Proper styling and positioning

## Integration

The Toast system is integrated into the application through the `ToastProvider`:

```tsx
// In your root component (e.g., App.tsx)
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      {/* Your app components */}
    </ToastProvider>
  );
}
```

## Design Reference

- **Design Document**: `.kiro/specs/modern-ui-ux-redesign/design.md` - Error Handling section
- **Task**: 4.3 Implement Toast notification system
- **Status**: ✅ Complete

## Features Implemented

✅ Create Toast component with variants (success, error, warning, info)
✅ Implement toast manager for showing/hiding toasts
✅ Support action buttons in toasts
✅ Add auto-dismiss with configurable duration
✅ Position toasts in top-right corner with stacking
✅ Animate toast entrance and exit
✅ Accessibility with ARIA attributes
✅ Comprehensive unit tests

## Next Steps

The Toast notification system is ready for use across the application. It can be used in:
- Form submissions (success/error feedback)
- API operations (loading/success/error states)
- User actions (confirmations, warnings)
- System notifications (updates, announcements)

## Example File

See `resources/js/components/ui/toast.example.tsx` for a comprehensive demonstration of all toast features and use cases.
