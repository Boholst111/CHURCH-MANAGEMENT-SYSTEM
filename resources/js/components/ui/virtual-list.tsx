// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

/**
 * VirtualList Props
 */
export interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number | string;
  width?: number | string;
  renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactNode;
  className?: string;
  overscanCount?: number;
  onScroll?: (scrollOffset: number) => void;
  initialScrollOffset?: number;
}

/**
 * VirtualList Component
 * 
 * A reusable virtual scrolling list component that renders only visible items
 * for optimal performance with large datasets (>100 items).
 * 
 * Features:
 * - Renders only visible items in viewport
 * - Reduces DOM nodes and memory usage
 * - Maintains scroll position
 * - Configurable item height and list dimensions
 * - Supports custom item rendering
 * 
 * Based on react-window's FixedSizeList for performance optimization.
 * 
 * @example
 * ```tsx
 * <VirtualList
 *   items={members}
 *   itemHeight={80}
 *   height={600}
 *   renderItem={(member, index, style) => (
 *     <div style={style}>
 *       <MemberRow member={member} />
 *     </div>
 *   )}
 * />
 * ```
 */
export function VirtualList<T>({
  items,
  itemHeight,
  height,
  width = '100%',
  renderItem,
  className = '',
  overscanCount = 5,
  onScroll,
  initialScrollOffset = 0,
}: VirtualListProps<T>) {
  const listRef = useRef<FixedSizeList>(null);

  // Restore scroll position on mount if provided
  useEffect(() => {
    if (listRef.current && initialScrollOffset > 0) {
      listRef.current.scrollTo(initialScrollOffset);
    }
  }, [initialScrollOffset]);

  // Row renderer wrapper
  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = items[index];
    return <>{renderItem(item, index, style)}</>;
  };

  // Handle scroll events
  const handleScroll = ({ scrollOffset }: { scrollOffset: number }) => {
    if (onScroll) {
      onScroll(scrollOffset);
    }
  };

  return (
    <div className={className}>
      <FixedSizeList
        ref={listRef}
        height={typeof height === 'number' ? height : parseFloat(height as string)}
        itemCount={items.length}
        itemSize={itemHeight}
        width={width}
        overscanCount={overscanCount}
        onScroll={handleScroll}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}

export default VirtualList;
