import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import api from '../../lib/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { useIsMobile } from '../../hooks/useBreakpoint';

interface FinancialSummary {
  total_balance: number;
  monthly_offerings: number;
  monthly_expenses: number;
  budget_utilization: number;
  offerings_trend: number;
  expenses_trend: number;
}

interface Transaction {
  id: number;
  date: string;
  type: 'offering' | 'expense';
  category: string;
  amount: number;
  status: string;
}

const FinanceOverview: React.FC = () => {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch summary data
      const summaryResponse = await api.get('/finance/summary');
      setSummary(summaryResponse.data.data);

      // Fetch recent transactions
      const transactionsResponse = await api.get('/finance/transactions/recent');
      setTransactions(transactionsResponse.data.data);
    } catch (error) {
      console.error('Error fetching finance data:', error);
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

  // Format currency for mobile - shorter format
  const formatCurrencyMobile = (value: number) => {
    if (value >= 1000000) {
      return `₱${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₱${(value / 1000).toFixed(0)}K`;
    }
    return `₱${value}`;
  };

  // Mock data for charts (replace with real data from API)
  const incomeVsExpensesData = [
    { month: 'Jan', income: 120000, expenses: 85000 },
    { month: 'Feb', income: 135000, expenses: 92000 },
    { month: 'Mar', income: 142000, expenses: 88000 },
    { month: 'Apr', income: 138000, expenses: 95000 },
    { month: 'May', income: 155000, expenses: 89000 },
    { month: 'Jun', income: 160000, expenses: 93000 },
  ];

  const expenseBreakdownData = [
    { name: 'Utilities', value: 25000, color: '#0ea5e9' },
    { name: 'Salaries', value: 45000, color: '#10b981' },
    { name: 'Maintenance', value: 15000, color: '#f59e0b' },
    { name: 'Supplies', value: 8000, color: '#ef4444' },
    { name: 'Ministry', value: 12000, color: '#8b5cf6' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Balance</p>
              <p className="text-2xl font-bold text-neutral-900 mt-2">
                {formatCurrency(summary?.total_balance || 245680)}
              </p>
              {summary && summary.offerings_trend > 0 && (
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="w-4 h-4 text-success-600" />
                  <span className="text-sm text-success-600 font-medium">
                    {summary.offerings_trend}% vs last month
                  </span>
                </div>
              )}
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Wallet className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        {/* Monthly Offerings */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Monthly Offerings</p>
              <p className="text-2xl font-bold text-neutral-900 mt-2">
                {formatCurrency(summary?.monthly_offerings || 125450)}
              </p>
              {summary && summary.offerings_trend > 0 && (
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="w-4 h-4 text-success-600" />
                  <span className="text-sm text-success-600 font-medium">
                    {summary.offerings_trend}% vs last month
                  </span>
                </div>
              )}
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>

        {/* Monthly Expenses */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Monthly Expenses</p>
              <p className="text-2xl font-bold text-neutral-900 mt-2">
                {formatCurrency(summary?.monthly_expenses || 89320)}
              </p>
              {summary && summary.expenses_trend < 0 && (
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDown className="w-4 h-4 text-success-600" />
                  <span className="text-sm text-success-600 font-medium">
                    {Math.abs(summary.expenses_trend)}% vs last month
                  </span>
                </div>
              )}
            </div>
            <div className="p-3 bg-error-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-error-600" />
            </div>
          </div>
        </Card>

        {/* Budget Utilization */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-600">Budget Utilization</p>
              <p className="text-2xl font-bold text-neutral-900 mt-2">
                {summary?.budget_utilization || 68}%
              </p>
              <div className="mt-3">
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-warning-500 h-2 rounded-full transition-all"
                    style={{ width: `${summary?.budget_utilization || 68}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <PieChart className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <Card className="p-6">
          <h3 className={`font-semibold text-neutral-900 mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>
            Income vs Expenses
          </h3>
          <p className="text-sm text-neutral-600 mb-4">Last 6 months</p>
          <div className={isMobile ? 'overflow-x-auto' : ''}>
            <div style={{ minWidth: isMobile ? '400px' : '100%' }}>
              <ResponsiveContainer width="100%" height={isMobile ? 280 : 300}>
                <BarChart 
                  data={incomeVsExpensesData}
                  margin={isMobile 
                    ? { top: 5, right: 10, left: 10, bottom: 5 }
                    : { top: 5, right: 30, left: 20, bottom: 5 }
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#737373"
                    style={{ fontSize: isMobile ? '10px' : '12px' }}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? 'end' : 'middle'}
                    height={isMobile ? 60 : 30}
                  />
                  <YAxis 
                    stroke="#737373"
                    style={{ fontSize: isMobile ? '10px' : '12px' }}
                    tickFormatter={isMobile ? formatCurrencyMobile : undefined}
                    width={isMobile ? 50 : 60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      padding: isMobile ? '6px 10px' : '8px 12px',
                      fontSize: isMobile ? '10px' : '12px',
                    }}
                    formatter={(value: number | undefined) => 
                      value !== undefined ? formatCurrency(value) : 'N/A'
                    }
                  />
                  <Legend 
                    wrapperStyle={{ 
                      paddingTop: isMobile ? '10px' : '20px',
                      fontSize: isMobile ? '10px' : '12px',
                    }}
                    iconSize={isMobile ? 8 : 14}
                  />
                  <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Expense Breakdown Chart */}
        <Card className="p-6">
          <h3 className={`font-semibold text-neutral-900 mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>
            Expense Breakdown
          </h3>
          <p className="text-sm text-neutral-600 mb-4">This month</p>
          <ResponsiveContainer width="100%" height={isMobile ? 280 : 300}>
            <RechartsPieChart>
              <Pie
                data={expenseBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={!isMobile ? ({ name, percent }) => 
                  `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                : false}
                outerRadius={isMobile ? 80 : 100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  padding: isMobile ? '6px 10px' : '8px 12px',
                  fontSize: isMobile ? '10px' : '12px',
                }}
                formatter={(value: number | undefined) => 
                  value !== undefined ? formatCurrency(value) : 'N/A'
                }
              />
              <Legend
                verticalAlign="bottom"
                height={isMobile ? 50 : 36}
                iconType="circle"
                iconSize={isMobile ? 8 : 10}
                wrapperStyle={{
                  fontSize: isMobile ? '10px' : '12px',
                }}
                // Simplify legend on mobile - truncate long labels
                formatter={(value) => {
                  if (isMobile && value.length > 8) {
                    return value.substring(0, 8) + '...';
                  }
                  return value;
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Recent Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {transactions.length > 0 ? (
                transactions.slice(0, 10).map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'offering'
                            ? 'bg-success-100 text-success-800'
                            : 'bg-error-100 text-error-800'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed'
                            ? 'bg-success-100 text-success-800'
                            : transaction.status === 'pending'
                            ? 'bg-warning-100 text-warning-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-neutral-500">
                    No recent transactions
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default FinanceOverview;
