import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../Settings';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock fetch
global.fetch = jest.fn();

const mockOfferingTypes = [
  { id: 1, name: 'Tithes', description: 'Regular tithes', is_active: true },
  { id: 2, name: 'Special Offering', description: null, is_active: true },
];

const mockExpenseCategories = [
  { id: 1, name: 'Utilities', description: 'Electricity, water, etc.', is_active: true },
  { id: 2, name: 'Salaries', description: null, is_active: true },
];

const mockFunds = [
  { id: 1, name: 'General Fund', type: 'unrestricted', description: null, current_balance: '10000.00', is_active: true },
  { id: 2, name: 'Building Fund', type: 'restricted', description: 'For building projects', current_balance: '5000.00', is_active: true },
];

const renderWithToast = (component: React.ReactElement) => {
  return render(
    <ToastProvider>
      {component}
    </ToastProvider>
  );
};

describe('Settings - Finance Tab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock API responses
    (global.fetch as any).mockImplementation((url: string) => {
      if (url === '/api/offering-types') {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true, data: mockOfferingTypes }),
        });
      }
      if (url === '/api/expense-categories') {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true, data: mockExpenseCategories }),
        });
      }
      if (url === '/api/funds') {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true, data: mockFunds }),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      });
    });
  });

  it('renders finance settings tab', async () => {
    renderWithToast(<Settings />);
    
    // Click on Finance Settings tab (use first one - desktop nav)
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Configure finance-related settings, categories, and approval workflows.')).toBeInTheDocument();
    });
  });

  it('loads and displays offering types', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Tithes')).toBeInTheDocument();
      expect(screen.getByText('Special Offering')).toBeInTheDocument();
    });
  });

  it('loads and displays expense categories', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Utilities')).toBeInTheDocument();
      expect(screen.getByText('Salaries')).toBeInTheDocument();
    });
  });

  it('loads and displays funds', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('General Fund')).toBeInTheDocument();
      expect(screen.getByText('Building Fund')).toBeInTheDocument();
    });
  });

  it('shows add offering type form when button clicked', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Tithes')).toBeInTheDocument();
    });
    
    // Click Add Offering Type button
    const addButtons = screen.getAllByText('Add Offering Type');
    fireEvent.click(addButtons[0]);
    
    // Check form is displayed
    expect(screen.getByPlaceholderText('e.g., Tithes, Special Offering')).toBeInTheDocument();
  });

  it('adds new offering type', async () => {
    (global.fetch as any).mockImplementation((url: string, options?: any) => {
      if (url === '/api/offering-types' && options?.method === 'POST') {
        return Promise.resolve({
          json: () => Promise.resolve({
            success: true,
            data: { id: 3, name: 'Missions', description: 'For missions', is_active: true },
          }),
        });
      }
      // Default mocks for GET requests
      if (url === '/api/offering-types') {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true, data: mockOfferingTypes }),
        });
      }
      if (url === '/api/expense-categories') {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true, data: mockExpenseCategories }),
        });
      }
      if (url === '/api/funds') {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true, data: mockFunds }),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      });
    });
    
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Tithes')).toBeInTheDocument();
    });
    
    // Click Add Offering Type button
    const addButtons = screen.getAllByText('Add Offering Type');
    fireEvent.click(addButtons[0]);
    
    // Fill in form
    const nameInput = screen.getByPlaceholderText('e.g., Tithes, Special Offering');
    fireEvent.change(nameInput, { target: { value: 'Missions' } });
    
    const descriptionInput = screen.getByPlaceholderText('Brief description');
    fireEvent.change(descriptionInput, { target: { value: 'For missions' } });
    
    // Submit form - use the first Save button (not "Save Changes")
    const saveButtons = screen.getAllByRole('button', { name: /^save$/i });
    fireEvent.click(saveButtons[0]);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/offering-types',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Missions',
            description: 'For missions',
            is_active: true,
          }),
        })
      );
    });
  });

  it('shows add expense category form when button clicked', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Utilities')).toBeInTheDocument();
    });
    
    // Click Add Category button
    const addButton = screen.getByText('Add Category');
    fireEvent.click(addButton);
    
    // Check form is displayed
    expect(screen.getByPlaceholderText('e.g., Utilities, Salaries')).toBeInTheDocument();
  });

  it('shows add fund form when button clicked', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('General Fund')).toBeInTheDocument();
    });
    
    // Click Add Fund button
    const addButton = screen.getByText('Add Fund');
    fireEvent.click(addButton);
    
    // Check form is displayed
    expect(screen.getByPlaceholderText('e.g., General Fund, Building Fund')).toBeInTheDocument();
  });

  it('displays fiscal year start month selector', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Fiscal Year Start Month')).toBeInTheDocument();
    });
  });

  it('displays approval workflow settings', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Approval Workflow Settings')).toBeInTheDocument();
      expect(screen.getByText('Require approval for expenses')).toBeInTheDocument();
    });
  });

  it('shows approval threshold when approval is required', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Approval Threshold')).toBeInTheDocument();
    });
  });

  it('displays active/inactive badges for offering types', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      const activeBadges = screen.getAllByText('Active');
      expect(activeBadges.length).toBeGreaterThan(0);
    });
  });

  it('displays fund type badges', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText('unrestricted')).toBeInTheDocument();
      expect(screen.getByText('restricted')).toBeInTheDocument();
    });
  });

  it('displays fund balances', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/Balance: ₱10,000.00/)).toBeInTheDocument();
      expect(screen.getByText(/Balance: ₱5,000.00/)).toBeInTheDocument();
    });
  });

  it('has save changes button', async () => {
    renderWithToast(<Settings />);
    
    // Navigate to Finance tab
    const financeTabs = screen.getAllByText('Finance Settings');
    fireEvent.click(financeTabs[0]);
    
    await waitFor(() => {
      const saveButtons = screen.getAllByText('Save Changes');
      expect(saveButtons.length).toBeGreaterThan(0);
    });
  });
});
