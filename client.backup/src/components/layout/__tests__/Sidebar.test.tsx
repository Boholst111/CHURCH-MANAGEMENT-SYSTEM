import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
  it('renders all navigation items', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Small Groups')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('highlights the active menu item for dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveClass('bg-primary-50');
    expect(dashboardLink).toHaveClass('text-primary-700');
  });

  it('highlights the active menu item for members page', () => {
    render(
      <MemoryRouter initialEntries={['/members']}>
        <Sidebar />
      </MemoryRouter>
    );

    const membersLink = screen.getByText('Members').closest('a');
    expect(membersLink).toHaveClass('bg-primary-50');
    expect(membersLink).toHaveClass('text-primary-700');
  });

  it('highlights the active menu item for nested routes', () => {
    render(
      <MemoryRouter initialEntries={['/members/123']}>
        <Sidebar />
      </MemoryRouter>
    );

    const membersLink = screen.getByText('Members').closest('a');
    expect(membersLink).toHaveClass('bg-primary-50');
    expect(membersLink).toHaveClass('text-primary-700');
  });

  it('does not highlight inactive menu items', () => {
    render(
      <MemoryRouter initialEntries={['/members']}>
        <Sidebar />
      </MemoryRouter>
    );

    const reportsLink = screen.getByText('Reports').closest('a');
    expect(reportsLink).not.toHaveClass('bg-primary-50');
    expect(reportsLink).toHaveClass('text-gray-700');
  });

  it('displays church name in footer', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(screen.getByText('Mahayahay Free Methodist Church')).toBeInTheDocument();
  });
});
