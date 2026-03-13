import { renderHook, act } from '@testing-library/react'
import {
  useBreakpoint,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  breakpoints,
} from '../useBreakpoint'

describe('useBreakpoint', () => {
  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
  }

  it('returns correct breakpoint for small screens', () => {
    setWindowWidth(500)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current).toBe('sm')
  })

  it('returns correct breakpoint for large screens', () => {
    setWindowWidth(1100)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current).toBe('lg')
  })

  it('returns correct breakpoint for xl screens', () => {
    setWindowWidth(1300)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current).toBe('xl')
  })

  it('returns correct breakpoint for 2xl screens', () => {
    setWindowWidth(1600)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current).toBe('2xl')
  })

  it('updates breakpoint on window resize', () => {
    setWindowWidth(500)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current).toBe('sm')

    act(() => {
      setWindowWidth(1100)
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe('lg')
  })

  it('handles breakpoint boundaries correctly', () => {
    setWindowWidth(breakpoints.md - 1)
    const { result, rerender } = renderHook(() => useBreakpoint())
    expect(result.current).toBe('sm')

    act(() => {
      setWindowWidth(breakpoints.md)
      window.dispatchEvent(new Event('resize'))
    })
    rerender()

    expect(result.current).toBe('md')
  })
})

describe('useMediaQuery', () => {
  const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  }

  it('returns true when viewport matches breakpoint', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useMediaQuery('lg'))
    expect(result.current).toBe(true)
  })

  it('returns false when viewport does not match breakpoint', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('lg'))
    expect(result.current).toBe(false)
  })

  it('updates when media query changes', () => {
    let matchesValue = false
    const listeners: Array<(e: MediaQueryListEvent) => void> = []

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: matchesValue,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, listener) => {
          if (event === 'change') {
            listeners.push(listener)
          }
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    const { result } = renderHook(() => useMediaQuery('lg'))
    expect(result.current).toBe(false)

    act(() => {
      matchesValue = true
      listeners.forEach((listener) =>
        listener({ matches: true } as MediaQueryListEvent)
      )
    })

    expect(result.current).toBe(true)
  })
})

describe('useIsMobile', () => {
  const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  }

  it('returns true for mobile viewport', () => {
    mockMatchMedia(false) // Below lg breakpoint
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns false for desktop viewport', () => {
    mockMatchMedia(true) // At or above lg breakpoint
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })
})

describe('useIsTablet', () => {
  it('returns true for tablet viewport', () => {
    let currentQuery = ''
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        currentQuery = query
        // md: true, lg: false = tablet
        if (query.includes('768px')) return { matches: true, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn() }
        if (query.includes('1024px')) return { matches: false, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn() }
        return { matches: false, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn() }
      }),
    })

    const { result } = renderHook(() => useIsTablet())
    expect(result.current).toBe(true)
  })

  it('returns false for mobile viewport', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false, // Below md
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })

    const { result } = renderHook(() => useIsTablet())
    expect(result.current).toBe(false)
  })

  it('returns false for desktop viewport', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true, // At or above lg
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })

    const { result } = renderHook(() => useIsTablet())
    expect(result.current).toBe(false)
  })
})

describe('useIsDesktop', () => {
  const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  }

  it('returns true for desktop viewport', () => {
    mockMatchMedia(true) // At or above lg breakpoint
    const { result } = renderHook(() => useIsDesktop())
    expect(result.current).toBe(true)
  })

  it('returns false for mobile viewport', () => {
    mockMatchMedia(false) // Below lg breakpoint
    const { result } = renderHook(() => useIsDesktop())
    expect(result.current).toBe(false)
  })
})
