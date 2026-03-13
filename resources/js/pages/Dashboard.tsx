import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, Coins, Calendar, TrendingUp, RefreshCw, AlertCircle, Download, UsersRound, PieChart } from 'lucide-react';
import { AttendanceChart, ActivityFeed, UpcomingEvents } from '../components/dashboard';
import { StatCard } from '../components/dashboard/StatCard';
import { FinanceCard } from '../components/dashboard/FinanceCard';
import { useDashboardData } from '../hooks/useDashboardData';

const Dashboard: React.FC = () => {
  const { stats, attendance, activities, upcomingEvents, loading, error, refetch } = useDashboardData(10);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  };

  // Loading state
  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64" role="status" aria-live="polite">
        <div className="flex items-center space-x-2 text-neutral-600">
          <RefreshCw className="h-5 w-5 animate-spin" aria-hidden="true" />
          <span>Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !stats) {
    return (
      <div className="flex items-center justify-center h-64" role="alert" aria-live="assertive">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-12 w-12 text-error-500" aria-hidden="true" />
          <div className="text-center">
            <p className="text-lg font-semibold text-neutral-900">Failed to load dashboard</p>
            <p className="text-sm text-neutral-600">{error}</p>
            <Button onClick={refetch} variant="primary" className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-1">Overview of church activities and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={refetch}
            disabled={loading}
            variant="outline"
            size="md"
            icon={<RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />}
            iconPosition="left"
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={<Download className="h-4 w-4" />}
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards - 4 columns on desktop, responsive */}
      <section aria-labelledby="quick-stats-heading">
        <h2 id="quick-stats-heading" className="sr-only">Quick Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Members */}
        <StatCard
          title="Total Members"
          value={stats?.total_members ?? 0}
          icon={Users}
          color="primary"
          trend={
            stats?.member_trend
              ? {
                  value: stats.member_trend,
                  direction: stats.member_trend >= 0 ? 'up' : 'down',
                  label: 'vs last month',
                }
              : undefined
          }
          description={!stats?.member_trend ? 'Active church members' : undefined}
        />

        {/* Upcoming Events */}
        <StatCard
          title="Upcoming Events"
          value={stats?.upcoming_events ?? 0}
          icon={Calendar}
          color="info"
          description="Scheduled events"
        />

        {/* New Visitors */}
        <StatCard
          title="New Visitors"
          value={stats?.new_visitors ?? 0}
          icon={TrendingUp}
          color="success"
          trend={
            stats?.visitor_trend
              ? {
                  value: stats.visitor_trend,
                  direction: stats.visitor_trend >= 0 ? 'up' : 'down',
                  label: 'this month',
                }
              : undefined
          }
          description={!stats?.visitor_trend ? 'This month' : undefined}
        />

        {/* Active Groups */}
        <StatCard
          title="Active Groups"
          value={stats?.active_groups ?? 0}
          icon={UsersRound}
          color="primary"
          description="Small groups"
        />
      </div>
      </section>

      {/* Finance Overview - 4 columns with enhanced cards */}
      <section aria-labelledby="finance-overview-heading">
        <h2 id="finance-overview-heading" className="text-xl font-semibold text-neutral-900 mb-4">Finance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Offerings */}
          <FinanceCard
            title="Total Offerings"
            value={stats ? formatCurrency(stats.total_offerings) : '₱0.00'}
            icon={Coins}
            description="This month's offerings"
            color="success"
            trend={
              stats?.offerings_trend !== undefined
                ? {
                    value: stats.offerings_trend,
                    direction: stats.offerings_trend >= 0 ? 'up' : 'down',
                    label: 'vs last month',
                  }
                : undefined
            }
          />

          {/* Total Expenses */}
          <FinanceCard
            title="Total Expenses"
            value={stats ? formatCurrency(stats.total_expenses) : '₱0.00'}
            icon={Coins}
            description="Approved expenses this month"
            color="error"
            trend={
              stats?.expenses_trend !== undefined
                ? {
                    value: stats.expenses_trend,
                    direction: stats.expenses_trend >= 0 ? 'up' : 'down',
                    label: 'vs last month',
                  }
                : undefined
            }
          />

          {/* Net Income */}
          <FinanceCard
            title="Net Income"
            value={stats ? formatCurrency(stats.net_income) : '₱0.00'}
            icon={TrendingUp}
            description="Offerings minus expenses"
            color={stats && stats.net_income >= 0 ? 'success' : 'error'}
            trend={
              stats?.net_income_trend !== undefined
                ? {
                    value: stats.net_income_trend,
                    direction: stats.net_income_trend >= 0 ? 'up' : 'down',
                    label: 'vs last month',
                  }
                : undefined
            }
          />

          {/* Budget Utilization */}
          <FinanceCard
            title="Budget Utilization"
            value={stats?.budget_utilization !== undefined ? `${stats.budget_utilization}%` : '0%'}
            icon={PieChart}
            description={stats?.total_budget ? `of ${formatCurrency(stats.total_budget)} budget` : 'No budget set'}
            color={
              stats?.budget_utilization !== undefined
                ? stats.budget_utilization < 70
                  ? 'success'
                  : stats.budget_utilization < 90
                  ? 'warning'
                  : 'error'
                : 'primary'
            }
            progress={
              stats?.budget_utilization !== undefined
                ? {
                    value: stats.budget_utilization,
                    label: 'Budget used',
                  }
                : undefined
            }
          />
        </div>
      </section>

      {/* Attendance Chart Section */}
      <section aria-labelledby="attendance-chart-heading">
        <Card variant="default">
        <CardHeader>
          <CardTitle id="attendance-chart-heading" className="text-lg font-semibold text-neutral-900">Attendance Trends</CardTitle>
          <CardDescription className="text-neutral-600">Monthly attendance over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceChart data={attendance} loading={loading} />
        </CardContent>
      </Card>
      </section>

      {/* Recent Activity Feed Section */}
      <section aria-labelledby="recent-activities-heading">
        <Card variant="default">
        <CardHeader>
          <CardTitle id="recent-activities-heading" className="text-lg font-semibold text-neutral-900">Recent Activities</CardTitle>
          <CardDescription className="text-neutral-600">Latest system events and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityFeed activities={activities} loading={loading} />
        </CardContent>
      </Card>
      </section>

      {/* Upcoming Events Section */}
      <section aria-labelledby="upcoming-events-heading">
        <Card variant="default">
        <CardHeader>
          <CardTitle id="upcoming-events-heading" className="text-lg font-semibold text-neutral-900">Upcoming Events</CardTitle>
          <CardDescription className="text-neutral-600">Next 5 scheduled events</CardDescription>
        </CardHeader>
        <CardContent>
          <UpcomingEvents events={upcomingEvents} loading={loading} />
        </CardContent>
      </Card>
      </section>
    </div>
  );
};

export default Dashboard;
