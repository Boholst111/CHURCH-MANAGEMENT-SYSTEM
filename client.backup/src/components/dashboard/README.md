# Dashboard Components

This directory contains reusable components for the Dashboard page.

## QuickStatsCard

A reusable card component for displaying quick statistics with icons, values, and optional trends.

### Props

- `title` (string, required): The title/label for the stat
- `value` (string | number, required): The value to display
- `icon` (LucideIcon, required): Icon component from lucide-react
- `trend` (object, optional): Trend information
  - `value` (number): Percentage change
  - `isPositive` (boolean): Whether the trend is positive or negative
- `isCurrency` (boolean, optional): Whether to format the value as currency (default: false)

### Usage Examples

```tsx
import { QuickStatsCard } from './components/dashboard';
import { Users, DollarSign, Calendar, UserPlus } from 'lucide-react';

// Basic usage
<QuickStatsCard
  title="Total Members"
  value={150}
  icon={Users}
/>

// With currency formatting
<QuickStatsCard
  title="Monthly Tithes"
  value={12500.50}
  icon={DollarSign}
  isCurrency={true}
/>

// With positive trend
<QuickStatsCard
  title="New Visitors"
  value={25}
  icon={UserPlus}
  trend={{ value: 12.5, isPositive: true }}
/>

// With negative trend
<QuickStatsCard
  title="Upcoming Events"
  value={8}
  icon={Calendar}
  trend={{ value: -5, isPositive: false }}
/>
```

### Features

- Automatic currency formatting with USD symbol and 2 decimal places
- Trend indicators with color coding (green for positive, red for negative)
- Responsive design with hover effects
- Consistent styling following the church design system
- Icon display in a soft blue circular background

### Requirements

Validates Requirements 2.1 and 2.5:
- Requirement 2.1: Display Quick Stats cards showing Total Members, Monthly Tithes, Upcoming Events, and New Visitors
- Requirement 2.5: Format monetary values with appropriate currency symbols
