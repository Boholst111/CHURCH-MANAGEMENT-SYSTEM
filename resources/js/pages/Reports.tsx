import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Users, RefreshCw, AlertCircle } from 'lucide-react';
import { DemographicChart } from '../components/reports/DemographicChart';
import { reportsApi, DemographicData } from '../lib/reportsApi';

const Reports: React.FC = () => {
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch demographic data on mount
  useEffect(() => {
    fetchDemographicData();
  }, []);

  const fetchDemographicData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching demographic data...');
      const result = await reportsApi.getDemographicReport();
      console.log('Demographic data received:', result);
      setDemographicData(result);
    } catch (err: any) {
      console.error('Error fetching demographic data:', err);
      console.error('Error response:', err.response);
      if (err.response?.status === 403) {
        setError('You do not have permission to view demographic data');
      } else if (err.response?.status === 401) {
        setError('Please log in to view demographic data. Redirecting to login...');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(`Failed to load demographic data: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDemographicData();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600">
            View demographic distribution and member analytics for church management.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center justify-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refresh demographic data"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Demographics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Demographics
          </CardTitle>
          <CardDescription>
            View demographic distribution by age and location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DemographicChart data={demographicData} loading={loading} />
          
          {/* Summary Statistics */}
          {demographicData && !loading && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {demographicData.total_members}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Age Groups</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.keys(demographicData.by_age).length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Locations</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.keys(demographicData.by_location).length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Small Groups</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Object.keys(demographicData.by_small_group).length}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
