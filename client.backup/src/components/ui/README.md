# UI Components

Reusable UI components for the Mahayahay Free Methodist Church Management System.

## Overview

This directory contains all reusable UI components that follow the church management system design system:

- **Soft blue and white color palette** (primary-500: #3b82f6)
- **Rounded corners** (md: 8px, lg: 12px)
- **Consistent spacing** (using Tailwind spacing scale)
- **Inter/Roboto typography**
- **TypeScript interfaces** for all component props

**Requirements:** 7.3, 7.4

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
- `size`: 'default' | 'sm' | 'lg' | 'icon'
- All standard HTML button attributes

**Example:**
```tsx
import { Button } from '@/components/ui'

<Button variant="default" size="lg">
  Click me
</Button>

<Button variant="outline" onClick={handleClick}>
  Cancel
</Button>
```

**Styling:**
- Rounded corners: `rounded-md` (8px)
- Consistent padding based on size
- Hover and focus states
- Disabled state styling

### Input

A form input component with consistent styling.

**Props:**
- `type`: 'text' | 'email' | 'password' | 'number' | etc.
- All standard HTML input attributes

**Example:**
```tsx
import { Input } from '@/components/ui'

<Input 
  type="email" 
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Styling:**
- Rounded corners: `rounded-md` (8px)
- Consistent padding: `px-3 py-2`
- Border and focus ring
- Placeholder text styling

### Card

A container component for grouping related content.

**Sub-components:**
- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title text
- `CardDescription`: Description text
- `CardContent`: Main content area
- `CardFooter`: Footer section

**Example:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'

<Card>
  <CardHeader>
    <CardTitle>Total Members</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">245</p>
  </CardContent>
</Card>
```

**Styling:**
- Rounded corners: `rounded-lg` (12px)
- Shadow: `shadow-sm`
- Consistent padding: `p-6`
- White background with border

### Table

A data table component with consistent styling.

**Sub-components:**
- `Table`: Main table wrapper
- `TableHeader`: Header section
- `TableBody`: Body section
- `TableFooter`: Footer section
- `TableRow`: Table row
- `TableHead`: Header cell
- `TableCell`: Data cell
- `TableCaption`: Table caption

**Example:**
```tsx
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {members.map((member) => (
      <TableRow key={member.id}>
        <TableCell>{member.name}</TableCell>
        <TableCell>{member.email}</TableCell>
        <TableCell>{member.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Styling:**
- Responsive with horizontal scroll
- Hover states on rows
- Consistent cell padding: `p-4`
- Border between rows

### Modal

A modal dialog component for displaying content in an overlay.

**Props:**
- `open`: boolean - Controls visibility
- `onOpenChange`: (open: boolean) => void - Callback when open state changes
- `title`: string (optional) - Modal title
- `description`: string (optional) - Modal description
- `footer`: ReactNode (optional) - Footer content
- `children`: ReactNode - Modal content

**Example:**
```tsx
import { Modal, Button } from '@/components/ui'

const [isOpen, setIsOpen] = useState(false)

<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Add New Member"
  description="Enter the member's information below"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>
        Save
      </Button>
    </>
  }
>
  <form>
    {/* Form fields */}
  </form>
</Modal>
```

**Styling:**
- Rounded corners: `rounded-lg` (12px)
- Backdrop blur effect
- Centered on screen
- Smooth animations
- Close button in top-right

### Dialog

Low-level dialog primitives from Radix UI. The Modal component is built on top of Dialog for easier usage.

**Sub-components:**
- `Dialog`: Root component
- `DialogTrigger`: Trigger button
- `DialogContent`: Content container
- `DialogHeader`: Header section
- `DialogFooter`: Footer section
- `DialogTitle`: Title text
- `DialogDescription`: Description text
- `DialogClose`: Close button

**Example:**
```tsx
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content goes here</p>
  </DialogContent>
</Dialog>
```

## Design System Compliance

All components follow the church management system design system:

### Colors
- Primary: `bg-primary-500` (#3b82f6)
- Neutral: `bg-neutral-50` to `bg-neutral-900`
- Semantic: `success`, `warning`, `error`

### Typography
- Font family: Inter, Roboto
- Font sizes: `text-xs` to `text-3xl`
- Font weights: `font-normal`, `font-medium`, `font-semibold`, `font-bold`

### Spacing
- Consistent padding and margins using Tailwind spacing scale
- Ample white space between components

### Border Radius
- Small: `rounded-sm` (4px)
- Medium: `rounded-md` (8px)
- Large: `rounded-lg` (12px)
- Extra large: `rounded-xl` (16px)

## TypeScript Support

All components have full TypeScript support with proper interfaces:

```tsx
import type { ButtonProps, InputProps, ModalProps } from '@/components/ui'

// Type-safe component usage
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## Testing

Unit tests are provided in `__tests__/ui-components.test.tsx` to verify:

- Components render correctly
- Props are applied properly
- Styling is consistent (rounded corners, spacing)
- TypeScript interfaces work correctly

To run tests:
```bash
npm test
```

## Accessibility

All components follow accessibility best practices:

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus management
- Screen reader support

## Usage in Pages

Import components from the centralized index:

```tsx
import { Button, Input, Card, Table, Modal } from '@/components/ui'

function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Page</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Search..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

## Dependencies

- **React 18.2+**: Core framework
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **class-variance-authority**: Variant management
- **tailwind-merge**: Class merging utility
- **Lucide React**: Icon library

## Maintenance

When adding new components:

1. Create the component file in `client/src/components/ui/`
2. Follow the existing patterns (forwardRef, TypeScript interfaces)
3. Apply design system styling (rounded corners, spacing, colors)
4. Export from `index.ts`
5. Add unit tests in `__tests__/`
6. Update this README

## References

- Design System: `client/DESIGN_SYSTEM.md`
- Requirements: `.kiro/specs/church-management-system/requirements.md` (7.3, 7.4)
- Design Document: `.kiro/specs/church-management-system/design.md`
