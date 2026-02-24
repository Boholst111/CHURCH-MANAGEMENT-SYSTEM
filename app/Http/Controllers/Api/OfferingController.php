<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offering;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OfferingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Offering::with(['member', 'offeringType', 'fund']);

        // Apply filters
        if ($request->has('search') && $request->search) {
            $query->whereHas('member', function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->search . '%')
                  ->orWhere('last_name', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('offering_type_id') && $request->offering_type_id) {
            $query->where('offering_type_id', $request->offering_type_id);
        }

        if ($request->has('payment_method') && $request->payment_method) {
            $query->where('payment_method', $request->payment_method);
        }

        if ($request->has('start_date') && $request->start_date) {
            $query->where('date', '>=', $request->start_date);
        }

        if ($request->has('end_date') && $request->end_date) {
            $query->where('date', '<=', $request->end_date);
        }

        $offerings = $query->orderBy('date', 'desc')->get();

        // Transform data to include member_name and offering_type_name
        $offerings = $offerings->map(function ($offering) {
            return [
                'id' => $offering->id,
                'member_id' => $offering->member_id,
                'member_name' => $offering->member ? $offering->member->first_name . ' ' . $offering->member->last_name : null,
                'offering_type_id' => $offering->offering_type_id,
                'offering_type_name' => $offering->offeringType->name,
                'amount' => $offering->amount,
                'payment_method' => $offering->payment_method,
                'reference_number' => $offering->reference_number,
                'offering_date' => $offering->date,
                'notes' => $offering->notes,
                'is_anonymous' => $offering->is_anonymous,
                'created_at' => $offering->created_at->toISOString(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $offerings
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'member_id' => 'nullable|exists:members,id',
            'offering_type_id' => 'required|exists:offering_types,id',
            'fund_id' => 'nullable|exists:funds,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,check,bank_transfer,online',
            'offering_date' => 'required|date|before_or_equal:today',
            'reference_number' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'is_anonymous' => 'boolean'
        ]);

        // If anonymous, set member_id to null
        if ($request->is_anonymous) {
            $validated['member_id'] = null;
        }

        // Map offering_date to date for database
        $validated['date'] = $validated['offering_date'];
        unset($validated['offering_date']);

        $offering = Offering::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Offering recorded successfully',
            'data' => $offering
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $offering = Offering::with(['member', 'offeringType', 'fund'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $offering
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $offering = Offering::findOrFail($id);

        $validated = $request->validate([
            'member_id' => 'nullable|exists:members,id',
            'offering_type_id' => 'required|exists:offering_types,id',
            'fund_id' => 'nullable|exists:funds,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,check,bank_transfer,online',
            'offering_date' => 'required|date|before_or_equal:today',
            'reference_number' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'is_anonymous' => 'boolean'
        ]);

        // If anonymous, set member_id to null
        if ($request->is_anonymous) {
            $validated['member_id'] = null;
        }

        // Map offering_date to date for database
        $validated['date'] = $validated['offering_date'];
        unset($validated['offering_date']);

        $offering->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Offering updated successfully',
            'data' => $offering
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $offering = Offering::findOrFail($id);
        $offering->delete();

        return response()->json([
            'success' => true,
            'message' => 'Offering deleted successfully'
        ]);
    }
}
