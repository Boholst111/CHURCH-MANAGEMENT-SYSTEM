import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes conditionally using clsx and tailwind-merge
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the relative luminance of a color
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Relative luminance value
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Converts hex color to RGB components
 * @param hex - Hex color string (e.g., "#ffffff" or "ffffff")
 * @returns RGB components or null if invalid
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Calculates the contrast ratio between two colors
 * Follows WCAG 2.1 guidelines for color contrast
 * @param color1 - First color in hex format
 * @param color2 - Second color in hex format
 * @returns Contrast ratio (1-21) or null if invalid colors
 */
export function calculateColorContrast(color1: string, color2: string): number | null {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) {
    return null
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Validates if color contrast meets WCAG standards
 * @param color1 - First color in hex format
 * @param color2 - Second color in hex format
 * @param level - WCAG level ('AA' or 'AAA')
 * @param size - Text size ('normal' or 'large')
 * @returns True if contrast meets the standard
 */
export function meetsWCAGContrast(
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const contrast = calculateColorContrast(color1, color2)
  if (contrast === null) return false

  const thresholds = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  }

  return contrast >= thresholds[level][size]
}

/**
 * Theme type definition
 */
export type Theme = 'light' | 'dark'

/**
 * Gets the current theme from localStorage or defaults to 'light'
 * @returns Current theme setting
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return 'light'
}

/**
 * Sets the theme and persists it to localStorage
 * @param theme - Theme to set
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('theme', theme)
  applyTheme(theme)
}

/**
 * Applies the theme to the document
 * Updates the data-theme attribute on the document element
 * @param theme - Theme to apply
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  
  document.documentElement.setAttribute('data-theme', theme)
  
  // Also add/remove dark class for Tailwind dark mode
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/**
 * Toggles between light and dark theme
 */
export function toggleTheme(): void {
  const current = getTheme()
  const next: Theme = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * 
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay (default: 300ms)
 * @returns Debounced function with cancel method
 * 
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   fetchSearchResults(query);
 * }, 300);
 * 
 * // Call the debounced function
 * debouncedSearch('search term');
 * 
 * // Cancel pending invocation
 * debouncedSearch.cancel();
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounced = function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args)
      timeoutId = null
    }, wait)
  } as T & { cancel: () => void }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounced
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 * The throttled function comes with a cancel method to cancel delayed invocations.
 * 
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to (default: 300ms)
 * @param options - Options object with leading and trailing flags
 * @returns Throttled function with cancel method
 * 
 * @example
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll event');
 * }, 100);
 * 
 * window.addEventListener('scroll', throttledScroll);
 * 
 * // Cancel pending invocation
 * throttledScroll.cancel();
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void } {
  const { leading = true, trailing = true } = options
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastCallTime = 0
  let lastArgs: Parameters<T> | null = null
  let lastThis: any = null
  let result: any

  const invokeFunc = (time: number) => {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = null
    lastThis = null
    lastCallTime = time
    result = func.apply(thisArg, args!)
    return result
  }

  const shouldInvoke = (time: number) => {
    const timeSinceLastCall = time - lastCallTime
    return lastCallTime === 0 || timeSinceLastCall >= wait
  }

  const trailingEdge = (time: number) => {
    timeoutId = null

    // Only invoke if we have `lastArgs` which means `throttled` was invoked
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = null
    lastThis = null
    return result
  }

  const timerExpired = () => {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer
    const timeSinceLastCall = time - lastCallTime
    const timeWaiting = wait - timeSinceLastCall
    timeoutId = setTimeout(timerExpired, timeWaiting)
  }

  const leadingEdge = (time: number) => {
    // Reset any `maxWait` timer
    lastCallTime = time
    // Start the timer for the trailing edge
    timeoutId = setTimeout(timerExpired, wait)
    // Invoke the leading edge
    return leading ? invokeFunc(time) : result
  }

  const throttled = function (this: any, ...args: Parameters<T>) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this

    if (isInvoking) {
      if (timeoutId === null) {
        return leadingEdge(time)
      }
    }
    if (timeoutId === null) {
      timeoutId = setTimeout(timerExpired, wait)
    }
    return result
  } as T & { cancel: () => void }

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastCallTime = 0
    lastArgs = null
    lastThis = null
  }

  return throttled
}
