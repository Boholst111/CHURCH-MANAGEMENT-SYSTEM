/**
 * Property-Based Test: Dependency Preservation During Package Merge
 * 
 * **Validates: Requirements 7.1**
 * 
 * This test verifies that all dependencies from client.backup/package.json
 * have been preserved in the root package.json with versions equal to or newer
 * than the original versions.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Migration Property Tests', () => {
  describe('Property 3: Dependency Preservation During Package Merge', () => {
    interface PackageJson {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    }

    /**
     * Read and parse package.json file
     */
    function readPackageJson(filePath: string): PackageJson {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }

    /**
     * Parse version string to comparable format
     * Handles: ^1.2.3, ~1.2.3, >=1.2.3, 1.2.3, 1.2.x, *
     */
    function parseVersion(versionString: string): { 
      prefix: string; 
      major: number; 
      minor: number; 
      patch: number;
      raw: string;
    } {
      const raw = versionString;
      
      // Handle wildcards
      if (versionString === '*' || versionString === 'latest') {
        return { prefix: '', major: Infinity, minor: Infinity, patch: Infinity, raw };
      }

      // Extract prefix (^, ~, >=, etc.)
      const prefixMatch = versionString.match(/^([~^>=<]+)/);
      const prefix = prefixMatch ? prefixMatch[1] : '';
      
      // Remove prefix and whitespace
      const cleanVersion = versionString.replace(/^[~^>=<\s]+/, '');
      
      // Parse version numbers
      const parts = cleanVersion.split('.');
      const major = parts[0] === 'x' || parts[0] === '*' ? Infinity : parseInt(parts[0], 10) || 0;
      const minor = parts[1] === 'x' || parts[1] === '*' ? Infinity : parseInt(parts[1], 10) || 0;
      const patch = parts[2] === 'x' || parts[2] === '*' ? Infinity : parseInt(parts[2]?.split('-')[0], 10) || 0;

      return { prefix, major, minor, patch, raw };
    }

    /**
     * Compare two version strings
     * Returns: 1 if v1 > v2, -1 if v1 < v2, 0 if equal
     */
    function compareVersions(v1: string, v2: string): number {
      const version1 = parseVersion(v1);
      const version2 = parseVersion(v2);

      // Compare major version
      if (version1.major !== version2.major) {
        return version1.major > version2.major ? 1 : -1;
      }

      // Compare minor version
      if (version1.minor !== version2.minor) {
        return version1.minor > version2.minor ? 1 : -1;
      }

      // Compare patch version
      if (version1.patch !== version2.patch) {
        return version1.patch > version2.patch ? 1 : -1;
      }

      return 0;
    }

    /**
     * Check if a version is equal or newer
     */
    function isVersionEqualOrNewer(currentVersion: string, originalVersion: string): boolean {
      const comparison = compareVersions(currentVersion, originalVersion);
      return comparison >= 0;
    }

    /**
     * Get all dependencies from a package.json (both dependencies and devDependencies)
     */
    function getAllDependencies(packageJson: PackageJson): Record<string, string> {
      return {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };
    }

    it('should preserve all dependencies from client package.json', () => {
      const clientPackagePath = path.join(process.cwd(), 'client.backup', 'package.json');
      const rootPackagePath = path.join(process.cwd(), 'package.json');

      // Read both package.json files
      const clientPackage = readPackageJson(clientPackagePath);
      const rootPackage = readPackageJson(rootPackagePath);

      // Get all dependencies from client package
      const clientDeps = getAllDependencies(clientPackage);
      const rootDeps = getAllDependencies(rootPackage);

      // Get list of dependency names to test
      const dependencyNames = Object.keys(clientDeps);

      // Exclude react-scripts as it's intentionally removed in Laravel Mix migration
      const depsToCheck = dependencyNames.filter(name => name !== 'react-scripts');

      // Create generator for dependency names
      const dependencyGenerator = fc.constantFrom(...depsToCheck);

      fc.assert(
        fc.property(dependencyGenerator, (depName) => {
          const originalVersion = clientDeps[depName];
          const currentVersion = rootDeps[depName];

          // Check if dependency exists in root package.json
          if (!currentVersion) {
            console.error(`Missing dependency: ${depName} (was ${originalVersion})`);
            return false;
          }

          // Check if version is equal or newer
          const versionOk = isVersionEqualOrNewer(currentVersion, originalVersion);

          if (!versionOk) {
            console.error(`Version downgrade detected for ${depName}:`);
            console.error(`  Original: ${originalVersion}`);
            console.error(`  Current: ${currentVersion}`);
          }

          return versionOk;
        }),
        { numRuns: depsToCheck.length }
      );
    });

    it('should preserve all production dependencies', () => {
      const clientPackagePath = path.join(process.cwd(), 'client.backup', 'package.json');
      const rootPackagePath = path.join(process.cwd(), 'package.json');

      const clientPackage = readPackageJson(clientPackagePath);
      const rootPackage = readPackageJson(rootPackagePath);

      const clientDeps = clientPackage.dependencies || {};
      const rootDeps = {
        ...rootPackage.dependencies,
        ...rootPackage.devDependencies,
      };

      const depNames = Object.keys(clientDeps).filter(name => name !== 'react-scripts');

      if (depNames.length === 0) {
        return;
      }

      const dependencyGenerator = fc.constantFrom(...depNames);

      fc.assert(
        fc.property(dependencyGenerator, (depName) => {
          const exists = depName in rootDeps;

          if (!exists) {
            console.error(`Missing production dependency: ${depName}`);
          }

          return exists;
        }),
        { numRuns: depNames.length }
      );
    });

    it('should preserve all development dependencies', () => {
      const clientPackagePath = path.join(process.cwd(), 'client.backup', 'package.json');
      const rootPackagePath = path.join(process.cwd(), 'package.json');

      const clientPackage = readPackageJson(clientPackagePath);
      const rootPackage = readPackageJson(rootPackagePath);

      const clientDevDeps = clientPackage.devDependencies || {};
      const rootDeps = {
        ...rootPackage.dependencies,
        ...rootPackage.devDependencies,
      };

      const depNames = Object.keys(clientDevDeps);

      if (depNames.length === 0) {
        return;
      }

      const dependencyGenerator = fc.constantFrom(...depNames);

      fc.assert(
        fc.property(dependencyGenerator, (depName) => {
          const exists = depName in rootDeps;

          if (!exists) {
            console.error(`Missing dev dependency: ${depName}`);
          }

          return exists;
        }),
        { numRuns: depNames.length }
      );
    });

    it('should preserve React and React-DOM with compatible versions', () => {
      const clientPackagePath = path.join(process.cwd(), 'client.backup', 'package.json');
      const rootPackagePath = path.join(process.cwd(), 'package.json');

      const clientPackage = readPackageJson(clientPackagePath);
      const rootPackage = readPackageJson(rootPackagePath);

      const criticalDeps = ['react', 'react-dom', 'react-router-dom'];
      const criticalDepGenerator = fc.constantFrom(...criticalDeps);

      fc.assert(
        fc.property(criticalDepGenerator, (depName) => {
          const clientDeps = getAllDependencies(clientPackage);
          const rootDeps = getAllDependencies(rootPackage);

          const originalVersion = clientDeps[depName];
          const currentVersion = rootDeps[depName];

          if (!originalVersion) {
            return true; // Skip if not in client package
          }

          if (!currentVersion) {
            console.error(`Critical dependency missing: ${depName}`);
            return false;
          }

          const versionOk = isVersionEqualOrNewer(currentVersion, originalVersion);

          if (!versionOk) {
            console.error(`Critical dependency version issue for ${depName}:`);
            console.error(`  Original: ${originalVersion}`);
            console.error(`  Current: ${currentVersion}`);
          }

          return versionOk;
        }),
        { numRuns: criticalDeps.length }
      );
    });

    it('should preserve TypeScript and testing dependencies', () => {
      const clientPackagePath = path.join(process.cwd(), 'client.backup', 'package.json');
      const rootPackagePath = path.join(process.cwd(), 'package.json');

      const clientPackage = readPackageJson(clientPackagePath);
      const rootPackage = readPackageJson(rootPackagePath);

      const testingDeps = [
        'typescript',
        '@testing-library/react',
        '@testing-library/jest-dom',
        '@testing-library/user-event',
        '@types/jest',
        '@types/react',
        '@types/react-dom',
        '@types/node',
        'fast-check',
      ];

      const testingDepGenerator = fc.constantFrom(...testingDeps);

      fc.assert(
        fc.property(testingDepGenerator, (depName) => {
          const clientDeps = getAllDependencies(clientPackage);
          const rootDeps = getAllDependencies(rootPackage);

          const originalVersion = clientDeps[depName];
          const currentVersion = rootDeps[depName];

          if (!originalVersion) {
            return true; // Skip if not in client package
          }

          if (!currentVersion) {
            console.error(`Testing dependency missing: ${depName}`);
            return false;
          }

          return true; // Just check existence for testing deps
        }),
        { numRuns: testingDeps.length }
      );
    });

    it('should preserve UI library dependencies', () => {
      const clientPackagePath = path.join(process.cwd(), 'client.backup', 'package.json');
      const rootPackagePath = path.join(process.cwd(), 'package.json');

      const clientPackage = readPackageJson(clientPackagePath);
      const rootPackage = readPackageJson(rootPackagePath);

      const uiDeps = [
        '@radix-ui/react-dialog',
        '@radix-ui/react-slot',
        'lucide-react',
        'recharts',
        'tailwind-merge',
        'tailwindcss-animate',
        'class-variance-authority',
        'clsx',
      ];

      const uiDepGenerator = fc.constantFrom(...uiDeps);

      fc.assert(
        fc.property(uiDepGenerator, (depName) => {
          const clientDeps = getAllDependencies(clientPackage);
          const rootDeps = getAllDependencies(rootPackage);

          const originalVersion = clientDeps[depName];
          const currentVersion = rootDeps[depName];

          if (!originalVersion) {
            return true; // Skip if not in client package
          }

          if (!currentVersion) {
            console.error(`UI library missing: ${depName}`);
            return false;
          }

          const versionOk = isVersionEqualOrNewer(currentVersion, originalVersion);

          if (!versionOk) {
            console.error(`UI library version issue for ${depName}:`);
            console.error(`  Original: ${originalVersion}`);
            console.error(`  Current: ${currentVersion}`);
          }

          return versionOk;
        }),
        { numRuns: uiDeps.length }
      );
    });

    it('should generate comprehensive dependency preservation report', () => {
      const clientPackagePath = path.join(process.cwd(), 'client.backup', 'package.json');
      const rootPackagePath = path.join(process.cwd(), 'package.json');

      const clientPackage = readPackageJson(clientPackagePath);
      const rootPackage = readPackageJson(rootPackagePath);

      const clientDeps = getAllDependencies(clientPackage);
      const rootDeps = getAllDependencies(rootPackage);

      let preservedCount = 0;
      let missingCount = 0;
      let downgradedCount = 0;
      let upgradedCount = 0;
      let sameVersionCount = 0;

      const missingDeps: string[] = [];
      const downgradedDeps: Array<{ name: string; old: string; new: string }> = [];
      const upgradedDeps: Array<{ name: string; old: string; new: string }> = [];

      Object.entries(clientDeps).forEach(([depName, originalVersion]) => {
        // Skip react-scripts as it's intentionally removed
        if (depName === 'react-scripts') {
          return;
        }

        const currentVersion = rootDeps[depName];

        if (!currentVersion) {
          missingCount++;
          missingDeps.push(`${depName}@${originalVersion}`);
        } else {
          preservedCount++;
          const comparison = compareVersions(currentVersion, originalVersion);

          if (comparison > 0) {
            upgradedCount++;
            upgradedDeps.push({ name: depName, old: originalVersion, new: currentVersion });
          } else if (comparison < 0) {
            downgradedCount++;
            downgradedDeps.push({ name: depName, old: originalVersion, new: currentVersion });
          } else {
            sameVersionCount++;
          }
        }
      });

      console.log('\n=== Dependency Preservation Report ===');
      console.log(`Total dependencies in client.backup: ${Object.keys(clientDeps).length}`);
      console.log(`Dependencies to migrate (excluding react-scripts): ${Object.keys(clientDeps).length - 1}`);
      console.log(`Successfully preserved: ${preservedCount}`);
      console.log(`Missing: ${missingCount}`);
      console.log(`Same version: ${sameVersionCount}`);
      console.log(`Upgraded: ${upgradedCount}`);
      console.log(`Downgraded: ${downgradedCount}`);

      if (missingDeps.length > 0) {
        console.log('\nMissing dependencies:');
        missingDeps.forEach(dep => console.log(`  - ${dep}`));
      }

      if (downgradedDeps.length > 0) {
        console.log('\nDowngraded dependencies:');
        downgradedDeps.forEach(dep => 
          console.log(`  - ${dep.name}: ${dep.old} → ${dep.new}`)
        );
      }

      if (upgradedDeps.length > 0) {
        console.log('\nUpgraded dependencies:');
        upgradedDeps.forEach(dep => 
          console.log(`  - ${dep.name}: ${dep.old} → ${dep.new}`)
        );
      }

      // All dependencies should be preserved (no missing, no downgrades)
      expect(missingCount).toBe(0);
      expect(downgradedCount).toBe(0);
    });

    it('should verify version comparison logic works correctly', () => {
      // Test version comparison with known examples
      const versionPairs = [
        { v1: '^1.2.3', v2: '^1.2.3', expected: 0 },
        { v1: '^1.3.0', v2: '^1.2.3', expected: 1 },
        { v1: '^1.2.3', v2: '^1.3.0', expected: -1 },
        { v1: '~2.0.0', v2: '~1.9.9', expected: 1 },
        { v1: '^18.2.0', v2: '^18.2.0', expected: 0 },
        { v1: '^6.30.1', v2: '^6.20.1', expected: 1 },
      ];

      const pairGenerator = fc.constantFrom(...versionPairs);

      fc.assert(
        fc.property(pairGenerator, (pair) => {
          const result = compareVersions(pair.v1, pair.v2);
          const matches = result === pair.expected;

          if (!matches) {
            console.error(`Version comparison failed:`);
            console.error(`  ${pair.v1} vs ${pair.v2}`);
            console.error(`  Expected: ${pair.expected}, Got: ${result}`);
          }

          return matches;
        }),
        { numRuns: versionPairs.length }
      );
    });
  });
});
