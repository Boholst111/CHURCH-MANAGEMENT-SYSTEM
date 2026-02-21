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
 * Property-Based Test for Member Search Functionality
 * 
 * Feature: church-management-system
 * Property 5: Search filters members correctly
 * Validates: Requirements 3.2
 * 
 * **Validates: Requirements 3.2**
 * 
 * Property: For any search query string, all returned member records should 
 * have the query string present in either their name or contact information 
 * fields (case-insensitive).
 */
class MemberSearchPropertyTest extends TestCase
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
     * Test that search returns only members matching the query string.
     * 
     * @test
     */
    public function search_returns_only_matching_members()
    {
        $this->forAll(
            Generators::string()
        )
            ->withMaxSize(100) // Run 100 iterations as specified in design
            ->then(function ($searchQuery) {
                // Skip empty or whitespace-only queries as they return all members
                if (empty(trim($searchQuery))) {
                    return;
                }
                
                // Create a diverse set of members with different data
                $members = [
                    Member::factory()->create([
                        'first_name' => 'John',
                        'last_name' => 'Doe',
                        'email' => 'john.doe@example.com',
                        'phone' => '+1234567890',
                    ]),
                    Member::factory()->create([
                        'first_name' => 'Jane',
                        'last_name' => 'Smith',
                        'email' => 'jane.smith@example.com',
                        'phone' => '+9876543210',
                    ]),
                    Member::factory()->create([
                        'first_name' => 'Alice',
                        'last_name' => 'Johnson',
                        'email' => 'alice.j@test.com',
                        'phone' => '+1111222233',
                    ]),
                    Member::factory()->create([
                        'first_name' => 'Bob',
                        'last_name' => 'Williams',
                        'email' => 'bob.w@example.org',
                        'phone' => '+4444555566',
                    ]),
                ];
                
                // Perform search
                $results = $this->memberService->searchMembers($searchQuery);
                
                // Property: All returned members must match the search query
                foreach ($results as $member) {
                    $queryLower = strtolower($searchQuery);
                    
                    $matchesFirstName = str_contains(strtolower($member->first_name), $queryLower);
                    $matchesLastName = str_contains(strtolower($member->last_name), $queryLower);
                    $matchesEmail = str_contains(strtolower($member->email), $queryLower);
                    $matchesPhone = str_contains($member->phone, $searchQuery);
                    
                    $matchesAnyField = $matchesFirstName || $matchesLastName || $matchesEmail || $matchesPhone;
                    
                    $this->assertTrue(
                        $matchesAnyField,
                        "Member {$member->id} (name: {$member->first_name} {$member->last_name}, " .
                        "email: {$member->email}, phone: {$member->phone}) does not match search query '{$searchQuery}'"
                    );
                }
                
                // Clean up created members
                foreach ($members as $member) {
                    $member->delete();
                }
            });
    }

    /**
     * Test that search is case-insensitive for name and email fields.
     * 
     * @test
     */
    public function search_is_case_insensitive()
    {
        $this->forAll(
            Generators::elements('john', 'JOHN', 'John', 'JoHn'),
            Generators::elements('smith', 'SMITH', 'Smith', 'SmItH')
        )
            ->withMaxSize(100)
            ->then(function ($firstNameQuery, $lastNameQuery) {
                // Create members with known names
                $member1 = Member::factory()->create([
                    'first_name' => 'John',
                    'last_name' => 'Smith',
                    'email' => 'john.smith@example.com',
                    'phone' => '+1234567890',
                ]);
                
                $member2 = Member::factory()->create([
                    'first_name' => 'Jane',
                    'last_name' => 'Doe',
                    'email' => 'jane.doe@example.com',
                    'phone' => '+9876543210',
                ]);
                
                // Search by first name with different cases
                $firstNameResults = $this->memberService->searchMembers($firstNameQuery);
                
                // Should find John regardless of case
                $foundJohn = $firstNameResults->contains(function ($m) use ($member1) {
                    return $m->id === $member1->id;
                });
                
                $this->assertTrue(
                    $foundJohn,
                    "Search for '{$firstNameQuery}' should find member with first_name 'John' (case-insensitive)"
                );
                
                // Search by last name with different cases
                $lastNameResults = $this->memberService->searchMembers($lastNameQuery);
                
                // Should find Smith regardless of case
                $foundSmith = $lastNameResults->contains(function ($m) use ($member1) {
                    return $m->id === $member1->id;
                });
                
                $this->assertTrue(
                    $foundSmith,
                    "Search for '{$lastNameQuery}' should find member with last_name 'Smith' (case-insensitive)"
                );
                
                // Clean up
                $member1->delete();
                $member2->delete();
            });
    }

    /**
     * Test that search works with partial matches.
     * 
     * @test
     */
    public function search_works_with_partial_matches()
    {
        $this->forAll(
            Generators::elements('joh', 'doe', 'example', '123')
        )
            ->withMaxSize(100)
            ->then(function ($partialQuery) {
                // Create members with known data
                $member = Member::factory()->create([
                    'first_name' => 'John',
                    'last_name' => 'Doe',
                    'email' => 'john.doe@example.com',
                    'phone' => '+1234567890',
                ]);
                
                // Search with partial query
                $results = $this->memberService->searchMembers($partialQuery);
                
                // Should find the member with partial match
                $found = $results->contains(function ($m) use ($member) {
                    return $m->id === $member->id;
                });
                
                $this->assertTrue(
                    $found,
                    "Search for partial query '{$partialQuery}' should find member with matching data"
                );
                
                // Verify all results match the partial query
                foreach ($results as $result) {
                    $queryLower = strtolower($partialQuery);
                    
                    $matchesFirstName = str_contains(strtolower($result->first_name), $queryLower);
                    $matchesLastName = str_contains(strtolower($result->last_name), $queryLower);
                    $matchesEmail = str_contains(strtolower($result->email), $queryLower);
                    $matchesPhone = str_contains($result->phone, $partialQuery);
                    
                    $matchesAnyField = $matchesFirstName || $matchesLastName || $matchesEmail || $matchesPhone;
                    
                    $this->assertTrue(
                        $matchesAnyField,
                        "Result member {$result->id} should match partial query '{$partialQuery}'"
                    );
                }
                
                // Clean up
                $member->delete();
            });
    }

    /**
     * Test that empty search query returns all members.
     * 
     * @test
     */
    public function empty_search_returns_all_members()
    {
        // Create a known set of members
        $member1 = Member::factory()->create();
        $member2 = Member::factory()->create();
        $member3 = Member::factory()->create();
        
        $totalMembers = Member::count();
        
        // Test with various empty queries
        $emptyQueries = ['', '   ', "\t", "\n"];
        
        foreach ($emptyQueries as $emptyQuery) {
            $results = $this->memberService->searchMembers($emptyQuery);
            
            $this->assertEquals(
                $totalMembers,
                $results->count(),
                "Empty or whitespace-only query should return all members"
            );
        }
        
        // Clean up
        $member1->delete();
        $member2->delete();
        $member3->delete();
    }

    /**
     * Test that search returns empty collection when no matches found.
     * 
     * @test
     */
    public function search_returns_empty_when_no_matches()
    {
        $this->forAll(
            Generators::string()
        )
            ->withMaxSize(100)
            ->then(function ($searchQuery) {
                // Skip empty queries
                if (empty(trim($searchQuery))) {
                    return;
                }
                
                // Create members with specific data that won't match random queries
                $member = Member::factory()->create([
                    'first_name' => 'UniqueFirstName12345',
                    'last_name' => 'UniqueLastName67890',
                    'email' => 'unique.email.xyz@veryraredomainname.com',
                    'phone' => '+9999999999',
                ]);
                
                // Use a query that definitely won't match
                $impossibleQuery = 'XYZQWERTYUIOP123456789IMPOSSIBLE';
                
                $results = $this->memberService->searchMembers($impossibleQuery);
                
                $this->assertCount(
                    0,
                    $results,
                    "Search with non-matching query should return empty collection"
                );
                
                // Clean up
                $member->delete();
            });
    }
}
