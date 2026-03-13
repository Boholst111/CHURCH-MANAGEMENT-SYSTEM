/**
 * Dark Mode Color Contrast Audit Script
 * 
 * This script audits all dark mode color combinations to ensure they meet
 * WCAG AA standards for accessibility.
 */

import { auditColorCombination, type ContrastAuditResult } from '../lib/color-contrast';

// Dark mode color palette (inverted from light mode)
const darkModeColors = {
  // Background colors in dark mode
  background: {
    primary: '#171717',    // neutral-900 in light becomes neutral-50 in dark
    secondary: '#262626',  // neutral-800
    elevated: '#404040',   // neutral-700
  },
  
  // Text colors in dark mode
  text: {
    primary: '#fafafa',    // neutral-50 in light becomes neutral-900 in dark
    secondary: '#e5e5e5',  // neutral-200
    tertiary: '#d4d4d4',   // neutral-300
    muted: '#a3a3a3',      // neutral-500
  },
  
  // Primary colors (adjusted for dark mode)
  primary: {
    50: '#0c4a6e',
    100: '#075985',
    200: '#0369a1',
    300: '#0284c7',
    400: '#0ea5e9',
    500: '#38bdf8',
    600: '#7dd3fc',
    700: '#bae6fd',
    800: '#e0f2fe',
    900: '#f0f9ff',
  },
  
  // Semantic colors (same as light mode for consistency)
  semantic: {
    success: '#10b981',
    successLight: '#d1fae5',
    successDark: '#059669',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    warningDark: '#d97706',
    error: '#ef4444',
    errorLight: '#fee2e2',
    errorDark: '#dc2626',
    info: '#3b82f6',
    infoLight: '#dbeafe',
    infoDark: '#2563eb',
  },
};

/**
 * Audit all dark mode color combinations
 */
export function auditDarkModeColors(): ContrastAuditResult[] {
  const results: ContrastAuditResult[] = [];
  
  // 1. Text on dark backgrounds
  console.log('\n=== Text on Dark Backgrounds ===');
  
  const textOnDark = [
    { fg: darkModeColors.text.primary, bg: darkModeColors.background.primary, name: 'Primary text on primary background' },
    { fg: darkModeColors.text.secondary, bg: darkModeColors.background.primary, name: 'Secondary text on primary background' },
    { fg: darkModeColors.text.tertiary, bg: darkModeColors.background.primary, name: 'Tertiary text on primary background' },
    { fg: darkModeColors.text.muted, bg: darkModeColors.background.primary, name: 'Muted text on primary background' },
    { fg: darkModeColors.text.primary, bg: darkModeColors.background.secondary, name: 'Primary text on secondary background' },
    { fg: darkModeColors.text.primary, bg: darkModeColors.background.elevated, name: 'Primary text on elevated background' },
  ];
  
  textOnDark.forEach(({ fg, bg, name }) => {
    const result = auditColorCombination(fg, bg, name, 'normal');
    results.push(result);
    console.log(`${result.passes ? '✓' : '✗'} ${name}: ${result.ratio}:1 (${result.level})`);
  });
  
  // 2. Primary colors on dark backgrounds
  console.log('\n=== Primary Colors on Dark Backgrounds ===');
  
  const primaryOnDark = [
    { fg: darkModeColors.primary[400], bg: darkModeColors.background.primary, name: 'Primary 400 (links) on dark' },
    { fg: darkModeColors.primary[500], bg: darkModeColors.background.primary, name: 'Primary 500 (interactive) on dark' },
    { fg: darkModeColors.primary[600], bg: darkModeColors.background.primary, name: 'Primary 600 (hover) on dark' },
  ];
  
  primaryOnDark.forEach(({ fg, bg, name }) => {
    const result = auditColorCombination(fg, bg, name, 'normal');
    results.push(result);
    console.log(`${result.passes ? '✓' : '✗'} ${name}: ${result.ratio}:1 (${result.level})`);
  });
  
  // 3. Semantic colors on dark backgrounds
  console.log('\n=== Semantic Colors on Dark Backgrounds ===');
  
  const semanticOnDark = [
    { fg: darkModeColors.semantic.success, bg: darkModeColors.background.primary, name: 'Success on dark' },
    { fg: darkModeColors.semantic.warning, bg: darkModeColors.background.primary, name: 'Warning on dark' },
    { fg: darkModeColors.semantic.error, bg: darkModeColors.background.primary, name: 'Error on dark' },
    { fg: darkModeColors.semantic.info, bg: darkModeColors.background.primary, name: 'Info on dark' },
  ];
  
  semanticOnDark.forEach(({ fg, bg, name }) => {
    const result = auditColorCombination(fg, bg, name, 'normal');
    results.push(result);
    console.log(`${result.passes ? '✓' : '✗'} ${name}: ${result.ratio}:1 (${result.level})`);
  });
  
  // 4. Dark text on semantic light backgrounds (for badges/alerts)
  console.log('\n=== Dark Text on Semantic Light Backgrounds ===');
  
  const darkOnSemanticLight = [
    { fg: darkModeColors.background.primary, bg: darkModeColors.semantic.successLight, name: 'Dark text on success light' },
    { fg: darkModeColors.background.primary, bg: darkModeColors.semantic.warningLight, name: 'Dark text on warning light' },
    { fg: darkModeColors.background.primary, bg: darkModeColors.semantic.errorLight, name: 'Dark text on error light' },
    { fg: darkModeColors.background.primary, bg: darkModeColors.semantic.infoLight, name: 'Dark text on info light' },
  ];
  
  darkOnSemanticLight.forEach(({ fg, bg, name }) => {
    const result = auditColorCombination(fg, bg, name, 'normal');
    results.push(result);
    console.log(`${result.passes ? '✓' : '✗'} ${name}: ${result.ratio}:1 (${result.level})`);
  });
  
  // 5. Button text on button backgrounds
  console.log('\n=== Button Text on Button Backgrounds ===');
  
  const buttonCombinations = [
    { fg: '#ffffff', bg: darkModeColors.primary[400], name: 'White text on primary button (dark mode)' },
    { fg: '#ffffff', bg: darkModeColors.semantic.success, name: 'White text on success button' },
    { fg: '#ffffff', bg: darkModeColors.semantic.error, name: 'White text on error button' },
    { fg: darkModeColors.text.primary, bg: darkModeColors.background.secondary, name: 'Text on secondary button (dark mode)' },
  ];
  
  buttonCombinations.forEach(({ fg, bg, name }) => {
    const result = auditColorCombination(fg, bg, name, 'normal');
    results.push(result);
    console.log(`${result.passes ? '✓' : '✗'} ${name}: ${result.ratio}:1 (${result.level})`);
  });
  
  // Summary
  console.log('\n=== Summary ===');
  const passed = results.filter(r => r.passes).length;
  const failed = results.filter(r => !r.passes).length;
  console.log(`Total combinations tested: ${results.length}`);
  console.log(`Passed WCAG AA: ${passed} (${Math.round(passed / results.length * 100)}%)`);
  console.log(`Failed WCAG AA: ${failed} (${Math.round(failed / results.length * 100)}%)`);
  
  return results;
}

// Run audit if executed directly
if (require.main === module) {
  auditDarkModeColors();
}
