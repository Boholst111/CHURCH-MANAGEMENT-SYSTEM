<?php

/**
 * Archive API Manual Test Script
 * 
 * This script demonstrates the archive API functionality.
 * Run with: php artisan tinker < test-archive-api.php
 * Or copy and paste into tinker session.
 */

use App\Models\Member;
use App\Models\Event;
use App\Models\User;
use App\Services\ArchiveService;

echo "=== Archive API Manual Test ===\n\n";

// Get or create an admin user for testing
$admin = User::where('role', 'admin')->first();
if (!$admin) {
    echo "⚠️  No admin user found. Creating test admin...\n";
    $admin = User::factory()->create(['role' => 'admin']);
}
echo "✓ Using admin user: {$admin->email}\n\n";

// Authenticate as admin
auth()->login($admin);

// Initialize ArchiveService
$archiveService = app(ArchiveService::class);

echo "--- Test 1: Create and Archive a Member ---\n";
$member = Member::factory()->create([
    'first_name' => 'Test',
    'last_name' => 'Archive User',
]);
echo "✓ Created member: {$member->first_name} {$member->last_name} (ID: {$member->id})\n";

$member->delete();
echo "✓ Archived member (soft delete)\n";
echo "  deleted_at: {$member->deleted_at}\n\n";

echo "--- Test 2: List Archived Members ---\n";
$archivedMembers = $archiveService->listArchivedByType('members');
echo "✓ Found {$archivedMembers->count()} archived member(s)\n";
if ($archivedMembers->isNotEmpty()) {
    $archived = $archivedMembers->first();
    echo "  First archived: {$archived['name']} (deleted at: {$archived['deleted_at']})\n";
}
echo "\n";

echo "--- Test 3: List All Archived Items ---\n";
$allArchived = $archiveService->listAllArchived();
echo "✓ Found archived items in " . $allArchived->count() . " type(s)\n";
foreach ($allArchived as $type => $items) {
    echo "  - {$type}: {$items->count()} item(s)\n";
}
echo "\n";

echo "--- Test 4: Restore Archived Member ---\n";
$restored = $archiveService->restore('members', $member->id);
if ($restored) {
    echo "✓ Successfully restored member\n";
    $member->refresh();
    echo "  deleted_at: " . ($member->deleted_at ?? 'null') . "\n";
} else {
    echo "✗ Failed to restore member\n";
}
echo "\n";

echo "--- Test 5: Archive Again and Force Delete ---\n";
$member->delete();
echo "✓ Archived member again\n";

$forceDeleted = $archiveService->forceDelete('members', $member->id);
if ($forceDeleted) {
    echo "✓ Successfully force deleted member\n";
    $exists = Member::withTrashed()->find($member->id);
    echo "  Exists in database: " . ($exists ? 'yes' : 'no') . "\n";
} else {
    echo "✗ Failed to force delete member\n";
}
echo "\n";

echo "--- Test 6: Check Activity Logs ---\n";
$activities = \App\Models\Activity::where('entity_type', 'members')
    ->where('entity_id', $member->id)
    ->orderBy('created_at', 'desc')
    ->get();
echo "✓ Found {$activities->count()} activity log(s) for this member\n";
foreach ($activities as $activity) {
    echo "  - {$activity->action}: {$activity->description}\n";
}
echo "\n";

echo "--- Test 7: Test Invalid Type Error Handling ---\n";
try {
    $archiveService->listArchivedByType('invalid_type');
    echo "✗ Should have thrown exception for invalid type\n";
} catch (\InvalidArgumentException $e) {
    echo "✓ Correctly threw exception: {$e->getMessage()}\n";
}
echo "\n";

echo "--- Test 8: Test Non-Existent Item Error Handling ---\n";
try {
    $archiveService->restore('members', 999999);
    echo "✗ Should have thrown exception for non-existent item\n";
} catch (\Exception $e) {
    echo "✓ Correctly threw exception: {$e->getMessage()}\n";
}
echo "\n";

echo "=== All Tests Complete ===\n";
echo "\nTo test via HTTP API:\n";
echo "1. Login to get Sanctum token\n";
echo "2. Use Postman or curl with Authorization: Bearer {token}\n";
echo "3. Test endpoints:\n";
echo "   GET    /api/archives\n";
echo "   GET    /api/archives/members\n";
echo "   POST   /api/archives/members/{id}/restore\n";
echo "   DELETE /api/archives/members/{id}/force\n";
