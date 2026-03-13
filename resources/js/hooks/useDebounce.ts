import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { debounce } from '@/lib/utils'

/**
 * Hook that debounces a value
 * 
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns The debounced value
 * 
 * @example
 * const [searchQuery, setSearchQuery] = useState('');
 * const debouncedSearchQuery = useDebounce(searchQuery, 300);
 * 
 * useEffect(() => {
 *   // This will only run 300ms after the user stops typing
 *   fetchSearchResults(debouncedSearchQuery);
 * }, [debouncedSearchQuery]);
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook that returns a debounced callback function
 * 
 * @param callback - The callback function to debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @param deps - Dependency array for the callback
 * @returns Debounced callback function with cancel method
 * 
 * @example
 * const debouncedSearch = useDebouncedCallback(
 *   (query: string) => {
 *     fetchSearchResults(query);
 *   },
 *   300,
 *   []
 * );
 * 
 * // Call the debounced function
 * debouncedSearch('search term');
 * 
 * // Cancel pending invocation
 * debouncedSearch.cancel();
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300,
  deps: React.DependencyList = []
): T & { cancel: () => void } {
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Create debounced function
  const debouncedCallback = useMemo(() => {
    const func = (...args: Parameters<T>) => {
      callbackRef.current(...args)
    }
    return debounce(func as T, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedCallback.cancel()
    }
  }, [debouncedCallback])

  return debouncedCallback
}
