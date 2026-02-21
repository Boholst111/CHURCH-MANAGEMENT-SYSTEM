import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Calendar, Printer, Download } from 'lucide-react';

export interface ReportControlsProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onPrint: () => void;
  onDownloadPDF: () => void;
  className?: string;
}

export const ReportControls: React.FC<ReportControlsProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onPrint,
  onDownloadPDF,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Report Controls
        </CardTitle>
        <CardDescription>
          Select date range and export options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Date Range Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start-date" className="text-sm font-medium text-gray-700">
                Start Date
              </label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="end-date" className="text-sm font-medium text-gray-700">
                End Date
              </label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onPrint}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              variant="default"
              onClick={onDownloadPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
