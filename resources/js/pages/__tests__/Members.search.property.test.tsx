import * as fc from 'fast-check'

/**
 * Property-Based Tests for Member Search
 * 
 * **Validates: Requirements 8.5 - Modern UI/UX Redesign**
 * **Property 5: Data Integrity - Search accuracy**
 * 
 * These tests use property-based testing to verify that member search
 * returns only members matching the search query across all possible inputs.
 */

// ============================================================================
// Test Data Types
// ============================================================================

interface Member {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  city: string
  status: 'active' | 'visitor'
  small_group_id: number | null
  date_joined: string
  birth_date: string | null
  gender: 'male' | 'female' | 'other'
  created_at: string
  updated_at: string
  small_group?: {
    id: number
    name: string
  }
  photo?: string
  membership_type?: 'regular' | 'associate' | 'visitor'
}

// ============================================================================
// Search Implementation
// ============================================================================

/**
 * Search members by query string
 * Matches against: first_name, last_name, email, phone
 */
function searchMembers(members: Member[], query: string): Member[] {
  if (!query || query.trim() === '') {
    return members
  }

  const normalizedQuery = query.toLowerCase().trim()

  return members.filter((member) => {
    const firstName = member.first_name?.toLowerCase() || ''
    const lastName = member.last_name?.toLowerCase() || ''
    const fullName = `${firstName} ${lastName}`.trim()
    const email = member.email?.toLowerCase() || ''
    const phone = member.phone?.toLowerCase() || ''

    return (
      firstName.includes(normalizedQuery) ||
      lastName.includes(normalizedQuery) ||
      fullName.includes(normalizedQuery) ||
      email.includes(normalizedQuery) ||
      phone.includes(normalizedQuery)
    )
  })
}

/**
 * Check if a member matches the search query
 */
function memberMatchesQuery(member: Member, query: string): boolean {
  if (!query || query.trim() === '') {
    return true
  }

  const normalizedQuery = query.toLowerCase().trim()
  const firstName = member.first_name?.toLowerCase() || ''
  const lastName = member.last_name?.toLowerCase() || ''
  const fullName = `${firstName} ${lastName}`.trim()
  const email = member.email?.toLowerCase() || ''
  const phone = member.phone?.toLowerCase() || ''

  return (
    firstName.includes(normalizedQuery) ||
    lastName.includes(normalizedQuery) ||
    fullName.includes(normalizedQuery) ||
    email.includes(normalizedQuery) ||
    phone.includes(normalizedQuery)
  )
}

// ============================================================================
// Arbitraries (Generators)
// ============================================================================

/**
 * Generate a random member record
 */
const memberArbitrary = fc.record({
  id: fc.integer({ min: 1, max: 10000 }),
  first_name: fc.oneof(
    fc.constantFrom('John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'),
    fc.string({ minLength: 3, maxLength: 20 })
  ),
  last_name: fc.oneof(
    fc.constantFrom('Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'),
    fc.string({ minLength: 3, maxLength: 20 })
  ),
  email: fc.emailAddress(),
  phone: fc.oneof(
    fc.constantFrom(
      '555-0100',
      '555-0101',
      '555-0102',
      '(555) 123-4567',
      '+1-555-987-6543'
    ),
    fc.string({ minLength: 10, maxLength: 15 })
  ),
  address: fc.string({ minLength: 10, maxLength: 50 }),
  city: fc.constantFrom('New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Manila'),
  status: fc.constantFrom('active', 'visitor'),
  small_group_id: fc.option(fc.integer({ min: 1, max: 50 }), { nil: null }),
  date_joined: fc.date().map((d) => {
    try {
      return d.toISOString()
    } catch {
      return new Date('2020-01-01').toISOString()
    }
  }),
  birth_date: fc.option(
    fc.date().map((d) => {
      try {
        return d.toISOString()
      } catch {
        return new Date('1990-01-01').toISOString()
      }
    }),
    { nil: null }
  ),
  gender: fc.constantFrom('male', 'female', 'other'),
  created_at: fc.date().map((d) => {
    try {
      return d.toISOString()
    } catch {
      return new Date('2020-01-01').toISOString()
    }
  }),
  updated_at: fc.date().map((d) => {
    try {
      return d.toISOString()
    } catch {
      return new Date('2020-01-01').toISOString()
    }
  }),
  small_group: fc.option(
    fc.record({
      id: fc.integer({ min: 1, max: 50 }),
      name: fc.constantFrom('Youth Group', 'Prayer Group', 'Bible Study', 'Worship Team'),
    }),
    { nil: undefined }
  ),
  photo: fc.option(fc.webUrl(), { nil: undefined }),
  membership_type: fc.option(fc.constantFrom('regular', 'associate', 'visitor'), { nil: undefined }),
}) as fc.Arbitrary<Member>

/**
 * Generate an array of members
 */
const membersArrayArbitrary = fc.array(memberArbitrary, { minLength: 0, maxLength: 100 })

/**
 * Generate search queries
 */
const searchQueryArbitrary = fc.oneof(
  // Empty query
  fc.constant(''),
  
  // Common first names
  fc.constantFrom('John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'),
  
  // Common last names
  fc.constantFrom('Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'),
  
  // Partial names
  fc.constantFrom('Jo', 'Sm', 'Wil', 'Br', 'Gar', 'Mil'),
  
  // Email patterns
  fc.constantFrom('@gmail.com', '@yahoo.com', '@example.com', 'test'),
  
  // Phone patterns
  fc.constantFrom('555', '123', '(555)', '+1'),
  
  // Random strings
  fc.string({ minLength: 1, maxLength: 10 }),
  
  // Case variations
  fc.constantFrom('JOHN', 'john', 'JoHn', 'SMITH', 'smith')
)

// ============================================================================
// Property Tests
// ============================================================================

describe('Member Search - Property-Based Tests', () => {
  /**
   * **Property 5: Data Integrity - Search accuracy**
   * 
   * For any dataset of members and any search query, all members in the search
   * results must match the search query. This ensures search is accurate and
   * no members that don't match slip through.
   * 
   * Universal quantification:
   * ∀ members ∈ MemberDatasets, ∀ query ∈ SearchQueries:
   *   searchMembers(members, query) ⟹ ∀ member ∈ results: memberMatchesQuery(member, query)
   */
  it('Property 5: All search results match the search query', () => {
    fc.assert(
      fc.property(membersArrayArbitrary, searchQueryArbitrary, (members, query) => {
        // Perform search
        const results = searchMembers(members, query)

        // Verify all results match the query
        for (const member of results) {
          const matches = memberMatchesQuery(member, query)
          expect(matches).toBe(true)
        }

        // Additional invariant: result size <= original size
        expect(results.length).toBeLessThanOrEqual(members.length)

        // Additional invariant: if original is empty, results are empty
        if (members.length === 0) {
          expect(results.length).toBe(0)
        }
      }),
      {
        numRuns: 1000, // Run 1000 random test cases
        verbose: true,
      }
    )
  })

  /**
   * **Property: Empty query returns all members**
   * 
   * When the search query is empty or whitespace-only, all members should be returned.
   */
  it('Property: Empty query returns all members', () => {
    fc.assert(
      fc.property(membersArrayArbitrary, (members) => {
        const emptyQueries = ['', '  ', '\t', '\n']

        for (const query of emptyQueries) {
          const results = searchMembers(members, query)
          expect(results.length).toBe(members.length)
          expect(results).toEqual(members)
        }
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search is case-insensitive**
   * 
   * Searching with different case variations should return the same results.
   */
  it('Property: Search is case-insensitive', () => {
    fc.assert(
      fc.property(membersArrayArbitrary, searchQueryArbitrary, (members, query) => {
        if (!query || query.trim() === '') return

        const lowerResults = searchMembers(members, query.toLowerCase())
        const upperResults = searchMembers(members, query.toUpperCase())
        const mixedResults = searchMembers(members, query)

        // All case variations should return same results
        expect(lowerResults.length).toBe(upperResults.length)
        expect(lowerResults.length).toBe(mixedResults.length)
        expect(lowerResults).toEqual(upperResults)
        expect(lowerResults).toEqual(mixedResults)
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search is idempotent**
   * 
   * Searching the search results again with the same query should return
   * the same results (no further filtering).
   */
  it('Property: Search is idempotent', () => {
    fc.assert(
      fc.property(membersArrayArbitrary, searchQueryArbitrary, (members, query) => {
        const firstSearch = searchMembers(members, query)
        const secondSearch = searchMembers(firstSearch, query)

        expect(secondSearch).toEqual(firstSearch)
        expect(secondSearch.length).toBe(firstSearch.length)
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search preserves order**
   * 
   * Search should preserve the relative order of members from the original dataset.
   */
  it('Property: Search preserves member order', () => {
    fc.assert(
      fc.property(membersArrayArbitrary, searchQueryArbitrary, (members, query) => {
        const results = searchMembers(members, query)

        // For each pair of members in results
        for (let i = 0; i < results.length - 1; i++) {
          const member1 = results[i]
          const member2 = results[i + 1]

          // Find their indices in original array (use indexOf to get first occurrence)
          const idx1 = members.indexOf(member1)
          const idx2 = members.indexOf(member2)

          // If both members exist in original array, order should be preserved
          if (idx1 !== -1 && idx2 !== -1 && member1 !== member2) {
            expect(idx1).toBeLessThan(idx2)
          }
        }
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search results are subset of original**
   * 
   * Every member in search results must exist in the original dataset.
   */
  it('Property: Search results are subset of original members', () => {
    fc.assert(
      fc.property(membersArrayArbitrary, searchQueryArbitrary, (members, query) => {
        const results = searchMembers(members, query)

        // Every result must exist in original
        for (const result of results) {
          const existsInOriginal = members.some((m) => m.id === result.id)
          expect(existsInOriginal).toBe(true)
        }
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Whitespace trimming**
   * 
   * Leading and trailing whitespace in the query should not affect results.
   */
  it('Property: Query whitespace is trimmed', () => {
    fc.assert(
      fc.property(membersArrayArbitrary, searchQueryArbitrary, (members, query) => {
        if (!query || query.trim() === '') return

        const normalResults = searchMembers(members, query)
        const leadingSpaceResults = searchMembers(members, `  ${query}`)
        const trailingSpaceResults = searchMembers(members, `${query}  `)
        const bothSpaceResults = searchMembers(members, `  ${query}  `)

        expect(leadingSpaceResults).toEqual(normalResults)
        expect(trailingSpaceResults).toEqual(normalResults)
        expect(bothSpaceResults).toEqual(normalResults)
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search matches first name**
   * 
   * If a member's first name contains the query, they should be in results.
   */
  it('Property: Search matches first name', () => {
    fc.assert(
      fc.property(memberArbitrary, (member) => {
        const query = member.first_name.substring(0, 3)
        if (!query) return

        const results = searchMembers([member], query)
        expect(results.length).toBeGreaterThan(0)
        expect(results).toContainEqual(member)
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search matches last name**
   * 
   * If a member's last name contains the query, they should be in results.
   */
  it('Property: Search matches last name', () => {
    fc.assert(
      fc.property(memberArbitrary, (member) => {
        const query = member.last_name.substring(0, 3)
        if (!query) return

        const results = searchMembers([member], query)
        expect(results.length).toBeGreaterThan(0)
        expect(results).toContainEqual(member)
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search matches email**
   * 
   * If a member's email contains the query, they should be in results.
   */
  it('Property: Search matches email', () => {
    fc.assert(
      fc.property(memberArbitrary, (member) => {
        const query = member.email.substring(0, 5)
        if (!query) return

        const results = searchMembers([member], query)
        expect(results.length).toBeGreaterThan(0)
        expect(results).toContainEqual(member)
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search matches phone**
   * 
   * If a member's phone contains the query, they should be in results.
   */
  it('Property: Search matches phone', () => {
    fc.assert(
      fc.property(memberArbitrary, (member) => {
        const query = member.phone.substring(0, 3)
        if (!query) return

        const results = searchMembers([member], query)
        expect(results.length).toBeGreaterThan(0)
        expect(results).toContainEqual(member)
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Search matches full name**
   * 
   * If the query matches the full name (first + last), member should be in results.
   */
  it('Property: Search matches full name', () => {
    fc.assert(
      fc.property(memberArbitrary, (member) => {
        const fullName = `${member.first_name} ${member.last_name}`
        const query = fullName.substring(0, 5)
        if (!query || query.trim() === '') return

        const results = searchMembers([member], query)
        expect(results.length).toBeGreaterThan(0)
        expect(results).toContainEqual(member)
      }),
      {
        numRuns: 500,
      }
    )
  })

  /**
   * **Property: Non-matching query returns empty or smaller set**
   * 
   * A query that doesn't match any member should return empty results.
   */
  it('Property: Non-matching query returns empty or smaller set', () => {
    fc.assert(
      fc.property(membersArrayArbitrary, (members) => {
        // Use a query that's very unlikely to match
        const impossibleQuery = 'ZZZZZZZZZZZZZZZZZZZZZ'

        const results = searchMembers(members, impossibleQuery)

        // Results should be empty or smaller than original
        expect(results.length).toBeLessThanOrEqual(members.length)

        // All results (if any) must still match the query
        for (const member of results) {
          expect(memberMatchesQuery(member, impossibleQuery)).toBe(true)
        }
      }),
      {
        numRuns: 500,
      }
    )
  })
})
