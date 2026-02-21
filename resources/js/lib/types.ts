// Dashboard Types
export interface DashboardStats {
  total_members: number;
  monthly_tithes: number;
  upcoming_events: number;
  new_visitors: number;
}

export interface AttendanceData {
  year: number;
  month: number;
  month_name: string;
  total_attendance: number;
  event_count: number;
  average_attendance: number;
}

export interface Activity {
  id: number;
  user_name: string;
  action: string;
  entity_type: string;
  entity_id: number | null;
  description: string;
  created_at: string;
  created_at_human: string;
}

// Member Types
export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'visitor';
  small_group_id: number | null;
  date_joined: string;
  birth_date: string | null;
  gender: 'male' | 'female' | 'other';
  created_at: string;
  updated_at: string;
  small_group?: {
    id: number;
    name: string;
  };
}

// Financial Report Types
export interface FinancialData {
  period: string;
  amount: number;
  count: number;
}

export interface FinancialSummary {
  total_giving: number;
  average_giving: number;
  giving_trend: number;
  period_start: string;
  period_end: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
