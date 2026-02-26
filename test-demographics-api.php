<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Test the demographics API endpoint
echo "Testing Demographics API Endpoint\n";
echo "==================================\n\n";

// Check if members exist
$memberCount = App\Models\Member::count();
echo "Total Members in Database: $memberCount\n\n";

if ($memberCount > 0) {
    echo "Sample Member Data:\n";
    $member = App\Models\Member::first();
    echo "- Name: {$member->first_name} {$member->last_name}\n";
    echo "- City: {$member->city}\n";
    echo "- Gender: {$member->gender}\n";
    echo "- Birth Date: {$member->birth_date}\n";
    echo "- Status: {$member->status}\n";
    echo "- Small Group ID: {$member->small_group_id}\n\n";
}

// Test the ReportService
echo "Testing ReportService->generateDemographicReport():\n";
echo "---------------------------------------------------\n";

try {
    $financeRepo = new App\Repositories\FinanceRepository();
    $memberRepo = new App\Repositories\MemberRepository();
    $reportService = new App\Services\ReportService($financeRepo, $memberRepo);
    
    $demographicData = $reportService->generateDemographicReport();
    
    echo "Success! Demographic Data:\n";
    echo json_encode($demographicData, JSON_PRETTY_PRINT);
    echo "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
