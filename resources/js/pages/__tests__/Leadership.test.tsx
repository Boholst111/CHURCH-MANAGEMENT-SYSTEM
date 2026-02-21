import React from 'react';
import { render, screen } from '@testing-library/react';
import Leadership from '../Leadership';
import { useAuth } from '../../contexts/AuthContext';

// Mock the AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Leadership Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page title', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    render(<Leadership />);
    
    expect(screen.getByText('Pastors & Leadership')).toBeInTheDocument();
  });

  it('displays responsive grid layout', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    const { container } = render(<Leadership />);
    
    // Check for grid layout classes
    const gridElement = container.querySelector('.grid');
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-6');
  });

  it('shows "Add Leadership" button for admin users', () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: { id: 1, name: 'Admin', email: 'admin@test.com', role: 'admin' } 
    });
    
    render(<Leadership />);
    
    expect(screen.getByRole('button', { name: /add leadership/i })).toBeInTheDocument();
  });

  it('does not show "Add Leadership" button for non-admin users', () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: { id: 2, name: 'Staff', email: 'staff@test.com', role: 'staff' } 
    });
    
    render(<Leadership />);
    
    expect(screen.queryByRole('button', { name: /add leadership/i })).not.toBeInTheDocument();
  });

  it('does not show "Add Leadership" button for readonly users', () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: { id: 3, name: 'Viewer', email: 'viewer@test.com', role: 'readonly' } 
    });
    
    render(<Leadership />);
    
    expect(screen.queryByRole('button', { name: /add leadership/i })).not.toBeInTheDocument();
  });

  it('does not show "Add Leadership" button when user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    render(<Leadership />);
    
    expect(screen.queryByRole('button', { name: /add leadership/i })).not.toBeInTheDocument();
  });

  it('displays empty state message', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    render(<Leadership />);
    
    expect(screen.getByText(/no leadership profiles yet/i)).toBeInTheDocument();
  });
});
