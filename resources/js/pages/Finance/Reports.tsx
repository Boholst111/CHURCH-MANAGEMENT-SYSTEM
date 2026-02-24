import React, { useState } from 'react';
import api from '../../lib/api';
import { Card } from '../../components/ui/card';
import { Download, FileText, TrendingUp, PieChart, BarChart3, Calendar } from 'lucide-react';

const Reports: React.FC = () => {
  const [generating, setGenerating] = useState(false);
  const [statistics, setStatistics] = useState({
    total_income: 0,
    total_expenses: 0,
    net_position: 0,
    fund_balance: 0
  });
  const [dateRange, setDateRange] = useState({
    start_date: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });

  // Fetch statistics when date range changes
  React.useEffect(() => {
    fetchStatistics();
  }, [dateRange]);

  const fetchStatistics = async () => {
    try {
      const response = await api.get('/reports/quick-statistics', {
        params: dateRange
      });
      if (response.data.success) {
        setStatistics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const generateReport = async (reportType: string) => {
    try {
      setGenerating(true);
      const response = await api.get(`/reports/${reportType}`, {
        params: dateRange,
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}-report-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const reports = [
    {
      id: 'financial-summary',
      title: 'Financial Summary Report',
      description: 'Comprehensive overview of all financial activities including income, expenses, and net position.',
      icon: <FileText size={24} className="text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'income-statement',
      title: 'Income Statement',
      description: 'Detailed breakdown of all income sources including offerings, tithes, and other revenue.',
      icon: <TrendingUp size={24} className="text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'expense-report',
      title: 'Expense Report',
      description: 'Complete listing of all expenses categorized by type, vendor, and fund allocation.',
      icon: <BarChart3 size={24} className="text-red-600" />,
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 'budget-variance',
      title: 'Budget Variance Report',
      description: 'Analysis of budgeted vs actual spending across all categories with variance calculations.',
      icon: <PieChart size={24} className="text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'donor-giving',
      title: 'Donor Giving Report',
      description: 'Individual donor contribution history for tax purposes and donor management.',
      icon: <Calendar size={24} className="text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 'fund-balance',
      title: 'Fund Balance Report',
      description: 'Current balances and transaction history for all restricted and unrestricted funds.',
      icon: <FileText size={24} className="text-amber-600" />,
      color: 'bg-amber-50 border-amber-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Reports</h2>
        <p className="text-gray-600">Generate comprehensive financial reports for analysis and compliance.</p>
      </div>

      {/* Date Range Selector */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Report Period</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start_date}
              onChange={(e) => setDateRange({ ...dateRange, start_date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end_date}
              onChange={(e) => setDateRange({ ...dateRange, end_date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 self-end">
            <button
              onClick={() => {
                const now = new Date();
                setDateRange({
                  start_date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0],
                  end_date: now.toISOString().split('T')[0]
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              This Month
            </button>
            <button
              onClick={() => {
                const now = new Date();
                setDateRange({
                  start_date: new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0],
                  end_date: now.toISOString().split('T')[0]
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              This Year
            </button>
          </div>
        </div>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className={`p-6 border-2 ${report.color} hover:shadow-lg transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-white">
                {report.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <button
              onClick={() => generateReport(report.id)}
              disabled={generating}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} />
              {generating ? 'Generating...' : 'Generate Report'}
            </button>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 font-medium mb-1">Total Income</p>
            <p className="text-2xl font-bold text-blue-900">{formatCurrency(statistics.total_income)}</p>
            <p className="text-xs text-blue-600 mt-1">For selected period</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600 font-medium mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-red-900">{formatCurrency(statistics.total_expenses)}</p>
            <p className="text-xs text-red-600 mt-1">For selected period</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 font-medium mb-1">Net Position</p>
            <p className={`text-2xl font-bold ${statistics.net_position >= 0 ? 'text-green-900' : 'text-red-900'}`}>
              {formatCurrency(statistics.net_position)}
            </p>
            <p className="text-xs text-green-600 mt-1">Income - Expenses</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600 font-medium mb-1">Fund Balance</p>
            <p className="text-2xl font-bold text-purple-900">{formatCurrency(statistics.fund_balance)}</p>
            <p className="text-xs text-purple-600 mt-1">All funds combined</p>
          </div>
        </div>
      </Card>

      {/* Report Information */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Report Information</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>All reports are generated in PDF format for easy sharing and printing.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Reports include detailed transaction listings and summary statistics.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>Donor giving reports are suitable for tax documentation purposes.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>All financial data is accurate as of the report generation time.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Reports;
