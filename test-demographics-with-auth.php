<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Testing Demographics API with Authentication\n";
echo "=============================================\n\n";

// Get a user to test with
$user = App\Models\User::first();

if (!$user) {
    echo "ERROR: No users found in database. Please create a user first.\n";
    exit(1);
}

echo "Testing with user: {$user->name} ({$user->email})\n\n";

// Create a request and authenticate it
$request = Illuminate\Http\Request::create('/api/reports/demographics', 'GET');
$request->setUserResolver(function () use ($user) {
    return $user;
});

try {
    // Call the controller directly
    $financeRepo = new App\Repositories\FinanceRepository();
    $memberRepo = new App\Repositories\MemberRepository();
    $reportService = new App\Services\ReportService($financeRepo, $memberRepo);
    $controller = new App\Http\Controllers\Api\ReportController($reportService);
    
    $response = $controller->getDemographicReport();
    $data = $response->getData();
    
    echo "API Response:\n";
    echo json_encode($data, JSON_PRETTY_PRINT);
    echo "\n\n";
    
    if ($data->success) {
        echo "✓ SUCCESS: Demographics data retrieved successfully!\n";
        echo "Total Members: " . $data->data->total_members . "\n";
    } else {
        echo "✗ FAILED: API returned success=false\n";
    }
    
} catch (\Exception $e) {
    echo "✗ ERROR: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
