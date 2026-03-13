#!/usr/bin/env ts-node

/**
 * Generate Beta Feedback Report CLI
 * 
 * Usage:
 *   npm run feedback:report
 *   npm run feedback:report -- --format=json
 *   npm run feedback:report -- --output=./reports/feedback.md
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  analyzeFeedback,
  prioritizeFeedback,
  exportToMarkdown,
  exportToJSON,
} from './analyze-beta-feedback';

interface BetaFeedback {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  type: 'bug' | 'feature_request' | 'general';
  severity: 'critical' | 'high' | 'medium' | 'low';
  page: string;
  description: string;
  steps_to_reproduce?: string;
  expected_behavior?: string;
  actual_behavior?: string;
  browser_info?: string;
  status: 'new' | 'in_progress' | 'resolved' | 'wont_fix';
  admin_notes?: string;
  priorityScore?: number;
  created_at: string;
  updated_at: string;
}

// Parse command line arguments
const args = process.argv.slice(2);
const format = args.find((arg) => arg.startsWith('--format='))?.split('=')[1] || 'markdown';
const outputPath = args.find((arg) => arg.startsWith('--output='))?.split('=')[1];

async function fetchFeedbackData(): Promise<BetaFeedback[]> {
  // In a real implementation, this would fetch from the API
  // For now, we'll read from a JSON file if it exists
  const dataPath = path.join(process.cwd(), 'storage', 'beta-feedback-data.json');
  
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  }

  console.warn('No feedback data found. Please export data from the database first.');
  console.warn('Run: php artisan beta:export-feedback');
  return [];
}

async function main() {
  console.log('🔍 Fetching beta feedback data...');
  const feedbackData = await fetchFeedbackData();

  if (feedbackData.length === 0) {
    console.error('❌ No feedback data available.');
    process.exit(1);
  }

  console.log(`✅ Found ${feedbackData.length} feedback items`);
  console.log('📊 Analyzing feedback...');

  const analysis = analyzeFeedback(feedbackData);
  const prioritized = prioritizeFeedback(feedbackData);

  console.log('\n📈 Analysis Summary:');
  console.log(`   Total Feedback: ${analysis.summary.total}`);
  console.log(`   Beta Users: ${analysis.userEngagement.totalUsers}`);
  console.log(`   Critical Issues: ${analysis.criticalIssues.length}`);
  console.log(`   High Priority Issues: ${analysis.highPriorityIssues.length}`);

  // Generate report
  let report: string;
  let extension: string;

  if (format === 'json') {
    report = exportToJSON(analysis);
    extension = 'json';
  } else {
    report = exportToMarkdown(analysis);
    extension = 'md';
  }

  // Determine output path
  const timestamp = new Date().toISOString().split('T')[0];
  const defaultOutputPath = path.join(
    process.cwd(),
    '.kiro',
    'specs',
    'modern-ui-ux-redesign',
    `BETA_FEEDBACK_REPORT_${timestamp}.${extension}`
  );
  const finalOutputPath = outputPath || defaultOutputPath;

  // Ensure directory exists
  const dir = path.dirname(finalOutputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write report
  fs.writeFileSync(finalOutputPath, report, 'utf-8');

  console.log(`\n✅ Report generated successfully!`);
  console.log(`📄 Output: ${finalOutputPath}`);

  // Display recommendations
  if (analysis.recommendations.length > 0) {
    console.log('\n💡 Key Recommendations:');
    analysis.recommendations.forEach((rec) => {
      console.log(`   ${rec}`);
    });
  }

  // Display top priority issues
  if (prioritized.length > 0) {
    console.log('\n🔥 Top 5 Priority Issues:');
    prioritized.slice(0, 5).forEach((issue, index) => {
      console.log(
        `   ${index + 1}. [${issue.severity.toUpperCase()}] ${issue.page}: ${issue.description.substring(0, 60)}...`
      );
    });
  }

  console.log('\n✨ Done!');
}

main().catch((error) => {
  console.error('❌ Error generating report:', error);
  process.exit(1);
});
