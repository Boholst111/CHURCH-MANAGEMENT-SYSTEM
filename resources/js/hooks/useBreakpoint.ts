import { useState, useEffect } from 'react'

/**
 * Breakpoint definitions matching Tailwind CSS defaults
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

/**
 * Hook to detect the current breakpoint
 * @returns Current breakpoint name
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'lg'
    
    const width = window.innerWidth
    if (width >= breakpoints['2xl']) return '2xl'
    if (width >= breakpoints.xl) return 'xl'
    if (width >= breakpoints.lg) return 'lg'
    if (width >= breakpoints.md) return 'md'
    return 'sm'
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let newBreakpoint: Breakpoint = 'sm'
      
      if (width >= breakpoints['2xl']) {
        newBreakpoint = '2xl'
      } else if (width >= breakpoints.xl) {
        newBreakpoint = 'xl'
      } else if (width >= breakpoints.lg) {
        newBreakpoint = 'lg'
      } else if (width >= breakpoints.md) {
        newBreakpoint = 'md'
      }
      
      setBreakpoint(newBreakpoint)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

/**
 * Hook to check if viewport is at or above a specific breakpoint
 * @param minBreakpoint - Minimum breakpoint to check
 * @returns True if viewport is at or above the breakpoint
 */
export function useMediaQuery(minBreakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= breakpoints[minBreakpoint]
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[minBreakpoint]}px)`)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Set initial value
    setMatches(mediaQuery.matches)

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [minBreakpoint])

  return matches
}

/**
 * Hook to check if viewport is mobile (below 'lg' breakpoint)
 * @returns True if viewport is mobile
 */
export function useIsMobile(): boolean {
  return !useMediaQuery('lg')
}

/**
 * Hook to check if viewport is tablet (between 'md' and 'lg')
 * @returns True if viewport is tablet
 */
export function useIsTablet(): boolean {
  const isMd = useMediaQuery('md')
  const isLg = useMediaQuery('lg')
  return isMd && !isLg
}

/**
 * Hook to check if viewport is desktop (at or above 'lg')
 * @returns True if viewport is desktop
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('lg')
}
