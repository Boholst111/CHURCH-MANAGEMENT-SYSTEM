import { useEffect, useCallback, useRef, useState } from 'react';

/**
 * Keyboard Navigation Hook
 * 
 * Provides utilities for implementing keyboard navigation in components.
 * Supports arrow key navigation, Enter/Space activation, and Escape to close.
 */

export interface KeyboardNavigationOptions {
  /**
   * Enable arrow key navigation (up/down or left/right)
   */
  enableArrowKeys?: boolean;
  
  /**
   * Direction of arrow key navigation
   */
  direction?: 'vertical' | 'horizontal' | 'both';
  
  /**
   * Enable Enter and Space key activation
   */
  enableActivation?: boolean;
  
  /**
   * Enable Escape key to close/cancel
   */
  enableEscape?: boolean;
  
  /**
   * Enable Home/End keys to jump to first/last item
   */
  enableHomeEnd?: boolean;
  
  /**
   * Loop navigation (wrap around at start/end)
   */
  loop?: boolean;
  
  /**
   * Callback when an item is activated (Enter/Space pressed)
   */
  onActivate?: (index: number) => void;
  
  /**
   * Callback when Escape is pressed
   */
  onEscape?: () => void;
  
  /**
   * Callback when focus changes
   */
  onFocusChange?: (index: number) => void;
  
  /**
   * Total number of items
   */
  itemCount: number;
  
  /**
   * Initial focused index
   */
  initialIndex?: number;
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const {
    enableArrowKeys = true,
    direction = 'vertical',
    enableActivation = true,
    enableEscape = true,
    enableHomeEnd = true,
    loop = false,
    onActivate,
    onEscape,
    onFocusChange,
    itemCount,
    initialIndex = 0,
  } = options;

  const focusedIndexRef = useRef(initialIndex);

  const setFocusedIndex = useCallback((index: number) => {
    let newIndex = index;
    
    // Handle looping
    if (loop) {
      if (newIndex < 0) {
        newIndex = itemCount - 1;
      } else if (newIndex >= itemCount) {
        newIndex = 0;
      }
    } else {
      // Clamp to valid range
      newIndex = Math.max(0, Math.min(itemCount - 1, newIndex));
    }
    
    focusedIndexRef.current = newIndex;
    onFocusChange?.(newIndex);
  }, [itemCount, loop, onFocusChange]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const currentIndex = focusedIndexRef.current;
    
    // Arrow key navigation
    if (enableArrowKeys) {
      if ((direction === 'vertical' || direction === 'both') && event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex(currentIndex + 1);
        return;
      }
      
      if ((direction === 'vertical' || direction === 'both') && event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex(currentIndex - 1);
        return;
      }
      
      if ((direction === 'horizontal' || direction === 'both') && event.key === 'ArrowRight') {
        event.preventDefault();
        setFocusedIndex(currentIndex + 1);
        return;
      }
      
      if ((direction === 'horizontal' || direction === 'both') && event.key === 'ArrowLeft') {
        event.preventDefault();
        setFocusedIndex(currentIndex - 1);
        return;
      }
    }
    
    // Home/End keys
    if (enableHomeEnd) {
      if (event.key === 'Home') {
        event.preventDefault();
        setFocusedIndex(0);
        return;
      }
      
      if (event.key === 'End') {
        event.preventDefault();
        setFocusedIndex(itemCount - 1);
        return;
      }
    }
    
    // Activation keys (Enter/Space)
    if (enableActivation && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onActivate?.(currentIndex);
      return;
    }
    
    // Escape key
    if (enableEscape && event.key === 'Escape') {
      event.preventDefault();
      onEscape?.();
      return;
    }
  }, [
    enableArrowKeys,
    direction,
    enableActivation,
    enableEscape,
    enableHomeEnd,
    itemCount,
    setFocusedIndex,
    onActivate,
    onEscape,
  ]);

  return {
    focusedIndex: focusedIndexRef.current,
    setFocusedIndex,
    handleKeyDown,
  };
}

/**
 * Focus Trap Hook
 * 
 * Traps focus within a container (useful for modals, dialogs, dropdowns).
 * Ensures Tab and Shift+Tab cycle through focusable elements within the container.
 */
export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelector = 
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector)
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab (backwards)
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } 
      // Tab (forwards)
      else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus first element when trap activates
    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelector)
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return containerRef;
}

/**
 * Keyboard Shortcut Hook
 * 
 * Registers global keyboard shortcuts.
 */
export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  callback: () => void;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatches = shortcut.alt ? event.altKey : !event.altKey;
        const metaMatches = shortcut.meta ? event.metaKey : !event.metaKey;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
          event.preventDefault();
          shortcut.callback();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

/**
 * Roving Tab Index Hook
 * 
 * Implements roving tabindex pattern for keyboard navigation in lists/grids.
 * Only one item is tabbable at a time, arrow keys move focus.
 */
export function useRovingTabIndex(itemCount: number, initialIndex: number = 0) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const getTabIndex = useCallback((index: number) => {
    return index === activeIndex ? 0 : -1;
  }, [activeIndex]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % itemCount);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(itemCount - 1);
        break;
    }
  }, [itemCount]);

  return {
    activeIndex,
    setActiveIndex,
    getTabIndex,
    handleKeyDown,
  };
}
