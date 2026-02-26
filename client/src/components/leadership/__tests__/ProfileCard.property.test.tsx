import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import ProfileCard from '../ProfileCard';

// Feature: church-management-system, Property 10: Profile cards display complete information
// **Validates: Requirements 4.2, 4.6**

describe('ProfileCard Completeness - Property-Based Tests', () => {
  /**
   * Generator for valid leadership profile data
   */
  const leadershipProfileGenerator = () =>
    fc.record({
      id: fc.integer({ min: 1, max: 10000 }),
      first_name: fc.stringMatching(/^[A-Z][a-z]{1,49}$/),
      last_name: fc.stringMatching(/^[A-Z][a-z]{1,49}$/),
      role: fc.constantFrom(
        'Senior Pastor',
        'Youth Pastor',
        'Worship Leader',
        'Administrative Staff',
        'Children\'s Ministry Director',
        'Outreach Coordinator'
      ),
      department: fc.constantFrom(
        'Ministry',
        'Administration',
        'Worship',
        'Youth',
        'Children',
        'Outreach'
      ),
      email: fc.emailAddress(),
      phone: fc.stringMatching(/^\d{3}-\d{3}-\d{4}$/),
      photo_url: fc.option(fc.webUrl(), { nil: null }),
      bio: fc.option(fc.string({ minLength: 10, maxLength: 500 }), { nil: null }),
      start_date: fc.integer({ min: 946684800000, max: Date.now() })
        .map(timestamp => new Date(timestamp).toISOString().split('T')[0]),
    });

  /**
   * Property 10: Profile cards display complete information
   * For any leadership profile, the rendered Profile_Card should contain the 
   * staff member's name, role title, department tags, and either their photo 
   * or a default placeholder image
   */
  it('should display complete profile information for any valid leadership profile', () => {
    fc.assert(
      fc.property(
        leadershipProfileGenerator(),
        (profile) => {
          const { unmount } = render(
            <MemoryRouter>
              <ProfileCard leadership={profile} />
            </MemoryRouter>
          );

          try {
            // Property: Name must be displayed
            const fullName = `${profile.first_name} ${profile.last_name}`;
            const nameElement = screen.getByText(fullName);
            expect(nameElement).toBeInTheDocument();

            // Property: Role title must be displayed
            const roleElement = screen.getByText(profile.role);
            expect(roleElement).toBeInTheDocument();

            // Property: Department tag must be displayed
            const departmentElement = screen.getByText(profile.department);
            expect(departmentElement).toBeInTheDocument();

            // Property: Either photo or placeholder must be present
            if (profile.photo_url) {
              // If photo_url exists, image should be rendered
              const imgElement = screen.getByAltText(fullName);
              expect(imgElement).toBeInTheDocument();
              expect(imgElement).toHaveAttribute('src', profile.photo_url);
            } else {
              // If no photo_url, placeholder icon should be present
              // The placeholder is a User icon from lucide-react
              const contentSection = screen.getByText(fullName).closest('.p-6');
              const photoSection = contentSection?.previousSibling;
              expect(photoSection).toBeInTheDocument();
              // Verify it's the gradient background container for placeholder
              expect(photoSection).toHaveClass('bg-gradient-to-br');
            }
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: Profile cards always display name components
   * For any leadership profile with first_name and last_name, both should be 
   * visible in the rendered card
   */
  it('should display both first and last name for any profile', () => {
    fc.assert(
      fc.property(
        leadershipProfileGenerator(),
        (profile) => {
          const { unmount } = render(
            <MemoryRouter>
              <ProfileCard leadership={profile} />
            </MemoryRouter>
          );

          try {
            const fullName = `${profile.first_name} ${profile.last_name}`;
            const nameElement = screen.getByText(fullName);
            
            // Verify the full name is displayed as a single element
            expect(nameElement).toBeInTheDocument();
            expect(nameElement.textContent).toBe(fullName);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: Profile cards handle photo_url correctly
   * For any profile with photo_url, an image should be rendered.
   * For any profile without photo_url, a placeholder should be rendered.
   */
  it('should render photo when photo_url exists, placeholder otherwise', () => {
    fc.assert(
      fc.property(
        leadershipProfileGenerator(),
        (profile) => {
          const { unmount } = render(
            <MemoryRouter>
              <ProfileCard leadership={profile} />
            </MemoryRouter>
          );

          try {
            const fullName = `${profile.first_name} ${profile.last_name}`;

            if (profile.photo_url) {
              // Should render an img element with the photo_url
              const imgElement = screen.getByAltText(fullName);
              expect(imgElement).toBeInTheDocument();
              expect(imgElement.tagName).toBe('IMG');
              expect(imgElement).toHaveAttribute('src', profile.photo_url);
            } else {
              // Should not render an img element
              const imgElement = screen.queryByAltText(fullName);
              expect(imgElement).not.toBeInTheDocument();
              
              // Should render placeholder container
              const contentSection = screen.getByText(fullName).closest('.p-6');
              const photoSection = contentSection?.previousSibling;
              expect(photoSection).toHaveClass('bg-gradient-to-br');
            }
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: Department tags are always visible
   * For any leadership profile, the department should be displayed as a 
   * styled badge/tag element
   */
  it('should display department as a styled badge for any profile', () => {
    fc.assert(
      fc.property(
        leadershipProfileGenerator(),
        (profile) => {
          const { unmount } = render(
            <MemoryRouter>
              <ProfileCard leadership={profile} />
            </MemoryRouter>
          );

          try {
            const departmentElement = screen.getByText(profile.department);
            
            // Verify department is displayed
            expect(departmentElement).toBeInTheDocument();
            
            // Verify it has badge styling
            expect(departmentElement).toHaveClass('rounded-full');
            expect(departmentElement).toHaveClass('bg-primary-100');
            expect(departmentElement).toHaveClass('text-primary-700');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: All required fields are present regardless of optional fields
   * For any leadership profile, even if optional fields (bio, photo_url) are null,
   * all required fields (name, role, department) must still be displayed
   */
  it('should display all required fields even when optional fields are null', () => {
    fc.assert(
      fc.property(
        leadershipProfileGenerator().map(profile => ({
          ...profile,
          photo_url: null,
          bio: null,
        })),
        (profile) => {
          const { unmount } = render(
            <MemoryRouter>
              <ProfileCard leadership={profile} />
            </MemoryRouter>
          );

          try {
            // All required fields must be present
            const fullName = `${profile.first_name} ${profile.last_name}`;
            expect(screen.getByText(fullName)).toBeInTheDocument();
            expect(screen.getByText(profile.role)).toBeInTheDocument();
            expect(screen.getByText(profile.department)).toBeInTheDocument();
            
            // Placeholder should be shown when photo_url is null
            const imgElement = screen.queryByAltText(fullName);
            expect(imgElement).not.toBeInTheDocument();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: Profile card structure is consistent
   * For any leadership profile, the card should maintain consistent structure
   * with all information sections present
   */
  it('should maintain consistent card structure for any profile', () => {
    fc.assert(
      fc.property(
        leadershipProfileGenerator(),
        (profile) => {
          const { container, unmount } = render(
            <MemoryRouter>
              <ProfileCard leadership={profile} />
            </MemoryRouter>
          );

          try {
            // Card should have the main container
            const card = container.querySelector('.overflow-hidden');
            expect(card).toBeInTheDocument();
            
            // Should have photo/placeholder section
            const photoSection = container.querySelector('.bg-gradient-to-br');
            expect(photoSection).toBeInTheDocument();
            
            // Should have content section with padding
            const contentSection = container.querySelector('.p-6');
            expect(contentSection).toBeInTheDocument();
            
            // Content section should contain all required elements
            const fullName = `${profile.first_name} ${profile.last_name}`;
            expect(screen.getByText(fullName)).toBeInTheDocument();
            expect(screen.getByText(profile.role)).toBeInTheDocument();
            expect(screen.getByText(profile.department)).toBeInTheDocument();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
