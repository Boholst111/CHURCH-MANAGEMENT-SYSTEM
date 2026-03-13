/**
 * Deployment Monitoring Script
 * 
 * This script helps monitor the Modern UI deployment by checking key metrics
 * and providing real-time feedback on system health.
 */

interface DeploymentMetrics {
  featureFlags: {
    enabled: boolean;
    rolloutPercentage: number;
    betaUsers: number[];
    enabledUsers: number;
    totalUsers: number;
  };
  performance: {
    avgResponseTime: number;
    errorRate: number;
    activeUsers: number;
  };
  errors: {
    jsErrors: number;
    apiErrors: number;
    criticalErrors: number;
  };
  userFeedback: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

/**
 * Fetch current deployment metrics
 */
async function fetchDeploymentMetrics(): Promise<DeploymentMetrics> {
  try {
    const response = await fetch('/api/admin/deployment-metrics', {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch deployment metrics:', error);
    throw error;
  }
}

/**
 * Check if metrics are within acceptable thresholds
 */
function checkMetricsHealth(metrics: DeploymentMetrics): {
  healthy: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check error rate (should be < 1%)
  if (metrics.performance.errorRate > 1) {
    errors.push(`High error rate: ${metrics.performance.errorRate.toFixed(2)}%`);
  } else if (metrics.performance.errorRate > 0.5) {
    warnings.push(`Elevated error rate: ${metrics.performance.errorRate.toFixed(2)}%`);
  }

  // Check response time (should be < 500ms)
  if (metrics.performance.avgResponseTime > 1000) {
    errors.push(`Slow response time: ${metrics.performance.avgResponseTime}ms`);
  } else if (metrics.performance.avgResponseTime > 500) {
    warnings.push(`Elevated response time: ${metrics.performance.avgResponseTime}ms`);
  }

  // Check critical errors (should be 0)
  if (metrics.errors.criticalErrors > 0) {
    errors.push(`Critical errors detected: ${metrics.errors.criticalErrors}`);
  }

  // Check JavaScript errors (should be minimal)
  if (metrics.errors.jsErrors > 10) {
    warnings.push(`High JavaScript error count: ${metrics.errors.jsErrors}`);
  }

  // Check user feedback sentiment
  const totalFeedback = metrics.userFeedback.positive + metrics.userFeedback.negative + metrics.userFeedback.neutral;
  if (totalFeedback > 0) {
    const negativePercentage = (metrics.userFeedback.negative / totalFeedback) * 100;
    if (negativePercentage > 30) {
      warnings.push(`High negative feedback: ${negativePercentage.toFixed(1)}%`);
    }
  }

  return {
    healthy: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Display metrics in console
 */
function displayMetrics(metrics: DeploymentMetrics): void {
  console.log('\n=== Modern UI Deployment Metrics ===\n');

  // Feature Flags
  console.log('📊 Feature Flags:');
  console.log(`  Enabled: ${metrics.featureFlags.enabled ? '✅ Yes' : '❌ No'}`);
  console.log(`  Rollout: ${metrics.featureFlags.rolloutPercentage}%`);
  console.log(`  Enabled Users: ${metrics.featureFlags.enabledUsers} / ${metrics.featureFlags.totalUsers}`);
  console.log(`  Beta Users: ${metrics.featureFlags.betaUsers.length}`);

  // Performance
  console.log('\n⚡ Performance:');
  console.log(`  Avg Response Time: ${metrics.performance.avgResponseTime}ms`);
  console.log(`  Error Rate: ${metrics.performance.errorRate.toFixed(2)}%`);
  console.log(`  Active Users: ${metrics.performance.activeUsers}`);

  // Errors
  console.log('\n🐛 Errors:');
  console.log(`  JavaScript Errors: ${metrics.errors.jsErrors}`);
  console.log(`  API Errors: ${metrics.errors.apiErrors}`);
  console.log(`  Critical Errors: ${metrics.errors.criticalErrors}`);

  // User Feedback
  console.log('\n💬 User Feedback:');
  const totalFeedback = metrics.userFeedback.positive + metrics.userFeedback.negative + metrics.userFeedback.neutral;
  if (totalFeedback > 0) {
    console.log(`  Positive: ${metrics.userFeedback.positive} (${((metrics.userFeedback.positive / totalFeedback) * 100).toFixed(1)}%)`);
    console.log(`  Negative: ${metrics.userFeedback.negative} (${((metrics.userFeedback.negative / totalFeedback) * 100).toFixed(1)}%)`);
    console.log(`  Neutral: ${metrics.userFeedback.neutral} (${((metrics.userFeedback.neutral / totalFeedback) * 100).toFixed(1)}%)`);
  } else {
    console.log('  No feedback yet');
  }

  // Health Check
  const health = checkMetricsHealth(metrics);
  console.log('\n🏥 Health Status:');
  if (health.healthy) {
    console.log('  ✅ All systems healthy');
  } else {
    console.log('  ⚠️ Issues detected');
  }

  if (health.errors.length > 0) {
    console.log('\n❌ Errors:');
    health.errors.forEach(error => console.log(`  - ${error}`));
  }

  if (health.warnings.length > 0) {
    console.log('\n⚠️ Warnings:');
    health.warnings.forEach(warning => console.log(`  - ${warning}`));
  }

  console.log('\n===================================\n');
}

/**
 * Monitor deployment continuously
 */
async function monitorDeployment(intervalSeconds: number = 60): Promise<void> {
  console.log(`Starting deployment monitoring (checking every ${intervalSeconds}s)...`);
  console.log('Press Ctrl+C to stop\n');

  const check = async () => {
    try {
      const metrics = await fetchDeploymentMetrics();
      displayMetrics(metrics);

      const health = checkMetricsHealth(metrics);
      if (!health.healthy) {
        console.log('⚠️ ALERT: System health check failed!');
        console.log('Consider rolling back or investigating issues immediately.\n');
      }
    } catch (error) {
      console.error('❌ Failed to fetch metrics:', error);
    }
  };

  // Initial check
  await check();

  // Periodic checks
  setInterval(check, intervalSeconds * 1000);
}

/**
 * Generate deployment report
 */
async function generateDeploymentReport(): Promise<void> {
  try {
    console.log('Generating deployment report...\n');

    const metrics = await fetchDeploymentMetrics();
    const health = checkMetricsHealth(metrics);

    const report = {
      timestamp: new Date().toISOString(),
      metrics,
      health,
      recommendations: generateRecommendations(metrics, health),
    };

    console.log('=== Deployment Report ===\n');
    console.log(JSON.stringify(report, null, 2));
    console.log('\n========================\n');

    // Save to file (if running in Node.js environment)
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      const fs = require('fs');
      const filename = `deployment-report-${Date.now()}.json`;
      fs.writeFileSync(filename, JSON.stringify(report, null, 2));
      console.log(`Report saved to: ${filename}`);
    }
  } catch (error) {
    console.error('Failed to generate report:', error);
  }
}

/**
 * Generate recommendations based on metrics
 */
function generateRecommendations(
  metrics: DeploymentMetrics,
  health: { healthy: boolean; warnings: string[]; errors: string[] }
): string[] {
  const recommendations: string[] = [];

  // If there are critical errors, recommend immediate rollback
  if (metrics.errors.criticalErrors > 0) {
    recommendations.push('URGENT: Critical errors detected. Consider immediate rollback.');
  }

  // If error rate is high, recommend investigation
  if (metrics.performance.errorRate > 1) {
    recommendations.push('High error rate detected. Investigate error logs and consider reducing rollout percentage.');
  }

  // If response time is slow, recommend performance optimization
  if (metrics.performance.avgResponseTime > 1000) {
    recommendations.push('Slow response times detected. Check server resources and optimize queries.');
  }

  // If negative feedback is high, recommend user communication
  const totalFeedback = metrics.userFeedback.positive + metrics.userFeedback.negative + metrics.userFeedback.neutral;
  if (totalFeedback > 0) {
    const negativePercentage = (metrics.userFeedback.negative / totalFeedback) * 100;
    if (negativePercentage > 30) {
      recommendations.push('High negative feedback. Review user complaints and consider addressing common issues.');
    }
  }

  // If rollout is low and metrics are good, recommend increasing
  if (metrics.featureFlags.rolloutPercentage < 100 && health.healthy && health.warnings.length === 0) {
    recommendations.push('Metrics look good. Consider increasing rollout percentage.');
  }

  // If everything is healthy at 100%, recommend proceeding to cleanup
  if (metrics.featureFlags.rolloutPercentage === 100 && health.healthy && health.warnings.length === 0) {
    recommendations.push('Deployment successful! After 30 days of stable operation, proceed with old UI cleanup (Task 30.2).');
  }

  return recommendations;
}

// Export functions for use in other scripts
export {
  fetchDeploymentMetrics,
  checkMetricsHealth,
  displayMetrics,
  monitorDeployment,
  generateDeploymentReport,
  generateRecommendations,
};

// CLI usage (if running directly)
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('monitor-deployment')) {
  const command = process.argv[2];

  switch (command) {
    case 'monitor':
      const interval = parseInt(process.argv[3] || '60', 10);
      monitorDeployment(interval);
      break;
    case 'report':
      generateDeploymentReport();
      break;
    case 'check':
      fetchDeploymentMetrics()
        .then(displayMetrics)
        .catch(console.error);
      break;
    default:
      console.log('Usage:');
      console.log('  npm run monitor-deployment monitor [interval]  - Monitor continuously');
      console.log('  npm run monitor-deployment check              - Check once');
      console.log('  npm run monitor-deployment report             - Generate report');
  }
}
