<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OfferingType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OfferingTypeController extends Controller
{
    public function index(): JsonResponse
    {
        $offeringTypes = OfferingType::orderBy('name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $offeringTypes
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:offering_types,name',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $offeringType = OfferingType::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Offering type created successfully',
            'data' => $offeringType
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $offeringType = OfferingType::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $offeringType
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $offeringType = OfferingType::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:offering_types,name,' . $id,
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $offeringType->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Offering type updated successfully',
            'data' => $offeringType
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $offeringType = OfferingType::findOrFail($id);
        
        // Check if offering type is in use
        if ($offeringType->offerings()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete offering type that is in use. Consider deactivating it instead.'
            ], 400);
        }

        $offeringType->delete();

        return response()->json([
            'success' => true,
            'message' => 'Offering type deleted successfully'
        ]);
    }
}
