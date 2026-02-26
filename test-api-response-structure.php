<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Get a user with admin role
$user = \App\Models\User::where('role', 'admin')->first();

if (!$user) {
    echo "No admin user found!\n";
    exit(1);
}

echo "Testing as user: {$user->name} ({$user->role})\n\n";

// Create a request and authenticate it
$request = Illuminate\Http\Request::create('/api/reports/demographics', 'GET');
$request->setUserResolver(function () use ($user) {
    return $user;
});

// Get the controller
$reportService = app(\App\Services\ReportService::class);
$controller = new \App\Http\Controllers\Api\ReportController($reportService);

// Call the method
$response = $controller->getDemographicReport();

// Get the response data
$responseData = $response->getData(true);

echo "=== RAW RESPONSE ===\n";
echo json_encode($responseData, JSON_PRETTY_PRINT) . "\n\n";

echo "=== RESPONSE STRUCTURE ANALYSIS ===\n";
echo "Response has 'success' key: " . (isset($responseData['success']) ? 'YES' : 'NO') . "\n";
echo "Response has 'data' key: " . (isset($responseData['data']) ? 'YES' : 'NO') . "\n";

if (isset($responseData['data'])) {
    $data = $responseData['data'];
    echo "\nData structure:\n";
    echo "  - by_age: " . (isset($data['by_age']) ? 'EXISTS (' . count($data['by_age']) . ' groups)' : 'MISSING') . "\n";
    echo "  - by_location: " . (isset($data['by_location']) ? 'EXISTS (' . count($data['by_location']) . ' locations)' : 'MISSING') . "\n";
    echo "  - by_gender: " . (isset($data['by_gender']) ? 'EXISTS (' . count($data['by_gender']) . ' genders)' : 'MISSING') . "\n";
    echo "  - by_status: " . (isset($data['by_status']) ? 'EXISTS (' . count($data['by_status']) . ' statuses)' : 'MISSING') . "\n";
    echo "  - by_small_group: " . (isset($data['by_small_group']) ? 'EXISTS (' . count($data['by_small_group']) . ' groups)' : 'MISSING') . "\n";
    echo "  - total_members: " . ($data['total_members'] ?? 'MISSING') . "\n";
    
    echo "\n=== DATA IS EMPTY CHECK ===\n";
    echo "Data is null: " . (is_null($data) ? 'YES' : 'NO') . "\n";
    echo "Data is empty array: " . (empty($data) ? 'YES' : 'NO') . "\n";
    echo "Data evaluates to false: " . (!$data ? 'YES' : 'NO') . "\n";
    
    if (isset($data['by_age']) && is_array($data['by_age'])) {
        echo "\n=== AGE DATA ===\n";
        foreach ($data['by_age'] as $age => $count) {
            echo "  $age: $count members\n";
        }
    }
    
    if (isset($data['by_location']) && is_array($data['by_location'])) {
        echo "\n=== LOCATION DATA ===\n";
        foreach ($data['by_location'] as $location => $count) {
            echo "  $location: $count members\n";
        }
    }
}

echo "\n=== FRONTEND EXPECTATION ===\n";
echo "Frontend expects: response.data.data (nested 'data' key)\n";
echo "Backend returns: response with 'success' and 'data' keys\n";
echo "Frontend API wrapper should extract: response.data.data\n";
echo "\nThis matches the reportsApi.ts implementation:\n";
echo "  const response = await api.get<ApiResponse<DemographicData>>('/api/reports/demographics');\n";
echo "  return response.data.data; // Axios response.data, then ApiResponse.data\n";
