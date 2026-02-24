<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Leadership;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

class LeadershipApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $staffUser;
    protected User $readOnlyUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create users with different roles
        $this->adminUser = User::factory()->create(['role' => 'admin']);
        $this->staffUser = User::factory()->create(['role' => 'staff']);
        $this->readOnlyUser = User::factory()->create(['role' => 'readonly']);
        
        // Fake storage for photo uploads
        Storage::fake('public');
    }

    /** @test */
    public function authenticated_user_can_list_leadership()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Leadership::factory()->count(5)->create();

        // Act
        $response = $this->getJson('/api/leadership');

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'first_name',
                        'last_name',
                        'role',
                        'department',
                        'email',
                        'phone',
                    ]
                ]
            ]);
    }

    /** @test */
    public function unauthenticated_user_cannot_list_leadership()
    {
        // Act
        $response = $this->getJson('/api/leadership');

        // Assert
        $response->assertStatus(401);
    }

    /** @test */
    public function admin_can_create_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $leadershipData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'role' => 'Senior Pastor',
            'department' => 'Pastoral',
            'email' => 'john.doe@church.com',
            'phone' => '123-456-7890',
            'bio' => 'Experienced pastor with 20 years of ministry',
            'start_date' => '2020-01-01',
        ];

        // Act
        $response = $this->postJson('/api/leadership', $leadershipData);

        // Assert
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Leadership profile created successfully',
            ]);
        $this->assertDatabaseHas('leadership', ['email' => 'john.doe@church.com']);
    }

    /** @test */
    public function staff_can_create_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->staffUser);
        $leadershipData = [
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'role' => 'Youth Pastor',
            'department' => 'Youth',
            'email' => 'jane.smith@church.com',
            'phone' => '123-456-7890',
            'start_date' => '2021-06-15',
        ];

        // Act
        $response = $this->postJson('/api/leadership', $leadershipData);

        // Assert
        $response->assertStatus(201);
        $this->assertDatabaseHas('leadership', ['email' => 'jane.smith@church.com']);
    }

    /** @test */
    public function readonly_user_cannot_create_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $leadershipData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'role' => 'Senior Pastor',
            'department' => 'Pastoral',
            'email' => 'john.doe@church.com',
            'phone' => '123-456-7890',
            'start_date' => '2020-01-01',
        ];

        // Act
        $response = $this->postJson('/api/leadership', $leadershipData);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseMissing('leadership', ['email' => 'john.doe@church.com']);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_leadership()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $leadershipData = [
            'first_name' => 'John',
            // Missing required fields
        ];

        // Act
        $response = $this->postJson('/api/leadership', $leadershipData);

        // Assert
        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors',
            ]);
    }

    /** @test */
    public function it_can_upload_photo_when_creating_leadership()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $photo = UploadedFile::fake()->create('pastor.jpg', 100, 'image/jpeg');
        
        $leadershipData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'role' => 'Senior Pastor',
            'department' => 'Pastoral',
            'email' => 'john.doe@church.com',
            'phone' => '123-456-7890',
            'start_date' => '2020-01-01',
            'photo' => $photo,
        ];

        // Act
        $response = $this->postJson('/api/leadership', $leadershipData);

        // Assert
        $response->assertStatus(201);
        $leadership = Leadership::where('email', 'john.doe@church.com')->first();
        $this->assertNotNull($leadership->photo_url);
        
        // Verify file was stored
        $path = str_replace('/storage/', '', parse_url($leadership->photo_url, PHP_URL_PATH));
        Storage::disk('public')->assertExists($path);
    }

    /** @test */
    public function it_can_retrieve_a_specific_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $leadership = Leadership::factory()->create();

        // Act
        $response = $this->getJson("/api/leadership/{$leadership->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $leadership->id,
                    'first_name' => $leadership->first_name,
                    'last_name' => $leadership->last_name,
                    'role' => $leadership->role,
                ]
            ]);
    }

    /** @test */
    public function it_returns_404_for_non_existent_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);

        // Act
        $response = $this->getJson('/api/leadership/999');

        // Assert
        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Leadership profile not found',
            ]);
    }

    /** @test */
    public function admin_can_update_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $leadership = Leadership::factory()->create(['first_name' => 'John']);
        $updateData = [
            'first_name' => 'Jane',
            'last_name' => $leadership->last_name,
            'role' => $leadership->role,
            'department' => $leadership->department,
            'email' => $leadership->email,
            'phone' => $leadership->phone,
            'start_date' => $leadership->start_date->format('Y-m-d'),
        ];

        // Act
        $response = $this->putJson("/api/leadership/{$leadership->id}", $updateData);

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Leadership profile updated successfully',
            ]);
        $this->assertDatabaseHas('leadership', ['id' => $leadership->id, 'first_name' => 'Jane']);
    }

    /** @test */
    public function it_can_update_photo_when_updating_leadership()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $oldPhoto = UploadedFile::fake()->create('old.jpg', 100, 'image/jpeg');
        
        // Create leadership with photo
        $leadership = Leadership::factory()->create();
        $oldPhotoPath = $oldPhoto->store('leadership-photos', 'public');
        $leadership->update(['photo_url' => Storage::url($oldPhotoPath)]);
        
        $newPhoto = UploadedFile::fake()->create('new.jpg', 100, 'image/jpeg');
        $updateData = [
            'first_name' => $leadership->first_name,
            'last_name' => $leadership->last_name,
            'role' => $leadership->role,
            'department' => $leadership->department,
            'email' => $leadership->email,
            'phone' => $leadership->phone,
            'start_date' => $leadership->start_date->format('Y-m-d'),
            'photo' => $newPhoto,
        ];

        // Act
        $response = $this->putJson("/api/leadership/{$leadership->id}", $updateData);

        // Assert
        $response->assertStatus(200);
        $leadership->refresh();
        $this->assertNotNull($leadership->photo_url);
        
        // Verify old photo was deleted
        Storage::disk('public')->assertMissing($oldPhotoPath);
    }

    /** @test */
    public function readonly_user_cannot_update_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $leadership = Leadership::factory()->create(['first_name' => 'John']);
        $updateData = [
            'first_name' => 'Jane',
            'last_name' => $leadership->last_name,
            'role' => $leadership->role,
            'department' => $leadership->department,
            'email' => $leadership->email,
            'phone' => $leadership->phone,
            'start_date' => $leadership->start_date->format('Y-m-d'),
        ];

        // Act
        $response = $this->putJson("/api/leadership/{$leadership->id}", $updateData);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('leadership', ['id' => $leadership->id, 'first_name' => 'John']);
    }

    /** @test */
    public function admin_can_delete_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $leadership = Leadership::factory()->create();

        // Act
        $response = $this->deleteJson("/api/leadership/{$leadership->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Leadership profile deleted successfully',
            ]);
        // Check that leadership is soft deleted (has deleted_at timestamp)
        $this->assertSoftDeleted('leadership', ['id' => $leadership->id]);
    }

    /** @test */
    public function it_deletes_photo_when_deleting_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $photo = UploadedFile::fake()->create('pastor.jpg', 100, 'image/jpeg');
        $photoPath = $photo->store('leadership-photos', 'public');
        
        $leadership = Leadership::factory()->create([
            'photo_url' => Storage::url($photoPath)
        ]);

        // Act
        $response = $this->deleteJson("/api/leadership/{$leadership->id}");

        // Assert
        $response->assertStatus(200);
        Storage::disk('public')->assertMissing($photoPath);
    }

    /** @test */
    public function readonly_user_cannot_delete_leadership_profile()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $leadership = Leadership::factory()->create();

        // Act
        $response = $this->deleteJson("/api/leadership/{$leadership->id}");

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('leadership', ['id' => $leadership->id]);
    }

    /** @test */
    public function it_returns_leadership_ordered_by_creation_date()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $older = Leadership::factory()->create(['created_at' => now()->subDays(2)]);
        $newer = Leadership::factory()->create(['created_at' => now()->subDay()]);
        $newest = Leadership::factory()->create(['created_at' => now()]);

        // Act
        $response = $this->getJson('/api/leadership');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertEquals($newest->id, $data[0]['id']);
        $this->assertEquals($newer->id, $data[1]['id']);
        $this->assertEquals($older->id, $data[2]['id']);
    }
}
