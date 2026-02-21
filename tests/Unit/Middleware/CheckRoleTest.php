<?php

namespace Tests\Unit\Middleware;

use App\Http\Middleware\CheckRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class CheckRoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_allows_user_with_correct_role()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $request = Request::create('/test', 'GET');
        $request->setUserResolver(fn() => $user);

        $middleware = new CheckRole();
        $response = $middleware->handle($request, fn() => response()->json(['success' => true]), 'admin');

        $this->assertEquals(200, $response->status());
    }

    public function test_allows_user_with_any_of_multiple_roles()
    {
        $user = User::factory()->create(['role' => 'staff']);
        $request = Request::create('/test', 'GET');
        $request->setUserResolver(fn() => $user);

        $middleware = new CheckRole();
        $response = $middleware->handle($request, fn() => response()->json(['success' => true]), 'admin', 'staff');

        $this->assertEquals(200, $response->status());
    }

    public function test_denies_user_with_incorrect_role()
    {
        $user = User::factory()->create(['role' => 'readonly']);
        $request = Request::create('/test', 'POST');
        $request->setUserResolver(fn() => $user);

        $middleware = new CheckRole();
        $response = $middleware->handle($request, fn() => response()->json(['success' => true]), 'admin', 'staff');

        $this->assertEquals(403, $response->status());
        $data = $response->getData(true);
        $this->assertFalse($data['success']);
        $this->assertEquals('FORBIDDEN', $data['code']);
    }

    public function test_denies_unauthenticated_user()
    {
        $request = Request::create('/test', 'GET');
        $request->setUserResolver(fn() => null);

        $middleware = new CheckRole();
        $response = $middleware->handle($request, fn() => response()->json(['success' => true]), 'admin');

        $this->assertEquals(401, $response->status());
        $data = $response->getData(true);
        $this->assertFalse($data['success']);
        $this->assertEquals('UNAUTHENTICATED', $data['code']);
    }
}
