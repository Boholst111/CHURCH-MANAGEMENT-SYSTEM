# TypeScript Error Fixes - Design

## Architecture

### Type Definition Structure
```
resources/js/
├── types/
│   ├── jest-axe.d.ts          # jest-axe type declarations
│   ├── models.ts               # Model type definitions
│   ├── api.ts                  # API type definitions
│   └── components.ts           # Component prop types
├── setupTests.ts               # Jest setup with type extensions
└── [components/pages/etc]      # Updated with correct types
```

## Design Decisions

### D1: Testing Library Types
**Decision:** Use setupTests.ts with jest-dom import  
**Rationale:** Standard approach for extending Jest matchers  
**Implementation:**
- Create `setupTests.ts` with `@testing-library/jest-dom` import
- Configure in jest.config.js `setupFilesAfterEnv`
- Create custom type declaration for jest-axe

### D2: Toast Type Strategy
**Decision:** Keep `duration` as required property  
**Rationale:** Duration is essential for toast behavior  
**Implementation:**
- Update all test mocks to include `duration: 5000`
- Maintain existing Toast interface

### D3: Component Prop Fixes
**Decision:** Update interfaces to match actual usage patterns  
**Rationale:** Types should reflect reality, not ideal  
**Implementation:**
- Header: Make `label` optional in userMenu items (for dividers)
- Modal: Standardize on `isOpen` prop name
- Button: Add missing variant types
- Table/Pagination: Add missing required props

### D4: API Type Exports
**Decision:** Export `setSessionTimeoutHandler` as named export  
**Rationale:** Matches import statements in consuming code  
**Implementation:**
- Add `export` keyword to function declaration
- Update API response types to include `message` and `errors`

### D5: Model Type Updates
**Decision:** Add missing properties to existing interfaces  
**Rationale:** Minimal changes, backward compatible  
**Implementation:**
- BetaFeedback: Add `priorityScore?: number`
- MemberFormData: Add `membership_type: string`
- User: Add `created_at` and `updated_at`
- Member: Change `birth_date` from `string | undefined` to `string | null`

### D6: FormData Type Handling
**Decision:** Convert numbers to strings before append  
**Rationale:** FormData.append only accepts string | Blob  
**Implementation:**
```typescript
formData.append(key, typeof value === 'number' ? String(value) : value);
```

### D7: Query Parameter Handling
**Decision:** Use nullish coalescing with default values  
**Rationale:** Clean, modern TypeScript pattern  
**Implementation:**
```typescript
const param = searchParams.get('key') ?? '';
setState(param);
```

### D8: Role Type Handling
**Decision:** Remove invalid role comparisons  
**Rationale:** 'pastor' and 'volunteer' are not valid role values  
**Implementation:**
- Remove or comment out invalid comparisons
- Add TODO comments for future role system updates

## File Modification Plan

### Phase 1: Setup & Type Declarations (5 files)
1. `resources/js/setupTests.ts` - Create
2. `resources/js/types/jest-axe.d.ts` - Create
3. `resources/js/types/models.ts` - Update
4. `resources/js/types/api.ts` - Update
5. `resources/js/lib/api.ts` - Update exports

### Phase 2: Component Interfaces (10 files)
1. `resources/js/components/ui/header.tsx` - Update HeaderProps
2. `resources/js/components/ui/modal.tsx` - Standardize prop name
3. `resources/js/components/ui/button.tsx` - Add variant types
4. `resources/js/components/ui/table.tsx` - Update TableProps
5. `resources/js/components/ui/pagination.tsx` - Update PaginationProps
6. `resources/js/components/ui/toast.tsx` - Verify Toast interface
7. `resources/js/components/ui/sidebar.tsx` - Update SidebarProps
8. `resources/js/components/ui/icon.tsx` - Update IconProps
9. `resources/js/components/ui/badge.tsx` - Update BadgeProps
10. `resources/js/components/ui/select.tsx` - Update SelectProps

### Phase 3: Test File Fixes (30+ files)
1. Update all test files with Toast mocks
2. Fix form handler mocks
3. Fix component prop usage in tests
4. Add null checks where needed

### Phase 4: Page/Component Fixes (20+ files)
1. Fix query parameter handling
2. Fix FormData usage
3. Fix role comparisons
4. Fix date range null checks

## Testing Strategy
- Run `npm run dev` after each phase
- Verify error count decreases
- Final verification: Zero TypeScript errors

## Rollback Plan
- Git commit after each phase
- Can revert individual phases if issues arise
- Keep TYPESCRIPT_ERROR_FIX_PLAN.md for reference
