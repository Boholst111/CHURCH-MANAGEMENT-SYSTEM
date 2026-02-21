<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\SmallGroup;
use App\Services\ExportService;
use App\Services\MemberService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExportServiceIntegrationTest extends TestCase
{
    use RefreshDatabase;

    protected ExportService $exportService;
    protected MemberService $memberService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->exportService = app(ExportService::class);
        $this->memberService = app(MemberService::class);
    }

    /** @test */
    public function it_exports_all_members_from_member_service()
    {
        // Create test data
        $smallGroup = SmallGroup::factory()->create(['name' => 'Youth Group']);
        
        Member::factory()->count(5)->create([
            'status' => 'active',
            'small_group_id' => $smallGroup->id,
        ]);
        
        Member::factory()->count(3)->create([
            'status' => 'visitor',
            'small_group_id' => null,
        ]);

        // Get all members from service
        $members = $this->memberService->getAllMembers(['smallGroup']);

        // Export to CSV
        $response = $this->exportService->exportMembersToCSV($members);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
        
        // Verify filename has timestamp
        $contentDisposition = $response->headers->get('Content-Disposition');
        $this->assertStringContainsString('members_export_', $contentDisposition);
        $this->assertMatchesRegularExpression('/\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}/', $contentDisposition);
    }

    /** @test */
    public function it_exports_filtered_active_members_only()
    {
        // Create test data
        Member::factory()->count(5)->create(['status' => 'active']);
        Member::factory()->count(3)->create(['status' => 'visitor']);

        // Filter by status using service
        $activeMembers = $this->memberService->filterMembersByStatus('active');

        // Export filtered members
        $response = $this->exportService->exportFilteredMembers($activeMembers, ['status' => 'active']);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(5, $activeMembers->count());
    }

    /** @test */
    public function it_exports_filtered_visitor_members_only()
    {
        // Create test data
        Member::factory()->count(4)->create(['status' => 'active']);
        Member::factory()->count(6)->create(['status' => 'visitor']);

        // Filter by status using service
        $visitors = $this->memberService->filterMembersByStatus('visitor');

        // Export filtered members
        $response = $this->exportService->exportFilteredMembers($visitors, ['status' => 'visitor']);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(6, $visitors->count());
    }

    /** @test */
    public function it_exports_members_filtered_by_small_group()
    {
        // Create test data
        $youthGroup = SmallGroup::factory()->create(['name' => 'Youth Group']);
        $adultGroup = SmallGroup::factory()->create(['name' => 'Adult Group']);
        
        Member::factory()->count(3)->create(['small_group_id' => $youthGroup->id]);
        Member::factory()->count(4)->create(['small_group_id' => $adultGroup->id]);
        Member::factory()->count(2)->create(['small_group_id' => null]);

        // Filter by small group using service
        $youthMembers = $this->memberService->filterMembersBySmallGroup($youthGroup->id, ['smallGroup']);

        // Export filtered members
        $response = $this->exportService->exportFilteredMembers($youthMembers);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(3, $youthMembers->count());
    }

    /** @test */
    public function it_exports_members_from_search_results()
    {
        // Create test data with specific names
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
        
        Member::factory()->create([
            'first_name' => 'Bob',
            'last_name' => 'Johnson',
            'email' => 'bob@example.com',
        ]);

        // Search for members using service
        $searchResults = $this->memberService->searchMembers('john');

        // Export search results
        $response = $this->exportService->exportFilteredMembers($searchResults);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(2, $searchResults->count()); // John Doe and Bob Johnson
    }

    /** @test */
    public function it_exports_with_custom_columns()
    {
        // Create test data
        Member::factory()->count(3)->create();

        // Get members
        $members = $this->memberService->getAllMembers();

        // Export with custom columns
        $customColumns = ['first_name', 'last_name', 'email', 'status'];
        $response = $this->exportService->exportMembersToCSV($members, $customColumns);

        $this->assertEquals(200, $response->getStatusCode());
    }

    /** @test */
    public function it_generates_unique_filenames_for_multiple_exports()
    {
        // Create test data
        Member::factory()->count(2)->create();
        $members = $this->memberService->getAllMembers();

        // Generate first export
        $response1 = $this->exportService->exportMembersToCSV($members);
        $filename1 = $response1->headers->get('Content-Disposition');

        // Wait a moment to ensure different timestamp
        sleep(1);

        // Generate second export
        $response2 = $this->exportService->exportMembersToCSV($members);
        $filename2 = $response2->headers->get('Content-Disposition');

        $this->assertNotEquals($filename1, $filename2);
    }
}
