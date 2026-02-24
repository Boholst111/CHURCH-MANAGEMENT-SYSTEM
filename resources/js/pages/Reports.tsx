import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart3, Users } from 'lucide-react';
import { FinancialChart } from '../components/reports/FinancialChart';
import { DemographicChart } from '../components/reports/DemographicChart';
import { ReportControls } from '../components/reports/ReportControls';
import { reportsApi, DemographicData } from '../lib/reportsApi';
import { FinancialData, FinancialSummary } from '../lib/types';

const Reports: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [demographicLoading, setDemographicLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch financial data when date range changes
  useEffect(() => {
    fetchFinancialData();
  }, [startDate, endDate]);

  // Fetch demographic data on mount
  useEffect(() => {
    fetchDemographicData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: { start_date?: string; end_date?: string } = {};
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;
      
      const result = await reportsApi.getFinancialReport(params);
      setFinancialData(result.data);
      setFinancialSummary(result.summary);
    } catch (err: any) {
      console.error('Error fetching financial data:', err);
      if (err.response?.status === 403) {
        setError('You do not have permission to view financial data');
      } else if (err.response?.status === 401) {
        setError('Please log in to view financial data');
      } else {
        setError('Failed to load financial data');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDemographicData = async () => {
    try {
      setDemographicLoading(true);
      const result = await reportsApi.getDemographicReport();
      setDemographicData(result);
    } catch (err) {
      console.error('Error fetching demographic data:', err);
    } finally {
      setDemographicLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      const params: any = {
        report_type: 'combined',
      };
      
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;
      
      // If no dates provided, use last 12 months
      if (!startDate || !endDate) {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 12);
        params.start_date = start.toISOString().split('T')[0];
        params.end_date = end.toISOString().split('T')[0];
      }
      
      const blob = await reportsApi.exportPDF(params);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `financial-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Error downloading PDF:', err);
      if (err.response?.status === 403) {
        setError('You do not have permission to export reports');
      } else if (err.response?.status === 401) {
        setError('Please log in to export reports');
      } else {
        setError('Failed to download PDF');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8 print-hide">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="mt-2 text-gray-600">
          Generate comprehensive reports for church activities, finances, and member engagement.
        </p>
      </div>

      {/* Print-only header */}
      <div className="print-only print-header">
        <h1 className="text-2xl font-bold">Mahayahay Free Methodist Church</h1>
        <h2 className="text-xl">Financial & Demographic Report</h2>
        <p className="text-sm text-gray-600">
          Generated on {new Date().toLocaleDateString()}
          {startDate && endDate && ` | Period: ${startDate} to ${endDate}`}
        </p>
      </div>

      {/* Report Controls */}
      <ReportControls
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onPrint={handlePrint}
        onDownloadPDF={handleDownloadPDF}
        className="print-hide"
      />

      {/* Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="report-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Financial Reports
            </CardTitle>
            <CardDescription className="print-hide">
              View and export financial reports including tithes and offerings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm print-hide">
                {error}
              </div>
            )}
            <FinancialChart data={financialData} loading={loading} />
            {financialSummary && !loading && (
              <div className="mt-6 grid grid-cols-3 gap-4 financial-summary">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Giving</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {new Intl.NumberFormat('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(financialSummary.total_giving)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Average Giving</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {new Intl.NumberFormat('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(financialSummary.average_giving)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Trend</p>
                  <p className={`text-xl font-semibold ${
                    financialSummary.giving_trend >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {financialSummary.giving_trend >= 0 ? '+' : ''}
                    {financialSummary.giving_trend.toFixed(1)}%
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="report-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Demographics
            </CardTitle>
            <CardDescription className="print-hide">
              View demographic distribution by age and location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DemographicChart data={demographicData} loading={demographicLoading} />
          </CardContent>
        </Card>
      </div>

      {/* Print-only footer */}
      <div className="print-only print-footer">
        <p>Mahayahay Free Methodist Church Management System | Confidential</p>
      </div>
    </div>
  );
};

export default Reports;
