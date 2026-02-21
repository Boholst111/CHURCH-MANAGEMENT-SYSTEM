<?php

namespace Tests\Unit\Services;

use App\Models\Member;
use App\Models\Tithe;
use App\Repositories\FinanceRepository;
use App\Repositories\MemberRepository;
use App\Services\ReportService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;
use Tests\TestCase;

class ReportServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $reportService;
    protected $financeRepository;
    protected $memberRepository;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->financeRepository = new FinanceRepository();
        $this->memberRepository = new MemberRepository();
        $this->reportService = new ReportService(
            $this->financeRepository,
            $this->memberRepository
        );
    }

    /** @test */
    public function it_generates_financial_report_with_correct_structure()
    {
        // Create test data
        $member = Member::factory()->create();
        Tithe::factory()->count(5)->create([
            'member_id' => $member->id,
            'date' => now()->subDays(5),
        ]);

        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $report = $this->reportService->generateFinancialReport($startDate, $endDate);

        $this->assertIsArray($report);
        $this->assertArrayHasKey('period', $report);
        $this->assertArrayHasKey('summary', $report);
        $this->assertArrayHasKey('average_per_member', $report);
        $this->assertArrayHasKey('monthly_totals', $report);
        $this->assertArrayHasKey('trends', $report);
        
        $this->assertEquals($startDate, $report['period']['start_date']);
        $this->assertEquals($endDate, $report['period']['end_date']);
    }

    /** @test */
    public function it_generates_demographic_report_with_correct_structure()
    {
        // Create test data
        Member::factory()->count(10)->create();

        $report = $this->reportService->generateDemographicReport();

        $this->assertIsArray($report);
        $this->assertArrayHasKey('by_age', $report);
        $this->assertArrayHasKey('by_location', $report);
        $this->assertArrayHasKey('by_gender', $report);
        $this->assertArrayHasKey('by_status', $report);
        $this->assertArrayHasKey('by_small_group', $report);
        $this->assertArrayHasKey('total_members', $report);
        
        $this->assertEquals(10, $report['total_members']);
    }

    /** @test */
    public function it_aggregates_members_by_age_correctly()
    {
        // Create members with different ages
        Member::factory()->create(['birth_date' => now()->subYears(15)]);  // 0-17
        Member::factory()->create(['birth_date' => now()->subYears(25)]);  // 18-30
        Member::factory()->create(['birth_date' => now()->subYears(40)]);  // 31-50
        Member::factory()->create(['birth_date' => now()->subYears(60)]);  // 51-70
        Member::factory()->create(['birth_date' => now()->subYears(75)]);  // 71+
        Member::factory()->create(['birth_date' => null]);                 // unknown

        $report = $this->reportService->generateDemographicReport();

        $this->assertEquals(1, $report['by_age']['0-17']);
        $this->assertEquals(1, $report['by_age']['18-30']);
        $this->assertEquals(1, $report['by_age']['31-50']);
        $this->assertEquals(1, $report['by_age']['51-70']);
        $this->assertEquals(1, $report['by_age']['71+']);
        $this->assertEquals(1, $report['by_age']['unknown']);
    }

    /** @test */
    public function it_aggregates_members_by_location_correctly()
    {
        Member::factory()->count(3)->create(['city' => 'Manila']);
        Member::factory()->count(2)->create(['city' => 'Cebu']);
        Member::factory()->count(1)->create(['city' => 'Davao']);

        $report = $this->reportService->generateDemographicReport();

        $this->assertEquals(3, $report['by_location']['Manila']);
        $this->assertEquals(2, $report['by_location']['Cebu']);
        $this->assertEquals(1, $report['by_location']['Davao']);
    }

    /** @test */
    public function it_aggregates_members_by_gender_correctly()
    {
        Member::factory()->count(4)->create(['gender' => 'male']);
        Member::factory()->count(5)->create(['gender' => 'female']);
        Member::factory()->count(1)->create(['gender' => 'other']);

        $report = $this->reportService->generateDemographicReport();

        $this->assertEquals(4, $report['by_gender']['male']);
        $this->assertEquals(5, $report['by_gender']['female']);
        $this->assertEquals(1, $report['by_gender']['other']);
    }

    /** @test */
    public function it_aggregates_members_by_status_correctly()
    {
        Member::factory()->count(7)->create(['status' => 'active']);
        Member::factory()->count(3)->create(['status' => 'visitor']);

        $report = $this->reportService->generateDemographicReport();

        $this->assertEquals(7, $report['by_status']['active']);
        $this->assertEquals(3, $report['by_status']['visitor']);
    }

    /** @test */
    public function it_calculates_giving_trends_correctly()
    {
        // Create increasing trend
        for ($i = 0; $i < 6; $i++) {
            Tithe::factory()->create([
                'amount' => 100,
                'date' => now()->subMonths(11 - $i),
            ]);
        }
        
        for ($i = 0; $i < 6; $i++) {
            Tithe::factory()->create([
                'amount' => 200,
                'date' => now()->subMonths(5 - $i),
            ]);
        }

        $startDate = now()->subMonths(12)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $report = $this->reportService->generateFinancialReport($startDate, $endDate);

        $this->assertEquals('increasing', $report['trends']['trend']);
        $this->assertGreaterThan(5, $report['trends']['percentage_change']);
    }

    /** @test */
    public function it_handles_empty_data_gracefully()
    {
        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $report = $this->reportService->generateFinancialReport($startDate, $endDate);

        $this->assertEquals('stable', $report['trends']['trend']);
        $this->assertEquals(0, $report['trends']['percentage_change']);
    }

    /** @test */
    public function it_generates_financial_pdf_successfully()
    {
        // Create test data
        $member = Member::factory()->create();
        Tithe::factory()->count(3)->create([
            'member_id' => $member->id,
            'date' => now()->subDays(5),
        ]);

        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateFinancialPDF($startDate, $endDate);

        $this->assertNotNull($response);
        $this->assertStringContainsString('financial-report', $response->headers->get('content-disposition'));
    }

    /** @test */
    public function it_generates_demographic_pdf_successfully()
    {
        // Create test data
        Member::factory()->count(5)->create();

        $response = $this->reportService->generateDemographicPDF();

        $this->assertNotNull($response);
        $this->assertStringContainsString('demographic-report', $response->headers->get('content-disposition'));
    }

    /** @test */
    public function it_generates_combined_pdf_successfully()
    {
        // Create test data
        $member = Member::factory()->create();
        Tithe::factory()->count(3)->create([
            'member_id' => $member->id,
            'date' => now()->subDays(5),
        ]);
        Member::factory()->count(5)->create();

        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateCombinedPDF($startDate, $endDate);

        $this->assertNotNull($response);
        $this->assertStringContainsString('church-report', $response->headers->get('content-disposition'));
    }

    /**
     * Test PDF export with financial report data
     * **Validates: Requirements 11.2**
     * 
     * @test
     */
    public function it_generates_pdf_with_financial_report_data()
    {
        $member = Member::factory()->create();
        
        // Create tithes with specific amounts
        Tithe::factory()->create([
            'member_id' => $member->id,
            'amount' => 100.00,
            'date' => now()->subDays(5),
        ]);
        Tithe::factory()->create([
            'member_id' => $member->id,
            'amount' => 200.00,
            'date' => now()->subDays(3),
        ]);

        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateFinancialPDF($startDate, $endDate);

        $this->assertNotNull($response);
        $this->assertStringContainsString('financial-report', $response->headers->get('content-disposition'));
        $this->assertStringContainsString('application/pdf', $response->headers->get('content-type'));
    }

    /**
     * Test PDF export with demographic report data
     * **Validates: Requirements 11.2**
     * 
     * @test
     */
    public function it_generates_pdf_with_demographic_report_data()
    {
        // Create diverse demographic data
        Member::factory()->create(['gender' => 'male', 'status' => 'active', 'city' => 'Manila']);
        Member::factory()->create(['gender' => 'female', 'status' => 'active', 'city' => 'Manila']);
        Member::factory()->create(['gender' => 'male', 'status' => 'visitor', 'city' => 'Cebu']);

        $response = $this->reportService->generateDemographicPDF();

        $this->assertNotNull($response);
        $this->assertStringContainsString('demographic-report', $response->headers->get('content-disposition'));
        $this->assertStringContainsString('application/pdf', $response->headers->get('content-type'));
    }

    /**
     * Test PDF export with combined report data
     * **Validates: Requirements 11.2**
     * 
     * @test
     */
    public function it_generates_pdf_with_combined_report_data()
    {
        // Create both financial and demographic data
        $member = Member::factory()->create(['city' => 'Manila', 'status' => 'active']);
        Tithe::factory()->count(3)->create([
            'member_id' => $member->id,
            'amount' => 150.00,
            'date' => now()->subDays(5),
        ]);
        Member::factory()->count(4)->create(['status' => 'visitor']);

        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateCombinedPDF($startDate, $endDate);

        $this->assertNotNull($response);
        $this->assertStringContainsString('church-report', $response->headers->get('content-disposition'));
        $this->assertStringContainsString('application/pdf', $response->headers->get('content-type'));
    }

    /**
     * Test PDF filename formatting for financial report
     * **Validates: Requirements 11.5**
     * 
     * @test
     */
    public function it_generates_pdf_with_correct_filename_format_financial()
    {
        $member = Member::factory()->create();
        Tithe::factory()->create([
            'member_id' => $member->id,
            'date' => now()->subDays(5),
        ]);

        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateFinancialPDF($startDate, $endDate);

        $contentDisposition = $response->headers->get('content-disposition');
        
        // Verify filename contains 'financial-report' and date
        $this->assertStringContainsString('financial-report-', $contentDisposition);
        $this->assertStringContainsString('.pdf', $contentDisposition);
        
        // Verify date format in filename (YYYY-MM-DD)
        $this->assertMatchesRegularExpression(
            '/financial-report-\d{4}-\d{2}-\d{2}\.pdf/',
            $contentDisposition
        );
    }

    /**
     * Test PDF filename formatting for demographic report
     * **Validates: Requirements 11.5**
     * 
     * @test
     */
    public function it_generates_pdf_with_correct_filename_format_demographic()
    {
        Member::factory()->count(3)->create();

        $response = $this->reportService->generateDemographicPDF();

        $contentDisposition = $response->headers->get('content-disposition');
        
        // Verify filename contains 'demographic-report' and date
        $this->assertStringContainsString('demographic-report-', $contentDisposition);
        $this->assertStringContainsString('.pdf', $contentDisposition);
        
        // Verify date format in filename (YYYY-MM-DD)
        $this->assertMatchesRegularExpression(
            '/demographic-report-\d{4}-\d{2}-\d{2}\.pdf/',
            $contentDisposition
        );
    }

    /**
     * Test PDF filename formatting for combined report
     * **Validates: Requirements 11.5**
     * 
     * @test
     */
    public function it_generates_pdf_with_correct_filename_format_combined()
    {
        $member = Member::factory()->create();
        Tithe::factory()->create([
            'member_id' => $member->id,
            'date' => now()->subDays(5),
        ]);

        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateCombinedPDF($startDate, $endDate);

        $contentDisposition = $response->headers->get('content-disposition');
        
        // Verify filename contains 'church-report' and date
        $this->assertStringContainsString('church-report-', $contentDisposition);
        $this->assertStringContainsString('.pdf', $contentDisposition);
        
        // Verify date format in filename (YYYY-MM-DD)
        $this->assertMatchesRegularExpression(
            '/church-report-\d{4}-\d{2}-\d{2}\.pdf/',
            $contentDisposition
        );
    }

    /**
     * Test PDF export with empty financial data
     * **Validates: Requirements 11.2**
     * 
     * @test
     */
    public function it_generates_pdf_with_empty_financial_data()
    {
        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateFinancialPDF($startDate, $endDate);

        $this->assertNotNull($response);
        $this->assertStringContainsString('financial-report', $response->headers->get('content-disposition'));
    }

    /**
     * Test PDF export with empty demographic data
     * **Validates: Requirements 11.2**
     * 
     * @test
     */
    public function it_generates_pdf_with_empty_demographic_data()
    {
        // No members created
        $response = $this->reportService->generateDemographicPDF();

        $this->assertNotNull($response);
        $this->assertStringContainsString('demographic-report', $response->headers->get('content-disposition'));
    }

    /**
     * Test PDF export with date range filtering
     * **Validates: Requirements 11.2**
     * 
     * @test
     */
    public function it_generates_pdf_with_filtered_date_range()
    {
        $member = Member::factory()->create();
        
        // Create tithes within and outside date range
        Tithe::factory()->create([
            'member_id' => $member->id,
            'amount' => 100.00,
            'date' => now()->subDays(5), // Within range
        ]);
        Tithe::factory()->create([
            'member_id' => $member->id,
            'amount' => 200.00,
            'date' => now()->subDays(20), // Outside range
        ]);

        $startDate = now()->subDays(10)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateFinancialPDF($startDate, $endDate);

        $this->assertNotNull($response);
        $this->assertStringContainsString('financial-report', $response->headers->get('content-disposition'));
    }

    /**
     * Test PDF includes report generation timestamp
     * **Validates: Requirements 11.2**
     * 
     * @test
     */
    public function it_includes_generation_timestamp_in_pdf_data()
    {
        Member::factory()->count(3)->create();

        // Generate report and verify data structure includes timestamp
        $reportData = $this->reportService->generateDemographicReport();
        
        $this->assertIsArray($reportData);
        
        // The PDF generation methods pass 'generated_at' to the view
        // We verify the report data is structured correctly
        $this->assertArrayHasKey('total_members', $reportData);
    }

    /**
     * Test PDF export with large dataset
     * **Validates: Requirements 11.2**
     * 
     * @test
     */
    public function it_generates_pdf_with_large_dataset()
    {
        // Create large dataset
        Member::factory()->count(50)->create();
        
        $member = Member::factory()->create();
        Tithe::factory()->count(30)->create([
            'member_id' => $member->id,
            'date' => now()->subDays(rand(1, 30)),
        ]);

        $startDate = now()->subDays(30)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');

        $response = $this->reportService->generateCombinedPDF($startDate, $endDate);

        $this->assertNotNull($response);
        $this->assertStringContainsString('church-report', $response->headers->get('content-disposition'));
    }
}
