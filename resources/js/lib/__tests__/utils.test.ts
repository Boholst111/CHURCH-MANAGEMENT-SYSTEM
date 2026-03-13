import {
  cn,
  calculateColorContrast,
  meetsWCAGContrast,
  getTheme,
  setTheme,
  applyTheme,
  resolveTheme,
  getSystemTheme,
  toggleTheme,
  type Theme,
} from '../utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('merges Tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('handles arrays and objects', () => {
    expect(cn(['foo', 'bar'], { baz: true, qux: false })).toBe('foo bar baz')
  })
})

describe('calculateColorContrast', () => {
  it('calculates contrast ratio for black and white', () => {
    const contrast = calculateColorContrast('#000000', '#ffffff')
    expect(contrast).toBeCloseTo(21, 1)
  })

  it('calculates contrast ratio for same colors', () => {
    const contrast = calculateColorContrast('#ffffff', '#ffffff')
    expect(contrast).toBeCloseTo(1, 1)
  })

  it('calculates contrast ratio for primary blue and white', () => {
    const contrast = calculateColorContrast('#0ea5e9', '#ffffff')
    expect(contrast).toBeGreaterThan(2.5)
    expect(contrast).toBeLessThan(3)
  })

  it('handles colors without # prefix', () => {
    const contrast = calculateColorContrast('000000', 'ffffff')
    expect(contrast).toBeCloseTo(21, 1)
  })

  it('returns null for invalid hex colors', () => {
    expect(calculateColorContrast('invalid', '#ffffff')).toBeNull()
    expect(calculateColorContrast('#ffffff', 'invalid')).toBeNull()
  })

  it('is symmetric', () => {
    const contrast1 = calculateColorContrast('#0ea5e9', '#ffffff')
    const contrast2 = calculateColorContrast('#ffffff', '#0ea5e9')
    expect(contrast1).toEqual(contrast2)
  })
})

describe('meetsWCAGContrast', () => {
  it('validates AA normal text contrast', () => {
    expect(meetsWCAGContrast('#000000', '#ffffff', 'AA', 'normal')).toBe(true)
    expect(meetsWCAGContrast('#595959', '#ffffff', 'AA', 'normal')).toBe(true)
    expect(meetsWCAGContrast('#aaaaaa', '#ffffff', 'AA', 'normal')).toBe(false)
  })

  it('validates AA large text contrast', () => {
    expect(meetsWCAGContrast('#000000', '#ffffff', 'AA', 'large')).toBe(true)
    expect(meetsWCAGContrast('#767676', '#ffffff', 'AA', 'large')).toBe(true)
  })

  it('validates AAA normal text contrast', () => {
    expect(meetsWCAGContrast('#000000', '#ffffff', 'AAA', 'normal')).toBe(true)
    expect(meetsWCAGContrast('#777777', '#ffffff', 'AAA', 'normal')).toBe(false)
  })

  it('validates AAA large text contrast', () => {
    expect(meetsWCAGContrast('#000000', '#ffffff', 'AAA', 'large')).toBe(true)
    expect(meetsWCAGContrast('#999999', '#ffffff', 'AAA', 'large')).toBe(false)
  })

  it('defaults to AA normal when level and size not specified', () => {
    expect(meetsWCAGContrast('#000000', '#ffffff')).toBe(true)
  })

  it('returns false for invalid colors', () => {
    expect(meetsWCAGContrast('invalid', '#ffffff')).toBe(false)
  })
})

describe('Theme utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document attributes
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
  })

  describe('getTheme', () => {
    it('returns light as default when no theme is stored', () => {
      expect(getTheme()).toBe('light')
    })

    it('returns stored theme from localStorage', () => {
      localStorage.setItem('theme', 'dark')
      expect(getTheme()).toBe('dark')
    })

    it('returns light for invalid stored values', () => {
      localStorage.setItem('theme', 'invalid')
      expect(getTheme()).toBe('light')
    })

    it('handles auto theme', () => {
      localStorage.setItem('theme', 'auto')
      expect(getTheme()).toBe('auto')
    })
  })

  describe('setTheme', () => {
    it('stores theme in localStorage', () => {
      setTheme('dark')
      expect(localStorage.getItem('theme')).toBe('dark')
    })

    it('applies theme to document', () => {
      setTheme('dark')
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('removes dark class for light theme', () => {
      setTheme('dark')
      setTheme('light')
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  describe('applyTheme', () => {
    it('applies light theme to document', () => {
      applyTheme('light')
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('applies dark theme to document', () => {
      applyTheme('dark')
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('resolves auto theme based on system preference', () => {
      // Mock matchMedia to return dark preference
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

      applyTheme('auto')
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })
  })

  describe('resolveTheme', () => {
    it('returns light for light theme', () => {
      expect(resolveTheme('light')).toBe('light')
    })

    it('returns dark for dark theme', () => {
      expect(resolveTheme('dark')).toBe('dark')
    })

    it('resolves auto theme based on system preference', () => {
      // Mock matchMedia for light preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      expect(resolveTheme('auto')).toBe('light')
    })
  })

  describe('getSystemTheme', () => {
    it('returns dark when system prefers dark', () => {
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

      expect(getSystemTheme()).toBe('dark')
    })

    it('returns light when system prefers light', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      expect(getSystemTheme()).toBe('light')
    })
  })

  describe('toggleTheme', () => {
    it('toggles from light to dark', () => {
      localStorage.setItem('theme', 'light')
      toggleTheme()
      expect(localStorage.getItem('theme')).toBe('dark')
    })

    it('toggles from dark to light', () => {
      localStorage.setItem('theme', 'dark')
      toggleTheme()
      expect(localStorage.getItem('theme')).toBe('light')
    })

    it('toggles from auto to dark', () => {
      localStorage.setItem('theme', 'auto')
      toggleTheme()
      expect(localStorage.getItem('theme')).toBe('dark')
    })
  })
})
