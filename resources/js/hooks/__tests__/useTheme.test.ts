import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
  })

  it('initializes with light theme by default', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
    expect(result.current.resolvedTheme).toBe('light')
  })

  it('initializes with stored theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(result.current.resolvedTheme).toBe('dark')
  })

  it('applies theme to document on mount', () => {
    renderHook(() => useTheme())
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('updates theme when setTheme is called', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toBe('dark')
    expect(result.current.resolvedTheme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('dark')

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe('light')
  })

  it('resolves auto theme based on system preference', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    localStorage.setItem('theme', 'auto')
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('auto')
    expect(result.current.resolvedTheme).toBe('dark')
  })

  it('listens for system theme changes when theme is auto', () => {
    const listeners: Array<() => void> = []

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
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

    localStorage.setItem('theme', 'auto')
    const { result } = renderHook(() => useTheme())

    expect(result.current.resolvedTheme).toBe('light')

    // Simulate system theme change to dark
    act(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })
      listeners.forEach((listener) => listener())
    })

    expect(result.current.resolvedTheme).toBe('dark')
  })

  it('does not listen for system changes when theme is not auto', () => {
    const listeners: Array<() => void> = []

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
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

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
    expect(listeners.length).toBe(0)
  })

  it('persists theme changes to localStorage', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(localStorage.getItem('theme')).toBe('dark')

    act(() => {
      result.current.setTheme('auto')
    })

    expect(localStorage.getItem('theme')).toBe('auto')
  })
})
