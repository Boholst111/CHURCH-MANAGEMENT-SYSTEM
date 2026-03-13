import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Modal } from '../../components/ui/modal';
import { SkeletonCard } from '../../components/ui/skeleton';
import { Plus, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface Budget {
  id: number;
  fiscal_year: string;
  category_name: string;
  allocated_amount: number;
  spent_amount: number;
  remaining_amount: number;
  percentage_used: number;
  status: 'on-track' | 'at-limit' | 'over-budget';
}

interface BudgetItem {
  expense_category_id: string;
  allocated_amount: string;
}

interface ExpenseCategory {
  id: number;
  name: string;
  description: string | null;
}

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear().toString());
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { expense_category_id: '', allocated_amount: '' }
  ]);

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, [fiscalYear]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/budgets', {
        params: { fiscal_year: fiscalYear }
      });
      setBudgets(response.data.data || []);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
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
        fiscal_year: fiscalYear,
        items: budgetItems.map(item => ({
          expense_category_id: parseInt(item.expense_category_id),
          allocated_amount: parseFloat(item.allocated_amount)
        }))
      });
      setShowAddModal(false);
      setBudgetItems([{ expense_category_id: '', allocated_amount: '' }]);
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
    setBudgetItems([...budgetItems, { expense_category_id: '', allocated_amount: '' }]);
  };

  const removeBudgetItem = (index: number) => {
    setBudgetItems(budgetItems.filter((_, i) => i !== index));
  };

  const updateBudgetItem = (index: number, field: keyof BudgetItem, value: string) => {
    const updated = [...budgetItems];
    updated[index][field] = value;
    setBudgetItems(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-success-100 text-success-800 border-success-200';
      case 'at-limit':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'over-budget':
        return 'bg-error-100 text-error-800 border-error-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-error-500';
    if (percentage >= 90) return 'bg-warning-500';
    return 'bg-success-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Budget Management</h2>
          <p className="text-sm text-neutral-600 mt-1">Track and manage budget allocations</p>
        </div>
        <div className="flex gap-3">
          <select
            value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[...Array(5)].map((_, i) => {
              const year = new Date().getFullYear() - 2 + i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Create Budget
          </Button>
        </div>
      </div>

      {/* Budget Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} hasImage={false} />
          ))}
        </div>
      ) : budgets.length === 0 ? (
        <Card className="p-12 text-center text-neutral-500">
          <p>No budgets found for {fiscalYear}. Create one to get started.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <Card key={budget.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">{budget.category_name}</h3>
                  <p className="text-sm text-neutral-600 mt-1">FY {budget.fiscal_year}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(budget.status)}`}>
                  {budget.status.replace('-', ' ')}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Allocated</span>
                  <span className="text-sm font-semibold text-neutral-900">
                    {formatCurrency(budget.allocated_amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Spent</span>
                  <span className="text-sm font-semibold text-error-600">
                    {formatCurrency(budget.spent_amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Remaining</span>
                  <span className={`text-sm font-semibold ${budget.remaining_amount >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                    {formatCurrency(budget.remaining_amount)}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-neutral-600">Budget Utilization</span>
                  <span className="text-xs font-semibold text-neutral-900">
                    {budget.percentage_used.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getProgressColor(budget.percentage_used)}`}
                    style={{ width: `${Math.min(budget.percentage_used, 100)}%` }}
                  ></div>
                </div>
              </div>

              {budget.status === 'over-budget' && (
                <div className="mt-4 flex items-center gap-2 text-error-600 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Over budget by {formatCurrency(Math.abs(budget.remaining_amount))}</span>
                </div>
              )}

              {budget.status === 'at-limit' && (
                <div className="mt-4 flex items-center gap-2 text-warning-600 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Approaching budget limit</span>
                </div>
              )}

              {budget.status === 'on-track' && (
                <div className="mt-4 flex items-center gap-2 text-success-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>On track</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Create Budget Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create Budget"
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Fiscal Year <span className="text-error-500">*</span>
              </label>
              <select
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() - 2 + i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Budget Items <span className="text-error-500">*</span>
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={addBudgetItem}
                >
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {budgetItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <select
                      value={item.expense_category_id}
                      onChange={(e) => updateBudgetItem(index, 'expense_category_id', e.target.value)}
                      required
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                      value={item.allocated_amount}
                      onChange={(e) => updateBudgetItem(index, 'allocated_amount', e.target.value)}
                      required
                      placeholder="Amount"
                      className="w-40 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {budgetItems.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeBudgetItem(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700">Total Budget</span>
                <span className="text-lg font-bold text-neutral-900">
                  {formatCurrency(
                    budgetItems.reduce((sum, item) => sum + (parseFloat(item.allocated_amount) || 0), 0)
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddModal(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              loading={submitting}
            >
              {submitting ? 'Creating...' : 'Create Budget'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Budgets;
