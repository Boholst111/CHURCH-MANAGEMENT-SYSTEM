/**
 * Color Contrast Utilities for WCAG Compliance
 * 
 * These utilities help ensure color combinations meet WCAG AA and AAA standards.
 * WCAG AA requires:
 * - 4.5:1 contrast ratio for normal text (< 18pt or < 14pt bold)
 * - 3:1 contrast ratio for large text (≥ 18pt or ≥ 14pt bold)
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ContrastAuditResult {
  foreground: string;
  background: string;
  ratio: number;
  passes: boolean;
  level: 'AA' | 'AAA' | 'Fail';
  description: string;
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGB {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Handle 3-character hex codes
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Calculate relative luminance of a color
 * Formula from WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function getLuminance(r: number, g: number, b: number): number {
  // Convert to 0-1 range
  const [rs, gs, bs] = [r, g, b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Formula from WCAG 2.1: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(foreground: string, background: string): number {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  
  const l1 = getLuminance(fg.r, fg.g, fg.b);
  const l2 = getLuminance(bg.r, bg.g, bg.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  textSize: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = textSize === 'large' ? 3 : 4.5;
  return ratio >= requiredRatio;
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(
  foreground: string,
  background: string,
  textSize: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = textSize === 'large' ? 4.5 : 7;
  return ratio >= requiredRatio;
}

/**
 * Audit a color combination and return detailed results
 */
export function auditColorCombination(
  foreground: string,
  background: string,
  description: string,
  textSize: 'normal' | 'large' = 'normal'
): ContrastAuditResult {
  const ratio = getContrastRatio(foreground, background);
  const passesAA = meetsWCAGAA(foreground, background, textSize);
  const passesAAA = meetsWCAGAAA(foreground, background, textSize);
  
  return {
    foreground,
    background,
    ratio: Math.round(ratio * 100) / 100,
    passes: passesAA,
    level: passesAAA ? 'AAA' : passesAA ? 'AA' : 'Fail',
    description,
  };
}

/**
 * Audit all color combinations in the design system
 */
export function auditDesignSystemColors() {
  const results: ContrastAuditResult[] = [];
  
  // Primary colors on white background
  const primaryOnWhite = [
    { color: '#0284c7', name: 'Primary 600 (buttons, links)' },
    { color: '#0369a1', name: 'Primary 700 (hover states)' },
    { color: '#075985', name: 'Primary 800 (text on light)' },
    { color: '#0c4a6e', name: 'Primary 900 (headings)' },
  ];
  
  primaryOnWhite.forEach(({ color, name }) => {
    results.push(auditColorCombination(color, '#ffffff', name, 'normal'));
  });
  
  // Neutral text colors on white background
  const neutralOnWhite = [
    { color: '#525252', name: 'Neutral 600 (body text)' },
    { color: '#404040', name: 'Neutral 700 (dark text)' },
    { color: '#262626', name: 'Neutral 800 (headings)' },
    { color: '#171717', name: 'Neutral 900 (darkest text)' },
    { color: '#737373', name: 'Neutral 500 (secondary text)' },
    { color: '#a3a3a3', name: 'Neutral 400 (disabled text)' },
  ];
  
  neutralOnWhite.forEach(({ color, name }) => {
    results.push(auditColorCombination(color, '#ffffff', name, 'normal'));
  });
  
  // White text on primary backgrounds
  const whiteOnPrimary = [
    { color: '#0284c7', name: 'White text on Primary 600 (buttons)' },
    { color: '#0369a1', name: 'White text on Primary 700' },
  ];
  
  whiteOnPrimary.forEach(({ color, name }) => {
    results.push(auditColorCombination('#ffffff', color, name, 'normal'));
  });
  
  // Semantic colors on white
  const semanticOnWhite = [
    { color: '#10b981', name: 'Success DEFAULT on white' },
    { color: '#059669', name: 'Success dark on white' },
    { color: '#f59e0b', name: 'Warning DEFAULT on white' },
    { color: '#d97706', name: 'Warning dark on white' },
    { color: '#ef4444', name: 'Error DEFAULT on white' },
    { color: '#dc2626', name: 'Error dark on white' },
    { color: '#3b82f6', name: 'Info DEFAULT on white' },
    { color: '#2563eb', name: 'Info dark on white' },
  ];
  
  semanticOnWhite.forEach(({ color, name }) => {
    results.push(auditColorCombination(color, '#ffffff', name, 'normal'));
  });
  
  // Semantic text on semantic light backgrounds
  const semanticOnLight = [
    { fg: '#059669', bg: '#d1fae5', name: 'Success dark on success light' },
    { fg: '#d97706', bg: '#fef3c7', name: 'Warning dark on warning light' },
    { fg: '#dc2626', bg: '#fee2e2', name: 'Error dark on error light' },
    { fg: '#2563eb', bg: '#dbeafe', name: 'Info dark on info light' },
  ];
  
  semanticOnLight.forEach(({ fg, bg, name }) => {
    results.push(auditColorCombination(fg, bg, name, 'normal'));
  });
  
  // White text on semantic backgrounds
  const whiteOnSemantic = [
    { color: '#10b981', name: 'White on Success DEFAULT' },
    { color: '#f59e0b', name: 'White on Warning DEFAULT' },
    { color: '#ef4444', name: 'White on Error DEFAULT' },
    { color: '#3b82f6', name: 'White on Info DEFAULT' },
  ];
  
  whiteOnSemantic.forEach(({ color, name }) => {
    results.push(auditColorCombination('#ffffff', color, name, 'normal'));
  });
  
  return results;
}
