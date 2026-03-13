import {
  generateImageUrl,
  generateSrcSet,
  generateSizesAttribute,
  compressImage,
  convertToWebP,
  supportsWebP,
  getOptimalFormat,
  preloadImage,
  preloadImages,
} from '../imageOptimization';

describe('imageOptimization', () => {
  describe('generateImageUrl', () => {
    it('should generate URL with width parameter', () => {
      const url = generateImageUrl('/test.jpg', 800);
      expect(url).toContain('w=800');
    });

    it('should generate URL with width and height parameters', () => {
      const url = generateImageUrl('/test.jpg', 800, 600);
      expect(url).toContain('w=800');
      expect(url).toContain('h=600');
    });

    it('should generate URL with quality parameter', () => {
      const url = generateImageUrl('/test.jpg', 800, undefined, 90);
      expect(url).toContain('q=90');
    });

    it('should generate URL with format parameter', () => {
      const url = generateImageUrl('/test.jpg', 800, undefined, 85, 'webp');
      expect(url).toContain('fm=webp');
    });

    it('should use default quality of 85', () => {
      const url = generateImageUrl('/test.jpg', 800);
      expect(url).toContain('q=85');
    });
  });

  describe('generateSrcSet', () => {
    it('should generate srcset with default sizes', () => {
      const srcset = generateSrcSet('/test.jpg');
      expect(srcset).toContain('320w');
      expect(srcset).toContain('640w');
      expect(srcset).toContain('768w');
      expect(srcset).toContain('1024w');
      expect(srcset).toContain('1280w');
      expect(srcset).toContain('1536w');
    });

    it('should generate srcset with custom sizes', () => {
      const srcset = generateSrcSet('/test.jpg', [400, 800, 1200]);
      expect(srcset).toContain('400w');
      expect(srcset).toContain('800w');
      expect(srcset).toContain('1200w');
      expect(srcset).not.toContain('320w');
    });

    it('should include quality parameter in URLs', () => {
      const srcset = generateSrcSet('/test.jpg', [400], 90);
      expect(srcset).toContain('q=90');
    });

    it('should include format parameter when specified', () => {
      const srcset = generateSrcSet('/test.jpg', [400], 85, 'webp');
      expect(srcset).toContain('fm=webp');
    });

    it('should separate entries with commas', () => {
      const srcset = generateSrcSet('/test.jpg', [400, 800]);
      expect(srcset).toMatch(/400w,\s*.*800w/);
    });
  });

  describe('generateSizesAttribute', () => {
    it('should generate sizes attribute with media queries', () => {
      const sizes = generateSizesAttribute([
        { maxWidth: '640px', size: '100vw' },
        { maxWidth: '1024px', size: '50vw' },
        { maxWidth: '', size: '33vw' },
      ]);
      
      expect(sizes).toContain('(max-width: 640px) 100vw');
      expect(sizes).toContain('(max-width: 1024px) 50vw');
      expect(sizes).toContain('33vw');
    });

    it('should not add media query to last item', () => {
      const sizes = generateSizesAttribute([
        { maxWidth: '640px', size: '100vw' },
        { maxWidth: '', size: '50vw' },
      ]);
      
      expect(sizes).toMatch(/100vw,\s*50vw$/);
      expect(sizes.split(',').pop()?.trim()).toBe('50vw');
    });
  });

  describe('compressImage', () => {
    it('should be a function', () => {
      expect(typeof compressImage).toBe('function');
    });

    it('should return a promise', () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = compressImage(mockFile);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('convertToWebP', () => {
    it('should be a function', () => {
      expect(typeof convertToWebP).toBe('function');
    });

    it('should return a promise', () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const result = convertToWebP(mockFile);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('supportsWebP', () => {
    it('should return a boolean', async () => {
      const mockImage = {
        width: 1,
        height: 1,
        onload: null as any,
        onerror: null as any,
        src: '',
      };

      jest.spyOn(global, 'Image').mockImplementation(() => {
        setTimeout(() => mockImage.onload?.(), 0);
        return mockImage as any;
      });

      const result = await supportsWebP();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('getOptimalFormat', () => {
    it('should be a function', () => {
      expect(typeof getOptimalFormat).toBe('function');
    });

    it('should return a promise', () => {
      const result = getOptimalFormat('image/jpeg');
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('preloadImage', () => {
    it('should be a function', () => {
      expect(typeof preloadImage).toBe('function');
    });

    it('should return a promise', () => {
      const result = preloadImage('/test.jpg');
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('preloadImages', () => {
    it('should be a function', () => {
      expect(typeof preloadImages).toBe('function');
    });

    it('should return a promise', () => {
      const result = preloadImages(['/test1.jpg', '/test2.jpg']);
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
