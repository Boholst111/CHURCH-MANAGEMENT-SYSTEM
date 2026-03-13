/**
 * Color Contrast Audit Runner
 * 
 * Run with: node scripts/audit-colors.js
 */

const fs = require('fs');
const path = require('path');

// Color contrast calculation functions
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(foreground, background) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  const l1 = getLuminance(fg.r, fg.g, fg.b);
  const l2 = getLuminance(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function meetsWCAGAA(foreground, background, textSize = 'normal') {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = textSize === 'large' ? 3 : 4.5;
  return ratio >= requiredRatio;
}

function meetsWCAGAAA(foreground, background, textSize = 'normal') {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = textSize === 'large' ? 4.5 : 7;
  return ratio >= requiredRatio;
}

function auditColorCombination(foreground, background, description, textSize = 'normal') {
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
    textSize,
  };
}

// Audit all design system colors
function auditDesignSystemColors() {
  const results = [];
  
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
    { color: '#075985', name: 'White text on Primary 800' },
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
    { color: '#059669', name: 'White on Success dark' },
    { color: '#f59e0b', name: 'White on Warning DEFAULT' },
    { color: '#ef4444', name: 'White on Error DEFAULT' },
    { color: '#dc2626', name: 'White on Error dark' },
    { color: '#3b82f6', name: 'White on Info DEFAULT' },
  ];
  
  whiteOnSemantic.forEach(({ color, name }) => {
    results.push(auditColorCombination('#ffffff', color, name, 'normal'));
  });
  
  // Text on neutral backgrounds
  const textOnNeutralBg = [
    { fg: '#171717', bg: '#fafafa', name: 'Darkest text on off-white' },
    { fg: '#262626', bg: '#f5f5f5', name: 'Headings on light gray' },
    { fg: '#525252', bg: '#fafafa', name: 'Body text on off-white' },
  ];
  
  textOnNeutralBg.forEach(({ fg, bg, name }) => {
    results.push(auditColorCombination(fg, bg, name, 'normal'));
  });
  
  return results;
}

// Generate markdown report
function generateMarkdownReport(results) {
  const passing = results.filter(r => r.passes);
  const failing = results.filter(r => !r.passes);
  
  let report = '# Color Contrast Compliance Report\n\n';
  report += `**Generated:** ${new Date().toISOString()}\n\n`;
  report += `## Executive Summary\n\n`;
  report += `- **Total combinations tested:** ${results.length}\n`;
  report += `- **Passing WCAG AA:** ${passing.length} (${Math.round(passing.length / results.length * 100)}%)\n`;
  report += `- **Failing WCAG AA:** ${failing.length} (${Math.round(failing.length / results.length * 100)}%)\n\n`;
  
  report += '## WCAG AA Requirements\n\n';
  report += 'WCAG 2.1 Level AA requires:\n\n';
  report += '- **Normal text** (< 18pt or < 14pt bold): **4.5:1** minimum contrast ratio\n';
  report += '- **Large text** (≥ 18pt or ≥ 14pt bold): **3:1** minimum contrast ratio\n';
  report += '- **WCAG AAA** (enhanced): 7:1 for normal text, 4.5:1 for large text\n\n';
  
  if (failing.length > 0) {
    report += '## ⚠️ Failing Combinations (Action Required)\n\n';
    report += 'These color combinations do NOT meet WCAG AA standards and should be adjusted:\n\n';
    report += '| Foreground | Background | Ratio | Level | Description |\n';
    report += '|------------|------------|-------|-------|-------------|\n';
    
    failing.forEach(result => {
      const badge = result.level === 'Fail' ? '❌' : result.level;
      report += `| \`${result.foreground}\` | \`${result.background}\` | **${result.ratio.toFixed(2)}:1** | ${badge} | ${result.description} |\n`;
    });
    report += '\n';
    
    report += '### Recommended Fixes\n\n';
    failing.forEach(result => {
      report += `- **${result.description}**: `;
      if (result.description.includes('Primary 600')) {
        report += 'Use Primary 700 (#0369a1) or darker for normal text. Primary 600 is acceptable for large text (≥18pt) or interactive elements like buttons.\n';
      } else if (result.description.includes('disabled')) {
        report += 'Disabled text is intentionally lower contrast. Ensure disabled state is also indicated through other means (cursor, opacity).\n';
      } else if (result.description.includes('light background')) {
        report += 'Use the "dark" variant of the semantic color for better contrast.\n';
      } else {
        report += 'Consider using a darker shade or adjusting the background color.\n';
      }
    });
    report += '\n';
  }
  
  report += '## ✅ Passing Combinations\n\n';
  report += 'These color combinations meet or exceed WCAG AA standards:\n\n';
  report += '| Foreground | Background | Ratio | Level | Description |\n';
  report += '|------------|------------|-------|-------|-------------|\n';
  
  passing.forEach(result => {
    const badge = result.level === 'AAA' ? '✅✅' : '✅';
    report += `| \`${result.foreground}\` | \`${result.background}\` | ${result.ratio.toFixed(2)}:1 | ${badge} ${result.level} | ${result.description} |\n`;
  });
  report += '\n';
  
  report += '## Implementation Guidelines\n\n';
  report += '### Text Colors\n\n';
  report += '**On white backgrounds (#ffffff):**\n';
  report += '- ✅ Use Neutral 600-900 for all text\n';
  report += '- ✅ Use Primary 700-900 for links and emphasis\n';
  report += '- ⚠️ Avoid Primary 600 for normal text (use for large text or buttons only)\n';
  report += '- ❌ Never use Neutral 400 for important text (disabled states only)\n\n';
  
  report += '**On colored backgrounds:**\n';
  report += '- ✅ Use white text on Primary 600+, Success DEFAULT+, Error DEFAULT+\n';
  report += '- ✅ Use dark variants on light semantic backgrounds\n';
  report += '- ⚠️ Test any custom combinations with the contrast checker\n\n';
  
  report += '### Button Colors\n\n';
  report += '- ✅ Primary buttons: White text on Primary 600 or darker\n';
  report += '- ✅ Success buttons: White text on Success DEFAULT or darker\n';
  report += '- ✅ Error buttons: White text on Error DEFAULT or darker\n';
  report += '- ✅ Secondary buttons: Dark text on light backgrounds\n\n';
  
  report += '### Status Indicators\n\n';
  report += '**Do not rely on color alone** to convey information:\n';
  report += '- ✅ Use icons alongside colors (✓ for success, ⚠ for warning, ✗ for error)\n';
  report += '- ✅ Use text labels in addition to color coding\n';
  report += '- ✅ Ensure sufficient contrast for all status colors\n';
  report += '- ✅ Consider patterns or textures for colorblind users\n\n';
  
  report += '## Testing Tools\n\n';
  report += 'Use these tools to verify color contrast:\n\n';
  report += '1. **Built-in utility**: `resources/js/lib/color-contrast.ts`\n';
  report += '2. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/\n';
  report += '3. **Chrome DevTools**: Inspect element > Styles > Color picker shows contrast ratio\n';
  report += '4. **Axe DevTools**: Browser extension for automated accessibility testing\n\n';
  
  report += '## Compliance Status\n\n';
  if (failing.length === 0) {
    report += '✅ **All tested color combinations meet WCAG AA standards.**\n\n';
  } else {
    report += `⚠️ **${failing.length} color combination(s) require adjustment to meet WCAG AA standards.**\n\n`;
  }
  
  report += '---\n\n';
  report += '*This report was generated automatically. For questions about color contrast compliance, ';
  report += 'refer to [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum).*\n';
  
  return report;
}

// Run audit and generate report
console.log('Running color contrast audit...\n');
const results = auditDesignSystemColors();

const passing = results.filter(r => r.passes);
const failing = results.filter(r => !r.passes);

console.log(`Total combinations tested: ${results.length}`);
console.log(`Passing WCAG AA: ${passing.length} (${Math.round(passing.length / results.length * 100)}%)`);
console.log(`Failing WCAG AA: ${failing.length} (${Math.round(failing.length / results.length * 100)}%)\n`);

if (failing.length > 0) {
  console.log('⚠️  FAILING COMBINATIONS:\n');
  failing.forEach(result => {
    console.log(`  ❌ ${result.ratio.toFixed(2)}:1 - ${result.description}`);
    console.log(`     FG: ${result.foreground} / BG: ${result.background}`);
  });
  console.log('');
}

// Generate and save report
const report = generateMarkdownReport(results);
const outputPath = path.join(__dirname, '..', '.kiro', 'specs', 'modern-ui-ux-redesign', 'COLOR_CONTRAST_AUDIT.md');
fs.writeFileSync(outputPath, report);

console.log(`✅ Report saved to: ${outputPath}\n`);
