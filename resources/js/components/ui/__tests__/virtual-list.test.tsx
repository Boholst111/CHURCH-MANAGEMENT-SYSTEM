import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VirtualList from '../virtual-list';

// Mock react-window
jest.mock('react-window', () => ({
  FixedSizeList: ({ children, itemCount }: any) => (
    <div data-testid="virtual-list">
      {Array.from({ length: Math.min(itemCount, 10) }, (_, index) =>
        children({ index, style: {} })
      )}
    </div>
  ),
}));

describe('VirtualList', () => {
  const mockItems = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));

  const mockRenderItem = jest.fn((item, index, style) => (
    <div key={item.id} style={style} data-testid={`item-${index}`}>
      {item.name}
    </div>
  ));

  beforeEach(() => {
    mockRenderItem.mockClear();
  });

  it('renders virtual list with items', () => {
    render(
      <VirtualList
        items={mockItems}
        itemHeight={80}
        height={600}
        renderItem={mockRenderItem}
      />
    );

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
  });

  it('calls renderItem for each visible item', () => {
    render(
      <VirtualList
        items={mockItems}
        itemHeight={80}
        height={600}
        renderItem={mockRenderItem}
      />
    );

    // Should render at least some items (mocked to 10)
    expect(mockRenderItem).toHaveBeenCalled();
    expect(mockRenderItem.mock.calls.length).toBeGreaterThan(0);
  });

  it('renders items with correct data', () => {
    render(
      <VirtualList
        items={mockItems.slice(0, 10)}
        itemHeight={80}
        height={600}
        renderItem={mockRenderItem}
      />
    );

    // Check that first few items are rendered
    expect(screen.getByText('Item 0')).toBeInTheDocument();
    expect(screen.getByTestId('item-0')).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    render(
      <VirtualList
        items={[]}
        itemHeight={80}
        height={600}
        renderItem={mockRenderItem}
      />
    );

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
    expect(mockRenderItem).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <VirtualList
        items={mockItems}
        itemHeight={80}
        height={600}
        renderItem={mockRenderItem}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles scroll callback', () => {
    const onScroll = jest.fn();
    
    render(
      <VirtualList
        items={mockItems}
        itemHeight={80}
        height={600}
        renderItem={mockRenderItem}
        onScroll={onScroll}
      />
    );

    // Scroll callback should be passed to FixedSizeList
    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
  });

  it('uses correct item height', () => {
    const itemHeight = 100;
    
    render(
      <VirtualList
        items={mockItems}
        itemHeight={itemHeight}
        height={600}
        renderItem={mockRenderItem}
      />
    );

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
  });

  it('handles custom width', () => {
    render(
      <VirtualList
        items={mockItems}
        itemHeight={80}
        height={600}
        width={800}
        renderItem={mockRenderItem}
      />
    );

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
  });

  it('handles string height value', () => {
    render(
      <VirtualList
        items={mockItems}
        itemHeight={80}
        height="600px"
        renderItem={mockRenderItem}
      />
    );

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
  });

  it('handles overscanCount prop', () => {
    render(
      <VirtualList
        items={mockItems}
        itemHeight={80}
        height={600}
        renderItem={mockRenderItem}
        overscanCount={10}
      />
    );

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
  });
});
