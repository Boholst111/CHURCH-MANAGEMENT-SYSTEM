import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Building2, DollarSign, Mail, Shield, Database, Plug, Upload, X, Plus, Edit2, Trash2, Check, Eye, EyeOff, Send, Download, RotateCcw, Clock, HardDrive, Calendar, CreditCard, Zap, Video, MessageSquare, CheckCircle, XCircle, AlertCircle, Key, Archive } from 'lucide-react';
import { cn } from '../lib/utils';
import { Input } from '../components/ui/input';
import { Select, SelectOption } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { useToast } from '../contexts/ToastContext';
import { Badge } from '../components/ui/badge';
import { FeatureFlagAdminPanel } from '../components/admin/FeatureFlagAdminPanel';

/**
 * Settings Page Component
 * 
 * Modern redesigned settings page with vertical tab navigation.
 * 
 * Features:
 * - Page header with title and subtitle
 * - Vertical tab navigation (desktop) / Horizontal tabs (mobile)
 * - Content area for active tab
 * - Tabs: General, Church Information, Finance Settings, Email & Notifications, 
 *   Security, Backup & Restore, Integrations
 * 
 * Design Reference: Settings Page Design section
 */

type SettingsTab = 
  | 'general' 
  | 'church-info' 
  | 'finance' 
  | 'email-notifications' 
  | 'security' 
  | 'backup' 
  | 'integrations'
  | 'archive';

interface TabConfig {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
}

interface GeneralSettingsData {
  appName: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  theme: string;
  language: string;
  itemsPerPage: number;
}

interface ChurchInfoData {
  // Basic Information
  churchName: string;
  denomination: string;
  foundedYear: string;
  
  // Contact Information
  address: string;
  phone: string;
  email: string;
  website: string;
  
  // Social Media
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  
  // Branding
  logo: string | null;
  primaryColor: string;
}

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

interface Fund {
  id: number;
  name: string;
  type: 'restricted' | 'unrestricted';
  description: string | null;
  current_balance: string;
  is_active: boolean;
}

interface FinanceSettingsData {
  fiscalYearStart: string; // Month (1-12)
  requireApproval: boolean;
  approvalThreshold: number;
  defaultOfferingType: string;
  defaultExpenseCategory: string;
  defaultFund: string;
}

interface EmailNotificationSettings {
  // SMTP Configuration
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  smtpEncryption: 'none' | 'tls' | 'ssl';
  smtpFromEmail: string;
  smtpFromName: string;
  
  // Notification Preferences
  enableEmailNotifications: boolean;
  enableInAppNotifications: boolean;
  
  // Notification Types
  notifyNewMember: boolean;
  notifyEventReminder: boolean;
  notifyFinanceApproval: boolean;
  notifyExpenseSubmitted: boolean;
  notifyOfferingRecorded: boolean;
  notifyBudgetThreshold: boolean;
  notifyUserInvite: boolean;
  notifySystemUpdate: boolean;
}

interface SecuritySettings {
  // Password Policy
  minPasswordLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  passwordExpiryDays: number;
  
  // Session Settings
  sessionTimeout: number; // in minutes
  
  // Two-Factor Authentication
  enable2FA: boolean;
  
  // Login Security
  maxLoginAttempts: number;
  lockoutDuration: number; // in minutes
}

interface AuditLogEntry {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}

interface BackupEntry {
  id: number;
  filename: string;
  size: string;
  created_at: string;
  created_by: string;
  status: 'completed' | 'in_progress' | 'failed';
  type: 'manual' | 'automatic';
}

interface BackupSettings {
  enableAutoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  backupTime: string; // HH:MM format
  retentionDays: number;
  includeUploads: boolean;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'payment' | 'email' | 'calendar' | 'communication' | 'storage';
  icon: React.ElementType;
  status: 'connected' | 'disconnected' | 'error';
  isConfigured: boolean;
  apiKey?: string;
  lastSync?: string;
  config?: Record<string, any>;
}

interface IntegrationConfig {
  apiKey: string;
  apiSecret?: string;
  webhookUrl?: string;
  additionalSettings?: Record<string, string>;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const { showToast } = useToast();
  
  // General Settings state
  const [generalSettings, setGeneralSettings] = useState<GeneralSettingsData>({
    appName: 'MFMC System',
    timezone: 'Asia/Manila',
    dateFormat: 'MM/DD/YYYY',
    currency: 'PHP',
    theme: 'Light',
    language: 'English',
    itemsPerPage: 25,
  });
  
  // Church Information state
  const [churchInfo, setChurchInfo] = useState<ChurchInfoData>({
    // Basic Information
    churchName: 'My First Miracle Church',
    denomination: 'Non-denominational',
    foundedYear: '2010',
    
    // Contact Information
    address: '123 Church Street, Manila, Philippines',
    phone: '+63 912 345 6789',
    email: 'info@mfmc.church',
    website: 'https://www.mfmc.church',
    
    // Social Media
    facebook: 'https://facebook.com/mfmc',
    twitter: 'https://twitter.com/mfmc',
    instagram: 'https://instagram.com/mfmc',
    youtube: 'https://youtube.com/@mfmc',
    
    // Branding
    logo: null,
    primaryColor: '#0ea5e9',
  });
  
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Finance Settings state
  const [financeSettings, setFinanceSettings] = useState<FinanceSettingsData>({
    fiscalYearStart: '1', // January
    requireApproval: true,
    approvalThreshold: 5000,
    defaultOfferingType: '',
    defaultExpenseCategory: '',
    defaultFund: '',
  });
  
  const [offeringTypes, setOfferingTypes] = useState<OfferingType[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [funds, setFunds] = useState<Fund[]>([]);
  
  const [editingOfferingType, setEditingOfferingType] = useState<OfferingType | null>(null);
  const [editingExpenseCategory, setEditingExpenseCategory] = useState<ExpenseCategory | null>(null);
  const [editingFund, setEditingFund] = useState<Fund | null>(null);
  
  const [newOfferingType, setNewOfferingType] = useState({ name: '', description: '' });
  const [newExpenseCategory, setNewExpenseCategory] = useState({ name: '', description: '' });
  const [newFund, setNewFund] = useState({ name: '', type: 'unrestricted' as 'restricted' | 'unrestricted', description: '' });
  
  const [showAddOfferingType, setShowAddOfferingType] = useState(false);
  const [showAddExpenseCategory, setShowAddExpenseCategory] = useState(false);
  const [showAddFund, setShowAddFund] = useState(false);
  
  // Email & Notifications state
  const [emailNotificationSettings, setEmailNotificationSettings] = useState<EmailNotificationSettings>({
    // SMTP Configuration
    smtpHost: '',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',
    smtpFromEmail: '',
    smtpFromName: 'MFMC System',
    
    // Notification Preferences
    enableEmailNotifications: true,
    enableInAppNotifications: true,
    
    // Notification Types
    notifyNewMember: true,
    notifyEventReminder: true,
    notifyFinanceApproval: true,
    notifyExpenseSubmitted: true,
    notifyOfferingRecorded: false,
    notifyBudgetThreshold: true,
    notifyUserInvite: true,
    notifySystemUpdate: true,
  });
  
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  
  // Security Settings state
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    // Password Policy
    minPasswordLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    passwordExpiryDays: 90,
    
    // Session Settings
    sessionTimeout: 30, // 30 minutes
    
    // Two-Factor Authentication
    enable2FA: false,
    
    // Login Security
    maxLoginAttempts: 5,
    lockoutDuration: 15, // 15 minutes
  });
  
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [isLoadingAuditLogs, setIsLoadingAuditLogs] = useState(false);
  
  // Backup & Restore state
  const [backups, setBackups] = useState<BackupEntry[]>([]);
  const [isLoadingBackups, setIsLoadingBackups] = useState(false);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupSettings, setBackupSettings] = useState<BackupSettings>({
    enableAutoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    includeUploads: true,
  });
  const [lastBackup, setLastBackup] = useState<BackupEntry | null>(null);
  const [restoreConfirmation, setRestoreConfirmation] = useState<BackupEntry | null>(null);
  
  // Integrations state
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [configuringIntegration, setConfiguringIntegration] = useState<Integration | null>(null);
  const [integrationConfig, setIntegrationConfig] = useState<IntegrationConfig>({
    apiKey: '',
    apiSecret: '',
    webhookUrl: '',
    additionalSettings: {},
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSavingIntegration, setIsSavingIntegration] = useState(false);
  
  // Archive Settings state
  interface ArchiveSettings {
    autoArchiveEnabled: boolean;
    autoArchiveDays: number;
    retentionPeriod: number;
    allowRestore: boolean;
    requireConfirmation: boolean;
    notifyOnArchive: boolean;
  }
  
  const [archiveSettings, setArchiveSettings] = useState<ArchiveSettings>({
    autoArchiveEnabled: false,
    autoArchiveDays: 365,
    retentionPeriod: 90,
    allowRestore: true,
    requireConfirmation: true,
    notifyOnArchive: true,
  });
  
  // Load finance data on mount
  useEffect(() => {
    if (activeTab === 'finance') {
      loadFinanceData();
    } else if (activeTab === 'security') {
      loadAuditLogs();
    } else if (activeTab === 'backup') {
      loadBackups();
    } else if (activeTab === 'integrations') {
      loadIntegrations();
    }
  }, [activeTab]);
  
  const loadFinanceData = async () => {
    try {
      // Load offering types
      const offeringTypesResponse = await fetch('/api/offering-types');
      const offeringTypesData = await offeringTypesResponse.json();
      if (offeringTypesData.success) {
        setOfferingTypes(offeringTypesData.data);
      }
      
      // Load expense categories
      const categoriesResponse = await fetch('/api/expense-categories');
      const categoriesData = await categoriesResponse.json();
      if (categoriesData.success) {
        setExpenseCategories(categoriesData.data);
      }
      
      // Load funds
      const fundsResponse = await fetch('/api/funds');
      const fundsData = await fundsResponse.json();
      if (fundsData.success) {
        setFunds(fundsData.data);
      }
    } catch (error) {
      console.error('Failed to load finance data:', error);
      showToast('error', 'Failed to load finance data');
    }
  };
  
  // Timezone options (common timezones)
  const timezoneOptions: SelectOption[] = [
    { value: 'Asia/Manila', label: 'Asia/Manila (PHT)' },
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'America/New York (EST)' },
    { value: 'America/Chicago', label: 'America/Chicago (CST)' },
    { value: 'America/Denver', label: 'America/Denver (MST)' },
    { value: 'America/Los_Angeles', label: 'America/Los Angeles (PST)' },
    { value: 'Europe/London', label: 'Europe/London (GMT)' },
    { value: 'Europe/Paris', label: 'Europe/Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Asia/Shanghai (CST)' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney (AEDT)' },
  ];
  
  const dateFormatOptions: SelectOption[] = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (12/31/2024)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/12/2024)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2024-12-31)' },
  ];
  
  const currencyOptions: SelectOption[] = [
    { value: 'PHP', label: 'PHP (₱) - Philippine Peso' },
    { value: 'USD', label: 'USD ($) - US Dollar' },
    { value: 'EUR', label: 'EUR (€) - Euro' },
    { value: 'GBP', label: 'GBP (£) - British Pound' },
    { value: 'JPY', label: 'JPY (¥) - Japanese Yen' },
  ];
  
  const themeOptions: SelectOption[] = [
    { value: 'Light', label: 'Light' },
    { value: 'Dark', label: 'Dark' },
  ];
  
  const languageOptions: SelectOption[] = [
    { value: 'English', label: 'English' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'Spanish', label: 'Spanish' },
  ];
  
  // Handle general settings save
  const handleSaveGeneralSettings = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await api.post('/settings/general', generalSettings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('success', 'Settings saved successfully');
    } catch (error) {
      showToast('error', 'Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle church info save
  const handleSaveChurchInfo = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await api.post('/settings/church-info', churchInfo);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('success', 'Church information saved successfully');
    } catch (error) {
      showToast('error', 'Failed to save church information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showToast('error', 'Please upload an image file');
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'Image size must be less than 2MB');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setChurchInfo({ ...churchInfo, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle logo removal
  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setChurchInfo({ ...churchInfo, logo: null });
  };
  
  // Finance Settings handlers
  const handleSaveFinanceSettings = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await api.post('/settings/finance', financeSettings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('success', 'Finance settings saved successfully');
    } catch (error) {
      showToast('error', 'Failed to save finance settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Offering Type handlers
  const handleAddOfferingType = async () => {
    if (!newOfferingType.name.trim()) {
      showToast('error', 'Please enter an offering type name');
      return;
    }
    
    try {
      const response = await fetch('/api/offering-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newOfferingType.name,
          description: newOfferingType.description,
          is_active: true,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setOfferingTypes([...offeringTypes, data.data]);
        setNewOfferingType({ name: '', description: '' });
        setShowAddOfferingType(false);
        showToast('success', 'Offering type added successfully');
      } else {
        showToast('error', data.message || 'Failed to add offering type');
      }
    } catch (error) {
      showToast('error', 'Failed to add offering type');
    }
  };
  
  const handleUpdateOfferingType = async (id: number, updates: Partial<OfferingType>) => {
    try {
      const response = await fetch(`/api/offering-types/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      if (data.success) {
        setOfferingTypes(offeringTypes.map(ot => ot.id === id ? data.data : ot));
        setEditingOfferingType(null);
        showToast('success', 'Offering type updated successfully');
      } else {
        showToast('error', data.message || 'Failed to update offering type');
      }
    } catch (error) {
      showToast('error', 'Failed to update offering type');
    }
  };
  
  const handleDeleteOfferingType = async (id: number) => {
    if (!confirm('Are you sure you want to delete this offering type?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/offering-types/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        setOfferingTypes(offeringTypes.filter(ot => ot.id !== id));
        showToast('success', 'Offering type deleted successfully');
      } else {
        showToast('error', data.message || 'Failed to delete offering type');
      }
    } catch (error) {
      showToast('error', 'Failed to delete offering type');
    }
  };
  
  // Expense Category handlers
  const handleAddExpenseCategory = async () => {
    if (!newExpenseCategory.name.trim()) {
      showToast('error', 'Please enter a category name');
      return;
    }
    
    try {
      const response = await fetch('/api/expense-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newExpenseCategory.name,
          description: newExpenseCategory.description,
          is_active: true,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setExpenseCategories([...expenseCategories, data.data]);
        setNewExpenseCategory({ name: '', description: '' });
        setShowAddExpenseCategory(false);
        showToast('success', 'Expense category added successfully');
      } else {
        showToast('error', data.message || 'Failed to add expense category');
      }
    } catch (error) {
      showToast('error', 'Failed to add expense category');
    }
  };
  
  const handleUpdateExpenseCategory = async (id: number, updates: Partial<ExpenseCategory>) => {
    try {
      const response = await fetch(`/api/expense-categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      if (data.success) {
        setExpenseCategories(expenseCategories.map(ec => ec.id === id ? data.data : ec));
        setEditingExpenseCategory(null);
        showToast('success', 'Expense category updated successfully');
      } else {
        showToast('error', data.message || 'Failed to update expense category');
      }
    } catch (error) {
      showToast('error', 'Failed to update expense category');
    }
  };
  
  const handleDeleteExpenseCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this expense category?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/expense-categories/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        setExpenseCategories(expenseCategories.filter(ec => ec.id !== id));
        showToast('success', 'Expense category deleted successfully');
      } else {
        showToast('error', data.message || 'Failed to delete expense category');
      }
    } catch (error) {
      showToast('error', 'Failed to delete expense category');
    }
  };
  
  // Fund handlers
  const handleAddFund = async () => {
    if (!newFund.name.trim()) {
      showToast('error', 'Please enter a fund name');
      return;
    }
    
    try {
      const response = await fetch('/api/funds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newFund.name,
          type: newFund.type,
          description: newFund.description,
          is_active: true,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setFunds([...funds, data.data]);
        setNewFund({ name: '', type: 'unrestricted', description: '' });
        setShowAddFund(false);
        showToast('success', 'Fund added successfully');
      } else {
        showToast('error', data.message || 'Failed to add fund');
      }
    } catch (error) {
      showToast('error', 'Failed to add fund');
    }
  };
  
  const handleUpdateFund = async (id: number, updates: Partial<Fund>) => {
    try {
      const response = await fetch(`/api/funds/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      if (data.success) {
        setFunds(funds.map(f => f.id === id ? data.data : f));
        setEditingFund(null);
        showToast('success', 'Fund updated successfully');
      } else {
        showToast('error', data.message || 'Failed to update fund');
      }
    } catch (error) {
      showToast('error', 'Failed to update fund');
    }
  };
  
  const handleDeleteFund = async (id: number) => {
    if (!confirm('Are you sure you want to delete this fund?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/funds/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        setFunds(funds.filter(f => f.id !== id));
        showToast('success', 'Fund deleted successfully');
      } else {
        showToast('error', data.message || 'Failed to delete fund');
      }
    } catch (error) {
      showToast('error', 'Failed to delete fund');
    }
  };
  
  // Email & Notifications handlers
  const handleSaveEmailNotificationSettings = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await api.post('/settings/email-notifications', emailNotificationSettings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('success', 'Email and notification settings saved successfully');
    } catch (error) {
      showToast('error', 'Failed to save email and notification settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSendTestEmail = async () => {
    // Validate SMTP settings
    if (!emailNotificationSettings.smtpHost || !emailNotificationSettings.smtpFromEmail) {
      showToast('error', 'Please configure SMTP settings before sending a test email');
      return;
    }
    
    setIsSendingTestEmail(true);
    try {
      // TODO: Replace with actual API call
      // await api.post('/settings/test-email', {
      //   smtpHost: emailNotificationSettings.smtpHost,
      //   smtpPort: emailNotificationSettings.smtpPort,
      //   smtpUsername: emailNotificationSettings.smtpUsername,
      //   smtpPassword: emailNotificationSettings.smtpPassword,
      //   smtpEncryption: emailNotificationSettings.smtpEncryption,
      //   smtpFromEmail: emailNotificationSettings.smtpFromEmail,
      //   smtpFromName: emailNotificationSettings.smtpFromName,
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('success', 'Test email sent successfully! Please check your inbox.');
    } catch (error) {
      showToast('error', 'Failed to send test email. Please check your SMTP configuration.');
    } finally {
      setIsSendingTestEmail(false);
    }
  };
  
  // Security Settings handlers
  const handleSaveSecuritySettings = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await api.post('/settings/security', securitySettings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('success', 'Security settings saved successfully');
    } catch (error) {
      showToast('error', 'Failed to save security settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const loadAuditLogs = async () => {
    setIsLoadingAuditLogs(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/settings/security/audit-logs?limit=10');
      // setAuditLogs(response.data);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockLogs: AuditLogEntry[] = [
        {
          id: 1,
          user: 'Admin User',
          action: 'Login',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          ipAddress: '192.168.1.100',
          details: 'Successful login',
        },
        {
          id: 2,
          user: 'John Doe',
          action: 'Password Changed',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          ipAddress: '192.168.1.101',
          details: 'User changed their password',
        },
        {
          id: 3,
          user: 'Jane Smith',
          action: 'Failed Login',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          ipAddress: '192.168.1.102',
          details: 'Invalid password attempt',
        },
        {
          id: 4,
          user: 'Admin User',
          action: 'Settings Changed',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          ipAddress: '192.168.1.100',
          details: 'Updated security settings',
        },
        {
          id: 5,
          user: 'System',
          action: 'Account Locked',
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          ipAddress: '192.168.1.103',
          details: 'Account locked due to multiple failed login attempts',
        },
      ];
      
      setAuditLogs(mockLogs);
    } catch (error) {
      console.error('Failed to load audit logs:', error);
      showToast('error', 'Failed to load audit logs');
    } finally {
      setIsLoadingAuditLogs(false);
    }
  };
  
  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return then.toLocaleDateString();
  };
  
  // Backup & Restore handlers
  const loadBackups = async () => {
    setIsLoadingBackups(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/settings/backups');
      // setBackups(response.data.backups);
      // setLastBackup(response.data.lastBackup);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockBackups: BackupEntry[] = [
        {
          id: 1,
          filename: 'backup_2024_01_15_020000.sql',
          size: '45.2 MB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          created_by: 'System (Automatic)',
          status: 'completed',
          type: 'automatic',
        },
        {
          id: 2,
          filename: 'backup_2024_01_14_020000.sql',
          size: '44.8 MB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          created_by: 'System (Automatic)',
          status: 'completed',
          type: 'automatic',
        },
        {
          id: 3,
          filename: 'backup_2024_01_13_153000.sql',
          size: '44.5 MB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
          created_by: 'Admin User',
          status: 'completed',
          type: 'manual',
        },
        {
          id: 4,
          filename: 'backup_2024_01_13_020000.sql',
          size: '44.3 MB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
          created_by: 'System (Automatic)',
          status: 'completed',
          type: 'automatic',
        },
        {
          id: 5,
          filename: 'backup_2024_01_12_020000.sql',
          size: '43.9 MB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
          created_by: 'System (Automatic)',
          status: 'completed',
          type: 'automatic',
        },
      ];
      
      setBackups(mockBackups);
      setLastBackup(mockBackups[0]);
    } catch (error) {
      console.error('Failed to load backups:', error);
      showToast('error', 'Failed to load backups');
    } finally {
      setIsLoadingBackups(false);
    }
  };
  
  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    try {
      // TODO: Replace with actual API call
      // await api.post('/settings/backups/create');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      showToast('success', 'Backup created successfully');
      loadBackups(); // Reload backup list
    } catch (error) {
      showToast('error', 'Failed to create backup. Please try again.');
    } finally {
      setIsCreatingBackup(false);
    }
  };
  
  const handleDownloadBackup = async (backup: BackupEntry) => {
    try {
      // TODO: Replace with actual API call
      // window.location.href = `/api/settings/backups/${backup.id}/download`;
      
      showToast('success', `Downloading ${backup.filename}...`);
    } catch (error) {
      showToast('error', 'Failed to download backup');
    }
  };
  
  const handleRestoreBackup = async (backup: BackupEntry) => {
    setRestoreConfirmation(backup);
  };
  
  const confirmRestore = async () => {
    if (!restoreConfirmation) return;
    
    try {
      // TODO: Replace with actual API call
      // await api.post(`/settings/backups/${restoreConfirmation.id}/restore`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('success', 'Database restored successfully. Please refresh the page.');
      setRestoreConfirmation(null);
    } catch (error) {
      showToast('error', 'Failed to restore backup. Please try again.');
    }
  };
  
  const handleDeleteBackup = async (backup: BackupEntry) => {
    if (!confirm(`Are you sure you want to delete backup "${backup.filename}"?`)) {
      return;
    }
    
    try {
      // TODO: Replace with actual API call
      // await api.delete(`/settings/backups/${backup.id}`);
      
      setBackups(backups.filter(b => b.id !== backup.id));
      showToast('success', 'Backup deleted successfully');
    } catch (error) {
      showToast('error', 'Failed to delete backup');
    }
  };
  
  const handleSaveBackupSettings = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await api.post('/settings/backup-settings', backupSettings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('success', 'Backup settings saved successfully');
    } catch (error) {
      showToast('error', 'Failed to save backup settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Integrations handlers
  const loadIntegrations = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/settings/integrations');
      // setIntegrations(response.data);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockIntegrations: Integration[] = [
        {
          id: 'stripe',
          name: 'Stripe',
          description: 'Accept online payments and donations',
          category: 'payment',
          icon: CreditCard,
          status: 'disconnected',
          isConfigured: false,
        },
        {
          id: 'paypal',
          name: 'PayPal',
          description: 'Process payments through PayPal',
          category: 'payment',
          icon: DollarSign,
          status: 'disconnected',
          isConfigured: false,
        },
        {
          id: 'mailchimp',
          name: 'Mailchimp',
          description: 'Email marketing and newsletters',
          category: 'email',
          icon: Mail,
          status: 'connected',
          isConfigured: true,
          apiKey: '••••••••••••••••••••1234',
          lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: 'sendgrid',
          name: 'SendGrid',
          description: 'Transactional email service',
          category: 'email',
          icon: Send,
          status: 'disconnected',
          isConfigured: false,
        },
        {
          id: 'google-calendar',
          name: 'Google Calendar',
          description: 'Sync events with Google Calendar',
          category: 'calendar',
          icon: Calendar,
          status: 'connected',
          isConfigured: true,
          lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
        {
          id: 'zoom',
          name: 'Zoom',
          description: 'Video conferencing for online services',
          category: 'communication',
          icon: Video,
          status: 'disconnected',
          isConfigured: false,
        },
        {
          id: 'slack',
          name: 'Slack',
          description: 'Team communication and notifications',
          category: 'communication',
          icon: MessageSquare,
          status: 'error',
          isConfigured: true,
          apiKey: '••••••••••••••••••••5678',
        },
        {
          id: 'twilio',
          name: 'Twilio',
          description: 'SMS notifications and reminders',
          category: 'communication',
          icon: MessageSquare,
          status: 'disconnected',
          isConfigured: false,
        },
      ];
      
      setIntegrations(mockIntegrations);
    } catch (error) {
      console.error('Failed to load integrations:', error);
      showToast('error', 'Failed to load integrations');
    }
  };
  
  const handleConfigureIntegration = (integration: Integration) => {
    setConfiguringIntegration(integration);
    setIntegrationConfig({
      apiKey: integration.apiKey?.replace(/•/g, '') || '',
      apiSecret: '',
      webhookUrl: '',
      additionalSettings: integration.config || {},
    });
    setShowApiKey(false);
  };
  
  const handleSaveIntegrationConfig = async () => {
    if (!configuringIntegration) return;
    
    if (!integrationConfig.apiKey.trim()) {
      showToast('error', 'Please enter an API key');
      return;
    }
    
    setIsSavingIntegration(true);
    try {
      // TODO: Replace with actual API call
      // await api.post(`/settings/integrations/${configuringIntegration.id}/configure`, integrationConfig);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update integration status
      setIntegrations(integrations.map(int => 
        int.id === configuringIntegration.id
          ? {
              ...int,
              status: 'connected',
              isConfigured: true,
              apiKey: '••••••••••••••••••••' + integrationConfig.apiKey.slice(-4),
              lastSync: new Date().toISOString(),
            }
          : int
      ));
      
      setConfiguringIntegration(null);
      showToast('success', `${configuringIntegration.name} configured successfully`);
    } catch (error) {
      showToast('error', 'Failed to save integration configuration');
    } finally {
      setIsSavingIntegration(false);
    }
  };
  
  const handleDisconnectIntegration = async (integration: Integration) => {
    if (!confirm(`Are you sure you want to disconnect ${integration.name}?`)) {
      return;
    }
    
    try {
      // TODO: Replace with actual API call
      // await api.post(`/settings/integrations/${integration.id}/disconnect`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIntegrations(integrations.map(int =>
        int.id === integration.id
          ? {
              ...int,
              status: 'disconnected',
              isConfigured: false,
              apiKey: undefined,
              lastSync: undefined,
            }
          : int
      ));
      
      showToast('success', `${integration.name} disconnected successfully`);
    } catch (error) {
      showToast('error', 'Failed to disconnect integration');
    }
  };
  
  const handleTestIntegration = async (integration: Integration) => {
    try {
      // TODO: Replace with actual API call
      // await api.post(`/settings/integrations/${integration.id}/test`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast('success', `${integration.name} connection test successful`);
    } catch (error) {
      showToast('error', 'Connection test failed. Please check your configuration.');
    }
  };
  
  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-error-600" />;
      case 'disconnected':
      default:
        return <AlertCircle className="h-5 w-5 text-neutral-400" />;
    }
  };
  
  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <Badge variant="success">Connected</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
      case 'disconnected':
      default:
        return <Badge variant="neutral">Disconnected</Badge>;
    }
  };
  
  const getCategoryLabel = (category: Integration['category']) => {
    switch (category) {
      case 'payment':
        return 'Payment Gateways';
      case 'email':
        return 'Email Services';
      case 'calendar':
        return 'Calendar Sync';
      case 'communication':
        return 'Communication';
      case 'storage':
        return 'Storage';
      default:
        return 'Other';
    }
  };

  const tabs: TabConfig[] = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'church-info', label: 'Church Information', icon: Building2 },
    { id: 'finance', label: 'Finance Settings', icon: DollarSign },
    { id: 'email-notifications', label: 'Email & Notifications', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'backup', label: 'Backup & Restore', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'archive', label: 'Archive Settings', icon: Archive },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">General Settings</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Configure application preferences and display settings.
              </p>
            </div>
            
            {/* Application Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Application Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Application Name"
                  placeholder="MFMC System"
                  value={generalSettings.appName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, appName: e.target.value })}
                  helperText="The name displayed in the application header"
                />
                
                <Select
                  label="Timezone"
                  options={timezoneOptions}
                  value={generalSettings.timezone}
                  onChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value as string })}
                  searchable
                  helperText="Select your local timezone"
                />
                
                <Select
                  label="Date Format"
                  options={dateFormatOptions}
                  value={generalSettings.dateFormat}
                  onChange={(value) => setGeneralSettings({ ...generalSettings, dateFormat: value as string })}
                  helperText="How dates are displayed throughout the system"
                />
                
                <Select
                  label="Currency"
                  options={currencyOptions}
                  value={generalSettings.currency}
                  onChange={(value) => setGeneralSettings({ ...generalSettings, currency: value as string })}
                  searchable
                  helperText="Default currency for financial transactions"
                />
              </div>
            </div>
            
            {/* Display Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Display Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Theme"
                  options={themeOptions}
                  value={generalSettings.theme}
                  onChange={(value) => setGeneralSettings({ ...generalSettings, theme: value as string })}
                  helperText="Choose your preferred color theme"
                />
                
                <Select
                  label="Language"
                  options={languageOptions}
                  value={generalSettings.language}
                  onChange={(value) => setGeneralSettings({ ...generalSettings, language: value as string })}
                  helperText="Select your preferred language"
                />
                
                <Input
                  type="number"
                  label="Items Per Page"
                  value={generalSettings.itemsPerPage.toString()}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, itemsPerPage: parseInt(e.target.value) || 25 })}
                  helperText="Number of items to display in tables (10-100)"
                  min={10}
                  max={100}
                />
              </div>
            </div>
            
            {/* Feature Flags Section */}
            <div className="space-y-4">
              <FeatureFlagAdminPanel />
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-neutral-200">
              <Button
                onClick={handleSaveGeneralSettings}
                loading={isSaving}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </div>
        );
      case 'church-info':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Church Information</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Manage your church's basic information and contact details.
              </p>
            </div>
            
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Church Name"
                  placeholder="My First Miracle Church"
                  value={churchInfo.churchName}
                  onChange={(e) => setChurchInfo({ ...churchInfo, churchName: e.target.value })}
                  required
                  helperText="Official name of your church"
                />
                
                <Input
                  label="Denomination"
                  placeholder="Non-denominational"
                  value={churchInfo.denomination}
                  onChange={(e) => setChurchInfo({ ...churchInfo, denomination: e.target.value })}
                  helperText="Church denomination or affiliation"
                />
                
                <Input
                  type="number"
                  label="Founded Year"
                  placeholder="2010"
                  value={churchInfo.foundedYear}
                  onChange={(e) => setChurchInfo({ ...churchInfo, foundedYear: e.target.value })}
                  min={1900}
                  max={new Date().getFullYear()}
                  helperText="Year the church was established"
                />
              </div>
            </div>
            
            {/* Contact Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    placeholder="123 Church Street, Manila, Philippines"
                    value={churchInfo.address}
                    onChange={(e) => setChurchInfo({ ...churchInfo, address: e.target.value })}
                    helperText="Physical address of the church"
                  />
                </div>
                
                <Input
                  type="tel"
                  label="Phone"
                  placeholder="+63 912 345 6789"
                  value={churchInfo.phone}
                  onChange={(e) => setChurchInfo({ ...churchInfo, phone: e.target.value })}
                  helperText="Primary contact phone number"
                />
                
                <Input
                  type="email"
                  label="Email"
                  placeholder="info@mfmc.church"
                  value={churchInfo.email}
                  onChange={(e) => setChurchInfo({ ...churchInfo, email: e.target.value })}
                  helperText="Primary contact email address"
                />
                
                <div className="md:col-span-2">
                  <Input
                    type="url"
                    label="Website"
                    placeholder="https://www.mfmc.church"
                    value={churchInfo.website}
                    onChange={(e) => setChurchInfo({ ...churchInfo, website: e.target.value })}
                    helperText="Church website URL"
                  />
                </div>
              </div>
            </div>
            
            {/* Social Media Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Social Media
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="url"
                  label="Facebook"
                  placeholder="https://facebook.com/mfmc"
                  value={churchInfo.facebook}
                  onChange={(e) => setChurchInfo({ ...churchInfo, facebook: e.target.value })}
                  helperText="Facebook page URL"
                />
                
                <Input
                  type="url"
                  label="Twitter"
                  placeholder="https://twitter.com/mfmc"
                  value={churchInfo.twitter}
                  onChange={(e) => setChurchInfo({ ...churchInfo, twitter: e.target.value })}
                  helperText="Twitter profile URL"
                />
                
                <Input
                  type="url"
                  label="Instagram"
                  placeholder="https://instagram.com/mfmc"
                  value={churchInfo.instagram}
                  onChange={(e) => setChurchInfo({ ...churchInfo, instagram: e.target.value })}
                  helperText="Instagram profile URL"
                />
                
                <Input
                  type="url"
                  label="YouTube"
                  placeholder="https://youtube.com/@mfmc"
                  value={churchInfo.youtube}
                  onChange={(e) => setChurchInfo({ ...churchInfo, youtube: e.target.value })}
                  helperText="YouTube channel URL"
                />
              </div>
            </div>
            
            {/* Branding Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Branding
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Church Logo
                  </label>
                  
                  {logoPreview || churchInfo.logo ? (
                    <div className="relative inline-block">
                      <img
                        src={logoPreview || churchInfo.logo || ''}
                        alt="Church logo preview"
                        className="w-32 h-32 object-contain border-2 border-neutral-200 rounded-lg bg-neutral-50"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="absolute -top-2 -right-2 bg-error-600 text-white rounded-full p-1 hover:bg-error-700 transition-colors"
                        aria-label="Remove logo"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-neutral-400" />
                        <p className="mt-1 text-xs text-neutral-500">No logo</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <span className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </span>
                    </label>
                  </div>
                  
                  <p className="text-xs text-neutral-500">
                    Recommended: Square image, max 2MB
                  </p>
                </div>
                
                {/* Primary Color Picker */}
                <div className="space-y-2">
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-neutral-700">
                    Primary Color
                  </label>
                  
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      id="primaryColor"
                      value={churchInfo.primaryColor}
                      onChange={(e) => setChurchInfo({ ...churchInfo, primaryColor: e.target.value })}
                      className="h-12 w-20 rounded-lg border-2 border-neutral-300 cursor-pointer"
                    />
                    
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={churchInfo.primaryColor}
                        onChange={(e) => setChurchInfo({ ...churchInfo, primaryColor: e.target.value })}
                        placeholder="#0ea5e9"
                        pattern="^#[0-9A-Fa-f]{6}$"
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-neutral-500">
                    Primary brand color used throughout the system
                  </p>
                  
                  {/* Color Preview */}
                  <div className="mt-4 p-4 rounded-lg border border-neutral-200 bg-neutral-50">
                    <p className="text-xs font-medium text-neutral-700 mb-2">Preview:</p>
                    <div className="flex gap-2">
                      <div
                        className="w-12 h-12 rounded-lg shadow-sm"
                        style={{ backgroundColor: churchInfo.primaryColor }}
                      />
                      <div
                        className="w-12 h-12 rounded-lg shadow-sm opacity-75"
                        style={{ backgroundColor: churchInfo.primaryColor }}
                      />
                      <div
                        className="w-12 h-12 rounded-lg shadow-sm opacity-50"
                        style={{ backgroundColor: churchInfo.primaryColor }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-neutral-200">
              <Button
                onClick={handleSaveChurchInfo}
                loading={isSaving}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </div>
        );
      case 'finance':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Finance Settings</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Configure finance-related settings, categories, and approval workflows.
              </p>
            </div>
            
            {/* Default Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Default Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Default Offering Type"
                  options={offeringTypes.filter(ot => ot.is_active).map(ot => ({ value: ot.id.toString(), label: ot.name }))}
                  value={financeSettings.defaultOfferingType}
                  onChange={(value) => setFinanceSettings({ ...financeSettings, defaultOfferingType: value as string })}
                  helperText="Default offering type for new offerings"
                />
                
                <Select
                  label="Default Expense Category"
                  options={expenseCategories.filter(ec => ec.is_active).map(ec => ({ value: ec.id.toString(), label: ec.name }))}
                  value={financeSettings.defaultExpenseCategory}
                  onChange={(value) => setFinanceSettings({ ...financeSettings, defaultExpenseCategory: value as string })}
                  helperText="Default category for new expenses"
                />
                
                <Select
                  label="Default Fund"
                  options={funds.filter(f => f.is_active).map(f => ({ value: f.id.toString(), label: f.name }))}
                  value={financeSettings.defaultFund}
                  onChange={(value) => setFinanceSettings({ ...financeSettings, defaultFund: value as string })}
                  helperText="Default fund for transactions"
                />
              </div>
            </div>
            
            {/* Budget Period Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Budget Period Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Fiscal Year Start Month"
                  options={[
                    { value: '1', label: 'January' },
                    { value: '2', label: 'February' },
                    { value: '3', label: 'March' },
                    { value: '4', label: 'April' },
                    { value: '5', label: 'May' },
                    { value: '6', label: 'June' },
                    { value: '7', label: 'July' },
                    { value: '8', label: 'August' },
                    { value: '9', label: 'September' },
                    { value: '10', label: 'October' },
                    { value: '11', label: 'November' },
                    { value: '12', label: 'December' },
                  ]}
                  value={financeSettings.fiscalYearStart}
                  onChange={(value) => setFinanceSettings({ ...financeSettings, fiscalYearStart: value as string })}
                  helperText="Month when your fiscal year begins"
                />
              </div>
            </div>
            
            {/* Approval Workflow Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Approval Workflow Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requireApproval"
                    checked={financeSettings.requireApproval}
                    onChange={(e) => setFinanceSettings({ ...financeSettings, requireApproval: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="requireApproval" className="ml-2 block text-sm text-neutral-700">
                    Require approval for expenses
                  </label>
                </div>
                
                {financeSettings.requireApproval && (
                  <div className="ml-6">
                    <Input
                      type="number"
                      label="Approval Threshold"
                      value={financeSettings.approvalThreshold.toString()}
                      onChange={(e) => setFinanceSettings({ ...financeSettings, approvalThreshold: parseFloat(e.target.value) || 0 })}
                      helperText="Expenses above this amount require approval"
                      min={0}
                      step={100}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Offering Types Management Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <h3 className="text-lg font-medium text-neutral-900">
                  Offering Types
                </h3>
                <Button
                  size="sm"
                  onClick={() => setShowAddOfferingType(!showAddOfferingType)}
                  icon={<Plus className="h-4 w-4" />}
                >
                  Add Offering Type
                </Button>
              </div>
              
              {showAddOfferingType && (
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-3">
                  <Input
                    label="Name"
                    placeholder="e.g., Tithes, Special Offering"
                    value={newOfferingType.name}
                    onChange={(e) => setNewOfferingType({ ...newOfferingType, name: e.target.value })}
                  />
                  <Input
                    label="Description (Optional)"
                    placeholder="Brief description"
                    value={newOfferingType.description}
                    onChange={(e) => setNewOfferingType({ ...newOfferingType, description: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddOfferingType}>
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowAddOfferingType(false);
                        setNewOfferingType({ name: '', description: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                {offeringTypes.map((offeringType) => (
                  <div
                    key={offeringType.id}
                    className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    {editingOfferingType?.id === offeringType.id ? (
                      <div className="flex-1 space-y-2">
                        <Input
                          value={editingOfferingType.name}
                          onChange={(e) => setEditingOfferingType({ ...editingOfferingType, name: e.target.value })}
                        />
                        <Input
                          value={editingOfferingType.description || ''}
                          onChange={(e) => setEditingOfferingType({ ...editingOfferingType, description: e.target.value })}
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateOfferingType(offeringType.id, editingOfferingType)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingOfferingType(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-neutral-900">{offeringType.name}</span>
                            <Badge variant={offeringType.is_active ? 'success' : 'neutral'}>
                              {offeringType.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          {offeringType.description && (
                            <p className="text-sm text-neutral-600 mt-1">{offeringType.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateOfferingType(offeringType.id, { is_active: !offeringType.is_active })}
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            {offeringType.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => setEditingOfferingType(offeringType)}
                            className="p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                            aria-label="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOfferingType(offeringType.id)}
                            className="p-2 text-neutral-600 hover:text-error-600 transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {offeringTypes.length === 0 && (
                  <p className="text-sm text-neutral-500 text-center py-4">
                    No offering types configured. Add one to get started.
                  </p>
                )}
              </div>
            </div>
            
            {/* Expense Categories Management Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <h3 className="text-lg font-medium text-neutral-900">
                  Expense Categories
                </h3>
                <Button
                  size="sm"
                  onClick={() => setShowAddExpenseCategory(!showAddExpenseCategory)}
                  icon={<Plus className="h-4 w-4" />}
                >
                  Add Category
                </Button>
              </div>
              
              {showAddExpenseCategory && (
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-3">
                  <Input
                    label="Name"
                    placeholder="e.g., Utilities, Salaries"
                    value={newExpenseCategory.name}
                    onChange={(e) => setNewExpenseCategory({ ...newExpenseCategory, name: e.target.value })}
                  />
                  <Input
                    label="Description (Optional)"
                    placeholder="Brief description"
                    value={newExpenseCategory.description}
                    onChange={(e) => setNewExpenseCategory({ ...newExpenseCategory, description: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddExpenseCategory}>
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowAddExpenseCategory(false);
                        setNewExpenseCategory({ name: '', description: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                {expenseCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    {editingExpenseCategory?.id === category.id ? (
                      <div className="flex-1 space-y-2">
                        <Input
                          value={editingExpenseCategory.name}
                          onChange={(e) => setEditingExpenseCategory({ ...editingExpenseCategory, name: e.target.value })}
                        />
                        <Input
                          value={editingExpenseCategory.description || ''}
                          onChange={(e) => setEditingExpenseCategory({ ...editingExpenseCategory, description: e.target.value })}
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateExpenseCategory(category.id, editingExpenseCategory)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingExpenseCategory(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-neutral-900">{category.name}</span>
                            <Badge variant={category.is_active ? 'success' : 'neutral'}>
                              {category.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          {category.description && (
                            <p className="text-sm text-neutral-600 mt-1">{category.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateExpenseCategory(category.id, { is_active: !category.is_active })}
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            {category.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => setEditingExpenseCategory(category)}
                            className="p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                            aria-label="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExpenseCategory(category.id)}
                            className="p-2 text-neutral-600 hover:text-error-600 transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {expenseCategories.length === 0 && (
                  <p className="text-sm text-neutral-500 text-center py-4">
                    No expense categories configured. Add one to get started.
                  </p>
                )}
              </div>
            </div>
            
            {/* Funds Management Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <h3 className="text-lg font-medium text-neutral-900">
                  Funds
                </h3>
                <Button
                  size="sm"
                  onClick={() => setShowAddFund(!showAddFund)}
                  icon={<Plus className="h-4 w-4" />}
                >
                  Add Fund
                </Button>
              </div>
              
              {showAddFund && (
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-3">
                  <Input
                    label="Name"
                    placeholder="e.g., General Fund, Building Fund"
                    value={newFund.name}
                    onChange={(e) => setNewFund({ ...newFund, name: e.target.value })}
                  />
                  <Select
                    label="Type"
                    options={[
                      { value: 'unrestricted', label: 'Unrestricted' },
                      { value: 'restricted', label: 'Restricted' },
                    ]}
                    value={newFund.type}
                    onChange={(value) => setNewFund({ ...newFund, type: value as 'restricted' | 'unrestricted' })}
                  />
                  <Input
                    label="Description (Optional)"
                    placeholder="Brief description"
                    value={newFund.description}
                    onChange={(e) => setNewFund({ ...newFund, description: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddFund}>
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowAddFund(false);
                        setNewFund({ name: '', type: 'unrestricted', description: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                {funds.map((fund) => (
                  <div
                    key={fund.id}
                    className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    {editingFund?.id === fund.id ? (
                      <div className="flex-1 space-y-2">
                        <Input
                          value={editingFund.name}
                          onChange={(e) => setEditingFund({ ...editingFund, name: e.target.value })}
                        />
                        <Select
                          label="Type"
                          options={[
                            { value: 'unrestricted', label: 'Unrestricted' },
                            { value: 'restricted', label: 'Restricted' },
                          ]}
                          value={editingFund.type}
                          onChange={(value) => setEditingFund({ ...editingFund, type: value as 'restricted' | 'unrestricted' })}
                        />
                        <Input
                          value={editingFund.description || ''}
                          onChange={(e) => setEditingFund({ ...editingFund, description: e.target.value })}
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateFund(fund.id, editingFund)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingFund(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-neutral-900">{fund.name}</span>
                            <Badge variant={fund.type === 'restricted' ? 'warning' : 'primary'}>
                              {fund.type}
                            </Badge>
                            <Badge variant={fund.is_active ? 'success' : 'neutral'}>
                              {fund.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          {fund.description && (
                            <p className="text-sm text-neutral-600 mt-1">{fund.description}</p>
                          )}
                          <p className="text-sm text-neutral-500 mt-1">
                            Balance: ₱{parseFloat(fund.current_balance).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateFund(fund.id, { is_active: !fund.is_active })}
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            {fund.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => setEditingFund(fund)}
                            className="p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                            aria-label="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFund(fund.id)}
                            className="p-2 text-neutral-600 hover:text-error-600 transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {funds.length === 0 && (
                  <p className="text-sm text-neutral-500 text-center py-4">
                    No funds configured. Add one to get started.
                  </p>
                )}
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-neutral-200">
              <Button
                onClick={handleSaveFinanceSettings}
                loading={isSaving}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </div>
        );
      case 'email-notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Email & Notifications</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Configure email settings and notification preferences.
              </p>
            </div>
            
            {/* SMTP Configuration Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                SMTP Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="SMTP Host"
                  placeholder="smtp.gmail.com"
                  value={emailNotificationSettings.smtpHost}
                  onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, smtpHost: e.target.value })}
                  helperText="Your email server hostname"
                  required
                />
                
                <Input
                  type="number"
                  label="SMTP Port"
                  placeholder="587"
                  value={emailNotificationSettings.smtpPort}
                  onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, smtpPort: e.target.value })}
                  helperText="Common ports: 587 (TLS), 465 (SSL), 25 (None)"
                  required
                />
                
                <Input
                  label="SMTP Username"
                  placeholder="your-email@example.com"
                  value={emailNotificationSettings.smtpUsername}
                  onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, smtpUsername: e.target.value })}
                  helperText="Your email account username"
                />
                
                <div className="relative">
                  <Input
                    type={showSmtpPassword ? 'text' : 'password'}
                    label="SMTP Password"
                    placeholder="••••••••"
                    value={emailNotificationSettings.smtpPassword}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, smtpPassword: e.target.value })}
                    helperText="Your email account password or app password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                    className="absolute right-3 top-8 text-neutral-500 hover:text-neutral-700"
                    aria-label={showSmtpPassword ? 'Hide password' : 'Show password'}
                  >
                    {showSmtpPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <Select
                  label="Encryption"
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'tls', label: 'TLS' },
                    { value: 'ssl', label: 'SSL' },
                  ]}
                  value={emailNotificationSettings.smtpEncryption}
                  onChange={(value) => setEmailNotificationSettings({ ...emailNotificationSettings, smtpEncryption: value as 'none' | 'tls' | 'ssl' })}
                  helperText="Encryption method for secure connection"
                />
                
                <Input
                  type="email"
                  label="From Email"
                  placeholder="noreply@mfmc.church"
                  value={emailNotificationSettings.smtpFromEmail}
                  onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, smtpFromEmail: e.target.value })}
                  helperText="Email address shown as sender"
                  required
                />
                
                <Input
                  label="From Name"
                  placeholder="MFMC System"
                  value={emailNotificationSettings.smtpFromName}
                  onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, smtpFromName: e.target.value })}
                  helperText="Name shown as sender"
                />
              </div>
              
              {/* Test Email Button */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleSendTestEmail}
                  loading={isSendingTestEmail}
                  disabled={isSendingTestEmail || !emailNotificationSettings.smtpHost || !emailNotificationSettings.smtpFromEmail}
                  icon={<Send className="h-4 w-4" />}
                >
                  Send Test Email
                </Button>
                <p className="text-sm text-neutral-500">
                  Send a test email to verify your SMTP configuration
                </p>
              </div>
            </div>
            
            {/* Notification Preferences Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Notification Preferences
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div>
                    <label htmlFor="enableEmailNotifications" className="block text-sm font-medium text-neutral-900">
                      Email Notifications
                    </label>
                    <p className="text-sm text-neutral-600">
                      Receive notifications via email
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="enableEmailNotifications"
                    checked={emailNotificationSettings.enableEmailNotifications}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, enableEmailNotifications: e.target.checked })}
                    className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div>
                    <label htmlFor="enableInAppNotifications" className="block text-sm font-medium text-neutral-900">
                      In-App Notifications
                    </label>
                    <p className="text-sm text-neutral-600">
                      Receive notifications within the application
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="enableInAppNotifications"
                    checked={emailNotificationSettings.enableInAppNotifications}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, enableInAppNotifications: e.target.checked })}
                    className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* Notification Types Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Notification Types
              </h3>
              <p className="text-sm text-neutral-600">
                Choose which events trigger notifications
              </p>
              
              <div className="space-y-2">
                {/* Members Notifications */}
                <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <label htmlFor="notifyNewMember" className="block text-sm font-medium text-neutral-900">
                      New Member
                    </label>
                    <p className="text-xs text-neutral-600">
                      Notify when a new member is added to the system
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyNewMember"
                    checked={emailNotificationSettings.notifyNewMember}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, notifyNewMember: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                
                {/* Events Notifications */}
                <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <label htmlFor="notifyEventReminder" className="block text-sm font-medium text-neutral-900">
                      Event Reminder
                    </label>
                    <p className="text-xs text-neutral-600">
                      Send reminders for upcoming events
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyEventReminder"
                    checked={emailNotificationSettings.notifyEventReminder}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, notifyEventReminder: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                
                {/* Finance Notifications */}
                <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <label htmlFor="notifyFinanceApproval" className="block text-sm font-medium text-neutral-900">
                      Finance Approval
                    </label>
                    <p className="text-xs text-neutral-600">
                      Notify when expenses require approval
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyFinanceApproval"
                    checked={emailNotificationSettings.notifyFinanceApproval}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, notifyFinanceApproval: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <label htmlFor="notifyExpenseSubmitted" className="block text-sm font-medium text-neutral-900">
                      Expense Submitted
                    </label>
                    <p className="text-xs text-neutral-600">
                      Notify when a new expense is submitted
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyExpenseSubmitted"
                    checked={emailNotificationSettings.notifyExpenseSubmitted}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, notifyExpenseSubmitted: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <label htmlFor="notifyOfferingRecorded" className="block text-sm font-medium text-neutral-900">
                      Offering Recorded
                    </label>
                    <p className="text-xs text-neutral-600">
                      Notify when offerings are recorded
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyOfferingRecorded"
                    checked={emailNotificationSettings.notifyOfferingRecorded}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, notifyOfferingRecorded: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <label htmlFor="notifyBudgetThreshold" className="block text-sm font-medium text-neutral-900">
                      Budget Threshold
                    </label>
                    <p className="text-xs text-neutral-600">
                      Notify when budget reaches threshold (80%, 90%, 100%)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyBudgetThreshold"
                    checked={emailNotificationSettings.notifyBudgetThreshold}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, notifyBudgetThreshold: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                
                {/* User Management Notifications */}
                <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <label htmlFor="notifyUserInvite" className="block text-sm font-medium text-neutral-900">
                      User Invite
                    </label>
                    <p className="text-xs text-neutral-600">
                      Notify when a new user is invited to the system
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifyUserInvite"
                    checked={emailNotificationSettings.notifyUserInvite}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, notifyUserInvite: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
                
                {/* System Notifications */}
                <div className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div>
                    <label htmlFor="notifySystemUpdate" className="block text-sm font-medium text-neutral-900">
                      System Update
                    </label>
                    <p className="text-xs text-neutral-600">
                      Notify about system updates and maintenance
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="notifySystemUpdate"
                    checked={emailNotificationSettings.notifySystemUpdate}
                    onChange={(e) => setEmailNotificationSettings({ ...emailNotificationSettings, notifySystemUpdate: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-neutral-200">
              <Button
                onClick={handleSaveEmailNotificationSettings}
                loading={isSaving}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Security</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Manage security settings, password policies, and authentication options.
              </p>
            </div>
            
            {/* Password Policy Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Password Policy
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Minimum Password Length"
                  value={securitySettings.minPasswordLength.toString()}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, minPasswordLength: parseInt(e.target.value) || 8 })}
                  helperText="Minimum number of characters required (8-32)"
                  min={8}
                  max={32}
                />
                
                <Input
                  type="number"
                  label="Password Expiry (Days)"
                  value={securitySettings.passwordExpiryDays.toString()}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiryDays: parseInt(e.target.value) || 90 })}
                  helperText="Days before password must be changed (0 = never)"
                  min={0}
                  max={365}
                />
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-neutral-700">Complexity Requirements</p>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireUppercase"
                      checked={securitySettings.requireUppercase}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, requireUppercase: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="requireUppercase" className="ml-2 block text-sm text-neutral-700">
                      Require at least one uppercase letter (A-Z)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireLowercase"
                      checked={securitySettings.requireLowercase}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, requireLowercase: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="requireLowercase" className="ml-2 block text-sm text-neutral-700">
                      Require at least one lowercase letter (a-z)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireNumbers"
                      checked={securitySettings.requireNumbers}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, requireNumbers: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="requireNumbers" className="ml-2 block text-sm text-neutral-700">
                      Require at least one number (0-9)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireSpecialChars"
                      checked={securitySettings.requireSpecialChars}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, requireSpecialChars: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-neutral-700">
                      Require at least one special character (!@#$%^&*)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Session Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Session Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Session Timeout (Minutes)"
                  value={securitySettings.sessionTimeout.toString()}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) || 30 })}
                  helperText="Automatically log out inactive users after this time"
                  min={5}
                  max={1440}
                />
              </div>
              
              <div className="bg-info-50 border border-info-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-info-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-info-800">
                      Users will be automatically logged out after {securitySettings.sessionTimeout} minutes of inactivity. 
                      They will receive a warning 2 minutes before timeout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Two-Factor Authentication Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Two-Factor Authentication
              </h3>
              
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div>
                  <label htmlFor="enable2FA" className="block text-sm font-medium text-neutral-900">
                    Enable Two-Factor Authentication
                  </label>
                  <p className="text-sm text-neutral-600 mt-1">
                    Require users to verify their identity with a second factor (email or authenticator app)
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="enable2FA"
                  checked={securitySettings.enable2FA}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, enable2FA: e.target.checked })}
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
              </div>
              
              {securitySettings.enable2FA && (
                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-success-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-success-800">
                        Two-factor authentication is enabled. Users will be prompted to set up 2FA on their next login.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Login Security Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Login Security
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Maximum Login Attempts"
                  value={securitySettings.maxLoginAttempts.toString()}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: parseInt(e.target.value) || 5 })}
                  helperText="Lock account after this many failed login attempts"
                  min={3}
                  max={10}
                />
                
                <Input
                  type="number"
                  label="Lockout Duration (Minutes)"
                  value={securitySettings.lockoutDuration.toString()}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, lockoutDuration: parseInt(e.target.value) || 15 })}
                  helperText="How long to lock the account after max attempts"
                  min={5}
                  max={1440}
                />
              </div>
              
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-warning-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-warning-800">
                      After {securitySettings.maxLoginAttempts} failed login attempts, the account will be locked for {securitySettings.lockoutDuration} minutes.
                      Administrators can manually unlock accounts from the Users page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Audit Log Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <h3 className="text-lg font-medium text-neutral-900">
                  Security Audit Log
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={loadAuditLogs}
                  loading={isLoadingAuditLogs}
                  disabled={isLoadingAuditLogs}
                >
                  Refresh
                </Button>
              </div>
              
              <p className="text-sm text-neutral-600">
                Recent security-related events (last 10 entries)
              </p>
              
              {isLoadingAuditLogs ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  <p className="mt-2 text-sm text-neutral-600">Loading audit logs...</p>
                </div>
              ) : auditLogs.length > 0 ? (
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-neutral-900">{log.user}</span>
                          <Badge variant={
                            log.action.includes('Failed') || log.action.includes('Locked') 
                              ? 'error' 
                              : log.action.includes('Login') 
                              ? 'success' 
                              : 'neutral'
                          }>
                            {log.action}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-600 mt-1">{log.details}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
                          <span>{formatRelativeTime(log.timestamp)}</span>
                          <span>IP: {log.ipAddress}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-neutral-50 rounded-lg border border-neutral-200">
                  <Shield className="mx-auto h-12 w-12 text-neutral-400" />
                  <p className="mt-2 text-sm text-neutral-600">No audit logs available</p>
                </div>
              )}
              
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // TODO: Navigate to full Activity Log page
                    showToast('info', 'View full activity log in the Activity Log page');
                  }}
                >
                  View Full Activity Log
                </Button>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-neutral-200">
              <Button
                onClick={handleSaveSecuritySettings}
                loading={isSaving}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </div>
        );
      case 'backup':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Backup & Restore</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Manage database backups and restoration.
              </p>
            </div>
            
            {/* Last Backup Info Card */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 border border-primary-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-600 rounded-lg">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Last Backup</h3>
                    {lastBackup ? (
                      <>
                        <p className="text-sm text-neutral-600 mt-1">
                          {new Date(lastBackup.created_at).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-neutral-700">
                            <HardDrive className="h-4 w-4" />
                            <span>{lastBackup.size}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-neutral-700">
                            <Clock className="h-4 w-4" />
                            <span>{formatRelativeTime(lastBackup.created_at)}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-neutral-600 mt-1">No backups available</p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleCreateBackup}
                  loading={isCreatingBackup}
                  disabled={isCreatingBackup}
                  icon={<Download className="h-4 w-4" />}
                >
                  Create Backup Now
                </Button>
              </div>
            </div>
            
            {/* Automatic Backup Schedule Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Automatic Backup Schedule
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableAutoBackup"
                    checked={backupSettings.enableAutoBackup}
                    onChange={(e) => setBackupSettings({ ...backupSettings, enableAutoBackup: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="enableAutoBackup" className="ml-2 block text-sm text-neutral-700">
                    Enable automatic backups
                  </label>
                </div>
                
                {backupSettings.enableAutoBackup && (
                  <div className="ml-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Backup Frequency"
                        options={[
                          { value: 'daily', label: 'Daily' },
                          { value: 'weekly', label: 'Weekly' },
                          { value: 'monthly', label: 'Monthly' },
                        ]}
                        value={backupSettings.backupFrequency}
                        onChange={(value) => setBackupSettings({ ...backupSettings, backupFrequency: value as 'daily' | 'weekly' | 'monthly' })}
                        helperText="How often to create automatic backups"
                      />
                      
                      <Input
                        type="time"
                        label="Backup Time"
                        value={backupSettings.backupTime}
                        onChange={(e) => setBackupSettings({ ...backupSettings, backupTime: e.target.value })}
                        helperText="Time of day to run backups (server time)"
                      />
                      
                      <Input
                        type="number"
                        label="Retention Period (Days)"
                        value={backupSettings.retentionDays.toString()}
                        onChange={(e) => setBackupSettings({ ...backupSettings, retentionDays: parseInt(e.target.value) || 30 })}
                        min={1}
                        max={365}
                        helperText="How long to keep old backups"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeUploads"
                        checked={backupSettings.includeUploads}
                        onChange={(e) => setBackupSettings({ ...backupSettings, includeUploads: e.target.checked })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label htmlFor="includeUploads" className="ml-2 block text-sm text-neutral-700">
                        Include uploaded files in backup
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end pt-4 border-t border-neutral-200">
                <Button
                  onClick={handleSaveBackupSettings}
                  loading={isSaving}
                  disabled={isSaving}
                >
                  Save Settings
                </Button>
              </div>
            </div>
            
            {/* Backup History */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Backup History
              </h3>
              
              {isLoadingBackups ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  <p className="mt-2 text-sm text-neutral-600">Loading backups...</p>
                </div>
              ) : backups.length === 0 ? (
                <div className="text-center py-8 bg-neutral-50 rounded-lg border border-neutral-200">
                  <Database className="mx-auto h-12 w-12 text-neutral-400" />
                  <p className="mt-2 text-sm text-neutral-600">No backups available</p>
                  <p className="text-xs text-neutral-500 mt-1">Create your first backup to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {backups.map((backup) => (
                    <div
                      key={backup.id}
                      className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={cn(
                          'p-2 rounded-lg',
                          backup.type === 'automatic' ? 'bg-primary-100' : 'bg-success-100'
                        )}>
                          {backup.type === 'automatic' ? (
                            <Calendar className={cn(
                              'h-5 w-5',
                              backup.type === 'automatic' ? 'text-primary-600' : 'text-success-600'
                            )} />
                          ) : (
                            <Download className="h-5 w-5 text-success-600" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-neutral-900 truncate">{backup.filename}</h4>
                            <Badge variant={backup.type === 'automatic' ? 'primary' : 'success'}>
                              {backup.type === 'automatic' ? 'Auto' : 'Manual'}
                            </Badge>
                            {backup.status === 'completed' && (
                              <Badge variant="success">Completed</Badge>
                            )}
                            {backup.status === 'in_progress' && (
                              <Badge variant="warning">In Progress</Badge>
                            )}
                            {backup.status === 'failed' && (
                              <Badge variant="error">Failed</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 mt-1 text-sm text-neutral-600">
                            <span className="flex items-center gap-1">
                              <HardDrive className="h-4 w-4" />
                              {backup.size}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(backup.created_at).toLocaleString()}
                            </span>
                            <span>by {backup.created_by}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadBackup(backup)}
                          icon={<Download className="h-4 w-4" />}
                          disabled={backup.status !== 'completed'}
                        >
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRestoreBackup(backup)}
                          icon={<RotateCcw className="h-4 w-4" />}
                          disabled={backup.status !== 'completed'}
                        >
                          Restore
                        </Button>
                        <button
                          onClick={() => handleDeleteBackup(backup)}
                          className="p-2 text-neutral-600 hover:text-error-600 transition-colors"
                          aria-label="Delete backup"
                          disabled={backup.status === 'in_progress'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Restore Confirmation Modal */}
            {restoreConfirmation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-warning-100 rounded-lg">
                      <RotateCcw className="h-6 w-6 text-warning-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900">Confirm Restore</h3>
                      <p className="mt-2 text-sm text-neutral-600">
                        Are you sure you want to restore from this backup? This will replace all current data with the backup data.
                      </p>
                      <div className="mt-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                        <p className="text-sm font-medium text-neutral-900">{restoreConfirmation.filename}</p>
                        <p className="text-xs text-neutral-600 mt-1">
                          Created: {new Date(restoreConfirmation.created_at).toLocaleString()}
                        </p>
                        <p className="text-xs text-neutral-600">Size: {restoreConfirmation.size}</p>
                      </div>
                      <div className="mt-4 p-3 bg-warning-50 rounded-lg border border-warning-200">
                        <p className="text-xs text-warning-800 font-medium">⚠️ Warning</p>
                        <p className="text-xs text-warning-700 mt-1">
                          This action cannot be undone. All current data will be replaced. It's recommended to create a backup before restoring.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setRestoreConfirmation(null)}
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={confirmRestore}
                      fullWidth
                      icon={<RotateCcw className="h-4 w-4" />}
                    >
                      Restore Backup
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Integrations</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Connect and configure third-party integrations to extend functionality.
              </p>
            </div>
            
            {/* Group integrations by category */}
            {['payment', 'email', 'calendar', 'communication'].map((category) => {
              const categoryIntegrations = integrations.filter(int => int.category === category);
              
              if (categoryIntegrations.length === 0) return null;
              
              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                    {getCategoryLabel(category as Integration['category'])}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryIntegrations.map((integration) => {
                      const Icon = integration.icon;
                      
                      return (
                        <div
                          key={integration.id}
                          className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                                  <Icon className="h-6 w-6 text-primary-600" />
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-semibold text-neutral-900">
                                    {integration.name}
                                  </h4>
                                  {getStatusIcon(integration.status)}
                                </div>
                                <p className="mt-1 text-sm text-neutral-600">
                                  {integration.description}
                                </p>
                                
                                <div className="mt-3 flex items-center gap-3">
                                  {getStatusBadge(integration.status)}
                                  
                                  {integration.lastSync && (
                                    <span className="text-xs text-neutral-500">
                                      Last synced: {formatRelativeTime(integration.lastSync)}
                                    </span>
                                  )}
                                </div>
                                
                                {integration.apiKey && integration.status === 'connected' && (
                                  <div className="mt-3 flex items-center gap-2 text-xs text-neutral-600">
                                    <Key className="h-3 w-3" />
                                    <span className="font-mono">{integration.apiKey}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center gap-2">
                            {integration.status === 'connected' ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleConfigureIntegration(integration)}
                                  icon={<SettingsIcon className="h-4 w-4" />}
                                >
                                  Configure
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleTestIntegration(integration)}
                                  icon={<Zap className="h-4 w-4" />}
                                >
                                  Test
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDisconnectIntegration(integration)}
                                >
                                  Disconnect
                                </Button>
                              </>
                            ) : integration.status === 'error' ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={() => handleConfigureIntegration(integration)}
                                  icon={<SettingsIcon className="h-4 w-4" />}
                                >
                                  Reconfigure
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDisconnectIntegration(integration)}
                                >
                                  Disconnect
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleConfigureIntegration(integration)}
                                icon={<Plug className="h-4 w-4" />}
                              >
                                Connect
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {/* Configuration Modal */}
            {configuringIntegration && (
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
                  {/* Modal Header */}
                  <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {React.createElement(configuringIntegration.icon, {
                        className: 'h-6 w-6 text-primary-600',
                      })}
                      <h3 className="text-lg font-semibold text-neutral-900">
                        Configure {configuringIntegration.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => setConfiguringIntegration(null)}
                      className="text-neutral-400 hover:text-neutral-600 transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Modal Body */}
                  <div className="px-6 py-4 overflow-y-auto flex-1">
                    <div className="space-y-4">
                      <p className="text-sm text-neutral-600">
                        {configuringIntegration.description}
                      </p>
                      
                      {/* API Key Input */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-700">
                          API Key <span className="text-error-600">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showApiKey ? 'text' : 'password'}
                            value={integrationConfig.apiKey}
                            onChange={(e) => setIntegrationConfig({ ...integrationConfig, apiKey: e.target.value })}
                            placeholder="Enter your API key"
                            className="block w-full pr-10 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 px-4 py-2 text-base h-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                          >
                            {showApiKey ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-neutral-500">
                          Get your API key from the {configuringIntegration.name} dashboard
                        </p>
                      </div>
                      
                      {/* API Secret (optional for some integrations) */}
                      {['stripe', 'paypal', 'twilio'].includes(configuringIntegration.id) && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-neutral-700">
                            API Secret
                          </label>
                          <input
                            type="password"
                            value={integrationConfig.apiSecret}
                            onChange={(e) => setIntegrationConfig({ ...integrationConfig, apiSecret: e.target.value })}
                            placeholder="Enter your API secret (optional)"
                            className="block w-full rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 px-4 py-2 text-base h-10"
                          />
                        </div>
                      )}
                      
                      {/* Webhook URL (for some integrations) */}
                      {['stripe', 'paypal'].includes(configuringIntegration.id) && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-neutral-700">
                            Webhook URL
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={`${window.location.origin}/api/webhooks/${configuringIntegration.id}`}
                              readOnly
                              className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-700 px-4 py-2 text-sm h-10"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/api/webhooks/${configuringIntegration.id}`);
                                showToast('success', 'Webhook URL copied to clipboard');
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                          <p className="text-xs text-neutral-500">
                            Add this webhook URL to your {configuringIntegration.name} account
                          </p>
                        </div>
                      )}
                      
                      {/* Help Text */}
                      <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                        <p className="text-sm text-primary-800">
                          <strong>Need help?</strong> Visit the{' '}
                          <a
                            href={`https://docs.example.com/integrations/${configuringIntegration.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-primary-900"
                          >
                            {configuringIntegration.name} integration guide
                          </a>
                          {' '}for detailed setup instructions.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Modal Footer */}
                  <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setConfiguringIntegration(null)}
                      disabled={isSavingIntegration}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSaveIntegrationConfig}
                      loading={isSavingIntegration}
                      disabled={isSavingIntegration || !integrationConfig.apiKey.trim()}
                    >
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'archive':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Archive Settings</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Configure archive behavior and retention policies for deleted items.
              </p>
            </div>
            
            {/* Archive Policies Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Archive Policies
              </h3>
              
              <div className="space-y-4">
                {/* Auto-Archive Toggle */}
                <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-neutral-900">
                      Enable Auto-Archive
                    </label>
                    <p className="text-sm text-neutral-600 mt-1">
                      Automatically archive inactive items after a specified period
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={archiveSettings.autoArchiveEnabled}
                      onChange={(e) => setArchiveSettings({ ...archiveSettings, autoArchiveEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                {/* Auto-Archive Days */}
                {archiveSettings.autoArchiveEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Auto-Archive After (Days)
                    </label>
                    <Input
                      type="number"
                      min="30"
                      max="3650"
                      value={archiveSettings.autoArchiveDays}
                      onChange={(e) => setArchiveSettings({ ...archiveSettings, autoArchiveDays: parseInt(e.target.value) || 365 })}
                      helperText="Items inactive for this many days will be automatically archived"
                    />
                  </div>
                )}
                
                {/* Retention Period */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Archive Retention Period (Days)
                  </label>
                  <Input
                    type="number"
                    min="30"
                    max="3650"
                    value={archiveSettings.retentionPeriod}
                    onChange={(e) => setArchiveSettings({ ...archiveSettings, retentionPeriod: parseInt(e.target.value) || 90 })}
                    helperText="Archived items will be kept for this many days before permanent deletion"
                  />
                </div>
              </div>
            </div>
            
            {/* Archive Permissions Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Archive Permissions
              </h3>
              
              <div className="space-y-4">
                {/* Allow Restore */}
                <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-neutral-900">
                      Allow Item Restoration
                    </label>
                    <p className="text-sm text-neutral-600 mt-1">
                      Users with appropriate permissions can restore archived items
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={archiveSettings.allowRestore}
                      onChange={(e) => setArchiveSettings({ ...archiveSettings, allowRestore: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                {/* Require Confirmation */}
                <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-neutral-900">
                      Require Archive Confirmation
                    </label>
                    <p className="text-sm text-neutral-600 mt-1">
                      Show confirmation dialog before archiving items
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={archiveSettings.requireConfirmation}
                      onChange={(e) => setArchiveSettings({ ...archiveSettings, requireConfirmation: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Notifications Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Notifications
              </h3>
              
              <div className="space-y-4">
                {/* Notify on Archive */}
                <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-neutral-900">
                      Notify on Archive
                    </label>
                    <p className="text-sm text-neutral-600 mt-1">
                      Send notifications when items are archived
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={archiveSettings.notifyOnArchive}
                      onChange={(e) => setArchiveSettings({ ...archiveSettings, notifyOnArchive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
                Quick Actions
              </h3>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  icon={<Archive className="h-4 w-4" />}
                  onClick={() => window.location.href = '/archive-management'}
                >
                  View Archive
                </Button>
                <Button
                  variant="outline"
                  icon={<Download className="h-4 w-4" />}
                  onClick={async () => {
                    try {
                      // TODO: Implement actual archive export API endpoint
                      // For now, show a proper message
                      showToast('info', 'Preparing archive export. This may take a few moments...');
                      
                      // Simulate export preparation
                      await new Promise(resolve => setTimeout(resolve, 1500));
                      
                      showToast('success', 'Archive export will be available in your downloads shortly');
                    } catch (error) {
                      showToast('error', 'Failed to export archive');
                    }
                  }}
                >
                  Export Archive
                </Button>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-neutral-200">
              <Button
                variant="primary"
                onClick={async () => {
                  setIsSaving(true);
                  try {
                    // TODO: Replace with actual API call
                    // await api.post('/settings/archive', archiveSettings);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    showToast('success', 'Archive settings saved successfully');
                  } catch (error) {
                    showToast('error', 'Failed to save archive settings');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                loading={isSaving}
                disabled={isSaving}
              >
                Save Archive Settings
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
        <p className="mt-2 text-neutral-600">
          Configure system preferences and options
        </p>
      </div>

      {/* Settings Layout with Vertical Tabs */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Vertical Tab Navigation - Desktop */}
        <nav className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center px-4 py-3 text-sm font-medium transition-colors',
                    'border-l-4 hover:bg-neutral-50',
                    isActive
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-transparent text-neutral-700'
                  )}
                >
                  <Icon className={cn(
                    'mr-3 h-5 w-5',
                    isActive ? 'text-primary-600' : 'text-neutral-400'
                  )} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Horizontal Tab Navigation - Mobile */}
        <div className="lg:hidden">
          <div className="bg-white rounded-lg border border-neutral-200 p-2">
            <div className="flex overflow-x-auto space-x-2 scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
