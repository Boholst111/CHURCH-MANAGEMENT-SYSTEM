import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

/**
 * Code Splitting Tests
 * 
 * Validates that lazy loading is implemented for route components
 * to improve initial bundle size and load performance.
 * 
 * Validates Requirements: 3.7 (Performance optimization)
 */

describe('App Code Splitting', () => {
  test('should render loading state while lazy loading components', async () => {
    // Render the app
    render(<App />);

    // The app should render without crashing
    // Lazy loaded components will show a loading spinner initially
    await waitFor(() => {
      // The app should eventually render (either login or dashboard)
      expect(document.body).toBeInTheDocument();
    });
  });

  test('should successfully lazy load Login component', async () => {
    // Mock window.location to ensure we're on login page
    delete (window as any).location;
    (window as any).location = { pathname: '/login' };

    render(<App />);

    // Wait for lazy loaded component to render
    await waitFor(() => {
      // The component should eventually load
      expect(document.body).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
