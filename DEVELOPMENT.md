# Development Guide

This guide provides detailed instructions for developers working on the Church Management System. It covers the development workflow, project structure, and best practices for adding new features.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Adding React Components](#adding-react-components)
- [Writing Tests](#writing-tests)
- [Using Path Aliases](#using-path-aliases)
- [Environment Variables](#environment-variables)
- [Build Process](#build-process)
- [Development Workflow](#development-workflow)
- [Best Practices](#best-practices)

## Getting Started

### Prerequisites

- PHP 7.3 or higher
- Composer
- Node.js 14+ and npm
- MySQL 5.7+
- Basic knowledge of Laravel, React, and TypeScript

### Initial Setup

Follow the installation instructions in [README.md](README.md) to set up the project.

## Project Structure

The application uses a unified architecture where Laravel serves both the frontend and backend:

```
church-management-system/
├── app/                          # Laravel backend
│   ├── Http/Controllers/         # API controllers
│   ├── Models/                   # Eloquent models
│   └── Services/                 # Business logic
├── resources/
│   ├── js/                       # React frontend source
│   │   ├── components/           # Reusable React components
│   │   │   ├── ui/               # Base UI components (buttons, dialogs, etc.)
│   │   │   ├── layout/           # Layout components (Sidebar, Header)
│   │   │   └── ...               # Feature-specific components
│   │   ├── contexts/             # React Context providers
│   │   │   ├── AuthContext.tsx   # Authentication state
│   │   │   └── ToastContext.tsx  # Toast notifications
│   │   ├── hooks/                # Custom React hooks
│   │   │   └── useAuth.ts        # Authentication hook
│   │   ├── lib/                  # Utilities and helpers
│   │   │   ├── api.ts            # Axios API client
│   │   │   └── utils.ts          # Utility functions
│   │   ├── pages/                # Page components (routes)
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Members.tsx
│   │   │   └── ...
│   │   ├── __tests__/            # Test files
│   │   ├── App.tsx               # Main App component
│   │   └── index.tsx             # React entry point
│   ├── css/                      # Stylesheets
│   │   ├── app.css               # Main CSS with Tailwind directives
│   │   └── print.css             # Print-specific styles
│   └── views/
│       └── app.blade.php         # Main Blade template (serves React app)
├── public/                       # Compiled assets (generated)
│   ├── js/app.js                 # Compiled JavaScript
│   ├── css/app.css               # Compiled CSS
│   └── mix-manifest.json         # Asset versioning manifest
├── routes/
│   ├── api.php                   # API routes
│   └── web.php                   # Web routes (SPA catch-all)
├── tests/                        # Backend tests
├── webpack.mix.js                # Laravel Mix configuration
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest test configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json                  # Node dependencies and scripts
```

## Adding React Components

### Creating a New Component

1. **Choose the appropriate directory:**
   - `resources/js/components/ui/` - Base UI components (buttons, inputs, dialogs)
   - `resources/js/components/layout/` - Layout components (navigation, headers)
   - `resources/js/components/` - Feature-specific components
   - `resources/js/pages/` - Full page components (routes)

2. **Create the component file:**

```typescript
// resources/js/components/MemberCard.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MemberCardProps {
  member: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  onEdit?: (id: number) => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, onEdit }) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold">
        {member.first_name} {member.last_name}
      </h3>
      <p className="text-sm text-gray-600">{member.email}</p>
      <p className="text-sm text-gray-600">{member.phone}</p>
      {onEdit && (
        <Button onClick={() => onEdit(member.id)} className="mt-2">
          Edit
        </Button>
      )}
    </Card>
  );
};
```

3. **Use TypeScript for type safety:**
   - Always define interfaces for props
   - Use proper types for state and function parameters
   - Leverage TypeScript's type inference where possible

4. **Import the component:**

```typescript
// Using relative path
import { MemberCard } from './components/MemberCard';

// Using path alias (recommended)
import { MemberCard } from '@/components/MemberCard';
```

### Component Best Practices

- **Keep components small and focused** - Each component should have a single responsibility
- **Use functional components with hooks** - Avoid class components
- **Implement proper TypeScript types** - Define interfaces for all props and state
- **Follow naming conventions** - Use PascalCase for component names
- **Use Tailwind CSS for styling** - Avoid inline styles or CSS modules
- **Make components reusable** - Extract common patterns into shared components

### Adding a New Page

1. **Create the page component:**

```typescript
// resources/js/pages/Volunteers.tsx
import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

interface Volunteer {
  id: number;
  name: string;
  role: string;
  availability: string;
}

export const Volunteers: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    try {
      const response = await api.get('/volunteers');
      setVolunteers(response.data);
    } catch (error) {
      console.error('Failed to load volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Volunteers</h1>
      {/* Component content */}
    </div>
  );
};
```

2. **Add the route in App.tsx:**

```typescript
// resources/js/App.tsx
import { Volunteers } from '@/pages/Volunteers';

// Inside the Routes component:
<Route path="/volunteers" element={<Volunteers />} />
```

3. **Add navigation link (if needed):**

```typescript
// resources/js/components/layout/Sidebar.tsx
<NavLink to="/volunteers">
  <Users className="mr-3 h-5 w-5" />
  Volunteers
</NavLink>
```

## Writing Tests

The project uses Jest and React Testing Library for testing. Tests are located in `resources/js/__tests__/`.

### Test File Structure

```
resources/js/__tests__/
├── components/
│   ├── MemberCard.test.tsx
│   └── ui/
│       └── button.test.tsx
├── pages/
│   └── Dashboard.test.tsx
├── hooks/
│   └── useAuth.test.tsx
└── lib/
    └── api.test.ts
```

### Writing a Component Test

```typescript
// resources/js/__tests__/components/MemberCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemberCard } from '@/components/MemberCard';

describe('MemberCard', () => {
  const mockMember = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '555-1234',
  };

  it('renders member information', () => {
    render(<MemberCard member={mockMember} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('555-1234')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<MemberCard member={mockMember} onEdit={onEdit} />);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(onEdit).toHaveBeenCalledWith(1);
  });

  it('does not render edit button when onEdit is not provided', () => {
    render(<MemberCard member={mockMember} />);
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});
```

### Writing an API Test

```typescript
// resources/js/__tests__/lib/api.test.ts
import MockAdapter from 'axios-mock-adapter';
import { api } from '@/lib/api';

describe('API Client', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
  });

  it('fetches members successfully', async () => {
    const mockMembers = [
      { id: 1, first_name: 'John', last_name: 'Doe' },
      { id: 2, first_name: 'Jane', last_name: 'Smith' },
    ];

    mock.onGet('/members').reply(200, mockMembers);

    const response = await api.get('/members');
    expect(response.data).toEqual(mockMembers);
  });

  it('handles API errors', async () => {
    mock.onGet('/members').reply(500, { message: 'Server error' });

    await expect(api.get('/members')).rejects.toThrow();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- MemberCard.test.tsx
```

### Test Best Practices

- **Test user behavior, not implementation** - Focus on what users see and do
- **Use descriptive test names** - Clearly state what is being tested
- **Follow AAA pattern** - Arrange, Act, Assert
- **Mock external dependencies** - Use axios-mock-adapter for API calls
- **Test edge cases** - Empty states, error states, loading states
- **Keep tests isolated** - Each test should be independent

## Using Path Aliases

The project uses the `@/` alias to reference files in `resources/js/` directory. This makes imports cleaner and easier to refactor.

### Configuration

Path aliases are configured in three places:

1. **webpack.mix.js** - For build-time resolution:
```javascript
resolve: {
  alias: {
    '@': path.resolve('resources/js'),
  },
}
```

2. **tsconfig.json** - For TypeScript type checking:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["resources/js/*"]
    }
  }
}
```

3. **jest.config.js** - For test resolution:
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/resources/js/$1',
}
```

### Usage Examples

```typescript
// ❌ Avoid deep relative paths
import { Button } from '../../../components/ui/button';
import { api } from '../../../lib/api';
import { useAuth } from '../../../hooks/useAuth';

// ✅ Use path aliases instead
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
```

### When to Use Path Aliases

- **Always use for cross-directory imports** - When importing from a different top-level directory
- **Use for deeply nested imports** - When the relative path has more than 2 levels (`../../..`)
- **Optional for sibling imports** - For files in the same directory, relative imports are fine

```typescript
// Same directory - relative path is fine
import { MemberCard } from './MemberCard';

// Different directory - use alias
import { Button } from '@/components/ui/button';
```

## Environment Variables

### Backend Environment Variables

Backend environment variables are defined in the `.env` file in the root directory:

```env
APP_NAME="Church Management System"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=church_management
DB_USERNAME=root
DB_PASSWORD=

# Add custom variables as needed
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
```

Access in Laravel:
```php
$appName = env('APP_NAME');
$dbHost = env('DB_HOST', '127.0.0.1'); // with default value
```

### Frontend Environment Variables

To use environment variables in JavaScript/TypeScript, prefix them with `MIX_`:

```env
# .env
MIX_API_TIMEOUT=30000
MIX_ENABLE_ANALYTICS=true
MIX_GOOGLE_MAPS_KEY=your_api_key_here
```

Access in React:
```typescript
// resources/js/lib/config.ts
export const config = {
  apiTimeout: parseInt(process.env.MIX_API_TIMEOUT || '30000'),
  enableAnalytics: process.env.MIX_ENABLE_ANALYTICS === 'true',
  googleMapsKey: process.env.MIX_GOOGLE_MAPS_KEY || '',
};
```

### Important Notes

- **Never commit `.env` to version control** - Use `.env.example` as a template
- **Rebuild after changing MIX_ variables** - Run `npm run dev` or `npm run hot` to pick up changes
- **MIX_ variables are public** - They are compiled into JavaScript, so don't store secrets
- **Use different values per environment** - Development, staging, and production should have separate `.env` files

## Build Process

Laravel Mix compiles React and CSS assets from `resources/` to `public/`.

### Build Commands

```bash
# Development build (unminified, with source maps)
npm run dev

# Watch mode (rebuilds on file changes)
npm run watch

# Hot Module Replacement (instant updates without page reload)
npm run hot

# Production build (minified, optimized, versioned)
npm run prod
```

### Build Output

After running a build command, the following files are generated:

```
public/
├── js/
│   ├── app.js              # Main application bundle
│   ├── [name].js           # Code-split chunks (lazy-loaded routes)
│   └── app.js.map          # Source map (development only)
├── css/
│   ├── app.css             # Compiled CSS with Tailwind
│   └── app.css.map         # Source map (development only)
└── mix-manifest.json       # Asset versioning manifest
```

### Build Configuration

The build process is configured in `webpack.mix.js`:

```javascript
const mix = require('laravel-mix');
const path = require('path');

// Compile TypeScript/React entry point
mix.ts('resources/js/index.tsx', 'public/js/app.js')
   .react()
   
   // Compile CSS with Tailwind
   .postCss('resources/css/app.css', 'public/css', [
     require('tailwindcss'),
     require('autoprefixer'),
   ])
   
   // Configure webpack
   .webpackConfig({
     resolve: {
       extensions: ['.js', '.jsx', '.ts', '.tsx'],
       alias: {
         '@': path.resolve('resources/js'),
       },
     },
     output: {
       chunkFilename: 'js/[name].js?id=[chunkhash]',
     },
   });

// Development features
if (!mix.inProduction()) {
  mix.sourceMaps();
}

// Production optimizations
if (mix.inProduction()) {
  mix.version(); // Add hash to filenames for cache busting
}
```

### Build Optimizations

**Development:**
- Source maps for debugging
- Fast compilation with `transpileOnly` mode
- Hot Module Replacement for instant updates

**Production:**
- Minification of JavaScript and CSS
- Tree shaking to remove unused code
- Code splitting for lazy-loaded routes
- Asset versioning for cache busting
- Optimized bundle size

### Troubleshooting Build Issues

**Build fails with TypeScript errors:**
```bash
# Check for type errors
npx tsc --noEmit

# Fix errors and rebuild
npm run dev
```

**Build succeeds but app doesn't work:**
```bash
# Clear Laravel cache
php artisan cache:clear
php artisan view:clear

# Rebuild assets
npm run dev

# Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
```

**Hot Module Replacement not working:**
```bash
# Ensure both servers are running
npm run hot          # Terminal 1
php artisan serve    # Terminal 2

# Check that HMR is connecting (look for WebSocket connection in browser console)
```

## Development Workflow

### Daily Development

1. **Start the development servers:**

```bash
# Terminal 1: Start Laravel Mix HMR server
npm run hot

# Terminal 2: Start Laravel server
php artisan serve
```

2. **Open the application:**
   - Navigate to `http://localhost:8000` in your browser
   - Changes to React components will update instantly without page reload

3. **Make changes:**
   - Edit React components in `resources/js/`
   - Edit Laravel code in `app/`
   - Changes are reflected immediately (HMR for frontend, Laravel auto-reload for backend)

4. **Run tests:**
```bash
# Frontend tests
npm test

# Backend tests
php artisan test
```

### Adding a New Feature

1. **Plan the feature:**
   - Define the API endpoints needed
   - Sketch the UI components
   - Identify reusable components

2. **Backend implementation:**
   - Create migration: `php artisan make:migration create_volunteers_table`
   - Create model: `php artisan make:model Volunteer`
   - Create controller: `php artisan make:controller VolunteerController`
   - Add routes in `routes/api.php`
   - Write backend tests

3. **Frontend implementation:**
   - Create page component in `resources/js/pages/`
   - Create feature-specific components in `resources/js/components/`
   - Add route in `App.tsx`
   - Add navigation link in `Sidebar.tsx`
   - Write frontend tests

4. **Test the feature:**
   - Run backend tests: `php artisan test`
   - Run frontend tests: `npm test`
   - Manual testing in browser

5. **Commit and deploy:**
   - Commit changes with descriptive message
   - Build production assets: `npm run prod`
   - Deploy to server

### Code Review Checklist

Before submitting code for review:

- [ ] All tests pass (frontend and backend)
- [ ] TypeScript has no errors (`npx tsc --noEmit`)
- [ ] Code follows project conventions
- [ ] Components have proper TypeScript types
- [ ] New features have tests
- [ ] No console.log statements left in code
- [ ] Imports use path aliases where appropriate
- [ ] UI is responsive and accessible
- [ ] Error handling is implemented
- [ ] Loading states are handled

## Best Practices

### React Best Practices

1. **Use functional components with hooks**
```typescript
// ✅ Good
const MyComponent: React.FC<Props> = ({ data }) => {
  const [state, setState] = useState(initialState);
  return <div>{data}</div>;
};

// ❌ Avoid
class MyComponent extends React.Component {
  // ...
}
```

2. **Extract custom hooks for reusable logic**
```typescript
// resources/js/hooks/useMembers.ts
export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    // Implementation
  };

  return { members, loading, loadMembers };
};
```

3. **Use TypeScript strictly**
```typescript
// ✅ Good - explicit types
interface Member {
  id: number;
  first_name: string;
  last_name: string;
}

const member: Member = { id: 1, first_name: 'John', last_name: 'Doe' };

// ❌ Avoid - any type
const member: any = { id: 1, name: 'John' };
```

4. **Handle loading and error states**
```typescript
const MyComponent: React.FC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return <div>{/* Render data */}</div>;
};
```

### API Best Practices

1. **Use the centralized API client**
```typescript
// ✅ Good
import { api } from '@/lib/api';
const response = await api.get('/members');

// ❌ Avoid
import axios from 'axios';
const response = await axios.get('http://localhost:8000/api/members');
```

2. **Handle errors consistently**
```typescript
try {
  const response = await api.post('/members', memberData);
  toast.success('Member created successfully');
  return response.data;
} catch (error) {
  console.error('Failed to create member:', error);
  toast.error('Failed to create member');
  throw error;
}
```

3. **Use TypeScript for API responses**
```typescript
interface ApiResponse<T> {
  data: T;
  message?: string;
}

const response = await api.get<ApiResponse<Member[]>>('/members');
const members: Member[] = response.data.data;
```

### Styling Best Practices

1. **Use Tailwind utility classes**
```typescript
// ✅ Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-semibold">Title</h2>
</div>

// ❌ Avoid inline styles
<div style={{ display: 'flex', padding: '16px', background: 'white' }}>
  <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Title</h2>
</div>
```

2. **Use the `cn()` utility for conditional classes**
```typescript
import { cn } from '@/lib/utils';

<button
  className={cn(
    'px-4 py-2 rounded',
    isActive && 'bg-blue-500 text-white',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click me
</button>
```

3. **Create reusable component variants**
```typescript
// resources/js/components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-gray-300 hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
```

### Performance Best Practices

1. **Use lazy loading for routes**
```typescript
// resources/js/App.tsx
import { lazy, Suspense } from 'react';

const Members = lazy(() => import('@/pages/Members'));
const Events = lazy(() => import('@/pages/Events'));

<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/members" element={<Members />} />
    <Route path="/events" element={<Events />} />
  </Routes>
</Suspense>
```

2. **Memoize expensive computations**
```typescript
import { useMemo } from 'react';

const filteredMembers = useMemo(() => {
  return members.filter(m => m.status === 'active');
}, [members]);
```

3. **Avoid unnecessary re-renders**
```typescript
import { memo } from 'react';

export const MemberCard = memo<MemberCardProps>(({ member }) => {
  return <div>{member.name}</div>;
});
```

### Security Best Practices

1. **Never expose sensitive data in frontend**
```typescript
// ❌ Bad - API keys in frontend code
const API_KEY = 'sk_live_abc123';

// ✅ Good - Use backend proxy
const response = await api.post('/send-email', { to, subject, body });
```

2. **Validate user input**
```typescript
const handleSubmit = async (data: FormData) => {
  // Validate on frontend
  if (!data.email || !isValidEmail(data.email)) {
    toast.error('Invalid email address');
    return;
  }
  
  // Backend will also validate
  await api.post('/members', data);
};
```

3. **Handle authentication properly**
```typescript
// Use the AuthContext
const { user, logout } = useAuth();

// Check permissions
if (user?.role !== 'admin') {
  return <div>Access denied</div>;
}
```

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs/8.x)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Laravel Mix Documentation](https://laravel-mix.com/docs/6.0/installation)

## Getting Help

If you encounter issues or have questions:

1. Check this documentation first
2. Review the [README.md](README.md) for setup instructions
3. Check the existing codebase for similar examples
4. Consult the official documentation for the relevant technology
5. Ask the team for help

Happy coding! 🚀
