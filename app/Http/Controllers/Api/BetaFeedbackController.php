<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BetaFeedbackController extends Controller
{
    /**
     * Store beta feedback
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:bug,feature_request,general',
            'severity' => 'required|in:critical,high,medium,low',
            'page' => 'required|string|max:255',
            'description' => 'required|string',
            'steps_to_reproduce' => 'nullable|string',
            'expected_behavior' => 'nullable|string',
            'actual_behavior' => 'nullable|string',
            'browser_info' => 'nullable|string',
            'screen_resolution' => 'nullable|string',
        ]);

        try {
            $feedbackId = DB::table('beta_feedback')->insertGetId([
                'user_id' => Auth::id(),
                'type' => $validated['type'],
                'severity' => $validated['severity'],
                'page' => $validated['page'],
                'description' => $validated['description'],
                'steps_to_reproduce' => $validated['steps_to_reproduce'] ?? null,
                'expected_behavior' => $validated['expected_behavior'] ?? null,
                'actual_behavior' => $validated['actual_behavior'] ?? null,
                'browser_info' => json_encode([
                    'user_agent' => $validated['browser_info'] ?? null,
                    'screen_resolution' => $validated['screen_resolution'] ?? null,
                ]),
                'status' => 'new',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            Log::info('Beta feedback submitted', [
                'feedback_id' => $feedbackId,
                'user_id' => Auth::id(),
                'type' => $validated['type'],
                'severity' => $validated['severity'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your feedback!',
                'data' => ['id' => $feedbackId]
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to store beta feedback', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to submit feedback. Please try again.'
            ], 500);
        }
    }

    /**
     * Get all feedback (admin only)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        if (!$this->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $query = DB::table('beta_feedback')
            ->join('users', 'beta_feedback.user_id', '=', 'users.id')
            ->select(
                'beta_feedback.*',
                'users.name as user_name',
                'users.email as user_email'
            );

        // Apply filters
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('beta_feedback.type', $request->type);
        }
        if ($request->has('severity') && $request->severity !== 'all') {
            $query->where('beta_feedback.severity', $request->severity);
        }
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('beta_feedback.status', $request->status);
        }
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('beta_feedback.description', 'like', "%{$search}%")
                  ->orWhere('beta_feedback.page', 'like', "%{$search}%")
                  ->orWhere('users.name', 'like', "%{$search}%");
            });
        }

        $feedback = $query->orderBy('beta_feedback.created_at', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $feedback
        ]);
    }

    /**
     * Get single feedback item (admin only)
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        if (!$this->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $feedback = DB::table('beta_feedback')
            ->join('users', 'beta_feedback.user_id', '=', 'users.id')
            ->select(
                'beta_feedback.*',
                'users.name as user_name',
                'users.email as user_email'
            )
            ->where('beta_feedback.id', $id)
            ->first();

        if (!$feedback) {
            return response()->json([
                'success' => false,
                'message' => 'Feedback not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $feedback
        ]);
    }

    /**
     * Update feedback status (admin only)
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        if (!$this->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:new,in_progress,resolved,wont_fix',
            'admin_notes' => 'nullable|string',
        ]);

        try {
            DB::table('beta_feedback')
                ->where('id', $id)
                ->update([
                    'status' => $validated['status'],
                    'admin_notes' => $validated['admin_notes'] ?? null,
                    'updated_at' => now(),
                ]);

            Log::info('Beta feedback updated', [
                'feedback_id' => $id,
                'status' => $validated['status'],
                'admin_id' => Auth::id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Feedback updated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update beta feedback', [
                'error' => $e->getMessage(),
                'feedback_id' => $id,
                'admin_id' => Auth::id(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update feedback'
            ], 500);
        }
    }

    /**
     * Get feedback statistics (admin only)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function stats()
    {
        if (!$this->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $stats = [
            'total' => DB::table('beta_feedback')->count(),
            'by_type' => DB::table('beta_feedback')
                ->select('type', DB::raw('count(*) as count'))
                ->groupBy('type')
                ->pluck('count', 'type'),
            'by_severity' => DB::table('beta_feedback')
                ->select('severity', DB::raw('count(*) as count'))
                ->groupBy('severity')
                ->pluck('count', 'severity'),
            'by_status' => DB::table('beta_feedback')
                ->select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->pluck('count', 'status'),
            'recent' => DB::table('beta_feedback')
                ->where('created_at', '>=', now()->subDays(7))
                ->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Check if current user is an admin
     *
     * @return bool
     */
    private function isAdmin()
    {
        $user = Auth::user();
        return $user && $user->role === 'admin';
    }
}
