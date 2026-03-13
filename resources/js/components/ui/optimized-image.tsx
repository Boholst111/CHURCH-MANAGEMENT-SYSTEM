import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
}

/**
 * OptimizedImage component with lazy loading, WebP support, and responsive srcsets
 * 
 * Features:
 * - Automatic WebP format with fallback to original format
 * - Lazy loading by default
 * - Responsive image srcsets for different viewport sizes
 * - Loading placeholder
 * - Error fallback
 * - Intersection Observer for lazy loading
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  objectFit = 'cover',
  fallback,
  onLoad,
  onError,
  sizes,
  quality = 85,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive srcset
  const generateSrcSet = (baseSrc: string): string => {
    const srcWithoutExt = baseSrc.replace(/\.[^/.]+$/, '');
    const ext = baseSrc.split('.').pop() || 'jpg';
    
    // Generate srcset for different sizes
    const sizes = [320, 640, 768, 1024, 1280, 1536];
    return sizes
      .map((size) => `${srcWithoutExt}-${size}w.${ext} ${size}w`)
      .join(', ');
  };

  // Generate WebP srcset
  const generateWebPSrcSet = (baseSrc: string): string => {
    const srcWithoutExt = baseSrc.replace(/\.[^/.]+$/, '');
    
    const sizes = [320, 640, 768, 1024, 1280, 1536];
    return sizes
      .map((size) => `${srcWithoutExt}-${size}w.webp ${size}w`)
      .join(', ');
  };

  // Default sizes attribute if not provided
  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  // Show fallback if error occurred
  if (hasError && fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={cn(className)}
        style={{ objectFit }}
        {...props}
      />
    );
  }

  // Show placeholder while not loaded
  const showPlaceholder = !isLoaded && isInView;

  return (
    <div className={cn('relative overflow-hidden', className)} style={{ width, height }}>
      {showPlaceholder && (
        <div
          className="absolute inset-0 bg-neutral-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {isInView && (
        <picture>
          {/* WebP format with srcset */}
          <source
            type="image/webp"
            srcSet={generateWebPSrcSet(src)}
            sizes={defaultSizes}
          />
          
          {/* Original format with srcset as fallback */}
          <source
            srcSet={generateSrcSet(src)}
            sizes={defaultSizes}
          />
          
          {/* Fallback img tag */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
              className
            )}
            style={{ objectFit }}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

OptimizedImage.displayName = 'OptimizedImage';
