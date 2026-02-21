import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';
import Layout from '../../Layout';

// Mock child component
const TestChild = () => <div>Test Content</div>;

describe('Layout Component', () => {
  const renderLayout = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <TestChild />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderLayout();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('displays the church name in sidebar', () => {
    renderLayout();
    expect(screen.getByText('MFMC System')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderLayout();
    
    // Check for main navigation items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Small Groups')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
