<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Leadership;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class LeadershipController extends Controller
{
    /**
     * Display a listing of leadership staff.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $leadership = Leadership::orderBy('created_at', 'desc')->get();
            
            return response()->json([
                'success' => true,
                'data' => $leadership,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve leadership',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created leadership profile in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), Leadership::validationRules());
            
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            
            $data = $validator->validated();
            
            // Handle photo upload if present
            if ($request->hasFile('photo')) {
                $data['photo_url'] = $this->handlePhotoUpload($request->file('photo'));
            }
            
            $leadership = Leadership::create($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Leadership profile created successfully',
                'data' => $leadership,
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
                'message' => 'Failed to create leadership profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified leadership profile.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $leadership = Leadership::find($id);
            
            if (!$leadership) {
                return response()->json([
                    'success' => false,
                    'message' => 'Leadership profile not found',
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $leadership,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve leadership profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified leadership profile in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $leadership = Leadership::find($id);
            
            if (!$leadership) {
                return response()->json([
                    'success' => false,
                    'message' => 'Leadership profile not found',
                ], 404);
            }
            
            $validator = Validator::make($request->all(), Leadership::validationRules());
            
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            
            $data = $validator->validated();
            
            // Handle photo upload if present
            if ($request->hasFile('photo')) {
                // Delete old photo if exists
                if ($leadership->photo_url) {
                    $this->deletePhoto($leadership->photo_url);
                }
                $data['photo_url'] = $this->handlePhotoUpload($request->file('photo'));
            }
            
            $leadership->update($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Leadership profile updated successfully',
                'data' => $leadership->fresh(),
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
                'message' => 'Failed to update leadership profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified leadership profile from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $leadership = Leadership::find($id);
            
            if (!$leadership) {
                return response()->json([
                    'success' => false,
                    'message' => 'Leadership profile not found',
                ], 404);
            }
            
            // Delete photo if exists
            if ($leadership->photo_url) {
                $this->deletePhoto($leadership->photo_url);
            }
            
            $leadership->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Leadership profile deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete leadership profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle photo file upload.
     *
     * @param \Illuminate\Http\UploadedFile $photo
     * @return string
     */
    private function handlePhotoUpload($photo): string
    {
        $filename = time() . '_' . uniqid() . '.' . $photo->getClientOriginalExtension();
        $path = $photo->storeAs('leadership-photos', $filename, 'public');
        
        return Storage::url($path);
    }

    /**
     * Delete photo file from storage.
     *
     * @param string $photoUrl
     * @return void
     */
    private function deletePhoto(string $photoUrl): void
    {
        // Extract the path from the URL
        $path = str_replace('/storage/', '', parse_url($photoUrl, PHP_URL_PATH));
        
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
