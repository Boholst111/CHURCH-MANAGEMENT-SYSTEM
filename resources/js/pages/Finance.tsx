import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { Card } from '../components/ui/card';

interface FinancialSummary {
  total_giving: number;
  total_transactions: number;
  average_transaction: number;
  unique_givers: number;
  by_payment_method: Record<string, { count: number; total: number }>;
}

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchSummary();
  }, [dateRange]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await api.get('/finance/summary', {
        params: dateRange
      });
      setSummary(response.data.data);
    } catch (error) {
      console.error('Error fetching financial summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Finance Management</h1>
        <div className="flex gap-2">
          <input
            type="date"
            value={dateRange.start_date}
            onChange={(e) => setDateRange({ ...dateRange, start_date: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <span className="self-center">to</span>
          <input
            type="date"
            value={dateRange.end_date}
            onChange={(e) => setDateRange({ ...dateRange, end_date: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'offerings', 'expenses', 'budgets', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading financial data...</p>
            </div>
          ) : summary ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Giving</h3>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(summary.total_giving)}</p>
                <p className="text-sm text-gray-500 mt-2">{summary.total_transactions} transactions</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Average Transaction</h3>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(summary.average_transaction)}</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Unique Givers</h3>
                <p className="text-3xl font-bold text-purple-600">{summary.unique_givers}</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Transactions</h3>
                <p className="text-3xl font-bold text-indigo-600">{summary.total_transactions}</p>
              </Card>

              <Card className="p-6 md:col-span-2 lg:col-span-4">
                <h3 className="text-lg font-semibold mb-4">Payment Method Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(summary.by_payment_method || {}).map(([method, data]) => (
                    <div key={method} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500 capitalize mb-2">{method}</h4>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.total)}</p>
                      <p className="text-sm text-gray-500 mt-1">{data.count} transactions</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No financial data available for the selected period.
            </div>
          )}
        </div>
      )}

      {/* Other Tabs - Placeholder */}
      {activeTab !== 'overview' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 capitalize">{activeTab}</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              {activeTab === 'offerings' && 'Detailed offerings management interface. Track tithes, special offerings, missions, building fund, and other contributions.'}
              {activeTab === 'expenses' && 'Comprehensive expense tracking system. Record and categorize all church expenses including utilities, salaries, maintenance, and missions.'}
              {activeTab === 'budgets' && 'Budget planning and monitoring tools. Create budgets for different categories and track spending against allocations.'}
              {activeTab === 'reports' && 'Financial reporting and analytics. Generate detailed financial statements, donor reports, and tax documents.'}
            </p>
            
            {activeTab === 'offerings' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Available Features:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  <li>Record tithes and offerings</li>
                  <li>Track different offering types</li>
                  <li>Filter by date, member, and payment method</li>
                  <li>View giving history</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'expenses' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-900 mb-2">Coming Soon:</h3>
                <ul className="list-disc list-inside text-amber-800 space-y-1">
                  <li>Expense recording and categorization</li>
                  <li>Vendor management</li>
                  <li>Receipt attachment</li>
                  <li>Expense approval workflow</li>
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Finance;
