import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Filter,
  RefreshCw,
  TrendingUp,
  Users,
  FileText,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Select } from '../ui/select';
import { Badge } from '../ui/badge';
import {
  analyzeFeedback,
  prioritizeFeedback,
  exportToMarkdown,
  exportToJSON,
} from '../../scripts/analyze-beta-feedback';

interface BetaFeedback {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  type: 'bug' | 'feature_request' | 'general';
  severity: 'critical' | 'high' | 'medium' | 'low';
  page: string;
  description: string;
  steps_to_reproduce?: string;
  expected_behavior?: string;
  actual_behavior?: string;
  browser_info?: string;
  status: 'new' | 'in_progress' | 'resolved' | 'wont_fix';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export function FeedbackAnalysisDashboard() {
  const [feedbackData, setFeedbackData] = useState<BetaFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'all',
    severity: 'all',
    status: 'all',
    page: 'all',
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/beta-feedback', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setFeedbackData(data.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = feedbackData.filter((item) => {
    if (filter.type !== 'all' && item.type !== filter.type) return false;
    if (filter.severity !== 'all' && item.severity !== filter.severity) return false;
    if (filter.status !== 'all' && item.status !== filter.status) return false;
    if (filter.page !== 'all' && item.page !== filter.page) return false;
    return true;
  });

  const analysis = analyzeFeedback(filteredData);
  const prioritizedFeedback = prioritizeFeedback(filteredData);

  const handleExportMarkdown = () => {
    const markdown = exportToMarkdown(analysis);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beta-feedback-analysis-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const json = exportToJSON(analysis);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beta-feedback-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const severityColors = {
    critical: '#ef4444',
    high: '#f59e0b',
    medium: '#3b82f6',
    low: '#10b981',
  };

  const statusColors = {
    new: '#3b82f6',
    in_progress: '#f59e0b',
    resolved: '#10b981',
    wont_fix: '#6b7280',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Beta Feedback Analysis
          </h1>
          <p className="text-neutral-600 mt-1">
            Analyze and prioritize user feedback from beta testing
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchFeedback} icon={<RefreshCw />}>
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportJSON} icon={<Download />}>
            Export JSON
          </Button>
          <Button variant="primary" onClick={handleExportMarkdown} icon={<FileText />}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-neutral-500" />
          <Select
            value={filter.type}
            onChange={(value) => setFilter({ ...filter, type: Array.isArray(value) ? value[0] : value })}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'bug', label: 'Bugs' },
              { value: 'feature_request', label: 'Feature Requests' },
              { value: 'general', label: 'General' },
            ]}
          />
          <Select
            value={filter.severity}
            onChange={(value) => setFilter({ ...filter, severity: Array.isArray(value) ? value[0] : value })}
            options={[
              { value: 'all', label: 'All Severities' },
              { value: 'critical', label: 'Critical' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />
          <Select
            value={filter.status}
            onChange={(value) => setFilter({ ...filter, status: Array.isArray(value) ? value[0] : value })}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'new', label: 'New' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'wont_fix', label: "Won't Fix" },
            ]}
          />
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Feedback</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {analysis.summary.total}
              </p>
            </div>
            <FileText className="w-10 h-10 text-primary-600" />
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Beta Users</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {analysis.userEngagement.totalUsers}
              </p>
            </div>
            <Users className="w-10 h-10 text-success-600" />
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Critical Issues</p>
              <p className="text-3xl font-bold text-error-600 mt-1">
                {analysis.criticalIssues.length}
              </p>
            </div>
            <AlertTriangle className="w-10 h-10 text-error-600" />
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">High Priority</p>
              <p className="text-3xl font-bold text-warning-600 mt-1">
                {analysis.highPriorityIssues.length}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-warning-600" />
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <Card padding="md">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Recommendations
          </h2>
          <div className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-info-50 border border-info-200 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-info-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-info-900">{rec}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback by Severity */}
        <Card padding="md">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Feedback by Severity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(analysis.summary.bySeverity).map(
                  ([severity, count]) => ({
                    name: severity,
                    value: count,
                  })
                )}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.keys(analysis.summary.bySeverity).map((severity) => (
                  <Cell
                    key={severity}
                    fill={severityColors[severity as keyof typeof severityColors]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Feedback by Status */}
        <Card padding="md">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Feedback by Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={Object.entries(analysis.summary.byStatus).map(
                ([status, count]) => ({
                  status,
                  count,
                })
              )}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Common Patterns */}
      {analysis.commonPatterns.length > 0 && (
        <Card padding="md">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Common Patterns
          </h2>
          <div className="space-y-3">
            {analysis.commonPatterns.map((pattern, index) => (
              <div
                key={index}
                className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-900">
                    "{pattern.pattern}"
                  </h3>
                  <Badge variant="primary">{pattern.count} occurrences</Badge>
                </div>
                <div className="space-y-1">
                  {pattern.examples.map((example) => (
                    <p key={example.id} className="text-sm text-neutral-600">
                      • {example.page}: {example.description.substring(0, 100)}...
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Page Issues */}
      {analysis.pageIssues.length > 0 && (
        <Card padding="md">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Issues by Page
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase">
                    Total Issues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase">
                    Critical
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase">
                    High
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {analysis.pageIssues.map((page, index) => (
                  <tr key={index} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      {page.page}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      {page.issueCount}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {page.criticalCount > 0 ? (
                        <Badge variant="danger">{page.criticalCount}</Badge>
                      ) : (
                        <span className="text-neutral-400">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {page.highCount > 0 ? (
                        <Badge variant="warning">{page.highCount}</Badge>
                      ) : (
                        <span className="text-neutral-400">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Top Priority Issues */}
      <Card padding="md">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">
          Top Priority Issues
        </h2>
        <div className="space-y-3">
          {prioritizedFeedback.slice(0, 10).map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      feedback.severity === 'critical'
                        ? 'danger'
                        : feedback.severity === 'high'
                        ? 'warning'
                        : 'primary'
                    }
                  >
                    {feedback.severity}
                  </Badge>
                  <Badge variant="neutral">{feedback.type}</Badge>
                  <span className="text-sm text-neutral-600">{feedback.page}</span>
                </div>
                <Badge
                  variant={
                    feedback.status === 'resolved'
                      ? 'success'
                      : feedback.status === 'in_progress'
                      ? 'warning'
                      : 'neutral'
                  }
                >
                  {feedback.status}
                </Badge>
              </div>
              <p className="text-sm text-neutral-900 mb-2">
                {feedback.description}
              </p>
              <p className="text-xs text-neutral-500">
                Reported by {feedback.user_name} on{' '}
                {new Date(feedback.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* User Engagement */}
      <Card padding="md">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">
          Most Active Beta Testers
        </h2>
        <div className="space-y-2">
          {analysis.userEngagement.mostActiveUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-neutral-900">{user.name}</p>
                <p className="text-sm text-neutral-600">{user.email}</p>
              </div>
              <Badge variant="primary">{user.count} feedback items</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
