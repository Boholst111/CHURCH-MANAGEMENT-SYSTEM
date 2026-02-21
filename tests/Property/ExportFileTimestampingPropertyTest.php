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
 * Property-Based Test for Export File Timestamping
 * 
 * Feature: church-management-system
 * Property 34: Export file timestamping
 * Validates: Requirements 11.5
 * 
 * **Validates: Requirements 11.5**
 * 
 * Property: For any data export operation, the generated filename should 
 * include a timestamp in the format YYYY-MM-DD_HH-MM-SS.
 */
class ExportFileTimestampingPropertyTest extends TestCase
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
     * Test that export filename contains timestamp in correct format.
     * 
     * @test
     */
    public function export_filename_contains_timestamp_in_correct_format()
    {
        $this->forAll(
            Generators::choose(0, 10) // Number of members to export
        )
            ->withMaxSize(100)
            ->then(function ($memberCount) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create members
                if ($memberCount > 0) {
                    Member::factory()->count($memberCount)->create();
                }
                
                // Get all members
                $members = $this->memberService->getAllMembers();
                
                // Export to CSV
                $response = $this->exportService->exportMembersToCSV($members);
                
                // Get Content-Disposition header
                $contentDisposition = $response->headers->get('Content-Disposition');
                
                // Property: Filename should contain timestamp in format YYYY-MM-DD_HH-MM-SS
                $this->assertMatchesRegularExpression(
                    '/members_export_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.csv/',
                    $contentDisposition,
                    "Export filename should contain timestamp in format YYYY-MM-DD_HH-MM-SS"
                );
                
                // Extract filename from Content-Disposition header
                preg_match('/filename="([^"]+)"/', $contentDisposition, $matches);
                $filename = $matches[1] ?? '';
                
                // Property: Filename should follow the pattern: basename_YYYY-MM-DD_HH-MM-SS.extension
                $this->assertMatchesRegularExpression(
                    '/^members_export_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.csv$/',
                    $filename,
                    "Filename should be in format: members_export_YYYY-MM-DD_HH-MM-SS.csv"
                );
            });
    }

    /**
     * Test that timestamp in filename represents a valid date and time.
     * 
     * @test
     */
    public function timestamp_in_filename_represents_valid_datetime()
    {
        $this->forAll(
            Generators::choose(1, 5)
        )
            ->withMaxSize(100)
            ->then(function ($memberCount) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create members
                Member::factory()->count($memberCount)->create();
                
                // Get all members
                $members = $this->memberService->getAllMembers();
                
                // Export to CSV
                $response = $this->exportService->exportMembersToCSV($members);
                
                // Get Content-Disposition header
                $contentDisposition = $response->headers->get('Content-Disposition');
                
                // Extract filename
                preg_match('/filename="([^"]+)"/', $contentDisposition, $matches);
                $filename = $matches[1] ?? '';
                
                // Extract timestamp from filename
                preg_match('/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})/', $filename, $timestampMatches);
                $timestamp = $timestampMatches[1] ?? '';
                
                $this->assertNotEmpty($timestamp, "Timestamp should be extracted from filename");
                
                // Property: Timestamp should be parseable as a valid datetime
                $dateTimeParts = explode('_', $timestamp);
                $this->assertCount(2, $dateTimeParts, "Timestamp should have date and time parts separated by underscore");
                
                $datePart = $dateTimeParts[0];
                $timePart = $dateTimeParts[1];
                
                // Validate date part (YYYY-MM-DD)
                $dateComponents = explode('-', $datePart);
                $this->assertCount(3, $dateComponents, "Date should have year, month, and day");
                
                $year = (int) $dateComponents[0];
                $month = (int) $dateComponents[1];
                $day = (int) $dateComponents[2];
                
                $this->assertGreaterThanOrEqual(2000, $year, "Year should be reasonable (>= 2000)");
                $this->assertLessThanOrEqual(2100, $year, "Year should be reasonable (<= 2100)");
                $this->assertGreaterThanOrEqual(1, $month, "Month should be between 1 and 12");
                $this->assertLessThanOrEqual(12, $month, "Month should be between 1 and 12");
                $this->assertGreaterThanOrEqual(1, $day, "Day should be between 1 and 31");
                $this->assertLessThanOrEqual(31, $day, "Day should be between 1 and 31");
                
                // Validate time part (HH-MM-SS)
                $timeComponents = explode('-', $timePart);
                $this->assertCount(3, $timeComponents, "Time should have hour, minute, and second");
                
                $hour = (int) $timeComponents[0];
                $minute = (int) $timeComponents[1];
                $second = (int) $timeComponents[2];
                
                $this->assertGreaterThanOrEqual(0, $hour, "Hour should be between 0 and 23");
                $this->assertLessThanOrEqual(23, $hour, "Hour should be between 0 and 23");
                $this->assertGreaterThanOrEqual(0, $minute, "Minute should be between 0 and 59");
                $this->assertLessThanOrEqual(59, $minute, "Minute should be between 0 and 59");
                $this->assertGreaterThanOrEqual(0, $second, "Second should be between 0 and 59");
                $this->assertLessThanOrEqual(59, $second, "Second should be between 0 and 59");
            });
    }

    /**
     * Test that timestamp is close to current time.
     * 
     * @test
     */
    public function timestamp_is_close_to_current_time()
    {
        $this->forAll(
            Generators::choose(1, 3)
        )
            ->withMaxSize(100)
            ->then(function ($memberCount) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create members
                Member::factory()->count($memberCount)->create();
                
                // Record time before export
                $beforeExport = now();
                
                // Get all members
                $members = $this->memberService->getAllMembers();
                
                // Export to CSV
                $response = $this->exportService->exportMembersToCSV($members);
                
                // Record time after export
                $afterExport = now();
                
                // Get Content-Disposition header
                $contentDisposition = $response->headers->get('Content-Disposition');
                
                // Extract filename
                preg_match('/filename="([^"]+)"/', $contentDisposition, $matches);
                $filename = $matches[1] ?? '';
                
                // Extract timestamp from filename
                preg_match('/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})/', $filename, $timestampMatches);
                $timestampStr = $timestampMatches[1] ?? '';
                
                // Convert timestamp string to datetime
                $timestampFormatted = str_replace('_', ' ', $timestampStr);
                $timestampFormatted = str_replace('-', ':', substr($timestampFormatted, 0, 10)) . 
                                     substr($timestampFormatted, 10);
                $timestampFormatted = substr($timestampFormatted, 0, 10) . 
                                     str_replace('-', ':', substr($timestampFormatted, 10));
                
                // Parse the timestamp (YYYY-MM-DD HH:MM:SS)
                $datePart = substr($timestampStr, 0, 10); // YYYY-MM-DD
                $timePart = str_replace('-', ':', substr($timestampStr, 11)); // HH:MM:SS
                $exportTimestamp = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $datePart . ' ' . $timePart);
                
                // Property: Timestamp should be between before and after export times (within reasonable margin)
                $this->assertTrue(
                    $exportTimestamp->greaterThanOrEqualTo($beforeExport->subSeconds(2)) &&
                    $exportTimestamp->lessThanOrEqualTo($afterExport->addSeconds(2)),
                    "Export timestamp should be close to current time (within 2 seconds margin)"
                );
            });
    }

    /**
     * Test that different export operations generate different timestamps.
     * 
     * @test
     */
    public function different_exports_generate_different_timestamps()
    {
        $this->forAll(
            Generators::choose(1, 3)
        )
            ->withMaxSize(50) // Reduced iterations since we sleep between exports
            ->then(function ($memberCount) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create members
                Member::factory()->count($memberCount)->create();
                
                // Get all members
                $members = $this->memberService->getAllMembers();
                
                // First export
                $response1 = $this->exportService->exportMembersToCSV($members);
                $contentDisposition1 = $response1->headers->get('Content-Disposition');
                preg_match('/filename="([^"]+)"/', $contentDisposition1, $matches1);
                $filename1 = $matches1[1] ?? '';
                
                // Wait to ensure different timestamp
                sleep(1);
                
                // Second export
                $response2 = $this->exportService->exportMembersToCSV($members);
                $contentDisposition2 = $response2->headers->get('Content-Disposition');
                preg_match('/filename="([^"]+)"/', $contentDisposition2, $matches2);
                $filename2 = $matches2[1] ?? '';
                
                // Property: Sequential exports should have different timestamps
                $this->assertNotEquals(
                    $filename1,
                    $filename2,
                    "Sequential exports should generate different timestamped filenames"
                );
            });
    }

    /**
     * Test that filtered exports also have timestamped filenames.
     * 
     * @test
     */
    public function filtered_exports_have_timestamped_filenames()
    {
        $this->forAll(
            Generators::elements('active', 'visitor')
        )
            ->withMaxSize(100)
            ->then(function ($statusFilter) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create members with different statuses
                Member::factory()->count(3)->create(['status' => 'active']);
                Member::factory()->count(2)->create(['status' => 'visitor']);
                
                // Filter members by status
                $filteredMembers = $this->memberService->filterMembersByStatus($statusFilter);
                
                // Export filtered members
                $response = $this->exportService->exportFilteredMembers($filteredMembers, ['status' => $statusFilter]);
                
                // Get Content-Disposition header
                $contentDisposition = $response->headers->get('Content-Disposition');
                
                // Property: Filtered export filename should also contain timestamp
                $this->assertMatchesRegularExpression(
                    '/members_export_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.csv/',
                    $contentDisposition,
                    "Filtered export filename should contain timestamp in format YYYY-MM-DD_HH-MM-SS"
                );
            });
    }

    /**
     * Test that custom column exports have timestamped filenames.
     * 
     * @test
     */
    public function custom_column_exports_have_timestamped_filenames()
    {
        $this->forAll(
            Generators::choose(1, 5)
        )
            ->withMaxSize(100)
            ->then(function ($memberCount) {
                // Clean database before each iteration
                Member::query()->delete();
                
                // Create members
                Member::factory()->count($memberCount)->create();
                
                // Get all members
                $members = $this->memberService->getAllMembers();
                
                // Define custom columns
                $customColumns = ['first_name', 'last_name', 'email'];
                
                // Export with custom columns
                $response = $this->exportService->exportMembersToCSV($members, $customColumns);
                
                // Get Content-Disposition header
                $contentDisposition = $response->headers->get('Content-Disposition');
                
                // Property: Custom column export filename should also contain timestamp
                $this->assertMatchesRegularExpression(
                    '/members_export_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.csv/',
                    $contentDisposition,
                    "Custom column export filename should contain timestamp in format YYYY-MM-DD_HH-MM-SS"
                );
            });
    }

    /**
     * Test that generateTimestampedFilename method produces correct format.
     * 
     * @test
     */
    public function generate_timestamped_filename_produces_correct_format()
    {
        $this->forAll(
            Generators::elements('members_export', 'report', 'data_export', 'backup'),
            Generators::elements('csv', 'pdf', 'xlsx', 'txt')
        )
            ->withMaxSize(100)
            ->then(function ($baseName, $extension) {
                // Generate timestamped filename
                $filename = $this->exportService->generateTimestampedFilename($baseName, $extension);
                
                // Property: Filename should match pattern: basename_YYYY-MM-DD_HH-MM-SS.extension
                $pattern = '/^' . preg_quote($baseName, '/') . '_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.' . preg_quote($extension, '/') . '$/';
                $this->assertMatchesRegularExpression(
                    $pattern,
                    $filename,
                    "Filename should be in format: {$baseName}_YYYY-MM-DD_HH-MM-SS.{$extension}"
                );
                
                // Property: Filename should contain exactly one timestamp
                preg_match_all('/\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}/', $filename, $matches);
                $this->assertCount(
                    1,
                    $matches[0],
                    "Filename should contain exactly one timestamp"
                );
            });
    }
}
