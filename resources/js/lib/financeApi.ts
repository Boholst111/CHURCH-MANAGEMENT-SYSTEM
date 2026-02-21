import api from './api';

export interface Tithe {
  id: number;
  member_id: number | null;
  amount: number;
  payment_method: 'cash' | 'check' | 'online' | 'other';
  date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  member?: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

export interface FinancialSummary {
  total_giving: number;
  average_per_member: number;
  monthly_totals: Array<{
    month: string;
    total: number;
  }>;
  payment_method_breakdown: {
    [key: string]: number;
  };
}

export const getTithes = async (params?: {
  start_date?: string;
  end_date?: string;
  payment_method?: string;
  member_id?: number;
  page?: number;
  per_page?: number;
}): Promise<{
  data: Tithe[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}> => {
  const response = await api.get('/finance/tithes', { params });
  return response.data.data;
};

export const createTithe = async (data: {
  member_id?: number | null;
  amount: number;
  payment_method: string;
  date: string;
  notes?: string;
}): Promise<Tithe> => {
  const response = await api.post('/finance/tithes', data);
  return response.data.data;
};

export const getFinancialSummary = async (params?: {
  start_date?: string;
  end_date?: string;
}): Promise<FinancialSummary> => {
  const response = await api.get('/finance/summary', { params });
  return response.data.data;
};
