import { renderHook } from '@testing-library/react';
import { useVirtualScrolling } from '../useVirtualScrolling';

describe('useVirtualScrolling', () => {
  it('returns false for item count below threshold (100)', () => {
    const { result } = renderHook(() => useVirtualScrolling(50));
    expect(result.current).toBe(false);
  });

  it('returns false for item count at threshold (100)', () => {
    const { result } = renderHook(() => useVirtualScrolling(100));
    expect(result.current).toBe(false);
  });

  it('returns true for item count above threshold (>100)', () => {
    const { result } = renderHook(() => useVirtualScrolling(101));
    expect(result.current).toBe(true);
  });

  it('returns true for large item counts', () => {
    const { result } = renderHook(() => useVirtualScrolling(1000));
    expect(result.current).toBe(true);
  });

  it('returns false for zero items', () => {
    const { result } = renderHook(() => useVirtualScrolling(0));
    expect(result.current).toBe(false);
  });

  it('returns true when forceVirtual is true regardless of count', () => {
    const { result } = renderHook(() => useVirtualScrolling(10, true));
    expect(result.current).toBe(true);
  });

  it('returns true when forceVirtual is true with zero items', () => {
    const { result } = renderHook(() => useVirtualScrolling(0, true));
    expect(result.current).toBe(true);
  });

  it('returns false when forceVirtual is false with low count', () => {
    const { result } = renderHook(() => useVirtualScrolling(50, false));
    expect(result.current).toBe(false);
  });

  it('memoizes result for same inputs', () => {
    const { result, rerender } = renderHook(
      ({ count }) => useVirtualScrolling(count),
      { initialProps: { count: 150 } }
    );

    const firstResult = result.current;
    rerender({ count: 150 });
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
    expect(firstResult).toBe(true);
  });

  it('updates result when item count changes', () => {
    const { result, rerender } = renderHook(
      ({ count }) => useVirtualScrolling(count),
      { initialProps: { count: 50 } }
    );

    expect(result.current).toBe(false);

    rerender({ count: 150 });
    expect(result.current).toBe(true);
  });

  it('handles boundary case at 101 items', () => {
    const { result } = renderHook(() => useVirtualScrolling(101));
    expect(result.current).toBe(true);
  });

  it('handles boundary case at 99 items', () => {
    const { result } = renderHook(() => useVirtualScrolling(99));
    expect(result.current).toBe(false);
  });
});
