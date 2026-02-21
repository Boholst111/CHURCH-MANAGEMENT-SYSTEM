<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Http\Controllers\Api\UserController;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Mockery;

class UserControllerTest extends TestCase
{
    protected $userService;
    protected $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->userService = Mockery::mock(UserService::class);
        $this->controller = new UserController($this->userService);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_index_returns_all_users()
    {
        $users = \Illuminate\Database\Eloquent\Collection::make([
            new User(['id' => 1, 'name' => 'Admin User', 'email' => 'admin@test.com', 'role' => 'admin']),
            new User(['id' => 2, 'name' => 'Staff User', 'email' => 'staff@test.com', 'role' => 'staff']),
        ]);

        $this->userService->shouldReceive('getAllUsers')
            ->once()
            ->andReturn($users);

        $request = Request::create('/api/users', 'GET');
        $response = $this->controller->index($request);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertCount(2, $data['data']);
    }

    public function test_store_creates_user_successfully()
    {
        $userData = [
            'name' => 'New User',
            'email' => 'newuser@test.com',
            'password' => 'Password123',
            'role' => 'staff',
        ];

        $user = new User(array_merge($userData, ['id' => 1]));

        $this->userService->shouldReceive('createUser')
            ->once()
            ->with($userData)
            ->andReturn($user);

        $request = Request::create('/api/users', 'POST', $userData);
        $response = $this->controller->store($request);

        $this->assertEquals(201, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals('User created successfully', $data['message']);
    }

    public function test_store_returns_validation_error()
    {
        $userData = [
            'name' => 'New User',
            'email' => 'invalid-email',
            'password' => 'weak',
            'role' => 'staff',
        ];

        $validator = \Illuminate\Support\Facades\Validator::make($userData, [
            'email' => 'email',
            'password' => 'min:8',
        ]);

        $this->userService->shouldReceive('createUser')
            ->once()
            ->with($userData)
            ->andThrow(new ValidationException($validator));

        $request = Request::create('/api/users', 'POST', $userData);
        $response = $this->controller->store($request);

        $this->assertEquals(422, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertFalse($data['success']);
        $this->assertEquals('Validation error', $data['message']);
    }

    public function test_show_returns_user()
    {
        $user = new User(['id' => 1, 'name' => 'Test User', 'email' => 'test@test.com', 'role' => 'staff']);

        $this->userService->shouldReceive('getUserById')
            ->once()
            ->with(1)
            ->andReturn($user);

        $response = $this->controller->show(1);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals('Test User', $data['data']['name']);
    }

    public function test_show_returns_not_found()
    {
        $this->userService->shouldReceive('getUserById')
            ->once()
            ->with(999)
            ->andReturn(null);

        $response = $this->controller->show(999);

        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertFalse($data['success']);
        $this->assertEquals('User not found', $data['message']);
    }

    public function test_update_updates_user_successfully()
    {
        $userData = [
            'name' => 'Updated User',
            'email' => 'updated@test.com',
            'role' => 'admin',
        ];

        $user = new User(array_merge($userData, ['id' => 1]));

        $this->userService->shouldReceive('updateUser')
            ->once()
            ->with(1, $userData)
            ->andReturn($user);

        $request = Request::create('/api/users/1', 'PUT', $userData);
        $response = $this->controller->update($request, 1);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals('User updated successfully', $data['message']);
    }

    public function test_destroy_deletes_user_successfully()
    {
        $this->userService->shouldReceive('deleteUser')
            ->once()
            ->with(1)
            ->andReturn(true);

        $response = $this->controller->destroy(1);

        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals('User deleted successfully', $data['message']);
    }
}
