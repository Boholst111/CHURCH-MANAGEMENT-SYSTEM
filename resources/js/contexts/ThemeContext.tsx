import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Theme type: 'light' or 'dark'
 */
export type Theme = 'light' | 'dark';

interface ThemeContextType {
  /** Current theme setting ('light' or 'dark') */
  theme: Theme;
  /** Toggle between light and dark themes */
  toggleTheme: () => void;
  /** Set a specific theme */
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

/**
 * Apply theme to the document
 * @param theme - The theme to apply
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
 * ThemeProvider component that manages theme state and persistence
 * 
 * Features:
 * - Supports 'light' and 'dark' themes
 * - Persists theme preference to localStorage
 * - Applies theme to document root for CSS styling
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  // Initialize theme from localStorage or default
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return defaultTheme;
  });

  // Apply theme when it changes
  useEffect(() => {
    applyThemeToDocument(theme);
    
    // Persist theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * Set a specific theme
   * @param newTheme - Theme to set ('light' or 'dark')
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * @throws Error if used outside ThemeProvider
 * @returns Theme context with current theme and control functions
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
