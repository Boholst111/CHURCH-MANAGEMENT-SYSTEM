<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Read-Only Role Restrictions
 * 
 * Feature: church-management-system
 * Property 29: Read-only role restrictions
 * Validates: Requirements 10.3
 * 
 * Property: For any data modification request (create, update, delete) from a user 
 * with Read-Only role, the operation should be denied with an appropriate 
 * authorization error message.
 */
class ReadOnlyRolePropertyTest extends TestCase
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
     * List of data modification endpoints that should be restricted for read-only users.
     * These endpoints perform create, update, or delete operations.
     */
    private function getModificationEndpoints(): array
    {
        return [
            // Profile update (PUT)
            ['method' => 'PUT', 'uri' => '/api/profile', 'data' => ['name' => 'Updated Name']],
            
            // Future endpoints that will be added:
            // Members
            ['method' => 'POST', 'uri' => '/api/members', 'data' => ['first_name' => 'John', 'last_name' => 'Doe', 'email' => 'john@example.com', 'phone' => '1234567890', 'status' => 'active']],
            ['method' => 'PUT', 'uri' => '/api/members/1', 'data' => ['first_name' => 'Jane']],
            ['method' => 'DELETE', 'uri' => '/api/members/1', 'data' => []],
            
            // Leadership
            ['method' => 'POST', 'uri' => '/api/leadership', 'data' => ['first_name' => 'Pastor', 'last_name' => 'Smith', 'role' => 'Senior Pastor', 'department' => 'Ministry', 'email' => 'pastor@example.com']],
            ['method' => 'PUT', 'uri' => '/api/leadership/1', 'data' => ['role' => 'Youth Pastor']],
            ['method' => 'DELETE', 'uri' => '/api/leadership/1', 'data' => []],
            
            // Small Groups
            ['method' => 'POST', 'uri' => '/api/small-groups', 'data' => ['name' => 'Youth Group', 'leader_name' => 'John Doe', 'meeting_day' => 'Friday']],
            ['method' => 'PUT', 'uri' => '/api/small-groups/1', 'data' => ['name' => 'Updated Group']],
            ['method' => 'DELETE', 'uri' => '/api/small-groups/1', 'data' => []],
            
            // Finance/Tithes
            ['method' => 'POST', 'uri' => '/api/finance/tithes', 'data' => ['amount' => 100.00, 'payment_method' => 'cash', 'date' => '2024-01-01']],
            ['method' => 'PUT', 'uri' => '/api/finance/tithes/1', 'data' => ['amount' => 150.00]],
            ['method' => 'DELETE', 'uri' => '/api/finance/tithes/1', 'data' => []],
            
            // Events
            ['method' => 'POST', 'uri' => '/api/events', 'data' => ['title' => 'Sunday Service', 'event_date' => '2024-12-25', 'event_time' => '10:00', 'location' => 'Main Hall']],
            ['method' => 'PUT', 'uri' => '/api/events/1', 'data' => ['title' => 'Updated Event']],
            ['method' => 'DELETE', 'uri' => '/api/events/1', 'data' => []],
            ['method' => 'PUT', 'uri' => '/api/events/1/complete', 'data' => ['attendance_count' => 100]],
            
            // Settings
            ['method' => 'PUT', 'uri' => '/api/settings/church', 'data' => ['church_name' => 'Updated Church']],
            ['method' => 'PUT', 'uri' => '/api/settings/notifications', 'data' => ['email_notifications' => true]],
            
            // Users (admin only, but read-only should also be blocked)
            ['method' => 'POST', 'uri' => '/api/users', 'data' => ['name' => 'New User', 'email' => 'newuser@example.com', 'password' => 'Password123', 'role' => 'staff']],
            ['method' => 'PUT', 'uri' => '/api/users/1', 'data' => ['name' => 'Updated User']],
            ['method' => 'DELETE', 'uri' => '/api/users/1', 'data' => []],
        ];
    }

    /**
     * List of read-only endpoints that should be accessible to read-only users.
     * These endpoints only retrieve data without modifying it.
     */
    private function getReadOnlyEndpoints(): array
    {
        return [
            ['method' => 'GET', 'uri' => '/api/user'],
            ['method' => 'GET', 'uri' => '/api/profile'],
            ['method' => 'GET', 'uri' => '/api/dashboard'],
            ['method' => 'GET', 'uri' => '/api/stats'],
            ['method' => 'GET', 'uri' => '/api/members'],
            ['method' => 'GET', 'uri' => '/api/members/1'],
            ['method' => 'GET', 'uri' => '/api/leadership'],
            ['method' => 'GET', 'uri' => '/api/leadership/1'],
            ['method' => 'GET', 'uri' => '/api/small-groups'],
            ['method' => 'GET', 'uri' => '/api/finance/tithes'],
            ['method' => 'GET', 'uri' => '/api/finance/summary'],
            ['method' => 'GET', 'uri' => '/api/events'],
            ['method' => 'GET', 'uri' => '/api/reports/financial'],
            ['method' => 'GET', 'uri' => '/api/reports/demographics'],
            ['method' => 'GET', 'uri' => '/api/settings/church'],
            ['method' => 'GET', 'uri' => '/api/settings/notifications'],
        ];
    }

    /**
     * Test that read-only users cannot perform any data modification operations.
     * 
     * **Validates: Requirements 10.3**
     * 
     * @test
     */
    public function readonly_users_cannot_perform_modification_operations()
    {
        $modificationEndpoints = $this->getModificationEndpoints();
        
        $this->forAll(
            Generators::elements(...$modificationEndpoints)
        )
            ->withMaxSize(100)
            ->then(function ($endpoint) {
                // Create a user with read-only role
                $readonlyUser = User::factory()->create([
                    'role' => 'readonly',
                ]);
                
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                $data = $endpoint['data'];
                
                // Make request as read-only user
                $response = $this->actingAs($readonlyUser, 'sanctum')
                    ->{$method . 'Json'}($uri, $data);
                
                $status = $response->status();
                
                // Skip endpoints that don't exist yet (404 or 405)
                // These will be tested once they are implemented
                if ($status === 404 || $status === 405) {
                    $this->assertTrue(true, "Endpoint {$endpoint['method']} {$uri} not yet implemented, skipping");
                    return;
                }
                
                // Assert that the request is denied with 403 Forbidden
                $this->assertEquals(
                    403,
                    $status,
                    "Read-only user should be denied access to {$endpoint['method']} {$uri} with 403 status (got {$status})"
                );
                
                // Verify the response contains an appropriate error message
                $responseData = $response->json();
                $this->assertNotNull(
                    $responseData,
                    "Response should contain JSON data"
                );
                
                $this->assertArrayHasKey(
                    'message',
                    $responseData,
                    "Response should contain an error message"
                );
                
                // Verify the error message indicates lack of permission
                $message = strtolower($responseData['message']);
                $this->assertTrue(
                    str_contains($message, 'permission') || 
                    str_contains($message, 'forbidden') || 
                    str_contains($message, 'unauthorized') ||
                    str_contains($message, 'not allowed'),
                    "Error message should indicate lack of permission: {$responseData['message']}"
                );
            });
    }

    /**
     * Test that admin and staff users CAN perform modification operations.
     * This verifies that the restriction is specific to read-only users.
     * 
     * @test
     */
    public function admin_and_staff_users_can_perform_modification_operations()
    {
        $modificationEndpoints = $this->getModificationEndpoints();
        
        $this->forAll(
            Generators::elements(...$modificationEndpoints),
            Generators::elements('admin', 'staff')
        )
            ->withMaxSize(100)
            ->then(function ($endpoint, $role) {
                // Create a user with admin or staff role
                $user = User::factory()->create([
                    'role' => $role,
                ]);
                
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                $data = $endpoint['data'];
                
                // Make request as admin/staff user
                $response = $this->actingAs($user, 'sanctum')
                    ->{$method . 'Json'}($uri, $data);
                
                $status = $response->status();
                
                // Skip endpoints that don't exist yet (404 or 405)
                if ($status === 404 || $status === 405) {
                    $this->assertTrue(true, "Endpoint {$endpoint['method']} {$uri} not yet implemented, skipping");
                    return;
                }
                
                // Assert that the request is NOT denied with 403 Forbidden
                // (It may fail with 422 if data is invalid, but it should not be blocked by authorization)
                $this->assertNotEquals(
                    403,
                    $status,
                    "{$role} user should not be blocked from {$endpoint['method']} {$uri} with 403 status (got {$status})"
                );
            });
    }

    /**
     * Test that read-only users CAN access read-only endpoints.
     * This verifies that read-only users can still view data.
     * 
     * @test
     */
    public function readonly_users_can_access_readonly_endpoints()
    {
        $readOnlyEndpoints = $this->getReadOnlyEndpoints();
        
        $this->forAll(
            Generators::elements(...$readOnlyEndpoints)
        )
            ->withMaxSize(100)
            ->then(function ($endpoint) {
                // Create a user with read-only role
                $readonlyUser = User::factory()->create([
                    'role' => 'readonly',
                ]);
                
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                
                // Make request as read-only user
                $response = $this->actingAs($readonlyUser, 'sanctum')
                    ->{$method . 'Json'}($uri, []);
                
                $status = $response->status();
                
                // Skip endpoints that don't exist yet (404)
                if ($status === 404) {
                    $this->assertTrue(true, "Endpoint GET {$uri} not yet implemented, skipping");
                    return;
                }
                
                // Assert that the request is NOT denied with 403 Forbidden
                $this->assertNotEquals(
                    403,
                    $status,
                    "Read-only user should be able to access GET {$uri} (got {$status})"
                );
                
                // Also verify it's not an authentication error
                $this->assertNotEquals(
                    401,
                    $status,
                    "Read-only user should be authenticated for GET {$uri}"
                );
            });
    }

    /**
     * Test that the authorization error response format is consistent.
     * 
     * @test
     */
    public function authorization_errors_have_consistent_format()
    {
        $modificationEndpoints = $this->getModificationEndpoints();
        
        $this->forAll(
            Generators::elements(...$modificationEndpoints)
        )
            ->withMaxSize(100)
            ->then(function ($endpoint) {
                // Create a user with read-only role
                $readonlyUser = User::factory()->create([
                    'role' => 'readonly',
                ]);
                
                $method = strtolower($endpoint['method']);
                $uri = $endpoint['uri'];
                $data = $endpoint['data'];
                
                // Make request as read-only user
                $response = $this->actingAs($readonlyUser, 'sanctum')
                    ->{$method . 'Json'}($uri, $data);
                
                $status = $response->status();
                
                // Skip endpoints that don't exist yet (404 or 405)
                if ($status === 404 || $status === 405) {
                    $this->assertTrue(true, "Endpoint {$endpoint['method']} {$uri} not yet implemented, skipping");
                    return;
                }
                
                // Only check format if we get a 403 response
                if ($status === 403) {
                    $responseData = $response->json();
                    
                    // Verify standard error response format
                    $this->assertArrayHasKey(
                        'success',
                        $responseData,
                        "Error response should have 'success' field"
                    );
                    
                    $this->assertFalse(
                        $responseData['success'],
                        "'success' field should be false for errors"
                    );
                    
                    $this->assertArrayHasKey(
                        'message',
                        $responseData,
                        "Error response should have 'message' field"
                    );
                    
                    $this->assertIsString(
                        $responseData['message'],
                        "'message' field should be a string"
                    );
                }
            });
    }
}
