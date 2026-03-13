import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useThrottle, useThrottledCallback } from '../useThrottle'

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('should throttle value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    )

    expect(result.current).toBe('initial')

    // First update - should apply immediately
    rerender({ value: 'first', delay: 300 })
    await waitFor(() => {
      expect(result.current).toBe('first')
    })

    // Rapid updates within throttle period
    rerender({ value: 'second', delay: 300 })
    rerender({ value: 'third', delay: 300 })
    
    // Should still be 'first' during throttle period
    expect(result.current).toBe('first')

    // Advance time to allow trailing update
    act(() => {
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(result.current).toBe('third')
    })
  })

  it('should work with different data types', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 300),
      { initialProps: { value: 0 } }
    )

    expect(result.current).toBe(0)

    rerender({ value: 42 })
    await waitFor(() => {
      expect(result.current).toBe(42)
    })
  })

  it('should cleanup on unmount', () => {
    const { unmount } = renderHook(() => useThrottle('value', 300))
    
    unmount()
    
    // Should not throw or cause issues
    act(() => {
      jest.advanceTimersByTime(300)
    })
  })

  it('should use default delay of 300ms', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'first' })
    await waitFor(() => {
      expect(result.current).toBe('first')
    })

    rerender({ value: 'second' })
    expect(result.current).toBe('first')

    act(() => {
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(result.current).toBe('second')
    })
  })
})

describe('useThrottledCallback', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should throttle callback execution', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useThrottledCallback(callback, 300))

    // First call - immediate
    result.current('test1')
    expect(callback).toHaveBeenCalledWith('test1')
    expect(callback).toHaveBeenCalledTimes(1)

    // Subsequent calls within throttle period
    result.current('test2')
    result.current('test3')
    expect(callback).toHaveBeenCalledTimes(1)

    // Advance time for trailing call
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(callback).toHaveBeenCalledWith('test3')
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should cancel pending execution', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useThrottledCallback(callback, 300))

    result.current('test1')
    expect(callback).toHaveBeenCalledTimes(1)

    result.current('test2')
    result.current.cancel()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should pass multiple arguments correctly', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useThrottledCallback(callback, 300))

    result.current('arg1', 'arg2', 123)
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should work with leading: false option', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useThrottledCallback(callback, 300, { leading: false })
    )

    result.current('test')
    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(callback).toHaveBeenCalledWith('test')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should work with trailing: false option', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useThrottledCallback(callback, 300, { trailing: false })
    )

    result.current('test1')
    expect(callback).toHaveBeenCalledWith('test1')
    expect(callback).toHaveBeenCalledTimes(1)

    result.current('test2')
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Should not call on trailing edge
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should update callback when dependencies change', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    
    const { result, rerender } = renderHook(
      ({ cb, deps }) => useThrottledCallback(cb, 300, {}, deps),
      { initialProps: { cb: callback1, deps: [1] } }
    )

    result.current('test1')
    expect(callback1).toHaveBeenCalledWith('test1')

    // Change dependencies - should create new throttled function
    rerender({ cb: callback2, deps: [2] })
    
    result.current('test2')
    expect(callback2).toHaveBeenCalledWith('test2')
  })

  it('should cleanup on unmount', () => {
    const callback = jest.fn()
    const { result, unmount } = renderHook(() => useThrottledCallback(callback, 300))

    result.current('test1')
    expect(callback).toHaveBeenCalledTimes(1)

    result.current('test2')
    unmount()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Should not call trailing edge after unmount
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should use default delay of 300ms', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useThrottledCallback(callback))

    result.current('test1')
    expect(callback).toHaveBeenCalledTimes(1)

    result.current('test2')
    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(callback).toHaveBeenCalledWith('test2')
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should handle rapid successive calls correctly', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useThrottledCallback(callback, 300))

    // First call - immediate
    result.current('call1')
    expect(callback).toHaveBeenCalledTimes(1)

    // Rapid calls within throttle period (without advancing time)
    for (let i = 2; i <= 10; i++) {
      result.current(`call${i}`)
    }

    // Should still be 1 call (leading edge)
    expect(callback).toHaveBeenCalledTimes(1)

    // Wait for trailing edge
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(callback).toHaveBeenCalledWith('call10')
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should maintain stable reference when options do not change', () => {
    const callback = jest.fn()
    const { result, rerender } = renderHook(
      ({ delay, options }) => useThrottledCallback(callback, delay, options),
      { initialProps: { delay: 300, options: { leading: true } } }
    )

    const firstRef = result.current
    rerender({ delay: 300, options: { leading: true } })
    const secondRef = result.current

    expect(firstRef).toBe(secondRef)
  })
})
