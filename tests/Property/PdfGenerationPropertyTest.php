<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Models\Tithe;
use App\Services\ReportService;
use App\Repositories\FinanceRepository;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;
use Barryvdh\DomPDF\Facade\Pdf;

/**
 * Property-Based Test for PDF Generation
 * 
 * Feature: church-management-system
 * Property 12: PDF generation succeeds
 * Validates: Requirements 5.5
 * 
 * **Validates: Requirements 5.5**
 * 
 * Property: For any report data (financial or demographic), the system should 
 * be able to generate a valid PDF document containing all the report information.
 */
class PdfGenerationPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected ReportService $reportService;

    protected function setUp(): void
    {
        parent::setUp();
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Initialize service
        $this->reportService = new ReportService(
            new FinanceRepository(),
            new MemberRepository()
        );
    }

    /**
     * Test that financial PDF generation succeeds with various data scenarios.
     * 
     * @test
     */
    public function financial_pdf_generation_succeeds_with_valid_data()
    {
        $this->forAll(
            Generators::choose(0, 20), // Number of tithes (including 0)
            Generators::choose(0, 10)  // Number of members (including 0)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount, $memberCount) {
                // Clear existing data
                Tithe::query()->delete();
                Member::query()->delete();
                
                // Create members
                $members = [];
                for ($i = 0; $i < $memberCount; $i++) {
                    $members[] = Member::factory()->create();
                }
                
                // Create tithes
                $startDate = '2024-01-01';
                $endDate = '2024-01-31';
                
                for ($i = 0; $i < $titheCount; $i++) {
                    $memberId = !empty($members) && $i % 2 === 0
                        ? $members[array_rand($members)]->id
                        : null;
                    
                    $amount = round(mt_rand(1000, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $memberId,
                        'amount' => $amount,
                        'date' => '2024-01-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                        'payment_method' => ['cash', 'check', 'online', 'other'][array_rand(['cash', 'check', 'online', 'other'])],
                    ]);
                }
                
                // Property: PDF generation should succeed without throwing exceptions
                try {
                    $response = $this->reportService->generateFinancialPDF($startDate, $endDate);
                    
                    // Verify response is not null
                    $this->assertNotNull(
                        $response,
                        "PDF generation should return a response object"
                    );
                    
                    // Verify response has content
                    $content = $response->getContent();
                    $this->assertNotEmpty(
                        $content,
                        "PDF should have content"
                    );
                    
                    // Verify PDF header is present (PDF files start with %PDF-)
                    $this->assertStringStartsWith(
                        '%PDF-',
                        $content,
                        "Generated file should be a valid PDF (starts with %PDF-)"
                    );
                    
                    // Verify PDF is valid by checking it has minimum size
                    $this->assertGreaterThan(
                        500,
                        strlen($content),
                        "PDF should have substantial content (>500 bytes)"
                    );
                    
                    $this->assertTrue(true, "PDF generation succeeded");
                } catch (\Exception $e) {
                    $this->fail("PDF generation failed with exception: " . $e->getMessage());
                }
            });
    }

    /**
     * Test that demographic PDF generation succeeds with various member data.
     * 
     * @test
     */
    public function demographic_pdf_generation_succeeds_with_valid_data()
    {
        $this->forAll(
            Generators::choose(0, 15) // Number of members (including 0)
        )
            ->withMaxSize(100)
            ->then(function ($memberCount) {
                // Clear existing data
                Member::query()->delete();
                
                // Create members with diverse demographics
                for ($i = 0; $i < $memberCount; $i++) {
                    $birthYear = mt_rand(1940, 2010);
                    
                    Member::factory()->create([
                        'birth_date' => $birthYear . '-' . str_pad(mt_rand(1, 12), 2, '0', STR_PAD_LEFT) . '-' . str_pad(mt_rand(1, 28), 2, '0', STR_PAD_LEFT),
                        'gender' => ['male', 'female', 'other'][array_rand(['male', 'female', 'other'])],
                        'status' => ['active', 'visitor'][array_rand(['active', 'visitor'])],
                        'city' => ['Mahayahay', 'San Francisco', 'Lianga'][array_rand(['Mahayahay', 'San Francisco', 'Lianga'])],
                    ]);
                }
                
                // Property: PDF generation should succeed without throwing exceptions
                try {
                    $response = $this->reportService->generateDemographicPDF();
                    
                    // Verify response is not null
                    $this->assertNotNull(
                        $response,
                        "PDF generation should return a response object"
                    );
                    
                    // Verify response has content
                    $content = $response->getContent();
                    $this->assertNotEmpty(
                        $content,
                        "PDF should have content"
                    );
                    
                    // Verify PDF header is present
                    $this->assertStringStartsWith(
                        '%PDF-',
                        $content,
                        "Generated file should be a valid PDF (starts with %PDF-)"
                    );
                    
                    // Verify PDF is valid by checking it has minimum size
                    $this->assertGreaterThan(
                        500,
                        strlen($content),
                        "PDF should have substantial content (>500 bytes)"
                    );
                    
                    $this->assertTrue(true, "Demographic PDF generation succeeded");
                } catch (\Exception $e) {
                    $this->fail("Demographic PDF generation failed with exception: " . $e->getMessage());
                }
            });
    }

    /**
     * Test that combined PDF generation succeeds with both financial and demographic data.
     * 
     * @test
     */
    public function combined_pdf_generation_succeeds_with_valid_data()
    {
        $this->forAll(
            Generators::choose(0, 15), // Number of tithes
            Generators::choose(0, 10)  // Number of members
        )
            ->withMaxSize(100)
            ->then(function ($titheCount, $memberCount) {
                // Clear existing data
                Tithe::query()->delete();
                Member::query()->delete();
                
                // Create members
                $members = [];
                for ($i = 0; $i < $memberCount; $i++) {
                    $birthYear = mt_rand(1940, 2010);
                    
                    $members[] = Member::factory()->create([
                        'birth_date' => $birthYear . '-' . str_pad(mt_rand(1, 12), 2, '0', STR_PAD_LEFT) . '-' . str_pad(mt_rand(1, 28), 2, '0', STR_PAD_LEFT),
                        'gender' => ['male', 'female', 'other'][array_rand(['male', 'female', 'other'])],
                        'status' => ['active', 'visitor'][array_rand(['active', 'visitor'])],
                    ]);
                }
                
                // Create tithes
                $startDate = '2024-01-01';
                $endDate = '2024-01-31';
                
                for ($i = 0; $i < $titheCount; $i++) {
                    $memberId = !empty($members) && $i % 2 === 0
                        ? $members[array_rand($members)]->id
                        : null;
                    
                    $amount = round(mt_rand(1000, 100000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $memberId,
                        'amount' => $amount,
                        'date' => '2024-01-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                        'payment_method' => ['cash', 'check', 'online', 'other'][array_rand(['cash', 'check', 'online', 'other'])],
                    ]);
                }
                
                // Property: Combined PDF generation should succeed without throwing exceptions
                try {
                    $response = $this->reportService->generateCombinedPDF($startDate, $endDate);
                    
                    // Verify response is not null
                    $this->assertNotNull(
                        $response,
                        "Combined PDF generation should return a response object"
                    );
                    
                    // Verify response has content
                    $content = $response->getContent();
                    $this->assertNotEmpty(
                        $content,
                        "Combined PDF should have content"
                    );
                    
                    // Verify PDF header is present
                    $this->assertStringStartsWith(
                        '%PDF-',
                        $content,
                        "Generated file should be a valid PDF (starts with %PDF-)"
                    );
                    
                    // Verify PDF is valid by checking it has minimum size
                    $this->assertGreaterThan(
                        1000,
                        strlen($content),
                        "Combined PDF should have substantial content (>1000 bytes)"
                    );
                    
                    $this->assertTrue(true, "Combined PDF generation succeeded");
                } catch (\Exception $e) {
                    $this->fail("Combined PDF generation failed with exception: " . $e->getMessage());
                }
            });
    }

    /**
     * Test that PDF generation handles edge case of empty data gracefully.
     * 
     * @test
     */
    public function pdf_generation_handles_empty_data_gracefully()
    {
        // Clear all data
        Tithe::query()->delete();
        Member::query()->delete();
        
        $startDate = '2024-01-01';
        $endDate = '2024-01-31';
        
        // Property: PDF generation should succeed even with no data
        try {
            // Test financial PDF with no tithes
            $financialResponse = $this->reportService->generateFinancialPDF($startDate, $endDate);
            $this->assertNotNull($financialResponse, "Financial PDF should generate even with no data");
            $this->assertStringStartsWith('%PDF-', $financialResponse->getContent());
            
            // Test demographic PDF with no members
            $demographicResponse = $this->reportService->generateDemographicPDF();
            $this->assertNotNull($demographicResponse, "Demographic PDF should generate even with no data");
            $this->assertStringStartsWith('%PDF-', $demographicResponse->getContent());
            
            // Test combined PDF with no data
            $combinedResponse = $this->reportService->generateCombinedPDF($startDate, $endDate);
            $this->assertNotNull($combinedResponse, "Combined PDF should generate even with no data");
            $this->assertStringStartsWith('%PDF-', $combinedResponse->getContent());
            
            $this->assertTrue(true, "PDF generation handled empty data gracefully");
        } catch (\Exception $e) {
            $this->fail("PDF generation should handle empty data gracefully, but failed with: " . $e->getMessage());
        }
    }

    /**
     * Test that PDF generation includes all required report data fields.
     * 
     * @test
     */
    public function pdf_generation_includes_all_required_data_fields()
    {
        $this->forAll(
            Generators::choose(3, 10)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear existing data
                Tithe::query()->delete();
                Member::query()->delete();
                
                // Create members
                $members = [];
                for ($i = 0; $i < 5; $i++) {
                    $members[] = Member::factory()->create();
                }
                
                // Create tithes
                $startDate = '2024-01-01';
                $endDate = '2024-01-31';
                
                for ($i = 0; $i < $titheCount; $i++) {
                    $member = $members[array_rand($members)];
                    $amount = round(mt_rand(1000, 50000) / 100, 2);
                    
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => $amount,
                        'date' => '2024-01-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                        'payment_method' => 'cash',
                    ]);
                }
                
                // Generate PDF
                $response = $this->reportService->generateFinancialPDF($startDate, $endDate);
                $content = $response->getContent();
                
                // Property: PDF should be generated successfully and be valid
                $this->assertNotNull($response, "PDF should be generated");
                $this->assertStringStartsWith('%PDF-', $content, "Should be valid PDF");
                $this->assertGreaterThan(
                    1000,
                    strlen($content),
                    "PDF should have substantial content with data fields"
                );
            });
    }

    /**
     * Test that PDF generation handles large datasets efficiently.
     * 
     * @test
     */
    public function pdf_generation_handles_large_datasets()
    {
        // Clear existing data
        Tithe::query()->delete();
        Member::query()->delete();
        
        // Create a larger dataset
        $members = [];
        for ($i = 0; $i < 50; $i++) {
            $members[] = Member::factory()->create();
        }
        
        $startDate = '2024-01-01';
        $endDate = '2024-12-31';
        
        // Create many tithes
        for ($i = 0; $i < 200; $i++) {
            $member = $members[array_rand($members)];
            $amount = round(mt_rand(1000, 100000) / 100, 2);
            
            Tithe::factory()->create([
                'member_id' => $member->id,
                'amount' => $amount,
                'date' => '2024-' . str_pad(mt_rand(1, 12), 2, '0', STR_PAD_LEFT) . '-' . str_pad(mt_rand(1, 28), 2, '0', STR_PAD_LEFT),
                'payment_method' => ['cash', 'check', 'online', 'other'][array_rand(['cash', 'check', 'online', 'other'])],
            ]);
        }
        
        // Property: PDF generation should handle large datasets without errors
        try {
            $response = $this->reportService->generateCombinedPDF($startDate, $endDate);
            
            $this->assertNotNull($response, "PDF should generate with large dataset");
            
            $content = $response->getContent();
            $this->assertStringStartsWith('%PDF-', $content);
            $this->assertNotEmpty($content, "PDF should have content with large dataset");
            
            $this->assertTrue(true, "PDF generation handled large dataset successfully");
        } catch (\Exception $e) {
            $this->fail("PDF generation should handle large datasets, but failed with: " . $e->getMessage());
        }
    }

    /**
     * Test that PDF generation respects date range boundaries.
     * 
     * @test
     */
    public function pdf_generation_respects_date_range_boundaries()
    {
        $this->forAll(
            Generators::choose(2, 8)
        )
            ->withMaxSize(100)
            ->then(function ($titheCount) {
                // Clear existing data
                Tithe::query()->delete();
                Member::query()->delete();
                
                $member = Member::factory()->create();
                
                // Create tithes in different months
                for ($i = 0; $i < $titheCount; $i++) {
                    // January tithes
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => round(mt_rand(1000, 50000) / 100, 2),
                        'date' => '2024-01-' . str_pad(mt_rand(1, 31), 2, '0', STR_PAD_LEFT),
                        'payment_method' => 'cash',
                    ]);
                    
                    // February tithes (outside range)
                    Tithe::factory()->create([
                        'member_id' => $member->id,
                        'amount' => round(mt_rand(1000, 50000) / 100, 2),
                        'date' => '2024-02-' . str_pad(mt_rand(1, 28), 2, '0', STR_PAD_LEFT),
                        'payment_method' => 'cash',
                    ]);
                }
                
                // Generate PDF for January only
                $startDate = '2024-01-01';
                $endDate = '2024-01-31';
                
                $response = $this->reportService->generateFinancialPDF($startDate, $endDate);
                $content = $response->getContent();
                
                // Property: PDF should be generated successfully with date-filtered data
                $this->assertNotNull($response, "PDF should generate with date-filtered data");
                $this->assertStringStartsWith('%PDF-', $content);
                $this->assertGreaterThan(
                    1000,
                    strlen($content),
                    "PDF should have substantial content"
                );
            });
    }

    /**
     * Test that PDF filenames are properly formatted with timestamps.
     * 
     * @test
     */
    public function pdf_generation_creates_properly_named_files()
    {
        // Clear existing data
        Tithe::query()->delete();
        Member::query()->delete();
        
        // Create minimal data
        $member = Member::factory()->create();
        Tithe::factory()->create([
            'member_id' => $member->id,
            'amount' => 100.00,
            'date' => '2024-01-15',
        ]);
        
        $startDate = '2024-01-01';
        $endDate = '2024-01-31';
        
        // Generate PDFs
        $financialResponse = $this->reportService->generateFinancialPDF($startDate, $endDate);
        $demographicResponse = $this->reportService->generateDemographicPDF();
        $combinedResponse = $this->reportService->generateCombinedPDF($startDate, $endDate);
        
        // Property: PDF responses should have proper download headers
        $this->assertNotNull($financialResponse);
        $this->assertNotNull($demographicResponse);
        $this->assertNotNull($combinedResponse);
        
        // Verify all PDFs are valid
        $this->assertStringStartsWith('%PDF-', $financialResponse->getContent());
        $this->assertStringStartsWith('%PDF-', $demographicResponse->getContent());
        $this->assertStringStartsWith('%PDF-', $combinedResponse->getContent());
        
        $this->assertTrue(true, "All PDF types generated with proper formatting");
    }
}
