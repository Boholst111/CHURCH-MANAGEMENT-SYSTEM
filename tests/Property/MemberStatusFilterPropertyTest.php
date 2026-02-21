<?php

namespace Tests\Property;

use Tests\TestCase;
use App\Models\Member;
use App\Services\MemberService;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Eris\TestTrait;
use Eris\Generators;

/**
 * Property-Based Test for Member Status Filtering
 * 
 * Feature: church-management-system
 * Property 6: Status filter accuracy
 * Validates: Requirements 3.3
 * 
 * **Validates: Requirements 3.3**
 * 
 * Property: For any status filter selection (Active or Visitor), all returned 
 * member records should have exactly that status value.
 */
class MemberStatusFilterPropertyTest extends TestCase
{
    use RefreshDatabase, TestTrait;

    protected MemberService $memberService;

    protected function setUp(): void
    {
        parent::setUp();
        // Initialize Eris
        $this->seedingRandomNumberGeneration();
        $this->withRand('mt_rand');
        
        // Initialize service
        $this->memberService = new MemberService(new MemberRepository());
    }

    /**
     * Test that status filter returns only members with the specified status.
     * 
     * @test
     */
    public function status_filter_returns_only_matching_members()
    {
        $this->forAll(
            Generators::elements('active', 'visitor')
        )
            ->withMaxSize(100) // Run 100 iterations as specified in design
            ->then(function ($filterStatus) {
                // Clear all existing members to ensure clean state
                Member::query()->delete();
                
                // Create a diverse set of members with different statuses
                $activeMembers = [
                    Member::factory()->create(['status' => 'active']),
                    Member::factory()->create(['status' => 'active']),
                    Member::factory()->create(['status' => 'active']),
                ];
                
                $visitorMembers = [
                    Member::factory()->create(['status' => 'visitor']),
                    Member::factory()->create(['status' => 'visitor']),
                ];
                
                // Perform filtering
                $results = $this->memberService->filterMembersByStatus($filterStatus);
                
                // Property: All returned members must have exactly the filtered status
                $this->assertGreaterThan(
                    0,
                    $results->count(),
                    "Filter should return at least one member for status '{$filterStatus}'"
                );
                
                foreach ($results as $member) {
                    $this->assertEquals(
                        $filterStatus,
                        $member->status,
                        "Member {$member->id} has status '{$member->status}' but filter was for '{$filterStatus}'"
                    );
                }
                
                // Verify count matches expected
                $expectedCount = $filterStatus === 'active' ? count($activeMembers) : count($visitorMembers);
                $actualCount = $results->count();
                
                $this->assertEquals(
                    $expectedCount,
                    $actualCount,
                    "Expected {$expectedCount} members with status '{$filterStatus}', but got {$actualCount}"
                );
            });
    }

    /**
     * Test that active filter excludes all visitors.
     * 
     * @test
     */
    public function active_filter_excludes_visitors()
    {
        $this->forAll(
            Generators::choose(1, 10),
            Generators::choose(1, 10)
        )
            ->withMaxSize(100)
            ->then(function ($activeCount, $visitorCount) {
                // Clear all existing members to ensure clean state
                Member::query()->delete();
                
                // Create specified number of active and visitor members
                $activeMembers = [];
                for ($i = 0; $i < $activeCount; $i++) {
                    $activeMembers[] = Member::factory()->create(['status' => 'active']);
                }
                
                $visitorMembers = [];
                for ($i = 0; $i < $visitorCount; $i++) {
                    $visitorMembers[] = Member::factory()->create(['status' => 'visitor']);
                }
                
                // Filter for active members
                $results = $this->memberService->filterMembersByStatus('active');
                
                // Property: No visitor should be in the results
                foreach ($results as $member) {
                    $this->assertNotEquals(
                        'visitor',
                        $member->status,
                        "Active filter should not return visitor members"
                    );
                }
                
                // Verify count
                $this->assertEquals(
                    $activeCount,
                    $results->count(),
                    "Active filter should return exactly {$activeCount} active members"
                );
            });
    }

    /**
     * Test that visitor filter excludes all active members.
     * 
     * @test
     */
    public function visitor_filter_excludes_active_members()
    {
        $this->forAll(
            Generators::choose(1, 10),
            Generators::choose(1, 10)
        )
            ->withMaxSize(100)
            ->then(function ($activeCount, $visitorCount) {
                // Clear all existing members to ensure clean state
                Member::query()->delete();
                
                // Create specified number of active and visitor members
                $activeMembers = [];
                for ($i = 0; $i < $activeCount; $i++) {
                    $activeMembers[] = Member::factory()->create(['status' => 'active']);
                }
                
                $visitorMembers = [];
                for ($i = 0; $i < $visitorCount; $i++) {
                    $visitorMembers[] = Member::factory()->create(['status' => 'visitor']);
                }
                
                // Filter for visitor members
                $results = $this->memberService->filterMembersByStatus('visitor');
                
                // Property: No active member should be in the results
                foreach ($results as $member) {
                    $this->assertNotEquals(
                        'active',
                        $member->status,
                        "Visitor filter should not return active members"
                    );
                }
                
                // Verify count
                $this->assertEquals(
                    $visitorCount,
                    $results->count(),
                    "Visitor filter should return exactly {$visitorCount} visitor members"
                );
            });
    }

    /**
     * Test that status filter is case-sensitive and only accepts valid values.
     * 
     * @test
     */
    public function status_filter_validates_input()
    {
        $this->expectException(\Illuminate\Validation\ValidationException::class);
        
        // Try to filter with invalid status
        $this->memberService->filterMembersByStatus('ACTIVE');
    }

    /**
     * Test that status filter returns empty collection when no members match.
     * 
     * @test
     */
    public function status_filter_returns_empty_when_no_matches()
    {
        $this->forAll(
            Generators::elements('active', 'visitor')
        )
            ->withMaxSize(100)
            ->then(function ($filterStatus) {
                // Clear all existing members to ensure clean state
                Member::query()->delete();
                
                // Create members with opposite status
                $oppositeStatus = $filterStatus === 'active' ? 'visitor' : 'active';
                
                $member1 = Member::factory()->create(['status' => $oppositeStatus]);
                $member2 = Member::factory()->create(['status' => $oppositeStatus]);
                
                // Filter for the status that doesn't exist
                $results = $this->memberService->filterMembersByStatus($filterStatus);
                
                // Should return empty collection
                $this->assertCount(
                    0,
                    $results,
                    "Filter for '{$filterStatus}' should return empty when only '{$oppositeStatus}' members exist"
                );
            });
    }

    /**
     * Test that status filter works correctly with large datasets.
     * 
     * @test
     */
    public function status_filter_works_with_large_datasets()
    {
        $this->forAll(
            Generators::elements('active', 'visitor'),
            Generators::choose(50, 100)
        )
            ->withMaxSize(100)
            ->then(function ($filterStatus, $memberCount) {
                // Clear all existing members to ensure clean state
                Member::query()->delete();
                
                // Create large number of members with mixed statuses
                $members = [];
                $expectedCount = 0;
                
                for ($i = 0; $i < $memberCount; $i++) {
                    // Randomly assign status
                    $status = $i % 2 === 0 ? 'active' : 'visitor';
                    $members[] = Member::factory()->create(['status' => $status]);
                    
                    if ($status === $filterStatus) {
                        $expectedCount++;
                    }
                }
                
                // Filter by status
                $results = $this->memberService->filterMembersByStatus($filterStatus);
                
                // Verify all results have correct status
                foreach ($results as $member) {
                    $this->assertEquals(
                        $filterStatus,
                        $member->status,
                        "All filtered members should have status '{$filterStatus}'"
                    );
                }
                
                // Verify count
                $this->assertEquals(
                    $expectedCount,
                    $results->count(),
                    "Expected {$expectedCount} members with status '{$filterStatus}'"
                );
            });
    }

    /**
     * Test that status filter preserves member data integrity.
     * 
     * @test
     */
    public function status_filter_preserves_member_data()
    {
        $this->forAll(
            Generators::elements('active', 'visitor')
        )
            ->withMaxSize(100)
            ->then(function ($filterStatus) {
                // Clear all existing members to ensure clean state
                Member::query()->delete();
                
                // Create members with specific data
                $member = Member::factory()->create([
                    'status' => $filterStatus,
                    'first_name' => 'TestFirst',
                    'last_name' => 'TestLast',
                    'email' => 'test@example.com',
                    'phone' => '+1234567890',
                ]);
                
                // Filter by status
                $results = $this->memberService->filterMembersByStatus($filterStatus);
                
                // Find our member in results
                $foundMember = $results->firstWhere('id', $member->id);
                
                $this->assertNotNull($foundMember, "Member should be found in filtered results");
                
                // Verify all data is preserved
                $this->assertEquals($member->first_name, $foundMember->first_name);
                $this->assertEquals($member->last_name, $foundMember->last_name);
                $this->assertEquals($member->email, $foundMember->email);
                $this->assertEquals($member->phone, $foundMember->phone);
                $this->assertEquals($member->status, $foundMember->status);
            });
    }
}
