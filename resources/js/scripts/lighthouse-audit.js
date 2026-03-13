/**
 * Lighthouse Performance Audit Script
 * 
 * This script runs Lighthouse audits on key pages and checks if they meet
 * the Core Web Vitals targets defined in the design document.
 * 
 * Targets:
 * - First Contentful Paint (FCP): < 1.5s
 * - Largest Contentful Paint (LCP): < 2.5s
 * - Time to Interactive (TTI): < 3.5s
 * - Cumulative Layout Shift (CLS): < 0.1
 * - First Input Delay (FID): < 100ms
 * 
 * Prerequisites:
 * - npm install -g lighthouse
 * - Application must be running (npm run dev or npm run prod)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TARGETS = {
  FCP: 1500, // milliseconds
  LCP: 2500, // milliseconds
  TTI: 3500, // milliseconds
  CLS: 0.1,  // score
  FID: 100,  // milliseconds
  performance: 90, // Lighthouse performance score
};

const PAGES_TO_AUDIT = [
  { name: 'Login', url: 'http://localhost:8000/login' },
  { name: 'Dashboard', url: 'http://localhost:8000/dashboard' },
  { name: 'Members', url: 'http://localhost:8000/members' },
  { name: 'Events', url: 'http://localhost:8000/events' },
  { name: 'Finance', url: 'http://localhost:8000/finance' },
];

function checkLighthouseInstalled() {
  try {
    execSync('lighthouse --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

function runLighthouse(url, outputPath) {
  try {
    console.log(`Running Lighthouse audit for ${url}...`);
    
    const command = `lighthouse "${url}" \
      --output=json \
      --output-path="${outputPath}" \
      --only-categories=performance \
      --chrome-flags="--headless --no-sandbox" \
      --quiet`;
    
    execSync(command, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`Failed to run Lighthouse for ${url}:`, error.message);
    return false;
  }
}

function analyzeResults(reportPath) {
  try {
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    const metrics = {
      FCP: report.audits['first-contentful-paint']?.numericValue || 0,
      LCP: report.audits['largest-contentful-paint']?.numericValue || 0,
      TTI: report.audits['interactive']?.numericValue || 0,
      CLS: report.audits['cumulative-layout-shift']?.numericValue || 0,
      TBT: report.audits['total-blocking-time']?.numericValue || 0,
      speedIndex: report.audits['speed-index']?.numericValue || 0,
      performanceScore: report.categories.performance?.score * 100 || 0,
    };

    const issues = [];
    
    if (metrics.FCP > TARGETS.FCP) {
      issues.push(`FCP (${Math.round(metrics.FCP)}ms) exceeds target of ${TARGETS.FCP}ms`);
    }
    
    if (metrics.LCP > TARGETS.LCP) {
      issues.push(`LCP (${Math.round(metrics.LCP)}ms) exceeds target of ${TARGETS.LCP}ms`);
    }
    
    if (metrics.TTI > TARGETS.TTI) {
      issues.push(`TTI (${Math.round(metrics.TTI)}ms) exceeds target of ${TARGETS.TTI}ms`);
    }
    
    if (metrics.CLS > TARGETS.CLS) {
      issues.push(`CLS (${metrics.CLS.toFixed(3)}) exceeds target of ${TARGETS.CLS}`);
    }
    
    if (metrics.performanceScore < TARGETS.performance) {
      issues.push(`Performance score (${Math.round(metrics.performanceScore)}) is below target of ${TARGETS.performance}`);
    }

    return {
      metrics,
      issues,
      passed: issues.length === 0,
    };
  } catch (error) {
    console.error('Failed to analyze results:', error.message);
    return null;
  }
}

function formatMetric(value, unit = 'ms') {
  if (unit === 'ms') {
    return `${Math.round(value)}ms`;
  } else if (unit === 'score') {
    return value.toFixed(3);
  } else if (unit === 'percent') {
    return `${Math.round(value)}%`;
  }
  return value;
}

function printPageReport(pageName, analysis) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`  ${pageName}`);
  console.log('='.repeat(70));
  
  const { metrics, issues, passed } = analysis;
  
  console.log('\n📊 Core Web Vitals:');
  console.log(`   FCP:              ${formatMetric(metrics.FCP)} ${metrics.FCP <= TARGETS.FCP ? '✅' : '❌'} (target: < ${TARGETS.FCP}ms)`);
  console.log(`   LCP:              ${formatMetric(metrics.LCP)} ${metrics.LCP <= TARGETS.LCP ? '✅' : '❌'} (target: < ${TARGETS.LCP}ms)`);
  console.log(`   TTI:              ${formatMetric(metrics.TTI)} ${metrics.TTI <= TARGETS.TTI ? '✅' : '❌'} (target: < ${TARGETS.TTI}ms)`);
  console.log(`   CLS:              ${formatMetric(metrics.CLS, 'score')} ${metrics.CLS <= TARGETS.CLS ? '✅' : '❌'} (target: < ${TARGETS.CLS})`);
  console.log(`   TBT:              ${formatMetric(metrics.TBT)}`);
  console.log(`   Speed Index:      ${formatMetric(metrics.speedIndex)}`);
  
  console.log('\n🎯 Performance Score:');
  console.log(`   Score:            ${formatMetric(metrics.performanceScore, 'percent')} ${metrics.performanceScore >= TARGETS.performance ? '✅' : '❌'} (target: > ${TARGETS.performance}%)`);
  
  if (issues.length > 0) {
    console.log('\n⚠️  Issues:');
    issues.forEach(issue => console.log(`   • ${issue}`));
  } else {
    console.log('\n✅ All performance targets met!');
  }
  
  return passed;
}

function printSummary(results) {
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║           LIGHTHOUSE PERFORMANCE AUDIT SUMMARY                 ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  console.log('📈 Results by Page:');
  results.forEach(result => {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`   ${result.page.padEnd(20)} ${status}`);
  });
  
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`Overall: ${passed}/${total} pages passed`);
  console.log(`Status: ${passed === total ? '✅ ALL PASSED' : '❌ SOME FAILED'}`);
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  if (passed < total) {
    console.log('💡 Optimization Suggestions:');
    console.log('   • Optimize images (use WebP, lazy loading)');
    console.log('   • Minimize JavaScript bundle size');
    console.log('   • Enable code splitting');
    console.log('   • Use CDN for static assets');
    console.log('   • Implement service worker for caching');
    console.log('   • Defer non-critical JavaScript');
    console.log('   • Optimize CSS delivery');
    console.log('   • Reduce server response time');
    console.log('');
  }
}

// Main execution
async function main() {
  console.log('\n🚀 Starting Lighthouse Performance Audit...\n');
  
  // Check if Lighthouse is installed
  if (!checkLighthouseInstalled()) {
    console.error('❌ Lighthouse is not installed.');
    console.error('   Install it with: npm install -g lighthouse');
    process.exit(1);
  }
  
  // Create reports directory
  const reportsDir = path.join(process.cwd(), '.lighthouse-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const results = [];
  
  // Run audits for each page
  for (const page of PAGES_TO_AUDIT) {
    const reportPath = path.join(reportsDir, `${page.name.toLowerCase()}.json`);
    
    const success = runLighthouse(page.url, reportPath);
    
    if (success && fs.existsSync(reportPath)) {
      const analysis = analyzeResults(reportPath);
      
      if (analysis) {
        const passed = printPageReport(page.name, analysis);
        results.push({
          page: page.name,
          passed,
          analysis,
        });
      }
    } else {
      console.error(`❌ Failed to audit ${page.name}`);
      results.push({
        page: page.name,
        passed: false,
        analysis: null,
      });
    }
  }
  
  // Print summary
  printSummary(results);
  
  // Exit with appropriate code
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}

// Check if server is running
console.log('⚠️  Make sure your development server is running!');
console.log('   Run: npm run dev (in another terminal)');
console.log('   Or: php artisan serve\n');

// Run after a short delay to allow user to read the message
setTimeout(main, 2000);
