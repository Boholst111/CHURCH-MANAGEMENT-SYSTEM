<?php

namespace App\Http\Middleware;

use App\Models\Activity;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Only log for authenticated users
        if (Auth::check()) {
            $this->logActivity($request, $response);
        }

        return $response;
    }

    /**
     * Log the activity
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $response
     * @return void
     */
    protected function logActivity(Request $request, $response)
    {
        $method = $request->method();
        $path = $request->path();
        
        // Get status code - handle both JsonResponse and StreamedResponse
        $statusCode = method_exists($response, 'status') 
            ? $response->status() 
            : $response->getStatusCode();

        // Only log successful state-changing operations
        if (!in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE']) || $statusCode >= 400) {
            return;
        }

        $action = $this->determineAction($method, $path);
        $entityInfo = $this->extractEntityInfo($path, $request);

        if ($action) {
            Activity::create([
                'user_id' => Auth::id(),
                'action' => $action,
                'entity_type' => $entityInfo['type'] ?? 'unknown',
                'entity_id' => $entityInfo['id'] ?? null,
                'description' => $this->generateDescription($action, $entityInfo),
                'ip_address' => $request->ip(),
            ]);
        }
    }

    /**
     * Determine the action based on HTTP method and path
     *
     * @param  string  $method
     * @param  string  $path
     * @return string|null
     */
    protected function determineAction(string $method, string $path): ?string
    {
        $actions = [
            'POST' => 'create',
            'PUT' => 'update',
            'PATCH' => 'update',
            'DELETE' => 'delete',
        ];

        return $actions[$method] ?? null;
    }

    /**
     * Extract entity type and ID from the request path
     *
     * @param  string  $path
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function extractEntityInfo(string $path, Request $request): array
    {
        // Remove 'api/' prefix if present
        $path = preg_replace('/^api\//', '', $path);

        // Extract entity type and ID from path patterns like "members/123"
        if (preg_match('/^([a-z\-]+)(?:\/(\d+))?/', $path, $matches)) {
            $entityType = $matches[1];
            $entityId = $matches[2] ?? null;

            // If no ID in path, try to get it from route parameters or response
            if (!$entityId) {
                $entityId = $request->route('id') ?? $request->route('member') ?? $request->route('leadership');
            }

            return [
                'type' => $entityType,
                'id' => $entityId,
            ];
        }

        return ['type' => 'unknown', 'id' => null];
    }

    /**
     * Generate a human-readable description of the activity
     *
     * @param  string  $action
     * @param  array  $entityInfo
     * @return string
     */
    protected function generateDescription(string $action, array $entityInfo): string
    {
        $entityType = ucfirst(str_replace('-', ' ', $entityInfo['type'] ?? 'record'));
        $entityId = $entityInfo['id'] ? " (ID: {$entityInfo['id']})" : '';

        $descriptions = [
            'create' => "Created {$entityType}{$entityId}",
            'update' => "Updated {$entityType}{$entityId}",
            'delete' => "Deleted {$entityType}{$entityId}",
        ];

        return $descriptions[$action] ?? "Performed {$action} on {$entityType}{$entityId}";
    }
}
