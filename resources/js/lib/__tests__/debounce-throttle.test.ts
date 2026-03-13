import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { debounce, throttle } from '../utils'

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should delay function execution', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 300)

    debouncedFunc()
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(299)
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should reset delay on subsequent calls', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 300)

    debouncedFunc()
    jest.advanceTimersByTime(200)
    
    debouncedFunc()
    jest.advanceTimersByTime(200)
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments correctly', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 300)

    debouncedFunc('arg1', 'arg2', 123)
    jest.advanceTimersByTime(300)

    expect(func).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should use last call arguments when multiple calls are made', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 300)

    debouncedFunc('first')
    jest.advanceTimersByTime(100)
    debouncedFunc('second')
    jest.advanceTimersByTime(100)
    debouncedFunc('third')
    jest.advanceTimersByTime(300)

    expect(func).toHaveBeenCalledTimes(1)
    expect(func).toHaveBeenCalledWith('third')
  })

  it('should cancel pending execution', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 300)

    debouncedFunc()
    jest.advanceTimersByTime(200)
    debouncedFunc.cancel()
    jest.advanceTimersByTime(200)

    expect(func).not.toHaveBeenCalled()
  })

  it('should work with default delay of 300ms', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func)

    debouncedFunc()
    jest.advanceTimersByTime(299)
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should preserve this context', () => {
    const obj = {
      value: 42,
      method: jest.fn(function (this: any) {
        return this.value
      }),
    }

    const debouncedMethod = debounce(obj.method, 300)
    debouncedMethod.call(obj)
    jest.advanceTimersByTime(300)

    expect(obj.method).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple debounced functions independently', () => {
    const func1 = jest.fn()
    const func2 = jest.fn()
    const debouncedFunc1 = debounce(func1, 300)
    const debouncedFunc2 = debounce(func2, 500)

    debouncedFunc1()
    debouncedFunc2()

    jest.advanceTimersByTime(300)
    expect(func1).toHaveBeenCalledTimes(1)
    expect(func2).not.toHaveBeenCalled()

    jest.advanceTimersByTime(200)
    expect(func2).toHaveBeenCalledTimes(1)
  })
})

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should invoke function immediately on first call (leading edge)', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300)

    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should not invoke function again within wait period', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300)

    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)

    throttledFunc()
    throttledFunc()
    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should invoke function on trailing edge after wait period', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300)

    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100)
    throttledFunc()
    
    jest.advanceTimersByTime(200)
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should pass arguments correctly', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300)

    throttledFunc('arg1', 'arg2', 123)
    expect(func).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should use latest arguments for trailing call', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300)

    throttledFunc('first')
    expect(func).toHaveBeenCalledWith('first')

    jest.advanceTimersByTime(100)
    throttledFunc('second')
    
    jest.advanceTimersByTime(100)
    throttledFunc('third')
    
    jest.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(2)
    expect(func).toHaveBeenLastCalledWith('third')
  })

  it('should cancel pending trailing execution', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300)

    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100)
    throttledFunc()
    
    throttledFunc.cancel()
    jest.advanceTimersByTime(300)

    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should work with leading: false option', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300, { leading: false })

    throttledFunc()
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(300)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should work with trailing: false option', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300, { trailing: false })

    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100)
    throttledFunc()
    
    jest.advanceTimersByTime(300)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should work with both leading and trailing false', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300, { leading: false, trailing: false })

    throttledFunc()
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(300)
    expect(func).not.toHaveBeenCalled()
  })

  it('should preserve this context', () => {
    const obj = {
      value: 42,
      method: jest.fn(function (this: any) {
        return this.value
      }),
    }

    const throttledMethod = throttle(obj.method, 300)
    throttledMethod.call(obj)

    expect(obj.method).toHaveBeenCalledTimes(1)
  })

  it('should handle rapid successive calls correctly', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 300)

    // First call - immediate
    throttledFunc('call1')
    expect(func).toHaveBeenCalledTimes(1)

    // Rapid calls within throttle period (without advancing time)
    for (let i = 2; i <= 10; i++) {
      throttledFunc(`call${i}`)
    }

    // Should still be 1 call (leading edge only)
    expect(func).toHaveBeenCalledTimes(1)

    // Wait for trailing edge
    jest.advanceTimersByTime(300)

    expect(func).toHaveBeenCalledWith('call10')
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should work with default delay of 300ms', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func)

    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)

    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(300)
    expect(func).toHaveBeenCalledTimes(2)
  })
})
