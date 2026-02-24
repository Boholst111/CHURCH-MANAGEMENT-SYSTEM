<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExpenseCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = ExpenseCategory::orderBy('name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:expense_categories,name',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $category = ExpenseCategory::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Expense category created successfully',
            'data' => $category
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $category = ExpenseCategory::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $category = ExpenseCategory::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:expense_categories,name,' . $id,
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $category->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Expense category updated successfully',
            'data' => $category
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $category = ExpenseCategory::findOrFail($id);
        
        // Check if category is in use
        if ($category->expenses()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete expense category that is in use. Consider deactivating it instead.'
            ], 400);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Expense category deleted successfully'
        ]);
    }
}
