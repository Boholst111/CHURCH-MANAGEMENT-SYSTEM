# API Client Tests

This directory contains unit tests for the API client modules.

## Test Files

### settingsApi.test.ts
Tests for the Settings API client (`settingsApi.ts`).

**Coverage:**
- Church settings operations (get/update)
- Notification preferences operations (get/update)
- User profile update operations
- Error handling and validation

**Validates Requirements:** 6.4, 6.5, 6.6

### memberApi.test.ts
Tests for the Member API client (`memberApi.ts`).

**Coverage:**
- Member CRUD operations
- Error handling

**Validates Requirements:** 3.4, 3.5

### dashboardApi.test.ts
Tests for the Dashboard API client (`dashboardApi.ts`).

**Coverage:**
- Dashboard statistics retrieval
- Attendance data retrieval
- Activity feed retrieval

### leadershipApi.test.ts
Tests for the Leadership API client (`leadershipApi.ts`).

**Coverage:**
- Leadership CRUD operations
- Error handling

### reportsApi.test.ts
Tests for the Reports API client (`reportsApi.ts`).

**Coverage:**
- Report data retrieval
- PDF generation
- CSV export

### api.test.ts
Tests for the base API client configuration (`api.ts`).

**Coverage:**
- Axios instance configuration
- Request interceptors (authentication)
- Response interceptors (error handling)

## Running Tests

Run all API tests:
```bash
npm test -- __tests__/
```

Run a specific test file:
```bash
npm test -- settingsApi.test.ts
```

Run tests in watch mode:
```bash
npm test
```

## Test Patterns

All API client tests follow these patterns:

1. **Mock the base API module** using Jest's `jest.mock()`
2. **Arrange** - Set up test data and mock responses
3. **Act** - Call the API client method
4. **Assert** - Verify the correct API endpoint was called and response was handled

Example:
```typescript
it('should fetch data successfully', async () => {
  // Arrange
  const mockData = { id: 1, name: 'Test' };
  mockedApi.get.mockResolvedValue({
    data: { success: true, data: mockData }
  });

  // Act
  const result = await apiClient.getData();

  // Assert
  expect(mockedApi.get).toHaveBeenCalledWith('/endpoint');
  expect(result).toEqual(mockData);
});
```

## Error Testing

All API clients test error scenarios:

- Network errors
- Validation errors (400)
- Not found errors (404)
- Server errors (500)

Example:
```typescript
it('should throw error when validation fails', async () => {
  // Arrange
  mockedApi.post.mockRejectedValue({
    response: {
      data: {
        success: false,
        errors: { field: ['Error message'] }
      }
    }
  });

  // Act & Assert
  await expect(apiClient.create(data)).rejects.toMatchObject({
    response: { data: { success: false } }
  });
});
```

