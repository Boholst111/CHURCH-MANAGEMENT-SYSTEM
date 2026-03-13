<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\FeatureFlag;
use Illuminate\Http\JsonResponse;

class FeatureFlagController extends Controller
{
    /**
     * Get all feature flags for the current user
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => FeatureFlag::getAllFlags(),
        ]);
    }
}
