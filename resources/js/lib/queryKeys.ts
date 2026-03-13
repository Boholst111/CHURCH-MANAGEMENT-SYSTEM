/**
 * Query keys for React Query cache management
 * 
 * Organized by domain/feature for easy cache invalidation
 * and consistent key structure across the application.
 */
export const queryKeys = {
  // Authentication
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
  },

  // Dashboard
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
    attendance: (period?: string) => [...queryKeys.dashboard.all, 'attendance', period] as const,
    recentActivity: (limit?: number) => [...queryKeys.dashboard.all, 'activity', limit] as const,
    upcomingEvents: (limit?: number) => [...queryKeys.dashboard.all, 'events', limit] as const,
  },

  // Members
  members: {
    all: ['members'] as const,
    lists: () => [...queryKeys.members.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.members.lists(), filters] as const,
    details: () => [...queryKeys.members.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.members.details(), id] as const,
    search: (query: string) => [...queryKeys.members.all, 'search', query] as const,
  },

  // Small Groups
  smallGroups: {
    all: ['smallGroups'] as const,
    lists: () => [...queryKeys.smallGroups.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.smallGroups.lists(), filters] as const,
    details: () => [...queryKeys.smallGroups.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.smallGroups.details(), id] as const,
    members: (groupId: number | string) => [...queryKeys.smallGroups.detail(groupId), 'members'] as const,
  },

  // Leadership
  leadership: {
    all: ['leadership'] as const,
    lists: () => [...queryKeys.leadership.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.leadership.lists(), filters] as const,
    details: () => [...queryKeys.leadership.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.leadership.details(), id] as const,
  },

  // Events
  events: {
    all: ['events'] as const,
    lists: () => [...queryKeys.events.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.events.lists(), filters] as const,
    details: () => [...queryKeys.events.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.events.details(), id] as const,
    attendees: (eventId: number | string) => [...queryKeys.events.detail(eventId), 'attendees'] as const,
    calendar: (month?: string, year?: string) => [...queryKeys.events.all, 'calendar', month, year] as const,
  },

  // Finance
  finance: {
    all: ['finance'] as const,
    overview: () => [...queryKeys.finance.all, 'overview'] as const,
    
    // Offerings
    offerings: {
      all: () => [...queryKeys.finance.all, 'offerings'] as const,
      lists: () => [...queryKeys.finance.offerings.all(), 'list'] as const,
      list: (filters?: Record<string, any>) => [...queryKeys.finance.offerings.lists(), filters] as const,
      details: () => [...queryKeys.finance.offerings.all(), 'detail'] as const,
      detail: (id: number | string) => [...queryKeys.finance.offerings.details(), id] as const,
    },
    
    // Expenses
    expenses: {
      all: () => [...queryKeys.finance.all, 'expenses'] as const,
      lists: () => [...queryKeys.finance.expenses.all(), 'list'] as const,
      list: (filters?: Record<string, any>) => [...queryKeys.finance.expenses.lists(), filters] as const,
      details: () => [...queryKeys.finance.expenses.all(), 'detail'] as const,
      detail: (id: number | string) => [...queryKeys.finance.expenses.details(), id] as const,
    },
    
    // Budgets
    budgets: {
      all: () => [...queryKeys.finance.all, 'budgets'] as const,
      lists: () => [...queryKeys.finance.budgets.all(), 'list'] as const,
      list: (fiscalYear?: string) => [...queryKeys.finance.budgets.lists(), fiscalYear] as const,
      details: () => [...queryKeys.finance.budgets.all(), 'detail'] as const,
      detail: (id: number | string) => [...queryKeys.finance.budgets.details(), id] as const,
    },
    
    // Categories and Types
    offeringTypes: () => [...queryKeys.finance.all, 'offeringTypes'] as const,
    expenseCategories: () => [...queryKeys.finance.all, 'expenseCategories'] as const,
    funds: () => [...queryKeys.finance.all, 'funds'] as const,
  },

  // Reports
  reports: {
    all: ['reports'] as const,
    list: () => [...queryKeys.reports.all, 'list'] as const,
    generate: (type: string, params?: Record<string, any>) => [...queryKeys.reports.all, 'generate', type, params] as const,
  },

  // Activity Log
  activityLog: {
    all: ['activityLog'] as const,
    lists: () => [...queryKeys.activityLog.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.activityLog.lists(), filters] as const,
    details: () => [...queryKeys.activityLog.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.activityLog.details(), id] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.users.details(), id] as const,
    permissions: (userId: number | string) => [...queryKeys.users.detail(userId), 'permissions'] as const,
  },

  // Settings
  settings: {
    all: ['settings'] as const,
    general: () => [...queryKeys.settings.all, 'general'] as const,
    church: () => [...queryKeys.settings.all, 'church'] as const,
    finance: () => [...queryKeys.settings.all, 'finance'] as const,
    email: () => [...queryKeys.settings.all, 'email'] as const,
    security: () => [...queryKeys.settings.all, 'security'] as const,
    backup: () => [...queryKeys.settings.all, 'backup'] as const,
    integrations: () => [...queryKeys.settings.all, 'integrations'] as const,
  },

  // Archive
  archive: {
    all: ['archive'] as const,
    lists: () => [...queryKeys.archive.all, 'list'] as const,
    list: (type?: string, filters?: Record<string, any>) => [...queryKeys.archive.lists(), type, filters] as const,
  },
} as const;
