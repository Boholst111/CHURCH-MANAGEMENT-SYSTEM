# Church Management System - Design System

## Overview

This design system implements a soft blue and white color palette with professional typography and consistent spacing for the Mahayahay Free Methodist Church Management System.

## Color Palette

### Primary Colors (Soft Blue)
- `primary-50`: #eff6ff - Lightest blue
- `primary-100`: #dbeafe
- `primary-200`: #bfdbfe
- `primary-300`: #93c5fd
- `primary-400`: #60a5fa
- `primary-500`: #3b82f6 - Main blue
- `primary-600`: #2563eb
- `primary-700`: #1d4ed8 - Darkest blue

### Neutral Colors
- `neutral-50`: #f9fafb - Lightest gray
- `neutral-100`: #f3f4f6
- `neutral-200`: #e5e7eb
- `neutral-300`: #d1d5db
- `neutral-500`: #6b7280
- `neutral-700`: #374151
- `neutral-900`: #111827 - Darkest gray

### Semantic Colors
- `success`: #10b981 - Green for success states
- `warning`: #f59e0b - Orange for warnings
- `error`: #ef4444 - Red for errors

### Background Colors
- `background`: #ffffff - White
- `background-secondary`: #f9fafb - Light gray

## Typography

### Font Family
- Primary: Inter
- Fallback: Roboto
- System fallbacks: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Sizes
- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)

### Font Weights
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

## Spacing

- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 0.75rem (12px)
- `4`: 1rem (16px)
- `5`: 1.25rem (20px)
- `6`: 1.5rem (24px)
- `8`: 2rem (32px)
- `10`: 2.5rem (40px)
- `12`: 3rem (48px)

## Border Radius

- `sm`: 0.25rem (4px)
- `md`: 0.5rem (8px)
- `lg`: 0.75rem (12px)
- `xl`: 1rem (16px)

## Usage

### CSS Variables

All design tokens are available as CSS variables:

```css
/* Colors */
background-color: var(--color-primary-500);
color: var(--color-neutral-700);

/* Typography */
font-family: var(--font-family);
font-size: var(--font-size-lg);
font-weight: var(--font-weight-semibold);

/* Spacing */
padding: var(--spacing-4);
margin: var(--spacing-6);

/* Border Radius */
border-radius: var(--radius-md);
```

### Tailwind Classes

Use Tailwind utility classes with the design system:

```jsx
// Colors
<div className="bg-primary-500 text-white">
<div className="bg-neutral-50 text-neutral-900">

// Typography
<h1 className="text-3xl font-bold">
<p className="text-base font-normal">

// Spacing
<div className="p-4 m-6">
<div className="space-y-4">

// Border Radius
<button className="rounded-md">
<div className="rounded-lg">
```

### Theme Context

Use the ThemeContext for theme management:

```tsx
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Wrap your app with ThemeProvider
function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}

// Use theme in components
function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## Design Principles

1. **Soft and Professional**: Use the soft blue palette to create a trustworthy, calming interface
2. **Ample White Space**: Maintain generous spacing between components for visual clarity
3. **Rounded Corners**: Apply rounded corners to all cards, buttons, and input fields
4. **Consistent Typography**: Use Inter/Roboto for all text content
5. **Responsive Design**: Ensure layouts adapt gracefully to all screen sizes

## Components

All UI components should follow these guidelines:

- Use the design system colors, typography, and spacing
- Apply rounded corners (typically `rounded-md` or `rounded-lg`)
- Maintain consistent padding and margins
- Use semantic color names for states (success, warning, error)
- Ensure proper contrast ratios for accessibility
