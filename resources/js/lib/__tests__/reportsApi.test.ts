import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { reportsApi } from '../reportsApi';
import api from '../api';

jest.mock('../api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('reportsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFinancialReport', () => {
    it('fetches financial report data without parameters', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            data: [
              { period: 'Jan 2024', amount: 5000, count: 25 },
              { period: 'Feb 2024', amount: 6500, count: 30 },
            ],
            summary: {
              total_giving: 11500,
              average_giving: 383.33,
              giving_trend: 5.2,
              period_start: '2024-01-01',
              period_end: '2024-02-28',
            },
          },
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.getFinancialReport();

      expect(api.get).toHaveBeenCalledWith('/api/reports/financial', { params: {} });
      expect(result).toEqual(mockResponse.data.data);
    });

    it('fetches financial report data with date range', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            data: [{ period: 'Jan 2024', amount: 5000, count: 25 }],
            summary: {
              total_giving: 5000,
              average_giving: 200,
              giving_trend: 0,
              period_start: '2024-01-01',
              period_end: '2024-01-31',
            },
          },
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.getFinancialReport({
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      });

      expect(api.get).toHaveBeenCalledWith('/api/reports/financial', {
        params: {
          start_date: '2024-01-01',
          end_date: '2024-01-31',
        },
      });
      expect(result).toEqual(mockResponse.data.data);
    });

    it('handles empty data response', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            data: [],
            summary: {
              total_giving: 0,
              average_giving: 0,
              giving_trend: 0,
              period_start: '2024-01-01',
              period_end: '2024-12-31',
            },
          },
        },
      };

      mockedApi.get.mockResolvedValue(mockResponse);

      const result = await reportsApi.getFinancialReport();

      expect(result.data).toEqual([]);
      expect(result.summary.total_giving).toBe(0);
    });

    it('handles API errors', async () => {
      mockedApi.get.mockRejectedValue(new Error('Network error'));

      await expect(reportsApi.getFinancialReport()).rejects.toThrow('Network error');
    });
  });

  describe('exportPDF', () => {
    it('exports PDF with report type', async () => {
      const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      const mockResponse = { data: mockBlob };

      mockedApi.post.mockResolvedValue(mockResponse);

      const result = await reportsApi.exportPDF({
        report_type: 'combined',
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      });

      expect(api.post).toHaveBeenCalledWith(
        '/api/reports/export-pdf',
        {
          report_type: 'combined',
          start_date: '2024-01-01',
          end_date: '2024-01-31',
        },
        {
          responseType: 'blob',
        }
      );
      expect(result).toBe(mockBlob);
    });

    it('exports financial PDF', async () => {
      const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      const mockResponse = { data: mockBlob };

      mockedApi.post.mockResolvedValue(mockResponse);

      const result = await reportsApi.exportPDF({
        report_type: 'financial',
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      });

      expect(api.post).toHaveBeenCalledWith(
        '/api/reports/export-pdf',
        {
          report_type: 'financial',
          start_date: '2024-01-01',
          end_date: '2024-01-31',
        },
        {
          responseType: 'blob',
        }
      );
      expect(result).toBe(mockBlob);
    });

    it('exports demographic PDF', async () => {
      const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
      const mockResponse = { data: mockBlob };

      mockedApi.post.mockResolvedValue(mockResponse);

      const result = await reportsApi.exportPDF({
        report_type: 'demographic',
      });

      expect(api.post).toHaveBeenCalledWith(
        '/api/reports/export-pdf',
        {
          report_type: 'demographic',
        },
        {
          responseType: 'blob',
        }
      );
      expect(result).toBe(mockBlob);
    });

    it('handles PDF export errors', async () => {
      mockedApi.post.mockRejectedValue(new Error('Export failed'));

      await expect(reportsApi.exportPDF({
        report_type: 'combined',
        start_date: '2024-01-01',
        end_date: '2024-01-31',
      })).rejects.toThrow('Export failed');
    });
  });
});
