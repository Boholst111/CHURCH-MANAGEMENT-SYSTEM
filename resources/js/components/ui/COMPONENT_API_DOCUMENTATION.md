# Component API Documentation

## Overview

This document provides comprehensive API documentation for all UI components in the Modern UI/UX Redesign. Each component includes:

- **Props Interface**: TypeScript interface with all available props
- **Usage Examples**: Code examples showing common use cases
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Visual Variants**: Different styles and sizes available
- **Best Practices**: Guidelines for optimal usage

## Table of Contents

1. [Atomic Components (Atoms)](#atomic-components-atoms)
   - [Button](#button)
   - [Input](#input)
   - [Badge](#badge)
   - [Icon](#icon)
   - [Spinner](#spinner)
2. [Molecular Components (Molecules)](#molecular-components-molecules)
   - [Card](#card)
   - [Table](#table)
   - [Select](#select)
   - [DatePicker](#datepicker)
   - [Pagination](#pagination)
   - [Progress](#progress)
   - [Skeleton](#skeleton)
   - [Form Field](#form-field)
   - [Form Error Summary](#form-error-summary)
3. [Organism Components (Organisms)](#organism-components-organisms)
   - [Modal](#modal)
   - [Dialog](#dialog)
   - [Toast](#toast)
   - [Sidebar](#sidebar)
   - [Header](#header)
   - [Layout](#layout)
   - [Loading State](#loading-state)
4. [Utility Components](#utility-components)
   - [Theme Toggle](#theme-toggle)
   - [Keyboard Shortcuts Dialog](#keyboard-shortcuts-dialog)
   - [Skip to Main](#skip-to-main)
   - [Offline Indicator](#offline-indicator)
   - [Optimized Image](#optimized-image)
   - [Virtual List](#virtual-list)

---


## Atomic Components (Atoms)

### Button

A versatile button component with multiple variants, sizes, and states.

**File**: `resources/js/components/ui/button.tsx`

#### Props Interface

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  className?: string;
}
```

#### Variants

- **default**: Primary blue button with white text
- **destructive**: Red button for dangerous actions
- **outline**: Transparent with border
- **secondary**: Gray background
- **ghost**: Transparent, shows background on hover
- **link**: Styled as a link

#### Sizes

- **default**: Standard size (h-10, px-4 py-2)
- **sm**: Small size (h-9, px-3)
- **lg**: Large size (h-11, px-8)
- **icon**: Square button for icons (h-10 w-10)


#### Usage Examples

```tsx
import { Button } from '@/components/ui';

// Primary button
<Button variant="default">Save Changes</Button>

// Destructive action
<Button variant="destructive">Delete Account</Button>

// Outline button
<Button variant="outline">Cancel</Button>

// Small button
<Button size="sm">Small Button</Button>

// Button with icon
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Member
</Button>

// Disabled button
<Button disabled>Disabled</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

#### Accessibility

- Supports all standard button attributes
- Keyboard accessible (Enter/Space to activate)
- Proper focus indicators
- Disabled state prevents interaction
- Use `aria-label` for icon-only buttons

#### Best Practices

- Use `variant="default"` for primary actions
- Use `variant="destructive"` for dangerous actions (delete, remove)
- Use `variant="outline"` or `variant="ghost"` for secondary actions
- Always provide descriptive text or `aria-label` for icon buttons
- Show loading state during async operations

---


### Input

A form input component with consistent styling and error handling.

**File**: `resources/js/components/ui/input.tsx`

#### Props Interface

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
}
```

#### Usage Examples

```tsx
import { Input } from '@/components/ui';

// Basic input
<Input type="text" placeholder="Enter your name" />

// Email input
<Input type="email" placeholder="email@example.com" />

// Password input
<Input type="password" placeholder="••••••••" />

// Input with error
<Input 
  type="email" 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Invalid email address"
/>

// Disabled input
<Input disabled value="Read only" />
```

#### Accessibility

- Proper `type` attribute for mobile keyboards
- Error messages announced to screen readers
- Label association via `htmlFor`
- Required fields indicated

#### Best Practices

- Always use with a `<label>` element
- Use appropriate `type` for input (email, tel, number, etc.)
- Provide clear placeholder text
- Show validation errors inline
- Use `FormField` component for integrated label/error handling

---


### Badge

A small label component for status indicators and tags.

**File**: `resources/js/components/ui/badge.tsx`

#### Props Interface

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  className?: string;
}
```

#### Usage Examples

```tsx
import { Badge } from '@/components/ui';

// Status badges
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Inactive</Badge>

// Default badge
<Badge>New</Badge>

// Outline badge
<Badge variant="outline">Draft</Badge>
```

---

### Icon

Icon wrapper component using Lucide React icons.

**File**: `resources/js/components/ui/icon.tsx`

#### Usage Examples

```tsx
import { Icon } from '@/components/ui';
import { User, Mail, Calendar } from 'lucide-react';

// Basic icon
<Icon icon={User} />

// Sized icons
<Icon icon={Mail} size="sm" />  // 16px
<Icon icon={Calendar} size="lg" />  // 24px

// Colored icons
<Icon icon={User} className="text-primary-600" />
```

---

### Spinner

Loading spinner component with multiple sizes.

**File**: `resources/js/components/ui/spinner.tsx`

#### Props Interface

```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}
```

#### Usage Examples

```tsx
import { Spinner, LoadingOverlay, InlineLoader } from '@/components/ui';

// Basic spinner
<Spinner size="md" />

// Spinner with label
<Spinner size="lg" label="Loading data..." />

// Full-screen overlay
<LoadingOverlay message="Processing..." />

// Inline loader for buttons
<button disabled>
  <InlineLoader className="mr-2" />
  Saving...
</button>
```

---


## Molecular Components (Molecules)

### Card

A container component for grouping related content with header, content, and footer sections.

**File**: `resources/js/components/ui/card.tsx`

#### Sub-components

- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title text
- `CardDescription`: Description text
- `CardContent`: Main content area
- `CardFooter`: Footer section

#### Usage Examples

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Total Members</CardTitle>
    <CardDescription>Active church members</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">245</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">View Details</Button>
  </CardFooter>
</Card>

// Card with custom styling
<Card className="hover:shadow-lg transition-shadow">
  <CardContent className="p-8">
    <h3 className="text-xl font-semibold">Custom Card</h3>
  </CardContent>
</Card>
```

#### Best Practices

- Use `CardHeader` for titles and descriptions
- Use `CardContent` for main content
- Use `CardFooter` for actions
- Keep card content focused and concise
- Use consistent padding across cards

---


### Table

A comprehensive data table component with sorting, filtering, and responsive design.

**File**: `resources/js/components/ui/table.tsx`

#### Sub-components

- `Table`: Main table wrapper
- `TableHeader`: Header section
- `TableBody`: Body section
- `TableFooter`: Footer section
- `TableRow`: Table row
- `TableHead`: Header cell
- `TableCell`: Data cell
- `TableCaption`: Table caption

#### Usage Examples

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';

// Basic table
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {members.map((member) => (
      <TableRow key={member.id}>
        <TableCell className="font-medium">{member.name}</TableCell>
        <TableCell>{member.email}</TableCell>
        <TableCell>
          <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
            {member.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

#### Accessibility

- Semantic HTML table elements
- Proper header associations
- Keyboard navigation support
- Screen reader friendly

#### Best Practices

- Use `TableCaption` for table description
- Align numeric data to the right
- Use `font-medium` for primary column
- Keep tables responsive with horizontal scroll
- Consider card view for mobile devices

---


### Select

A dropdown select component with search functionality and multi-select support.

**File**: `resources/js/components/ui/select.tsx`

#### Props Interface

```typescript
interface SelectProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: SelectOption[];
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

#### Usage Examples

```tsx
import { Select } from '@/components/ui';

// Basic select
<Select
  value={selectedRole}
  onChange={setSelectedRole}
  options={[
    { value: 'admin', label: 'Administrator' },
    { value: 'pastor', label: 'Pastor' },
    { value: 'staff', label: 'Staff' },
    { value: 'volunteer', label: 'Volunteer' },
  ]}
  placeholder="Select a role"
/>

// Searchable select
<Select
  value={selectedMember}
  onChange={setSelectedMember}
  options={memberOptions}
  searchable
  placeholder="Search members..."
/>

// Multi-select
<Select
  value={selectedGroups}
  onChange={setSelectedGroups}
  options={groupOptions}
  multiple
  placeholder="Select groups"
/>
```

#### Accessibility

- Keyboard navigation (Arrow keys, Enter, Escape)
- Screen reader announcements
- Focus management
- ARIA attributes

---


### DatePicker

A date picker component with calendar popup and range selection.

**File**: `resources/js/components/ui/datepicker.tsx`

#### Props Interface

```typescript
interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: string;
  className?: string;
}

interface DateRangePickerProps {
  value: { from: Date | null; to: Date | null };
  onChange: (range: { from: Date | null; to: Date | null }) => void;
  // ... other props
}
```

#### Usage Examples

```tsx
import { DatePicker, DateRangePicker } from '@/components/ui';

// Single date picker
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select a date"
/>

// Date picker with constraints
<DatePicker
  value={birthDate}
  onChange={setBirthDate}
  maxDate={new Date()}
  placeholder="Birth date"
/>

// Date range picker
<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  placeholder="Select date range"
/>
```

---

### Pagination

A pagination component for navigating through pages of data.

**File**: `resources/js/components/ui/pagination.tsx`

#### Props Interface

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  showItemsPerPage?: boolean;
  onItemsPerPageChange?: (items: number) => void;
}
```

#### Usage Examples

```tsx
import { Pagination } from '@/components/ui';

// Basic pagination
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

// Pagination with items per page selector
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  itemsPerPage={itemsPerPage}
  totalItems={totalItems}
  showItemsPerPage
  onItemsPerPageChange={setItemsPerPage}
/>
```

---


### Progress

Progress bar components for showing operation progress.

**File**: `resources/js/components/ui/progress.tsx`

#### Components

- `Progress`: Linear progress bar
- `CircularProgress`: Circular spinner
- `LinearProgress`: Indeterminate linear progress

#### Props Interface

```typescript
interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
}
```

#### Usage Examples

```tsx
import { Progress, CircularProgress, LinearProgress } from '@/components/ui';

// Determinate progress
<Progress value={75} max={100} showLabel />

// Progress with custom label
<Progress value={uploadProgress} label="Uploading..." />

// Circular spinner
<CircularProgress size="lg" variant="primary" />

// Indeterminate linear progress
<LinearProgress variant="primary" />
```

---

### Skeleton

Skeleton loading placeholders for better perceived performance.

**File**: `resources/js/components/ui/skeleton.tsx`

#### Components

- `Skeleton`: Base skeleton component
- `SkeletonText`: Multi-line text skeleton
- `SkeletonCard`: Card skeleton
- `SkeletonTable`: Table skeleton
- `SkeletonAvatar`: Avatar skeleton
- `SkeletonList`: List skeleton

#### Usage Examples

```tsx
import { Skeleton, SkeletonText, SkeletonCard, SkeletonTable } from '@/components/ui';

// Basic skeleton
<Skeleton width={200} height={20} />

// Text skeleton
<SkeletonText lines={3} />

// Card skeleton
<SkeletonCard hasImage />

// Table skeleton
<SkeletonTable rows={5} columns={4} />

// Avatar skeleton
<SkeletonAvatar size="lg" />
```

---


### Form Field

A wrapper component for form inputs with integrated label, error, and helper text.

**File**: `resources/js/components/ui/form-field.tsx`

#### Props Interface

```typescript
interface FormFieldProps {
  label?: string;
  error?: FieldError | string;
  helperText?: string;
  required?: boolean;
  children: React.ReactElement;
  className?: string;
  htmlFor?: string;
}
```

#### Usage Examples

```tsx
import { FormField } from '@/components/ui';
import { useForm } from 'react-hook-form';

const { register, formState: { errors } } = useForm();

// Form field with label and error
<FormField
  label="Email Address"
  error={errors.email}
  required
  htmlFor="email"
>
  <Input
    id="email"
    type="email"
    {...register('email')}
  />
</FormField>

// Form field with helper text
<FormField
  label="Password"
  helperText="Must be at least 8 characters"
  htmlFor="password"
>
  <Input
    id="password"
    type="password"
    {...register('password')}
  />
</FormField>
```

---

### Form Error Summary

Displays a summary of form validation errors at the top of a form.

**File**: `resources/js/components/ui/form-error-summary.tsx`

#### Props Interface

```typescript
interface FormErrorSummaryProps {
  errors: FieldErrors;
  title?: string;
  showCount?: boolean;
  showMessages?: boolean;
  onDismiss?: () => void;
  className?: string;
}
```

#### Usage Examples

```tsx
import { FormErrorSummary } from '@/components/ui';
import { useForm } from 'react-hook-form';

const { formState: { errors } } = useForm();

// Error summary at top of form
<form onSubmit={handleSubmit(onSubmit)}>
  <FormErrorSummary errors={errors} />
  
  {/* Form fields */}
</form>

// Custom error summary
<FormErrorSummary
  errors={errors}
  title="Please correct the following:"
  showCount
  onDismiss={() => console.log('Dismissed')}
/>
```

---


## Organism Components (Organisms)

### Modal

A modal dialog component for displaying content in an overlay.

**File**: `resources/js/components/ui/modal.tsx`

#### Props Interface

```typescript
interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}
```

#### Usage Examples

```tsx
import { Modal, Button } from '@/components/ui';

const [isOpen, setIsOpen] = useState(false);

// Basic modal
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Add New Member"
  description="Enter the member's information below"
>
  <form>
    {/* Form fields */}
  </form>
</Modal>

// Modal with footer
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Confirm Delete"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>

// Large modal
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Event Details"
  size="lg"
>
  {/* Large content */}
</Modal>
```

#### Accessibility

- Focus trap within modal
- Escape key to close
- Backdrop click to close
- Body scroll prevention
- ARIA attributes

---


### Dialog

Low-level dialog primitives from Radix UI (Modal is built on top of Dialog).

**File**: `resources/js/components/ui/dialog.tsx`

#### Sub-components

- `Dialog`: Root component
- `DialogTrigger`: Trigger button
- `DialogContent`: Content container
- `DialogHeader`: Header section
- `DialogFooter`: Footer section
- `DialogTitle`: Title text
- `DialogDescription`: Description text
- `DialogClose`: Close button

#### Usage Examples

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description goes here</DialogDescription>
    </DialogHeader>
    
    <div className="py-4">
      {/* Dialog content */}
    </div>
    
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Toast

Toast notification system for displaying temporary messages.

**File**: `resources/js/components/ui/toast.tsx`

#### Usage Examples

```tsx
import { useToast } from '@/components/ui';

const { toast } = useToast();

// Success toast
toast({
  title: 'Success',
  description: 'Member added successfully',
  variant: 'success',
});

// Error toast
toast({
  title: 'Error',
  description: 'Failed to save changes',
  variant: 'destructive',
});

// Toast with action
toast({
  title: 'Changes saved',
  description: 'Your changes have been saved',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
});
```

---


### Sidebar

Navigation sidebar component with mobile support.

**File**: `resources/js/components/ui/sidebar.tsx`

#### Props Interface

```typescript
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType;
  current?: boolean;
  children?: NavigationItem[];
}
```

#### Usage Examples

```tsx
import { Sidebar } from '@/components/ui';
import { Home, Users, Calendar, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
  { name: 'Members', href: '/members', icon: Users },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Settings', href: '/settings', icon: Settings },
];

<Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  navigation={navigation}
  logo={<img src="/logo.png" alt="Church Logo" />}
/>
```

---

### Header

Top navigation header component.

**File**: `resources/js/components/ui/header.tsx`

#### Props Interface

```typescript
interface HeaderProps {
  onMenuClick: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  notifications?: number;
}
```

#### Usage Examples

```tsx
import { Header } from '@/components/ui';

<Header
  onMenuClick={() => setSidebarOpen(true)}
  user={{
    name: 'John Doe',
    email: 'john@church.com',
    avatar: '/avatar.jpg',
  }}
  notifications={3}
/>
```

---

### Layout

Main layout wrapper with sidebar and header.

**File**: `resources/js/components/ui/layout.tsx`

#### Usage Examples

```tsx
import { Layout } from '@/components/ui';

<Layout>
  <div className="p-6">
    <h1 className="text-2xl font-bold">Page Title</h1>
    {/* Page content */}
  </div>
</Layout>
```

---


### Loading State

A wrapper component that handles loading, error, and success states.

**File**: `resources/js/components/ui/loading-state.tsx`

#### Props Interface

```typescript
interface LoadingStateProps {
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  type?: 'spinner' | 'skeleton-table' | 'skeleton-card' | 'skeleton-list';
  skeletonRows?: number;
  skeletonColumns?: number;
  skeletonCards?: number;
  skeletonItems?: number;
  className?: string;
}
```

#### Components

- `LoadingState`: Main wrapper component
- `PageLoadingState`: Full-page loading
- `InlineLoadingState`: Inline loading indicator
- `EmptyState`: No data state

#### Usage Examples

```tsx
import { LoadingState, EmptyState } from '@/components/ui';

// Basic loading state
<LoadingState loading={isLoading} error={error} onRetry={refetch}>
  <div>{data}</div>
</LoadingState>

// Loading state with skeleton
<LoadingState
  loading={isLoading}
  error={error}
  type="skeleton-table"
  skeletonRows={10}
  skeletonColumns={5}
>
  <Table>{/* table content */}</Table>
</LoadingState>

// Empty state
<EmptyState
  icon={<Users className="h-12 w-12" />}
  title="No members found"
  description="Get started by adding your first member"
  action={{
    label: 'Add Member',
    onClick: () => setModalOpen(true),
  }}
/>
```

---


## Utility Components

### Theme Toggle

Component for switching between light and dark themes.

**File**: `resources/js/components/ui/theme-toggle.tsx`

#### Usage Examples

```tsx
import { ThemeToggle } from '@/components/ui';

// In header or settings
<ThemeToggle />
```

---

### Keyboard Shortcuts Dialog

Dialog displaying available keyboard shortcuts.

**File**: `resources/js/components/ui/keyboard-shortcuts-dialog.tsx`

#### Usage Examples

```tsx
import { KeyboardShortcutsDialog } from '@/components/ui';

<KeyboardShortcutsDialog
  open={shortcutsOpen}
  onOpenChange={setShortcutsOpen}
/>
```

---

### Skip to Main

Accessibility component for skipping to main content.

**File**: `resources/js/components/ui/skip-to-main.tsx`

#### Usage Examples

```tsx
import { SkipToMain } from '@/components/ui';

// At the top of your app
<SkipToMain />
<Header />
<main id="main-content">
  {/* Main content */}
</main>
```

---

### Offline Indicator

Component that shows when the user is offline.

**File**: `resources/js/components/ui/offline-indicator.tsx`

#### Usage Examples

```tsx
import { OfflineIndicator } from '@/components/ui';

// In your layout
<Layout>
  <OfflineIndicator />
  {/* Page content */}
</Layout>
```

---

### Optimized Image

Image component with lazy loading and optimization.

**File**: `resources/js/components/ui/optimized-image.tsx`

#### Props Interface

```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}
```

#### Usage Examples

```tsx
import { OptimizedImage } from '@/components/ui';

// Basic optimized image
<OptimizedImage
  src="/images/event.jpg"
  alt="Church Event"
  width={800}
  height={600}
/>

// Priority image (no lazy loading)
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero Image"
  priority
/>
```

---

### Virtual List

Virtual scrolling component for large lists.

**File**: `resources/js/components/ui/virtual-list.tsx`

#### Props Interface

```typescript
interface VirtualListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}
```

#### Usage Examples

```tsx
import { VirtualList } from '@/components/ui';

<VirtualList
  items={members}
  height={600}
  itemHeight={72}
  renderItem={(member, index) => (
    <div className="p-4 border-b">
      <h3>{member.name}</h3>
      <p>{member.email}</p>
    </div>
  )}
/>
```

---


## Design System Guidelines

### Color System

All components use the design system color palette:

```typescript
// Primary colors (Church identity)
primary-50 to primary-900

// Neutral colors (Text, backgrounds)
neutral-50 to neutral-900

// Semantic colors
success-50 to success-900  // Green for success states
warning-50 to warning-900  // Yellow for warnings
error-50 to error-900      // Red for errors
info-50 to info-900        // Blue for information
```

### Typography

```typescript
// Font families
font-sans: Inter, system-ui, sans-serif
font-mono: JetBrains Mono, Consolas, monospace

// Font sizes
text-xs: 0.75rem (12px)
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)
text-3xl: 1.875rem (30px)
```

### Spacing

All components use the 8-point grid system:

```typescript
space-1: 0.25rem (4px)
space-2: 0.5rem (8px)
space-3: 0.75rem (12px)
space-4: 1rem (16px)
space-6: 1.5rem (24px)
space-8: 2rem (32px)
space-12: 3rem (48px)
```

### Border Radius

```typescript
rounded-sm: 0.25rem (4px)
rounded-md: 0.5rem (8px)
rounded-lg: 1rem (16px)
rounded-xl: 1.5rem (24px)
rounded-full: 9999px (circular)
```

### Shadows

```typescript
shadow-sm: Subtle shadow for cards
shadow-md: Medium shadow for elevated elements
shadow-lg: Large shadow for modals
shadow-xl: Extra large shadow for overlays
```

---


## Accessibility Guidelines

All components follow WCAG 2.1 AA standards:

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Logical tab order throughout the application
- Visible focus indicators on all focusable elements
- Escape key closes modals and dropdowns
- Arrow keys for navigation in lists and menus

### Screen Reader Support

- Semantic HTML elements used throughout
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content
- Proper heading hierarchy
- Alt text for all images

### Color Contrast

- Text-background contrast ratio ≥ 4.5:1 (WCAG AA)
- Large text contrast ratio ≥ 3:1
- Interactive elements have sufficient contrast
- Don't rely on color alone to convey information

### Focus Management

- Focus trapped in modals
- Focus returned to trigger element when modal closes
- Skip to main content link
- Focus visible on all interactive elements

---

## Responsive Design

All components are responsive and work across devices:

### Breakpoints

```typescript
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

### Mobile Optimizations

- Touch-friendly targets (min 44x44px)
- Horizontal scroll for tables
- Collapsible sidebar on mobile
- Stack form fields vertically
- Responsive typography
- Optimized images for mobile

---


## Performance Best Practices

### Code Splitting

```tsx
// Lazy load page components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Members = lazy(() => import('./pages/Members'));

// Use Suspense with loading fallback
<Suspense fallback={<PageLoadingState />}>
  <Dashboard />
</Suspense>
```

### Memoization

```tsx
// Memoize expensive components
const MemberCard = React.memo(({ member }) => {
  return <Card>{/* ... */}</Card>;
});

// Memoize expensive calculations
const sortedMembers = useMemo(() => {
  return members.sort((a, b) => a.name.localeCompare(b.name));
}, [members]);

// Memoize callbacks
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

### Virtual Scrolling

```tsx
// Use VirtualList for large datasets (>100 items)
<VirtualList
  items={largeDataset}
  height={600}
  itemHeight={72}
  renderItem={(item) => <ItemCard item={item} />}
/>
```

### Image Optimization

```tsx
// Use OptimizedImage for lazy loading
<OptimizedImage
  src="/images/large-image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

### Debouncing

```tsx
// Debounce search inputs
import { useDebounce } from '@/hooks';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  // API call with debounced value
  fetchResults(debouncedSearch);
}, [debouncedSearch]);
```

---


## Testing Components

### Unit Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### Integration Testing

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemberForm } from '@/components/members';

describe('MemberForm', () => {
  it('submits form with valid data', async () => {
    const onSubmit = jest.fn();
    render(<MemberForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  });
});
```

---

## Common Patterns

### Form with Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormField, FormErrorSummary, Input, Button } from '@/components/ui';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormErrorSummary errors={errors} />
      
      <FormField label="Name" error={errors.name} required>
        <Input {...register('name')} />
      </FormField>
      
      <FormField label="Email" error={errors.email} required>
        <Input type="email" {...register('email')} />
      </FormField>
      
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

---


### Data Table with Pagination

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Pagination } from '@/components/ui';
import { useState } from 'react';

function MembersTable({ members }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMembers = members.slice(startIndex, endIndex);
  const totalPages = Math.ceil(members.length / itemsPerPage);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
                  {member.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={members.length}
        showItemsPerPage
        onItemsPerPageChange={setItemsPerPage}
      />
    </>
  );
}
```

---

### Modal with Form

```tsx
import { Modal, FormField, Input, Button } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function AddMemberModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.createMember(data);
      toast({ title: 'Success', description: 'Member added successfully' });
      setIsOpen(false);
      reset();
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Member</Button>
      
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Add New Member"
        description="Enter the member's information"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <FormField label="Name" error={errors.name} required>
            <Input {...register('name', { required: 'Name is required' })} />
          </FormField>
          
          <FormField label="Email" error={errors.email} required>
            <Input type="email" {...register('email', { required: 'Email is required' })} />
          </FormField>
        </form>
      </Modal>
    </>
  );
}
```

---


### Loading States with Data Fetching

```tsx
import { LoadingState, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useQuery } from '@tanstack/react-query';

function DashboardStats() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });

  return (
    <LoadingState
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
      type="skeleton-card"
      skeletonCards={4}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.stats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </LoadingState>
  );
}
```

---

## Migration Guide

### Migrating from Old Components

If you're migrating from older components, follow these steps:

1. **Import from centralized location**:
   ```tsx
   // Old
   import Button from './components/Button';
   
   // New
   import { Button } from '@/components/ui';
   ```

2. **Update prop names**:
   ```tsx
   // Old
   <Button color="primary" />
   
   // New
   <Button variant="default" />
   ```

3. **Use new variants**:
   ```tsx
   // Old
   <Button danger />
   
   // New
   <Button variant="destructive" />
   ```

4. **Update styling approach**:
   ```tsx
   // Old
   <Button className="custom-button" />
   
   // New (use Tailwind utilities)
   <Button className="w-full mt-4" />
   ```

---


## Component Composition

### Building Complex UIs

Components are designed to be composed together:

```tsx
import { Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Button } from '@/components/ui';

function MembersCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Members</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  <Badge variant="success">{member.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
```

---

## Troubleshooting

### Common Issues

**Issue**: Components not styled correctly
- **Solution**: Ensure Tailwind CSS is properly configured and imported

**Issue**: TypeScript errors with props
- **Solution**: Check prop types match the interface, use TypeScript's IntelliSense

**Issue**: Modal not closing
- **Solution**: Ensure `onOpenChange` is properly connected to state

**Issue**: Form validation not working
- **Solution**: Verify react-hook-form is set up correctly with resolver

**Issue**: Icons not displaying
- **Solution**: Ensure lucide-react is installed and icons are imported

---

## Resources

### Documentation

- [Design System](./README.md)
- [Component Examples](./examples/)
- [Test Files](./__tests__/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)

### Related Files

- `resources/js/lib/utils.ts` - Utility functions
- `resources/js/hooks/` - Custom React hooks
- `tailwind.config.ts` - Tailwind configuration
- `resources/css/app.css` - Global styles

### Support

For questions or issues:
1. Check existing component examples
2. Review test files for usage patterns
3. Consult the design document
4. Ask the development team

---

## Changelog

### Version 1.0.0 (Current)

- Initial component library release
- All atomic, molecular, and organism components
- Comprehensive accessibility support
- Full TypeScript support
- Responsive design across all breakpoints
- Dark mode support
- Performance optimizations

---

**Last Updated**: Task 27.1 - Component API Documentation
**Maintained By**: Modern UI/UX Redesign Team

