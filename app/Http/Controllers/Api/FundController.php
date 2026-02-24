<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fund;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FundController extends Controller
{
    public function index(): JsonResponse
    {
        $funds = Fund::orderBy('name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $funds
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:funds,name',
            'type' => 'required|in:restricted,unrestricted',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $validated['current_balance'] = 0.00;
        $fund = Fund::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Fund created successfully',
            'data' => $fund
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $fund = Fund::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $fund
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $fund = Fund::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:funds,name,' . $id,
            'type' => 'required|in:restricted,unrestricted',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $fund->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Fund updated successfully',
            'data' => $fund
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $fund = Fund::findOrFail($id);
        
        // Check if fund is in use
        if ($fund->offerings()->exists() || $fund->expenses()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete fund that has associated transactions. Consider deactivating it instead.'
            ], 400);
        }

        $fund->delete();

        return response()->json([
            'success' => true,
            'message' => 'Fund deleted successfully'
        ]);
    }
}
