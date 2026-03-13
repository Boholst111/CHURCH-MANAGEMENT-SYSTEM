<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class DeploymentMetricsController extends Controller
{
    /**
     * Get deployment metrics for monitoring
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Only admins can access this endpoint
        if (!$this->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        try {
            $metrics = [
                'featureFlags' => $this->getFeatureFlagMetrics(),
                'performance' => $this->getPerformanceMetrics(),
                'errors' => $this->getErrorMetrics(),
                'userFeedback' => $this->getUserFeedbackMetrics(),
            ];

            return response()->json([
                'success' => true,
                'data' => $metrics,
                'timestamp' => now()->toIso8601String(),
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch deployment metrics', [
                'error' => $e->getMessage(),
                'admin_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch metrics: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get feature flag metrics
     *
     * @return array
     */
    private function getFeatureFlagMetrics(): array
    {
        $config = config('features.modern_ui');
        $totalUsers = User::count();
        
        // Calculate enabled users
        $betaUserCount = count($config['beta_users']);
        $rolloutCount = 0;
        
        if ($config['enabled'] && $config['rollout_percentage'] > 0) {
            // Approximate rollout count (excluding beta users)
            $rolloutCount = (int) (($totalUsers - $betaUserCount) * ($config['rollout_percentage'] / 100));
        }
        
        $enabledUsers = $config['enabled'] ? ($betaUserCount + $rolloutCount) : 0;

        return [
            'enabled' => $config['enabled'],
            'rolloutPercentage' => $config['rollout_percentage'],
            'betaUsers' => $config['beta_users'],
            'enabledUsers' => $enabledUsers,
            'totalUsers' => $totalUsers,
        ];
    }

    /**
     * Get performance metrics
     *
     * @return array
     */
    private function getPerformanceMetrics(): array
    {
        // Get cached metrics or calculate new ones
        return Cache::remember('deployment_performance_metrics', 60, function () {
            // Calculate average response time from recent logs
            $avgResponseTime = $this->calculateAverageResponseTime();
            
            // Calculate error rate from recent logs
            $errorRate = $this->calculateErrorRate();
            
            // Get active users count (users active in last 15 minutes)
            $activeUsers = $this->getActiveUsersCount();

            return [
                'avgResponseTime' => $avgResponseTime,
                'errorRate' => $errorRate,
                'activeUsers' => $activeUsers,
            ];
        });
    }

    /**
     * Get error metrics
     *
     * @return array
     */
    private function getErrorMetrics(): array
    {
        return Cache::remember('deployment_error_metrics', 60, function () {
            // Count JavaScript errors from logs (last 24 hours)
            $jsErrors = $this->countLogErrors('javascript', 24);
            
            // Count API errors from logs (last 24 hours)
            $apiErrors = $this->countLogErrors('api', 24);
            
            // Count critical errors from logs (last 24 hours)
            $criticalErrors = $this->countLogErrors('critical', 24);

            return [
                'jsErrors' => $jsErrors,
                'apiErrors' => $apiErrors,
                'criticalErrors' => $criticalErrors,
            ];
        });
    }

    /**
     * Get user feedback metrics
     *
     * @return array
     */
    private function getUserFeedbackMetrics(): array
    {
        // Get feedback from beta_feedback table (if exists)
        if (!DB::getSchemaBuilder()->hasTable('beta_feedback')) {
            return [
                'positive' => 0,
                'negative' => 0,
                'neutral' => 0,
            ];
        }

        $feedback = DB::table('beta_feedback')
            ->select('sentiment', DB::raw('count(*) as count'))
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('sentiment')
            ->get()
            ->pluck('count', 'sentiment')
            ->toArray();

        return [
            'positive' => $feedback['positive'] ?? 0,
            'negative' => $feedback['negative'] ?? 0,
            'neutral' => $feedback['neutral'] ?? 0,
        ];
    }

    /**
     * Calculate average response time from recent requests
     *
     * @return float Average response time in milliseconds
     */
    private function calculateAverageResponseTime(): float
    {
        // This is a simplified implementation
        // In production, you would integrate with your monitoring tool (New Relic, DataDog, etc.)
        
        // For now, return a mock value or read from cache
        // You can implement actual response time tracking using middleware
        
        return Cache::get('avg_response_time', 250.0);
    }

    /**
     * Calculate error rate from recent requests
     *
     * @return float Error rate as percentage
     */
    private function calculateErrorRate(): float
    {
        // This is a simplified implementation
        // In production, you would integrate with your monitoring tool
        
        // For now, return a mock value or read from cache
        return Cache::get('error_rate', 0.2);
    }

    /**
     * Get count of active users
     *
     * @return int Number of active users
     */
    private function getActiveUsersCount(): int
    {
        // Count users with recent activity (last 15 minutes)
        // This assumes you have a sessions table or activity tracking
        
        if (DB::getSchemaBuilder()->hasTable('sessions')) {
            return DB::table('sessions')
                ->where('last_activity', '>=', now()->subMinutes(15)->timestamp)
                ->distinct('user_id')
                ->count('user_id');
        }

        return 0;
    }

    /**
     * Count errors from log files
     *
     * @param string $type Error type (javascript, api, critical)
     * @param int $hours Number of hours to look back
     * @return int Error count
     */
    private function countLogErrors(string $type, int $hours = 24): int
    {
        // This is a simplified implementation
        // In production, you would parse actual log files or use a log aggregation service
        
        $cacheKey = "error_count_{$type}_{$hours}h";
        
        return Cache::remember($cacheKey, 300, function () use ($type) {
            // Mock implementation - replace with actual log parsing
            // You can use Laravel's Log facade or parse log files directly
            
            switch ($type) {
                case 'javascript':
                    return 0; // Count JS errors from logs
                case 'api':
                    return 0; // Count API errors (4xx, 5xx)
                case 'critical':
                    return 0; // Count critical errors
                default:
                    return 0;
            }
        });
    }

    /**
     * Check if current user is an admin
     *
     * @return bool
     */
    private function isAdmin(): bool
    {
        $user = Auth::user();
        return $user && $user->role === 'admin';
    }

    /**
     * Update performance metric (called by middleware)
     *
     * @param float $responseTime Response time in milliseconds
     * @return void
     */
    public static function recordResponseTime(float $responseTime): void
    {
        // Update rolling average
        $currentAvg = Cache::get('avg_response_time', 0);
        $count = Cache::get('response_time_count', 0);
        
        $newAvg = (($currentAvg * $count) + $responseTime) / ($count + 1);
        
        Cache::put('avg_response_time', $newAvg, 3600);
        Cache::put('response_time_count', $count + 1, 3600);
    }

    /**
     * Record an error (called when errors occur)
     *
     * @param string $type Error type
     * @return void
     */
    public static function recordError(string $type): void
    {
        $cacheKey = "error_count_{$type}_24h";
        $count = Cache::get($cacheKey, 0);
        Cache::put($cacheKey, $count + 1, 86400);
        
        // Update error rate
        $totalRequests = Cache::get('total_requests_24h', 1);
        $totalErrors = Cache::get('total_errors_24h', 0) + 1;
        $errorRate = ($totalErrors / $totalRequests) * 100;
        
        Cache::put('total_errors_24h', $totalErrors, 86400);
        Cache::put('error_rate', $errorRate, 3600);
    }

    /**
     * Record a request (called by middleware)
     *
     * @return void
     */
    public static function recordRequest(): void
    {
        $count = Cache::get('total_requests_24h', 0);
        Cache::put('total_requests_24h', $count + 1, 86400);
    }
}
