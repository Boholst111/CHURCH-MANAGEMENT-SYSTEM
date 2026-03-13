<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        // Don't modify headers for PDF responses
        $contentType = $response->headers->get('Content-Type');
        if ($contentType && str_contains($contentType, 'application/pdf')) {
            return $response;
        }
        
        // Don't modify headers for file downloads
        $contentDisposition = $response->headers->get('Content-Disposition');
        if ($contentDisposition && str_contains($contentDisposition, 'attachment')) {
            return $response;
        }
        
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Content-Type', 'text/html; charset=utf-8');
        $response->headers->set('Cache-Control', 'no-cache, private');
        
        return $response;
    }
}