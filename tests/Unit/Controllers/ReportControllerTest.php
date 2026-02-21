<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Http\Controllers\Api\ReportController;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Mockery;

class ReportControllerTest extends TestCase
{
    protected $reportService;
    protected $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->reportService = Mockery::mock(ReportService::class);
        $this->controller = new ReportController($this->reportService);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_get_financial_report_returns_data()
    {
        $startDate = '2024-01-01';
        $endDate = '2024-12-31';
        
        $expectedData = [
            'period' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'summary' => ['total' => 10000],
            'average_per_member' => 100,
            'monthly_totals' => [],
            'trends' => ['trend' => 'increasing'],
        ];

        $this->reportService
            ->shouldReceive('generateFinancialReport')
            ->once()
            ->with($startDate, $endDate)
            ->andReturn($expectedData);

        $request = Request::create('/api/reports/financial', 'GET', [
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);

        $response = $this->controller->getFinancialReport($request);
        $data = $response->getData(true);

        $this->assertTrue($data['success']);
        $this->assertEquals($expectedData, $data['data']);
    }

    public function test_get_financial_report_validates_dates()
    {
        $this->expectException(\Illuminate\Validation\ValidationException::class);

        $request = Request::create('/api/reports/financial', 'GET', [
            'start_date' => '2024-12-31',
            'end_date' => '2024-01-01', // End before start
        ]);

        $this->controller->getFinancialReport($request);
    }

    public function test_get_demographic_report_returns_data()
    {
        $expectedData = [
            'by_age' => ['18-30' => 10, '31-50' => 20],
            'by_location' => ['City A' => 15, 'City B' => 15],
            'by_gender' => ['male' => 15, 'female' => 15],
            'by_status' => ['active' => 25, 'visitor' => 5],
            'by_small_group' => [],
            'total_members' => 30,
        ];

        $this->reportService
            ->shouldReceive('generateDemographicReport')
            ->once()
            ->andReturn($expectedData);

        $response = $this->controller->getDemographicReport();
        $data = $response->getData(true);

        $this->assertTrue($data['success']);
        $this->assertEquals($expectedData, $data['data']);
    }

    public function test_export_pdf_financial_report()
    {
        $startDate = '2024-01-01';
        $endDate = '2024-12-31';

        $mockPdfResponse = response('PDF content', 200, [
            'Content-Type' => 'application/pdf',
        ]);

        $this->reportService
            ->shouldReceive('generateFinancialPDF')
            ->once()
            ->with($startDate, $endDate)
            ->andReturn($mockPdfResponse);

        $request = Request::create('/api/reports/export-pdf', 'POST', [
            'report_type' => 'financial',
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);
        
        // Create a real user in the database
        $user = \App\Models\User::factory()->create();
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        $response = $this->controller->exportPdf($request);

        $this->assertNotNull($response);
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_export_pdf_demographic_report()
    {
        $mockPdfResponse = response('PDF content', 200, [
            'Content-Type' => 'application/pdf',
        ]);

        $this->reportService
            ->shouldReceive('generateDemographicPDF')
            ->once()
            ->andReturn($mockPdfResponse);

        $request = Request::create('/api/reports/export-pdf', 'POST', [
            'report_type' => 'demographic',
        ]);
        
        // Create a real user in the database
        $user = \App\Models\User::factory()->create();
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        $response = $this->controller->exportPdf($request);

        $this->assertNotNull($response);
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_export_pdf_combined_report()
    {
        $startDate = '2024-01-01';
        $endDate = '2024-12-31';

        $mockPdfResponse = response('PDF content', 200, [
            'Content-Type' => 'application/pdf',
        ]);

        $this->reportService
            ->shouldReceive('generateCombinedPDF')
            ->once()
            ->with($startDate, $endDate)
            ->andReturn($mockPdfResponse);

        $request = Request::create('/api/reports/export-pdf', 'POST', [
            'report_type' => 'combined',
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);
        
        // Create a real user in the database
        $user = \App\Models\User::factory()->create();
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        $response = $this->controller->exportPdf($request);

        $this->assertNotNull($response);
        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_export_pdf_validates_report_type()
    {
        $this->expectException(\Illuminate\Validation\ValidationException::class);

        $request = Request::create('/api/reports/export-pdf', 'POST', [
            'report_type' => 'invalid_type',
        ]);

        $this->controller->exportPdf($request);
    }

    public function test_export_pdf_requires_dates_for_financial_report()
    {
        $this->expectException(\Illuminate\Validation\ValidationException::class);

        $request = Request::create('/api/reports/export-pdf', 'POST', [
            'report_type' => 'financial',
            // Missing start_date and end_date
        ]);

        $this->controller->exportPdf($request);
    }
}
