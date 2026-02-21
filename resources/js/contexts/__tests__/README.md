# AuthContext Tests

This directory contains comprehensive tests for the authentication context implementation.

## Test Coverage

### AuthContext.test.tsx

Tests the authentication context provider and hook functionality:

#### useAuth Hook
- ✅ Throws error when used outside AuthProvider
- ✅ Provides auth context when used within AuthProvider

#### Initial State
- ✅ Starts with null user and loading false when no token in localStorage
- ✅ Restores user from localStorage on mount
- ✅ Handles invalid JSON in localStorage gracefully

#### Login Functionality
- ✅ Successfully logs in and stores token and user
- ✅ Throws error on login failure with server message
- ✅ Throws generic error when no error message provided

#### Logout Functionality
- ✅ Clears user state and localStorage
- ✅ Can be called when no user is logged in

#### Token Storage
- ✅ Stores token in localStorage on successful login
- ✅ Removes token from localStorage on logout

## Running Tests

```bash
# Run all AuthContext tests
npm test -- --testPathPattern="AuthContext"

# Run with coverage
npm test -- --testPathPattern="AuthContext" --coverage

# Run in watch mode
npm test -- --testPathPattern="AuthContext" --watch
```

## Implementation Details

The AuthContext provides:

1. **User State Management**: Maintains current user information
2. **Login Function**: Authenticates users and stores credentials
3. **Logout Function**: Clears authentication state
4. **Token Persistence**: Stores auth token in localStorage
5. **Auto-restore**: Restores user session on page reload
6. **Error Handling**: Gracefully handles authentication errors

## Requirements Validated

- **Requirement 10.1**: Authentication with username and password ✅
- Token storage in localStorage ✅
- API interceptor includes auth token in requests ✅
- Session restoration on page reload ✅
