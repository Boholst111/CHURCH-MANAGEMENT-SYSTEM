<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Http\Controllers\Api\SmallGroupController;
use App\Models\SmallGroup;
use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

class SmallGroupControllerTest extends TestCase
{
    use RefreshDatabase;

    protected SmallGroupController $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->controller = new SmallGroupController();
    }

    /** @test */
    public function index_returns_all_small_groups_with_member_count()
    {
        // Arrange
        $group1 = SmallGroup::factory()->create(['name' => 'Group A']);
        $group2 = SmallGroup::factory()->create(['name' => 'Group B']);
        Member::factory()->count(3)->create(['small_group_id' => $group1->id]);
        Member::factory()->count(5)->create(['small_group_id' => $group2->id]);

        // Act
        $response = $this->controller->index();

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertTrue($data['success']);
        $this->assertCount(2, $data['data']);
        $this->assertEquals('Group A', $data['data'][0]['name']);
        $this->assertEquals(3, $data['data'][0]['members_count']);
    }

    /** @test */
    public function store_creates_new_small_group_with_valid_data()
    {
        // Arrange
        $request = Request::create('/api/small-groups', 'POST', [
            'name' => 'New Group',
            'description' => 'Test description',
            'leader_name' => 'John Doe',
            'meeting_day' => 'Friday',
            'meeting_time' => '19:00',
            'location' => 'Church Hall',
        ]);

        // Act
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(201, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertTrue($data['success']);
        $this->assertEquals('Small group created successfully', $data['message']);
        $this->assertDatabaseHas('small_groups', ['name' => 'New Group']);
    }

    /** @test */
    public function store_returns_validation_error_for_missing_required_fields()
    {
        // Arrange
        $request = Request::create('/api/small-groups', 'POST', [
            'name' => 'Test Group',
            // Missing required fields
        ]);

        // Act
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(422, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertFalse($data['success']);
        $this->assertArrayHasKey('errors', $data);
    }

    /** @test */
    public function store_returns_validation_error_for_invalid_meeting_day()
    {
        // Arrange
        $request = Request::create('/api/small-groups', 'POST', [
            'name' => 'Test Group',
            'description' => 'Test',
            'leader_name' => 'John Doe',
            'meeting_day' => 'InvalidDay',
            'meeting_time' => '19:00',
            'location' => 'Church Hall',
        ]);

        // Act
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(422, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertFalse($data['success']);
        $this->assertArrayHasKey('errors', $data);
    }

    /** @test */
    public function show_returns_small_group_when_found()
    {
        // Arrange
        $group = SmallGroup::factory()->create();
        Member::factory()->count(4)->create(['small_group_id' => $group->id]);

        // Act
        $response = $this->controller->show($group->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertTrue($data['success']);
        $this->assertEquals($group->id, $data['data']['id']);
        $this->assertEquals(4, $data['data']['members_count']);
    }

    /** @test */
    public function show_returns_404_when_small_group_not_found()
    {
        // Act
        $response = $this->controller->show(999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertFalse($data['success']);
        $this->assertEquals('Small group not found', $data['message']);
    }

    /** @test */
    public function update_modifies_small_group_with_valid_data()
    {
        // Arrange
        $group = SmallGroup::factory()->create(['name' => 'Old Name']);
        $request = Request::create("/api/small-groups/{$group->id}", 'PUT', [
            'name' => 'New Name',
            'description' => $group->description,
            'leader_name' => $group->leader_name,
            'meeting_day' => $group->meeting_day,
            'meeting_time' => $group->meeting_time,
            'location' => $group->location,
        ]);

        // Act
        $response = $this->controller->update($request, $group->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertTrue($data['success']);
        $this->assertEquals('Small group updated successfully', $data['message']);
        $this->assertDatabaseHas('small_groups', ['id' => $group->id, 'name' => 'New Name']);
    }

    /** @test */
    public function update_returns_404_when_small_group_not_found()
    {
        // Arrange
        $request = Request::create('/api/small-groups/999', 'PUT', [
            'name' => 'Test',
            'description' => 'Test',
            'leader_name' => 'Test',
            'meeting_day' => 'Monday',
            'meeting_time' => '18:00',
            'location' => 'Test',
        ]);

        // Act
        $response = $this->controller->update($request, 999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertFalse($data['success']);
        $this->assertEquals('Small group not found', $data['message']);
    }

    /** @test */
    public function update_allows_same_name_for_current_record()
    {
        // Arrange
        $group = SmallGroup::factory()->create(['name' => 'Test Group']);
        $request = Request::create("/api/small-groups/{$group->id}", 'PUT', [
            'name' => 'Test Group', // Same name
            'description' => 'Updated description',
            'leader_name' => $group->leader_name,
            'meeting_day' => $group->meeting_day,
            'meeting_time' => $group->meeting_time,
            'location' => $group->location,
        ]);

        // Act
        $response = $this->controller->update($request, $group->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertTrue($data['success']);
    }

    /** @test */
    public function destroy_deletes_small_group_when_found()
    {
        // Arrange
        $group = SmallGroup::factory()->create();

        // Act
        $response = $this->controller->destroy($group->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertTrue($data['success']);
        $this->assertEquals('Small group deleted successfully', $data['message']);
        $this->assertDatabaseMissing('small_groups', ['id' => $group->id]);
    }

    /** @test */
    public function destroy_returns_404_when_small_group_not_found()
    {
        // Act
        $response = $this->controller->destroy(999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertFalse($data['success']);
        $this->assertEquals('Small group not found', $data['message']);
    }

    /** @test */
    public function members_returns_all_members_of_a_small_group()
    {
        // Arrange
        $group = SmallGroup::factory()->create();
        $members = Member::factory()->count(3)->create(['small_group_id' => $group->id]);

        // Act
        $response = $this->controller->members($group->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertTrue($data['success']);
        $this->assertEquals($group->id, $data['data']['small_group']['id']);
        $this->assertCount(3, $data['data']['members']);
        $this->assertEquals(3, $data['data']['member_count']);
    }

    /** @test */
    public function members_returns_404_when_small_group_not_found()
    {
        // Act
        $response = $this->controller->members(999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertFalse($data['success']);
        $this->assertEquals('Small group not found', $data['message']);
    }

    /** @test */
    public function members_returns_empty_array_when_group_has_no_members()
    {
        // Arrange
        $group = SmallGroup::factory()->create();

        // Act
        $response = $this->controller->members($group->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = $response->getData(true);
        $this->assertTrue($data['success']);
        $this->assertCount(0, $data['data']['members']);
        $this->assertEquals(0, $data['data']['member_count']);
    }
}
