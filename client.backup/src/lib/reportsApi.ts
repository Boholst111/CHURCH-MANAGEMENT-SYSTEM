import api from './api';
import { ApiResponse, FinancialData, FinancialSummary } from './types';

export interface FinancialReportParams {
  start_date?: string;
  end_date?: string;
}

export interface PDFExportParams {
  report_type: 'financial' | 'demographic' | 'combined';
  start_date?: string;
  end_date?: string;
}

export interface DemographicData {
  by_age: Record<string, number>;
  by_location: Record<string, number>;
  by_gender: Record<string, number>;
  by_status: Record<string, number>;
  by_small_group: Record<string, number>;
  total_members: number;
}

export const reportsApi = {
  /**
   * Get financial report data for the specified date range
   */
  getFinancialReport: async (params: FinancialReportParams = {}): Promise<{
    data: FinancialData[];
    summary: FinancialSummary;
  }> => {
    const response = await api.get<ApiResponse<{
      data: FinancialData[];
      summary: FinancialSummary;
    }>>('/api/reports/financial', { params });
    return response.data.data;
  },

  /**
   * Get demographic report data
   */
  getDemographicReport: async (): Promise<DemographicData> => {
    const response = await api.get<ApiResponse<DemographicData>>('/api/reports/demographics');
    return response.data.data;
  },

  /**
   * Export financial report as PDF
   */
  exportPDF: async (params: PDFExportParams): Promise<Blob> => {
    const response = await api.post('/api/reports/export-pdf', params, {
      responseType: 'blob',
    });
    return response.data;
  },
};
