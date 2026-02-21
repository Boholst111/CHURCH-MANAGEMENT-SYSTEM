<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Member;
use App\Models\SmallGroup;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class MemberApiTest extends TestCase
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
    }

    /** @test */
    public function authenticated_user_can_list_members()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Member::factory()->count(5)->create();

        // Act
        $response = $this->getJson('/api/members');

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'first_name',
                        'last_name',
                        'email',
                        'phone',
                        'status',
                    ]
                ],
                'pagination' => [
                    'current_page',
                    'per_page',
                    'total',
                    'last_page',
                ]
            ]);
    }

    /** @test */
    public function unauthenticated_user_cannot_list_members()
    {
        // Act
        $response = $this->getJson('/api/members');

        // Assert
        $response->assertStatus(401);
    }

    /** @test */
    public function it_can_search_members_by_name()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Member::factory()->create(['first_name' => 'John', 'last_name' => 'Doe']);
        Member::factory()->create(['first_name' => 'Jane', 'last_name' => 'Smith']);

        // Act
        $response = $this->getJson('/api/members?search=John');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(1, $data);
        $this->assertEquals('John', $data[0]['first_name']);
    }

    /** @test */
    public function it_can_filter_members_by_status()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Member::factory()->count(3)->create(['status' => 'active']);
        Member::factory()->count(2)->create(['status' => 'visitor']);

        // Act
        $response = $this->getJson('/api/members?status=active');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(3, $data);
        foreach ($data as $member) {
            $this->assertEquals('active', $member['status']);
        }
    }

    /** @test */
    public function it_can_filter_members_by_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $group = SmallGroup::factory()->create();
        Member::factory()->count(2)->create(['small_group_id' => $group->id]);
        Member::factory()->count(3)->create(['small_group_id' => null]);

        // Act
        $response = $this->getJson("/api/members?small_group_id={$group->id}");

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(2, $data);
    }

    /** @test */
    public function it_paginates_members_correctly()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Member::factory()->count(60)->create();

        // Act
        $response = $this->getJson('/api/members');

        // Assert
        $response->assertStatus(200);
        $pagination = $response->json('pagination');
        $this->assertEquals(50, $pagination['per_page']);
        $this->assertEquals(60, $pagination['total']);
        $this->assertEquals(2, $pagination['last_page']);
    }

    /** @test */
    public function admin_can_create_member()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $memberData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '123-456-7890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => '2024-01-01',
            'gender' => 'male',
        ];

        // Act
        $response = $this->postJson('/api/members', $memberData);

        // Assert
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Member created successfully',
            ]);
        $this->assertDatabaseHas('members', ['email' => 'john@example.com']);
    }

    /** @test */
    public function staff_can_create_member()
    {
        // Arrange
        Sanctum::actingAs($this->staffUser);
        $memberData = [
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'phone' => '123-456-7890',
            'address' => '456 Oak Ave',
            'city' => 'Springfield',
            'status' => 'visitor',
            'date_joined' => '2024-01-15',
            'gender' => 'female',
        ];

        // Act
        $response = $this->postJson('/api/members', $memberData);

        // Assert
        $response->assertStatus(201);
        $this->assertDatabaseHas('members', ['email' => 'jane@example.com']);
    }

    /** @test */
    public function readonly_user_cannot_create_member()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $memberData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '123-456-7890',
            'address' => '123 Main St',
            'city' => 'Springfield',
            'status' => 'active',
            'date_joined' => '2024-01-01',
            'gender' => 'male',
        ];

        // Act
        $response = $this->postJson('/api/members', $memberData);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseMissing('members', ['email' => 'john@example.com']);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_member()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $memberData = [
            'first_name' => 'John',
            // Missing required fields
        ];

        // Act
        $response = $this->postJson('/api/members', $memberData);

        // Assert
        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors',
            ]);
    }

    /** @test */
    public function it_can_retrieve_a_specific_member()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $member = Member::factory()->create();

        // Act
        $response = $this->getJson("/api/members/{$member->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $member->id,
                    'first_name' => $member->first_name,
                    'last_name' => $member->last_name,
                ]
            ]);
    }

    /** @test */
    public function it_returns_404_for_non_existent_member()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);

        // Act
        $response = $this->getJson('/api/members/999');

        // Assert
        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Member not found',
            ]);
    }

    /** @test */
    public function admin_can_update_member()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $member = Member::factory()->create(['first_name' => 'John']);
        $updateData = [
            'first_name' => 'Jane',
            'last_name' => $member->last_name,
            'email' => $member->email,
            'phone' => $member->phone,
            'address' => $member->address,
            'city' => $member->city,
            'status' => $member->status,
            'date_joined' => $member->date_joined->format('Y-m-d'),
            'gender' => $member->gender,
        ];

        // Act
        $response = $this->putJson("/api/members/{$member->id}", $updateData);

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Member updated successfully',
            ]);
        $this->assertDatabaseHas('members', ['id' => $member->id, 'first_name' => 'Jane']);
    }

    /** @test */
    public function readonly_user_cannot_update_member()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $member = Member::factory()->create(['first_name' => 'John']);
        $updateData = [
            'first_name' => 'Jane',
            'last_name' => $member->last_name,
            'email' => $member->email,
            'phone' => $member->phone,
            'address' => $member->address,
            'city' => $member->city,
            'status' => $member->status,
            'date_joined' => $member->date_joined->format('Y-m-d'),
            'gender' => $member->gender,
        ];

        // Act
        $response = $this->putJson("/api/members/{$member->id}", $updateData);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('members', ['id' => $member->id, 'first_name' => 'John']);
    }

    /** @test */
    public function admin_can_delete_member()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $member = Member::factory()->create();

        // Act
        $response = $this->deleteJson("/api/members/{$member->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Member deleted successfully',
            ]);
        $this->assertDatabaseMissing('members', ['id' => $member->id]);
    }

    /** @test */
    public function readonly_user_cannot_delete_member()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $member = Member::factory()->create();

        // Act
        $response = $this->deleteJson("/api/members/{$member->id}");

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('members', ['id' => $member->id]);
    }

    /** @test */
    public function it_can_export_members_to_csv()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Member::factory()->count(5)->create();

        // Act
        $response = $this->get('/api/members/export');

        // Assert
        $response->assertStatus(200);
        
        // Verify it's a StreamedResponse (CSV export)
        $this->assertInstanceOf(\Symfony\Component\HttpFoundation\StreamedResponse::class, $response->baseResponse);
        
        // Check the actual streamed content
        $content = $response->streamedContent();
        $this->assertStringContainsString('First Name', $content); // CSV header
        $this->assertStringContainsString('Last Name', $content);
        $this->assertStringContainsString('Email', $content);
    }

    /** @test */
    public function it_exports_only_filtered_members()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        Member::factory()->count(3)->create(['status' => 'active']);
        Member::factory()->count(2)->create(['status' => 'visitor']);

        // Act
        $response = $this->get('/api/members/export?status=active');

        // Assert
        $response->assertStatus(200);
        $content = $response->streamedContent();
        
        // Count lines in CSV (header + 3 data rows)
        $lines = array_filter(explode("\n", trim($content)));
        $this->assertCount(4, $lines); // 1 header + 3 active members
    }

    /** @test */
    public function it_includes_small_group_information_in_member_list()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $group = SmallGroup::factory()->create(['name' => 'Youth Group']);
        Member::factory()->create(['small_group_id' => $group->id]);

        // Act
        $response = $this->getJson('/api/members');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertArrayHasKey('small_group', $data[0]);
        $this->assertEquals('Youth Group', $data[0]['small_group']['name']);
    }
}
