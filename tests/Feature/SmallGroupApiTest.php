<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\SmallGroup;
use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

class SmallGroupApiTest extends TestCase
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
    public function authenticated_user_can_list_small_groups()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        SmallGroup::factory()->count(3)->create();

        // Act
        $response = $this->getJson('/api/small-groups');

        // Assert
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'leader_name',
                        'meeting_day',
                        'meeting_time',
                        'location',
                        'members_count',
                    ]
                ]
            ]);
    }

    /** @test */
    public function unauthenticated_user_cannot_list_small_groups()
    {
        // Act
        $response = $this->getJson('/api/small-groups');

        // Assert
        $response->assertStatus(401);
    }

    /** @test */
    public function admin_can_create_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $groupData = [
            'name' => 'Young Adults Fellowship',
            'description' => 'A group for young adults aged 18-30',
            'leader_name' => 'John Doe',
            'meeting_day' => 'Friday',
            'meeting_time' => '19:00',
            'location' => 'Church Hall A',
        ];

        // Act
        $response = $this->postJson('/api/small-groups', $groupData);

        // Assert
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Small group created successfully',
            ]);
        $this->assertDatabaseHas('small_groups', ['name' => 'Young Adults Fellowship']);
    }

    /** @test */
    public function staff_can_create_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->staffUser);
        $groupData = [
            'name' => 'Seniors Group',
            'description' => 'Fellowship for seniors',
            'leader_name' => 'Jane Smith',
            'meeting_day' => 'Wednesday',
            'meeting_time' => '14:00',
            'location' => 'Church Hall B',
        ];

        // Act
        $response = $this->postJson('/api/small-groups', $groupData);

        // Assert
        $response->assertStatus(201);
        $this->assertDatabaseHas('small_groups', ['name' => 'Seniors Group']);
    }

    /** @test */
    public function readonly_user_cannot_create_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $groupData = [
            'name' => 'Test Group',
            'description' => 'Test description',
            'leader_name' => 'Test Leader',
            'meeting_day' => 'Monday',
            'meeting_time' => '18:00',
            'location' => 'Test Location',
        ];

        // Act
        $response = $this->postJson('/api/small-groups', $groupData);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseMissing('small_groups', ['name' => 'Test Group']);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $groupData = [
            'name' => 'Test Group',
            // Missing required fields
        ];

        // Act
        $response = $this->postJson('/api/small-groups', $groupData);

        // Assert
        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors',
            ]);
    }

    /** @test */
    public function it_validates_unique_name_when_creating_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        SmallGroup::factory()->create(['name' => 'Existing Group']);
        
        $groupData = [
            'name' => 'Existing Group',
            'description' => 'Test',
            'leader_name' => 'Test Leader',
            'meeting_day' => 'Monday',
            'meeting_time' => '18:00',
            'location' => 'Test Location',
        ];

        // Act
        $response = $this->postJson('/api/small-groups', $groupData);

        // Assert
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    /** @test */
    public function it_validates_meeting_day_enum()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $groupData = [
            'name' => 'Test Group',
            'description' => 'Test',
            'leader_name' => 'Test Leader',
            'meeting_day' => 'InvalidDay',
            'meeting_time' => '18:00',
            'location' => 'Test Location',
        ];

        // Act
        $response = $this->postJson('/api/small-groups', $groupData);

        // Assert
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['meeting_day']);
    }

    /** @test */
    public function it_can_retrieve_a_specific_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $group = SmallGroup::factory()->create();

        // Act
        $response = $this->getJson("/api/small-groups/{$group->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $group->id,
                    'name' => $group->name,
                    'leader_name' => $group->leader_name,
                ]
            ]);
    }

    /** @test */
    public function it_returns_404_for_non_existent_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);

        // Act
        $response = $this->getJson('/api/small-groups/999');

        // Assert
        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Small group not found',
            ]);
    }

    /** @test */
    public function admin_can_update_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $group = SmallGroup::factory()->create(['name' => 'Old Name']);
        $updateData = [
            'name' => 'New Name',
            'description' => $group->description,
            'leader_name' => $group->leader_name,
            'meeting_day' => $group->meeting_day,
            'meeting_time' => $group->meeting_time,
            'location' => $group->location,
        ];

        // Act
        $response = $this->putJson("/api/small-groups/{$group->id}", $updateData);

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Small group updated successfully',
            ]);
        $this->assertDatabaseHas('small_groups', ['id' => $group->id, 'name' => 'New Name']);
    }

    /** @test */
    public function it_allows_same_name_when_updating_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $group = SmallGroup::factory()->create(['name' => 'Test Group']);
        $updateData = [
            'name' => 'Test Group', // Same name
            'description' => 'Updated description',
            'leader_name' => $group->leader_name,
            'meeting_day' => $group->meeting_day,
            'meeting_time' => $group->meeting_time,
            'location' => $group->location,
        ];

        // Act
        $response = $this->putJson("/api/small-groups/{$group->id}", $updateData);

        // Assert
        $response->assertStatus(200);
        $this->assertDatabaseHas('small_groups', [
            'id' => $group->id,
            'name' => 'Test Group',
            'description' => 'Updated description'
        ]);
    }

    /** @test */
    public function readonly_user_cannot_update_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $group = SmallGroup::factory()->create(['name' => 'Old Name']);
        $updateData = [
            'name' => 'New Name',
            'description' => $group->description,
            'leader_name' => $group->leader_name,
            'meeting_day' => $group->meeting_day,
            'meeting_time' => $group->meeting_time,
            'location' => $group->location,
        ];

        // Act
        $response = $this->putJson("/api/small-groups/{$group->id}", $updateData);

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('small_groups', ['id' => $group->id, 'name' => 'Old Name']);
    }

    /** @test */
    public function admin_can_delete_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->adminUser);
        $group = SmallGroup::factory()->create();

        // Act
        $response = $this->deleteJson("/api/small-groups/{$group->id}");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Small group deleted successfully',
            ]);
        $this->assertDatabaseMissing('small_groups', ['id' => $group->id]);
    }

    /** @test */
    public function readonly_user_cannot_delete_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $group = SmallGroup::factory()->create();

        // Act
        $response = $this->deleteJson("/api/small-groups/{$group->id}");

        // Assert
        $response->assertStatus(403);
        $this->assertDatabaseHas('small_groups', ['id' => $group->id]);
    }

    /** @test */
    public function it_returns_small_groups_ordered_by_name()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $groupC = SmallGroup::factory()->create(['name' => 'C Group']);
        $groupA = SmallGroup::factory()->create(['name' => 'A Group']);
        $groupB = SmallGroup::factory()->create(['name' => 'B Group']);

        // Act
        $response = $this->getJson('/api/small-groups');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertEquals('A Group', $data[0]['name']);
        $this->assertEquals('B Group', $data[1]['name']);
        $this->assertEquals('C Group', $data[2]['name']);
    }

    /** @test */
    public function it_includes_member_count_in_small_group_list()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $group = SmallGroup::factory()->create();
        Member::factory()->count(5)->create(['small_group_id' => $group->id]);

        // Act
        $response = $this->getJson('/api/small-groups');

        // Assert
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertEquals(5, $data[0]['members_count']);
    }

    /** @test */
    public function it_can_get_members_of_a_small_group()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $group = SmallGroup::factory()->create();
        $members = Member::factory()->count(3)->create(['small_group_id' => $group->id]);

        // Act
        $response = $this->getJson("/api/small-groups/{$group->id}/members");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'small_group' => [
                        'id' => $group->id,
                        'name' => $group->name,
                    ],
                    'member_count' => 3,
                ]
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'small_group',
                    'members' => [
                        '*' => [
                            'id',
                            'first_name',
                            'last_name',
                            'email',
                        ]
                    ],
                    'member_count',
                ]
            ]);
    }

    /** @test */
    public function it_returns_404_when_getting_members_of_non_existent_group()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);

        // Act
        $response = $this->getJson('/api/small-groups/999/members');

        // Assert
        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Small group not found',
            ]);
    }

    /** @test */
    public function it_returns_empty_members_array_for_group_with_no_members()
    {
        // Arrange
        Sanctum::actingAs($this->readOnlyUser);
        $group = SmallGroup::factory()->create();

        // Act
        $response = $this->getJson("/api/small-groups/{$group->id}/members");

        // Assert
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'members' => [],
                    'member_count' => 0,
                ]
            ]);
    }
}
