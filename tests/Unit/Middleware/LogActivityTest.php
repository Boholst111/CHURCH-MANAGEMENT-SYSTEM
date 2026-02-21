<?php

namespace Tests\Unit\Middleware;

use App\Http\Middleware\LogActivity;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class LogActivityTest extends TestCase
{
    use RefreshDatabase;

    public function test_logs_activity_for_post_request()
    {
        $user = User::factory()->create();
        Auth::login($user);

        $request = Request::create('/api/members', 'POST');
        $request->setUserResolver(fn() => $user);

        $middleware = new LogActivity();
        $response = response()->json(['success' => true], 201);
        
        $middleware->handle($request, fn() => $response);

        $this->assertDatabaseHas('activities', [
            'user_id' => $user->id,
            'action' => 'create',
            'entity_type' => 'members',
        ]);
    }

    public function test_logs_activity_for_put_request()
    {
        $user = User::factory()->create();
        Auth::login($user);

        $request = Request::create('/api/members/1', 'PUT');
        $request->setUserResolver(fn() => $user);

        $middleware = new LogActivity();
        $response = response()->json(['success' => true], 200);
        
        $middleware->handle($request, fn() => $response);

        $this->assertDatabaseHas('activities', [
            'user_id' => $user->id,
            'action' => 'update',
            'entity_type' => 'members',
        ]);
    }

    public function test_logs_activity_for_delete_request()
    {
        $user = User::factory()->create();
        Auth::login($user);

        $request = Request::create('/api/members/1', 'DELETE');
        $request->setUserResolver(fn() => $user);

        $middleware = new LogActivity();
        $response = response()->json(['success' => true], 200);
        
        $middleware->handle($request, fn() => $response);

        $this->assertDatabaseHas('activities', [
            'user_id' => $user->id,
            'action' => 'delete',
            'entity_type' => 'members',
        ]);
    }

    public function test_does_not_log_get_requests()
    {
        $user = User::factory()->create();
        Auth::login($user);

        $request = Request::create('/api/members', 'GET');
        $request->setUserResolver(fn() => $user);

        $middleware = new LogActivity();
        $response = response()->json(['success' => true], 200);
        
        $middleware->handle($request, fn() => $response);

        $this->assertEquals(0, Activity::count());
    }

    public function test_does_not_log_failed_requests()
    {
        $user = User::factory()->create();
        Auth::login($user);

        $request = Request::create('/api/members', 'POST');
        $request->setUserResolver(fn() => $user);

        $middleware = new LogActivity();
        $response = response()->json(['success' => false], 400);
        
        $middleware->handle($request, fn() => $response);

        $this->assertEquals(0, Activity::count());
    }

    public function test_does_not_log_for_unauthenticated_users()
    {
        $request = Request::create('/api/members', 'POST');
        $request->setUserResolver(fn() => null);

        $middleware = new LogActivity();
        $response = response()->json(['success' => true], 201);
        
        $middleware->handle($request, fn() => $response);

        $this->assertEquals(0, Activity::count());
    }
}
