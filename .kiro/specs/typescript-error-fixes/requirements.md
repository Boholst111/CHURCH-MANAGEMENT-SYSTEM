# TypeScript Error Fixes - Requirements

## Overview
Fix 206 TypeScript compilation errors in the frontend codebase to ensure clean compilation and type safety.

## Problem Statement
The webpack build is failing with 206 TypeScript errors across multiple categories:
- Type definition issues
- Component prop mismatches  
- Missing type declarations
- Test file type issues

## Requirements

### R1: Testing Library Type Support
**Priority:** High  
**Description:** Ensure all Testing Library matchers are properly typed
- Setup jest-dom type extensions
- Configure jest-axe type declarations
- Add setupTests.ts configuration

**Acceptance Criteria:**
- `toHaveFocus`, `toBeInTheDocument`, `toHaveClass`, etc. are recognized
- `toHaveNoViolations` from jest-axe is properly typed
- No "Property does not exist" errors for test matchers

### R2: Toast Component Type Fixes
**Priority:** High  
**Description:** Fix Toast type definition issues
- Ensure all Toast objects include required `duration` property
- Update test mocks to match Toast interface

**Acceptance Criteria:**
- All Toast objects have `id`, `type`, `message`, and `duration`
- No "Property 'duration' is missing" errors

### R3: Component Prop Type Fixes
**Priority:** High  
**Description:** Fix component interface mismatches
- Header userMenu prop (handle divider-only items)
- Modal `open` vs `isOpen` consistency
- Button variant types
- Table/Pagination prop interfaces

**Acceptance Criteria:**
- All component props match their TypeScript interfaces
- No prop type mismatch errors

### R4: API Type Definitions
**Priority:** High  
**Description:** Fix API-related type issues
- Export `setSessionTimeoutHandler` properly
- Fix FormData.append type issues (number/File handling)
- Add proper types for API response objects

**Acceptance Criteria:**
- API module exports are properly typed
- FormData operations handle all value types
- API responses have proper type definitions

### R5: Model Type Definitions
**Priority:** High  
**Description:** Update model interfaces to match actual usage
- Add `priorityScore` to BetaFeedback type
- Add `membership_type` to MemberFormData
- Fix User type (add created_at/updated_at)
- Fix Member birth_date type (string | null vs string | undefined)

**Acceptance Criteria:**
- All model properties match actual usage
- No "Property does not exist" errors for model fields

### R6: Form Handler Types
**Priority:** Medium  
**Description:** Fix form event handler type mismatches
- Update test mocks to use proper ChangeEvent objects
- Fix onChange handlers that expect events but receive strings

**Acceptance Criteria:**
- Form handlers receive proper event objects
- Test mocks match production handler signatures

### R7: Query Parameter Handling
**Priority:** Medium  
**Description:** Handle URLSearchParams.get() null returns
- Add null checks or default values
- Fix setState calls with potentially null values

**Acceptance Criteria:**
- No "Type 'string | null' is not assignable to 'string'" errors
- Proper null handling for query parameters

### R8: UserForm Role Types
**Priority:** Low  
**Description:** Fix role type comparisons
- Update role type to include 'pastor'/'volunteer' OR
- Fix comparison logic to use correct role values

**Acceptance Criteria:**
- No "types have no overlap" errors for role comparisons

### R9: DatePicker Null Handling
**Priority:** Low  
**Description:** Add null checks for date range properties
- Handle range.start possibly being null

**Acceptance Criteria:**
- No "possibly 'null'" errors for date range access

## Success Criteria
- Zero TypeScript compilation errors
- Webpack builds successfully
- All type definitions are accurate and maintainable
- No runtime type-related bugs introduced

## Out of Scope
- Refactoring component logic
- Adding new features
- Performance optimizations
- Style changes
