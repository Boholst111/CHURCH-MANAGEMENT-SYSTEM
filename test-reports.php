<?php

/**
 * Test script to verify all report generation endpoints
 * Run with: php test-reports.php
 */

$baseUrl = 'http://127.0.0.1:8000/api';
$token = null; // Will be set after login

// Test data
$startDate = '2026-01-01';
$endDate = '2026-02-24';

echo "=== Church Management System - Report Generation Test ===\n\n";

// Step 1: Login to get authentication token
echo "1. Logging in...\n";
$loginData = [
    'email' => 'admin@example.com',
    'password' => 'password'
];

$ch = curl_init("$baseUrl/login");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($loginData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    $token = $data['token'] ?? null;
    echo "   ✓ Login successful\n\n";
} else {
    echo "   ✗ Login failed (HTTP $httpCode)\n";
    echo "   Response: $response\n";
    exit(1);
}

// Step 2: Test Quick Statistics endpoint
echo "2. Testing Quick Statistics endpoint...\n";
$ch = curl_init("$baseUrl/reports/quick-statistics?start_date=$startDate&end_date=$endDate");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Accept: application/json'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    echo "   ✓ Quick Statistics retrieved successfully\n";
    echo "   - Total Income: ₱" . number_format($data['data']['total_income'], 2) . "\n";
    echo "   - Total Expenses: ₱" . number_format($data['data']['total_expenses'], 2) . "\n";
    echo "   - Net Position: ₱" . number_format($data['data']['net_position'], 2) . "\n";
    echo "   - Fund Balance: ₱" . number_format($data['data']['fund_balance'], 2) . "\n\n";
} else {
    echo "   ✗ Quick Statistics failed (HTTP $httpCode)\n";
    echo "   Response: $response\n\n";
}

// Step 3: Test all report generation endpoints
$reportTypes = [
    'financial-summary' => 'Financial Summary Report',
    'income-statement' => 'Income Statement',
    'expense-report' => 'Expense Report',
    'budget-variance' => 'Budget Variance Report',
    'donor-giving' => 'Donor Giving Report',
    'fund-balance' => 'Fund Balance Report'
];

echo "3. Testing Report Generation endpoints...\n";
foreach ($reportTypes as $type => $name) {
    echo "   Testing $name ($type)...\n";
    
    $ch = curl_init("$baseUrl/reports/$type?start_date=$startDate&end_date=$endDate");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $token,
        'Accept: application/pdf'
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);
    
    if ($httpCode === 200 && strpos($contentType, 'pdf') !== false) {
        echo "      ✓ $name generated successfully (PDF)\n";
    } elseif ($httpCode === 200) {
        echo "      ✓ $name endpoint responded (HTTP 200)\n";
    } else {
        echo "      ✗ $name failed (HTTP $httpCode)\n";
        if ($httpCode !== 200) {
            $errorData = json_decode($response, true);
            if (isset($errorData['message'])) {
                echo "      Error: " . $errorData['message'] . "\n";
            }
        }
    }
}

echo "\n=== Test Complete ===\n";
