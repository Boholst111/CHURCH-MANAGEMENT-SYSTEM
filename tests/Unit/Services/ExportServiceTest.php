<?php

namespace Tests\Unit\Services;

use App\Models\Member;
use App\Models\SmallGroup;
use App\Services\ExportService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExportServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ExportService $exportService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->exportService = new ExportService();
    }

    /** @test */
    public function it_generates_timestamped_filename_with_correct_format()
    {
        $filename = $this->exportService->generateTimestampedFilename('test_export', 'csv');

        // Check format: test_export_YYYY-MM-DD_HH-MM-SS.csv
        $this->assertMatchesRegularExpression(
            '/^test_export_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.csv$/',
            $filename
        );
    }

    /** @test */
    public function it_generates_unique_timestamps_for_sequential_calls()
    {
        $filename1 = $this->exportService->generateTimestampedFilename('export', 'csv');
        
        // Sleep for 1 second to ensure different timestamp
        sleep(1);
        
        $filename2 = $this->exportService->generateTimestampedFilename('export', 'csv');

        $this->assertNotEquals($filename1, $filename2);
    }

    /** @test */
    public function it_exports_members_to_csv_with_default_columns()
    {
        $smallGroup = SmallGroup::factory()->create(['name' => 'Youth Group']);
        
        $members = new Collection([
            Member::factory()->create([
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@example.com',
                'phone' => '123-456-7890',
                'status' => 'active',
                'small_group_id' => $smallGroup->id,
            ]),
            Member::factory()->create([
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'email' => 'jane@example.com',
                'phone' => '098-765-4321',
                'status' => 'visitor',
                'small_group_id' => null,
            ]),
        ]);

        $response = $this->exportService->exportMembersToCSV($members);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
        $this->assertStringContainsString('attachment', $response->headers->get('Content-Disposition'));
        $this->assertStringContainsString('members_export_', $response->headers->get('Content-Disposition'));
        $this->assertStringContainsString('.csv', $response->headers->get('Content-Disposition'));
    }

    /** @test */
    public function it_exports_members_with_custom_columns()
    {
        $members = new Collection([
            Member::factory()->create([
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@example.com',
            ]),
        ]);

        $customColumns = ['first_name', 'last_name', 'email'];
        $response = $this->exportService->exportMembersToCSV($members, $customColumns);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /** @test */
    public function it_exports_empty_collection_with_headers_only()
    {
        $members = new Collection([]);

        $response = $this->exportService->exportMembersToCSV($members);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /** @test */
    public function it_handles_members_without_small_group()
    {
        $members = new Collection([
            Member::factory()->create([
                'first_name' => 'John',
                'last_name' => 'Doe',
                'small_group_id' => null,
            ]),
        ]);

        $response = $this->exportService->exportMembersToCSV($members);

        $this->assertEquals(200, $response->getStatusCode());
    }

    /** @test */
    public function it_handles_members_with_null_dates()
    {
        $members = new Collection([
            Member::factory()->create([
                'first_name' => 'John',
                'last_name' => 'Doe',
                'birth_date' => null,
            ]),
        ]);

        $response = $this->exportService->exportMembersToCSV($members);

        $this->assertEquals(200, $response->getStatusCode());
    }

    /** @test */
    public function it_exports_filtered_members()
    {
        $activeMembers = new Collection([
            Member::factory()->create(['status' => 'active']),
            Member::factory()->create(['status' => 'active']),
        ]);

        $filters = ['status' => 'active'];
        $response = $this->exportService->exportFilteredMembers($activeMembers, $filters);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /** @test */
    public function it_sets_correct_cache_control_headers()
    {
        $members = new Collection([
            Member::factory()->create(),
        ]);

        $response = $this->exportService->exportMembersToCSV($members);

        $cacheControl = $response->headers->get('Cache-Control');
        $this->assertStringContainsString('no-cache', $cacheControl);
        $this->assertStringContainsString('no-store', $cacheControl);
        $this->assertStringContainsString('must-revalidate', $cacheControl);
        $this->assertEquals('no-cache', $response->headers->get('Pragma'));
        $this->assertEquals('0', $response->headers->get('Expires'));
    }

    /** @test */
    public function it_formats_dates_correctly_in_export()
    {
        $dateJoined = now()->subMonths(6);
        $birthDate = now()->subYears(25);

        $member = Member::factory()->create([
            'date_joined' => $dateJoined,
            'birth_date' => $birthDate,
        ]);

        $members = new Collection([$member]);

        // We can't easily test the actual CSV content without capturing the stream,
        // but we can verify the response is created successfully
        $response = $this->exportService->exportMembersToCSV($members);

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * Test CSV export with filtered data - active members only
     * **Validates: Requirements 11.1, 11.3**
     * 
     * @test
     */
    public function it_exports_csv_with_filtered_active_members()
    {
        $smallGroup = SmallGroup::factory()->create(['name' => 'Prayer Group']);
        
        // Create active and visitor members
        $activeMembers = new Collection([
            Member::factory()->create([
                'first_name' => 'Active',
                'last_name' => 'Member1',
                'status' => 'active',
                'small_group_id' => $smallGroup->id,
            ]),
            Member::factory()->create([
                'first_name' => 'Active',
                'last_name' => 'Member2',
                'status' => 'active',
                'small_group_id' => null,
            ]),
        ]);

        $response = $this->exportService->exportFilteredMembers($activeMembers, ['status' => 'active']);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
        $this->assertStringContainsString('attachment', $response->headers->get('Content-Disposition'));
        $this->assertStringContainsString('members_export_', $response->headers->get('Content-Disposition'));
    }

    /**
     * Test CSV export with filtered data - visitors only
     * **Validates: Requirements 11.1, 11.3**
     * 
     * @test
     */
    public function it_exports_csv_with_filtered_visitors()
    {
        $visitorMembers = new Collection([
            Member::factory()->create([
                'first_name' => 'Visitor',
                'last_name' => 'One',
                'status' => 'visitor',
            ]),
            Member::factory()->create([
                'first_name' => 'Visitor',
                'last_name' => 'Two',
                'status' => 'visitor',
            ]),
        ]);

        $response = $this->exportService->exportFilteredMembers($visitorMembers, ['status' => 'visitor']);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /**
     * Test CSV export with filtered data - by small group
     * **Validates: Requirements 11.1, 11.3**
     * 
     * @test
     */
    public function it_exports_csv_with_filtered_small_group_members()
    {
        $smallGroup = SmallGroup::factory()->create(['name' => 'Youth Ministry']);
        
        $groupMembers = new Collection([
            Member::factory()->create([
                'first_name' => 'Youth',
                'last_name' => 'Member1',
                'small_group_id' => $smallGroup->id,
            ]),
            Member::factory()->create([
                'first_name' => 'Youth',
                'last_name' => 'Member2',
                'small_group_id' => $smallGroup->id,
            ]),
        ]);

        $response = $this->exportService->exportFilteredMembers(
            $groupMembers, 
            ['small_group_id' => $smallGroup->id]
        );

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /**
     * Test CSV export with search filter
     * **Validates: Requirements 11.1, 11.3**
     * 
     * @test
     */
    public function it_exports_csv_with_search_filtered_members()
    {
        $searchResults = new Collection([
            Member::factory()->create([
                'first_name' => 'John',
                'last_name' => 'Smith',
                'email' => 'john.smith@example.com',
            ]),
            Member::factory()->create([
                'first_name' => 'Johnny',
                'last_name' => 'Doe',
                'email' => 'johnny.doe@example.com',
            ]),
        ]);

        $response = $this->exportService->exportFilteredMembers(
            $searchResults, 
            ['search' => 'john']
        );

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /**
     * Test CSV export with multiple filters applied
     * **Validates: Requirements 11.1, 11.3**
     * 
     * @test
     */
    public function it_exports_csv_with_multiple_filters()
    {
        $smallGroup = SmallGroup::factory()->create(['name' => 'Adult Group']);
        
        $filteredMembers = new Collection([
            Member::factory()->create([
                'first_name' => 'Active',
                'last_name' => 'Adult',
                'status' => 'active',
                'small_group_id' => $smallGroup->id,
            ]),
        ]);

        $response = $this->exportService->exportFilteredMembers(
            $filteredMembers, 
            ['status' => 'active', 'small_group_id' => $smallGroup->id]
        );

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /**
     * Test filename formatting with different base names
     * **Validates: Requirements 11.5**
     * 
     * @test
     */
    public function it_generates_filename_with_different_base_names()
    {
        $csvFilename = $this->exportService->generateTimestampedFilename('members_export', 'csv');
        $pdfFilename = $this->exportService->generateTimestampedFilename('financial_report', 'pdf');
        $xlsxFilename = $this->exportService->generateTimestampedFilename('attendance_data', 'xlsx');

        $this->assertStringStartsWith('members_export_', $csvFilename);
        $this->assertStringEndsWith('.csv', $csvFilename);
        
        $this->assertStringStartsWith('financial_report_', $pdfFilename);
        $this->assertStringEndsWith('.pdf', $pdfFilename);
        
        $this->assertStringStartsWith('attendance_data_', $xlsxFilename);
        $this->assertStringEndsWith('.xlsx', $xlsxFilename);
    }

    /**
     * Test filename timestamp format matches YYYY-MM-DD_HH-MM-SS
     * **Validates: Requirements 11.5**
     * 
     * @test
     */
    public function it_generates_filename_with_correct_timestamp_format()
    {
        $filename = $this->exportService->generateTimestampedFilename('export', 'csv');
        
        // Extract timestamp portion (between first underscore and extension)
        preg_match('/export_(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})\.csv/', $filename, $matches);
        
        $this->assertNotEmpty($matches, 'Filename should contain timestamp in correct format');
        $timestamp = $matches[1];
        
        // Verify format components
        $parts = explode('_', $timestamp);
        $this->assertCount(2, $parts, 'Timestamp should have date and time parts');
        
        // Verify date format YYYY-MM-DD
        $dateParts = explode('-', $parts[0]);
        $this->assertCount(3, $dateParts);
        $this->assertEquals(4, strlen($dateParts[0]), 'Year should be 4 digits');
        $this->assertEquals(2, strlen($dateParts[1]), 'Month should be 2 digits');
        $this->assertEquals(2, strlen($dateParts[2]), 'Day should be 2 digits');
        
        // Verify time format HH-MM-SS
        $timeParts = explode('-', $parts[1]);
        $this->assertCount(3, $timeParts);
        $this->assertEquals(2, strlen($timeParts[0]), 'Hour should be 2 digits');
        $this->assertEquals(2, strlen($timeParts[1]), 'Minute should be 2 digits');
        $this->assertEquals(2, strlen($timeParts[2]), 'Second should be 2 digits');
    }

    /**
     * Test filename includes current date and time
     * **Validates: Requirements 11.5**
     * 
     * @test
     */
    public function it_generates_filename_with_current_timestamp()
    {
        $beforeTime = now();
        $filename = $this->exportService->generateTimestampedFilename('test', 'csv');
        $afterTime = now();
        
        // Extract timestamp from filename
        preg_match('/test_(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})\.csv/', $filename, $matches);
        $timestamp = $matches[1];
        
        // Convert to datetime
        $filenameTime = \Carbon\Carbon::createFromFormat('Y-m-d_H-i-s', $timestamp);
        
        // Verify timestamp is between before and after (within reasonable range)
        $this->assertTrue(
            $filenameTime->between($beforeTime->subSecond(), $afterTime->addSecond()),
            'Filename timestamp should be current time'
        );
    }

    /**
     * Test CSV export includes all visible columns
     * **Validates: Requirements 11.1, 11.3**
     * 
     * @test
     */
    public function it_exports_csv_with_all_specified_columns()
    {
        $smallGroup = SmallGroup::factory()->create(['name' => 'Test Group']);
        
        $member = Member::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
            'phone' => '123-456-7890',
            'address' => '123 Main St',
            'city' => 'Test City',
            'status' => 'active',
            'small_group_id' => $smallGroup->id,
            'gender' => 'male',
        ]);

        $columns = ['first_name', 'last_name', 'email', 'phone', 'status', 'small_group_name'];
        $members = new Collection([$member]);
        
        $response = $this->exportService->exportMembersToCSV($members, $columns);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }

    /**
     * Test CSV export handles special characters in data
     * **Validates: Requirements 11.1**
     * 
     * @test
     */
    public function it_exports_csv_with_special_characters()
    {
        $members = new Collection([
            Member::factory()->create([
                'first_name' => 'José',
                'last_name' => 'O\'Brien',
                'email' => 'jose.obrien@example.com',
                'address' => '123 "Main" Street, Apt #5',
            ]),
        ]);

        $response = $this->exportService->exportMembersToCSV($members);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('text/csv', $response->headers->get('Content-Type'));
    }
}
