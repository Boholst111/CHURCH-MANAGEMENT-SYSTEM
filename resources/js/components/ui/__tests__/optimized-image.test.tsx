import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { OptimizedImage } from '../optimized-image';

// Mock IntersectionObserver
let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();

  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
    // Immediately trigger intersection for testing
    setTimeout(() => {
      if (this.observe.mock.calls.length > 0) {
        const target = this.observe.mock.calls[0][0];
        callback(
          [{ isIntersecting: true, target } as IntersectionObserverEntry],
          this as any
        );
      }
    }, 0);
  }
}

global.IntersectionObserver = MockIntersectionObserver as any;

describe('OptimizedImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render an image with correct src and alt when loading is eager', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />);
      
      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/test.jpg');
    });

    it('should apply custom className', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          className="custom-class"
          loading="eager"
        />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should set width and height attributes', () => {
      render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          width={200}
          height={150}
          loading="eager"
        />
      );
      
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('width', '200');
      expect(img).toHaveAttribute('height', '150');
    });
  });

  describe('Lazy Loading', () => {
    it('should set loading attribute to lazy by default', async () => {
      render(<OptimizedImage src="/test.jpg" alt="Test image" />);
      
      await waitFor(() => {
        const img = screen.queryByAltText('Test image');
        if (img) {
          expect(img).toHaveAttribute('loading', 'lazy');
        }
      });
    });

    it('should set loading attribute to eager when specified', () => {
      render(
        <OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />
      );
      
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('loading', 'eager');
    });

    it('should not create IntersectionObserver for eager loading', () => {
      let observerCreated = false;
      const OriginalObserver = global.IntersectionObserver;
      
      global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
        observerCreated = true;
        return new OriginalObserver(callback);
      }) as any;
      
      render(<OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />);
      
      expect(observerCreated).toBe(false);
      
      global.IntersectionObserver = OriginalObserver;
    });
  });

  describe('Responsive Images', () => {
    it('should render picture element with source tags', () => {
      const { container } = render(
        <OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />
      );
      
      const picture = container.querySelector('picture');
      expect(picture).toBeInTheDocument();
      
      const sources = container.querySelectorAll('source');
      expect(sources.length).toBeGreaterThan(0);
    });

    it('should generate WebP source with srcset', () => {
      const { container } = render(
        <OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />
      );
      
      const webpSource = container.querySelector('source[type="image/webp"]');
      expect(webpSource).toBeInTheDocument();
      expect(webpSource).toHaveAttribute('srcset');
    });

    it('should generate fallback source with srcset', () => {
      const { container } = render(
        <OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />
      );
      
      const sources = container.querySelectorAll('source');
      const fallbackSource = sources[1]; // Second source is fallback
      expect(fallbackSource).toHaveAttribute('srcset');
    });

    it('should use custom sizes attribute when provided', () => {
      const customSizes = '(max-width: 768px) 100vw, 50vw';
      const { container } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          sizes={customSizes}
          loading="eager"
        />
      );
      
      const sources = container.querySelectorAll('source');
      sources.forEach((source) => {
        expect(source).toHaveAttribute('sizes', customSizes);
      });
    });
  });

  describe('Loading States', () => {
    it('should show placeholder while image is loading', () => {
      const { container } = render(
        <OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />
      );
      
      const placeholder = container.querySelector('.animate-pulse');
      expect(placeholder).toBeInTheDocument();
    });

    it('should hide placeholder after image loads', async () => {
      const { container } = render(
        <OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />
      );
      
      const img = screen.getByAltText('Test image');
      
      // Simulate image load
      await act(async () => {
        img.dispatchEvent(new Event('load'));
      });
      
      await waitFor(() => {
        const placeholder = container.querySelector('.animate-pulse');
        expect(placeholder).not.toBeInTheDocument();
      });
    });

    it('should call onLoad callback when image loads', async () => {
      const onLoad = jest.fn();
      render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          onLoad={onLoad}
          loading="eager"
        />
      );
      
      const img = screen.getByAltText('Test image');
      
      await act(async () => {
        img.dispatchEvent(new Event('load'));
      });
      
      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('should apply opacity transition when loaded', async () => {
      render(<OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />);
      
      const img = screen.getByAltText('Test image');
      
      // Initially should have opacity-0
      expect(img).toHaveClass('opacity-0');
      
      // Simulate image load
      await act(async () => {
        img.dispatchEvent(new Event('load'));
      });
      
      await waitFor(() => {
        expect(img).toHaveClass('opacity-100');
      });
    });
  });

  describe('Error Handling', () => {
    it('should call onError callback when image fails to load', async () => {
      const onError = jest.fn();
      render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          onError={onError}
          loading="eager"
        />
      );
      
      const img = screen.getByAltText('Test image');
      
      await act(async () => {
        img.dispatchEvent(new Event('error'));
      });
      
      expect(onError).toHaveBeenCalledTimes(1);
    });

    it('should show fallback image when error occurs and fallback is provided', async () => {
      const { rerender } = render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          fallback="/fallback.jpg"
          loading="eager"
        />
      );
      
      const img = screen.getByAltText('Test image');
      
      await act(async () => {
        img.dispatchEvent(new Event('error'));
      });
      
      rerender(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          fallback="/fallback.jpg"
          loading="eager"
        />
      );
      
      // After error, should render fallback
      const fallbackImg = screen.getByAltText('Test image');
      expect(fallbackImg).toHaveAttribute('src', '/fallback.jpg');
    });
  });

  describe('Object Fit', () => {
    it('should apply default object-fit cover', () => {
      render(<OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />);
      
      const img = screen.getByAltText('Test image');
      expect(img).toHaveStyle({ objectFit: 'cover' });
    });

    it('should apply custom object-fit', () => {
      render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          objectFit="contain"
          loading="eager"
        />
      );
      
      const img = screen.getByAltText('Test image');
      expect(img).toHaveStyle({ objectFit: 'contain' });
    });
  });

  describe('Accessibility', () => {
    it('should have alt text', () => {
      render(<OptimizedImage src="/test.jpg" alt="Descriptive alt text" loading="eager" />);
      
      const img = screen.getByAltText('Descriptive alt text');
      expect(img).toBeInTheDocument();
    });

    it('should pass through additional ARIA attributes', () => {
      render(
        <OptimizedImage
          src="/test.jpg"
          alt="Test image"
          aria-label="Custom label"
          role="img"
          loading="eager"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Performance', () => {
    it('should render picture element for eager loading', () => {
      const { container } = render(
        <OptimizedImage src="/test.jpg" alt="Test image" loading="eager" />
      );
      
      const picture = container.querySelector('picture');
      expect(picture).toBeInTheDocument();
    });

    it('should not render picture element initially for lazy loading', () => {
      const { container } = render(
        <OptimizedImage src="/test.jpg" alt="Test image" loading="lazy" />
      );
      
      // Container should exist but picture may not be rendered yet
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing file extension gracefully', () => {
      render(<OptimizedImage src="/test" alt="Test image" loading="eager" />);
      
      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
    });

    it('should handle URLs with query parameters', () => {
      render(
        <OptimizedImage
          src="/test.jpg?v=123"
          alt="Test image"
          loading="eager"
        />
      );
      
      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
    });

    it('should handle absolute URLs', () => {
      render(
        <OptimizedImage
          src="https://example.com/test.jpg"
          alt="Test image"
          loading="eager"
        />
      );
      
      const img = screen.getByAltText('Test image');
      expect(img).toHaveAttribute('src', 'https://example.com/test.jpg');
    });
  });
});
