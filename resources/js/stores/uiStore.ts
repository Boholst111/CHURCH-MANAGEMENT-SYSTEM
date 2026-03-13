import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * UI store state
 */
interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  isMobile: boolean;
}

/**
 * UI store actions
 */
interface UIActions {
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setIsMobile: (isMobile: boolean) => void;
  closeMobileMenu: () => void;
}

/**
 * Combined UI store type
 */
export type UIStore = UIState & UIActions;

/**
 * UI state store with localStorage persistence for sidebar preference
 * 
 * Features:
 * - Manages sidebar open/closed state
 * - Manages mobile menu state
 * - Tracks mobile viewport detection
 * - Persists sidebar preference to localStorage
 * 
 * @example
 * ```tsx
 * const { sidebarOpen, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
 * 
 * // Toggle sidebar
 * toggleSidebar();
 * 
 * // Open mobile menu
 * setMobileMenuOpen(true);
 * 
 * // Check if mobile
 * if (isMobile) {
 *   // Mobile-specific logic
 * }
 * ```
 */
export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebarOpen: true,
      mobileMenuOpen: false,
      isMobile: false,

      // Actions
      setSidebarOpen: (open) => 
        set({ sidebarOpen: open }),

      toggleSidebar: () => 
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setMobileMenuOpen: (open) => 
        set({ mobileMenuOpen: open }),

      toggleMobileMenu: () => 
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

      setIsMobile: (isMobile) => 
        set({ isMobile }),

      closeMobileMenu: () => 
        set({ mobileMenuOpen: false }),
    }),
    {
      name: 'ui-storage', // localStorage key
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        // Don't persist mobile menu state or isMobile flag
      }),
    }
  )
);

/**
 * Initialize mobile detection listener
 * Call this once in your app initialization
 * 
 * @param breakpoint - Mobile breakpoint in pixels (default: 1024)
 */
export const initializeMobileDetection = (breakpoint: number = 1024) => {
  const checkMobile = () => {
    const isMobile = window.innerWidth < breakpoint;
    useUIStore.getState().setIsMobile(isMobile);
    
    // Close mobile menu when switching to desktop
    if (!isMobile) {
      useUIStore.getState().closeMobileMenu();
    }
  };

  // Initial check
  checkMobile();

  // Listen for resize events
  window.addEventListener('resize', checkMobile);
  
  return () => window.removeEventListener('resize', checkMobile);
};

/**
 * Selectors for accessing specific parts of UI state
 */
export const uiSelectors = {
  sidebarOpen: (state: UIStore) => state.sidebarOpen,
  mobileMenuOpen: (state: UIStore) => state.mobileMenuOpen,
  isMobile: (state: UIStore) => state.isMobile,
  isDesktop: (state: UIStore) => !state.isMobile,
};
