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
    const response = await api.get('/api/reports/demographics');
    console.log('[REPORTS_API] Raw axios response:', response);
    console.log('[REPORTS_API] response.data type:', typeof response.data);
    console.log('[REPORTS_API] response.data:', JSON.stringify(response.data, null, 2));
    
    // Axios response structure: response.data contains the server's JSON response
    // Server returns: { success: true, data: { by_age: {...}, ... } }
    // So response.data = { success: true, data: {...} }
    // We need response.data.data
    
    const serverResponse = response.data as any;
    
    if (serverResponse && serverResponse.success && serverResponse.data) {
      console.log('[REPORTS_API] Found data in serverResponse.data');
      return serverResponse.data as DemographicData;
    }
    
    // Fallback: check if response.data itself has the demographic structure
    if (serverResponse && 'by_age' in serverResponse) {
      console.log('[REPORTS_API] Found demographic data directly in serverResponse');
      return serverResponse as DemographicData;
    }
    
    console.error('[REPORTS_API] Could not find demographic data in response');
    console.error('[REPORTS_API] Server response structure:', Object.keys(serverResponse || {}));
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
