<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use App\Models\BudgetItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller
{
    public function index(): JsonResponse
    {
        $budgets = Budget::orderBy('start_date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $budgets
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'items' => 'required|array|min:1',
            'items.*.expense_category_id' => 'required|exists:expense_categories,id',
            'items.*.budgeted_amount' => 'required|numeric|min:0.01'
        ]);

        DB::beginTransaction();
        try {
            // Determine period_type based on date range
            $startDate = \Carbon\Carbon::parse($validated['start_date']);
            $endDate = \Carbon\Carbon::parse($validated['end_date']);
            $diffInMonths = $startDate->diffInMonths($endDate);
            
            $periodType = 'monthly';
            if ($diffInMonths >= 10) {
                $periodType = 'annually';
            } elseif ($diffInMonths >= 2) {
                $periodType = 'quarterly';
            }

            $budget = Budget::create([
                'name' => $validated['name'],
                'period_type' => $periodType,
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'is_active' => true
            ]);

            foreach ($validated['items'] as $item) {
                BudgetItem::create([
                    'budget_id' => $budget->id,
                    'category_type' => 'expense',
                    'category_id' => $item['expense_category_id'],
                    'budgeted_amount' => $item['budgeted_amount']
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Budget created successfully',
                'data' => $budget->load('items')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create budget: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        $budget = Budget::with('items.category')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $budget
        ]);
    }

    public function items(int $id): JsonResponse
    {
        $budget = Budget::findOrFail($id);
        
        $items = BudgetItem::where('budget_id', $id)
            ->where('category_type', 'expense')
            ->get()
            ->map(function ($item) use ($budget) {
                // Get category name
                $category = \DB::table('expense_categories')
                    ->where('id', $item->category_id)
                    ->first();

                // Calculate actual amount from expenses
                $actualAmount = DB::table('expenses')
                    ->where('expense_category_id', $item->category_id)
                    ->whereBetween('date', [$budget->start_date, $budget->end_date])
                    ->where('approval_status', 'approved')
                    ->sum('amount');

                $variance = $item->budgeted_amount - $actualAmount;
                $variancePercentage = $item->budgeted_amount > 0 
                    ? (($actualAmount - $item->budgeted_amount) / $item->budgeted_amount) * 100 
                    : 0;

                return [
                    'id' => $item->id,
                    'budget_id' => $item->budget_id,
                    'expense_category_id' => $item->category_id,
                    'category_name' => $category ? $category->name : 'Unknown',
                    'budgeted_amount' => (float) $item->budgeted_amount,
                    'actual_amount' => (float) $actualAmount,
                    'variance' => (float) $variance,
                    'variance_percentage' => (float) $variancePercentage
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $items
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $budget = Budget::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'period_type' => 'required|in:monthly,quarterly,annually',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'required|boolean'
        ]);

        $budget->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Budget updated successfully',
            'data' => $budget
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $budget = Budget::findOrFail($id);
        $budget->delete();

        return response()->json([
            'success' => true,
            'message' => 'Budget deleted successfully'
        ]);
    }
}
