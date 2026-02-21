<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\SmallGroup;
use App\Services\ExportService;
use App\Services\MemberService;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for CSV Export Completeness
 * 
 * Feature: church-management-system
 * Property 33: CSV export completeness
 * Validates: Requirements 11.1, 11.3
 * 
 * **Validates: Requirements 11.1, 11.3**
 * 
 * Property: For any member directory view with applied filters, the exported 
 * CSV should contain exactly the members visible in the current view with all 
 * displayed columns.
 */
class CsvExportCompletenessPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected ExportService $exportService;
    protected MemberService $memberService;

    protected function setUp(): void
    {
        parent::setUp();
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Initialize services
        $this->exportService = new ExportService();
        $this->memberService = new MemberService(new MemberRepository());
    }

    /**
     * Test that CSV export contains exactly the filtered members.
     * 
     * @test
     */
    public function csv_export_contains_exactly_filtered_members()
    {
        $this->forAll(
            Generators::elements('active', 'visitor')
        )
            ->withMaxSize(100)
            ->then(function ($statusFilter) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create diverse member data
                $activeCount = rand(2, 5);
                $visitorCount = rand(2, 5);
                
                $activeMembers = Member::factory()->count($activeCount)->create(['status' => 'active']);
                $visitorMembers = Member::factory()->count($visitorCount)->create(['status' => 'visitor']);
                
                // Filter members by status
                $filteredMembers = $this->memberService->filterMembersByStatus($statusFilter);
                
                // Export filtered members
                $response = $this->exportService->exportFilteredMembers($filteredMembers, ['status' => $statusFilter]);
                
                // Verify response is successful
                $this->assertEquals(200, $response->getStatusCode());
                $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
                
                // Capture CSV content
                ob_start();
                $response->sendContent();
                $csvContent = ob_get_clean();
                
                // Parse CSV content
                $lines = array_filter(explode("\n", trim($csvContent)));
                $dataRows = count($lines) - 1; // Subtract header row
                
                // Property: CSV should contain exactly the same number of members as filtered
                $expectedCount = $statusFilter === 'active' ? $activeCount : $visitorCount;
                $this->assertEquals(
                    $expectedCount,
                    $dataRows,
                    "CSV export should contain exactly {$expectedCount} members for status '{$statusFilter}', but found {$dataRows}"
                );
                
                // Property: All exported members should have the correct status
                $csvRows = array_slice($lines, 1); // Skip header
                foreach ($csvRows as $row) {
                    $columns = str_getcsv($row);
                    // Status is the 8th column (index 7) in default export
                    $statusInCsv = $columns[7] ?? '';
                    $this->assertEquals(
                        $statusFilter,
                        $statusInCsv,
                        "All exported members should have status '{$statusFilter}'"
                    );
                }
            });
    }

    /**
     * Test that CSV export includes all specified columns.
     * 
     * @test
     */
    public function csv_export_includes_all_specified_columns()
    {
        $this->forAll(
            Generators::choose(1, 5) // Use choose instead of int for explicit range
        )
            ->withMaxSize(100)
            ->then(function ($memberCount) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create members
                $members = Member::factory()->count($memberCount)->create();
                
                // Define custom columns to export
                $columns = ['first_name', 'last_name', 'email', 'phone', 'status'];
                
                // Get all members
                $allMembers = $this->memberService->getAllMembers();
                
                // Export with custom columns
                $response = $this->exportService->exportMembersToCSV($allMembers, $columns);
                
                // Capture CSV content
                ob_start();
                $response->sendContent();
                $csvContent = ob_get_clean();
                
                // Parse CSV content - don't filter empty lines for accurate count
                $lines = explode("\n", $csvContent);
                $lines = array_filter($lines, function($line) {
                    return trim($line) !== '';
                });
                $lines = array_values($lines); // Re-index array
                
                $headerRow = str_getcsv($lines[0]);
                
                // Property: CSV should have exactly the specified number of columns
                $this->assertEquals(
                    count($columns),
                    count($headerRow),
                    "CSV should have exactly " . count($columns) . " columns"
                );
                
                // Property: CSV should have correct number of data rows
                $dataRows = count($lines) - 1;
                $this->assertEquals(
                    $memberCount,
                    $dataRows,
                    "CSV should have exactly {$memberCount} data rows"
                );
            });
    }

    /**
     * Test that CSV export with search filter contains only matching members.
     * 
     * @test
     */
    public function csv_export_with_search_contains_only_matching_members()
    {
        $this->forAll(
            Generators::elements('john', 'jane', 'smith', 'doe')
        )
            ->withMaxSize(100)
            ->then(function ($searchQuery) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create members with known names
                $matchingMembers = [
                    Member::factory()->create([
                        'first_name' => 'John',
                        'last_name' => 'Doe',
                        'email' => 'john.doe@example.com',
                    ]),
                    Member::factory()->create([
                        'first_name' => 'Jane',
                        'last_name' => 'Smith',
                        'email' => 'jane.smith@example.com',
                    ]),
                ];
                
                $nonMatchingMember = Member::factory()->create([
                    'first_name' => 'Bob',
                    'last_name' => 'Williams',
                    'email' => 'bob.w@example.org',
                ]);
                
                // Search members
                $searchResults = $this->memberService->searchMembers($searchQuery);
                
                // Export search results
                $response = $this->exportService->exportFilteredMembers($searchResults);
                
                // Capture CSV content
                ob_start();
                $response->sendContent();
                $csvContent = ob_get_clean();
                
                // Parse CSV content
                $lines = array_filter(explode("\n", trim($csvContent)));
                $dataRows = count($lines) - 1;
                
                // Property: CSV should contain exactly the same number as search results
                $this->assertEquals(
                    $searchResults->count(),
                    $dataRows,
                    "CSV export should contain exactly {$searchResults->count()} members matching search query '{$searchQuery}'"
                );
                
                // Property: All exported members should match the search query
                $csvRows = array_slice($lines, 1); // Skip header
                foreach ($csvRows as $row) {
                    $columns = str_getcsv($row);
                    $firstName = $columns[1] ?? ''; // First Name is 2nd column
                    $lastName = $columns[2] ?? '';  // Last Name is 3rd column
                    $email = $columns[3] ?? '';     // Email is 4th column
                    
                    $queryLower = strtolower($searchQuery);
                    $matchesFirstName = str_contains(strtolower($firstName), $queryLower);
                    $matchesLastName = str_contains(strtolower($lastName), $queryLower);
                    $matchesEmail = str_contains(strtolower($email), $queryLower);
                    
                    $matchesAnyField = $matchesFirstName || $matchesLastName || $matchesEmail;
                    
                    $this->assertTrue(
                        $matchesAnyField,
                        "Exported member (name: {$firstName} {$lastName}, email: {$email}) should match search query '{$searchQuery}'"
                    );
                }
            });
    }

    /**
     * Test that CSV export with small group filter contains only members from that group.
     * 
     * @test
     */
    public function csv_export_with_small_group_filter_contains_only_group_members()
    {
        $this->forAll(
            Generators::choose(1, 5), // Use choose instead of int
            Generators::choose(1, 5)
        )
            ->withMaxSize(100)
            ->then(function ($group1Count, $group2Count) {
                // Clean database before each iteration
                Member::query()->delete();
                SmallGroup::query()->delete();
                
                // Create small groups with unique names
                $timestamp = microtime(true);
                $group1 = SmallGroup::factory()->create(['name' => "Youth Group {$timestamp}"]);
                $group2 = SmallGroup::factory()->create(['name' => "Adult Group {$timestamp}"]);
                
                // Create members in different groups
                $group1Members = Member::factory()->count($group1Count)->create(['small_group_id' => $group1->id]);
                $group2Members = Member::factory()->count($group2Count)->create(['small_group_id' => $group2->id]);
                $ungroupedMembers = Member::factory()->count(2)->create(['small_group_id' => null]);
                
                // Filter by group 1
                $filteredMembers = $this->memberService->filterMembersBySmallGroup($group1->id, ['smallGroup']);
                
                // Export filtered members
                $response = $this->exportService->exportFilteredMembers($filteredMembers);
                
                // Capture CSV content
                ob_start();
                $response->sendContent();
                $csvContent = ob_get_clean();
                
                // Parse CSV content - don't filter empty lines for accurate count
                $lines = explode("\n", $csvContent);
                $lines = array_filter($lines, function($line) {
                    return trim($line) !== '';
                });
                $lines = array_values($lines); // Re-index array
                
                $dataRows = count($lines) - 1;
                
                // Property: CSV should contain exactly the members from group 1
                $this->assertEquals(
                    $group1Count,
                    $dataRows,
                    "CSV export should contain exactly {$group1Count} members from group '{$group1->name}'"
                );
                
                // Property: All exported members should belong to the filtered group
                $csvRows = array_slice($lines, 1); // Skip header
                foreach ($csvRows as $row) {
                    $columns = str_getcsv($row);
                    $smallGroupName = $columns[8] ?? ''; // Small Group Name is 9th column
                    $this->assertEquals(
                        $group1->name,
                        $smallGroupName,
                        "All exported members should belong to group '{$group1->name}'"
                    );
                }
            });
    }

    /**
     * Test that empty filtered view exports CSV with headers only.
     * 
     * @test
     */
    public function empty_filtered_view_exports_csv_with_headers_only()
    {
        // Clean database
        Member::query()->delete();
        
        // Create members with only one status
        $members = Member::factory()->count(3)->create(['status' => 'active']);
        
        // Filter by opposite status (should return empty)
        $filteredMembers = $this->memberService->filterMembersByStatus('visitor');
        
        // Export empty filtered results
        $response = $this->exportService->exportFilteredMembers($filteredMembers);
        
        // Capture CSV content
        ob_start();
        $response->sendContent();
        $csvContent = ob_get_clean();
        
        // Parse CSV content
        $lines = array_filter(explode("\n", trim($csvContent)));
        
        // Property: CSV should have only header row when no members match filter
        $this->assertEquals(
            1,
            count($lines),
            "CSV export of empty filtered view should contain only header row"
        );
        
        // Verify header row exists
        $headerRow = str_getcsv($lines[0]);
        $this->assertGreaterThan(
            0,
            count($headerRow),
            "CSV should have header columns even when no data rows"
        );
    }

    /**
     * Test that CSV export preserves data integrity for all fields.
     * 
     * @test
     */
    public function csv_export_preserves_data_integrity_for_all_fields()
    {
        $this->forAll(
            Generators::elements('John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana'),
            Generators::elements('Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Davis'),
            Generators::elements('active', 'visitor')
        )
            ->withMaxSize(100)
            ->then(function ($firstName, $lastName, $status) {
                // Clean database before each iteration
                Member::query()->delete();
                SmallGroup::query()->delete();
                
                // Create member with specific data
                $timestamp = microtime(true);
                $smallGroup = SmallGroup::factory()->create(['name' => "Test Group {$timestamp}"]);
                $member = Member::factory()->create([
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => 'test@example.com',
                    'phone' => '+1234567890',
                    'status' => $status,
                    'small_group_id' => $smallGroup->id,
                ]);
                
                // Get all members
                $allMembers = $this->memberService->getAllMembers(['smallGroup']);
                
                // Export to CSV
                $response = $this->exportService->exportMembersToCSV($allMembers);
                
                // Capture CSV content
                ob_start();
                $response->sendContent();
                $csvContent = ob_get_clean();
                
                // Parse CSV content
                $lines = explode("\n", $csvContent);
                $lines = array_filter($lines, function($line) {
                    return trim($line) !== '';
                });
                $lines = array_values($lines); // Re-index array
                
                // Find the member's row in CSV
                $found = false;
                foreach (array_slice($lines, 1) as $row) {
                    $columns = str_getcsv($row);
                    if ($columns[1] === $firstName && $columns[2] === $lastName) {
                        $found = true;
                        
                        // Property: All fields should match the original member data
                        $this->assertEquals($member->id, $columns[0], "ID should match");
                        $this->assertEquals($firstName, $columns[1], "First name should match");
                        $this->assertEquals($lastName, $columns[2], "Last name should match");
                        $this->assertEquals('test@example.com', $columns[3], "Email should match");
                        $this->assertEquals('+1234567890', $columns[4], "Phone should match");
                        $this->assertEquals($status, $columns[7], "Status should match");
                        $this->assertEquals($smallGroup->name, $columns[8], "Small group name should match");
                        
                        break;
                    }
                }
                
                $this->assertTrue($found, "Member should be found in CSV export");
            });
    }
}
