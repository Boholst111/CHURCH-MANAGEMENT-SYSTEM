<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SmallGroup;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SmallGroupController extends Controller
{
    /**
     * Display a listing of small groups.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $smallGroups = SmallGroup::withCount('members')
                ->orderBy('name', 'asc')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $smallGroups,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve small groups',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created small group in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), SmallGroup::validationRules());
            
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            
            $smallGroup = SmallGroup::create($validator->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Small group created successfully',
                'data' => $smallGroup->loadCount('members'),
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
                'message' => 'Failed to create small group',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified small group.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $smallGroup = SmallGroup::withCount('members')->find($id);
            
            if (!$smallGroup) {
                return response()->json([
                    'success' => false,
                    'message' => 'Small group not found',
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $smallGroup,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve small group',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified small group in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $smallGroup = SmallGroup::find($id);
            
            if (!$smallGroup) {
                return response()->json([
                    'success' => false,
                    'message' => 'Small group not found',
                ], 404);
            }
            
            // Modify validation rules to allow same name for current record
            $rules = SmallGroup::validationRules();
            $rules['name'] = 'required|string|max:100|unique:small_groups,name,' . $id;
            
            $validator = Validator::make($request->all(), $rules);
            
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            
            $smallGroup->update($validator->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Small group updated successfully',
                'data' => $smallGroup->fresh()->loadCount('members'),
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
                'message' => 'Failed to update small group',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified small group from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $smallGroup = SmallGroup::find($id);
            
            if (!$smallGroup) {
                return response()->json([
                    'success' => false,
                    'message' => 'Small group not found',
                ], 404);
            }
            
            $smallGroup->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Small group deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete small group',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get members belonging to a specific small group.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function members(int $id): JsonResponse
    {
        try {
            $smallGroup = SmallGroup::find($id);
            
            if (!$smallGroup) {
                return response()->json([
                    'success' => false,
                    'message' => 'Small group not found',
                ], 404);
            }
            
            $members = $smallGroup->members()->get();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'small_group' => $smallGroup,
                    'members' => $members,
                    'member_count' => $members->count(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve small group members',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
