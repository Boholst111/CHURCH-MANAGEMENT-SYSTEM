<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\ActivityRepository;
use App\Models\User;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    protected ActivityRepository $activityRepository;

    public function __construct(ActivityRepository $activityRepository)
    {
        $this->activityRepository = $activityRepository;
    }

    /**
     * Get paginated activities with optional filters (admin only)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            // Build filters array
            $filters = [];
            
            // User filter
            if ($request->has('user_id') && !empty($request->input('user_id'))) {
                $filters['user_id'] = $request->input('user_id');
            }
            
            // Date range filter
            if ($request->has('start_date') && !empty($request->input('start_date'))) {
                $filters['start_date'] = $request->input('start_date');
            }
            
            if ($request->has('end_date') && !empty($request->input('end_date'))) {
                $filters['end_date'] = $request->input('end_date');
            }
            
            // Action filter
            if ($request->has('action') && !empty($request->input('action'))) {
                $filters['action'] = $request->input('action');
            }
            
            // Entity type filter
            if ($request->has('entity_type') && !empty($request->input('entity_type'))) {
                $filters['entity_type'] = $request->input('entity_type');
            }
            
            // Get per page value, default to 50
            $perPage = $request->input('per_page', 50);
            if ($perPage < 1 || $perPage > 100) {
                $perPage = 50;
            }
            
            // Get paginated activities with user relationship
            $activities = $this->activityRepository->paginate($perPage, $filters, ['user']);
            
            // Format activities for response
            $formattedActivities = $activities->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'user_id' => $activity->user_id,
                    'user_name' => $activity->user ? $activity->user->name : 'Unknown User',
                    'action' => $activity->action,
                    'entity_type' => $activity->entity_type,
                    'entity_id' => $activity->entity_id,
                    'description' => $activity->description,
                    'ip_address' => $activity->ip_address,
                    'created_at' => $activity->created_at->toISOString(),
                    'created_at_human' => $activity->created_at->diffForHumans(),
                ];
            });
            
            return response()->json([
                'success' => true,
                'data' => $formattedActivities,
                'pagination' => [
                    'current_page' => $activities->currentPage(),
                    'per_page' => $activities->perPage(),
                    'total' => $activities->total(),
                    'last_page' => $activities->lastPage(),
                    'from' => $activities->firstItem(),
                    'to' => $activities->lastItem(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve activities',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get list of users for filter dropdown (admin only)
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsers()
    {
        try {
            $users = User::select('id', 'name', 'email')
                ->orderBy('name', 'asc')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $users,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve users',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
