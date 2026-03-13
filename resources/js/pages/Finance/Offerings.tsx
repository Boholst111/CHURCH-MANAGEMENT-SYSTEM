import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Modal } from '../../components/ui/modal';
import { Badge } from '../../components/ui/badge';
import { SkeletonTable } from '../../components/ui/skeleton';
import { Search, Download, Upload, Eye, Edit, Trash2 } from 'lucide-react';

interface Offering {
  id: number;
  member_id: number | null;
  member_name: string | null;
  offering_type_id: number;
  offering_type_name: string;
  amount: number;
  payment_method: string;
  reference_number: string | null;
  offering_date: string;
  notes: string | null;
  is_anonymous: boolean;
  status: 'recorded' | 'verified' | 'deposited';
  created_at: string;
}

interface OfferingType {
  id: number;
  name: string;
  description: string | null;
}

interface Member {
  id: number;
  first_name: string;
  last_name: string;
}

interface OfferingsProps {
  showModal?: boolean;
  onCloseModal?: () => void;
}

const Offerings: React.FC<OfferingsProps> = ({ showModal = false, onCloseModal }) => {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [offeringTypes, setOfferingTypes] = useState<OfferingType[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(showModal);
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    offering_type_id: '',
    payment_method: '',
    status: '',
    start_date: '',
    end_date: ''
  });
  const [formData, setFormData] = useState({
    member_id: '',
    offering_type_id: '',
    amount: '',
    payment_method: 'cash',
    reference_number: '',
    offering_date: new Date().toISOString().split('T')[0],
    notes: '',
    is_anonymous: false
  });

  useEffect(() => {
    setShowAddModal(showModal);
  }, [showModal]);

  useEffect(() => {
    fetchOfferings();
    fetchOfferingTypes();
    fetchMembers();
  }, [filters]);

  const fetchOfferings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/offerings', { params: filters });
      setOfferings(response.data.data || []);
    } catch (error) {
      console.error('Error fetching offerings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOfferingTypes = async () => {
    try {
      const response = await api.get('/offering-types');
      setOfferingTypes(response.data.data || []);
    } catch (error) {
      console.error('Error fetching offering types:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await api.get('/members');
      setMembers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post('/offerings', {
        ...formData,
        member_id: formData.is_anonymous ? null : formData.member_id,
        amount: parseFloat(formData.amount)
      });
      handleCloseModal();
      setFormData({
        member_id: '',
        offering_type_id: '',
        amount: '',
        payment_method: 'cash',
        reference_number: '',
        offering_date: new Date().toISOString().split('T')[0],
        notes: '',
        is_anonymous: false
      });
      fetchOfferings();
      alert('Offering recorded successfully!');
    } catch (error) {
      console.error('Error recording offering:', error);
      alert('Failed to record offering. Please try again.');
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

  const getStatusBadgeVariant = (status: string): 'primary' | 'success' | 'warning' => {
    switch (status) {
      case 'deposited':
        return 'primary';
      case 'verified':
        return 'success';
      default:
        return 'warning';
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
              placeholder="Search by member..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={filters.offering_type_id}
            onChange={(e) => setFilters({ ...filters, offering_type_id: e.target.value })}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {offeringTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>

          <select
            value={filters.payment_method}
            onChange={(e) => setFilters({ ...filters, payment_method: e.target.value })}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Methods</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="online">Online</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="recorded">Recorded</option>
            <option value="verified">Verified</option>
            <option value="deposited">Deposited</option>
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

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm font-medium text-neutral-600">Total Offerings</p>
          <p className="text-3xl font-bold text-success-600 mt-2">
            {formatCurrency(offerings.reduce((sum, o) => sum + (Number(o.amount) || 0), 0))}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-neutral-600">Number of Transactions</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{offerings.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-neutral-600">Average Offering</p>
          <p className="text-3xl font-bold text-info-600 mt-2">
            {offerings.length > 0 
              ? formatCurrency(offerings.reduce((sum, o) => sum + (Number(o.amount) || 0), 0) / offerings.length)
              : formatCurrency(0)
            }
          </p>
        </Card>
      </div>

      {/* Offerings Table */}
      <Card>
        {loading ? (
          <div className="p-6">
            <SkeletonTable rows={10} columns={7} />
          </div>
        ) : offerings.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <p>No offerings found for the selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {offerings.map((offering) => (
                  <tr key={offering.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {formatDate(offering.offering_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {offering.offering_type_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-success-600">
                      {formatCurrency(offering.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 capitalize">
                      {offering.payment_method.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {offering.is_anonymous ? (
                        <span className="text-neutral-500 italic">Anonymous</span>
                      ) : (
                        offering.member_name || 'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant={getStatusBadgeVariant(offering.status || 'recorded')}>
                        {offering.status || 'recorded'}
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

      {/* Add Offering Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title="Record Offering"
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_anonymous"
                checked={formData.is_anonymous}
                onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked, member_id: '' })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="is_anonymous" className="text-sm font-medium text-neutral-700">
                Anonymous Offering
              </label>
            </div>

            {!formData.is_anonymous && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Member <span className="text-error-500">*</span>
                </label>
                <select
                  value={formData.member_id}
                  onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
                  required={!formData.is_anonymous}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.first_name} {member.last_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Offering Type <span className="text-error-500">*</span>
              </label>
              <select
                value={formData.offering_type_id}
                onChange={(e) => setFormData({ ...formData, offering_type_id: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                {offeringTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
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
                Date <span className="text-error-500">*</span>
              </label>
              <input
                type="date"
                value={formData.offering_date}
                onChange={(e) => setFormData({ ...formData, offering_date: e.target.value })}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
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
                rows={3}
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
              {submitting ? 'Recording...' : 'Record Offering'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Offerings;
