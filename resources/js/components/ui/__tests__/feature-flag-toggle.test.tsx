import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureFlagToggle } from '../feature-flag-toggle';

describe('FeatureFlagToggle', () => {
  beforeEach(() => {
    // Clear window.__FEATURE_FLAGS__ before each test
    delete (window as any).__FEATURE_FLAGS__;
  });

  it('should render with disabled state when feature flag is off', () => {
    (window as any).__FEATURE_FLAGS__ = {
      modern_ui: false,
      modern_ui_pages: {},
    };

    render(<FeatureFlagToggle />);

    expect(screen.getByText('Modern UI Feature Flag')).toBeInTheDocument();
    expect(screen.getByText('Disabled')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('should render with enabled state when feature flag is on', () => {
    (window as any).__FEATURE_FLAGS__ = {
      modern_ui: true,
      modern_ui_pages: {},
    };

    render(<FeatureFlagToggle />);

    expect(screen.getByText('Enabled')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Modern UI is enabled for your account')).toBeInTheDocument();
  });

  it('should show page-specific settings when expanded', () => {
    (window as any).__FEATURE_FLAGS__ = {
      modern_ui: true,
      modern_ui_pages: {
        dashboard: true,
        members: false,
        settings: true,
      },
    };

    render(<FeatureFlagToggle />);

    // Initially, page-specific settings should not be visible
    expect(screen.queryByText('dashboard')).not.toBeInTheDocument();

    // Click to show details
    const showButton = screen.getByText('Page-specific Settings');
    fireEvent.click(showButton);

    // Now page-specific settings should be visible
    expect(screen.getByText('dashboard')).toBeInTheDocument();
    expect(screen.getByText('members')).toBeInTheDocument();
    expect(screen.getByText('settings')).toBeInTheDocument();
  });

  it('should hide page-specific settings when collapsed', () => {
    (window as any).__FEATURE_FLAGS__ = {
      modern_ui: true,
      modern_ui_pages: {
        dashboard: true,
      },
    };

    render(<FeatureFlagToggle />);

    // Show details
    const showButton = screen.getByText('Page-specific Settings');
    fireEvent.click(showButton);
    expect(screen.getByText('dashboard')).toBeInTheDocument();

    // Hide details
    fireEvent.click(showButton);
    expect(screen.queryByText('dashboard')).not.toBeInTheDocument();
  });

  it('should display administrator instructions', () => {
    (window as any).__FEATURE_FLAGS__ = {
      modern_ui: false,
      modern_ui_pages: {},
    };

    render(<FeatureFlagToggle />);

    expect(screen.getByText('For Administrators:')).toBeInTheDocument();
    expect(screen.getByText(/MODERN_UI_ENABLED/)).toBeInTheDocument();
    expect(screen.getByText(/MODERN_UI_BETA_USERS/)).toBeInTheDocument();
    expect(screen.getByText(/MODERN_UI_ROLLOUT_PERCENTAGE/)).toBeInTheDocument();
  });

  it('should not show page-specific settings section when modern_ui is disabled', () => {
    (window as any).__FEATURE_FLAGS__ = {
      modern_ui: false,
      modern_ui_pages: {
        dashboard: true,
      },
    };

    render(<FeatureFlagToggle />);

    expect(screen.queryByText('Page-specific Settings')).not.toBeInTheDocument();
  });

  it('should correctly display enabled/disabled status for each page', () => {
    (window as any).__FEATURE_FLAGS__ = {
      modern_ui: true,
      modern_ui_pages: {
        dashboard: true,
        members: false,
        events: true,
      },
    };

    render(<FeatureFlagToggle />);

    // Show details
    const showButton = screen.getByText('Page-specific Settings');
    fireEvent.click(showButton);

    // Check that each page has correct status
    const dashboardRow = screen.getByText('dashboard').closest('div');
    expect(dashboardRow).toHaveTextContent('Enabled');

    const membersRow = screen.getByText('members').closest('div');
    expect(membersRow).toHaveTextContent('Disabled');

    const eventsRow = screen.getByText('events').closest('div');
    expect(eventsRow).toHaveTextContent('Enabled');
  });
});
