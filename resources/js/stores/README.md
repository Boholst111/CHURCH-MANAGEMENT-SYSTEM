# Zustand Stores

This directory contains Zustand stores for global state management in the Church Management System.

## Overview

Zustand is a lightweight state management solution that provides a simple API with minimal boilerplate. These stores manage global state that doesn't fit well in React Query (like UI state, theme preferences, and authentication state).

## Available Stores

### 1. Auth Store (`authStore.ts`)

Manages authentication state including user data, tokens, and login/logout actions.

**State:**
- `user`: Current user object (id, name, email, role)
- `token`: Authentication token
- `isAuthenticated`: Boolean indicating if user is logged in
- `loading`: Loading state for auth operations

**Actions:**
- `login(user, token)`: Log in a user
- `logout()`: Log out the current user
- `setUser(user)`: Update user data
- `setToken(token)`: Update auth token
- `setLoading(loading)`: Update loading state
- `updateUser(updates)`: Partially update user data

**Persistence:** User, token, and isAuthenticated are persisted to localStorage

**Usage:**
```tsx
import { useAuthStore, authSelectors } from '@/stores';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  // Or use selectors for better performance
  const user = useAuthStore(authSelectors.user);
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={() => login(userData, token)}>Login</button>
      )}
    </div>
  );
}
```

### 2. Theme Store (`themeStore.ts`)

Manages theme state for light/dark mode switching.

**State:**
- `theme`: Current theme setting ('light', 'dark', or 'auto')
- `resolvedTheme`: Actual theme being displayed ('light' or 'dark')

**Actions:**
- `setTheme(theme)`: Set a specific theme
- `toggleTheme()`: Toggle between light and dark
- `setResolvedTheme(resolvedTheme)`: Update resolved theme (used internally)

**Persistence:** Theme preference is persisted to localStorage

**Initialization:**
```tsx
import { initializeThemeListener } from '@/stores';

// In your app initialization (e.g., App.tsx)
useEffect(() => {
  const cleanup = initializeThemeListener();
  return cleanup;
}, []);
```

**Usage:**
```tsx
import { useThemeStore, themeSelectors } from '@/stores';

function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme, setTheme } = useThemeStore();
  
  // Or use selectors
  const isDark = useThemeStore(themeSelectors.isDark);
  
  return (
    <button onClick={toggleTheme}>
      {resolvedTheme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

### 3. UI Store (`uiStore.ts`)

Manages UI state like sidebar and mobile menu visibility.

**State:**
- `sidebarOpen`: Whether sidebar is open (desktop)
- `mobileMenuOpen`: Whether mobile menu is open
- `isMobile`: Whether viewport is mobile size

**Actions:**
- `setSidebarOpen(open)`: Set sidebar open state
- `toggleSidebar()`: Toggle sidebar
- `setMobileMenuOpen(open)`: Set mobile menu open state
- `toggleMobileMenu()`: Toggle mobile menu
- `closeMobileMenu()`: Close mobile menu
- `setIsMobile(isMobile)`: Update mobile detection (used internally)

**Persistence:** Only sidebar preference is persisted to localStorage

**Initialization:**
```tsx
import { initializeMobileDetection } from '@/stores';

// In your app initialization (e.g., App.tsx)
useEffect(() => {
  const cleanup = initializeMobileDetection(1024); // breakpoint in pixels
  return cleanup;
}, []);
```

**Usage:**
```tsx
import { useUIStore, uiSelectors } from '@/stores';

function Sidebar() {
  const { sidebarOpen, toggleSidebar, isMobile } = useUIStore();
  
  // Or use selectors
  const sidebarOpen = useUIStore(uiSelectors.sidebarOpen);
  
  return (
    <aside className={sidebarOpen ? 'open' : 'closed'}>
      <button onClick={toggleSidebar}>Toggle</button>
      {/* Sidebar content */}
    </aside>
  );
}
```

## Selectors

Each store exports selectors for better performance when you only need specific parts of the state:

```tsx
// Instead of this (re-renders on any state change)
const { user, token, isAuthenticated } = useAuthStore();

// Use this (only re-renders when user changes)
const user = useAuthStore(authSelectors.user);
```

## Testing

All stores have comprehensive test coverage in the `__tests__` directory:
- `authStore.test.ts`: Tests for authentication store
- `themeStore.test.ts`: Tests for theme store
- `uiStore.test.ts`: Tests for UI store

Run tests with:
```bash
npm test stores
```

## Best Practices

1. **Use selectors** for better performance when you only need specific state
2. **Initialize listeners** in your app root (App.tsx) for theme and mobile detection
3. **Don't overuse** - Use React Query for server state, Zustand for UI/client state
4. **Keep stores focused** - Each store has a single responsibility
5. **Use TypeScript** - All stores are fully typed for better DX

## Migration from Context

If you're migrating from React Context:

**Before (Context):**
```tsx
const { user, login, logout } = useAuth();
```

**After (Zustand):**
```tsx
const { user, login, logout } = useAuthStore();
```

The API is intentionally similar to make migration easier!

## Architecture

```
stores/
├── authStore.ts          # Authentication state
├── themeStore.ts         # Theme state
├── uiStore.ts            # UI state
├── index.ts              # Exports all stores
├── __tests__/            # Test files
│   ├── authStore.test.ts
│   ├── themeStore.test.ts
│   └── uiStore.test.ts
└── README.md             # This file
```

## Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand Persist Middleware](https://github.com/pmndrs/zustand#persist-middleware)
- [Design Document](/.kiro/specs/modern-ui-ux-redesign/design.md)
