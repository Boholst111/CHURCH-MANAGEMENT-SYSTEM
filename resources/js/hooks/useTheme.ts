import { useState, useEffect } from 'react'
import { getTheme, setTheme as setThemeUtil, applyTheme, type Theme } from '../lib/utils'

/**
 * Hook for managing theme state and persistence
 * @returns Theme state and setter function
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getTheme())

  useEffect(() => {
    // Apply theme on mount
    applyTheme(theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    setThemeUtil(newTheme)
  }

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
