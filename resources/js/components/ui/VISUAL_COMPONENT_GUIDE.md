# Visual Component Guide

## Overview

This guide provides visual documentation for all UI components, showing different variants, states, and use cases. This serves as a Storybook-style reference for developers and designers.

## Table of Contents

1. [Button Variants](#button-variants)
2. [Input States](#input-states)
3. [Badge Variants](#badge-variants)
4. [Card Layouts](#card-layouts)
5. [Table Styles](#table-styles)
6. [Modal Sizes](#modal-sizes)
7. [Loading States](#loading-states)
8. [Form Examples](#form-examples)

---

## Button Variants

### Primary Actions

```tsx
// Default (Primary) Button
<Button variant="default">Save Changes</Button>
// Use for: Primary actions, form submissions, confirmations

// Large Primary Button
<Button variant="default" size="lg">Get Started</Button>
// Use for: Hero sections, call-to-action buttons

// Small Primary Button
<Button variant="default" size="sm">Apply</Button>
// Use for: Compact interfaces, table actions
```

### Secondary Actions

```tsx
// Outline Button
<Button variant="outline">Cancel</Button>
// Use for: Secondary actions, cancel buttons

// Ghost Button
<Button variant="ghost">Learn More</Button>
// Use for: Tertiary actions, subtle interactions

// Link Button
<Button variant="link">View Details</Button>
// Use for: Navigation, inline actions
```

### Destructive Actions

```tsx
// Destructive Button
<Button variant="destructive">Delete Account</Button>
// Use for: Dangerous actions, permanent deletions

// Outline Destructive
<Button variant="outline" className="text-error-600 border-error-600">
  Remove
</Button>
// Use for: Less prominent destructive actions
```

### Button States

```tsx
// Disabled State
<Button disabled>Disabled Button</Button>

// Loading State
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Processing...
</Button>

// With Icon
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Member
</Button>

// Icon Only
<Button size="icon" variant="ghost">
  <Settings className="h-4 w-4" />
</Button>
```

---


## Input States

### Basic Inputs

```tsx
// Text Input
<Input type="text" placeholder="Enter your name" />

// Email Input (shows email keyboard on mobile)
<Input type="email" placeholder="email@example.com" />

// Password Input
<Input type="password" placeholder="••••••••" />

// Number Input
<Input type="number" placeholder="0" min="0" />

// Search Input
<Input type="search" placeholder="Search..." />
```

### Input States

```tsx
// Default State
<Input placeholder="Default input" />

// Focused State (automatic)
<Input placeholder="Click to see focus ring" />

// Error State
<Input 
  placeholder="Invalid input" 
  error="This field is required"
  className="border-error-500"
/>

// Disabled State
<Input disabled placeholder="Disabled input" />

// Read-only State
<Input readOnly value="Read-only value" />
```

### Input with Labels

```tsx
// Using FormField component
<FormField label="Email Address" required>
  <Input type="email" placeholder="your@email.com" />
</FormField>

// With Helper Text
<FormField 
  label="Password" 
  helperText="Must be at least 8 characters"
>
  <Input type="password" />
</FormField>

// With Error
<FormField 
  label="Username" 
  error="Username is already taken"
  required
>
  <Input placeholder="Choose a username" />
</FormField>
```

---

## Badge Variants

### Status Badges

```tsx
// Success (Green)
<Badge variant="success">Active</Badge>
<Badge variant="success">Completed</Badge>
<Badge variant="success">Approved</Badge>

// Warning (Yellow)
<Badge variant="warning">Pending</Badge>
<Badge variant="warning">In Progress</Badge>
<Badge variant="warning">Review</Badge>

// Error (Red)
<Badge variant="destructive">Inactive</Badge>
<Badge variant="destructive">Failed</Badge>
<Badge variant="destructive">Rejected</Badge>

// Info (Blue)
<Badge variant="default">New</Badge>
<Badge variant="default">Draft</Badge>
<Badge variant="default">Scheduled</Badge>

// Neutral (Gray)
<Badge variant="secondary">Archived</Badge>
<Badge variant="secondary">Cancelled</Badge>
```

### Badge Styles

```tsx
// Default (Filled)
<Badge variant="success">Active</Badge>

// Outline
<Badge variant="outline">Draft</Badge>

// With Icon
<Badge variant="success">
  <Check className="mr-1 h-3 w-3" />
  Verified
</Badge>
```

---


## Card Layouts

### Basic Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Stat Card

```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
    <Users className="h-4 w-4 text-neutral-500" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">1,234</div>
    <p className="text-xs text-neutral-500">
      <span className="text-success-600">+12%</span> from last month
    </p>
  </CardContent>
</Card>
```

### Interactive Card

```tsx
<Card className="hover:shadow-lg transition-shadow cursor-pointer">
  <CardHeader>
    <img src="/event.jpg" alt="Event" className="w-full h-48 object-cover rounded-t-lg" />
  </CardHeader>
  <CardContent>
    <CardTitle>Sunday Service</CardTitle>
    <CardDescription>
      <Calendar className="inline h-4 w-4 mr-1" />
      Sunday, 10:00 AM
    </CardDescription>
  </CardContent>
  <CardFooter>
    <Button variant="outline" className="w-full">View Details</Button>
  </CardFooter>
</Card>
```

### Card Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

---

## Table Styles

### Basic Table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell><Badge>Admin</Badge></TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Table with Status

```tsx
<TableRow>
  <TableCell>Jane Smith</TableCell>
  <TableCell>jane@example.com</TableCell>
  <TableCell>
    <Badge variant="success">Active</Badge>
  </TableCell>
  <TableCell className="text-right">
    <Button variant="ghost" size="sm">Edit</Button>
  </TableCell>
</TableRow>
```

### Compact Table

```tsx
<Table>
  <TableBody>
    <TableRow className="hover:bg-neutral-50">
      <TableCell className="py-2">Compact row</TableCell>
      <TableCell className="py-2">Less padding</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---


## Modal Sizes

### Small Modal (sm)

```tsx
<Modal open={isOpen} onOpenChange={setIsOpen} size="sm" title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
</Modal>
// Use for: Confirmations, simple dialogs
// Max width: 24rem (384px)
```

### Medium Modal (md) - Default

```tsx
<Modal open={isOpen} onOpenChange={setIsOpen} size="md" title="Edit Member">
  <form className="space-y-4">
    <FormField label="Name">
      <Input />
    </FormField>
    <FormField label="Email">
      <Input type="email" />
    </FormField>
  </form>
</Modal>
// Use for: Forms, standard dialogs
// Max width: 32rem (512px)
```

### Large Modal (lg)

```tsx
<Modal open={isOpen} onOpenChange={setIsOpen} size="lg" title="Event Details">
  <div className="space-y-6">
    <img src="/event.jpg" className="w-full h-64 object-cover rounded-lg" />
    <div>
      <h3 className="text-lg font-semibold">Description</h3>
      <p>Detailed event information...</p>
    </div>
  </div>
</Modal>
// Use for: Detailed views, image galleries
// Max width: 42rem (672px)
```

### Extra Large Modal (xl)

```tsx
<Modal open={isOpen} onOpenChange={setIsOpen} size="xl" title="Report Preview">
  <div className="h-[600px] overflow-y-auto">
    {/* Large content */}
  </div>
</Modal>
// Use for: Reports, data visualization
// Max width: 56rem (896px)
```

### Full Screen Modal (full)

```tsx
<Modal open={isOpen} onOpenChange={setIsOpen} size="full" title="Document Editor">
  <div className="h-screen">
    {/* Full screen content */}
  </div>
</Modal>
// Use for: Editors, immersive experiences
// Max width: 90vw
```

---

## Loading States

### Spinner Sizes

```tsx
// Small Spinner
<Spinner size="sm" />
// Use for: Inline loading, buttons

// Medium Spinner (default)
<Spinner size="md" />
// Use for: Card loading, section loading

// Large Spinner
<Spinner size="lg" />
// Use for: Page loading

// Extra Large Spinner
<Spinner size="xl" />
// Use for: Full-screen loading
```

### Skeleton Loading

```tsx
// Text Skeleton
<SkeletonText lines={3} />
// Use for: Loading text content

// Card Skeleton
<SkeletonCard hasImage />
// Use for: Loading card grids

// Table Skeleton
<SkeletonTable rows={5} columns={4} />
// Use for: Loading data tables

// Avatar Skeleton
<SkeletonAvatar size="lg" />
// Use for: Loading profile pictures
```

### Loading State Wrapper

```tsx
// With Spinner
<LoadingState loading={isLoading} error={error} onRetry={refetch}>
  <div>{data}</div>
</LoadingState>

// With Skeleton
<LoadingState 
  loading={isLoading} 
  type="skeleton-table"
  skeletonRows={10}
>
  <Table>{/* table content */}</Table>
</LoadingState>
```

---


## Form Examples

### Login Form

```tsx
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Sign In</CardTitle>
    <CardDescription>Enter your credentials to access your account</CardDescription>
  </CardHeader>
  <CardContent>
    <form className="space-y-4">
      <FormField label="Email" required>
        <Input type="email" placeholder="your@email.com" />
      </FormField>
      
      <FormField label="Password" required>
        <Input type="password" placeholder="••••••••" />
      </FormField>
      
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-sm">Remember me</span>
        </label>
        <Button variant="link" size="sm">Forgot password?</Button>
      </div>
      
      <Button className="w-full">Sign In</Button>
    </form>
  </CardContent>
</Card>
```

### Multi-Step Form

```tsx
<Card>
  <CardHeader>
    <CardTitle>Add New Member</CardTitle>
    <div className="flex items-center gap-2 mt-4">
      <div className="flex-1 h-2 bg-primary-600 rounded" />
      <div className="flex-1 h-2 bg-neutral-200 rounded" />
      <div className="flex-1 h-2 bg-neutral-200 rounded" />
    </div>
    <p className="text-sm text-neutral-500 mt-2">Step 1 of 3: Personal Information</p>
  </CardHeader>
  <CardContent>
    <form className="space-y-4">
      <FormField label="Full Name" required>
        <Input placeholder="John Doe" />
      </FormField>
      
      <FormField label="Email" required>
        <Input type="email" placeholder="john@example.com" />
      </FormField>
      
      <FormField label="Phone">
        <Input type="tel" placeholder="+1 (555) 000-0000" />
      </FormField>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Next Step</Button>
  </CardFooter>
</Card>
```

### Form with Validation Errors

```tsx
<form className="space-y-4">
  <FormErrorSummary 
    errors={errors}
    title="Please fix the following errors:"
  />
  
  <FormField 
    label="Email" 
    error="Invalid email address"
    required
  >
    <Input 
      type="email" 
      className="border-error-500"
      value="invalid-email"
    />
  </FormField>
  
  <FormField 
    label="Password" 
    error="Password must be at least 8 characters"
    required
  >
    <Input 
      type="password"
      className="border-error-500"
      value="short"
    />
  </FormField>
  
  <Button type="submit">Submit</Button>
</form>
```

### Search and Filter Form

```tsx
<Card>
  <CardContent className="pt-6">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Input 
          type="search" 
          placeholder="Search members..." 
          className="w-full"
        />
      </div>
      
      <Select
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          { value: 'all', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
        className="w-full md:w-48"
      />
      
      <Select
        value={roleFilter}
        onChange={setRoleFilter}
        options={[
          { value: 'all', label: 'All Roles' },
          { value: 'admin', label: 'Admin' },
          { value: 'member', label: 'Member' },
        ]}
        className="w-full md:w-48"
      />
      
      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>
    </div>
  </CardContent>
</Card>
```

---

## Color Palette Reference

### Primary Colors (Blue)

```
primary-50:  #f0f9ff  (Lightest - backgrounds)
primary-100: #e0f2fe  (Light - hover states)
primary-200: #bae6fd  (Soft - borders)
primary-500: #0ea5e9  (Main - primary actions)
primary-600: #0284c7  (Deep - primary hover)
primary-900: #0c4a6e  (Darkest - headings)
```

### Semantic Colors

```
Success (Green):
success-50:  #d1fae5  (Background)
success-600: #10b981  (Main)
success-700: #059669  (Hover)

Warning (Yellow):
warning-50:  #fef3c7  (Background)
warning-600: #f59e0b  (Main)
warning-700: #d97706  (Hover)

Error (Red):
error-50:  #fee2e2  (Background)
error-600: #ef4444  (Main)
error-700: #dc2626  (Hover)
```

---

## Responsive Breakpoints

```
Mobile:    < 640px   (sm)
Tablet:    640-1024px (md-lg)
Desktop:   > 1024px   (lg+)

Example Usage:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 1 column on mobile, 2 on tablet, 4 on desktop */}
</div>
```

---

## Accessibility Examples

### Keyboard Navigation

```tsx
// Button with keyboard support (automatic)
<Button onClick={handleClick}>
  Click or press Enter/Space
</Button>

// Custom keyboard handler
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Custom interactive element
</div>
```

### Screen Reader Support

```tsx
// Icon button with aria-label
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Status with sr-only text
<div>
  <Badge variant="success">Active</Badge>
  <span className="sr-only">Member status is active</span>
</div>

// Loading state announcement
<div role="status" aria-live="polite">
  <Spinner />
  <span className="sr-only">Loading data...</span>
</div>
```

---

**Last Updated**: Task 27.1 - Visual Component Guide
**Purpose**: Storybook-style visual documentation for all UI components

