import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SkipToMain } from '../skip-to-main';

describe('SkipToMain Component', () => {
  describe('Basic Rendering', () => {
    it('renders skip to main link', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      expect(link).toBeInTheDocument();
    });

    it('renders as an anchor element', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      expect(link.tagName).toBe('A');
    });

    it('has correct href attribute', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      expect(link).toHaveAttribute('href', '#main-content');
    });
  });

  describe('Styling', () => {
    it('applies skip-to-main class', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      expect(link).toHaveClass('skip-to-main');
    });
  });

  describe('Accessibility', () => {
    it('is keyboard accessible', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      link.focus();
      
      expect(link).toHaveFocus();
    });

    it('has descriptive text', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      expect(link.textContent).toBe('Skip to main content');
    });

    it('is a valid anchor link', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('href')).toMatch(/^#/);
    });
  });

  describe('WCAG Compliance', () => {
    it('meets WCAG 2.1 Level A requirement 2.4.1 (Bypass Blocks)', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      
      // Should be a link
      expect(link.tagName).toBe('A');
      
      // Should have href to main content
      expect(link).toHaveAttribute('href', '#main-content');
      
      // Should be keyboard accessible
      link.focus();
      expect(link).toHaveFocus();
    });

    it('provides mechanism to bypass navigation', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      
      // Link should point to main content area
      expect(link.getAttribute('href')).toBe('#main-content');
    });
  });

  describe('Integration with Layout', () => {
    it('works with main content area', () => {
      render(
        <>
          <SkipToMain />
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
          <main id="main-content">
            <h1>Main Content</h1>
          </main>
        </>
      );
      
      const skipLink = screen.getByText('Skip to main content');
      const mainContent = screen.getByRole('main');
      
      expect(skipLink).toHaveAttribute('href', '#main-content');
      expect(mainContent).toHaveAttribute('id', 'main-content');
    });
  });

  describe('User Experience', () => {
    it('allows keyboard users to skip navigation', () => {
      render(
        <>
          <SkipToMain />
          <nav>
            <a href="/">Link 1</a>
            <a href="/">Link 2</a>
            <a href="/">Link 3</a>
            <a href="/">Link 4</a>
            <a href="/">Link 5</a>
          </nav>
          <main id="main-content">
            <h1>Main Content</h1>
          </main>
        </>
      );
      
      const skipLink = screen.getByText('Skip to main content');
      
      // Skip link should be the first focusable element
      skipLink.focus();
      expect(skipLink).toHaveFocus();
      
      // Skip link should point to main content
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('benefits screen reader users', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      
      // Link should have clear, descriptive text
      expect(link.textContent).toBe('Skip to main content');
      
      // Link should be accessible to screen readers
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href');
    });
  });

  describe('Multiple Instances', () => {
    it('can render multiple skip links', () => {
      render(
        <>
          <SkipToMain />
          <SkipToMain />
        </>
      );
      
      const links = screen.getAllByText('Skip to main content');
      expect(links).toHaveLength(2);
    });

    it('all instances point to same target', () => {
      render(
        <>
          <SkipToMain />
          <SkipToMain />
        </>
      );
      
      const links = screen.getAllByText('Skip to main content');
      links.forEach(link => {
        expect(link).toHaveAttribute('href', '#main-content');
      });
    });
  });

  describe('Best Practices', () => {
    it('should be placed at the beginning of the page', () => {
      const { container } = render(
        <>
          <SkipToMain />
          <header>Header</header>
          <nav>Navigation</nav>
          <main id="main-content">Content</main>
        </>
      );
      
      const skipLink = screen.getByText('Skip to main content');
      const firstElement = container.firstChild;
      
      expect(skipLink).toBe(firstElement);
    });

    it('provides clear and concise text', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      
      // Text should be clear and concise
      expect(link.textContent).toBe('Skip to main content');
      expect(link.textContent?.length).toBeLessThan(30);
    });

    it('uses semantic HTML', () => {
      render(<SkipToMain />);
      
      const link = screen.getByText('Skip to main content');
      
      // Should be an anchor element
      expect(link.tagName).toBe('A');
      
      // Should have href attribute
      expect(link).toHaveAttribute('href');
    });
  });
});
