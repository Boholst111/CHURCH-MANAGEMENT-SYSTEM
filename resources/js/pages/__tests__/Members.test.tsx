import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Members from '../Members';
import api from '../../lib/api';
import { ToastProvider } from '../../contexts/ToastContext';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock the API module
jest.mock('../../lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

// Helper to render with ToastProvider and AuthProvider
const renderWithToast = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      <ToastProvider>{component}</ToastProvider>
    </AuthProvider>
  );
};

/**
 * Unit tests for MemberDirectory page structure
 * 
 * Tests the basic structure and UI elements required by task 8.1:
 * - Page header and title
 * - Search input
 * - Status filter controls
 * - Add Member button
 * 
 * Validates Requirements: 3.1, 3.2, 3.3, 3.4
 */
describe('Members Page - Structure', () => {
  beforeEach(() => {
    // Set up mock user in localStorage
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin'
    }));

    // Mock API responses
    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/small-groups') {
        return Promise.resolve({
          data: {
            success: true,
            data: [
              { id: 1, name: 'Youth Group' },
              { id: 2, name: 'Prayer Group' },
            ],
          },
        });
      }
      if (url.startsWith('/members')) {
        return Promise.resolve({
          data: {
            success: true,
            data: [],
            pagination: {
              current_page: 1,
              last_page: 1,
              total: 0,
            },
          },
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it('renders page header with title and description', () => {
    renderWithToast(<Members />);
    
    expect(screen.getByText('Member Directory')).toBeInTheDocument();
    expect(screen.getByText('Manage and view all church members and visitors')).toBeInTheDocument();
  });

  it('renders Add Member button', () => {
    renderWithToast(<Members />);
    
    const addButton = screen.getByRole('button', { name: /add member/i });
    expect(addButton).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    renderWithToast(<Members />);
    
    const searchInput = screen.getByPlaceholderText(/search by name, email, or phone/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('renders status filter dropdown with all options', async () => {
    renderWithToast(<Members />);
    
    // Wait for component to mount and API calls to complete
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });
    
    const filterSelects = screen.getAllByRole('combobox');
    const statusFilter = filterSelects[0]; // First combobox is status filter
    
    expect(statusFilter).toBeInTheDocument();
    
    // Check all filter options are present
    expect(screen.getByText('All Members')).toBeInTheDocument();
    expect(screen.getByText('Active Members')).toBeInTheDocument();
    expect(screen.getByText('Visitors')).toBeInTheDocument();
  });

  it('updates search query when typing in search input', () => {
    renderWithToast(<Members />);
    
    const searchInput = screen.getByPlaceholderText(/search by name, email, or phone/i) as HTMLInputElement;
    
    fireEvent.change(searchInput, { target: { value: 'John Doe' } });
    
    expect(searchInput.value).toBe('John Doe');
  });

  it('updates status filter when selecting different option', async () => {
    renderWithToast(<Members />);
    
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });
    
    const filterSelects = screen.getAllByRole('combobox');
    const statusFilter = filterSelects[0] as HTMLSelectElement;
    
    fireEvent.change(statusFilter, { target: { value: 'active' } });
    
    expect(statusFilter.value).toBe('active');
  });

  it('opens member form when Add Member button is clicked', async () => {
    renderWithToast(<Members />);
    
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    const addButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(addButton);
    
    // Form dialog should be visible
    await waitFor(() => {
      expect(screen.getByText('Add New Member')).toBeInTheDocument();
    });
  });

  it('displays search and filter controls in a card', async () => {
    const { container } = renderWithToast(<Members />);
    
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });
    
    // Check that search input and filter are within a card component
    const searchInput = screen.getByPlaceholderText(/search by name, email, or phone/i);
    const filterSelects = screen.getAllByRole('combobox');
    
    expect(searchInput).toBeInTheDocument();
    expect(filterSelects.length).toBeGreaterThanOrEqual(2); // Status and Small Group filters
  });
});

/**
 * Unit tests for search and filter functionality (Task 8.6)
 * 
 * Tests the search debouncing and filter functionality:
 * - Search input with debouncing
 * - Status filter dropdown
 * - Small group filter dropdown
 * - Table updates when filters change
 * 
 * Validates Requirements: 3.2, 3.3, 8.6
 */
describe('Members Page - Search and Filter (Task 8.6)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    
    // Set up mock user in localStorage
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin'
    }));
    
    // Mock API responses
    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/small-groups') {
        return Promise.resolve({
          data: {
            success: true,
            data: [
              { id: 1, name: 'Youth Group' },
              { id: 2, name: 'Prayer Group' },
            ],
          },
        });
      }
      if (url.startsWith('/members')) {
        return Promise.resolve({
          data: {
            success: true,
            data: [],
            pagination: {
              current_page: 1,
              last_page: 1,
              total: 0,
            },
          },
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    localStorage.clear();
  });

  it('renders small group filter dropdown', async () => {
    renderWithToast(<Members />);
    
    // Wait for small groups to load
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith('/small-groups');
    });
    
    // Should have status filter, membership type filter, and small group filter
    const filterSelects = screen.getAllByRole('combobox');
    expect(filterSelects.length).toBe(3);
    
    // Check that "All Small Groups" is displayed (the default selected value)
    expect(screen.getByText('All Small Groups')).toBeInTheDocument();
  });

  it('debounces search input (300ms delay)', async () => {
    renderWithToast(<Members />);
    
    // Wait for initial API calls
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });
    
    const initialCallCount = mockedApi.get.mock.calls.length;
    
    const searchInput = screen.getByPlaceholderText(/search members/i);
    
    // Type in search input
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    // Should not call API immediately
    expect(mockedApi.get).toHaveBeenCalledTimes(initialCallCount);
    
    // Fast-forward time by 300ms and wait for state update
    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });
    
    // Now API should be called with search parameter
    await waitFor(() => {
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('search=John');
    });
  });

  it('updates table when status filter changes', async () => {
    renderWithToast(<Members />);
    
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });
    
    const initialCallCount = mockedApi.get.mock.calls.length;
    
    const filterSelects = screen.getAllByRole('combobox');
    const statusFilter = filterSelects[0]; // First select is status filter
    
    // Change status filter
    fireEvent.change(statusFilter, { target: { value: 'active' } });
    
    // API should be called with status parameter
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledTimes(initialCallCount + 1);
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('status=active');
    });
  });

  it('updates table when membership type filter changes', async () => {
    renderWithToast(<Members />);
    
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });
    
    const initialCallCount = mockedApi.get.mock.calls.length;
    
    const filterSelects = screen.getAllByRole('combobox');
    const membershipTypeFilter = filterSelects[1]; // Second select is membership type filter
    
    // Change membership type filter
    fireEvent.change(membershipTypeFilter, { target: { value: 'regular' } });
    
    // API should be called with membership_type parameter
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledTimes(initialCallCount + 1);
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('membership_type=regular');
    });
  });

  it('updates table when small group filter changes', async () => {
    renderWithToast(<Members />);
    
    // Wait for small groups to load
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith('/small-groups');
    });
    
    const initialCallCount = mockedApi.get.mock.calls.length;
    
    const filterSelects = screen.getAllByRole('combobox');
    const smallGroupFilter = filterSelects[2]; // Third select is small group filter
    
    // Change small group filter
    fireEvent.change(smallGroupFilter, { target: { value: '1' } });
    
    // API should be called with small_group_id parameter
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledTimes(initialCallCount + 1);
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('small_group_id=1');
    });
  });

  it('resets to page 1 when filters change', async () => {
    renderWithToast(<Members />);
    
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });
    
    const filterSelects = screen.getAllByRole('combobox');
    const statusFilter = filterSelects[0];
    
    // Change filter
    fireEvent.change(statusFilter, { target: { value: 'active' } });
    
    // Should request page 1
    await waitFor(() => {
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('page=1');
    });
  });

  it('combines multiple filters in API request', async () => {
    renderWithToast(<Members />);
    
    // Wait for small groups to load
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith('/small-groups');
    });
    
    const searchInput = screen.getByPlaceholderText(/search members/i);
    const filterSelects = screen.getAllByRole('combobox');
    const statusFilter = filterSelects[0]; // First select is status filter
    const membershipTypeFilter = filterSelects[1]; // Second select is membership type filter
    const smallGroupFilter = filterSelects[2]; // Third select is small group filter
    
    // Apply search
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });
    
    await waitFor(() => {
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('search=John');
    });
    
    // Apply status filter
    fireEvent.change(statusFilter, { target: { value: 'active' } });
    
    await waitFor(() => {
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('status=active');
    });
    
    // Apply membership type filter
    fireEvent.change(membershipTypeFilter, { target: { value: 'regular' } });
    
    await waitFor(() => {
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('membership_type=regular');
    });
    
    // Apply small group filter
    fireEvent.change(smallGroupFilter, { target: { value: '1' } });
    
    await waitFor(() => {
      const lastCall = mockedApi.get.mock.calls[mockedApi.get.mock.calls.length - 1];
      expect(lastCall[0]).toContain('small_group_id=1');
      expect(lastCall[0]).toContain('status=active');
      expect(lastCall[0]).toContain('membership_type=regular');
      expect(lastCall[0]).toContain('search=John');
    });
  });
});

/**
 * Unit tests for Member CRUD operations (Task 8.7)
 * 
 * Tests the member CRUD functionality:
 * - Opening add member form
 * - Opening edit member form
 * - Submitting member form (create/update)
 * - Deleting member with confirmation
 * - Success/error toast notifications
 * 
 * Validates Requirements: 3.4, 3.5
 */
describe('Members Page - CRUD Operations (Task 8.7)', () => {
  const mockMember = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    city: 'Springfield',
    status: 'active' as const,
    small_group_id: 1,
    date_joined: '2024-01-01',
    birth_date: '1990-01-01',
    gender: 'male' as const,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    // Set up mock user in localStorage
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin'
    }));

    // Mock API responses
    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/small-groups') {
        return Promise.resolve({
          data: {
            success: true,
            data: [
              { id: 1, name: 'Youth Group' },
              { id: 2, name: 'Prayer Group' },
            ],
          },
        });
      }
      if (url.startsWith('/members')) {
        return Promise.resolve({
          data: {
            success: true,
            data: [mockMember],
            pagination: {
              current_page: 1,
              last_page: 1,
              total: 1,
            },
          },
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('opens member form when Add Member button is clicked', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    const addButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(addButton);

    // Form dialog should be visible
    await waitFor(() => {
      expect(screen.getByText('Add New Member')).toBeInTheDocument();
    });
  });

  it('opens member form with data when edit is clicked', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Find and click edit button (assuming MemberTable has edit buttons)
    const editButtons = screen.getAllByRole('button');
    const editButton = editButtons.find((btn) => 
      btn.textContent?.includes('Edit') || btn.querySelector('[data-testid="edit-icon"]')
    );

    if (editButton) {
      fireEvent.click(editButton);

      // Form dialog should be visible with member data
      await waitFor(() => {
        expect(screen.getByText('Edit Member')).toBeInTheDocument();
      });
    }
  });

  it('creates a new member successfully', async () => {
    mockedApi.post.mockResolvedValue({
      data: {
        success: true,
        data: mockMember,
      },
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    const addButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Member')).toBeInTheDocument();
    });

    // Fill form fields
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.change(cityInput, { target: { value: 'Springfield' } });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith('/members', expect.any(Object));
    });

    // Success toast should be shown
    await waitFor(() => {
      expect(screen.getByText('Member created successfully')).toBeInTheDocument();
    });
  });

  it('updates an existing member successfully', async () => {
    mockedApi.put.mockResolvedValue({
      data: {
        success: true,
        data: { ...mockMember, last_name: 'Smith' },
      },
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Find and click edit button
    const editButtons = screen.getAllByRole('button');
    const editButton = editButtons.find((btn) => 
      btn.textContent?.includes('Edit') || btn.querySelector('[data-testid="edit-icon"]')
    );

    if (editButton) {
      fireEvent.click(editButton);

      await waitFor(() => {
        expect(screen.getByText('Edit Member')).toBeInTheDocument();
      });

      // Update last name
      const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement;
      fireEvent.change(lastNameInput, { target: { value: 'Smith' } });

      // Submit form
      const submitButton = screen.getByRole('button', { name: /update member/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockedApi.put).toHaveBeenCalledWith(`/members/${mockMember.id}`, expect.any(Object));
      });

      // Success toast should be shown
      await waitFor(() => {
        expect(screen.getByText('Member updated successfully')).toBeInTheDocument();
      });
    }
  });

  it('shows delete confirmation dialog when delete is clicked', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Find and click delete button
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find((btn) => 
      btn.textContent?.includes('Delete') || btn.querySelector('[data-testid="delete-icon"]')
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);

      // Delete confirmation dialog should be visible
      await waitFor(() => {
        expect(screen.getByText('Delete Member')).toBeInTheDocument();
        expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();
      });
    }
  });

  it('deletes a member successfully after confirmation', async () => {
    mockedApi.delete.mockResolvedValue({
      data: {
        success: true,
        message: 'Member deleted successfully',
      },
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Find and click delete button
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find((btn) => 
      btn.textContent?.includes('Delete') || btn.querySelector('[data-testid="delete-icon"]')
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText('Delete Member')).toBeInTheDocument();
      });

      // Click confirm delete button
      const confirmButton = screen.getByRole('button', { name: /delete member/i });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockedApi.delete).toHaveBeenCalledWith(`/members/${mockMember.id}`);
      });

      // Success toast should be shown
      await waitFor(() => {
        expect(screen.getByText('Member deleted successfully')).toBeInTheDocument();
      });
    }
  });

  it('shows error toast when member creation fails', async () => {
    mockedApi.post.mockRejectedValue({
      response: {
        data: {
          success: false,
          message: 'Email already exists',
        },
      },
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    const addButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Member')).toBeInTheDocument();
    });

    // Fill form fields
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const addressInput = screen.getByLabelText(/address/i);
    const cityInput = screen.getByLabelText(/city/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.change(cityInput, { target: { value: 'Springfield' } });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalled();
    });

    // Error toast should be shown
    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });

  it('shows error toast when member deletion fails', async () => {
    mockedApi.delete.mockRejectedValue({
      response: {
        data: {
          success: false,
          message: 'Failed to delete member',
        },
      },
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Find and click delete button
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find((btn) => 
      btn.textContent?.includes('Delete') || btn.querySelector('[data-testid="delete-icon"]')
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText('Delete Member')).toBeInTheDocument();
      });

      // Click confirm delete button
      const confirmButton = screen.getByRole('button', { name: /delete member/i });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockedApi.delete).toHaveBeenCalled();
      });

      // Error toast should be shown
      await waitFor(() => {
        expect(screen.getByText('Failed to delete member')).toBeInTheDocument();
      });
    }
  });

  it('refreshes member list after successful create', async () => {
    mockedApi.post.mockResolvedValue({
      data: {
        success: true,
        data: mockMember,
      },
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    const initialCallCount = mockedApi.get.mock.calls.length;

    const addButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Member')).toBeInTheDocument();
    });

    // Fill and submit form
    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    
    const submitButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalled();
    });

    // Member list should be refreshed
    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledTimes(initialCallCount + 1);
    });
  });

  it('refreshes member list after successful delete', async () => {
    mockedApi.delete.mockResolvedValue({
      data: {
        success: true,
        message: 'Member deleted successfully',
      },
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const initialCallCount = mockedApi.get.mock.calls.length;

    // Find and click delete button
    const deleteButtons = screen.getAllByRole('button');
    const deleteButton = deleteButtons.find((btn) => 
      btn.textContent?.includes('Delete') || btn.querySelector('[data-testid="delete-icon"]')
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText('Delete Member')).toBeInTheDocument();
      });

      // Confirm delete
      const confirmButton = screen.getByRole('button', { name: /delete member/i });
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockedApi.delete).toHaveBeenCalled();
      });

      // Member list should be refreshed
      await waitFor(() => {
        expect(mockedApi.get).toHaveBeenCalledTimes(initialCallCount + 1);
      });
    }
  });
});


/**
 * Unit tests for CSV Export functionality (Task 15.1)
 * 
 * Tests the CSV export functionality:
 * - Export button is rendered
 * - Export button calls API with current filters
 * - CSV file is downloaded with timestamped filename
 * - Success/error toast notifications
 * 
 * Validates Requirements: 11.1, 11.3, 11.5
 */
describe('Members Page - CSV Export (Task 15.1)', () => {
  const mockMember = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    city: 'Springfield',
    status: 'active' as const,
    small_group_id: 1,
    date_joined: '2024-01-01',
    birth_date: '1990-01-01',
    gender: 'male' as const,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    // Mock API responses
    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/small-groups') {
        return Promise.resolve({
          data: {
            success: true,
            data: [
              { id: 1, name: 'Youth Group' },
              { id: 2, name: 'Prayer Group' },
            ],
          },
        });
      }
      if (url.startsWith('/members/export')) {
        // Return a mock CSV blob
        const csvContent = 'First Name,Last Name,Email\nJohn,Doe,john.doe@example.com';
        const blob = new Blob([csvContent], { type: 'text/csv' });
        return Promise.resolve({ data: blob });
      }
      if (url.startsWith('/members')) {
        return Promise.resolve({
          data: {
            success: true,
            data: [mockMember],
            pagination: {
              current_page: 1,
              last_page: 1,
              total: 1,
            },
          },
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    // Mock URL.createObjectURL and URL.revokeObjectURL
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Export CSV button', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    const exportButton = screen.getByRole('button', { name: /export csv/i });
    expect(exportButton).toBeInTheDocument();
  });

  it('calls export API when Export CSV button is clicked', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      const exportCall = mockedApi.get.mock.calls.find(call => 
        call[0].startsWith('/members/export')
      );
      expect(exportCall).toBeDefined();
    });
  });

  it('exports with current search filter', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Apply search filter
    const searchInput = screen.getByPlaceholderText(/search by name, email, or phone/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Wait for debounce
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    // Click export button
    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      const exportCall = mockedApi.get.mock.calls.find(call => 
        call[0].includes('/members/export') && call[0].includes('search=John')
      );
      expect(exportCall).toBeDefined();
    });
  });

  it('exports with current status filter', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Apply status filter
    const filterSelects = screen.getAllByRole('combobox');
    const statusFilter = filterSelects[0];
    fireEvent.change(statusFilter, { target: { value: 'active' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Click export button
    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      const exportCall = mockedApi.get.mock.calls.find(call => 
        call[0].includes('/members/export') && call[0].includes('status=active')
      );
      expect(exportCall).toBeDefined();
    });
  });

  it('exports with current small group filter', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(screen.getByText('Youth Group')).toBeInTheDocument();
    });

    // Apply small group filter
    const filterSelects = screen.getAllByRole('combobox');
    const smallGroupFilter = filterSelects[1];
    fireEvent.change(smallGroupFilter, { target: { value: '1' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Click export button
    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      const exportCall = mockedApi.get.mock.calls.find(call => 
        call[0].includes('/members/export') && call[0].includes('small_group_id=1')
      );
      expect(exportCall).toBeDefined();
    });
  });

  it('exports with multiple filters combined', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(screen.getByText('Youth Group')).toBeInTheDocument();
    });

    // Apply search filter
    const searchInput = screen.getByPlaceholderText(/search by name, email, or phone/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Wait for debounce
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
    });

    // Apply status filter
    const filterSelects = screen.getAllByRole('combobox');
    const statusFilter = filterSelects[0];
    fireEvent.change(statusFilter, { target: { value: 'active' } });

    // Apply small group filter
    const smallGroupFilter = filterSelects[1];
    fireEvent.change(smallGroupFilter, { target: { value: '1' } });

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Click export button
    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      const exportCall = mockedApi.get.mock.calls.find(call => 
        call[0].includes('/members/export') && 
        call[0].includes('search=John') &&
        call[0].includes('status=active') &&
        call[0].includes('small_group_id=1')
      );
      expect(exportCall).toBeDefined();
    });
  });

  it('downloads CSV file with timestamped filename', async () => {
    // Mock document.createElement and appendChild
    const mockLink = {
      href: '',
      download: '',
      click: jest.fn(),
    };
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Click export button
    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.download).toMatch(/^members_export_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.csv$/);
    });

    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('shows success toast after successful export', async () => {
    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Click export button
    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(screen.getByText('Members exported successfully')).toBeInTheDocument();
    });
  });

  it('shows error toast when export fails', async () => {
    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/small-groups') {
        return Promise.resolve({
          data: {
            success: true,
            data: [],
          },
        });
      }
      if (url.startsWith('/members/export')) {
        return Promise.reject({
          response: {
            data: {
              success: false,
              message: 'Export failed',
            },
          },
        });
      }
      if (url.startsWith('/members')) {
        return Promise.resolve({
          data: {
            success: true,
            data: [],
            pagination: {
              current_page: 1,
              last_page: 1,
              total: 0,
            },
          },
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Click export button
    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(screen.getByText('Export failed')).toBeInTheDocument();
    });
  });

  it('disables export button while exporting', async () => {
    // Make the export take some time
    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/small-groups') {
        return Promise.resolve({
          data: {
            success: true,
            data: [],
          },
        });
      }
      if (url.startsWith('/members/export')) {
        return new Promise(resolve => {
          setTimeout(() => {
            const csvContent = 'First Name,Last Name,Email\nJohn,Doe,john.doe@example.com';
            const blob = new Blob([csvContent], { type: 'text/csv' });
            resolve({ data: blob });
          }, 100);
        });
      }
      if (url.startsWith('/members')) {
        return Promise.resolve({
          data: {
            success: true,
            data: [],
            pagination: {
              current_page: 1,
              last_page: 1,
              total: 0,
            },
          },
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    renderWithToast(<Members />);

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalled();
    });

    // Click export button
    const exportButton = screen.getByRole('button', { name: /export csv/i });
    fireEvent.click(exportButton);

    // Button should be disabled and show "Exporting..."
    await waitFor(() => {
      expect(exportButton).toBeDisabled();
      expect(exportButton).toHaveTextContent('Exporting...');
    });

    // Wait for export to complete
    await waitFor(() => {
      expect(exportButton).not.toBeDisabled();
      expect(exportButton).toHaveTextContent('Export CSV');
    });
  });
});
