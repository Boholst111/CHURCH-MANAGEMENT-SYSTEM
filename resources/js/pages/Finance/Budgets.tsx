import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Card } from '../../components/ui/card';
import { Plus, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface Budget {
  id: number;
  name: string;
  period_type: 'monthly' | 'quarterly' | 'annually';
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

interface BudgetItem {
  id: number;
  budget_id: number;
  expense_category_id: number;
  category_name: string;
  budgeted_amount: number;
  actual_amount: number;
  variance: number;
  variance_percentage: number;
}

interface ExpenseCategory {
  id: number;
  name: string;
}

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
    items: [] as { expense_category_id: string; budgeted_amount: string }[]
  });

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedBudget) {
      fetchBudgetItems(selectedBudget.id);
    }
  }, [selectedBudget]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/budgets');
      const budgetList = response.data.data || [];
      setBudgets(budgetList);
      if (budgetList.length > 0 && !selectedBudget) {
        setSelectedBudget(budgetList[0]);
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgetItems = async (budgetId: number) => {
    try {
      const response = await api.get(`/budgets/${budgetId}/items`);
      setBudgetItems(response.data.data || []);
    } catch (error) {
      console.error('Error fetching budget items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/expense-categories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post('/budgets', {
        name: formData.name,
        start_date: formData.start_date,
        end_date: formData.end_date,
        items: formData.items.map(item => ({
          expense_category_id: parseInt(item.expense_category_id),
          budgeted_amount: parseFloat(item.budgeted_amount)
        }))
      });
      setShowAddModal(false);
      setFormData({
        name: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
        items: []
      });
      fetchBudgets();
      alert('Budget created successfully!');
    } catch (error) {
      console.error('Error creating budget:', error);
      alert('Failed to create budget. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const addBudgetItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { expense_category_id: '', budgeted_amount: '' }]
    });
  };

  const removeBudgetItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const updateBudgetItem = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-green-600';
    if (variance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return <TrendingUp size={16} className="inline" />;
    if (variance < 0) return <TrendingDown size={16} className="inline" />;
    return null;
  };



  const totalBudgeted = budgetItems.reduce((sum, item) => sum + item.budgeted_amount, 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + item.actual_amount, 0);
  const totalVariance = totalBudgeted - totalActual;
  const utilizationPercentage = totalBudgeted > 0 ? (totalActual / totalBudgeted) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Budgets</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Create Budget
        </button>
      </div>

      {/* Budget Selector */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Select Budget:</label>
          <select
            value={selectedBudget?.id || ''}
            onChange={(e) => {
              const budget = budgets.find(b => b.id === parseInt(e.target.value));
              setSelectedBudget(budget || null);
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {budgets.map(budget => (
              <option key={budget.id} value={budget.id}>
                {budget.name} ({budget.period_type}) - {budget.is_active ? 'Active' : 'Inactive'}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {loading ? (
        <div className="p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading budget data...</p>
        </div>
      ) : selectedBudget ? (
        <>
          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Budgeted</h3>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalBudgeted)}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Actual</h3>
              <p className="text-3xl font-bold text-purple-600">{formatCurrency(totalActual)}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Variance</h3>
              <p className={`text-3xl font-bold ${getVarianceColor(totalVariance)}`}>
                {formatCurrency(Math.abs(totalVariance))}
                {getVarianceIcon(totalVariance)}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Utilization</h3>
              <p className="text-3xl font-bold text-indigo-600">{utilizationPercentage.toFixed(1)}%</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${utilizationPercentage > 100 ? 'bg-red-600' : 'bg-green-600'}`}
                  style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
                ></div>
              </div>
            </Card>
          </div>

          {/* Budget Items Table */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Budget Items</h3>
              {budgetItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No budget items found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Budgeted</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {budgetItems.map((item) => {
                        const isOverBudget = item.actual_amount > item.budgeted_amount;
                        const utilizationPct = item.budgeted_amount > 0 
                          ? (item.actual_amount / item.budgeted_amount) * 100 
                          : 0;

                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.category_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                              {formatCurrency(item.budgeted_amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                              {formatCurrency(item.actual_amount)}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${getVarianceColor(item.variance)}`}>
                              {formatCurrency(Math.abs(item.variance))}
                              {getVarianceIcon(item.variance)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                              {utilizationPct.toFixed(1)}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              {isOverBudget && (
                                <span className="inline-flex items-center gap-1 text-red-600">
                                  <AlertCircle size={16} />
                                  <span className="text-xs">Over Budget</span>
                                </span>
                              )}
                              {!isOverBudget && utilizationPct > 90 && (
                                <span className="inline-flex items-center gap-1 text-yellow-600">
                                  <AlertCircle size={16} />
                                  <span className="text-xs">Near Limit</span>
                                </span>
                              )}
                              {!isOverBudget && utilizationPct <= 90 && (
                                <span className="text-green-600 text-xs">On Track</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-12 text-center text-gray-500">
          <p>No budgets available. Create your first budget to get started.</p>
        </Card>
      )}

      {/* Add Budget Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Create Budget</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Annual Budget 2025"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Budget Items <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={addBudgetItem}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      + Add Item
                    </button>
                  </div>

                  {formData.items.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-lg">
                      No budget items added. Click "Add Item" to start.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {formData.items.map((item, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <select
                            value={item.expense_category_id}
                            onChange={(e) => updateBudgetItem(index, 'expense_category_id', e.target.value)}
                            required
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>

                          <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={item.budgeted_amount}
                            onChange={(e) => updateBudgetItem(index, 'budgeted_amount', e.target.value)}
                            required
                            placeholder="Amount"
                            className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />

                          <button
                            type="button"
                            onClick={() => removeBudgetItem(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    Total Budget: {formatCurrency(
                      formData.items.reduce((sum, item) => sum + (parseFloat(item.budgeted_amount) || 0), 0)
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || formData.items.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Budget'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
