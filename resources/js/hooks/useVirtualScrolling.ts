import { useMemo } from 'react';

/**
 * Threshold for enabling virtual scrolling
 * Lists with more than this number of items will use virtual scrolling
 */
const VIRTUAL_SCROLL_THRESHOLD = 100;

/**
 * useVirtualScrolling Hook
 * 
 * Determines whether to use virtual scrolling based on the number of items.
 * Returns true if the item count exceeds the threshold (100 items).
 * 
 * @param itemCount - Number of items in the list
 * @param forceVirtual - Optional flag to force virtual scrolling regardless of count
 * @returns boolean indicating whether to use virtual scrolling
 * 
 * @example
 * ```tsx
 * const shouldUseVirtual = useVirtualScrolling(members.length);
 * 
 * return shouldUseVirtual ? (
 *   <VirtualMemberTable members={members} />
 * ) : (
 *   <MemberTable members={members} />
 * );
 * ```
 */
export function useVirtualScrolling(
  itemCount: number,
  forceVirtual: boolean = false
): boolean {
  return useMemo(() => {
    if (forceVirtual) return true;
    return itemCount > VIRTUAL_SCROLL_THRESHOLD;
  }, [itemCount, forceVirtual]);
}

export default useVirtualScrolling;
