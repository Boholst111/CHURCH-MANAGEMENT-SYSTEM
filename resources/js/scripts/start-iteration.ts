/**
 * Start New Iteration Script
 * 
 * This script initializes a new feedback iteration cycle:
 * - Exports current feedback data
 * - Generates iteration plan
 * - Creates iteration report template
 * - Notifies team
 */

import fs from 'fs';
import path from 'path';
import { analyzeFeedback, prioritizeFeedback } from './analyze-beta-feedback';

interface IterationConfig {
  iterationNumber: number;
  startDate: string;
  endDate: string;
  focusTiers: number[];
  goals: string[];
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
 * Get iteration configuration from user or defaults
 */
function getIterationConfig(): IterationConfig {
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  
  // In a real implementation, this could prompt the user for input
  // For now, we'll use sensible defaults
  
  return {
    iterationNumber: getNextIterationNumber(),
    startDate: now.toISOString().split('T')[0],
    endDate: twoWeeksLater.toISOString().split('T')[0],
    focusTiers: [1, 2], // Focus on Tier 1 and Tier 2 issues
    goals: [
      'Fix all Tier 1 (Critical) issues',
      'Fix all Tier 2 (High Priority) issues',
      'Address high-impact Tier 3 issues if time permits'
    ]
  };
}

/**
 * Get next iteration number by checking existing iteration files
 */
function getNextIterationNumber(): number {
  const specsDir = path.join(process.cwd(), '.kiro/specs/modern-ui-ux-redesign');
  const files = fs.readdirSync(specsDir);
  
  const iterationFiles = files.filter(f => f.match(/^ITERATION_\d+_/));
  
  if (iterationFiles.length === 0) {
    return 1;
  }
  
  const numbers = iterationFiles.map(f => {
    const match = f.match(/^ITERATION_(\d+)_/);
    return match ? parseInt(match[1]) : 0;
  });
  
  return Math.max(...numbers) + 1;
}

/**
 * Generate iteration plan based on feedback analysis
 */
function generateIterationPlan(feedback: any[], config: IterationConfig): string {
  const analysis = analyzeFeedback(feedback);
  const prioritized = prioritizeFeedback(feedback);
  
  // Filter issues by focus tiers and status
  const plannedIssues = prioritized.filter(item => {
    const tier = (item.priorityScore ?? 0) >= 100 ? 1 :
                 (item.priorityScore ?? 0) >= 50 ? 2 :
                 (item.priorityScore ?? 0) >= 20 ? 3 : 4;
    
    return config.focusTiers.includes(tier) && 
           item.status !== 'resolved' && 
           item.status !== 'wont_fix';
  });
  
  let plan = `# Iteration ${config.iterationNumber} Plan\n\n`;
  plan += `**Duration**: ${config.startDate} to ${config.endDate}\n\n`;
  plan += `## Goals\n\n`;
  config.goals.forEach((goal, i) => {
    plan += `${i + 1}. ${goal}\n`;
  });
  plan += `\n`;
  
  plan += `## Current State\n\n`;
  plan += `- **Total Open Issues**: ${analysis.summary.total}\n`;
  plan += `- **Tier 1 (Critical)**: ${analysis.criticalIssues.length}\n`;
  plan += `- **Tier 2 (High Priority)**: ${analysis.highPriorityIssues.length}\n`;
  plan += `- **Tier 3 (Medium Priority)**: ${prioritized.filter(i => (i.priorityScore ?? 0) >= 20 && (i.priorityScore ?? 0) < 50).length}\n`;
  plan += `- **Tier 4 (Low Priority)**: ${prioritized.filter(i => (i.priorityScore ?? 0) < 20).length}\n\n`;
  
  plan += `## Planned Issues (${plannedIssues.length} total)\n\n`;
  
  // Group by tier
  const tier1 = plannedIssues.filter(i => (i.priorityScore ?? 0) >= 100);
  const tier2 = plannedIssues.filter(i => (i.priorityScore ?? 0) >= 50 && (i.priorityScore ?? 0) < 100);
  const tier3 = plannedIssues.filter(i => (i.priorityScore ?? 0) >= 20 && (i.priorityScore ?? 0) < 50);
  
  if (tier1.length > 0) {
    plan += `### Tier 1 (Critical) - ${tier1.length} issues\n\n`;
    tier1.forEach(issue => {
      plan += `- **#${issue.id}**: ${issue.description.substring(0, 80)}...\n`;
      plan += `  - Severity: ${issue.severity}\n`;
      plan += `  - Page: ${issue.page}\n`;
      plan += `  - Priority Score: ${issue.priorityScore}\n\n`;
    });
  }
  
  if (tier2.length > 0) {
    plan += `### Tier 2 (High Priority) - ${tier2.length} issues\n\n`;
    tier2.forEach(issue => {
      plan += `- **#${issue.id}**: ${issue.description.substring(0, 80)}...\n`;
      plan += `  - Severity: ${issue.severity}\n`;
      plan += `  - Page: ${issue.page}\n`;
      plan += `  - Priority Score: ${issue.priorityScore}\n\n`;
    });
  }
  
  if (tier3.length > 0) {
    plan += `### Tier 3 (Medium Priority) - ${tier3.length} issues\n\n`;
    plan += `*Note: These are stretch goals if time permits*\n\n`;
    tier3.slice(0, 5).forEach(issue => {
      plan += `- **#${issue.id}**: ${issue.description.substring(0, 80)}...\n`;
      plan += `  - Severity: ${issue.severity}\n`;
      plan += `  - Page: ${issue.page}\n`;
      plan += `  - Priority Score: ${issue.priorityScore}\n\n`;
    });
  }
  
  plan += `## Resource Allocation\n\n`;
  plan += `- **Developers**: [Assign developers here]\n`;
  plan += `- **QA**: [Assign QA resources here]\n`;
  plan += `- **Estimated Effort**: ${plannedIssues.length * 4} hours (avg 4 hours per issue)\n\n`;
  
  plan += `## Success Criteria\n\n`;
  plan += `- [ ] All Tier 1 issues resolved\n`;
  plan += `- [ ] All Tier 2 issues resolved\n`;
  plan += `- [ ] All fixes verified by QA\n`;
  plan += `- [ ] All fixes confirmed by beta testers\n`;
  plan += `- [ ] No critical regressions introduced\n`;
  plan += `- [ ] Test coverage maintained or improved\n`;
  plan += `- [ ] Documentation updated\n\n`;
  
  plan += `## Daily Standup Questions\n\n`;
  plan += `1. What issues did you fix yesterday?\n`;
  plan += `2. What issues are you working on today?\n`;
  plan += `3. Any blockers or concerns?\n\n`;
  
  plan += `## Notes\n\n`;
  plan += `[Add any additional notes or context here]\n\n`;
  
  plan += `---\n\n`;
  plan += `**Created**: ${new Date().toISOString()}\n`;
  plan += `**Status**: In Progress\n`;
  
  return plan;
}

/**
 * Create iteration report template
 */
function createIterationReportTemplate(config: IterationConfig): string {
  let report = `# Iteration ${config.iterationNumber} Report\n\n`;
  report += `**Period**: ${config.startDate} to ${config.endDate}\n`;
  report += `**Duration**: 14 days\n\n`;
  
  report += `## Summary\n\n`;
  report += `- **Issues Fixed**: [To be filled]\n`;
  report += `- **Issues Remaining**: [To be filled]\n`;
  report += `- **Regressions Found**: [To be filled]\n`;
  report += `- **New Issues**: [To be filled]\n\n`;
  
  report += `## Issues by Tier\n\n`;
  report += `### Tier 1 (Critical)\n`;
  report += `- Started: [X]\n`;
  report += `- Fixed: [X]\n`;
  report += `- Remaining: [X]\n\n`;
  
  report += `### Tier 2 (High Priority)\n`;
  report += `- Started: [X]\n`;
  report += `- Fixed: [X]\n`;
  report += `- Remaining: [X]\n\n`;
  
  report += `### Tier 3 (Medium Priority)\n`;
  report += `- Started: [X]\n`;
  report += `- Fixed: [X]\n`;
  report += `- Remaining: [X]\n\n`;
  
  report += `## Fixed Issues\n\n`;
  report += `[List fixed issues here]\n\n`;
  
  report += `## Remaining Issues\n\n`;
  report += `[List remaining issues here]\n\n`;
  
  report += `## Regressions\n\n`;
  report += `[List any regressions found]\n\n`;
  
  report += `## New Issues Discovered\n\n`;
  report += `[List any new issues]\n\n`;
  
  report += `## Metrics\n\n`;
  report += `- **Fix Success Rate**: [X]%\n`;
  report += `- **Regression Rate**: [X]%\n`;
  report += `- **Average Fix Time**: [X] hours\n`;
  report += `- **Test Coverage**: [X]%\n\n`;
  
  report += `## Blockers\n\n`;
  report += `[List any blockers]\n\n`;
  
  report += `## Next Iteration Plan\n\n`;
  report += `- **Start Date**: [Date]\n`;
  report += `- **Focus**: [Description]\n`;
  report += `- **Goals**: [List goals]\n\n`;
  
  report += `## Notes\n\n`;
  report += `[Any additional notes]\n\n`;
  
  report += `---\n\n`;
  report += `**Prepared By**: [Name]\n`;
  report += `**Date**: [Date]\n`;
  report += `**Status**: Template\n`;
  
  return report;
}

/**
 * Save iteration files
 */
function saveIterationFiles(config: IterationConfig, plan: string, reportTemplate: string): void {
  const specsDir = path.join(process.cwd(), '.kiro/specs/modern-ui-ux-redesign');
  
  // Save iteration plan
  const planPath = path.join(specsDir, `ITERATION_${config.iterationNumber}_PLAN.md`);
  fs.writeFileSync(planPath, plan);
  console.log(`✅ Iteration plan saved: ${planPath}`);
  
  // Save report template
  const reportPath = path.join(specsDir, `ITERATION_${config.iterationNumber}_REPORT.md`);
  fs.writeFileSync(reportPath, reportTemplate);
  console.log(`✅ Report template saved: ${reportPath}`);
}

/**
 * Display iteration summary
 */
function displaySummary(config: IterationConfig, plannedIssuesCount: number): void {
  console.log('\n' + '='.repeat(60));
  console.log(`🚀 Iteration ${config.iterationNumber} Started`);
  console.log('='.repeat(60));
  console.log(`\n📅 Duration: ${config.startDate} to ${config.endDate}`);
  console.log(`\n🎯 Goals:`);
  config.goals.forEach((goal, i) => {
    console.log(`   ${i + 1}. ${goal}`);
  });
  console.log(`\n📋 Planned Issues: ${plannedIssuesCount}`);
  console.log(`\n✅ Next Steps:`);
  console.log(`   1. Review iteration plan`);
  console.log(`   2. Assign issues to developers`);
  console.log(`   3. Start daily standups`);
  console.log(`   4. Track progress with: npm run iteration:track`);
  console.log('\n' + '='.repeat(60) + '\n');
}

/**
 * Main function
 */
function main(): void {
  console.log('🚀 Starting new iteration...\n');
  
  // Load feedback data
  console.log('📊 Loading feedback data...');
  const feedback = loadFeedbackData();
  console.log(`✅ Loaded ${feedback.length} feedback items\n`);
  
  // Get iteration configuration
  console.log('⚙️  Configuring iteration...');
  const config = getIterationConfig();
  console.log(`✅ Iteration ${config.iterationNumber} configured\n`);
  
  // Generate iteration plan
  console.log('📝 Generating iteration plan...');
  const plan = generateIterationPlan(feedback, config);
  const plannedIssuesCount = (plan.match(/- \*\*#\d+\*\*/g) || []).length;
  console.log(`✅ Plan generated with ${plannedIssuesCount} issues\n`);
  
  // Create report template
  console.log('📄 Creating report template...');
  const reportTemplate = createIterationReportTemplate(config);
  console.log('✅ Report template created\n');
  
  // Save files
  console.log('💾 Saving iteration files...');
  saveIterationFiles(config, plan, reportTemplate);
  console.log('');
  
  // Display summary
  displaySummary(config, plannedIssuesCount);
}

// Run the script
main();
