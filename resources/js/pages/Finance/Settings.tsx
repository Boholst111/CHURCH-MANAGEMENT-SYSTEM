import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Card } from '../../components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface OfferingType {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
}

interface ExpenseCategory {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
}

interface Vendor {
  id: number;
  name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
}

interface Fund {
  id: number;
  name: string;
  type: 'restricted' | 'unrestricted';
  description: string | null;
  is_active: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'offering_types' | 'expense_categories' | 'vendors' | 'funds'>('offering_types');
  const [offeringTypes, setOfferingTypes] = useState<OfferingType[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      switch (activeTab) {
        case 'offering_types':
          const offeringTypesRes = await api.get('/offering-types');
          setOfferingTypes(offeringTypesRes.data.data || []);
          break;
        case 'expense_categories':
          const categoriesRes = await api.get('/expense-categories');
          setExpenseCategories(categoriesRes.data.data || []);
          break;
        case 'vendors':
          const vendorsRes = await api.get('/vendors');
          setVendors(vendorsRes.data.data || []);
          break;
        case 'funds':
          const fundsRes = await api.get('/funds');
          setFunds(fundsRes.data.data || []);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(getEmptyFormData());
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = getEndpoint();
      await api.delete(`${endpoint}/${id}`);
      fetchData();
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. It may be in use.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = getEndpoint();
      if (editingItem) {
        await api.put(`${endpoint}/${editingItem.id}`, formData);
        alert('Item updated successfully!');
      } else {
        await api.post(endpoint, formData);
        alert('Item created successfully!');
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item. Please try again.');
    }
  };

  const getEndpoint = () => {
    switch (activeTab) {
      case 'offering_types': return '/offering-types';
      case 'expense_categories': return '/expense-categories';
      case 'vendors': return '/vendors';
      case 'funds': return '/funds';
    }
  };

  const getEmptyFormData = () => {
    switch (activeTab) {
      case 'offering_types':
      case 'expense_categories':
        return { name: '', description: '', is_active: true };
      case 'vendors':
        return { name: '', contact_name: '', email: '', phone: '', is_active: true };
      case 'funds':
        return { name: '', type: 'unrestricted', description: '', is_active: true };
    }
  };

  const renderTable = () => {
    if (loading) {
      return (
        <div className="p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      );
    }

    const data = activeTab === 'offering_types' ? offeringTypes :
                 activeTab === 'expense_categories' ? expenseCategories :
                 activeTab === 'vendors' ? vendors : funds;

    if (data.length === 0) {
      return (
        <div className="p-12 text-center text-gray-500">
          <p>No items found. Click "Add New" to create one.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              {activeTab === 'vendors' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                </>
              )}
              {activeTab === 'funds' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              )}
              {(activeTab === 'offering_types' || activeTab === 'expense_categories' || activeTab === 'funds') && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                {activeTab === 'vendors' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.contact_name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.phone || '-'}</td>
                  </>
                )}
                {activeTab === 'funds' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{item.type}</td>
                )}
                {(activeTab === 'offering_types' || activeTab === 'expense_categories' || activeTab === 'funds') && (
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{item.description || '-'}</td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit size={16} className="inline" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'offering_types':
      case 'expense_categories':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active || false}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
            </div>
          </>
        );
      case 'vendors':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input
                type="text"
                value={formData.contact_name || ''}
                onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active || false}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
            </div>
          </>
        );
      case 'funds':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fund Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type || 'unrestricted'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="unrestricted">Unrestricted</option>
                <option value="restricted">Restricted</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active || false}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
            </div>
          </>
        );
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'offering_types': return 'Offering Types';
      case 'expense_categories': return 'Expense Categories';
      case 'vendors': return 'Vendors';
      case 'funds': return 'Funds';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Finance Settings</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <Card className="p-4">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('offering_types')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'offering_types' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Offering Types
          </button>
          <button
            onClick={() => setActiveTab('expense_categories')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'expense_categories' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Expense Categories
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'vendors' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Vendors
          </button>
          <button
            onClick={() => setActiveTab('funds')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === 'funds' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Funds
          </button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        {renderTable()}
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingItem ? `Edit ${getTabTitle()}` : `Add ${getTabTitle()}`}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {renderForm()}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
