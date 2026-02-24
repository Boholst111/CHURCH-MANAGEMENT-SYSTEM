<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Http\Controllers\Api\MemberController;
use App\Services\MemberService;
use App\Services\ExportService;
use App\Models\Member;
use App\Models\SmallGroup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

class MemberControllerTest extends TestCase
{
    use RefreshDatabase;

    protected MemberController $controller;
    protected MemberService $memberService;
    protected ExportService $exportService;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->memberService = $this->app->make(MemberService::class);
        $this->exportService = $this->app->make(ExportService::class);
        
        $this->controller = new MemberController(
            $this->memberService,
            $this->exportService
        );
    }

    /** @test */
    public function it_returns_paginated_members_with_correct_structure()
    {
        // Arrange
        Member::factory()->count(10)->create();

        // Act
        $request = new Request();
        $response = $this->controller->index($request);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertArrayHasKey('data', $data);
        $this->assertArrayHasKey('pagination', $data);
        $this->assertCount(10, $data['data']);
    }

    /** @test */
    public function it_paginates_members_at_50_per_page_by_default()
    {
        // Arrange
        Member::factory()->count(60)->create();

        // Act
        $request = new Request();
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertEquals(50, $data['pagination']['per_page']);
        $this->assertEquals(60, $data['pagination']['total']);
        $this->assertEquals(2, $data['pagination']['last_page']);
        $this->assertCount(50, $data['data']);
    }

    /** @test */
    public function it_filters_members_by_search_query()
    {
        // Arrange
        Member::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ]);
        Member::factory()->create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
        ]);

        // Act
        $request = new Request(['search' => 'John']);
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(1, $data['data']);
        $this->assertEquals('John', $data['data'][0]['first_name']);
    }

    /** @test */
    public function it_filters_members_by_status()
    {
        // Arrange
        Member::factory()->count(5)->create(['status' => 'active']);
        Member::factory()->count(3)->create(['status' => 'visitor']);

        // Act
        $request = new Request(['status' => 'active']);
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(5, $data['data']);
        foreach ($data['data'] as $member) {
            $this->assertEquals('active', $member['status']);
        }
    }

    /** @test */
    public function it_filters_members_by_small_group()
    {
        // Arrange
        $group1 = SmallGroup::factory()->create();
        $group2 = SmallGroup::factory()->create();
        
        Member::factory()->count(3)->create(['small_group_id' => $group1->id]);
        Member::factory()->count(2)->create(['small_group_id' => $group2->id]);

        // Act
        $request = new Request(['small_group_id' => $group1->id]);
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertCount(3, $data['data']);
        foreach ($data['data'] as $member) {
            $this->assertEquals($group1->id, $member['small_group_id']);
        }
    }

    /** @test */
    public function it_creates_a_new_member_with_valid_data()
    {
        // Arrange
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
        $request = new Request($memberData);
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(201, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals('Member created successfully', $data['message']);
        $this->assertEquals('John', $data['data']['first_name']);
        $this->assertDatabaseHas('members', ['email' => 'john@example.com']);
    }

    /** @test */
    public function it_returns_validation_error_for_invalid_member_data()
    {
        // Arrange: Missing required fields
        $memberData = [
            'first_name' => 'John',
            // Missing last_name, email, etc.
        ];

        // Act
        $request = new Request($memberData);
        $response = $this->controller->store($request);

        // Assert
        $this->assertEquals(422, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertEquals('Validation error', $data['message']);
        $this->assertArrayHasKey('errors', $data);
    }

    /** @test */
    public function it_retrieves_a_specific_member_by_id()
    {
        // Arrange
        $member = Member::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
        ]);

        // Act
        $response = $this->controller->show($member->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals($member->id, $data['data']['id']);
        $this->assertEquals('John', $data['data']['first_name']);
    }

    /** @test */
    public function it_returns_404_for_non_existent_member()
    {
        // Act
        $response = $this->controller->show(999);

        // Assert
        $this->assertEquals(404, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertEquals('Member not found', $data['message']);
    }

    /** @test */
    public function it_updates_a_member_with_valid_data()
    {
        // Arrange
        $member = Member::factory()->create([
            'first_name' => 'John',
            'email' => 'john@example.com',
        ]);
        
        $updateData = [
            'first_name' => 'Jane',
            'last_name' => $member->last_name,
            'email' => 'jane@example.com',
            'phone' => $member->phone,
            'address' => $member->address,
            'city' => $member->city,
            'status' => $member->status,
            'date_joined' => $member->date_joined->format('Y-m-d'),
            'gender' => $member->gender,
        ];

        // Act
        $request = new Request($updateData);
        $response = $this->controller->update($request, $member->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals('Member updated successfully', $data['message']);
        $this->assertEquals('Jane', $data['data']['first_name']);
        $this->assertDatabaseHas('members', ['id' => $member->id, 'first_name' => 'Jane']);
    }

    /** @test */
    public function it_deletes_a_member()
    {
        // Arrange
        $member = Member::factory()->create();

        // Act
        $response = $this->controller->destroy($member->id);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertTrue($data['success']);
        $this->assertEquals('Member deleted successfully', $data['message']);
        // Check that member is soft deleted (has deleted_at timestamp)
        $this->assertSoftDeleted('members', ['id' => $member->id]);
    }

    /** @test */
    public function it_returns_error_when_deleting_non_existent_member()
    {
        // Act
        $response = $this->controller->destroy(999);

        // Assert
        $this->assertEquals(500, $response->getStatusCode());
        $data = json_decode($response->getContent(), true);
        
        $this->assertFalse($data['success']);
        $this->assertStringContainsString('Failed to delete member', $data['message']);
    }

    /** @test */
    public function it_exports_members_to_csv()
    {
        // Arrange
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user);
        Member::factory()->count(5)->create();

        // Act
        $request = Request::create('/api/members/export', 'GET');
        $request->setUserResolver(function () use ($user) {
            return $user;
        });
        $response = $this->controller->export($request);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
        $this->assertStringContainsString('attachment', $response->headers->get('Content-Disposition'));
        $this->assertStringContainsString('members_export', $response->headers->get('Content-Disposition'));
    }

    /** @test */
    public function it_exports_filtered_members_to_csv()
    {
        // Arrange
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user);
        Member::factory()->count(3)->create(['status' => 'active']);
        Member::factory()->count(2)->create(['status' => 'visitor']);

        // Act
        $request = Request::create('/api/members/export', 'GET', ['status' => 'active']);
        $request->setUserResolver(function () use ($user) {
            return $user;
        });
        $response = $this->controller->export($request);

        // Assert
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /** @test */
    public function it_includes_small_group_information_in_member_response()
    {
        // Arrange
        $group = SmallGroup::factory()->create(['name' => 'Youth Group']);
        $member = Member::factory()->create(['small_group_id' => $group->id]);

        // Act
        $response = $this->controller->show($member->id);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertArrayHasKey('small_group', $data['data']);
        $this->assertEquals('Youth Group', $data['data']['small_group']['name']);
    }

    /** @test */
    public function it_respects_custom_per_page_parameter()
    {
        // Arrange
        Member::factory()->count(30)->create();

        // Act
        $request = new Request(['per_page' => 10]);
        $response = $this->controller->index($request);
        $data = json_decode($response->getContent(), true);

        // Assert
        $this->assertEquals(10, $data['pagination']['per_page']);
        $this->assertCount(10, $data['data']);
    }
}
