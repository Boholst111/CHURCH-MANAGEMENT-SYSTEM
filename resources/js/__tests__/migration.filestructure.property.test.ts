/**
 * Property-Based Test: File Structure Preservation During Migration
 * 
 * **Validates: Requirements 1.1, 1.2, 1.4**
 * 
 * This test verifies that all files from client/src have been correctly moved to resources/js
 * while preserving the directory structure and relative paths.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

describe('Migration Property Tests', () => {
  describe('Property 1: File Structure Preservation During Migration', () => {
    /**
     * Recursively get all files in a directory
     */
    function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
      if (!fs.existsSync(dirPath)) {
        return arrayOfFiles;
      }

      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
          arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
          arrayOfFiles.push(fullPath);
        }
      });

      return arrayOfFiles;
    }

    /**
     * Get relative path from a base directory
     */
    function getRelativePath(filePath: string, baseDir: string): string {
      return path.relative(baseDir, filePath);
    }

    /**
     * Check if a file should have been migrated (exclude certain files/directories)
     */
    function shouldBeMigrated(relativePath: string): boolean {
      // Exclude files that should not be migrated to resources/js
      const excludePatterns = [
        'index.css', // Merged into resources/css/app.css
        'styles' + path.sep, // CSS files moved to resources/css, not resources/js
        path.sep + 'styles' + path.sep, // CSS files in styles directory
      ];

      return !excludePatterns.some(pattern => relativePath.includes(pattern));
    }

    it('should preserve directory structure for all migrated files', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      // Get all files from the source directory
      const sourceFiles = getAllFiles(sourceDir);
      const relativeSourcePaths = sourceFiles.map(file => getRelativePath(file, sourceDir));

      // Filter files that should have been migrated
      const filesToCheck = relativeSourcePaths.filter(shouldBeMigrated);

      // Create a generator that yields each file path
      const filePathGenerator = fc.constantFrom(...filesToCheck);

      fc.assert(
        fc.property(filePathGenerator, (relativePath) => {
          // Construct the expected target path
          const expectedTargetPath = path.join(targetDir, relativePath);

          // Verify the file exists in the target location
          const fileExists = fs.existsSync(expectedTargetPath);

          if (!fileExists) {
            console.error(`Missing file: ${relativePath}`);
            console.error(`Expected at: ${expectedTargetPath}`);
          }

          return fileExists;
        }),
        { numRuns: filesToCheck.length } // Run once for each file
      );
    });

    it('should preserve relative path structure within subdirectories', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      // Get all files from source
      const sourceFiles = getAllFiles(sourceDir);
      const relativeSourcePaths = sourceFiles.map(file => getRelativePath(file, sourceDir));
      const filesToCheck = relativeSourcePaths.filter(shouldBeMigrated);

      // Create generator for file paths
      const filePathGenerator = fc.constantFrom(...filesToCheck);

      fc.assert(
        fc.property(filePathGenerator, (relativePath) => {
          const sourceFilePath = path.join(sourceDir, relativePath);
          const targetPath = path.join(targetDir, relativePath);

          // Check if file exists
          if (!fs.existsSync(targetPath)) {
            return false;
          }

          // Verify the directory structure is preserved
          const sourceFileDir = path.dirname(relativePath);
          const targetFileDir = path.dirname(path.relative(targetDir, targetPath));

          // The directory structure should match
          return sourceFileDir === targetFileDir || targetFileDir.endsWith(sourceFileDir);
        }),
        { numRuns: filesToCheck.length }
      );
    });

    it('should have moved all TypeScript and TSX files', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      // Get all TypeScript files from source
      const sourceFiles = getAllFiles(sourceDir);
      const tsFiles = sourceFiles
        .filter(file => /\.(ts|tsx)$/.test(file))
        .map(file => getRelativePath(file, sourceDir));

      // Create generator for TypeScript files
      const tsFileGenerator = fc.constantFrom(...tsFiles);

      fc.assert(
        fc.property(tsFileGenerator, (relativePath) => {
          const targetPath = path.join(targetDir, relativePath);
          return fs.existsSync(targetPath);
        }),
        { numRuns: tsFiles.length }
      );
    });

    it('should have moved all test files with preserved structure', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      // Get all test files from source
      const sourceFiles = getAllFiles(sourceDir);
      const testFiles = sourceFiles
        .filter(file => /\.(test|spec)\.(ts|tsx)$/.test(file) || file.includes('__tests__'))
        .map(file => getRelativePath(file, sourceDir));

      if (testFiles.length === 0) {
        // Skip if no test files found
        return;
      }

      // Create generator for test files
      const testFileGenerator = fc.constantFrom(...testFiles);

      fc.assert(
        fc.property(testFileGenerator, (relativePath) => {
          const targetPath = path.join(targetDir, relativePath);
          const exists = fs.existsSync(targetPath);

          if (!exists) {
            console.error(`Missing test file: ${relativePath}`);
          }

          return exists;
        }),
        { numRuns: testFiles.length }
      );
    });

    it('should preserve __tests__ directory structure', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      // Get all files in __tests__ directories
      const sourceFiles = getAllFiles(sourceDir);
      const testDirFiles = sourceFiles
        .filter(file => file.includes('__tests__'))
        .map(file => getRelativePath(file, sourceDir));

      if (testDirFiles.length === 0) {
        return;
      }

      const testFileGenerator = fc.constantFrom(...testDirFiles);

      fc.assert(
        fc.property(testFileGenerator, (relativePath) => {
          const targetPath = path.join(targetDir, relativePath);
          
          // Verify file exists
          if (!fs.existsSync(targetPath)) {
            console.error(`Missing __tests__ file: ${relativePath}`);
            return false;
          }

          // Verify __tests__ directory structure is preserved
          const hasTestsDir = relativePath.includes('__tests__');
          const targetHasTestsDir = targetPath.includes('__tests__');

          return hasTestsDir === targetHasTestsDir;
        }),
        { numRuns: testDirFiles.length }
      );
    });

    it('should have correct directory nesting depth preserved', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      const sourceFiles = getAllFiles(sourceDir);
      const relativeSourcePaths = sourceFiles.map(file => getRelativePath(file, sourceDir));
      const filesToCheck = relativeSourcePaths.filter(shouldBeMigrated);

      const filePathGenerator = fc.constantFrom(...filesToCheck);

      fc.assert(
        fc.property(filePathGenerator, (relativePath) => {
          const sourcePath = path.join(sourceDir, relativePath);
          const targetPath = path.join(targetDir, relativePath);

          if (!fs.existsSync(targetPath)) {
            return false;
          }

          // Count directory depth (number of separators)
          const sourceDepth = relativePath.split(path.sep).length;
          const targetRelativePath = getRelativePath(targetPath, targetDir);
          const targetDepth = targetRelativePath.split(path.sep).length;

          // Depths should match
          return sourceDepth === targetDepth;
        }),
        { numRuns: filesToCheck.length }
      );
    });

    it('should have moved all component files to correct subdirectories', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      // Get all files in components directory
      const componentsSourceDir = path.join(sourceDir, 'components');
      if (!fs.existsSync(componentsSourceDir)) {
        return;
      }

      const componentFiles = getAllFiles(componentsSourceDir)
        .map(file => getRelativePath(file, sourceDir));

      const componentFileGenerator = fc.constantFrom(...componentFiles);

      fc.assert(
        fc.property(componentFileGenerator, (relativePath) => {
          const targetPath = path.join(targetDir, relativePath);
          const exists = fs.existsSync(targetPath);

          if (!exists) {
            console.error(`Missing component file: ${relativePath}`);
          }

          // Verify it's still in the components directory
          const isInComponents = relativePath.startsWith('components');
          
          return exists && isInComponents;
        }),
        { numRuns: componentFiles.length }
      );
    });

    it('should generate comprehensive migration report', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      const sourceFiles = getAllFiles(sourceDir);
      const relativeSourcePaths = sourceFiles.map(file => getRelativePath(file, sourceDir));
      const filesToCheck = relativeSourcePaths.filter(shouldBeMigrated);

      let migratedCount = 0;
      let missingCount = 0;
      const missingFiles: string[] = [];

      filesToCheck.forEach(relativePath => {
        const targetPath = path.join(targetDir, relativePath);
        if (fs.existsSync(targetPath)) {
          migratedCount++;
        } else {
          missingCount++;
          missingFiles.push(relativePath);
        }
      });

      console.log('\n=== Migration Report ===');
      console.log(`Total files to migrate: ${filesToCheck.length}`);
      console.log(`Successfully migrated: ${migratedCount}`);
      console.log(`Missing files: ${missingCount}`);

      if (missingFiles.length > 0) {
        console.log('\nMissing files:');
        missingFiles.forEach(file => console.log(`  - ${file}`));
      }

      // All files should be migrated
      expect(missingCount).toBe(0);
      expect(migratedCount).toBe(filesToCheck.length);
    });
  });
});
