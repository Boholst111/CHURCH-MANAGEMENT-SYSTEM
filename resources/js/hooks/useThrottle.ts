import { useEffect, useState, useRef, useMemo } from 'react'
import { throttle } from '@/lib/utils'

/**
 * Hook that throttles a value
 * 
 * @param value - The value to throttle
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns The throttled value
 * 
 * @example
 * const [scrollPosition, setScrollPosition] = useState(0);
 * const throttledScrollPosition = useThrottle(scrollPosition, 100);
 * 
 * useEffect(() => {
 *   // This will only run at most once every 100ms
 *   updateScrollIndicator(throttledScrollPosition);
 * }, [throttledScrollPosition]);
 */
export function useThrottle<T>(value: T, delay: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const throttledSetValue = useMemo(
    () => throttle((newValue: T) => setThrottledValue(newValue), delay),
    [delay]
  )

  useEffect(() => {
    throttledSetValue(value)
  }, [value, throttledSetValue])

  useEffect(() => {
    return () => {
      throttledSetValue.cancel()
    }
  }, [throttledSetValue])

  return throttledValue
}

/**
 * Hook that returns a throttled callback function
 * 
 * @param callback - The callback function to throttle
 * @param delay - The delay in milliseconds (default: 300ms)
 * @param options - Options object with leading and trailing flags
 * @param deps - Dependency array for the callback
 * @returns Throttled callback function with cancel method
 * 
 * @example
 * const throttledScroll = useThrottledCallback(
 *   () => {
 *     console.log('Scroll event');
 *   },
 *   100,
 *   { leading: true, trailing: false },
 *   []
 * );
 * 
 * window.addEventListener('scroll', throttledScroll);
 * 
 * // Cancel pending invocation
 * throttledScroll.cancel();
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300,
  options: { leading?: boolean; trailing?: boolean } = {},
  deps: React.DependencyList = []
): T & { cancel: () => void } {
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Create throttled function
  const throttledCallback = useMemo(() => {
    const func = (...args: Parameters<T>) => {
      callbackRef.current(...args)
    }
    return throttle(func as T, delay, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, options.leading, options.trailing, ...deps])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      throttledCallback.cancel()
    }
  }, [throttledCallback])

  return throttledCallback
}
