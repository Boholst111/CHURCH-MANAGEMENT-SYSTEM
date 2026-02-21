# Error Handling and Loading States Guide

This guide explains how to implement error handling and loading states in the Church Management System.

## Components

### 1. ErrorBoundary

A global error boundary component that catches unhandled errors in React components.

**Usage:**

```tsx
import ErrorBoundary from './components/ErrorBoundary';

// Wrap your app or specific components
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**Features:**
- Catches JavaScript errors in child components
- Displays user-friendly error message
- Shows error details in development mode
- Provides "Try Again" and "Go Home" buttons
- Logs errors to console (can be extended to log to external service)

### 2. Spinner Components

Reusable loading spinner components with different sizes and styles.

**Spinner:**

```tsx
import { Spinner } from './components/ui/spinner';

// Basic usage
<Spinner />

// With custom size and label
<Spinner size="lg" label="Loading data..." />

// Available sizes: 'sm', 'md', 'lg', 'xl'
```

**LoadingOverlay:**

```tsx
import { LoadingOverlay } from './components/ui/spinner';

// Full-screen loading overlay
{isLoading && <LoadingOverlay message="Processing..." />}
```

**InlineLoader:**

```tsx
import { InlineLoader } from './components/ui/spinner';

// Small inline loader for buttons
<button disabled={isLoading}>
  {isLoading ? <InlineLoader /> : 'Submit'}
</button>
```

### 3. Toast Notifications

Display success, error, and info messages to users.

**Usage:**

```tsx
import { useToast } from './contexts/ToastContext';

const MyComponent = () => {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast('success', 'Operation completed successfully');
  };

  const handleError = () => {
    showToast('error', 'Something went wrong');
  };

  const handleInfo = () => {
    showToast('info', 'Here is some information');
  };
};
```

### 4. Error Handler Utilities

Utilities for handling API errors and converting them to user-friendly messages.

**getErrorMessage:**

```tsx
import { getErrorMessage } from './lib/errorHandler';

try {
  await api.post('/endpoint', data);
} catch (error) {
  const message = getErrorMessage(error, 'Failed to save data');
  showToast('error', message);
}
```

**getValidationErrors:**

```tsx
import { getValidationErrors } from './lib/errorHandler';

try {
  await api.post('/endpoint', data);
} catch (error) {
  if (isValidationError(error)) {
    const validationErrors = getValidationErrors(error);
    // validationErrors = { email: 'Email is required', password: 'Password is too short' }
    setFormErrors(validationErrors);
  }
}
```

**Error Type Checkers:**

```tsx
import {
  isValidationError,
  isAuthError,
  isAuthorizationError,
  isNotFoundError,
  isServerError,
} from './lib/errorHandler';

try {
  await api.get('/endpoint');
} catch (error) {
  if (isAuthError(error)) {
    // Handle authentication error (401)
  } else if (isAuthorizationError(error)) {
    // Handle authorization error (403)
  } else if (isNotFoundError(error)) {
    // Handle not found error (404)
  } else if (isServerError(error)) {
    // Handle server error (500+)
  } else if (isValidationError(error)) {
    // Handle validation error (400, 422)
  }
}
```

## Best Practices

### 1. Page-Level Loading States

Always show loading states when fetching data:

```tsx
const MyPage: React.FC = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await api.get('/endpoint');
        setData(result.data);
      } catch (error) {
        const message = getErrorMessage(error, 'Failed to load data');
        showToast('error', message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" label="Loading..." />
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
};
```

### 2. Form Submission with Loading and Error Handling

```tsx
const MyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setFormErrors({});
      
      await api.post('/endpoint', data);
      
      showToast('success', 'Data saved successfully');
    } catch (error) {
      if (isValidationError(error)) {
        const errors = getValidationErrors(error);
        setFormErrors(errors);
      } else {
        const message = getErrorMessage(error, 'Failed to save data');
        showToast('error', message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with error display */}
      <Input
        name="email"
        error={formErrors.email}
      />
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <InlineLoader /> : 'Submit'}
      </Button>
    </form>
  );
};
```

### 3. Async Operations with Toast Notifications

```tsx
const handleDelete = async (id: number) => {
  try {
    await api.delete(`/endpoint/${id}`);
    showToast('success', 'Item deleted successfully');
    fetchData(); // Refresh list
  } catch (error) {
    const message = getErrorMessage(error, 'Failed to delete item');
    showToast('error', message);
  }
};
```

### 4. Error Logging

```tsx
import { formatErrorForLogging } from './lib/errorHandler';

try {
  await api.post('/endpoint', data);
} catch (error) {
  // Log error with context
  const logData = formatErrorForLogging(error, 'MyComponent.handleSubmit');
  console.error('Error:', logData);
  
  // In production, send to error tracking service
  // errorTrackingService.log(logData);
  
  showToast('error', getErrorMessage(error));
}
```

## Requirements Validation

This implementation validates the following requirements:

- **Requirement 6.5**: Success messages when settings are saved successfully
- **Requirement 6.6**: Error messages when validation fails, indicating which fields need correction

## Testing

All error handling components and utilities have comprehensive unit tests:

- `ErrorBoundary.test.tsx` - Tests error boundary functionality
- `spinner.test.tsx` - Tests loading spinner components
- `errorHandler.test.ts` - Tests error handling utilities
- `ToastContext.test.tsx` - Tests toast notification system

Run tests with:

```bash
npm test -- --testPathPattern="ErrorBoundary|spinner|errorHandler|ToastContext"
```
