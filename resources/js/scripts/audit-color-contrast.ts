/**
 * Color Contrast Audit Script
 * 
 * This script audits all color combinations in the design system
 * and generates a comprehensive report of WCAG compliance.
 */

import { auditDesignSystemColors, ContrastAuditResult } from '../lib/color-contrast';

function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

function getLevelBadge(level: string): string {
  switch (level) {
    case 'AAA':
      return '✓✓✓ AAA';
    case 'AA':
      return '✓✓ AA';
    case 'Fail':
      return '✗ FAIL';
    default:
      return level;
  }
}

function generateMarkdownReport(results: ContrastAuditResult[]): string {
  const passing = results.filter(r => r.passes);
  const failing = results.filter(r => !r.passes);
  
  let report = '# Color Contrast Audit Report\n\n';
  report += `**Generated:** ${new Date().toISOString()}\n\n`;
  report += `**Summary:**\n`;
  report += `- Total combinations tested: ${results.length}\n`;
  report += `- Passing WCAG AA: ${passing.length} (${Math.round(passing.length / results.length * 100)}%)\n`;
  report += `- Failing WCAG AA: ${failing.length} (${Math.round(failing.length / results.length * 100)}%)\n\n`;
  
  report += '## WCAG AA Requirements\n\n';
  report += '- **Normal text** (< 18pt or < 14pt bold): 4.5:1 minimum contrast ratio\n';
  report += '- **Large text** (≥ 18pt or ≥ 14pt bold): 3:1 minimum contrast ratio\n';
  report += '- **WCAG AAA** (enhanced): 7:1 for normal text, 4.5:1 for large text\n\n';
  
  if (failing.length > 0) {
    report += '## ⚠️ Failing Combinations (Action Required)\n\n';
    report += '| Foreground | Background | Ratio | Level | Description |\n';
    report += '|------------|------------|-------|-------|-------------|\n';
    
    failing.forEach(result => {
      report += `| ${result.foreground} | ${result.background} | ${formatRatio(result.ratio)} | ${getLevelBadge(result.level)} | ${result.description} |\n`;
    });
    report += '\n';
  }
  
  report += '## ✓ Passing Combinations\n\n';
  report += '| Foreground | Background | Ratio | Level | Description |\n';
  report += '|------------|------------|-------|-------|-------------|\n';
  
  passing.forEach(result => {
    report += `| ${result.foreground} | ${result.background} | ${formatRatio(result.ratio)} | ${getLevelBadge(result.level)} | ${result.description} |\n`;
  });
  report += '\n';
  
  return report;
}

function generateConsoleReport(results: ContrastAuditResult[]): void {
  console.log('\n=== COLOR CONTRAST AUDIT REPORT ===\n');
  
  const passing = results.filter(r => r.passes);
  const failing = results.filter(r => !r.passes);
  
  console.log(`Total combinations tested: ${results.length}`);
  console.log(`Passing WCAG AA: ${passing.length} (${Math.round(passing.length / results.length * 100)}%)`);
  console.log(`Failing WCAG AA: ${failing.length} (${Math.round(failing.length / results.length * 100)}%)\n`);
  
  if (failing.length > 0) {
    console.log('⚠️  FAILING COMBINATIONS:\n');
    failing.forEach(result => {
      console.log(`  ${getLevelBadge(result.level)} ${formatRatio(result.ratio)}`);
      console.log(`     ${result.description}`);
      console.log(`     FG: ${result.foreground} / BG: ${result.background}\n`);
    });
  }
  
  console.log('✓ PASSING COMBINATIONS:\n');
  passing.forEach(result => {
    console.log(`  ${getLevelBadge(result.level)} ${formatRatio(result.ratio)} - ${result.description}`);
  });
  
  console.log('\n=== END REPORT ===\n');
}

// Run the audit
const results = auditDesignSystemColors();
generateConsoleReport(results);

// Export for use in documentation
export { generateMarkdownReport, results };
