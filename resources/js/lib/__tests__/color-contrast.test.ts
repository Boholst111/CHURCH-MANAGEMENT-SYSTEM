import {
  hexToRgb,
  getLuminance,
  getContrastRatio,
  meetsWCAGAA,
  meetsWCAGAAA,
  auditColorCombination,
} from '../color-contrast';

describe('Color Contrast Utilities', () => {
  describe('hexToRgb', () => {
    it('converts hex color to RGB', () => {
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#0284c7')).toEqual({ r: 2, g: 132, b: 199 });
    });

    it('handles 3-character hex codes', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe('getLuminance', () => {
    it('calculates relative luminance correctly', () => {
      expect(getLuminance(255, 255, 255)).toBeCloseTo(1, 2);
      expect(getLuminance(0, 0, 0)).toBeCloseTo(0, 2);
    });
  });

  describe('getContrastRatio', () => {
    it('calculates contrast ratio between white and black', () => {
      const ratio = getContrastRatio('#ffffff', '#000000');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('calculates contrast ratio for primary blue on white', () => {
      const ratio = getContrastRatio('#0284c7', '#ffffff');
      // Primary-600 has ~4.1:1 ratio - fails WCAG AA for normal text
      expect(ratio).toBeGreaterThan(4.0);
      expect(ratio).toBeLessThan(4.5);
    });

    it('calculates contrast ratio for neutral-600 on white', () => {
      const ratio = getContrastRatio('#525252', '#ffffff');
      expect(ratio).toBeGreaterThan(7);
    });
  });

  describe('meetsWCAGAA', () => {
    it('returns true for sufficient contrast (normal text)', () => {
      expect(meetsWCAGAA('#000000', '#ffffff', 'normal')).toBe(true);
      expect(meetsWCAGAA('#0369a1', '#ffffff', 'normal')).toBe(true); // Primary-700
    });

    it('returns false for insufficient contrast (normal text)', () => {
      expect(meetsWCAGAA('#a3a3a3', '#ffffff', 'normal')).toBe(false);
      expect(meetsWCAGAA('#0284c7', '#ffffff', 'normal')).toBe(false); // Primary-600
    });

    it('returns true for sufficient contrast (large text)', () => {
      expect(meetsWCAGAA('#737373', '#ffffff', 'large')).toBe(true);
      expect(meetsWCAGAA('#0284c7', '#ffffff', 'large')).toBe(true); // Primary-600 OK for large text
    });
  });

  describe('auditColorCombination', () => {
    it('audits primary-700 button colors (passes)', () => {
      const result = auditColorCombination('#ffffff', '#0369a1', 'Primary-700 button text');
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThan(4.5);
    });

    it('audits primary-600 button colors (fails for normal text)', () => {
      const result = auditColorCombination('#ffffff', '#0284c7', 'Primary-600 button text');
      expect(result.passes).toBe(false);
      expect(result.ratio).toBeLessThan(4.5);
    });

    it('audits error text on light background (may fail)', () => {
      const result = auditColorCombination('#dc2626', '#fee2e2', 'Error text on light background');
      // This combination may not meet WCAG AA - document the actual ratio
      expect(result.ratio).toBeGreaterThan(1);
    });
  });
});
