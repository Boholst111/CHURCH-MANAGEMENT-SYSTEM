/**
 * Zustand stores for global state management
 * 
 * This module exports all Zustand stores used in the application:
 * - authStore: Authentication state (user, token, login/logout)
 * - themeStore: Theme state (light/dark mode)
 * - uiStore: UI state (sidebar, mobile menu)
 * 
 * Each store includes:
 * - State management with actions
 * - localStorage persistence where appropriate
 * - TypeScript types and selectors
 * - Initialization helpers
 */

export {
  useAuthStore,
  authSelectors,
  type User,
  type AuthStore,
} from './authStore';

export {
  useThemeStore,
  themeSelectors,
  type Theme,
  type ThemeStore,
} from './themeStore';

export {
  useUIStore,
  uiSelectors,
  initializeMobileDetection,
  type UIStore,
} from './uiStore';
