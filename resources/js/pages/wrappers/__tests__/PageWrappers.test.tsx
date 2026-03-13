import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardWrapper from '../DashboardWrapper';
import MembersWrapper from '../MembersWrapper';
import SmallGroupsWrapper from '../SmallGroupsWrapper';
import LeadershipWrapper from '../LeadershipWrapper';
import EventsWrapper from '../EventsWrapper';
import FinanceWrapper from '../FinanceWrapper';
import ReportsWrapper from '../ReportsWrapper';
import ActivityLogWrapper from '../ActivityLogWrapper';
import UsersWrapper from '../UsersWrapper';
import SettingsWrapper from '../SettingsWrapper';

// Mock the useModernUIPage hook
jest.mock('../../../hooks/useFeatureFlag', () => ({
  useModernUIPage: jest.fn(),
}));

// Mock all page components
jest.mock('../../Dashboard', () => {
  return () => <div data-testid="modern-dashboard">Modern Dashboard</div>;
});

jest.mock('../../Members', () => {
  return () => <div data-testid="modern-members">Modern Members</div>;
});

jest.mock('../../SmallGroups', () => {
  return () => <div data-testid="modern-small-groups">Modern Small Groups</div>;
});

jest.mock('../../Leadership', () => {
  return () => <div data-testid="modern-leadership">Modern Leadership</div>;
});

jest.mock('../../Events', () => {
  return () => <div data-testid="modern-events">Modern Events</div>;
});

jest.mock('../../Finance', () => {
  return () => <div data-testid="modern-finance">Modern Finance</div>;
});

jest.mock('../../Reports', () => {
  return () => <div data-testid="modern-reports">Modern Reports</div>;
});

jest.mock('../../ActivityLog', () => {
  return () => <div data-testid="modern-activity-log">Modern Activity Log</div>;
});

jest.mock('../../Users', () => {
  return () => <div data-testid="modern-users">Modern Users</div>;
});

jest.mock('../../Settings', () => {
  return () => <div data-testid="modern-settings">Modern Settings</div>;
});

describe('Page Wrappers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('DashboardWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<DashboardWrapper />);
      expect(screen.getByTestId('modern-dashboard')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<DashboardWrapper />);
      expect(screen.getByText('Legacy Dashboard')).toBeInTheDocument();
      expect(screen.getByText(/You are viewing the legacy Dashboard/)).toBeInTheDocument();
    });
  });

  describe('MembersWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<MembersWrapper />);
      expect(screen.getByTestId('modern-members')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<MembersWrapper />);
      expect(screen.getByText('Legacy Members')).toBeInTheDocument();
    });
  });

  describe('SmallGroupsWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<SmallGroupsWrapper />);
      expect(screen.getByTestId('modern-small-groups')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<SmallGroupsWrapper />);
      expect(screen.getByText('Legacy Small Groups')).toBeInTheDocument();
    });
  });

  describe('LeadershipWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<LeadershipWrapper />);
      expect(screen.getByTestId('modern-leadership')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<LeadershipWrapper />);
      expect(screen.getByText('Legacy Leadership')).toBeInTheDocument();
    });
  });

  describe('EventsWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<EventsWrapper />);
      expect(screen.getByTestId('modern-events')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<EventsWrapper />);
      expect(screen.getByText('Legacy Events')).toBeInTheDocument();
    });
  });

  describe('FinanceWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<FinanceWrapper />);
      expect(screen.getByTestId('modern-finance')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<FinanceWrapper />);
      expect(screen.getByText('Legacy Finance')).toBeInTheDocument();
    });
  });

  describe('ReportsWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<ReportsWrapper />);
      expect(screen.getByTestId('modern-reports')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<ReportsWrapper />);
      expect(screen.getByText('Legacy Reports')).toBeInTheDocument();
    });
  });

  describe('ActivityLogWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<ActivityLogWrapper />);
      expect(screen.getByTestId('modern-activity-log')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<ActivityLogWrapper />);
      expect(screen.getByText('Legacy Activity Log')).toBeInTheDocument();
    });
  });

  describe('UsersWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<UsersWrapper />);
      expect(screen.getByTestId('modern-users')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<UsersWrapper />);
      expect(screen.getByText('Legacy Users')).toBeInTheDocument();
    });
  });

  describe('SettingsWrapper', () => {
    it('renders modern UI when feature flag is enabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<SettingsWrapper />);
      expect(screen.getByTestId('modern-settings')).toBeInTheDocument();
    });

    it('renders legacy UI when feature flag is disabled', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      render(<SettingsWrapper />);
      expect(screen.getByText('Legacy Settings')).toBeInTheDocument();
    });
  });

  describe('Feature flag integration', () => {
    it('calls useModernUIPage with correct page identifier', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(true);

      render(<DashboardWrapper />);
      expect(useModernUIPage).toHaveBeenCalledWith('dashboard');

      jest.clearAllMocks();
      render(<MembersWrapper />);
      expect(useModernUIPage).toHaveBeenCalledWith('members');

      jest.clearAllMocks();
      render(<SmallGroupsWrapper />);
      expect(useModernUIPage).toHaveBeenCalledWith('small_groups');

      jest.clearAllMocks();
      render(<FinanceWrapper />);
      expect(useModernUIPage).toHaveBeenCalledWith('finance');
    });
  });

  describe('Legacy UI messaging', () => {
    it('displays consistent messaging across all wrappers', () => {
      const { useModernUIPage } = require('../../../hooks/useFeatureFlag');
      useModernUIPage.mockReturnValue(false);

      const wrappers = [
        { Component: DashboardWrapper, name: 'Dashboard' },
        { Component: MembersWrapper, name: 'Members' },
        { Component: EventsWrapper, name: 'Events' },
        { Component: FinanceWrapper, name: 'Finance' },
      ];

      wrappers.forEach(({ Component, name }) => {
        const { unmount } = render(<Component />);
        expect(screen.getByText(`Legacy ${name}`)).toBeInTheDocument();
        expect(screen.getByText(/Contact your administrator to enable the modern UI experience/)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
