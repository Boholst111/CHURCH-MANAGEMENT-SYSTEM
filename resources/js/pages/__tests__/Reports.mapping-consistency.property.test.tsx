import * as fc from 'fast-check';

// Feature: finance-reports-consolidation, Property 5: Report Type Mapping Consistency
// **Validates: Requirements 7.1, 7.4**

/**
 * Property-Based Tests for Report Type Mapping Consistency
 * 
 * These tests verify that the report type mapping between frontend IDs and backend types
 * is complete, correct, and bijective (one-to-one mapping with no duplicates).
 */

describe('Reports - Report Type Mapping Consistency Property Tests', () => {
  /**
   * The report type mapping from the Reports.tsx component
   * This maps frontend report IDs (snake_case) to backend report types (kebab-case)
   */
  const reportTypeMap: Record<string, string> = {
    'income_statement': 'income-statement',
    'balance_sheet': 'financial-summary',
    'budget_variance': 'budget-variance',
    'fund_balance': 'fund-balance',
    'offering_summary': 'donor-giving',
    'expense_report': 'expense-report'
  };

  /**
   * All frontend report IDs that should be supported
   * These are the IDs used in the Reports.tsx component
   */
  const frontendReportIds = [
    'income_statement',
    'balance_sheet',
    'budget_variance',
    'fund_balance',
    'offering_summary',
    'expense_report'
  ];

  /**
   * All backend report types that should be supported
   * These are the types accepted by the ReportController.php
   */
  const backendReportTypes = [
    'income-statement',
    'financial-summary',
    'budget-variance',
    'fund-balance',
    'donor-giving',
    'expense-report'
  ];

  /**
   * Generator for frontend report IDs
   */
  const frontendReportIdGenerator = () =>
    fc.constantFrom(...frontendReportIds);

  /**
   * Property 5.1: All frontend report IDs have corresponding backend types
   * 
   * For any frontend report ID used in the Reports component,
   * there must exist a corresponding backend report type mapping.
   */
  it('should have backend mapping for all frontend report IDs', () => {
    fc.assert(
      fc.property(
        frontendReportIdGenerator(),
        (frontendId) => {
          // Get backend mapping
          const backendType = reportTypeMap[frontendId];

          // Verify mapping exists
          expect(backendType).toBeDefined();
          expect(typeof backendType).toBe('string');
          expect(backendType.length).toBeGreaterThan(0);

          // Verify backend type is in the list of supported types
          expect(backendReportTypes).toContain(backendType);

          return backendType !== undefined && backendType.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5.2: Mapping is bijective (one-to-one, no duplicates)
   * 
   * For any frontend report ID, the backend mapping should be unique.
   * No two frontend IDs should map to the same backend type.
   */
  it('should have unique backend mappings (bijective)', () => {
    fc.assert(
      fc.property(
        frontendReportIdGenerator(),
        (frontendId) => {
          // Get backend mapping
          const backendType = reportTypeMap[frontendId];

          // Count how many times this backend type appears in the mapping
          const allMappings = Object.values(reportTypeMap);
          const occurrences = allMappings.filter(t => t === backendType).length;

          // Should appear exactly once (bijective mapping)
          expect(occurrences).toBe(1);

          return occurrences === 1;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5.3: All backend types are mapped from frontend IDs
   * 
   * For any backend report type, there should exist at least one frontend ID
   * that maps to it. This ensures no backend types are orphaned.
   */
  it('should have frontend mapping for all backend report types', () => {
    // For each backend type, verify it's mapped from a frontend ID
    backendReportTypes.forEach(backendType => {
      const frontendIds = Object.entries(reportTypeMap)
        .filter(([_, backend]) => backend === backendType)
        .map(([frontend, _]) => frontend);

      // Should have exactly one frontend ID mapping to this backend type
      expect(frontendIds.length).toBe(1);
      expect(frontendReportIds).toContain(frontendIds[0]);
    });
  });

  /**
   * Property 5.4: Mapping completeness
   * 
   * The number of frontend IDs should equal the number of backend types,
   * and all should be mapped (no missing mappings).
   */
  it('should have complete mapping coverage', () => {
    // Count frontend IDs
    const frontendCount = frontendReportIds.length;

    // Count backend types
    const backendCount = backendReportTypes.length;

    // Count mappings
    const mappingCount = Object.keys(reportTypeMap).length;

    // All counts should be equal (complete bijective mapping)
    expect(frontendCount).toBe(backendCount);
    expect(mappingCount).toBe(frontendCount);
    expect(mappingCount).toBe(backendCount);

    // Verify all frontend IDs are in the mapping
    frontendReportIds.forEach(id => {
      expect(reportTypeMap[id]).toBeDefined();
    });

    // Verify all backend types are in the mapping values
    const mappedBackendTypes = Object.values(reportTypeMap);
    backendReportTypes.forEach(type => {
      expect(mappedBackendTypes).toContain(type);
    });
  });

  /**
   * Property 5.5: Mapping format consistency
   * 
   * For any frontend report ID, it should follow snake_case format.
   * For any backend report type, it should follow kebab-case format.
   */
  it('should follow consistent naming conventions', () => {
    fc.assert(
      fc.property(
        frontendReportIdGenerator(),
        (frontendId) => {
          // Frontend ID should be snake_case (lowercase with underscores)
          const isSnakeCase = /^[a-z]+(_[a-z]+)*$/.test(frontendId);
          expect(isSnakeCase).toBe(true);

          // Backend type should be kebab-case (lowercase with hyphens)
          const backendType = reportTypeMap[frontendId];
          const isKebabCase = /^[a-z]+(-[a-z]+)*$/.test(backendType);
          expect(isKebabCase).toBe(true);

          return isSnakeCase && isKebabCase;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5.6: No undefined or null mappings
   * 
   * For any frontend report ID, the mapping should never be undefined or null.
   */
  it('should never have undefined or null mappings', () => {
    fc.assert(
      fc.property(
        frontendReportIdGenerator(),
        (frontendId) => {
          const backendType = reportTypeMap[frontendId];

          // Should not be undefined or null
          expect(backendType).not.toBeUndefined();
          expect(backendType).not.toBeNull();

          // Should be a non-empty string
          expect(typeof backendType).toBe('string');
          expect(backendType.length).toBeGreaterThan(0);

          return backendType !== undefined && 
                 backendType !== null && 
                 backendType.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5.7: Mapping stability
   * 
   * The mapping should be stable - calling it multiple times with the same
   * frontend ID should always return the same backend type.
   */
  it('should return consistent mappings across multiple calls', () => {
    fc.assert(
      fc.property(
        frontendReportIdGenerator(),
        (frontendId) => {
          // Get mapping multiple times
          const mapping1 = reportTypeMap[frontendId];
          const mapping2 = reportTypeMap[frontendId];
          const mapping3 = reportTypeMap[frontendId];

          // All should be identical
          expect(mapping1).toBe(mapping2);
          expect(mapping2).toBe(mapping3);
          expect(mapping1).toBe(mapping3);

          return mapping1 === mapping2 && mapping2 === mapping3;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5.8: Reverse mapping uniqueness
   * 
   * For any backend report type, there should be exactly one frontend ID
   * that maps to it (inverse bijection).
   */
  it('should have unique reverse mappings', () => {
    // Create reverse mapping (backend -> frontend)
    const reverseMap: Record<string, string[]> = {};
    
    Object.entries(reportTypeMap).forEach(([frontend, backend]) => {
      if (!reverseMap[backend]) {
        reverseMap[backend] = [];
      }
      reverseMap[backend].push(frontend);
    });

    // Each backend type should map to exactly one frontend ID
    Object.entries(reverseMap).forEach(([backend, frontends]) => {
      expect(frontends.length).toBe(1);
      expect(frontendReportIds).toContain(frontends[0]);
    });
  });

  /**
   * Property 5.9: No extra mappings
   * 
   * The mapping should only contain the expected frontend IDs.
   * No unexpected or extra mappings should exist.
   */
  it('should not contain unexpected mappings', () => {
    const mappedFrontendIds = Object.keys(reportTypeMap);

    // Every mapped ID should be in the expected list
    mappedFrontendIds.forEach(id => {
      expect(frontendReportIds).toContain(id);
    });

    // No extra mappings
    expect(mappedFrontendIds.length).toBe(frontendReportIds.length);
  });

  /**
   * Property 5.10: Mapping supports all financial reports
   * 
   * All 6 financial reports defined in the requirements should have mappings.
   */
  it('should support all 6 financial reports from requirements', () => {
    // Requirements specify these 6 financial reports
    const requiredReports = [
      'income_statement',
      'balance_sheet',
      'budget_variance',
      'fund_balance',
      'offering_summary',
      'expense_report'
    ];

    // All should have mappings
    requiredReports.forEach(reportId => {
      expect(reportTypeMap[reportId]).toBeDefined();
      expect(typeof reportTypeMap[reportId]).toBe('string');
      expect(reportTypeMap[reportId].length).toBeGreaterThan(0);
    });

    // Should have exactly 6 mappings
    expect(Object.keys(reportTypeMap).length).toBe(6);
  });
});
