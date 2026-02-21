import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';
import Header from '../Header';

const mockOnMenuClick = jest.fn();

describe('Header Component', () => {
  beforeEach(() => {
    mockOnMenuClick.mockClear();
  });

  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Header onMenuClick={mockOnMenuClick} />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderHeader();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('calls onMenuClick when mobile menu button is clicked', () => {
    renderHeader();
    
    // Find the menu button (it should be visible on mobile)
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  it('displays user menu dropdown when clicked', async () => {
    renderHeader();
    
    // Find and click the user menu button
    const userButton = screen.getByRole('button', { name: /user/i });
    fireEvent.click(userButton);
    
    // Check if dropdown menu items appear
    await waitFor(() => {
      expect(screen.getByText('My Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  it('closes user menu when clicking outside', async () => {
    renderHeader();
    
    // Open the menu
    const userButton = screen.getByRole('button', { name: /user/i });
    fireEvent.click(userButton);
    
    await waitFor(() => {
      expect(screen.getByText('My Profile')).toBeInTheDocument();
    });
    
    // Click outside
    fireEvent.mouseDown(document.body);
    
    await waitFor(() => {
      expect(screen.queryByText('My Profile')).not.toBeInTheDocument();
    });
  });

  it('displays user initial in avatar', () => {
    renderHeader();
    
    // The user initial should be displayed (mocked user data would show 'U' or actual initial)
    const avatar = screen.getByText(/[A-Z]/);
    expect(avatar).toBeInTheDocument();
  });
});
