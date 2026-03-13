# Pagination Component Summary

## Overview
The Pagination component provides a comprehensive pagination interface with page numbers, navigation buttons, items per page selector, and keyboard navigation support. It follows the design system established in the modern UI/UX redesign spec.

## Component Location
- **Component**: `resources/js/components/ui/pagination.tsx`
- **Example**: `resources/js/components/ui/pagination.example.tsx`
- **Tests**: `resources/js/components/ui/__tests__/pagination.test.tsx`

## Features Implemented

### Core Features
- ✅ Page number buttons with current page highlighting
- ✅ Navigation buttons (First, Previous, Next, Last)
- ✅ Ellipsis (...) for large page counts
- ✅ Items per page selector with customizable options
- ✅ Total items and current range display
- ✅ Keyboard navigation support (Arrow keys, Home, End)
- ✅ Disabled state support
- ✅ Fully accessible with ARIA attributes

### Props Interface
```typescript
interface PaginationProps {
  currentPage: number              // Current active page (1-indexed)
  totalPages: number               // Total number of pages
  totalItems: number               // Total number of items
  itemsPerPage: number             // Items displayed per page
  onPageChange: (page: number) => void  // Callback when page changes
  onItemsPerPageChange?: (itemsPerPage: number) => void  // Callback for items per page change
  itemsPerPageOptions?: number[]   // Options for items per page selector (default: [10, 25, 50, 100])
  showItemsPerPage?: boolean       // Show/hide items per page selector (default: true)
  showTotalItems?: boolean         // Show/hide total items display (default: true)
  showPageNumbers?: boolean        // Show/hide page number buttons (default: true)
  maxPageButtons?: number          // Maximum page buttons to show (default: 7)
  disabled?: boolean               // Disable all interactions (default: false)
  size?: 'sm' | 'md' | 'lg'       // Size variant (default: 'md')
}
```

## Usage Examples

### Basic Pagination
```typescript
import { Pagination } from '@/components/ui'

function MyTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  
  const totalItems = 250
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={(newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1) // Reset to first page
      }}
    />
  )
}
```

### Simple Pagination (No Items Per Page Selector)
```typescript
<Pagination
  currentPage={5}
  totalPages={20}
  totalItems={200}
  itemsPerPage={10}
  onPageChange={(page) => console.log('Page changed to:', page)}
  showItemsPerPage={false}
/>
```

### Minimal Pagination
```typescript
<Pagination
  currentPage={3}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  onPageChange={(page) => console.log('Page changed to:', page)}
  showItemsPerPage={false}
  showTotalItems={false}
/>
```

### Custom Items Per Page Options
```typescript
<Pagination
  currentPage={1}
  totalPages={10}
  totalItems={100}
  itemsPerPage={20}
  onPageChange={setCurrentPage}
  onItemsPerPageChange={setItemsPerPage}
  itemsPerPageOptions={[20, 40, 60, 80]}
/>
```

## Keyboard Navigation

The Pagination component supports full keyboard navigation:

- **Arrow Right (→)**: Go to next page
- **Arrow Left (←)**: Go to previous page
- **Home**: Go to first page
- **End**: Go to last page

## Accessibility Features

- ✅ Proper ARIA labels for all buttons
- ✅ `aria-current="page"` for current page button
- ✅ `aria-label="Pagination"` for navigation container
- ✅ Disabled buttons have proper disabled state
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## Ellipsis Logic

When there are many pages, the component intelligently shows ellipsis to condense the display:

- **Few pages** (≤ maxPageButtons): Shows all page numbers
- **Near start**: Shows first pages, ellipsis, last page
- **Near end**: Shows first page, ellipsis, last pages
- **In middle**: Shows first page, ellipsis, middle pages, ellipsis, last page

Example with maxPageButtons=7 and currentPage=15 of 50:
```
[1] [...] [13] [14] [15] [16] [17] [...] [50]
```

## Styling

The component uses the design system's color palette and spacing:

- **Primary color**: Used for current page button
- **Ghost variant**: Used for navigation and page buttons
- **Neutral colors**: Used for text and borders
- **Transitions**: Smooth hover and active states

## Test Coverage

All 28 tests passing:
- ✅ Rendering and display
- ✅ Page navigation (next, previous, first, last)
- ✅ Page number clicking
- ✅ Items per page selection
- ✅ Keyboard navigation
- ✅ Disabled state
- ✅ Edge cases (0 items, large page counts)
- ✅ Custom options
- ✅ Accessibility

## Integration with Table Component

The Pagination component is designed to work seamlessly with the Table component:

```typescript
import { DataTable, Pagination } from '@/components/ui'

function MembersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  
  // Fetch data based on pagination
  const { data, totalItems } = useMembersData(currentPage, itemsPerPage)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage)
          setCurrentPage(1)
        }}
      />
    </div>
  )
}
```

## Design System Compliance

The Pagination component follows all design system guidelines:

- ✅ Uses design tokens (colors, spacing, typography)
- ✅ Consistent with other components (Button, Select)
- ✅ Responsive and mobile-friendly
- ✅ Accessible (WCAG AA compliant)
- ✅ Smooth transitions and animations
- ✅ Proper focus states

## Task Completion

**Task 3.6**: Implement Pagination component ✅

All requirements met:
- ✅ Create Pagination with page numbers and navigation buttons
- ✅ Support items per page selector
- ✅ Display total items and current range
- ✅ Implement ellipsis for large page counts
- ✅ Add keyboard navigation support
- ✅ Design Reference: Members Page Design section

## Next Steps

The Pagination component is ready for use in:
- Members page (Task 8.1)
- Small Groups page (Task 9.1)
- Events page (Task 12.1)
- Finance pages (Tasks 13.3, 13.5)
- Any other data tables requiring pagination
