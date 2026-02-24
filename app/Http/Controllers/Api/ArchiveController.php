<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ArchiveService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArchiveController extends Controller
{
    protected ArchiveService $archiveService;

    public function __construct(ArchiveService $archiveService)
    {
        $this->archiveService = $archiveService;
    }

    /**
     * List all archived items across all types.
     * GET /api/archives
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $archived = $this->archiveService->listAllArchived();
            
            return response()->json([
                'success' => true,
                'data' => $archived,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve archived items',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * List archived items by type.
     * GET /api/archives/{type}
     *
     * @param string $type
     * @return JsonResponse
     */
    public function indexByType(string $type): JsonResponse
    {
        try {
            $archived = $this->archiveService->listArchivedByType($type);
            
            return response()->json([
                'success' => true,
                'data' => $archived,
            ]);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid model type',
                'error' => $e->getMessage(),
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve archived items',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Restore an archived item.
     * POST /api/archives/{type}/{id}/restore
     *
     * @param string $type
     * @param int $id
     * @return JsonResponse
     */
    public function restore(string $type, int $id): JsonResponse
    {
        try {
            $restored = $this->archiveService->restore($type, $id);
            
            if ($restored) {
                return response()->json([
                    'success' => true,
                    'message' => 'Item restored successfully',
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore item',
            ], 500);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid model type',
                'error' => $e->getMessage(),
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore item',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Permanently delete an archived item.
     * DELETE /api/archives/{type}/{id}/force
     *
     * @param string $type
     * @param int $id
     * @return JsonResponse
     */
    public function forceDelete(string $type, int $id): JsonResponse
    {
        try {
            $deleted = $this->archiveService->forceDelete($type, $id);
            
            if ($deleted) {
                return response()->json([
                    'success' => true,
                    'message' => 'Item permanently deleted successfully',
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete item',
            ], 500);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid model type',
                'error' => $e->getMessage(),
            ], 400);
        } catch (\Illuminate\Database\QueryException $e) {
            // Handle foreign key constraint violations
            if ($e->getCode() === '23000') {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot permanently delete this item because it has related records',
                    'error' => 'Integrity constraint violation',
                ], 409);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete item',
                'error' => $e->getMessage(),
            ], 404);
        }
    }
}
