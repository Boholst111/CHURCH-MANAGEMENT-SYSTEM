<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MemberService;
use App\Services\ExportService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MemberController extends Controller
{
    protected MemberService $memberService;
    protected ExportService $exportService;

    public function __construct(MemberService $memberService, ExportService $exportService)
    {
        $this->memberService = $memberService;
        $this->exportService = $exportService;
    }

    /**
     * Display a listing of members with optional search, filter, and pagination.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = $request->input('per_page', 50);
            
            // Build filters array
            $filters = [];
            
            if ($request->has('search') && !empty($request->input('search'))) {
                $filters['search'] = $request->input('search');
            }
            
            if ($request->has('status') && !empty($request->input('status'))) {
                $filters['status'] = $request->input('status');
            }
            
            if ($request->has('small_group_id') && !empty($request->input('small_group_id'))) {
                $filters['small_group_id'] = $request->input('small_group_id');
            }
            
            // Get paginated members with filters
            $members = $this->memberService->getPaginatedMembers(
                $perPage,
                $filters,
                ['smallGroup']
            );
            
            return response()->json([
                'success' => true,
                'data' => $members->items(),
                'pagination' => [
                    'current_page' => $members->currentPage(),
                    'per_page' => $members->perPage(),
                    'total' => $members->total(),
                    'last_page' => $members->lastPage(),
                    'from' => $members->firstItem(),
                    'to' => $members->lastItem(),
                ],
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
                'message' => 'Failed to retrieve members',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created member in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $member = $this->memberService->createMember($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Member created successfully',
                'data' => $member->load('smallGroup'),
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
                'message' => 'Failed to create member',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified member.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $member = $this->memberService->getMemberById($id, ['smallGroup']);
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $member,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve member',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified member in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $member = $this->memberService->updateMember($id, $request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Member updated successfully',
                'data' => $member->load('smallGroup'),
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
                'message' => 'Failed to update member',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified member from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->memberService->deleteMember($id);
            
            return response()->json([
                'success' => true,
                'message' => 'Member deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete member',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Export members to CSV with applied filters.
     *
     * @param Request $request
     * @return StreamedResponse|JsonResponse
     */
    public function export(Request $request): StreamedResponse|JsonResponse
    {
        try {
            // Build filters array (same as index method)
            $filters = [];
            
            if ($request->has('search') && !empty($request->input('search'))) {
                $filters['search'] = $request->input('search');
            }
            
            if ($request->has('status') && !empty($request->input('status'))) {
                $filters['status'] = $request->input('status');
            }
            
            if ($request->has('small_group_id') && !empty($request->input('small_group_id'))) {
                $filters['small_group_id'] = $request->input('small_group_id');
            }
            
            // Get all members matching filters (no pagination for export)
            $paginatedMembers = $this->memberService->getPaginatedMembers(
                999999, // Large number to get all records
                $filters,
                ['smallGroup']
            );
            
            // Convert items array to Eloquent Collection
            $membersCollection = \Illuminate\Database\Eloquent\Collection::make($paginatedMembers->items());
            
            // Log export activity
            \App\Models\Activity::create([
                'user_id' => $request->user()->id,
                'action' => 'export',
                'entity_type' => 'members',
                'entity_id' => null,
                'description' => 'Exported ' . $membersCollection->count() . ' member records to CSV',
                'ip_address' => $request->ip(),
            ]);
            
            // Export to CSV
            return $this->exportService->exportMembersToCSV($membersCollection);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to export members',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
