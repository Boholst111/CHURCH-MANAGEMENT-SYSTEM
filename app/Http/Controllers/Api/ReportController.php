<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    protected $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    /**
     * Get financial report data.
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getFinancialReport(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        // Default to last 12 months if no dates provided
        $startDate = $validated['start_date'] ?? now()->subMonths(12)->format('Y-m-d');
        $endDate = $validated['end_date'] ?? now()->format('Y-m-d');

        $reportData = $this->reportService->generateFinancialReport(
            $startDate,
            $endDate
        );

        return response()->json([
            'success' => true,
            'data' => $reportData,
        ]);
    }

    /**
     * Get demographic report data.
     * 
     * @return JsonResponse
     */
    public function getDemographicReport(): JsonResponse
    {
        $reportData = $this->reportService->generateDemographicReport();

        return response()->json([
            'success' => true,
            'data' => $reportData,
        ]);
    }

    /**
     * Export report as PDF.
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function exportPdf(Request $request)
    {
        $validated = $request->validate([
            'report_type' => 'required|in:financial,demographic,combined',
            'start_date' => 'required_if:report_type,financial,combined|date',
            'end_date' => 'required_if:report_type,financial,combined|date|after_or_equal:start_date',
        ]);

        $reportType = $validated['report_type'];
        
        // Log PDF export activity
        $description = match ($reportType) {
            'financial' => "Exported financial report PDF ({$validated['start_date']} to {$validated['end_date']})",
            'demographic' => 'Exported demographic report PDF',
            'combined' => "Exported combined report PDF ({$validated['start_date']} to {$validated['end_date']})",
            default => 'Exported report PDF',
        };
        
        \App\Models\Activity::create([
            'user_id' => $request->user()->id,
            'action' => 'export',
            'entity_type' => 'report',
            'entity_id' => null,
            'description' => $description,
            'ip_address' => $request->ip(),
        ]);

        switch ($reportType) {
            case 'financial':
                return $this->reportService->generateFinancialPDF(
                    $validated['start_date'],
                    $validated['end_date']
                );
            
            case 'demographic':
                return $this->reportService->generateDemographicPDF();
            
            case 'combined':
                return $this->reportService->generateCombinedPDF(
                    $validated['start_date'],
                    $validated['end_date']
                );
            
            default:
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid report type',
                ], 400);
        }
    }
}
