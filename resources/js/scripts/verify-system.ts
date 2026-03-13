/**
 * Task 25: Automated System Verification Script
 * 
 * This script performs automated checks for the complete system verification.
 * Run with: npx ts-node resources/js/scripts/verify-system.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface VerificationResult {
  category: string;
  check: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message?: string;
}

const results: VerificationResult[] = [];

function addResult(category: string, check: string, status: 'PASS' | 'FAIL' | 'WARN', message?: string) {
  results.push({ category, check, status, message });
}

function checkFileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function checkDirectoryExists(dirPath: string): boolean {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

function checkFileContains(filePath: string, searchString: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.includes(searchString);
  } catch {
    return false;
  }
}

// 1. Verify All Pages Exist
function verifyPagesExist() {
  console.log('\n📄 Verifying Pages Exist...');
  
  const pages = [
    'resources/js/pages/Login.tsx',
    'resources/js/pages/Dashboard.tsx',
    'resources/js/pages/Members.tsx',
    'resources/js/pages/SmallGroups.tsx',
    'resources/js/pages/Leadership.tsx',
    'resources/js/pages/Events.tsx',
    'resources/js/pages/Finance/Overview.tsx',
    'resources/js/pages/Reports.tsx',
    'resources/js/pages/ActivityLog.tsx',
    'resources/js/pages/Users.tsx',
    'resources/js/pages/Settings.tsx',
  ];

  pages.forEach(page => {
    const exists = checkFileExists(page);
    addResult(
      'Pages',
      `${path.basename(page)} exists`,
      exists ? 'PASS' : 'FAIL',
      exists ? undefined : `File not found: ${page}`
    );
  });
}

// 2. Verify Core Components Exist
function verifyComponentsExist() {
  console.log('\n🧩 Verifying Core Components Exist...');
  
  const components = [
    'resources/js/components/ui/button.tsx',
    'resources/js/components/ui/input.tsx',
    'resources/js/components/ui/card.tsx',
    'resources/js/components/ui/table.tsx',
    'resources/js/components/ui/modal.tsx',
    'resources/js/components/ui/toast.tsx',
    'resources/js/components/ui/sidebar.tsx',
    'resources/js/components/ui/header.tsx',
    'resources/js/components/ui/layout.tsx',
  ];

  components.forEach(component => {
    const exists = checkFileExists(component);
    addResult(
      'Components',
      `${path.basename(component)} exists`,
      exists ? 'PASS' : 'FAIL',
      exists ? undefined : `File not found: ${component}`
    );
  });
}

// 3. Verify Tests Exist
function verifyTestsExist() {
  console.log('\n🧪 Verifying Tests Exist...');
  
  const testDirs = [
    'resources/js/__tests__/checkpoint',
    'resources/js/components/ui/__tests__',
    'resources/js/pages/__tests__',
  ];

  testDirs.forEach(dir => {
    const exists = checkDirectoryExists(dir);
    addResult(
      'Tests',
      `${path.basename(dir)} directory exists`,
      exists ? 'PASS' : 'WARN',
      exists ? undefined : `Directory not found: ${dir}`
    );
  });

  // Check for specific test files
  const testFiles = [
    'resources/js/components/ui/__tests__/button.test.tsx',
    'resources/js/components/ui/__tests__/input.test.tsx',
    'resources/js/components/ui/__tests__/table.test.tsx',
    'resources/js/components/ui/__tests__/modal.test.tsx',
  ];

  testFiles.forEach(testFile => {
    const exists = checkFileExists(testFile);
    addResult(
      'Tests',
      `${path.basename(testFile)} exists`,
      exists ? 'PASS' : 'WARN',
      exists ? undefined : `Test file not found: ${testFile}`
    );
  });
}

// 4. Verify Tailwind Configuration
function verifyTailwindConfig() {
  console.log('\n🎨 Verifying Tailwind Configuration...');
  
  const configFile = 'tailwind.config.ts';
  const exists = checkFileExists(configFile);
  
  addResult(
    'Configuration',
    'Tailwind config exists',
    exists ? 'PASS' : 'FAIL',
    exists ? undefined : 'tailwind.config.ts not found'
  );

  if (exists) {
    // Check for design tokens
    const hasColors = checkFileContains(configFile, 'colors');
    const hasTypography = checkFileContains(configFile, 'fontSize');
    const hasSpacing = checkFileContains(configFile, 'spacing');
    
    addResult('Configuration', 'Color tokens defined', hasColors ? 'PASS' : 'WARN');
    addResult('Configuration', 'Typography tokens defined', hasTypography ? 'PASS' : 'WARN');
    addResult('Configuration', 'Spacing tokens defined', hasSpacing ? 'PASS' : 'WARN');
  }
}

// 5. Verify Theme Context
function verifyThemeContext() {
  console.log('\n🌓 Verifying Theme Context...');
  
  const themeContext = 'resources/js/contexts/ThemeContext.tsx';
  const exists = checkFileExists(themeContext);
  
  addResult(
    'Theme',
    'ThemeContext exists',
    exists ? 'PASS' : 'FAIL',
    exists ? undefined : 'ThemeContext.tsx not found'
  );

  if (exists) {
    const hasProvider = checkFileContains(themeContext, 'ThemeProvider');
    const hasToggle = checkFileContains(themeContext, 'toggleTheme') || checkFileContains(themeContext, 'setTheme');
    
    addResult('Theme', 'ThemeProvider defined', hasProvider ? 'PASS' : 'FAIL');
    addResult('Theme', 'Theme toggle function defined', hasToggle ? 'PASS' : 'FAIL');
  }
}

// 6. Verify State Management
function verifyStateManagement() {
  console.log('\n📦 Verifying State Management...');
  
  const stores = [
    'resources/js/stores/authStore.ts',
    'resources/js/stores/themeStore.ts',
    'resources/js/stores/uiStore.ts',
  ];

  stores.forEach(store => {
    const exists = checkFileExists(store);
    addResult(
      'State Management',
      `${path.basename(store)} exists`,
      exists ? 'PASS' : 'WARN',
      exists ? undefined : `Store not found: ${store}`
    );
  });
}

// 7. Verify API Client
function verifyApiClient() {
  console.log('\n🌐 Verifying API Client...');
  
  const apiClient = 'resources/js/lib/api.ts';
  const exists = checkFileExists(apiClient);
  
  addResult(
    'API',
    'API client exists',
    exists ? 'PASS' : 'FAIL',
    exists ? undefined : 'api.ts not found'
  );

  if (exists) {
    const hasInterceptors = checkFileContains(apiClient, 'interceptors');
    const hasAuth = checkFileContains(apiClient, 'Authorization') || checkFileContains(apiClient, 'token');
    
    addResult('API', 'Interceptors configured', hasInterceptors ? 'PASS' : 'WARN');
    addResult('API', 'Authentication configured', hasAuth ? 'PASS' : 'WARN');
  }
}

// 8. Verify Accessibility Features
function verifyAccessibility() {
  console.log('\n♿ Verifying Accessibility Features...');
  
  // Check for keyboard navigation utilities
  const keyboardNav = 'resources/js/hooks/useKeyboardNavigation.ts';
  const exists = checkFileExists(keyboardNav);
  
  addResult(
    'Accessibility',
    'Keyboard navigation hook exists',
    exists ? 'PASS' : 'WARN',
    exists ? undefined : 'useKeyboardNavigation.ts not found'
  );

  // Check for color contrast utilities
  const colorContrast = 'resources/js/lib/color-contrast.ts';
  const contrastExists = checkFileExists(colorContrast);
  
  addResult(
    'Accessibility',
    'Color contrast utility exists',
    contrastExists ? 'PASS' : 'WARN',
    contrastExists ? undefined : 'color-contrast.ts not found'
  );
}

// 9. Verify Performance Optimizations
function verifyPerformanceOptimizations() {
  console.log('\n⚡ Verifying Performance Optimizations...');
  
  // Check for virtual scrolling
  const virtualScrolling = 'resources/js/hooks/useVirtualScrolling.ts';
  const vsExists = checkFileExists(virtualScrolling);
  
  addResult(
    'Performance',
    'Virtual scrolling hook exists',
    vsExists ? 'PASS' : 'WARN',
    vsExists ? undefined : 'useVirtualScrolling.ts not found'
  );

  // Check for debounce/throttle utilities
  const debounceThrottle = 'resources/js/lib/debounce-throttle.ts';
  const dtExists = checkFileExists(debounceThrottle);
  
  addResult(
    'Performance',
    'Debounce/throttle utilities exist',
    dtExists ? 'PASS' : 'WARN',
    dtExists ? undefined : 'debounce-throttle.ts not found'
  );

  // Check for image optimization
  const imageOpt = 'resources/js/lib/imageOptimization.ts';
  const ioExists = checkFileExists(imageOpt);
  
  addResult(
    'Performance',
    'Image optimization utilities exist',
    ioExists ? 'PASS' : 'WARN',
    ioExists ? undefined : 'imageOptimization.ts not found'
  );
}

// 10. Verify Error Handling
function verifyErrorHandling() {
  console.log('\n🚨 Verifying Error Handling...');
  
  // Check for error boundary
  const errorBoundary = 'resources/js/components/ui/error-boundary.tsx';
  const ebExists = checkFileExists(errorBoundary);
  
  addResult(
    'Error Handling',
    'Error boundary exists',
    ebExists ? 'PASS' : 'WARN',
    ebExists ? undefined : 'error-boundary.tsx not found'
  );

  // Check for API error handling
  const apiError = 'resources/js/hooks/useApiError.ts';
  const aeExists = checkFileExists(apiError);
  
  addResult(
    'Error Handling',
    'API error hook exists',
    aeExists ? 'PASS' : 'WARN',
    aeExists ? undefined : 'useApiError.ts not found'
  );
}

// Generate Report
function generateReport() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 VERIFICATION REPORT');
  console.log('='.repeat(80));

  const categories = [...new Set(results.map(r => r.category))];
  
  categories.forEach(category => {
    const categoryResults = results.filter(r => r.category === category);
    const passed = categoryResults.filter(r => r.status === 'PASS').length;
    const failed = categoryResults.filter(r => r.status === 'FAIL').length;
    const warned = categoryResults.filter(r => r.status === 'WARN').length;
    
    console.log(`\n${category}:`);
    console.log(`  ✅ Passed: ${passed}`);
    console.log(`  ❌ Failed: ${failed}`);
    console.log(`  ⚠️  Warnings: ${warned}`);
    
    // Show failed checks
    const failedChecks = categoryResults.filter(r => r.status === 'FAIL');
    if (failedChecks.length > 0) {
      console.log(`  Failed checks:`);
      failedChecks.forEach(check => {
        console.log(`    - ${check.check}: ${check.message || 'No message'}`);
      });
    }
  });

  // Overall summary
  const totalPassed = results.filter(r => r.status === 'PASS').length;
  const totalFailed = results.filter(r => r.status === 'FAIL').length;
  const totalWarned = results.filter(r => r.status === 'WARN').length;
  const total = results.length;

  console.log('\n' + '='.repeat(80));
  console.log('OVERALL SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Checks: ${total}`);
  console.log(`✅ Passed: ${totalPassed} (${((totalPassed / total) * 100).toFixed(1)}%)`);
  console.log(`❌ Failed: ${totalFailed} (${((totalFailed / total) * 100).toFixed(1)}%)`);
  console.log(`⚠️  Warnings: ${totalWarned} (${((totalWarned / total) * 100).toFixed(1)}%)`);
  
  const successRate = ((totalPassed / total) * 100).toFixed(1);
  console.log(`\nSuccess Rate: ${successRate}%`);
  
  if (totalFailed === 0) {
    console.log('\n🎉 All critical checks passed!');
  } else {
    console.log(`\n⚠️  ${totalFailed} critical check(s) failed. Please review.`);
  }
  
  console.log('='.repeat(80));
}

// Main execution
function main() {
  console.log('🚀 Starting System Verification...');
  console.log('This will check for the presence of key files and configurations.');
  
  verifyPagesExist();
  verifyComponentsExist();
  verifyTestsExist();
  verifyTailwindConfig();
  verifyThemeContext();
  verifyStateManagement();
  verifyApiClient();
  verifyAccessibility();
  verifyPerformanceOptimizations();
  verifyErrorHandling();
  
  generateReport();
  
  // Exit with appropriate code
  const hasCriticalFailures = results.some(r => r.status === 'FAIL');
  process.exit(hasCriticalFailures ? 1 : 0);
}

main();
