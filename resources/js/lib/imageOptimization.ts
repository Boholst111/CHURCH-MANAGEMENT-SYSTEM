/**
 * Image optimization utilities
 * 
 * Provides functions for:
 * - Generating responsive image URLs
 * - Converting images to WebP format
 * - Compressing images before upload
 * - Generating srcset strings
 */

export interface ImageSize {
  width: number;
  height?: number;
  quality?: number;
}

export interface ResponsiveImageConfig {
  src: string;
  sizes: number[];
  format?: 'webp' | 'jpg' | 'png';
  quality?: number;
}

/**
 * Generate a responsive image URL with size and quality parameters
 */
export const generateImageUrl = (
  baseSrc: string,
  width: number,
  height?: number,
  quality: number = 85,
  format?: string
): string => {
  const url = new URL(baseSrc, window.location.origin);
  url.searchParams.set('w', width.toString());
  if (height) {
    url.searchParams.set('h', height.toString());
  }
  url.searchParams.set('q', quality.toString());
  if (format) {
    url.searchParams.set('fm', format);
  }
  return url.toString();
};

/**
 * Generate srcset string for responsive images
 */
export const generateSrcSet = (
  baseSrc: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1536],
  quality: number = 85,
  format?: string
): string => {
  return sizes
    .map((size) => {
      const url = generateImageUrl(baseSrc, size, undefined, quality, format);
      return `${url} ${size}w`;
    })
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizesAttribute = (breakpoints: { maxWidth: string; size: string }[]): string => {
  return breakpoints
    .map((bp, index) => {
      if (index === breakpoints.length - 1) {
        return bp.size; // Last item doesn't need media query
      }
      return `(max-width: ${bp.maxWidth}) ${bp.size}`;
    })
    .join(', ');
};

/**
 * Compress an image file before upload
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.85
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Convert an image to WebP format
 */
export const convertToWebP = async (
  file: File,
  quality: number = 0.85
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert to WebP'));
            }
          },
          'image/webp',
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Check if browser supports WebP format
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    const img = new Image();
    
    img.onload = () => {
      resolve(img.width === 1 && img.height === 1);
    };
    
    img.onerror = () => {
      resolve(false);
    };
    
    img.src = webP;
  });
};

/**
 * Get optimal image format based on browser support
 */
export const getOptimalFormat = async (originalFormat: string): Promise<string> => {
  const webpSupported = await supportsWebP();
  
  if (webpSupported && ['image/jpeg', 'image/png'].includes(originalFormat)) {
    return 'image/webp';
  }
  
  return originalFormat;
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

/**
 * Preload multiple images
 */
export const preloadImages = async (sources: string[]): Promise<void> => {
  await Promise.all(sources.map(preloadImage));
};
