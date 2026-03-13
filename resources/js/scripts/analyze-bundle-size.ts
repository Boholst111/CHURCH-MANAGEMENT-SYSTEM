/**
 * Bundle Size Analysis Script
 * 
 * This script analyzes the production bundle sizes and compares them
 * against the performance targets defined in the design document.
 * 
 * Targets:
 * - Initial bundle: < 200KB (gzipped)
 * - Per-route chunks: < 100KB (gzipped)
 * - Total JavaScript: < 500KB (gzipped)
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface BundleInfo {
  name: string;
  size: number;
  gzipSize: number;
  path: string;
}

interface BundleAnalysis {
  bundles: BundleInfo[];
  totalSize: number;
  totalGzipSize: number;
  mainBundle?: BundleInfo;
  chunks: BundleInfo[];
  meetsTargets: boolean;
  issues: string[];
}

const TARGETS = {
  initialBundle: 200 * 1024, // 200KB in bytes
  perRouteChunk: 100 * 1024, // 100KB in bytes
  totalJavaScript: 500 * 1024, // 500KB in bytes
};

function getFileSize(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function getGzipSize(filePath: string): number {
  try {
    // Create a temporary gzipped file
    const tempFile = `${filePath}.gz`;
    execSync(`gzip -c "${filePath}" > "${tempFile}"`, { stdio: 'pipe' });
    const size = getFileSize(tempFile);
    fs.unlinkSync(tempFile);
    return size;
  } catch (error) {
    console.warn(`Could not gzip ${filePath}:`, error);
    return 0;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeBundles(publicDir: string): BundleAnalysis {
  const jsDir = path.join(publicDir, 'js');
  const bundles: BundleInfo[] = [];
  const issues: string[] = [];

  if (!fs.existsSync(jsDir)) {
    return {
      bundles: [],
      totalSize: 0,
      totalGzipSize: 0,
      chunks: [],
      meetsTargets: false,
      issues: ['JavaScript directory not found. Run npm run production first.'],
    };
  }

  // Read all JS files
  const files = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));

  for (const file of files) {
    const filePath = path.join(jsDir, file);
    const size = getFileSize(filePath);
    const gzipSize = getGzipSize(filePath);

    bundles.push({
      name: file,
      size,
      gzipSize,
      path: filePath,
    });
  }

  // Sort by size (largest first)
  bundles.sort((a, b) => b.gzipSize - a.gzipSize);

  // Identify main bundle (usually app.js)
  const mainBundle = bundles.find(b => b.name === 'app.js' || b.name.startsWith('app.'));
  const chunks = bundles.filter(b => b !== mainBundle);

  // Calculate totals
  const totalSize = bundles.reduce((sum, b) => sum + b.size, 0);
  const totalGzipSize = bundles.reduce((sum, b) => sum + b.gzipSize, 0);

  // Check against targets
  if (mainBundle && mainBundle.gzipSize > TARGETS.initialBundle) {
    issues.push(
      `Main bundle (${formatBytes(mainBundle.gzipSize)}) exceeds target of ${formatBytes(TARGETS.initialBundle)}`
    );
  }

  for (const chunk of chunks) {
    if (chunk.gzipSize > TARGETS.perRouteChunk) {
      issues.push(
        `Chunk ${chunk.name} (${formatBytes(chunk.gzipSize)}) exceeds target of ${formatBytes(TARGETS.perRouteChunk)}`
      );
    }
  }

  if (totalGzipSize > TARGETS.totalJavaScript) {
    issues.push(
      `Total JavaScript (${formatBytes(totalGzipSize)}) exceeds target of ${formatBytes(TARGETS.totalJavaScript)}`
    );
  }

  return {
    bundles,
    totalSize,
    totalGzipSize,
    mainBundle,
    chunks,
    meetsTargets: issues.length === 0,
    issues,
  };
}

function printReport(analysis: BundleAnalysis): void {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║              BUNDLE SIZE ANALYSIS REPORT                       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Targets
  console.log('📊 Performance Targets:');
  console.log(`   Initial bundle:    < ${formatBytes(TARGETS.initialBundle)} (gzipped)`);
  console.log(`   Per-route chunks:  < ${formatBytes(TARGETS.perRouteChunk)} (gzipped)`);
  console.log(`   Total JavaScript:  < ${formatBytes(TARGETS.totalJavaScript)} (gzipped)`);
  console.log('');

  // Main bundle
  if (analysis.mainBundle) {
    const status = analysis.mainBundle.gzipSize <= TARGETS.initialBundle ? '✅' : '❌';
    console.log(`${status} Main Bundle: ${analysis.mainBundle.name}`);
    console.log(`   Size:        ${formatBytes(analysis.mainBundle.size)}`);
    console.log(`   Gzipped:     ${formatBytes(analysis.mainBundle.gzipSize)}`);
    console.log(`   Target:      < ${formatBytes(TARGETS.initialBundle)}`);
    console.log('');
  }

  // Chunks
  if (analysis.chunks.length > 0) {
    console.log('📦 Route Chunks:');
    for (const chunk of analysis.chunks) {
      const status = chunk.gzipSize <= TARGETS.perRouteChunk ? '✅' : '❌';
      console.log(`${status} ${chunk.name}`);
      console.log(`   Size:        ${formatBytes(chunk.size)}`);
      console.log(`   Gzipped:     ${formatBytes(chunk.gzipSize)}`);
    }
    console.log('');
  }

  // Total
  const totalStatus = analysis.totalGzipSize <= TARGETS.totalJavaScript ? '✅' : '❌';
  console.log(`${totalStatus} Total JavaScript:`);
  console.log(`   Size:        ${formatBytes(analysis.totalSize)}`);
  console.log(`   Gzipped:     ${formatBytes(analysis.totalGzipSize)}`);
  console.log(`   Target:      < ${formatBytes(TARGETS.totalJavaScript)}`);
  console.log('');

  // Issues
  if (analysis.issues.length > 0) {
    console.log('⚠️  Issues Found:');
    for (const issue of analysis.issues) {
      console.log(`   • ${issue}`);
    }
    console.log('');
    console.log('💡 Optimization Suggestions:');
    console.log('   • Enable code splitting for large components');
    console.log('   • Use dynamic imports for routes');
    console.log('   • Remove unused dependencies');
    console.log('   • Enable tree shaking');
    console.log('   • Consider lazy loading heavy libraries');
    console.log('');
  } else {
    console.log('✅ All bundle size targets met!');
    console.log('');
  }

  // Summary
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Status: ${analysis.meetsTargets ? '✅ PASSED' : '❌ FAILED'}`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}

// Main execution
const publicDir = path.join(process.cwd(), 'public');
const analysis = analyzeBundles(publicDir);
printReport(analysis);

// Exit with error code if targets not met
process.exit(analysis.meetsTargets ? 0 : 1);
