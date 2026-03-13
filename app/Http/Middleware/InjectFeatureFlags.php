<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Helpers\FeatureFlag;

class InjectFeatureFlags
{
    /**
     * Handle an incoming request and inject feature flags
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Add feature flags to request attributes
        $request->attributes->set('feature_flags', FeatureFlag::getAllFlags());
        
        return $next($request);
    }
}
