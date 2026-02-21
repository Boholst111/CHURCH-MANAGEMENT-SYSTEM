<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\Leadership;
use App\Http\Controllers\Api\LeadershipController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class LeadershipControllerTest extends TestCase
{
    use RefreshDatabase;

    protected LeadershipController $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->controller = new LeadershipController();
        Storage::fake('public');
    }

    /** @test */
    public function index_returns_all_leadership_profiles()
    {
        // Arrange
        Leadership::factory()->count(3)->create();

        // Act
        $response = $this->controller->index();

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertCount(3, $data['data']);
    }

    /** @test */
    public function store_creates_new_leadership_profile()
    {
        // Arrange
        $request = Request::create('/api/leadership', 'POST', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'role' => 'Senior Pastor',
            'department' => 'Pastoral',
            'email' => 'john@church.com',
            'phone' => '123-456-7890',
            'start_date' => '2020-01-01',
        ]);

        // Act
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(201, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals('Leadership profile created successfully', $data['message']);
        $this->assertDatabaseHas('leadership', ['email' => 'john@church.com']);
    }

    /** @test */
    public function store_handles_photo_upload()
    {
        // Arrange
        $photo = UploadedFile::fake()->create('pastor.jpg', 100, 'image/jpeg');
        $request = Request::create('/api/leadership', 'POST', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'role' => 'Senior Pastor',
            'department' => 'Pastoral',
            'email' => 'john@church.com',
            'phone' => '123-456-7890',
            'start_date' => '2020-01-01',
        ]);
        $request->files->set('photo', $photo);

        // Act
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(201, $response->getStatusCode());
        $leadership = Leadership::where('email', 'john@church.com')->first();
        $this->assertNotNull($leadership->photo_url);
    }

    /** @test */
    public function store_validates_required_fields()
    {
        // Arrange
        $request = Request::create('/api/leadership', 'POST', [
            'first_name' => 'John',
            // Missing required fields
        ]);

        // Act
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(422, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertFalse($data['success']);
        $this->assertArrayHasKey('errors', $data);
    }

    /** @test */
    public function show_returns_leadership_profile()
    {
        // Arrange
        $leadership = Leadership::factory()->create();

        // Act
        $response = $this->controller->show($leadership->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals($leadership->id, $data['data']['id']);
    }

    /** @test */
    public function show_returns_404_for_non_existent_profile()
    {
        // Act
        $response = $this->controller->show(999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertFalse($data['success']);
        $this->assertEquals('Leadership profile not found', $data['message']);
    }

    /** @test */
    public function update_modifies_leadership_profile()
    {
        // Arrange
        $leadership = Leadership::factory()->create(['first_name' => 'John']);
        $request = Request::create("/api/leadership/{$leadership->id}", 'PUT', [
            'first_name' => 'Jane',
            'last_name' => $leadership->last_name,
            'role' => $leadership->role,
            'department' => $leadership->department,
            'email' => $leadership->email,
            'phone' => $leadership->phone,
            'start_date' => $leadership->start_date->format('Y-m-d'),
        ]);

        // Act
        $response = $this->controller->update($request, $leadership->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals('Jane', $data['data']['first_name']);
        $this->assertDatabaseHas('leadership', ['id' => $leadership->id, 'first_name' => 'Jane']);
    }

    /** @test */
    public function update_returns_404_for_non_existent_profile()
    {
        // Arrange
        $request = Request::create('/api/leadership/999', 'PUT', [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'role' => 'Pastor',
            'department' => 'Pastoral',
            'email' => 'jane@church.com',
            'phone' => '123-456-7890',
            'start_date' => '2020-01-01',
        ]);

        // Act
        $response = $this->controller->update($request, 999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertFalse($data['success']);
    }

    /** @test */
    public function destroy_deletes_leadership_profile()
    {
        // Arrange
        $leadership = Leadership::factory()->create();

        // Act
        $response = $this->controller->destroy($leadership->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertTrue($data['success']);
        $this->assertEquals('Leadership profile deleted successfully', $data['message']);
        $this->assertDatabaseMissing('leadership', ['id' => $leadership->id]);
    }

    /** @test */
    public function destroy_returns_404_for_non_existent_profile()
    {
        // Act
        $response = $this->controller->destroy(999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        $this->assertFalse($data['success']);
    }

    /** @test */
    public function destroy_deletes_associated_photo()
    {
        // Arrange
        $photo = UploadedFile::fake()->create('pastor.jpg', 100, 'image/jpeg');
        $photoPath = $photo->store('leadership-photos', 'public');
        $leadership = Leadership::factory()->create([
            'photo_url' => Storage::url($photoPath)
        ]);

        // Act
        $response = $this->controller->destroy($leadership->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        Storage::disk('public')->assertMissing($photoPath);
    }
}
