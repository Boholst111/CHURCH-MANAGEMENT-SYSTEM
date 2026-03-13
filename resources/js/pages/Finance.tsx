import React, { useState, Suspense, lazy } from 'react';
import { 
  LayoutDashboard, 
  Coins, 
  Receipt, 
  PieChart, 
  Settings as SettingsIcon,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { ContentLoadingFallback } from '../components/ui/loading-fallback';

// Lazy load tab components for code splitting
const FinanceOverview = lazy(() => import('./Finance/Overview'));
const Offerings = lazy(() => import('./Finance/Offerings'));
const Expenses = lazy(() => import('./Finance/Expenses'));
const Budgets = lazy(() => import('./Finance/Budgets'));
const Settings = lazy(() => import('./Finance/Settings'));

type TabType = 'overview' | 'offerings' | 'expenses' | 'budgets' | 'settings';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'offerings', label: 'Offerings', icon: <Coins className="w-4 h-4" /> },
  { id: 'expenses', label: 'Expenses', icon: <Receipt className="w-4 h-4" /> },
  { id: 'budgets', label: 'Budgets', icon: <PieChart className="w-4 h-4" /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
];

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showOfferingModal, setShowOfferingModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const handleRecordOffering = () => {
    setShowOfferingModal(true);
  };

  const handleAddExpense = () => {
    setShowExpenseModal(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Finance</h1>
              <p className="mt-1 text-sm text-neutral-600">
                Manage church finances, offerings, and expenses
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="md"
                icon={<Plus className="w-4 h-4" />}
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={<Plus className="w-4 h-4" />}
                onClick={handleRecordOffering}
              >
                Record Offering
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-neutral-200">
            <nav className="-mb-px flex space-x-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors
                    ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-6">
        <Suspense fallback={<ContentLoadingFallback />}>
          {activeTab === 'overview' && <FinanceOverview />}
          {activeTab === 'offerings' && (
            <Offerings 
              showModal={showOfferingModal}
              onCloseModal={() => setShowOfferingModal(false)}
            />
          )}
          {activeTab === 'expenses' && (
            <Expenses 
              showModal={showExpenseModal}
              onCloseModal={() => setShowExpenseModal(false)}
            />
          )}
          {activeTab === 'budgets' && <Budgets />}
          {activeTab === 'settings' && <Settings />}
        </Suspense>
      </div>
    </div>
  );
};

export default Finance;
