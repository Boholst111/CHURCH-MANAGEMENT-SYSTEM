import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useDebounce, useDebouncedCallback } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    )

    expect(result.current).toBe('initial')

    // Update value
    rerender({ value: 'updated', delay: 300 })
    expect(result.current).toBe('initial')

    // Advance time but not enough
    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(result.current).toBe('initial')

    // Advance time to complete debounce
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    await waitFor(() => {
      expect(result.current).toBe('updated')
    })
  })

  it('should reset debounce timer on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'first' })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: 'second' })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: 'third' })
    act(() => {
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(result.current).toBe('third')
    })
  })

  it('should work with different data types', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 0 } }
    )

    expect(result.current).toBe(0)

    rerender({ value: 42 })
    act(() => {
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(result.current).toBe(42)
    })
  })

  it('should work with objects', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: { name: 'John' } } }
    )

    expect(result.current).toEqual({ name: 'John' })

    const newValue = { name: 'Jane' }
    rerender({ value: newValue })
    act(() => {
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(result.current).toEqual({ name: 'Jane' })
    })
  })

  it('should cleanup timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('value', 300))
    
    unmount()
    
    // Should not throw or cause issues
    act(() => {
      jest.advanceTimersByTime(300)
    })
  })

  it('should use default delay of 300ms', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'updated' })
    
    act(() => {
      jest.advanceTimersByTime(299)
    })
    expect(result.current).toBe('initial')

    act(() => {
      jest.advanceTimersByTime(1)
    })

    await waitFor(() => {
      expect(result.current).toBe('updated')
    })
  })
})

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should debounce callback execution', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 300))

    result.current('test')
    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(callback).toHaveBeenCalledWith('test')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should reset timer on subsequent calls', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 300))

    result.current('first')
    act(() => {
      jest.advanceTimersByTime(200)
    })

    result.current('second')
    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(callback).toHaveBeenCalledWith('second')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should cancel pending execution', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 300))

    result.current('test')
    act(() => {
      jest.advanceTimersByTime(200)
    })

    result.current.cancel()
    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(callback).not.toHaveBeenCalled()
  })

  it('should pass multiple arguments correctly', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 300))

    result.current('arg1', 'arg2', 123)
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should update callback when dependencies change', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    
    const { result, rerender } = renderHook(
      ({ cb, deps }) => useDebouncedCallback(cb, 300, deps),
      { initialProps: { cb: callback1, deps: [1] } }
    )

    result.current('test1')
    act(() => {
      jest.advanceTimersByTime(300)
    })
    expect(callback1).toHaveBeenCalledWith('test1')

    // Change dependencies - should create new debounced function
    rerender({ cb: callback2, deps: [2] })
    
    result.current('test2')
    act(() => {
      jest.advanceTimersByTime(300)
    })
    expect(callback2).toHaveBeenCalledWith('test2')
  })

  it('should cleanup on unmount', () => {
    const callback = jest.fn()
    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 300))

    result.current('test')
    unmount()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Callback should not be called after unmount
    expect(callback).not.toHaveBeenCalled()
  })

  it('should use default delay of 300ms', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback))

    result.current('test')
    
    act(() => {
      jest.advanceTimersByTime(299)
    })
    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(callback).toHaveBeenCalledWith('test')
  })

  it('should maintain stable reference when delay does not change', () => {
    const callback = jest.fn()
    const { result, rerender } = renderHook(
      ({ delay }) => useDebouncedCallback(callback, delay),
      { initialProps: { delay: 300 } }
    )

    const firstRef = result.current
    rerender({ delay: 300 })
    const secondRef = result.current

    expect(firstRef).toBe(secondRef)
  })
})
