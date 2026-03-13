import { renderHook, act } from '@testing-library/react';
import { useUIStore, uiSelectors, initializeMobileDetection } from '../uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset store state
    const store = useUIStore.getState();
    store.setSidebarOpen(true);
    store.setMobileMenuOpen(false);
    store.setIsMobile(false);
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useUIStore());
      
      expect(result.current.sidebarOpen).toBe(true);
      expect(result.current.mobileMenuOpen).toBe(false);
      expect(result.current.isMobile).toBe(false);
    });
  });

  describe('sidebar actions', () => {
    it('should set sidebar open state', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setSidebarOpen(false);
      });

      expect(result.current.sidebarOpen).toBe(false);

      act(() => {
        result.current.setSidebarOpen(true);
      });

      expect(result.current.sidebarOpen).toBe(true);
    });

    it('should toggle sidebar', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setSidebarOpen(true);
      });

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebarOpen).toBe(false);

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebarOpen).toBe(true);
    });

    it('should persist sidebar state to localStorage', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setSidebarOpen(false);
      });

      const stored = localStorage.getItem('ui-storage');
      expect(stored).toBeTruthy();
      
      const parsed = JSON.parse(stored!);
      expect(parsed.state.sidebarOpen).toBe(false);
    });
  });

  describe('mobile menu actions', () => {
    it('should set mobile menu open state', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setMobileMenuOpen(true);
      });

      expect(result.current.mobileMenuOpen).toBe(true);

      act(() => {
        result.current.setMobileMenuOpen(false);
      });

      expect(result.current.mobileMenuOpen).toBe(false);
    });

    it('should toggle mobile menu', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setMobileMenuOpen(false);
      });

      act(() => {
        result.current.toggleMobileMenu();
      });

      expect(result.current.mobileMenuOpen).toBe(true);

      act(() => {
        result.current.toggleMobileMenu();
      });

      expect(result.current.mobileMenuOpen).toBe(false);
    });

    it('should close mobile menu', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setMobileMenuOpen(true);
      });

      expect(result.current.mobileMenuOpen).toBe(true);

      act(() => {
        result.current.closeMobileMenu();
      });

      expect(result.current.mobileMenuOpen).toBe(false);
    });

    it('should not persist mobile menu state', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setMobileMenuOpen(true);
      });

      const stored = localStorage.getItem('ui-storage');
      const parsed = JSON.parse(stored!);
      
      expect(parsed.state.mobileMenuOpen).toBeUndefined();
    });
  });

  describe('mobile detection', () => {
    it('should set isMobile state', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setIsMobile(true);
      });

      expect(result.current.isMobile).toBe(true);

      act(() => {
        result.current.setIsMobile(false);
      });

      expect(result.current.isMobile).toBe(false);
    });

    it('should not persist isMobile state', () => {
      const { result } = renderHook(() => useUIStore());
      
      act(() => {
        result.current.setIsMobile(true);
      });

      const stored = localStorage.getItem('ui-storage');
      const parsed = JSON.parse(stored!);
      
      expect(parsed.state.isMobile).toBeUndefined();
    });
  });

  describe('selectors', () => {
    it('should select sidebarOpen', () => {
      act(() => {
        useUIStore.getState().setSidebarOpen(false);
      });

      const sidebarOpen = uiSelectors.sidebarOpen(useUIStore.getState());
      expect(sidebarOpen).toBe(false);
    });

    it('should select mobileMenuOpen', () => {
      act(() => {
        useUIStore.getState().setMobileMenuOpen(true);
      });

      const mobileMenuOpen = uiSelectors.mobileMenuOpen(useUIStore.getState());
      expect(mobileMenuOpen).toBe(true);
    });

    it('should select isMobile', () => {
      act(() => {
        useUIStore.getState().setIsMobile(true);
      });

      const isMobile = uiSelectors.isMobile(useUIStore.getState());
      expect(isMobile).toBe(true);
    });

    it('should select isDesktop', () => {
      act(() => {
        useUIStore.getState().setIsMobile(false);
      });

      const isDesktop = uiSelectors.isDesktop(useUIStore.getState());
      expect(isDesktop).toBe(true);
    });
  });

  describe('persistence', () => {
    it('should restore sidebar state from localStorage', () => {
      // Clear and reset
      localStorage.clear();
      
      act(() => {
        useUIStore.getState().setSidebarOpen(false);
      });

      // Create a new hook instance (simulating page reload)
      const { result } = renderHook(() => useUIStore());

      expect(result.current.sidebarOpen).toBe(false);
    });

    it('should not persist mobile menu state', () => {
      // Clear and reset
      localStorage.clear();
      
      act(() => {
        useUIStore.getState().setMobileMenuOpen(true);
      });

      const stored = localStorage.getItem('ui-storage');
      const parsed = JSON.parse(stored!);
      
      // Mobile menu should not be in localStorage
      expect(parsed.state.mobileMenuOpen).toBeUndefined();
    });

    it('should not persist isMobile state', () => {
      // Clear and reset
      localStorage.clear();
      
      act(() => {
        useUIStore.getState().setIsMobile(true);
      });

      const stored = localStorage.getItem('ui-storage');
      const parsed = JSON.parse(stored!);
      
      // isMobile should not be in localStorage
      expect(parsed.state.isMobile).toBeUndefined();
    });
  });

  describe('initializeMobileDetection', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
      originalInnerWidth = window.innerWidth;
    });

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: originalInnerWidth,
      });
    });

    it('should detect mobile viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 768,
      });

      const cleanup = initializeMobileDetection(1024);

      const state = useUIStore.getState();
      expect(state.isMobile).toBe(true);

      cleanup();
    });

    it('should detect desktop viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1280,
      });

      const cleanup = initializeMobileDetection(1024);

      const state = useUIStore.getState();
      expect(state.isMobile).toBe(false);

      cleanup();
    });

    it('should use custom breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 800,
      });

      const cleanup = initializeMobileDetection(768);

      const state = useUIStore.getState();
      expect(state.isMobile).toBe(false);

      cleanup();
    });

    it('should close mobile menu when switching to desktop', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 768,
      });

      const cleanup = initializeMobileDetection(1024);

      act(() => {
        useUIStore.getState().setMobileMenuOpen(true);
      });

      expect(useUIStore.getState().mobileMenuOpen).toBe(true);

      // Simulate resize to desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1280,
      });

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(useUIStore.getState().isMobile).toBe(false);
      expect(useUIStore.getState().mobileMenuOpen).toBe(false);

      cleanup();
    });

    it('should listen for resize events', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1280,
      });

      const cleanup = initializeMobileDetection(1024);

      expect(useUIStore.getState().isMobile).toBe(false);

      // Simulate resize to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 768,
      });

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(useUIStore.getState().isMobile).toBe(true);

      cleanup();
    });

    it('should cleanup event listener', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const cleanup = initializeMobileDetection(1024);
      cleanup();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });
});
