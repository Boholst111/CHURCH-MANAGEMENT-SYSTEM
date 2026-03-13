import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Modal } from '../../components/ui/modal';
import { Badge } from '../../components/ui/badge';
import { SkeletonTable } from '../../components/ui/skeleton';
import { Search, Download, Upload, Eye, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Expense {
  id: number;
  expense_category_id: number;
  category_name: string;
  vendor_id: number | null;
  vendor_name: string | null;
  fund_id: number | null;
  fund_name: string | null;
  amount: number;
  expense_date: string;
  description: string;
  payment_method: string;
  reference_number: string | null;
  receipt_url: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  approved_by: number | null;
  approved_at: string | null;
  created_at: string;
}

interface ExpenseCategory {
  id: number;
  name: string;
  description: string | null;
}

interface Vendor {
  id: number;
  name: string;
}

interface Fund {
  id: number;
  name: string;
}

interface ExpensesProps {
  showModal?: boolean;
  onCloseModal?: () => void;
}

const Expenses: React.FC<ExpensesProps> = ({ showModal = false, onCloseModal }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(showModal);
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category_id: '',
    status: '',
    fund_id: '',
    start_date: '',
    end_date: ''
  });
  const [formData, setFormData] = useState({
    expense_category_id: '',
    vendor_id: '',
    fund_id: '',
    amount: '',
    expense_date: new Date().toISOString().split('T')[0],
    description: '',
    payment_method: 'cash',
    reference_number: '',
    notes: ''
  });

  useEffect(() => {
    setShowAddModal(showModal);
  }, [showModal]);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
    fetchVendors();
    fetchFunds();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses', { params: filters });
      setExpenses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
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

  const fetchVendors = async () => {
    try {
      const response = await api.get('/vendors');
      setVendors(response.data.data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const fetchFunds = async () => {
    try {
      const response = await api.get('/funds');
      setFunds(response.data.data || []);
    } catch (error) {
      console.error('Error fetching funds:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post('/expenses', {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      handleCloseModal();
      setFormData({
        expense_category_id: '',
        vendor_id: '',
        fund_id: '',
        amount: '',
        expense_date: new Date().toISOString().split('T')[0],
        description: '',
        payment_method: 'cash',
        reference_number: '',
        notes: ''
      });
      fetchExpenses();
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    if (onCloseModal) {
      onCloseModal();
    }
  };

  const getStatusBadgeVariant = (status: string): 'warning' | 'success' | 'error' | 'primary' => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'paid':
        return 'primary';
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search expenses..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={filters.category_id}
            onChange={(e) => setFilters({ ...filters, category_id: e.target.value })}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filters.fund_id}
            onChange={(e) => setFilters({ ...filters, fund_id: e.target.value })}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Funds</option>
            {funds.map(fund => (
              <option key={fund.id} value={fund.id}>{fund.name}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" icon={<Upload className="w-4 h-4" />}>
              Import
            </Button>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Start Date</label>
            <input
              type="date"
              value={filters.start_date}
              onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">End Date</label>
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Expenses Table */}
      <Card>
        {loading ? (
          <div className="p-6">
            <SkeletonTable rows={10} columns={8} />
          </div>
        ) : expenses.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <p>No expenses found for the selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Fund</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {formatDate(expense.expense_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      <div className="max-w-xs truncate">{expense.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {expense.category_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-error-600">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {expense.fund_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant={getStatusBadgeVariant(expense.status)} icon={getStatusIcon(expense.status)}>
                        {expense.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                          onClick={() => {/* View details */}}
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-neutral-600 hover:text-neutral-900 transition-colors"
                          onClick={() => {/* Edit */}}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-error-600 hover:text-error-900 transition-colors"
                          onClick={() => {/* Delete */}}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title="Add Expense"
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Category <span className="text-error-500">*</span>
              </label>
              <select
                value={formData.expense_category_id}
                onChange={(e) => setFormData({ ...formData, expense_category_id: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description <span className="text-error-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe the expense..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Amount <span className="text-error-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Fund <span className="text-error-500">*</span>
              </label>
              <select
                value={formData.fund_id}
                onChange={(e) => setFormData({ ...formData, fund_id: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Fund</option>
                {funds.map(fund => (
                  <option key={fund.id} value={fund.id}>{fund.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Vendor
              </label>
              <select
                value={formData.vendor_id}
                onChange={(e) => setFormData({ ...formData, vendor_id: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Vendor (Optional)</option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Date <span className="text-error-500">*</span>
              </label>
              <input
                type="date"
                value={formData.expense_date}
                onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Payment Method <span className="text-error-500">*</span>
              </label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="cash">Cash</option>
                <option value="check">Check</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Reference Number
              </label>
              <input
                type="text"
                value={formData.reference_number}
                onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Optional notes..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseModal}
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
              {submitting ? 'Adding...' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Expenses;
