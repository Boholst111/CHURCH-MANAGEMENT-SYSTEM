import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '../../lib/queryKeys';

// Types
export interface FinanceOverview {
  total_balance: number;
  monthly_offerings: number;
  monthly_expenses: number;
  budget_utilization: number;
}

export interface Offering {
  id: number;
  date: string;
  offering_type_id: number;
  offering_type?: {
    id: number;
    name: string;
  };
  amount: number;
  payment_method: string;
  donor_name?: string;
  notes?: string;
  status: 'recorded' | 'verified' | 'deposited';
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: number;
  date: string;
  description: string;
  expense_category_id: number;
  expense_category?: {
    id: number;
    name: string;
  };
  amount: number;
  fund_id: number;
  fund?: {
    id: number;
    name: string;
  };
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  approved_by?: number;
  receipt_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: number;
  fiscal_year: string;
  expense_category_id: number;
  expense_category?: {
    id: number;
    name: string;
  };
  allocated_amount: number;
  spent_amount: number;
  remaining_amount: number;
  percentage_used: number;
  created_at: string;
  updated_at: string;
}

export interface OfferingFilters {
  start_date?: string;
  end_date?: string;
  offering_type_id?: number;
  payment_method?: string;
  status?: string;
  page?: number;
  per_page?: number;
}

export interface ExpenseFilters {
  start_date?: string;
  end_date?: string;
  expense_category_id?: number;
  fund_id?: number;
  status?: string;
  page?: number;
  per_page?: number;
}

// API functions - Overview
const fetchFinanceOverview = async () => {
  const { data } = await axios.get('/api/finance/overview');
  return data;
};

// API functions - Offerings
const fetchOfferings = async (filters?: OfferingFilters) => {
  const { data } = await axios.get('/api/offerings', { params: filters });
  return data;
};

const fetchOffering = async (id: number | string) => {
  const { data } = await axios.get(`/api/offerings/${id}`);
  return data;
};

const createOffering = async (offeringData: Partial<Offering>) => {
  const { data } = await axios.post('/api/offerings', offeringData);
  return data;
};

const updateOffering = async ({ id, ...offeringData }: Partial<Offering> & { id: number }) => {
  const { data } = await axios.put(`/api/offerings/${id}`, offeringData);
  return data;
};

const deleteOffering = async (id: number) => {
  const { data } = await axios.delete(`/api/offerings/${id}`);
  return data;
};

// API functions - Expenses
const fetchExpenses = async (filters?: ExpenseFilters) => {
  const { data } = await axios.get('/api/expenses', { params: filters });
  return data;
};

const fetchExpense = async (id: number | string) => {
  const { data } = await axios.get(`/api/expenses/${id}`);
  return data;
};

const createExpense = async (expenseData: Partial<Expense>) => {
  const { data } = await axios.post('/api/expenses', expenseData);
  return data;
};

const updateExpense = async ({ id, ...expenseData }: Partial<Expense> & { id: number }) => {
  const { data } = await axios.put(`/api/expenses/${id}`, expenseData);
  return data;
};

const deleteExpense = async (id: number) => {
  const { data } = await axios.delete(`/api/expenses/${id}`);
  return data;
};

const approveExpense = async (id: number) => {
  const { data } = await axios.post(`/api/expenses/${id}/approve`);
  return data;
};

const rejectExpense = async (id: number) => {
  const { data } = await axios.post(`/api/expenses/${id}/reject`);
  return data;
};

// API functions - Budgets
const fetchBudgets = async (fiscalYear?: string) => {
  const { data } = await axios.get('/api/budgets', { params: { fiscal_year: fiscalYear } });
  return data;
};

const fetchBudget = async (id: number | string) => {
  const { data } = await axios.get(`/api/budgets/${id}`);
  return data;
};

const createBudget = async (budgetData: Partial<Budget>) => {
  const { data } = await axios.post('/api/budgets', budgetData);
  return data;
};

const updateBudget = async ({ id, ...budgetData }: Partial<Budget> & { id: number }) => {
  const { data } = await axios.put(`/api/budgets/${id}`, budgetData);
  return data;
};

const deleteBudget = async (id: number) => {
  const { data } = await axios.delete(`/api/budgets/${id}`);
  return data;
};

// API functions - Categories and Types
const fetchOfferingTypes = async () => {
  const { data } = await axios.get('/api/offering-types');
  return data;
};

const fetchExpenseCategories = async () => {
  const { data } = await axios.get('/api/expense-categories');
  return data;
};

const fetchFunds = async () => {
  const { data } = await axios.get('/api/funds');
  return data;
};

// Query hooks - Overview
export const useFinanceOverview = () => {
  return useQuery({
    queryKey: queryKeys.finance.overview(),
    queryFn: fetchFinanceOverview,
  });
};

// Query hooks - Offerings
export const useOfferings = (filters?: OfferingFilters) => {
  return useQuery({
    queryKey: queryKeys.finance.offerings.list(filters),
    queryFn: () => fetchOfferings(filters),
  });
};

export const useOffering = (id: number | string) => {
  return useQuery({
    queryKey: queryKeys.finance.offerings.detail(id),
    queryFn: () => fetchOffering(id),
    enabled: !!id,
  });
};

// Query hooks - Expenses
export const useExpenses = (filters?: ExpenseFilters) => {
  return useQuery({
    queryKey: queryKeys.finance.expenses.list(filters),
    queryFn: () => fetchExpenses(filters),
  });
};

export const useExpense = (id: number | string) => {
  return useQuery({
    queryKey: queryKeys.finance.expenses.detail(id),
    queryFn: () => fetchExpense(id),
    enabled: !!id,
  });
};

// Query hooks - Budgets
export const useBudgets = (fiscalYear?: string) => {
  return useQuery({
    queryKey: queryKeys.finance.budgets.list(fiscalYear),
    queryFn: () => fetchBudgets(fiscalYear),
  });
};

export const useBudget = (id: number | string) => {
  return useQuery({
    queryKey: queryKeys.finance.budgets.detail(id),
    queryFn: () => fetchBudget(id),
    enabled: !!id,
  });
};

// Query hooks - Categories and Types
export const useOfferingTypes = () => {
  return useQuery({
    queryKey: queryKeys.finance.offeringTypes(),
    queryFn: fetchOfferingTypes,
    staleTime: Infinity, // These rarely change
  });
};

export const useExpenseCategories = () => {
  return useQuery({
    queryKey: queryKeys.finance.expenseCategories(),
    queryFn: fetchExpenseCategories,
    staleTime: Infinity,
  });
};

export const useFunds = () => {
  return useQuery({
    queryKey: queryKeys.finance.funds(),
    queryFn: fetchFunds,
    staleTime: Infinity,
  });
};

// Mutation hooks - Offerings
export const useCreateOffering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOffering,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.offerings.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.overview() });
    },
  });
};

export const useUpdateOffering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOffering,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.offerings.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.offerings.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.overview() });
    },
  });
};

export const useDeleteOffering = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOffering,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.offerings.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.overview() });
    },
  });
};

// Mutation hooks - Expenses
export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.expenses.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.overview() });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpense,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.expenses.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.expenses.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.overview() });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.expenses.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.overview() });
    },
  });
};

export const useApproveExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveExpense,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.expenses.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.expenses.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.overview() });
    },
  });
};

export const useRejectExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectExpense,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.expenses.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.expenses.lists() });
    },
  });
};

// Mutation hooks - Budgets
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.budgets.lists() });
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBudget,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.budgets.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.budgets.lists() });
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.budgets.lists() });
    },
  });
};
