/**
 * Property-Based Test: Import Resolution After Migration
 * 
 * **Validates: Requirements 3.8, 9.2**
 * 
 * This test verifies that all import statements in TypeScript/TSX files
 * resolve to valid module paths after the migration from client/src to resources/js.
 * Uses the TypeScript compiler API to validate import resolution.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

describe('Migration Property Tests', () => {
  describe('Property 4: Import Resolution After Migration', () => {
    /**
     * Recursively get all TypeScript/TSX files in a directory
     */
    function getAllTsFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
      if (!fs.existsSync(dirPath)) {
        return arrayOfFiles;
      }

      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
          arrayOfFiles = getAllTsFiles(fullPath, arrayOfFiles);
        } else if (/\.(ts|tsx)$/.test(file)) {
          arrayOfFiles.push(fullPath);
        }
      });

      return arrayOfFiles;
    }

    /**
     * Extract all import statements from a TypeScript file
     */
    function extractImports(filePath: string): Array<{ module: string; line: number }> {
      const content = fs.readFileSync(filePath, 'utf-8');
      const sourceFile = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true
      );

      const imports: Array<{ module: string; line: number }> = [];

      function visit(node: ts.Node) {
        // Handle import declarations: import { x } from 'module'
        if (ts.isImportDeclaration(node)) {
          const moduleSpecifier = node.moduleSpecifier;
          if (ts.isStringLiteral(moduleSpecifier)) {
            const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
            imports.push({ module: moduleSpecifier.text, line });
          }
        }
        
        // Handle dynamic imports: import('module')
        if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
          if (node.arguments.length > 0 && ts.isStringLiteral(node.arguments[0])) {
            const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
            imports.push({ module: node.arguments[0].text, line });
          }
        }

        // Handle require calls: require('module')
        if (
          ts.isCallExpression(node) &&
          ts.isIdentifier(node.expression) &&
          node.expression.text === 'require' &&
          node.arguments.length > 0 &&
          ts.isStringLiteral(node.arguments[0])
        ) {
          const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
          imports.push({ module: node.arguments[0].text, line });
        }

        ts.forEachChild(node, visit);
      }

      visit(sourceFile);
      return imports;
    }

    /**
     * Check if an import path is a node module (not a relative/absolute path)
     */
    function isNodeModule(importPath: string): boolean {
      return !importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('@/');
    }

    /**
     * Resolve a relative import path to an absolute file path
     */
    function resolveImportPath(importPath: string, fromFile: string): string | null {
      const fromDir = path.dirname(fromFile);
      
      // Handle path alias @/ -> resources/js/
      if (importPath.startsWith('@/')) {
        const aliasPath = importPath.replace('@/', '');
        const resolvedPath = path.join(process.cwd(), 'resources', 'js', aliasPath);
        return resolveWithExtensions(resolvedPath);
      }

      // Handle relative paths
      if (importPath.startsWith('.')) {
        const resolvedPath = path.resolve(fromDir, importPath);
        return resolveWithExtensions(resolvedPath);
      }

      // Handle absolute paths (shouldn't exist after migration)
      if (importPath.startsWith('/')) {
        const resolvedPath = path.join(process.cwd(), importPath);
        return resolveWithExtensions(resolvedPath);
      }

      return null;
    }

    /**
     * Try to resolve a file path with various extensions
     */
    function resolveWithExtensions(basePath: string): string | null {
      const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.json'];
      
      // Try exact path first
      for (const ext of extensions) {
        const fullPath = basePath + ext;
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
          return fullPath;
        }
      }

      // Try index files in directory
      if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
        for (const ext of extensions) {
          const indexPath = path.join(basePath, 'index' + ext);
          if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
            return indexPath;
          }
        }
      }

      return null;
    }

    /**
     * Check if an import path contains invalid patterns (old client/src paths)
     */
    function hasInvalidImportPattern(importPath: string): boolean {
      const invalidPatterns = [
        '../../client/src',
        '../client/src',
        'client/src',
        '/client/src',
      ];

      return invalidPatterns.some(pattern => importPath.includes(pattern));
    }

    /**
     * Validate that an import can be resolved
     */
    function validateImport(
      importPath: string,
      fromFile: string
    ): { valid: boolean; reason?: string } {
      // Skip node modules - they're validated by npm/package.json
      if (isNodeModule(importPath)) {
        return { valid: true };
      }

      // Check for invalid patterns (old paths)
      if (hasInvalidImportPattern(importPath)) {
        return {
          valid: false,
          reason: `Import contains old client/src path pattern: ${importPath}`,
        };
      }

      // Try to resolve the import
      const resolvedPath = resolveImportPath(importPath, fromFile);
      
      if (!resolvedPath) {
        return {
          valid: false,
          reason: `Cannot resolve import: ${importPath}`,
        };
      }

      if (!fs.existsSync(resolvedPath)) {
        return {
          valid: false,
          reason: `Resolved path does not exist: ${resolvedPath}`,
        };
      }

      return { valid: true };
    }

    it('should resolve all imports in all TypeScript files', () => {
      const targetDir = path.join(process.cwd(), 'resources', 'js');
      const allTsFiles = getAllTsFiles(targetDir);

      // Filter out test files for this specific test (they may have special imports)
      const sourceFiles = allTsFiles.filter(file => 
        !file.includes('__tests__') && 
        !file.includes('.test.') && 
        !file.includes('.spec.')
      );

      expect(sourceFiles.length).toBeGreaterThan(0);

      const fileGenerator = fc.constantFrom(...sourceFiles);

      fc.assert(
        fc.property(fileGenerator, (filePath) => {
          const imports = extractImports(filePath);
          const relativePath = path.relative(process.cwd(), filePath);

          let allValid = true;
          const errors: string[] = [];

          imports.forEach(({ module, line }) => {
            const result = validateImport(module, filePath);
            if (!result.valid) {
              allValid = false;
              errors.push(
                `${relativePath}:${line} - ${result.reason || 'Unknown error'} (import: "${module}")`
              );
            }
          });

          if (!allValid) {
            console.error(`\nImport resolution errors in ${relativePath}:`);
            errors.forEach(err => console.error(`  ${err}`));
          }

          return allValid;
        }),
        { numRuns: sourceFiles.length }
      );
    });

    it('should not contain any old client/src import paths', () => {
      const targetDir = path.join(process.cwd(), 'resources', 'js');
      const allTsFiles = getAllTsFiles(targetDir);

      const fileGenerator = fc.constantFrom(...allTsFiles);

      fc.assert(
        fc.property(fileGenerator, (filePath) => {
          const imports = extractImports(filePath);
          const relativePath = path.relative(process.cwd(), filePath);

          const invalidImports = imports.filter(({ module }) => 
            hasInvalidImportPattern(module)
          );

          if (invalidImports.length > 0) {
            console.error(`\nFound old client/src paths in ${relativePath}:`);
            invalidImports.forEach(({ module, line }) => {
              console.error(`  Line ${line}: ${module}`);
            });
          }

          return invalidImports.length === 0;
        }),
        { numRuns: allTsFiles.length }
      );
    });

    it('should resolve all relative imports correctly', () => {
      const targetDir = path.join(process.cwd(), 'resources', 'js');
      const allTsFiles = getAllTsFiles(targetDir);

      const fileGenerator = fc.constantFrom(...allTsFiles);

      fc.assert(
        fc.property(fileGenerator, (filePath) => {
          const imports = extractImports(filePath);
          const relativePath = path.relative(process.cwd(), filePath);

          // Filter to only relative imports
          const relativeImports = imports.filter(({ module }) => 
            module.startsWith('.') && !isNodeModule(module)
          );

          let allValid = true;
          const errors: string[] = [];

          relativeImports.forEach(({ module, line }) => {
            const resolvedPath = resolveImportPath(module, filePath);
            
            if (!resolvedPath || !fs.existsSync(resolvedPath)) {
              allValid = false;
              errors.push(
                `Line ${line}: Cannot resolve "${module}" (resolved to: ${resolvedPath || 'null'})`
              );
            }
          });

          if (!allValid) {
            console.error(`\nRelative import errors in ${relativePath}:`);
            errors.forEach(err => console.error(`  ${err}`));
          }

          return allValid;
        }),
        { numRuns: allTsFiles.length }
      );
    });

    it('should resolve all path alias imports (@/) correctly', () => {
      const targetDir = path.join(process.cwd(), 'resources', 'js');
      const allTsFiles = getAllTsFiles(targetDir);

      const fileGenerator = fc.constantFrom(...allTsFiles);

      fc.assert(
        fc.property(fileGenerator, (filePath) => {
          const imports = extractImports(filePath);
          const relativePath = path.relative(process.cwd(), filePath);

          // Filter to only @/ alias imports
          const aliasImports = imports.filter(({ module }) => 
            module.startsWith('@/')
          );

          if (aliasImports.length === 0) {
            return true; // No alias imports to check
          }

          let allValid = true;
          const errors: string[] = [];

          aliasImports.forEach(({ module, line }) => {
            const resolvedPath = resolveImportPath(module, filePath);
            
            if (!resolvedPath || !fs.existsSync(resolvedPath)) {
              allValid = false;
              errors.push(
                `Line ${line}: Cannot resolve alias "${module}" (resolved to: ${resolvedPath || 'null'})`
              );
            }
          });

          if (!allValid) {
            console.error(`\nPath alias import errors in ${relativePath}:`);
            errors.forEach(err => console.error(`  ${err}`));
          }

          return allValid;
        }),
        { numRuns: allTsFiles.length }
      );
    });

    it('should have valid imports in all component files', () => {
      const componentsDir = path.join(process.cwd(), 'resources', 'js', 'components');
      
      if (!fs.existsSync(componentsDir)) {
        return; // Skip if components directory doesn't exist
      }

      const componentFiles = getAllTsFiles(componentsDir);
      const fileGenerator = fc.constantFrom(...componentFiles);

      fc.assert(
        fc.property(fileGenerator, (filePath) => {
          const imports = extractImports(filePath);
          const relativePath = path.relative(process.cwd(), filePath);

          let allValid = true;
          const errors: string[] = [];

          imports.forEach(({ module, line }) => {
            const result = validateImport(module, filePath);
            if (!result.valid) {
              allValid = false;
              errors.push(`Line ${line}: ${result.reason} (import: "${module}")`);
            }
          });

          if (!allValid) {
            console.error(`\nComponent import errors in ${relativePath}:`);
            errors.forEach(err => console.error(`  ${err}`));
          }

          return allValid;
        }),
        { numRuns: componentFiles.length }
      );
    });

    it('should have valid imports in all page files', () => {
      const pagesDir = path.join(process.cwd(), 'resources', 'js', 'pages');
      
      if (!fs.existsSync(pagesDir)) {
        return; // Skip if pages directory doesn't exist
      }

      const pageFiles = getAllTsFiles(pagesDir);
      const fileGenerator = fc.constantFrom(...pageFiles);

      fc.assert(
        fc.property(fileGenerator, (filePath) => {
          const imports = extractImports(filePath);
          const relativePath = path.relative(process.cwd(), filePath);

          let allValid = true;
          const errors: string[] = [];

          imports.forEach(({ module, line }) => {
            const result = validateImport(module, filePath);
            if (!result.valid) {
              allValid = false;
              errors.push(`Line ${line}: ${result.reason} (import: "${module}")`);
            }
          });

          if (!allValid) {
            console.error(`\nPage import errors in ${relativePath}:`);
            errors.forEach(err => console.error(`  ${err}`));
          }

          return allValid;
        }),
        { numRuns: pageFiles.length }
      );
    });

    it('should have valid imports in all lib/utility files', () => {
      const libDir = path.join(process.cwd(), 'resources', 'js', 'lib');
      
      if (!fs.existsSync(libDir)) {
        return; // Skip if lib directory doesn't exist
      }

      const libFiles = getAllTsFiles(libDir);
      const fileGenerator = fc.constantFrom(...libFiles);

      fc.assert(
        fc.property(fileGenerator, (filePath) => {
          const imports = extractImports(filePath);
          const relativePath = path.relative(process.cwd(), filePath);

          let allValid = true;
          const errors: string[] = [];

          imports.forEach(({ module, line }) => {
            const result = validateImport(module, filePath);
            if (!result.valid) {
              allValid = false;
              errors.push(`Line ${line}: ${result.reason} (import: "${module}")`);
            }
          });

          if (!allValid) {
            console.error(`\nLib import errors in ${relativePath}:`);
            errors.forEach(err => console.error(`  ${err}`));
          }

          return allValid;
        }),
        { numRuns: libFiles.length }
      );
    });

    it('should generate comprehensive import resolution report', () => {
      const targetDir = path.join(process.cwd(), 'resources', 'js');
      const allTsFiles = getAllTsFiles(targetDir);

      let totalFiles = 0;
      let totalImports = 0;
      let validImports = 0;
      let invalidImports = 0;
      let nodeModuleImports = 0;
      let relativeImports = 0;
      let aliasImports = 0;
      let oldPathImports = 0;

      const filesWithErrors: Array<{ file: string; errors: string[] }> = [];

      allTsFiles.forEach(filePath => {
        totalFiles++;
        const imports = extractImports(filePath);
        totalImports += imports.length;

        const errors: string[] = [];

        imports.forEach(({ module, line }) => {
          if (isNodeModule(module)) {
            nodeModuleImports++;
            validImports++;
          } else if (module.startsWith('@/')) {
            aliasImports++;
            const result = validateImport(module, filePath);
            if (result.valid) {
              validImports++;
            } else {
              invalidImports++;
              errors.push(`Line ${line}: ${result.reason} (import: "${module}")`);
            }
          } else if (module.startsWith('.')) {
            relativeImports++;
            const result = validateImport(module, filePath);
            if (result.valid) {
              validImports++;
            } else {
              invalidImports++;
              errors.push(`Line ${line}: ${result.reason} (import: "${module}")`);
            }
          } else {
            const result = validateImport(module, filePath);
            if (result.valid) {
              validImports++;
            } else {
              invalidImports++;
              errors.push(`Line ${line}: ${result.reason} (import: "${module}")`);
            }
          }

          if (hasInvalidImportPattern(module)) {
            oldPathImports++;
          }
        });

        if (errors.length > 0) {
          filesWithErrors.push({
            file: path.relative(process.cwd(), filePath),
            errors,
          });
        }
      });

      console.log('\n=== Import Resolution Report ===');
      console.log(`Total TypeScript files: ${totalFiles}`);
      console.log(`Total imports found: ${totalImports}`);
      console.log(`Valid imports: ${validImports}`);
      console.log(`Invalid imports: ${invalidImports}`);
      console.log(`\nImport breakdown:`);
      console.log(`  - Node modules: ${nodeModuleImports}`);
      console.log(`  - Relative imports: ${relativeImports}`);
      console.log(`  - Path alias (@/): ${aliasImports}`);
      console.log(`  - Old client/src paths: ${oldPathImports}`);

      if (filesWithErrors.length > 0) {
        console.log(`\nFiles with import errors (${filesWithErrors.length}):`);
        filesWithErrors.forEach(({ file, errors }) => {
          console.log(`\n${file}:`);
          errors.forEach(err => console.log(`  ${err}`));
        });
      }

      // All imports should be valid and no old paths should exist
      expect(invalidImports).toBe(0);
      expect(oldPathImports).toBe(0);
      expect(validImports).toBe(totalImports);
    });
  });
});
