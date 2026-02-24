<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExpenseController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Expense::with(['category', 'vendor', 'fund']);

        // Apply filters
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('description', 'like', '%' . $request->search . '%')
                  ->orWhereHas('vendor', function ($vq) use ($request) {
                      $vq->where('name', 'like', '%' . $request->search . '%');
                  });
            });
        }

        if ($request->has('category_id') && $request->category_id) {
            $query->where('expense_category_id', $request->category_id);
        }

        if ($request->has('status') && $request->status) {
            $query->where('approval_status', $request->status);
        }

        if ($request->has('start_date') && $request->start_date) {
            $query->where('date', '>=', $request->start_date);
        }

        if ($request->has('end_date') && $request->end_date) {
            $query->where('date', '<=', $request->end_date);
        }

        $expenses = $query->orderBy('date', 'desc')->get();

        // Transform data
        $expenses = $expenses->map(function ($expense) {
            return [
                'id' => $expense->id,
                'expense_category_id' => $expense->expense_category_id,
                'category_name' => $expense->category->name,
                'vendor_id' => $expense->vendor_id,
                'vendor_name' => $expense->vendor ? $expense->vendor->name : null,
                'fund_id' => $expense->fund_id,
                'fund_name' => $expense->fund ? $expense->fund->name : null,
                'amount' => $expense->amount,
                'expense_date' => $expense->date,
                'description' => $expense->description,
                'payment_method' => $expense->payment_method ?? 'cash',
                'reference_number' => $expense->reference_number ?? null,
                'receipt_url' => $expense->receipt_path,
                'status' => $expense->approval_status,
                'approved_by' => $expense->approved_by,
                'approved_at' => $expense->approved_at,
                'created_at' => $expense->created_at->toISOString(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $expenses
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'vendor_id' => 'nullable|exists:vendors,id',
            'fund_id' => 'nullable|exists:funds,id',
            'amount' => 'required|numeric|min:0.01',
            'expense_date' => 'required|date|before_or_equal:today',
            'description' => 'required|string',
            'payment_method' => 'nullable|in:cash,check,bank_transfer,online',
            'reference_number' => 'nullable|string|max:50'
        ]);

        // Map expense_date to date for database
        $validated['date'] = $validated['expense_date'];
        unset($validated['expense_date']);

        $validated['approval_status'] = 'pending';
        $expense = Expense::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Expense recorded successfully',
            'data' => $expense
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $expense = Expense::with(['category', 'vendor', 'fund'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $expense
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $expense = Expense::findOrFail($id);

        $validated = $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'vendor_id' => 'nullable|exists:vendors,id',
            'fund_id' => 'nullable|exists:funds,id',
            'amount' => 'required|numeric|min:0.01',
            'expense_date' => 'required|date|before_or_equal:today',
            'description' => 'required|string',
            'payment_method' => 'nullable|in:cash,check,bank_transfer,online',
            'reference_number' => 'nullable|string|max:50'
        ]);

        // Map expense_date to date for database
        $validated['date'] = $validated['expense_date'];
        unset($validated['expense_date']);

        $expense->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Expense updated successfully',
            'data' => $expense
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();

        return response()->json([
            'success' => true,
            'message' => 'Expense deleted successfully'
        ]);
    }
}
