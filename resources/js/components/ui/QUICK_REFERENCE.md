# Component Quick Reference

## Import Patterns

```tsx
// Import multiple components
import { Button, Input, Card, Table, Modal } from '@/components/ui';

// Import specific sub-components
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui';

// Import hooks
import { useToast } from '@/components/ui';
```

---

## Common Patterns Cheat Sheet

### Button

```tsx
<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button size="sm">Small</Button>
<Button disabled>Disabled</Button>
```

### Input

```tsx
<Input type="text" placeholder="Name" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input error="Error message" />
```

### Form Field

```tsx
<FormField label="Email" error={errors.email} required>
  <Input type="email" {...register('email')} />
</FormField>
```

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Modal

```tsx
<Modal 
  open={isOpen} 
  onOpenChange={setIsOpen}
  title="Title"
>
  Content
</Modal>
```

### Badge

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Error</Badge>
```

### Loading State

```tsx
<LoadingState loading={isLoading} error={error}>
  <div>{data}</div>
</LoadingState>
```

### Toast

```tsx
const { toast } = useToast();

toast({
  title: 'Success',
  description: 'Action completed',
  variant: 'success',
});
```

---

## Variant Reference

### Button Variants
- `default` - Primary blue button
- `destructive` - Red danger button
- `outline` - Transparent with border
- `secondary` - Gray background
- `ghost` - Transparent, hover effect
- `link` - Link styling

### Button Sizes
- `default` - Standard (h-10)
- `sm` - Small (h-9)
- `lg` - Large (h-11)
- `icon` - Square (h-10 w-10)

### Badge Variants
- `default` - Blue
- `success` - Green
- `warning` - Yellow
- `destructive` - Red
- `secondary` - Gray
- `outline` - Transparent with border

### Modal Sizes
- `sm` - 384px
- `md` - 512px (default)
- `lg` - 672px
- `xl` - 896px
- `full` - 90vw

---

## Color Classes

### Primary
```
bg-primary-50 to bg-primary-900
text-primary-50 to text-primary-900
border-primary-50 to border-primary-900
```

### Semantic
```
bg-success-600, text-success-600, border-success-600
bg-warning-600, text-warning-600, border-warning-600
bg-error-600, text-error-600, border-error-600
```

### Neutral
```
bg-neutral-50 to bg-neutral-900
text-neutral-50 to text-neutral-900
```

---

## Spacing Scale

```
space-1: 4px
space-2: 8px
space-3: 12px
space-4: 16px
space-6: 24px
space-8: 32px
space-12: 48px
```

---

## Typography Scale

```
text-xs: 12px
text-sm: 14px
text-base: 16px
text-lg: 18px
text-xl: 20px
text-2xl: 24px
text-3xl: 30px
```

---

## Responsive Breakpoints

```
sm: 640px   - Mobile landscape
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
2xl: 1536px - Extra large
```

### Usage
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Responsive grid */}
</div>
```

---

## Accessibility Checklist

- [ ] All buttons have descriptive text or `aria-label`
- [ ] All images have `alt` text
- [ ] Form inputs have associated labels
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Error messages are announced
- [ ] Loading states are announced

---

## Common Layouts

### Page Header
```tsx
<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold">Page Title</h1>
    <p className="text-neutral-600">Description</p>
  </div>
  <Button>Action</Button>
</div>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

### Form Layout
```tsx
<form className="space-y-4">
  <FormField label="Field 1">
    <Input />
  </FormField>
  <FormField label="Field 2">
    <Input />
  </FormField>
  <div className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button type="submit">Save</Button>
  </div>
</form>
```

### Table with Actions
```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <Input type="search" placeholder="Search..." />
    <Button>Add New</Button>
  </div>
  <Table>...</Table>
  <Pagination {...paginationProps} />
</div>
```

---

## Performance Tips

1. **Use React.memo for expensive components**
   ```tsx
   const MemberCard = React.memo(({ member }) => <Card>...</Card>);
   ```

2. **Use useMemo for expensive calculations**
   ```tsx
   const sortedData = useMemo(() => data.sort(...), [data]);
   ```

3. **Use useCallback for event handlers**
   ```tsx
   const handleClick = useCallback(() => {...}, []);
   ```

4. **Use VirtualList for large datasets**
   ```tsx
   <VirtualList items={largeArray} itemHeight={72} />
   ```

5. **Lazy load images**
   ```tsx
   <OptimizedImage src="/large-image.jpg" />
   ```

---

## Testing Snippets

### Button Test
```tsx
it('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Form Test
```tsx
it('submits form with valid data', async () => {
  const onSubmit = jest.fn();
  render(<MyForm onSubmit={onSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Name'), 'John');
  await userEvent.click(screen.getByText('Submit'));
  
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
  });
});
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not applying | Check Tailwind config, ensure CSS is imported |
| TypeScript errors | Verify prop types match interface |
| Modal not closing | Ensure `onOpenChange` updates state |
| Icons not showing | Install `lucide-react`, import icons |
| Form validation failing | Check react-hook-form setup, resolver |

---

**Quick Links**:
- [Full API Documentation](./COMPONENT_API_DOCUMENTATION.md)
- [Visual Guide](./VISUAL_COMPONENT_GUIDE.md)
- [Component Examples](./examples/)
- [Test Files](./__tests__/)

