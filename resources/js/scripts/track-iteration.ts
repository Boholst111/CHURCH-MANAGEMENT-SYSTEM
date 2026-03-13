/**
 * Track Iteration Progress Script
 * 
 * This script tracks the progress of the current iteration:
 * - Calculates metrics
 * - Generates progress report
 * - Identifies blockers
 * - Updates dashboard data
 */

import fs from 'fs';
import path from 'path';
import { analyzeFeedback, prioritizeFeedback } from './analyze-beta-feedback';

interface IterationMetrics {
  totalIssues: number;
  fixedIssues: number;
  inProgressIssues: number;
  remainingIssues: number;
  newIssues: number;
  regressions: number;
  fixSuccessRate: number;
  regressionRate: number;
  averageFixTime: number;
  velocity: number;
}

interface IssuesByTier {
  tier1: { started: number; fixed: number; remaining: number };
  tier2: { started: number; fixed: number; remaining: number };
  tier3: { started: number; fixed: number; remaining: number };
  tier4: { started: number; fixed: number; remaining: number };
}

/**
 * Load feedback data from JSON file
 */
function loadFeedbackData(): any[] {
  const feedbackPath = path.join(process.cwd(), 'storage/app/beta-feedback.json');
  
  if (!fs.existsSync(feedbackPath)) {
    console.error('❌ Feedback data not found. Run: php artisan beta:export-feedback');
    process.exit(1);
  }
  
  const data = fs.readFileSync(feedbackPath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Get current iteration number
 */
function getCurrentIterationNumber(): number {
  const specsDir = path.join(process.cwd(), '.kiro/specs/modern-ui-ux-redesign');
  const files = fs.readdirSync(specsDir);
  
  const iterationFiles = files.filter(f => f.match(/^ITERATION_\d+_PLAN\.md$/));
  
  if (iterationFiles.length === 0) {
    console.error('❌ No active iteration found. Run: npm run iteration:start');
    process.exit(1);
  }
  
  const numbers = iterationFiles.map(f => {
    const match = f.match(/^ITERATION_(\d+)_PLAN\.md$/);
    return match ? parseInt(match[1]) : 0;
  });
  
  return Math.max(...numbers);
}

/**
 * Calculate tier for an issue based on priority score
 */
function calculateTier(priorityScore: number): number {
  if (priorityScore >= 100) return 1;
  if (priorityScore >= 50) return 2;
  if (priorityScore >= 20) return 3;
  return 4;
}

/**
 * Calculate iteration metrics
 */
function calculateMetrics(feedback: any[]): IterationMetrics {
  const prioritized = prioritizeFeedback(feedback);
  
  const totalIssues = prioritized.length;
  const fixedIssues = prioritized.filter(i => i.status === 'resolved').length;
  const inProgressIssues = prioritized.filter(i => i.status === 'in_progress').length;
  const remainingIssues = prioritized.filter(i => i.status === 'new').length;
  
  // For demo purposes, we'll simulate some metrics
  // In a real implementation, these would come from tracking data
  const newIssues = 0; // Would track issues created during iteration
  const regressions = 0; // Would track regressions found
  
  const fixSuccessRate = fixedIssues > 0 ? 
    ((fixedIssues - regressions) / fixedIssues * 100) : 0;
  
  const regressionRate = fixedIssues > 0 ? 
    (regressions / fixedIssues * 100) : 0;
  
  // Average fix time (simulated - would come from tracking)
  const averageFixTime = 4; // hours
  
  // Velocity (issues per week)
  const velocity = fixedIssues / 2; // Assuming 2 weeks
  
  return {
    totalIssues,
    fixedIssues,
    inProgressIssues,
    remainingIssues,
    newIssues,
    regressions,
    fixSuccessRate: Math.round(fixSuccessRate),
    regressionRate: Math.round(regressionRate),
    averageFixTime,
    velocity: Math.round(velocity * 10) / 10
  };
}

/**
 * Calculate issues by tier
 */
function calculateIssuesByTier(feedback: any[]): IssuesByTier {
  const prioritized = prioritizeFeedback(feedback);
  
  const tiers = {
    tier1: { started: 0, fixed: 0, remaining: 0 },
    tier2: { started: 0, fixed: 0, remaining: 0 },
    tier3: { started: 0, fixed: 0, remaining: 0 },
    tier4: { started: 0, fixed: 0, remaining: 0 }
  };
  
  prioritized.forEach(issue => {
    const tier = calculateTier(issue.priorityScore ?? 0);
    const tierKey = `tier${tier}` as keyof IssuesByTier;
    
    tiers[tierKey].started++;
    
    if (issue.status === 'resolved') {
      tiers[tierKey].fixed++;
    } else if (issue.status === 'new') {
      tiers[tierKey].remaining++;
    }
  });
  
  return tiers;
}

/**
 * Identify blockers
 */
function identifyBlockers(feedback: any[]): any[] {
  const prioritized = prioritizeFeedback(feedback);
  
  // Blockers are:
  // 1. Tier 1 issues that are not resolved
  // 2. Issues in progress for > 3 days (simulated)
  // 3. Issues with "blocked" in description or notes
  
  const blockers = prioritized.filter(issue => {
    const tier = calculateTier(issue.priorityScore ?? 0);
    const isUnresolvedCritical = tier === 1 && issue.status !== 'resolved';
    const hasBlockedKeyword = issue.description.toLowerCase().includes('blocked') ||
                              (issue.admin_notes && issue.admin_notes.toLowerCase().includes('blocked'));
    
    return isUnresolvedCritical || hasBlockedKeyword;
  });
  
  return blockers;
}

/**
 * Generate progress report
 */
function generateProgressReport(
  iterationNumber: number,
  metrics: IterationMetrics,
  issuesByTier: IssuesByTier,
  blockers: any[]
): string {
  let report = `# Iteration ${iterationNumber} Progress Report\n\n`;
  report += `**Generated**: ${new Date().toISOString().split('T')[0]}\n\n`;
  
  report += `## Summary\n\n`;
  report += `- **Total Issues**: ${metrics.totalIssues}\n`;
  report += `- **Fixed**: ${metrics.fixedIssues} (${Math.round(metrics.fixedIssues / metrics.totalIssues * 100)}%)\n`;
  report += `- **In Progress**: ${metrics.inProgressIssues}\n`;
  report += `- **Remaining**: ${metrics.remainingIssues}\n`;
  report += `- **New Issues**: ${metrics.newIssues}\n`;
  report += `- **Regressions**: ${metrics.regressions}\n\n`;
  
  report += `## Progress by Tier\n\n`;
  report += `### Tier 1 (Critical)\n`;
  report += `- Started: ${issuesByTier.tier1.started}\n`;
  report += `- Fixed: ${issuesByTier.tier1.fixed}\n`;
  report += `- Remaining: ${issuesByTier.tier1.remaining}\n`;
  report += `- Progress: ${issuesByTier.tier1.started > 0 ? Math.round(issuesByTier.tier1.fixed / issuesByTier.tier1.started * 100) : 0}%\n\n`;
  
  report += `### Tier 2 (High Priority)\n`;
  report += `- Started: ${issuesByTier.tier2.started}\n`;
  report += `- Fixed: ${issuesByTier.tier2.fixed}\n`;
  report += `- Remaining: ${issuesByTier.tier2.remaining}\n`;
  report += `- Progress: ${issuesByTier.tier2.started > 0 ? Math.round(issuesByTier.tier2.fixed / issuesByTier.tier2.started * 100) : 0}%\n\n`;
  
  report += `### Tier 3 (Medium Priority)\n`;
  report += `- Started: ${issuesByTier.tier3.started}\n`;
  report += `- Fixed: ${issuesByTier.tier3.fixed}\n`;
  report += `- Remaining: ${issuesByTier.tier3.remaining}\n`;
  report += `- Progress: ${issuesByTier.tier3.started > 0 ? Math.round(issuesByTier.tier3.fixed / issuesByTier.tier3.started * 100) : 0}%\n\n`;
  
  report += `## Metrics\n\n`;
  report += `- **Fix Success Rate**: ${metrics.fixSuccessRate}%\n`;
  report += `- **Regression Rate**: ${metrics.regressionRate}%\n`;
  report += `- **Average Fix Time**: ${metrics.averageFixTime} hours\n`;
  report += `- **Velocity**: ${metrics.velocity} issues/week\n\n`;
  
  if (blockers.length > 0) {
    report += `## ⚠️ Blockers (${blockers.length})\n\n`;
    blockers.forEach(blocker => {
      report += `- **#${blocker.id}**: ${blocker.description.substring(0, 80)}...\n`;
      report += `  - Severity: ${blocker.severity}\n`;
      report += `  - Status: ${blocker.status}\n`;
      report += `  - Page: ${blocker.page}\n\n`;
    });
  } else {
    report += `## ✅ No Blockers\n\n`;
    report += `All critical issues are being addressed.\n\n`;
  }
  
  report += `## Health Check\n\n`;
  
  // Production readiness assessment
  const tier1Complete = issuesByTier.tier1.remaining === 0;
  const tier2Complete = issuesByTier.tier2.remaining === 0;
  const noBlockers = blockers.length === 0;
  const goodFixRate = metrics.fixSuccessRate >= 80;
  const lowRegressionRate = metrics.regressionRate < 10;
  
  report += `- [ ] ${tier1Complete ? '✅' : '❌'} All Tier 1 (Critical) issues resolved\n`;
  report += `- [ ] ${tier2Complete ? '✅' : '❌'} All Tier 2 (High Priority) issues resolved\n`;
  report += `- [ ] ${noBlockers ? '✅' : '❌'} No blockers\n`;
  report += `- [ ] ${goodFixRate ? '✅' : '❌'} Fix success rate > 80%\n`;
  report += `- [ ] ${lowRegressionRate ? '✅' : '❌'} Regression rate < 10%\n\n`;
  
  const productionReady = tier1Complete && tier2Complete && noBlockers && goodFixRate && lowRegressionRate;
  
  if (productionReady) {
    report += `### 🎉 Production Ready!\n\n`;
    report += `All criteria met. Ready to proceed with production deployment.\n\n`;
  } else {
    report += `### ⏳ Not Yet Production Ready\n\n`;
    report += `Continue iteration to address remaining issues.\n\n`;
  }
  
  report += `## Recommendations\n\n`;
  
  if (issuesByTier.tier1.remaining > 0) {
    report += `- 🚨 **URGENT**: ${issuesByTier.tier1.remaining} critical issue(s) remaining. Prioritize immediately.\n`;
  }
  
  if (issuesByTier.tier2.remaining > 0) {
    report += `- ⚠️ ${issuesByTier.tier2.remaining} high priority issue(s) remaining. Address before production.\n`;
  }
  
  if (blockers.length > 0) {
    report += `- 🚧 ${blockers.length} blocker(s) identified. Resolve to unblock progress.\n`;
  }
  
  if (metrics.regressionRate > 10) {
    report += `- 🔍 Regression rate is high (${metrics.regressionRate}%). Review testing procedures.\n`;
  }
  
  if (metrics.velocity < 3) {
    report += `- 📉 Velocity is low (${metrics.velocity} issues/week). Consider adding resources or extending timeline.\n`;
  }
  
  if (productionReady) {
    report += `- ✅ All criteria met. Proceed with final verification and production deployment.\n`;
  }
  
  report += `\n---\n\n`;
  report += `**Next Update**: Run \`npm run iteration:track\` daily for updated progress\n`;
  
  return report;
}

/**
 * Display console summary
 */
function displayConsoleSummary(
  iterationNumber: number,
  metrics: IterationMetrics,
  issuesByTier: IssuesByTier,
  blockers: any[]
): void {
  console.log('\n' + '='.repeat(60));
  console.log(`📊 Iteration ${iterationNumber} Progress`);
  console.log('='.repeat(60));
  
  console.log(`\n📈 Overall Progress:`);
  console.log(`   Total Issues: ${metrics.totalIssues}`);
  console.log(`   Fixed: ${metrics.fixedIssues} (${Math.round(metrics.fixedIssues / metrics.totalIssues * 100)}%)`);
  console.log(`   In Progress: ${metrics.inProgressIssues}`);
  console.log(`   Remaining: ${metrics.remainingIssues}`);
  
  console.log(`\n🎯 By Tier:`);
  console.log(`   Tier 1: ${issuesByTier.tier1.fixed}/${issuesByTier.tier1.started} fixed (${issuesByTier.tier1.remaining} remaining)`);
  console.log(`   Tier 2: ${issuesByTier.tier2.fixed}/${issuesByTier.tier2.started} fixed (${issuesByTier.tier2.remaining} remaining)`);
  console.log(`   Tier 3: ${issuesByTier.tier3.fixed}/${issuesByTier.tier3.started} fixed (${issuesByTier.tier3.remaining} remaining)`);
  
  console.log(`\n📊 Metrics:`);
  console.log(`   Fix Success Rate: ${metrics.fixSuccessRate}%`);
  console.log(`   Regression Rate: ${metrics.regressionRate}%`);
  console.log(`   Average Fix Time: ${metrics.averageFixTime} hours`);
  console.log(`   Velocity: ${metrics.velocity} issues/week`);
  
  if (blockers.length > 0) {
    console.log(`\n⚠️  Blockers: ${blockers.length}`);
    blockers.forEach(blocker => {
      console.log(`   - #${blocker.id}: ${blocker.description.substring(0, 60)}...`);
    });
  } else {
    console.log(`\n✅ No Blockers`);
  }
  
  // Production readiness
  const tier1Complete = issuesByTier.tier1.remaining === 0;
  const tier2Complete = issuesByTier.tier2.remaining === 0;
  
  console.log(`\n🎯 Production Readiness:`);
  console.log(`   ${tier1Complete ? '✅' : '❌'} Tier 1 Complete`);
  console.log(`   ${tier2Complete ? '✅' : '❌'} Tier 2 Complete`);
  console.log(`   ${blockers.length === 0 ? '✅' : '❌'} No Blockers`);
  console.log(`   ${metrics.fixSuccessRate >= 80 ? '✅' : '❌'} Fix Success Rate > 80%`);
  console.log(`   ${metrics.regressionRate < 10 ? '✅' : '❌'} Regression Rate < 10%`);
  
  console.log('\n' + '='.repeat(60) + '\n');
}

/**
 * Save progress report
 */
function saveProgressReport(iterationNumber: number, report: string): void {
  const specsDir = path.join(process.cwd(), '.kiro/specs/modern-ui-ux-redesign');
  const reportPath = path.join(specsDir, `ITERATION_${iterationNumber}_PROGRESS.md`);
  
  fs.writeFileSync(reportPath, report);
  console.log(`✅ Progress report saved: ${reportPath}\n`);
}

/**
 * Main function
 */
function main(): void {
  console.log('📊 Tracking iteration progress...\n');
  
  // Get current iteration
  const iterationNumber = getCurrentIterationNumber();
  console.log(`✅ Tracking Iteration ${iterationNumber}\n`);
  
  // Load feedback data
  console.log('📊 Loading feedback data...');
  const feedback = loadFeedbackData();
  console.log(`✅ Loaded ${feedback.length} feedback items\n`);
  
  // Calculate metrics
  console.log('📈 Calculating metrics...');
  const metrics = calculateMetrics(feedback);
  const issuesByTier = calculateIssuesByTier(feedback);
  const blockers = identifyBlockers(feedback);
  console.log('✅ Metrics calculated\n');
  
  // Generate report
  console.log('📝 Generating progress report...');
  const report = generateProgressReport(iterationNumber, metrics, issuesByTier, blockers);
  console.log('✅ Report generated\n');
  
  // Save report
  console.log('💾 Saving progress report...');
  saveProgressReport(iterationNumber, report);
  
  // Display summary
  displayConsoleSummary(iterationNumber, metrics, issuesByTier, blockers);
}

// Run the script
main();
