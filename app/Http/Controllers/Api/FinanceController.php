<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FinanceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class FinanceController extends Controller
{
    protected FinanceService $financeService;

    public function __construct(FinanceService $financeService)
    {
        $this->financeService = $financeService;
    }

    /**
     * Get tithe records with optional filters.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getTithes(Request $request): JsonResponse
    {
        try {
            $filters = [];
            
            // Date range filtering
            if ($request->has('start_date') && $request->has('end_date')) {
                $filters['start_date'] = $request->input('start_date');
                $filters['end_date'] = $request->input('end_date');
            }
            
            // Payment method filtering
            if ($request->has('payment_method')) {
                $filters['payment_method'] = $request->input('payment_method');
            }
            
            // Member filtering
            if ($request->has('member_id')) {
                $filters['member_id'] = $request->input('member_id');
            }
            
            // Get paginated tithes with filters
            $perPage = $request->input('per_page', 50);
            $tithes = $this->financeService->getPaginatedTithes($perPage, $filters, ['member']);
            
            return response()->json([
                'success' => true,
                'data' => $tithes->items(),
                'pagination' => [
                    'current_page' => $tithes->currentPage(),
                    'per_page' => $tithes->perPage(),
                    'total' => $tithes->total(),
                    'last_page' => $tithes->lastPage(),
                ],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve tithes',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Record a new tithe.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $tithe = $this->financeService->recordTithe($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Tithe recorded successfully',
                'data' => $tithe->load('member'),
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to record tithe',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get financial summary with optional date range.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getSummary(Request $request): JsonResponse
    {
        try {
            // Default to current month if no date range provided
            $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
            $endDate = $request->input('end_date', now()->endOfMonth()->toDateString());
            
            $summary = $this->financeService->getFinancialSummary($startDate, $endDate);
            
            return response()->json([
                'success' => true,
                'data' => $summary,
                'date_range' => [
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                ],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve financial summary',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
