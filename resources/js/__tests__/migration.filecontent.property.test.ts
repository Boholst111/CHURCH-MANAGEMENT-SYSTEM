/**
 * Property-Based Test: File Content Preservation During Migration
 * 
 * **Validates: Requirements 1.5**
 * 
 * This test verifies that all files moved from client/src to resources/js
 * have identical content (byte-for-byte equality) after the migration.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

describe('Migration Property Tests', () => {
  describe('Property 2: File Content Preservation During Migration', () => {
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

    /**
     * Calculate MD5 hash of file content for comparison
     */
    function getFileHash(filePath: string): string {
      const content = fs.readFileSync(filePath);
      return crypto.createHash('md5').update(content).digest('hex');
    }

    /**
     * Compare file contents byte-for-byte
     */
    function compareFileContents(sourcePath: string, targetPath: string): boolean {
      if (!fs.existsSync(sourcePath) || !fs.existsSync(targetPath)) {
        return false;
      }

      const sourceContent = fs.readFileSync(sourcePath);
      const targetContent = fs.readFileSync(targetPath);

      return Buffer.compare(sourceContent, targetContent) === 0;
    }

    it('should preserve exact file content for all migrated files (byte-for-byte)', () => {
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
          const sourcePath = path.join(sourceDir, relativePath);
          const targetPath = path.join(targetDir, relativePath);

          // Verify both files exist
          if (!fs.existsSync(targetPath)) {
            console.error(`Target file missing: ${relativePath}`);
            return false;
          }

          // Compare file contents byte-for-byte
          const contentsMatch = compareFileContents(sourcePath, targetPath);

          if (!contentsMatch) {
            console.error(`Content mismatch: ${relativePath}`);
            console.error(`Source: ${sourcePath}`);
            console.error(`Target: ${targetPath}`);
          }

          return contentsMatch;
        }),
        { numRuns: filesToCheck.length } // Run once for each file
      );
    });

    it('should preserve file content hash for all TypeScript files', () => {
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
          const sourcePath = path.join(sourceDir, relativePath);
          const targetPath = path.join(targetDir, relativePath);

          if (!fs.existsSync(targetPath)) {
            console.error(`Missing TypeScript file: ${relativePath}`);
            return false;
          }

          // Compare file hashes
          const sourceHash = getFileHash(sourcePath);
          const targetHash = getFileHash(targetPath);

          if (sourceHash !== targetHash) {
            console.error(`Hash mismatch for ${relativePath}`);
            console.error(`Source hash: ${sourceHash}`);
            console.error(`Target hash: ${targetHash}`);
          }

          return sourceHash === targetHash;
        }),
        { numRuns: tsFiles.length }
      );
    });

    it('should preserve file content for all test files', () => {
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
          const sourcePath = path.join(sourceDir, relativePath);
          const targetPath = path.join(targetDir, relativePath);

          if (!fs.existsSync(targetPath)) {
            console.error(`Missing test file: ${relativePath}`);
            return false;
          }

          // Compare file contents
          const contentsMatch = compareFileContents(sourcePath, targetPath);

          if (!contentsMatch) {
            console.error(`Test file content mismatch: ${relativePath}`);
          }

          return contentsMatch;
        }),
        { numRuns: testFiles.length }
      );
    });

    it('should preserve file content for all component files', () => {
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
          const sourcePath = path.join(sourceDir, relativePath);
          const targetPath = path.join(targetDir, relativePath);

          if (!fs.existsSync(targetPath)) {
            console.error(`Missing component file: ${relativePath}`);
            return false;
          }

          // Compare file contents
          const contentsMatch = compareFileContents(sourcePath, targetPath);

          if (!contentsMatch) {
            console.error(`Component file content mismatch: ${relativePath}`);
          }

          return contentsMatch;
        }),
        { numRuns: componentFiles.length }
      );
    });

    it('should preserve file sizes for all migrated files', () => {
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

          // Compare file sizes
          const sourceStats = fs.statSync(sourcePath);
          const targetStats = fs.statSync(targetPath);

          if (sourceStats.size !== targetStats.size) {
            console.error(`File size mismatch: ${relativePath}`);
            console.error(`Source size: ${sourceStats.size} bytes`);
            console.error(`Target size: ${targetStats.size} bytes`);
          }

          return sourceStats.size === targetStats.size;
        }),
        { numRuns: filesToCheck.length }
      );
    });

    it('should preserve file content for critical entry files', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      // Critical files that must be preserved exactly
      const criticalFiles = [
        'index.tsx',
        'App.tsx',
        'setupTests.ts',
      ];

      const criticalFileGenerator = fc.constantFrom(...criticalFiles);

      fc.assert(
        fc.property(criticalFileGenerator, (fileName) => {
          const sourcePath = path.join(sourceDir, fileName);
          const targetPath = path.join(targetDir, fileName);

          // Check if file exists in source (some may not exist)
          if (!fs.existsSync(sourcePath)) {
            return true; // Skip if doesn't exist in source
          }

          if (!fs.existsSync(targetPath)) {
            console.error(`Critical file missing: ${fileName}`);
            return false;
          }

          // Compare file contents
          const contentsMatch = compareFileContents(sourcePath, targetPath);

          if (!contentsMatch) {
            console.error(`Critical file content mismatch: ${fileName}`);
          }

          return contentsMatch;
        }),
        { numRuns: criticalFiles.length }
      );
    });

    it('should generate comprehensive content preservation report', () => {
      const sourceDir = path.join(process.cwd(), 'client.backup', 'src');
      const targetDir = path.join(process.cwd(), 'resources', 'js');

      const sourceFiles = getAllFiles(sourceDir);
      const relativeSourcePaths = sourceFiles.map(file => getRelativePath(file, sourceDir));
      const filesToCheck = relativeSourcePaths.filter(shouldBeMigrated);

      let preservedCount = 0;
      let mismatchCount = 0;
      let missingCount = 0;
      const mismatchedFiles: string[] = [];
      const missingFiles: string[] = [];

      filesToCheck.forEach(relativePath => {
        const sourcePath = path.join(sourceDir, relativePath);
        const targetPath = path.join(targetDir, relativePath);

        if (!fs.existsSync(targetPath)) {
          missingCount++;
          missingFiles.push(relativePath);
        } else if (compareFileContents(sourcePath, targetPath)) {
          preservedCount++;
        } else {
          mismatchCount++;
          mismatchedFiles.push(relativePath);
        }
      });

      console.log('\n=== Content Preservation Report ===');
      console.log(`Total files checked: ${filesToCheck.length}`);
      console.log(`Content preserved: ${preservedCount}`);
      console.log(`Content mismatches: ${mismatchCount}`);
      console.log(`Missing files: ${missingCount}`);

      if (mismatchedFiles.length > 0) {
        console.log('\nFiles with content mismatches:');
        mismatchedFiles.forEach(file => console.log(`  - ${file}`));
      }

      if (missingFiles.length > 0) {
        console.log('\nMissing files:');
        missingFiles.forEach(file => console.log(`  - ${file}`));
      }

      // All files should have preserved content
      expect(mismatchCount).toBe(0);
      expect(missingCount).toBe(0);
      expect(preservedCount).toBe(filesToCheck.length);
    });

    it('should verify no data corruption during migration', () => {
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

          // Read both files
          const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
          const targetContent = fs.readFileSync(targetPath, 'utf-8');

          // Check for common corruption indicators
          const hasNullBytes = targetContent.includes('\0');
          const hasInvalidUtf8 = targetContent.length === 0 && sourceContent.length > 0;
          const contentMatches = sourceContent === targetContent;

          if (hasNullBytes) {
            console.error(`Null bytes detected in: ${relativePath}`);
          }
          if (hasInvalidUtf8) {
            console.error(`Invalid UTF-8 or empty file: ${relativePath}`);
          }
          if (!contentMatches) {
            console.error(`Content corruption detected: ${relativePath}`);
          }

          return !hasNullBytes && !hasInvalidUtf8 && contentMatches;
        }),
        { numRuns: filesToCheck.length }
      );
    });
  });
});
