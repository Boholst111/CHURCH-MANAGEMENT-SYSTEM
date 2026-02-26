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
  by_small_group: Array<{name: string; count: number}>;
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
    console.log('[REPORTS_API] Making request to /api/reports/demographics');
    const response = await api.get<ApiResponse<DemographicData>>('/api/reports/demographics');
    console.log('[REPORTS_API] Full response:', response);
    console.log('[REPORTS_API] response.data:', response.data);
    console.log('[REPORTS_API] response.data.data:', response.data.data);
    
    // Handle both response.data.data and response.data formats
    if (response.data && typeof response.data === 'object') {
      // If response.data has a 'data' property, use it
      if ('data' in response.data && response.data.data) {
        console.log('[REPORTS_API] Returning response.data.data');
        return response.data.data;
      }
      // Otherwise, check if response.data itself has the demographic structure
      if ('by_age' in response.data) {
        console.log('[REPORTS_API] Returning response.data directly');
        return response.data as unknown as DemographicData;
      }
    }
    
    console.error('[REPORTS_API] Could not extract demographic data from response');
    throw new Error('Invalid response format from demographics API');
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
