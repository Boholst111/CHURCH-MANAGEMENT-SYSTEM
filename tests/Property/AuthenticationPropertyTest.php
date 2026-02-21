<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Authentication Requirement
 * 
 * Feature: church-management-system
 * Property 28: Authentication requirement
 * Validates: Requirements 10.1
 * 
 * Property: For any system endpoint (except login), requests without valid 
 * authentication credentials should be rejected with an authentication error.
 */
class AuthenticationPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected function setUp(): void
    {
        parent::setUp();
        // Manually initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
    }

    /**
     * List of protected endpoints that require authentication.
     * Excludes public endpoints like login and register.
     */
    private function getProtectedEndpoints(): array
    {
        return [
            // User endpoints
            ['method' => 'GET', 'uri' => '/api/user'],
            ['method' => 'GET', 'uri' => '/api/profile'],
            ['method' => 'PUT', 'uri' => '/api/profile'],
            ['method' => 'POST', 'uri' => '/api/auth/logout'],
            ['method' => 'POST', 'uri' => '/api/logout'],
            
            // Dashboard endpoints
            ['method' => 'GET', 'uri' => '/api/dashboard'],
            ['method' => 'GET', 'uri' => '/api/stats'],
            
            // Future endpoints (will be added as they're implemented)
            // Members, Leadership, Small Groups, Finance, Events, Reports, Settings
        ];
    }

    /**
     * List of public endpoints that should NOT require authentication.
     */
    private function getPublicEndpoints(): array
    {
        return [
            ['method' => 'POST', 'uri' => '/api/auth/login'],
            ['method' => 'POST', 'uri' => '/api/auth/register'],
            ['method' => 'GET', 'uri' => '/api/config'],
        ];
    }

    /**
     * Test that all protected endpoints reject unauthenticated requests.
     * 
     * @test
     */
    public function protected_endpoints_reject_unauthenticated_requests()
    {
        $protectedEndpoints = $this->getProtectedEndpoints();
        
        $this->forAll(
            Generators::elements(...$protectedEndpoints)
        )
            ->withMaxSize(100)
            ->then(function ($endpoint) {
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                
                // Make request without authentication
                $response = $this->{$method . 'Json'}($uri, []);
                
                // Assert that the request is rejected with 401 Unauthorized
                $this->assertEquals(
                    401,
                    $response->status(),
                    "Endpoint {$endpoint['method']} {$uri} should reject unauthenticated requests with 401 status"
                );
                
                // Verify the response indicates authentication is required
                $responseData = $response->json();
                $this->assertNotNull(
                    $responseData,
                    "Response should contain JSON data"
                );
            });
    }

    /**
     * Test that authenticated requests to protected endpoints succeed.
     * 
     * @test
     */
    public function protected_endpoints_accept_authenticated_requests()
    {
        $protectedEndpoints = $this->getProtectedEndpoints();
        
        $this->forAll(
            Generators::elements(...$protectedEndpoints)
        )
            ->withMaxSize(100)
            ->then(function ($endpoint) {
                // Create a user and authenticate
                $user = User::factory()->create([
                    'role' => 'admin', // Use admin to avoid authorization issues
                ]);
                
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                
                // Make request with authentication
                $response = $this->actingAs($user, 'sanctum')
                    ->{$method . 'Json'}($uri, []);
                
                // Assert that the request is NOT rejected with 401
                $this->assertNotEquals(
                    401,
                    $response->status(),
                    "Endpoint {$endpoint['method']} {$uri} should accept authenticated requests (got {$response->status()})"
                );
            });
    }

    /**
     * Test that public endpoints do not require authentication.
     * 
     * @test
     */
    public function public_endpoints_do_not_require_authentication()
    {
        $publicEndpoints = $this->getPublicEndpoints();
        
        $this->forAll(
            Generators::elements(...$publicEndpoints)
        )
            ->withMaxSize(100)
            ->then(function ($endpoint) {
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                
                // Prepare valid data for each endpoint
                $data = [];
                if ($uri === '/api/auth/login') {
                    // Create a user with unique email for login
                    $uniqueEmail = 'test' . uniqid() . '@example.com';
                    $user = User::factory()->create([
                        'email' => $uniqueEmail,
                        'password' => \Illuminate\Support\Facades\Hash::make('Password123'),
                    ]);
                    $data = [
                        'email' => $uniqueEmail,
                        'password' => 'Password123',
                    ];
                } elseif ($uri === '/api/auth/register') {
                    $data = [
                        'name' => 'Test User',
                        'email' => 'newuser' . uniqid() . '@example.com',
                        'password' => 'Password123',
                    ];
                }
                
                // Make request without authentication
                $response = $this->{$method . 'Json'}($uri, $data);
                
                // Assert that the request is NOT rejected with 401
                $this->assertNotEquals(
                    401,
                    $response->status(),
                    "Public endpoint {$endpoint['method']} {$uri} should not require authentication (got {$response->status()})"
                );
            });
    }

    /**
     * Test that requests with invalid tokens are rejected.
     * 
     * @test
     */
    public function endpoints_reject_invalid_authentication_tokens()
    {
        $protectedEndpoints = $this->getProtectedEndpoints();
        
        $this->forAll(
            Generators::elements(...$protectedEndpoints),
            Generators::string() // Generate random invalid tokens
        )
            ->withMaxSize(100)
            ->then(function ($endpoint, $invalidToken) {
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                
                // Make request with invalid token
                $response = $this->{$method . 'Json'}($uri, [], [
                    'Authorization' => 'Bearer ' . $invalidToken,
                ]);
                
                // Assert that the request is rejected with 401
                $this->assertEquals(
                    401,
                    $response->status(),
                    "Endpoint {$endpoint['method']} {$uri} should reject invalid authentication tokens with 401 status"
                );
            });
    }

    /**
     * Test that requests with expired/revoked tokens are rejected.
     * 
     * @test
     */
    public function endpoints_reject_revoked_tokens()
    {
        $protectedEndpoints = $this->getProtectedEndpoints();
        
        $this->forAll(
            Generators::elements(...$protectedEndpoints)
        )
            ->withMaxSize(100)
            ->then(function ($endpoint) {
                // Create a user and generate a token
                $user = User::factory()->create([
                    'role' => 'admin',
                ]);
                
                $token = $user->createToken('test_token')->plainTextToken;
                
                // Revoke all tokens
                $user->tokens()->delete();
                
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                
                // Make request with revoked token
                $response = $this->{$method . 'Json'}($uri, [], [
                    'Authorization' => 'Bearer ' . $token,
                ]);
                
                // Assert that the request is rejected with 401
                $this->assertEquals(
                    401,
                    $response->status(),
                    "Endpoint {$endpoint['method']} {$uri} should reject revoked tokens with 401 status"
                );
            });
    }
}
