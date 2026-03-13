// Dashboard Types
export interface DashboardStats {
  total_members: number;
  monthly_tithes: number;
  upcoming_events: number;
  new_visitors: number;
  total_offerings: number;
  total_expenses: number;
  net_income: number;
  active_groups?: number;
  member_trend?: number;
  visitor_trend?: number;
  offerings_trend?: number;
  expenses_trend?: number;
  net_income_trend?: number;
  budget_utilization?: number;
  total_budget?: number;
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

export interface UpcomingEvent {
  id: number;
  title: string;
  event_date: string;
  event_date_formatted: string;
  event_time: string;
  location: string;
  description: string;
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

export interface MemberFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  membership_type: string;
  status: 'active' | 'visitor';
  small_group_id: number | null;
  date_joined: string;
  birth_date: string | null;
  gender: 'male' | 'female' | 'other';
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
  errors?: Record<string, string[]>;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'pastor' | 'staff' | 'volunteer';
  created_at: string;
  updated_at: string;
}

// Beta Feedback Types
export interface BetaFeedback {
  id: number;
  user_id: number;
  page: string;
  feedback_type: 'bug' | 'feature' | 'improvement' | 'other';
  message: string;
  priority: 'low' | 'medium' | 'high';
  priorityScore?: number;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  updated_at: string;
}
