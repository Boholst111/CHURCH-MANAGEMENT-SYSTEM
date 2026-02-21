<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

class EventController extends Controller
{
    /**
     * Display a listing of events with optional filtering.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Event::query();
            
            // Filter by status if provided
            if ($request->has('status') && !empty($request->input('status'))) {
                $query->where('status', $request->input('status'));
            }
            
            // Automatic categorization: filter by upcoming/past based on date
            if ($request->has('category')) {
                $category = $request->input('category');
                $today = Carbon::today();
                
                if ($category === 'upcoming') {
                    $query->where('event_date', '>=', $today)
                          ->where('status', '!=', 'completed');
                } elseif ($category === 'past') {
                    $query->where(function($q) use ($today) {
                        $q->where('event_date', '<', $today)
                          ->orWhere('status', 'completed');
                    });
                }
            }
            
            // Sort by event_date ascending (nearest first)
            $query->orderBy('event_date', 'asc')->orderBy('event_time', 'asc');
            
            $perPage = $request->input('per_page', 50);
            $events = $query->paginate($perPage);
            
            return response()->json([
                'success' => true,
                'data' => $events->items(),
                'pagination' => [
                    'current_page' => $events->currentPage(),
                    'per_page' => $events->perPage(),
                    'total' => $events->total(),
                    'last_page' => $events->lastPage(),
                    'from' => $events->firstItem(),
                    'to' => $events->lastItem(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve events',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created event in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate(Event::validationRules());
            
            $event = Event::create($validated);
            
            return response()->json([
                'success' => true,
                'message' => 'Event created successfully',
                'data' => $event,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified event.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $event = Event::find($id);
            
            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Event not found',
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $event,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified event in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $event = Event::find($id);
            
            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Event not found',
                ], 404);
            }
            
            $validated = $request->validate(Event::validationRules());
            
            $event->update($validated);
            
            return response()->json([
                'success' => true,
                'message' => 'Event updated successfully',
                'data' => $event,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified event from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $event = Event::find($id);
            
            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Event not found',
                ], 404);
            }
            
            $event->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Event deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mark an event as completed and optionally record attendance.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function complete(Request $request, int $id): JsonResponse
    {
        try {
            $event = Event::find($id);
            
            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Event not found',
                ], 404);
            }
            
            // Validate attendance count if provided
            $validated = $request->validate([
                'attendance_count' => 'nullable|integer|min:0',
            ]);
            
            // Update event status to completed
            $event->status = 'completed';
            
            // Update attendance count if provided
            if (isset($validated['attendance_count'])) {
                $event->attendance_count = $validated['attendance_count'];
            }
            
            $event->save();
            
            return response()->json([
                'success' => true,
                'message' => 'Event marked as completed',
                'data' => $event,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to complete event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
