import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Theme type: 'light' or 'dark'
 */
export type Theme = 'light' | 'dark';

/**
 * Theme store state
 */
interface ThemeState {
  theme: Theme;
}

/**
 * Theme store actions
 */
interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Combined theme store type
 */
export type ThemeStore = ThemeState & ThemeActions;

/**
 * Apply theme to the document
 */
const applyThemeToDocument = (theme: Theme): void => {
  const root = document.documentElement;
  
  // Remove both theme classes
  root.classList.remove('light', 'dark');
  
  // Add the theme class
  root.classList.add(theme);
  
  // Also set data-theme attribute for CSS variables
  root.setAttribute('data-theme', theme);
};

/**
 * Theme store with localStorage persistence
 * 
 * Features:
 * - Supports 'light' and 'dark' themes
 * - Persists theme preference to localStorage
 * - Automatically applies theme to document
 * - Provides toggle and set theme actions
 * 
 * @example
 * ```tsx
 * const { theme, setTheme, toggleTheme } = useThemeStore();
 * 
 * // Set specific theme
 * setTheme('dark');
 * 
 * // Toggle between light and dark
 * toggleTheme();
 * 
 * // Get current theme
 * console.log(theme); // 'light' or 'dark'
 * ```
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'light',

      // Actions
      setTheme: (theme) => {
        set({ theme });
        applyThemeToDocument(theme);
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
        
        set({ theme: newTheme });
        applyThemeToDocument(newTheme);
      },
    }),
    {
      name: 'theme-storage', // localStorage key
      partialize: (state) => ({
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, apply the theme to the document
        if (state) {
          applyThemeToDocument(state.theme);
        }
      },
    }
  )
);

/**
 * Selectors for accessing specific parts of theme state
 */
export const themeSelectors = {
  theme: (state: ThemeStore) => state.theme,
  isDark: (state: ThemeStore) => state.theme === 'dark',
  isLight: (state: ThemeStore) => state.theme === 'light',
};
