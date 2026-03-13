/**
 * Beta Feedback Analysis Script
 * 
 * This script analyzes beta feedback data to identify patterns, prioritize issues,
 * and generate actionable insights for the development team.
 */

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

interface FeedbackAnalysis {
  summary: {
    total: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
    byStatus: Record<string, number>;
    byPage: Record<string, number>;
  };
  criticalIssues: BetaFeedback[];
  highPriorityIssues: BetaFeedback[];
  commonPatterns: {
    pattern: string;
    count: number;
    examples: BetaFeedback[];
  }[];
  userEngagement: {
    totalUsers: number;
    feedbackPerUser: Record<string, number>;
    mostActiveUsers: { name: string; email: string; count: number }[];
  };
  pageIssues: {
    page: string;
    issueCount: number;
    criticalCount: number;
    highCount: number;
  }[];
  recommendations: string[];
}

/**
 * Analyze beta feedback data
 */
export function analyzeFeedback(feedbackData: BetaFeedback[]): FeedbackAnalysis {
  const analysis: FeedbackAnalysis = {
    summary: {
      total: feedbackData.length,
      byType: {},
      bySeverity: {},
      byStatus: {},
      byPage: {},
    },
    criticalIssues: [],
    highPriorityIssues: [],
    commonPatterns: [],
    userEngagement: {
      totalUsers: 0,
      feedbackPerUser: {},
      mostActiveUsers: [],
    },
    pageIssues: [],
    recommendations: [],
  };

  // Count by type, severity, status, and page
  feedbackData.forEach((feedback) => {
    // By type
    analysis.summary.byType[feedback.type] = 
      (analysis.summary.byType[feedback.type] || 0) + 1;

    // By severity
    analysis.summary.bySeverity[feedback.severity] = 
      (analysis.summary.bySeverity[feedback.severity] || 0) + 1;

    // By status
    analysis.summary.byStatus[feedback.status] = 
      (analysis.summary.byStatus[feedback.status] || 0) + 1;

    // By page
    analysis.summary.byPage[feedback.page] = 
      (analysis.summary.byPage[feedback.page] || 0) + 1;

    // Collect critical and high priority issues
    if (feedback.severity === 'critical' && feedback.status !== 'resolved') {
      analysis.criticalIssues.push(feedback);
    }
    if (feedback.severity === 'high' && feedback.status !== 'resolved') {
      analysis.highPriorityIssues.push(feedback);
    }

    // Track user engagement
    const userKey = `${feedback.user_name} (${feedback.user_email})`;
    analysis.userEngagement.feedbackPerUser[userKey] = 
      (analysis.userEngagement.feedbackPerUser[userKey] || 0) + 1;
  });

  // Calculate user engagement metrics
  analysis.userEngagement.totalUsers = Object.keys(
    analysis.userEngagement.feedbackPerUser
  ).length;

  analysis.userEngagement.mostActiveUsers = Object.entries(
    analysis.userEngagement.feedbackPerUser
  )
    .map(([user, count]) => {
      const [name, email] = user.split(' (');
      return {
        name,
        email: email.replace(')', ''),
        count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Identify common patterns
  analysis.commonPatterns = identifyPatterns(feedbackData);

  // Analyze page-specific issues
  analysis.pageIssues = Object.entries(analysis.summary.byPage)
    .map(([page, issueCount]) => {
      const criticalCount = feedbackData.filter(
        (f) => f.page === page && f.severity === 'critical'
      ).length;
      const highCount = feedbackData.filter(
        (f) => f.page === page && f.severity === 'high'
      ).length;

      return {
        page,
        issueCount,
        criticalCount,
        highCount,
      };
    })
    .sort((a, b) => {
      // Sort by critical first, then high, then total
      if (a.criticalCount !== b.criticalCount) {
        return b.criticalCount - a.criticalCount;
      }
      if (a.highCount !== b.highCount) {
        return b.highCount - a.highCount;
      }
      return b.issueCount - a.issueCount;
    });

  // Generate recommendations
  analysis.recommendations = generateRecommendations(analysis, feedbackData);

  return analysis;
}

/**
 * Identify common patterns in feedback
 */
function identifyPatterns(feedbackData: BetaFeedback[]): {
  pattern: string;
  count: number;
  examples: BetaFeedback[];
}[] {
  const patterns: Map<string, BetaFeedback[]> = new Map();

  // Keywords to look for
  const keywords = [
    'slow',
    'loading',
    'error',
    'crash',
    'broken',
    'not working',
    'confusing',
    'unclear',
    'mobile',
    'responsive',
    'button',
    'form',
    'validation',
    'save',
    'delete',
    'search',
    'filter',
    'navigation',
    'menu',
    'sidebar',
    'modal',
    'table',
  ];

  feedbackData.forEach((feedback) => {
    const text = `${feedback.description} ${feedback.steps_to_reproduce || ''} ${
      feedback.actual_behavior || ''
    }`.toLowerCase();

    keywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        if (!patterns.has(keyword)) {
          patterns.set(keyword, []);
        }
        patterns.get(keyword)!.push(feedback);
      }
    });
  });

  return Array.from(patterns.entries())
    .map(([pattern, examples]) => ({
      pattern,
      count: examples.length,
      examples: examples.slice(0, 3), // Keep top 3 examples
    }))
    .filter((p) => p.count >= 2) // Only patterns with 2+ occurrences
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 patterns
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(
  analysis: FeedbackAnalysis,
  feedbackData: BetaFeedback[]
): string[] {
  const recommendations: string[] = [];

  // Critical issues
  if (analysis.criticalIssues.length > 0) {
    recommendations.push(
      `🚨 URGENT: ${analysis.criticalIssues.length} critical issue(s) require immediate attention before production deployment.`
    );
  }

  // High priority issues
  if (analysis.highPriorityIssues.length > 5) {
    recommendations.push(
      `⚠️ ${analysis.highPriorityIssues.length} high-priority issues identified. Consider addressing these before full rollout.`
    );
  }

  // Page-specific issues
  if (analysis.pageIssues.length > 0 && analysis.pageIssues[0].criticalCount > 0) {
    recommendations.push(
      `📄 The "${analysis.pageIssues[0].page}" page has ${analysis.pageIssues[0].criticalCount} critical issue(s). Prioritize fixes for this page.`
    );
  }

  // User engagement
  if (analysis.userEngagement.totalUsers < 5) {
    recommendations.push(
      `👥 Low beta tester participation (${analysis.userEngagement.totalUsers} users). Consider inviting more testers for broader feedback.`
    );
  }

  // Common patterns
  if (analysis.commonPatterns.length > 0) {
    const topPattern = analysis.commonPatterns[0];
    recommendations.push(
      `🔍 "${topPattern.pattern}" mentioned in ${topPattern.count} feedback items. This may indicate a systemic issue.`
    );
  }

  // Status tracking
  const unresolvedCount =
    (analysis.summary.byStatus['new'] || 0) +
    (analysis.summary.byStatus['in_progress'] || 0);
  const resolvedCount = analysis.summary.byStatus['resolved'] || 0;
  const resolutionRate =
    analysis.summary.total > 0
      ? ((resolvedCount / analysis.summary.total) * 100).toFixed(1)
      : '0';

  recommendations.push(
    `📊 Resolution rate: ${resolutionRate}% (${resolvedCount}/${analysis.summary.total}). ${
      unresolvedCount > 0
        ? `${unresolvedCount} issue(s) still need attention.`
        : 'All issues resolved!'
    }`
  );

  // Feature requests
  const featureRequestCount = analysis.summary.byType['feature_request'] || 0;
  if (featureRequestCount > 0) {
    recommendations.push(
      `💡 ${featureRequestCount} feature request(s) received. Review for potential post-launch enhancements.`
    );
  }

  return recommendations;
}

/**
 * Generate a priority score for feedback items
 */
export function calculatePriorityScore(feedback: BetaFeedback): number {
  let score = 0;

  // Severity weight
  const severityWeights = {
    critical: 100,
    high: 50,
    medium: 20,
    low: 5,
  };
  score += severityWeights[feedback.severity];

  // Type weight
  const typeWeights = {
    bug: 30,
    feature_request: 10,
    general: 5,
  };
  score += typeWeights[feedback.type];

  // Status penalty (resolved items get lower priority)
  if (feedback.status === 'resolved') {
    score *= 0.1;
  } else if (feedback.status === 'wont_fix') {
    score *= 0.05;
  } else if (feedback.status === 'in_progress') {
    score *= 0.8;
  }

  return score;
}

/**
 * Sort feedback by priority
 */
export function prioritizeFeedback(feedbackData: BetaFeedback[]): BetaFeedback[] {
  return [...feedbackData]
    .map(item => ({
      ...item,
      priorityScore: calculatePriorityScore(item)
    }))
    .sort((a, b) => {
      const scoreA = a.priorityScore!;
      const scoreB = b.priorityScore!;
      return scoreB - scoreA;
    });
}

/**
 * Export analysis to markdown report
 */
export function exportToMarkdown(analysis: FeedbackAnalysis): string {
  const timestamp = new Date().toISOString().split('T')[0];

  let markdown = `# Beta Testing Feedback Analysis Report\n\n`;
  markdown += `**Generated**: ${timestamp}\n\n`;
  markdown += `---\n\n`;

  // Summary
  markdown += `## Summary\n\n`;
  markdown += `- **Total Feedback**: ${analysis.summary.total}\n`;
  markdown += `- **Beta Users**: ${analysis.userEngagement.totalUsers}\n`;
  markdown += `- **Critical Issues**: ${analysis.criticalIssues.length}\n`;
  markdown += `- **High Priority Issues**: ${analysis.highPriorityIssues.length}\n\n`;

  // Breakdown by type
  markdown += `### Feedback by Type\n\n`;
  Object.entries(analysis.summary.byType).forEach(([type, count]) => {
    markdown += `- **${type}**: ${count}\n`;
  });
  markdown += `\n`;

  // Breakdown by severity
  markdown += `### Feedback by Severity\n\n`;
  Object.entries(analysis.summary.bySeverity).forEach(([severity, count]) => {
    markdown += `- **${severity}**: ${count}\n`;
  });
  markdown += `\n`;

  // Breakdown by status
  markdown += `### Feedback by Status\n\n`;
  Object.entries(analysis.summary.byStatus).forEach(([status, count]) => {
    markdown += `- **${status}**: ${count}\n`;
  });
  markdown += `\n`;

  // Recommendations
  markdown += `## Recommendations\n\n`;
  analysis.recommendations.forEach((rec) => {
    markdown += `${rec}\n\n`;
  });

  // Critical Issues
  if (analysis.criticalIssues.length > 0) {
    markdown += `## Critical Issues (${analysis.criticalIssues.length})\n\n`;
    analysis.criticalIssues.forEach((issue, index) => {
      markdown += `### ${index + 1}. ${issue.page}\n\n`;
      markdown += `- **Type**: ${issue.type}\n`;
      markdown += `- **Status**: ${issue.status}\n`;
      markdown += `- **Reported by**: ${issue.user_name}\n`;
      markdown += `- **Description**: ${issue.description}\n`;
      if (issue.steps_to_reproduce) {
        markdown += `- **Steps to Reproduce**:\n${issue.steps_to_reproduce}\n`;
      }
      markdown += `\n`;
    });
  }

  // High Priority Issues
  if (analysis.highPriorityIssues.length > 0) {
    markdown += `## High Priority Issues (${analysis.highPriorityIssues.length})\n\n`;
    analysis.highPriorityIssues.forEach((issue, index) => {
      markdown += `### ${index + 1}. ${issue.page}\n\n`;
      markdown += `- **Type**: ${issue.type}\n`;
      markdown += `- **Status**: ${issue.status}\n`;
      markdown += `- **Reported by**: ${issue.user_name}\n`;
      markdown += `- **Description**: ${issue.description}\n\n`;
    });
  }

  // Common Patterns
  if (analysis.commonPatterns.length > 0) {
    markdown += `## Common Patterns\n\n`;
    analysis.commonPatterns.forEach((pattern) => {
      markdown += `### "${pattern.pattern}" (${pattern.count} occurrences)\n\n`;
      pattern.examples.forEach((example) => {
        markdown += `- ${example.page}: ${example.description.substring(0, 100)}...\n`;
      });
      markdown += `\n`;
    });
  }

  // Page Issues
  if (analysis.pageIssues.length > 0) {
    markdown += `## Issues by Page\n\n`;
    markdown += `| Page | Total Issues | Critical | High |\n`;
    markdown += `|------|--------------|----------|------|\n`;
    analysis.pageIssues.forEach((page) => {
      markdown += `| ${page.page} | ${page.issueCount} | ${page.criticalCount} | ${page.highCount} |\n`;
    });
    markdown += `\n`;
  }

  // User Engagement
  markdown += `## User Engagement\n\n`;
  markdown += `### Most Active Beta Testers\n\n`;
  analysis.userEngagement.mostActiveUsers.forEach((user, index) => {
    markdown += `${index + 1}. **${user.name}** (${user.email}) - ${user.count} feedback items\n`;
  });
  markdown += `\n`;

  markdown += `---\n\n`;
  markdown += `*This report was automatically generated by the Beta Feedback Analysis Script*\n`;

  return markdown;
}

/**
 * Export analysis to JSON
 */
export function exportToJSON(analysis: FeedbackAnalysis): string {
  return JSON.stringify(analysis, null, 2);
}
