import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Modal } from '../components/ui/modal';
import { useToast } from '../contexts/ToastContext';
import { 
  FileText, 
  Download, 
  Calendar,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  PieChart,
  BarChart3,
  UserPlus,
  MapPin,
  UsersRound,
  CalendarDays,
  Award,
  Info
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  lastGenerated?: string;
}

interface ReportCategory {
  title: string;
  icon: React.ReactNode;
  reports: Report[];
}

const Reports: React.FC = () => {
  const { showToast } = useToast();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [generating, setGenerating] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    dateRange: 'this_month',
    startDate: '',
    endDate: '',
    format: 'pdf',
    includeCharts: true
  });

  const reportCategories: ReportCategory[] = [
    {
      title: 'Financial Reports',
      icon: <DollarSign className="w-6 h-6" />,
      reports: [
        {
          id: 'income_statement',
          title: 'Income Statement',
          description: 'Summary of income and expenses over a period',
          icon: <DollarSign className="w-6 h-6" />,
          lastGenerated: '2024-01-15'
        },
        {
          id: 'balance_sheet',
          title: 'Balance Sheet',
          description: 'Financial position at a specific point in time',
          icon: <BarChart3 className="w-6 h-6" />,
          lastGenerated: '2024-01-10'
        },
        {
          id: 'budget_variance',
          title: 'Budget Variance Report',
          description: 'Compare actual vs budgeted amounts',
          icon: <TrendingUp className="w-6 h-6" />,
          lastGenerated: '2024-01-12'
        },
        {
          id: 'fund_balance',
          title: 'Fund Balance Report',
          description: 'Current balance of all funds',
          icon: <PieChart className="w-6 h-6" />,
          lastGenerated: '2024-01-14'
        },
        {
          id: 'offering_summary',
          title: 'Offering Summary',
          description: 'Detailed breakdown of offerings received',
          icon: <FileText className="w-6 h-6" />,
          lastGenerated: '2024-01-13'
        },
        {
          id: 'expense_report',
          title: 'Expense Report',
          description: 'Detailed listing of all expenses',
          icon: <FileText className="w-6 h-6" />,
          lastGenerated: '2024-01-11'
        }
      ]
    },
    {
      title: 'Membership Reports',
      icon: <Users className="w-6 h-6" />,
      reports: [
        {
          id: 'member_directory',
          title: 'Member Directory',
          description: 'Complete listing of all church members',
          icon: <Users className="w-6 h-6" />,
          lastGenerated: '2024-01-16'
        },
        {
          id: 'membership_growth',
          title: 'Membership Growth',
          description: 'Track membership growth over time',
          icon: <TrendingUp className="w-6 h-6" />,
          lastGenerated: '2024-01-14'
        },
        {
          id: 'demographics',
          title: 'Demographics Report',
          description: 'Member demographics by age, location, and more',
          icon: <MapPin className="w-6 h-6" />,
          lastGenerated: '2024-01-15'
        },
        {
          id: 'attendance',
          title: 'Attendance Report',
          description: 'Service and event attendance statistics',
          icon: <CalendarDays className="w-6 h-6" />,
          lastGenerated: '2024-01-13'
        },
        {
          id: 'new_members',
          title: 'New Members Report',
          description: 'Recently joined members and their information',
          icon: <UserPlus className="w-6 h-6" />,
          lastGenerated: '2024-01-12'
        }
      ]
    },
    {
      title: 'Ministry Reports',
      icon: <Activity className="w-6 h-6" />,
      reports: [
        {
          id: 'small_groups',
          title: 'Small Groups Report',
          description: 'Overview of all small groups and participation',
          icon: <UsersRound className="w-6 h-6" />,
          lastGenerated: '2024-01-14'
        },
        {
          id: 'event_attendance',
          title: 'Event Attendance',
          description: 'Attendance statistics for church events',
          icon: <CalendarDays className="w-6 h-6" />,
          lastGenerated: '2024-01-13'
        },
        {
          id: 'leadership',
          title: 'Leadership Report',
          description: 'Leadership structure and responsibilities',
          icon: <Award className="w-6 h-6" />,
          lastGenerated: '2024-01-11'
        },
        {
          id: 'ministry_participation',
          title: 'Ministry Participation',
          description: 'Member involvement in various ministries',
          icon: <Activity className="w-6 h-6" />,
          lastGenerated: '2024-01-10'
        }
      ]
    }
  ];

  const handleGenerateReport = (report: Report) => {
    setSelectedReport(report);
    setShowGenerateModal(true);
  };

  // Map frontend report IDs to backend report types
  // This mapping is required because some backend types don't follow simple snake_case to kebab-case conversion
  const reportTypeMap: Record<string, string> = {
    'income_statement': 'income-statement',
    'balance_sheet': 'financial-summary',      // Special mapping: balance_sheet -> financial-summary
    'budget_variance': 'budget-variance',
    'fund_balance': 'fund-balance',
    'offering_summary': 'donor-giving',        // Special mapping: offering_summary -> donor-giving
    'expense_report': 'expense-report'
  };

  // Helper function to get file extension based on format
  const getFileExtension = (format: string): string => {
    switch (format) {
      case 'pdf':
        return '.pdf';
      case 'excel':
        return '.xlsx';
      case 'csv':
        return '.csv';
      default:
        return '.pdf';
    }
  };

  // Helper function to get MIME type based on format
  const getMimeType = (format: string): string => {
    switch (format) {
      case 'pdf':
        return 'application/pdf';
      case 'excel':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'csv':
        return 'text/csv';
      default:
        return 'application/pdf';
    }
  };

  // Helper function to calculate date range based on preset
  const calculateDateRange = (dateRange: string): { startDate: string; endDate: string } => {
    const now = new Date();
    let start: Date;
    let end: Date = now;

    switch (dateRange) {
      case 'this_month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last_month':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'this_quarter':
        const currentQuarter = Math.floor(now.getMonth() / 3);
        start = new Date(now.getFullYear(), currentQuarter * 3, 1);
        break;
      case 'last_quarter':
        const lastQuarter = Math.floor(now.getMonth() / 3) - 1;
        const lastQuarterYear = lastQuarter < 0 ? now.getFullYear() - 1 : now.getFullYear();
        const lastQuarterMonth = lastQuarter < 0 ? 9 : lastQuarter * 3;
        start = new Date(lastQuarterYear, lastQuarterMonth, 1);
        end = new Date(lastQuarterYear, lastQuarterMonth + 3, 0);
        break;
      case 'this_year':
        start = new Date(now.getFullYear(), 0, 1);
        break;
      case 'last_year':
        start = new Date(now.getFullYear() - 1, 0, 1);
        end = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        start = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  };

  // Reusable helper function to download report files
  const downloadFileReport = async (
    reportType: string,
    startDate: string,
    endDate: string,
    format: string,
    reportTitle: string
  ): Promise<void> => {
    // Special handling for member_directory - use members export endpoint
    if (reportType === 'member_directory') {
      const url = `/api/members/export`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to export members (${response.status})`);
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('Received empty file. Please try again.');
      }

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Member_Directory_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      return;
    }
    
    // Map frontend report ID to backend report type
    const backendReportType = reportTypeMap[reportType];
    
    // Validate that the report type is supported
    if (!backendReportType) {
      throw new Error(`Unsupported report type: ${reportType}`);
    }
    
    // Build API URL with query parameters
    const url = `/api/reports/${backendReportType}?start_date=${startDate}&end_date=${endDate}&format=${format}`;
    
    // Make API call with proper headers for blob response
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': getMimeType(format),
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    // Check if response is OK
    if (!response.ok) {
      // Map HTTP status codes to user-friendly error messages (Requirements 6.1, 6.2, 6.3)
      if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication error. Please log in again.');
      }
      
      if (response.status === 404) {
        throw new Error('Report not found. Please check your date range.');
      }
      
      if (response.status === 500 || response.status === 502 || response.status === 503) {
        throw new Error('Server error. Please try again later.');
      }
      
      // Try to parse error message from JSON response for other errors
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate report. Please try again.');
      } catch {
        throw new Error('Failed to generate report. Please try again.');
      }
    }

    // Validate Content-Type header
    const contentType = response.headers.get('content-type');
    
    // Special validation for PDF format as per requirements 5.1, 5.3
    if (format === 'pdf') {
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error(
          `Invalid response type. Expected PDF but received ${contentType || 'unknown type'}.`
        );
      }
    } else {
      // Generic validation for other formats
      const expectedMimeType = getMimeType(format);
      if (!contentType || !contentType.includes(expectedMimeType.split('/')[1])) {
        throw new Error(`Invalid response type. Expected ${format.toUpperCase()} but received ${contentType}.`);
      }
    }

    // Extract blob from response
    const blob = await response.blob();

    // Validate blob size
    if (blob.size === 0) {
      throw new Error('Received empty file. Please try again.');
    }

    // Validate blob type property when available (Requirement 5.5)
    if (blob.type && format === 'pdf' && !blob.type.includes('application/pdf')) {
      throw new Error('Invalid file type received. Expected PDF.');
    }

    // Create download URL
    const blobUrl = URL.createObjectURL(blob);

    // Create temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${reportTitle.replace(/\s+/g, '_')}_${startDate}_to_${endDate}${getFileExtension(format)}`;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handleViewLast = async (report: Report) => {
    try {
      setGenerating(true);
      
      // Calculate default date range (this month)
      const { startDate, endDate } = calculateDateRange('this_month');
      
      // Download the report using the same logic as generate
      await downloadFileReport(
        report.id,
        startDate,
        endDate,
        'pdf', // Default to PDF for View Last
        report.title
      );
      
      // Don't show success toast - browser will handle download notification
    } catch (error) {
      console.error('Error downloading report:', error);
      
      // Handle network errors (Requirement 6.4)
      if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch'))) {
        showToast('error', 'Network error. Please check your connection and try again.');
        return;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to download report. Please try again.';
      showToast('error', errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  const handleSchedule = (report: Report) => {
    showToast('info', `Scheduling ${report.title}...`);
    // In a real implementation, this would open a scheduling modal
  };

  const handleSubmitGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReport) {
      showToast('error', 'No report selected.');
      return;
    }

    try {
      setGenerating(true);
      
      // Calculate date range based on selection
      let startDate: string;
      let endDate: string;
      
      if (reportConfig.dateRange === 'custom') {
        startDate = reportConfig.startDate;
        endDate = reportConfig.endDate;
      } else {
        const dateRange = calculateDateRange(reportConfig.dateRange);
        startDate = dateRange.startDate;
        endDate = dateRange.endDate;
      }

      // Download the report
      await downloadFileReport(
        selectedReport.id,
        startDate,
        endDate,
        reportConfig.format,
        selectedReport.title
      );
      
      // Don't show success toast - browser will handle download notification
      setShowGenerateModal(false);
    } catch (error) {
      console.error('Error generating report:', error);
      
      // Handle network errors (Requirement 6.4)
      if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch'))) {
        showToast('error', 'Network error. Please check your connection and try again.');
        return;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate report. Please try again.';
      showToast('error', errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Reports</h1>
        <p className="text-sm text-neutral-600 mt-1">Generate and view church reports</p>
      </div>

      {/* Report Categories */}
      {reportCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          {/* Category Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
              {category.icon}
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">{category.title}</h2>
          </div>

          {/* Report Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Report Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
                    {report.icon}
                  </div>
                </div>

                {/* Report Info */}
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {report.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  {report.description}
                </p>

                {/* Last Generated */}
                {report.lastGenerated && (
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
                    <Calendar className="w-3 h-3" />
                    <span>Last generated: {formatDate(report.lastGenerated)}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => handleGenerateReport(report)}
                  >
                    Generate
                  </Button>
                  <div className="flex gap-2">
                    {report.lastGenerated && (
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        icon={<Download className="w-4 h-4" />}
                        onClick={() => handleViewLast(report)}
                      >
                        View Last
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      icon={<Calendar className="w-4 h-4" />}
                      onClick={() => handleSchedule(report)}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Generate Report Modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        title={`Generate ${selectedReport?.title}`}
        size="md"
      >
        <form onSubmit={handleSubmitGenerate}>
          <div className="space-y-4">
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-neutral-700 mb-1">
                Date Range <span className="text-error-500">*</span>
              </label>
              <select
                id="dateRange"
                value={reportConfig.dateRange}
                onChange={(e) => setReportConfig({ ...reportConfig, dateRange: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
                <option value="this_quarter">This Quarter</option>
                <option value="last_quarter">Last Quarter</option>
                <option value="this_year">This Year</option>
                <option value="last_year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {reportConfig.dateRange === 'custom' && (
              <>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
                    Start Date <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={reportConfig.startDate}
                    onChange={(e) => setReportConfig({ ...reportConfig, startDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
                    End Date <span className="text-error-500">*</span>
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    value={reportConfig.endDate}
                    onChange={(e) => setReportConfig({ ...reportConfig, endDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="exportFormat" className="block text-sm font-medium text-neutral-700 mb-1">
                Export Format <span className="text-error-500">*</span>
              </label>
              <select
                id="exportFormat"
                value={reportConfig.format}
                onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeCharts"
                checked={reportConfig.includeCharts}
                onChange={(e) => setReportConfig({ ...reportConfig, includeCharts: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="includeCharts" className="text-sm font-medium text-neutral-700">
                Include Charts and Visualizations
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowGenerateModal(false)}
              disabled={generating}
            >
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="primary"
                icon={<FileText className="w-4 h-4" />}
                disabled={generating}
                loading={generating}
              >
                {generating ? 'Generating...' : 'Generate Report'}
              </Button>
              <div className="relative group">
                <Info 
                  className="w-5 h-5 text-neutral-500 hover:text-primary-600 cursor-help transition-colors" 
                  aria-label="Download location information"
                />
                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-neutral-900 text-white text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                  <div className="font-medium mb-1">Download Location</div>
                  <div>Reports are downloaded to your browser's default download folder.</div>
                  <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-neutral-900"></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Reports;
